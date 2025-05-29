/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface TelemetryData {
    componentName: string;
    timestamp: number;
    url?: string;
    userAgent?: string;
    performance?: {
        loadTime?: number;
        renderTime?: number;
        memoryUsage?: number;
    };
    interaction?: {
        clicks?: number;
        hovers?: number;
        focusEvents?: number;
        keyboardEvents?: number;
    };
    accessibility?: {
        ariaAttributes?: Record<string, string>;
        role?: string;
        tabIndex?: number;
    };
    environment?: {
        browser?: string;
        os?: string;
        viewport?: {
            width?: number;
            height?: number;
        };
        devicePixelRatio?: number;
        language?: string;
        theme?: {
            color?: string;
            scale?: string;
            system?: boolean;
        };
    };
}

@customElement('sp-telemetry-dashboard')
export class TelemetryDashboard extends LitElement {
    static override styles = css`
        :host {
            display: block;
            padding: 20px;
            font-family: var(--spectrum-sans-font-family-stack);
        }

        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .card {
            background: var(--spectrum-global-color-gray-50);
            border-radius: 4px;
            padding: 16px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .metric {
            margin-bottom: 12px;
        }

        .metric-title {
            font-weight: bold;
            color: var(--spectrum-global-color-gray-800);
        }

        .metric-value {
            color: var(--spectrum-global-color-gray-700);
        }

        .chart {
            height: 200px;
            margin-top: 16px;
        }
    `;

    @property({ type: Array })
    data: TelemetryData[] = [];

    @state()
    private componentStats: Map<
        string,
        {
            count: number;
            themes: Map<string, number>;
        }
    > = new Map();

    @state()
    private timeRange: { start: number; end: number } = {
        start: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
        end: Date.now(),
    };

    private processData(): void {
        this.componentStats = this.getComponentStats();
    }

    override updated(changedProperties: Map<PropertyKey, unknown>): void {
        if (changedProperties.has('data')) {
            this.processData();
        }
    }

    private getComponentStats(): Map<
        string,
        { count: number; themes: Map<string, number> }
    > {
        const stats = new Map<
            string,
            { count: number; themes: Map<string, number> }
        >();

        this.data.forEach((entry) => {
            if (!stats.has(entry.componentName)) {
                stats.set(entry.componentName, {
                    count: 0,
                    themes: new Map<string, number>(),
                });
            }

            const stat = stats.get(entry.componentName)!;
            stat.count++;

            const themeKey = `${entry.environment?.theme?.color}-${entry.environment?.theme?.scale}-${entry.environment?.theme?.system}`;
            stat.themes.set(themeKey, (stat.themes.get(themeKey) || 0) + 1);
        });

        return stats;
    }

    private renderComponentStats(): unknown {
        return html`
            <div class="card">
                <h3>Component Usage</h3>
                ${Array.from(this.componentStats.entries()).map(
                    ([name, stats]) => html`
                        <div class="metric">
                            <div class="metric-title">${name}</div>
                            <div class="metric-value">
                                Total Usage: ${stats.count}
                                <br />
                                Themes:
                                ${Array.from(stats.themes.entries())
                                    .map(
                                        ([theme, count]) => `${theme}: ${count}`
                                    )
                                    .join(', ')}
                            </div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    private renderEnvironmentStats(): unknown {
        const browsers = new Map<string, number>();
        const os = new Map<string, number>();
        const languages = new Map<string, number>();

        this.data.forEach((entry) => {
            browsers.set(
                entry.environment?.browser || '',
                (browsers.get(entry.environment?.browser || '') || 0) + 1
            );
            os.set(
                entry.environment?.os || '',
                (os.get(entry.environment?.os || '') || 0) + 1
            );
            languages.set(
                entry.environment?.language || '',
                (languages.get(entry.environment?.language || '') || 0) + 1
            );
        });

        return html`
            <div class="card">
                <h3>Environment</h3>
                <div class="metric">
                    <div class="metric-title">Browsers</div>
                    <div class="metric-value">
                        ${Array.from(browsers.entries())
                            .map(([browser, count]) => `${browser}: ${count}`)
                            .join('<br>')}
                    </div>
                </div>
                <div class="metric">
                    <div class="metric-title">Operating Systems</div>
                    <div class="metric-value">
                        ${Array.from(os.entries())
                            .map(([os, count]) => `${os}: ${count}`)
                            .join('<br>')}
                    </div>
                </div>
                <div class="metric">
                    <div class="metric-title">Languages</div>
                    <div class="metric-value">
                        ${Array.from(languages.entries())
                            .map(([lang, count]) => `${lang}: ${count}`)
                            .join('<br>')}
                    </div>
                </div>
            </div>
        `;
    }

    private getAccessibilityStats(): Map<string, number> {
        const stats = new Map<string, number>();
        this.data.forEach((entry) => {
            if (entry.accessibility) {
                // Track ARIA attributes usage
                Object.entries(
                    entry.accessibility.ariaAttributes || {}
                ).forEach(([attr, _value]) => {
                    const key = `aria-${attr}`;
                    stats.set(key, (stats.get(key) || 0) + 1);
                });

                // Track role usage
                if (entry.accessibility.role) {
                    stats.set(
                        `role-${entry.accessibility.role}`,
                        (stats.get(`role-${entry.accessibility.role}`) || 0) + 1
                    );
                }

                // Track tabIndex usage
                if (entry.accessibility.tabIndex !== undefined) {
                    stats.set(
                        `tabIndex-${entry.accessibility.tabIndex}`,
                        (stats.get(
                            `tabIndex-${entry.accessibility.tabIndex}`
                        ) || 0) + 1
                    );
                }
            }
        });
        return stats;
    }

    private renderAccessibilityStats(): unknown {
        const stats = this.getAccessibilityStats();
        return html`
            <div class="stats-section">
                <h3>Accessibility Usage</h3>
                <div class="stats-grid">
                    ${Array.from(stats.entries()).map(
                        ([key, count]) => html`
                            <div class="stat-item">
                                <span class="stat-label">${key}</span>
                                <span class="stat-value">${count}</span>
                            </div>
                        `
                    )}
                </div>
            </div>
        `;
    }

    override render(): unknown {
        return html`
            <div class="dashboard">
                ${this.renderComponentStats()} ${this.renderEnvironmentStats()}
                ${this.renderAccessibilityStats()}
            </div>
        `;
    }
}

export class TelemetryService {
    private static instance: TelemetryService;
    private data: TelemetryData[] = [];
    private listeners: Set<(data: TelemetryData) => void> = new Set();

