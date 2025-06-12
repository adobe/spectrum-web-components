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
import type { BrowserContext, Page } from 'playwright';

export function grantPermissionsPlugin() {
    return {
        name: 'grant-permissions-command',
        async executeCommand({
            command,
            session,
            payload,
        }: {
            payload: string[];
            command: string;
            session: {
                id: string;
                browser: {
                    type: string;
                    getPage: (id: string) => Page;
                    context(): BrowserContext;
                };
            };
        }): Promise<any> {
            if (command === 'grant-permissions') {
                // handle specific behavior for playwright
                if (session.browser.type === 'playwright') {
                    const page = session.browser.getPage(session.id);
                    await page.context().grantPermissions(payload);
                    return true;
                }
                // you might not be able to support all browser launchers
                throw new Error(
                    `Sending mouse commands is not supported for browser type ${session.browser.type}.`
                );
            }
        },
    };
}
