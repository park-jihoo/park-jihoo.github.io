"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { useEffect,useState } from "react";

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div>
        <GoogleAnalytics gaId="G-5H39DYHZK8" />
        {children}
      </div>
    );
  }
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
