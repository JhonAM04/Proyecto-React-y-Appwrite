import { create } from "zustand"
import { DummyProduct } from "../../declaration/Dummyjson"
import { toast } from "sonner"

export type CartItem = {
    product: DummyProduct
    quantity: number
}

type Cart = {
    products: CartItem[]
    addToCart: (product: DummyProduct) => void
    deleteProduct: (productId: number) => void
    decreaseQuantity: (product: DummyProduct) => void
    clearCart: () => void
}

export const UseCartStore = create<Cart>((set)=>({
    products: [],
    addToCart: (product: DummyProduct) => set((prev) => {
        toast.success('Producto agregado al carrito',{
            description: product.title
        })

        const exist = prev.products.find(i => i.product.id == product.id)

        if(exist){
            return{
                products: prev.products.map(item => item.product.id == product.id ? { ...item, quantity: item.quantity + 1} : item)
            }
        }else{
            
            return{products: [...prev.products, { product, quantity: 1}]}

        }

    }),

    decreaseQuantity: (product: DummyProduct) => set((prev) => ({
        products: prev.products.map(item => item.product.id == product.id ? { ...item, quantity: item.quantity - 1} : item)
    })),

    deleteProduct: (productId: number) => set((prev) => ({
        products: prev.products.filter((item) => item.product.id !== productId)
    })),

    clearCart: () => set(() => ({
        products: []
    }))
    
}))

