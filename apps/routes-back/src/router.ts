import { service }  from './service'
import { z } from 'zod'
import { airport } from './sequelize/interfaces'
import {initTRPC, TRPCError } from '@trpc/server';
import { createContext } from './context';


const inputSchema = z.tuple([z.string(), z.string()]);

const t = initTRPC.context<typeof createContext>().create();
const { createCallerFactory, router } = t;


export const appRouter = router({
    getAllRoutes: t.procedure
    .query(async () => {
      return await service.getAllFlights()
    }),
    getRouteById: t.procedure
    .input(z.number())
    .query(async ( opts ) => {
      const id = opts.input;
      return await service.getRouteById(id)
    }),
    recommendFlights: t.procedure
    .input ( inputSchema ) 
    .query( async (opts) => { 
      if (!opts.ctx.user){
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      const [start, destination] = inputSchema.parse(opts.input);
      return await service.recommendFlights(start, destination)
    }),
    getAllAirports: t.procedure
    .query(async () => {      
      const airports = await service.getAllAirports()
      const result: airport[] = airports 
      return result

    })
  });

 export const createCaller = createCallerFactory(appRouter);