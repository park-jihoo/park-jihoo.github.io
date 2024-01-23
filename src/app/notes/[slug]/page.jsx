import * as React from "react";
import { NotionAPI } from "notion-client";
import { NotionPage } from "@/components/NotionPage";
import Comments from "@/components/Comments";

const notion = new NotionAPI();
export async function generateStaticParams() {
  const pages = await notion.getPage("619787c75b60479886c147cf746bfbb8");
  return Object.keys(pages.block).map((pageId) => ({
    slug: pageId,
  }));
}

export default async function Page({ params }) {
  const pageId = params.slug;

  const recordMap = await notion.getPage(pageId);

  return (
    <div>
      <NotionPage recordMap={recordMap} comments />
    </div>
  );
}
