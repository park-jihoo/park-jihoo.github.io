import { NextResponse } from "next/server";
import RSS from "rss";

import { getAlgorithmParams, getAlgorithms } from "@/app/utils";
import { getAllPagesFromDatabase, getPageTitle } from "@/lib/notion";

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

  // Notion 데이터베이스에서 페이지들을 RSS에 추가
  try {
    const databaseId = "619787c75b60479886c147cf746bfbb8";
    const databaseResponse = await getAllPagesFromDatabase(databaseId);
    
    if (databaseResponse && databaseResponse.results) {
      for (const page of databaseResponse.results) {
        const title = getPageTitle(page);
        feed.item({
          title: title,
          description: title,
          url: `https://park-jihoo.github.io/notes/${page.id}`,
          guid: `https://park-jihoo.github.io/notes/${page.id}`,
          date: page.created_time || new Date().toISOString(),
        });
      }
    }
  } catch (error) {
    console.error("Error fetching Notion pages for RSS:", error);
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
