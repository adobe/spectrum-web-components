import { Template as Underlay } from '@spectrum-css/underlay/stories/template.js';
import { makeDecorator } from '@storybook/preview-api';
import { html } from 'lit';
import { when } from 'lit/directives/when.js';
import { getRandomId } from './utilities.js';

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 * @description Ensures the Underlay component is rendered only once.
 **/
export const withUnderlayWrapper = makeDecorator({
    name: 'withUnderlayWrapper',
    parameterName: 'withUnderlay',
    wrapper: (StoryFn, context) => {
        const {
            args: { isOpen = false } = {},
            parameters: { withUnderlay = true, showTestingGrid = false } = {},
        } = context;

        const id = getRandomId('underlay');

        // In the chromatic testing view, the underlay should be forced
        // to the height of the #storybook-root element to ensure it is visible
        if (showTestingGrid) {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    const container = document.getElementById('storybook-root');
                    const underlay = document.getElementById(id);
                    // Force the height and width of the underlay to match the container
                    if (container && underlay) {
                        underlay.style.height = `max(${container.clientHeight}px, 100vh)`;
                    }
                }, 0);
            });
        }

        // Expand the underlay to fill the entire screen when testing previews
        // to ensure the underlay is always visible in snapshots
        return html`
            ${when(withUnderlay, () => Underlay({ isOpen, id }, context))}
            ${StoryFn(context)}
        `;
    },
});
