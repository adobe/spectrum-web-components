import { SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/swatch/sp-swatch.js';
import '@spectrum-web-components/swatch/sp-swatch-group.js';
import { TableItem } from '@spectrum-web-components/table';
import './sp-css-table.js';
export interface Item extends TableItem {
    customVar: string;
    sets: {
        light: string;
        dark: string;
        darkest: string;
        wireframe: string;
    };
}
export declare class CustomVarsViewer extends SpectrumElement {
    static styles: import("@spectrum-web-components/base").CSSResult;
    themeColor: string;
    colors: Item[];
    constructor();
    private _colors;
    protected handlePicker: (event: Event) => void;
    protected handleSwatchSelect: (event: Event) => void;
    protected render(): TemplateResult;
}
