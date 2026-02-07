"use client";

import { Check, ChevronDown, Copy, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
      console.error("Failed to copy text:", error);
    }
  };

  // 에러가 있는 코드 필터링
  const validCodes = codes.filter((code) => !code.error);
  // const hasErrors = codes.some((code) => code.error);

  if (validCodes.length === 0) {
    return (
      <div className="rounded-lg border border-border/70 bg-card text-card-foreground p-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <Terminal className="h-10 w-10 text-muted-foreground" />
          <h3 className="font-semibold text-lg">No code available</h3>
          <p className="text-muted-foreground text-sm">
            Source code could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/70 bg-card text-card-foreground overflow-hidden">
        {/* Code Header - Mac Style */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Language Selector */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  role="combobox"
                  aria-expanded={open}
                  size="sm"
                  className="h-7 gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-2"
                >
                  {language[selectedIndex]}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search language..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {language.map((lang, idx) => {
                        const isValidCode = !codes[idx]?.error;
                        return (
                          <CommandItem
                            key={idx}
                            value={lang}
                            onSelect={() => {
                              setSelectedIndex(idx);
                              setOpen(false);
                            }}
                            disabled={!isValidCode}
                            className="flex items-center justify-between"
                          >
                            <span>{lang}</span>
                            {selectedIndex === idx && (
                              <Check className="h-4 w-4" />
                            )}
                            {!isValidCode && (
                              <Badge
                                variant="destructive"
                                className="ml-auto text-[10px] h-4 px-1"
                              >
                                Error
                              </Badge>
                            )}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              copyToClipboard(validCodes[selectedIndex]?.code || "")
            }
            disabled={!validCodes[selectedIndex]?.code}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-background/80"
            title={copy ? "Copied!" : "Copy code"}
          >
            {copy ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>

        {/* Code Content */}
        <div className="relative bg-background">
          {isMounted && validCodes[selectedIndex] ? (
            <div
              className={cn(
                "overflow-auto p-4 text-sm font-mono leading-relaxed",
                resolvedTheme === "dark" ? "bg-[#1e1e2e]" : "bg-[#eff1f5]", // Catppuccin inspired backgrounds
              )}
              style={{ maxHeight: "600px" }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    resolvedTheme === "dark"
                      ? validCodes[selectedIndex]["dark"]
                      : validCodes[selectedIndex]["light"] ||
                        validCodes[selectedIndex]["dark"],
                }}
              />
            </div>
          ) : (
            <div className="h-96 bg-muted/20 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}

CodeBlock.propTypes = {
  language: PropTypes.array.isRequired,
  codes: PropTypes.array.isRequired,
};
