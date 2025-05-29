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

import { expect } from '@open-wc/testing';
import { stub } from 'sinon';
import {
    isFirefox,
    isWebKit,
} from '@spectrum-web-components/shared/src/platform.js';

// for window.__swc
import '@spectrum-web-components/base';

// mostly alphabetical,
// but reordered to put dependents above dependencies,
// in order to avoid transitive dependency conflicts (eg card -> asset)
const elements = {
    'sp-accordion-item': () =>
        import('@spectrum-web-components/accordion/sp-accordion-item.js'),
    'sp-accordion': () =>
        import('@spectrum-web-components/accordion/sp-accordion.js'),
    'sp-action-bar': () =>
        import('@spectrum-web-components/action-bar/sp-action-bar.js'),
    'sp-action-menu': () =>
        import('@spectrum-web-components/action-menu/sp-action-menu.js'),
    'sp-action-button': () =>
        import('@spectrum-web-components/action-button/sp-action-button.js'),
    'sp-action-group': () =>
        import('@spectrum-web-components/action-group/sp-action-group.js'),
    'sp-card': () => import('@spectrum-web-components/card/sp-card.js'),
    'sp-asset': () => import('@spectrum-web-components/asset/sp-asset.js'),
    'sp-avatar': () => import('@spectrum-web-components/avatar/sp-avatar.js'),
    'sp-badge': () => import('@spectrum-web-components/badge/sp-badge.js'),
    'sp-dialog-wrapper': () =>
        import('@spectrum-web-components/dialog/sp-dialog-wrapper.js'),
    'sp-dialog': () => import('@spectrum-web-components/dialog/sp-dialog.js'),
    'sp-dialog-base': () =>
        import('@spectrum-web-components/dialog/sp-dialog-base.js'),
    'sp-button': () => import('@spectrum-web-components/button/sp-button.js'),
    'sp-button-group': () =>
        import('@spectrum-web-components/button-group/sp-button-group.js'),
    'sp-checkbox': () =>
        import('@spectrum-web-components/checkbox/sp-checkbox.js'),
    'sp-coachmark': () =>
        import('@spectrum-web-components/coachmark/sp-coachmark.js'),
    'sp-color-area': () =>
        import('@spectrum-web-components/color-area/sp-color-area.js'),
    'sp-color-handle': () =>
        import('@spectrum-web-components/color-handle/sp-color-handle.js'),
    'sp-color-loupe': () =>
        import('@spectrum-web-components/color-loupe/sp-color-loupe.js'),
    'sp-color-slider': () =>
        import('@spectrum-web-components/color-slider/sp-color-slider.js'),
    'sp-color-wheel': () =>
        import('@spectrum-web-components/color-wheel/sp-color-wheel.js'),
    'sp-divider': () =>
        import('@spectrum-web-components/divider/sp-divider.js'),
    'sp-dropzone': () =>
        import('@spectrum-web-components/dropzone/sp-dropzone.js'),
    'sp-meter': () => import('@spectrum-web-components/meter/sp-meter.js'),
    'sp-field-group': () =>
        import('@spectrum-web-components/field-group/sp-field-group.js'),
    'sp-field-label': () =>
        import('@spectrum-web-components/field-label/sp-field-label.js'),
    'sp-help-text': () =>
        import('@spectrum-web-components/help-text/sp-help-text.js'),
    'sp-icon': () => import('@spectrum-web-components/icon/sp-icon.js'),
    'sp-icons-medium': () =>
        import('@spectrum-web-components/icons/sp-icons-medium.js'),
    'sp-icons-large': () =>
        import('@spectrum-web-components/icons/sp-icons-large.js'),
    'sp-illustrated-message': () =>
        import(
            '@spectrum-web-components/illustrated-message/sp-illustrated-message.js'
        ),
    'sp-link': () => import('@spectrum-web-components/link/sp-link.js'),
    'sp-menu-group': () =>
        import('@spectrum-web-components/menu/sp-menu-group.js'),
    'sp-menu-item': () =>
        import('@spectrum-web-components/menu/sp-menu-item.js'),
    'sp-menu': () => import('@spectrum-web-components/menu/sp-menu.js'),
    'overlay-trigger': () =>
        import('@spectrum-web-components/overlay/overlay-trigger.js'),
    'sp-overlay': () =>
        import('@spectrum-web-components/overlay/sp-overlay.js'),
    'sp-picker': () => import('@spectrum-web-components/picker/sp-picker.js'),
    'sp-picker-button': () =>
        import('@spectrum-web-components/picker-button/sp-picker-button.js'),
    'sp-popover': () =>
        import('@spectrum-web-components/popover/sp-popover.js'),
    'sp-progress-bar': () =>
        import('@spectrum-web-components/progress-bar/sp-progress-bar.js'),
    'sp-progress-circle': () =>
        import(
            '@spectrum-web-components/progress-circle/sp-progress-circle.js'
        ),
    'sp-radio-group': () =>
        import('@spectrum-web-components/radio/sp-radio-group.js'),
    'sp-radio': () => import('@spectrum-web-components/radio/sp-radio.js'),
    'sp-search': () => import('@spectrum-web-components/search/sp-search.js'),
    'sp-sidenav-item': () =>
        import('@spectrum-web-components/sidenav/sp-sidenav-item.js'),
    'sp-sidenav': () =>
        import('@spectrum-web-components/sidenav/sp-sidenav.js'),
    'sp-slider': () => import('@spectrum-web-components/slider/sp-slider.js'),
    'sp-slider-handle': () =>
        import('@spectrum-web-components/slider/sp-slider-handle.js'),
    'sp-split-view': () =>
        import('@spectrum-web-components/split-view/sp-split-view.js'),
    'sp-status-light': () =>
        import('@spectrum-web-components/status-light/sp-status-light.js'),
    'sp-swatch-group': () =>
        import('@spectrum-web-components/swatch/sp-swatch-group.js'),
    'sp-swatch': () => import('@spectrum-web-components/swatch/sp-swatch.js'),
    'sp-switch': () => import('@spectrum-web-components/switch/sp-switch.js'),
    'sp-table': () => import('@spectrum-web-components/table/sp-table.js'),
    'sp-table-body': () =>
        import('@spectrum-web-components/table/sp-table-body.js'),
    'sp-table-cell': () =>
        import('@spectrum-web-components/table/sp-table-cell.js'),
    'sp-table-head': () =>
        import('@spectrum-web-components/table/sp-table-head.js'),
    'sp-table-checkbox-cell': () =>
        import('@spectrum-web-components/table/sp-table-checkbox-cell.js'),
    'sp-table-head-cell': () =>
        import('@spectrum-web-components/table/sp-table-head-cell.js'),
    'sp-table-row': () =>
        import('@spectrum-web-components/table/sp-table-row.js'),
    'sp-tab': () => import('@spectrum-web-components/tabs/sp-tab.js'),
    'sp-tabs': () => import('@spectrum-web-components/tabs/sp-tabs.js'),
    'sp-tabs-overflow': () =>
        import('@spectrum-web-components/tabs/sp-tabs-overflow.js'),
    'sp-tag': () => import('@spectrum-web-components/tags/sp-tag.js'),
    'sp-tags': () => import('@spectrum-web-components/tags/sp-tags.js'),
    'sp-textfield': () =>
        import('@spectrum-web-components/textfield/sp-textfield.js'),
    'sp-thumbnail': () =>
        import('@spectrum-web-components/thumbnail/sp-thumbnail.js'),
    'sp-toast': () => import('@spectrum-web-components/toast/sp-toast.js'),
    'sp-tooltip': () =>
        import('@spectrum-web-components/tooltip/sp-tooltip.js'),
    'sp-top-nav': () =>
        import('@spectrum-web-components/top-nav/sp-top-nav.js'),
    'sp-tray': () => import('@spectrum-web-components/tray/sp-tray.js'),
    'sp-underlay': () =>
        import('@spectrum-web-components/underlay/sp-underlay.js'),
};

