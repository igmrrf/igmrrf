import { ImageResponse } from "next/og";

export const alt = "Francis Igbiriki — engineer, system architect, and open-source contributor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, width: "100%", height: "100%", background: "#080c10", color: "#ecf1f4", fontFamily: "sans-serif" }}><div style={{ display: "flex", color: "#6ee7b7", fontSize: 28 }}>❯ ~/francis</div><div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>Francis Igbiriki</div><div style={{ display: "flex", fontSize: 36, color: "#aab8c2" }}>Building systems that work for people.</div></div><div style={{ display: "flex", fontSize: 24 }}>Engineering · Open source · Writing · Terminal workflows</div></div>, size);
}
