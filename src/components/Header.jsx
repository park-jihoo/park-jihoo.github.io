"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center p-4">
      <Avatar>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/67787453"
          onClick={() => router.push("/")}
          alt="Park Jihoo"
        />
      </Avatar>
      <div className="space-x-4">
        <Button variant="text" onClick={() => router.push("/notes")}>
          NOTES
        </Button>
        <Button variant="text" onClick={() => router.push("/algorithm")}>
          ALGORITHM
        </Button>
      </div>
    </nav>
  );
}
