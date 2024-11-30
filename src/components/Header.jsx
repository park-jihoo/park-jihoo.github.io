"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RocketIcon, Pencil1Icon } from "@radix-ui/react-icons";

export default function Header() {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center p-4">
      <Avatar className="cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/67787453"
          onClick={() => router.push("/")}
          alt="Park Jihoo"
          className="rounded-full"
        />
      </Avatar>
      <div className="space-x-6 flex items-center">
        <Button
          variant="text"
          onClick={() => router.push("/notes")}
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 ease-in-out"
        >
          <Pencil1Icon className="mr-2" />
          NOTES
        </Button>
        <Button
          variant="text"
          onClick={() => router.push("/algorithm")}
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 ease-in-out"
        >
          <RocketIcon className="mr-2" />
          ALGORITHM
        </Button>
      </div>
    </nav>
  );
}
