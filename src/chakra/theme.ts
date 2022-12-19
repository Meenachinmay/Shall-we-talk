import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#FF3c00'
    }
  },
  fonts: {
    heading: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "white"
      }
    })
  },
  components: {
    //Button
  }
})
