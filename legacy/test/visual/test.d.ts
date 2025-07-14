import { TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/story-decorator/sp-story-decorator.js';
import { Color, Scale } from '@spectrum-web-components/theme';
/**
 * Interface for story functions that render components with specific props
 * Similar to Storybook story format
 */
interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    decorators?: (() => TemplateResult)[];
    swc_vrt?: {
        skip: boolean;
    };
}
/**
 * Type representing a collection of related stories for a component
 */
type StoriesType = {
    [name: string]: Story<object>;
};
/**
 * Extended type that includes default settings and metadata for the test suite
 */
export type TestsType = StoriesType & {
    default: {
        title: string;
        swc_vrt?: {
            preload?: () => void;
        };
    };
};
/**
 * Core test function that runs a single story through visual regression testing
 *
 * @param tests - Collection of stories to test
 * @param name - Name of the component being tested
 * @param color - Theme color (lightest, light, dark, darkest)
 * @param scale - Component scale (medium, large)
 * @param dir - Text direction (ltr, rtl)
 */
export declare const test: (tests: TestsType, name: string, color: Color, scale: Scale, dir: 'ltr' | 'rtl') => void;
/**
 * Main function to run visual regression tests for a component across all
 * supported themes, scales, and directions.
 *
 * @param name - Component name being tested
 * @param stories - Collection of stories to test
 */
export declare const regressVisuals: (name: string, stories: TestsType) => Promise<void>;
export {};
