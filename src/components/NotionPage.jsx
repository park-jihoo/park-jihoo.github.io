"use client";

import PropTypes from "prop-types";

import Comments from "@/components/Comments";
import NotionRenderer from "@/components/NotionRenderer";
import {getPageIcon, getPageTitle } from "@/lib/notion";

export default function NotionPage({ page, blocks, comments = false }) {
  if (!page || !blocks) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-600 dark:text-gray-400">콘텐츠를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const title = getPageTitle(page);
  const icon = getPageIcon(page);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <header className="mb-8">
        {icon && (
          <div className="text-4xl mb-4">{icon}</div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h1>
        
        {/* 페이지 메타데이터 */}
        {page.properties && (
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
            {page.properties.Status?.select?.name && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                {page.properties.Status.select.name}
              </span>
            )}
            {page.properties.Tags?.multi_select && page.properties.Tags.multi_select.length > 0 && (
              page.properties.Tags.multi_select.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag.name}
                </span>
              ))
            )}
          </div>
        )}
      </header>

      {/* 페이지 콘텐츠 */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <NotionRenderer blocks={blocks} />
      </div>

      {/* 댓글 섹션 */}
      {comments && <Comments />}
    </article>
  );
}

NotionPage.propTypes = {
  page: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  comments: PropTypes.bool,
};
