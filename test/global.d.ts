declare namespace Chai {
    interface Assertion {
        dom: Assertion;
        shadowDom: Assertion;
        lightDom: Assertion;
    }
}

declare module '@open-wc/semantic-dom-diff' {
    /**
     * @param {any} chai
     * @param {any} utils
     */
    export var chaiDomDiff: any;

    /**
     * @typedef IgnoreAttributesForTags
     * @property {string[]} tags tags on which to ignore the given attributes
     * @property {string[]} attributes attributes to ignore for the given tags
     */
    export type IgnoreAttributesForTags = {
        tags: string[];
        attributes: string[];
    };

    /**
     * @typedef DiffOptions
     * @property {(string | IgnoreAttributesForTags)[]} [ignoreAttributes]
     *  array of attributes to ignore, when given a string that attribute will be ignored on all tags
     *  when given an object of type `IgnoreAttributesForTags`, you can specify on which tags to ignore which attributes
     * @property {string[]} [ignoreTags] array of tags to ignore, these tags are stripped from the output
     * @property {string[]} [ignoreChildren] array of tags whose children to ignore, the children of
     *   these tags are stripped from the output
     */
    export type DiffOptions = {
        ignoreTags?: string[];
        ignoreChildren?: string[];
    };

    /**
     * Restructures given HTML string, returning it in a format which can be used for comparison:
     * - whitespace and newlines are normalized
     * - tags and attributes are printed on individual lines
     * - comments, style, script and svg tags are removed
     * - additional tags and attributes can optionally be ignored
     *
     * See README.md for details.
     *
     * @example
     * import getDiffableHTML from '@open-wc/semantic-dom-diff';
     *
     * const htmlA = getDiffableHTML(`... some html ...`, { ignoredAttributes: [], ignoredTags: [], ignoreChildren: [] });
     * const htmlB = getDiffableHTML(`... some html ...`);
     *
     * // use regular string comparison to spot the differences
     * expect(htmlA).to.equal(htmlB);
     *
     * @param {Node | string} html
     * @param {DiffOptions} [options]
     * @returns {string} html restructured in a diffable format
     */
    export function getDiffableHTML(
        html: Node | string,
        options?: DiffOptions
    ): string;

    /**
     * el.outerHTML is not polyfilled so we need to recreate the tag + attributes and
     * combine it with el.innerHTML.
     *
     * @param {Element} el Element you want to get the out Html from
     * @returns {String} outer html
     */
    export var getOuterHtml: any;

    /**
     * For comparision we do not need the style scoping classes on polyfilled browsers
     * Rather naive approach for now - probably need to improve once we have failing cases.
     *
     * @param {Element} el Element you want to get the cleaned shadow dom
     * @returns {String} cleaned shadow dom
     */
    export var getCleanedShadowDom: any;
}
declare module '@open-wc/testing-helpers' {
    import { TemplateResult } from 'lit-html';
    /**
     * Awaits for "update complete promises" of elements
     * - for [lit-element](https://github.com/polymer/lit-element) that is `el.updateComplete`;
     * - for [stencil](https://github.com/ionic-team/stencil/) that is `el.componentOnReady()`;
     *
     * If none of those specfic Promise hooks are found, it will wait for one frame via
     * `await nextFrame()`.
     *
     * Ensures that ShadyDOM finished its job if available.
     *
     * @template {Element} T
     * @param {T} el
     * @returns {Promise<T>}
     */
    export function elementUpdated<T>(el: T): Promise<T>;

    /**
     * Renders a string/TemplateResult and puts it in the DOM via a fixtureWrapper.
     *
     * @example
     * const el = fixtureSync('<my-el><span></span></my-el>');
     *
     * @template {Element} T
     * @param {string | TemplateResult} template Either a string or lit-html TemplateResult
     * @returns {T} First child of the rendered DOM
     */
    export function fixtureSync<T>(template: string | TemplateResult): T;

    /**
     * Renders a string/TemplateResult and puts it in the DOM via a fixtureWrapper.
     * By default fixture awaits the elements "update complete" Promise.
     * - for [lit-element](https://github.com/polymer/lit-element) that is `el.updateComplete`;
     * - for [stencil](https://github.com/ionic-team/stencil/) that is `el.componentOnReady()`;
     *
     * If none of those specfic Promise hooks are found, it will wait for one frame via
     * `await nextFrame()`.
     *
     * **Note**: this does not guarantee that the element is done rendering -
     * it just waits for the next JavaScript tick.
     *
     * @example
     * const el = await fixture('<my-el><span></span></my-el>');
     * expect(el.fullyRendered).to.be.true;
     *
     * @template {Element} T
     * @param {string | TemplateResult} template Either a string or lit-html TemplateResult
     * @returns {Promise<T>} A Promise that will resolve to the first child of the rendered DOM
     */
    export function fixture<T>(template: string | TemplateResult): Promise<T>;

    /** @type Array<Element>
     */
    export var cachedWrappers: Element[];

