import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-asset
 * @slot - content to be displayed in the asset when an acceptable value for `file` is not present
 */
export declare class Asset extends SpectrumElement {
    static get styles(): CSSResultArray;
    variant: 'file' | 'folder' | undefined;
    label: string;
    protected render(): TemplateResult;
}
