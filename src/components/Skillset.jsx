"use client";

import Image from "next/image";
import { useTheme } from "@mui/material/styles";

export default function Skillset({ skills }) {
  const theme = useTheme();
  return (
    <div>
      {Object.keys(skills).map((key, index) => (
        <div key={index}>
          {key}
          <Image
            alt={key}
            width="auto"
            height="auto"
            src={`https://skillicons.dev/icons?i=${skills[key].join(",")}&theme=${theme.palette.mode}`}
          />
        </div>
      ))}
    </div>
  );
}
