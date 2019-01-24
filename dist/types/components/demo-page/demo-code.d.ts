import { LitElement } from '@polymer/lit-element';
import 'prismjs';
export declare class DemoCode extends LitElement {
    language: string;
    caption: string;
    hideCode: boolean;
    private highlightedCode;
    protected render(): import('lit-html').TemplateResult;
    private toggleCode;
    private codeHandler;
}
