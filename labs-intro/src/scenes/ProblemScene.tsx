import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BG_BLUE } from "../backgrounds";

const FigmaMockup: React.FC<{ opacity: number; x: number }> = ({
  opacity,
  x,
}) => (
  <div
    style={{
      opacity,
      transform: `translateX(${x}px)`,
      width: 420,
      height: 380,
      backgroundColor: "#1c1c1e",
      borderRadius: 16,
      border: "1px solid #333",
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}
  >
    <div
      style={{
        fontSize: 22,
        color: "#ffffff",
        fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: "uppercase",
      }}
    >
      Design
    </div>
    <div
      style={{
        flex: 1,
        borderRadius: 12,
        backgroundColor: "#2a2a2e",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          height: 40,
          borderRadius: 8,
          backgroundColor: "#9a47e2",
          opacity: 0.7,
        }}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <div
          style={{
            flex: 1,
            height: 60,
            borderRadius: 8,
            backgroundColor: "#0265dc",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            flex: 1,
            height: 60,
            borderRadius: 8,
            backgroundColor: "#12805c",
            opacity: 0.6,
          }}
        />
      </div>
      <div
        style={{
          height: 30,
          borderRadius: 8,
          backgroundColor: "#e68619",
          opacity: 0.5,
          width: "60%",
        }}
      />
    </div>
  </div>
);

const CodeBlock: React.FC<{ opacity: number; x: number }> = ({
  opacity,
  x,
}) => {
  const lines = [
    { indent: 0, color: "#c678dd", text: "class", rest: " SwatchGrid" },
    { indent: 1, color: "#61afef", text: "static styles", rest: " = css`" },
    { indent: 2, color: "#98c379", text: ":host", rest: " {" },
    { indent: 3, color: "#e5c07b", text: "display", rest: ": grid;" },
    { indent: 2, color: "#abb2bf", text: "}", rest: "" },
    { indent: 1, color: "#abb2bf", text: "`", rest: ";" },
    { indent: 1, color: "#61afef", text: "render", rest: "() {" },
    {
      indent: 2,
      color: "#c678dd",
      text: "return",
      rest: " html`...`",
    },
    { indent: 1, color: "#abb2bf", text: "}", rest: "" },
    { indent: 0, color: "#abb2bf", text: "}", rest: "" },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        width: 420,
        height: 380,
        backgroundColor: "#1e1e2e",
        borderRadius: 16,
        border: "1px solid #333",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
        fontSize: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 22,
          color: "#ffffff",
          fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Code
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{ paddingLeft: line.indent * 20 }}>
          <span style={{ color: line.color }}>{line.text}</span>
          <span style={{ color: "#abb2bf" }}>{line.rest}</span>
        </div>
      ))}
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const figmaSlide = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60, mass: 1 },
  });
  const figmaX = interpolate(figmaSlide, [0, 1], [-400, 0]);
  const figmaOpacity = interpolate(figmaSlide, [0, 1], [0, 1]);

  const codeSlide = spring({
    frame: frame - fps * 0.3,
    fps,
    config: { damping: 14, stiffness: 60, mass: 1 },
  });
  const codeX = interpolate(codeSlide, [0, 1], [400, 0]);
  const codeOpacity = interpolate(codeSlide, [0, 1], [0, 1]);

  const gapOpacity = interpolate(frame, [fps * 1, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(frame, [fps * 1.8, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [fps * 1.8, fps * 2.5], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });


  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d1117",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img src={BG_BLUE} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 60,
          position: "relative",
        }}
      >
        <FigmaMockup opacity={figmaOpacity} x={figmaX} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: gapOpacity,
          }}
        >
          <div
            style={{
              width: 80,
              borderTop: "3px dashed #ffffff",
            }}
          />
          <div
            style={{
              fontSize: 56,
              color: "#ffffff",
              fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            }}
          >
            ?
          </div>
          <div
            style={{
              width: 80,
              borderTop: "3px dashed #ffffff",
            }}
          />
        </div>
        <CodeBlock opacity={codeOpacity} x={codeX} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 160,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          fontSize: 56,
          fontWeight: 600,
          color: "#ffffff",
          fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
          letterSpacing: 2,
        }}
      >
        Closing the handoff gap
      </div>
    </AbsoluteFill>
  );
};
