"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function Comments() {
  const { resolvedTheme } = useTheme();
  const ref = useRef(null);

  const theme = resolvedTheme === "dark" ? "dark" : "light";
  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "park-jihoo/park-jihoo.github.io");
    scriptElem.setAttribute("data-repo-id", "R_kgDOJAfUTw");
    scriptElem.setAttribute("data-category", "General");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOJAfUT84Cas-2");
    scriptElem.setAttribute("data-mapping", "url");
    scriptElem.setAttribute("data-strict", "1");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", "ko");

    ref.current.appendChild(scriptElem);
  }, [theme]);

  useEffect(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "*",
    );
  }, [theme]);
  return (
    <div className="p-3">
      <div ref={ref} className="comments" />
    </div>
  );
}
