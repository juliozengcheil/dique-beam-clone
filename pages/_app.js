import { transformer } from '../lib/trpc'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {Component.auth ? (
          <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}

function Auth({ children }) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) {
    return <>{children}</>
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return null
}

function getBaseUrl() {
  if (process.browser) {
    return ''
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              const trcpErrorCode = error?.data?.code 
              if (trcpErrorCode === 'NOT_FOUND') {
                return false
              }
              if (failureCount < 3) {
                return true
              }
              return false
            },
          },
        },
      },
    }
  },
})(MyApp)
