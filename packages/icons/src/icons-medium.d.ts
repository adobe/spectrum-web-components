import { TemplateResult } from 'lit-element';
import { IconsetSVG } from '@spectrum-web-components/iconset/lib/iconset-svg';
export declare class IconsMedium extends IconsetSVG {
    constructor();
    protected renderDefaultContent(): TemplateResult;
    /**
     * Overrides createIconName to make icon strings compatible with spectrum-icon id format
     * @param icon
     * @param size
     */
    protected getSVGIconName(icon: string): string;
    protected getSanitizedIconName(icon: string): string;
}
