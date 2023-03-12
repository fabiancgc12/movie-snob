import '@picocss/pico'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import {Layout} from "@/components/Layout/Layout";
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from "react";
import 'react-loading-skeleton/dist/skeleton.css'

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient())
  return (
      <>
        <Head>
          <title>Popcorn Search</title>
          <meta name="description" content="Search for your favorite movies and tv shows" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Hydrate>
        </QueryClientProvider>
      </>
)
}
