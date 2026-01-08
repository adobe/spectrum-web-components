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

import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/popover/sp-popover.js';
import lunr from 'lunr';

// The search index is lazily loaded and cached in this variable
let index: lunr.Index | undefined;

/**
 * Represents a single search result item
 */
export interface Result {
    // Original name of the component/guide/tool (e.g., "color-area")
    name: string;
    // Formatted display name (e.g., "Color Area")
    label: string;
    // URL path to the documentation page
    url: string;
}

/**
 * Represents a group of search results organized by category
 */
export interface ResultGroup {
    // Category name (e.g., "Components", "Guides", "Tools")
    name: string;
    // List of search results in this category
    results: Result[];
    // Highest relevance score among results in this group (used for sorting)
    maxScore: number;
}

/**
 * Formats a kebab-case name to Title Case with spaces
 * For example: "color-area" becomes "Color Area"
 *
 * @param name - The raw name string to format
 * @returns The formatted display name
 */
function label(name: string): string {
    return name.replace(/(?:^|-)\w/g, (match) =>
        match.toUpperCase().replace('-', ' ')
    );
}

/**
 * Searches the documentation using the lunr index
 *
 * @param value - The search query text
 * @returns Promise resolving to search results grouped by category and sorted by relevance
 */
export async function search(value: string): Promise<ResultGroup[]> {
    // Lazy-load the search index on first search
    if (!index) {
        const searchIndexJSON = await import('../../searchIndex.json');
        index = lunr.Index.load(searchIndexJSON);
    }

    // Map to collect and organize results by category
    const collatedResults = new Map<
        string,
        {
            maxScore: number;
            results: Result[];
        }
    >();

    // Execute the search query against the lunr index
    const search = index.search(value);

    // Process each search result
    for (const item of search) {
        // Parse the metadata stored in item.ref (contains category, name, url)
        const { category, name, url } = JSON.parse(item.ref);

        // Create a new category entry if this is the first result for this category
        if (!collatedResults.has(category)) {
            collatedResults.set(category, {
                maxScore: 0,
                results: [],
            });
        }

        const categoryData = collatedResults.get(category);
        if (categoryData) {
            // Keep track of the highest score in this category (for sorting categories)
            categoryData.maxScore = Math.max(categoryData.maxScore, item.score);

            // Add this result to the appropriate category
            categoryData.results.push({
                name,
                label: label(name), // Format the name for display
                url,
            });
        }
    }

    // Convert the Map to an array of ResultGroup objects
    const result: ResultGroup[] = [];
    for (const [name, { results, maxScore }] of collatedResults) {
        result.push({ name, results, maxScore });
    }

    // Sort categories by their highest relevance score (most relevant first)
    result.sort((a, b) => {
        if (a.maxScore < b.maxScore) {
            return 1;
        }
        if (a.maxScore > b.maxScore) {
            return -1;
        }
        return 0;
    });

    return result;
}
