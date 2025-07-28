import type { SpectrumElement } from '@spectrum-web-components/base';
import { Constructor } from './overlay-types.js';
import type { AbstractOverlay } from './AbstractOverlay.js';
export declare function OverlayNoPopover<T extends Constructor<AbstractOverlay>>(constructor: T): T & Constructor<SpectrumElement>;
