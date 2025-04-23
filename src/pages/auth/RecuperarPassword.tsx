import { Box, Button, FormControl, Heading, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Link as linkRoute } from "react-router-dom"
import { Paths } from "../../router/Routes"
import { account, ID } from "../../lib/appwrite"

const MagicModal = ({ isOpen, onClose } : {
  isOpen: boolean
  onClose: () => void
}) => {

  const sendMagicLink = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

      const data = new FormData(formulario)
      const { email } = Object.fromEntries(data.entries()) as {
          [k:string]: string
        }

        await account.createMagicURLToken(ID.unique(), email, 'http://localhost:5173/verificacion')
      
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={sendMagicLink}>
          <ModalHeader>Coloca tu correo electronico</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input type="text" placeholder="example@gmail.com" name="email" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              cerrar
            </Button>
            <Button colorScheme="green" type="submit">Enviar correo</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

const RecuperarPassword = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Link as={linkRoute} color='blue' to={Paths.Login}>Volver</Link>
      <Button onClick={onOpen}>
        <Heading>Ingresar con link magico</Heading>
      </Button>
      <MagicModal isOpen={isOpen} onClose={onClose}/>
    </Box>
  )
}

export default RecuperarPassword