import type { OverlayOptions, OverlayOptionsV1, TriggerInteractionsV1 } from './overlay-types.js';
import { Overlay } from './Overlay.js';
export declare function openOverlay(trigger: HTMLElement, interaction: TriggerInteractionsV1, content: HTMLElement, optionsV1: OverlayOptionsV1): Promise<() => void>;
export declare function openOverlay(content: HTMLElement, options?: OverlayOptions): Promise<Overlay>;
