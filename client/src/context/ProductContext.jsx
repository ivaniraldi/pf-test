import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext()

const ProductProvider = ({children})=> {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})

    async function getProducts(){
        try {
            const res = await fetch("https://fakestoreapi.com/products")
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getProductById(id) {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await res.json()
            setProduct(data)
        } catch (error) {
            
        }
        
    }

    useEffect(()=>{
        getProducts()
    },[])

    return (
        <ProductContext.Provider value={{products, product, getProductById}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider