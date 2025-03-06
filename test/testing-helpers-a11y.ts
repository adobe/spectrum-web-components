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

    const node = findAccessibilityNode(
        snapshot,
        (node) => node.name === name && node.description === description
    );

    if (debug && !node) {
        // eslint-disable-next-line no-console
        console.log(
            `findDescribedNode(${name}, ${description}, ${debug}) returns null`,
            snapshot,
            'document',
            document.body
        );
    }

    expect(!!node, 'has node').to.be.true;
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
            `findNodeByRole(${role}, ${name}, ${debug}) returns null`,
            snapshot,
            'document',
            document.body
        );
    }
    return (node ? node : undefined) as RoleNode;
};
