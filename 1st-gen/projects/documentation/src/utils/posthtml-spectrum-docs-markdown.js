/*
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

import postHTMLSpectrumTypography from './posthtml-spectrum-typography.js';
export { postHTMLSpectrumTypography };

// Add a few doc-specific transforms for code examples

export default () =>
    postHTMLSpectrumTypography({
        customTransforms: [
            {
                // take `<pre>` tags where their first child is a `<code>` tag,
                // change the `<pre>` to a `<code-example>` element
                // and change the `<code>` to a `<pre>` element to power the
                // code exmple documentation in the site.
                selector: 'pre',
                fn: (node) => {
                    const code = node.content[0];
                    if (code && code.tag === 'code') {
                        node.content[0] = {
                            ...code,
                            tag: 'pre',
                            attrs: {
                                ...code.attrs,
                                slot: 'code',
                            },
                        };
                        return {
                            tag: 'code-example',
                            content: node.content,
                            attrs: {
                                ...code.attrs,
                                preprocessed: 'preprocessed',
                            },
                        };
                    }
                    return node;
                },
            },
            {
                // Update `<code>` tags to include Spectrum CSS classes
                selector: 'code',
                fn: (node) => {
                    return {
                        ...node,
                        attrs: {
                            ...node.attrs,
                            class: node.attrs.class
                                ? `${node.attrs.class} spectrum-Code`
                                : 'spectrum-Code',
                        },
                    };
                },
            },
            {
                // Update `<a>` tags that do not have the `no-js` or `logo` slot
                // to be `<sp-link>` elements.
                selector: 'a',
                fn: (node) => {
                    if (
                        node.attrs &&
                        node.attrs.class &&
                        node.attrs.class.includes('spectrum-Button')
                    ) {
                        return node;
                    } else if (
                        node.attrs.slot &&
                        (node.attrs.slot === 'no-js' ||
                            node.attrs.slot === 'logo')
                    ) {
                        return node;
                    }
                    return {
                        ...node,
                        tag: 'sp-link',
                    };
                },
            },
            {
                // take the `content` of `<div>` with class `parts` and reverse it's order
                // works around a sort by date reality in the templating process
                selector: 'div.parts',
                fn: (node) => {
                    return {
                        ...node,
                        content: (node.content || []).reverse(),
                    };
                },
            },
            {
                selector: '.for-github',
                fn: (node) => {
                    node.tag = false;
                    node.content = [];
                    return node;
                },
            },
            {
                // ensure `<p>`, `<ul>`, and `<ol>` tags have the `spectrum-Body3` class
                selector: 'p,ul,ol',
                fn: (node) => {
                    if (
                        node.attrs &&
                        node.attrs.class &&
                        /spectrum-Body/.test(node.attrs.class)
                    ) {
                        return node;
                    }
                    return {
                        ...node,
                        attrs: {
                            ...node.attrs,
                            class: 'spectrum-Body spectrum-Body--sizeM',
                        },
                    };
                },
            },
            {
                // Wrap h1's in a .spectrum-Article to get nice typography
                selector: 'h1',
                fn: (node) => {
                    if (
                        node.attrs &&
                        (node.attrs.slot ||
                            (node.attrs.class &&
                                (/spectrum-Heading/.test(node.attrs.class) ||
                                    /logo/.test(node.attrs.class))))
                    ) {
                        return node;
                    }
                    return {
                        tag: 'div',
                        attrs: { class: 'spectrum-Article' },
                        content: [
                            {
                                tag: 'h1',
                                attrs: {
                                    ...node.attrs,
                                    class: 'spectrum-Heading spectrum-Heading--sizeXXXL spectrum-Heading--serif',
                                },
                                content: node.content,
                            },
                        ],
                    };
                },
            },
        ],
    });
