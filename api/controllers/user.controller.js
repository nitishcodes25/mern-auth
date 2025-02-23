import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res)=>{
    res.json({
        "name": "Nitish"
    })
}

export const updateUser = async(req,res,next) => {
    if(req.params.id !== req.user.id){
        next(errorHandler(401,"You can only update your account!"))
    }
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        },{new: true})
        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    }
    catch(err){
        next(err)
    }
}

export const deleteUser = async(req,res,next) => {
    if(req.params.id !== req.user.id){
        next(errorHandler(401,"You can only delete your account!!"))
    }
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "User deleted successfully!!"
        })
    }
    catch(err){
        next(err)
    }
}