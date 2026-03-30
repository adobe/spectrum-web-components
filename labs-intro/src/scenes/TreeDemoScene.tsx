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
  "Here's my Figma design: figma.com/design/Mngz9H7…node-id=64762-1960 — Build a tree view component for labs. Use Spectrum 2 tokens.";

const OUTPUT_LINES = [
  { icon: "\u2713", text: "Created TreeView.ts", color: "#4ade80" },
  { icon: "\u2713", text: "Created TreeViewItem.ts", color: "#4ade80" },
  { icon: "\u2713", text: "Created tree-view.css", color: "#4ade80" },
  {
    icon: "\u2713",
    text: "Created stories/tree-view.stories.ts",
    color: "#4ade80",
  },
  {
    icon: "\u2713",
    text: "Verified tokens against tokens.css",
    color: "#4ade80",
  },
];

const TREE_DATA = [
  { label: "Documents", level: 0, expanded: true, isFolder: true },
  { label: "Design assets", level: 1, expanded: true, isFolder: true },
  { label: "logo.svg", level: 2, expanded: false, isFolder: false },
  { label: "banner.png", level: 2, expanded: false, isFolder: false },
  { label: "icons.ai", level: 2, expanded: false, isFolder: false },
  { label: "README.md", level: 1, expanded: false, isFolder: false },
  { label: "package.json", level: 1, expanded: false, isFolder: false },
  { label: "Reports", level: 0, expanded: false, isFolder: true },
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

const ChevronRight: React.FC<{ color: string }> = ({ color }) => (
  <span
    style={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderTop: "4px solid transparent",
      borderBottom: "4px solid transparent",
      borderLeft: `6px solid ${color}`,
      marginRight: 4,
    }}
  />
);

const ChevronDown: React.FC<{ color: string }> = ({ color }) => (
  <span
    style={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderLeft: "4px solid transparent",
      borderRight: "4px solid transparent",
      borderTop: `6px solid ${color}`,
      marginRight: 4,
    }}
  />
);

export const TreeDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing (8 seconds total)
  const typingEnd = fps * 2;
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

  // Figma link highlight — the URL portion should be purple
  const figmaLinkStart = PROMPT_TEXT.indexOf("figma.com");
  const figmaLinkEnd = PROMPT_TEXT.indexOf("1960") + 4;

  const renderPromptText = () => {
    const chars = displayedPrompt;
    if (charsToShow <= figmaLinkStart) {
      return <span style={{ color: "#cdd6f4" }}>{chars}</span>;
    }
    const before = chars.slice(0, figmaLinkStart);
    const link = chars.slice(
      figmaLinkStart,
      Math.min(charsToShow, figmaLinkEnd)
    );
    const after =
      charsToShow > figmaLinkEnd ? chars.slice(figmaLinkEnd) : "";
    return (
      <>
        <span style={{ color: "#cdd6f4" }}>{before}</span>
        <span style={{ color: "#b4a0e5", textDecoration: "underline" }}>
          {link}
        </span>
        <span style={{ color: "#cdd6f4" }}>{after}</span>
      </>
    );
  };

  // Generating dots
  const dotsStart = fps * 2.2;
  const showDots = frame >= dotsStart && frame < dotsStart + fps * 0.6;
  const dotCount = showDots
    ? (Math.floor((frame - dotsStart) / (fps * 0.25)) % 3) + 1
    : 0;
  const dotsText = showDots
    ? "\u{1F50D} Reading Figma design" + ".".repeat(dotCount)
    : "";

  // Output lines
  const outputStart = fps * 2.8;
  const outputLineDelay = fps * 0.2;

  // Tree view appears after output
  const treeStart = fps * 4;
  const treeItemDelay = fps * 0.08;

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
        {/* Terminal - Left 55% */}
        <div
          style={{
            width: "55%",
            backgroundColor: "#1e1e2e",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title bar */}
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
                fontFamily:
                  '"SF Mono", "Fira Code", "Consolas", monospace',
                fontWeight: 500,
              }}
            >
              Claude Code — labs/
            </div>
          </div>

          {/* Terminal content */}
          <div
            style={{
              flex: 1,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontFamily:
                '"SF Mono", "Fira Code", "Consolas", monospace',
              fontSize: 16,
              lineHeight: 1.7,
              overflow: "hidden",
            }}
          >
            {/* Prompt */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <span style={{ color: "#a6e3a1", marginRight: 8 }}>
                {">"}
              </span>
              <span style={{ flex: 1 }}>
                {renderPromptText()}
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

            {/* Generating indicator */}
            {showDots && (
              <div style={{ color: "#cdd6f4", marginTop: 8 }}>
                {dotsText}
              </div>
            )}

            {/* Output lines */}
            {OUTPUT_LINES.map((line, i) => {
              const lineFrame = outputStart + i * outputLineDelay;
              const lineOpacity = interpolate(
                frame,
                [lineFrame, lineFrame + fps * 0.2],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              );
              const lineX = interpolate(
                frame,
                [lineFrame, lineFrame + fps * 0.2],
                [10, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
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

        {/* Storybook Preview - Right 45% */}
        <div
          style={{
            width: "45%",
            backgroundColor: "#f8f8f8",
            borderLeft: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Storybook header */}
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
              Tree view
            </span>
          </div>

          {/* Preview area — tree view */}
          <div
            style={{
              flex: 1,
              padding: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 48,
            }}
          >
            <div
              style={{
                width: 280,
                backgroundColor: "#ffffff",
                borderRadius: 8,
                border: "1px solid #e1e1e1",
                padding: "8px 0",
                fontFamily:
                  '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              {TREE_DATA.map((item, i) => {
                const itemFrame = treeStart + i * treeItemDelay;
                const itemSpring = spring({
                  frame: frame - itemFrame,
                  fps,
                  config: { damping: 14, stiffness: 120, mass: 0.6 },
                });
                const itemOpacity = interpolate(
                  itemSpring,
                  [0, 1],
                  [0, 1]
                );
                const itemX = interpolate(itemSpring, [0, 1], [20, 0]);

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: 32,
                      paddingLeft: 12 + item.level * 16,
                      paddingRight: 8,
                      opacity: itemOpacity,
                      transform: `translateX(${itemX}px)`,
                      backgroundColor:
                        item.label === "logo.svg"
                          ? "#e8f0fe"
                          : "transparent",
                    }}
                  >
                    {/* Chevron or spacer */}
                    <span style={{ width: 18, flexShrink: 0 }}>
                      {item.isFolder ? (
                        item.expanded ? (
                          <ChevronDown color="#505050" />
                        ) : (
                          <ChevronRight color="#505050" />
                        )
                      ) : null}
                    </span>
                    {/* Icon */}
                    <span
                      style={{
                        marginRight: 6,
                        fontSize: 16,
                        color: "#505050",
                      }}
                    >
                      {item.isFolder ? "\uD83D\uDCC1" : "\uD83D\uDCC4"}
                    </span>
                    {/* Label */}
                    <span
                      style={{
                        fontSize: 16,
                        color: "#505050",
                        fontWeight: item.isFolder ? 500 : 400,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.label}
                    </span>
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
