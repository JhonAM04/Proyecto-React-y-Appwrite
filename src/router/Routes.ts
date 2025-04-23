import { lazy } from 'react'
import LoaderLayout from '../shared/layouts/LoaderLayout'


export const Elements = {
    Home : LoaderLayout(lazy(()=> import('../pages/Home'))) ,
    Login : LoaderLayout(lazy(()=> import('../pages/auth/Login'))),
    Register : LoaderLayout(lazy(()=> import('../pages/auth/Register'))),
    Error404 : LoaderLayout(lazy(()=> import('../pages/Error404'))),
    SingleProduct : LoaderLayout(lazy(()=> import('../pages/SingleProduct'))),
    Products : LoaderLayout(lazy(()=> import('../pages/Products'))),
    AppwriteProduct : LoaderLayout(lazy(()=> import('../pages/AppwriteProduct'))),
    RecuperarPassword: LoaderLayout(lazy(()=> import('../pages/auth/RecuperarPassword'))),
    Verified: LoaderLayout(lazy(()=> import('../pages/auth/Verified'))),
    UpArchivo: LoaderLayout(lazy(()=> import('../pages/UpArchivo'))),
    Receipt: LoaderLayout(lazy(()=> import('../pages/Receipt'))),
    CompraExitosa: LoaderLayout(lazy(()=> import('../pages/CompraExitosa')))
}

export const Paths = {
    Home: '/',
    Products: '/products',
    Register : '/register',
    Login : '/login',
    RecuperarPassword : '/forgetpassword',
    Verified: '/verificacion',
    UpArchivo: '/uparchivo',
    Receipt: '/receipt',
    CompraExitosa: '/compra'
}