"use client";

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

import Equation from "@/components/Equation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyList,
  TypographyOrderedList,
  TypographyP,
} from "@/components/ui/typography";
import { getRichTextContent } from "@/lib/notion";

// Rich Text 렌더링 컴포넌트
const RichText = ({ richText, className = "" }) => {
  if (!richText || !Array.isArray(richText)) return null;

  return (
    <span className={className}>
      {richText.map((text, index) => {
        if (text.type === "text") {
          const content = text.plain_text;
          let element = content;
          if (text.href) {
            element = (
              <Link
                key={index}
                href={text.href}
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </Link>
            );
          }

          if (text.annotations?.bold) {
            element = <strong key={index}>{element}</strong>;
          }
          if (text.annotations?.italic) {
            element = <em key={index}>{element}</em>;
          }
          if (text.annotations?.strikethrough) {
            element = <del key={index}>{element}</del>;
          }
          if (text.annotations?.underline) {
            element = <u key={index}>{element}</u>;
          }
          if (text.annotations?.code) {
            element = (
              <TypographyInlineCode key={index}>
                {element}
              </TypographyInlineCode>
            );
          }
          return element;
        } else if (text.type === "equation") {
          return <Equation key={index} equation={`$${text.equation.expression}$`} />;
        }
        return <span key={index}>{text.plain_text}</span>;
      })}
    </span>
  );
};

RichText.propTypes = {
  richText: PropTypes.array,
  className: PropTypes.string,
};

// 블록 타입별 렌더링 컴포넌트들
const ParagraphBlock = ({ block }) => (
  <TypographyP>
    <RichText richText={block.paragraph?.rich_text} />
  </TypographyP>
);

const Heading1Block = ({ block }) => (
  <TypographyH1>
    <RichText richText={block.heading_1?.rich_text} />
  </TypographyH1>
);

const Heading2Block = ({ block }) => (
  <TypographyH2>
    <RichText richText={block.heading_2?.rich_text} />
  </TypographyH2>
);

const Heading3Block = ({ block }) => {
  return (
    <TypographyH3>
      <RichText richText={block.heading_3?.rich_text} />
    </TypographyH3>
  );
};

const BulletedListItemBlock = ({ block }) => (
  <li>
    <RichText richText={block.bulleted_list_item?.rich_text} />
  </li>
);

const NumberedListItemBlock = ({ block }) => (
  <li>
    <RichText richText={block.numbered_list_item?.rich_text} />
  </li>
);

const QuoteBlock = ({ block }) => (
  <TypographyBlockquote>
    <RichText richText={block.quote?.rich_text} />
  </TypographyBlockquote>
);

const CodeBlock = ({ block }) => (
  <pre className="bg-muted relative rounded-lg p-4 overflow-x-auto my-6">
    <code className="text-sm font-mono">
      <RichText richText={block.code?.rich_text} />
    </code>
  </pre>
);

