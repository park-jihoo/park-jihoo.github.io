
import { Client } from "@notionhq/client";

export default defineEventHandler((event) => {
  const notion = new Client({
    auth: "secret_SLclwcn6eZqxYJWyM7kueTRykHWMpr9lxfnlCqKra25",
  });
  const response = notion.blocks.children.list({
    block_id: event.context.params.id,
  })

  return response
})