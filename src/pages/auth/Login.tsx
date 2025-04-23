import { Link } from "react-router-dom"
import { Box, Button, Divider, FormControl, FormLabel, HStack, Input, VStack } from "@chakra-ui/react"
import bgLogin from '../../assets/login1.webp'
import { Paths } from "../../router/Routes"
import { useContext } from "react"
import { UserContext } from "../../shared/contexts/UserContext"

const Login = () => {

  const cliente = useContext(UserContext)
  

  const iniciarSesion = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

    if(formulario){
      const data = new FormData(formulario)
      const {email, password} = Object.fromEntries(data.entries()) as {
          [k:string]: string
        }

        await cliente?.login(email, password)

      //const dummySession = await dummyLogin(username, password)
    
      //if(dummySession.message == 'Invalid credentials'){
      //  toast.error('Credenciales invalidas')
      //}else{
      //  localStorage.setItem("dummySession", JSON.stringify(dummySession))
      //  navigate(Paths.Home)
     // }
    }
  }


  return (
    <HStack w='100vw' h='100vh'>
        <Box w='600px' bgImage={bgLogin} h='100%' bgRepeat='no-repeat' bgPosition='center' bgSize='cover' />

        <VStack w='calc(100% - 600px)'>
          <Box as="form" w='300px' onSubmit={iniciarSesion} display='flex' flexDirection='column' gap='1em'>
              <FormControl>
                <FormLabel>Correo electronico:</FormLabel>
                <Input type="text" name="email" required/>
              </FormControl>

              <FormControl>
                <FormLabel>Contraseña:</FormLabel>
                <Input type="password" name="password" required/>
              </FormControl>

              <Button type="submit">Ingresar</Button>

              <Divider />
              <Link to={Paths.RecuperarPassword}>Olvidaste tu contraseña?</Link>
          </Box>
        </VStack>
    </HStack>
  )
}

export default Login