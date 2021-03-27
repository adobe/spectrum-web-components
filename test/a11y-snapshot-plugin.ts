/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import type { ElementHandle, Page } from 'playwright';

export function a11ySnapshotPlugin() {
    return {
        name: 'a11y-snapshot-command',
        async executeCommand({
            command,
            payload = {},
            session,
        }: {
            payload: { selector?: string };
            command: string;
            session: {
                id: string;
                browser: { type: string; getPage: (id: string) => Page };
            };
        }): Promise<any> {
            if (command === 'a11y-snapshot') {
                // handle specific behavior for playwright
                if (session.browser.type === 'playwright') {
                    const page = session.browser.getPage(session.id);
                    const options: {
                        root?: ElementHandle;
                    } = {};
                    if (payload.selector) {
                        const root = await page.$(payload.selector);
                        if (root) {
                            options.root = root;
                        }
                    }
                    const snapshot = await page.accessibility.snapshot(options);
                    return snapshot;
                }
                // you might not be able to support all browser launchers
                throw new Error(
                    `Acessibility snapshot is not supported for browser type ${session.browser.type}.`
                );
            }
        },
    };
}
