import { service }  from './service'
import { z } from 'zod'
import {initTRPC } from '@trpc/server';
import airport from './connectDB/interfaces';
import type { Context } from './context';

const inputSchema = z.tuple([z.string(), z.string()]);

const t = initTRPC.context<Context>().create();
const router = t.router;


export const appRouter = router({
  airports: t.router({
    getAllRoutes: t.procedure
    .query(async () => {
      return await service.getAllRoutes()
    }),
    getRouteById: t.procedure
    .input(z.number())
    .query(async ( opts ) => {
      const id = opts.input;
      return await service.getRouteById(id)
    }),
    recommendRoutes: t.procedure
    .input ( inputSchema ) 
    .query( async (opts) => { 
      const [start, destination] = inputSchema.parse(opts.input);
      return await service.recommendRoutes(start, destination)
    }),
    getAllAirports: t.procedure
    .query(async (opts) => {
      if (opts.ctx.user)
      const airports = await service.getAllAirports()
      const result: airport[] = airports 
      return result
    })
})
  });