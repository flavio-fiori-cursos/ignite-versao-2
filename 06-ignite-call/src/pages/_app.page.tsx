import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { DefaultSeo } from 'next-seo'

import { globalStyles } from './styles/globals'
import './../lib/dayjs'
import { queryClient } from '../lib/react-query'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://www.example.com.br',
          siteName: 'Ignite Call',
        }}
      />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}
