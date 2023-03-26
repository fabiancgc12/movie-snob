import '@picocss/pico'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-tabs/style/react-tabs.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import {Layout} from "@/components/Layout/Layout";
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from "react";
import {ThemeProvider} from "@/global/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // default: true
                staleTime: 10 * (60 * 1000), // 10 mins
            },
        },
    }))
  return (
      <>
        <Head>
          <title>Movie Snob</title>
          <meta name="description" content="Search for your favorite movies and tv shows" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </Hydrate>
        </QueryClientProvider>
      </>
)
}
