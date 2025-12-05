import { AlertCircle, ArrowLeft, Building, Calculator, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { addClassToHast, getSingletonHighlighter } from "shiki";

import { getAlgorithmParams, getAlgorithms } from "@/app/utils";
import CodeBlock from "@/components/CodeBlock";
import Comments from "@/components/Comments";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    keywords: [`${platform}`, `${difficulty}`, `${problem_name}`, "알고리즘", "코딩테스트", "솔루션"],
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

// 페이지 캐싱 설정
export const revalidate = 3600; // 1시간마다 재검증


// 에러 컴포넌트
function ErrorMessage({ message, showBackButton = true }) {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      
      {showBackButton && (
        <div className="flex gap-4">
          <Button variant="ghost" asChild title="Back to algorithm list">
            <Link href="/algorithm">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
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
      if (algorithm.problem_name === problem_name_without_extension) return true;
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
    langs: language
      .map((lang) => lang.toLowerCase())
      .filter((lang) => lang !== "unknown"),
    themes: ["catppuccin-latte", "catppuccin-mocha"],
  });

    const codes = await Promise.all(
      paths.map(async (path) => {
        try {
          const response = await fetch(path, { 
            next: { revalidate: 3600 } // 1시간 캐시
          });
          
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
          
          return { light: light_html, dark: dark_html, code: text, error: false };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Error fetching code from ${path}:`, error);
          return { light: "", dark: "", code: "", error: true };
        }
      }),
    );

    if (codes.every(code => code.error)) {
      return <ErrorMessage message="Unable to load code. Please try again later." />;
    }

    return (
      <div className="min-h-screen">
        <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
          {/* 플랫폼 및 난이도 배지 */}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary" className="text-sm px-3 py-1 flex items-center gap-1">
              {platform === "leetcode" ? (
                <Calculator className="h-3 w-3" />
              ) : platform === "프로그래머스" ? (
                <Building className="h-3 w-3" />
              ) : (
                <Zap className="h-3 w-3" />
              )}
              {platform}
            </Badge>
            <Badge 
              variant={difficulty === "Easy" ? "default" : difficulty === "Medium" ? "secondary" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {difficulty}
            </Badge>
          </div>

          {/* 문제 제목, 뒤로가기 버튼 및 외부 링크 */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild title="Back to list">
                <Link href={`/algorithm`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                {problem_name}
              </h1>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
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
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Separator />

          {/* 코드 블록 */}
          <section aria-label="Code solution">
            <Suspense fallback={
              <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-96 w-full" />
              </div>
            }>
              <CodeBlock language={language} codes={codes} />
            </Suspense>
          </section>

          <Separator />

          <section aria-label="Comments">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <Comments />
            </Suspense>
          </section>
        </div>
      </div>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in Page component:", error);
    return <ErrorMessage message="Error loading page" />;
  }
}
