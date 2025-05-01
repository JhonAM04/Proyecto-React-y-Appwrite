import { useContext, useEffect, useRef, useState } from "react"
import { database, ID } from "../lib/appwrite"
import { AppwriteResponse, Product } from "../declaration/AppwriteTypes"
import { AppWrite } from "../lib/env"
import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, Image, Input, Tag, Tooltip } from "@chakra-ui/react"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md"
import { Query } from "appwrite"
import { Helmet } from "react-helmet"
import { UserContext } from "../shared/contexts/UserContext"


const Home = () => {

  const cliente = useContext(UserContext)
  const [products, setProducts] = useState<Array<Product>>()
  const nombreRef = useRef<HTMLInputElement | null>(null)
  const precioRef = useRef<HTMLInputElement | null>(null)


  const traerProductos = async() =>{
    const response: AppwriteResponse = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.products)
    setProducts(response.documents as Array<Product>)
  }

  const crearProducto = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formulario = e.currentTarget
      const data = new FormData(formulario)
      const entries = Object.fromEntries(data.entries())

      await database.createDocument(AppWrite.databaseID, AppWrite.collections.products, ID.unique(), {
        title: entries.title,
        price: Number(entries.price)
      }).then(()=>{
        toast.success('Producto creado')
        nombreRef.current && (nombreRef.current.value = "")
        precioRef.current && (precioRef.current.value = '')
        traerProductos()
      }).catch(()=>{
        toast.error('no se logro crear el producto')
      })
  }

  const deleteProduct = async(e: React.MouseEvent<HTMLButtonElement>,productID: string) => {
    e.currentTarget.disabled = true
    await database.deleteDocument(AppWrite.databaseID, AppWrite.collections.products, productID).then(()=>{
     traerProductos()
     toast.success('El producto se ha eliminado correctamente')
    }).catch(()=>{
     toast.error('no se elimino correctamente')
     e.currentTarget.disabled = false
    })
 }

 const getActiveProducts = async() =>{
  const response: AppwriteResponse = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.products, [
    Query.equal('active', true)
  ])
  setProducts(response.documents as Array<Product>)
 }

 const getInnactiveProducts = async() =>{
  const response: AppwriteResponse = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.products, [
    Query.equal('active', false)
  ])
  setProducts(response.documents as Array<Product>)
 }

 const getStockProducts = async() =>{
  const response: AppwriteResponse = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.products, [
    Query.greaterThan('stock',0)
  ])
  setProducts(response.documents as Array<Product>)
 }

 const getCashProducts = async() =>{
  const response: AppwriteResponse = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.products, [
    Query.greaterThan('price',100)
  ])
  setProducts(response.documents as Array<Product>)
 }

 const getWithOutStockProducts = async() =>{
  const response: AppwriteResponse = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.products, [
    Query.equal('stock', 0)
  ])
  setProducts(response.documents as Array<Product>)
 }

 const getMoreandStockProducts = async() =>{
  const response: AppwriteResponse = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.products, [
    Query.greaterThan('price', 100),
    Query.greaterThanEqual('stock',1)
  ])
  setProducts(response.documents as Array<Product>)
 }

  useEffect(()=>{
    traerProductos()
  }, [])
  
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Box as="form" onSubmit={crearProducto} w='300px'>
        <FormControl>
          <FormLabel>Titulo</FormLabel>
          <Input type="text" name="title" ref={nombreRef} />
        </FormControl>

        <FormControl>
          <FormLabel>Precio</FormLabel>
          <Input type="text" name="price" ref={precioRef} />
        </FormControl>

        <Button type="submit">Crear</Button>
      </Box>
      <br />

      <ButtonGroup>
        <Button onClick={getActiveProducts}>Activos</Button>
        <Button onClick={getInnactiveProducts}>Inactivos</Button>
        <Button onClick={traerProductos}>Todos</Button>
      </ButtonGroup>
      <br />
      <br />
      <ButtonGroup>
        <Button onClick={getStockProducts}>con stock</Button>
        <Button onClick={getCashProducts}>mas de S/. 100</Button>
        <Button onClick={getMoreandStockProducts}>mas de S/. 100 con stock</Button>
        <Button onClick={getWithOutStockProducts}>sin stock</Button>
      </ButtonGroup>

      <hr />
      {
        products?.map(p=>(
          <HStack key={p.$id} w='400px' p='.4em 1em' borderRadius='10px' bgColor='lightgray' mb='1em' mt='1em' justifyContent='space-between'>
            <Box>
              <Link to={`/products/appWrite/${p.$id}`}>
                <Image src={p.image} />
                <h1>{p.title}</h1>
                <h2>S/.{p.price}</h2>
                <h2>({p.stock} en stock)</h2>
              </Link>
              <Tag pointerEvents='none' colorScheme={p.active? "green":"gray"}>{p.active? 'Activo' : 'Innactivo'}</Tag>
            </Box>

          <Tooltip label='Eliminar' hasArrow placement="right">
            {
              cliente?.profile?.role == 'buyer' ? <Box></Box> : <Button color= 'red' _hover={{bgColor: 'darkred', color: 'pink'}} onClick={(e)=> deleteProduct(e,p.$id)}><MdDeleteForever /></Button>
            }
          </Tooltip>

          </HStack>
        ))
      }
    </>
  )
}

export default Home