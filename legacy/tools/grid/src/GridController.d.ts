import type { ReactiveController } from 'lit';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { RangeChangedEvent, VisibilityChangedEvent } from '@lit-labs/virtualizer/events.js';
import { Grid } from './Grid.js';
interface ItemSize {
    width: number;
    height: number;
}
export declare class GridController<T extends HTMLElement> implements ReactiveController {
    host: Grid;
    resizeController: ResizeController;
    rovingTabindexController: RovingTabindexController<T>;
    get itemSize(): ItemSize;
    private _itemSize;
    _first: number;
    get gap(): string | undefined;
    private _gap;
    get padding(): string | undefined;
    private _padding;
    _last: number;
    constructor(host: Grid, { elements, itemSize, gap, padding, }: {
        elements: () => T[];
        itemSize: ItemSize | (() => ItemSize);
        gap?: string | (() => string);
        padding?: string | (() => string);
    });
    focus(options?: FocusOptions): void;
    protected applyLayout(itemSize: ItemSize | (() => ItemSize), gap?: string | (() => string), padding?: string | (() => string)): void;
    update({ elements, itemSize, gap, padding, }: {
        elements: () => T[];
        itemSize: ItemSize | (() => ItemSize);
        gap?: string | (() => string);
        padding?: string | (() => string);
    }): void;
    protected measureDirectionLength(contentRect: DOMRect): void;
    protected handleFocusin: (event: FocusEvent) => void;
    protected handleFocusout: (event: FocusEvent) => void;
    protected handleRangeChanged: (event: RangeChangedEvent) => void;
    protected handleVisibleChanged: (event: VisibilityChangedEvent) => void;
    hostConnected(): void;
    hostDisconnected(): void;
}
export {};
