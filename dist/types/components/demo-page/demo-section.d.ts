import { LitElement } from '@polymer/lit-element/lit-element';
export declare class DemoSection extends LitElement {
    title: string;
    showDemoCode: boolean;
    protected render(): import('lit-html').TemplateResult;
    private toggleDemoCode;
    private codeHandler;
}
