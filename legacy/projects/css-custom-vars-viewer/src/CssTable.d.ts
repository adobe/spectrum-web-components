import { PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import type { TableItem } from '@spectrum-web-components/table';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/table/elements.js';
export interface Item extends TableItem {
    customVar: string;
    sets: {
        light: string;
        dark: string;
        darkest: string;
        wireframe: string;
    };
}
export declare class CssTable extends SpectrumElement {
    static styles: import("@spectrum-web-components/base").CSSResult;
    copyTimeout?: number;
    copiedText: string;
    colorTheme: 'light' | 'dark' | 'darkest' | 'wireframe';
    items: Item[];
    private copyText;
    private compareItems;
    renderItem: (item: Item) => TemplateResult;
    protected render(): TemplateResult;
    protected willUpdate(_changedProperties: PropertyValues): void;
}
