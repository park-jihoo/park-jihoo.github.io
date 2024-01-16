import { NotionPage } from "@/components/NotionPage";
import { NotionAPI } from "notion-client";

export default async function Page() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("619787c75b60479886c147cf746bfbb8");
  return (
    <NotionPage
      recordMap={recordMap}
      rootPageId="619787c75b60479886c147cf746bfbb8"
    />
  );
}
