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

export default function AccountSearch() {
  const [selectedAccount, setSelectedAccount] = useState<number[]>([])
  const [searchForm, setSearchForm] = useState<AccountSearchFormData>({
    accountName: '',
  })

  const { items: results, isLoading } = useAccountSearch(searchForm)
  console.log({ results })
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
          <div className="mt-10 space-y-6 p-8">
            <p className="text-sm">
              Showing 1-10 of {results.length} results for &laquo;
              {searchForm.accountName}&raquo;
            </p>
            {results
              .filter((item) => !!item?.term.status)
              .slice(0, 10)
              .map((item, index) => (
                <SearchResult
                  key={index}
                  item={item}
                  showing={selectedAccount.includes(item?.account.id)}
                  onClick={() => handleClick(item)}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )

  function handleClick(item: AccountSearchResult) {
    selectedAccount.includes(item.account.id)
      ? setSelectedAccount(
          selectedAccount.filter((id) => id !== item.account.id)
        )
      : setSelectedAccount([...selectedAccount, item.account.id])
  }
}
