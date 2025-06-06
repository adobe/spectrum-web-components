import { global } from '@storybook/global';

/**
 * @description Fetches the style container for the given ID or creates a new one
 * @param {HTMLElement} container - required container in which to add the style tag
 * @param {string} id - required ID for the style container
 * @param {string} styles - required styles to add to the container
 * @param {boolean} [add=true] - optional flag to add or remove the styles
 * @param {string} [context] - optional context to print in the style tag
 * @returns {void}
 **/
export function toggleStyles(
    container,
    id,
    styles,
    add = true,
    context = undefined
) {
    if (!container && !id) return;

    let style = container.querySelector(`#${id}`);
    const isNewTag = !style;

    // If we're removing the styles, remove the tag from the container
    if (!add) {
        if (!isNewTag) style.remove();
        return;
    }

    if (isNewTag) style = document.createElement('style');

    style.id = id;
    style.innerHTML = styles;

    if (context) style.setAttribute('data-context', context);
    if (isNewTag) container.appendChild(style);
}

/**
 * @type (id: string, container: HTMLElement) => HTMLElement
 * @description Fetches the style container for the given ID or creates a new one
 **/
export function fetchStyleContainer(id, container) {
    if (!id) return;

    const { document } = global;
    if (!container) container = document.body;

    let styleContainer = container.querySelector(`#${id}`);
    if (styleContainer) return styleContainer;

    const styles = document.createElement('div');
    styles.id = id;
    // @todo add styles to the top part of the container
    container.appendChild(styles);
    return styles;
}

/**
 * @type (id: string, isDocs: boolean = false) => HTMLElement[]
 * @description Fetches the style container for the given ID or creates a new one
 **/
export function fetchContainers(id, isDocs = false, isTesting = false) {
    if (!id) return [];
    const { document } = global;

    let containers = [];

    // Storybook IDs used to target the container element for the docs pages
    const roots = [
        ...document.querySelectorAll(`#story--${id}`),
        ...document.querySelectorAll(`#story--${id}--primary`),
    ];

    // viewMode is either "docs" or "story"
    if (isDocs && roots.length > 0) {
        containers = roots.map((root) => root.closest('.docs-story') ?? root);
    } else if (isTesting) {
        // Only capture the top-level container for testing previews
        containers.push(
            ...document.querySelectorAll(
                'body,[data-testing-preview],[data-testing-preview] [data-inner-container]'
            )
        );
    }

    if (containers.length === 0) containers = [document.body];

    return containers;
}
