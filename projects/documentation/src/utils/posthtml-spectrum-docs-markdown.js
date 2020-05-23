/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import postHTMLSpectrumTypeography from './posthtml-spectrum-typography';

// Add a few doc-specific transforms for code examples

export default (url) =>
    postHTMLSpectrumTypeography({
        customTransforms: [
            {
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
                selector: 'a',
                fn: (node) => {
                    if (node.attrs.slot && node.attrs.slot === 'no-js') {
                        return node;
                    }
                    return {
                        ...node,
                        tag: 'sp-link',
                    };
                },
            },
            {
                selector: 'sp-link',
                fn: (node) => {
                    if (node.attrs.class === 'header-anchor') {
                        node.attrs = {
                            ...node.attrs,
                            href: url + node.attrs.href,
                        };
                    }
                    return node;
                },
            },
        ],
    });
