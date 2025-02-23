import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteFailure, deleteStarted, deleteSuccess, resetState, updateFailure, updateStarted, updateSuccess } from "../store/slice/userSlice";

export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [formData,setFormData] = useState({})
  const [isUpdateSuccess,setIsUpdateSuccess] = useState(false)
  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setFormData(prevFormData => ({...prevFormData,[e.target.id]:e.target.value}))
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    let reqData = formData;
    if(!formData.password || formData.password === ''){
      const {password,...rest} = formData
      reqData = rest
    }
    try{
      dispatch(updateStarted())
      const res = await fetch(`/api/user/updateUser/${currentUser._id}`,{
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(reqData)
      })
      const data = await res.json()
      console.log("data",data)
      if(data.success === false){
        dispatch(updateFailure(data))
        return
      }
      dispatch(updateSuccess(data))
      setIsUpdateSuccess(true)
    }
    catch(err){
      dispatch(updateFailure(err))
    }
  } 
  
  const handleDelete = async(e) => {
    try{
      dispatch(deleteStarted())
      const res = await fetch(`/api/user/deleteUser/${currentUser._id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json'
        },
      })
      const data = await res.json()
      console.log("data",data)
      if(data.success === false){
        dispatch(deleteFailure(data))
        return
      }
      dispatch(deleteSuccess(data))
    }
    catch(err){
      dispatch(deleteFailure(err))
    }
  } 

  const handleSignout = async() => {
    try{
      const res = await fetch(`/api/auth/signout`,{
        method: "GET",
        headers: {
          "Content-Type": 'application/json'
        },
      })
      dispatch(resetState())
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <img
          src={currentUser.profilePicture}
          alt="profilePicture"
          className="h-24 w-24 self-center rounded-full cursor-pointer object-cover"
          onChange={onChangeHandler}
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg mt-3"
          defaultValue={currentUser.username}
          onChange={onChangeHandler}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg mt-3"
          defaultValue={currentUser.email}
          onChange={onChangeHandler}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg mt-3"
          onChange={onChangeHandler}
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white mt-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading? "Loading": "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer" onClick={handleDelete}>Delete Account</span>
        <span className="text-red-500 cursor-pointer" onClick={handleSignout}>Sign out</span>
      </div>
      <p className="text-red-500 mt-5">{error && error.message}</p>
      <p className="text-green-500 mt-5">{isUpdateSuccess && "User data updated succesfully!!"}</p>
    </div>
  );
}
