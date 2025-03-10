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

import { expect, nextFrame } from '@open-wc/testing';
import { a11ySnapshot, findAccessibilityNode } from '@web/test-runner-commands';
import { isWebKit } from '@spectrum-web-components/shared';

export type DescribedNode = {
    name: string;
    description: string;
};

export const hasAccessibleDescription = async (
    name: string,
    description: string,
    debug?: boolean
): Promise<void> => {
    await nextFrame();
    const snapshot = (await a11ySnapshot({})) as unknown as DescribedNode & {
        children: DescribedNode[];
    };

    // WebKit doesn't currently associate the `aria-describedby` element to the attribute
    // host in the accessibility tree. Give it an escape hatch for now.
    const node = findAccessibilityNode(
        snapshot,
        (node) =>
            node.name === name &&
            (node.description === description || isWebKit())
    );

    if (debug && !node) {
        // eslint-disable-next-line no-console
        console.log(
            `unable to find node named "${name}" and described as "${description}" in current snapshot:`,
            snapshot
        );
    }

    expect(!!node, `has node named "${name}" and described as "${description}"`)
        .to.be.true;

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

export type NamedNode = {
    name: string;
};

export type RoleNode = {
    description?: string;
    disabled?: boolean;
    name?: string;
    role: string;
};

export const findNodeByRole = async (
    role: string,
    name?: string,
    debug?: boolean
): Promise<RoleNode> => {
    const snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
        children: NamedNode[];
    };
    const node = findAccessibilityNode(snapshot, (node) => {
        const roleNode = node as RoleNode;
        return roleNode.role === role && (name ? roleNode.name === name : true);
    });

    if (debug && !node) {
        // eslint-disable-next-line no-console
        console.log(
            `unable to find nodes with "${role}" role ${name ? `and named "${name}"` : ''} in current snapshot:`,
            snapshot,
            document.body.innerHTML
        );
    }
    return (node ? node : undefined) as RoleNode;
};
