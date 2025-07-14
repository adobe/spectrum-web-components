import { TemplateResult } from '@spectrum-web-components/base';
import { IconBase } from './IconBase.js';
/**
 * @element sp-icon
 */
export declare class Icon extends IconBase {
    src?: string;
    name?: string;
    private iconContainer?;
    private updateIconPromise?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    attributeChangedCallback(name: string, old: string, value: string): void;
    private iconsetListener;
    private announceIconImageSrcError;
    protected render(): TemplateResult;
    private updateIcon;
    private parseIcon;
    protected getUpdateComplete(): Promise<boolean>;
}
