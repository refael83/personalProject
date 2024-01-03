import Jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
// import { getUserById } from "../users/userDal";
// import { UserInterface } from "../interfaces/userInterface"
dotenv.config();

interface UserInterface{
    id:number
    username:string,
    email:string,
    password:string,
    isAdmin:boolean
}

//  const isAdmin = (user:UserInterface) => {
//   return user.isadmin? true: false
// }

// const urlNeedAdmin = (url:string) => {
//   const needAdmin:string[] = ['/api/users/']
//   return needAdmin.includes(url)
// }

export const generateAccessToken=(user:UserInterface)=> {
    const secretKey="secret"
    return Jwt.sign( String(user.id), secretKey)
  }

export const verifyToken =  (token: string | null) => {
    const secretKey:string = "secret"
    console.log('verify')
    Jwt.verify(token,secretKey,async(err,) => {
        if (err) return false
    })
    return true
}


  export const getUser = async (token:string) => {
    try {
      if (token) {
        const user = Jwt.verify(token, process.env.SECRET_TOKEN_KEY as string);
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  };
  
  
