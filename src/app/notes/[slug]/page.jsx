import NotionPage from "@/components/NotionPage";
import { getAllPagesFromDatabase, getBlocks, getPage } from "@/lib/notion";

export async function generateStaticParams() {
  try {
    // 데이터베이스에서 모든 페이지 가져오기
    const databaseId = "619787c75b60479886c147cf746bfbb8";
    const databaseResponse = await getAllPagesFromDatabase(databaseId);
    
    if (databaseResponse && databaseResponse.results && databaseResponse.results.length > 0) {
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
  return [
    { slug: "619787c75b60479886c147cf746bfbb8" }
  ];
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
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-gray-600 dark:text-gray-400">페이지를 찾을 수 없습니다.</p>
          </div>
        </div>
      );
    }

    const blocks = blocksResponse.results || [];

    return (
      <NotionPage 
        page={page} 
        blocks={blocks} 
        comments={true} 
      />
    );
  } catch (error) {
    console.error("Error loading page:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 dark:text-gray-400">페이지를 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {error.message}
          </p>
        </div>
      </div>
    );
  }
}
