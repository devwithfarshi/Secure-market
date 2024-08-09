"use client";

import { buttonVariants } from "@/components/ui/button";
import routenames from "@/data/rotues.data";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VerifyEmailProps {
  token: string;
}
const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="size-8 text-red-600" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <div className="text-muted-foreground text-sm">
          This token is not valid or might be expired.Please try again.
        </div>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 size-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" alt="The email was sent" fill />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Your email has been verified. You can now sign in.
        </p>
        <Link
          href={routenames.signin}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin size-8 text-zinc-300" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <div className="text-muted-foreground text-sm">
          That won&apos;t take long.
        </div>
      </div>
    );
  }
};
export default VerifyEmail;
