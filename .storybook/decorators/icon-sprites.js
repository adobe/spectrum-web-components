// Used in the icon sprite decorator to inject the sprite sheets into the document
import workflowSprite from '@adobe/spectrum-css-workflow-icons/dist/assets/svg-spriteSheet/icons.svg?raw';
import uiSprite from '@spectrum-css/ui-icons/dist/spectrum-css-icons.svg?raw';
import { makeDecorator, useEffect } from '@storybook/preview-api';

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 **/
export const withIconSpriteSheet = makeDecorator({
    name: 'withIconSpriteSheet',
    parameterName: 'spritesheet',
    wrapper: (StoryFn, context) => {
        const { loaded = {} } = context;

        useEffect(() => {
            // Inject the sprite sheets into the document
            let sprite = document.getElementById('spritesheets');
            if (!sprite) {
                sprite = document.createElement('div');
                sprite.id = 'spritesheets';
                sprite.innerHTML = workflowSprite + uiSprite;
                document.body.appendChild(sprite);
            } else {
                sprite.innerHTML = workflowSprite + uiSprite;
            }
        }, []);

        return StoryFn(context);
    },
});
