import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material-next/IconButton";
import Button from "@mui/material-next/Button";
import {
  Article,
  Computer,
  DarkMode,
  DocumentScanner,
  LightMode,
} from "@mui/icons-material";
import { useColorScheme } from "@mui/material-next/styles";
import { Fragment } from "react";

export default function Header() {
  const router = useRouter();
  const { mode, setMode } = useColorScheme();
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
