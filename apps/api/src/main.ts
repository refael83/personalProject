import morgan from "morgan";
import cors from "cors";
import pg from 'pg';
import { ApolloServer } from 'apollo-server';
import { makeSchemaAndPlugin } from 'postgraphile-apollo-server';
import http from "http";
import express,{ request, response} from 'express'
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import dotenv from "dotenv";

dotenv.config();

    const pgPool = new pg.Pool({
      connectionString:process.env.DB_USERS,
  });
  


  const app = express();
  const httpServer = http.createServer(app);
  
  const main = async() => {
    const { schema, plugin } = await makeSchemaAndPlugin(
      pgPool,
      'app_public', 
      {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        ownerConnectionString: 'owner',
        jwtSecret: process.env.JWT_SECRET_KEY as string,
        jwtPgTypeIdentifier: "app_public.jwt_token",
        pgDefaultRole: true,
        
      }
    );

    const server = new ApolloServer({
      schema,
      plugins: [plugin ,ApolloServerPluginDrainHttpServer({ httpServer }), ],
      context: ({ request, response })

    });

    app.use(
      "/graphql",
      cors(),
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
