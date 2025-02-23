import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyUser = async(req,res,next) => {
    const token = req.cookies.access_token
    if(!token){
        next(errorHandler(401,"You are not aunthenticated"))
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            next(errorHandler(403,"Token is not valid"))
        }
        req.user = user; 
        next()
    })
}