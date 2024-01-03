import { post }  from './connectToUsers/postgraphile'
import express,{Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import { verifyToken } from './JWT/checkJwt'
//import morgan from "morgan";
import cors from "cors";
//import * as dotenv from "dotenv";
//import { ApolloServer } from "@apollo/server";
//import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
//import { expressMiddleware } from "@apollo/server/express4";
//import http from "http";

const app = express()

const  PORT  = 3333


app.use(cors({origin: ['http://localhost:4200']}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(async (req: Request, res: Response, next: NextFunction) =>{
    console.log(req)
    const token = req.['authorization']
    console.log(token)
    if(!token){
        console.log(token)
        return res.status(401).json("no token found")
    }
    else if( await verifyToken(token))
        return res.json({ message: "Token verification failed" }).sendStatus(403)
    else
     next()
} )
app.use(post)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const express = require("express");
const { postgraphile } = require("postgraphile");

const app = express();

app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://user:pass@host:5432/dbname",
    "public",
    {
      context: (req) => {
        // get the Authorization header from the request object
        const authHeader = req.headers["Authorization"];
        // do something with the header
      },
    }
  )
);

// in your resolver, you can access the context as the third argument
const resolver = (parent, args, context) => {
  // get the Authorization header from the context
  const authHeader = context["Authorization"];
  // do something with the header
};