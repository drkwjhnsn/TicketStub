import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: { heading: `'Source Sans 3', sans-serif`, body: `'Source Sans 3', sans-serif` },
})

export default theme
