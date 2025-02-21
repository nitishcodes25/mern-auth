import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData,setFormData] = useState({})
  const [loading,setloading] = useState(false)
  const [error,setError] = useState(false)
  const onChangeHandler = (e) => {
    setFormData((prevData) => ({...prevData,[e.target.id]: e.target.value}))
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
     setloading(true)
     setError(false)
     const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setloading(false)
      if(data.success === false){
        setError(true)
        return
      }
    }
    catch(err){
      setloading(false)
      setError(true)
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-3xl text-center my-7">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={onChangeHandler}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
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
          {loading? 'Loading': 'sign up'}
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 my-5">Something went wrong</p>}
    </div>
  );
}
