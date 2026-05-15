import { ImageResponse } from "next/og";
import { explainCron } from "@/lib/cron/explain";
import { validateCron } from "@/lib/cron/validate";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cron = searchParams.get("cron")?.trim() || "*/5 * * * *";
  const title = searchParams.get("title") || "";

  const { isValid } = validateCron(cron);
  const { human } = isValid
    ? explainCron(cron)
    : { human: "Invalid cron expression" };

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(180deg, #0b0d10 0%, #15181d 50%, #0b0d10 100%)",
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          color: "#e7e9ec",
          padding: 64,
          position: "relative",
        }}
      >
        {/* Top brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#8a93a0",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#7c9cff",
            }}
          />
          cronbuilder
        </div>

        {/* Center stack */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 30,
          }}
        >
          {title && (
            <div style={{ fontSize: 36, fontWeight: 600, color: "#e7e9ec" }}>
              {title}
            </div>
          )}
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#facc15",
              lineHeight: 1.1,
            }}
          >
            {cron}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#e7e9ec",
              fontWeight: 500,
              lineHeight: 1.3,
            }}
          >
            {`→ ${human}`}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            color: "#5b6470",
            fontSize: 20,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
          }}
        >
          cronbuilder.app
        </div>

        {/* Accent rectangle, top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 220,
            height: 8,
            background:
              "linear-gradient(90deg, transparent 0%, #facc15 100%)",
          }}
        />
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
