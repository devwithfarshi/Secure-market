import { createTRPCReact } from "@trpc/react-query";
import { TAppRotuer } from "./";
export const trpc = createTRPCReact<TAppRotuer>({});