    /**
     * Creates a wrapper as a direct child of `<body>` to put the tested element into.
     * Need to be in the DOM to test for example `connectedCallback()` on elements.
     *
     * @returns {Element}
     */
    export function fixtureWrapper(): Element;

    /**
     * Cleans up all defined fixtures by removing the actual wrapper nodes.
     * Common usecase is at the end of each test.
     */
    export function fixtureCleanup(): void;

    /**
     * Registers a new element with an automatically generated unique name.
     * Helps to make a test fully isolated.
     *
     * @example
     * const tag = defineCE(class extends MyMixin(HTMLElement) {
     *   // define custom element class body
     * });
     * const el = fixture(`<${tag}></${tag}>`);
     * // test el
     *
     * @param {function} klass Class which extends HTMLElement
     * @returns {string} Tag name of the registered element
     */
    export function defineCE(klass: (...params: any[]) => any): string;

    /**
     * Indicates that this is Internet Explorer.
     *
     * @returns {boolean}
     */
    export function isIE(): boolean;

    /**
     * Resolves after provided amount of miliseconds.
     *
     * @example
     * await aTimeout(100);
     *
     * @param {number} ms Miliseconds.
     * @returns {Promise<void>} Promise to await until time is up
     */
    export function aTimeout(ms: number): Promise<void>;

    /**
     * Resolves after requestAnimationFrame.
     *
     * @example
     * await nextFrame();
     *
     * @returns {Promise<void>} Promise that resolved after requestAnimationFrame
     */
    export function nextFrame(): Promise<void>;

    /**
     * Blurs the provided element and await time before and after it on IE.
     *
     * @example
     * const el = await fixture('<input type="text" autofocus />');
     * await triggerBlurFor(el);
     * // el is no longer focused
     *
     * @param {HTMLElement} element Element/Node to blur
     * @returns {Promise<void>} Promise to await until blur is done (for IE)
     */
    export function triggerBlurFor(element: HTMLElement): Promise<void>;

    /**
     * Focuses the provided element and await time before and after it on IE.
     *
     * Background info:
     * Adding an event and immediately trigger it fails in IE.
     * Also before checking the effects of a trigger IE needs some time.
     *
     * @example
     * const el = await fixture('<input type="text" />');
     * await triggerFocusFor(el);
     * // el is now focused
     *
     * @param {HTMLElement} element Element/Node to focus
     * @returns {Promise<void>} Promise to await until focus is done (for IE)
     */
    export function triggerFocusFor(element: HTMLElement): Promise<void>;

    /**
     * Listens for one event and resolves with this event object after it was fired.
     *
     * @example
     * setTimeout(() => el.fireDone());
     * await oneEvent(el, 'done');
     * expect(el.done).to.be.true;
     *
     * @param {HTMLElement} element Element that is going to fire the event
     * @param {string} eventName Name of the event
     * @returns {Promise<CustomEvent>} Promise to await until the event has been fired
     */
    export function oneEvent(
        element: HTMLElement,
        eventName: string
    ): Promise<CustomEvent>;

    /**
     * This is a wrapper around lit-html that supports dynamic strings to be added as a preprocessing
     * step, before a template is passed to lit's html function.
     * A dynamic string will be evaluated one time (on init) and passed to lit-html as being
     * part of the static string.
     *
     * WARNING: do not use in production!!! has a huge performance penalty as every string is
     * different from lit-htmls perspective so a new tag is created every time.
     *
     * A valid use case for this would be to create dynamic tag names.
     *
     * @example:
     * const tag = unsafeStatic('my-tag');
     * html`<${tag} prop="${prop}"></${tag>`
     * // will in turn calls lit-html html function as:
     * html`<my-tag prop="${prop}"></my-tag>`
     *
     * @param {TemplateStringsArray} strings Static Parts
     * @param {Array[any]} values Dynamic Parts
     * @returns {import('lit-html').TemplateResult}
     */
    export function html(strings: TemplateStringsArray, values: any): any;

    /**
     * Setups an element synchronously from the provided lit-html template and puts it in the DOM.
     *
     * @template {Element} T - Is an element or a node
     * @param {import('lit-html').TemplateResult} template
     * @returns {T}
     */
    export function litFixtureSync<T>(template: any): T;

    /**
     * Setups an element asynchronously from the provided lit-html template and puts it in the DOM.
     *
     * @template {Element} T - Is an element or a node
     * @param {import('lit-html').TemplateResult} template
     * @returns {Promise<T>}
     */
    export function litFixture<T>(template: any): Promise<T>;

    /**
     * Setups an element synchronously from the provided string template and puts it in the DOM.
     * Allows to specify properties via an object or a function taking the element as an argument.
     *
     * @template {Element} T - Is an element or a node
     * @param {string} template
     * @returns {T}
     */
    export function stringFixtureSync<T>(template: string): T;

    /**
     * Setups an element asynchronously from the provided string template and puts it in the DOM.
     * Allows to specify properties via an object or a function taking the element as an argument.
     *
     * @template {Element} T - Is an element or a node
     * @param {string} template
     * @returns {Promise<T>}
     */
    export function stringFixture<T>(template: string): Promise<T>;
}
