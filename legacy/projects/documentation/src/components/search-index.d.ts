import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/popover/sp-popover.js';
/**
 * Represents a single search result item
 */
export interface Result {
    name: string;
    label: string;
    url: string;
}
/**
 * Represents a group of search results organized by category
 */
export interface ResultGroup {
    name: string;
    results: Result[];
    maxScore: number;
}
/**
 * Searches the documentation using the lunr index
 *
 * @param value - The search query text
 * @returns Promise resolving to search results grouped by category and sorted by relevance
 */
export declare function search(value: string): Promise<ResultGroup[]>;
