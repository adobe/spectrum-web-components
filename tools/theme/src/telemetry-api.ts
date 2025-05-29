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

import { TelemetryData } from './telemetry.js';
import { TelemetryConfig, TelemetryConfigManager } from './telemetry-config.js';

export class TelemetryAPI {
    private static instance: TelemetryAPI;
    private configManager: TelemetryConfigManager;
    private queue: TelemetryData[] = [];
    private isProcessing: boolean = false;
    private retryCount: number = 0;
    private maxRetries: number = 3;
    private retryDelay: number = 1000; // 1 second

    private constructor() {
        this.configManager = TelemetryConfigManager.getInstance();
    }

    public static getInstance(): TelemetryAPI {
        if (!TelemetryAPI.instance) {
            TelemetryAPI.instance = new TelemetryAPI();
        }
        return TelemetryAPI.instance;
    }

    public async sendData(
        data: TelemetryData | TelemetryData[]
    ): Promise<void> {
        const config = this.configManager.getConfig();
        if (!config.enabled) return;

        const dataArray = Array.isArray(data) ? data : [data];

        // Apply privacy settings
        const sanitizedData = this.sanitizeData(dataArray, config);

        // Add to queue
        this.queue.push(...sanitizedData);

        // Process queue if it's getting large
        if (this.queue.length >= config.collection.batchSize) {
            await this.processQueue();
        }
    }

    private sanitizeData(
        data: TelemetryData[],
        config: TelemetryConfig
    ): TelemetryData[] {
        return data.map((entry) => {
            const sanitized = { ...entry };

            // Apply privacy settings
            if (config.privacy.anonymize) {
                // Remove or hash sensitive information
                delete sanitized.userAgent;
                if (!config.privacy.includeUrls) {
                    delete sanitized.url;
                }
            }

            // Filter out disabled collection types
            if (!config.collection.performance) {
                delete sanitized.performance;
            }
            if (!config.collection.interaction) {
                delete sanitized.interaction;
            }
            if (!config.collection.accessibility) {
                delete sanitized.accessibility;
            }
            if (!config.collection.environment) {
                delete sanitized.environment;
            }

            return sanitized;
        });
    }

    private async processQueue(): Promise<void> {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        const config = this.configManager.getConfig();
        const batch = this.queue.splice(0, config.collection.batchSize);

        try {
            const response = await fetch(config.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Project-ID': config.projectId,
                    'X-Client-Version': '1.0.0',
                },
                body: JSON.stringify({
                    timestamp: Date.now(),
                    events: batch,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Reset retry count on success
            this.retryCount = 0;
        } catch (error) {
            // Put the failed items back in the queue
            this.queue.unshift(...batch);

            // Implement retry logic
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                setTimeout(
                    () => this.processQueue(),
                    this.retryDelay * this.retryCount
                );
            } else {
                // After max retries, keep the data in localStorage for later
                this.saveFailedData(batch);
            }
        } finally {
            this.isProcessing = false;
        }
    }

    private saveFailedData(data: TelemetryData[]): void {
        try {
            const failedKey = 'swc-telemetry-failed';
            const existing = localStorage.getItem(failedKey);
            const failed = existing ? JSON.parse(existing) : [];
            localStorage.setItem(
                failedKey,
                JSON.stringify([...failed, ...data])
            );
        } catch (error) {
            // Ignore storage errors
        }
    }

    public async retryFailedData(): Promise<void> {
        try {
            const failedKey = 'swc-telemetry-failed';
            const failed = localStorage.getItem(failedKey);
            if (failed) {
                const data = JSON.parse(failed);
                await this.sendData(data);
                localStorage.removeItem(failedKey);
            }
        } catch (error) {
            // Ignore storage errors
        }
    }
}
