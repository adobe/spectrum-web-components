/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import type { ReactiveController } from 'lit';

import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import {
    RangeChangedEvent,
    VisibilityChangedEvent,
} from '@lit-labs/virtualizer/events.js';
import { Grid } from './Grid.js';

interface ItemSize {
    width: number;
    height: number;
}

const doCallbackAfterPaint = (cb: () => void): void => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cb();
        });
    });
};

export class GridController<T extends HTMLElement>
    implements ReactiveController
{
    host!: Grid;

    resizeController!: ResizeController;

    rovingTabindexController!: RovingTabindexController<T>;

    get itemSize(): ItemSize {
        return this._itemSize();
    }

    /* c8 ignore next 6 */
    private _itemSize(): ItemSize {
        return {
            width: 100,
            height: 100,
        };
    }

    // First visible element
    _first = 0;

    get gap(): string | undefined {
        return this._gap();
    }

    /* c8 ignore next 3 */
    private _gap(): string | undefined {
        return undefined;
    }

    get padding(): string | undefined {
        return this._padding();
    }

    /* c8 ignore next 3 */
    private _padding(): string | undefined {
        return undefined;
    }

    // Last visible element
    _last = 0;

    constructor(
        host: Grid,
        {
            elements,
            itemSize,
            gap,
            padding,
        }: {
            elements: () => T[];
            itemSize: ItemSize | (() => ItemSize);
            gap?: string | (() => string);
            padding?: string | (() => string);
        }
    ) {
        this.host = host;
        this.host.addController(this);
        this.applyLayout(itemSize, gap, padding);
        this.resizeController = new ResizeController(this.host, {
            callback: (entries: ResizeObserverEntry[]): void => {
                entries.forEach((entry) => {
                    this.measureDirectionLength(entry.contentRect);
                });
            },
        });
        this.rovingTabindexController = new RovingTabindexController<T>(
            this.host,
            {
                direction: 'grid',
                elements,
                focusInIndex: () => {
                    const activeElement = (this.host.getRootNode() as Document)
                        .activeElement as HTMLElement;
                    return activeElement === this.host ? 0 : -1;
                },
            }
        );
    }

    public focus(options?: FocusOptions): void {
        this.rovingTabindexController.focus(options);
    }

    protected applyLayout(
        itemSize: ItemSize | (() => ItemSize),
        gap?: string | (() => string),
        padding?: string | (() => string)
    ): void {
        /* c8 ignore next 2 */
        if (typeof itemSize === 'object') {
            this._itemSize = () => itemSize;
        } else if (
            typeof itemSize === 'function' &&
            typeof itemSize() !== 'undefined'
        ) {
            this._itemSize = itemSize;
        }
        /* c8 ignore next 2 */
        if (typeof gap === 'string') {
            this._gap = () => gap;
        } else if (typeof gap === 'function') {
            this._gap = gap;
        }
        /* c8 ignore next 2 */
        if (typeof padding === 'string') {
            this._padding = () => padding;
        } else if (typeof padding === 'function') {
            this._padding = padding;
        }
    }

    public update({
        elements,
        itemSize,
        gap,
        padding,
    }: {
        elements: () => T[];
        itemSize: ItemSize | (() => ItemSize);
        gap?: string | (() => string);
        padding?: string | (() => string);
    }): void {
        this.rovingTabindexController.update({ elements });
        this.applyLayout(itemSize, gap, padding);
        const contentRect = this.host.getBoundingClientRect();
        this.measureDirectionLength(contentRect);
    }

    protected measureDirectionLength(contentRect: DOMRect): void {
        const gap = this.gap ? parseFloat(this.gap) : 0;
        const padding = this.padding ? parseFloat(this.padding) : 0;
        const contentBoxWidth = contentRect.width - padding * 2;
        // There is always one less gap per row than items.
        const directionLength =
            Math.floor(
                (contentBoxWidth - this.itemSize.width) /
                    (gap + this.itemSize.width)
            ) + 1;
        this.rovingTabindexController.directionLength =
            Math.floor(directionLength);
    }

    protected handleFocusin = (event: FocusEvent): void => {
        const scrollToFirst = (): void => this.host.scrollToIndex(0);
        const focusIntoGrid = (): void => {
            this.focus();
            this.host.tabIndex = -1;
        };
        if ((event.target as HTMLElement) === this.host) {
            if (this._first > 0) {
                doCallbackAfterPaint(() => {
                    scrollToFirst();
                    doCallbackAfterPaint(focusIntoGrid);
                });
            } else {
                doCallbackAfterPaint(focusIntoGrid);
            }
        }
    };

    protected handleFocusout = (event: FocusEvent): void => {
        if (
            !event.relatedTarget ||
            !this.host.contains(event.relatedTarget as HTMLElement)
        ) {
            this.host.tabIndex = 0;
        }
    };

    protected handleRangeChanged = (event: RangeChangedEvent): void => {
        this.rovingTabindexController.clearElementCache(event.first);
    };

    protected handleVisibleChanged = (event: VisibilityChangedEvent): void => {
        this._first = event.first;
        this._last = event.last;
    };

    public hostConnected(): void {
        this.host.addEventListener('rangeChanged', this.handleRangeChanged);
        this.host.addEventListener(
            'visibilityChanged',
            this.handleVisibleChanged
        );
        this.host.addEventListener('focusin', this.handleFocusin);
        this.host.addEventListener('focusout', this.handleFocusout);
        this.host.tabIndex = 0;
        this.host.style.setProperty('outline', 'none', 'important');
    }

    public hostDisconnected(): void {
        this.host.removeEventListener('rangeChanged', this.handleRangeChanged);
        this.host.removeEventListener(
            'visibilityChanged',
            this.handleVisibleChanged
        );
        this.host.removeEventListener('focusin', this.handleFocusin);
        this.host.removeEventListener('focusout', this.handleFocusout);
    }
}
