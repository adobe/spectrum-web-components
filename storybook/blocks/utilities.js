import legacy from '@spectrum-css/tokens-legacy/dist/json/tokens.json';
import spectrum from '@spectrum-css/tokens/dist/json/tokens.json';

import { useTheme } from '@storybook/theming';

/**
 * A nestable function to search for a token value in the spectrum token data
 *  - If the key doesn't exist, it will log a warning
 *  - If the key has no value or sets, it will log a warning
 *  - If the key has a value, it will return the value
 * @param {Object} data - A required object that contains the token data to be parsed
 * @param {Object} context - An object containing important contextual information
 * @param {string} context.key - The original key of the token being parsed
 * @param {string} context.color - The color context set globally for the page
 * @param {string} context.platform - The platform context set globally for the page
 * @returns {string|void} - The value of the token
 */
function parseData(data, { key, color, platform }) {
    // If nothing exists for that key, report that the key is missing
    if (!data) {
        console.log(
            `⚠️ Token ${key} can't be found in the spectrum token data`
        );
        return;
    }

    // Check if the key has a value
    if (data.value) return data.value;

    if (Object.keys(data).length === 0) {
        console.log(`⚠️ Token ${key} has no value or sets`);
        return;
    }

    // Check if one of the contexts is a key in the sets
    if (color in data) {
        return parseData(data[color], { key, color, platform });
    }

    if (platform in data) {
        return parseData(data[platform], { key, color, platform });
    }

    return;
}

/**
 * A function to fetch the theme context for the token data
 * @param {Object} context - An object containing important contextual information
 * @param {string} context.color - The color context set globally for the page
 * @param {string} context.scale - The platform context set globally for the page
 * @param {string} context.context - The theme context set globally for the page
 * @returns {{ color: string, scale: string, context: string, platform: "desktop"|"mobile" }} - An object containing the calculated theme context
 */
function fetchTheme({ color, scale, context } = {}) {
    // Fetch the theme if it exists; this data exists if wrapped in a ThemeProvider
    const theme = useTheme() ?? {};

    // If the context is not provided, use the theme value or a fallback
    if (typeof context !== 'string' && typeof theme.context == 'string')
        context = theme.context;
    else if (!context) context = 'spectrum';

    // If the color or scale is not provided, use the theme values or a fallback
    if (typeof color !== 'string' && typeof theme.color == 'string')
        color = theme.color;
    else if (!color) color = 'light';

    if (typeof scale !== 'string' && typeof theme.scale == 'string')
        scale = theme.scale;
    else if (!scale) scale = 'medium';

    // Create a platform context based on the scale (platform used in the token data)
    const platform = scale === 'medium' ? 'desktop' : 'mobile';
    const tokens = context === 'spectrum' ? spectrum : legacy;

    return { color, scale, context, platform, tokens };
}

/**
 *
 * @param {string} key - The top-level key of the token to be fetched from the spectrum data
 * @param {Object} context - An object containing important contextual information
 * @param {string} context.color - The color context set globally for the page
 * @param {string} context.scale - The platform context set globally for the page
 * @param {string} context.context - The theme context set globally for the page
 * @returns {string|undefined} - The value of the token or a fallback value
 */
export function fetchToken(key, fallback = undefined, presets = {}) {
    if (typeof key !== 'string') return fallback;

    // Fetch the theme if it exists; this data exists if wrapped in a ThemeProvider
    const { color, platform, tokens } = fetchTheme(presets);

    // Check if the spectrum data is available
    if (!tokens || typeof tokens !== 'object') return fallback;

    return parseData(tokens[key], { color, platform }) ?? fallback;
}

/**
 *
 * @param {RegExp|string} key - The top-level key of the token to be fetched from the spectrum data
 * @param {Object} presets - An object containing important contextual information
 * @returns {Object} - A set of tokens for the key
 */
export function fetchTokenSet(key, presets = {}) {
    // Check if the key is a string or a regex, if not, return an empty object
    if (typeof key !== 'string' && !(key instanceof RegExp)) {
        console.log(`⚠️ Token ${key} is not a valid key or regex`);
        return {};
    }

    // Fetch the theme if it exists; this data exists if wrapped in a ThemeProvider
    const { color, platform, tokens } = fetchTheme(presets);

    // Check the token data for a set of tokens matching the provided regex
    const tokenSet = Object.keys(tokens)
        .filter((token) =>
            key instanceof RegExp ? key.test(token) : token === key
        )
        .sort(sortAlphaNumerically)
        .reduce((acc, token) => {
            acc[token] = parseData(tokens[token], { color, platform });
            return acc;
        }, {});

    return tokenSet;
}

export const sortAlphaNumerically = (a, b) => {
    // Sort the values in alphabetical order first and then
    // sort the numbers in numerical order assuming no leading zeros
    // Example: ["a1", "a2", "a10", "a11", "a20", "a21", "a100", "b1", "b2"]
    return a.localeCompare(b, undefined, { numeric: true });
};
