import { CSSResultArray, LitElement, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import type { ResultGroup } from './search-index.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/search/sp-search.js';
export declare class SearchComponent extends LitElement {
    private menuEl;
    private open;
    private overlayEl;
    private popoverEl;
    private searchField;
    static get styles(): CSSResultArray;
    results: ResultGroup[];
    focus(): void;
    private handleSearchPointerdown;
    private handleKeydown;
    private focusResults;
    private openPopover;
    private closePopover;
    handleSubmit(event: Event): void;
    private updateSearchResults;
    private handleMenuFocusout;
    renderResults(): TemplateResult;
    render(): TemplateResult;
    protected firstUpdated(_changedProperties: PropertyValues): void;
}
