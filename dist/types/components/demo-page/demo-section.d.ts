import { LitElement } from '@polymer/lit-element/lit-element';
export declare class DemoSection extends LitElement {
    static is: string;
    title: string;
    showDemoCode: boolean;
    protected render(): import('lit-html').TemplateResult;
    private toggleDemoCode;
    private codeHandler;
}
