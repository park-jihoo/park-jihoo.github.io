"use client";
import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { getPageTitle } from "notion-utils";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);
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

export const NotionPage = ({ recordMap, rootPageId }) => {
  if (!recordMap) return null;
  const title = getPageTitle(recordMap);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
      </Head>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
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
      />
    </>
  );
};