const browser: 'webkit' | 'firefox' | 'chromium' = isWebKit()
    ? 'webkit'
    : isFirefox()
      ? 'firefox'
      : 'chromium';

describe('define-element', function () {
    // registrations are globally-unique, so retries will always fail
    this.retries(0);

    beforeEach(function () {
        window.__swc.verbose = true;
        this.warn = stub(console, 'warn');
    });

    afterEach(function () {
        this.warn.resetHistory();
        window.__swc.verbose = false;
        this.warn.restore();
    });

    Object.entries(elements).forEach(([name, register]) =>
        it(`'${name}' warns on redefinition`, async function () {
            // classes already-defined via transitive dependencies can't be tested this way
            if (customElements.get(name)) {
                this.skip();
            }
            const error = {
                webkit: 'Cannot define multiple custom elements with the same tag name',
                firefox: `'${name}' has already been defined`,
                chromium: `"${name}" has already been used with this registry`,
            }[browser];
            let caughtError: Error | undefined;

            customElements.define(name, class extends HTMLElement {});
            try {
                await register();
            } catch (error) {
                caughtError = error as Error;
            }

            expect(caughtError?.message ?? '').to.include(error);
            expect(this.warn.called, 'should call console.warn()').to.be.true;
            const spyCall = this.warn.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('redefine'),
                `message should warn about redefining an element, instead got "${spyCall.args.at(
                    0
                )}"`
            ).to.be.true;
        })
    );
});
