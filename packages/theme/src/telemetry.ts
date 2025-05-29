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

export interface TelemetryData {
    componentName: string;
    timestamp: number;
    interaction?: {
        clicks?: number;
        hovers?: number;
        focusEvents?: number;
        keyboardEvents?: number;
    };
    performance?: {
        loadTime?: number;
        renderTime?: number;
        memoryUsage?: number;
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
            width: number;
            height: number;
        };
        pixelRatio?: number;
        language?: string;
        theme?: {
            color?: string;
            scale?: string;
            system?: boolean;
        };
    };
}

export class TelemetryService {
    private static instance: TelemetryService;
    private data: TelemetryData[] = [];
    private listeners: ((data: TelemetryData) => void)[] = [];

    private constructor() {}

    static getInstance(): TelemetryService {
        if (!TelemetryService.instance) {
            TelemetryService.instance = new TelemetryService();
        }
        return TelemetryService.instance;
    }

    trackComponentUsage(component: HTMLElement): void {
        const data: TelemetryData = {
            componentName: component.tagName.toLowerCase(),
            timestamp: Date.now(),
            environment: {
                browser: navigator.userAgent,
                os: navigator.platform,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                pixelRatio: window.devicePixelRatio,
                language: navigator.language,
            },
        };
        this.data.push(data);
        this.notifyListeners(data);
    }

    addListener(listener: (data: TelemetryData) => void): void {
        this.listeners.push(listener);
    }

    removeListener(listener: (data: TelemetryData) => void): void {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    getData(): TelemetryData[] {
        return [...this.data];
    }

    clearData(): void {
        this.data = [];
    }

    private notifyListeners(data: TelemetryData): void {
        this.listeners.forEach((listener) => listener(data));
    }
}
