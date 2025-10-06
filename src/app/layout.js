import "./globals.css";

import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { Card } from "@/components/ui/card";

const inter = Inter({ subsets: ["latin"] });

/**@type {import("next").Metadata}*/
export const metadata = {
  title: {
    default: "Park Jihoo | Portfolio",
    template: "%s | Park Jihoo Portfolio",
  },
  description:
    "개발 경험과 프로젝트를 보여주는 개인 포트폴리오 및 블로그입니다. Next.js, React, TypeScript를 활용한 웹 개발 경험을 공유합니다.",
  keywords: [
    "Park Jihoo",
    "Portfolio",
    "Developer",
    "Frontend",
    "Next.js",
    "React",
    "TypeScript",
    "웹개발",
    "프론트엔드",
    "개발자",
  ],
  authors: [{ name: "Park Jihoo", url: "https://park-jihoo.github.io" }],
  creator: "Park Jihoo",
  publisher: "Park Jihoo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://park-jihoo.github.io/",
    siteName: "Park Jihoo Portfolio",
    title: "Park Jihoo | Portfolio",
    description:
      "개발 경험과 프로젝트를 보여주는 개인 포트폴리오 및 블로그입니다.",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/67787453",
        width: 1200,
        height: 630,
        alt: "Park Jihoo Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Park Jihoo | Portfolio",
    description:
      "개발 경험과 프로젝트를 보여주는 개인 포트폴리오 및 블로그입니다.",
    images: ["https://avatars.githubusercontent.com/u/67787453"],
    creator: "@parkjihoo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "kQoktB1lk0tqFRLs4-vqhVfEVWlRMX8VRQtLC_L09uw",
    other: {
      "naver-site-verification": "0581245626108d8ea24cc4d24a30ee84c0394ce6",
    },
  },
  metadataBase: new URL("https://park-jihoo.github.io/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-muted/30">
              <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <Card className="min-h-[calc(100vh-8rem)] shadow-sm border-border/50">
                  <div className="p-4 md:p-6 lg:p-8">
                    {children}
                  </div>
                </Card>
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
