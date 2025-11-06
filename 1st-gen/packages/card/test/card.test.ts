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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import { Card } from '@spectrum-web-components/card';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import { setViewport } from '@web/test-runner-commands';

import { Checkbox } from '@spectrum-web-components/checkbox';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import {
    mouseClickOn,
    spaceEvent,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import {
    Default,
    Horizontal,
    href,
    StoryArgs,
} from '../stories/card.stories.js';

describe('card', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Card>(html`
                <sp-card heading="Card Heading" subheading="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            `)
    );
    it('loads', async () => {
        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" subheading="JPG">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
                <div slot="footer">Footer</div>
            </sp-card>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [quiet]', async () => {
        const el = await fixture<Card>(html`
            <sp-card variant="quiet" heading="Card Heading" subheading="JPG">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
                <div slot="description">10/15/18</div>
                <div slot="footer">Footer</div>
            </sp-card>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('loads - [quiet][small]', async () => {
        const el = await fixture<Card>(html`
            <sp-card
                size="s"
                heading="Card Heading"
                subheading="JPG"
                variant="quiet"
                style="width: 115px;"
            >
                <img
                    src="https://picsum.photos/300/400"
                    alt="Demo Graphic"
                    slot="preview"
                />
                <div slot="footer">Footer</div>
                <sp-action-menu
                    slot="actions"
                    placement="bottom-end"
                    label="More Actions"
                    quiet
                >
                    <sp-menu>
                        <sp-menu-item>Deselect</sp-menu-item>
                        <sp-menu-item>Select Inverse</sp-menu-item>
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and Mask...</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Save Selection</sp-menu-item>
                        <sp-menu-item disabled>Make Work Path</sp-menu-item>
                    </sp-menu>
                </sp-action-menu>
            </sp-card>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [gallery]', async () => {
        const el = await fixture<Card>(html`
            <sp-card variant="gallery" heading="Card Heading" subheading="JPG">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
                <div slot="description">10/15/18</div>
                <div slot="footer">Footer</div>
            </sp-card>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('applies block-size: 100% only to gallery and quiet variants', async () => {
        const variants = ['standard', 'gallery', 'quiet'] as const;
        const cards = await Promise.all(
            variants.map(async (variant) => {
                const card = await fixture<Card>(html`
                    <div style="height: 200px; position: relative;">
                        <sp-card
                            variant=${variant}
                            heading="${variant} Card"
                            style="position: absolute;"
                        >
                            <img
                                slot="preview"
                                src="https://picsum.photos/532/192"
                                alt="Slotted Preview"
                            />
                        </sp-card>
                    </div>
                `);
                await elementUpdated(card);
                return { variant, card: card.querySelector('sp-card') as Card };
            })
        );

        // Verify variant attributes are correctly set
        cards.forEach(({ variant, card }) => {
            expect(card.getAttribute('variant')).to.equal(variant);
        });

        // Verify that block-size: 100% is applied only to gallery and quiet variants
        const fullHeightVariants = ['gallery', 'quiet'];
        cards.forEach(({ variant, card }) => {
            const computedStyle = getComputedStyle(card);
            const blockSize = computedStyle.blockSize;

            if (fullHeightVariants.includes(variant)) {
                // For gallery and quiet variants, block-size should be 100% of container (200px)
                expect(blockSize).to.equal(
                    '200px',
                    `Expected ${variant} variant to have block-size: 100% (computed as 200px), but got ${blockSize}`
                );
            } else {
                // For standard variant, block-size should not be 100% of container
                expect(blockSize).to.not.equal(
                    '200px',
                    `Expected ${variant} variant to not have block-size: 100% (computed as 200px), but got ${blockSize}`
                );
            }
        });
    });

    it('loads - [horizontal]', async () => {
        const el = await fixture<Card>(
            Horizontal(Horizontal.args as StoryArgs)
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('[href] is clickable', async () => {
        const clickSpy = spy();
        const el = await fixture<Card>(href({}));

        await elementUpdated(el);

        el.addEventListener('click', (event: Event) => {
            const composedTarget = event.composedPath()[0] as HTMLElement;
            if (composedTarget.id !== 'like-anchor') return;
            clickSpy();
        });

        el.click();

        expect(clickSpy.callCount).to.equal(1);

        (el.shadowRoot.querySelector('#like-anchor') as HTMLElement).click();

        expect(clickSpy.callCount).to.equal(2);

        const img = el.querySelector('img') as HTMLImageElement;
        await sendMouse([
            {
                type: 'move',
                position: [img],
            },
            {
                type: 'down',
            },
            {
                type: 'up',
            },
        ]);

        expect(clickSpy.callCount).to.equal(3);
    });
    it('links in [href] do not pass their click', async () => {
        const clickSpy = spy();
        const el = await fixture<Card>(href({}));
        el.setAttribute(
            'style',
            [
                'width: 200px;',
                'display: inline-flex;',
                '--mod-card-preview-minimum-height: 136px;',
                '--mod-actionbutton-height: 32px;',
                '--spectrum-icon-tshirt-size-height: 18px;',
                '--spectrum-icon-tshirt-size-width: 18px;',
            ].join('')
        );

        await elementUpdated(el);
        el.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const path = event.composedPath();
            const hasLikeAnchor = path.some(
                (el) => (el as HTMLElement).id === 'like-anchor'
            );
            if (!hasLikeAnchor) return;
            clickSpy();
        });

        el.click();

        expect(
            clickSpy.callCount,
            'clickSpy.callCount after card click'
        ).to.equal(1);

        const footer = el.querySelector('[slot="footer"]') as HTMLElement;
        await mouseClickOn(footer, 'top-left');

        expect(
            clickSpy.callCount,
            'clickSpy.callCount after footer click'
        ).to.equal(2);

        const link = el.querySelector(
            'sp-link[href="https://google.com"]'
        ) as HTMLElement;
        link.setAttribute('style', 'display: block');
        await mouseClickOn(link, 'top-left');

        expect(
            clickSpy.callCount,
            'clickSpy.callCount after link click'
        ).to.equal(2);
    });
    it('converts `Space` to `click` event', async () => {
        const clickSpy = spy();
        const handleClick = (): void => clickSpy();
        const el = await fixture<Card>(Default(Default.args));
        el.addEventListener('click', handleClick);

        await elementUpdated(el);
        expect(el.focused, 'default focused').to.be.false;

        el.dispatchEvent(new Event('focusin'));
        await elementUpdated(el);
        expect(el.focused, 'first time focused').to.be.true;

        el.dispatchEvent(spaceEvent());
        await elementUpdated(el);
        expect(el.focused, 'still focused').to.be.true;
        expect(clickSpy.called).to.be.true;
        expect(clickSpy.calledOnce).to.be.true;
    });
    it('can be `[toggles]`', async () => {
        const el = await fixture<Card>(Default(Default.args));
        el.toggles = true;

        await elementUpdated(el);

        const checkbox = el.shadowRoot.querySelector('sp-checkbox') as Checkbox;
        expect(el.focused, 'default focused').to.be.false;
        expect(el.selected, 'default selected').to.be.false;

        el.dispatchEvent(new Event('focusin'));

        await elementUpdated(el);
        expect(el.focused, 'first time focused').to.be.true;
        expect(el.selected, 'still not selected').to.be.false;

        el.dispatchEvent(spaceEvent());

        await elementUpdated(el);
        expect(el.focused, 'still focused').to.be.true;
        expect(el.selected, 'first selected').to.be.true;

        el.addEventListener('change', (event: Event) => event.preventDefault());
        el.dispatchEvent(spaceEvent());

        await elementUpdated(el);
        expect(el.focused, 'still focused after default prevented').to.be.true;
        expect(el.selected, 'first selected after default prevented').to.be
            .true;

        checkbox.dispatchEvent(
            new Event('focusin', {
                composed: true,
                bubbles: true,
            })
        );
        checkbox.focus();

        await elementUpdated(el);
        expect(el.focused, 'still focused, again').to.be.true;
        expect(el.selected, 'still selected').to.be.true;

        el.dispatchEvent(new Event('focusin'));

        await elementUpdated(el);
        expect(el.focused, 'focused, again').to.be.true;
        expect(el.selected, 'still selected, again').to.be.true;

        el.dispatchEvent(new Event('focusout'));

        await elementUpdated(el);
        expect(el.focused, 'still not focused, again').to.be.false;
        expect(el.selected, 'still selected, again 2').to.be.true;

        el.dispatchEvent(new Event('focusout'));

        checkbox.click();

        await elementUpdated(el);
        expect(el.focused, 'still not focused, again 2').to.be.false;
        // change event is prevented
        expect(el.selected, 'still selected, again 3').to.be.true;
    });

    it('announces when `[toggles]`', async () => {
        const changeSpy = spy();
        const el = await fixture<Card>(Default(Default.args));
        el.toggles = true;
        el.addEventListener('change', changeSpy);

        await elementUpdated(el);

        const checkbox = el.shadowRoot.querySelector('sp-checkbox') as Checkbox;
        expect(el.selected, 'default to not selected').to.be.false;
        checkbox.click();
        await elementUpdated(el);

        expect(el.selected, 'selected').to.be.true;
        expect(changeSpy.callCount).to.equal(1);
        checkbox.click();
        await elementUpdated(el);

        expect(el.selected, 'no longer selected').to.be.false;
        expect(changeSpy.callCount).to.equal(2);
    });
    it('displays the `heading` attribute as `.title`', async () => {
        const testHeading = 'This is a test heading';
        const el = await fixture<Card>(html`
            <sp-card heading=${testHeading} subheading="JPG">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
                <div slot="footer">Footer</div>
            </sp-card>
        `);

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const headingEl = root.querySelector('.title');

        expect(headingEl, 'did not find title element').to.not.be.null;
        expect((headingEl as HTMLDivElement).textContent).to.contain(
            testHeading,
            'the heading renders in the element'
        );
    });
    it('displays the slotted content as `.title`', async () => {
        const testHeading = 'This is a test heading';
        const el = await fixture<Card>(html`
            <sp-card subheading="JPG">
                <h1 slot="heading">${testHeading}</h1>
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
                <div slot="footer">Footer</div>
            </sp-card>
        `);

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const headingSlot = root.querySelector(
            '.title [name="heading"]'
        ) as HTMLSlotElement;

        expect(headingSlot, 'did not find slot element').to.not.be.null;
        const nodes = headingSlot.assignedNodes();
        const h1Element = nodes.find(
            (node) => (node as HTMLElement).tagName === 'H1'
        );
        expect(h1Element, 'did not find H1 element').to.not.be.null;
        expect((h1Element as HTMLHeadingElement).textContent).to.contain(
            testHeading,
            'the slotted content renders in the element'
        );
    });
    it('does not trigger click when scrolling on mobile', async () => {
        // Set mobile viewport
        await setViewport({ width: 375, height: 667 }); // iPhone 8 dimensions

        const clickSpy = spy();
        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" href="https://example.com">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
                <div slot="description">Scroll test description</div>
            </sp-card>
        `);
        // Prevent default navigation
        el.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const composedTarget = event.composedPath()[0] as HTMLElement;
            if (composedTarget.id !== 'like-anchor') return;
            clickSpy();
        });
        await elementUpdated(el);

        const boundingRect = el.getBoundingClientRect();
        const startX = boundingRect.x + boundingRect.width / 2;
        const startY = boundingRect.y + boundingRect.height / 2;

        // Simulate touch start with mobile-like coordinates
        el.dispatchEvent(
            new PointerEvent('pointerdown', {
                clientX: startX,
                clientY: startY,
                pointerId: 1,
                pointerType: 'touch',
                pressure: 0.5, // Add pressure for touch simulation
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        // Simulate scroll movement with mobile-like velocity
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: startX,
                clientY: startY + 50, // Move 50px down to simulate scroll
                pointerId: 1,
                pointerType: 'touch',
                pressure: 0.5,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        // Simulate touch end
        el.dispatchEvent(
            new PointerEvent('pointerup', {
                clientX: startX,
                clientY: startY + 50,
                pointerId: 1,
                pointerType: 'touch',
                pressure: 0,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        // Verify that no click was triggered during scroll
        expect(clickSpy.called).to.be.false;

        // Now verify that a normal click works
        el.dispatchEvent(
            new PointerEvent('pointerdown', {
                clientX: startX,
                clientY: startY,
                pointerId: 1,
                pointerType: 'touch',
                pressure: 0.5,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        el.dispatchEvent(
            new PointerEvent('pointerup', {
                clientX: startX,
                clientY: startY,
                pointerId: 1,
                pointerType: 'touch',
                pressure: 0,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(clickSpy.called).to.be.true;
        expect(clickSpy.calledOnce).to.be.true;
    });

    it('sets aria-label attribute when label property is provided', async () => {
        const testLabel = 'Test Card Label';
        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" label=${testLabel}>
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('aria-label')).to.equal(testLabel);
    });

    it('removes aria-label attribute when label property is not provided', async () => {
        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        await elementUpdated(el);

        expect(el.hasAttribute('aria-label')).to.be.false;
    });

    it('updates aria-label attribute when label property changes', async () => {
        const initialLabel = 'Initial Label';
        const updatedLabel = 'Updated Label';

        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" label=${initialLabel}>
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        await elementUpdated(el);
        expect(el.getAttribute('aria-label')).to.equal(initialLabel);

        // Update the label property
        el.label = updatedLabel;
        await elementUpdated(el);

        expect(el.getAttribute('aria-label')).to.equal(updatedLabel);
    });

    it('removes aria-label attribute when label property is set to empty string', async () => {
        const initialLabel = 'Initial Label';

        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" label=${initialLabel}>
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        await elementUpdated(el);
        expect(el.getAttribute('aria-label')).to.equal(initialLabel);

        // Set label to empty string
        el.label = '';
        await elementUpdated(el);

        expect(el.hasAttribute('aria-label')).to.be.false;
    });

    it('removes aria-label attribute when label property is set to undefined', async () => {
        const initialLabel = 'Initial Label';

        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" label=${initialLabel}>
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        await elementUpdated(el);
        expect(el.getAttribute('aria-label')).to.equal(initialLabel);

        // Set label to undefined
        el.label = undefined;
        await elementUpdated(el);

        expect(el.hasAttribute('aria-label')).to.be.false;
    });

    it('removes aria-label attribute when label property is cleared', async () => {
        const initialLabel = 'Initial Label';

        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" label=${initialLabel}>
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        await elementUpdated(el);
        expect(el.getAttribute('aria-label')).to.equal(initialLabel);

        // Remove the label attribute to trigger the else branch
        el.removeAttribute('label');
        el.label = undefined;
        await elementUpdated(el);

        expect(
            el.hasAttribute('aria-label'),
            'aria-label should be removed when label is cleared'
        ).to.be.false;
    });

    it('does not set aria-label during firstUpdated when label is not provided', async () => {
        // Create element without a label to test firstUpdated else branch
        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        // The element should not have an aria-label attribute after firstUpdated
        expect(
            el.hasAttribute('aria-label'),
            'aria-label should not be set during firstUpdated when no label is provided'
        ).to.be.false;
    });

    it('removes aria-label during firstUpdated when label is explicitly set to empty string', async () => {
        // Create element with an empty label to test firstUpdated else branch
        const el = await fixture<Card>(html`
            <sp-card heading="Card Heading" label="">
                <img
                    slot="preview"
                    src="https://picsum.photos/532/192"
                    alt="Slotted Preview"
                />
            </sp-card>
        `);

        // The element should not have an aria-label attribute after firstUpdated
        expect(
            el.hasAttribute('aria-label'),
            'aria-label should be removed during firstUpdated when label is empty string'
        ).to.be.false;
    });
});
