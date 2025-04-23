import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Image, Button } from "@chakra-ui/react"
import { UseCartStore } from "../shared/store/UseCartStore"
import QuantityOptions from "../shared/components/QuantityOptions"
import { FaTrash } from "react-icons/fa6"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Paths } from "../router/Routes"

const Receipt = () => {

    const { products, deleteProduct } = UseCartStore()
    const navigate = useNavigate()

    if(products.length == 0){
        return <Navigate to={Paths.Products}/>
    }

  return (
    <>
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Resumen de carrito</TableCaption>
                <Thead>
                <Tr>
                    <Th>Image</Th>
                    <Th>Title</Th>
                    <Th>options</Th>
                    <Th isNumeric>cantidad</Th>
                    <Th isNumeric>price</Th>
                    <Th>delete</Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                    products.map((item)=> (
                        <Tr key={item.product.id}>
                            <Td><Image src={item.product.thumbnail} alt={item.product.title} w={100}/></Td>
                            <Td><Link to={`/products/${item.product.id}`}>{item.product.title}</Link></Td>
                            <Td><QuantityOptions p={item}/></Td>
                            <Td isNumeric>{item.quantity}</Td>
                            <Td isNumeric>S/.{item.product.price}</Td>
                            <Td><Button colorScheme="red" onClick={() => deleteProduct(item.product.id)}><FaTrash /></Button></Td>
                        </Tr>
                    ))
                }
                </Tbody>
            </Table>
        </TableContainer>
        <Button onClick={()=> navigate(Paths.CompraExitosa)}>Comprar</Button>
    </>
  )
}

export default Receipt