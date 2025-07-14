import { Part } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
/**
 * Usage:
 *    import { html, render } from 'lit-html';
 *    import { spread } from '@open-wc/lit-helpers';
 *
 *    render(
 *      html`
 *        <div
 *          ${spread({
 *            'my-attribute': 'foo',
 *            '?my-boolean-attribute': true,
 *            '.myProperty': { foo: 'bar' },
 *            '@my-event': () => console.log('my-event fired'),
 *          })}
 *        ></div>
 *      `,
 *      document.body,
 *    );
 *
 * @TODO: replace this with a lit-native directive once one is released: https://github.com/lit/lit/pull/1960
 */
declare class SpreadDirective extends AsyncDirective {
    host: EventTarget | object | Element;
    element: Element;
    prevData: {
        [key: string]: unknown;
    };
    render(_spreadData: {
        [key: string]: unknown;
    }): symbol;
    update(part: Part, [spreadData]: Parameters<this['render']>): void;
    apply(data: {
        [key: string]: unknown;
    }): void;
    groom(data: {
        [key: string]: unknown;
    }): void;
    handleEvent(event: Event): void;
    disconnected(): void;
    reconnected(): void;
}
export declare const spread: (_spreadData: {
    [key: string]: unknown;
}) => import("lit-html/directive").DirectiveResult<typeof SpreadDirective>;
declare class SpreadPropsDirective extends AsyncDirective {
    host: EventTarget | object | Element;
    element: Element;
    prevData: {
        [key: string]: unknown;
    };
    render(_spreadData: {
        [key: string]: unknown;
    }): symbol;
    update(part: Part, [spreadData]: Parameters<this['render']>): void;
    apply(data: {
        [key: string]: unknown;
    }): void;
    groom(data: {
        [key: string]: unknown;
    }): void;
}
export declare const spreadProps: (_spreadData: {
    [key: string]: unknown;
}) => import("lit-html/directive").DirectiveResult<typeof SpreadPropsDirective>;
export {};
