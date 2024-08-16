"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import routenames from "@/data/rotues.data";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/payload-types";
import Link from "next/link";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
          <Button variant="ghost" size={"sm"}>
            My Account
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white w-60" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-medium text-sm text-black">{user.email}</p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/sell">Seller Dashboard</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default UserAccountNav;
