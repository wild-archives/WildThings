import ErrorSection from "@/components/error";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Default() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-3">
      <ErrorSection error="404 Page Not Found" />
      <Link href="/">
        <Button>导航返城</Button>
      </Link>
    </div>
  );
}
