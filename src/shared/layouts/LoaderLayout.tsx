import { Box } from "@chakra-ui/react"
import { ComponentType, Suspense } from "react"
import { RingLoader } from "react-spinners"

const LoaderLayout = (Component: ComponentType) => {
  return () =>{
    return(
        <Suspense fallback={ <Box w='100%' h='500px' display='flex' justifyContent='center' alignItems='center'> <RingLoader /> </Box> }>
            <Component/>
        </Suspense>
    )
  }
}

export default LoaderLayout