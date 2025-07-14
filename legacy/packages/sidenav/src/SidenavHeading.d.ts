import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-sidenav-heading
 *
 * @slot - the Sidenav Items to display in association with the heading
 */
export declare class SideNavHeading extends SpectrumElement {
    label: string;
    static get styles(): CSSResultArray;
    protected update(changes: PropertyValues): void;
    protected render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues<this>): void;
}
