"use client";

import {useState} from "react";
import {MenuItem, Select} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function CodeBlock({language, codes}) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const languageMap = {
        'c' : 'c',
        'cpp' : 'cpp',
        'cc' : 'cpp',
        'py' : 'python',
        'js' : 'javascript',
        'java' : 'java',
        'sql' : 'sql',
    }

    const handleLanguageChange = (event) => {
        setSelectedIndex(event.target.value);
    };

    return (
        <>
            <Select value={selectedIndex} onChange={handleLanguageChange}>
                {language.map((lang, idx) =>
                    <MenuItem key={idx} value={idx}>{lang}</MenuItem>
                )}
            </Select>
            <SyntaxHighlighter
                language={languageMap[language[selectedIndex]]}
                showLineNumbers={true}
                wrapLines={true}
                lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
            >
                {codes[selectedIndex]}
            </SyntaxHighlighter>
        </>
    );
}
