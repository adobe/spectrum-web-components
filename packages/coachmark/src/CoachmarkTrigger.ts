/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    nothing,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { Overlay, Placement } from '@spectrum-web-components/overlay';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import type { CoachmarkItem } from './CoachmarkItem.js';
import './Coachmark.js';
import '@spectrum-web-components/overlay/sp-overlay.js';

/**
 * @element sp-coachmark-trigger
 */
export class CoachmarkTrigger extends SpectrumElement {
    @property({ type: String })
    public placement: Placement = 'right';

    @property({ type: Number })
    public offset = 6;

    @property({ type: Object })
    public item?: CoachmarkItem;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property()
    public triggerInteraction?: 'click' | 'longpress' | 'hover';

    @state()
    private triggerElement?: HTMLElement;

    @state()
    private canPlay = false;

    private onSlotChange(event: Event): void {
        const slotTarget = event.target as HTMLSlotElement;
        this.parseTriggerButton(slotTarget);
    }

    private parseTriggerButton(slotTarget: HTMLSlotElement): void {
        const nodes = slotTarget.assignedElements({ flatten: true });
        if (nodes.length === 0) {
            return;
        }
        this.triggerElement = nodes[0] as HTMLElement;
    }

    private handleBeforeToggle(
        event: Event & {
            target: Overlay;
            newState: 'open' | 'closed';
        }
    ): void {
        if (event.composedPath()[0] !== event.target) {
            return;
        }
        this.open = event.newState == 'open';
    }

    protected override render(): TemplateResult {
        return html`
            <slot
                name="trigger"
                id="trigger"
                @slotchange=${this.onSlotChange}
            ></slot>
            <sp-overlay
                .triggerElement=${this.triggerElement as HTMLElement}
                .triggerInteraction=${!this.triggerInteraction
                    ? 'hover'
                    : this.triggerInteraction}
                placement=${this.placement}
                .offset=${this.offset}
                @beforetoggle=${this.handleBeforeToggle}
                ?open=${this.open}
                id="coachmark"
            >
                ${this.item
                    ? html`
                          <sp-coachmark
                              id="coachmarkContent"
                              .content=${{
                                  title: this.item.heading,
                                  description: this.item.content,
                                  imageAlt: this.item.imageAlt,
                              }}
                              .source=${this.item.src}
                              media-type=${ifDefined(this.item.mediaType)}
                              video-type=${ifDefined(this.item.videoType)}
                              shortcut-key=${ifDefined(this.item.shortcutKey)}
                              .modifierKeys=${this.item.modifierKeys}
                              ?can-play="${this.canPlay}"
                              currentStep=${ifDefined(this.item.currentStep)}
                              totalSteps=${ifDefined(this.item.totalSteps)}
                              primary-cta=${ifDefined(this.item.primaryCTA)}
                              secondary-cta=${ifDefined(this.item.secondaryCTA)}
                          ></sp-coachmark>
                      `
                    : nothing}
            </sp-overlay>
        `;
    }
}
