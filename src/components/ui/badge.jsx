import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-stone-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 dark:border-stone-800 dark:focus:ring-stone-300",
  {
    variants: {
      variant: {
        secondary:
          "border-transparent bg-stone-100 text-stone-900 hover:bg-stone-100/80 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80",
        destructive:
          "border-transparent bg-red-500 text-stone-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/80",
        outline: "text-stone-950 dark:text-stone-50",
        default:
          "border-transparent bg-white text-[#373530] shadow hover:bg-white/80 dark:bg-[#191919] dark:text-[#D4D4D4] dark:hover:bg-[#191919]/80",
        gray: "border-transparent bg-[#F1F1EF] text-[#787774] hover:bg-[#F1F1EF]/80 dark:bg-[#252525] dark:text-[#9B9B9B] dark:hover:bg-[#252525]/80",
        brown:
          "border-transparent bg-[#F3EEEE] text-[#976D57] hover:bg-[#F3EEEE]/80 dark:bg-[#2E2724] dark:text-[#A27763] dark:hover:bg-[#2E2724]/80",
        orange:
          "border-transparent bg-[#F8ECDF] text-[#CC782F] hover:bg-[#F8ECDF]/80 dark:bg-[#36291F] dark:text-[#CB7B37] dark:hover:bg-[#36291F]/80",
        yellow:
          "border-transparent bg-[#FAF3DD] text-[#C29343] hover:bg-[#FAF3DD]/80 dark:bg-[#372E20] dark:text-[#C19138] dark:hover:bg-[#372E20]/80",
        green:
          "border-transparent bg-[#EEF3ED] text-[#548164] hover:bg-[#EEF3ED]/80 dark:bg-[#242B26] dark:text-[#4F9768] dark:hover:bg-[#242B26]/80",
        blue: "border-transparent bg-[#E9F3F7] text-[#487CA5] hover:bg-[#E9F3F7]/80 dark:bg-[#1F282D] dark:text-[#447ACB] dark:hover:bg-[#1F282D]/80",
        purple:
          "border-transparent bg-[#F6F3F8] text-[#8A67AB] hover:bg-[#F6F3F8]/80 dark:bg-[#2A2430] dark:text-[#865DBB] dark:hover:bg-[#2A2430]/80",
        pink: "border-transparent bg-[#F9F2F5] text-[#B35488] hover:bg-[#F9F2F5]/80 dark:bg-[#2E2328] dark:text-[#BA4A78] dark:hover:bg-[#2E2328]/80",
        red: "border-transparent bg-[#FAECEC] text-[#C4554D] hover:bg-[#FAECEC]/80 dark:bg-[#332523] dark:text-[#BE524B] dark:hover:bg-[#332523]/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
