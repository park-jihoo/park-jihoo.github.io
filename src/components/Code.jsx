import { useNotionContext } from "react-notion-x";
import { getBlockTitle } from "notion-utils";
import { addClassToHast, getHighlighter } from "shikiji";
import CodeBlock from "@/components/CodeBlock";
import { Mermaid } from "@/components/Mermaid";

export const Code = async ({ block, defaultLanguage, className }) => {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const language = (
    block.properties?.language?.[0]?.[0] || "typescript"
  ).toLowerCase();
  const { caption } = block.properties;

  if (language === "plain text") {
    return <div className="notion-code">{content}</div>;
  }

  const highlighter = await getHighlighter({
    langs: [language],
    themes: ["material-theme", "material-theme-lighter"],
  });

  const html_light = highlighter.codeToHtml(content, {
    theme: "material-theme-lighter",
    lang: language,
    transformers: [
      {
        line(hast, line) {
          addClassToHast(hast, "whitespace-pre-wrap ml-2");
        },
      },
    ],
  });

  const html_dark = highlighter.codeToHtml(content, {
    theme: "material-theme",
    lang: language,
    transformers: [
      {
        line(hast, line) {
          addClassToHast(hast, "whitespace-pre-wrap ml-2");
        },
      },
    ],
  });

  const languages = [language];
  const codes = [
    {
      code: content,
      light: html_light,
      dark: html_dark,
    },
  ];

  if (language === "mermaid") {
    return <Mermaid code={content} />;
  }
  return <CodeBlock language={languages} codes={codes} />;
};
