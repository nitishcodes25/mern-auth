import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signinFailure, signinStarted, signinSuccess } from "../store/slice/userSlice";

export default function OAuth() {
// const {loading} = useSelector(state=> state.user)
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
        console.log({userData})
        const res = await fetch('/api/auth/google',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        console.log({res})
        const data = await res.json()
        console.log({data})
        dispatch(signinSuccess(data))
    }
    catch(err){
        dispatch(signinFailure(err))
        console.log("Failed to login via google oauth", err)
    }
 }

  return (
    <button
      type ="button"
    //   disabled={loading}
      onClick={onGoogleHandle}
      className="bg-red-700 p-3 rounded-lg text-white mb-3 uppercase hover:opacity-95 disabled:opacity-80"
    >
      Continue with Google
    </button>
  );
}
