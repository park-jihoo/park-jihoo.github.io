"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { CssBaseline, Experimental_CssVarsProvider, getInitColorSchemeScript } from "@mui/material";
import { CssVarsProvider, extendTheme } from "@mui/material-next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { cyan, deepPurple } from "@mui/material/colors";

const md3Theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: deepPurple[300],
          dark: deepPurple[500],
          light: deepPurple[100],
        },
        secondary: {
          main: cyan[300],
          dark: cyan[500],
          light: cyan[100],
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: deepPurple[700],
          dark: deepPurple[900],
          light: deepPurple[500],
        },
        secondary: {
          main: cyan[700],
          dark: cyan[900],
          light: cyan[500],
        },
      },
    },
  },
  cssVarPrefix: "md3",
});

export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider>
      <CssVarsProvider theme={md3Theme}>
        <Experimental_CssVarsProvider theme={md3Theme}>
          <CssBaseline enableColorScheme />
          <GoogleAnalytics gaId="G-5H39DYHZK8" />
          {getInitColorSchemeScript()}
          {children}
        </Experimental_CssVarsProvider>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
}