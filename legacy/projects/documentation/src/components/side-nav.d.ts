import { CSSResultArray, LitElement, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import './side-nav-search.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/underlay/sp-underlay.js';
export declare class SideNav extends LitElement {
    static get styles(): CSSResultArray;
    open: boolean;
    toggle(): void;
    isNarrow: boolean;
    focus(): void;
    handleTransitionEvent(event: TransitionEvent): void;
    render(): TemplateResult;
    updated(changes: PropertyValues): void;
}
