"use client";

import { PenTool, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/ThemeToggle";
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Avatar
          className="cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out ring-2 ring-transparent hover:ring-primary/20"
          onClick={() => router.push("/")}
        >
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/67787453"
            alt="Park Jihoo"
            className="rounded-full"
          />
        </Avatar>

        <div className="flex items-center space-x-2 md:space-x-4">
          {NAVIGATION_ITEMS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              onClick={() => router.push(item.href)}
              className="flex items-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 ease-in-out"
              aria-label={`Go to ${item.label} page`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline-block font-medium">{item.label}</span>
            </Button>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
