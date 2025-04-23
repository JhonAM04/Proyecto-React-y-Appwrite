import { Box, Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react"
import { account, database, ID, storage } from "../lib/appwrite"
import { AppWrite } from "../lib/env"
import { toast } from "sonner"
import { useContext, useState } from "react"
import { Query } from "appwrite"
import { Profile } from "../declaration/AppwriteTypes"
import { UserContext } from "../shared/contexts/UserContext"

type formEntries = {
    archivo: File
}



const UpArchivo = () => {

    const [imageURL, setImageUrl] = useState<string>()

    const contexto = useContext(UserContext)
    console.log(contexto)

    const subirArchivo = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formulario = e.currentTarget

        const data = new FormData(formulario)
        const { archivo } = Object.fromEntries(data.entries()) as formEntries
        
        await storage.createFile(AppWrite.bucketID, ID.unique(), archivo).then(async(response)=>{
            const fileAppwrite = storage.getFilePreview(AppWrite.bucketID, response.$id)
            setImageUrl(`${fileAppwrite}&mode=admin`)
            const profile = await database.listDocuments(AppWrite.databaseID, AppWrite.collections.profile, [
                Query.equal('email', (await account.get()).email)
            ])

            database.updateDocument(AppWrite.databaseID, AppWrite.collections.profile, (profile.documents[0] as Profile).$id, {
                profilePhoto: `${fileAppwrite}&mode=admin`
            }).then(()=>{
                toast.success('El archivo se subio exitosamente')
            })
        }).catch(()=>{
            toast.error('El archivo no se subio correctamente')
        })
    }

  return (
    <Box as="form" onSubmit={subirArchivo}>
        <FormControl>
            <FormLabel>Selecciona tu archivo</FormLabel>
            <Input type="file" name="archivo"/>
        </FormControl>

        <Button type="submit">Subir  archivo</Button>

        <Image src={imageURL} loading="lazy" />
    </Box>
  )
}

export default UpArchivo