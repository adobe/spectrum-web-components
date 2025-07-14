import { LitElement, TemplateResult } from 'lit';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-large.js';
import '@spectrum-web-components/theme/theme-lightest.js';
declare global {
    interface Window {
        tachometerResult: undefined | number;
        tachometerStart: undefined | 'page' | 'element';
        tachometerEnd: undefined | 'updateComplete' | 'paint';
    }
}
export declare class TestFixture extends LitElement {
    shouldAttachContents: boolean;
    template: TemplateResult;
    remove(): boolean;
    get root(): ShadowRoot;
    attachContents(options?: {
        awaitRender: boolean;
    }): Promise<unknown>;
    detachContents(options?: {
        awaitRender: boolean;
    }): Promise<unknown>;
    render(): TemplateResult<1>;
}
interface FixtureOptions {
    shouldAttachContents: boolean;
    document: Document;
}
export declare const fixture: (template: TemplateResult, options?: Partial<FixtureOptions>) => TestFixture;
interface MeasureFixtureCreationOpts {
    afterRender?: (root: HTMLElement) => Promise<unknown>;
    numRenders: number;
}
export declare const measureFixtureCreation: (template: TemplateResult, options?: Partial<MeasureFixtureCreationOpts>) => Promise<number>;
export {};
