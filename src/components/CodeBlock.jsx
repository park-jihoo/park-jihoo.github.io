"use client";

import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import IconButton from "@mui/material-next/IconButton";
import Select from "@mui/material-next/Select";
import { Check, ContentCopy } from "@mui/icons-material";
import { useColorScheme } from "@mui/material-next/styles";

export default function CodeBlock({ language, codes }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copy, setCopy] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const languageMap = {
    c: "c",
    cpp: "cpp",
    cc: "cpp",
    py: "python",
    js: "javascript",
    java: "java",
    sql: "sql",
  };

  const handleLanguageChange = (event) => {
    setSelectedIndex(event.target.value);
  };

  const colorScheme = useColorScheme();
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 500);
    });
  };

  return (
    <div>
      {language.length > 1 ? (
        <Select
          value={selectedIndex}
          onChange={handleLanguageChange}
          sx={{ marginBottom: 2 }}
          fullWidth
        >
          {language.map((lang, idx) => (
            <MenuItem key={idx} value={idx}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Select value={0} disabled sx={{ marginBottom: 2 }} fullWidth>
          <MenuItem value={0}>{language[0]}</MenuItem>
        </Select>
      )}
      <div style={{ position: "relative" }}>
        <IconButton
          onClick={() => copyToClipboard(codes[selectedIndex].code)}
          sx={{ position: "absolute", right: 0, top: 0 }}
        >
          {copy ? <Check /> : <ContentCopy />}
        </IconButton>
        {isMounted && codes[selectedIndex] !== undefined ? (
          <div
            dangerouslySetInnerHTML={{
              __html: codes[selectedIndex][colorScheme.mode],
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
