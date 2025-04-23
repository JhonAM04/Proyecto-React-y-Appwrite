import { useParams } from "react-router-dom"
import useDummyjson from "../shared/hooks/useDummyjson"
import { useEffect, useState } from "react"
import { DummyProduct } from "../declaration/Dummyjson"
import { QRCodeSVG } from "qrcode.react"
import { Box } from "@chakra-ui/react"

const SingleProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<DummyProduct>()
    const { getSingleProduct }= useDummyjson()
    
    const getProduct = async()=>{
        const data = await getSingleProduct(Number(id))
        setProduct(data)
    }

    useEffect(()=>{
        getProduct()
    }, [])
  return (
    <Box >
        <img src={product?.thumbnail} alt={product?.description} />
        <h3>{product?.title}</h3>

        <Box position='absolute' bottom='0' right={0} m='1em' bgColor='green' p='1em' borderRadius='10px' boxShadow='20px 20px 50px'>
        <QRCodeSVG bgColor="green" value={`http://localhost:5173${location.pathname}`} />
        </Box>
    </Box>
  )
}

export default SingleProduct