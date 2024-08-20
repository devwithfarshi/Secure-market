import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";
import routenames from "./data/rotues.data";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { user } = await getServerSideUser(cookies);
  if (
    user &&
    [routenames.signin, routenames.signup].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }
  return NextResponse.next();
}
