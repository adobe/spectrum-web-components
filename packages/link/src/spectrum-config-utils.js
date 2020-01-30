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

const parser = require('postcss-selector-parser');

// The transform duplicates `:focus-visible` selectors and prepends various
// component states to prevent specificity being overriden.
module.exports.mangleSpecificity = (selector) => {
    const result = selector.clone();
    let isFocusVisible = false;
    result.walkPseudos((node) => {
        if (node.value.match(/focus-visible$/) !== null) {
            isFocusVisible = true;
        }
    });
    if (isFocusVisible) {
        const overSelector = parser.selector();
        const quietSelector = parser.selector();
        const overResult = result.clone();
        const quietResult = result.clone();
        overHost.append(parser.attribute({ attribute: 'over-background' }));
        quietHost.append(parser.attribute({ attribute: 'quiet' }));
        overSelector.append(parser.pseudo({ value: ':host' }));
        quietSelector.append(parser.pseudo({ value: ':host' }));
        overSelector.append(parser.combinator({ value: ' ' }));
        quietSelector.append(parser.combinator({ value: ' ' }));
        overSelector.append(overResult);
        quietSelector.append(quietResult);
        result.prepend(parser.combinator({ value: ',' }));
        result.prepend(overSelector);
        result.prepend(parser.combinator({ value: ',' }));
        result.prepend(quietSelector);
    }
    return result;
};
