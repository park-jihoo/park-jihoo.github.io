"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

export default function Providers({ children }) {
  return (
    <div>
      <GoogleAnalytics gaId="G-5H39DYHZK8" />
      {children}
    </div>
  );
}
