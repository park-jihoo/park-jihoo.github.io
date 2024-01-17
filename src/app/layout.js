"use client";

import "./globals.css";
import Header from "@/components/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";

export function generateMetaData() {
  return {
    title: "Park Jihoo",
    description: "Park Jihoo's personal website",
    image: "https://avatars.githubusercontent.com/u/24237865?v=4",
    url: "https://park-jihoo.github.io",
  };
}

const lightTheme = createTheme ({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme ({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({ children }) {
  const [themeMode, setThemeMode] = useState("light");
  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  }
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={
          themeMode === "light" ? lightTheme : darkTheme
        }>
          <CssBaseline />
          <body>
            <Header toggleTheme={toggleTheme}/>
            {children}
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
