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
} from '@open-wc/testing';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import { spy } from 'sinon';

describe('Button', () => {
    describe('aether variant', () => {
        let appendChildSpy: ReturnType<typeof spy> | undefined;

        afterEach(() => {
            // Clean up any spies
            if (appendChildSpy) {
                appendChildSpy.restore();
                appendChildSpy = undefined;
            }

            // Clean up any remaining particles from the DOM
            const particles =
                document.body.querySelectorAll('.aether-particle');
            particles.forEach((particle) => particle.remove());
        });

        it('loads with custom DOM structure', async () => {
            const el = await fixture<Button>(html`
                <sp-button variant="aether" icon-only label="Test">
                    <svg slot="icon"></svg>
                </sp-button>
            `);

            await elementUpdated(el);
            expect(el).to.not.be.undefined;
            expect(el.variant).to.equal('aether');

            const aetherWrapper =
                el.shadowRoot?.querySelector('.aether-wrapper');
            expect(aetherWrapper, 'aether wrapper element present').to.not.be
                .null;

            const aetherBlur = el.shadowRoot?.querySelector('.aether-blur');
            expect(aetherBlur, 'aether blur element present').to.not.be.null;

            const aetherGradient =
                el.shadowRoot?.querySelector('.aether-gradient');
            expect(aetherGradient, 'aether gradient element present').to.not.be
                .null;

            const aetherReflection =
                el.shadowRoot?.querySelector('.aether-reflection');
            expect(aetherReflection, 'aether reflection element present').to.not
                .be.null;
        });

        it('does not render aether structure for other variants', async () => {
            const el = await fixture<Button>(html`
                <sp-button variant="accent">Button</sp-button>
            `);

            await elementUpdated(el);

            const aetherWrapper =
                el.shadowRoot?.querySelector('.aether-wrapper');
            expect(aetherWrapper, 'aether-specific elements not present').to.be
                .null;
        });

        it('is accessible', async () => {
            const el = await fixture<Button>(html`
                <sp-button variant="aether" icon-only label="Test Button">
                    <svg slot="icon"></svg>
                </sp-button>
            `);

            await elementUpdated(el);
            await expect(el).to.be.accessible();
        });

        describe('particle effects', () => {
            it('manages aetherParticles property', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);

                expect(el.aetherParticles, 'defaults to true').to.be.true;

                el.aetherParticles = false;
                await elementUpdated(el);
                expect(el.aetherParticles, 'can be set to false').to.be.false;
            });

            it('creates particles on click', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                appendChildSpy = spy(document.body, 'appendChild');

                el.click();
                await elementUpdated(el);

                const particleCalls = appendChildSpy
                    .getCalls()
                    .filter(
                        (call: { args: unknown[] }) =>
                            call.args[0] instanceof HTMLElement &&
                            call.args[0].classList.contains('aether-particle')
                    );
                expect(particleCalls.length, 'creates 15 particles').to.equal(
                    15
                );
            });

            it('does not create particles when aetherParticles is false', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                // Verify default state
                expect(el.aetherParticles, 'starts as true').to.be.true;

                // Ensure no particles from setup
                const particlesBeforeChange =
                    document.body.querySelectorAll('.aether-particle');
                particlesBeforeChange.forEach((p) => p.remove());

                // Set aetherParticles to false programmatically
                el.aetherParticles = false;
                await el.updateComplete;
                await elementUpdated(el);
                await nextFrame();

                // Verify property is actually false
                expect(el.aetherParticles, 'now set to false').to.be.false;

                // Ensure still no particles before click
                const particlesBeforeClick =
                    document.body.querySelectorAll('.aether-particle');
                expect(
                    particlesBeforeClick.length,
                    'no particles before click'
                ).to.equal(0);

                appendChildSpy = spy(document.body, 'appendChild');

                el.click();
                await elementUpdated(el);
                await nextFrame();

                // Check both spy calls AND actual DOM
                const particleCalls = appendChildSpy
                    .getCalls()
                    .filter(
                        (call: { args: unknown[] }) =>
                            call.args[0] instanceof HTMLElement &&
                            call.args[0].classList.contains('aether-particle')
                    );

                const particlesInDOM =
                    document.body.querySelectorAll('.aether-particle');

                expect(
                    particleCalls.length,
                    'no spy calls for particles'
                ).to.equal(0);
                expect(particlesInDOM.length, 'no particles in DOM').to.equal(
                    0
                );
            });

            it('does not create particles when button is disabled', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test" disabled>
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                appendChildSpy = spy(document.body, 'appendChild');

                el.click();
                await elementUpdated(el);

                const particleCalls = appendChildSpy
                    .getCalls()
                    .filter(
                        (call: { args: unknown[] }) =>
                            call.args[0] instanceof HTMLElement &&
                            call.args[0].classList.contains('aether-particle')
                    );
                expect(
                    particleCalls.length,
                    'no particles when button disabled'
                ).to.equal(0);
            });

            it('removes particles after animation completes', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                const particlesBefore =
                    document.body.querySelectorAll('.aether-particle').length;
                expect(particlesBefore, 'starts with no particles').to.equal(0);

                el.click();
                await elementUpdated(el);

                const particles =
                    document.body.querySelectorAll('.aether-particle');
                expect(particles.length, 'particles created on click').to.equal(
                    15
                );

                const firstParticle = particles[0] as HTMLElement;
                const animation = firstParticle.getAnimations()[0];

                if (animation) {
                    animation.finish();
                    await nextFrame();

                    expect(
                        document.body.contains(firstParticle),
                        'particle removed after animation'
                    ).to.be.false;
                }
            });
        });

        describe('reflection hotspot', () => {
            it('initializes reflection element', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                const reflectionElement = el.shadowRoot?.querySelector(
                    '.aether-reflection'
                ) as HTMLElement;
                expect(reflectionElement, 'reflection element exists').to.not.be
                    .null;

                const rect = el.getBoundingClientRect();
                const mouseMoveEvent = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2,
                });

                window.dispatchEvent(mouseMoveEvent);
                await nextFrame();
                await nextFrame();

                const angle =
                    reflectionElement.style.getPropertyValue('--hotspot-angle');
                const opacity =
                    reflectionElement.style.getPropertyValue(
                        '--hotspot-opacity'
                    );

                expect(angle, 'hotspot angle CSS variable set').to.not.be.empty;
                expect(opacity, 'hotspot opacity CSS variable set').to.not.be
                    .empty;
            });

            it('updates hotspot angle on mousemove', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                const reflectionElement = el.shadowRoot?.querySelector(
                    '.aether-reflection'
                ) as HTMLElement;

                const rect = el.getBoundingClientRect();
                const mouseMoveEvent = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    clientX: rect.left + rect.width / 2 + 10,
                    clientY: rect.top + rect.height / 2,
                });

                window.dispatchEvent(mouseMoveEvent);
                await nextFrame();
                await nextFrame();

                const angle =
                    reflectionElement.style.getPropertyValue('--hotspot-angle');

                expect(angle, 'hotspot angle updates on mouse move').to.not.be
                    .empty;
            });

            it('fades out hotspot when mouse moves away', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                const reflectionElement = el.shadowRoot?.querySelector(
                    '.aether-reflection'
                ) as HTMLElement;

                const mouseMoveEvent = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 10000,
                    clientY: 10000,
                });

                window.dispatchEvent(mouseMoveEvent);
                await nextFrame();
                await nextFrame();

                const opacity = parseFloat(
                    reflectionElement.style.getPropertyValue(
                        '--hotspot-opacity'
                    ) || '0'
                );
                expect(
                    opacity,
                    'hotspot fades when far away'
                ).to.be.lessThanOrEqual(0.01);
            });
        });

        describe('variant switching', () => {
            it('cleans up event listeners on variant change', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="aether" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);
                await nextFrame();

                el.variant = 'accent';
                await elementUpdated(el);

                const aetherWrapper =
                    el.shadowRoot?.querySelector('.aether-wrapper');
                expect(
                    aetherWrapper,
                    'aether elements removed on variant change'
                ).to.be.null;
            });

            it('re-initializes aether effects when switching back', async () => {
                const el = await fixture<Button>(html`
                    <sp-button variant="accent" icon-only label="Test">
                        <svg slot="icon"></svg>
                    </sp-button>
                `);

                await elementUpdated(el);

                el.variant = 'aether';
                await elementUpdated(el);
                await nextFrame();

                const aetherWrapper =
                    el.shadowRoot?.querySelector('.aether-wrapper');
                expect(
                    aetherWrapper,
                    'aether elements restored on variant change'
                ).to.not.be.null;

                appendChildSpy = spy(document.body, 'appendChild');

                el.click();
                await elementUpdated(el);

                const particleCalls = appendChildSpy
                    .getCalls()
                    .filter(
                        (call: { args: unknown[] }) =>
                            call.args[0] instanceof HTMLElement &&
                            call.args[0].classList.contains('aether-particle')
                    );
                expect(
                    particleCalls.length,
                    'particle effects work after switching back'
                ).to.equal(15);
            });
        });
    });
});
