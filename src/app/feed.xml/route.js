import RSS from "rss";
import { getAlgorithmParams, getAlgorithms } from "@/app/utils";
import { NotionAPI } from "notion-client";
import { NextResponse } from "next/server";

export async function generateStaticParams() {
  return "feed.xml";
}

export async function GET() {
  const feed = new RSS({
    title: "Park Jihoo",
    description: "Park Jihoo's Blog",
    feed_url: "https://park-jihoo.github.io/feed.xml",
    site_url: "https://park-jihoo.github.io",
    language: "ko",
    pubDate: new Date().toISOString(),
  });

  const algorithms = await getAlgorithms();
  const params = getAlgorithmParams(algorithms);

  for (const param of params) {
    feed.item({
      title: param.slug,
      description: param.slug,
      url: `https://park-jihoo.github.io/algorithm/${param.platform}/${param.difficulty}/${param.slug}`,
      guid: `https://park-jihoo.github.io/algorithm/${param.platform}/${param.difficulty}/${param.slug}`,
      date: new Date().toISOString(),
    });
  }

  const notion = new NotionAPI();
  const notionPosts = (await notion.getPage("619787c75b60479886c147cf746bfbb8"))
    .block;

  Object.entries(notionPosts).forEach(([key, value]) => {
    if (value.value.properties) {
      feed.item({
        title: value.value.properties.title[0][0],
        description: value.value.properties.title[0][0],
        url: `https://park-jihoo.github.io/notes/${key}`,
        guid: `https://park-jihoo.github.io/notes/${key}`,
        date: new Date().toISOString(),
      });
    }
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
