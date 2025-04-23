import { ReactElement } from "react"
import Navbar from "../components/Navbar"
import { Box } from "@chakra-ui/react"

const BaseLayout = ({ children }: {
    children: ReactElement
}) => {
  return (
    <>  
        <Box height='100vh'>
            <Navbar/>
            {children}
        </Box>
    </>
  )
}

export default BaseLayout