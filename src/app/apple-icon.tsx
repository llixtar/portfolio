import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="bevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="50%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="obsidian" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e232e" />
              <stop offset="55%" stopColor="#11141c" />
              <stop offset="100%" stopColor="#07090d" />
            </linearGradient>
          </defs>
          <polygon
            points="10,0 54,0 64,10 64,54 54,64 10,64 0,54 0,10"
            fill="url(#bevel)"
          />
          <polygon
            points="11,2 53,2 62,11 62,53 53,62 11,62 2,53 2,11"
            fill="url(#obsidian)"
          />
          <path
            d="M32 15 L17 48 H24.5 L32 30.5 L39.5 48 H47 L32 15 Z"
            fill="#ffffff"
          />
          <circle cx="32" cy="43" r="4.2" fill="#34d399" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
