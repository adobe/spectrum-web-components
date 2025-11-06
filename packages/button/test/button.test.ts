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
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import {
    a11ySnapshot,
    findAccessibilityNode,
    sendKeys,
} from '@web/test-runner-commands';
import { spy, stub } from 'sinon';
import {
    mouseClickOn,
    sendShiftTabKey,
    sendTabKey,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';

type TestableButtonType = {
    hasLabel: boolean;
};

describe('Button', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Button>(html`
                <sp-button>Button</sp-button>
            `)
    );
    describe('dev mode', () => {
        let consoleWarnStub!: ReturnType<typeof stub>;
        before(() => {
            window.__swc.verbose = true;
            consoleWarnStub = stub(console, 'warn');
        });
        afterEach(() => {
            consoleWarnStub.resetHistory();
        });
        after(() => {
            window.__swc.verbose = false;
            consoleWarnStub.restore();
        });

        it('warns in devMode when white/black variant is provided', async () => {
            const el = await fixture<Button>(html`
                <sp-button variant="white">Button</sp-button>
            `);

            await elementUpdated(el);
            expect(consoleWarnStub.called).to.be.true;

            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('deprecated'),
                'confirm deprecated variant warning'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-button',
                    type: 'api',
                    level: 'deprecation',
                },
            });
        });

        it('loads default', async () => {
            const el = await fixture<Button>(html`
                <sp-button>Button</sp-button>
            `);

            await elementUpdated(el);
            expect(el).to.not.be.undefined;
            expect(el.textContent).to.include('Button');
            await expect(el).to.be.accessible();

            // Applies a default variant as an stylable attribute
            expect(el.variant).to.equal('accent');
            expect(el.getAttribute('variant')).to.equal('accent');
        });
        it('loads default w/ an icon', async () => {
            const el = await fixture<Button>(html`
                <sp-button label="">
                    Button
                    <svg slot="icon"></svg>
                </sp-button>
            `);

            await elementUpdated(el);
            expect(el).to.not.be.undefined;
            expect(el.textContent).to.include('Button');
            expect(!(el as unknown as { hasIcon: boolean }).hasIcon);
            await expect(el).to.be.accessible();
        });
        it('loads default only icon', async () => {
            const el = await fixture<Button>(html`
                <sp-button label="Button" icon-only>
                    <svg slot="icon"></svg>
                </sp-button>
            `);

            await elementUpdated(el);
            expect(el).to.not.be.undefined;
            await expect(el).to.be.accessible();
        });
        it('has a stable/predictable `updateComplete`', async () => {
            const test = await fixture<HTMLDivElement>(html`
                <div></div>
            `);

            let keydownTime = -1;
            let updateComplete1 = -1;
            let updateComplete2 = -1;

            const el = document.createElement('sp-button');
            el.autofocus = true;
            el.addEventListener('keydown', () => {
                keydownTime = performance.now();
            });
            el.updateComplete.then(() => {
                updateComplete1 = performance.now();
            });
            el.updateComplete.then(() => {
                updateComplete2 = performance.now();
            });
            test.append(el);
            // don't use elementUpdated(), as it is under test...
            await nextFrame();
            await nextFrame();
            await nextFrame();
            await nextFrame();

            expect(keydownTime, 'keydown happened').to.not.eq(-1);
            expect(updateComplete1, 'first update complete happened').to.not.eq(
                -1
            );
            expect(updateComplete2, 'first update complete happened').to.not.eq(
                -1
            );
            expect(updateComplete1).lte(updateComplete2);
            expect(updateComplete2).lte(keydownTime);
        });
        it('manages "role"', async () => {
            const el = await fixture<Button>(html`
                <sp-button>Button</sp-button>
            `);

            await elementUpdated(el);
            expect(el.getAttribute('role')).to.equal('button');

            el.setAttribute('href', '#');

            await elementUpdated(el);
            expect(el.getAttribute('role')).to.equal('link');

            el.removeAttribute('href');

            await elementUpdated(el);
            expect(el.getAttribute('role')).to.equal('button');
        });
        it('allows label to be toggled', async () => {
            const testNode = document.createTextNode('Button');
            const el = await fixture<Button>(html`
                <sp-button>
                    ${testNode}
                    <svg slot="icon"></svg>
                </sp-button>
            `);

            await elementUpdated(el);

            const labelTestableEl = el as unknown as TestableButtonType;

            expect(labelTestableEl.hasLabel, 'starts with label').to.be.true;

            testNode.textContent = '';

            await elementUpdated(el);

            await waitUntil(
                () => !labelTestableEl.hasLabel,
                'label is removed'
            );

            testNode.textContent = 'Button';

            await elementUpdated(el);

            expect(labelTestableEl.hasLabel, 'label is returned').to.be.true;
        });
        it('loads with href', async () => {
            const el = await fixture<Button>(html`
                <sp-button href="test_url">With Href</sp-button>
            `);

            await elementUpdated(el);
            expect(el).to.not.be.undefined;
            expect(el.textContent).to.include('With Href');
        });
        it('loads with href and target', async () => {
            const el = await fixture<Button>(html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `);

            await elementUpdated(el);
            expect(el).to.not.be.undefined;
            expect(el.textContent).to.include('With Target');
        });
        it('allows link click', async () => {
            let clicked = false;
            const el = await fixture<Button>(html`
                <sp-button href="#top">Button as link</sp-button>
            `);

            await elementUpdated(el);

            // prevents browser from activating link but records the proxy click
            el.shadowRoot
                ?.querySelector('.anchor')
                ?.addEventListener('click', (event: Event) => {
                    event.preventDefault();
                    clicked = true;
                });

            // tests mouse click events, and by extension VoiceOver CRTL+Option+Space click
            await mouseClickOn(el);
            await elementUpdated(el);
            expect(clicked).to.be.true;
        });
        it('dispatches only one click event per user interaction', async () => {
            let clickCount = 0;
            const el = await fixture<Button>(html`
                <sp-button
                    href="https://example.com/test.pdf"
                    download="test.pdf"
                >
                    Download
                </sp-button>
            `);

            await elementUpdated(el);

            // Track all click events on the button
            el.addEventListener('click', () => {
                clickCount++;
            });

            // Prevent the anchor from actually navigating
            el.shadowRoot
                ?.querySelector('.anchor')
                ?.addEventListener('click', (event: Event) => {
                    event.preventDefault();
                });

            // Simulate a user click
            await mouseClickOn(el);
            await elementUpdated(el);

            // Should only have one click event, not two
            expect(clickCount).to.equal(1);
        });
        it('allows keyboard activation with href', async () => {
            let clickCount = 0;
            const el = await fixture<Button>(html`
                <sp-button
                    href="https://example.com/test.pdf"
                    download="test.pdf"
                >
                    Download
                </sp-button>
            `);

            await elementUpdated(el);

            // Track all click events on the button
            el.addEventListener('click', () => {
                clickCount++;
            });

            // Prevent the anchor from actually navigating
            el.shadowRoot
                ?.querySelector('.anchor')
                ?.addEventListener('click', (event: Event) => {
                    event.preventDefault();
                });

            // Test Enter key
            el.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(clickCount).to.equal(1);

            // Test Space key
            clickCount = 0;
            await sendKeys({ press: 'Space' });
            await elementUpdated(el);
            expect(clickCount).to.equal(1);
        });
        it('accepts shift+tab interactions', async () => {
            let focusedCount = 0;
            const el = await fixture<Button>(html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `);

            await elementUpdated(el);
            const input = document.createElement('input');
            el.insertAdjacentElement('beforebegin', input);
            input.focus();
            expect(document.activeElement === input).to.be.true;

            el.addEventListener('focus', () => {
                focusedCount += 1;
            });
            expect(focusedCount).to.equal(0);

            await sendTabKey();
            await elementUpdated(el);

            expect(document.activeElement === el).to.be.true;
            expect(focusedCount).to.equal(1);

            await sendShiftTabKey();
            await elementUpdated(el);

            expect(focusedCount).to.equal(1);
            expect(document.activeElement === input).to.be.true;
        });
        it('manages `disabled`', async () => {
            const clickSpy = spy();
            const el = await fixture<Button>(html`
                <sp-button @click=${() => clickSpy()}>Button</sp-button>
            `);

            await elementUpdated(el);
            el.click();
            await elementUpdated(el);
            expect(clickSpy.calledOnce).to.be.true;

            clickSpy.resetHistory();
            el.disabled = true;
            await elementUpdated(el);
            el.click();
            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(0);

            clickSpy.resetHistory();
            await elementUpdated(el);
            el.dispatchEvent(new Event('click', {}));
            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(0);

            clickSpy.resetHistory();
            el.disabled = false;
            el.click();
            await elementUpdated(el);
            expect(clickSpy.calledOnce).to.be.true;
        });
        it('`disabled` manages `tabindex`', async () => {
            const el = await fixture<Button>(html`
                <sp-button disabled>Button</sp-button>
            `);

            await elementUpdated(el);
            expect(el.tabIndex).to.equal(-1);
            expect(el.getAttribute('tabindex')).to.equal('-1');

            el.disabled = false;
            await elementUpdated(el);

            expect(el.tabIndex).to.equal(0);
            expect(el.getAttribute('tabindex')).to.equal('0');

            el.disabled = true;
            await elementUpdated(el);

            expect(el.tabIndex).to.equal(-1);
            expect(el.getAttribute('tabindex')).to.equal('-1');
        });
        it('manages `aria-disabled`', async () => {
            const el = await fixture<Button>(html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `);

            await elementUpdated(el);

            expect(el.hasAttribute('aria-disabled'), 'initially not').to.be
                .false;

            el.disabled = true;
            await elementUpdated(el);

            expect(el.getAttribute('aria-disabled')).to.equal('true');

            el.disabled = false;
            await elementUpdated(el);

            expect(el.hasAttribute('aria-disabled'), 'finally not').to.be.false;
        });
        it('manages aria-label from disabled state', async () => {
            const el = await fixture<Button>(html`
                <sp-button
                    href="test_url"
                    target="_blank"
                    label="clickable"
                    disabled
                    pending-label="Pending Button"
                >
                    Click me
                </sp-button>
            `);

            await elementUpdated(el);

            expect(el.getAttribute('aria-label')).to.equal('clickable');

            // button set to pending while disabled and the aria-label should stay the same
            el.pending = true;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('clickable');

            // button set to enabled while pending is true and the aria-label should update
            el.disabled = false;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('Pending Button');

            // pending is removed and the aria-label should be back to the original
            el.pending = false;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('clickable');
        });

        it('manages aria-label from pending state', async () => {
            const el = await fixture<Button>(html`
                <sp-button href="test_url" target="_blank" label="clickable">
                    Click me
                </sp-button>
            `);
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('clickable');

            // button set to pending and aria-label should update
            el.pending = true;
            await elementUpdated(el);
            expect(el.pending).to.be.true;
            expect(el.getAttribute('aria-label')).to.equal('Pending');

            // pending is removed and the aria-label should not change as the button is disabled
            el.pending = false;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('clickable');
        });

        it('updates aria-label when label changes', async () => {
            const el = await fixture<Button>(html`
                <sp-button label="Initial label">Button</sp-button>
            `);

            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('Initial label');

            // Change the label
            el.label = 'New Label';
            await elementUpdated(el);

            // The aria-label should also update
            expect(el.getAttribute('aria-label')).to.equal('New Label');
        });

        it('preserves aria-label when slot content changes', async () => {
            const el = await fixture<Button>(html`
                <sp-button label="Test label">Initial Content</sp-button>
            `);

            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('Test label');

            // Change the slot content
            el.textContent = 'Updated content';
            await elementUpdated(el);

            // The aria-label should still be preserved
            expect(el.getAttribute('aria-label')).to.equal('Test label');

            // Change slot content again
            el.innerHTML = '<span>New content</span>';
            await elementUpdated(el);

            // The aria-label should still be preserved
            expect(el.getAttribute('aria-label')).to.equal('Test label');
        });

        it('manages aria-label set from outside', async () => {
            const el = await fixture<Button>(html`
                <sp-button
                    href="test_url"
                    target="_blank"
                    aria-label="test"
                    pending-label="Pending Button"
                >
                    Click me
                </sp-button>
            `);
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('test');

            // button set to pending and aria-label should update
            el.pending = true;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('Pending Button');

            // button set to disabled while pending and aria-label should update
            el.disabled = true;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('test');

            // button set to enabled while pending and aria-label should update
            el.disabled = false;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('Pending Button');

            // pending removed and aria-label should update
            el.pending = false;
            await elementUpdated(el);
            expect(el.getAttribute('aria-label')).to.equal('test');
        });

        it('updates pending label accessibly', async () => {
            const el = await fixture<Button>(html`
                <sp-button href="test_url" target="_blank">Button</sp-button>
            `);

            await elementUpdated(el);
            el.pending = true;
            await elementUpdated(el);

            await nextFrame();

            type NamedNode = { name: string };
            let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };
            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Pending'
                ),
                '`Pending` is the label text'
            ).to.not.be.null;

            expect(el.pending).to.be.true;

            // remove pending state
            el.pending = false;
            await elementUpdated(el);

            await nextFrame();

            snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
                children: NamedNode[];
            };

            // check label returns to previous value
            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Button'
                ),
                '`Button` is the label text'
            ).to.not.be.null;

            expect(el.pending).to.be.false;
        });

        it('manages tabIndex while disabled', async () => {
            const el = await fixture<Button>(html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `);

            await elementUpdated(el);

            expect(el.tabIndex).to.equal(0);

            el.disabled = true;
            await elementUpdated(el);

            expect(el.tabIndex).to.equal(-1);

            el.tabIndex = 2;
            await elementUpdated(el);

            expect(el.tabIndex).to.equal(-1);

            el.disabled = false;
            await elementUpdated(el);

            expect(el.tabIndex).to.equal(2);
        });
        it('swallows `click` interaction when `[disabled]`', async () => {
            const clickSpy = spy();
            const el = await fixture<Button>(html`
                <sp-button disabled @click=${() => clickSpy()}>
                    Button
                </sp-button>
            `);

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(0);

            el.click();

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(0);
        });
        it('translates keyboard interactions to click', async () => {
            const clickSpy = spy();
            const el = await fixture<Button>(html`
                <sp-button @click=${() => clickSpy()}>Button</sp-button>
            `);

            await elementUpdated(el);

            el.dispatchEvent(
                new KeyboardEvent('keypress', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'Enter',
                    key: 'Enter',
                })
            );

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(1);
            clickSpy.resetHistory();

            el.dispatchEvent(
                new KeyboardEvent('keypress', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'NumpadEnter',
                    key: 'NumpadEnter',
                })
            );

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(1);
            clickSpy.resetHistory();

            el.dispatchEvent(
                new KeyboardEvent('keypress', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'Space',
                    key: 'Space',
                })
            );

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(0);
            clickSpy.resetHistory();

            el.dispatchEvent(
                new KeyboardEvent('keydown', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'Space',
                    key: 'Space',
                })
            );
            el.dispatchEvent(
                new KeyboardEvent('keyup', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'Space',
                    key: 'Space',
                })
            );

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(1);
            clickSpy.resetHistory();

            el.dispatchEvent(
                new KeyboardEvent('keydown', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'Space',
                    key: 'Space',
                })
            );
            el.dispatchEvent(
                new KeyboardEvent('keyup', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'KeyG',
                    key: 'g',
                })
            );

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(0);

            el.dispatchEvent(
                new KeyboardEvent('keyup', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'Space',
                    key: 'Space',
                })
            );
            clickSpy.resetHistory();

            el.dispatchEvent(
                new KeyboardEvent('keydown', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'KeyG',
                    key: 'g',
                })
            );
            el.dispatchEvent(
                new KeyboardEvent('keyup', {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    code: 'Space',
                    key: 'Space',
                })
            );

            await elementUpdated(el);
            expect(clickSpy.callCount).to.equal(0);
        });
        it('proxies clicks by "type"', async () => {
            const submitSpy = spy();
            const resetSpy = spy();
            const test = await fixture<HTMLFormElement>(html`
                <form
                    @submit=${(event: Event): void => {
                        event.preventDefault();
                        submitSpy();
                    }}
                    @reset=${(event: Event): void => {
                        event.preventDefault();
                        resetSpy();
                    }}
                >
                    <sp-button>Button</sp-button>
                </form>
            `);
            const el = test.querySelector('sp-button') as Button;

            await elementUpdated(el);
            el.type = 'submit';

            await elementUpdated(el);
            el.click();

            expect(submitSpy.callCount).to.equal(1);
            expect(resetSpy.callCount).to.equal(0);

            el.type = 'reset';

            await elementUpdated(el);
            el.click();

            expect(submitSpy.callCount).to.equal(1);
            expect(resetSpy.callCount).to.equal(1);

            el.type = 'button';

            await elementUpdated(el);
            el.click();

            expect(submitSpy.callCount).to.equal(1);
            expect(resetSpy.callCount).to.equal(1);
        });
        it('manages "active" while focused', async () => {
            const el = await fixture<Button>(html`
                <sp-button label="Button">
                    <svg slot="icon"></svg>
                </sp-button>
            `);

            await elementUpdated(el);
            el.focus();
            await elementUpdated(el);
            await sendKeys({ down: 'Space' });
            await elementUpdated(el);
            expect(el.active).to.be.true;
            await sendKeys({ up: 'Space' });
            await elementUpdated(el);
            expect(el.active).to.be.false;
        });
        describe('deprecated variants and attributes', () => {
            it('manages [quiet]', async () => {
                const el = await fixture<Button>(html`
                    <sp-button quiet>Button</sp-button>
                `);

                await elementUpdated(el);
                expect(el.treatment).to.equal('outline');

                el.quiet = false;

                await elementUpdated(el);
                expect(el.treatment).to.equal('fill');
            });
            it('upgrades [variant="cta"] to [variant="accent"]', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="cta">Button</sp-button>
                `);

                await elementUpdated(el);
                expect(el.variant).to.equal('accent');
            });
            it('manages [variant="overBackground"]', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="overBackground">Button</sp-button>
                `);

                await elementUpdated(el);
                expect(el.getAttribute('variant')).to.not.equal(
                    'overBackground'
                );
                expect(el.treatment).to.equal('outline');
                expect(el.staticColor).to.equal('white');
            });
            ['white', 'black'].forEach((variant) => {
                it(`manages [variant="${variant}"]`, async () => {
                    const el = await fixture<Button>(html`
                        <sp-button variant="${variant as 'white' | 'black'}">
                            Button
                        </sp-button>
                    `);

                    await elementUpdated(el);
                    expect(el.hasAttribute('variant')).to.not.equal(variant);
                    expect(el.staticColor).to.equal(variant);
                    expect(el.getAttribute('static-color')).to.equal(variant);
                });
            });
            it('forces [variant="accent"]', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="not-supported">Button</sp-button>
                `);

                await elementUpdated(el);
                expect(el.variant).to.equal('accent');
            });
            it('allows variant and static-color to coexist', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="accent" static-color="white">
                        Button
                    </sp-button>
                `);

                await elementUpdated(el);
                expect(el.variant).to.equal('accent');
                expect(el.getAttribute('variant')).to.equal('accent');
                expect(el.staticColor).to.equal('white');
                expect(el.getAttribute('static-color')).to.equal('white');

                // Test changing both properties
                el.variant = 'primary';
                el.staticColor = 'black';
                await elementUpdated(el);
                expect(el.variant).to.equal('primary');
                expect(el.getAttribute('variant')).to.equal('primary');
                expect(el.staticColor).to.equal('black');
                expect(el.getAttribute('static-color')).to.equal('black');

                // Test removing static-color while keeping variant
                el.staticColor = undefined;
                await elementUpdated(el);
                expect(el.variant).to.equal('primary');
                expect(el.getAttribute('variant')).to.equal('primary');
                expect(el.staticColor).to.be.undefined;
                expect(el.hasAttribute('static-color')).to.be.false;
            });
        });
        it('handles modifier key clicks correctly', async () => {
            const el = await fixture<Button>(html`
                <sp-button href="#test">Button with href</sp-button>
            `);

            await elementUpdated(el);

            const anchorElement = el.shadowRoot?.querySelector(
                '.anchor'
            ) as HTMLAnchorElement;
            expect(anchorElement).to.not.be.undefined;

            // Set up spies instead of counters
            const buttonClickSpy = spy();
            const anchorClickSpy = spy();

            // Prevent actual navigation but track anchor clicks with spy
            anchorElement.addEventListener('click', (event) => {
                event.preventDefault();
                anchorClickSpy();
            });

            // Track button clicks with spy
            el.addEventListener('click', buttonClickSpy);

            // Test normal click - should proxy to anchor
            const normalClick = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            });

            buttonClickSpy.resetHistory();
            anchorClickSpy.resetHistory();

            el.dispatchEvent(normalClick);
            await elementUpdated(el);

            expect(
                anchorClickSpy.called,
                'Normal click should be proxied to the anchor'
            ).to.be.true;

            buttonClickSpy.resetHistory();
            anchorClickSpy.resetHistory();

            const metaClick = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                metaKey: true,
            });

            el.dispatchEvent(metaClick);
            await elementUpdated(el);

            expect(
                buttonClickSpy.called,
                'Meta+click should be received by the button'
            ).to.be.true;
            expect(
                anchorClickSpy.called,
                'Meta+click should NOT be proxied to the anchor'
            ).to.be.false;

            buttonClickSpy.resetHistory();
            anchorClickSpy.resetHistory();

            const ctrlClick = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                ctrlKey: true,
            });

            el.dispatchEvent(ctrlClick);
            await elementUpdated(el);

            expect(
                buttonClickSpy.called,
                'Ctrl+click should be received by the button'
            ).to.be.true;
            expect(
                anchorClickSpy.called,
                'Ctrl+click should NOT be proxied to the anchor'
            ).to.be.false;
        });
    });
});
