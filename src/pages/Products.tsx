import { useEffect, useState } from "react"
import { DummyCategory, DummyProduct } from "../declaration/Dummyjson"
import ProductCard from "../shared/components/ProductCard"
import { Box, HStack, Select } from "@chakra-ui/react"
import { RingLoader } from "react-spinners"
import useDummyjson from "@hooks/useDummyjson"


const Products = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>([])
    const [categorys, setCategorys] = useState<Array<DummyCategory>>([])
    const [loading, setLoading] = useState(false)
    const { getDummyProducts, getPorductCategorys, getProductsByCategorys} = useDummyjson()

    const getProducts = async() => {
        setLoading(true)
        const data = await getDummyProducts()
        setProducts(data.products)
        setLoading(false)
    }

    const getCategorys = async() => {
        const data = await getPorductCategorys()
        setCategorys(data)
    }

    const getPBCategorys = async(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setLoading(true)
        let data = null
        const  value = e.target.value

        if(value != '*'){
            data = await getProductsByCategorys(value)
        }else{
            data = await getDummyProducts()
        }
        setProducts(data.products) 
        setLoading(false)
    }


  useEffect(()=> {
    getProducts()
    getCategorys()
  }, [])
  return (
    <>
        
        <Select onChange={getPBCategorys}>
            <option value="*">Todos</option>
            {
                categorys.map(categorie=>(
                    <option key={categorie.slug} value={categorie.slug}>{categorie.name}</option>
                ))
            }
        </Select>
      <HStack flexWrap="wrap" justifyContent="space-between">
      {
        loading? <Box w='100%' h='500px' display='flex' justifyContent='center' alignItems='center'> <RingLoader /> </Box> : products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
      }
      </HStack>
    </>
  )
}

export default Products