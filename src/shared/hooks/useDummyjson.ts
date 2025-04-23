import { DummyCategory } from "../../declaration/Dummyjson"

const useDummyjson = () => {
  const dummyLogin = async(username: string, password: string) =>{
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    const data = await response.json()
    return data
  }

  const getDummyProducts = async() =>{
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()

    return data
  }

  const getSingleProduct = async(id: number) =>{
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await response.json()

    return data
  }

  const getPorductCategorys = async()=> {
    const response = await fetch('https://dummyjson.com/products/categories')
    const data = await response.json()

    return data as Array<DummyCategory>
  }

  const getProductsByCategorys = async(category: string)=>{
    const response = await fetch (`https://dummyjson.com/products/category/${category}`)
    const data = await response.json()

    return data
  }

  return{
    dummyLogin, getDummyProducts, getSingleProduct, getPorductCategorys, getProductsByCategorys
  }
  

}

export default useDummyjson