import "./globals.css";

import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { Card } from "@/components/ui/card";

const inter = Inter({ subsets: ["latin"] });

/**@type {import("next").Metadata}*/
export const metadata = {
  title: "Park Jihoo | Portfolio",
  description: "Personal portfolio and blog showcasing development experiences and projects.",
  keywords: ["Park Jihoo", "Portfolio", "Developer", "Frontend", "Next.js"],
  authors: [{ name: "Park Jihoo" }],
  creator: "Park Jihoo",
  publisher: "Park Jihoo",
  openGraph: {
    title: "Park Jihoo | Portfolio",
    description: "Personal portfolio and blog showcasing development experiences and projects.",
    url: "https://park-jihoo.github.io/",
    siteName: "Park Jihoo Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/24237865?v=4",
        width: 800,
        height: 800,
        alt: "Park Jihoo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Park Jihoo | Portfolio",
    description: "Personal portfolio and blog showcasing development experiences and projects.",
    images: ["https://avatars.githubusercontent.com/u/24237865?v=4"],
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6 bg-gray-50">
              <Card className="h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="p-4 md:p-6">
                  {children}
                </div>
              </Card>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
