<script setup>
import { addClassToHast, codeToHtml, getHighlighter } from "shikiji";
import mermaid from "mermaid";
import katex from "katex";
const props = defineProps(["content"]);

const shiki = await getHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["cpp", "java", "python", "sql", "c", "js", "mermaid"]
});
const number = ref([]);
let temp = 1;
for(let i=1;i<=props.content.length;i++){
  if(props.content[i-1].type === 'numbered_list_item'){
    number.value.push(temp++);
  }
  else{
    number.value.push('');
    temp = 1;
  }
}
</script>

<template>
  <div v-for="(block, index) in content" :key="block.id">
    <div v-if="block.type === 'bookmark'">
      {{ block.type }}
      {{ block.bookmark }}
    </div>
    <div v-else-if="block.type === 'breadcrumb'">
      {{ block.type }}
      {{ block.breadcrumb }}
    </div>
    <NotionBulletListItem :block="block" v-else-if="block.type === 'bulleted_list_item'"/>
    <NotionCallout v-else-if="block.type === 'callout'" :block="block"/>
    <NotionSubpage v-else-if="block.type === 'child_page'" :block="block"/>
    <div v-else-if="block.type === 'code'">
      <div v-for="text in block.code.rich_text">
        <div v-if="block.code.language === 'mermaid'">
          <div class="mermaid">
            {{ text.plain_text }}
          </div>
        </div>
        <div v-else v-html="
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
    </div>
    <div v-else-if="block.type === 'column'">
      <NotionPage :block="block" />
    </div>
    <div v-else-if="block.type === 'column_list'">
      <NotionColumnList :block="block" />
    </div>
    <v-divider v-else-if="block.type === 'divider'" thickness="3">
    </v-divider>
    <div v-else-if="block.type === 'embed'">
      {{ block.type }}
      {{ block.embed }}
    </div>
    <div
      v-else-if="block.type === 'equation'"
      v-html="katex.renderToString(block.equation.expression)"
      class="text-center"
    />
    <div v-else-if="block.type === 'file'">
      {{ block.type }}
      {{ block.file }}
    </div>
  <NotionHeading1 :block="block" v-else-if="block.type === 'heading_1' && !block.heading_1.is_toggleable"/>
    <NotionHeading2 :block="block" v-else-if="block.type === 'heading_2' && !block.heading_2.is_toggleable"/>
    <NotionHeading3 v-else-if="block.type === 'heading_3' && !block.heading_3.is_toggleable" :block="block"/>
    <div v-else-if="block.type === 'image'">
      {{ block.type }}
      {{ block.image }}
    </div>
    <div v-else-if="block.type === 'link_preview'">
      {{ block.type }}
      {{ block.link_preview }}
    </div>
    <div v-else-if="block.type === 'link_to_page'">
      {{ block.type }}
      {{ block.link_to_page }}
    </div>
    <NotionNumberListItem v-else-if="block.type === 'numbered_list_item'" :block="block" :number="number[index]"/>
    <NotionParagraph v-else-if="block.type === 'paragraph'" :block="block"/>
    <div v-else-if="block.type === 'pdf'">
      {{ block.type }}
      {{ block.pdf }}
    </div>
    <NotionQuote v-else-if="block.type === 'quote'" :block="block"/>
    <div v-else-if="block.type === 'synced_block'">
      {{ block.type }}
      {{ block.synced_block }}
    </div>
    <NotionTable v-else-if="block.type === 'table'" :block="block"/>
    <div v-else-if="block.type === 'table_of_contents'">
      {{ block.type }}
      {{ block.table_of_contents }}
    </div>
    <div v-else-if="block.type === 'template'">
      {{ block.type }}
      {{ block.template }}
    </div>
    <div v-else-if="block.type === 'to_do'">
      {{ block.type }}
      {{ block.to_do }}
    </div>
    <NotionToggle v-else-if="block.type === 'toggle' || block[block.type].is_toggleable" :block="block"/>
    <div v-else-if="block.type === 'video'">
      {{ block.type }}
      {{ block.video }}
    </div>
  </div>
</template>
