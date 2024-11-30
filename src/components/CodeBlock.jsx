"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

export default function CodeBlock({ language, codes }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copy, setCopy] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Language Selector Popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {language[selectedIndex]}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              {language.map((lang, idx) => (
                <CommandItem
                  key={idx}
                  value={idx}
                  onSelect={() => {
                    setSelectedIndex(idx);
                    setOpen(false);
                  }}
                >
                  {lang}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Code Block with Copy Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => copyToClipboard(codes[selectedIndex].code)}
          className="absolute right-2 top-2"
        >
          {copy ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
        </Button>

        {isMounted && codes[selectedIndex] !== undefined ? (
          <div
            className="overflow-auto p-4 rounded-md bg-gray-800 text-white"
            dangerouslySetInnerHTML={{ __html: codes[selectedIndex]["dark"] }}
          />
        ) : null}
      </div>
    </div>
  );
}
