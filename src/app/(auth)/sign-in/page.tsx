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
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  // TODO: start here and change the code below for the sign in page
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialvalidator>({
    resolver: zodResolver(AuthCredentialvalidator),
  });

  const { mutate, isLoading: isSubmitting } = trpc.auth.signin.useMutation({
    // TODO: add signin into auth router
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");
        return;
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
      toast.error("An error occurred. Please try again later.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(
        `We've sent a verification link to ${sentToEmail}. Please check your inbox.`
      );
      router.push(`${routenames.verify}?to=${sentToEmail}`);
    },
  });

  const onSubmitForm = async ({
    email,
    password,
  }: TAuthCredentialvalidator) => {
    mutate({ email, password });
  };
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="size-20" />
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
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
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
