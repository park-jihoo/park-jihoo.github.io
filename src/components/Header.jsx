"use client";

import { PenTool, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAVIGATION_ITEMS = [
  {
    label: "NOTES",
    href: "/notes",
    icon: PenTool,
  },
  {
    label: "ALGORITHM",
    href: "/algorithm",
    icon: Rocket,
  },
];

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <nav className="container flex h-16 items-center justify-between px-4">
        <Avatar 
          className="cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
          onClick={() => router.push("/")}
        >
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/67787453"
            alt="Park Jihoo"
            className="rounded-full"
          />
        </Avatar>
        
        <div className="flex items-center space-x-4 md:space-x-6">
          {NAVIGATION_ITEMS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              onClick={() => router.push(item.href)}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out"
              aria-label={`Go to ${item.label} page`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span className="hidden md:inline-block">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </header>
  );
}
