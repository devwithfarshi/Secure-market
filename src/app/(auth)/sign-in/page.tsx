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
} from "@/lib/validators/Auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useEffect, useState } from "react";
const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };
  const continueAsBuyer = () => {
    router.replace(routenames.signin, undefined);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialvalidator>({
    resolver: zodResolver(AuthCredentialvalidator),
  });

  const { mutate: signIn, isLoading: isSubmitting } =
    trpc.auth.signIn.useMutation({
      onSuccess: () => {
        toast.success("Signed in successfully.");
        router.refresh();
        if (origin) {
          router.push(`/${origin}`);
          return;
        }
        if (isSeller) {
          router.push(routenames.admin);
          return;
        }
        router.push(routenames.home);
        router.refresh();
      },
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
          toast.error("Invalid email or password.");
        }
      },
    });

  const onSubmitForm = async ({
    email,
    password,
  }: TAuthCredentialvalidator) => {
    signIn({ email, password });
  };
  useEffect(() => {
    toast.info("Use 'demo' credentials to view the project.", {
      duration: 5000,
    });
  }, []);
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="size-20" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller && "seller"} account
            </h1>
            <Link
              href={routenames.signup}
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Don&apos;t have an account? Sign up.
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
                    defaultValue={"demo@demo.com"}
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
                    defaultValue={"demo1234"}
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
                      <span>processing...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or{" "}
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isSubmitting}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                variant="secondary"
                disabled={isSubmitting}
                onClick={continueAsSeller}
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
