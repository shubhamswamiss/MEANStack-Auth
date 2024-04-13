import { CreateError } from "../utils/error"

export const getAllUsers = async (req,res,next)=>{
    try {
        
    } catch (error) {
       return next(CreateError(500,'Internal Server Error!')); 
    }
}

export const getById = async (req,res,next)=>{
     try {
        
     } catch (error) {
        return next(CreateError(500,'Internal Server Error!'));   
     }
}