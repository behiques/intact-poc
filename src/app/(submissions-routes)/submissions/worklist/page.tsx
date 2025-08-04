import { SearchIcon } from '@/features/header/assets/Icons'
import { RefreshIcon } from '@/features/worklist/assets/Icons'
import Link from 'next/dist/client/link'

export default function SubmissionsPage() {
  return (
    <>
      <div className="">
        <nav className="-mb-0.5">
          <ul className="flex">
            <li>
              <Link
                href="/submissions/inbox"
                className="bg-white hover:bg-primary-lightest border border-gray-300 p-2 w-60 block font-bold text-center"
              >
                Inbox
              </Link>
            </li>
            <li>
              <Link
                href="/submissions/worklist"
                className="bg-primary-lightest text-primary border border-gray-300 border-b-2 border-b-primary p-2 w-60 block font-bold text-center"
              >
                Worklist
              </Link>
            </li>
          </ul>
        </nav>
        <header className="bg-white p-6 border border-gray-300">
          <h1 className="font-bold text-2xl">Worklist</h1>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <label
                htmlFor="search"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <div className="flex">
                  <div className="grow h-12">
                    <input
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search"
                      className="border border-gray-300 rounded-sm block w-full h-12 pr-3 pl-10"
                    />
                    <SearchIcon className="fill-gray-300 w-10" />
                  </div>
                  <button
                    type="button"
                    className="h-12 rounded-sm -ml-2 bg-primary px-5 py-0 text-sm font-bold text-white"
                  >
                    Search
                  </button>
                </div>
              </label>
            </div>
            <button
              type="button"
              className="h-12 rounded-sm bg-transparent hover:bg-primary-lightest px-6 py-0 text-sm font-bold text-primary cursor-pointer"
            >
              <RefreshIcon className="inline-block mr-2" />
              Refresh
            </button>
          </div>
        </header>
        <section className="border border-gray-300 p-6 -mt-px">
          <p>No submissions found.</p>
        </section>
      </div>
    </>
  )
}
