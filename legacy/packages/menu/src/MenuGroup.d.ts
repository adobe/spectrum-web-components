import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { Menu } from './Menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
/**
 * @element sp-menu-group
 *
 * @slot header - headline of the menu group
 * @slot - menu items to be listed in the group
 */
export declare class MenuGroup extends Menu {
    static get styles(): CSSResultArray;
    private headerId;
    private headerElements;
    private headerElement?;
    /**
     * a menu group must have the role `group`
     * and should never function as a menu
     */
    protected get ownRole(): string;
    /**
     * only a menu controls roving tabindex;
     * groups should defer navigation to parent menu
     */
    protected get controlsRovingTabindex(): boolean;
    protected updateLabel(): void;
    render(): TemplateResult;
}
