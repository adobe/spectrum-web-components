import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BG_BLUE } from "../backgrounds";

const PROMPT_TEXT =
  "Create a color swatch component that shows Spectrum semantic colors as small squares with labels. Use Spectrum 2 tokens for all colors and sizing.";

const OUTPUT_LINES = [
  { icon: "\u2713", text: "Created SwatchGrid.ts", color: "#4ade80" },
  { icon: "\u2713", text: "Created swatch-grid.css", color: "#4ade80" },
  {
    icon: "\u2713",
    text: "Created stories/swatch-grid.stories.ts",
    color: "#4ade80",
  },
  {
    icon: "\u2713",
    text: "Verified tokens against tokens.css",
    color: "#4ade80",
  },
];

const SWATCHES = [
  { name: "Accent", color: "#0265dc" },
  { name: "Informative", color: "#378ef0" },
  { name: "Positive", color: "#12805c" },
  { name: "Negative", color: "#d31510" },
  { name: "Notice", color: "#e68619" },
  { name: "Neutral", color: "#6e6e6e" },
];

const TerminalDots: React.FC = () => (
  <div style={{ display: "flex", gap: 8 }}>
    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
      <div
        key={c}
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: c,
        }}
      />
    ))}
  </div>
);

export const SwatchDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typing (0-1.8s)
  const typingEnd = fps * 1.8;
  const charsToShow = Math.min(
    PROMPT_TEXT.length,
    Math.max(
      0,
      Math.floor(
        interpolate(frame, [0, typingEnd], [0, PROMPT_TEXT.length], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      )
    )
  );
  const displayedPrompt = PROMPT_TEXT.slice(0, charsToShow);
  const cursorVisible =
    frame < typingEnd + fps * 0.5 &&
    Math.floor(frame / (fps * 0.4)) % 2 === 0;

  // Generating dots
  const dotsStart = fps * 2;
  const showDots = frame >= dotsStart && frame < dotsStart + fps * 0.6;
  const dotCount = showDots
    ? (Math.floor((frame - dotsStart) / (fps * 0.25)) % 3) + 1
    : 0;

  // Output lines
  const outputStart = fps * 2.6;
  const outputLineDelay = fps * 0.2;

  // Swatches
  const swatchStart = fps * 3.6;
  const swatchDelay = fps * 0.1;

  // Container entrance
  const containerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60, mass: 1 },
  });
  const containerScale = interpolate(containerSpring, [0, 1], [0.95, 1]);
  const containerOpacity = interpolate(containerSpring, [0, 1], [0, 1]);

  // Fade out

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d1117",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img src={BG_BLUE} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
      <div
        style={{
          position: "relative",
          display: "flex",
          width: 1600,
          height: 720,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          transform: `scale(${containerScale})`,
          opacity: containerOpacity,
        }}
      >
        {/* Terminal */}
        <div
          style={{
            width: "55%",
            backgroundColor: "#1e1e2e",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 48,
              backgroundColor: "#181825",
              display: "flex",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
              gap: 16,
              borderBottom: "1px solid #313244",
            }}
          >
            <TerminalDots />
            <div
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 16,
                color: "#cdd6f4",
                fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
                fontWeight: 500,
              }}
            >
              Claude Code — labs/
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
              fontSize: 16,
              lineHeight: 1.7,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ color: "#a6e3a1", marginRight: 8 }}>{">"}</span>
              <span style={{ color: "#cdd6f4", flex: 1 }}>
                {displayedPrompt}
                <span
                  style={{
                    opacity: cursorVisible ? 1 : 0,
                    color: "#a6e3a1",
                    fontWeight: 700,
                  }}
                >
                  |
                </span>
              </span>
            </div>

            {showDots && (
              <div style={{ color: "#cdd6f4", marginTop: 8 }}>
                {"generating" + ".".repeat(dotCount)}
              </div>
            )}

            {OUTPUT_LINES.map((line, i) => {
              const lineFrame = outputStart + i * outputLineDelay;
              const lineOpacity = interpolate(
                frame,
                [lineFrame, lineFrame + fps * 0.2],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const lineX = interpolate(
                frame,
                [lineFrame, lineFrame + fps * 0.2],
                [10, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    opacity: lineOpacity,
                    transform: `translateX(${lineX}px)`,
                    marginTop: i === 0 ? 12 : 0,
                  }}
                >
                  <span style={{ color: line.color, marginRight: 8 }}>
                    {line.icon}
                  </span>
                  <span style={{ color: "#cdd6f4" }}>{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Storybook Preview */}
        <div
          style={{
            width: "45%",
            backgroundColor: "#f5f5f5",
            borderLeft: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 48,
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #e5e5e5",
              display: "flex",
              alignItems: "center",
              paddingLeft: 20,
              fontSize: 16,
              fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
              color: "#1a1a1a",
            }}
          >
            <span style={{ color: "#6e6e6e", fontWeight: 400 }}>Labs /</span>
            <span style={{ fontWeight: 600, marginLeft: 6 }}>
              Color swatches
            </span>
          </div>

          <div
            style={{
              flex: 1,
              padding: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 28,
              }}
            >
              {SWATCHES.map((swatch, i) => {
                const swatchFrame = swatchStart + i * swatchDelay;
                const swatchSpring = spring({
                  frame: frame - swatchFrame,
                  fps,
                  config: { damping: 12, stiffness: 100, mass: 0.8 },
                });
                const swatchScale = interpolate(
                  swatchSpring,
                  [0, 1],
                  [0, 1]
                );
                const swatchOpacity = interpolate(
                  swatchSpring,
                  [0, 1],
                  [0, 1]
                );

                return (
                  <div
                    key={swatch.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                      transform: `scale(${swatchScale})`,
                      opacity: swatchOpacity,
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 12,
                        backgroundColor: swatch.color,
                        boxShadow: `0 4px 12px ${swatch.color}40`,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#1a1a1a",
                        fontFamily:
                          '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
                      }}
                    >
                      {swatch.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
