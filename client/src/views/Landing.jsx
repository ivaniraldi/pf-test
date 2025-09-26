import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
   <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-accent">SykoStore</h1>
      <p className="mb-5 font-bold">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <div className='flex gap-2 justify-center'>

      <Link to={"/login"}>
      <button className="btn btn-primary">Iniciar Sesión</button>
      </Link>
      <button onClick={()=>{navigate("/register")}} className="btn">Registrarse</button>

      </div>
    </div>
  </div>
</div>
  )
}
