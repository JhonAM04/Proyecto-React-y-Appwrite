import { Models } from "appwrite"

export type AppwriteResponse = {
    documents: Array<object>
    total: number
}

export interface Product extends Models.Document {
    title: string
    price: number
    active: boolean
    stock: number
    image: string
}

export interface Profile extends Models.Document {
    name: string
    profilePhoto: string
    email: string
    role: 'buyer' | 'seller'
}