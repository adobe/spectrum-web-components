import type { HookFunction } from 'mocha';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { TemplateResult } from '@spectrum-web-components/base';
/**
 * send mouse to the middle of a specific DOM rect or HTMLElement
 */
export declare function sendMouseTo(elementOrRect: HTMLElement | DOMRect, type?: 'click' | 'move' | 'down' | 'up' | 'wheel', button?: 'left' | 'right' | 'middle'): Promise<unknown>;
/**
 * send mouse outside of a particular DOMRect or HTMLElement
 */
export declare function sendMouseFrom(elementOrRect: HTMLElement | DOMRect, type?: 'click' | 'move' | 'down' | 'up' | 'wheel', button?: 'left' | 'right' | 'middle'): Promise<unknown>;
export declare function testForLitDevWarnings(fixture: () => Promise<HTMLElement>): Promise<void>;
export declare function testForMemoryLeaks(element: TemplateResult): Promise<void>;
export declare function waitForPredicate(predicateFn: () => boolean | undefined, timeout?: number): Promise<boolean>;
export declare function isVisible(element: HTMLElement): boolean;
export declare const shiftTabEvent: () => KeyboardEvent;
export declare const shiftEvent: () => KeyboardEvent;
export declare const enterEvent: () => KeyboardEvent;
export declare const escapeEvent: () => KeyboardEvent;
export declare const arrowRightEvent: () => KeyboardEvent;
export declare const arrowLeftEvent: () => KeyboardEvent;
export declare const arrowUpEvent: () => KeyboardEvent;
export declare const arrowDownEvent: () => KeyboardEvent;
export declare const deleteEvent: () => KeyboardEvent;
export declare const spaceEvent: () => KeyboardEvent;
export declare const backspaceEvent: () => KeyboardEvent;
export declare const endEvent: () => KeyboardEvent;
export declare const homeEvent: () => KeyboardEvent;
export declare const pageUpEvent: () => KeyboardEvent;
export declare const pageDownEvent: () => KeyboardEvent;
export declare const tabEvent: () => KeyboardEvent;
export declare const tEvent: () => KeyboardEvent;
export declare const shiftKeyupEvent: () => KeyboardEvent;
export declare const arrowRightKeyupEvent: () => KeyboardEvent;
export declare const arrowLeftKeyupEvent: () => KeyboardEvent;
export declare const arrowUpKeyupEvent: () => KeyboardEvent;
export declare const arrowDownKeyupEvent: () => KeyboardEvent;
export declare function ignoreResizeObserverLoopError(before: HookFunction, after: HookFunction): void;
export declare function isOnTopLayer(element: HTMLElement): Promise<boolean>;
export declare function isInteractive(el: HTMLElement, position?: string): Promise<boolean>;
export declare function fixture<T extends Element>(story: TemplateResult, dir?: 'ltr' | 'rtl' | 'auto'): Promise<T>;
export declare function usedHeapMB(): Promise<Record<'dom' | 'js' | 'shared' | 'total', number>>;
export declare function detectOS(): string | null;
