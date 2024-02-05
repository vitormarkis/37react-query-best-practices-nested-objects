import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { useState } from "react"
import { Toaster } from "sonner"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster />
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
        position="bottom"
      />
    </QueryClientProvider>
  )
}
