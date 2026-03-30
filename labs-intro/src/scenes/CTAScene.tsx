import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { BG_PURPLE } from '../backgrounds';

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in background
  const fadeIn = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // "yarn start:labs" springs in
  const cmdSpring = spring({
    frame: frame - fps * 0.2,
    fps,
    config: { damping: 10, stiffness: 80, mass: 1 },
  });
  const cmdScale = interpolate(cmdSpring, [0, 1], [0.5, 1]);
  const cmdOpacity = interpolate(cmdSpring, [0, 1], [0, 1]);

  // "No code experience needed." fades in
  const subOpacity = interpolate(frame, [fps * 1, fps * 1.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subY = interpolate(frame, [fps * 1, fps * 1.5], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bottom text
  const bottomOpacity = interpolate(frame, [fps * 1.8, fps * 2.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0d1117',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
      }}
    >
      <Img
        src={BG_PURPLE}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.7,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            lineHeight: 1.2,
            maxWidth: 1100,
            textAlign: 'center',
            transform: `scale(${cmdScale})`,
            opacity: cmdOpacity,
          }}
        >
          Spectrum Web Components <span style={{ color: '#9a47e2' }}>Labs</span>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: '#ffffff',
            fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '16px 40px',
            borderRadius: 16,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          yarn start:labs
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#ffffff',
            fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            opacity: bottomOpacity,
            marginTop: 16,
          }}
        >
          No code experience needed.
        </div>
      </div>
    </AbsoluteFill>
  );
};
