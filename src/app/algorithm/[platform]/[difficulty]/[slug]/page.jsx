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
  const problem_name = decodeURIComponent(params.slug);
  const problem_name_without_extension = problem_name.split(".")[0];
  const algorithm = algorithms.find((algorithm) => {
    if (algorithm.problem_name === problem_name_without_extension) return true;
    if (algorithm.problem_name === problem_name) return true;
    return false;
  });
  if (!algorithm) {
    return <div>문제를 찾을 수 없습니다.</div>;
  }

  const language = algorithm.languages?.split(",") || [];

  if (language.includes("Unknown")) {
    return <div>언어를 찾을 수 없습니다.</div>;
  }

  const languageMap = {
    C: "c",
    "C++": "cpp",
    Python: "py",
    Java: "java",
    JavaScript: "js",
    SQL: "sql",
  };

  const paths = language.map((lang) => {
    if (problem_name.split(".")[1] === undefined)
      return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${problem_name}/${problem_name}.${languageMap[lang]}`;
    else if (lang === "C++")
      return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${problem_name}/${problem_name.split(".")[1].trim()}.cc`;
    else
      return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${problem_name}/${problem_name.split(".")[1].trim()}.${languageMap[lang]}`;
  });

  
  const highlighter = getSingletonHighlighter({
    langs: language.map((lang) => lang.toLowerCase()).filter((lang) => lang !== "unknown"),
    themes: ["catppuccin-latte", "catppuccin-mocha"],
  });

  const codes = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(path);
      const text = await response.text();
      const lang = path.split(".")[path.split(".").length - 1];
      if (lang === "unknown") return { light: "", dark: "", code: "" };
      const light_html = (await highlighter).codeToHtml(text, {
        lang: lang === "cc" ? "cpp" : lang,
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
        lang: lang === "cc" ? "cpp" : lang,
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
        <h1 className="text-2xl font-bold">{problem_name}</h1>
        <Button variant="icon" size="icon" asChild>
          <Link
            href={
              platform === "leetcode"
                ? `https://leetcode.com/problems/${problem_name.split("-").slice(1).join("-")}`
                : platform === "프로그래머스"
                  ? `https://programmers.co.kr/learn/courses/30/lessons/${problem_name.split(".")[0]}`
                  : `https://www.acmicpc.net/problem/${problem_name.split(".")[0]}`
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
