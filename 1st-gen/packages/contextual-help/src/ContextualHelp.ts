/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {
    CSSResultArray,
    html,
    render,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import {
    IS_MOBILE,
    MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import styles from './contextual-help.css.js';

export const DEFAULT_ARIA_LABELS = {
    help: 'Help',
    info: 'Information',
} as const;

/**
 * Spectrum Contextual help provides additional information about
 * the state of either an adjacent component or an entire view.
 * @element sp-contextual-help
 *
 * @slot heading - content to display as the heading of the popover
 * @slot Text content to display in the popover
 * @slot link - link to additional informations
 */
export class ContextualHelp extends SpectrumElement {
    public isMobile = new MatchMediaController(this, IS_MOBILE);

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Provides an accessible name for the action button trigger.
     * @param {String} label
     */
    @property()
    public label?: string;

    /**
     * The `variant` property applies specific styling on the action button trigger.
     * @param {String} variant
     */
    @property()
    public variant: 'info' | 'help' = 'info';

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement = 'bottom-start';

    /**
     * The `offset` property accepts either a single number, to
     * define the offset of the Popover along the main axis from
     * the action button, or 2-tuple, to define the offset along the
     * main axis and the cross axis.
     */
    @property({ type: Number })
    public offset: number | [number, number] = 0;

    @property({ type: Boolean })
    open = false;

    static instanceCount = 0;
    private popoverId: string;
    private contentId: string;

    constructor() {
        super();
        const id = ContextualHelp.instanceCount++;
        this.popoverId = `contextual-help-popover-${id}`;
        this.contentId = `contextual-help-content-${id}`;
    }

    public get buttonAriaLabel(): string {
        if (this.label) {
            return this.label;
        } else {
            if (this.variant === 'help') {
                return DEFAULT_ARIA_LABELS.help;
            }
            return DEFAULT_ARIA_LABELS.info;
        }
    }

    private renderOverlayContent(): TemplateResult {
        if (this.isMobile.matches) {
            import('@spectrum-web-components/dialog/sp-dialog-base.js');
            import('@spectrum-web-components/dialog/sp-dialog.js');

            // sp-dialog (via AlertDialog) handles aria-labelledby and aria-describedby
            // automatically from the heading and content slots, so we rely on that native handling
            // ID is still needed for aria-controls on the button
            return html`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s" id=${this.popoverId}>
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `;
        } else {
            import('@spectrum-web-components/popover/sp-popover.js');

            return html`
                <sp-popover
                    class="popover"
                    id=${this.popoverId}
                    role="region"
                    aria-labelledby=${this.contentId}
                >
                    <section id=${this.contentId}>
                        <div>
                            <slot name="heading"></slot>
                        </div>
                        <div class="body">
                            <slot></slot>
                        </div>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `;
        }
    }

    private handleSlottableRequest(event: SlottableRequestEvent): void {
        event.stopPropagation();

        if (event.data === removeSlottableRequest) {
            this.open = false;
            render(undefined, event.target as HTMLElement);
            return;
        }

        this.open = true;
        const template = this.renderOverlayContent();
        render(template, event.target as HTMLElement);
    }

    protected override render(): TemplateResult {
        /* c8 ignore next 3 */
        const actualPlacement = this.isMobile.matches
            ? undefined
            : this.placement;

        return html`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                aria-haspopup=${ifDefined(
                    this.isMobile.matches ? 'dialog' : undefined
                )}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-controls=${this.popoverId}
                .active=${this.open}
            >
                ${this.variant === 'help'
                    ? html`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `
                    : html`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
                      `}
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${ifDefined(actualPlacement)}
                type=${this.isMobile.matches ? 'modal' : 'auto'}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `;
    }
}
