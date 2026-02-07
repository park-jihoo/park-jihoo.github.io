import {
  AlertCircle,
  ArrowLeft,
  Building,
  Calculator,
  ExternalLink,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { addClassToHast, getSingletonHighlighter } from "shiki";

import { getAlgorithmParams, getAlgorithms } from "@/app/utils";
import CodeBlock from "@/components/CodeBlock";
import Comments from "@/components/Comments";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateStaticParams() {
  const algorithms = await getAlgorithms();
  return getAlgorithmParams(algorithms);
}

export async function generateMetadata({ params }) {
  const algorithms = await getAlgorithms();
  const resolvedParams = await params;
  const platform = decodeURIComponent(resolvedParams.platform);
  const difficulty = decodeURIComponent(resolvedParams.difficulty);
  const problem_name = decodeURIComponent(resolvedParams.slug);

  const _algorithm = algorithms.find((algorithm) => {
    const problem_name_without_extension = problem_name.split(".")[0];
    if (algorithm.problem_name === problem_name_without_extension) return true;
    if (algorithm.problem_name === problem_name) return true;
    return false;
  });

  const title = `${problem_name} - ${platform} ${difficulty} 문제`;
  const description = `${platform}의 ${difficulty} 난이도 문제 "${problem_name}"의 솔루션 코드를 확인하세요.`;

  return {
    title,
    description,
    keywords: [
      `${platform}`,
      `${difficulty}`,
      `${problem_name}`,
      "알고리즘",
      "코딩테스트",
      "솔루션",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `/algorithm/${encodeURIComponent(platform)}/${encodeURIComponent(difficulty)}/${encodeURIComponent(problem_name)}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Static export: revalidate 제거 (output: 'export' 환경에서는 무의미)

const LANGUAGE_MAP = {
  C: "c",
  "C++": "cpp",
  Python: "py",
  Java: "java",
  JavaScript: "js",
  SQL: "sql",
};

function ErrorMessage({ message, showBackButton = true }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
      <Alert variant="destructive" className="border-destructive/50">
        <AlertCircle className="size-4" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      {showBackButton ? (
        <Button variant="outline" size="sm" asChild title="Back to algorithm list">
          <Link href="/algorithm">
            <ArrowLeft className="mr-1 size-4" />
            목록으로
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export default async function Page({ params }) {
  try {
    const algorithms = await getAlgorithms();
    const resolvedParams = await params;
    const platform = decodeURIComponent(resolvedParams.platform);
    const difficulty = decodeURIComponent(resolvedParams.difficulty);
    const problem_name = decodeURIComponent(resolvedParams.slug);
    const problem_name_without_extension = problem_name.split(".")[0];

    const algorithm = algorithms.find((algorithm) => {
      if (algorithm.problem_name === problem_name_without_extension)
        return true;
      if (algorithm.problem_name === problem_name) return true;
      return false;
    });

    if (!algorithm) {
      return <ErrorMessage message="Problem not found" />;
    }

    const language = algorithm.languages?.split(",") || [];

    if (language.includes("Unknown") || language.length === 0) {
      return <ErrorMessage message="Language info unavailable" />;
    }

    const ext = problem_name.split(".")[1];
    const paths = language.map((lang) => {
      if (ext === undefined) {
        return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${problem_name}/${problem_name}.${LANGUAGE_MAP[lang]}`;
      }
      const base = problem_name.split(".")[0].trim();
      if (lang === "C++") {
        return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${problem_name}/${base}.cc`;
      }
      return `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty}/${problem_name}/${base}.${LANGUAGE_MAP[lang]}`;
    });

    const highlighter = getSingletonHighlighter({
      langs: language
        .map((lang) => lang.toLowerCase())
        .filter((lang) => lang !== "unknown"),
      themes: ["catppuccin-latte", "catppuccin-mocha"],
    });

    const codes = await Promise.all(
      paths.map(async (path) => {
        try {
          const response = await fetch(path);

          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }

          const text = await response.text();
          const lang = path.split(".")[path.split(".").length - 1];

          if (lang === "unknown") {
            return { light: "", dark: "", code: "", error: true };
          }

          const light_html = (await highlighter).codeToHtml(text, {
            lang: lang === "cc" ? "cpp" : lang,
            theme: "catppuccin-latte",
            transformers: [
              {
                line(hast, _line) {
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
                line(hast, _line) {
                  addClassToHast(hast, "whitespace-pre-wrap");
                  addClassToHast(hast, "ml-2");
                },
              },
            ],
          });

          return {
            light: light_html,
            dark: dark_html,
            code: text,
            error: false,
          };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Error fetching code from ${path}:`, error);
          return { light: "", dark: "", code: "", error: true };
        }
      }),
    );

    if (codes.every((code) => code.error)) {
      return (
        <ErrorMessage message="Unable to load code. Please try again later." />
      );
    }

    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Back + meta */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground"
            title="Back to list"
          >
            <Link href="/algorithm">
              <ArrowLeft className="mr-1 size-4" />
              목록
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="gap-1 px-2.5 py-0.5 text-xs font-medium"
            >
              {platform === "leetcode" ? (
                <Calculator className="size-3" />
              ) : platform === "프로그래머스" ? (
                <Building className="size-3" />
              ) : (
                <Zap className="size-3" />
              )}
              {platform}
            </Badge>
            <Badge
              variant={
                difficulty === "Easy"
                  ? "default"
                  : difficulty === "Medium"
                    ? "secondary"
                    : "destructive"
              }
              className="text-xs"
            >
              {difficulty}
            </Badge>
          </div>
        </div>

        {/* Title + external link */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--section-title)] sm:text-3xl">
            {problem_name}
          </h1>
          <Button
            variant="outline"
            size="icon"
            asChild
            className="shrink-0"
            title="View problem"
          >
            <Link
              href={
                platform === "leetcode"
                  ? `https://leetcode.com/problems/${problem_name.split("-").slice(1).join("-")}`
                  : platform === "프로그래머스"
                    ? `https://programmers.co.kr/learn/courses/30/lessons/${problem_name.split(".")[0]}`
                    : `https://www.acmicpc.net/problem/${problem_name.split(".")[0]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-4" />
            </Link>
          </Button>
        </div>

        <Separator className="bg-border/80" />

        {/* Code */}
        <section aria-label="Code solution">
          <Card className="border-border/70 overflow-hidden">
            <CardContent className="p-0">
              <Suspense
                fallback={
                  <div className="space-y-4 p-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-96 w-full rounded-md" />
                  </div>
                }
              >
                <CodeBlock language={language} codes={codes} />
              </Suspense>
            </CardContent>
          </Card>
        </section>

        <Separator className="bg-border/80" />

        {/* Comments */}
        <section aria-label="Comments">
          <Card className="border-border/70 overflow-hidden">
            <CardContent className="p-0">
              <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <Comments />
              </Suspense>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in Page component:", error);
    return <ErrorMessage message="Error loading page" />;
  }
}
