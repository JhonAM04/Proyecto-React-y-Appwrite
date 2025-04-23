import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Product } from "../declaration/AppwriteTypes"
import { database } from "../lib/appwrite"
import { AppWrite } from "../lib/env"
import { Box, Button, FormControl, FormLabel, Heading, Input, Switch, Text } from "@chakra-ui/react"
import RoutePath from "../shared/components/RoutePath"
import { toast } from "sonner"
import { Paths } from "../router/Routes"

const AppwriteProduct = () => {
    const [product, setProduct] = useState<Product>()
    const [isChecked, setIsChecked] = useState<boolean>()
    const { id } = useParams()
    const navigate = useNavigate()


    const getProduct = async() => {
        const response = await database.getDocument(AppWrite.databaseID, AppWrite.collections.products, id!).catch(()=>{
          toast.error('No existe ese producto')
          navigate(Paths.Home)
        })
        setProduct(response as Product)
        setIsChecked((response as Product).active)
    }

    const deleteProduct = async(productID: string) => {
       await database.deleteDocument(AppWrite.databaseID, AppWrite.collections.products, productID).then(()=>{
        navigate(Paths.Home)
        toast.success('El producto se ha eliminado correctamente')
       }).catch(()=>{
        toast.error('no se elimino correctamente')
       })
    }

    const editProduct = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formulario = e.currentTarget

      const data = new FormData(formulario)
      const {title, price, active, stock} = Object.fromEntries(data.entries()) as {
          [k:string]: string
        }

        await database.updateDocument(AppWrite.databaseID, AppWrite.collections.products, product?.$id!, {
            title: title,
            price: Number(price),
            active: active? true : false ,
            stock: Number(stock)
        }).then(()=>{
          toast.success('El producto se actualizo correctamente')
          getProduct()
        }).catch(()=>{
          toast.error('El producto no se actualizo correctamente')
        })
    }

    useEffect(()=>{
        getProduct()
    }, [])
  return (
    <Box>
        {
          product && (
            <>
              <RoutePath productName={product.title}/>
        
              <Heading size='3xl'>{product.title}</Heading>
              <Text fontSize={30}>S/.{product.price}</Text>
              <Button onClick={()=> deleteProduct(product.$id)}>Eliminar</Button>

             <Box as="form" onSubmit={editProduct}>
                <FormControl>
                  <FormLabel>Nombre del producto</FormLabel>
                  <Input type="text" name="title" defaultValue={product.title}/>
                </FormControl>

                <FormControl>
                  <FormLabel>Precio del producto</FormLabel>
                  <Input type="number" name="price" defaultValue={product.price}/>
                </FormControl>

                <FormControl>
                  <FormLabel>Innactivo o activo</FormLabel>
                  <Switch name="active" isChecked={isChecked} onChange={()=>setIsChecked((prev)=> !prev)}/>
                </FormControl>


                <FormControl>
                  <FormLabel>Stock del producto</FormLabel>
                  <Input type="number" name="stock" defaultValue={product.stock}/>
                </FormControl>

                <Button type="submit">Editar</Button>
             </Box>
            </>
          )
        }
    </Box>
  )
}

export default AppwriteProduct