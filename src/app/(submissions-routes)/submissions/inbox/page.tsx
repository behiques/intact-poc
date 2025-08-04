'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { CustomTable } from '@/features/ui/Table'
import type { Worklist } from '@/features/submissions/types'
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'
import { PageHeader } from '@/features/submissions/components/PageHeader'

export default function SubmissionsWorklistPage() {
  const columns = React.useMemo<ColumnDef<Worklist>[]>(
    () => [
      {
        accessorFn: (row) => row.EmailDetails?.from,
        id: 'EmailDetails.from',
        cell: (info) => info.getValue(),
        header: () => <span>From</span>,
      },
      {
        accessorFn: (row) => row.IsRush,
        id: 'IsRush',
        cell: (info) => info.getValue(),
        header: 'Important',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.EmailDetails?.subject,
        id: 'EmailDetails.subject',
        cell: (info) => info.getValue(),
        header: () => <span>Subject</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.CreatedDate,
        id: 'CreatedDate',
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
        header: () => 'Date',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.EmailDetails?.source,
        id: 'EmailDetails.source',
        cell: (info) => info.getValue(),
        header: () => <span>Source</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'actions',
        cell: () => (
          <button className="hover:bg-primary-light inline-block cursor-pointer rounded-sm px-3 py-1">
            ...
          </button>
        ),
        header: 'Actions',
        footer: (props) => props.column.id,
      },
    ],
    []
  )

  const { items: submissions } = useSubmissions('inbox') // Fetch submissions for inbox

  return (
    <div className="p-6">
      <div className="">
        <PageHeader title="Inbox" />
        <section className="-mt-px">
          <CustomTable
            {...{
              data: submissions || [],
              columns,
            }}
          />
        </section>
      </div>
    </div>
  )
}
