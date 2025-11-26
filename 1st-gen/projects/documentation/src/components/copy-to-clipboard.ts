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
    const text: string | null = node.textContent;
    if (!text) {
        return Promise.reject(new Error('Node has no text content'));
    }
    /**
     * include import statements both for the element being documented and any other
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
 * scans the custom elements in the copied text and returns custom-elements array starting with sp
 * @param text
 * @returns customElements which need to be added to the import statements
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
 * Function to generate import statements for each element used in the copied text
 * @param elements
 * @returns list of import statements of each element
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
