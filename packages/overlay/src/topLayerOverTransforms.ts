/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import type { MiddlewareState } from '@floating-ui/dom';

export const topLayerOverTransforms = () => ({
    name: 'topLayer',
    async fn(middlewareArguments: MiddlewareState) {
        const {
            x,
            y,
            elements: { reference, floating },
        } = middlewareArguments;
        let onTopLayer = false;
        let topLayerIsFloating = false;
        const diffCoords = {
            x: 0,
            y: 0,
        };
        try {
            onTopLayer = onTopLayer || floating.matches(':popover-open');
            // eslint-disable-next-line no-empty
        } catch (e) {}
        try {
            onTopLayer = onTopLayer || floating.matches(':open');
            // eslint-disable-next-line no-empty
        } catch (e) {}
        try {
            onTopLayer = onTopLayer || floating.matches(':modal');
            // eslint-disable-next-line no-empty
        } catch (e) {}
        topLayerIsFloating = onTopLayer;
        if (!onTopLayer) {
            const dialogAncestorQueryEvent = new Event(
                'floating-ui-dialog-test',
                { composed: true, bubbles: true }
            );
            floating.addEventListener(
                'floating-ui-dialog-test',
                (event: Event) => {
                    (event.composedPath() as unknown as Element[]).forEach(
                        (el) => {
                            if (el === floating || el.localName !== 'dialog')
                                return;
                            try {
                                onTopLayer = onTopLayer || el.matches(':modal');
                                if (onTopLayer) {
                                    // console.log(el);
                                }
                                // eslint-disable-next-line no-empty
                            } catch (e) {}
                        }
                    );
                },
                { once: true }
            );
            floating.dispatchEvent(dialogAncestorQueryEvent);
        }
        let overTransforms = false;
        const containingBlock = getContainingBlock(reference as Element);
        if (containingBlock !== null && !isWindow(containingBlock)) {
            overTransforms = true;
        }

        if (onTopLayer && overTransforms) {
            const rect = containingBlock!.getBoundingClientRect();
            diffCoords.x = rect.x;
            diffCoords.y = rect.y;
        }

        if (onTopLayer && topLayerIsFloating) {
            return {
                x: x + diffCoords.x,
                y: y + diffCoords.y,
                data: diffCoords,
            };
        }

        if (onTopLayer) {
            return {
                x,
                y,
                data: diffCoords,
            };
        }

        return {
            x: x - diffCoords.x,
            y: y - diffCoords.y,
            data: diffCoords,
        };
    },
});

/* COPY/PASTE from Floating UI */

function getContainingBlock(element: Element) {
    let currentNode: Node | null = getParentNode(element);

    if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
        if (isContainingBlock(currentNode)) {
            return currentNode;
        } else {
            const parent = (
                currentNode.assignedSlot
                    ? currentNode.assignedSlot
                    : currentNode.parentNode
            ) as Node;
            currentNode = isShadowRoot(parent) ? parent.host : parent;
        }
    }

    return null;
}

export function isLastTraversableNode(node: Node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
}

function isContainingBlock(element: HTMLElement) {
    const safari = isSafari();
    const css = getComputedStyle(element) as CSSStyleDeclaration & {
        backdropFilter: string;
    };

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return (
        css.transform !== 'none' ||
        css.perspective !== 'none' ||
        (!safari &&
            (css.backdropFilter ? css.backdropFilter !== 'none' : false)) ||
        (!safari && (css.filter ? css.filter !== 'none' : false)) ||
        ['transform', 'perspective', 'filter'].some((value) =>
            (css.willChange || '').includes(value)
        ) ||
        ['paint', 'layout', 'strict', 'content'].some((value) =>
            (css.contain || '').includes(value)
        )
    );
}

export function isSafari(): boolean {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
}

interface NavigatorUAData {
    brands: Array<{ brand: string; version: string }>;
    mobile: boolean;
    platform: string;
}

export function getUAString(): string {
    const uaData = (navigator as any).userAgentData as
        | NavigatorUAData
        | undefined;

    if (uaData?.brands) {
        return uaData.brands
            .map((item) => `${item.brand}/${item.version}`)
            .join(' ');
    }

    return navigator.userAgent;
}

export function getParentNode(node: Node): Node {
    if (getNodeName(node) === 'html') {
        return node;
    }

    return (
        // this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // @ts-ignore
        node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        node.parentNode || // DOM Element detected
        (isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
        getDocumentElement(node) // fallback
    );
}

export function getNodeName(node: Node | Window): string {
    return isWindow(node)
        ? ''
        : node
        ? (node.nodeName || '').toLowerCase()
        : '';
}

export function getDocumentElement(node: Node | Window): HTMLElement {
    return (
        (isNode(node) ? node.ownerDocument : node.document) || window.document
    ).documentElement;
}

export function isNode(value: any): value is Node {
    return value instanceof (getWindow(value) as unknown as { Node: any }).Node;
}

export function isWindow(value: any): value is Window {
    return (
        value &&
        value.document &&
        value.location &&
        value.alert &&
        value.setInterval
    );
}

export function getWindow(node: Node | Window): Window {
    if (node == null) {
        return window;
    }

    if (!isWindow(node)) {
        const ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
}

export function isShadowRoot(node: Node): node is ShadowRoot {
    // Browsers without `ShadowRoot` support
    if (typeof ShadowRoot === 'undefined') {
        return false;
    }

    const OwnElement = (
        getWindow(node) as unknown as { ShadowRoot: ShadowRoot }
    ).ShadowRoot;
    const testNode = node as Node;
    return (
        node instanceof (OwnElement as unknown as any) ||
        testNode instanceof ShadowRoot
    );
}

export function isHTMLElement(value: any): value is HTMLElement {
    return (
        value instanceof
        (getWindow(value) as unknown as { HTMLElement: any }).HTMLElement
    );
}
