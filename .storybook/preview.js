import { render } from 'lit-html';
import { addons } from '@web/storybook-prebuilt/addons.js';
import { swcThemeDecorator } from '@spectrum-web-components/story-decorator/decorator.js';

export const parameters = {
    docs: {
        inlineStories: true,
        source: {
            type: 'dynamic',
            language: 'html',
        },
        iframeHeight: '200px',
    },
    controls: { expanded: true },
    layout: 'fullscreen',
};

export const decorators = [swcThemeDecorator, sourceDecorator];

function skipSourceRender(context) {
    const sourceParams = context?.parameters.docs?.source;
    const isArgsStory = context?.parameters.__isArgsStory;

    // always render if the user forces it
    if (sourceParams?.type === 'dynamic') {
        return false;
    }

    // never render if the user is forcing the block to render code, or
    // if the user provides code, or if it's not an args story.
    return !isArgsStory || sourceParams?.code || sourceParams?.type === 'code';
}

function applyTransformSource(source, context) {
    const { transformSource } = context.parameters.docs ?? {};
    if (typeof transformSource !== 'function') return source;
    return transformSource(source, context);
}

export function sourceDecorator(storyFn, context) {
    const story = context.originalStoryFn(context.args);

    if (!skipSourceRender(context)) {
        const container = window.document.createElement('div');
        render(story, container);
        const source = applyTransformSource(
            container.innerHTML.replace(/<!---->/g, ''),
            context
        );
        if (source)
            addons
                .getChannel()
                .emit('storybook/docs/snippet-rendered', context?.id, source);
    }

    return storyFn();
}
