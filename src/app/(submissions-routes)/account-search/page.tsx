'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AccountSearchForm } from '@/features/account-search/components/Form'
import { SearchResult } from '@/features/account-search/components/SearchResult'
import {
  AccountSearchFormData,
  AccountSearchResult,
} from '@/features/account-search/types'
import { useAccountSearch } from '@/features/account-search/hooks/useAccounts'
import { LoaderSpinner } from '@/features/ui/LoaderSpinner'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@/features/account-search/assets/Icons'

export default function AccountSearch() {
  const [selectedAccount, setSelectedAccount] = useState<number[]>([])
  const [searchForm, setSearchForm] = useState<AccountSearchFormData>({
    accountName: '',
  })

  const { items: results, isLoading } = useAccountSearch(searchForm)

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 grid place-content-center bg-white/50">
          <LoaderSpinner />
        </div>
      )}

      <AccountSearchForm
        onSearch={(searchParams: AccountSearchFormData) => {
          setSearchForm(searchParams)
        }}
      />

      {results && results.length > 0 && (
        <>
          <div className="flex items-center justify-between p-8">
            <h2 className="font-bold">Account Search Results</h2>
            <Link
              href="/create-account"
              className="bg-primary rounded px-4 py-2 font-bold text-white"
            >
              Create new account
            </Link>
          </div>
          <div className="mt-10 space-y-6 p-8 pt-0">
            <div className="flex flex-col items-end justify-end">
              <div>
                <p>Search within results</p>
                <input
                  type="search"
                  className="min-w-60 rounded border border-gray-300 p-2"
                />
              </div>
            </div>

            <header className="flex items-center justify-between text-sm">
              <p>
                Showing 1-10 of {results.length} results for &laquo;
                {searchForm.accountName}&raquo;
              </p>
              <Pagination />
              <div>
                <p className="font-semibold">Results per page:</p>
                <select className="border-primary w-30 rounded border-2 bg-white px-4 py-2 text-sm">
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
              </div>
            </header>
            {results
              .filter((item: AccountSearchResult) => !!item?.term.status)
              .slice(0, 10)
              .map((item: AccountSearchResult, index: number) => (
                <SearchResult
                  key={index}
                  item={item}
                  showing={selectedAccount.includes(item?.account.id)}
                  onClick={() => handleClick(item)}
                />
              ))}

            <footer className="flex items-center justify-center pt-6">
              <Pagination />
            </footer>
          </div>
        </>
      )}
    </div>
  )

  function handleClick(item: AccountSearchResult) {
    if (selectedAccount.includes(item.account.id)) {
      setSelectedAccount(selectedAccount.filter((id) => id !== item.account.id))
    } else {
      setSelectedAccount([...selectedAccount, item.account.id])
    }
  }
}

const Pagination = () => {
  return (
    <div className="flex items-center space-x-2">
      <button className="cursor-pointer">
        <ArrowLeftIcon />
      </button>
      <span>Page 3 of 74</span>
      <button className="cursor-pointer">
        <ArrowRightIcon />
      </button>
    </div>
  )
}
