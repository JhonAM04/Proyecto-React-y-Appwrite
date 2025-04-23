import { Route, Routes } from "react-router-dom"
import { Elements, Paths } from "./Routes" 
import BaseOutlet from "./outlets/BaseOutlet"
import AuthOutlets from "./outlets/AuthOutlets"

const AppRoutes = () => {
  return (
        <Routes> 
          <Route element={<BaseOutlet/>}>
            <Route path={Paths.Home} element={<Elements.Home/>} />
            <Route path={Paths.UpArchivo} element={<Elements.UpArchivo/>} />
            <Route path={Paths.Receipt} element={<Elements.Receipt/>} />
            <Route path={Paths.CompraExitosa} element={<Elements.CompraExitosa/>} />

            
            <Route path={Paths.Products}>
              <Route index element={<Elements.Products />} />
              <Route path=":id" element={<Elements.SingleProduct />} />
              <Route path="appWrite/:id" element={<Elements.AppwriteProduct />} />
            </Route>
          </Route>

          <Route element={<AuthOutlets/>}>
            <Route path={Paths.Login} element={<Elements.Login />} />
            <Route path={Paths.Register} element={<Elements.Register />} />
            <Route path={Paths.RecuperarPassword} element={<Elements.RecuperarPassword />} />
            <Route path={Paths.Verified} element={<Elements.Verified />} />
          </Route>

          <Route path="*" element={<Elements.Error404 />} />
        </Routes>
  )
}

export default AppRoutes