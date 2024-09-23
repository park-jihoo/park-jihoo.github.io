import { addClassToHast, getSingletonHighlighter } from "shiki";
import CodeBlock from "@/components/CodeBlock";
import { getAlgorithmParams, getAlgorithms } from "@/app/utils";
import Comments from "@/components/Comments";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export async function generateStaticParams() {
  const algorithms = await getAlgorithms();
  return getAlgorithmParams(algorithms);
}

export default async function Page({ params }) {
  const algorithms = await getAlgorithms();
  const platform = decodeURIComponent(params.platform);
  const difficulty = decodeURIComponent(params.difficulty);
  const slug = decodeURIComponent(params.slug);
  const language = algorithms
    .filter((algorithm) => {
      const path = algorithm.path
        .split(".")
        .slice(0, algorithm.path.split(".").length - 1)
        .join(".");
      if (slug.split(".")[1] === undefined)
        return path === `${platform}/${difficulty}/${slug}/${slug}`;
      return (
        path ===
        `${platform}/${difficulty}/${slug}/${slug.split(".")[1].trim()}`
      );
    })
    .map((algorithm) =>
      algorithm.path
        .split(".")
        [algorithm.path.split(".").length - 1].toLowerCase(),
    );

  const languageMap = {
    c: "c",
    cpp: "cpp",
    cc: "cpp",
    py: "python",
    js: "javascript",
    java: "java",
    sql: "sql",
  };

  const paths = language.map((lang) => {
    if (slug.split(".")[1] === undefined)
      return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${slug}/${slug}.${lang.toLowerCase()}`;
    return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${slug}/${slug.split(".")[1].trim()}.${lang.toLowerCase()}`;
  });

  const highlighter = getSingletonHighlighter({
    langs: language.map((lang) => languageMap[lang]),
    themes: ["catppuccin-latte", "catppuccin-mocha"],
  });

  const codes = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(path);
      const text = await response.text();
      const lang = path.split(".")[path.split(".").length - 1];
      const light_html = (await highlighter).codeToHtml(text, {
        lang: languageMap[lang],
        theme: "catppuccin-latte",
        transformers: [
          {
            line(hast, line) {
              addClassToHast(hast, "whitespace-pre-wrap");
              addClassToHast(hast, "ml-2");
            },
          },
        ],
      });
      const dark_html = (await highlighter).codeToHtml(text, {
        lang: languageMap[lang],
        theme: "catppuccin-mocha",
        transformers: [
          {
            line(hast, line) {
              addClassToHast(hast, "whitespace-pre-wrap");
              addClassToHast(hast, "ml-2");
            },
          },
        ],
      });
      return { light: light_html, dark: dark_html, code: text };
    }),
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Badge>{platform}</Badge>
        <Badge>{difficulty}</Badge>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{slug}</h1>
        <Button variant="icon" size="icon" asChild>
          <Link
            href={
              platform === "leetcode"
                ? `https://leetcode.com/problems/${slug.split("-").slice(1).join("-")}`
                : platform === "프로그래머스"
                  ? `https://programmers.co.kr/learn/courses/30/lessons/${slug.split(".")[0]}`
                  : `https://www.acmicpc.net/problem/${slug.split(".")[0]}`
            }
          >
            <OpenInNewWindowIcon />
          </Link>
        </Button>
      </div>
      <Separator />
      <CodeBlock language={language} codes={codes} />
      <Separator />
      <Comments />
    </div>
  );
}