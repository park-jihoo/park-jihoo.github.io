"use client";

import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { createTheme, CssBaseline, ScopedCssBaseline, ThemeProvider } from "@mui/material";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cyan, deepPurple } from "@mui/material/colors";
import Header from "@/components/Header";
import { CssVarsProvider, extendTheme } from "@mui/material-next";

export function generateMetaData() {
  return {
    title: "Park Jihoo",
    description: "Park Jihoo's personal website",
    image: "https://avatars.githubusercontent.com/u/24237865?v=4",
    url: "https://park-jihoo.github.io",
    "google-site-verification": "kQoktB1lk0tqFRLs4-vqhVfEVWlRMX8VRQtLC_L09uw",
    "naver-site-verification": "0581245626108d8ea24cc4d24a30ee84c0394ce6",
    metadataBase: new URL("https://park-jihoo.github.io")
  };
}

const md3Theme = extendTheme({
  ref: {
    palette: {
      primary: deepPurple,
      secondary: cyan
    }
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: deepPurple[300],
          dark: deepPurple[500],
          light: deepPurple[100]
        },
        secondary: {
          main: cyan[300],
          dark: cyan[500],
          light: cyan[100]
        }
      }
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: deepPurple[700],
          dark: deepPurple[900],
          light: deepPurple[500]
        },
        secondary: {
          main: cyan[700],
          dark: cyan[900],
          light: cyan[500]
        }
      }
    }
  },
  cssVarPrefix: "md3"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <CssBaseline enableColorScheme />
      <AppRouterCacheProvider>
        <ThemeProvider theme={md3Theme}>
          <CssVarsProvider theme={md3Theme} defaultColorScheme="light">
            <GoogleAnalytics gaId="G-5H39DYHZK8" />
            <body>
            <Header />
            {children}
            </body>
          </CssVarsProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
