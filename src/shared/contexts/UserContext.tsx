import { createContext, ReactNode, useEffect, useState } from "react"
import { Profile } from "../../declaration/AppwriteTypes"
import { Models, Query } from "appwrite"
import { account, database } from "../../lib/appwrite"
import { AppWrite } from "../../lib/env"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Paths } from "../../router/Routes"

type UsuarioContext = {
    profile: Profile
    appwriteAccount: Models.User<Models.Preferences>
    login: (email: string, password: string)=> void
    appwriteSession: string
    logOut: ()=> void
}

export const UserContext = createContext<UsuarioContext | null>(null)

export const UseProvider = ({ children } : { children: ReactNode }) => {

    const [appwriteAccount, setAppwriteAccount] = useState<Models.User<Models.Preferences>>()
    const [profile, setProfile] = useState<Profile>()
    const navigate = useNavigate()
    const appwriteSession = localStorage.getItem('appwriteSessionId')


    const getAccountandProfile = async() => {
        const responseAccount = await account.get()
        setAppwriteAccount(responseAccount)

        const responseProfile =  await database.listDocuments(AppWrite.databaseID, AppWrite.collections.profile, [
            Query.equal('email', responseAccount.email)
           ])

        setProfile(responseProfile.documents[0] as Profile) 
       
    }

    const loaddata = async() =>{
       await getAccountandProfile()
    }


    const login = async(email: string, password: string) => {
        await account.createEmailPasswordSession(email,password).then((response)=>{
            localStorage.setItem('appwriteSessionId', response.$id)
            navigate(Paths.Home)
            toast.success('Has iniciado sesion correctamente')
          }).catch(()=>{
            toast.error('Hubo un problema')
          })

          loaddata()

    }

    const logOut = async() => {
        await account.deleteSession(appwriteSession!).then(()=>{
            localStorage.removeItem('appwriteSessionId')
            navigate(Paths.Login)
            toast.success('Cerraste session con exito')
        }).catch(()=>{
            toast.error('No se pudo cerrar session')
        })
    }


    useEffect(()=>{
        if(localStorage.getItem('appwriteSessionId')){
            getAccountandProfile()
        }
    }, [])



    return(
        <UserContext.Provider value={{profile, appwriteAccount, login, logOut, appwriteSession}}>
            { children }
        </UserContext.Provider>
    )
}


