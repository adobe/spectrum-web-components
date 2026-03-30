import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { BG_PURPLE } from '../backgrounds';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Spectrum Web Components Labs" label fades in first
  const labelOpacity = interpolate(frame, [fps * 0.1, fps * 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelY = interpolate(frame, [fps * 0.1, fps * 0.6], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headlineSpring = spring({
    frame: frame - fps * 0.4,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });

  const headlineScale = interpolate(headlineSpring, [0, 1], [0.3, 1]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]);

  const subtitleOpacity = interpolate(frame, [fps * 1.4, fps * 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtitleY = interpolate(frame, [fps * 1.4, fps * 2], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });


  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0d1117',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Img
        src={BG_PURPLE}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
        }}
      />
      <div style={{ textAlign: 'center', maxWidth: 1100, position: 'relative' }}>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            lineHeight: 1.2,
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
          }}
        >
          Spectrum Web Components <span style={{ color: '#9a47e2' }}>Labs</span>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: '#ffffff',
            fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            marginTop: 32,
            transform: `scale(${headlineScale})`,
            opacity: headlineOpacity,
          }}
        >
          Prototype Spectrum 2 web components with AI
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#ffffff',
            fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            marginTop: 20,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Real tokens. Real Web Components.{' '}
          <span style={{ color: '#9a47e2' }}>Your ideas.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
