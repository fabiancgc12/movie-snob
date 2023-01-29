import '@picocss/pico'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <title>Popcorn Search</title>
          <meta name="description" content="Search for your favorite movies and tv shows" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </>
)
}
