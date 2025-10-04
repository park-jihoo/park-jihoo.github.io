import { ImageResponse } from "next/og";

export const dynamic = 'force-static'
export const revalidate = false

export const alt = "Park Jihoo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return "twitter-image";
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, #FFD3B6, #D3CCE3)",
          fontSize: "5em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontFamily: "sans-serif", color: "#4C4C4C" }}>
          Park Jihoo
        </h1>
      </div>
    ),
    {
      ...size,
    },
  );
}
