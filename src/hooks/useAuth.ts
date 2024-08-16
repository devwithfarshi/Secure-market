import routenames from "@/data/rotues.data";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Logged out successfully");
      router.push(routenames.signin);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  return {
    signOut,
  };
};
