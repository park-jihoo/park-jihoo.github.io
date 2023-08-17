import { BlockMap } from "./types";

// @ts-ignore
const getPageTable = async (pageId: string, apiUrl = "https://api.vue-notion.workers.dev/v1"): Promise<BlockMap> =>
  await fetch(`${apiUrl}/table/${pageId}`)
    .then((res) => res.json())
    .then((data) => data as BlockMap)
    .catch((err) => err);

// @ts-ignore
const getPageBlocks = async (pageId: string, apiUrl = "https://api.vue-notion.workers.dev/v1"): Promise<BlockMap> =>
  await fetch(`${apiUrl}/page/${pageId}`)
    .then((res) => res.json())
    .then((data) => data as BlockMap)
    .catch((err) => err);

export { getPageTable, getPageBlocks };
