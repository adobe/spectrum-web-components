import './lit-element-BulMEkr1.js';
import { x, w } from './lit-html-COgVUehj.js';
import { e, t } from './directive-Bn5c4u4M.js';
import { f } from './async-directive-DF6rMZJ5.js';
import { c } from './repeat-D5JakrYV.js';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class RangeChangedEvent extends Event {
    constructor(range) {
        super(RangeChangedEvent.eventName, { bubbles: false });
        this.first = range.first;
        this.last = range.last;
    }
}
RangeChangedEvent.eventName = 'rangeChanged';
class VisibilityChangedEvent extends Event {
    constructor(range) {
        super(VisibilityChangedEvent.eventName, { bubbles: false });
        this.first = range.first;
        this.last = range.last;
    }
}
VisibilityChangedEvent.eventName = 'visibilityChanged';
class UnpinnedEvent extends Event {
    constructor() {
        super(UnpinnedEvent.eventName, { bubbles: false });
    }
}
UnpinnedEvent.eventName = 'unpinned';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ScrollerShim {
    constructor(element) {
        this._element = null;
        const node = element ?? window;
        this._node = node;
        if (element) {
            this._element = element;
        }
    }
    get element() {
        return (this._element || document.scrollingElement || document.documentElement);
    }
    get scrollTop() {
        return this.element.scrollTop || window.scrollY;
    }
    get scrollLeft() {
        return this.element.scrollLeft || window.scrollX;
    }
    get scrollHeight() {
        return this.element.scrollHeight;
    }
    get scrollWidth() {
        return this.element.scrollWidth;
    }
    get viewportHeight() {
        return this._element
            ? this._element.getBoundingClientRect().height
            : window.innerHeight;
    }
    get viewportWidth() {
        return this._element
            ? this._element.getBoundingClientRect().width
            : window.innerWidth;
    }
    get maxScrollTop() {
        return this.scrollHeight - this.viewportHeight;
    }
    get maxScrollLeft() {
        return this.scrollWidth - this.viewportWidth;
    }
}
class ScrollerController extends ScrollerShim {
    constructor(client, element) {
        super(element);
        this._clients = new Set();
        this._retarget = null;
        this._end = null;
        this.__destination = null;
        this.correctingScrollError = false;
        this._checkForArrival = this._checkForArrival.bind(this);
        this._updateManagedScrollTo = this._updateManagedScrollTo.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.scrollBy = this.scrollBy.bind(this);
        const node = this._node;
        this._originalScrollTo = node.scrollTo;
        this._originalScrollBy = node.scrollBy;
        this._originalScroll = node.scroll;
        this._attach(client);
    }
    get _destination() {
        return this.__destination;
    }
    get scrolling() {
        return this._destination !== null;
    }
    scrollTo(p1, p2) {
        const options = typeof p1 === 'number' && typeof p2 === 'number'
            ? { left: p1, top: p2 }
            : p1;
        this._scrollTo(options);
    }
    scrollBy(p1, p2) {
        const options = typeof p1 === 'number' && typeof p2 === 'number'
            ? { left: p1, top: p2 }
            : p1;
        if (options.top !== undefined) {
            options.top += this.scrollTop;
        }
        if (options.left !== undefined) {
            options.left += this.scrollLeft;
        }
        this._scrollTo(options);
    }
    _nativeScrollTo(options) {
        this._originalScrollTo.bind(this._element || window)(options);
    }
    _scrollTo(options, retarget = null, end = null) {
        if (this._end !== null) {
            this._end();
        }
        if (options.behavior === 'smooth') {
            this._setDestination(options);
            this._retarget = retarget;
            this._end = end;
        }
        else {
            this._resetScrollState();
        }
        this._nativeScrollTo(options);
    }
    _setDestination(options) {
        let { top, left } = options;
        top =
            top === undefined
                ? undefined
                : Math.max(0, Math.min(top, this.maxScrollTop));
        left =
            left === undefined
                ? undefined
                : Math.max(0, Math.min(left, this.maxScrollLeft));
        if (this._destination !== null &&
            left === this._destination.left &&
            top === this._destination.top) {
            return false;
        }
        this.__destination = { top, left, behavior: 'smooth' };
        return true;
    }
    _resetScrollState() {
        this.__destination = null;
        this._retarget = null;
        this._end = null;
    }
    _updateManagedScrollTo(coordinates) {
        if (this._destination) {
            if (this._setDestination(coordinates)) {
                this._nativeScrollTo(this._destination);
            }
        }
    }
    managedScrollTo(options, retarget, end) {
        this._scrollTo(options, retarget, end);
        return this._updateManagedScrollTo;
    }
    correctScrollError(coordinates) {
        this.correctingScrollError = true;
        requestAnimationFrame(() => requestAnimationFrame(() => (this.correctingScrollError = false)));
        // Correct the error
        this._nativeScrollTo(coordinates);
        // Then, if we were headed for a specific destination, we continue scrolling:
        // First, we update our target destination, if applicable...
        if (this._retarget) {
            this._setDestination(this._retarget());
        }
        // Then we go ahead and resume scrolling
        if (this._destination) {
            this._nativeScrollTo(this._destination);
        }
    }
    _checkForArrival() {
        if (this._destination !== null) {
            const { scrollTop, scrollLeft } = this;
            let { top, left } = this._destination;
            top = Math.min(top || 0, this.maxScrollTop);
            left = Math.min(left || 0, this.maxScrollLeft);
            const topDiff = Math.abs(top - scrollTop);
            const leftDiff = Math.abs(left - scrollLeft);
            // We check to see if we've arrived at our destination.
            if (topDiff < 1 && leftDiff < 1) {
                if (this._end) {
                    this._end();
                }
                this._resetScrollState();
            }
        }
    }
    detach(client) {
        this._clients.delete(client);
        /**
         * If there aren't any more clients, then return the node's default
         * scrolling methods
         */
        if (this._clients.size === 0) {
            this._node.scrollTo = this._originalScrollTo;
            this._node.scrollBy = this._originalScrollBy;
            this._node.scroll = this._originalScroll;
            this._node.removeEventListener('scroll', this._checkForArrival);
        }
        return null;
    }
    _attach(client) {
        this._clients.add(client);
        /**
         * The node should only have the methods shimmed when adding the first
         * client – otherwise it's redundant
         */
        if (this._clients.size === 1) {
            this._node.scrollTo = this.scrollTo;
            this._node.scrollBy = this.scrollBy;
            this._node.scroll = this.scrollTo;
            this._node.addEventListener('scroll', this._checkForArrival);
        }
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
// Virtualizer depends on `ResizeObserver`, which is supported in
// all modern browsers. For developers whose browser support
// matrix includes older browsers, we include a compatible
// polyfill in the package; this bit of module state facilitates
// a simple mechanism (see ./polyfillLoaders/ResizeObserver.js.)
// for loading the polyfill.
let _ResizeObserver = window?.ResizeObserver;
const virtualizerRef = Symbol('virtualizerRef');
const SIZER_ATTRIBUTE = 'virtualizer-sizer';
let DefaultLayoutConstructor;
/**
 * Provides virtual scrolling boilerplate.
 *
 * Extensions of this class must set hostElement and layout.
 *
 * Extensions of this class must also override VirtualRepeater's DOM
 * manipulation methods.
 */
class Virtualizer {
    constructor(config) {
        this._benchmarkStart = null;
        this._layout = null;
        this._clippingAncestors = [];
        /**
         * Layout provides these values, we set them on _render().
         * TODO @straversi: Can we find an XOR type, usable for the key here?
         */
        this._scrollSize = null;
        /**
         * Difference between scroll target's current and required scroll offsets.
         * Provided by layout.
         */
        this._scrollError = null;
        /**
         * A list of the positions (top, left) of the children in the current range.
         */
        this._childrenPos = null;
        // TODO: (graynorton): type
        this._childMeasurements = null;
        this._toBeMeasured = new Map();
        this._rangeChanged = true;
        this._itemsChanged = true;
        this._visibilityChanged = true;
        this._scrollerController = null;
        this._isScroller = false;
        this._sizer = null;
        /**
         * Resize observer attached to hostElement.
         */
        this._hostElementRO = null;
        /**
         * Resize observer attached to children.
         */
        this._childrenRO = null;
        this._mutationObserver = null;
        this._scrollEventListeners = [];
        this._scrollEventListenerOptions = {
            passive: true,
        };
        // TODO (graynorton): Rethink, per longer comment below
        this._loadListener = this._childLoaded.bind(this);
        /**
         * Index of element to scroll into view, plus scroll
         * behavior options, as imperatively specified via
         * `element(index).scrollIntoView()`
         */
        this._scrollIntoViewTarget = null;
        this._updateScrollIntoViewCoordinates = null;
        /**
         * Items to render. Set by items.
         */
        this._items = [];
        /**
         * Index of the first child in the range, not necessarily the first visible child.
         * TODO @straversi: Consider renaming these.
         */
        this._first = -1;
        /**
         * Index of the last child in the range.
         */
        this._last = -1;
        /**
         * Index of the first item intersecting the viewport.
         */
        this._firstVisible = -1;
        /**
         * Index of the last item intersecting the viewport.
         */
        this._lastVisible = -1;
        this._scheduled = new WeakSet();
        /**
         * Invoked at the end of each render cycle: children in the range are
         * measured, and their dimensions passed to this callback. Use it to layout
         * children as needed.
         */
        this._measureCallback = null;
        this._measureChildOverride = null;
        /**
         * State for `layoutComplete` promise
         */
        this._layoutCompletePromise = null;
        this._layoutCompleteResolver = null;
        this._layoutCompleteRejecter = null;
        this._pendingLayoutComplete = null;
        /**
         * Layout initialization is async because we dynamically load
         * the default layout if none is specified. This state is to track
         * whether init is complete.
         */
        this._layoutInitialized = null;
        if (!config) {
            throw new Error('Virtualizer constructor requires a configuration object');
        }
        if (config.hostElement) {
            this._init(config);
        }
        else {
            throw new Error('Virtualizer configuration requires the "hostElement" property');
        }
    }
    set items(items) {
        if (Array.isArray(items) && items !== this._items) {
            this._itemsChanged = true;
            this._items = items;
            this._schedule(this._updateLayout);
        }
    }
    _init(config) {
        this._isScroller = !!config.scroller;
        this._initHostElement(config);
        // If no layout is specified, we make an empty
        // layout config, which will result in the default
        // layout with default parameters
        const layoutConfig = config.layout || {};
        // Save the promise returned by `_initLayout` as a state
        // variable we can check before updating layout config
        this._layoutInitialized = this._initLayout(layoutConfig);
    }
    _initObservers() {
        this._mutationObserver = new MutationObserver(this._finishDOMUpdate.bind(this));
        this._hostElementRO = new _ResizeObserver(() => this._hostElementSizeChanged());
        this._childrenRO = new _ResizeObserver(this._childrenSizeChanged.bind(this));
    }
    _initHostElement(config) {
        const hostElement = (this._hostElement = config.hostElement);
        this._applyVirtualizerStyles();
        hostElement[virtualizerRef] = this;
    }
    connected() {
        this._initObservers();
        const includeSelf = this._isScroller;
        this._clippingAncestors = getClippingAncestors(this._hostElement, includeSelf);
        this._scrollerController = new ScrollerController(this, this._clippingAncestors[0]);
        this._schedule(this._updateLayout);
        this._observeAndListen();
    }
    _observeAndListen() {
        this._mutationObserver.observe(this._hostElement, { childList: true });
        this._hostElementRO.observe(this._hostElement);
        this._scrollEventListeners.push(window);
        window.addEventListener('scroll', this, this._scrollEventListenerOptions);
        this._clippingAncestors.forEach((ancestor) => {
            ancestor.addEventListener('scroll', this, this._scrollEventListenerOptions);
            this._scrollEventListeners.push(ancestor);
            this._hostElementRO.observe(ancestor);
        });
        this._hostElementRO.observe(this._scrollerController.element);
        this._children.forEach((child) => this._childrenRO.observe(child));
        this._scrollEventListeners.forEach((target) => target.addEventListener('scroll', this, this._scrollEventListenerOptions));
    }
    disconnected() {
        this._scrollEventListeners.forEach((target) => target.removeEventListener('scroll', this, this._scrollEventListenerOptions));
        this._scrollEventListeners = [];
        this._clippingAncestors = [];
        this._scrollerController?.detach(this);
        this._scrollerController = null;
        this._mutationObserver?.disconnect();
        this._mutationObserver = null;
        this._hostElementRO?.disconnect();
        this._hostElementRO = null;
        this._childrenRO?.disconnect();
        this._childrenRO = null;
        this._rejectLayoutCompletePromise('disconnected');
    }
    _applyVirtualizerStyles() {
        const hostElement = this._hostElement;
        // Would rather set these CSS properties on the host using Shadow Root
        // style scoping (and falling back to a global stylesheet where native
        // Shadow DOM is not available), but this Mobile Safari bug is preventing
        // that from working: https://bugs.webkit.org/show_bug.cgi?id=226195
        const style = hostElement.style;
        style.display = style.display || 'block';
        style.position = style.position || 'relative';
        style.contain = style.contain || 'size layout';
        if (this._isScroller) {
            style.overflow = style.overflow || 'auto';
            style.minHeight = style.minHeight || '150px';
        }
    }
    _getSizer() {
        const hostElement = this._hostElement;
        if (!this._sizer) {
            // Use a preexisting sizer element if provided (for better integration
            // with vDOM renderers)
            let sizer = hostElement.querySelector(`[${SIZER_ATTRIBUTE}]`);
            if (!sizer) {
                sizer = document.createElement('div');
                sizer.setAttribute(SIZER_ATTRIBUTE, '');
                hostElement.appendChild(sizer);
            }
            // When the scrollHeight is large, the height of this element might be
            // ignored. Setting content and font-size ensures the element has a size.
            Object.assign(sizer.style, {
                position: 'absolute',
                margin: '-2px 0 0 0',
                padding: 0,
                visibility: 'hidden',
                fontSize: '2px',
            });
            sizer.textContent = '&nbsp;';
            sizer.setAttribute(SIZER_ATTRIBUTE, '');
            this._sizer = sizer;
        }
        return this._sizer;
    }
    async updateLayoutConfig(layoutConfig) {
        // If layout initialization hasn't finished yet, we wait
        // for it to finish so we can check whether the new config
        // is compatible with the existing layout before proceeding.
        await this._layoutInitialized;
        const Ctor = layoutConfig.type ||
            // The new config is compatible with the current layout,
            // so we update the config and return true to indicate
            // a successful update
            DefaultLayoutConstructor;
        if (typeof Ctor === 'function' && this._layout instanceof Ctor) {
            const config = { ...layoutConfig };
            delete config.type;
            this._layout.config = config;
            // The new config requires a different layout altogether, but
            // to limit implementation complexity we don't support dynamically
            // changing the layout of an existing virtualizer instance.
            // Returning false here lets the caller know that they should
            // instead make a new virtualizer instance with the desired layout.
            return true;
        }
        return false;
    }
    async _initLayout(layoutConfig) {
        let config;
        let Ctor;
        if (typeof layoutConfig.type === 'function') {
            // If we have a full LayoutSpecifier, the `type` property
            // gives us our constructor...
            Ctor = layoutConfig.type;
            // ...while the rest of the specifier is our layout config
            const copy = { ...layoutConfig };
            delete copy.type;
            config = copy;
        }
        else {
            // If we don't have a full LayoutSpecifier, we just
            // have a config for the default layout
            config = layoutConfig;
        }
        if (Ctor === undefined) {
            // If we don't have a constructor yet, load the default
            DefaultLayoutConstructor = Ctor = (await import('./flow-D5uaxeop.js'))
                .FlowLayout;
        }
        this._layout = new Ctor((message) => this._handleLayoutMessage(message), config);
        if (this._layout.measureChildren &&
            typeof this._layout.updateItemSizes === 'function') {
            if (typeof this._layout.measureChildren === 'function') {
                this._measureChildOverride = this._layout.measureChildren;
            }
            this._measureCallback = this._layout.updateItemSizes.bind(this._layout);
        }
        if (this._layout.listenForChildLoadEvents) {
            this._hostElement.addEventListener('load', this._loadListener, true);
        }
        this._schedule(this._updateLayout);
    }
    // TODO (graynorton): Rework benchmarking so that it has no API and
    // instead is always on except in production builds
    startBenchmarking() {
        if (this._benchmarkStart === null) {
            this._benchmarkStart = window.performance.now();
        }
    }
    stopBenchmarking() {
        if (this._benchmarkStart !== null) {
            const now = window.performance.now();
            const timeElapsed = now - this._benchmarkStart;
            const entries = performance.getEntriesByName('uv-virtualizing', 'measure');
            const virtualizationTime = entries
                .filter((e) => e.startTime >= this._benchmarkStart && e.startTime < now)
                .reduce((t, m) => t + m.duration, 0);
            this._benchmarkStart = null;
            return { timeElapsed, virtualizationTime };
        }
        return null;
    }
    _measureChildren() {
        const mm = {};
        const children = this._children;
        const fn = this._measureChildOverride || this._measureChild;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const idx = this._first + i;
            if (this._itemsChanged || this._toBeMeasured.has(child)) {
                mm[idx] = fn.call(this, child, this._items[idx]);
            }
        }
        this._childMeasurements = mm;
        this._schedule(this._updateLayout);
        this._toBeMeasured.clear();
    }
    /**
     * Returns the width, height, and margins of the given child.
     */
    _measureChild(element) {
        // offsetWidth doesn't take transforms in consideration, so we use
        // getBoundingClientRect which does.
        const { width, height } = element.getBoundingClientRect();
        return Object.assign({ width, height }, getMargins(element));
    }
    async _schedule(method) {
        if (!this._scheduled.has(method)) {
            this._scheduled.add(method);
            await Promise.resolve();
            this._scheduled.delete(method);
            method.call(this);
        }
    }
    async _updateDOM(state) {
        this._scrollSize = state.scrollSize;
        this._adjustRange(state.range);
        this._childrenPos = state.childPositions;
        this._scrollError = state.scrollError || null;
        const { _rangeChanged, _itemsChanged } = this;
        if (this._visibilityChanged) {
            this._notifyVisibility();
            this._visibilityChanged = false;
        }
        if (_rangeChanged || _itemsChanged) {
            this._notifyRange();
            this._rangeChanged = false;
        }
        this._finishDOMUpdate();
    }
    _finishDOMUpdate() {
        this._children.forEach((child) => this._childrenRO.observe(child));
        this._checkScrollIntoViewTarget(this._childrenPos);
        this._positionChildren(this._childrenPos);
        this._sizeHostElement(this._scrollSize);
        this._correctScrollError();
        if (this._benchmarkStart && 'mark' in window.performance) {
            window.performance.mark('uv-end');
        }
    }
    _updateLayout() {
        // Only update the layout and trigger a re-render if we have:
        //   a) A layout
        //   b) A scrollerController, which means we're connected
        if (this._layout && this._scrollerController) {
            this._layout.items = this._items;
            this._updateView();
            if (this._childMeasurements !== null) {
                // If the layout has been changed, we may have measurements but no callback
                if (this._measureCallback) {
                    this._measureCallback(this._childMeasurements);
                }
                this._childMeasurements = null;
            }
            this._layout.reflowIfNeeded();
            if (this._benchmarkStart && 'mark' in window.performance) {
                window.performance.mark('uv-end');
            }
        }
    }
    _handleScrollEvent() {
        if (this._benchmarkStart && 'mark' in window.performance) {
            try {
                window.performance.measure('uv-virtualizing', 'uv-start', 'uv-end');
            }
            catch (e) {
                console.warn('Error measuring performance data: ', e);
            }
            window.performance.mark('uv-start');
        }
        if (this._scrollerController.correctingScrollError === false) {
            // This is a user-initiated scroll, so we unpin the layout
            this._layout?.unpin();
        }
        this._schedule(this._updateLayout);
    }
    handleEvent(event) {
        switch (event.type) {
            case 'scroll':
                if (event.currentTarget === window ||
                    this._clippingAncestors.includes(event.currentTarget)) {
                    this._handleScrollEvent();
                }
                break;
            default:
                console.warn('event not handled', event);
        }
    }
    _handleLayoutMessage(message) {
        if (message.type === 'stateChanged') {
            this._updateDOM(message);
        }
        else if (message.type === 'visibilityChanged') {
            this._firstVisible = message.firstVisible;
            this._lastVisible = message.lastVisible;
            this._notifyVisibility();
        }
        else if (message.type === 'unpinned') {
            this._hostElement.dispatchEvent(new UnpinnedEvent());
        }
    }
    get _children() {
        const arr = [];
        let next = this._hostElement.firstElementChild;
        while (next) {
            if (!next.hasAttribute(SIZER_ATTRIBUTE)) {
                arr.push(next);
            }
            next = next.nextElementSibling;
        }
        return arr;
    }
    _updateView() {
        const hostElement = this._hostElement;
        const scrollingElement = this._scrollerController?.element;
        const layout = this._layout;
        if (hostElement && scrollingElement && layout) {
            let top, left, bottom, right;
            const hostElementBounds = hostElement.getBoundingClientRect();
            top = 0;
            left = 0;
            bottom = window.innerHeight;
            right = window.innerWidth;
            const ancestorBounds = this._clippingAncestors.map((ancestor) => ancestor.getBoundingClientRect());
            ancestorBounds.unshift(hostElementBounds);
            for (const bounds of ancestorBounds) {
                top = Math.max(top, bounds.top);
                left = Math.max(left, bounds.left);
                bottom = Math.min(bottom, bounds.bottom);
                right = Math.min(right, bounds.right);
            }
            const scrollingElementBounds = scrollingElement.getBoundingClientRect();
            const offsetWithinScroller = {
                left: hostElementBounds.left - scrollingElementBounds.left,
                top: hostElementBounds.top - scrollingElementBounds.top,
            };
            const totalScrollSize = {
                width: scrollingElement.scrollWidth,
                height: scrollingElement.scrollHeight,
            };
            const scrollTop = top - hostElementBounds.top + hostElement.scrollTop;
            const scrollLeft = left - hostElementBounds.left + hostElement.scrollLeft;
            const height = bottom - top;
            const width = right - left;
            layout.viewportSize = { width, height };
            layout.viewportScroll = { top: scrollTop, left: scrollLeft };
            layout.totalScrollSize = totalScrollSize;
            layout.offsetWithinScroller = offsetWithinScroller;
        }
    }
    /**
     * Styles the host element so that its size reflects the
     * total size of all items.
     */
    _sizeHostElement(size) {
        // Some browsers seem to crap out if the host element gets larger than
        // a certain size, so we clamp it here (this value based on ad hoc
        // testing in Chrome / Safari / Firefox Mac)
        const max = 8200000;
        const h = size && size.width !== null ? Math.min(max, size.width) : 0;
        const v = size && size.height !== null ? Math.min(max, size.height) : 0;
        if (this._isScroller) {
            this._getSizer().style.transform = `translate(${h}px, ${v}px)`;
        }
        else {
            const style = this._hostElement.style;
            style.minWidth = h ? `${h}px` : '100%';
            style.minHeight = v ? `${v}px` : '100%';
        }
    }
    /**
     * Sets the top and left transform style of the children from the values in
     * pos.
     */
    _positionChildren(pos) {
        if (pos) {
            pos.forEach(({ top, left, width, height, xOffset, yOffset }, index) => {
                const child = this._children[index - this._first];
                if (child) {
                    child.style.position = 'absolute';
                    child.style.boxSizing = 'border-box';
                    child.style.transform = `translate(${left}px, ${top}px)`;
                    if (width !== undefined) {
                        child.style.width = width + 'px';
                    }
                    if (height !== undefined) {
                        child.style.height = height + 'px';
                    }
                    child.style.left =
                        xOffset === undefined ? null : xOffset + 'px';
                    child.style.top =
                        yOffset === undefined ? null : yOffset + 'px';
                }
            });
        }
    }
    async _adjustRange(range) {
        const { _first, _last, _firstVisible, _lastVisible } = this;
        this._first = range.first;
        this._last = range.last;
        this._firstVisible = range.firstVisible;
        this._lastVisible = range.lastVisible;
        this._rangeChanged =
            this._rangeChanged || this._first !== _first || this._last !== _last;
        this._visibilityChanged =
            this._visibilityChanged ||
                this._firstVisible !== _firstVisible ||
                this._lastVisible !== _lastVisible;
    }
    _correctScrollError() {
        if (this._scrollError) {
            const { scrollTop, scrollLeft } = this._scrollerController;
            const { top, left } = this._scrollError;
            this._scrollError = null;
            this._scrollerController.correctScrollError({
                top: scrollTop - top,
                left: scrollLeft - left,
            });
        }
    }
    element(index) {
        if (index === Infinity) {
            index = this._items.length - 1;
        }
        return this._items?.[index] === undefined
            ? undefined
            : {
                scrollIntoView: (options = {}) => this._scrollElementIntoView({ ...options, index }),
            };
    }
    _scrollElementIntoView(options) {
        if (options.index >= this._first && options.index <= this._last) {
            this._children[options.index - this._first].scrollIntoView(options);
        }
        else {
            options.index = Math.min(options.index, this._items.length - 1);
            if (options.behavior === 'smooth') {
                const coordinates = this._layout.getScrollIntoViewCoordinates(options);
                const { behavior } = options;
                this._updateScrollIntoViewCoordinates =
                    this._scrollerController.managedScrollTo(Object.assign(coordinates, { behavior }), () => this._layout.getScrollIntoViewCoordinates(options), () => (this._scrollIntoViewTarget = null));
                this._scrollIntoViewTarget = options;
            }
            else {
                this._layout.pin = options;
            }
        }
    }
    /**
     * If we are smoothly scrolling to an element and the target element
     * is in the DOM, we update our target coordinates as needed
     */
    _checkScrollIntoViewTarget(pos) {
        const { index } = this._scrollIntoViewTarget || {};
        if (index && pos?.has(index)) {
            this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget));
        }
    }
    /**
     * Emits a rangechange event with the current first, last, firstVisible, and
     * lastVisible.
     */
    _notifyRange() {
        this._hostElement.dispatchEvent(new RangeChangedEvent({ first: this._first, last: this._last }));
    }
    _notifyVisibility() {
        this._hostElement.dispatchEvent(new VisibilityChangedEvent({
            first: this._firstVisible,
            last: this._lastVisible,
        }));
    }
    get layoutComplete() {
        // Lazily create promise
        if (!this._layoutCompletePromise) {
            this._layoutCompletePromise = new Promise((resolve, reject) => {
                this._layoutCompleteResolver = resolve;
                this._layoutCompleteRejecter = reject;
            });
        }
        return this._layoutCompletePromise;
    }
    _rejectLayoutCompletePromise(reason) {
        if (this._layoutCompleteRejecter !== null) {
            this._layoutCompleteRejecter(reason);
        }
        this._resetLayoutCompleteState();
    }
    _scheduleLayoutComplete() {
        // Don't do anything unless we have a pending promise
        // And only request a frame if we haven't already done so
        if (this._layoutCompletePromise && this._pendingLayoutComplete === null) {
            // Wait one additional frame to be sure the layout is stable
            this._pendingLayoutComplete = requestAnimationFrame(() => requestAnimationFrame(() => this._resolveLayoutCompletePromise()));
        }
    }
    _resolveLayoutCompletePromise() {
        if (this._layoutCompleteResolver !== null) {
            this._layoutCompleteResolver();
        }
        this._resetLayoutCompleteState();
    }
    _resetLayoutCompleteState() {
        this._layoutCompletePromise = null;
        this._layoutCompleteResolver = null;
        this._layoutCompleteRejecter = null;
        this._pendingLayoutComplete = null;
    }
    /**
     * Render and update the view at the next opportunity with the given
     * hostElement size.
     */
    _hostElementSizeChanged() {
        this._schedule(this._updateLayout);
    }
    // TODO (graynorton): Rethink how this works. Probably child loading is too specific
    // to have dedicated support for; might want some more generic lifecycle hooks for
    // layouts to use. Possibly handle measurement this way, too, or maybe that remains
    // a first-class feature?
    _childLoaded() { }
    // This is the callback for the ResizeObserver that watches the
    // virtualizer's children. We land here at the end of every virtualizer
    // update cycle that results in changes to physical items, and we also
    // end up here if one or more children change size independently of
    // the virtualizer update cycle.
    _childrenSizeChanged(changes) {
        // Only measure if the layout requires it
        if (this._layout?.measureChildren) {
            for (const change of changes) {
                this._toBeMeasured.set(change.target, change.contentRect);
            }
            this._measureChildren();
        }
        // If this is the end of an update cycle, we need to reset some
        // internal state. This should be a harmless no-op if we're handling
        // an out-of-cycle ResizeObserver callback, so we don't need to
        // distinguish between the two cases.
        this._scheduleLayoutComplete();
        this._itemsChanged = false;
        this._rangeChanged = false;
    }
}
function getMargins(el) {
    const style = window.getComputedStyle(el);
    return {
        marginTop: getMarginValue(style.marginTop),
        marginRight: getMarginValue(style.marginRight),
        marginBottom: getMarginValue(style.marginBottom),
        marginLeft: getMarginValue(style.marginLeft),
    };
}
function getMarginValue(value) {
    const float = value ? parseFloat(value) : NaN;
    return Number.isNaN(float) ? 0 : float;
}
// TODO (graynorton): Deal with iframes?
function getParentElement(el) {
    if (el.assignedSlot !== null) {
        return el.assignedSlot;
    }
    if (el.parentElement !== null) {
        return el.parentElement;
    }
    const parentNode = el.parentNode;
    if (parentNode && parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        return parentNode.host || null;
    }
    return null;
}
///
function getElementAncestors(el, includeSelf = false) {
    const ancestors = [];
    let parent = includeSelf ? el : getParentElement(el);
    while (parent !== null) {
        ancestors.push(parent);
        parent = getParentElement(parent);
    }
    return ancestors;
}
function getClippingAncestors(el, includeSelf = false) {
    let foundFixed = false;
    return getElementAncestors(el, includeSelf).filter((a) => {
        if (foundFixed) {
            return false;
        }
        const style = getComputedStyle(a);
        foundFixed = style.position === 'fixed';
        return style.overflow !== 'visible';
    });
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const defaultKeyFunction = (item) => item;
const defaultRenderItem = (item, idx) => x `${idx}: ${JSON.stringify(item, null, 2)}`;
class VirtualizeDirective extends f {
    constructor(part) {
        super(part);
        this._virtualizer = null;
        this._first = 0;
        this._last = -1;
        this._renderItem = (item, idx) => defaultRenderItem(item, idx + this._first);
        this._keyFunction = (item, idx) => defaultKeyFunction(item, idx + this._first);
        this._items = [];
        if (part.type !== t.CHILD) {
            throw new Error('The virtualize directive can only be used in child expressions');
        }
    }
    render(config) {
        if (config) {
            this._setFunctions(config);
        }
        const itemsToRender = [];
        if (this._first >= 0 && this._last >= this._first) {
            for (let i = this._first; i <= this._last; i++) {
                itemsToRender.push(this._items[i]);
            }
        }
        return c(itemsToRender, this._keyFunction, this._renderItem);
    }
    update(part, [config]) {
        this._setFunctions(config);
        const itemsChanged = this._items !== config.items;
        this._items = config.items || [];
        if (this._virtualizer) {
            this._updateVirtualizerConfig(part, config);
        }
        else {
            this._initialize(part, config);
        }
        return itemsChanged ? w : this.render();
    }
    async _updateVirtualizerConfig(part, config) {
        const compatible = await this._virtualizer.updateLayoutConfig(config.layout || {});
        if (!compatible) {
            const hostElement = part.parentNode;
            this._makeVirtualizer(hostElement, config);
        }
        this._virtualizer.items = this._items;
    }
    _setFunctions(config) {
        const { renderItem, keyFunction } = config;
        if (renderItem) {
            this._renderItem = (item, idx) => renderItem(item, idx + this._first);
        }
        if (keyFunction) {
            this._keyFunction = (item, idx) => keyFunction(item, idx + this._first);
        }
    }
    _makeVirtualizer(hostElement, config) {
        if (this._virtualizer) {
            this._virtualizer.disconnected();
        }
        const { layout, scroller, items } = config;
        this._virtualizer = new Virtualizer({ hostElement, layout, scroller });
        this._virtualizer.items = items;
        this._virtualizer.connected();
    }
    _initialize(part, config) {
        const hostElement = part.parentNode;
        if (hostElement && hostElement.nodeType === 1) {
            hostElement.addEventListener('rangeChanged', (e) => {
                this._first = e.first;
                this._last = e.last;
                this.setValue(this.render());
            });
            this._makeVirtualizer(hostElement, config);
        }
    }
    disconnected() {
        this._virtualizer?.disconnected();
    }
    reconnected() {
        this._virtualizer?.connected();
    }
}
const virtualize = e(VirtualizeDirective);

export { RangeChangedEvent as R, VisibilityChangedEvent as V, defaultKeyFunction as a, virtualizerRef as b, defaultRenderItem as d, virtualize as v };
