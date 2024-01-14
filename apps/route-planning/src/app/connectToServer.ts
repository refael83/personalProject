import { 
    createTRPCReact,
    type inferReactQueryProcedureOptions
 } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from "../../../routes-back/src/main"

export const trpc = createTRPCReact<AppRouter>();
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;