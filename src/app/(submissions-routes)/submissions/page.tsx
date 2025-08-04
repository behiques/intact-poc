'use client'

import { useRouter } from 'next/navigation'

export default function SubmissionsPage() {
  const router = useRouter()

  router.push('/submissions/inbox')
  return (
    <>
      <h1>Submissions</h1>
    </>
  )
}
