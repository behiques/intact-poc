import { SubmissionProvider } from '@/providers/create-account-provider'
import { Sidebar } from '@/features/submissions/components/Sidebar'

export default function Example({ children }: { children: React.ReactNode }) {
  return (
    <SubmissionProvider>
      <section className="flex h-full pb-20">
        <aside className="w-3xs bg-white p-7 h-full">
          <Sidebar />
        </aside>
        <main className="p-7 w-full">{children}</main>
      </section>
    </SubmissionProvider>
  )
}
