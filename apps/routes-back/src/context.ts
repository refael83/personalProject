import { verifyToken } from './jwt';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';


export const createContext = async (opts: CreateNextContextOptions) => {
  async function getUserFromHeader() {
    if (opts.req.headers.authorization) {
      const user = await verifyToken(
        opts.req.headers.authorization,
      );
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
  
};
export type Context = Awaited<ReturnType<typeof createContext>>;