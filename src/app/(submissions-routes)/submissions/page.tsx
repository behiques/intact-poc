'use client'

import { LoaderSpinner } from '@/features/ui/LoaderSpinner'
import { useRouter } from 'next/navigation'

export default function SubmissionsPage() {
  const router = useRouter()

  router.push('/submissions/inbox')
  return (
    <div className="flex items-center justify-center h-64">
      <LoaderSpinner />
    </div>
  )
}
