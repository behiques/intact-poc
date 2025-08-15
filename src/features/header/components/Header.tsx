'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  AlertsIcon,
  FeedbacksIcon,
  FolderPlusIcon,
  HomeIcon,
  IntactLogo,
  ProfileIcon,
  ResourcesIcon,
  SearchIcon,
  SpecialtyLogo,
  ToolsIcon,
} from '../assets/Icons'
import { useQuickLinks } from '../hooks/useQuickLinks'
import { pathnameToTitle } from '@/utils/stringFormatter'
import { SelectField, SelectOption } from '@/features/ui/Form/Select'
import { QuickLink } from '../types'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/worklist', label: 'Worklist' },
  { href: '/submissions', label: 'Submissions' },
  { href: '/reporting', label: 'Reporting' },
  { href: '/tasks', label: 'Tasks' },
]

const topLinks = [
  { icon: <FeedbacksIcon />, href: '#', label: 'Submit Feedback' },
  {
    icon: <FolderPlusIcon />,
    href: '/create-account',
    label: 'Create New Account',
  },
  { icon: <ResourcesIcon />, href: '#', label: 'Resources' },
  { icon: <ToolsIcon />, href: '#', label: 'Tools' },
  { icon: <AlertsIcon />, href: '#', label: 'Alerts' },
  { icon: <ProfileIcon />, href: '#', label: 'Profile' },
]

export const Header = () => {
  const pathname = usePathname()

  const [selectedLink, setSelectedLink] = useState('')

  useEffect(() => {
    if (selectedLink) {
      window.open(selectedLink, '_blank')
    }
  }, [selectedLink])

  const { items: quickLinks, isLoading } = useQuickLinks()
  const quickLinkOptions =
    quickLinks?.map((link: QuickLink) => ({
      value: link.url,
      label: link.name,
    })) || []

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 p-4">
          <IntactLogo />
          <SpecialtyLogo />
        </Link>

        <nav className="px-4">
          <ul className="flex space-x-6">
            {topLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className={`text-primary text-primary-500 flex items-center space-x-1 border-b-[6px] border-transparent py-2 text-xs`}
                  href={link.href as Parameters<typeof Link>[0]['href']}
                >
                  {link.icon} <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-between px-4">
        <nav>
          <ul className="flex space-x-12">
            {navLinks.map((link, index) => {
              const isActive = (href: string) => pathname === href

              return (
                <li key={index}>
                  <Link
                    className={`text-primary block space-x-4 border-b-[6px] py-2 text-base font-semibold ${
                      isActive(link.href)
                        ? 'border-primary-active-tab'
                        : 'text-primary-500 border-transparent'
                    }`}
                    href={link.href as Parameters<typeof Link>[0]['href']}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mb-4 flex items-center">
          <SelectField
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderWidth: 2,
                paddingTop: 1,
                paddingBottom: 1,
                borderColor: state.isFocused ? '#007b87' : '#007b87',
              }),
              dropdownIndicator: (baseStyles) => ({
                ...baseStyles,
                color: '#007b87',
              }),
            }}
            className="w-64"
            defaultValue={{ value: 'option1', label: 'All' }}
            options={[
              { value: 'option1', label: 'All' },
              { value: 'option2', label: 'Account Name' },
              { value: 'option3', label: 'Account Number' },
              { value: 'option3', label: 'Quote Number' },
              { value: 'option3', label: 'Submission' },
              { value: 'option3', label: 'Transaction' },
            ]}
          />
          <div className="rouunded-md flex w-full">
            <input
              type="text"
              className="focus:border-primary w-full rounded-none border border-gray-300 p-2 focus:outline-none"
            />
            <button className="bg-primary border-primary cursor-pointer rounded-r-md border px-3">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="-mt-1.5 flex justify-between space-x-4 border-y border-gray-300 px-4 py-1.5">
        <nav className="flex items-center space-x-2 text-sm text-black/70">
          <Link href="/">
            <HomeIcon />
          </Link>
          {pathname !== '/' && (
            <>
              <span className="text-gray-400">/</span>
              <Link href={pathname as Parameters<typeof Link>[0]['href']}>
                {pathnameToTitle(pathname)}
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Quick Links</span>
          <SelectField
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? 'gray' : 'gray',
              }),
              dropdownIndicator: (baseStyles) => ({
                ...baseStyles,
                color: '#007b87',
              }),
            }}
            className="w-64"
            placeholder=""
            options={quickLinkOptions}
            onChange={(option) => {
              if (option && typeof option === 'object' && 'value' in option) {
                setSelectedLink((option as SelectOption).value)
              }
            }}
            isLoading={isLoading}
          />
        </div>
      </div>
    </header>
  )
}
