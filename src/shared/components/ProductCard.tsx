import { Button, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { DummyProduct } from "../../declaration/Dummyjson"
import { Link } from "react-router-dom"
import { UseCartStore } from "../store/UseCartStore"

const ProductCard = ({ product }:{
    product: DummyProduct
}) => {

  const { addToCart} = UseCartStore()

  return (
    <>
    <VStack gap="1em" w="300px">
    <Link to={`/products/${product.id}`}>
        <Image src={product.thumbnail} loading="lazy"/>
        <Heading fontSize="2xl">{product.title}</Heading>
        <Text>{product.description}</Text>
    </Link>
        <Button w='100%' onClick={() => addToCart(product)}>Agregar al carrito</Button>
    </VStack>

    </>
  )
}

export default ProductCard