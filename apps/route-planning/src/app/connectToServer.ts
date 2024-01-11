import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from "../../../routes-back/src/main"

export const trpc = createTRPCReact<AppRouter>();