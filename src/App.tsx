import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import AppRoutes from "./router/AppRoutes"
import { Toaster } from "sonner"
import { UseProvider } from "./shared/contexts/UserContext"
import { Analytics } from "@vercel/analytics/react"

const theme = extendTheme({
  fonts: {
    body: 'Nunito',
    Heading: 'Nunito'
  }
})

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Analytics />
      <Toaster richColors/>
      <UseProvider>
        <AppRoutes/>
      </UseProvider>
    </ChakraProvider>
  )
}

export default App