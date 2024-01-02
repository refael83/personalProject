import { service }  from './service'
import { z } from 'zod'
import { publicProcedure, router } from './trpc';


export const appRouter = router({
    getAllRoutes: publicProcedure
    .query(async () => {
      return await service.getAllRoutes()
    }),
    getRouteById: publicProcedure
    .input(z.number())
    .query(async ( opts ) => {
      const id = opts.input;
      return await service.getRouteById(id as number)
    }),
    // recommendRoutes: publicProcedure
    // .input( ({ starting, distinction }) => {
    //   return { starting, distinction }
    // })
    // .query(async ({ input }) => { 
        
    // }),
    getAllAirports: publicProcedure
    .query(async () => {
      return await service.getAllAirports()
    })
  });