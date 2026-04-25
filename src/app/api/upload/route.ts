import { auth } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase-server'

const BUCKET = 'media'
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

// POST /api/upload — upload an image to Supabase Storage and save metadata
export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const entityType = (formData.get('entityType') as string | null) ?? 'chef'
  const entityId   = (formData.get('entityId')   as string | null) ?? userId
  const assetType  = (formData.get('assetType')  as string | null) ?? 'general'

  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json({ error: 'Only JPEG, PNG, and WebP images are allowed' }, { status: 422 })
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: 'File must be under 10 MB' }, { status: 422 })
  }

  const supabase = createAdminClient()

  // Build a unique, safe storage path
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `${entityType}/${entityId}/${Date.now()}_${safeName}`

  const arrayBuffer = await file.arrayBuffer()

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    return Response.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path)

  // Save metadata — roll back the file if DB write fails
  const { data: asset, error: dbError } = await supabase
    .from('media_assets')
    .insert({
      owner_id:    userId,
      entity_type: entityType,
      entity_id:   entityId,
      bucket_path: path,
      public_url:  publicUrl,
      file_name:   file.name,
      file_size:   file.size,
      mime_type:   file.type,
      asset_type:  assetType,
    })
    .select()
    .single()

  if (dbError) {
    await supabase.storage.from(BUCKET).remove([path])
    return Response.json({ error: dbError.message }, { status: 500 })
  }

  void ext // suppress unused warning
  return Response.json({ asset }, { status: 201 })
}

// GET /api/upload?entityType=chef&entityId=... — list media for the signed-in user
export async function GET(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const entityType = searchParams.get('entityType')
  const entityId   = searchParams.get('entityId')

  const supabase = createAdminClient()

  let query = supabase
    .from('media_assets')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })

  if (entityType) query = query.eq('entity_type', entityType)
  if (entityId)   query = query.eq('entity_id', entityId)

  const { data: assets, error } = await query

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ assets })
}
