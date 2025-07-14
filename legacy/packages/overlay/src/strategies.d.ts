import { ClickController } from './ClickController.js';
import { HoverController } from './HoverController.js';
import { LongpressController } from './LongpressController.js';
export declare const strategies: {
    click: typeof ClickController;
    longpress: typeof LongpressController;
    hover: typeof HoverController;
};
