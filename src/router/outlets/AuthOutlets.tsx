import { Navigate, Outlet } from "react-router-dom"

const AuthOutlets = () => {
    const session = localStorage.getItem('appwriteSessionId')
  return (
    session ? <Navigate to='/' /> : <Outlet />
  )
}

export default AuthOutlets