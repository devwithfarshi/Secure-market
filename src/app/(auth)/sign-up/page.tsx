"use client";
import { Icons } from "@/components/common/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import routenames from "@/data/rotues.data";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import {
  AuthCredentialvalidator,
  TAuthCredentialvalidator,
} from "@/validators/Auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAuthCredentialvalidator>({
    resolver: zodResolver(AuthCredentialvalidator),
  });

  const { data } = trpc.anyApiRoute.useQuery();
  console.log("🚀 ~ SignUp ~ data:", data);
  const onSubmitForm = async ({
    email,
    password,
  }: TAuthCredentialvalidator) => {
    console.log(email, password);
    // TODO: send data to the server
  };
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="size-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link
              href={routenames.signin}
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Allready have an account? Sign in.
              <ArrowRight className="size-4" />
            </Link>
          </div>
          {/* form start */}
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 capitalize font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="* * * * * * *"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 capitalize font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button disabled={isSubmitting} className="gap-2.5">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
