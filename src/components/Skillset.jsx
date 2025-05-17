"use client";

import Image from "next/image";
import { memo } from "react";

const Skillset = memo(function Skillset({ skills }) {
  const colorScheme = { mode: "light" };
  return (
    <div>
      {Object.keys(skills).map((key, index) => (
        <div key={index}>
          {key}
          <Image
            alt={key}
            width={80 * skills[key].length}
            height={80}
            priority
            loading="eager"
            quality={90}
            src={`https://skillicons.dev/icons?i=${skills[key].join(",")}&theme=${colorScheme.mode === undefined ? "light" : colorScheme.mode}`}
          />
        </div>
      ))}
    </div>
  );
});

export default Skillset;
