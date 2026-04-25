import { auth } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase-server'

// DELETE /api/media/[id] — remove a media asset and its storage file
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const supabase = createAdminClient()

  // Fetch the record to verify ownership and get the storage path
  const { data: asset, error: fetchError } = await supabase
    .from('media_assets')
    .select('id, owner_id, bucket_path')
    .eq('id', id)
    .single()

  if (fetchError || !asset) {
    return Response.json({ error: 'Asset not found' }, { status: 404 })
  }

  if (asset.owner_id !== userId) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Delete from storage first, then the DB row
  const { error: storageError } = await supabase.storage
    .from('media')
    .remove([asset.bucket_path])

  if (storageError) {
    return Response.json({ error: storageError.message }, { status: 500 })
  }

  const { error: dbError } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', id)

  if (dbError) {
    return Response.json({ error: dbError.message }, { status: 500 })
  }

  return new Response(null, { status: 204 })
}
