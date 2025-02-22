import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinFailure, signinStarted, signinSuccess } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
const navigate = useNavigate()
const dispatch = useDispatch()
 const onGoogleHandle = async() => {
    try{
        dispatch(signinStarted())
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)
        const userData = {
            username: result.user.displayName,
            email: result.user.email,
            profilePicture: result.user.photoURL
        }
        const res = await fetch('/api/auth/google',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await res.json()
        dispatch(signinSuccess(data))
        navigate('/')
    }
    catch(err){
        dispatch(signinFailure(err))
        console.log("Failed to login via google oauth", err)
    }
 }

  return (
    <button
      type ="button"
      onClick={onGoogleHandle}
      className="bg-red-700 p-3 rounded-lg text-white mb-3 uppercase hover:opacity-95 disabled:opacity-80"
    >
      Continue with Google
    </button>
  );
}
