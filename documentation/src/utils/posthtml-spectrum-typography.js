/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// Apply spectrum typography tags to HTML (e.g. from rendered Markdown)

const parseAttrs = require('posthtml-attrs-parser');
const matchHelper = require('posthtml-match-helper');

const transformations = [
    {
        selector: 'p,ul',
        classes: ['spectrum-Body3'],
    },
    {
        // Wrap h1's in a .spectrum-Article to get nice typography
        // Based on https://spectrum.corp.adobe.com
        selector: 'h1',
        fn: (node) => {
            if (
                node.attrs &&
                node.attrs.class &&
                /spectrum-Heading1/.test(node.attrs.class)
            ) {
                return node;
            }
            return {
                tag: 'div',
                attrs: { class: 'spectrum-Article' },
                content: [
                    {
                        tag: 'h1',
                        attrs: { class: 'spectrum-Heading1' },
                        content: node.content,
                    },
                ],
            };
        },
    },
    {
        selector: 'h2',
        classes: ['spectrum-Heading2--quiet'],
    },
    {
        selector: 'h3',
        classes: ['spectrum-Heading3'],
    },
    {
        selector: 'hr',
        classes: ['spectrum-Rule', 'spectrum-Rule--large'],
    },
    {
        selector: 'a',
        classes: ['spectrum-Link'],
    },
];

module.exports = (options = {}) => {
    const htmlTransforms = options.customTransforms
        ? options.customTransforms.concat(transformations)
        : transformations;
    return function postHTMLSpectrumTypeography(tree) {
        for (const transform of htmlTransforms) {
            tree.match(matchHelper(transform.selector), (node) => {
                const attrs = parseAttrs(node.attrs);
                if (transform.classes) {
                    attrs.class = attrs.class
                        ? transform.classes.concat(attrs.class)
                        : transform.classes;
                }
                node.attrs = attrs.compose();
                if (transform.fn) {
                    node = transform.fn(node);
                }
                return node;
            });
        }
    };
};
