import { html, css, CSSResult, TemplateResult } from 'lit-element';

export function toHtmlTemplateString(code: string): TemplateResult {
    const stringArray = [`${code}`] as any;
    stringArray.raw = [`${code}`];
    return html(stringArray as TemplateStringsArray);
}

export function toCssTemplateString(code: string): CSSResult {
    const stringArray = [`${code}`] as any;
    stringArray.raw = [`${code}`];
    return css(stringArray as TemplateStringsArray);
}
