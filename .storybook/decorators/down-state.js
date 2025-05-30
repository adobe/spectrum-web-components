import { makeDecorator, useEffect } from '@storybook/preview-api';
import { fetchContainers } from './helpers.js';

export const withDownStateDimensionCapture = makeDecorator({
    name: 'withDownStateDimensionCapture',
    parameterName: 'downState',
    wrapper: (StoryFn, context) => {
        const { args = {}, parameters = {}, viewMode, id } = context;

        /* Selectors are defined in the downState parameter */
        const {
            // Fall back to the rootClass if no selectors are provided
            selectors = args.rootClass ? [args.rootClass] : [],
        } = parameters.downState ?? {};

        /**
         * This effect will run after the component is rendered and will capture the dimensions of the
         * components that are specified in the selectors array. It will then set the custom properties
         * --spectrum-downstate-width and --spectrum-downstate-height on the component to the width and
         * height of the component respectively. This will allow the downstate to be calculated correctly
         * in the CSS.
         */
        useEffect(() => {
            if (selectors.length === 0) return;

            for (const container of fetchContainers(id, viewMode === 'docs')) {
                for (const selector of selectors) {
                    const components = [
                        ...container.querySelectorAll(selector),
                    ];
                    for (const component of components) {
                        const { width, height } =
                            component.getBoundingClientRect();
                        component.style.setProperty(
                            '--spectrum-downstate-width',
                            `${width}px`
                        );
                        component.style.setProperty(
                            '--spectrum-downstate-height',
                            `${height}px`
                        );
                    }
                }
            }
        }, [selectors]);

        return StoryFn(context);
    },
});
