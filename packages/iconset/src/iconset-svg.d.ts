import { TemplateResult, PropertyValues } from 'lit-element';
import { Iconset } from './iconset';
export declare class IconsetSVG extends Iconset {
    private iconMap;
    private slotContainer?;
    /**
     * First updated handler just ensures we've processed any slotted symbols
     */
    updated(changedProperties: PropertyValues): void;
    /**
     * Applies the requested icon from this iconset instance to the given element.
     *
     * @param el - the element to apply the icon to
     * @param icon - the name of the icon within this set to apply.
     */
    applyIconToElement(
        el: HTMLElement,
        icon: string,
        size: string,
        label: string
    ): Promise<void>;
    /**
     * Returns a list of all icons in this iconset.
     */
    getIconList(): string[];
    protected prepareSvgClone(sourceSvg: SVGSymbolElement): SVGSVGElement;
    protected getSVGIconName(icon: string): string;
    protected getSanitizedIconName(icon: string): string;
    protected renderDefaultContent(): TemplateResult;
    protected render(): TemplateResult;
    protected updateSVG(nodes: SVGElement[]): void;
    protected getSVGNodes(slotTarget: HTMLSlotElement): SVGElement[];
    private onSlotChange;
}
