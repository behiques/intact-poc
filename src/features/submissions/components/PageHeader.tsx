import { SearchIcon } from '@/features/header/assets/Icons'
import Link from 'next/link'
import { RefreshIcon } from '../assets/Icons'
import { CreateSubmissionIcon } from '@/features/ui/Icons/CreateSubmissions'
import { usePathname } from 'next/navigation'

export const PageHeader = ({ title }: { title: string }) => {
  const pathname = usePathname()

  return (
    <>
      <Link
        href={'/account-search'}
        className="border-primary hover:bg-primary-lightest mb-4 inline-flex cursor-pointer flex-col items-center justify-center rounded-sm border bg-white px-6 py-6 text-sm font-bold"
      >
        <CreateSubmissionIcon />
        <span className="text-primary font-bold">Create Submission</span>
      </Link>
      <nav className="-mb-0.5">
        <ul className="flex">
          <li>
            <Link
              href="/submissions/inbox"
              className={`hover:bg-primary-lightest block w-60 border border-gray-300 p-2 text-center font-bold ${
                pathname === '/submissions/inbox'
                  ? 'bg-primary-lightest text-primary border-b-primary border-b-2'
                  : 'bg-white text-gray-700'
              }`}
            >
              Inbox
            </Link>
          </li>
          <li>
            <Link
              href="/submissions/worklist"
              className={`hover:bg-primary-lightest block w-60 border border-gray-300 p-2 text-center font-bold ${
                pathname === '/submissions/worklist'
                  ? 'bg-primary-lightest text-primary border-b-primary border-b-2'
                  : 'bg-white text-gray-700'
              }`}
            >
              Worklist
            </Link>
          </li>
        </ul>
      </nav>
      <header className="border border-gray-300 bg-white p-6">
        <h1 className="text-2xl font-bold">{title}</h1>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <label
              htmlFor="search"
              className="block text-sm/6 font-medium text-gray-900"
            >
              <div className="flex">
                <div className="relative h-12 grow">
                  <SearchIcon className="absolute top-3.5 left-1 w-10 fill-gray-200" />

                  <input
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Search"
                    className="block h-12 w-full rounded-sm border border-gray-300 pr-3 pl-10"
                  />
                </div>
                <button
                  type="button"
                  className="bg-primary relative z-10 -ml-2 h-12 cursor-pointer rounded-sm px-5 py-0 text-sm font-bold text-white"
                >
                  Search
                </button>
              </div>
            </label>
          </div>
          <button
            type="button"
            className="hover:bg-primary-lightest text-primary h-12 cursor-pointer rounded-sm bg-transparent px-6 py-0 text-sm font-bold"
          >
            <RefreshIcon className="mr-2 inline-block" />
            Refresh
          </button>
        </div>
      </header>
    </>
  )
}
