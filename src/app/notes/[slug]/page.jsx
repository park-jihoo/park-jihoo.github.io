import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

import NotionPage from "@/components/NotionPage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPagesFromDatabase, getBlocks, getPage } from "@/lib/notion";

export async function generateStaticParams() {
  try {
    // 데이터베이스에서 모든 페이지 가져오기
    const databaseId = "619787c75b60479886c147cf746bfbb8";
    const databaseResponse = await getAllPagesFromDatabase(databaseId);

    if (
      databaseResponse &&
      databaseResponse.results &&
      databaseResponse.results.length > 0
    ) {
      // 각 페이지의 ID를 slug로 변환
      return databaseResponse.results.map((page) => ({
        slug: page.id,
      }));
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }

  // 오류가 발생하거나 페이지가 없을 경우 기본 페이지 ID 반환
  // 이렇게 하면 빌드가 실패하지 않습니다
  return [{ slug: "619787c75b60479886c147cf746bfbb8" }];
}

export default async function Page(props) {
  const params = await props.params;
  const pageId = params.slug;

  try {
    // 페이지 정보와 블록들을 병렬로 가져오기
    const [page, blocksResponse] = await Promise.all([
      getPage(pageId),
      getBlocks(pageId),
    ]);

    if (!page || !blocksResponse) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
          <Card className="border-destructive/50 overflow-hidden">
            <CardContent className="p-0">
              <Alert
                variant="destructive"
                className="flex flex-col items-center justify-center border-0 bg-transparent py-8 text-center"
              >
                <AlertCircle className="mb-4 size-10" />
                <AlertTitle className="mb-2 text-xl">Error</AlertTitle>
                <AlertDescription>Page not found.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/notes">
                <ChevronLeft className="mr-1 size-4" />
                Notes 목록
              </Link>
            </Button>
          </div>
        </div>
      );
    }

    const blocks = blocksResponse.results || [];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
            <Link href="/notes">
              <ChevronLeft className="mr-1 size-4" />
              Notes
            </Link>
          </Button>
        </div>
        <NotionPage page={page} blocks={blocks} comments={true} />
      </div>
    );
  } catch (error) {
    console.error("Error loading page:", error);
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
        <Card className="border-destructive/50 overflow-hidden">
          <CardContent className="p-0">
            <Alert
              variant="destructive"
              className="flex flex-col items-center justify-center border-0 bg-transparent py-8 text-center"
            >
              <AlertCircle className="mb-4 size-10" />
              <AlertTitle className="mb-2 text-xl">Something went wrong</AlertTitle>
              <AlertDescription>
                {error.message || "An error occurred while loading the page."}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/notes">
              <ChevronLeft className="mr-1 size-4" />
              Notes 목록
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
