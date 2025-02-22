import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signin() {
  const [formData,setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const [error, setError]= useState(false)
  const onChangeHandler = (e) => {
    setFormData(prevData => ({...prevData,[e.target.id]: e.target.value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      console.log({data})
      if(data.success === false){
        setError(true)
        return
      }
    }
    catch(err){
      setLoading(false)
      setError(true)
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-3xl text-center my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={onChangeHandler}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={onChangeHandler}
        />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white my-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading? 'Loading': 'sign in'}
        </button>
      </form>
      <div className="flex gap-2">
        <p>Not having account?</p>
        <Link to="/signup">
          <span className="text-blue-500">sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 my-5">Something went wrong</p>}
    </div>
  )
}
