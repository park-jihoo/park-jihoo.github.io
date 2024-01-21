import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material-next/IconButton";
import Button from "@mui/material-next/Button";
import { Article, Computer, DarkMode, DocumentScanner, LightMode } from "@mui/icons-material";
import  {useColorScheme} from "@mui/material-next/styles";
import { Fragment } from "react";

export default function Header() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <Fragment>
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
              colorScheme.setMode(colorScheme.mode === "light" ? "dark" : "light")
            }}
            color="inherit"
            aria-label="mode"
          >
            { colorScheme.mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Button
            color="inherit"
            aria-label="notes"
            href="/notes"
            startIcon={<Article/>}
          >
            Notes
          </Button>
          <Button
            color="inherit"
            aria-label="algorithm"
            href="/algorithm"
            startIcon={<Computer/>}
          >
            Algorithm
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
