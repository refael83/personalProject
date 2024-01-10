import { service }  from './service'
import { airportInstance } from './connectDB/airports';
import { z } from 'zod'
import { publicProcedure, router } from './trpc';
import airport from './connectDB/interfaces';


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
    .input ( z.string()) 
    .query(async ( opts) => { 
        const start = opts.input
        return await service.recommendRoutes(start)
    }),
    getAllAirports: publicProcedure
    .query(async () => {
      const airports = await service.getAllAirports()
      const result: airport[] = airports
       

      return result
    })
  });