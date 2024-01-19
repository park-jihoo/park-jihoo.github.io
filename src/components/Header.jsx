'use client';

import Link from 'next/link';
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import IconButton from '@mui/material/IconButton';
import { DarkMode, LightMode } from '@mui/icons-material';

export default function Header(props) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <>
      <AppBar position="fixed" enableColorOnDark>
        <Toolbar>
          <Avatar
            src="https://avatars.githubusercontent.com/u/67787453"
            onClick={() => router.push('/')}
            alt="Park Jihoo"
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            onClick={props.toggleTheme}
            color="inherit"
            aria-label="mode"
          >
            {theme.palette.mode === 'light' ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Button color="inherit" aria-label="notes" href="/notes">
            Notes
          </Button>
          <Button color="inherit" aria-label="algorithm" href="/algorithm">
            Algorithm
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
