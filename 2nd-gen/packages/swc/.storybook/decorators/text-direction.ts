import { makeDecorator, useEffect } from '@storybook/preview-api';
import { fetchContainers } from './helpers.js';

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 * @description Sets the text direction of the document, using the global set with a toolbar control. These properties are assigned to the document root element.
 **/
export const withTextDirectionWrapper = makeDecorator({
    name: 'withTextDirectionWrapper',
    parameterName: 'textDecoration',
    wrapper: (StoryFn, context) => {
        const {
            globals: { textDirection = 'ltr' } = {},
            id,
            viewMode,
        } = context;

        useEffect(() => {
            if (!textDirection) return;

            for (const container of fetchContainers(id, viewMode === 'docs')) {
                container.dir = textDirection;
            }
        }, [textDirection]);

        return StoryFn(context);
    },
});
