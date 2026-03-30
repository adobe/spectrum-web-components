import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { BG_VIOLET_GLOW } from '../backgrounds';

const ROWS = [
  {
    icon: '\u2B21',
    iconColor: '#9a47e2',
    title: 'Real Spectrum 2 tokens',
    description:
      'Not mock values. The actual design system tokens used in production.',
  },
  {
    icon: '\u25C6',
    iconColor: '#0265dc',
    title: 'Real Web Components',
    description:
      'Lit-based elements that run in any browser. Same base classes as production.',
  },
  {
    icon: '\u25C8',
    iconColor: '#12805c',
    title: 'Real Storybook',
    description: 'Your prototype shows up right next to production components.',
  },
];

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [-20, 0]);

  // Fade out

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0d1117',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Img src={BG_VIOLET_GLOW} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
          maxWidth: 900,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 24,
          }}
        >
          Prototype with the actual system
        </div>

        {/* Rows */}
        {ROWS.map((row, i) => {
          const delay = fps * 0.8 * (i + 1);
          const rowSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 70, mass: 1 },
          });
          const rowX = interpolate(rowSpring, [0, 1], [-60, 0]);
          const rowOpacity = interpolate(rowSpring, [0, 1], [0, 1]);

          return (
            <div
              key={row.title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
                opacity: rowOpacity,
                transform: `translateX(${rowX}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  color: row.iconColor,
                  lineHeight: 1,
                  flexShrink: 0,
                  width: 48,
                  textAlign: 'center',
                }}
              >
                {row.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: '#ffffff',
                    fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  {row.title}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                    color: '#ffffff',
                    fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
                    lineHeight: 1.5,
                  }}
                >
                  {row.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
