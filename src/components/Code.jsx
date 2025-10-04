"use client";

import { getBlockTitle } from "notion-utils";
import { useEffect, useState } from "react";
import { useNotionContext } from "react-notion-x";
import { addClassToHast, getSingletonHighlighter } from "shiki";

import CodeBlock from "@/components/CodeBlock";
import { Mermaid } from "@/components/Mermaid";

export const Code = ({ block, defaultLanguage, className }) => {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const language = (
    block.properties?.language?.[0]?.[0] || "typescript"
  ).toLowerCase();
  const { caption } = block.properties;
  const [codes, setCodes] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const highlightCode = async () => {
      if (language === "plain text") {
        return;
      }

      const highlighter = await getSingletonHighlighter({
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

      setLanguages([language]);
      setCodes([
        {
          code: content,
          light: html_light,
          dark: html_dark,
        },
      ]);
    };

    highlightCode();
  }, [content, language]);

  if (language === "plain text") {
    return <div className="notion-code">{content}</div>;
  }

  if (language === "mermaid") {
    return <Mermaid code={content} />;
  }

  if (codes.length === 0) {
    return <div className="notion-code">{content}</div>;
  }

  return <CodeBlock language={languages} codes={codes} />;
};
