'use client'

import {
  DashboardIcon,
  SubmissionInboxIcon,
  SubmissionPlusIcon,
  SubmissionWorklistIcon,
  WorklistIcon,
} from '@/features/dashboard/assets/Icons'
import { useFinancialCloseDates } from '@/features/dashboard/hooks/useFinancialCloseDate'
import { LoaderSpinner } from '@/features/ui/LoaderSpinner'
import Link from 'next/link'

interface Shortcut {
  icon: React.ReactNode
  href: string
  label: string
}

const shortcuts: Shortcut[] = [
  { icon: <DashboardIcon />, href: '/', label: 'Dashboard' },
  { icon: <WorklistIcon />, href: '/my-worklist', label: 'My Worklist' },
  {
    icon: <SubmissionInboxIcon />,
    href: '/submissions?tab=inbox',
    label: 'Submissions Inbox',
  },
  {
    icon: <SubmissionWorklistIcon />,
    href: '/submissions?tab=worklist',
    label: 'Submissions Worklist',
  },
  {
    icon: <SubmissionPlusIcon />,
    href: '/account-search',
    label: 'Create Submission',
  },
]
export default function Dashboard() {
  const { items: financialDates, isLoading } = useFinancialCloseDates()

  return (
    <div className="min-h-screen bg-[#f7f9fa] p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Shortcuts */}
        <div className="bg-primary-lightest rounded border border-gray-200 p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Shortcuts</h2>
          <div className="flex flex-col space-y-3">
            {shortcuts.map((link, index) => (
              <Link
                key={index}
                className="text-primary border-primary w-full cursor-pointer rounded border bg-white px-4 py-3 text-left font-medium hover:bg-transparent"
                href={link.href as Parameters<typeof Link>[0]['href']}
              >
                <span className="inline-flex items-center space-x-2">
                  {link.icon}
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Financial Close Dates */}
        <div className="overflow-auto rounded border border-gray-200 bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Financial Close Dates</h2>
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600">
                <th className="py-2 pr-4">Reporting Month</th>
                <th className="py-2 pr-4">Premium Closing Date</th>
                <th className="py-2 pr-4">Day</th>
                <th className="py-2">Loss Closing Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4} className="p-4">
                    <LoaderSpinner />
                  </td>
                </tr>
              )}
              {!isLoading && !financialDates ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No financial close dates available
                  </td>
                </tr>
              ) : (
                financialDates?.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 pr-4 text-gray-800">{row.month}</td>
                    <td className="py-2 pr-4 text-gray-800">{row.premium}</td>
                    <td className="py-2 pr-4 text-gray-800">{row.day}</td>
                    <td className="py-2 text-gray-800">{row.loss}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Release Notes */}
        <div className="flex flex-col justify-between rounded border border-gray-200 bg-white p-4 shadow">
          <div>
            <h2 className="mb-4 text-lg font-semibold">Release Notes</h2>
            <ul className="space-y-2 text-sm">
              {['9.6', '9.4', '9.3', '8.1', '7.1', '6.2'].map((v, i) => (
                <li
                  key={i}
                  className="rounded border border-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-50"
                >
                  {v} Platform Release Notes
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-right">
            <a href="#" className="text-primary font-medium hover:underline">
              View More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
