"use client";

import Image from "next/image";
import { memo } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Skillset = memo(function Skillset({ skills }) {
  const colorScheme = { mode: "light" };
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Object.keys(skills).map((key, index) => (
        <Card
          key={index}
          className="border-border/70"
        >
          <CardHeader className="pb-2">
            <span className="text-sm font-semibold text-[var(--section-title)]">
              {key}
            </span>
          </CardHeader>
          <CardContent className="pt-0">
            <Image
              alt={key}
              width={80 * skills[key].length}
              height={80}
              priority
              loading="eager"
              quality={90}
              src={`https://skillicons.dev/icons?i=${skills[key].join(",")}&theme=${colorScheme.mode === undefined ? "light" : colorScheme.mode}`}
              className="h-10 w-auto"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

export default Skillset;
