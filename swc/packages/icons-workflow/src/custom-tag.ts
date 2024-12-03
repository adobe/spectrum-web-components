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

import { html, TemplateResult } from '@spectrum-web-components/base';
export type { TemplateResult };

export type GenericTemplateLiteralTagType = (
    strings: TemplateStringsArray,
    ...values: unknown[]
) => string;
type TemplateLiteralTagType = GenericTemplateLiteralTagType | typeof html;
let customTemplateLiteralTag: TemplateLiteralTagType;

export const tag = function (
    strings: TemplateStringsArray,
    ...values: unknown[]
): string | TemplateResult {
    if (customTemplateLiteralTag) {
        return customTemplateLiteralTag(strings, ...values);
    }
    return values.reduce(
        (acc: string, v, idx) =>
            (acc as string) + (v as string) + strings[idx + 1],
        strings[0]
    );
};

export const setCustomTemplateLiteralTag = (
    tag: TemplateLiteralTagType
): void => {
    customTemplateLiteralTag = tag;
};
