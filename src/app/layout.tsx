import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/features/header/components/Header'
import { Providers } from '@/providers/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Intact POC - Bulletproof React',
  description: 'A Next.js application following bulletproof-react patterns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div id="root">
            <Header />
            <main>{children}</main>
          </div>
        </body>
      </html>
    </Providers>
  )
}
