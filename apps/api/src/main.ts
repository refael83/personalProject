 //import { post }  from './connectToUsers/postgraphile'
// import express,{Request, Response, NextFunction, request} from 'express'
 import bodyParser from 'body-parser'
// import { verifyToken, generateAccessToken } from './JWT/checkJwt'
 import morgan from "morgan";
 import cors from "cors";

// const app = express()

// const  PORT  = 3333


// app.use(cors({origin: ['http://localhost:4200']}))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(morgan('tiny'))
// app.use(async (req: Request, res: Response, next: NextFunction) =>{
//     const queryName = req.body.operationName
//     console.log(queryName)
//     if(queryName == 'signIn'){
//       next()
//     }
//     else{
//     const token = req.headers['authorization']
//     console.log(req.body)
//     if(!token){
//         console.log(token)
//         return res.status(401).json("no token found")
//     }
//     else if( await verifyToken(token))
//         return res.sendStatus(403)
//     else
//      next()
//   }
// } )
// app.use(post => {
  
// })


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

import pg from 'pg';
import { ApolloServer } from 'apollo-server';
import { makeSchemaAndPlugin } from 'postgraphile-apollo-server';
import http from "http";
import express,{Request, Response, NextFunction, request, response} from 'express'
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

    const pgPool = new pg.Pool({
      connectionString:"postgres://refael:TsnsYeIeGjnc7K3kK3AG3dPIO0Et1JPu@dpg-cm3v0s8cmk4c73cg1hjg-a.oregon-postgres.render.com:5432/users?sslmode=true"
  });
  
  interface MyContext {
    token?: string;
  }

  const app = express();
const httpServer = http.createServer(app);
  
  const main = async() => {
    const { schema, plugin } = await makeSchemaAndPlugin(
      pgPool,
      'public', 
      {
        watchPg: false,
        graphiql: true,
        enhanceGraphiql: true,
        ownerConnectionString: 'owner',
      }
    );

    const server = new ApolloServer({
      schema,
      plugins: [plugin ,ApolloServerPluginDrainHttpServer({ httpServer }), ],
      context: ({ request, response })

    });

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      express.json(),
      morgan("tiny"),
    );
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
   }


main().catch(e => {
  console.error(e);
  process.exit(1);
});