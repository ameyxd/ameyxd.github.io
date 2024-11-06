import { CustomMDXProvider } from '@/components/mdx/MDXProvider'

export default function App({ Component, pageProps }) {
  return (
    <CustomMDXProvider>
      <Component {...pageProps} />
    </CustomMDXProvider>
  )
}
