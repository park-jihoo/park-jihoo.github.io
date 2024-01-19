import {ImageResponse} from "next/og"

export const runtime = "nodejs"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon(){
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "black",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  )
}