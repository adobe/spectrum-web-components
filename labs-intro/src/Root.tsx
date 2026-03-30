import { Composition } from "remotion";
import { LabsIntro } from "./LabsIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LabsIntro"
      component={LabsIntro}
      durationInFrames={1110}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
