import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getPage = async (pageId) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
};

export const getBlocks = async (blockId) => {
  try {
    const response = await notion.blocks.children.list({ block_id: blockId });
    for (const block of response.results) {
      if (block.has_children) {
        const childrenResponse = await getBlocks(block.id);
        block.children = childrenResponse.results || [];
      }
    }
    return response;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return null;
  }
};

export const getDatabase = async (databaseId) => {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching database:", error);
    return null;
  }
};

export const queryDatabase = async (
  databaseId,
  filter = null,
  sorts = null,
) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
      sorts,
    });
    return response;
  } catch (error) {
    console.error("Error querying database:", error);
    return null;
  }
};

// 데이터베이스에서 모든 페이지 가져오기
export const getAllPagesFromDatabase = async (databaseId) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      // 정렬 속성이 존재하지 않을 수 있으므로 제거
    });
    return response;
  } catch (error) {
    console.error("Error fetching pages from database:", error);
    return null;
  }
};

// 데이터베이스 속성 정보 가져오기
export const getDatabaseProperties = async (databaseId) => {
  try {
    const database = await getDatabase(databaseId);
    if (!database || !database.properties) return [];

    // 시스템 속성 제외하고 사용자 정의 속성만 반환
    const userProperties = Object.entries(database.properties)
      .filter(([key, prop]) => {
        // title은 기본 제목 속성이므로 제외
        return (
          key !== "title" && prop.type !== "formula" && prop.type !== "rollup"
        );
      })
      .map(([key, prop]) => ({
        id: key,
        name: prop.name,
        type: prop.type,
        options: prop.select?.options || prop.multi_select?.options || null,
      }));

    return userProperties;
  } catch (error) {
    console.error("Error fetching database properties:", error);
    return [];
  }
};

// Notion 블록 타입별 렌더링을 위한 유틸리티 함수들
export const getBlockTitle = (block) => {
  if (block.type === "paragraph" && block.paragraph?.rich_text) {
    return block.paragraph.rich_text.map((text) => text.plain_text).join("");
  }
  if (block.type === "heading_1" && block.heading_1?.rich_text) {
    return block.heading_1.rich_text.map((text) => text.plain_text).join("");
  }
  if (block.type === "heading_2" && block.heading_2?.rich_text) {
    return block.heading_2.rich_text.map((text) => text.plain_text).join("");
  }
  if (block.type === "heading_3" && block.heading_3?.rich_text) {
    return block.heading_3.rich_text.map((text) => text.plain_text).join("");
  }
  return "";
};

export const getRichTextContent = (richTextArray) => {
  if (!richTextArray || !Array.isArray(richTextArray)) return "";
  return richTextArray.map((text) => text.plain_text).join("");
};

export const getPageTitle = (page) => {
  if (page.properties?.title?.title) {
    return getRichTextContent(page.properties.title.title);
  }
  if (page.properties?.Name?.title) {
    return getRichTextContent(page.properties.Name.title);
  }
  return "Untitled";
};

export const getPageIcon = (page) => {
  if (page.icon?.type === "emoji") {
    return page.icon.emoji;
  }
  if (page.icon?.type === "file") {
    return page.icon.file.url;
  }
  return null;
};

export const getPageCover = (page) => {
  if (page.cover?.type === "external") {
    return page.cover.external.url;
  }
  if (page.cover?.type === "file") {
    return page.cover.file.url;
  }
  return null;
};

// 페이지 생성 시간 가져오기
export const getPageCreatedTime = (page) => {
  return page.created_time || new Date().toISOString();
};

// 페이지 수정 시간 가져오기
export const getPageLastEditedTime = (page) => {
  return page.last_edited_time || new Date().toISOString();
};

export const getDatabaseTitle = async (databaseId) => {
  const database = await getDatabase(databaseId);
  return getRichTextContent(database.title);
};
