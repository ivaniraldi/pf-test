import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { ProductContext } from '../context/ProductContext'
import Hero from '../components/Hero'
import Carrousel from '../components/Carrousel'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'

export default function Home() {
  const { products } = useContext(ProductContext)
  console.log(products)
  return (
    <div>
      <Navbar/>
      <Hero></Hero>
      <Carrousel></Carrousel>
      <Gallery products={products}></Gallery>
      <Footer></Footer>
    </div>
  )
}
