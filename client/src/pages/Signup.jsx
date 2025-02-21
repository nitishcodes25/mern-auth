import React from 'react'
import {Link} from 'react-router-dom'

export default function Signup() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" id="username" placeholder='Username' className='bg-slate-100 p-3 rounded-lg'/>
        <input type="email" id="email" placeholder='email' className='bg-slate-100 p-3 rounded-lg '/>
        <input type="password" id="password" placeholder='Password' className='bg-slate-100 p-3 rounded-lg '/>
        <button className='bg-slate-700 p-3 rounded-lg text-white my-3 uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
      </form>
      <div className="flex gap-2">
        <p >Have an account?</p>
        <Link to='/signin'>
        <span className='text-blue-500'>sign in</span>
        </Link>
      </div>
    </div>
  )
}
