export class IconsetRegistry {
    constructor() {
        this.iconsetMap = new Map();
    }
    // singleton getter
    static getInstance() {
        if (!IconsetRegistry.instance) {
            IconsetRegistry.instance = new IconsetRegistry();
        }
        return IconsetRegistry.instance;
    }
    addIconset(name, iconset) {
        this.iconsetMap.set(name, iconset);
        // dispatch a sp-iconset-added event on window to let everyone know we have a new iconset
        // note we're using window here for efficiency since we don't need to bubble through the dom since everyone
        // will know where to look for this event
        const event = new CustomEvent('sp-iconset:added', {
            bubbles: true,
            composed: true,
            detail: { name, iconset },
        });
        // we're dispatching this event in the next tick to allow the iconset to finish any slotchange or other event
        // listeners caused by connection to the dom and first render to complete, this way any icons listening for
        // this iconset will be able to access the completed iconset
        setTimeout(() => window.dispatchEvent(event), 0);
    }
    removeIconset(name) {
        this.iconsetMap.delete(name);
        // dispatch a sp-iconset-removed event on window to let everyone know we have a new iconset
        // note we're using window here for efficiency since we don't need to bubble through the dom since everyone
        // will know where to look for this event
        const event = new CustomEvent('sp-iconset:removed', {
            bubbles: true,
            composed: true,
            detail: { name },
        });
        // we're dispatching this event in the next tick To keep the event model consistent with the added event
        setTimeout(() => window.dispatchEvent(event), 0);
    }
    getIconset(name) {
        return this.iconsetMap.get(name);
    }
}
//# sourceMappingURL=iconset-registry.js.map
