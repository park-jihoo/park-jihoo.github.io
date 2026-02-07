"use client";

import PropTypes from "prop-types";

import Comments from "@/components/Comments";
import NotionRenderer from "@/components/NotionRenderer";
import { Badge } from "@/components/ui/badge";
import { getPageIcon, getPageTitle } from "@/lib/notion";

export default function NotionPage({ page, blocks, comments = false }) {
  if (!page || !blocks) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">📝</div>
          <p className="text-muted-foreground">
            콘텐츠를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  const title = getPageTitle(page);
  const icon = getPageIcon(page);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        {icon && <div className="mb-4 text-4xl">{icon}</div>}
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        {page.properties && (
          <div className="flex flex-wrap gap-2">
            {page.properties.Status?.select?.name && (
              <Badge variant="default" className="text-xs font-medium">
                {page.properties.Status.select.name}
              </Badge>
            )}
            {page.properties.Tags?.multi_select &&
              page.properties.Tags.multi_select.length > 0 &&
              page.properties.Tags.multi_select.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {tag.name}
                </Badge>
              ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <NotionRenderer blocks={blocks} />
      </div>

      {comments && <Comments />}
    </article>
  );
}

NotionPage.propTypes = {
  page: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  comments: PropTypes.bool,
};
