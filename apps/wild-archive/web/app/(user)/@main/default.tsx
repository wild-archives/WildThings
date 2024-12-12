import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Default() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-3">
      <h1 className="text-2xl font-bold">(O.o)?</h1>
      <h1 className="text-lg font-bold">It seems that you are missing?</h1>
      <Link href="/">
        <Button>GO HOME</Button>
      </Link>
    </div>
  );
}
