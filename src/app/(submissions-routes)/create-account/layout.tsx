import { SubmissionProvider } from '@/providers/create-account-provider'
import { Sidebar } from '@/features/submissions/components/Sidebar'

export default function Example({ children }: { children: React.ReactNode }) {
  return (
    <SubmissionProvider>
      <section className="flex h-full pb-20">
        <aside className="h-full w-3xs bg-white p-7">
          <Sidebar />
        </aside>
        <main className="w-full p-7">{children}</main>
      </section>
    </SubmissionProvider>
  )
}
