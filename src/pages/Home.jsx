import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        voluptate.
      </p>

      <Button asChild>
        <Link href="/about">About</Link>
      </Button>
    </div>
  );
}
