import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router'
import { createContext } from './context';
import { checkConnection } from './sequelize/connectDB';
import  cors  from 'cors'
import { service } from './service';


 

export type AppRouter = typeof appRouter;


const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
  createContext: createContext
  });


const startServer = async () => {
  try {
    await checkConnection();
    server.listen(3000);
    console.log('listening on port 3000');
  } catch (error) {
    console.error('Error during server setup:', error);
    process.exit(1); 
  }
};

 startServer();
