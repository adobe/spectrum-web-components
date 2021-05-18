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
import type { Page } from 'playwright';

type Step = {
    type: 'move' | 'down' | 'up' | 'click';
    position?: [number, number];
    options?: { button?: 'left' | 'right' | 'middle' };
};

export function sendMousePlugin() {
    return {
        name: 'send-mouse-command',
        async executeCommand({
            command,
            session,
            payload,
        }: {
            payload: { steps: Step[] };
            command: string;
            session: {
                id: string;
                browser: { type: string; getPage: (id: string) => Page };
            };
        }): Promise<any> {
            if (command === 'send-mouse') {
                // handle specific behavior for playwright
                if (session.browser.type === 'playwright') {
                    const page = session.browser.getPage(session.id);
                    for (const step of payload.steps) {
                        step.options = step.options || {};
                        if (step.position) {
                            await page.mouse[step.type](
                                step.position[0],
                                step.position[1],
                                step.options
                            );
                        } else {
                            await page.mouse[step.type as 'down' | 'up'](
                                step.options
                            );
                        }
                    }
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
