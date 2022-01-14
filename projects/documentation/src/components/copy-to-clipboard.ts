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
function createNode(text: string): Element {
    const node = document.createElement('pre');
    node.style.width = '1px';
    node.style.height = '1px';
    node.style.position = 'fixed';
    node.style.top = '5px';
    node.textContent = text;
    return node;
}

export function copyNode(node: Element): Promise<void> {
    if ('clipboard' in navigator) {
        return navigator.clipboard.writeText(node.textContent || '');
    }

    const selection = getSelection();
    if (selection == null) {
        return Promise.reject(new Error());
    }

    selection.removeAllRanges();

    const range = document.createRange();
    range.selectNodeContents(node);
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();
    return Promise.resolve();
}

export function copyText(text: string): Promise<void> {
    if ('clipboard' in navigator) {
        return navigator.clipboard.writeText(text);
    }

    const body = document.body;
    if (!body) {
        return Promise.reject(new Error());
    }

    const node = createNode(text);
    body.appendChild(node);
    copyNode(node);
    body.removeChild(node);
    return Promise.resolve();
}
