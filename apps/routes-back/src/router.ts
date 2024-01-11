import { service }  from './service'
import { z } from 'zod'
import { publicProcedure, router } from './trpc';
import airport from './connectDB/interfaces';

const inputSchema = z.tuple([z.string(), z.string()]);


export const appRouter = router({
    getAllRoutes: publicProcedure
    .query(async () => {
      return await service.getAllRoutes()
    }),
    getRouteById: publicProcedure
    .input(z.number())
    .query(async ( opts ) => {
      const id = opts.input;
      return await service.getRouteById(id)
    }),
    recommendRoutes: publicProcedure
    .input ( inputSchema ) 
    .query( async (opts) => { 
      const [start, destination] = inputSchema.parse(opts.input);
        return await service.recommendRoutes(start, destination)
    }),
    getAllAirports: publicProcedure
    .query(async () => {
      const airports = await service.getAllAirports()
      const result: airport[] = airports
       

      return result
    })
  });