import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const notify = () => toast("jaja que burro")
  const navigate = useNavigate()
  return (
    <div className="hero bg-base-200 min-h-screen p-16">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a onClick={notify} className="link link-hover">Forgot password?</a></div>
          <Toaster
  toastOptions={{
    className: '',
    style: {
      border: '1px solid #e6c4d4ff',
      padding: '16px',
      color: '#713200',
    },
  }}
          ></Toaster>
          <button onClick={()=>{navigate("/home")}} className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
  )
}
