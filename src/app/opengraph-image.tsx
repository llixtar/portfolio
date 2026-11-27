import { ImageResponse } from "next/og";

export const alt = "Andrii Shchelakov — Розробка інтернет-магазинів та сайтів";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function loadGoogleFont(font: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`;
    const css = await (
      await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      })
    ).text();
    const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
    if (!match?.[1]) return null;
    return await (await fetch(match[1])).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const [juraBold, interRegular] = await Promise.all([
    loadGoogleFont("Jura", 700),
    loadGoogleFont("Inter", 500),
  ]);

  const fonts = [
    ...(juraBold
      ? [{ name: "Jura", data: juraBold, style: "normal" as const, weight: 700 as const }]
      : []),
    ...(interRegular
      ? [{ name: "Inter", data: interRegular, style: "normal" as const, weight: 500 as const }]
      : []),
  ];

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
          position: "relative",
        }}
      >
        {/* Делікатне фонове світіння */}
        <div
          style={{
            position: "absolute",
            width: 820,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(5,5,5,0) 70%)",
          }}
        />

        {/* Фірмова стелс-рамка зі зрізаними кутами та металевою фаскою */}
        <div
          style={{
            position: "relative",
            width: 1040,
            height: 460,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="1040"
            height="460"
            viewBox="0 0 1040 460"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="bevelBorder" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#737373" />
                <stop offset="50%" stopColor="#404040" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
              <linearGradient id="obsidianFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1c1f28" />
                <stop offset="50%" stopColor="#12141c" />
                <stop offset="100%" stopColor="#0a0b10" />
              </linearGradient>
            </defs>

            {/* Зовнішня металева фаска */}
            <polygon
              points="24,0 1016,0 1040,24 1040,436 1016,460 24,460 0,436 0,24"
              fill="url(#bevelBorder)"
            />
            {/* Внутрішній обсидіановий корпус */}
            <polygon
              points="25,2 1015,2 1038,25 1038,434 1015,457 25,457 2,434 2,25"
              fill="url(#obsidianFill)"
            />
            {/* Верхній тонкий світловий блік */}
            <line
              x1="26"
              y1="3"
              x2="1014"
              y2="3"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Контент по центру */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 64px",
              gap: 24,
            }}
          >
            {/* Ім'я */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: interRegular ? "Inter" : "sans-serif",
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#d4d4d8",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#34d399",
                  boxShadow: "0 0 12px rgba(52,211,153,0.9)",
                }}
              />
              <span>Andrii Shchelakov</span>
            </div>

            {/* Головний заголовок */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: juraBold ? "Jura" : "sans-serif",
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              <span>Розробка інтернет‑магазинів</span>
              <span>та сайтів</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fonts.length > 0 ? { fonts } : {}),
    }
  );
}
