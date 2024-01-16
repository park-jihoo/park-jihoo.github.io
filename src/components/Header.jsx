"use client";

import Link from "next/link";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import {useRouter} from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar src="https://avatars.githubusercontent.com/u/67787453" onClick={() => router.push("/")}/>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button color="inherit">
          <Link href="/notes">Notes</Link>
        </Button>
        <Button color="inherit">
          <Link href="/algorithm">Algorithm</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
