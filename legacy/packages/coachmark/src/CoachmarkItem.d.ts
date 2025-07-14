export type CoachmarkItem = {
    id?: string;
    heading: string;
    shortcutKey?: string;
    modifierKeys?: string[];
    content: string;
    src?: string;
    imageAlt?: string;
    mediaType?: string;
    currentStep?: number;
    totalSteps?: number;
    primaryCTA?: string;
    secondaryCTA?: string;
};
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video"
}
