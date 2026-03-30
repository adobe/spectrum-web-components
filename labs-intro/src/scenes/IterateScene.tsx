import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { BG_VIOLET_GLOW } from '../backgrounds';

const STEPS = [
  {
    label: 'Prompt',
    sublabel: 'Describe or paste a Figma link',
    icon: '💬',
    color: '#a6e3a1',
  },
  {
    label: 'Generate',
    sublabel: 'AI builds the component',
    icon: '⚡',
    color: '#cba6f7',
  },
  {
    label: 'Screenshot',
    sublabel: 'Playwright captures Storybook',
    icon: '📸',
    color: '#89b4fa',
  },
  {
    label: 'Compare',
    sublabel: 'Side-by-side with Figma',
    icon: '🔍',
    color: '#f9e2af',
  },
  {
    label: 'Iterate',
    sublabel: 'Refine until it matches',
    icon: '🔄',
    color: '#f38ba8',
  },
];

const ICON_SIZE = 88;

export const IterateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [-20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0d1117',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Img
        src={BG_VIOLET_GLOW}
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
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 64,
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
            }}
          >
            An iterative loop, not a one-shot
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#ffffff',
              fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
              marginTop: 16,
            }}
          >
            Claude screenshots your Storybook, compares it with Figma, and keeps
            refining
          </div>
        </div>

        {/* Icons row — just the circles and arrows, horizontally centered */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
          }}
        >
          {STEPS.map((step, i) => {
            const stepDelay = fps * 0.6 + i * fps * 0.4;
            const stepSpring = spring({
              frame: frame - stepDelay,
              fps,
              config: { damping: 12, stiffness: 90, mass: 0.8 },
            });
            const stepScale = interpolate(stepSpring, [0, 1], [0.5, 1]);
            const stepOpacity = interpolate(stepSpring, [0, 1], [0, 1]);

            const isIterate = i === STEPS.length - 1;
            const pulse = isIterate
              ? interpolate(
                  frame % (fps * 1.5),
                  [0, fps * 0.75, fps * 1.5],
                  [1, 1.06, 1],
                  { extrapolateRight: 'clamp' }
                )
              : 1;

            const arrowDelay = stepDelay + fps * 0.2;
            const arrowOpacity = interpolate(
              frame,
              [arrowDelay, arrowDelay + fps * 0.2],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );

            return (
              <div
                key={step.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Step column: icon + label + sublabel */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 200,
                    transform: `scale(${stepScale * pulse})`,
                    opacity: stepOpacity,
                  }}
                >
                  <div
                    style={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      borderRadius: ICON_SIZE / 2,
                      backgroundColor: `${step.color}20`,
                      border: `2px solid ${step.color}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 44,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: step.color,
                      fontFamily:
                        '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
                      textAlign: 'center',
                      marginTop: 14,
                      height: 36,
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      color: '#ffffff',
                      fontFamily:
                        '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
                      textAlign: 'center',
                      lineHeight: 1.4,
                      marginTop: 10,
                      height: 62,
                    }}
                  >
                    {step.sublabel}
                  </div>
                </div>

                {/* Arrow — aligned with icon center */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      height: ICON_SIZE,
                      width: 32,
                      justifyContent: 'center',
                      opacity: arrowOpacity,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 36,
                        color: '#ffffff',
                      }}
                    >
                      →
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Loop-back hint */}
        <div
          style={{
            fontSize: 28,
            color: '#ffffff',
            fontFamily: '"Adobe Clean", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          ← loops back to Prompt until the design matches →
        </div>
      </div>
    </AbsoluteFill>
  );
};
