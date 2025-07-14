import { CSSResultArray, LitElement, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/theme/sp-theme.js';
import type { Color, Scale, SystemVariant } from '@spectrum-web-components/theme';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import './adobe-logo.js';
import './code-example.js';
export interface TrackTheme {
    callback: (color: Color) => void;
}
export declare class LayoutElement extends LitElement {
    static get styles(): CSSResultArray;
    private alerts;
    color: Color;
    dir: 'ltr' | 'rtl';
    open: boolean;
    private isNarrow;
    theme: SystemVariant;
    scale: Scale;
    system: SystemVariant;
    private themeRoot;
    startManagingContentDirection(el: HTMLElement): Promise<void>;
    stopManagingContentDirection(el: HTMLElement): Promise<void>;
    private _themeTrackers;
    private handleMatchMediaChange;
    private closeSettings;
    private updateColor;
    private updateScale;
    private updateSystem;
    private updateDirection;
    private handleTrackTheme;
    private copyText;
    private addAlert;
    private get sideNav();
    private get settingsContent();
    private get manageTheme();
    private get header();
    render(): TemplateResult<1>;
    protected firstUpdated(): void;
    updated(changes: PropertyValues): void;
}
