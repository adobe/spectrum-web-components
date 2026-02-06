/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// aether-controller.ts
// Central controller for managing aether styling across web components

interface AetherVariant {
    name: string;
    tokens: Record<string, string>;
}

interface AetherConfig {
    variants: AetherVariant[];
    baseTokens: Record<string, string>;
}

class AetherController {
    private static instance: AetherController;
    private stylesheet: CSSStyleSheet | null = null;
    private registeredComponents: WeakSet<HTMLElement> = new WeakSet();
    private componentObservers: WeakMap<HTMLElement, MutationObserver> =
        new WeakMap();
    private config: AetherConfig;

    private constructor() {
        // Default configuration - would typically be loaded from design tokens
        this.config = {
            baseTokens: {
                '--aether-blur': '24px',
                '--aether-opacity': '0.72',
                '--aether-glow-size': '80px',
                '--aether-glow-opacity': '0.6',
                '--aether-border-opacity': '0.2',
                '--aether-transition': 'all 0.3s ease',
            },
            variants: [
                {
                    name: 'primary',
                    tokens: {
                        '--aether-bg': 'rgba(120, 80, 220, 0.15)',
                        '--aether-glow-color': 'rgba(120, 80, 220, 0.6)',
                        '--aether-border-color': 'rgba(255, 255, 255, 0.2)',
                    },
                },
                {
                    name: 'secondary',
                    tokens: {
                        '--aether-bg': 'rgba(80, 120, 220, 0.12)',
                        '--aether-glow-color': 'rgba(80, 120, 220, 0.5)',
                        '--aether-border-color': 'rgba(255, 255, 255, 0.15)',
                    },
                },
                {
                    name: 'neutral',
                    tokens: {
                        '--aether-bg': 'rgba(200, 200, 220, 0.1)',
                        '--aether-glow-color': 'rgba(200, 200, 220, 0.4)',
                        '--aether-border-color': 'rgba(255, 255, 255, 0.12)',
                    },
                },
            ],
        };

        this.initializeStylesheet();
    }

    static getInstance(): AetherController {
        if (!AetherController.instance) {
            AetherController.instance = new AetherController();
        }
        return AetherController.instance;
    }

    private initializeStylesheet(): void {
        // Check for constructable stylesheet support
        if ('adoptedStyleSheets' in Document.prototype) {
            this.stylesheet = new CSSStyleSheet();
            this.buildStylesheet();
        } else {
            console.warn(
                'Constructable Stylesheets not supported. Falling back to style injection.'
            );
        }
    }

    private buildStylesheet(): void {
        if (!this.stylesheet) {
            return;
        }

        const css = this.generateAetherCSS();
        this.stylesheet.replaceSync(css);
    }

    private generateAetherCSS(): string {
        // Generate base aether styles
        let css = `
        :host([aether]) {
          position: relative;
          isolation: isolate;
        }

        :host([aether]) .aether-container {
          position: relative;
          backdrop-filter: blur(var(--aether-blur));
          -webkit-backdrop-filter: blur(var(--aether-blur));
          background: var(--aether-bg);
          border: 1px solid var(--aether-border-color);
          transition: var(--aether-transition);
        }

        /* Glow effect using pseudo-element */
        :host([aether]) .aether-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, var(--aether-border-opacity)),
            transparent 50%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Outer glow/shadow */
        :host([aether]) .aether-container::after {
          content: '';
          position: absolute;
          inset: calc(var(--aether-glow-size) * -1);
          border-radius: inherit;
          background: radial-gradient(
            circle at center,
            var(--aether-glow-color),
            transparent 70%
          );
          opacity: var(--aether-glow-opacity);
          z-index: -1;
          pointer-events: none;
          filter: blur(calc(var(--aether-glow-size) / 2));
        }

        /* Hover state enhancement */
        :host([aether]:hover) .aether-container {
          --aether-glow-opacity: 0.8;
          --aether-border-opacity: 0.3;
        }
      `;

        // Add variant-specific styles
        this.config.variants.forEach((variant) => {
            css += `
          :host([aether="${variant.name}"]) {
            ${Object.entries(variant.tokens)
                .map(([key, value]) => `${key}: ${value};`)
                .join('\n          ')}
          }
        `;
        });

        return css;
    }

    /**
     * Register a component to use aether styling
     */
    register(component: HTMLElement): void {
        // Prevent double registration
        if (this.registeredComponents.has(component)) {
            return;
        }

        this.registeredComponents.add(component);

        // Get the component's shadow root (Element has shadowRoot in DOM spec)
        const shadowRoot = (component as Element).shadowRoot;
        if (!shadowRoot) {
            console.warn('Aether: Component must have shadow root', component);
            return;
        }

        // Apply stylesheet
        if (this.stylesheet && 'adoptedStyleSheets' in Document.prototype) {
            // Use constructable stylesheets
            shadowRoot.adoptedStyleSheets = [
                ...shadowRoot.adoptedStyleSheets,
                this.stylesheet,
            ];
        } else {
            // Fallback: inject style tag
            this.injectStyleTag(shadowRoot);
        }

        // Apply base tokens to host
        this.applyTokens(component);

        // Watch for attribute changes
        this.observeAttributes(component);

        // Ensure component structure supports aether
        this.validateComponentStructure(component, shadowRoot);
    }

    /**
     * Unregister a component (cleanup)
     */
    unregister(component: HTMLElement): void {
        const observer = this.componentObservers.get(component);
        if (observer) {
            observer.disconnect();
            this.componentObservers.delete(component);
        }
    }

    private applyTokens(component: HTMLElement): void {
        const variant = component.getAttribute('aether');

        // Apply base tokens
        Object.entries(this.config.baseTokens).forEach(([key, value]) => {
            component.style.setProperty(key, value);
        });

        // Apply variant tokens if specified
        if (variant && variant !== '') {
            const variantConfig = this.config.variants.find(
                (v) => v.name === variant
            );
            if (variantConfig) {
                Object.entries(variantConfig.tokens).forEach(([key, value]) => {
                    component.style.setProperty(key, value);
                });
            }
        }
    }

    private observeAttributes(component: HTMLElement): void {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'aether'
                ) {
                    this.applyTokens(component);
                }
            });
        });

        observer.observe(component, {
            attributes: true,
            attributeFilter: ['aether'],
        });

        this.componentObservers.set(component, observer);
    }

    private validateComponentStructure(
        component: HTMLElement,
        shadowRoot: ShadowRoot
    ): void {
        // Check if component has the required .aether-container element
        const container = shadowRoot.querySelector('.aether-container');
        if (!container) {
            console.warn(
                'Aether: Component should have an element with class "aether-container" for proper styling',
                component
            );
        }
    }

    private injectStyleTag(shadowRoot: ShadowRoot): void {
        // Fallback for browsers without constructable stylesheets
        const existingStyle = shadowRoot.querySelector('style[data-aether]');
        if (existingStyle) {
            return;
        }

        const style = document.createElement('style');
        style.setAttribute('data-aether', '');
        style.textContent = this.generateAetherCSS();
        shadowRoot.appendChild(style);
    }

    /**
     * Update configuration (for theme changes, etc.)
     */
    updateConfig(config: Partial<AetherConfig>): void {
        this.config = { ...this.config, ...config };
        this.buildStylesheet();
    }

    /**
     * Get available variants
     */
    getVariants(): string[] {
        return this.config.variants.map((v) => v.name);
    }
}

// Export singleton instance
export const aetherController = AetherController.getInstance();
