<script setup>
import { Client } from "@notionhq/client";
import { addClassToHast, codeToHtml, getHighlighter } from "shikiji";
import mermaid from "mermaid";
import NotionIcon from "~/components/NotionIcon.vue";
const props = defineProps(["blockId"]);

const katex = require("katex");

const shiki = await getHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["cpp", "java", "python", "sql", "c", "js", "mermaid"]
});

const notion = new Client({
  auth: "secret_SLclwcn6eZqxYJWyM7kueTRykHWMpr9lxfnlCqKra25",
});

const block = await notion.blocks.retrieve({ block_id: props.blockId });
const child = block.has_children ? await notion.blocks.children.list({ block_id: props.blockId }) : null;
if(process.client){
  mermaid.run();
}
</script>

<template>
  <div v-if="block.type === 'bookmark'">
    {{ block.type }}
    {{ block.bookmark }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'breadcrumb'">
    {{ block.type }}
    {{ block.breadcrumb }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'bulleted_list_item'">
    <v-card-text>
      <NotionRichText :richText="block.bulleted_list_item.rich_text" />
      <v-sheet v-if="block.has_children" class="ma-2">
        <span v-if="child"  v-for="c in child.results">
          <NotionBlock :blockId="c.id" />
        </span>
      </v-sheet>
    </v-card-text>
  </div>
  <div v-else-if="block.type === 'callout'">
    <v-card variant="tonal">
      <v-card-text>
        <NotionIcon :icon="block.callout.icon" />
        <NotionRichText :richText="block.callout.rich_text" />
      </v-card-text>
    </v-card>
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'child_page'">
    {{ block.type }}
    {{ block.child_page }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'code'">
    <div v-for="text in block.code.rich_text">
      <div v-if="block.code.language === 'mermaid'">
          <div class="mermaid">
            {{ text.plain_text }}
          </div>
      </div>
      <div v-else
        v-html="
          shiki.codeToHtml(text.plain_text, {
            lang: block.code.language,
            theme: 'github-light',
            mergeWhitespaces: true,
            transformers: [
              {
                code(hast) {
                  addClassToHast(hast, 'font-mono');
                },
                line(hast, line) {
                  addClassToHast(hast, 'text-pre-wrap');
                },
              },
            ],
          })
        "
      ></div>
    </div>
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'column'">
    <div v-for="column in child.results" :key="column.id">
      <NotionBlock :blockId="column.id" />
    </div>
  </div>
  <div v-else-if="block.type === 'column_list'">
    <div class="block lg:flex lg:flex-row gap-2">
      <v-col v-for="column in child.results" :key="column.id">
        <NotionBlock :blockId="column.id" />
      </v-col>
    </div>
  </div>
  <div v-else-if="block.type === 'divider'">
    <v-divider></v-divider>
  </div>
  <div v-else-if="block.type === 'embed'">
    {{ block.type }}
    {{ block.embed }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div
    v-else-if="block.type === 'equation'"
    v-html="katex.renderToString(block.equation.expression)"
  />
  <div v-else-if="block.type === 'file'">
    {{ block.type }}
    {{ block.file }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'heading_1'">
    <div v-if="block.heading_1.is_toggleable">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="text-h4 text-wrap">
            <NotionRichText :richText="block.heading_1.rich_text" />
          </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-if="child" v-for="c in child.results" class="ma-2">
            <NotionBlock :blockId="c.id" />
          </div>
        </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      <v-card-text class="text-h4 text-wrap">
        <NotionRichText :richText="block.heading_1.rich_text" />
      </v-card-text>
      <div v-if="child" v-for="c in child.results" class="ma-2">
        <NotionBlock :blockId="c.id" />
      </div>
    </div>
  </div>
  <div v-else-if="block.type === 'heading_2'">
    <div v-if="block.heading_2.is_toggleable">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="text-h5 text-wrap">
              <NotionRichText :richText="block.heading_2.rich_text" />
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-if="child"  v-for="c in child.results" class="ma-2">
              <NotionBlock :blockId="c.id" />
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      <v-card-text class="text-h5 text-wrap">
        <NotionRichText :richText="block.heading_2.rich_text" />
      </v-card-text>
      <div v-if="child" v-for="c in child.results" class="ma-2">
        <NotionBlock :blockId="c.id" />
      </div>
    </div>
  </div>
  <div v-else-if="block.type === 'heading_3'">
    <div v-if="block.heading_3.is_toggleable">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="text-h6 text-wrap">
            <NotionRichText :richText="block.heading_3.rich_text" />
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-if="child"  v-for="c in child.results" class="ma-2">
              <NotionBlock :blockId="c.id" />
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      <v-card-text class="text-h6 text-wrap">
        <NotionRichText :richText="block.heading_3.rich_text" />
      </v-card-text>
      <div v-if="child"  v-for="c in child.results" class="ma-2">
        <NotionBlock :blockId="c.id" />
      </div>
    </div>
  </div>
  <div v-else-if="block.type === 'image'">
    {{ block.type }}
    {{ block.image }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'link_preview'">
    {{ block.type }}
    {{ block.link_preview }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'link_to_page'">
    {{ block.type }}
    {{ block.link_to_page }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'numbered_list_item'">
    <v-card-text>
      <NotionRichText :richText="block.numbered_list_item.rich_text" />
    </v-card-text>
      <v-sheet v-if="block.has_children" class="ma-2">
        <span v-for="c in child.results">
          <NotionBlock :blockId="c.id" />
        </span>
      </v-sheet>
  </div>
  <div v-else-if="block.type === 'paragraph'">
    <p>
      <NotionRichText :richText="block.paragraph.rich_text" />
      <v-sheet v-if="block.has_children" class="ma-2">
        <span v-for="c in child.results">
          <NotionBlock :blockId="c.id" />
        </span>
      </v-sheet>
    </p>
  </div>
  <div v-else-if="block.type === 'pdf'">
    {{ block.type }}
    {{ block.pdf }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'quote'">
    <blockquote>
      <NotionRichText :richText="block.quote.rich_text" />
      <div v-if="block.has_children" class="ma-2">
        <div v-for="c in child.results">
          <NotionBlock :blockId="c.id" />
        </div>
      </div>
    </blockquote>
  </div>
  <div v-else-if="block.type === 'synced_block'">
    {{ block.type }}
    {{ block.synced_block }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'table'">
    <v-table>
      <tbody>
      <tr v-for="row in child.results">
        <td v-for="cell in row.table_row.cells">
          <NotionRichText :richText="cell" />
        </td>
      </tr>
      </tbody>
    </v-table>
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'table_of_contents'">
    {{ block.type }}
    {{ block.table_of_contents }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'template'">
    {{ block.type }}
    {{ block.template }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'to_do'">
    {{ block.type }}
    {{ block.to_do }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
  <div v-else-if="block.type === 'toggle'">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <NotionRichText :richText="block.toggle.rich_text" />
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-if="child"  v-for="c in child.results">
            <NotionBlock :blockId="c.id" class="ma-2" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div v-else-if="block.type === 'video'">
    {{ block.type }}
    {{ block.video }}
    <v-sheet v-if="block.has_children" class="ma-2">
      {{ child }}
    </v-sheet>
  </div>
</template>
