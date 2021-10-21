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

import lunr from 'lunr';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';

let index: lunr.Index | undefined;

export interface Result {
    name: string;
    label: string;
    url: string;
}

export interface ResultGroup {
    name: string;
    results: Result[];
    maxScore: number;
}

function label(name: string): string {
    return name.replace(/(?:^|-)\w/g, (match) =>
        match.toUpperCase().replace('-', ' ')
    );
}

export async function search(value: string): Promise<ResultGroup[]> {
    if (!index) {
        const searchIndexURL = new URL(
            '../../../searchIndex.json',
            import.meta.url
        ).href;
        const searchIndex = await (await fetch(searchIndexURL)).json();
        index = lunr.Index.load(searchIndex);
    }

    const collatedResults = new Map<
        string,
        {
            maxScore: number;
            results: Result[];
        }
    >();

    const search = index.search(value);
    for (const item of search) {
        const match = /^\/([^/]+)\/([^/]+)/.exec(item.ref);
        if (!match) continue;

        const [, category, name] = match;
        if (!collatedResults.has(category)) {
            collatedResults.set(category, {
                maxScore: 0,
                results: [],
            });
        }
        const catagoryData = collatedResults.get(category);
        if (catagoryData) {
            catagoryData.maxScore = Math.max(catagoryData.maxScore, item.score);
            catagoryData.results.push({
                name: name,
                label: label(name),
                url: item.ref,
            });
        }
    }

    const result: ResultGroup[] = [];
    for (const [name, { results, maxScore }] of collatedResults) {
        result.push({ name, results, maxScore });
    }
    result.sort((a, b) => {
        if (a.maxScore < b.maxScore) return 1;
        if (a.maxScore > b.maxScore) return -1;
        return 0;
    });
    return result;
}
