"use client";

import { AlertCircle, Check, ChevronDown,Copy } from "lucide-react";
import { useTheme } from "next-themes";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CodeBlock({ language, codes }) {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copy, setCopy] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy text:", error);
    }
  };

  // 에러가 있는 코드 필터링
  const validCodes = codes.filter(code => !code.error);
  const hasErrors = codes.some(code => code.error);

  if (validCodes.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No code available
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* 에러 알림 */}
      {hasErrors && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Some languages unavailable
          </AlertDescription>
        </Alert>
      )}

      {/* 언어 선택기 및 헤더 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outlined"
                role="combobox"
                aria-expanded={open}
                className="w-[180px] justify-between"
              >
                {language[selectedIndex]}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results</CommandEmpty>
                  {language.map((lang, idx) => {
                    const isValidCode = !codes[idx]?.error;
                    return (
                      <CommandItem
                        key={idx}
                        value={idx}
                        onSelect={() => {
                          setSelectedIndex(idx);
                          setOpen(false);
                        }}
                        disabled={!isValidCode}
                        className={!isValidCode ? "opacity-50" : ""}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{lang}</span>
                          {!isValidCode && (
                            <Badge variant="destructive" className="text-xs">
                              !
                            </Badge>
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(validCodes[selectedIndex]?.code || "")}
          disabled={!validCodes[selectedIndex]?.code}
          className="gap-2"
          title={copy ? "Copied!" : "Copy code"}
        >
          {copy ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* 코드 블록 */}
      <div className="relative">
        {isMounted && validCodes[selectedIndex] ? (
          <div
            className={`overflow-auto rounded-lg border ${
              resolvedTheme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-gray-50 text-gray-900"
            }`}
            style={{ maxHeight: "600px" }}
          >
            <div
              className="p-4"
              dangerouslySetInnerHTML={{
                __html:
                  resolvedTheme === "dark"
                    ? validCodes[selectedIndex]["dark"]
                    : validCodes[selectedIndex]["light"] || validCodes[selectedIndex]["dark"],
              }}
            />
          </div>
        ) : (
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        )}
      </div>
    </div>
  );
}

CodeBlock.propTypes = {
  language: PropTypes.array.isRequired,
  codes: PropTypes.array.isRequired,
};