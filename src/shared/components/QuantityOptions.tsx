import { HStack, Button, Text } from "@chakra-ui/react"
import { CartItem, UseCartStore } from "../store/UseCartStore"

const QuantityOptions = ({p}: {
    p: CartItem
}) => {
    const { deleteProduct, addToCart, decreaseQuantity } = UseCartStore()
  return (
    <HStack>
        <Button onClick={() => p.quantity == 1 ? deleteProduct(p.product.id): decreaseQuantity(p.product) }>-</Button>
        <Text>{p.quantity}</Text>
        <Button onClick={() => addToCart(p.product)}>+</Button>
    </HStack>
  )
}

export default QuantityOptions