"use client";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/global/ThemeContext";
import { ShowNavBarProvider } from "@/global/ShowNavbarContext";

export function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: unknown;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 10 * (60 * 1000),
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ThemeProvider>
          <ShowNavBarProvider>{children}</ShowNavBarProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
