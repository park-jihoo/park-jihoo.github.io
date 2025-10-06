import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const revalidate = false;

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  return "apple-icon";
}

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: "rgba(32,22,6,0.09)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        P
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
      // We can also set the content type of the response.
      contentType,
    },
  );
}
