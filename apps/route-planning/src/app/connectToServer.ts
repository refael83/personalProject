import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { AppRouter } from '../../../routes-back/src/main'

export const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000'
      })
    ]
  });