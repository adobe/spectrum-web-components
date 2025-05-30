import { makeDecorator } from '@storybook/preview-api';
import isChromatic from 'chromatic/isChromatic';

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 * @description Lets you preview the Chromatic testing view locally
 **/
export const withTestingPreviewWrapper = makeDecorator({
    name: 'withTestingPreviewWrapper',
    parameterName: 'testingPreview',
    wrapper: (StoryFn, context) => {
        const {
            // Testing preview reflects the state of the user-selected global value
            globals: { testingPreview = false } = {},
            // Show testing grid reflects whether the testing grid is currently visible in the UI
            parameters: { showTestingGrid } = {},
            viewMode,
        } = context;

        // Below we're setting a new parameter "showTestingGrid" to reflect whether the testing grid should be visible
        // This is done to ensure that the testing grid is always visible in the Chromatic testing view
        // and that the user-selected global value is respected in the Storybook UI

        // If isChromatic() is true, we should update the global value to always show the testing grid
        if (typeof isChromatic === 'function' && isChromatic() === true) {
            context.parameters.showTestingGrid = true;
        } else if (viewMode === 'docs') {
            // If we're in the docs view, we should disable the testing grid
            context.parameters.showTestingGrid = false;
        } else if (typeof showTestingGrid === 'undefined') {
            // If the global value is undefined, we should set it to the testing preview value
            context.parameters.showTestingGrid = testingPreview;
        } else if (showTestingGrid !== testingPreview) {
            context.parameters.showTestingGrid = testingPreview;
        }

        return StoryFn(context);
    },
});
