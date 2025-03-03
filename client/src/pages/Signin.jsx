import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { resetState, signinFailure, signinStarted, signinSuccess } from '../store/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

export default function Signin() {
  const {loading, error} = useSelector(state => state.user)
  const [formData,setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setFormData(prevData => ({...prevData,[e.target.id]: e.target.value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      dispatch(signinStarted())
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(signinFailure(data))
        return
      }
      dispatch(signinSuccess(data))
      navigate('/')
    }
    catch(err){
      dispatch(signinFailure(err))
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
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white mt-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading? 'Loading': 'sign in'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2">
        <p>Not having account?</p>
        <Link to="/signup">
          <span className="text-blue-500">sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 my-5">{error.message || 'Something went wrong'}</p>}
    </div>
  )
}
