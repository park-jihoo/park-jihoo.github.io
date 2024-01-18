"use client";

import "./globals.css";
import Header from "@/components/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cyan, lightGreen } from "@mui/material/colors";

export function generateMetaData() {
  return {
    title: "Park Jihoo",
    description: "Park Jihoo's personal website",
    image: "https://avatars.githubusercontent.com/u/24237865?v=4",
    url: "https://park-jihoo.github.io",
    "google-site-verification": "kQoktB1lk0tqFRLs4-vqhVfEVWlRMX8VRQtLC_L09uw",
    "naver-site-verification": "0581245626108d8ea24cc4d24a30ee84c0394ce6",
  };
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightGreen[500],
      dark: lightGreen[700],
      light: lightGreen[300],
    },
    secondary: {
      main: cyan[500],
      dark: cyan[700],
      light: cyan[300],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  primary: {
    main: lightGreen[500],
    dark: lightGreen[700],
    light: lightGreen[300],
  },
  secondary: {
    main: cyan[500],
    dark: cyan[700],
    light: cyan[300],
  },
});

export default function RootLayout({ children }) {
  const [themeMode, setThemeMode] = useState("light");
  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          <body>
            <Header toggleTheme={toggleTheme} />
            {children}
          </body>
          <GoogleAnalytics gaId="G-5H39DYHZK8" />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
