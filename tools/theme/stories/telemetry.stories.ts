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

import { customElement } from 'lit/decorators.js';
import { css, html } from 'lit';
import { Checkbox } from '@spectrum-web-components/checkbox';
import { NumberField } from '@spectrum-web-components/number-field';
import { Radio } from '@spectrum-web-components/radio';
import { TelemetryConfigManager } from '../src/telemetry-config.js';
import {
    TelemetryDashboard,
    TelemetryData,
    TelemetryService,
} from '../src/telemetry.js';
import { Theme } from '../src/Theme.js';

// Register components
customElements.define('sp-telemetry-dashboard', TelemetryDashboard);

type ThemeColor =
    | ''
    | 'light'
    | 'dark'
    | 'lightest'
    | 'darkest'
    | 'light-express'
    | 'lightest-express'
    | 'dark-express'
    | 'darkest-express'
    | 'light-spectrum-two'
    | 'lightest-spectrum-two'
    | 'dark-spectrum-two'
    | 'darkest-spectrum-two';
type ThemeScale =
    | ''
    | 'medium'
    | 'large'
    | 'medium-express'
    | 'large-express'
    | 'medium-spectrum-two'
    | 'large-spectrum-two';
type ThemeSystem = '' | 'spectrum' | 'express' | 'spectrum-two';

// Create a demo component to showcase telemetry
@customElement('telemetry-demo')
export class TelemetryDemo extends Theme {
    private telemetry = TelemetryService.getInstance();
    private config = TelemetryConfigManager.getInstance();
    private demoData: TelemetryData[] = [];
    private updateInterval: number | null = null;

    static styles = css`
        :host {
            display: block;
        }

        .telemetry-demo {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 20px;
            padding: 20px;
        }

        .controls {
            grid-column: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .components {
            grid-column: 2;
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
        }

        .dashboard {
            grid-column: 1 / -1;
        }

        h3 {
            margin-top: 0;
            margin-bottom: 16px;
        }
    `;

    render() {
        return html`
            <div class="telemetry-demo">
                <div class="controls">
                    <h3>Telemetry Configuration</h3>
                    <sp-checkbox
                        ?checked=${this.config.getConfig().enabled}
                        @change=${this.toggleTelemetry}
                    >
                        Enable Telemetry
                    </sp-checkbox>

                    <sp-radio-group
                        label="Collection Frequency"
                        @change=${this.updateFrequency}
                    >
                        <sp-radio value="5">Every 5 seconds</sp-radio>
                        <sp-radio value="10">Every 10 seconds</sp-radio>
                        <sp-radio value="30">Every 30 seconds</sp-radio>
                    </sp-radio-group>

                    <sp-number-field
                        label="Data Retention (days)"
                        value=${this.config.getConfig().privacy
                            ?.retentionPeriod || 30}
                        @change=${this.updateRetention}
                    ></sp-number-field>
                </div>

                <div class="components">
                    <h3>Interactive Components</h3>
                    <sp-button variant="accent" @click=${this.handleClick}>
                        Click Me
                    </sp-button>
                    <sp-button variant="primary" @mouseover=${this.handleHover}>
                        Hover Me
                    </sp-button>
                    <sp-button variant="secondary" @focus=${this.handleFocus}>
                        Focus Me
                    </sp-button>
                </div>

                <div class="dashboard">
                    <h3>Telemetry Dashboard</h3>
                    <sp-telemetry-dashboard
                        .data=${this.telemetry.getData()}
                    ></sp-telemetry-dashboard>
                </div>
            </div>
        `;
    }

    private toggleTelemetry(event: Event) {
        const checkbox = event.target as Checkbox;
        this.config.updateConfig({
            ...this.config.getConfig(),
            enabled: checkbox.checked,
        });
    }

    private updateFrequency(event: Event) {
        const radio = event.target as Radio;
        const frequency = parseInt(radio.value, 10);
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.updateInterval = window.setInterval(
            () => this.generateDemoData(),
            frequency * 1000
        );
    }

    private updateRetention(event: Event) {
        const numberField = event.target as NumberField;
        this.config.updateConfig({
            ...this.config.getConfig(),
            privacy: {
                ...this.config.getConfig().privacy,
                retentionPeriod: numberField.value,
            },
        });
    }

    private handleClick() {
        // Click events are automatically tracked
        console.log('Button clicked');
    }

    private handleHover() {
        // Hover events are automatically tracked
        console.log('Button hovered');
    }

    private handleFocus() {
        // Focus events are automatically tracked
        console.log('Button focused');
    }

    connectedCallback() {
        super.connectedCallback();
        // Generate some demo data
        this.generateDemoData();
        // Start periodic updates
        this.updateInterval = window.setInterval(
            () => this.generateDemoData(),
            5000
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    private generateDemoData() {
        // Generate random demo data
        const components = [
            'sp-button',
            'sp-checkbox',
            'sp-radio',
            'sp-number-field',
        ];
        const themes: ThemeColor[] = ['light', 'dark'];
        const scales: ThemeScale[] = ['medium', 'large'];
        const systems: ThemeSystem[] = ['spectrum', 'express'];

        const newData: TelemetryData = {
            componentName:
                components[Math.floor(Math.random() * components.length)],
            timestamp: Date.now(),
            environment: {
                browser: navigator.userAgent,
                os: navigator.platform,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                theme: {
                    color: themes[Math.floor(Math.random() * themes.length)],
                    scale: scales[Math.floor(Math.random() * scales.length)],
                    system:
                        systems[Math.floor(Math.random() * systems.length)] ===
                        'spectrum',
                },
            },
            performance: {
                loadTime: Math.random() * 100,
                renderTime: Math.random() * 50,
                memoryUsage: Math.random() * 1000,
            },
            interaction: {
                clicks: Math.floor(Math.random() * 10),
                hovers: Math.floor(Math.random() * 20),
                focusEvents: Math.floor(Math.random() * 5),
                keyboardEvents: Math.floor(Math.random() * 15),
            },
        };

        this.demoData = [...this.demoData, newData].slice(-100); // Keep last 100 entries
        this.telemetry.clearData();
        this.demoData.forEach((data) => {
            if (data.environment?.theme) {
                const theme = {
                    color: data.environment.theme.color as ThemeColor,
                    scale: data.environment.theme.scale as ThemeScale,
                    system: data.environment.theme.system
                        ? 'spectrum'
                        : ('express' as ThemeSystem),
                };
                this.telemetry.trackComponentUsage(
                    data.componentName,
                    theme,
                    this
                );
            }
        });
    }
}

export default {
    title: 'Telemetry/Demo',
    component: 'telemetry-demo',
    parameters: {
        docs: {
            description: {
                component:
                    'A demo showcasing the telemetry system in Spectrum Web Components.',
            },
        },
    },
};

export const Default = () => html`
    <telemetry-demo></telemetry-demo>
`;

export const WithCustomTheme = () => html`
    <telemetry-demo color="dark" scale="large" system="express">
        <telemetry-demo></telemetry-demo>
    </telemetry-demo>
`;
