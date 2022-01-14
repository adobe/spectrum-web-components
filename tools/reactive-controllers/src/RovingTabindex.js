export class RovingTabindexController {
    constructor(host, { calculateFocusInIndex, direction, elementEnterAction, elements, isFocusableElement, listenerScope, } = { elements: () => [] }) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.calculateFocusInIndex = (_elements) => 0;
        this._currentIndex = -1;
        this.shouldInit = true;
        this._direction = () => 'both';
        this.directionLength = 5;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.elementEnterAction = (_el) => {
            return;
        };
        this._focused = false;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.isFocusableElement = (_el) => true;
        this._listenerScope = () => this.host;
        this.manageIndexesAnimationFrame = 0;
        this.handleFocusin = (event) => {
            if (!this.isEventWithinListenerScope(event))
                return;
            if (this.hostContainsRelatedTarget(event)) {
                this.hostContainsFocus();
            }
            const path = event.composedPath();
            let targetIndex;
            path.find((el) => {
                targetIndex = this.elements.indexOf(el);
                return targetIndex !== -1;
            });
            this.currentIndex = targetIndex || this.currentIndex;
        };
        this.handleFocusout = (event) => {
            if (this.hostContainsRelatedTarget(event)) {
                this.hostNoLongerContainsFocus();
            }
        };
        this.handleKeydown = (event) => {
            if (!this.acceptsEventCode(event.code)) {
                return;
            }
            let diff = 0;
            switch (event.code) {
                case 'ArrowRight':
                    diff += 1;
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    diff += this.direction === 'grid' ? this.directionLength : 1;
                    event.preventDefault();
                    break;
                case 'ArrowLeft':
                    diff -= 1;
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    diff -= this.direction === 'grid' ? this.directionLength : 1;
                    event.preventDefault();
                    break;
                case 'End':
                    this.currentIndex = 0;
                    diff -= 1;
                    event.preventDefault();
                    break;
                case 'Home':
                    this.currentIndex = this.elements.length - 1;
                    diff += 1;
                    event.preventDefault();
                    break;
            }
            this.setCurrentIndexCircularly(diff);
            // To allow the `focusInIndex` to be calculated with the "after" state of the keyboard interaction
            // do `elementEnterAction` _before_ focusing the next element.
            this.elementEnterAction(this.elements[this.currentIndex]);
            this.focus();
        };
        this.host = host;
        this.host.addController(this);
        this._elements = elements;
        this.isFocusableElement = isFocusableElement || this.isFocusableElement;
        if (typeof direction === 'string') {
            this._direction = () => direction;
        }
        else if (typeof direction === 'function') {
            this._direction = direction;
        }
        this.calculateFocusInIndex =
            calculateFocusInIndex || this.calculateFocusInIndex;
        this.elementEnterAction = elementEnterAction || this.elementEnterAction;
        if (typeof listenerScope === 'object') {
            this._listenerScope = () => listenerScope;
        }
        else if (typeof listenerScope === 'function') {
            this._listenerScope = listenerScope;
        }
    }
    get elements() {
        if (!this.cachedElements) {
            this.cachedElements = this._elements();
        }
        return this.cachedElements;
    }
    get currentIndex() {
        if (this._currentIndex === -1) {
            this._currentIndex = this.focusInIndex;
        }
        return this._currentIndex;
    }
    set currentIndex(currentIndex) {
        this._currentIndex = currentIndex;
    }
    get focusInElement() {
        return this.elements[this.focusInIndex];
    }
    get direction() {
        return this._direction();
    }
    set focused(focused) {
        if (focused === this.focused)
            return;
        this._focused = focused;
        this.manageTabindexes();
    }
    get focused() {
        return this._focused;
    }
    get focusInIndex() {
        return this.calculateFocusInIndex(this.elements);
    }
    isEventWithinListenerScope(event) {
        if (this._listenerScope() === this.host)
            return true;
        return event.composedPath().includes(this._listenerScope());
    }
    focus(options) {
        var _a;
        (_a = this.elements[this.currentIndex]) === null || _a === void 0 ? void 0 : _a.focus(options);
    }
    clearElementCache() {
        delete this.cachedElements;
        cancelAnimationFrame(this.manageIndexesAnimationFrame);
        this.manageIndexesAnimationFrame =
            requestAnimationFrame(() => this.manageTabindexes());
    }
    setCurrentIndexCircularly(diff) {
        const { length } = this.elements;
        let nextIndex = (length + this.currentIndex + diff) % length;
        while (this.elements[nextIndex] &&
            !this.isFocusableElement(this.elements[nextIndex])) {
            nextIndex = (length + nextIndex + diff) % length;
        }
        this.currentIndex = nextIndex;
    }
    hostContainsFocus() {
        this.host.removeEventListener('focusin', this.handleFocusin);
        this.host.addEventListener('focusout', this.handleFocusout);
        this.host.addEventListener('keydown', this.handleKeydown);
        this.focused = true;
        const currentElement = this.elements[this.currentIndex];
        if (!currentElement)
            return;
    }
    hostNoLongerContainsFocus() {
        this.host.addEventListener('focusin', this.handleFocusin);
        this.host.removeEventListener('focusout', this.handleFocusout);
        this.host.removeEventListener('keydown', this.handleKeydown);
        this.currentIndex = this.focusInIndex;
        this.focused = false;
        const currentElement = this.elements[this.currentIndex];
        if (!currentElement)
            return;
    }
    hostContainsRelatedTarget(event) {
        var _a;
        const relatedTarget = event.relatedTarget;
        return (!this.host.contains(relatedTarget) &&
            !((_a = this.host.shadowRoot) === null || _a === void 0 ? void 0 : _a.contains(relatedTarget)));
    }
    acceptsEventCode(code) {
        if (code === 'End' || code === 'Home') {
            return true;
        }
        switch (this.direction) {
            case 'horizontal':
                return code === 'ArrowLeft' || code === 'ArrowRight';
            case 'vertical':
                return code === 'ArrowUp' || code === 'ArrowDown';
            case 'both':
            case 'grid':
                return code.startsWith('Arrow');
        }
    }
    manageTabindexes() {
        if (this.focused) {
            this.updateTabindexes(() => -1);
        }
        else {
            this.updateTabindexes((el) => {
                const containsFocusInElement = el.contains(this.focusInElement);
                if (el === this.focusInElement) {
                    return 0;
                }
                else if (containsFocusInElement) {
                    return false;
                }
                return -1;
            });
        }
    }
    updateTabindexes(getTabIndex) {
        this.elements.forEach((el) => {
            const tabIndex = getTabIndex(el);
            if (tabIndex !== false) {
                el.tabIndex = tabIndex;
            }
            else {
                el.removeAttribute('tabindex');
                const updatable = el;
                if (updatable.requestUpdate)
                    updatable.requestUpdate();
            }
        });
    }
    manage() {
        this.manageTabindexes();
        this.addEventListeners();
    }
    unmanage() {
        this.updateTabindexes(() => 0);
        this.removeEventListeners();
    }
    addEventListeners() {
        this.host.addEventListener('focusin', this.handleFocusin);
    }
    removeEventListeners() {
        this.host.removeEventListener('focusin', this.handleFocusin);
        this.host.removeEventListener('focusout', this.handleFocusout);
        this.host.removeEventListener('keydown', this.handleKeydown);
    }
    hostUpdated() {
        if (this.shouldInit) {
            this.manageTabindexes();
            this.shouldInit = false;
        }
    }
    hostConnected() {
        this.addEventListeners();
    }
    hostDisconnected() {
        this.removeEventListeners();
    }
}
//# sourceMappingURL=RovingTabindex.js.map