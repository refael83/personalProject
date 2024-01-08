import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import { checkConnection } from './connectDB/connectDB';
import { service } from './service';
import  { dal} from './dal'
import  cors  from 'cors'


 

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});


const startServer = async () => {
  try {
    await checkConnection();
    server.listen(3000);
    const test = async () =>{
    const result=await service.recommendRoutes('JFK') 
    console.log(result)
    }
    test()
    console.log('listening on port 3000');

  } catch (error) {
    console.error('Error during server setup:', error);
    process.exit(1); 
  }
};

 startServer();
