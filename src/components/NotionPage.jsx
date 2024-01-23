"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { getPageTitle } from "notion-utils";
import { useColorScheme } from "@mui/material-next/styles";
import Comments from "@/components/Comments";
import { Paper } from "@mui/material";

const Code = dynamic(() => import("@/components/Code").then((m) => m.Code));
const Collection = dynamic(() =>
  import("@/components/Collection").then((m) => m.Collection),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  },
);

const NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false },
);

export function NotionPage({ recordMap, rootPageId, comments }) {
  if (!recordMap) return null;
  const title = getPageTitle(recordMap);
  const { mode } = useColorScheme();
  return (
    <Paper>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={mode === "dark"}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          nextLink: Link,
        }}
        showCollectionViewDropdown={false}
        mapPageUrl={(pageId) => `/notes/${pageId}`}
        className="mx-auto"
        fullPage
        disableHeader
      />
      {comments && <Comments />}
    </Paper>
  );
}
