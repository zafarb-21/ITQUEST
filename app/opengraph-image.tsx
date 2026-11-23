import { ImageResponse } from "next/og";

// Nov 2026: the picture shown when a link to the site is shared (WhatsApp, LinkedIn, Facebook...).
export const alt = "ITQUEST AFRICA: Engineering the Future of Connectivity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #020617 0%, #0b1f3a 55%, #0e7490 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#22d3ee" }} />
          <div style={{ fontSize: 30, letterSpacing: 6, color: "#a5f3fc" }}>ITQUEST AFRICA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Engineering the Future</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#67e8f9" }}>of Connectivity</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#cbd5e1" }}>
            Networking · CCTV and access control · IT hardware · Websites · Smart IoT
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#94a3b8" }}>
          <div>Harare, Zimbabwe</div>
          <div>itquestafrica.com · WhatsApp +263 77 436 9288</div>
        </div>
      </div>
    ),
    size,
  );
}
