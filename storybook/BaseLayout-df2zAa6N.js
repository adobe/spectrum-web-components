/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dim1(direction) {
    return direction === 'horizontal' ? 'width' : 'height';
}
function dim2(direction) {
    return direction === 'horizontal' ? 'height' : 'width';
}
class BaseLayout {
    _getDefaultConfig() {
        return {
            direction: 'vertical',
        };
    }
    constructor(hostSink, config) {
        /**
         * The last set viewport scroll position.
         */
        this._latestCoords = { left: 0, top: 0 };
        /**
         * Scrolling direction.
         */
        this._direction = null;
        /**
         * Dimensions of the viewport.
         */
        this._viewportSize = { width: 0, height: 0 };
        this.totalScrollSize = { width: 0, height: 0 };
        this.offsetWithinScroller = { left: 0, top: 0 };
        /**
         * Flag for debouncing asynchronous reflow requests.
         */
        this._pendingReflow = false;
        this._pendingLayoutUpdate = false;
        this._pin = null;
        /**
         * The index of the first item intersecting the viewport.
         */
        this._firstVisible = 0;
        /**
         * The index of the last item intersecting the viewport.
         */
        this._lastVisible = 0;
        /**
         * Pixel offset in the scroll direction of the first child.
         */
        this._physicalMin = 0;
        /**
         * Pixel offset in the scroll direction of the last child.
         */
        this._physicalMax = 0;
        /**
         * Index of the first child.
         */
        this._first = -1;
        /**
         * Index of the last child.
         */
        this._last = -1;
        /**
         * Length in the scrolling direction.
         */
        this._sizeDim = 'height';
        /**
         * Length in the non-scrolling direction.
         */
        this._secondarySizeDim = 'width';
        /**
         * Position in the scrolling direction.
         */
        this._positionDim = 'top';
        /**
         * Position in the non-scrolling direction.
         */
        this._secondaryPositionDim = 'left';
        /**
         * Current scroll offset in pixels.
         */
        this._scrollPosition = 0;
        /**
         * Difference between current scroll offset and scroll offset calculated due
         * to a reflow.
         */
        this._scrollError = 0;
        /**
         * Total number of items that could possibly be displayed. Used to help
         * calculate the scroll size.
         */
        this._items = [];
        /**
         * The total (estimated) length of all items in the scrolling direction.
         */
        this._scrollSize = 1;
        /**
         * Number of pixels beyond the viewport to still include
         * in the active range of items.
         */
        // TODO (graynorton): Probably want to make this something we calculate based
        // on viewport size, item size, other factors, possibly still with a dial of some kind
        this._overhang = 1000;
        this._hostSink = hostSink;
        // Delay setting config so that subclasses do setup work first
        Promise.resolve().then(() => (this.config = config || this._getDefaultConfig()));
    }
    set config(config) {
        Object.assign(this, Object.assign({}, this._getDefaultConfig(), config));
    }
    get config() {
        return {
            direction: this.direction,
        };
    }
    /**
     * Maximum index of children + 1, to help estimate total height of the scroll
     * space.
     */
    get items() {
        return this._items;
    }
    set items(items) {
        this._setItems(items);
    }
    _setItems(items) {
        if (items !== this._items) {
            this._items = items;
            this._scheduleReflow();
        }
    }
    /**
     * Primary scrolling direction.
     */
    get direction() {
        return this._direction;
    }
    set direction(dir) {
        // Force it to be either horizontal or vertical.
        dir = dir === 'horizontal' ? dir : 'vertical';
        if (dir !== this._direction) {
            this._direction = dir;
            this._sizeDim = dir === 'horizontal' ? 'width' : 'height';
            this._secondarySizeDim = dir === 'horizontal' ? 'height' : 'width';
            this._positionDim = dir === 'horizontal' ? 'left' : 'top';
            this._secondaryPositionDim = dir === 'horizontal' ? 'top' : 'left';
            this._triggerReflow();
        }
    }
    /**
     * Height and width of the viewport.
     */
    get viewportSize() {
        return this._viewportSize;
    }
    set viewportSize(dims) {
        const { _viewDim1, _viewDim2 } = this;
        Object.assign(this._viewportSize, dims);
        if (_viewDim2 !== this._viewDim2) {
            // this._viewDim2Changed();
            this._scheduleLayoutUpdate();
        }
        else if (_viewDim1 !== this._viewDim1) {
            this._checkThresholds();
        }
    }
    /**
     * Scroll offset of the viewport.
     */
    get viewportScroll() {
        return this._latestCoords;
    }
    set viewportScroll(coords) {
        Object.assign(this._latestCoords, coords);
        const oldPos = this._scrollPosition;
        this._scrollPosition = this._latestCoords[this._positionDim];
        const change = Math.abs(oldPos - this._scrollPosition);
        if (change >= 1) {
            this._checkThresholds();
        }
    }
    /**
     * Perform a reflow if one has been scheduled.
     */
    reflowIfNeeded(force = false) {
        if (force || this._pendingReflow) {
            this._pendingReflow = false;
            this._reflow();
        }
    }
    set pin(options) {
        this._pin = options;
        this._triggerReflow();
    }
    get pin() {
        if (this._pin !== null) {
            const { index, block } = this._pin;
            return {
                index: Math.max(0, Math.min(index, this.items.length - 1)),
                block,
            };
        }
        return null;
    }
    _clampScrollPosition(val) {
        return Math.max(-this.offsetWithinScroller[this._positionDim], Math.min(val, this.totalScrollSize[dim1(this.direction)] - this._viewDim1));
    }
    unpin() {
        if (this._pin !== null) {
            this._sendUnpinnedMessage();
            this._pin = null;
        }
    }
    _updateLayout() {
        // Override
    }
    // protected _viewDim2Changed(): void {
    //   this._scheduleLayoutUpdate();
    // }
    /**
     * The height or width of the viewport, whichever corresponds to the scrolling direction.
     */
    get _viewDim1() {
        return this._viewportSize[this._sizeDim];
    }
    /**
     * The height or width of the viewport, whichever does NOT correspond to the scrolling direction.
     */
    get _viewDim2() {
        return this._viewportSize[this._secondarySizeDim];
    }
    _scheduleReflow() {
        this._pendingReflow = true;
    }
    _scheduleLayoutUpdate() {
        this._pendingLayoutUpdate = true;
        this._scheduleReflow();
    }
    // For triggering a reflow based on incoming changes to
    // the layout config.
    _triggerReflow() {
        this._scheduleLayoutUpdate();
        // TODO graynorton@: reflowIfNeeded() isn't really supposed
        // to be called internally. Address in larger cleanup
        // of virtualizer / layout interaction pattern.
        // this.reflowIfNeeded(true);
        Promise.resolve().then(() => this.reflowIfNeeded());
    }
    _reflow() {
        if (this._pendingLayoutUpdate) {
            this._updateLayout();
            this._pendingLayoutUpdate = false;
        }
        this._updateScrollSize();
        this._setPositionFromPin();
        this._getActiveItems();
        this._updateVisibleIndices();
        this._sendStateChangedMessage();
    }
    /**
     * If we are supposed to be pinned to a particular
     * item or set of coordinates, we set `_scrollPosition`
     * accordingly and adjust `_scrollError` as needed
     * so that the virtualizer can keep the scroll
     * position in the DOM in sync
     */
    _setPositionFromPin() {
        if (this.pin !== null) {
            const lastScrollPosition = this._scrollPosition;
            const { index, block } = this.pin;
            this._scrollPosition =
                this._calculateScrollIntoViewPosition({
                    index,
                    block: block || 'start',
                }) - this.offsetWithinScroller[this._positionDim];
            this._scrollError = lastScrollPosition - this._scrollPosition;
        }
    }
    /**
     * Calculate the coordinates to scroll to, given
     * a request to scroll to the element at a specific
     * index.
     *
     * Supports the same positioning options (`start`,
     * `center`, `end`, `nearest`) as the standard
     * `Element.scrollIntoView()` method, but currently
     * only considers the provided value in the `block`
     * dimension, since we don't yet have any layouts
     * that support virtualization in two dimensions.
     */
    _calculateScrollIntoViewPosition(options) {
        const { block } = options;
        const index = Math.min(this.items.length, Math.max(0, options.index));
        const itemStartPosition = this._getItemPosition(index)[this._positionDim];
        let scrollPosition = itemStartPosition;
        if (block !== 'start') {
            const itemSize = this._getItemSize(index)[this._sizeDim];
            if (block === 'center') {
                scrollPosition =
                    itemStartPosition - 0.5 * this._viewDim1 + 0.5 * itemSize;
            }
            else {
                const itemEndPosition = itemStartPosition - this._viewDim1 + itemSize;
                if (block === 'end') {
                    scrollPosition = itemEndPosition;
                }
                else {
                    // block === 'nearest'
                    const currentScrollPosition = this._scrollPosition;
                    scrollPosition =
                        Math.abs(currentScrollPosition - itemStartPosition) <
                            Math.abs(currentScrollPosition - itemEndPosition)
                            ? itemStartPosition
                            : itemEndPosition;
                }
            }
        }
        scrollPosition += this.offsetWithinScroller[this._positionDim];
        return this._clampScrollPosition(scrollPosition);
    }
    getScrollIntoViewCoordinates(options) {
        return {
            [this._positionDim]: this._calculateScrollIntoViewPosition(options),
        };
    }
    _sendUnpinnedMessage() {
        this._hostSink({
            type: 'unpinned',
        });
    }
    _sendVisibilityChangedMessage() {
        this._hostSink({
            type: 'visibilityChanged',
            firstVisible: this._firstVisible,
            lastVisible: this._lastVisible,
        });
    }
    _sendStateChangedMessage() {
        const childPositions = new Map();
        if (this._first !== -1 && this._last !== -1) {
            for (let idx = this._first; idx <= this._last; idx++) {
                childPositions.set(idx, this._getItemPosition(idx));
            }
        }
        const message = {
            type: 'stateChanged',
            scrollSize: {
                [this._sizeDim]: this._scrollSize,
                [this._secondarySizeDim]: null,
            },
            range: {
                first: this._first,
                last: this._last,
                firstVisible: this._firstVisible,
                lastVisible: this._lastVisible,
            },
            childPositions,
        };
        if (this._scrollError) {
            message.scrollError = {
                [this._positionDim]: this._scrollError,
                [this._secondaryPositionDim]: 0,
            };
            this._scrollError = 0;
        }
        this._hostSink(message);
    }
    /**
     * Number of items to display.
     */
    get _num() {
        if (this._first === -1 || this._last === -1) {
            return 0;
        }
        return this._last - this._first + 1;
    }
    _checkThresholds() {
        if ((this._viewDim1 === 0 && this._num > 0) || this._pin !== null) {
            this._scheduleReflow();
        }
        else {
            const min = Math.max(0, this._scrollPosition - this._overhang);
            const max = Math.min(this._scrollSize, this._scrollPosition + this._viewDim1 + this._overhang);
            if (this._physicalMin > min || this._physicalMax < max) {
                this._scheduleReflow();
            }
            else {
                this._updateVisibleIndices({ emit: true });
            }
        }
    }
    /**
     * Find the indices of the first and last items to intersect the viewport.
     * Emit a visibleindiceschange event when either index changes.
     */
    _updateVisibleIndices(options) {
        if (this._first === -1 || this._last === -1)
            return;
        let firstVisible = this._first;
        while (firstVisible < this._last &&
            Math.round(this._getItemPosition(firstVisible)[this._positionDim] +
                this._getItemSize(firstVisible)[this._sizeDim]) <= Math.round(this._scrollPosition)) {
            firstVisible++;
        }
        let lastVisible = this._last;
        while (lastVisible > this._first &&
            Math.round(this._getItemPosition(lastVisible)[this._positionDim]) >=
                Math.round(this._scrollPosition + this._viewDim1)) {
            lastVisible--;
        }
        if (firstVisible !== this._firstVisible ||
            lastVisible !== this._lastVisible) {
            this._firstVisible = firstVisible;
            this._lastVisible = lastVisible;
            if (options && options.emit) {
                this._sendVisibilityChangedMessage();
            }
        }
    }
}

export { BaseLayout as B, dim2 as a, dim1 as d };
