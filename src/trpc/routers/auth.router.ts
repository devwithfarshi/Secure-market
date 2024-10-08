import { z } from "zod";
import { getPayloadClient } from "../../get-payload";
import { AuthCredentialvalidator } from "../../lib/validators/Auth.schema";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialvalidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();
      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        overrideAccess: true,
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      // create user
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),
  signIn: publicProcedure
    .input(AuthCredentialvalidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });
      return { success: true };
    }),
});
