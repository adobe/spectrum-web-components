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
    enabled: boolean;
    projectId: string;
    endpoint: string;
    collection: {
        performance: boolean;
        interaction: boolean;
        accessibility: boolean;
        environment: boolean;
        sendInterval: number;
        batchSize: number;
    };
    privacy: {
        anonymize: boolean;
        includeUrls: boolean;
        retentionPeriod: number;
    };
}

const defaultConfig: TelemetryConfig = {
    enabled: false,
    projectId: '',
    endpoint: '',
    collection: {
        performance: true,
        interaction: true,
        accessibility: true,
        environment: true,
        sendInterval: 60000,
        batchSize: 10,
    },
    privacy: {
        anonymize: true,
        includeUrls: false,
        retentionPeriod: 90,
    },
};

export class TelemetryConfigManager {
    private static instance: TelemetryConfigManager;
    private config: TelemetryConfig;

    private constructor() {
        this.config = { ...defaultConfig };
    }

    static getInstance(): TelemetryConfigManager {
        if (!TelemetryConfigManager.instance) {
            TelemetryConfigManager.instance = new TelemetryConfigManager();
        }
        return TelemetryConfigManager.instance;
    }

    getConfig(): TelemetryConfig {
        return { ...this.config };
    }

    updateConfig(updates: Partial<TelemetryConfig>): void {
        this.config = { ...this.config, ...updates };
    }
}
