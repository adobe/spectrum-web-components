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

// Apply spectrum typography tags to HTML (e.g. from rendered Markdown)

import parseAttrs from 'posthtml-attrs-parser';
import matchHelper from 'posthtml-match-helper';

export default (options = {}) => {
    const htmlTransforms = options.customTransforms || [];
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
        return tree;
    };
};
