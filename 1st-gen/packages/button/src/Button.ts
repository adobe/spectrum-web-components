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
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ButtonBase } from './ButtonBase.js';
import buttonStyles from './button.css.js';
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';

/* eslint-disable-next-line import/no-extraneous-dependencies */
import { when } from 'lit-html/directives/when.js';

export type DeprecatedButtonVariants = 'cta' | 'overBackground';
export type ButtonStaticColors = 'white' | 'black';
export type ButtonVariants =
    | 'accent'
    | 'primary'
    | 'secondary'
    | 'negative'
    | 'aether'
    | 'aetherInitial'
    | 'aetherSimple'
    | ButtonStaticColors
    | DeprecatedButtonVariants;
export const VALID_VARIANTS = [
    'accent',
    'primary',
    'secondary',
    'negative',
    'white',
    'black',
    'aether',
    'aetherInitial',
    'aetherSimple',
];
export const VALID_STATIC_COLORS = ['white', 'black'];

export type ButtonTreatments = 'fill' | 'outline';

/**
 * @element sp-button
 *
 * @slot - text label of the Button
 * @slot icon - The icon to use for Button
 */
export class Button extends SizedMixin(ButtonBase, { noDefaultSize: true }) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }

    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Pending';

    // Use this property to set the button into a pending state
    @property({ type: Boolean, reflect: true, attribute: true })
    public pending = false;

    public pendingStateController: PendingStateController<this>;

    /**
     * Initializes the `PendingStateController` for the Button component.
     * The `PendingStateController` manages the pending state of the Button.
     */
    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }

    public override click(): void {
        if (this.pending) {
            return;
        }
        super.click();
    }

    protected override firstUpdated(changes: PropertyValues<this>): void {
        super.firstUpdated(changes);
        // There is no Spectrum design context for an `<sp-button>` without a variant
        // apply one manually when a consumer has not applied one themselves.

        if (!this.hasAttribute('variant')) {
            this.setAttribute('variant', this.variant);
        }
        if (this.pending) {
            this.pendingStateController.hostUpdated();
        }

        // Set up aether effects
        if (
            this.variant === 'aether' ||
            this.variant === 'aetherSimple' ||
            this.variant === 'aetherInitial'
        ) {
            this.addEventListener('click', this.handleAetherClick);
            this.setupAetherReflection();
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);

        // Handle variant changes for aether
        if (changes.has('variant')) {
            const oldVariant = changes.get('variant');
            if (
                oldVariant === 'aether' ||
                oldVariant === 'aetherSimple' ||
                this.variant === 'aetherInitial'
            ) {
                this.removeEventListener('click', this.handleAetherClick);
                this.cleanupAetherReflection();
            }
            if (
                this.variant === 'aether' ||
                this.variant === 'aetherSimple' ||
                this.variant === 'aetherInitial'
            ) {
                this.addEventListener('click', this.handleAetherClick);
                this.setupAetherReflection();
            }
        }
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        if (
            this.variant === 'aether' ||
            this.variant === 'aetherSimple' ||
            this.variant === 'aetherInitial'
        ) {
            this.cleanupAetherReflection();
        }
    }

    /**
     * The visual variant to apply to this button.
     */
    @property()
    public get variant(): ButtonVariants {
        return this._variant;
    }
    public set variant(variant: ButtonVariants) {
        if (variant === this.variant) return;

        this.requestUpdate('variant', this.variant);
        switch (variant) {
            case 'cta':
                this._variant = 'accent';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "cta" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "variant='accent'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/#variants',
                        { level: 'deprecation' }
                    );
                }
                break;
            case 'overBackground':
                this.removeAttribute('variant');
                this.staticColor = 'white';
                this.treatment = 'outline';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "overBackground" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "staticColor='white'" with "treatment='outline'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button',
                        { level: 'deprecation' }
                    );
                }
                return;
            case 'white':
                this.staticColor = 'white';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "white" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='white'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/api',
                        { level: 'deprecation' }
                    );
                }
                return;
            case 'black':
                this.staticColor = 'black';
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `The "black" value of the "variant" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='black'" instead.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/button/api',
                        { level: 'deprecation' }
                    );
                }
                return;
            case null:
                return;
            default:
                if (!VALID_VARIANTS.includes(variant)) {
                    this._variant = 'accent';
                } else {
                    this._variant = variant;
                }
                break;
        }
        this.setAttribute('variant', this.variant);
    }
    private _variant: ButtonVariants = 'accent';

    /**
     * The static color variant to use for this button.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'black' | 'white';

    /**
     * The visual treatment to apply to this button.
     */
    @property({ reflect: true })
    public treatment: ButtonTreatments = 'fill';

    /**
     * Style this button to be less obvious
     */
    @property({ type: Boolean })
    public set quiet(quiet: boolean) {
        this.treatment = quiet ? 'outline' : 'fill';
    }

    /**
     * Disables text wrapping within the button component's label.
     * Please note that this option is not a part of the design specification
     * and should be used carefully, with consideration of this overflow behavior
     * and the readability of the button's content.
     */
    @property({ type: Boolean, attribute: 'no-wrap', reflect: true })
    public noWrap = false;

    /**
     * Enable particle effects for the aether variant.
     */
    @property({ type: Boolean, attribute: 'aether-particles' })
    public aetherParticles = false;

    /**
     * Show test image for development purposes.
     */
    @property({ type: Boolean, attribute: 'show-test-image' })
    public showTestImage = false;

    private reflectionElement?: HTMLElement;
    private animationFrameId?: number;
    private targetHotspotAngle = 0;
    private currentHotspotAngle = 0;
    private targetOpacity = 0;
    private currentOpacity = 0;

    public get quiet(): boolean {
        return this.treatment === 'outline';
    }

    protected override renderButton(): TemplateResult {
        if (this.variant === 'aetherInitial') {
            return html`
                <div class="aether">
                    <div class="aether-wrapper">
                        <div class="aether-blur"></div>
                        <div class="aether-gradient"></div>
                        <div class="aether-reflection"></div>
                        <div class="button">
                            <slot
                                name="icon"
                                ?icon-only=${!this.hasLabel}
                            ></slot>
                            <span class="label">
                                <slot
                                    @slotchange=${this.manageTextObservedSlot}
                                ></slot>
                            </span>
                        </div>
                    </div>

                    ${when(
                        this.showTestImage,
                        () => html`
                            <div class="test"></div>
                        `
                    )}
                </div>
            `;
        }
        if (this.variant === 'aether') {
            return html`
                <div class="aether-wrapper">
                    <div class="aether-outerShadow"></div>
                    <div class="aether-gradientStroke"></div>
                    <div class="aether-gradientSurface"></div>
                    <div class="aether-gradientSurfaceOverlay"></div>
                    <div class="aether-innerPurple">
                        <div class="aether-innerPurpleBlur"></div>
                        <div class="aether-innerPurpleBlur2"></div>
                    </div>
                    <div class="aether-reflection"></div>
                    <div class="button">
                        <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
                        <span class="label">
                            <slot
                                @slotchange=${this.manageTextObservedSlot}
                            ></slot>
                        </span>
                    </div>
                </div>

                ${when(
                    this.showTestImage,
                    () => html`
                        <div class="test"></div>
                    `
                )}
            `;
        }
        if (this.variant === 'aetherSimple') {
            return html`
                <div class="aether-wrapper">
                    <div class="aether-blur"></div>
                    <div class="aether-gradientStroke">
                        <div class="button">
                            <slot
                                name="icon"
                                ?icon-only=${!this.hasLabel}
                            ></slot>
                            <span class="label">
                                <slot
                                    @slotchange=${this.manageTextObservedSlot}
                                ></slot>
                            </span>
                        </div>
                    </div>
                    <div class="aether-purpleBlur"></div>
                    <div class="aether-reflection"></div>
                </div>

                ${when(
                    this.showTestImage,
                    () => html`
                        <div class="test"></div>
                    `
                )}
            `;
        }
        return html`
            ${this.buttonContent}
            ${this.pendingStateController.renderPendingState()}
        `;
    }

    private handleAetherClick = (click: MouseEvent): void => {
        // Only create particles if not disabled and particles are enabled
        if (
            this.disabled ||
            !this.aetherParticles ||
            this.variant !== 'aether' ||
            !('animate' in Element.prototype)
        ) {
            return;
        }

        // Create 15 particles on click (reduced for tighter effect)
        for (let i = 0; i < 15; i++) {
            this.createParticle(click.clientX, click.clientY);
        }
    };

    private createParticle(x: number, y: number): void {
        const particle = document.createElement('div');
        particle.classList.add('aether-particle');

        // Append to document body so particles can escape component bounds
        document.body.appendChild(particle);

        // Very small particles: 1px to 3px max
        const size = Math.floor(Math.random() * 3 + 1);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Transparent white particles
        particle.style.background = 'rgb(255, 255, 255)';
        particle.style.boxShadow = `0 0 ${size}px rgb(255, 255, 255)`;

        // Blur edges for softer look
        particle.style.filter = 'blur(0.5px)';

        // Get button dimensions
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = rect.width / 2;

        // Calculate angle from center to click point
        const dx = x - centerX;
        const dy = y - centerY;
        const clickAngle = Math.atan2(dy, dx);

        // Travel along the arc - alternating clockwise/counter-clockwise
        // Each particle travels 60-120 degrees
        const arcDistance = (Math.random() * 60 + 60) * (Math.PI / 180);
        const direction = Math.random() > 0.5 ? 1 : -1;

        // Generate smooth arc path with multiple keyframes
        const keyframes = [];
        const steps = 8; // Number of intermediate points for smooth arc

        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const currentAngle =
                clickAngle + arcDistance * direction * progress;
            const posX = centerX + Math.cos(currentAngle) * radius;
            const posY = centerY + Math.sin(currentAngle) * radius;

            keyframes.push({
                transform: `translate(${posX - size / 2}px, ${posY - size / 2}px)`,
                opacity: 0.16 * (1 - progress), // Fade from 16% to 0
            });
        }

        const animation = particle.animate(keyframes, {
            duration: 600 + Math.random() * 600, // Slower: 600-1200ms
            easing: 'linear', // Linear for smooth arc motion
            delay: Math.random() * 200, // Staggered start
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }

    private setupAetherReflection(): void {
        // Get the reflection element from shadow DOM
        this.reflectionElement = this.shadowRoot?.querySelector(
            '.aether-reflection'
        ) as HTMLElement;

        if (!this.reflectionElement) return;

        // Add mouse move listener to window for tracking
        window.addEventListener('mousemove', this.handleReflectionMouseMove);

        // Start animation loop
        this.startHotspotAnimation();
    }

    private cleanupAetherReflection(): void {
        window.removeEventListener('mousemove', this.handleReflectionMouseMove);

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = undefined;
        }
    }

    private handleReflectionMouseMove = (mouseMove: MouseEvent): void => {
        if (!this.reflectionElement) return;

        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = rect.width / 2;

        // Calculate distance from center
        const mouseX = mouseMove.clientX;
        const mouseY = mouseMove.clientY;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

        // Check if mouse is within 20px of the button edge
        const distanceFromEdge = Math.abs(distanceFromCenter - radius);

        if (distanceFromEdge <= 20 || distanceFromCenter < radius) {
            // Mouse is near or inside - show arc highlight
            this.targetOpacity = 0.7;

            // Calculate angle from center to mouse (in degrees)
            // atan2 returns -180 to 180, convert to 0-360
            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            if (angle < 0) angle += 360;

            // Adjust by 90 degrees to align atan2 (0° = right) with conic-gradient (0° = top)
            angle = angle + 90;
            if (angle < 0) angle += 360;

            this.targetHotspotAngle = angle;
        } else {
            // Mouse is too far - fade out
            this.targetOpacity = 0;
        }
    };

    private startHotspotAnimation(): void {
        const animate = (): void => {
            if (!this.reflectionElement) return;

            // Only update if there's meaningful change (opacity > 0.01 or still animating)
            const hasOpacity =
                this.currentOpacity > 0.01 || this.targetOpacity > 0;

            if (!hasOpacity) {
                // Mouse is far away and animation is done - stop updating
                this.animationFrameId = requestAnimationFrame(animate);
                return;
            }

            // Smooth interpolation with easing
            const ease = 0.15;

            // Handle angle wrapping for smooth rotation
            let angleDiff = this.targetHotspotAngle - this.currentHotspotAngle;
            // Normalize to -180 to 180
            if (angleDiff > 180) angleDiff -= 360;
            if (angleDiff < -180) angleDiff += 360;

            this.currentHotspotAngle += angleDiff * ease;
            // Keep angle in 0-360 range
            if (this.currentHotspotAngle < 0) this.currentHotspotAngle += 360;
            if (this.currentHotspotAngle >= 360)
                this.currentHotspotAngle -= 360;

            this.currentOpacity +=
                (this.targetOpacity - this.currentOpacity) * ease;

            // Update CSS variables
            this.reflectionElement.style.setProperty(
                '--hotspot-angle',
                `${this.currentHotspotAngle}deg`
            );
            this.reflectionElement.style.setProperty(
                '--hotspot-opacity',
                `${this.currentOpacity}`
            );

            this.animationFrameId = requestAnimationFrame(animate);
        };

        animate();
    }
}