    private constructor() {}

    public static getInstance(): TelemetryService {
        if (!TelemetryService.instance) {
            TelemetryService.instance = new TelemetryService();
        }
        return TelemetryService.instance;
    }

    public addListener(listener: (data: TelemetryData) => void): void {
        this.listeners.add(listener);
    }

    public removeListener(listener: (data: TelemetryData) => void): void {
        this.listeners.delete(listener);
    }

    private notifyListeners(data: TelemetryData): void {
        this.listeners.forEach((listener) => listener(data));
    }

    public trackComponentUsage(
        p0: string,
        p1: {
            color:
                | ''
                | 'light'
                | 'lightest'
                | 'dark'
                | 'darkest'
                | 'light-express'
                | 'lightest-express'
                | 'dark-express'
                | 'darkest-express'
                | 'light-spectrum-two'
                | 'lightest-spectrum-two'
                | 'dark-spectrum-two'
                | 'darkest-spectrum-two';
            scale:
                | ''
                | 'medium'
                | 'large'
                | 'medium-express'
                | 'large-express'
                | 'medium-spectrum-two'
                | 'large-spectrum-two';
            system: '' | 'spectrum' | 'express' | 'spectrum-two';
        },
        component: HTMLElement
    ): void {
        const data: TelemetryData = {
            componentName: component.tagName.toLowerCase(),
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            performance: {
                loadTime: performance.now(),
                memoryUsage: (
                    performance as Performance & {
                        memory?: { usedJSHeapSize: number };
                    }
                ).memory?.usedJSHeapSize,
                renderTime: this.measureRenderTime(component),
            },
            interaction: {
                clicks: 0,
                hovers: 0,
                focusEvents: 0,
                keyboardEvents: 0,
            },
            accessibility: {
                ariaAttributes: this.getAriaAttributes(component),
                role: component.getAttribute('role') || undefined,
                tabIndex: component.hasAttribute('tabindex')
                    ? parseInt(component.getAttribute('tabindex') || '0', 10)
                    : undefined,
            },
            environment: {
                browser: this.getBrowserInfo(),
                os: this.getOSInfo(),
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                devicePixelRatio: window.devicePixelRatio,
                language: navigator.language,
                theme: this.getThemeInfo(component),
            },
        };

        this.data.push(data);
        this.notifyListeners(data);
    }

    private measureRenderTime(component: HTMLElement): number {
        const start = performance.now();
        // Force a reflow to measure render time
        void component.offsetHeight;
        return performance.now() - start;
    }

    private getAriaAttributes(element: HTMLElement): Record<string, string> {
        const attributes: Record<string, string> = {};
        Array.from(element.attributes).forEach((attr) => {
            if (attr.name.startsWith('aria-')) {
                attributes[attr.name.replace('aria-', '')] = attr.value;
            }
        });
        return attributes;
    }

    private getBrowserInfo(): string {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    private getOSInfo(): string {
        const ua = navigator.userAgent;
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    }

    private getThemeInfo(component: HTMLElement): {
        color?: string;
        scale?: string;
        system?: boolean;
    } {
        const theme = component.closest('sp-theme');
        if (!theme) return {};

        return {
            color: theme.getAttribute('color') || undefined,
            scale: theme.getAttribute('scale') || undefined,
            system: theme.hasAttribute('system'),
        };
    }

    public getData(): TelemetryData[] {
        return [...this.data];
    }

    public clearData(): void {
        this.data = [];
    }
}
