import { makeDecorator, useArgs } from '@storybook/preview-api';

/**
 * @type import('@storybook/csf').Args
 */

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 * @description Global properties added to each component; determines what stylesheets are loaded
 **/
export const withArgEvents = makeDecorator({
    name: 'withArgEvents',
    parameterName: 'argEvents',
    wrapper: (StoryFn, context) => {
        /** @type {[Args, (newArgs: Partial<Args>) => void, (argNames?: (keyof Args)[]) => void]} */
        const [, updateArgs] = useArgs(context.args);

        // Bind the updateArgs function for use in nested templates
        context.updateArgs = updateArgs;

        return StoryFn(context);
    },
});
