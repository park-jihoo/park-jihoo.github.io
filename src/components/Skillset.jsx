"use client";

import Image from "next/image";
import { useColorScheme } from "@mui/material-next/styles";

export default function Skillset({ skills }) {
  const colorScheme = useColorScheme();
  return (
    <div>
      {Object.keys(skills).map((key, index) => (
        <div key={index}>
          {key}
          <Image
            alt={key}
            width={80 * skills[key].length}
            height={80}
            src={`https://skillicons.dev/icons?i=${skills[key].join(",")}&theme=${colorScheme.mode === undefined ? "light" : colorScheme.mode}`}
          />
        </div>
      ))}
    </div>
  );
}
