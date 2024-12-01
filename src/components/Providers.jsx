"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <GoogleAnalytics gaId="G-5H39DYHZK8" />
        {children}
      </ThemeProvider>
    </div>
  );
}
