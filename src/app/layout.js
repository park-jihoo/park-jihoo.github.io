import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

/**@type {import("next").Metadata}*/
export const metadata  = {
    title: "Park Jihoo",
    description: "Park Jihoo's personal website",
    image: "https://avatars.githubusercontent.com/u/24237865?v=4",
    url: "https://park-jihoo.github.io/",
    verification: {
      google: "kQoktB1lk0tqFRLs4-vqhVfEVWlRMX8VRQtLC_L09uw",
      other: {
        "naver-site-verification": "0581245626108d8ea24cc4d24a30ee84c0394ce6",
      }
    },
    metadataBase: new URL("https://park-jihoo.github.io/"),
  }


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Providers>
      <body>
      <Header/>
      {children}
      </body>
    </Providers>
    </html>
  );
}
