import Layout from '@/components/Layout'
import BookmarkProvider from '@/providers/BookmarkProvider'
import '@/styles/globals.css'
import theme from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fontsource/source-sans-3'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BookmarkProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </BookmarkProvider>
    </QueryClientProvider>
  )
}
