import { auth, clerkClient } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase-server'

const BUCKET = 'media'

// POST /api/setup/storage — creates the public storage bucket.
// Admin-only. Call once after running the SQL migration.
export async function POST() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  if (user.publicMetadata.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createAdminClient()

  // Check if bucket already exists
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()
  if (listError) {
    return Response.json({ error: listError.message }, { status: 500 })
  }

  if (buckets.some((b) => b.name === BUCKET)) {
    return Response.json({ message: 'Bucket already exists', bucket: BUCKET })
  }

  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    fileSizeLimit: 10 * 1024 * 1024, // 10 MB
  })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ message: 'Bucket created', bucket: BUCKET })
}
