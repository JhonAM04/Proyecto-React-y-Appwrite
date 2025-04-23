import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import AppRoutes from "./router/AppRoutes"
import { Toaster } from "sonner"
import { UseProvider } from "./shared/contexts/UserContext"

const theme = extendTheme({
  fonts: {
    body: 'Nunito',
    Heading: 'Nunito'
  }
})

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Toaster richColors/>
      <UseProvider>
        <AppRoutes/>
      </UseProvider>
    </ChakraProvider>
  )
}

export default App