import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/signin.jsx'
import Signup from './pages/signup.jsx'
import About from './pages/about.jsx'
import Home from './pages/home.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App