import { SpectrumElement } from '@spectrum-web-components/base';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
import '@spectrum-web-components/overlay/sync/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
export declare class OnionSkinner extends SpectrumElement {
    onionLevel: number;
    private assignments;
    private leftThumbnail?;
    private rightThumbnail?;
    private handleOnionInput;
    private handleSlotchange;
    private allLeft;
    private allRight;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("@spectrum-web-components/base").CSSResult[];
}
