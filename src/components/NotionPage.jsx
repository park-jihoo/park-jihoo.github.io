"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { getPageTitle } from "notion-utils";
import Comments from "@/components/Comments";
import { Card } from "@/components/ui/card";
import { NotionRenderer } from "react-notion-x";
import Image from "next/image";

const Code = dynamic(() => import("@/components/Code").then((m) => m.Code), {
  ssr: false,
});
const Collection = dynamic(() =>
  import("@/components/Collections").then((m) => m.Collection),
  {
    ssr: false,
  }
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
  {
    ssr: false,
  }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  },
);

export function NotionPage({ recordMap, rootPageId, comments }) {
  if (!recordMap) return null;
  const title = getPageTitle(recordMap);
  const { mode } = "light";
  return (
    <Card>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={mode === "dark"}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          nextImage: Image,
          nextLink: Link,
        }}
        showCollectionViewDropdown={false}
        mapPageUrl={(pageId) => `/notes/${pageId}`}
        className="mx-auto"
        fullPage
        disableHeader
      />
      {comments && <Comments />}
    </Card>
  );
}
