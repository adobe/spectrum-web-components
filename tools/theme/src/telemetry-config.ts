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

export interface TelemetryConfig {
    // Enable/disable telemetry
    enabled: boolean;

    // API endpoint for sending data
    endpoint: string;

    // Application/Project identifier
    projectId: string;

    // Data collection settings
    collection: {
        // What data to collect
        performance: boolean;
        interaction: boolean;
        accessibility: boolean;
        environment: boolean;

        // How often to send data (in milliseconds)
        sendInterval: number;

        // Maximum number of events to batch
        batchSize: number;
    };

    // Privacy settings
    privacy: {
        // Anonymize user data
        anonymize: boolean;

        // Include URLs in data
        includeUrls: boolean;

        // Data retention period (in days)
        retentionPeriod: number;
    };
}

const DEFAULT_CONFIG: TelemetryConfig = {
    enabled: true,
    endpoint: 'https://telemetry.spectrum.adobe.com/api/v1/metrics',
    projectId: '',
    collection: {
        performance: true,
        interaction: true,
        accessibility: true,
        environment: true,
        sendInterval: 60000, // 1 minute
        batchSize: 10,
    },
    privacy: {
        anonymize: true,
        includeUrls: false,
        retentionPeriod: 90, // 90 days
    },
};

export class TelemetryConfigManager {
    private static instance: TelemetryConfigManager;
    private config: TelemetryConfig;
    private configKey = 'swc-telemetry-config';

    private constructor() {
        this.config = this.loadConfig();
    }

    public static getInstance(): TelemetryConfigManager {
        if (!TelemetryConfigManager.instance) {
            TelemetryConfigManager.instance = new TelemetryConfigManager();
        }
        return TelemetryConfigManager.instance;
    }

    public getConfig(): TelemetryConfig {
        return { ...this.config };
    }

    public updateConfig(updates: Partial<TelemetryConfig>): void {
        this.config = {
            ...this.config,
            ...updates,
            collection: {
                ...this.config.collection,
                ...(updates.collection || {}),
            },
            privacy: {
                ...this.config.privacy,
                ...(updates.privacy || {}),
            },
        };
        this.saveConfig();
    }

    private loadConfig(): TelemetryConfig {
        try {
            const saved = localStorage.getItem(this.configKey);
            if (saved) {
                return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
            }
        } catch (error) {
            // Ignore storage errors
        }
        return { ...DEFAULT_CONFIG };
    }

    private saveConfig(): void {
        try {
            localStorage.setItem(this.configKey, JSON.stringify(this.config));
        } catch (error) {
            // Ignore storage errors
        }
    }
}
