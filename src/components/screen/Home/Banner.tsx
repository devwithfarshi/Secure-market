import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import ProductReel from "@/components/common/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import routenames from "@/data/rotues.data";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const Banner = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your marketplace for high-quality{" "}
          <span className="text-blue-600">Digital assets</span>.
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to Secure Market. Evret assets on our platform is verified by
          our team to ensure our highest quality standards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href={routenames.products} className={buttonVariants()}>
            Browse Trending
          </Link>
          <Button variant={"ghost"}>
            Our quality promise
            <MoveRight className="text-gray-900 ml-2 size-4" />
          </Button>
        </div>
      </div>
      <ProductReel
        query={{ limit: 4, sort: "desc" }}
        title="Brand new"
        href={routenames.products}
      />
    </MaxWidthWrapper>
  );
};
export default Banner;
