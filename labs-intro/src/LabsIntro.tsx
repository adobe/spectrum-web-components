import { AbsoluteFill, Sequence } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SwatchDemoScene } from "./scenes/SwatchDemoScene";
import { TreeDemoScene } from "./scenes/TreeDemoScene";
import { IterateScene } from "./scenes/IterateScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { CTAScene } from "./scenes/CTAScene";

export const LabsIntro: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Hook (0-120, 4s) */}
      <Sequence from={0} durationInFrames={120} premountFor={0}>
        <TitleScene />
      </Sequence>

      {/* Scene 2: Closing the handoff gap (120-270, 5s) */}
      <Sequence from={120} durationInFrames={150} premountFor={30}>
        <ProblemScene />
      </Sequence>

      {/* Scene 3a: Demo — Color Swatches (270-450, 6s) */}
      <Sequence from={270} durationInFrames={180} premountFor={30}>
        <SwatchDemoScene />
      </Sequence>

      {/* Scene 3b: Demo — Tree View from Figma (450-630, 6s) */}
      <Sequence from={450} durationInFrames={180} premountFor={30}>
        <TreeDemoScene />
      </Sequence>

      {/* Scene 4: Iterative Loop (630-810, 6s) */}
      <Sequence from={630} durationInFrames={180} premountFor={30}>
        <IterateScene />
      </Sequence>

      {/* Scene 5: Prototype with the actual system (810-990, 6s) */}
      <Sequence from={810} durationInFrames={180} premountFor={30}>
        <HowItWorksScene />
      </Sequence>

      {/* Scene 6: CTA (990-1110, 4s) */}
      <Sequence from={990} durationInFrames={120} premountFor={30}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
