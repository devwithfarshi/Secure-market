import { createTRPCReact } from "@trpc/react-query";
import type { TAppRouter } from "./";

export const trpc = createTRPCReact<TAppRouter>({});
