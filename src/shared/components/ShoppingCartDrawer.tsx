import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Text, VStack } from "@chakra-ui/react"
import { UseCartStore } from "../store/UseCartStore"
import { TbShoppingBagExclamation } from "react-icons/tb"
import ShoppingCartItem from "./ShoppingCartItem"
import { Paths } from "../../router/Routes"
import { useNavigate } from "react-router-dom"

const ShoppingCartDrawer = ({ isOpen, onClose }: {
    isOpen: boolean
    onClose: () => void
}) => {
  const { products, clearCart } = UseCartStore()
  const navigate = useNavigate()
  return (
    <Drawer
        size={"md"}
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito</DrawerHeader>

          <DrawerBody>
            {
              products.length == 0 && <VStack justifyContent='center' h='100%'>
                <TbShoppingBagExclamation size={100} />
                <Text fontSize={30}>Carrito vacio!</Text>
              </VStack>
            }
            {
              products.map(p => (
                 <ShoppingCartItem p={p} key={p.product.id} />
              ))
            }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            {
              products.length > 0 &&
               <>
                <Button mr={3} onClick={() => clearCart()}>Vaciar</Button>
                <Button colorScheme='blue' onClick={()=> navigate(Paths.Receipt)}>Continuar</Button>
              </>
            }
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}

export default ShoppingCartDrawer