const ImageBlock = ({ block }) => {
  const imageUrl = block.image?.external?.url || block.image?.file?.url;
  const caption = getRichTextContent(block.image?.caption);

  if (!imageUrl) return null;

  return (
    <div className="my-6 text-center">
      <Image
        src={imageUrl}
        alt={caption || "Notion image"}
        width={800}
        height={600}
        className="rounded-lg shadow-md max-w-full h-auto"
      />
      {caption && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
};

const BookmarkBlock = ({ block }) => {
  const url = block.bookmark?.url;
  const title = getRichTextContent(block.bookmark?.caption) || "Bookmark";

  if (!url) return null;

  return (
    <Card className="my-4">
      <CardContent className="p-4">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:opacity-80"
        >
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {url}
            </p>
          </div>
          <Button variant="outline" size="sm">
            열기
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const CalloutBlock = ({ block }) => {
  const icon = block.callout?.icon?.emoji || "💡";
  const content = getRichTextContent(block.callout?.rich_text);

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-4 flex items-start space-x-3">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <RichText richText={block.callout?.rich_text} />
      </div>
    </div>
  );
};

const DividerBlock = () => <Separator className="my-6" />;

const TableBlock = ({ block, children }) => (
  <div className="overflow-x-auto my-6">
    <table className="min-w-full border border-gray-300 dark:border-gray-600">
      <tbody>{children}</tbody>
    </table>
  </div>
);

const TableRowBlock = ({ block, children }) => (
  <tr className="border-b border-gray-300 dark:border-gray-600">{children}</tr>
);

const TableCellBlock = ({ block, children }) => (
  <td className="px-4 py-2 border-r border-gray-300 dark:border-gray-600">
    {children}
  </td>
);

const EquationBlock = ({ block }) => {
  return <Equation equation={`$$${block.equation.expression}$$`} />;

};

// 메인 Notion 렌더러 컴포넌트
export default function NotionRenderer({ blocks, className = "" }) {
  if (!blocks || !Array.isArray(blocks)) {
    return <div>콘텐츠를 불러올 수 없습니다.</div>;
  }

  const renderBlock = async (block) => {
    const key = block.id || `block-${Math.random().toString(36).substring(2, 9)}`;
    switch (block.type) {
      case "paragraph":
        return <ParagraphBlock key={key} block={block} />;
      case "heading_1":
        return <Heading1Block key={key} block={block} />;
      case "heading_2":
        return <Heading2Block key={key} block={block} />;
      case "heading_3":
        return <Heading3Block key={key} block={block} />;
      case "bulleted_list_item":
        return <BulletedListItemBlock key={key} block={block} />;
      case "numbered_list_item":
        return <NumberedListItemBlock key={key} block={block} />;
      case "quote":
        return <QuoteBlock key={key} block={block} />;
      case "code":
        return <CodeBlock key={key} block={block} />;
      case "image":
        return <ImageBlock key={key} block={block} />;
      case "bookmark":
        return <BookmarkBlock key={key} block={block} />;
      case "callout":
        return <CalloutBlock key={key} block={block} />;
      case "divider":
        return <DividerBlock key={key} />;
      case "table":
        return (
          <TableBlock key={key} block={block}>
            {block.children?.map(renderBlock)}
          </TableBlock>
        );
      case "table_row":
        return (
          <TableRowBlock key={key} block={block}>
            {block.children?.map(renderBlock)}
          </TableRowBlock>
        );
      case "table_cell":
        return (
          <TableCellBlock key={key} block={block}>
            {block.children?.map(renderBlock)}
          </TableCellBlock>
        );
      case "equation":
        return <EquationBlock key={key} block={block} />;
      default:
        return (
          <div key={key} className="text-gray-500 text-sm my-2">
            지원하지 않는 블록 타입: {block.type}
          </div>
        );
    }
  };

  // 리스트 아이템들을 그룹화하여 렌더링
  const renderBlocks = () => {
    const elements = [];
    let currentList = [];
    let currentListType = null;
    let listCounter = 0; // 고유한 리스트 키를 위한 카운터

    blocks.forEach((block, index) => {
      if (
        block.type === "bulleted_list_item" ||
        block.type === "numbered_list_item"
      ) {
        if (currentListType !== block.type) {
          if (currentList.length > 0) {
            const ListComponent =
              currentListType === "bulleted_list_item" ? TypographyList : TypographyOrderedList;
            const listKey = `list-${listCounter}-${currentListType}`;
            elements.push(
              React.createElement(
                ListComponent,
                { key: listKey },
                currentList,
              ),
            );
            listCounter++;
          }
          currentList = [];
          currentListType = block.type;
        }
        currentList.push(renderBlock(block));
      } else {
        if (currentList.length > 0) {
          const ListComponent =
            currentListType === "bulleted_list_item" ? TypographyList : TypographyOrderedList;
          const listKey = `list-${listCounter}-${currentListType}`;
          elements.push(
            React.createElement(
              ListComponent,
              { key: listKey },
              currentList,
            ),
          );
          listCounter++;
          currentList = [];
          currentListType = null;
        }
        elements.push(renderBlock(block));
      }
    });

    // 마지막 리스트 처리
    if (currentList.length > 0) {
      const ListComponent =
        currentListType === "bulleted_list_item" ? TypographyList : TypographyOrderedList;
      const listKey = `list-${listCounter}-${currentListType}`;
      elements.push(
        React.createElement(
          ListComponent,
          { key: listKey },
          currentList,
        ),
      );
    }

    return elements;
  };

  return <div className={`notion-renderer ${className}`}>{renderBlocks()}</div>;
}

NotionRenderer.propTypes = {
  blocks: PropTypes.array.isRequired,
  className: PropTypes.string,
};
