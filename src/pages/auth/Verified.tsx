import { useEffect } from "react"
import { account } from "../../lib/appwrite"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../router/Routes"

const Verified = () => {

  const urlParams = new URLSearchParams(window.location.search)

  const secret = urlParams.get('secret')!
  const userId = urlParams.get('userId')!

  const navigate = useNavigate()

  const magicLogin = async() => {
    await account.createSession(userId, secret).then((session)=>{
      localStorage.setItem('appwriteSessionId', session.$id)
      navigate(Paths.Home)
      toast.success('Ingreso exitoso')
    }).catch(()=>{
      toast.error('Hubo un error')
    })
  }

  useEffect(()=>{
    magicLogin()
  }, [])

  return (
    <div>Verified</div>
  )
}

export default Verified