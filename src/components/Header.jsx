"use client";

import { PenTool, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAVIGATION_ITEMS = [
  { label: "NOTES", href: "/notes", icon: PenTool },
  { label: "ALGORITHM", href: "/algorithm", icon: Rocket },
];

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Avatar
          className="cursor-pointer size-10 ring-2 ring-border/50 transition-all duration-300 hover:scale-105 hover:ring-primary/40"
          onClick={() => router.push("/")}
        >
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/67787453"
            alt="Park Jihoo"
            className="rounded-full"
          />
        </Avatar>

        <div className="flex items-center gap-1 md:gap-2">
          {NAVIGATION_ITEMS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              onClick={() => router.push(item.href)}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/80"
              aria-label={`Go to ${item.label} page`}
            >
              <item.icon className="mr-2 size-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
