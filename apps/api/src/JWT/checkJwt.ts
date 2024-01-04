import Jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { makeExtendSchemaPlugin, gql } from "graphile-utils"
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

const login = makeExtendSchemaPlugin(build =>{
  const { pgSql: sql } = build;
  return {
    typeDefs:gql`
    extend type Query{
      login(email: String!, password: String!): RegisterUserResponse
    }
    `,
    resolvers:{
      Query:{
        login: async (
          parent: string,
          args: { email: string; password: string },
        ): Promise<{ user: UserInterface; accessToken: string }> => {
          try {
            const logInUser = args;
            const user = await loginService(logInUser);
      
            if (user) {
              const accessToken = Jwt.generateAccessToken(user);
              return { user, accessToken };
            }
            throw new Error("Incorrect email or password");
          } catch (error) {
            console.error(error);
            throw new Error("Server error while logging in");
          }
        }
      }
    }
  }
})

export const generateAccessToken=(email, isAdmin, username)=> {
    const user = {
      username: username,
      email: email,
      isAdmin
    }
    const secretKey="secret"
    return Jwt.sign( user, secretKey)
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
  
  
