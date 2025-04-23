import { HStack, Box, VStack, FormControl, FormLabel, Input, Button, Divider, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import bgRegister from '../../assets/registro.jpeg'
import { Paths } from "../../router/Routes"
import { account, database, ID } from "../../lib/appwrite"
import { toast } from "sonner"
import { AppWrite } from "../../lib/env"

const Register = () => {

  const crearCuenta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

    if(formulario){
      const data = new FormData(formulario)
      const { email, password, name} = Object.fromEntries(data.entries()) as {
        [k: string] : string
      }

      await account.create(ID.unique(), email, password, name).then(async()=> {
        await database.createDocument(AppWrite.databaseID, AppWrite.collections.profile, ID.unique(), {
          name: name,
          email: email
        }).then(()=>{
          toast.success('cuenta creada con exito')
        })
        
      }).catch(()=> {
        toast.error('hubo un error al crear la cuenta')
      })
    }
  }


  return (
    <HStack w='100vw' h='100vh'>

        <VStack w='calc(100% - 700px)'>
          <Box as="form" onSubmit={crearCuenta} w='300px' display='flex' flexDirection='column' gap='1em'>
              <FormControl>
                <FormLabel>Correo electronico:</FormLabel>
                <Input type="text" name="email" required/>
              </FormControl>

              <FormControl>
                <FormLabel>Usuario:</FormLabel>
                <Input type="text" name="name" required/>
              </FormControl>

              <FormControl>
                <FormLabel>Contraseña:</FormLabel>
                <Input type="password" name="password" required/>
              </FormControl>

              <Button type="submit">Registrar</Button>

              <Divider />
              <Link as={RouterLink} to={Paths.Login} color='blue' >Ya tengo cuenta</Link>
          </Box>
        </VStack>

        <Box w='700px' bgImage={bgRegister} h='100%' bgRepeat='no-repeat' bgPosition='center' bgSize='cover' />

    </HStack>
  )
}

export default Register