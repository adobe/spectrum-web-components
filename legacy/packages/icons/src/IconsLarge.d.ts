import { TemplateResult } from '@spectrum-web-components/base';
import { IconsetSVG } from '@spectrum-web-components/iconset/src/iconset-svg.js';
/**
 * @element sp-icons-large
 */
export declare class IconsLarge extends IconsetSVG {
    constructor();
    protected firstUpdated(): void;
    protected renderDefaultContent(): TemplateResult;
    /**
     * Overrides createIconName to make icon strings compatible with spectrum-icon id format
     * @param icon
     * @param size
     */
    protected getSVGIconName(icon: string): string;
    protected getSanitizedIconName(icon: string): string;
}
