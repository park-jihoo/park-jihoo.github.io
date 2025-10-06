import NotionDatabaseTable from "@/components/NotionDatabaseTable";
import {
  getAllPagesFromDatabase,
  getDatabaseProperties,
  getDatabaseTitle,
} from "@/lib/notion";

export default async function NotesPage() {
  try {
    // Notion 데이터베이스 ID
    const databaseId = "619787c75b60479886c147cf746bfbb8";

    // 데이터베이스에서 모든 페이지와 속성 정보를 병렬로 가져오기
    const [databaseResponse, databaseProperties, databaseTitle] =
      await Promise.all([
        getAllPagesFromDatabase(databaseId),
        getDatabaseProperties(databaseId),
        getDatabaseTitle(databaseId),
      ]);

    if (!databaseResponse || !databaseResponse.results) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 dark:text-gray-400">
              데이터베이스에서 페이지를 가져올 수 없습니다.
            </p>
          </div>
        </div>
      );
    }

    const pages = databaseResponse.results;
    const properties = databaseProperties.filter(
      (prop) => prop.type === "select",
    );
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            📝 {databaseTitle}
          </h1>
        </header>

        {pages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 dark:text-gray-400">
              아직 노트가 없습니다.
            </p>
          </div>
        ) : (
          <NotionDatabaseTable pages={pages} databaseProperties={properties} />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading notes:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 dark:text-gray-400">
            노트를 불러오는 중 오류가 발생했습니다.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {error.message}
          </p>
        </div>
      </div>
    );
  }
}
