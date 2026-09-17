import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OBA Architectes Firm — Cabinet d'architecture à Cotonou, Bénin";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          background: "#100F0C",
          color: "#EFEAE1",
          padding: "0 88px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#EF8B12",
          }}
        >
          Architecture · Conception · Espaces
        </div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>
          OBA ARCHITECTES FIRM
        </div>
        <div style={{ display: "flex", width: 200, height: 4, background: "#EF8B12" }} />
        <div style={{ display: "flex", fontSize: 30, fontWeight: 300, opacity: 0.85 }}>
          Cabinet d&apos;architecture — Cotonou, Bénin
        </div>
      </div>
    ),
    { ...size },
  );
}
