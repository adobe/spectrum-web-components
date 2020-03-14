HTMLDocument.prototype.querySelectorAllWithShadowDOM = function(query) {
    const isNotCustomElementParent = true;
    const children = [...(this.children || [])].filter(
        (child) => isNotCustomElementParent || !!child.assignedSlot
    );
    let results = children.filter((el) => el.matches(query));
    if (this.shadowRoot) {
        results = results.concat([
            ...(this.shadowRoot.querySelectorAllWithShadowDOM(query) || []),
        ]);
    }
    children.map((child) => {
        if (child.querySelectorAllWithShadowDOM) {
            results = results.concat([
                ...(child.querySelectorAllWithShadowDOM(query) || []),
            ]);
        }
    });
    return results;
};

HTMLElement.prototype.querySelectorAllWithShadowDOM = function(query) {
    const isNotCustomElementParent = this.tagName.search('-') === -1;
    const children = [...(this.children || [])].filter(
        (child) => isNotCustomElementParent || !!child.assignedSlot
    );
    let results = children.filter((el) => el.matches(query));
    if (this.shadowRoot) {
        results = results.concat([
            ...(this.shadowRoot.querySelectorAllWithShadowDOM(query) || []),
        ]);
    }
    children.map((child) => {
        if (child.querySelectorAllWithShadowDOM) {
            results = results.concat([
                ...(child.querySelectorAllWithShadowDOM(query) || []),
            ]);
        }
    });
    return results;
};

ShadowRoot.prototype.querySelectorAllWithShadowDOM = function(query) {
    const children = [...(this.children || [])];
    let results = children.filter((el) => el.matches(query));
    children.map((child) => {
        if (child.querySelectorAllWithShadowDOM) {
            results = results.concat([
                ...(child.querySelectorAllWithShadowDOM(query) || []),
            ]);
        }
    });
    return results;
};

export * from './dom.js';
