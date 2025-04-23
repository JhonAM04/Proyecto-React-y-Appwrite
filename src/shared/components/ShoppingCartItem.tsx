import { HStack, VStack, Button, Image, Text } from "@chakra-ui/react"
import { FaTrash } from "react-icons/fa6"
import { CartItem, UseCartStore } from "../store/UseCartStore"
import QuantityOptions from "./QuantityOptions"

const ShoppingCartItem = ({p}: {
    p: CartItem
}) => {

    const { deleteProduct } = UseCartStore()

  return (
                    <HStack key={p.product.id} justifyContent='space-between' mb='1em'>
                        <HStack>
                          <Image w='70px' src={ p.product.thumbnail} />
                          <VStack alignItems='flex-start'>
                            <Text w='180px'>{p.product.title}</Text>
                            <QuantityOptions p={p}/>
                          </VStack>
                          <Text>S/.{(p.product.price * p.quantity).toFixed(2)}</Text>
                        </HStack>
                        <Button colorScheme="red" onClick={() => deleteProduct(p.product.id)}><FaTrash /></Button>
                     </HStack>
  )
}

export default ShoppingCartItem