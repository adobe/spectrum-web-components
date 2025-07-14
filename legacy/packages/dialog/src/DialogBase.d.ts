import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/underlay/sp-underlay.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import { Dialog } from './Dialog.js';
declare const DialogBase_base: typeof SpectrumElement;
/**
 * @element sp-dialog-base
 *
 * @slot - A Dialog element to display.
 * @fires close - Announces that the dialog has been closed.
 */
export declare class DialogBase extends DialogBase_base {
    static get styles(): CSSResultArray;
    dismissable: boolean;
    open: boolean;
    mode?: 'fullscreen' | 'fullscreenTakeover';
    /**
     * When set to true, fills screens smaller than 350px high and 400px wide with the full dialog.
     */
    responsive: boolean;
    private transitionPromise;
    private resolveTransitionPromise;
    underlay: boolean;
    protected get dialog(): Dialog;
    focus(): Promise<void>;
    private animating;
    overlayWillCloseCallback(): boolean;
    private dismiss;
    protected handleClose(event: Event): void;
    close(): void;
    private dispatchClosed;
    private handleTransitionEvent;
    protected handleUnderlayTransitionend(event: TransitionEvent): void;
    protected handleModalTransitionend(event: TransitionEvent): void;
    private get hasTransitionDuration();
    protected update(changes: PropertyValues<this>): void;
    protected renderDialog(): TemplateResult;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues<this>): void;
    /**
     * Bind the open/close transition into the update complete lifecycle so
     * that the overlay system can wait for it to be "visibly ready" before
     * attempting to throw focus into the content contained herein. Not
     * waiting for this can cause small amounts of page scroll to happen
     * while opening the Tray when focusable content is included: e.g. Menu
     * elements whose selected Menu Item is not the first Menu Item.
     */
    protected getUpdateComplete(): Promise<boolean>;
}
export {};
