import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './views/Landing'
import NotFound from './views/NotFound'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import Cart from './views/Cart'
import Detail from './views/Detail'
import Profile from './views/Profile'

function App() {
  const [date, setDate] = useState("")
  const apiURL = import.meta.env.VITE_BACKEND_URL

  const getTimeFromAPI = async () => {
    try {
      let response = await fetch(apiURL + "/hora")
      let data = await response.json()
      let newDate = new Date(data)
      setDate(newDate)
    } catch (error) {
      alert("Api no esta funcionando")
      console.log(error)
    }
  }

  useEffect(()=>{
    getTimeFromAPI()
  },[])


  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
