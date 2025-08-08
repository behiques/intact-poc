'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { CustomTable } from '@/features/ui/Table'
import type { Submission } from '@/features/submissions/types'
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions'
import { PageHeader } from '@/features/submissions/components/PageHeader'
import { EditPenIcon } from '@/features/ui/Icons/EditPenIcon'
import Image from 'next/image'

import commentIcon from '@/features/submissions/assets/comment.png'
import commentFilledIcon from '@/features/submissions/assets/comment-filled.png'

export default function SubmissionsWorklistPage() {
  const columns = React.useMemo<ColumnDef<Submission>[]>(
    () => [
      {
        accessorFn: (row) => row.EmailDetails?.from,
        id: 'EmailDetails.from',
        cell: (info) => info.getValue(),
        header: () => <span>From</span>,
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
        accessorFn: (row) => row.SubmissionStatusDescription,
        id: 'SubmissionStatusDescription',
        cell: (info) => info.getValue(),
        header: 'Status',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.AssignedToName,
        id: 'AssignedToName',
        cell: (info) => info.getValue(),
        header: 'Assigned To',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.SubmissionId,
        id: 'SubmissionId',
        cell: (info) => info.getValue(),
        header: 'ID',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'comments',
        cell: (info) => (
          <button className="cursor-pointer">
            <Image
              src={info.getValue() ? commentFilledIcon : commentIcon}
              alt="Edit"
              width={21}
              height={19}
            />
          </button>
        ),
        header: 'Comments',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'edit',
        cell: () => (
          <button className="cursor-pointer">
            <EditPenIcon />
          </button>
        ),
        header: 'Edit',
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

  const { items: submissions } = useSubmissions('worklist') // Fetch submissions for worklist

  return (
    <div className="p-6">
      <div className="">
        <PageHeader title="Worklist" />
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
