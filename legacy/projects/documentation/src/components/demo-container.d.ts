import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
export declare class DemoContainer extends SpectrumElement {
    static get styles(): CSSResultArray;
    scrollable: boolean;
    wrapper: HTMLDivElement;
    resizeController: ResizeController<void>;
    shouldUpdateScrollableState: () => void;
    render(): TemplateResult;
    firstUpdated(): void;
}
