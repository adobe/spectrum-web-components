import { html, TemplateResult } from '@spectrum-web-components/base';
export type { TemplateResult };
export type GenericTemplateLiteralTagType = (strings: TemplateStringsArray, ...values: unknown[]) => string;
type TemplateLiteralTagType = GenericTemplateLiteralTagType | typeof html;
export declare const tag: (strings: TemplateStringsArray, ...values: unknown[]) => string | TemplateResult;
export declare const setCustomTemplateLiteralTag: (tag: TemplateLiteralTagType) => void;
