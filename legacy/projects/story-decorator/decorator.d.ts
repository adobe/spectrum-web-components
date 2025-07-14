import './sp-story-decorator.js';
import type { StoryContext, StoryFn } from '@storybook/web-components';
export declare const themeStyles: import("lit-html").TemplateResult<1>;
/**
 * Global properties added to each component; determines what stylesheets are loaded
 **/
export declare const swcThemeDecorator: (story: StoryFn, context: StoryContext) => import("lit-html").TemplateResult<1>;
