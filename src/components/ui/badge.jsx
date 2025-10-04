
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Notion 색상 시스템 추가
        notionGray:
          "border-transparent bg-gray-100 text-gray-700 border-gray-200 [a&]:hover:bg-gray-200/80",
        notionBrown:
          "border-transparent bg-amber-50 text-amber-800 border-amber-200 [a&]:hover:bg-amber-100/80",
        notionOrange:
          "border-transparent bg-orange-100 text-orange-800 border-orange-200 [a&]:hover:bg-orange-200/80",
        notionYellow:
          "border-transparent bg-yellow-100 text-yellow-800 border-yellow-200 [a&]:hover:bg-yellow-200/80",
        notionGreen:
          "border-transparent bg-green-100 text-green-800 border-green-200 [a&]:hover:bg-green-200/80",
        notionBlue:
          "border-transparent bg-blue-100 text-blue-800 border-blue-200 [a&]:hover:bg-blue-200/80",
        notionPurple:
          "border-transparent bg-purple-100 text-purple-800 border-purple-200 [a&]:hover:bg-purple-200/80",
        notionPink:
          "border-transparent bg-pink-100 text-pink-800 border-pink-200 [a&]:hover:bg-pink-200/80",
        notionRed:
          "border-transparent bg-red-100 text-red-800 border-red-200 [a&]:hover:bg-red-200/80",
        // Notion 다크 테마 색상
        notionGrayDark:
          "border-transparent bg-gray-800 text-gray-200 border-gray-700 [a&]:hover:bg-gray-700/80",
        notionBrownDark:
          "border-transparent bg-amber-900 text-amber-200 border-amber-800 [a&]:hover:bg-amber-800/80",
        notionOrangeDark:
          "border-transparent bg-orange-900 text-orange-200 border-orange-800 [a&]:hover:bg-orange-800/80",
        notionYellowDark:
          "border-transparent bg-yellow-900 text-yellow-200 border-yellow-800 [a&]:hover:bg-yellow-800/80",
        notionGreenDark:
          "border-transparent bg-green-900 text-green-200 border-green-800 [a&]:hover:bg-green-800/80",
        notionBlueDark:
          "border-transparent bg-blue-900 text-blue-200 border-blue-800 [a&]:hover:bg-blue-800/80",
        notionPurpleDark:
          "border-transparent bg-purple-900 text-purple-200 border-purple-800 [a&]:hover:bg-purple-800/80",
        notionPinkDark:
          "border-transparent bg-pink-900 text-pink-200 border-pink-800 [a&]:hover:bg-pink-800/80",
        notionRedDark:
          "border-transparent bg-red-900 text-red-200 border-red-800 [a&]:hover:bg-red-800/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
