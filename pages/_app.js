import '../styles/globals.css'
import { SessionProvider, signIn, useSession } from 'next-auth/react'

function MyApp({ Component, 
   pageProps: { session, ...pageProps },
 }) {

  return (
<SessionProvider session={session} refetchOnWindowFocus={false}>
  <Component {...pageProps} />
</SessionProvider>
  )
}

export default MyApp
