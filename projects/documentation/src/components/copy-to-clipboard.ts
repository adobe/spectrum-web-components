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

/**
 * Creates a new <pre> element with the specified text content.
 *
 * @param text - The text content to be added to the <pre> element.
 * @returns The created <pre> element.
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

/**
 * Copies the text content of a given node to the clipboard, including necessary import statements for custom elements.
 *
 * @param node - The DOM element whose text content is to be copied.
 * @returns A promise that resolves when the text has been successfully copied, or rejects with an error.
 */
export function copyNode(node: Element): Promise<void> {
    const text: string | null = node.textContent;

    if (!text) {
        return Promise.reject(new Error('Node has no text content'));
    }

    /**
     * Include import statements both for the element being documented and any other
     * top level elements used that would otherwise not be imported directly in the element.
     */
    const customElements = extractNodeCustomElements(text);
    const importStatements = generateImportStatements(customElements);
    const fullCopiedText = `${importStatements}\n${node.textContent}`;

    if ('clipboard' in navigator) {
        return navigator.clipboard.writeText(fullCopiedText || '');
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

/**
 * Scans the custom elements in the copied text and returns a set of custom elements starting with 'sp-'.
 *
 * @param text - The text content to be scanned for custom elements.
 * @returns A set of custom elements that need to be added to the import statements.
 */
function extractNodeCustomElements(text: string): Set<string> {
    const customElements = new Set<string>();
    const regex = /<sp-[a-zA-Z-]+/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        customElements.add(match[0].substring(1)); // Remove the '<' character
    }

    return customElements;
}

/**
 * Generates import statements for each custom element used in the copied text.
 *
 * @param elements - A set of custom elements to generate import statements for.
 * @returns A string containing the import statements for each custom element.
 */
function generateImportStatements(elements: Set<string>): string {
    let imports = '';

    elements.forEach((element) => {
        const elementName = element.substring(3); // Remove the 'sp-' prefix

        if (element.includes('sp-icon')) {
            imports += `import '@spectrum-web-components/icons-workflow/icons/${element}.js';\n`;
        } else {
            imports += `import '@spectrum-web-components/${elementName}/${element}.js';\n`;
        }
    });

    return imports;
}

/**
 * Copies the specified text to the clipboard.
 *
 * @param text - The text content to be copied to the clipboard.
 * @returns A promise that resolves when the text has been successfully copied, or rejects with an error.
 */
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
