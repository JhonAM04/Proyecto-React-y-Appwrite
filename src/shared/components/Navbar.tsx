import { Avatar, Button, Heading, HStack, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import ShoppingCartDrawer from "./ShoppingCartDrawer"
import { BsCart4 } from "react-icons/bs"
import { Paths } from "../../router/Routes"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"


const Navbar = () => {

    const cliente = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
      

  return (
    <HStack display='flex' justifyContent='space-between' alignItems='center' bgColor='chocolate' p='1em 2em'>

        <HStack>
            {
                cliente?.appwriteAccount?.$id &&
                <>
                    <Wrap>
                        <WrapItem>
                            <Avatar name={cliente?.profile?.name} src={cliente?.profile?.profilePhoto} />
                        </WrapItem>
                    </Wrap>
                    <Heading>{cliente?.profile?.name}</Heading>
                </>
            }
        </HStack>
       
        <HStack>
            <Link to={Paths.Home}>Home</Link>
            <Link to={Paths.Products}>Products</Link>
        </HStack>

        <HStack>
            <Button colorScheme='teal' onClick={onOpen}>
                <BsCart4 />
            </Button>
            <ShoppingCartDrawer isOpen={isOpen} onClose={onClose}/>
            {
                cliente?.appwriteSession? <Button onClick={cliente?.logOut}>LogOut</Button>: <>
                    <Button onClick={() => navigate(Paths.Login)}>Login</Button>
                    <Button onClick={() => navigate(Paths.Register)}>Registrarse</Button>
                </> 
            }
        </HStack>
    </HStack>
  )
}

export default Navbar