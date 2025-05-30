import { makeDecorator, useEffect } from '@storybook/preview-api';
import { fetchContainers, toggleStyles } from './helpers.js';

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 **/
export const withReducedMotionWrapper = makeDecorator({
    name: 'withReducedMotionWrapper',
    parameterName: 'reducedMotion',
    wrapper: (StoryFn, context) => {
        const {
            globals: { reducedMotion = false } = {},
            id,
            viewMode,
        } = context;

        useEffect(() => {
            for (const container of fetchContainers(id, viewMode === 'docs')) {
                toggleStyles(
                    container,
                    'reduced-motion',
                    `
					#reduced-motion {
						--spectrum-animation-duration-100: 0ms;
						--spectrum-animation-duration-200: 0ms;
						--spectrum-animation-duration-300: 0ms;
						--spectrum-animation-duration-400: 0ms;
						--spectrum-animation-duration-500: 0ms;
						--spectrum-animation-duration-600: 0ms;
						--spectrum-animation-duration-700: 0ms;
						--spectrum-animation-duration-800: 0ms;
						--spectrum-animation-duration-900: 0ms;
						--spectrum-animation-duration-1000: 0ms;
						--spectrum-animation-duration-2000: 0ms;
						--spectrum-animation-duration-4000: 0ms;
						--spectrum-coachmark-animation-indicator-ring-duration: 0ms;
					}
				`,
                    reducedMotion
                );
            }
        }, [reducedMotion]);

        return StoryFn(context);
    },
});
