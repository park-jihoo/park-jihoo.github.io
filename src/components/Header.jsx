"use client";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import Button from "@mui/material-next/Button";
import {
  Article,
  Computer,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useColorScheme } from "@mui/material-next/styles";
import { Fragment } from "react";
import { useColorScheme as useColorSchemeMD2 } from "@mui/material/styles";
import dynamic from "next/dynamic";

const IconButton = dynamic(() => import("@mui/material-next/IconButton"), {
  ssr: false,
});

export default function Header() {
  const router = useRouter();
  const { mode, setMode } = useColorScheme();
  const { mode: modeMD2, setMode: setModeMD2 } = useColorSchemeMD2();
  return (
    <>
      <AppBar position="fixed" enableColorOnDark>
        <Toolbar>
          <Avatar
            src="https://avatars.githubusercontent.com/u/67787453"
            onClick={() => router.push("/")}
            alt="Park Jihoo"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              setMode(mode === "dark" ? "light" : "dark");
              setModeMD2(modeMD2 === "dark" ? "light" : "dark");
            }}
            color="inherit"
            aria-label="mode"
          >
            {mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Button
            color="inherit"
            aria-label="notes"
            href="/notes"
            startIcon={<Article />}
          >
            NOTES
          </Button>
          <Button
            color="inherit"
            aria-label="algorithm"
            href="/algorithm"
            startIcon={<Computer />}
          >
            ALGORITHM
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
