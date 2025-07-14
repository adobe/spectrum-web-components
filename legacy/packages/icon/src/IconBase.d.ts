import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
export declare class IconBase extends SpectrumElement {
    static get styles(): CSSResultArray;
    private unsubscribeSystemContext;
    spectrumVersion: number;
    label: string;
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
    connectedCallback(): void;
    disconnectedCallback(): void;
    private systemResolver;
    protected update(changes: PropertyValues): void;
    protected render(): TemplateResult;
}
