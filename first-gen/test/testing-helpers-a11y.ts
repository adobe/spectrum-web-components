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

import { expect, nextFrame } from '@open-wc/testing';
import { a11ySnapshot, findAccessibilityNode } from '@web/test-runner-commands';
import { isWebKit } from '@spectrum-web-components/shared';

export type DescribedNode = {
    name: string;
    description: string;
};

export const findDescribedNode = async (
    name: string,
    description: string,
    debug?: boolean
): Promise<void> => {
    await nextFrame();

    const snapshot = (await a11ySnapshot({})) as unknown as DescribedNode & {
        children: DescribedNode[];
    };

    if (debug) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(snapshot, undefined, '  '));
    }

    // WebKit doesn't currently associate the `aria-describedby` element to the attribute
    // host in the accessibility tree. Give it an escape hatch for now.
    const node = findAccessibilityNode(
        snapshot,
        (node) =>
            node.name === name &&
            (node.description === description || isWebKit())
    );

    expect(node).to.not.be.null;

    if (isWebKit()) {
        // Retest WebKit without the escape hatch, expecting it to fail.
        // This way we get notified when the results are as expected, again.
        const iOSNode = findAccessibilityNode(
            snapshot,
            (node) => node.name === name && node.description === description
        );
        expect(iOSNode).to.be.null;
    }
};
