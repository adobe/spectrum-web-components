(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/shady-data.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class ShadyData {
  /** @override */
  toJSON() {
    return {};
  }

}
function ensureShadyDataForNode(node) {
  if (!node.__shady) {
    node.__shady = new ShadyData();
  }

  return node.__shady;
}
function shadyDataForNode(node) {
  return node && node.__shady;
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/utils.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/** @type {!Object} */

const settings = window['ShadyDOM'] || {};
settings.hasNativeShadowDOM = Boolean(Element.prototype.attachShadow && Node.prototype.getRootNode);
const desc = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild');
settings.hasDescriptors = Boolean(desc && desc.configurable && desc.get);
settings.inUse = settings['force'] || !settings.hasNativeShadowDOM;
settings.noPatch = settings['noPatch'] || false;
settings.preferPerformance = settings['preferPerformance'];
const IS_IE = navigator.userAgent.match('Trident');
settings.IS_IE = IS_IE;
const canUpgrade = () => !settings.IS_IE;
const isTrackingLogicalChildNodes = node => {
  const nodeData = shadyDataForNode(node);
  return nodeData && nodeData.firstChild !== undefined;
};
const utils_isShadyRoot = obj => {
  return Boolean(obj._localName === 'ShadyRoot');
};
const hasShadowRootWithSlot = node => {
  const nodeData = shadyDataForNode(node);
  let root = nodeData && nodeData.root;
  return root && root._hasInsertionPoint();
};
let utils_p = Element.prototype;
let matches = utils_p.matches || utils_p.matchesSelector || utils_p.mozMatchesSelector || utils_p.msMatchesSelector || utils_p.oMatchesSelector || utils_p.webkitMatchesSelector;
const matchesSelector = (element, selector) => {
  return matches.call(element, selector);
};
const mixin = (target, source) => {
  for (var i in source) {
    target[i] = source[i];
  }

  return target;
}; // NOTE, prefer MutationObserver over Promise for microtask timing
// for consistency x-platform.

let twiddle = document.createTextNode('');
let utils_content = 0;
let queue = [];
new MutationObserver(() => {
  while (queue.length) {
    // catch errors in user code...
    try {
      queue.shift()();
    } catch (e) {
      // enqueue another record and throw
      twiddle.textContent = utils_content++;
      throw e;
    }
  }
}).observe(twiddle, {
  characterData: true
}); // use MutationObserver to get microtask async timing.

const microtask = callback => {
  queue.push(callback);
  twiddle.textContent = utils_content++;
};
const hasDocumentContains = Boolean(document.contains);
const contains = (container, node) => {
  while (node) {
    if (node == container) {
      return true;
    }

    node = node[SHADY_PREFIX + 'parentNode'];
  }

  return false;
};

const getNodeHTMLCollectionName = node => node.getAttribute('id') || node.getAttribute('name');

const isValidHTMLCollectionName = name => name !== 'length' && isNaN(name);

const createPolyfilledHTMLCollection = nodes => {
  // Note: loop in reverse so that the first named item matches the named property
  for (let l = nodes.length - 1; l >= 0; l--) {
    const node = nodes[l];
    const name = getNodeHTMLCollectionName(node);

    if (name && isValidHTMLCollectionName(name)) {
      nodes[name] = node;
    }
  }

  nodes.item = function (index) {
    return nodes[index];
  };

  nodes.namedItem = function (name) {
    if (isValidHTMLCollectionName(name) && nodes[name]) {
      return nodes[name];
    }

    for (const node of nodes) {
      const nodeName = getNodeHTMLCollectionName(node);

      if (nodeName == name) {
        return node;
      }
    }

    return null;
  };

  return nodes;
};
const NATIVE_PREFIX = '__shady_native_';
const SHADY_PREFIX = '__shady_';
const nativeChildNodesArray = parent => {
  const result = [];

  for (let n = parent[NATIVE_PREFIX + 'firstChild']; n; n = n[NATIVE_PREFIX + 'nextSibling']) {
    result.push(n);
  }

  return result;
};
const childNodesArray = parent => {
  const result = [];

  for (let n = parent[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
    result.push(n);
  }

  return result;
};
/**
 * Patch a group of accessors on an object only if it exists or if the `force`
 * argument is true.
 * @param {!Object} proto
 * @param {!Object} descriptors
 * @param {string=} prefix
 * @param {Array=} disallowedPatches
 */

const patchProperties = (proto, descriptors, prefix = '', disallowedPatches) => {
  for (let p in descriptors) {
    const newDescriptor = descriptors[p];

    if (disallowedPatches && disallowedPatches.indexOf(p) >= 0) {
      continue;
    }

    newDescriptor.configurable = true;
    const name = prefix + p; // NOTE: we prefer writing directly because some browsers
    // have descriptors that are writable but not configurable (e.g.
    // `appendChild` on older browsers)

    if (newDescriptor.value) {
      proto[name] = newDescriptor.value;
    } else {
      // NOTE: this can throw if 'force' is used so catch the error.
      try {
        Object.defineProperty(proto, name, newDescriptor);
      } catch (e) {// this error is harmless so we just trap it.
      }
    }
  }
};
/** @type {!function(new:HTMLElement)} */

const NativeHTMLElement = window['customElements'] && window['customElements']['nativeHTMLElement'] || HTMLElement; // note, this is not a perfect polyfill since it doesn't include symbols

/** @return {!Object<!ObjectPropertyDescriptor>} */

const getOwnPropertyDescriptors = obj => {
  const descriptors = {};
  Object.getOwnPropertyNames(obj).forEach(name => {
    descriptors[name] = Object.getOwnPropertyDescriptor(obj, name);
  });
  return descriptors;
};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/flush.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
 // render enqueuer/flusher

let flushList = [];
let scheduled;
function enqueue(callback) {
  if (!scheduled) {
    scheduled = true;
    microtask(flush);
  }

  flushList.push(callback);
}
function flush() {
  scheduled = false;
  let didFlush = Boolean(flushList.length);

  while (flushList.length) {
    flushList.shift()();
  }

  return didFlush;
}
flush['list'] = flushList;
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/observe-changes.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



class observe_changes_AsyncObserver {
  constructor() {
    this._scheduled = false;
    this.addedNodes = [];
    this.removedNodes = [];
    this.callbacks = new Set();
  }

  schedule() {
    if (!this._scheduled) {
      this._scheduled = true;
      microtask(() => {
        this.flush();
      });
    }
  }

  flush() {
    if (this._scheduled) {
      this._scheduled = false;
      let mutations = this.takeRecords();

      if (mutations.length) {
        this.callbacks.forEach(function (cb) {
          cb(mutations);
        });
      }
    }
  }

  takeRecords() {
    if (this.addedNodes.length || this.removedNodes.length) {
      let mutations = [{
        addedNodes: this.addedNodes,
        removedNodes: this.removedNodes
      }];
      this.addedNodes = [];
      this.removedNodes = [];
      return mutations;
    }

    return [];
  }

} // TODO(sorvell): consider instead polyfilling MutationObserver
// directly so that users do not have to fork their code.
// Supporting the entire api may be challenging: e.g. filtering out
// removed nodes in the wrong scope and seeing non-distributing
// subtree child mutations.


let observeChildren = function (node, callback) {
  const sd = ensureShadyDataForNode(node);

  if (!sd.observer) {
    sd.observer = new observe_changes_AsyncObserver();
  }

  sd.observer.callbacks.add(callback);
  let observer = sd.observer;
  return {
    _callback: callback,
    _observer: observer,
    _node: node,

    takeRecords() {
      return observer.takeRecords();
    }

  };
};
let unobserveChildren = function (handle) {
  let observer = handle && handle._observer;

  if (observer) {
    observer.callbacks.delete(handle._callback);

    if (!observer.callbacks.size) {
      ensureShadyDataForNode(handle._node).observer = null;
    }
  }
};
function filterMutations(mutations, target) {
  /** @const {Node} */
  const targetRootNode = target.getRootNode();
  return mutations.map(function (mutation) {
    /** @const {boolean} */
    const mutationInScope = targetRootNode === mutation.target.getRootNode();

    if (mutationInScope && mutation.addedNodes) {
      let nodes = Array.from(mutation.addedNodes).filter(function (n) {
        return targetRootNode === n.getRootNode();
      });

      if (nodes.length) {
        mutation = Object.create(mutation);
        Object.defineProperty(mutation, 'addedNodes', {
          value: nodes,
          configurable: true
        });
        return mutation;
      }
    } else if (mutationInScope) {
      return mutation;
    }
  }).filter(function (m) {
    return m;
  });
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/innerHTML.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// Cribbed from ShadowDOM polyfill
// https://github.com/webcomponents/webcomponentsjs/blob/master/src/ShadowDOM/wrappers/HTMLElement.js#L28
/////////////////////////////////////////////////////////////////////////////
// innerHTML and outerHTML
// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
let escapeAttrRegExp = /[&\u00A0"]/g;
let escapeDataRegExp = /[&\u00A0<>]/g;

function escapeReplace(c) {
  switch (c) {
    case '&':
      return '&amp;';

    case '<':
      return '&lt;';

    case '>':
      return '&gt;';

    case '"':
      return '&quot;';

    case '\u00A0':
      return '&nbsp;';
  }
}

function escapeAttr(s) {
  return s.replace(escapeAttrRegExp, escapeReplace);
}

function escapeData(s) {
  return s.replace(escapeDataRegExp, escapeReplace);
}

function makeSet(arr) {
  let set = {};

  for (let i = 0; i < arr.length; i++) {
    set[arr[i]] = true;
  }

  return set;
} // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


let voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
let plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);
/**
 * @param {Node} node
 * @param {Node} parentNode
 * @param {Function=} callback
 */

function getOuterHTML(node, parentNode, callback) {
  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      {
        let tagName = node.localName;
        let s = '<' + tagName;
        let attrs = node.attributes;

        for (let i = 0, attr; attr = attrs[i]; i++) {
          s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
        }

        s += '>';

        if (voidElements[tagName]) {
          return s;
        }

        return s + getInnerHTML(node, callback) + '</' + tagName + '>';
      }

    case Node.TEXT_NODE:
      {
        let data =
        /** @type {Text} */
        node.data;

        if (parentNode && plaintextParents[parentNode.localName]) {
          return data;
        }

        return escapeData(data);
      }

    case Node.COMMENT_NODE:
      {
        return '<!--' +
        /** @type {Comment} */
        node.data + '-->';
      }

    default:
      {
        window.console.error(node);
        throw new Error('not implemented');
      }
  }
}
/**
 * @param {Node} node
 * @param {Function=} callback
 */

function getInnerHTML(node, callback) {
  if (node.localName === 'template') {
    node =
    /** @type {HTMLTemplateElement} */
    node.content;
  }

  let s = '';
  let c$ = callback ? callback(node) : node.childNodes;

  for (let i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
    s += getOuterHTML(child, node, callback);
  }

  return s;
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patch-native.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



const hasDescriptors = settings.hasDescriptors;
const patch_native_NATIVE_PREFIX = NATIVE_PREFIX; // Object on which raw native methods are stored.
// e.g. `nativeMethods.querySelector.call(node, selector)`
// same as `node.querySelector(selector)`

const nativeMethods = {
  /** @this {Element} */
  querySelector(selector) {
    return this[patch_native_NATIVE_PREFIX + 'querySelector'](selector);
  },

  /** @this {Element} */
  querySelectorAll(selector) {
    return this[patch_native_NATIVE_PREFIX + 'querySelectorAll'](selector);
  }

}; // Object on which raw native accessors are available via `accessorName(node)`.
// e.g. `nativeTree.firstChild(node)`
// same as `node.firstChild`

const nativeTree = {};

const installNativeAccessor = name => {
  nativeTree[name] = node => node[patch_native_NATIVE_PREFIX + name];
};

const installNativeMethod = (name, fn) => {
  if (!nativeMethods[name]) {
    nativeMethods[name] = fn;
  }
};

const defineNativeAccessors = (proto, descriptors) => {
  patchProperties(proto, descriptors, patch_native_NATIVE_PREFIX); // make native accessors available to users

  for (let prop in descriptors) {
    installNativeAccessor(prop);
  }
};

const copyProperties = (proto, list = []) => {
  for (let i = 0; i < list.length; i++) {
    const name = list[i];
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);

    if (descriptor) {
      Object.defineProperty(proto, patch_native_NATIVE_PREFIX + name, descriptor); // make native methods/accessors available to users

      if (descriptor.value) {
        installNativeMethod(name, descriptor.value);
      } else {
        installNativeAccessor(name);
      }
    }
  }
};
/** @type {!TreeWalker} */


const nodeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
/** @type {!TreeWalker} */

const elementWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, false);
/** @type {!Document} */

const inertDoc = document.implementation.createHTMLDocument('inert');

const clearNode = node => {
  let firstChild;

  while (firstChild = node[patch_native_NATIVE_PREFIX + 'firstChild']) {
    node[patch_native_NATIVE_PREFIX + 'removeChild'](firstChild);
  }
};

const ParentNodeAccessors = ['firstElementChild', 'lastElementChild', 'children', 'childElementCount'];
const ParentNodeMethods = ['querySelector', 'querySelectorAll' // 'append', 'prepend'
];
const addNativePrefixedProperties = () => {
  // EventTarget
  const eventProps = ['dispatchEvent', 'addEventListener', 'removeEventListener'];

  if (window.EventTarget) {
    copyProperties(window.EventTarget.prototype, eventProps);
  } else {
    copyProperties(Node.prototype, eventProps);
    copyProperties(Window.prototype, eventProps);
  } // Node


  if (hasDescriptors) {
    copyProperties(Node.prototype, ['parentNode', 'firstChild', 'lastChild', 'previousSibling', 'nextSibling', 'childNodes', 'parentElement', 'textContent']);
  } else {
    defineNativeAccessors(Node.prototype, {
      parentNode: {
        /** @this {Node} */
        get() {
          nodeWalker.currentNode = this;
          return nodeWalker.parentNode();
        }

      },
      firstChild: {
        /** @this {Node} */
        get() {
          nodeWalker.currentNode = this;
          return nodeWalker.firstChild();
        }

      },
      lastChild: {
        /** @this {Node} */
        get() {
          nodeWalker.currentNode = this;
          return nodeWalker.lastChild();
        }

      },
      previousSibling: {
        /** @this {Node} */
        get() {
          nodeWalker.currentNode = this;
          return nodeWalker.previousSibling();
        }

      },
      nextSibling: {
        /** @this {Node} */
        get() {
          nodeWalker.currentNode = this;
          return nodeWalker.nextSibling();
        }

      },
      // TODO(sorvell): make this a NodeList or whatever
      childNodes: {
        /** @this {Node} */
        get() {
          const nodes = [];
          nodeWalker.currentNode = this;
          let n = nodeWalker.firstChild();

          while (n) {
            nodes.push(n);
            n = nodeWalker.nextSibling();
          }

          return nodes;
        }

      },
      parentElement: {
        /** @this {Node} */
        get() {
          elementWalker.currentNode = this;
          return elementWalker.parentNode();
        }

      },
      textContent: {
        /** @this {Node} */
        get() {
          /* eslint-disable no-case-declarations */
          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              // TODO(sorvell): This cannot be a single TreeWalker that's reused
              // at least for Safari 9, but it's unclear why.
              const textWalker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, false);
              let content = '',
                  n;

              while (n = textWalker.nextNode()) {
                // TODO(sorvell): can't use textContent since we patch it on Node.prototype!
                // However, should probably patch it only on element.
                content += n.nodeValue;
              }

              return content;

            default:
              return this.nodeValue;
          }
        },

        // Needed on browsers that do not proper accessors (e.g. old versions of Chrome)

        /** @this {Node} */
        set(value) {
          if (typeof value === 'undefined' || value === null) {
            value = '';
          }

          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              clearNode(this); // Document fragments must have no childnodes if setting a blank string

              if (value.length > 0 || this.nodeType === Node.ELEMENT_NODE) {
                // Note: old Chrome versions require 2nd argument here
                this[patch_native_NATIVE_PREFIX + 'insertBefore'](document.createTextNode(value), undefined);
              }

              break;

            default:
              // TODO(sorvell): can't do this if patch nodeValue.
              this.nodeValue = value;
              break;
          }
        }

      }
    });
  }

  copyProperties(Node.prototype, ['appendChild', 'insertBefore', 'removeChild', 'replaceChild', 'cloneNode', 'contains']); // NOTE, on some browsers IE 11 / Edge 15 some properties are incorrectly on HTMLElement

  copyProperties(HTMLElement.prototype, ['parentElement', 'contains']);
  const ParentNodeWalkerDescriptors = {
    firstElementChild: {
      /** @this {ParentNode} */
      get() {
        elementWalker.currentNode = this;
        return elementWalker.firstChild();
      }

    },
    lastElementChild: {
      /** @this {ParentNode} */
      get() {
        elementWalker.currentNode = this;
        return elementWalker.lastChild();
      }

    },
    children: {
      /** @this {ParentNode} */
      get() {
        let nodes = [];
        elementWalker.currentNode = this;
        let n = elementWalker.firstChild();

        while (n) {
          nodes.push(n);
          n = elementWalker.nextSibling();
        }

        return createPolyfilledHTMLCollection(nodes);
      }

    },
    childElementCount: {
      /** @this {ParentNode} */
      get() {
        if (this.children) {
          return this.children.length;
        }

        return 0;
      }

    }
  }; // Element

  if (hasDescriptors) {
    copyProperties(Element.prototype, ParentNodeAccessors);
    copyProperties(Element.prototype, ['previousElementSibling', 'nextElementSibling', 'innerHTML', 'className']); // NOTE, on some browsers IE 11 / Edge 15 some properties are incorrectly on HTMLElement

    copyProperties(HTMLElement.prototype, ['children', 'innerHTML', 'className']);
  } else {
    defineNativeAccessors(Element.prototype, ParentNodeWalkerDescriptors);
    defineNativeAccessors(Element.prototype, {
      previousElementSibling: {
        /** @this {Element} */
        get() {
          elementWalker.currentNode = this;
          return elementWalker.previousSibling();
        }

      },
      nextElementSibling: {
        /** @this {Element} */
        get() {
          elementWalker.currentNode = this;
          return elementWalker.nextSibling();
        }

      },
      innerHTML: {
        /** @this {Element} */
        get() {
          return getInnerHTML(this, nativeChildNodesArray);
        },

        // Needed on browsers that do not proper accessors (e.g. old versions of Chrome)

        /** @this {Element} */
        set(value) {
          const content = this.localName === 'template' ?
          /** @type {HTMLTemplateElement} */
          this.content : this;
          clearNode(content);
          const containerName = this.localName || 'div';
          let htmlContainer;

          if (!this.namespaceURI || this.namespaceURI === inertDoc.namespaceURI) {
            htmlContainer = inertDoc.createElement(containerName);
          } else {
            htmlContainer = inertDoc.createElementNS(this.namespaceURI, containerName);
          }

          htmlContainer.innerHTML = value;
          const newContent = this.localName === 'template' ?
          /** @type {HTMLTemplateElement} */
          htmlContainer.content : htmlContainer;
          let firstChild;

          while (firstChild = newContent[patch_native_NATIVE_PREFIX + 'firstChild']) {
            // Note: old Chrome versions require 2nd argument here
            content[patch_native_NATIVE_PREFIX + 'insertBefore'](firstChild, undefined);
          }
        }

      },
      className: {
        /** @this {Element} */
        get() {
          return this.getAttribute('class') || '';
        },

        /** @this {Element} */
        set(value) {
          this.setAttribute('class', value);
        }

      }
    });
  }

  copyProperties(Element.prototype, ['setAttribute', 'getAttribute', 'hasAttribute', 'removeAttribute', // on older Safari, these are on Element.
  'focus', 'blur']);
  copyProperties(Element.prototype, ParentNodeMethods); // HTMLElement

  copyProperties(HTMLElement.prototype, ['focus', 'blur']); // HTMLTemplateElement

  if (window.HTMLTemplateElement) {
    copyProperties(window.HTMLTemplateElement.prototype, ['innerHTML']);
  } // DocumentFragment


  if (hasDescriptors) {
    // NOTE, IE 11 does not have on DocumentFragment
    // firstElementChild
    // lastElementChild
    copyProperties(DocumentFragment.prototype, ParentNodeAccessors);
  } else {
    defineNativeAccessors(DocumentFragment.prototype, ParentNodeWalkerDescriptors);
  }

  copyProperties(DocumentFragment.prototype, ParentNodeMethods); // Document

  if (hasDescriptors) {
    copyProperties(Document.prototype, ParentNodeAccessors);
    copyProperties(Document.prototype, ['activeElement']);
  } else {
    defineNativeAccessors(Document.prototype, ParentNodeWalkerDescriptors);
  }

  copyProperties(Document.prototype, ['importNode', 'getElementById']);
  copyProperties(Document.prototype, ParentNodeMethods);
};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patch-instances.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


const InsideDescriptors = getOwnPropertyDescriptors({
  /** @this {Node} */
  get childNodes() {
    return this[SHADY_PREFIX + 'childNodes'];
  },

  /** @this {Node} */
  get firstChild() {
    return this[SHADY_PREFIX + 'firstChild'];
  },

  /** @this {Node} */
  get lastChild() {
    return this[SHADY_PREFIX + 'lastChild'];
  },

  /** @this {Node} */
  get childElementCount() {
    return this[SHADY_PREFIX + 'childElementCount'];
  },

  /** @this {Node} */
  get children() {
    return this[SHADY_PREFIX + 'children'];
  },

  /** @this {Node} */
  get firstElementChild() {
    return this[SHADY_PREFIX + 'firstElementChild'];
  },

  /** @this {Node} */
  get lastElementChild() {
    return this[SHADY_PREFIX + 'lastElementChild'];
  },

  /** @this {Node} */
  get shadowRoot() {
    return this[SHADY_PREFIX + 'shadowRoot'];
  }

});
const TextContentInnerHTMLDescriptors = getOwnPropertyDescriptors({
  /** @this {Node} */
  get textContent() {
    return this[SHADY_PREFIX + 'textContent'];
  },

  /** @this {Node} */
  set textContent(value) {
    this[SHADY_PREFIX + 'textContent'] = value;
  },

  /** @this {Node} */
  get innerHTML() {
    return this[SHADY_PREFIX + 'innerHTML'];
  },

  /** @this {Node} */
  set innerHTML(value) {
    return this[SHADY_PREFIX + 'innerHTML'] = value;
  }

});
const OutsideDescriptors = getOwnPropertyDescriptors({
  /** @this {Node} */
  get parentElement() {
    return this[SHADY_PREFIX + 'parentElement'];
  },

  /** @this {Node} */
  get parentNode() {
    return this[SHADY_PREFIX + 'parentNode'];
  },

  /** @this {Node} */
  get nextSibling() {
    return this[SHADY_PREFIX + 'nextSibling'];
  },

  /** @this {Node} */
  get previousSibling() {
    return this[SHADY_PREFIX + 'previousSibling'];
  },

  /** @this {Node} */
  get nextElementSibling() {
    return this[SHADY_PREFIX + 'nextElementSibling'];
  },

  /** @this {Node} */
  get previousElementSibling() {
    return this[SHADY_PREFIX + 'previousElementSibling'];
  },

  /** @this {Node} */
  get className() {
    return this[SHADY_PREFIX + 'className'];
  },

  /** @this {Node} */
  set className(value) {
    return this[SHADY_PREFIX + 'className'] = value;
  }

});

for (let prop in InsideDescriptors) {
  InsideDescriptors[prop].enumerable = false;
}

for (let prop in TextContentInnerHTMLDescriptors) {
  TextContentInnerHTMLDescriptors[prop].enumerable = false;
}

for (let prop in OutsideDescriptors) {
  OutsideDescriptors[prop].enumerable = false;
}

const noInstancePatching = settings.hasDescriptors || settings.noPatch; // ensure an element has patched "outside" accessors; no-op when not needed

let patchOutsideElementAccessors = noInstancePatching ? function () {} : function (element) {
  const sd = ensureShadyDataForNode(element);

  if (!sd.__outsideAccessors) {
    sd.__outsideAccessors = true;
    patchProperties(element, OutsideDescriptors);
  }
}; // ensure an element has patched "inside" accessors; no-op when not needed

let patchInsideElementAccessors = noInstancePatching ? function () {} : function (element) {
  const sd = ensureShadyDataForNode(element);

  if (!sd.__insideAccessors) {
    sd.__insideAccessors = true;
    patchProperties(element, InsideDescriptors); // NOTE: There are compatibility issues with patches for `textContent`
    // and `innerHTML` between CE and SD. Since SD patches are applied
    // via `ShadyDOM.patch` and CE patches are applied as the tree is walked,
    // SD patches overwrite CE patches.
    // * When SD is in patching mode, SD calls through to native
    // methods not patched by CE (since SD is at the bottom) and CE does not
    // upgrade, connect, or disconnect elements. Therefore do *not patch*
    // these accessors in this case.
    // * When SD is in `noPatch` mode, the SD patches call through to
    // "native" methods that are patched by CE (since CE is at the bottom).
    // Therefore continue to patch in this case.
    // If customElements is not loaded, then these accessors should be
    // patched so they work correctly.

    if (!window['customElements'] || settings.noPatch) {
      patchProperties(element, TextContentInnerHTMLDescriptors);
    }
  }
};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patch-events.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


/*
Make this name unique so it is unlikely to conflict with properties on objects passed to `addEventListener`
https://github.com/webcomponents/shadydom/issues/173
*/

const
/** string */
eventWrappersName = `__eventWrappers${Date.now()}`;
/** @type {?function(!Event): boolean} */

const composedGetter = (() => {
  const composedProp = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');
  return composedProp ? ev => composedProp.get.call(ev) : null;
})();

const supportsEventOptions = (() => {
  let supported = false;
  let eventOptions = {
    get capture() {
      supported = true;
    }

  };

  const listener = () => {}; // NOTE: These will be unpatched at this point.


  window.addEventListener('test', listener, eventOptions);
  window.removeEventListener('test', listener, eventOptions);
  return supported;
})();

const parseEventOptions = optionsOrCapture => {
  let capture, once, passive, shadyTarget;

  if (optionsOrCapture && typeof optionsOrCapture === 'object') {
    capture = Boolean(optionsOrCapture.capture);
    once = Boolean(optionsOrCapture.once);
    passive = Boolean(optionsOrCapture.passive);
    shadyTarget = optionsOrCapture.__shadyTarget;
  } else {
    capture = Boolean(optionsOrCapture);
    once = false;
    passive = false;
  }

  return {
    shadyTarget,
    capture,
    once,
    passive,
    nativeEventOptions: supportsEventOptions ? optionsOrCapture : capture
  };
}; // https://github.com/w3c/webcomponents/issues/513#issuecomment-224183937


const alwaysComposed = {
  'blur': true,
  'focus': true,
  'focusin': true,
  'focusout': true,
  'click': true,
  'dblclick': true,
  'mousedown': true,
  'mouseenter': true,
  'mouseleave': true,
  'mousemove': true,
  'mouseout': true,
  'mouseover': true,
  'mouseup': true,
  'wheel': true,
  'beforeinput': true,
  'input': true,
  'keydown': true,
  'keyup': true,
  'compositionstart': true,
  'compositionupdate': true,
  'compositionend': true,
  'touchstart': true,
  'touchend': true,
  'touchmove': true,
  'touchcancel': true,
  'pointerover': true,
  'pointerenter': true,
  'pointerdown': true,
  'pointermove': true,
  'pointerup': true,
  'pointercancel': true,
  'pointerout': true,
  'pointerleave': true,
  'gotpointercapture': true,
  'lostpointercapture': true,
  'dragstart': true,
  'drag': true,
  'dragenter': true,
  'dragleave': true,
  'dragover': true,
  'drop': true,
  'dragend': true,
  'DOMActivate': true,
  'DOMFocusIn': true,
  'DOMFocusOut': true,
  'keypress': true
};
const unpatchedEvents = {
  'DOMAttrModified': true,
  'DOMAttributeNameChanged': true,
  'DOMCharacterDataModified': true,
  'DOMElementNameChanged': true,
  'DOMNodeInserted': true,
  'DOMNodeInsertedIntoDocument': true,
  'DOMNodeRemoved': true,
  'DOMNodeRemovedFromDocument': true,
  'DOMSubtreeModified': true
  /**
   * Some EventTarget subclasses are not Node subclasses, and you cannot call
   * `getRootNode()` on them.
   *
   * @param {!(Node|EventTarget)} eventTarget
   * @return {!(Node|EventTarget)}
   */

};

function getRootNodeWithFallback(eventTarget) {
  if (eventTarget instanceof Node) {
    return eventTarget[SHADY_PREFIX + 'getRootNode']();
  } else {
    return eventTarget;
  }
}

function pathComposer(startNode, composed) {
  let composedPath = [];
  let current = startNode;
  let startRoot = getRootNodeWithFallback(startNode);

  while (current) {
    composedPath.push(current);

    if (current[SHADY_PREFIX + 'assignedSlot']) {
      current = current[SHADY_PREFIX + 'assignedSlot'];
    } else if (current.nodeType === Node.DOCUMENT_FRAGMENT_NODE && current.host && (composed || current !== startRoot)) {
      current = current.host;
    } else {
      current = current[SHADY_PREFIX + 'parentNode'];
    }
  } // event composedPath includes window when startNode's ownerRoot is document


  if (composedPath[composedPath.length - 1] === document) {
    composedPath.push(window);
  }

  return composedPath;
}

const patch_events_composedPath = event => {
  if (!event.__composedPath) {
    event.__composedPath = pathComposer(event.target, true);
  }

  return event.__composedPath;
};

function retarget(refNode, path) {
  if (!utils_isShadyRoot) {
    return refNode;
  } // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
  // shadow-including inclusive ancestor, return ANCESTOR.


  let refNodePath = pathComposer(refNode, true);
  let p$ = path;

  for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
    ancestor = p$[i];
    root = getRootNodeWithFallback(ancestor);

    if (root !== lastRoot) {
      rootIdx = refNodePath.indexOf(root);
      lastRoot = root;
    }

    if (!utils_isShadyRoot(root) || rootIdx > -1) {
      return ancestor;
    }
  }
}

let EventPatches = {
  /**
   * @this {Event}
   */
  get composed() {
    if (this.__composed === undefined) {
      // if there's an original `composed` getter on the Event prototype, use that
      if (composedGetter) {
        // TODO(web-padawan): see https://github.com/webcomponents/shadydom/issues/275
        this.__composed = this.type === 'focusin' || this.type === 'focusout' || composedGetter(this); // If the event is trusted, or `isTrusted` is not supported, check the list of always composed events
      } else if (this.isTrusted !== false) {
        this.__composed = alwaysComposed[this.type];
      }
    }

    return (
      /** @type {!Event} */
      this.__composed || false
    );
  },

  /**
   * @this {Event}
   */
  composedPath() {
    if (!this.__composedPath) {
      this.__composedPath = pathComposer(this['__target'], this.composed);
    }

    return (
      /** @type {!Event} */
      this.__composedPath
    );
  },

  /**
   * @this {Event}
   */
  get target() {
    return retarget(this.currentTarget || this['__previousCurrentTarget'], this.composedPath());
  },

  // http://w3c.github.io/webcomponents/spec/shadow/#event-relatedtarget-retargeting

  /**
   * @this {Event}
   */
  get relatedTarget() {
    if (!this.__relatedTarget) {
      return null;
    }

    if (!this.__relatedTargetComposedPath) {
      this.__relatedTargetComposedPath = pathComposer(this.__relatedTarget, true);
    } // find the deepest node in relatedTarget composed path that is in the same root with the currentTarget


    return retarget(this.currentTarget || this['__previousCurrentTarget'],
    /** @type {!Event} */
    this.__relatedTargetComposedPath);
  },

  /**
   * @this {Event}
   */
  stopPropagation() {
    Event.prototype.stopPropagation.call(this);
    this.__propagationStopped = true;
  },

  /**
   * @this {Event}
   */
  stopImmediatePropagation() {
    Event.prototype.stopImmediatePropagation.call(this);
    this.__immediatePropagationStopped = true;
    this.__propagationStopped = true;
  }

};

function mixinComposedFlag(Base) {
  // NOTE: avoiding use of `class` here so that transpiled output does not
  // try to do `Base.call` with a dom construtor.
  let klazz = function (type, options) {
    let event = new Base(type, options);
    event.__composed = options && Boolean(options['composed']);
    return event;
  }; // put constructor properties on subclass


  klazz.__proto__ = Base;
  klazz.prototype = Base.prototype;
  return klazz;
}

let nonBubblingEventsToRetarget = {
  'focus': true,
  'blur': true
};
/**
 * Check if the event has been retargeted by comparing original `target`, and calculated `target`
 * @param {Event} event
 * @return {boolean} True if the original target and calculated target are the same
 */

function hasRetargeted(event) {
  return event['__target'] !== event.target || event.__relatedTarget !== event.relatedTarget;
}
/**
 *
 * @param {Event} event
 * @param {Node} node
 * @param {string} phase
 */


function fireHandlers(event, node, phase) {
  let hs = node.__handlers && node.__handlers[event.type] && node.__handlers[event.type][phase];

  if (hs) {
    for (let i = 0, fn; fn = hs[i]; i++) {
      if (hasRetargeted(event) && event.target === event.relatedTarget) {
        return;
      }

      fn.call(node, event);

      if (event.__immediatePropagationStopped) {
        return;
      }
    }
  }
}

function retargetNonBubblingEvent(e) {
  let path = e.composedPath();
  let node; // override `currentTarget` to let patched `target` calculate correctly

  Object.defineProperty(e, 'currentTarget', {
    get: function () {
      return node;
    },
    configurable: true
  });

  for (let i = path.length - 1; i >= 0; i--) {
    node = path[i]; // capture phase fires all capture handlers

    fireHandlers(e, node, 'capture');

    if (e.__propagationStopped) {
      return;
    }
  } // set the event phase to `AT_TARGET` as in spec


  Object.defineProperty(e, 'eventPhase', {
    get() {
      return Event.AT_TARGET;
    }

  }); // the event only needs to be fired when owner roots change when iterating the event path
  // keep track of the last seen owner root

  let lastFiredRoot;

  for (let i = 0; i < path.length; i++) {
    node = path[i];
    const nodeData = shadyDataForNode(node);
    const root = nodeData && nodeData.root;

    if (i === 0 || root && root === lastFiredRoot) {
      fireHandlers(e, node, 'bubble'); // don't bother with window, it doesn't have `getRootNode` and will be last in the path anyway

      if (node !== window) {
        lastFiredRoot = node[SHADY_PREFIX + 'getRootNode']();
      }

      if (e.__propagationStopped) {
        return;
      }
    }
  }
}

function listenerSettingsEqual(savedListener, node, type, capture, once, passive) {
  let {
    node: savedNode,
    type: savedType,
    capture: savedCapture,
    once: savedOnce,
    passive: savedPassive
  } = savedListener;
  return node === savedNode && type === savedType && capture === savedCapture && once === savedOnce && passive === savedPassive;
}

function findListener(wrappers, node, type, capture, once, passive) {
  for (let i = 0; i < wrappers.length; i++) {
    if (listenerSettingsEqual(wrappers[i], node, type, capture, once, passive)) {
      return i;
    }
  }

  return -1;
}
/**
 * Firefox can throw on accessing eventWrappers inside of `removeEventListener` during a selenium run
 * Try/Catch accessing eventWrappers to work around
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1353074
 */

function getEventWrappers(eventLike) {
  let wrappers = null;

  try {
    wrappers = eventLike[eventWrappersName];
  } catch (e) {} // eslint-disable-line no-empty


  return wrappers;
}

function targetNeedsPathCheck(node) {
  return utils_isShadyRoot(node) || node.localName === 'slot';
}
/**
 * @this {EventTarget}
 */


function addEventListener(type, fnOrObj, optionsOrCapture) {
  const {
    capture,
    once,
    passive,
    shadyTarget,
    nativeEventOptions
  } = parseEventOptions(optionsOrCapture);

  if (!fnOrObj) {
    return;
  }

  const handlerType = typeof fnOrObj; // bail if `fnOrObj` is not a function, not an object

  if (handlerType !== 'function' && handlerType !== 'object') {
    return;
  } // bail if `fnOrObj` is an object without a `handleEvent` method


  if (handlerType === 'object' && (!fnOrObj.handleEvent || typeof fnOrObj.handleEvent !== 'function')) {
    return;
  }

  if (unpatchedEvents[type]) {
    return this[NATIVE_PREFIX + 'addEventListener'](type, fnOrObj, nativeEventOptions);
  } // hack to let ShadyRoots have event listeners
  // event listener will be on host, but `currentTarget`
  // will be set to shadyroot for event listener


  let target = shadyTarget || this;
  let wrappers = fnOrObj[eventWrappersName];

  if (wrappers) {
    // The callback `fn` might be used for multiple nodes/events. Since we generate
    // a wrapper function, we need to keep track of it when we remove the listener.
    // It's more efficient to store the node/type/options information as Array in
    // `fn` itself rather than the node (we assume that the same callback is used
    // for few nodes at most, whereas a node will likely have many event listeners).
    // NOTE(valdrin) invoking external functions is costly, inline has better perf.
    // Stop if the wrapper function has already been created.
    if (findListener(wrappers, target, type, capture, once, passive) > -1) {
      return;
    }
  } else {
    fnOrObj[eventWrappersName] = [];
  }
  /**
   * @this {HTMLElement}
   * @param {Event} e
   */


  const wrapperFn = function (e) {
    // Support `once` option.
    if (once) {
      this[SHADY_PREFIX + 'removeEventListener'](type, fnOrObj, optionsOrCapture);
    }

    if (!e['__target']) {
      patchEvent(e);
    }

    let lastCurrentTargetDesc;

    if (target !== this) {
      // replace `currentTarget` to make `target` and `relatedTarget` correct for inside the shadowroot
      lastCurrentTargetDesc = Object.getOwnPropertyDescriptor(e, 'currentTarget');
      Object.defineProperty(e, 'currentTarget', {
        get() {
          return target;
        },

        configurable: true
      });
    }

    e['__previousCurrentTarget'] = e['currentTarget']; // Always check if a shadowRoot or slot is in the current event path.
    // If it is not, the event was generated on either the host of the shadowRoot
    // or a children of the host.

    if (targetNeedsPathCheck(target) && e.composedPath().indexOf(target) == -1) {
      return;
    } // There are two critera that should stop events from firing on this node
    // 1. the event is not composed and the current node is not in the same root as the target
    // 2. when bubbling, if after retargeting, relatedTarget and target point to the same node


    if (e.composed || e.composedPath().indexOf(target) > -1) {
      if (hasRetargeted(e) && e.target === e.relatedTarget) {
        if (e.eventPhase === Event.BUBBLING_PHASE) {
          e.stopImmediatePropagation();
        }

        return;
      } // prevent non-bubbling events from triggering bubbling handlers on shadowroot, but only if not in capture phase


      if (e.eventPhase !== Event.CAPTURING_PHASE && !e.bubbles && e.target !== target && !(target instanceof Window)) {
        return;
      }

      let ret = handlerType === 'function' ? fnOrObj.call(target, e) : fnOrObj.handleEvent && fnOrObj.handleEvent(e);

      if (target !== this) {
        // replace the "correct" `currentTarget`
        if (lastCurrentTargetDesc) {
          Object.defineProperty(e, 'currentTarget', lastCurrentTargetDesc);
          lastCurrentTargetDesc = null;
        } else {
          delete e['currentTarget'];
        }
      }

      return ret;
    }
  }; // Store the wrapper information.


  fnOrObj[eventWrappersName].push({
    // note: use target here which is either a shadowRoot
    // (when the host element is proxy'ing the event) or this element
    node: target,
    type: type,
    capture: capture,
    once: once,
    passive: passive,
    wrapperFn: wrapperFn
  });

  if (nonBubblingEventsToRetarget[type]) {
    this.__handlers = this.__handlers || {};
    this.__handlers[type] = this.__handlers[type] || {
      'capture': [],
      'bubble': []
    };

    this.__handlers[type][capture ? 'capture' : 'bubble'].push(wrapperFn);
  } else {
    this[NATIVE_PREFIX + 'addEventListener'](type, wrapperFn, nativeEventOptions);
  }
}
/**
 * @this {EventTarget}
 */

function removeEventListener(type, fnOrObj, optionsOrCapture) {
  if (!fnOrObj) {
    return;
  }

  const {
    capture,
    once,
    passive,
    shadyTarget,
    nativeEventOptions
  } = parseEventOptions(optionsOrCapture);

  if (unpatchedEvents[type]) {
    return this[NATIVE_PREFIX + 'removeEventListener'](type, fnOrObj, nativeEventOptions);
  }

  let target = shadyTarget || this; // Search the wrapped function.

  let wrapperFn = undefined;
  let wrappers = getEventWrappers(fnOrObj);

  if (wrappers) {
    let idx = findListener(wrappers, target, type, capture, once, passive);

    if (idx > -1) {
      wrapperFn = wrappers.splice(idx, 1)[0].wrapperFn; // Cleanup.

      if (!wrappers.length) {
        fnOrObj[eventWrappersName] = undefined;
      }
    }
  }

  this[NATIVE_PREFIX + 'removeEventListener'](type, wrapperFn || fnOrObj, nativeEventOptions);

  if (wrapperFn && nonBubblingEventsToRetarget[type] && this.__handlers && this.__handlers[type]) {
    const arr = this.__handlers[type][capture ? 'capture' : 'bubble'];
    const idx = arr.indexOf(wrapperFn);

    if (idx > -1) {
      arr.splice(idx, 1);
    }
  }
}

function activateFocusEventOverrides() {
  for (let ev in nonBubblingEventsToRetarget) {
    window[NATIVE_PREFIX + 'addEventListener'](ev, function (e) {
      if (!e['__target']) {
        patchEvent(e);
        retargetNonBubblingEvent(e);
      }
    }, true);
  }
}

const EventPatchesDescriptors = getOwnPropertyDescriptors(EventPatches);
const SHADY_PROTO = '__shady_patchedProto';
const SHADY_SOURCE_PROTO = '__shady_sourceProto';

function patchEvent(event) {
  event['__target'] = event.target;
  event.__relatedTarget = event.relatedTarget; // attempt to patch prototype (via cache)

  if (settings.hasDescriptors) {
    const proto = Object.getPrototypeOf(event);

    if (!Object.hasOwnProperty(proto, SHADY_PROTO)) {
      const patchedProto = Object.create(proto);
      patchedProto[SHADY_SOURCE_PROTO] = proto;
      patchProperties(patchedProto, EventPatchesDescriptors);
      proto[SHADY_PROTO] = patchedProto;
    }

    event.__proto__ = proto[SHADY_PROTO]; // and fallback to patching instance
  } else {
    patchProperties(event, EventPatchesDescriptors);
  }
}

let PatchedEvent = mixinComposedFlag(Event);
let PatchedCustomEvent = mixinComposedFlag(CustomEvent);
let PatchedMouseEvent = mixinComposedFlag(MouseEvent);
function patchEvents() {
  activateFocusEventOverrides();
  window.Event = PatchedEvent;
  window.CustomEvent = PatchedCustomEvent;
  window.MouseEvent = PatchedMouseEvent;
}
function patchClick() {
  // Fix up `Element.prototype.click()` if `isTrusted` is supported, but `composed` isn't
  if (!composedGetter && Object.getOwnPropertyDescriptor(Event.prototype, 'isTrusted')) {
    /** @this {Element} */
    const composedClickFn = function () {
      const ev = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true
      });
      this[SHADY_PREFIX + 'dispatchEvent'](ev);
    };

    if (Element.prototype.click) {
      Element.prototype.click = composedClickFn;
    } else if (HTMLElement.prototype.click) {
      HTMLElement.prototype.click = composedClickFn;
    }
  }
}
const eventPropertyNames = Object.getOwnPropertyNames(Document.prototype).filter(name => name.substring(0, 2) === 'on');
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/array-splice.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function newSplice(index, removed, addedCount) {
  return {
    index: index,
    removed: removed,
    addedCount: addedCount
  };
}

const EDIT_LEAVE = 0;
const EDIT_UPDATE = 1;
const EDIT_ADD = 2;
const EDIT_DELETE = 3; // Note: This function is *based* on the computation of the Levenshtein
// "edit" distance. The one change is that "updates" are treated as two
// edits - not one. With Array splices, an update is really a delete
// followed by an add. By retaining this, we optimize for "keeping" the
// maximum array items in the original array. For example:
//
//   'xxxx123' -> '123yyyy'
//
// With 1-edit updates, the shortest path would be just to update all seven
// characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
// leaves the substring '123' intact.

function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
  // "Deletion" columns
  let rowCount = oldEnd - oldStart + 1;
  let columnCount = currentEnd - currentStart + 1;
  let distances = new Array(rowCount); // "Addition" rows. Initialize null column.

  for (let i = 0; i < rowCount; i++) {
    distances[i] = new Array(columnCount);
    distances[i][0] = i;
  } // Initialize null row


  for (let j = 0; j < columnCount; j++) distances[0][j] = j;

  for (let i = 1; i < rowCount; i++) {
    for (let j = 1; j < columnCount; j++) {
      if (equals(current[currentStart + j - 1], old[oldStart + i - 1])) distances[i][j] = distances[i - 1][j - 1];else {
        let north = distances[i - 1][j] + 1;
        let west = distances[i][j - 1] + 1;
        distances[i][j] = north < west ? north : west;
      }
    }
  }

  return distances;
} // This starts at the final weight, and walks "backward" by finding
// the minimum previous weight recursively until the origin of the weight
// matrix.


function spliceOperationsFromEditDistances(distances) {
  let i = distances.length - 1;
  let j = distances[0].length - 1;
  let current = distances[i][j];
  let edits = [];

  while (i > 0 || j > 0) {
    if (i == 0) {
      edits.push(EDIT_ADD);
      j--;
      continue;
    }

    if (j == 0) {
      edits.push(EDIT_DELETE);
      i--;
      continue;
    }

    let northWest = distances[i - 1][j - 1];
    let west = distances[i - 1][j];
    let north = distances[i][j - 1];
    let min;
    if (west < north) min = west < northWest ? west : northWest;else min = north < northWest ? north : northWest;

    if (min == northWest) {
      if (northWest == current) {
        edits.push(EDIT_LEAVE);
      } else {
        edits.push(EDIT_UPDATE);
        current = northWest;
      }

      i--;
      j--;
    } else if (min == west) {
      edits.push(EDIT_DELETE);
      i--;
      current = west;
    } else {
      edits.push(EDIT_ADD);
      j--;
      current = north;
    }
  }

  edits.reverse();
  return edits;
}
/**
 * Splice Projection functions:
 *
 * A splice map is a representation of how a previous array of items
 * was transformed into a new array of items. Conceptually it is a list of
 * tuples of
 *
 *   <index, removed, addedCount>
 *
 * which are kept in ascending index order of. The tuple represents that at
 * the |index|, |removed| sequence of items were removed, and counting forward
 * from |index|, |addedCount| items were added.
 */

/**
 * Lacking individual splice mutation information, the minimal set of
 * splices can be synthesized given the previous state and final state of an
 * array. The basic approach is to calculate the edit distance matrix and
 * choose the shortest path through it.
 *
 * Complexity: O(l * p)
 *   l: The length of the current array
 *   p: The length of the old array
 */


function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
  let prefixCount = 0;
  let suffixCount = 0;
  let splice;
  let minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
  if (currentStart == 0 && oldStart == 0) prefixCount = sharedPrefix(current, old, minLength);
  if (currentEnd == current.length && oldEnd == old.length) suffixCount = sharedSuffix(current, old, minLength - prefixCount);
  currentStart += prefixCount;
  oldStart += prefixCount;
  currentEnd -= suffixCount;
  oldEnd -= suffixCount;
  if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0) return [];

  if (currentStart == currentEnd) {
    splice = newSplice(currentStart, [], 0);

    while (oldStart < oldEnd) splice.removed.push(old[oldStart++]);

    return [splice];
  } else if (oldStart == oldEnd) return [newSplice(currentStart, [], currentEnd - currentStart)];

  let ops = spliceOperationsFromEditDistances(calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
  splice = undefined;
  let splices = [];
  let index = currentStart;
  let oldIndex = oldStart;

  for (let i = 0; i < ops.length; i++) {
    switch (ops[i]) {
      case EDIT_LEAVE:
        if (splice) {
          splices.push(splice);
          splice = undefined;
        }

        index++;
        oldIndex++;
        break;

      case EDIT_UPDATE:
        if (!splice) splice = newSplice(index, [], 0);
        splice.addedCount++;
        index++;
        splice.removed.push(old[oldIndex]);
        oldIndex++;
        break;

      case EDIT_ADD:
        if (!splice) splice = newSplice(index, [], 0);
        splice.addedCount++;
        index++;
        break;

      case EDIT_DELETE:
        if (!splice) splice = newSplice(index, [], 0);
        splice.removed.push(old[oldIndex]);
        oldIndex++;
        break;
    }
  }

  if (splice) {
    splices.push(splice);
  }

  return splices;
}

function sharedPrefix(current, old, searchLength) {
  for (let i = 0; i < searchLength; i++) if (!equals(current[i], old[i])) return i;

  return searchLength;
}

function sharedSuffix(current, old, searchLength) {
  let index1 = current.length;
  let index2 = old.length;
  let count = 0;

  while (count < searchLength && equals(current[--index1], old[--index2])) count++;

  return count;
}

function equals(currentValue, previousValue) {
  return currentValue === previousValue;
}

function calculateSplices(current, previous) {
  return calcSplices(current, 0, current.length, previous, 0, previous.length);
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/link-nodes.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




function linkNode(node, container, containerData, ref_node) {
  patchOutsideElementAccessors(node);
  ref_node = ref_node || null;
  const nodeData = ensureShadyDataForNode(node);
  const ref_nodeData = ref_node ? ensureShadyDataForNode(ref_node) : null; // update ref_node.previousSibling <-> node

  nodeData.previousSibling = ref_node ? ref_nodeData.previousSibling : container[SHADY_PREFIX + 'lastChild'];
  let psd = shadyDataForNode(nodeData.previousSibling);

  if (psd) {
    psd.nextSibling = node;
  } // update node <-> ref_node


  let nsd = shadyDataForNode(nodeData.nextSibling = ref_node);

  if (nsd) {
    nsd.previousSibling = node;
  } // update node <-> container


  nodeData.parentNode = container;

  if (ref_node) {
    if (ref_node === containerData.firstChild) {
      containerData.firstChild = node;
    }
  } else {
    containerData.lastChild = node;

    if (!containerData.firstChild) {
      containerData.firstChild = node;
    }
  } // remove caching of childNodes


  containerData.childNodes = null;
}

const recordInsertBefore = (node, container, ref_node) => {
  patchInsideElementAccessors(container);
  const containerData = ensureShadyDataForNode(container);

  if (containerData.firstChild !== undefined) {
    containerData.childNodes = null;
  } // handle document fragments


  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    // Note, documentFragments should not have logical DOM so there's
    // no need update that. It is possible to append a ShadowRoot, but we're
    // choosing not to support that.
    const first = node[NATIVE_PREFIX + 'firstChild'];

    for (let n = first; n; n = n[NATIVE_PREFIX + 'nextSibling']) {
      linkNode(n, container, containerData, ref_node);
    }
  } else {
    linkNode(node, container, containerData, ref_node);
  }
};
const recordRemoveChild = (node, container) => {
  const nodeData = ensureShadyDataForNode(node);
  const containerData = ensureShadyDataForNode(container);

  if (node === containerData.firstChild) {
    containerData.firstChild = nodeData.nextSibling;
  }

  if (node === containerData.lastChild) {
    containerData.lastChild = nodeData.previousSibling;
  }

  let p = nodeData.previousSibling;
  let n = nodeData.nextSibling;

  if (p) {
    ensureShadyDataForNode(p).nextSibling = n;
  }

  if (n) {
    ensureShadyDataForNode(n).previousSibling = p;
  } // When an element is removed, logical data is no longer tracked.
  // Explicitly set `undefined` here to indicate this. This is disginguished
  // from `null` which is set if info is null.


  nodeData.parentNode = nodeData.previousSibling = nodeData.nextSibling = undefined;

  if (containerData.childNodes !== undefined) {
    // remove caching of childNodes
    containerData.childNodes = null;
  }
};
/**
 * @param  {!Node|DocumentFragment} node
 * @param  {!Node|DocumentFragment=} adoptedParent
 */

const recordChildNodes = (node, adoptedParent) => {
  const nodeData = ensureShadyDataForNode(node);

  if (!adoptedParent && nodeData.firstChild !== undefined) {
    return;
  } // remove caching of childNodes


  nodeData.childNodes = null;
  const first = nodeData.firstChild = node[NATIVE_PREFIX + 'firstChild'];
  nodeData.lastChild = node[NATIVE_PREFIX + 'lastChild'];
  patchInsideElementAccessors(node);

  for (let n = first, previous; n; n = n[NATIVE_PREFIX + 'nextSibling']) {
    const sd = ensureShadyDataForNode(n);
    sd.parentNode = adoptedParent || node;
    sd.nextSibling = n[NATIVE_PREFIX + 'nextSibling'];
    sd.previousSibling = previous || null;
    previous = n;
    patchOutsideElementAccessors(n);
  }
};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/style-scoping.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

let style_scoping_scopingShim = null;
function getScopingShim() {
  if (!style_scoping_scopingShim) {
    style_scoping_scopingShim = window['ShadyCSS'] && window['ShadyCSS']['ScopingShim'];
  }

  return style_scoping_scopingShim || null;
}
/**
 * @param {!Node} node
 * @param {string} attr
 * @param {string} value
 */

function scopeClassAttribute(node, attr, value) {
  const scopingShim = getScopingShim();

  if (scopingShim && attr === 'class') {
    scopingShim['setElementClass'](node, value);
    return true;
  }

  return false;
}
/**
 * @param {!Node} node
 * @param {string} newScopeName
 */

function addShadyScoping(node, newScopeName) {
  const scopingShim = getScopingShim();

  if (!scopingShim) {
    return;
  }

  scopingShim['scopeNode'](node, newScopeName);
}
/**
 * @param {!Node} node
 * @param {string} currentScopeName
 */

function removeShadyScoping(node, currentScopeName) {
  const scopingShim = getScopingShim();

  if (!scopingShim) {
    return;
  }

  scopingShim['unscopeNode'](node, currentScopeName);
}
/**
 * @param {!Node} node
 * @param {string} newScopeName
 * @param {string} oldScopeName
 */

function replaceShadyScoping(node, newScopeName, oldScopeName) {
  const scopingShim = getScopingShim();

  if (!scopingShim) {
    return;
  }

  if (oldScopeName) {
    removeShadyScoping(node, oldScopeName);
  }

  addShadyScoping(node, newScopeName);
}
/**
 * @param {!Node} node
 * @param {string} newScopeName
 * @return {boolean}
 */

function currentScopeIsCorrect(node, newScopeName) {
  const scopingShim = getScopingShim();

  if (!scopingShim) {
    return true;
  }

  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    // NOTE: as an optimization, only check that all the top-level children
    // have the correct scope.
    let correctScope = true;

    for (let n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
      correctScope = correctScope && currentScopeIsCorrect(n, newScopeName);
    }

    return correctScope;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }

  const currentScope = scopingShim['currentScopeForNode'](node);
  return currentScope === newScopeName;
}
/**
 * @param {!Node} node
 * @return {string}
 */

function currentScopeForNode(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const scopingShim = getScopingShim();

  if (!scopingShim) {
    return '';
  }

  return scopingShim['currentScopeForNode'](node);
}
/**
 * Walk over a node's tree and apply visitorFn to each element node
 *
 * @param {Node} node
 * @param {function(!Node):void} visitorFn
 */

function treeVisitor(node, visitorFn) {
  if (!node) {
    return;
  } // this check is necessary if `node` is a Document Fragment


  if (node.nodeType === Node.ELEMENT_NODE) {
    visitorFn(node);
  }

  for (let n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
    if (n.nodeType === Node.ELEMENT_NODE) {
      treeVisitor(n, visitorFn);
    }
  }
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/Node.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





const doc = window.document;
const preferPerformance = settings.preferPerformance;
const nativeIsConnectedAccessors =
/** @type {ObjectPropertyDescriptor} */
Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected');
const nativeIsConnected = nativeIsConnectedAccessors && nativeIsConnectedAccessors.get;
function Node_clearNode(node) {
  let firstChild;

  while (firstChild = node[SHADY_PREFIX + 'firstChild']) {
    node[SHADY_PREFIX + 'removeChild'](firstChild);
  }
}

function removeOwnerShadyRoot(node) {
  // optimization: only reset the tree if node is actually in a root
  if (hasCachedOwnerRoot(node)) {
    for (let n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
      removeOwnerShadyRoot(n);
    }
  }

  const nodeData = shadyDataForNode(node);

  if (nodeData) {
    nodeData.ownerShadyRoot = undefined;
  }
}

function hasCachedOwnerRoot(node) {
  const nodeData = shadyDataForNode(node);
  return Boolean(nodeData && nodeData.ownerShadyRoot !== undefined);
}
/**
 * Finds the first flattened node that is composed in the node's parent.
 * If the given node is a slot, then the first flattened node is returned
 * if it exists, otherwise advance to the node's nextSibling.
 * @param {Node} node within which to find first composed node
 * @returns {Node} first composed node
 */


function firstComposedNode(node) {
  let composed = node;

  if (node && node.localName === 'slot') {
    const nodeData = shadyDataForNode(node);
    const flattened = nodeData && nodeData.flattenedNodes;
    composed = flattened && flattened.length ? flattened[0] : firstComposedNode(node[SHADY_PREFIX + 'nextSibling']);
  }

  return composed;
}
/**
 * @param {Node} node
 * @param {Node=} addedNode
 * @param {Node=} removedNode
 */


function scheduleObserver(node, addedNode, removedNode) {
  const nodeData = shadyDataForNode(node);
  const observer = nodeData && nodeData.observer;

  if (observer) {
    if (addedNode) {
      observer.addedNodes.push(addedNode);
    }

    if (removedNode) {
      observer.removedNodes.push(removedNode);
    }

    observer.schedule();
  }
}

const NodePatches = getOwnPropertyDescriptors({
  /** @this {Node} */
  get parentNode() {
    const nodeData = shadyDataForNode(this);
    const l = nodeData && nodeData.parentNode;
    return l !== undefined ? l : this[NATIVE_PREFIX + 'parentNode'];
  },

  /** @this {Node} */
  get firstChild() {
    const nodeData = shadyDataForNode(this);
    const l = nodeData && nodeData.firstChild;
    return l !== undefined ? l : this[NATIVE_PREFIX + 'firstChild'];
  },

  /** @this {Node} */
  get lastChild() {
    const nodeData = shadyDataForNode(this);
    const l = nodeData && nodeData.lastChild;
    return l !== undefined ? l : this[NATIVE_PREFIX + 'lastChild'];
  },

  /** @this {Node} */
  get nextSibling() {
    const nodeData = shadyDataForNode(this);
    const l = nodeData && nodeData.nextSibling;
    return l !== undefined ? l : this[NATIVE_PREFIX + 'nextSibling'];
  },

  /** @this {Node} */
  get previousSibling() {
    const nodeData = shadyDataForNode(this);
    const l = nodeData && nodeData.previousSibling;
    return l !== undefined ? l : this[NATIVE_PREFIX + 'previousSibling'];
  },

  /** @this {Node} */
  get childNodes() {
    let childNodes;

    if (isTrackingLogicalChildNodes(this)) {
      const nodeData = shadyDataForNode(this);

      if (!nodeData.childNodes) {
        nodeData.childNodes = [];

        for (let n = this[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
          nodeData.childNodes.push(n);
        }
      }

      childNodes = nodeData.childNodes;
    } else {
      childNodes = this[NATIVE_PREFIX + 'childNodes'];
    }

    childNodes.item = function (index) {
      return childNodes[index];
    };

    return childNodes;
  },

  /** @this {Node} */
  get parentElement() {
    const nodeData = shadyDataForNode(this);
    let l = nodeData && nodeData.parentNode;

    if (l && l.nodeType !== Node.ELEMENT_NODE) {
      l = null;
    }

    return l !== undefined ? l : this[NATIVE_PREFIX + 'parentElement'];
  },

  /** @this {Node} */
  get isConnected() {
    if (nativeIsConnected && nativeIsConnected.call(this)) {
      return true;
    }

    if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
      return false;
    } // Fast path for distributed nodes.


    const ownerDocument = this.ownerDocument;

    if (hasDocumentContains) {
      if (ownerDocument[NATIVE_PREFIX + 'contains'](this)) {
        return true;
      }
    } else if (ownerDocument.documentElement && ownerDocument.documentElement[NATIVE_PREFIX + 'contains'](this)) {
      return true;
    } // Slow path for non-distributed nodes.


    let node = this;

    while (node && !(node instanceof Document)) {
      node = node[SHADY_PREFIX + 'parentNode'] || (utils_isShadyRoot(node) ?
      /** @type {ShadowRoot} */
      node.host : undefined);
    }

    return !!(node && node instanceof Document);
  },

  /** @this {Node} */
  get textContent() {
    if (isTrackingLogicalChildNodes(this)) {
      let tc = [];

      for (let n = this[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
        if (n.nodeType !== Node.COMMENT_NODE) {
          tc.push(n[SHADY_PREFIX + 'textContent']);
        }
      }

      return tc.join('');
    } else {
      return this[NATIVE_PREFIX + 'textContent'];
    }
  },

  /**
   * @this {Node}
   * @param {string} value
   */
  set textContent(value) {
    if (typeof value === 'undefined' || value === null) {
      value = '';
    }

    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
      case Node.DOCUMENT_FRAGMENT_NODE:
        if (!isTrackingLogicalChildNodes(this) && settings.hasDescriptors) {
          // may be removing a nested slot but fast path if we know we are not.
          const firstChild = this[SHADY_PREFIX + 'firstChild'];

          if (firstChild != this[SHADY_PREFIX + 'lastChild'] || firstChild && firstChild.nodeType != Node.TEXT_NODE) {
            Node_clearNode(this);
          }

          this[NATIVE_PREFIX + 'textContent'] = value;
        } else {
          Node_clearNode(this); // Document fragments must have no childNodes if setting a blank string

          if (value.length > 0 || this.nodeType === Node.ELEMENT_NODE) {
            this[SHADY_PREFIX + 'insertBefore'](document.createTextNode(value));
          }
        }

        break;

      default:
        // Note, be wary of patching `nodeValue`.
        this.nodeValue = value;
        break;
    }
  },

  // Patched `insertBefore`. Note that all mutations that add nodes are routed
  // here. When a <slot> is added or a node is added to a host with a shadowRoot
  // with a slot, a standard dom `insert` call is aborted and `_asyncRender`
  // is called on the relevant shadowRoot. In all other cases, a standard dom
  // `insert` can be made, but the location and ref_node may need to be changed.

  /**
   * @this {Node}
   * @param {Node} node
   * @param {Node=} ref_node
   */
  insertBefore(node, ref_node) {
    // optimization: assume native insertBefore is ok if the nodes are not in the document.
    if (this.ownerDocument !== doc && node.ownerDocument !== doc) {
      this[NATIVE_PREFIX + 'insertBefore'](node, ref_node);
      return node;
    }

    if (node === this) {
      throw Error(`Failed to execute 'appendChild' on 'Node': The new child element contains the parent.`);
    }

    if (ref_node) {
      const refData = shadyDataForNode(ref_node);
      const p = refData && refData.parentNode;

      if (p !== undefined && p !== this || p === undefined && ref_node[NATIVE_PREFIX + 'parentNode'] !== this) {
        throw Error(`Failed to execute 'insertBefore' on 'Node': The node ` + `before which the new node is to be inserted is not a child of this node.`);
      }
    }

    if (ref_node === node) {
      return node;
    }
    /** @type {!Array<!HTMLSlotElement>} */


    const slotsAdded = [];
    const ownerRoot = ownerShadyRootForNode(this);
    /** @type {string} */

    const newScopeName = ownerRoot ? ownerRoot.host.localName : currentScopeForNode(this);
    /** @type {string} */

    let oldScopeName; // remove from existing location

    const parentNode = node[SHADY_PREFIX + 'parentNode'];

    if (parentNode) {
      oldScopeName = currentScopeForNode(node);
      const skipUnscoping = // Don't remove scoping if we're inserting into another shadowRoot;
      // this would be unnecessary since it will be re-scoped below
      Boolean(ownerRoot) || // Don't remove scoping if we're being moved between non-shadowRoot
      // locations (the likely case is when moving pre-scoped nodes in a template)
      !ownerShadyRootForNode(node) || // Under preferPerformance, don't remove scoping when moving back into
      // a document fragment that was previously scoped; the assumption is
      // that the user should only move correctly-scoped DOM back into it
      preferPerformance && this['__noInsertionPoint'] !== undefined;
      parentNode[SHADY_PREFIX + 'removeChild'](node, skipUnscoping);
    } // add to new parent


    let allowNativeInsert = true;
    const needsScoping = (!preferPerformance || // Under preferPerformance, only re-scope if we're not coming from a
    // pre-scoped doc fragment or back into a pre-scoped doc fragment
    node['__noInsertionPoint'] === undefined && this['__noInsertionPoint'] === undefined) && !currentScopeIsCorrect(node, newScopeName);
    const needsSlotFinding = ownerRoot && !node['__noInsertionPoint'] && (!preferPerformance || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE);

    if (needsSlotFinding || needsScoping) {
      // NOTE: avoid node.removeChild as this *can* trigger another patched
      // method (e.g. custom elements) and we want only the shady method to run.
      // The following table describes what style scoping actions should happen as a result of this insertion.
      // document -> shadowRoot: replace
      // shadowRoot -> shadowRoot: replace
      // shadowRoot -> shadowRoot of same type: do nothing
      // shadowRoot -> document: allow unscoping
      // document -> document: do nothing
      // The "same type of shadowRoot" and "document to document cases rely on `currentScopeIsCorrect` returning true
      if (needsScoping) {
        // in a document or disconnected tree, replace scoping if necessary
        oldScopeName = oldScopeName || currentScopeForNode(node);
      }

      treeVisitor(node, node => {
        if (needsSlotFinding && node.localName === 'slot') {
          slotsAdded.push(
          /** @type {!HTMLSlotElement} */
          node);
        }

        if (needsScoping) {
          replaceShadyScoping(node, newScopeName, oldScopeName);
        }
      });
    } // if a slot is added, must render containing root.


    if (slotsAdded.length) {
      ownerRoot._addSlots(slotsAdded);

      ownerRoot._asyncRender();
    }

    if (isTrackingLogicalChildNodes(this)) {
      recordInsertBefore(node, this, ref_node); // when inserting into a host with a shadowRoot with slot, use
      // `shadowRoot._asyncRender()` via `attach-shadow` module

      const parentData = shadyDataForNode(this);

      if (hasShadowRootWithSlot(this)) {
        parentData.root._asyncRender();

        allowNativeInsert = false; // when inserting into a host with shadowRoot with NO slot, do nothing
        // as the node should not be added to composed dome anywhere.
      } else if (parentData.root) {
        allowNativeInsert = false;
      }
    }

    if (allowNativeInsert) {
      // if adding to a shadyRoot, add to host instead
      let container = utils_isShadyRoot(this) ?
      /** @type {ShadowRoot} */
      this.host : this; // if ref_node, get the ref_node that's actually in composed dom.

      if (ref_node) {
        ref_node = firstComposedNode(ref_node);
        container[NATIVE_PREFIX + 'insertBefore'](node, ref_node);
      } else {
        container[NATIVE_PREFIX + 'appendChild'](node);
      } // Since ownerDocument is not patched, it can be incorrect after this call
      // if the node is physically appended via distribution. This can result
      // in the custom elements polyfill not upgrading the node if it's in an inert doc.
      // We correct this by calling `adoptNode`.

    } else if (node.ownerDocument !== this.ownerDocument) {
      this.ownerDocument.adoptNode(node);
    }

    scheduleObserver(this, node);
    return node;
  },

  /**
   * @this {Node}
   * @param {Node} node
   */
  appendChild(node) {
    // if this is a shadowRoot and the shadowRoot is passed as `node`
    // then an optimized append has already been performed, so do nothing.
    if (!(this == node && utils_isShadyRoot(node))) {
      return this[SHADY_PREFIX + 'insertBefore'](node);
    }
  },

  /**
   * Patched `removeChild`. Note that all dom "removals" are routed here.
   * Removes the given `node` from the element's `children`.
   * This method also performs dom composition.
   * @this {Node}
   * @param {Node} node
   * @param {boolean=} skipUnscoping
   */
  removeChild(node, skipUnscoping = false) {
    if (this.ownerDocument !== doc) {
      return this[NATIVE_PREFIX + 'removeChild'](node);
    }

    if (node[SHADY_PREFIX + 'parentNode'] !== this) {
      throw Error('The node to be removed is not a child of this node: ' + node);
    }

    let preventNativeRemove;
    let ownerRoot = ownerShadyRootForNode(node);

    const removingInsertionPoint = ownerRoot && ownerRoot._removeContainedSlots(node);

    const parentData = shadyDataForNode(this);

    if (isTrackingLogicalChildNodes(this)) {
      recordRemoveChild(node, this);

      if (hasShadowRootWithSlot(this)) {
        parentData.root._asyncRender();

        preventNativeRemove = true;
      }
    } // unscope a node leaving a ShadowRoot if ShadyCSS is present, and this node
    // is not going to be rescoped in `insertBefore`


    if (getScopingShim() && !skipUnscoping && ownerRoot && node.nodeType !== Node.TEXT_NODE) {
      const oldScopeName = currentScopeForNode(node);
      treeVisitor(node, node => {
        removeShadyScoping(node, oldScopeName);
      });
    }

    removeOwnerShadyRoot(node); // if removing slot, must render containing root

    if (ownerRoot) {
      let changeSlotContent = this && this.localName === 'slot';

      if (changeSlotContent) {
        preventNativeRemove = true;
      }

      if (removingInsertionPoint || changeSlotContent) {
        ownerRoot._asyncRender();
      }
    }

    if (!preventNativeRemove) {
      // if removing from a shadyRoot, remove from host instead
      let container = utils_isShadyRoot(this) ?
      /** @type {ShadowRoot} */
      this.host : this; // not guaranteed to physically be in container; e.g.
      // (1) if parent has a shadyRoot, element may or may not at distributed
      // location (could be undistributed)
      // (2) if parent is a slot, element may not ben in composed dom

      if (!(parentData.root || node.localName === 'slot') || container === node[NATIVE_PREFIX + 'parentNode']) {
        container[NATIVE_PREFIX + 'removeChild'](node);
      }
    }

    scheduleObserver(this, null, node);
    return node;
  },

  /**
   * @this {Node}
   * @param {Node} node
   * @param {Node=} ref_node
   */
  replaceChild(node, ref_node) {
    this[SHADY_PREFIX + 'insertBefore'](node, ref_node);
    this[SHADY_PREFIX + 'removeChild'](ref_node);
    return node;
  },

  /**
   * @this {Node}
   * @param {boolean=} deep
   */
  cloneNode(deep) {
    if (this.localName == 'template') {
      return this[NATIVE_PREFIX + 'cloneNode'](deep);
    } else {
      const n = this[NATIVE_PREFIX + 'cloneNode'](false); // Attribute nodes historically had childNodes, but they have later
      // been removed from the spec.
      // Make sure we do not do a deep clone on them for old browsers (IE11)

      if (deep && n.nodeType !== Node.ATTRIBUTE_NODE) {
        for (let c = this[SHADY_PREFIX + 'firstChild'], nc; c; c = c[SHADY_PREFIX + 'nextSibling']) {
          nc = c[SHADY_PREFIX + 'cloneNode'](true);
          n[SHADY_PREFIX + 'appendChild'](nc);
        }
      }

      return n;
    }
  },

  /**
   * @this {Node}
   * @param {Object=} options
   */
  // TODO(sorvell): implement `options` e.g. `{ composed: boolean }`
  getRootNode(options) {
    // eslint-disable-line no-unused-vars
    if (!this || !this.nodeType) {
      return;
    }

    const nodeData = ensureShadyDataForNode(this);
    let root = nodeData.ownerShadyRoot;

    if (root === undefined) {
      if (utils_isShadyRoot(this)) {
        root = this;
        nodeData.ownerShadyRoot = root;
      } else {
        let parent = this[SHADY_PREFIX + 'parentNode'];
        root = parent ? parent[SHADY_PREFIX + 'getRootNode'](options) : this; // memo-ize result for performance but only memo-ize
        // result if node is in the document. This avoids a problem where a root
        // can be cached while an element is inside a fragment.
        // If this happens and we cache the result, the value can become stale
        // because for perf we avoid processing the subtree of added fragments.

        if (document.documentElement[NATIVE_PREFIX + 'contains'](this)) {
          nodeData.ownerShadyRoot = root;
        }
      }
    }

    return root;
  },

  /** @this {Node} */
  contains(node) {
    return contains(this, node);
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/ParentNode.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


/**
 * @param {Node} node
 * @param {Function} matcher
 * @param {Function=} halter
 */

function query(node, matcher, halter) {
  let list = [];
  queryChildNodes(node, matcher, halter, list);
  return list;
}

function queryChildNodes(parent, matcher, halter, list) {
  for (let n = parent[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
    if (n.nodeType === Node.ELEMENT_NODE && queryElement(n, matcher, halter, list)) {
      return true;
    }
  }
}

function queryElement(node, matcher, halter, list) {
  let result = matcher(node);

  if (result) {
    list.push(node);
  }

  if (halter && halter(result)) {
    return result;
  }

  queryChildNodes(node, matcher, halter, list);
} // Needed on Element, DocumentFragment, Document


const ParentNodePatches = getOwnPropertyDescriptors({
  /** @this {Element} */
  get firstElementChild() {
    const nodeData = shadyDataForNode(this);

    if (nodeData && nodeData.firstChild !== undefined) {
      let n = this[SHADY_PREFIX + 'firstChild'];

      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n[SHADY_PREFIX + 'nextSibling'];
      }

      return n;
    } else {
      return this[NATIVE_PREFIX + 'firstElementChild'];
    }
  },

  /** @this {Element} */
  get lastElementChild() {
    const nodeData = shadyDataForNode(this);

    if (nodeData && nodeData.lastChild !== undefined) {
      let n = this[SHADY_PREFIX + 'lastChild'];

      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n[SHADY_PREFIX + 'previousSibling'];
      }

      return n;
    } else {
      return this[NATIVE_PREFIX + 'lastElementChild'];
    }
  },

  /** @this {Element} */
  get children() {
    if (!isTrackingLogicalChildNodes(this)) {
      return this[NATIVE_PREFIX + 'children'];
    }

    return createPolyfilledHTMLCollection(Array.prototype.filter.call(childNodesArray(this), n => {
      return n.nodeType === Node.ELEMENT_NODE;
    }));
  },

  /** @this {Element} */
  get childElementCount() {
    let children = this[SHADY_PREFIX + 'children'];

    if (children) {
      return children.length;
    }

    return 0;
  }

});
const QueryPatches = getOwnPropertyDescriptors({
  // TODO(sorvell): consider doing native QSA and filtering results.

  /**
   * @this {Element}
   * @param  {string} selector
   */
  querySelector(selector) {
    // match selector and halt on first result.
    let result = query(this, function (n) {
      return matchesSelector(n, selector);
    }, function (n) {
      return Boolean(n);
    })[0];
    return result || null;
  },

  /**
   * @this {Element}
   * @param  {string} selector
   * @param  {boolean} useNative
   */
  // TODO(sorvell): `useNative` option relies on native querySelectorAll and
  // misses distributed nodes, see
  // https://github.com/webcomponents/shadydom/pull/210#issuecomment-361435503
  querySelectorAll(selector, useNative) {
    if (useNative) {
      const o = Array.prototype.slice.call(this[NATIVE_PREFIX + 'querySelectorAll'](selector));
      const root = this[SHADY_PREFIX + 'getRootNode']();
      return o.filter(e => e[SHADY_PREFIX + 'getRootNode']() == root);
    }

    return query(this, function (n) {
      return matchesSelector(n, selector);
    });
  }

}); // In preferPerformance mode, create a custom `ParentNodeDocumentOrFragment`
// that optionally does not mixin querySelector/All; this is a performance
// optimization. In noPatch, we need to keep the query patches here in order to
// ensure the query API is available on the wrapper

const ParentNodeDocumentOrFragmentPatches = settings.preferPerformance && !settings.noPatch ? Object.assign({}, ParentNodePatches) : ParentNodePatches;
Object.assign(ParentNodePatches, QueryPatches);
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/DocumentOrFragment.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


const DocumentOrFragmentPatches = getOwnPropertyDescriptors({
  /**
   * @this {Element}
   * @param {string} id
   */
  getElementById(id) {
    if (id === '') {
      return null;
    }

    let result = query(this, function (n) {
      return n.id == id;
    }, function (n) {
      return Boolean(n);
    })[0];
    return result || null;
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/DocumentOrShadowRoot.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



function getDocumentActiveElement() {
  if (settings.hasDescriptors) {
    return document[NATIVE_PREFIX + 'activeElement'];
  } else {
    return document.activeElement;
  }
}

const DocumentOrShadowRootPatches = getOwnPropertyDescriptors({
  /** @this {Document|ShadowRoot} */
  get activeElement() {
    let active = getDocumentActiveElement(); // In IE11, activeElement might be an empty object if the document is
    // contained in an iframe.
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10998788/

    if (!active || !active.nodeType) {
      return null;
    }

    let isShadyRoot = !!utils_isShadyRoot(this);

    if (this !== document) {
      // If this node isn't a document or shady root, then it doesn't have
      // an active element.
      if (!isShadyRoot) {
        return null;
      } // If this shady root's host is the active element or the active
      // element is not a descendant of the host (in the composed tree),
      // then it doesn't have an active element.


      if (this.host === active || !this.host[NATIVE_PREFIX + 'contains'](active)) {
        return null;
      }
    } // This node is either the document or a shady root of which the active
    // element is a (composed) descendant of its host; iterate upwards to
    // find the active element's most shallow host within it.


    let activeRoot = ownerShadyRootForNode(active);

    while (activeRoot && activeRoot !== this) {
      active = activeRoot.host;
      activeRoot = ownerShadyRootForNode(active);
    }

    if (this === document) {
      // This node is the document, so activeRoot should be null.
      return activeRoot ? null : active;
    } else {
      // This node is a non-document shady root, and it should be
      // activeRoot.
      return activeRoot === this ? active : null;
    }
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/ElementOrShadowRoot.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/** @type {!Document} */

const ElementOrShadowRoot_inertDoc = document.implementation.createHTMLDocument('inert');
const ElementOrShadowRootPatches = getOwnPropertyDescriptors({
  /** @this {Element} */
  get innerHTML() {
    if (isTrackingLogicalChildNodes(this)) {
      const content = this.localName === 'template' ?
      /** @type {HTMLTemplateElement} */
      this.content : this;
      return getInnerHTML(content, childNodesArray);
    } else {
      return this[NATIVE_PREFIX + 'innerHTML'];
    }
  },

  /**
   * @this {Element}
   * @param {string} value
   */
  set innerHTML(value) {
    if (this.localName === 'template') {
      this[NATIVE_PREFIX + 'innerHTML'] = value;
    } else {
      Node_clearNode(this);
      const containerName = this.localName || 'div';
      let htmlContainer;

      if (!this.namespaceURI || this.namespaceURI === ElementOrShadowRoot_inertDoc.namespaceURI) {
        htmlContainer = ElementOrShadowRoot_inertDoc.createElement(containerName);
      } else {
        htmlContainer = ElementOrShadowRoot_inertDoc.createElementNS(this.namespaceURI, containerName);
      }

      if (settings.hasDescriptors) {
        htmlContainer[NATIVE_PREFIX + 'innerHTML'] = value;
      } else {
        htmlContainer.innerHTML = value;
      }

      let firstChild;

      while (firstChild = htmlContainer[SHADY_PREFIX + 'firstChild']) {
        this[SHADY_PREFIX + 'insertBefore'](firstChild);
      }
    }
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/ShadowRoot.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const ShadowRootPatches = getOwnPropertyDescriptors({
  /**
   * @this {ShadowRoot}
   * @param {string} type
   * @param {Function} fn
   * @param {Object|boolean=} optionsOrCapture
   */
  addEventListener(type, fn, optionsOrCapture) {
    if (typeof optionsOrCapture !== 'object') {
      optionsOrCapture = {
        capture: Boolean(optionsOrCapture)
      };
    } // Note, `__shadyTarget` may already be set if an event was added on a <slot> child


    optionsOrCapture.__shadyTarget = optionsOrCapture.__shadyTarget || this;
    this.host[SHADY_PREFIX + 'addEventListener'](type, fn, optionsOrCapture);
  },

  /**
   * @this {ShadowRoot}
   * @param {string} type
   * @param {Function} fn
   * @param {Object|boolean=} optionsOrCapture
   */
  removeEventListener(type, fn, optionsOrCapture) {
    if (typeof optionsOrCapture !== 'object') {
      optionsOrCapture = {
        capture: Boolean(optionsOrCapture)
      };
    } // Note, `__shadyTarget` may already be set if an event was added on a <slot> child


    optionsOrCapture.__shadyTarget = optionsOrCapture.__shadyTarget || this;
    this.host[SHADY_PREFIX + 'removeEventListener'](type, fn, optionsOrCapture);
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patch-shadyRoot.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/








/**
 * @param {!Object} proto
 * @param {string=} prefix
 */

const patchShadyAccessors = (proto, prefix) => {
  patchProperties(proto, ShadowRootPatches, prefix);
  patchProperties(proto, DocumentOrShadowRootPatches, prefix);
  patchProperties(proto, ElementOrShadowRootPatches, prefix); // We ensure ParentNode accessors since these do not exist in Edge/IE on DocumentFragments.

  patchProperties(proto, ParentNodePatches, prefix); // Ensure `shadowRoot` has basic descriptors when we cannot rely
  // on them coming from DocumentFragment.
  //
  // Case 1, noPatching: Because we want noPatch ShadyRoots to have native property
  // names so that they do not have to be wrapped...
  // When we do *not* patch Node/DocumentFragment.prototype
  // we must manually install those properties on ShadyRoot's prototype.
  // Note, it's important to only install these in this mode so as not to stomp
  // over CustomElements polyfill's patches on Node/DocumentFragment methods.

  if (settings.noPatch && !prefix) {
    patchProperties(proto, NodePatches, prefix);
    patchProperties(proto, DocumentOrFragmentPatches, prefix); // Case 2, bad descriptors: Ensure accessors are on ShadowRoot.
    // These descriptors are normally used for instance patching but because
    // ShadyRoot can always be patched, just do it to the prototype.
  } else if (!settings.hasDescriptors) {
    patchProperties(proto, OutsideDescriptors);
    patchProperties(proto, InsideDescriptors);
    patchProperties(proto, TextContentInnerHTMLDescriptors);
  }
};

const patchShadyRoot = proto => {
  proto.__proto__ = DocumentFragment.prototype; // patch both prefixed and not, even when noPatch == true.

  patchShadyAccessors(proto, SHADY_PREFIX);
  patchShadyAccessors(proto); // Ensure native properties are all safely wrapped since ShadowRoot is not an
  // actual DocumentFragment instance.

  Object.defineProperties(proto, {
    nodeType: {
      value: Node.DOCUMENT_FRAGMENT_NODE,
      configurable: true
    },
    nodeName: {
      value: '#document-fragment',
      configurable: true
    },
    nodeValue: {
      value: null,
      configurable: true
    }
  }); // make undefined

  ['localName', 'namespaceURI', 'prefix'].forEach(prop => {
    Object.defineProperty(proto, prop, {
      value: undefined,
      configurable: true
    });
  }); // defer properties to host

  ['ownerDocument', 'baseURI', 'isConnected'].forEach(prop => {
    Object.defineProperty(proto, prop, {
      /** @this {ShadowRoot} */
      get() {
        return this.host[prop];
      },

      configurable: true
    });
  });
};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/attach-shadow.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





 // Do not export this object. It must be passed as the first argument to the
// ShadyRoot constructor in `attachShadow` to prevent the constructor from
// throwing. This prevents the user from being able to manually construct a
// ShadyRoot (i.e. `new ShadowRoot()`).

const ShadyRootConstructionToken = {};
const CATCHALL_NAME = '__catchall';
const SHADYROOT_NAME = 'ShadyRoot';
const MODE_CLOSED = 'closed';
let isRendering = settings['deferConnectionCallbacks'] && document.readyState === 'loading';
let rootRendered;

function ancestorList(node) {
  let ancestors = [];

  do {
    ancestors.unshift(node);
  } while (node = node[SHADY_PREFIX + 'parentNode']);

  return ancestors;
}
/**
 * @extends {ShadowRoot}
 */


class attach_shadow_ShadyRoot {
  constructor(token, host, options) {
    if (token !== ShadyRootConstructionToken) {
      throw new TypeError('Illegal constructor');
    }
    /** @type {boolean} */


    this._renderPending;
    /** @type {boolean} */

    this._hasRendered;
    /** @type {?Array<HTMLSlotElement>} */

    this._slotList = null;
    /** @type {?Object<string, Array<HTMLSlotElement>>} */

    this._slotMap;
    /** @type {?Array<HTMLSlotElement>} */

    this._pendingSlots;

    this._init(host, options);
  }

  _init(host, options) {
    // NOTE: set a fake local name so this element can be
    // distinguished from a DocumentFragment when patching.
    // FF doesn't allow this to be `localName`

    /** @type {string} */
    this._localName = SHADYROOT_NAME; // root <=> host

    this.host = host;
    /** @type {!string|undefined} */

    this.mode = options && options.mode;
    recordChildNodes(this.host);
    const hostData = ensureShadyDataForNode(this.host);
    /** @type {!ShadyRoot} */

    hostData.root = this;
    hostData.publicRoot = this.mode !== MODE_CLOSED ? this : null; // setup root

    const rootData = ensureShadyDataForNode(this);
    rootData.firstChild = rootData.lastChild = rootData.parentNode = rootData.nextSibling = rootData.previousSibling = null; // NOTE: optimization flag, only require an asynchronous render
    // to record parsed children if flag is not set.

    if (settings['preferPerformance']) {
      let n;

      while (n = this.host[NATIVE_PREFIX + 'firstChild']) {
        this.host[NATIVE_PREFIX + 'removeChild'](n);
      }
    } else {
      this._asyncRender();
    }
  }

  _asyncRender() {
    if (!this._renderPending) {
      this._renderPending = true;
      enqueue(() => this._render());
    }
  } // returns the oldest renderPending ancestor root.


  _getPendingDistributionRoot() {
    let renderRoot;
    let root = this;

    while (root) {
      if (root._renderPending) {
        renderRoot = root;
      }

      root = root._getDistributionParent();
    }

    return renderRoot;
  } // Returns the shadyRoot `this.host` if `this.host`
  // has children that require distribution.


  _getDistributionParent() {
    let root = this.host[SHADY_PREFIX + 'getRootNode']();

    if (!utils_isShadyRoot(root)) {
      return;
    }

    const nodeData = shadyDataForNode(this.host);

    if (nodeData && nodeData.__childSlotCount > 0) {
      return root;
    }
  } // Renders the top most render pending shadowRoot in the distribution tree.
  // This is safe because when a distribution parent renders, all children render.


  _render() {
    // If this root is not pending, it needs no rendering work. Any pending
    // parent that needs to render wll cause this root to render.
    const root = this._renderPending && this._getPendingDistributionRoot();

    if (root) {
      root._renderSelf();
    }
  }

  _flushInitial() {
    if (!this._hasRendered && this._renderPending) {
      this._render();
    }
  }
  /** @override */


  _renderSelf() {
    // track rendering state.
    const wasRendering = isRendering;
    isRendering = true;
    this._renderPending = false;

    if (this._slotList) {
      this._distribute();

      this._compose();
    } // NOTE: optimization flag, only process parsed children
    // if optimization flag is not set.
    // on initial render remove any undistributed children.


    if (!settings['preferPerformance'] && !this._hasRendered) {
      for (let n = this.host[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
        const data = shadyDataForNode(n);

        if (n[NATIVE_PREFIX + 'parentNode'] === this.host && (n.localName === 'slot' || !data.assignedSlot)) {
          this.host[NATIVE_PREFIX + 'removeChild'](n);
        }
      }
    }

    this._hasRendered = true;
    isRendering = wasRendering;

    if (rootRendered) {
      rootRendered();
    }
  }

  _distribute() {
    this._validateSlots(); // capture # of previously assigned nodes to help determine if dirty.


    for (let i = 0, slot; i < this._slotList.length; i++) {
      slot = this._slotList[i];

      this._clearSlotAssignedNodes(slot);
    } // distribute host children.


    for (let n = this.host[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
      this._distributeNodeToSlot(n);
    } // fallback content, slotchange, and dirty roots


    for (let i = 0; i < this._slotList.length; i++) {
      const slot = this._slotList[i];
      const slotData = shadyDataForNode(slot); // distribute fallback content

      if (!slotData.assignedNodes.length) {
        for (let n = slot[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
          this._distributeNodeToSlot(n, slot);
        }
      }

      const slotParentData = shadyDataForNode(slot[SHADY_PREFIX + 'parentNode']);
      const slotParentRoot = slotParentData && slotParentData.root;

      if (slotParentRoot && (slotParentRoot._hasInsertionPoint() || slotParentRoot._renderPending)) {
        slotParentRoot._renderSelf();
      }

      this._addAssignedToFlattenedNodes(slotData.flattenedNodes, slotData.assignedNodes);

      let prevAssignedNodes = slotData._previouslyAssignedNodes;

      if (prevAssignedNodes) {
        for (let i = 0; i < prevAssignedNodes.length; i++) {
          shadyDataForNode(prevAssignedNodes[i])._prevAssignedSlot = null;
        }

        slotData._previouslyAssignedNodes = null; // dirty if previously less assigned nodes than previously assigned.

        if (prevAssignedNodes.length > slotData.assignedNodes.length) {
          slotData.dirty = true;
        }
      }
      /* Note: A slot is marked dirty whenever a node is newly assigned to it
      or a node is assigned to a different slot (done in `_distributeNodeToSlot`)
      or if the number of nodes assigned to the slot has decreased (done above);
      */


      if (slotData.dirty) {
        slotData.dirty = false;

        this._fireSlotChange(slot);
      }
    }
  }
  /**
   * Distributes given `node` to the appropriate slot based on its `slot`
   * attribute. If `forcedSlot` is given, then the node is distributed to the
   * `forcedSlot`.
   * Note: slot to which the node is assigned will be marked dirty for firing
   * `slotchange`.
   * @param {Node} node
   * @param {Node=} forcedSlot
   *
   */


  _distributeNodeToSlot(node, forcedSlot) {
    const nodeData = ensureShadyDataForNode(node);
    let oldSlot = nodeData._prevAssignedSlot;
    nodeData._prevAssignedSlot = null;
    let slot = forcedSlot;

    if (!slot) {
      let name = node[SHADY_PREFIX + 'slot'] || CATCHALL_NAME;
      const list = this._slotMap[name];
      slot = list && list[0];
    }

    if (slot) {
      const slotData = ensureShadyDataForNode(slot);
      slotData.assignedNodes.push(node);
      nodeData.assignedSlot = slot;
    } else {
      nodeData.assignedSlot = undefined;
    }

    if (oldSlot !== nodeData.assignedSlot) {
      if (nodeData.assignedSlot) {
        ensureShadyDataForNode(nodeData.assignedSlot).dirty = true;
      }
    }
  }
  /**
   * Clears the assignedNodes tracking data for a given `slot`. Note, the current
   * assigned node data is tracked (via _previouslyAssignedNodes and
   * _prevAssignedSlot) to see if `slotchange` should fire. This data may be out
   *  of date at this time because the assigned nodes may have already been
   * distributed to another root. This is ok since this data is only used to
   * track changes.
   * @param {HTMLSlotElement} slot
   */


  _clearSlotAssignedNodes(slot) {
    const slotData = shadyDataForNode(slot);
    let n$ = slotData.assignedNodes;
    slotData.assignedNodes = [];
    slotData.flattenedNodes = [];
    slotData._previouslyAssignedNodes = n$;

    if (n$) {
      for (let i = 0; i < n$.length; i++) {
        let n = shadyDataForNode(n$[i]);
        n._prevAssignedSlot = n.assignedSlot; // only clear if it was previously set to this slot;
        // this helps ensure that if the node has otherwise been distributed
        // ignore it.

        if (n.assignedSlot === slot) {
          n.assignedSlot = null;
        }
      }
    }
  }

  _addAssignedToFlattenedNodes(flattened, assigned) {
    for (let i = 0, n; i < assigned.length && (n = assigned[i]); i++) {
      if (n.localName == 'slot') {
        const nestedAssigned = shadyDataForNode(n).assignedNodes;

        if (nestedAssigned && nestedAssigned.length) {
          this._addAssignedToFlattenedNodes(flattened, nestedAssigned);
        }
      } else {
        flattened.push(assigned[i]);
      }
    }
  }

  _fireSlotChange(slot) {
    // NOTE: cannot bubble correctly here so not setting bubbles: true
    // Safari tech preview does not bubble but chrome does
    // Spec says it bubbles (https://dom.spec.whatwg.org/#mutation-observers)
    slot[NATIVE_PREFIX + 'dispatchEvent'](new Event('slotchange'));
    const slotData = shadyDataForNode(slot);

    if (slotData.assignedSlot) {
      this._fireSlotChange(slotData.assignedSlot);
    }
  } // Reify dom such that it is at its correct rendering position
  // based on logical distribution.
  // NOTE: here we only compose parents of <slot> elements and not the
  // shadowRoot into the host. The latter is performend via a fast path
  // in the `logical-mutation`.insertBefore.


  _compose() {
    const slots = this._slotList;
    let composeList = [];

    for (let i = 0; i < slots.length; i++) {
      const parent = slots[i][SHADY_PREFIX + 'parentNode'];
      /* compose node only if:
        (1) parent does not have a shadowRoot since shadowRoot has already
        composed into the host
        (2) we're not already composing it
        [consider (n^2) but rare better than Set]
      */

      const parentData = shadyDataForNode(parent);

      if (!(parentData && parentData.root) && composeList.indexOf(parent) < 0) {
        composeList.push(parent);
      }
    }

    for (let i = 0; i < composeList.length; i++) {
      const node = composeList[i];
      const targetNode = node === this ? this.host : node;

      this._updateChildNodes(targetNode, this._composeNode(node));
    }
  } // Returns the list of nodes which should be rendered inside `node`.


  _composeNode(node) {
    let children = [];

    for (let n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
      // Note: if we see a slot here, the nodes are guaranteed to need to be
      // composed here. This is because if there is redistribution, it has
      // already been handled by this point.
      if (this._isInsertionPoint(n)) {
        let flattenedNodes = shadyDataForNode(n).flattenedNodes;

        for (let j = 0; j < flattenedNodes.length; j++) {
          let distributedNode = flattenedNodes[j];
          children.push(distributedNode);
        }
      } else {
        children.push(n);
      }
    }

    return children;
  }

  _isInsertionPoint(node) {
    return node.localName == 'slot';
  } // Ensures that the rendered node list inside `container` is `children`.


  _updateChildNodes(container, children) {
    let composed = nativeChildNodesArray(container);
    let splices = calculateSplices(children, composed); // process removals

    for (let i = 0, d = 0, s; i < splices.length && (s = splices[i]); i++) {
      for (let j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
        // check if the node is still where we expect it is before trying
        // to remove it; this can happen if we move a node and
        // then schedule its previous host for distribution resulting in
        // the node being removed here.
        if (n[NATIVE_PREFIX + 'parentNode'] === container) {
          container[NATIVE_PREFIX + 'removeChild'](n);
        } // TODO(sorvell): avoid the need for splicing here.


        composed.splice(s.index + d, 1);
      }

      d -= s.addedCount;
    } // process adds


    for (let i = 0, s, next; i < splices.length && (s = splices[i]); i++) {
      //eslint-disable-line no-redeclare
      next = composed[s.index];

      for (let j = s.index, n; j < s.index + s.addedCount; j++) {
        n = children[j];
        container[NATIVE_PREFIX + 'insertBefore'](n, next);
        composed.splice(j, 0, n);
      }
    }
  }

  _ensureSlotData() {
    this._pendingSlots = this._pendingSlots || [];
    this._slotList = this._slotList || [];
    this._slotMap = this._slotMap || {};
  }

  _addSlots(slots) {
    this._ensureSlotData();

    this._pendingSlots.push(...slots);
  }

  _validateSlots() {
    if (this._pendingSlots && this._pendingSlots.length) {
      this._mapSlots(this._pendingSlots);

      this._pendingSlots = [];
    }
  }
  /**
   * Adds the given slots. Slots are maintained in an dom-ordered list.
   * In addition a map of name to slot is updated.
   */


  _mapSlots(slots) {
    let slotNamesToSort;

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i]; // ensure insertionPoints's and their parents have logical dom info.
      // save logical tree info
      // a. for shadyRoot
      // b. for insertion points (fallback)
      // c. for parents of insertion points

      recordChildNodes(slot);
      const slotParent = slot[SHADY_PREFIX + 'parentNode'];
      recordChildNodes(slotParent);
      const slotParentData = shadyDataForNode(slotParent);
      slotParentData.__childSlotCount = (slotParentData.__childSlotCount || 0) + 1;

      let name = this._nameForSlot(slot);

      if (this._slotMap[name]) {
        slotNamesToSort = slotNamesToSort || {};
        slotNamesToSort[name] = true;

        this._slotMap[name].push(slot);
      } else {
        this._slotMap[name] = [slot];
      }

      this._slotList.push(slot);
    }

    if (slotNamesToSort) {
      for (let n in slotNamesToSort) {
        this._slotMap[n] = this._sortSlots(this._slotMap[n]);
      }
    }
  }

  _nameForSlot(slot) {
    const name = slot['name'] || slot.getAttribute('name') || CATCHALL_NAME;
    slot.__slotName = name;
    return name;
  }
  /**
   * Slots are kept in an ordered list. Slots with the same name
   * are sorted here by tree order.
   */


  _sortSlots(slots) {
    // NOTE: Cannot use `compareDocumentPosition` because it's not polyfilled,
    // but the code here could be used to polyfill the preceeding/following info
    // in `compareDocumentPosition`.
    return slots.sort((a, b) => {
      let listA = ancestorList(a);
      let listB = ancestorList(b);

      for (var i = 0; i < listA.length; i++) {
        let nA = listA[i];
        let nB = listB[i];

        if (nA !== nB) {
          let c$ = childNodesArray(nA[SHADY_PREFIX + 'parentNode']);
          return c$.indexOf(nA) - c$.indexOf(nB);
        }
      }
    });
  }
  /**
   * Removes from tracked slot data any slots contained within `container` and
   * then updates the tracked data (_slotList and _slotMap).
   * Any removed slots also have their `assignedNodes` removed from comopsed dom.
   */


  _removeContainedSlots(container) {
    if (!this._slotList) {
      return;
    }

    this._validateSlots();

    let didRemove;
    const map = this._slotMap;

    for (let n in map) {
      const slots = map[n];

      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];

        if (contains(container, slot)) {
          slots.splice(i, 1);

          const x = this._slotList.indexOf(slot);

          if (x >= 0) {
            this._slotList.splice(x, 1);

            const slotParentData = shadyDataForNode(slot[SHADY_PREFIX + 'parentNode']);

            if (slotParentData && slotParentData.__childSlotCount) {
              slotParentData.__childSlotCount--;
            }
          }

          i--;

          this._removeFlattenedNodes(slot);

          didRemove = true;
        }
      }
    }

    return didRemove;
  }

  _updateSlotName(slot) {
    if (!this._slotList) {
      return;
    } // make sure slotMap is initialized with this slot


    this._validateSlots();

    const oldName = slot.__slotName;

    const name = this._nameForSlot(slot);

    if (name === oldName) {
      return;
    } // remove from existing tracking


    let slots = this._slotMap[oldName];
    const i = slots.indexOf(slot);

    if (i >= 0) {
      slots.splice(i, 1);
    } // add to new location and sort if nedessary


    let list = this._slotMap[name] || (this._slotMap[name] = []);
    list.push(slot);

    if (list.length > 1) {
      this._slotMap[name] = this._sortSlots(list);
    }
  }

  _removeFlattenedNodes(slot) {
    const data = shadyDataForNode(slot);
    let n$ = data.flattenedNodes;

    if (n$) {
      for (let i = 0; i < n$.length; i++) {
        let node = n$[i];
        let parent = node[NATIVE_PREFIX + 'parentNode'];

        if (parent) {
          parent[NATIVE_PREFIX + 'removeChild'](node);
        }
      }
    }

    data.flattenedNodes = [];
    data.assignedNodes = [];
  }

  _hasInsertionPoint() {
    this._validateSlots();

    return Boolean(this._slotList && this._slotList.length);
  }

}

patchShadyRoot(attach_shadow_ShadyRoot.prototype);

/**
  Implements a pared down version of ShadowDOM's scoping, which is easy to
  polyfill across browsers.
*/

const attachShadow = (host, options) => {
  if (!host) {
    throw new Error('Must provide a host.');
  }

  if (!options) {
    throw new Error('Not enough arguments.');
  }

  let root; // Optimization for booting up a shadowRoot from a fragment rather than
  // creating one.

  if (options['shadyUpgradeFragment'] && canUpgrade()) {
    root = options['shadyUpgradeFragment'];
    root.__proto__ = ShadowRoot.prototype;

    root._init(host, options);

    recordChildNodes(root, root); // Note: qsa is native when used with noPatch.

    /** @type {?NodeList<Element>} */

    const slotsAdded = root['__noInsertionPoint'] ? null : root.querySelectorAll('slot'); // Reset scoping information so normal scoing rules apply after this.

    root['__noInsertionPoint'] = undefined; // if a slot is added, must render containing root.

    if (slotsAdded && slotsAdded.length) {
      root._addSlots(slotsAdded);

      root._asyncRender();
    }
    /** @type {ShadowRoot} */


    root.host[NATIVE_PREFIX + 'appendChild'](root);
  } else {
    root = new attach_shadow_ShadyRoot(ShadyRootConstructionToken, host, options);
  }

  return root;
}; // Mitigate connect/disconnect spam by wrapping custom element classes.

if (window['customElements'] && settings.inUse && !settings['preferPerformance']) {
  // process connect/disconnect after roots have rendered to avoid
  // issues with reaction stack.
  let connectMap = new Map();

  rootRendered = function () {
    // allow elements to connect
    // save map state (without needing polyfills on IE11)
    const r = [];
    connectMap.forEach((v, k) => {
      r.push([k, v]);
    });
    connectMap.clear();

    for (let i = 0; i < r.length; i++) {
      const e = r[i][0],
            value = r[i][1];

      if (value) {
        e['__shadydom_connectedCallback']();
      } else {
        e['__shadydom_disconnectedCallback']();
      }
    }
  }; // Document is in loading state and flag is set (deferConnectionCallbacks)
  // so process connection stack when `readystatechange` fires.


  if (isRendering) {
    document.addEventListener('readystatechange', () => {
      isRendering = false;
      rootRendered();
    }, {
      once: true
    });
  }
  /*
   * (1) elements can only be connected/disconnected if they are in the expected
   * state.
   * (2) never run connect/disconnect during rendering to avoid reaction stack issues.
   */


  const ManageConnect = (base, connected, disconnected) => {
    let counter = 0;
    const connectFlag = `__isConnected${counter++}`;

    if (connected || disconnected) {
      /** @this {!HTMLElement} */
      base.prototype.connectedCallback = base.prototype['__shadydom_connectedCallback'] = function () {
        // if rendering defer connected
        // otherwise connect only if we haven't already
        if (isRendering) {
          connectMap.set(this, true);
        } else if (!this[connectFlag]) {
          this[connectFlag] = true;

          if (connected) {
            connected.call(this);
          }
        }
      };
      /** @this {!HTMLElement} */


      base.prototype.disconnectedCallback = base.prototype['__shadydom_disconnectedCallback'] = function () {
        // if rendering, cancel a pending connection and queue disconnect,
        // otherwise disconnect only if a connection has been allowed
        if (isRendering) {
          // This is necessary only because calling removeChild
          // on a node that requires distribution leaves it in the DOM tree
          // until distribution.
          // NOTE: remember this is checking the patched isConnected to determine
          // if the node is in the logical tree.
          if (!this.isConnected) {
            connectMap.set(this, false);
          }
        } else if (this[connectFlag]) {
          this[connectFlag] = false;

          if (disconnected) {
            disconnected.call(this);
          }
        }
      };
    }

    return base;
  };

  const originalDefine = window['customElements']['define'];

  const define = function (name, constructor) {
    const connected = constructor.prototype.connectedCallback;
    const disconnected = constructor.prototype.disconnectedCallback;
    originalDefine.call(window['customElements'], name, ManageConnect(constructor, connected, disconnected)); // unpatch connected/disconnected on class; custom elements tears this off
    // so the patch is maintained, but if the user calls these methods for
    // e.g. testing, they will be as expected.

    constructor.prototype.connectedCallback = connected;
    constructor.prototype.disconnectedCallback = disconnected;
  }; // Note, it would be better to only patch the CustomElementRegistry.prototype,
  // but ShadyCSS patches define directly.


  window.customElements.define = define; // Still patch the registry directly since Safari 10 loses the patch
  // unless this is done.

  Object.defineProperty(window['CustomElementRegistry'].prototype, 'define', {
    value: define,
    configurable: true
  });
}
/** @return {!ShadyRoot|undefined} */


const ownerShadyRootForNode = node => {
  let root = node[SHADY_PREFIX + 'getRootNode']();

  if (utils_isShadyRoot(root)) {
    return root;
  }
};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/wrapper.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


/** @implements {IWrapper} */

class wrapper_Wrapper {
  /** @param {!Node} node */
  constructor(node) {
    this.node = node;
  } // node


  addEventListener(name, fn, options) {
    return this.node[SHADY_PREFIX + 'addEventListener'](name, fn, options);
  }

  removeEventListener(name, fn, options) {
    return this.node[SHADY_PREFIX + 'removeEventListener'](name, fn, options);
  }

  appendChild(node) {
    return this.node[SHADY_PREFIX + 'appendChild'](node);
  }

  insertBefore(node, ref_node) {
    return this.node[SHADY_PREFIX + 'insertBefore'](node, ref_node);
  }

  removeChild(node) {
    return this.node[SHADY_PREFIX + 'removeChild'](node);
  }

  replaceChild(node, ref_node) {
    return this.node[SHADY_PREFIX + 'replaceChild'](node, ref_node);
  }

  cloneNode(deep) {
    return this.node[SHADY_PREFIX + 'cloneNode'](deep);
  }

  getRootNode(options) {
    return this.node[SHADY_PREFIX + 'getRootNode'](options);
  }

  contains(node) {
    return this.node[SHADY_PREFIX + 'contains'](node);
  }

  dispatchEvent(event) {
    return this.node[SHADY_PREFIX + 'dispatchEvent'](event);
  } // element


  setAttribute(name, value) {
    this.node[SHADY_PREFIX + 'setAttribute'](name, value);
  } // NOTE: not needed, just here for balance


  getAttribute(name) {
    return this.node[NATIVE_PREFIX + 'getAttribute'](name);
  } // NOTE: not needed, just here for balance


  hasAttribute(name) {
    return this.node[NATIVE_PREFIX + 'hasAttribute'](name);
  }

  removeAttribute(name) {
    this.node[SHADY_PREFIX + 'removeAttribute'](name);
  }

  attachShadow(options) {
    return this.node[SHADY_PREFIX + 'attachShadow'](options);
  }
  /** @return {!Node|undefined} */


  get activeElement() {
    if (utils_isShadyRoot(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) {
      const e = this.node[SHADY_PREFIX + 'activeElement'];
      return e;
    }
  }
  /**
   * Installed for compatibility with browsers (older Chrome/Safari) that do
   * not have a configurable `activeElement` accessor. Enables noPatch and
   * patch mode both to consistently use ShadyDOM.wrap(document)._activeElement.
   * @override
   * @return {!Node|undefined}
   */


  get _activeElement() {
    return this.activeElement;
  } // NOTE: not needed, just here for balance

  /** @override */


  focus() {
    this.node[NATIVE_PREFIX + 'focus']();
  }

  blur() {
    this.node[SHADY_PREFIX + 'blur']();
  } // document


  importNode(node, deep) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) {
      return this.node[SHADY_PREFIX + 'importNode'](node, deep);
    }
  }

  getElementById(id) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) {
      return this.node[SHADY_PREFIX + 'getElementById'](id);
    }
  } // query


  querySelector(selector) {
    return this.node[SHADY_PREFIX + 'querySelector'](selector);
  }

  querySelectorAll(selector, useNative) {
    return this.node[SHADY_PREFIX + 'querySelectorAll'](selector, useNative);
  } // slot


  assignedNodes(options) {
    if (this.node.localName === 'slot') {
      return this.node[SHADY_PREFIX + 'assignedNodes'](options);
    }
  }

  get host() {
    if (utils_isShadyRoot(this.node)) {
      return (
        /** @type {!ShadowRoot} */
        this.node.host
      );
    }
  }

  get parentNode() {
    return this.node[SHADY_PREFIX + 'parentNode'];
  }

  get firstChild() {
    return this.node[SHADY_PREFIX + 'firstChild'];
  }

  get lastChild() {
    return this.node[SHADY_PREFIX + 'lastChild'];
  }

  get nextSibling() {
    return this.node[SHADY_PREFIX + 'nextSibling'];
  }

  get previousSibling() {
    return this.node[SHADY_PREFIX + 'previousSibling'];
  }

  get childNodes() {
    return this.node[SHADY_PREFIX + 'childNodes'];
  }

  get parentElement() {
    return this.node[SHADY_PREFIX + 'parentElement'];
  }

  get firstElementChild() {
    return this.node[SHADY_PREFIX + 'firstElementChild'];
  }

  get lastElementChild() {
    return this.node[SHADY_PREFIX + 'lastElementChild'];
  }

  get nextElementSibling() {
    return this.node[SHADY_PREFIX + 'nextElementSibling'];
  }

  get previousElementSibling() {
    return this.node[SHADY_PREFIX + 'previousElementSibling'];
  }

  get children() {
    return this.node[SHADY_PREFIX + 'children'];
  }

  get childElementCount() {
    return this.node[SHADY_PREFIX + 'childElementCount'];
  }

  get shadowRoot() {
    return this.node[SHADY_PREFIX + 'shadowRoot'];
  }

  get assignedSlot() {
    return this.node[SHADY_PREFIX + 'assignedSlot'];
  }

  get isConnected() {
    return this.node[SHADY_PREFIX + 'isConnected'];
  }

  get innerHTML() {
    return this.node[SHADY_PREFIX + 'innerHTML'];
  }

  set innerHTML(value) {
    this.node[SHADY_PREFIX + 'innerHTML'] = value;
  }

  get textContent() {
    return this.node[SHADY_PREFIX + 'textContent'];
  }

  set textContent(value) {
    this.node[SHADY_PREFIX + 'textContent'] = value;
  }

  get slot() {
    return this.node[SHADY_PREFIX + 'slot'];
  }

  set slot(value) {
    this.node[SHADY_PREFIX + 'slot'] = value;
  }

  get className() {
    return this.node[SHADY_PREFIX + 'className'];
  }

  set className(value) {
    return this.node[SHADY_PREFIX + 'className'] = value;
  }

}

eventPropertyNames.forEach(name => {
  Object.defineProperty(wrapper_Wrapper.prototype, name, {
    /** @this {Wrapper} */
    get() {
      return this.node[SHADY_PREFIX + name];
    },

    /** @this {Wrapper} */
    set(value) {
      this.node[SHADY_PREFIX + name] = value;
    },

    configurable: true
  });
});

const wrapperMap = new WeakMap();
function wrap(obj) {
  if (utils_isShadyRoot(obj) || obj instanceof wrapper_Wrapper) {
    return obj;
  }

  let wrapper = wrapperMap.get(obj);

  if (!wrapper) {
    wrapper = new wrapper_Wrapper(obj);
    wrapperMap.set(obj, wrapper);
  }

  return wrapper;
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/EventTarget.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



const EventTargetPatches = getOwnPropertyDescriptors({
  /** @this {Node} */
  dispatchEvent(event) {
    flush();
    return this[NATIVE_PREFIX + 'dispatchEvent'](event);
  },

  addEventListener: addEventListener,
  removeEventListener: removeEventListener
});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/Slotable.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


const SlotablePatches = getOwnPropertyDescriptors({
  /** @this {Node} */
  get assignedSlot() {
    // Force any parent's shadowRoot to flush so that distribution occurs
    // and this node has an assignedSlot.
    const parent = this[SHADY_PREFIX + 'parentNode'];
    const ownerRoot = parent && parent[SHADY_PREFIX + 'shadowRoot'];

    if (ownerRoot) {
      ownerRoot._render();
    }

    const nodeData = shadyDataForNode(this);
    return nodeData && nodeData.assignedSlot || null;
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/Element.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




const Element_doc = window.document;
/**
 * Should be called whenever an attribute changes. If the `slot` attribute
 * changes, provokes rendering if necessary. If a `<slot>` element's `name`
 * attribute changes, updates the root's slot map and renders.
 * @param {Node} node
 * @param {string} name
 */

function distributeAttributeChange(node, name) {
  if (name === 'slot') {
    const parent = node[SHADY_PREFIX + 'parentNode'];

    if (hasShadowRootWithSlot(parent)) {
      shadyDataForNode(parent).root._asyncRender();
    }
  } else if (node.localName === 'slot' && name === 'name') {
    let root = ownerShadyRootForNode(node);

    if (root) {
      root._updateSlotName(node);

      root._asyncRender();
    }
  }
}

const ElementPatches = getOwnPropertyDescriptors({
  /** @this {Element} */
  get previousElementSibling() {
    const nodeData = shadyDataForNode(this);

    if (nodeData && nodeData.previousSibling !== undefined) {
      let n = this[SHADY_PREFIX + 'previousSibling'];

      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n[SHADY_PREFIX + 'previousSibling'];
      }

      return n;
    } else {
      return this[NATIVE_PREFIX + 'previousElementSibling'];
    }
  },

  /** @this {Element} */
  get nextElementSibling() {
    const nodeData = shadyDataForNode(this);

    if (nodeData && nodeData.nextSibling !== undefined) {
      let n = this[SHADY_PREFIX + 'nextSibling'];

      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n[SHADY_PREFIX + 'nextSibling'];
      }

      return n;
    } else {
      return this[NATIVE_PREFIX + 'nextElementSibling'];
    }
  },

  /** @this {Element} */
  get slot() {
    return this.getAttribute('slot');
  },

  /** @this {Element} */
  set slot(value) {
    this[SHADY_PREFIX + 'setAttribute']('slot', value);
  },

  // Note: Can be patched on element prototype on all browsers.
  // Must be patched on instance on browsers that support native Shadow DOM
  // but do not have builtin accessors (old Chrome).

  /** @this {Element} */
  get shadowRoot() {
    const nodeData = shadyDataForNode(this);
    return nodeData && nodeData.publicRoot || null;
  },

  /** @this {Element} */
  get className() {
    return this.getAttribute('class') || '';
  },

  /**
   * @this {Element}
   * @param {string} value
   */
  set className(value) {
    this[SHADY_PREFIX + 'setAttribute']('class', value);
  },

  /**
   * @this {Element}
   * @param {string} attr
   * @param {string} value
   */
  setAttribute(attr, value) {
    if (this.ownerDocument !== Element_doc) {
      this[NATIVE_PREFIX + 'setAttribute'](attr, value);
    } else if (!scopeClassAttribute(this, attr, value)) {
      this[NATIVE_PREFIX + 'setAttribute'](attr, value);
      distributeAttributeChange(this, attr);
    }
  },

  /**
   * @this {Element}
   * @param {string} attr
   */
  removeAttribute(attr) {
    this[NATIVE_PREFIX + 'removeAttribute'](attr);
    distributeAttributeChange(this, attr);
  },

  /**
   * @this {Element}
   * @param {!{mode: string}} options
   */
  attachShadow(options) {
    return attachShadow(this, options);
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/HTMLElement.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



const HTMLElementPatches = getOwnPropertyDescriptors({
  /** @this {HTMLElement} */
  blur() {
    const nodeData = shadyDataForNode(this);
    let root = nodeData && nodeData.root;
    let shadowActive = root && root.activeElement;

    if (shadowActive) {
      shadowActive[SHADY_PREFIX + 'blur']();
    } else {
      this[NATIVE_PREFIX + 'blur']();
    }
  }

});
eventPropertyNames.forEach(property => {
  HTMLElementPatches[property] = {
    /** @this {HTMLElement} */
    set: function (fn) {
      const shadyData = ensureShadyDataForNode(this);
      const eventName = property.substring(2);

      if (!shadyData.__onCallbackListeners) {
        shadyData.__onCallbackListeners = {};
      }

      shadyData.__onCallbackListeners[property] && this.removeEventListener(eventName, shadyData.__onCallbackListeners[property]);
      this[SHADY_PREFIX + 'addEventListener'](eventName, fn);
      shadyData.__onCallbackListeners[property] = fn;
    },

    /** @this {HTMLElement} */
    get() {
      const shadyData = shadyDataForNode(this);
      return shadyData && shadyData.__onCallbackListeners && shadyData.__onCallbackListeners[property];
    },

    configurable: true
  };
});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/Slot.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



const SlotPatches = getOwnPropertyDescriptors({
  /**
   * @this {HTMLSlotElement}
   * @param {Object=} options
   */
  assignedNodes(options) {
    if (this.localName === 'slot') {
      // Force any containing shadowRoot to flush so that distribution occurs
      // and this node has assignedNodes.
      const root = this[SHADY_PREFIX + 'getRootNode']();

      if (root && utils_isShadyRoot(root)) {
        root._render();
      }

      const nodeData = shadyDataForNode(this);
      return nodeData ? (options && options.flatten ? nodeData.flattenedNodes : nodeData.assignedNodes) || [] : [];
    }
  },

  /**
   * @this {HTMLSlotElement}
   * @param {string} type
   * @param {Function} fn
   * @param {Object|boolean=} optionsOrCapture
   */
  addEventListener(type, fn, optionsOrCapture) {
    // NOTE, check if this is a `slot` because these patches are installed on
    // Element where browsers don't have `<slot>`
    if (this.localName !== 'slot' || type === 'slotchange') {
      addEventListener.call(this, type, fn, optionsOrCapture);
    } else {
      if (typeof optionsOrCapture !== 'object') {
        optionsOrCapture = {
          capture: Boolean(optionsOrCapture)
        };
      }

      const parent = this[SHADY_PREFIX + 'parentNode'];

      if (!parent) {
        throw new Error('ShadyDOM cannot attach event to slot unless it has a `parentNode`');
      }

      optionsOrCapture.__shadyTarget = this;
      parent[SHADY_PREFIX + 'addEventListener'](type, fn, optionsOrCapture);
    }
  },

  /**
   * @this {HTMLSlotElement}
   * @param {string} type
   * @param {Function} fn
   * @param {Object|boolean=} optionsOrCapture
   */
  removeEventListener(type, fn, optionsOrCapture) {
    // NOTE, check if this is a `slot` because these patches are installed on
    // Element where browsers don't have `<slot>`
    if (this.localName !== 'slot' || type === 'slotchange') {
      removeEventListener.call(this, type, fn, optionsOrCapture);
    } else {
      if (typeof optionsOrCapture !== 'object') {
        optionsOrCapture = {
          capture: Boolean(optionsOrCapture)
        };
      }

      const parent = this[SHADY_PREFIX + 'parentNode'];

      if (!parent) {
        throw new Error('ShadyDOM cannot attach event to slot unless it has a `parentNode`');
      }

      optionsOrCapture.__shadyTarget = this;
      parent[SHADY_PREFIX + 'removeEventListener'](type, fn, optionsOrCapture);
    }
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/Document.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const Document_doc = window.document;
const DocumentPatches = getOwnPropertyDescriptors({
  // note: Though not technically correct, we fast path `importNode`
  // when called on a node not owned by the main document.
  // This allows, for example, elements that cannot
  // contain custom elements and are therefore not likely to contain shadowRoots
  // to cloned natively. This is a fairly significant performance win.

  /**
   * @this {Document}
   * @param {Node} node
   * @param {boolean} deep
   */
  importNode(node, deep) {
    // A template element normally has no children with shadowRoots, so make
    // sure we always make a deep copy to correctly construct the template.content
    if (node.ownerDocument !== Document_doc || node.localName === 'template') {
      return this[NATIVE_PREFIX + 'importNode'](node, deep);
    }

    let n = this[NATIVE_PREFIX + 'importNode'](node, false);

    if (deep) {
      for (let c = node[SHADY_PREFIX + 'firstChild'], nc; c; c = c[SHADY_PREFIX + 'nextSibling']) {
        nc = this[SHADY_PREFIX + 'importNode'](c, true);
        n[SHADY_PREFIX + 'appendChild'](nc);
      }
    }

    return n;
  }

});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patches/Window.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


const WindowPatches = getOwnPropertyDescriptors({
  // NOTE: ensure these methods are bound to `window` so that `this` is correct
  // when called directly from global context without a receiver; e.g.
  // `addEventListener(...)`.
  addEventListener: addEventListener.bind(window),
  removeEventListener: removeEventListener.bind(window)
});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/patch-prototypes.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/












 // Some browsers (IE/Edge) have non-standard HTMLElement accessors.

const NonStandardHTMLElement = {};

if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'parentElement')) {
  NonStandardHTMLElement.parentElement = NodePatches.parentElement;
}

if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'contains')) {
  NonStandardHTMLElement.contains = NodePatches.contains;
}

if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'children')) {
  NonStandardHTMLElement.children = ParentNodePatches.children;
}

if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML')) {
  NonStandardHTMLElement.innerHTML = ElementOrShadowRootPatches.innerHTML;
}

if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'className')) {
  NonStandardHTMLElement.className = ElementPatches.className;
} // Avoid patching `innerHTML` if it does not exist on Element (IE)
// and we can patch accessors (hasDescriptors).


const ElementShouldHaveInnerHTML = !settings.hasDescriptors || 'innerHTML' in Element.prototype; // setup patching

const patchMap = {
  EventTarget: [EventTargetPatches],
  Node: [NodePatches, !window.EventTarget ? EventTargetPatches : null],
  Text: [SlotablePatches],
  Element: [ElementPatches, ParentNodePatches, SlotablePatches, ElementShouldHaveInnerHTML ? ElementOrShadowRootPatches : null, !window.HTMLSlotElement ? SlotPatches : null],
  HTMLElement: [HTMLElementPatches, NonStandardHTMLElement],
  HTMLSlotElement: [SlotPatches],
  DocumentFragment: [ParentNodeDocumentOrFragmentPatches, DocumentOrFragmentPatches],
  Document: [DocumentPatches, ParentNodeDocumentOrFragmentPatches, DocumentOrFragmentPatches, DocumentOrShadowRootPatches],
  Window: [WindowPatches]
};

const getPatchPrototype = name => window[name] && window[name].prototype; // Note, must avoid patching accessors on prototypes when descriptors are not correct
// because the CustomElements polyfill checks if these exist before patching instances.
// CustomElements polyfill *only* cares about these accessors.


const disallowedNativePatches = settings.hasDescriptors ? null : ['innerHTML', 'textContent'];
/** @param {string=} prefix */

const applyPatches = prefix => {
  const disallowed = prefix ? null : disallowedNativePatches;

  for (let p in patchMap) {
    const proto = getPatchPrototype(p);
    patchMap[p].forEach(patch => proto && patch && patchProperties(proto, patch, prefix, disallowed));
  }
};
const addShadyPrefixedProperties = () => {
  // perform shady patches
  applyPatches(SHADY_PREFIX); // install `_activeElement` because some browsers (older Chrome/Safari) do not have
  // a 'configurable' `activeElement` accesssor.

  const descriptor = DocumentOrShadowRootPatches.activeElement;
  Object.defineProperty(document, '_activeElement', descriptor); // On Window, we're patching `addEventListener` which is a weird auto-bound
  // property that is not directly on the Window prototype.

  patchProperties(Window.prototype, WindowPatches, SHADY_PREFIX);
};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadydom/src/shadydom.js
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Patches elements that interacts with ShadyDOM
 * such that tree traversal and mutation apis act like they would under
 * ShadowDOM.
 *
 * This import enables seemless interaction with ShadyDOM powered
 * custom elements, enabling better interoperation with 3rd party code,
 * libraries, and frameworks that use DOM tree manipulation apis.
 */










if (settings.inUse) {
  let ShadyDOM = {
    // TODO(sorvell): remove when Polymer does not depend on this.
    'inUse': settings.inUse,
    // NOTE: old browsers without prototype accessors (very old Chrome
    // and Safari) need manually patched accessors to properly set
    // `innerHTML` and `textContent` when an element is:
    // (1) inside a shadowRoot
    // (2) does not have special (slot) children itself
    // (3) and setting the property needs to provoke distribution (because
    // a nested slot is added/removed)
    'patch': node => {
      patchInsideElementAccessors(node);
      patchOutsideElementAccessors(node);
      return node;
    },
    'isShadyRoot': utils_isShadyRoot,
    'enqueue': enqueue,
    'flush': flush,
    'flushInitial': root => {
      root._flushInitial();
    },
    'settings': settings,
    'filterMutations': filterMutations,
    'observeChildren': observeChildren,
    'unobserveChildren': unobserveChildren,
    // Set to true to defer native custom elements connection until the
    // document has fully parsed. This enables custom elements that create
    // shadowRoots to be defined while the document is loading. Elements
    // customized as they are created by the parser will successfully
    // render with this flag on.
    'deferConnectionCallbacks': settings['deferConnectionCallbacks'],
    // Set to true to speed up the polyfill slightly at the cost of correctness
    // * does not patch querySelector/All on Document or DocumentFragment
    // * does not wrap connected/disconnected callbacks to de-dup these
    // when using native customElements
    // * does not wait to process children of elements with shadowRoots
    // meaning shadowRoots should not be created while an element is parsing
    // (e.g. if a custom element that creates a shadowRoot is defined before
    // a candidate element in the document below it.
    'preferPerformance': settings['preferPerformance'],
    // Integration point with ShadyCSS to disable styling MutationObserver,
    // as ShadyDOM will now handle dynamic scoping.
    'handlesDynamicScoping': true,
    'wrap': settings.noPatch ? wrap : n => n,
    'Wrapper': wrapper_Wrapper,
    'composedPath': patch_events_composedPath,
    // Set to true to avoid patching regular platform property names. When set,
    // Shadow DOM compatible behavior is only available when accessing DOM
    // API using `ShadyDOM.wrap`, e.g. `ShadyDOM.wrap(element).shadowRoot`.
    // This setting provides a small performance boost, but requires all DOM API
    // access that requires Shadow DOM behavior to be proxied via `ShadyDOM.wrap`.
    'noPatch': settings.noPatch,
    'nativeMethods': nativeMethods,
    'nativeTree': nativeTree
  };
  window['ShadyDOM'] = ShadyDOM; // Modifies native prototypes for Node, Element, etc. to
  // make native platform behavior available at prefixed names, e.g.
  // `utils.NATIVE_PREFIX + 'firstChild'` or `__shady_native_firstChild`.
  // This allows the standard names to be safely patched while retaining the
  // ability for native behavior to be used. This polyfill manipulates DOM
  // by using this saved native behavior.
  // Note, some browsers do not have proper element descriptors for
  // accessors; in this case, native behavior for these accessors is simulated
  // via a TreeWalker.

  addNativePrefixedProperties(); // Modifies native prototypes for Node, Element, etc. to make ShadowDOM
  // behavior available at prefixed names, e.g.
  // `utils.SHADY_PREFIX + 'firstChild` or `__shady_firstChild`. This is done
  // so this polyfill can perform Shadow DOM style DOM manipulation.
  // Because patching normal platform property names is optional, these prefixed
  // names are used internally.

  addShadyPrefixedProperties(); // Modifies native prototypes for Node, Element, etc. to patch
  // regular platform property names to have Shadow DOM compatible API behavior.
  // This applies the utils.SHADY_PREFIX behavior to normal names. For example,
  // if `noPatch` is not set, then `el.__shady_firstChild` is equivalent to
  // `el.firstChild`.
  // NOTE, on older browsers (old Chrome/Safari) native accessors cannot be
  // patched on prototypes (e.g. Node.prototype.firstChild cannot be modified).
  // On these browsers, instance level patching is performed where needed; this
  // instance patching is only done when `noPatch` is *not* set.

  if (!settings.noPatch) {
    applyPatches(); // Patch click event behavior only if we're patching

    patchClick();
  } // For simplicity, patch events unconditionally.
  // Patches the event system to have Shadow DOM compatible behavior (e.g.
  // event retargeting). When `noPatch` is set, retargeting is only available
  // when adding event listeners and dispatching events via `ShadyDOM.wrap`
  // (e.g. `ShadyDOM.wrap(element).addEventListener(...)`).


  patchEvents();
  window.ShadowRoot =
  /** @type {function(new:ShadowRoot)} */
  attach_shadow_ShadyRoot;
}

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/css-parse.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
Extremely simple css parser. Intended to be not more than what we need
and definitely not necessarily correct =).
*/

/** @unrestricted */

class StyleNode {
  constructor() {
    /** @type {number} */
    this['start'] = 0;
    /** @type {number} */

    this['end'] = 0;
    /** @type {StyleNode} */

    this['previous'] = null;
    /** @type {StyleNode} */

    this['parent'] = null;
    /** @type {Array<StyleNode>} */

    this['rules'] = null;
    /** @type {string} */

    this['parsedCssText'] = '';
    /** @type {string} */

    this['cssText'] = '';
    /** @type {boolean} */

    this['atRule'] = false;
    /** @type {number} */

    this['type'] = 0;
    /** @type {string} */

    this['keyframesName'] = '';
    /** @type {string} */

    this['selector'] = '';
    /** @type {string} */

    this['parsedSelector'] = '';
  }

}

 // given a string of css, return a simple rule tree

/**
 * @param {string} text
 * @return {StyleNode}
 */

function parse(text) {
  text = clean(text);
  return parseCss(lex(text), text);
} // remove stuff we don't care about that may hinder parsing

/**
 * @param {string} cssText
 * @return {string}
 */

function clean(cssText) {
  return cssText.replace(RX.comments, '').replace(RX.port, '');
} // super simple {...} lexer that returns a node tree

/**
 * @param {string} text
 * @return {StyleNode}
 */


function lex(text) {
  let root = new StyleNode();
  root['start'] = 0;
  root['end'] = text.length;
  let n = root;

  for (let i = 0, l = text.length; i < l; i++) {
    if (text[i] === OPEN_BRACE) {
      if (!n['rules']) {
        n['rules'] = [];
      }

      let p = n;
      let previous = p['rules'][p['rules'].length - 1] || null;
      n = new StyleNode();
      n['start'] = i + 1;
      n['parent'] = p;
      n['previous'] = previous;
      p['rules'].push(n);
    } else if (text[i] === CLOSE_BRACE) {
      n['end'] = i + 1;
      n = n['parent'] || root;
    }
  }

  return root;
} // add selectors/cssText to node tree

/**
 * @param {StyleNode} node
 * @param {string} text
 * @return {StyleNode}
 */


function parseCss(node, text) {
  let t = text.substring(node['start'], node['end'] - 1);
  node['parsedCssText'] = node['cssText'] = t.trim();

  if (node['parent']) {
    let ss = node['previous'] ? node['previous']['end'] : node['parent']['start'];
    t = text.substring(ss, node['start'] - 1);
    t = _expandUnicodeEscapes(t);
    t = t.replace(RX.multipleSpaces, ' '); // TODO(sorvell): ad hoc; make selector include only after last ;
    // helps with mixin syntax

    t = t.substring(t.lastIndexOf(';') + 1);
    let s = node['parsedSelector'] = node['selector'] = t.trim();
    node['atRule'] = s.indexOf(AT_START) === 0; // note, support a subset of rule types...

    if (node['atRule']) {
      if (s.indexOf(MEDIA_START) === 0) {
        node['type'] = types.MEDIA_RULE;
      } else if (s.match(RX.keyframesRule)) {
        node['type'] = types.KEYFRAMES_RULE;
        node['keyframesName'] = node['selector'].split(RX.multipleSpaces).pop();
      }
    } else {
      if (s.indexOf(VAR_START) === 0) {
        node['type'] = types.MIXIN_RULE;
      } else {
        node['type'] = types.STYLE_RULE;
      }
    }
  }

  let r$ = node['rules'];

  if (r$) {
    for (let i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
      parseCss(r, text);
    }
  }

  return node;
}
/**
 * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
 * expanded form that doesn't require trailing space `\000033`
 * @param {string} s
 * @return {string}
 */


function _expandUnicodeEscapes(s) {
  return s.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
    let code = arguments[1],
        repeat = 6 - code.length;

    while (repeat--) {
      code = '0' + code;
    }

    return '\\' + code;
  });
}
/**
 * stringify parsed css.
 * @param {StyleNode} node
 * @param {boolean=} preserveProperties
 * @param {string=} text
 * @return {string}
 */


function stringify(node, preserveProperties, text = '') {
  // calc rule cssText
  let cssText = '';

  if (node['cssText'] || node['rules']) {
    let r$ = node['rules'];

    if (r$ && !_hasMixinRules(r$)) {
      for (let i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
        cssText = stringify(r, preserveProperties, cssText);
      }
    } else {
      cssText = preserveProperties ? node['cssText'] : removeCustomProps(node['cssText']);
      cssText = cssText.trim();

      if (cssText) {
        cssText = '  ' + cssText + '\n';
      }
    }
  } // emit rule if there is cssText


  if (cssText) {
    if (node['selector']) {
      text += node['selector'] + ' ' + OPEN_BRACE + '\n';
    }

    text += cssText;

    if (node['selector']) {
      text += CLOSE_BRACE + '\n\n';
    }
  }

  return text;
}
/**
 * @param {Array<StyleNode>} rules
 * @return {boolean}
 */

function _hasMixinRules(rules) {
  let r = rules[0];
  return Boolean(r) && Boolean(r['selector']) && r['selector'].indexOf(VAR_START) === 0;
}
/**
 * @param {string} cssText
 * @return {string}
 */


function removeCustomProps(cssText) {
  cssText = removeCustomPropAssignment(cssText);
  return removeCustomPropApply(cssText);
}
/**
 * @param {string} cssText
 * @return {string}
 */


function removeCustomPropAssignment(cssText) {
  return cssText.replace(RX.customProp, '').replace(RX.mixinProp, '');
}
/**
 * @param {string} cssText
 * @return {string}
 */

function removeCustomPropApply(cssText) {
  return cssText.replace(RX.mixinApply, '').replace(RX.varApply, '');
}
/** @enum {number} */


const types = {
  STYLE_RULE: 1,
  KEYFRAMES_RULE: 7,
  MEDIA_RULE: 4,
  MIXIN_RULE: 1000
};
const OPEN_BRACE = '{';
const CLOSE_BRACE = '}'; // helper regexp's

const RX = {
  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
  port: /@import[^;]*;/gim,
  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
  keyframesRule: /^@[^\s]*keyframes/,
  multipleSpaces: /\s+/g
};
const VAR_START = '--';
const MEDIA_START = '@media';
const AT_START = '@';
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/style-settings.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


const nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
let nativeCssVariables_;
/**
 * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
 */

function calcCssVariables(settings) {
  if (settings && settings['shimcssproperties']) {
    nativeCssVariables_ = false;
  } else {
    // chrome 49 has semi-working css vars, check if box-shadow works
    // safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
    // However, shim css custom properties are only supported with ShadyDOM enabled,
    // so fall back on native if we do not detect ShadyDOM
    // Edge 15: custom properties used in ::before and ::after will also be used in the parent element
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
    nativeCssVariables_ = nativeShadow || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));
  }
}
/** @type {string | undefined} */


let style_settings_cssBuild;

if (window.ShadyCSS && window.ShadyCSS.cssBuild !== undefined) {
  style_settings_cssBuild = window.ShadyCSS.cssBuild;
}
/** @type {boolean} */


const disableRuntime = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);

if (window.ShadyCSS && window.ShadyCSS.nativeCss !== undefined) {
  nativeCssVariables_ = window.ShadyCSS.nativeCss;
} else if (window.ShadyCSS) {
  calcCssVariables(window.ShadyCSS); // reset window variable to let ShadyCSS API take its place

  window.ShadyCSS = undefined;
} else {
  calcCssVariables(window['WebComponents'] && window['WebComponents']['flags']);
} // Hack for type error under new type inference which doesn't like that
// nativeCssVariables is updated in a function and assigns the type
// `function(): ?` instead of `boolean`.


const nativeCssVariables =
/** @type {boolean} */
nativeCssVariables_;
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/common-regex.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
const MIXIN_MATCH = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
const VAR_CONSUMED = /(--[\w-]+)\s*([:,;)]|$)/gi;
const ANIMATION_MATCH = /(animation\s*:)|(animation-name\s*:)/;
const MEDIA_MATCH = /@media\s(.*)/;
const IS_VAR = /^--/;
const BRACKETED = /\{[^}]*\}/g;
const HOST_PREFIX = '(?:^|[^.#[:])';
const HOST_SUFFIX = '($|[.:[\\s>+~])';
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/unscoped-style-handler.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/** @type {!Set<string>} */

const styleTextSet = new Set();
const scopingAttribute = 'shady-unscoped';
/**
 * Add a specifically-marked style to the document directly, and only one copy of that style.
 *
 * @param {!HTMLStyleElement} style
 * @return {undefined}
 */

function processUnscopedStyle(style) {
  const text = style.textContent;

  if (!styleTextSet.has(text)) {
    styleTextSet.add(text);
    const newStyle = style.cloneNode(true);
    document.head.appendChild(newStyle);
  }
}
/**
 * Check if a style is supposed to be unscoped
 * @param {!HTMLStyleElement} style
 * @return {boolean} true if the style has the unscoping attribute
 */

function isUnscopedStyle(style) {
  return style.hasAttribute(scopingAttribute);
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/style-util.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars



/**
 * @param {string|StyleNode} rules
 * @param {function(StyleNode)=} callback
 * @return {string}
 */

function toCssText(rules, callback) {
  if (!rules) {
    return '';
  }

  if (typeof rules === 'string') {
    rules = parse(rules);
  }

  if (callback) {
    forEachRule(rules, callback);
  }

  return stringify(rules, nativeCssVariables);
}
/**
 * @param {HTMLStyleElement} style
 * @return {StyleNode}
 */

function rulesForStyle(style) {
  if (!style['__cssRules'] && style.textContent) {
    style['__cssRules'] = parse(style.textContent);
  }

  return style['__cssRules'] || null;
} // Tests if a rule is a keyframes selector, which looks almost exactly
// like a normal selector but is not (it has nothing to do with scoping
// for example).

/**
 * @param {StyleNode} rule
 * @return {boolean}
 */

function isKeyframesSelector(rule) {
  return Boolean(rule['parent']) && rule['parent']['type'] === types.KEYFRAMES_RULE;
}
/**
 * @param {StyleNode} node
 * @param {Function=} styleRuleCallback
 * @param {Function=} keyframesRuleCallback
 * @param {boolean=} onlyActiveRules
 */

function forEachRule(node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
  if (!node) {
    return;
  }

  let skipRules = false;
  let type = node['type'];

  if (onlyActiveRules) {
    if (type === types.MEDIA_RULE) {
      let matchMedia = node['selector'].match(MEDIA_MATCH);

      if (matchMedia) {
        // if rule is a non matching @media rule, skip subrules
        if (!window.matchMedia(matchMedia[1]).matches) {
          skipRules = true;
        }
      }
    }
  }

  if (type === types.STYLE_RULE) {
    styleRuleCallback(node);
  } else if (keyframesRuleCallback && type === types.KEYFRAMES_RULE) {
    keyframesRuleCallback(node);
  } else if (type === types.MIXIN_RULE) {
    skipRules = true;
  }

  let r$ = node['rules'];

  if (r$ && !skipRules) {
    for (let i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
      forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
    }
  }
} // add a string of cssText to the document.

/**
 * @param {string} cssText
 * @param {string} moniker
 * @param {Node} target
 * @param {Node} contextNode
 * @return {HTMLStyleElement}
 */

function applyCss(cssText, moniker, target, contextNode) {
  let style = createScopeStyle(cssText, moniker);
  applyStyle(style, target, contextNode);
  return style;
}
/**
 * @param {string} cssText
 * @param {string} moniker
 * @return {HTMLStyleElement}
 */

function createScopeStyle(cssText, moniker) {
  let style =
  /** @type {HTMLStyleElement} */
  document.createElement('style');

  if (moniker) {
    style.setAttribute('scope', moniker);
  }

  style.textContent = cssText;
  return style;
}
/**
 * Track the position of the last added style for placing placeholders
 * @type {Node}
 */

let lastHeadApplyNode = null; // insert a comment node as a styling position placeholder.

/**
 * @param {string} moniker
 * @return {!Comment}
 */

function applyStylePlaceHolder(moniker) {
  let placeHolder = document.createComment(' Shady DOM styles for ' + moniker + ' ');
  let after = lastHeadApplyNode ? lastHeadApplyNode['nextSibling'] : null;
  let scope = document.head;
  scope.insertBefore(placeHolder, after || scope.firstChild);
  lastHeadApplyNode = placeHolder;
  return placeHolder;
}
/**
 * @param {HTMLStyleElement} style
 * @param {?Node} target
 * @param {?Node} contextNode
 */

function applyStyle(style, target, contextNode) {
  target = target || document.head;
  let after = contextNode && contextNode.nextSibling || target.firstChild;
  target.insertBefore(style, after);

  if (!lastHeadApplyNode) {
    lastHeadApplyNode = style;
  } else {
    // only update lastHeadApplyNode if the new style is inserted after the old lastHeadApplyNode
    let position = style.compareDocumentPosition(lastHeadApplyNode);

    if (position === Node.DOCUMENT_POSITION_PRECEDING) {
      lastHeadApplyNode = style;
    }
  }
}
/**
 * @param {string} buildType
 * @return {boolean}
 */

function isTargetedBuild(buildType) {
  return nativeShadow ? buildType === 'shadow' : buildType === 'shady';
}
/**
 * Walk from text[start] matching parens and
 * returns position of the outer end paren
 * @param {string} text
 * @param {number} start
 * @return {number}
 */

function findMatchingParen(text, start) {
  let level = 0;

  for (let i = start, l = text.length; i < l; i++) {
    if (text[i] === '(') {
      level++;
    } else if (text[i] === ')') {
      if (--level === 0) {
        return i;
      }
    }
  }

  return -1;
}
/**
 * @param {string} str
 * @param {function(string, string, string, string)} callback
 */

function processVariableAndFallback(str, callback) {
  // find 'var('
  let start = str.indexOf('var(');

  if (start === -1) {
    // no var?, everything is prefix
    return callback(str, '', '', '');
  } //${prefix}var(${inner})${suffix}


  let end = findMatchingParen(str, start + 3);
  let inner = str.substring(start + 4, end);
  let prefix = str.substring(0, start); // suffix may have other variables

  let suffix = processVariableAndFallback(str.substring(end + 1), callback);
  let comma = inner.indexOf(','); // value and fallback args should be trimmed to match in property lookup

  if (comma === -1) {
    // variable, no fallback
    return callback(prefix, inner.trim(), '', suffix);
  } // var(${value},${fallback})


  let value = inner.substring(0, comma).trim();
  let fallback = inner.substring(comma + 1).trim();
  return callback(prefix, value, fallback, suffix);
}
/**
 * @param {Element} element
 * @param {string} value
 */

function setElementClassRaw(element, value) {
  // use native setAttribute provided by ShadyDOM when setAttribute is patched
  if (nativeShadow) {
    element.setAttribute('class', value);
  } else {
    window['ShadyDOM']['nativeMethods']['setAttribute'].call(element, 'class', value);
  }
}
/**
 * @type {function(*):*}
 */

const wrap = window['ShadyDOM'] && window['ShadyDOM']['wrap'] || (node => node);
/**
 * @param {Element | {is: string, extends: string}} element
 * @return {{is: string, typeExtension: string}}
 */

function getIsExtends(element) {
  let localName = element['localName'];
  let is = '',
      typeExtension = '';
  /*
  NOTE: technically, this can be wrong for certain svg elements
  with `-` in the name like `<font-face>`
  */

  if (localName) {
    if (localName.indexOf('-') > -1) {
      is = localName;
    } else {
      typeExtension = localName;
      is = element.getAttribute && element.getAttribute('is') || '';
    }
  } else {
    is =
    /** @type {?} */
    element.is;
    typeExtension =
    /** @type {?} */
    element.extends;
  }

  return {
    is,
    typeExtension
  };
}
/**
 * @param {Element|DocumentFragment} element
 * @return {string}
 */

function gatherStyleText(element) {
  /** @type {!Array<string>} */
  const styleTextParts = [];
  const styles =
  /** @type {!NodeList<!HTMLStyleElement>} */
  element.querySelectorAll('style');

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];

    if (isUnscopedStyle(style)) {
      if (!nativeShadow) {
        processUnscopedStyle(style);
        style.parentNode.removeChild(style);
      }
    } else {
      styleTextParts.push(style.textContent);
      style.parentNode.removeChild(style);
    }
  }

  return styleTextParts.join('').trim();
}
/**
 * Split a selector separated by commas into an array in a smart way
 * @param {string} selector
 * @return {!Array<string>}
 */

function splitSelectorList(selector) {
  const parts = [];
  let part = '';

  for (let i = 0; i >= 0 && i < selector.length; i++) {
    // A selector with parentheses will be one complete part
    if (selector[i] === '(') {
      // find the matching paren
      const end = findMatchingParen(selector, i); // push the paren block into the part

      part += selector.slice(i, end + 1); // move the index to after the paren block

      i = end;
    } else if (selector[i] === ',') {
      parts.push(part);
      part = '';
    } else {
      part += selector[i];
    }
  } // catch any pieces after the last comma


  if (part) {
    parts.push(part);
  }

  return parts;
}
const CSS_BUILD_ATTR = 'css-build';
/**
 * Return the polymer-css-build "build type" applied to this element
 *
 * @param {!HTMLElement} element
 * @return {string} Can be "", "shady", or "shadow"
 */

function getCssBuild(element) {
  if (style_settings_cssBuild !== undefined) {
    return (
      /** @type {string} */
      style_settings_cssBuild
    );
  }

  if (element.__cssBuild === undefined) {
    // try attribute first, as it is the common case
    const attrValue = element.getAttribute(CSS_BUILD_ATTR);

    if (attrValue) {
      element.__cssBuild = attrValue;
    } else {
      const buildComment = getBuildComment(element);

      if (buildComment !== '') {
        // remove build comment so it is not needlessly copied into every element instance
        removeBuildComment(element);
      }

      element.__cssBuild = buildComment;
    }
  }

  return element.__cssBuild || '';
}
/**
 * Check if the given element, either a <template> or <style>, has been processed
 * by polymer-css-build.
 *
 * If so, then we can make a number of optimizations:
 * - polymer-css-build will decompose mixins into individual CSS Custom Properties,
 * so the ApplyShim can be skipped entirely.
 * - Under native ShadowDOM, the style text can just be copied into each instance
 * without modification
 * - If the build is "shady" and ShadyDOM is in use, the styling does not need
 * scoping beyond the shimming of CSS Custom Properties
 *
 * @param {!HTMLElement} element
 * @return {boolean}
 */

function elementHasBuiltCss(element) {
  return getCssBuild(element) !== '';
}
/**
 * For templates made with tagged template literals, polymer-css-build will
 * insert a comment of the form `<!--css-build:shadow-->`
 *
 * @param {!HTMLElement} element
 * @return {string}
 */

function getBuildComment(element) {
  const buildComment = element.localName === 'template' ?
  /** @type {!HTMLTemplateElement} */
  element.content.firstChild : element.firstChild;

  if (buildComment instanceof Comment) {
    const commentParts = buildComment.textContent.trim().split(':');

    if (commentParts[0] === CSS_BUILD_ATTR) {
      return commentParts[1];
    }
  }

  return '';
}
/**
 * Check if the css build status is optimal, and do no unneeded work.
 *
 * @param {string=} cssBuild CSS build status
 * @return {boolean} css build is optimal or not
 */

function isOptimalCssBuild(cssBuild = '') {
  // CSS custom property shim always requires work
  if (cssBuild === '' || !nativeCssVariables) {
    return false;
  }

  return nativeShadow ? cssBuild === 'shadow' : cssBuild === 'shady';
}
/**
 * @param {!HTMLElement} element
 */

function removeBuildComment(element) {
  const buildComment = element.localName === 'template' ?
  /** @type {!HTMLTemplateElement} */
  element.content.firstChild : element.firstChild;
  buildComment.parentNode.removeChild(buildComment);
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/style-transformer.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


 // eslint-disable-line no-unused-vars



/* Transforms ShadowDOM styling into ShadyDOM styling

* scoping:

  * elements in scope get scoping selector class="x-foo-scope"
  * selectors re-written as follows:

    div button -> div.x-foo-scope button.x-foo-scope

* :host -> scopeName

* :host(...) -> scopeName...

* ::slotted(...) -> scopeName > ...

* ...:dir(ltr|rtl) -> [dir="ltr|rtl"] ..., ...[dir="ltr|rtl"]

* :host(:dir[rtl]) -> scopeName:dir(rtl) -> [dir="rtl"] scopeName, scopeName[dir="rtl"]

*/

const SCOPE_NAME = 'style-scope';

class style_transformer_StyleTransformer {
  get SCOPE_NAME() {
    return SCOPE_NAME;
  }
  /**
   * Given a node and scope name, add a scoping class to each node
   * in the tree. This facilitates transforming css into scoped rules.
   * @param {!Node} node
   * @param {string} scope
   * @param {boolean=} shouldRemoveScope
   * @deprecated
   */


  dom(node, scope, shouldRemoveScope) {
    const fn = node => {
      this.element(node, scope || '', shouldRemoveScope);
    };

    this._transformDom(node, fn);
  }
  /**
   * Given a node and scope name, add a scoping class to each node in the tree.
   * @param {!Node} node
   * @param {string} scope
   */


  domAddScope(node, scope) {
    const fn = node => {
      this.element(node, scope || '');
    };

    this._transformDom(node, fn);
  }
  /**
   * @param {!Node} startNode
   * @param {!function(!Node)} transformer
   */


  _transformDom(startNode, transformer) {
    if (startNode.nodeType === Node.ELEMENT_NODE) {
      transformer(startNode);
    }

    let c$;

    if (startNode.localName === 'template') {
      const template =
      /** @type {!HTMLTemplateElement} */
      startNode; // In case the template is in svg context, fall back to the node
      // since it won't be an HTMLTemplateElement with a .content property

      c$ = (template.content || template._content || template).childNodes;
    } else {
      c$ =
      /** @type {!ParentNode} */
      startNode.children || startNode.childNodes;
    }

    if (c$) {
      for (let i = 0; i < c$.length; i++) {
        this._transformDom(c$[i], transformer);
      }
    }
  }
  /**
   * @param {?} element
   * @param {?} scope
   * @param {?=} shouldRemoveScope
   */


  element(element, scope, shouldRemoveScope) {
    // note: if using classes, we add both the general 'style-scope' class
    // as well as the specific scope. This enables easy filtering of all
    // `style-scope` elements
    if (scope) {
      // note: svg on IE does not have classList so fallback to class
      if (element.classList) {
        if (shouldRemoveScope) {
          element.classList.remove(SCOPE_NAME);
          element.classList.remove(scope);
        } else {
          element.classList.add(SCOPE_NAME);
          element.classList.add(scope);
        }
      } else if (element.getAttribute) {
        let c = element.getAttribute(CLASS);

        if (shouldRemoveScope) {
          if (c) {
            let newValue = c.replace(SCOPE_NAME, '').replace(scope, '');
            setElementClassRaw(element, newValue);
          }
        } else {
          let newValue = (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope;
          setElementClassRaw(element, newValue);
        }
      }
    }
  }
  /**
   * Given a node, replace the scoping class to each subnode in the tree.
   * @param {!Node} node
   * @param {string} oldScope
   * @param {string} newScope
   */


  domReplaceScope(node, oldScope, newScope) {
    const fn = node => {
      this.element(node, oldScope, true);
      this.element(node, newScope);
    };

    this._transformDom(node, fn);
  }
  /**
   * Given a node, remove the scoping class to each subnode in the tree.
   * @param {!Node} node
   * @param {string} oldScope
   */


  domRemoveScope(node, oldScope) {
    const fn = node => {
      this.element(node, oldScope || '', true);
    };

    this._transformDom(node, fn);
  }
  /**
   * @param {?} element
   * @param {?} styleRules
   * @param {?=} callback
   * @param {string=} cssBuild
   * @param {string=} cssText
   * @return {string}
   */


  elementStyles(element, styleRules, callback, cssBuild = '', cssText = '') {
    // no need to shim selectors if settings.useNativeShadow, also
    // a shady css build will already have transformed selectors
    // NOTE: This method may be called as part of static or property shimming.
    // When there is a targeted build it will not be called for static shimming,
    // but when the property shim is used it is called and should opt out of
    // static shimming work when a proper build exists.
    if (cssText === '') {
      if (nativeShadow || cssBuild === 'shady') {
        cssText = toCssText(styleRules, callback);
      } else {
        let {
          is,
          typeExtension
        } = getIsExtends(element);
        cssText = this.css(styleRules, is, typeExtension, callback) + '\n\n';
      }
    }

    return cssText.trim();
  } // Given a string of cssText and a scoping string (scope), returns
  // a string of scoped css where each selector is transformed to include
  // a class created from the scope. ShadowDOM selectors are also transformed
  // (e.g. :host) to use the scoping selector.


  css(rules, scope, ext, callback) {
    let hostScope = this._calcHostScope(scope, ext);

    scope = this._calcElementScope(scope);
    let self = this;
    return toCssText(rules, function (
    /** StyleNode */
    rule) {
      if (!rule.isScoped) {
        self.rule(rule, scope, hostScope);
        rule.isScoped = true;
      }

      if (callback) {
        callback(rule, scope, hostScope);
      }
    });
  }

  _calcElementScope(scope) {
    if (scope) {
      return CSS_CLASS_PREFIX + scope;
    } else {
      return '';
    }
  }

  _calcHostScope(scope, ext) {
    return ext ? `[is=${scope}]` : scope;
  }

  rule(rule, scope, hostScope) {
    this._transformRule(rule, this._transformComplexSelector, scope, hostScope);
  }
  /**
   * transforms a css rule to a scoped rule.
   *
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */


  _transformRule(rule, transformer, scope, hostScope) {
    // NOTE: save transformedSelector for subsequent matching of elements
    // against selectors (e.g. when calculating style properties)
    rule['selector'] = rule.transformedSelector = this._transformRuleCss(rule, transformer, scope, hostScope);
  }
  /**
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */


  _transformRuleCss(rule, transformer, scope, hostScope) {
    let p$ = splitSelectorList(rule['selector']); // we want to skip transformation of rules that appear in keyframes,
    // because they are keyframe selectors, not element selectors.

    if (!isKeyframesSelector(rule)) {
      for (let i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
        p$[i] = transformer.call(this, p, scope, hostScope);
      }
    }

    return p$.filter(part => Boolean(part)).join(COMPLEX_SELECTOR_SEP);
  }
  /**
   * @param {string} selector
   * @return {string}
   */


  _twiddleNthPlus(selector) {
    return selector.replace(NTH, (m, type, inside) => {
      if (inside.indexOf('+') > -1) {
        inside = inside.replace(/\+/g, '___');
      } else if (inside.indexOf('___') > -1) {
        inside = inside.replace(/___/g, '+');
      }

      return `:${type}(${inside})`;
    });
  }
  /**
   * Preserve `:matches()` selectors by replacing them with MATCHES_REPLACMENT
   * and returning an array of `:matches()` selectors.
   * Use `_replacesMatchesPseudo` to replace the `:matches()` parts
   *
   * @param {string} selector
   * @return {{selector: string, matches: !Array<string>}}
   */


  _preserveMatchesPseudo(selector) {
    /** @type {!Array<string>} */
    const matches = [];
    let match;

    while (match = selector.match(MATCHES)) {
      const start = match.index;
      const end = findMatchingParen(selector, start);

      if (end === -1) {
        throw new Error(`${match.input} selector missing ')'`);
      }

      const part = selector.slice(start, end + 1);
      selector = selector.replace(part, MATCHES_REPLACEMENT);
      matches.push(part);
    }

    return {
      selector,
      matches
    };
  }
  /**
   * Replace MATCHES_REPLACMENT character with the given set of `:matches()`
   * selectors.
   *
   * @param {string} selector
   * @param {!Array<string>} matches
   * @return {string}
   */


  _replaceMatchesPseudo(selector, matches) {
    const parts = selector.split(MATCHES_REPLACEMENT);
    return matches.reduce((acc, cur, idx) => acc + cur + parts[idx + 1], parts[0]);
  }
  /**
   * @param {string} selector
   * @param {string} scope
   * @param {string=} hostScope
   */


  _transformComplexSelector(selector, scope, hostScope) {
    let stop = false;
    selector = selector.trim(); // Remove spaces inside of selectors like `:nth-of-type` because it confuses SIMPLE_SELECTOR_SEP

    let isNth = NTH.test(selector);

    if (isNth) {
      selector = selector.replace(NTH, (m, type, inner) => `:${type}(${inner.replace(/\s/g, '')})`);
      selector = this._twiddleNthPlus(selector);
    } // Preserve selectors like `:-webkit-any` so that SIMPLE_SELECTOR_SEP does
    // not get confused by spaces inside the pseudo selector


    const isMatches = MATCHES.test(selector);
    /** @type {!Array<string>} */

    let matches;

    if (isMatches) {
      ({
        selector,
        matches
      } = this._preserveMatchesPseudo(selector));
    }

    selector = selector.replace(SLOTTED_START, `${HOST} $1`);
    selector = selector.replace(SIMPLE_SELECTOR_SEP, (m, c, s) => {
      if (!stop) {
        let info = this._transformCompoundSelector(s, c, scope, hostScope);

        stop = stop || info.stop;
        c = info.combinator;
        s = info.value;
      }

      return c + s;
    }); // replace `:matches()` selectors

    if (isMatches) {
      selector = this._replaceMatchesPseudo(selector, matches);
    }

    if (isNth) {
      selector = this._twiddleNthPlus(selector);
    }

    selector = selector.replace(DIR_PAREN, (m, before, dir, after) => `[dir="${dir}"] ${before}${after}, ${before}[dir="${dir}"]${after}`);
    return selector;
  }

  _transformCompoundSelector(selector, combinator, scope, hostScope) {
    // replace :host with host scoping class
    let slottedIndex = selector.indexOf(SLOTTED);

    if (selector.indexOf(HOST) >= 0) {
      selector = this._transformHostSelector(selector, hostScope); // replace other selectors with scoping class
    } else if (slottedIndex !== 0) {
      selector = scope ? this._transformSimpleSelector(selector, scope) : selector;
    } // mark ::slotted() scope jump to replace with descendant selector + arg
    // also ignore left-side combinator


    let slotted = false;

    if (slottedIndex >= 0) {
      combinator = '';
      slotted = true;
    } // process scope jumping selectors up to the scope jump and then stop


    let stop;

    if (slotted) {
      stop = true;

      if (slotted) {
        // .zonk ::slotted(.foo) -> .zonk.scope > .foo
        selector = selector.replace(SLOTTED_PAREN, (m, paren) => ` > ${paren}`);
      }
    }

    return {
      value: selector,
      combinator,
      stop
    };
  }

  _transformSimpleSelector(selector, scope) {
    const attributes = selector.split(/(\[.+?\])/);
    const output = [];

    for (let i = 0; i < attributes.length; i++) {
      // Do not attempt to transform any attribute selector content
      if (i % 2 === 1) {
        output.push(attributes[i]);
      } else {
        const part = attributes[i];

        if (!(part === '' && i === attributes.length - 1)) {
          let p$ = part.split(PSEUDO_PREFIX);
          p$[0] += scope;
          output.push(p$.join(PSEUDO_PREFIX));
        }
      }
    }

    return output.join('');
  } // :host(...) -> scopeName...


  _transformHostSelector(selector, hostScope) {
    let m = selector.match(HOST_PAREN);
    let paren = m && m[2].trim() || '';

    if (paren) {
      if (!paren[0].match(SIMPLE_SELECTOR_PREFIX)) {
        // paren starts with a type selector
        let typeSelector = paren.split(SIMPLE_SELECTOR_PREFIX)[0]; // if the type selector is our hostScope then avoid pre-pending it

        if (typeSelector === hostScope) {
          return paren; // otherwise, this selector should not match in this scope so
          // output a bogus selector.
        } else {
          return SELECTOR_NO_MATCH;
        }
      } else {
        // make sure to do a replace here to catch selectors like:
        // `:host(.foo)::before`
        return selector.replace(HOST_PAREN, function (m, host, paren) {
          return hostScope + paren;
        });
      } // if no paren, do a straight :host replacement.
      // TODO(sorvell): this should not strictly be necessary but
      // it's needed to maintain support for `:host[foo]` type selectors
      // which have been improperly used under Shady DOM. This should be
      // deprecated.

    } else {
      return selector.replace(HOST, hostScope);
    }
  }
  /**
   * @param {StyleNode} rule
   */


  documentRule(rule) {
    // reset selector in case this is redone.
    rule['selector'] = rule['parsedSelector'];
    this.normalizeRootSelector(rule);

    this._transformRule(rule, this._transformDocumentSelector);
  }
  /**
   * @param {StyleNode} rule
   */


  normalizeRootSelector(rule) {
    if (rule['selector'] === ROOT) {
      rule['selector'] = 'html';
    }
  }
  /**
   * @param {string} selector
   */


  _transformDocumentSelector(selector) {
    if (selector.match(HOST)) {
      // remove ':host' type selectors in document rules
      return '';
    } else if (selector.match(SLOTTED)) {
      return this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR);
    } else {
      return this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
    }
  }

}

const NTH = /:(nth[-\w]+)\(([^)]+)\)/;
const SCOPE_DOC_SELECTOR = `:not(.${SCOPE_NAME})`;
const COMPLEX_SELECTOR_SEP = ',';
const SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g;
const SIMPLE_SELECTOR_PREFIX = /[[.:#*]/;
const HOST = ':host';
const ROOT = ':root';
const SLOTTED = '::slotted';
const SLOTTED_START = new RegExp(`^(${SLOTTED})`); // NOTE: this supports 1 nested () pair for things like
// :host(:not([selected]), more general support requires
// parsing which seems like overkill

const HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/; // similar to HOST_PAREN

const SLOTTED_PAREN = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
const DIR_PAREN = /(.*):dir\((?:(ltr|rtl))\)(.*)/;
const CSS_CLASS_PREFIX = '.';
const PSEUDO_PREFIX = ':';
const CLASS = 'class';
const SELECTOR_NO_MATCH = 'should_not_match';
const MATCHES = /:(?:matches|any|-(?:webkit|moz)-any)/;
const MATCHES_REPLACEMENT = '\u{e000}';
/* harmony default export */ var style_transformer = (new style_transformer_StyleTransformer());
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/style-info.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


 // eslint-disable-line no-unused-vars

/** @const {string} */

const infoKey = '__styleInfo';
class StyleInfo {
  /**
   * @param {Element} node
   * @return {StyleInfo}
   */
  static get(node) {
    if (node) {
      return node[infoKey];
    } else {
      return null;
    }
  }
  /**
   * @param {!Element} node
   * @param {StyleInfo} styleInfo
   * @return {StyleInfo}
   */


  static set(node, styleInfo) {
    node[infoKey] = styleInfo;
    return styleInfo;
  }
  /**
   * @param {StyleNode} ast
   * @param {Node=} placeholder
   * @param {Array<string>=} ownStylePropertyNames
   * @param {string=} elementName
   * @param {string=} typeExtension
   * @param {string=} cssBuild
   */


  constructor(ast, placeholder, ownStylePropertyNames, elementName, typeExtension, cssBuild) {
    /** @type {StyleNode} */
    this.styleRules = ast || null;
    /** @type {Node} */

    this.placeholder = placeholder || null;
    /** @type {!Array<string>} */

    this.ownStylePropertyNames = ownStylePropertyNames || [];
    /** @type {Object} */

    this.overrideStyleProperties = null;
    /** @type {string} */

    this.elementName = elementName || '';
    /** @type {string} */

    this.cssBuild = cssBuild || '';
    /** @type {string} */

    this.typeExtension = typeExtension || '';
    /** @type {Object<string, string>} */

    this.styleProperties = null;
    /** @type {?string} */

    this.scopeSelector = null;
    /** @type {HTMLStyleElement} */

    this.customStyle = null;
  }

  _getStyleRules() {
    return this.styleRules;
  }

}
/* eslint-disable-next-line no-self-assign */

StyleInfo.prototype['_getStyleRules'] = StyleInfo.prototype._getStyleRules;
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/style-properties.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


 // eslint-disable-line no-unused-vars





 // TODO: dedupe with shady

/**
 * @param {string} selector
 * @return {boolean}
 * @this {Element}
 */

const matchesSelector = function (selector) {
  const method = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;
  return method && method.call(this, selector);
};

const IS_IE = navigator.userAgent.match('Trident');
const XSCOPE_NAME = 'x-scope';

class style_properties_StyleProperties {
  get XSCOPE_NAME() {
    return XSCOPE_NAME;
  }
  /**
   * decorates styles with rule info and returns an array of used style property names
   *
   * @param {StyleNode} rules
   * @return {Array<string>}
   */


  decorateStyles(rules) {
    let self = this,
        props = {},
        keyframes = [],
        ruleIndex = 0;
    forEachRule(rules, function (rule) {
      self.decorateRule(rule); // mark in-order position of ast rule in styles block, used for cache key

      rule.index = ruleIndex++;
      self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
    }, function onKeyframesRule(rule) {
      keyframes.push(rule);
    }); // Cache all found keyframes rules for later reference:

    rules._keyframes = keyframes; // return this list of property names *consumes* in these styles.

    let names = [];

    for (let i in props) {
      names.push(i);
    }

    return names;
  } // decorate a single rule with property info


  decorateRule(rule) {
    if (rule.propertyInfo) {
      return rule.propertyInfo;
    }

    let info = {},
        properties = {};
    let hasProperties = this.collectProperties(rule, properties);

    if (hasProperties) {
      info.properties = properties; // TODO(sorvell): workaround parser seeing mixins as additional rules

      rule['rules'] = null;
    }

    info.cssText = this.collectCssText(rule);
    rule.propertyInfo = info;
    return info;
  } // collects the custom properties from a rule's cssText


  collectProperties(rule, properties) {
    let info = rule.propertyInfo;

    if (info) {
      if (info.properties) {
        Object.assign(properties, info.properties);
        return true;
      }
    } else {
      let m,
          rx = VAR_ASSIGN;
      let cssText = rule['parsedCssText'];
      let value;
      let any;

      while (m = rx.exec(cssText)) {
        // note: group 2 is var, 3 is mixin
        value = (m[2] || m[3]).trim(); // value of 'inherit' or 'unset' is equivalent to not setting the property here

        if (value !== 'inherit' || value !== 'unset') {
          properties[m[1].trim()] = value;
        }

        any = true;
      }

      return any;
    }
  } // returns cssText of properties that consume variables/mixins


  collectCssText(rule) {
    return this.collectConsumingCssText(rule['parsedCssText']);
  } // NOTE: we support consumption inside mixin assignment
  // but not production, so strip out {...}


  collectConsumingCssText(cssText) {
    return cssText.replace(BRACKETED, '').replace(VAR_ASSIGN, '');
  }

  collectPropertiesInCssText(cssText, props) {
    let m;

    while (m = VAR_CONSUMED.exec(cssText)) {
      let name = m[1]; // This regex catches all variable names, and following non-whitespace char
      // If next char is not ':', then variable is a consumer

      if (m[2] !== ':') {
        props[name] = true;
      }
    }
  } // turns custom properties into realized values.


  reify(props) {
    // big perf optimization here: reify only *own* properties
    // since this object has __proto__ of the element's scope properties
    let names = Object.getOwnPropertyNames(props);

    for (let i = 0, n; i < names.length; i++) {
      n = names[i];
      props[n] = this.valueForProperty(props[n], props);
    }
  } // given a property value, returns the reified value
  // a property value may be:
  // (1) a literal value like: red or 5px;
  // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
  // var(--a, var(--b));
  // (3) a literal mixin value like { properties }. Each of these properties
  // can have values that are: (a) literal, (b) variables, (c) @apply mixins.


  valueForProperty(property, props) {
    // case (1) default
    // case (3) defines a mixin and we have to reify the internals
    if (property) {
      if (property.indexOf(';') >= 0) {
        property = this.valueForProperties(property, props);
      } else {
        // case (2) variable
        let self = this;

        let fn = function (prefix, value, fallback, suffix) {
          if (!value) {
            return prefix + suffix;
          }

          let propertyValue = self.valueForProperty(props[value], props); // if value is "initial", then the variable should be treated as unset

          if (!propertyValue || propertyValue === 'initial') {
            // fallback may be --a or var(--a) or literal
            propertyValue = self.valueForProperty(props[fallback] || fallback, props) || fallback;
          } else if (propertyValue === 'apply-shim-inherit') {
            // CSS build will replace `inherit` with `apply-shim-inherit`
            // for use with native css variables.
            // Since we have full control, we can use `inherit` directly.
            propertyValue = 'inherit';
          }

          return prefix + (propertyValue || '') + suffix;
        };

        property = processVariableAndFallback(property, fn);
      }
    }

    return property && property.trim() || '';
  } // note: we do not yet support mixin within mixin


  valueForProperties(property, props) {
    let parts = property.split(';');

    for (let i = 0, p, m; i < parts.length; i++) {
      if (p = parts[i]) {
        MIXIN_MATCH.lastIndex = 0;
        m = MIXIN_MATCH.exec(p);

        if (m) {
          p = this.valueForProperty(props[m[1]], props);
        } else {
          let colon = p.indexOf(':');

          if (colon !== -1) {
            let pp = p.substring(colon);
            pp = pp.trim();
            pp = this.valueForProperty(pp, props) || pp;
            p = p.substring(0, colon) + pp;
          }
        }

        parts[i] = p && p.lastIndexOf(';') === p.length - 1 ? // strip trailing ;
        p.slice(0, -1) : p || '';
      }
    }

    return parts.join(';');
  }

  applyProperties(rule, props) {
    let output = ''; // dynamically added sheets may not be decorated so ensure they are.

    if (!rule.propertyInfo) {
      this.decorateRule(rule);
    }

    if (rule.propertyInfo.cssText) {
      output = this.valueForProperties(rule.propertyInfo.cssText, props);
    }

    rule['cssText'] = output;
  } // Apply keyframe transformations to the cssText of a given rule. The
  // keyframeTransforms object is a map of keyframe names to transformer
  // functions which take in cssText and spit out transformed cssText.


  applyKeyframeTransforms(rule, keyframeTransforms) {
    let input = rule['cssText'];
    let output = rule['cssText'];

    if (rule.hasAnimations == null) {
      // Cache whether or not the rule has any animations to begin with:
      rule.hasAnimations = ANIMATION_MATCH.test(input);
    } // If there are no animations referenced, we can skip transforms:


    if (rule.hasAnimations) {
      let transform; // If we haven't transformed this rule before, we iterate over all
      // transforms:

      if (rule.keyframeNamesToTransform == null) {
        rule.keyframeNamesToTransform = [];

        for (let keyframe in keyframeTransforms) {
          transform = keyframeTransforms[keyframe];
          output = transform(input); // If the transform actually changed the CSS text, we cache the
          // transform name for future use:

          if (input !== output) {
            input = output;
            rule.keyframeNamesToTransform.push(keyframe);
          }
        }
      } else {
        // If we already have a list of keyframe names that apply to this
        // rule, we apply only those keyframe name transforms:
        for (let i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
          transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
          input = transform(input);
        }

        output = input;
      }
    }

    rule['cssText'] = output;
  } // Test if the rules in these styles matches the given `element` and if so,
  // collect any custom properties into `props`.

  /**
   * @param {StyleNode} rules
   * @param {Element} element
   */


  propertyDataFromStyles(rules, element) {
    let props = {}; // generates a unique key for these matches

    let o = []; // note: active rules excludes non-matching @media rules

    forEachRule(rules, rule => {
      // TODO(sorvell): we could trim the set of rules at declaration
      // time to only include ones that have properties
      if (!rule.propertyInfo) {
        this.decorateRule(rule);
      } // match element against transformedSelector: selector may contain
      // unwanted uniquification and parsedSelector does not directly match
      // for :host selectors.


      let selectorToMatch = rule.transformedSelector || rule['parsedSelector'];

      if (element && rule.propertyInfo.properties && selectorToMatch) {
        if (matchesSelector.call(element, selectorToMatch)) {
          this.collectProperties(rule, props); // produce numeric key for these matches for lookup

          addToBitMask(rule.index, o);
        }
      }
    }, null, true);
    return {
      properties: props,
      key: o
    };
  }
  /**
   * @param {Element} scope
   * @param {StyleNode} rule
   * @param {string} cssBuild
   * @param {function(Object)} callback
   */


  whenHostOrRootRule(scope, rule, cssBuild, callback) {
    if (!rule.propertyInfo) {
      this.decorateRule(rule);
    }

    if (!rule.propertyInfo.properties) {
      return;
    }

    let {
      is,
      typeExtension
    } = getIsExtends(scope);
    let hostScope = is ? style_transformer._calcHostScope(is, typeExtension) : 'html';
    let parsedSelector = rule['parsedSelector'];
    let isRoot = parsedSelector === ':host > *' || parsedSelector === 'html';
    let isHost = parsedSelector.indexOf(':host') === 0 && !isRoot; // build info is either in scope (when scope is an element) or in the style
    // when scope is the default scope; note: this allows default scope to have
    // mixed mode built and unbuilt styles.

    if (cssBuild === 'shady') {
      // :root -> x-foo > *.x-foo for elements and html for custom-style
      isRoot = parsedSelector === hostScope + ' > *.' + hostScope || parsedSelector.indexOf('html') !== -1; // :host -> x-foo for elements, but sub-rules have .x-foo in them

      isHost = !isRoot && parsedSelector.indexOf(hostScope) === 0;
    }

    if (!isRoot && !isHost) {
      return;
    }

    let selectorToMatch = hostScope;

    if (isHost) {
      // need to transform :host because `:host` does not work with `matches`
      if (!rule.transformedSelector) {
        // transform :host into a matchable selector
        rule.transformedSelector = style_transformer._transformRuleCss(rule, style_transformer._transformComplexSelector, style_transformer._calcElementScope(is), hostScope);
      }

      selectorToMatch = rule.transformedSelector || hostScope;
    }

    callback({
      selector: selectorToMatch,
      isHost: isHost,
      isRoot: isRoot
    });
  }
  /**
   * @param {Element} scope
   * @param {StyleNode} rules
   * @param {string} cssBuild
   * @return {Object}
   */


  hostAndRootPropertiesForScope(scope, rules, cssBuild) {
    let hostProps = {},
        rootProps = {}; // note: active rules excludes non-matching @media rules

    forEachRule(rules, rule => {
      // if scope is StyleDefaults, use _element for matchesSelector
      this.whenHostOrRootRule(scope, rule, cssBuild, info => {
        let element = scope._element || scope;

        if (matchesSelector.call(element, info.selector)) {
          if (info.isHost) {
            this.collectProperties(rule, hostProps);
          } else {
            this.collectProperties(rule, rootProps);
          }
        }
      });
    }, null, true);
    return {
      rootProps: rootProps,
      hostProps: hostProps
    };
  }
  /**
   * @param {Element} element
   * @param {Object} properties
   * @param {string} scopeSelector
   */


  transformStyles(element, properties, scopeSelector) {
    let self = this;
    let {
      is,
      typeExtension
    } = getIsExtends(element);

    let hostSelector = style_transformer._calcHostScope(is, typeExtension);

    let rxHostSelector = element.extends ? '\\' + hostSelector.slice(0, -1) + '\\]' : hostSelector;
    let hostRx = new RegExp(HOST_PREFIX + rxHostSelector + HOST_SUFFIX);
    let {
      styleRules: rules,
      cssBuild
    } = StyleInfo.get(element);

    let keyframeTransforms = this._elementKeyframeTransforms(element, rules, scopeSelector);

    return style_transformer.elementStyles(element, rules, function (rule) {
      self.applyProperties(rule, properties);

      if (!nativeShadow && !isKeyframesSelector(rule) && rule['cssText']) {
        // NOTE: keyframe transforms only scope munge animation names, so it
        // is not necessary to apply them in ShadowDOM.
        self.applyKeyframeTransforms(rule, keyframeTransforms);

        self._scopeSelector(rule, hostRx, hostSelector, scopeSelector);
      }
    }, cssBuild);
  }
  /**
   * @param {Element} element
   * @param {StyleNode} rules
   * @param {string} scopeSelector
   * @return {Object}
   */


  _elementKeyframeTransforms(element, rules, scopeSelector) {
    let keyframesRules = rules._keyframes;
    let keyframeTransforms = {};

    if (!nativeShadow && keyframesRules) {
      // For non-ShadowDOM, we transform all known keyframes rules in
      // advance for the current scope. This allows us to catch keyframes
      // rules that appear anywhere in the stylesheet:
      for (let i = 0, keyframesRule = keyframesRules[i]; i < keyframesRules.length; keyframesRule = keyframesRules[++i]) {
        this._scopeKeyframes(keyframesRule, scopeSelector);

        keyframeTransforms[keyframesRule['keyframesName']] = this._keyframesRuleTransformer(keyframesRule);
      }
    }

    return keyframeTransforms;
  } // Generate a factory for transforming a chunk of CSS text to handle a
  // particular scoped keyframes rule.

  /**
   * @param {StyleNode} keyframesRule
   * @return {function(string):string}
   */


  _keyframesRuleTransformer(keyframesRule) {
    return function (cssText) {
      return cssText.replace(keyframesRule.keyframesNameRx, keyframesRule.transformedKeyframesName);
    };
  }
  /**
   * Transforms `@keyframes` names to be unique for the current host.
   * Example: @keyframes foo-anim -> @keyframes foo-anim-x-foo-0
   *
   * @param {StyleNode} rule
   * @param {string} scopeId
   */


  _scopeKeyframes(rule, scopeId) {
    // Animation names are of the form [\w-], so ensure that the name regex does not partially apply
    // to similarly named keyframe names by checking for a word boundary at the beginning and
    // a non-word boundary or `-` at the end.
    rule.keyframesNameRx = new RegExp(`\\b${rule['keyframesName']}(?!\\B|-)`, 'g');
    rule.transformedKeyframesName = rule['keyframesName'] + '-' + scopeId;
    rule.transformedSelector = rule.transformedSelector || rule['selector'];
    rule['selector'] = rule.transformedSelector.replace(rule['keyframesName'], rule.transformedKeyframesName);
  } // Strategy: x scope shim a selector e.g. to scope `.x-foo-42` (via classes):
  // non-host selector: .a.x-foo -> .x-foo-42 .a.x-foo
  // host selector: x-foo.wide -> .x-foo-42.wide
  // note: we use only the scope class (.x-foo-42) and not the hostSelector
  // (x-foo) to scope :host rules; this helps make property host rules
  // have low specificity. They are overrideable by class selectors but,
  // unfortunately, not by type selectors (e.g. overriding via
  // `.special` is ok, but not by `x-foo`).

  /**
   * @param {StyleNode} rule
   * @param {RegExp} hostRx
   * @param {string} hostSelector
   * @param {string} scopeId
   */


  _scopeSelector(rule, hostRx, hostSelector, scopeId) {
    rule.transformedSelector = rule.transformedSelector || rule['selector'];
    let selector = rule.transformedSelector;
    let scope = '.' + scopeId;
    let parts = splitSelectorList(selector);

    for (let i = 0, l = parts.length, p; i < l && (p = parts[i]); i++) {
      parts[i] = p.match(hostRx) ? p.replace(hostSelector, scope) : scope + ' ' + p;
    }

    rule['selector'] = parts.join(',');
  }
  /**
   * @param {Element} element
   * @param {string} selector
   * @param {string} old
   */


  applyElementScopeSelector(element, selector, old) {
    let c = element.getAttribute('class') || '';
    let v = c;

    if (old) {
      v = c.replace(new RegExp('\\s*' + XSCOPE_NAME + '\\s*' + old + '\\s*', 'g'), ' ');
    }

    v += (v ? ' ' : '') + XSCOPE_NAME + ' ' + selector;

    if (c !== v) {
      setElementClassRaw(element, v);
    }
  }
  /**
   * @param {HTMLElement} element
   * @param {Object} properties
   * @param {string} selector
   * @param {HTMLStyleElement} style
   * @return {HTMLStyleElement}
   */


  applyElementStyle(element, properties, selector, style) {
    // calculate cssText to apply
    let cssText = style ? style.textContent || '' : this.transformStyles(element, properties, selector); // if shady and we have a cached style that is not style, decrement

    let styleInfo = StyleInfo.get(element);
    let s = styleInfo.customStyle;

    if (s && !nativeShadow && s !== style) {
      s['_useCount']--;

      if (s['_useCount'] <= 0 && s.parentNode) {
        s.parentNode.removeChild(s);
      }
    } // apply styling always under native or if we generated style
    // or the cached style is not in document(!)


    if (nativeShadow) {
      // update existing style only under native
      if (styleInfo.customStyle) {
        styleInfo.customStyle.textContent = cssText;
        style = styleInfo.customStyle; // otherwise, if we have css to apply, do so
      } else if (cssText) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        style = applyCss(cssText, selector, element.shadowRoot, styleInfo.placeholder);
      }
    } else {
      // shady and no cache hit
      if (!style) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        if (cssText) {
          style = applyCss(cssText, selector, null, styleInfo.placeholder);
        } // shady and cache hit but not in document

      } else if (!style.parentNode) {
        if (IS_IE && cssText.indexOf('@media') > -1) {
          // @media rules may be stale in IE 10 and 11
          // refresh the text content of the style to revalidate them.
          style.textContent = cssText;
        }

        applyStyle(style, null, styleInfo.placeholder);
      }
    } // ensure this style is our custom style and increment its use count.


    if (style) {
      style['_useCount'] = style['_useCount'] || 0; // increment use count if we changed styles

      if (styleInfo.customStyle != style) {
        style['_useCount']++;
      }

      styleInfo.customStyle = style;
    }

    return style;
  }
  /**
   * @param {Element} style
   * @param {Object} properties
   */


  applyCustomStyle(style, properties) {
    let rules = rulesForStyle(
    /** @type {HTMLStyleElement} */
    style);
    let self = this;
    style.textContent = toCssText(rules, function (
    /** StyleNode */
    rule) {
      let css = rule['cssText'] = rule['parsedCssText'];

      if (rule.propertyInfo && rule.propertyInfo.cssText) {
        // remove property assignments
        // so next function isn't confused
        // NOTE: we have 3 categories of css:
        // (1) normal properties,
        // (2) custom property assignments (--foo: red;),
        // (3) custom property usage: border: var(--foo); @apply(--foo);
        // In elements, 1 and 3 are separated for efficiency; here they
        // are not and this makes this case unique.
        css = removeCustomPropAssignment(
        /** @type {string} */
        css); // replace with reified properties, scenario is same as mixin

        rule['cssText'] = self.valueForProperties(css, properties);
      }
    });
  }

}
/**
 * @param {number} n
 * @param {Array<number>} bits
 */


function addToBitMask(n, bits) {
  let o = parseInt(n / 32, 10);
  let v = 1 << n % 32;
  bits[o] = (bits[o] || 0) | v;
}

/* harmony default export */ var style_properties = (new style_properties_StyleProperties());
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/style-placeholder.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




/** @type {!Object<string, !Node>} */

const placeholderMap = {};
/**
 * @param {string} elementName
 * @return {Node}
 */

function getStylePlaceholder(elementName) {
  return placeholderMap[elementName] || null;
}
/**
 * @param {string} elementName
 */

function ensureStylePlaceholder(elementName) {
  if (!placeholderMap[elementName]) {
    placeholderMap[elementName] = applyStylePlaceHolder(elementName);
  }
}
/**
 * @const {CustomElementRegistry}
 */

const ce = window['customElements'];

if (ce && !nativeShadow && !disableRuntime) {
  /**
   * @const {function(this:CustomElementRegistry, string,function(new:HTMLElement),{extends: string}=)}
   */
  const origDefine = ce['define'];
  /**
   * @param {string} name
   * @param {function(new:HTMLElement)} clazz
   * @param {{extends: string}=} options
   */

  const wrappedDefine = (name, clazz, options) => {
    ensureStylePlaceholder(name);
    origDefine.call(
    /** @type {!CustomElementRegistry} */
    ce, name, clazz, options);
  };

  ce['define'] = wrappedDefine;
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/style-cache.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


class StyleCache {
  constructor(typeMax = 100) {
    // map element name -> [{properties, styleElement, scopeSelector}]
    this.cache = {};
    /** @type {number} */

    this.typeMax = typeMax;
  }

  _validate(cacheEntry, properties, ownPropertyNames) {
    for (let idx = 0; idx < ownPropertyNames.length; idx++) {
      let pn = ownPropertyNames[idx];

      if (cacheEntry.properties[pn] !== properties[pn]) {
        return false;
      }
    }

    return true;
  }

  store(tagname, properties, styleElement, scopeSelector) {
    let list = this.cache[tagname] || [];
    list.push({
      properties,
      styleElement,
      scopeSelector
    });

    if (list.length > this.typeMax) {
      list.shift();
    }

    this.cache[tagname] = list;
  }

  fetch(tagname, properties, ownPropertyNames) {
    let list = this.cache[tagname];

    if (!list) {
      return;
    } // reverse list for most-recent lookups


    for (let idx = list.length - 1; idx >= 0; idx--) {
      let entry = list[idx];

      if (this._validate(entry, properties, ownPropertyNames)) {
        return entry;
      }
    }
  }

}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/document-watcher.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





let flush = function () {};
/**
 * @param {!Element} element
 * @return {string}
 */

function getClasses(element) {
  if (element.classList && element.classList.value) {
    return element.classList.value;
  } else {
    // NOTE: className is patched to remove scoping classes in ShadyDOM
    // use getAttribute('class') instead, which is unpatched
    return element.getAttribute('class') || '';
  }
}

const scopeRegExp = new RegExp(`${style_transformer.SCOPE_NAME}\\s*([^\\s]*)`);
/**
 * @param {!Element} element
 * @return {string}
 */

function getCurrentScope(element) {
  const match = getClasses(element).match(scopeRegExp);

  if (match) {
    return match[1];
  } else {
    return '';
  }
}
/**
 * @param {!Node} node
 */

function getOwnerScope(node) {
  const ownerRoot = wrap(node).getRootNode();

  if (ownerRoot === node || ownerRoot === node.ownerDocument) {
    return '';
  }

  const host =
  /** @type {!ShadowRoot} */
  ownerRoot.host;

  if (!host) {
    // this may actually be a document fragment
    return '';
  }

  return getIsExtends(host).is;
}
/**
 * @param {!Element} element
 */

function ensureCorrectScope(element) {
  const currentScope = getCurrentScope(element);
  const ownerRoot = wrap(element).getRootNode();

  if (ownerRoot === element) {
    return;
  }

  if (currentScope && ownerRoot === element.ownerDocument) {
    // node was scoped, but now is in document
    style_transformer.domRemoveScope(element, currentScope);
  } else if (ownerRoot instanceof ShadowRoot) {
    const ownerScope = getOwnerScope(element);

    if (ownerScope !== currentScope) {
      // node was scoped, but not by its current owner
      style_transformer.domReplaceScope(element, currentScope, ownerScope);
    }
  }
}
/**
 * @param {!HTMLElement|!HTMLDocument} element
 */

function ensureCorrectSubtreeScoping(element) {
  // find unscoped subtree nodes
  const unscopedNodes = window['ShadyDOM']['nativeMethods']['querySelectorAll'].call(element, `:not(.${style_transformer.SCOPE_NAME})`);

  for (let j = 0; j < unscopedNodes.length; j++) {
    // it's possible, during large batch inserts, that nodes that aren't
    // scoped within the current scope were added.
    // To make sure that any unscoped nodes that were inserted in the current batch are correctly styled,
    // query all unscoped nodes and force their style-scope to be applied.
    // This could happen if a sub-element appended an unscoped node in its shadowroot and this function
    // runs on a parent element of the host of that unscoped node:
    // parent-element -> element -> unscoped node
    // Here unscoped node should have the style-scope element, not parent-element.
    const unscopedNode = unscopedNodes[j];
    const scopeForPreviouslyUnscopedNode = getOwnerScope(unscopedNode);

    if (scopeForPreviouslyUnscopedNode) {
      style_transformer.element(unscopedNode, scopeForPreviouslyUnscopedNode);
    }
  }
}
/**
 * @param {HTMLElement} el
 * @return {boolean}
 */

function isElementWithBuiltCss(el) {
  if (el.localName === 'style' || el.localName === 'template') {
    return elementHasBuiltCss(el);
  }

  return false;
}
/**
 * @param {Array<MutationRecord|null>|null} mxns
 */


function handler(mxns) {
  for (let x = 0; x < mxns.length; x++) {
    let mxn = mxns[x];

    if (mxn.target === document.documentElement || mxn.target === document.head) {
      continue;
    }

    for (let i = 0; i < mxn.addedNodes.length; i++) {
      let n = mxn.addedNodes[i];

      if (n.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      n =
      /** @type {HTMLElement} */
      n; // eslint-disable-line no-self-assign

      let root = n.getRootNode();
      let currentScope = getCurrentScope(n); // node was scoped, but now is in document
      // If this element has built css, we must not remove scoping as this node
      // will be used as a template or style without re - applying scoping as an optimization

      if (currentScope && root === n.ownerDocument && !isElementWithBuiltCss(n)) {
        style_transformer.domRemoveScope(n, currentScope);
      } else if (root instanceof ShadowRoot) {
        const newScope = getOwnerScope(n); // rescope current node and subtree if necessary

        if (newScope !== currentScope) {
          style_transformer.domReplaceScope(n, currentScope, newScope);
        } // make sure all the subtree elements are scoped correctly


        ensureCorrectSubtreeScoping(n);
      }
    }
  }
} // if native Shadow DOM is being used, or ShadyDOM handles dynamic scoiping, do not activate the MutationObserver


if (!nativeShadow && !(window['ShadyDOM'] && window['ShadyDOM']['handlesDynamicScoping'])) {
  let observer = new MutationObserver(handler);

  let start = node => {
    observer.observe(node, {
      childList: true,
      subtree: true
    });
  };

  let nativeCustomElements = window['customElements'] && !window['customElements']['polyfillWrapFlushCallback']; // need to start immediately with native custom elements
  // TODO(dfreedm): with polyfilled HTMLImports and native custom elements
  // excessive mutations may be observed; this can be optimized via cooperation
  // with the HTMLImports polyfill.

  if (nativeCustomElements) {
    start(document);
  } else {
    let delayedStart = () => {
      start(document.body);
    }; // use polyfill timing if it's available


    if (window['HTMLImports']) {
      window['HTMLImports']['whenReady'](delayedStart); // otherwise push beyond native imports being ready
      // which requires RAF + readystate interactive.
    } else {
      requestAnimationFrame(function () {
        if (document.readyState === 'loading') {
          let listener = function () {
            delayedStart();
            document.removeEventListener('readystatechange', listener);
          };

          document.addEventListener('readystatechange', listener);
        } else {
          delayedStart();
        }
      });
    }
  }

  flush = function () {
    handler(observer.takeRecords());
  };
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/template-map.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * @const {!Object<string, !HTMLTemplateElement>}
 */

const templateMap = {};
/* harmony default export */ var template_map = (templateMap);
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/apply-shim-utils.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars

/*
 * Utilities for handling invalidating apply-shim mixins for a given template.
 *
 * The invalidation strategy involves keeping track of the "current" version of a template's mixins, and updating that count when a mixin is invalidated.
 * The template
 */

/** @const {string} */

const CURRENT_VERSION = '_applyShimCurrentVersion';
/** @const {string} */

const NEXT_VERSION = '_applyShimNextVersion';
/** @const {string} */

const VALIDATING_VERSION = '_applyShimValidatingVersion';
/**
 * @const {Promise<void>}
 */

const promise = Promise.resolve();
/**
 * @param {string} elementName
 */

function invalidate(elementName) {
  let template = template_map[elementName];

  if (template) {
    invalidateTemplate(template);
  }
}
/**
 * This function can be called multiple times to mark a template invalid
 * and signal that the style inside must be regenerated.
 *
 * Use `startValidatingTemplate` to begin an asynchronous validation cycle.
 * During that cycle, call `templateIsValidating` to see if the template must
 * be revalidated
 * @param {HTMLTemplateElement} template
 */

function invalidateTemplate(template) {
  // default the current version to 0
  template[CURRENT_VERSION] = template[CURRENT_VERSION] || 0; // ensure the "validating for" flag exists

  template[VALIDATING_VERSION] = template[VALIDATING_VERSION] || 0; // increment the next version

  template[NEXT_VERSION] = (template[NEXT_VERSION] || 0) + 1;
}
/**
 * @param {string} elementName
 * @return {boolean}
 */

function isValid(elementName) {
  let template = template_map[elementName];

  if (template) {
    return templateIsValid(template);
  }

  return true;
}
/**
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */

function templateIsValid(template) {
  return template[CURRENT_VERSION] === template[NEXT_VERSION];
}
/**
 * @param {string} elementName
 * @return {boolean}
 */

function isValidating(elementName) {
  let template = template_map[elementName];

  if (template) {
    return templateIsValidating(template);
  }

  return false;
}
/**
 * Returns true if the template is currently invalid and `startValidating` has been called since the last invalidation.
 * If false, the template must be validated.
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */

function templateIsValidating(template) {
  return !templateIsValid(template) && template[VALIDATING_VERSION] === template[NEXT_VERSION];
}
/**
 * the template is marked as `validating` for one microtask so that all instances
 * found in the tree crawl of `applyStyle` will update themselves,
 * but the template will only be updated once.
 * @param {string} elementName
*/

function startValidating(elementName) {
  let template = template_map[elementName];
  startValidatingTemplate(template);
}
/**
 * Begin an asynchronous invalidation cycle.
 * This should be called after every validation of a template
 *
 * After one microtask, the template will be marked as valid until the next call to `invalidateTemplate`
 * @param {HTMLTemplateElement} template
 */

function startValidatingTemplate(template) {
  // remember that the current "next version" is the reason for this validation cycle
  template[VALIDATING_VERSION] = template[NEXT_VERSION]; // however, there only needs to be one async task to clear the counters

  if (!template._validating) {
    template._validating = true;
    promise.then(function () {
      // sync the current version to let future invalidations cause a refresh cycle
      template[CURRENT_VERSION] = template[NEXT_VERSION];
      template._validating = false;
    });
  }
}
/**
 * @return {boolean}
 */

function elementsAreInvalid() {
  for (let elementName in template_map) {
    let template = template_map[elementName];

    if (!templateIsValid(template)) {
      return true;
    }
  }

  return false;
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/common-utils.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * @param {Element} element
 * @param {Object=} properties
 */

function updateNativeProperties(element, properties) {
  // remove previous properties
  for (let p in properties) {
    // NOTE: for bc with shim, don't apply null values.
    if (p === null) {
      element.style.removeProperty(p);
    } else {
      element.style.setProperty(p, properties[p]);
    }
  }
}
/**
 * @param {Element} element
 * @param {string} property
 * @return {string}
 */

function getComputedStyleValue(element, property) {
  /**
   * @const {string}
   */
  const value = window.getComputedStyle(element).getPropertyValue(property);

  if (!value) {
    return '';
  } else {
    return value.trim();
  }
}
/**
 * return true if `cssText` contains a mixin definition or consumption
 * @param {string} cssText
 * @return {boolean}
 */

function detectMixin(cssText) {
  const has = MIXIN_MATCH.test(cssText) || VAR_ASSIGN.test(cssText); // reset state of the regexes

  MIXIN_MATCH.lastIndex = 0;
  VAR_ASSIGN.lastIndex = 0;
  return has;
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/document-wait.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/** @type {Promise<void>} */

let readyPromise = null;
/** @type {?function(?function())} */

let whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;
/** @type {function()} */

let resolveFn;
/**
 * @param {?function()} callback
 */

function documentWait(callback) {
  requestAnimationFrame(function () {
    if (whenReady) {
      whenReady(callback);
    } else {
      if (!readyPromise) {
        readyPromise = new Promise(resolve => {
          resolveFn = resolve;
        });

        if (document.readyState === 'complete') {
          resolveFn();
        } else {
          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
              resolveFn();
            }
          });
        }
      }

      readyPromise.then(function () {
        callback && callback();
      });
    }
  });
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/custom-style-interface.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * @typedef {HTMLStyleElement | {getStyle: function():HTMLStyleElement}}
 */

let CustomStyleProvider;
const SEEN_MARKER = '__seenByShadyCSS';
const CACHED_STYLE = '__shadyCSSCachedStyle';
/** @type {?function(!HTMLStyleElement)} */

let transformFn = null;
/** @type {?function()} */

let validateFn = null;
/**
This interface is provided to add document-level <style> elements to ShadyCSS for processing.
These styles must be processed by ShadyCSS to simulate ShadowRoot upper-bound encapsulation from outside styles
In addition, these styles may also need to be processed for @apply rules and CSS Custom Properties

To add document-level styles to ShadyCSS, one can call `ShadyCSS.addDocumentStyle(styleElement)` or `ShadyCSS.addDocumentStyle({getStyle: () => styleElement})`

In addition, if the process used to discover document-level styles can be synchronously flushed, one should set `ShadyCSS.documentStyleFlush`.
This function will be called when calculating styles.

An example usage of the document-level styling api can be found in `examples/document-style-lib.js`

@unrestricted
*/

class custom_style_interface_CustomStyleInterface {
  constructor() {
    /** @type {!Array<!CustomStyleProvider>} */
    this['customStyles'] = [];
    this['enqueued'] = false; // NOTE(dfreedm): use quotes here to prevent closure inlining to `function(){}`;

    documentWait(() => {
      if (window['ShadyCSS']['flushCustomStyles']) {
        window['ShadyCSS']['flushCustomStyles']();
      }
    });
  }
  /**
   * Queue a validation for new custom styles to batch style recalculations
   */


  enqueueDocumentValidation() {
    if (this['enqueued'] || !validateFn) {
      return;
    }

    this['enqueued'] = true;
    documentWait(validateFn);
  }
  /**
   * @param {!HTMLStyleElement} style
   */


  addCustomStyle(style) {
    if (!style[SEEN_MARKER]) {
      style[SEEN_MARKER] = true;
      this['customStyles'].push(style);
      this.enqueueDocumentValidation();
    }
  }
  /**
   * @param {!CustomStyleProvider} customStyle
   * @return {HTMLStyleElement}
   */


  getStyleForCustomStyle(customStyle) {
    if (customStyle[CACHED_STYLE]) {
      return customStyle[CACHED_STYLE];
    }

    let style;

    if (customStyle['getStyle']) {
      style = customStyle['getStyle']();
    } else {
      style = customStyle;
    }

    return style;
  }
  /**
   * @return {!Array<!CustomStyleProvider>}
   */


  processStyles() {
    const cs = this['customStyles'];

    for (let i = 0; i < cs.length; i++) {
      const customStyle = cs[i];

      if (customStyle[CACHED_STYLE]) {
        continue;
      }

      const style = this.getStyleForCustomStyle(customStyle);

      if (style) {
        // HTMLImports polyfill may have cloned the style into the main document,
        // which is referenced with __appliedElement.
        const styleToTransform =
        /** @type {!HTMLStyleElement} */
        style['__appliedElement'] || style;

        if (transformFn) {
          transformFn(styleToTransform);
        }

        customStyle[CACHED_STYLE] = styleToTransform;
      }
    }

    return cs;
  }

}
/* eslint-disable no-self-assign */

custom_style_interface_CustomStyleInterface.prototype['addCustomStyle'] = custom_style_interface_CustomStyleInterface.prototype.addCustomStyle;
custom_style_interface_CustomStyleInterface.prototype['getStyleForCustomStyle'] = custom_style_interface_CustomStyleInterface.prototype.getStyleForCustomStyle;
custom_style_interface_CustomStyleInterface.prototype['processStyles'] = custom_style_interface_CustomStyleInterface.prototype.processStyles;
/* eslint-enable no-self-assign */

Object.defineProperties(custom_style_interface_CustomStyleInterface.prototype, {
  'transformCallback': {
    /** @return {?function(!HTMLStyleElement)} */
    get() {
      return transformFn;
    },

    /** @param {?function(!HTMLStyleElement)} fn */
    set(fn) {
      transformFn = fn;
    }

  },
  'validateCallback': {
    /** @return {?function()} */
    get() {
      return validateFn;
    },

    /**
     * @param {?function()} fn
     * @this {CustomStyleInterface}
     */
    set(fn) {
      let needsEnqueue = false;

      if (!validateFn) {
        needsEnqueue = true;
      }

      validateFn = fn;

      if (needsEnqueue) {
        this.enqueueDocumentValidation();
      }
    }

  }
});
/** @typedef {{
 * customStyles: !Array<!CustomStyleProvider>,
 * addCustomStyle: function(!CustomStyleProvider),
 * getStyleForCustomStyle: function(!CustomStyleProvider): HTMLStyleElement,
 * findStyles: function(),
 * transformCallback: ?function(!HTMLStyleElement),
 * validateCallback: ?function()
 * }}
 */

const CustomStyleInterfaceInterface = {};
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/src/scoping-shim.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/














 // eslint-disable-line no-unused-vars

/** @type {!Object<string, string>} */

const adoptedCssTextMap = {};
/**
 * @const {StyleCache}
 */

const styleCache = new StyleCache();
class scoping_shim_ScopingShim {
  constructor() {
    this._scopeCounter = {};
    this._documentOwner =
    /** @type {!HTMLElement} */
    document.documentElement;
    let ast = new StyleNode();
    ast['rules'] = [];
    this._documentOwnerStyleInfo = StyleInfo.set(this._documentOwner, new StyleInfo(ast));
    this._elementsHaveApplied = false;
    /** @type {?Object} */

    this._applyShim = null;
    /** @type {?CustomStyleInterfaceInterface} */

    this._customStyleInterface = null;
  }

  flush() {
    flush();
  }

  _generateScopeSelector(name) {
    let id = this._scopeCounter[name] = (this._scopeCounter[name] || 0) + 1;
    return `${name}-${id}`;
  }

  getStyleAst(style) {
    return rulesForStyle(style);
  }

  styleAstToString(ast) {
    return toCssText(ast);
  }

  _gatherStyles(template) {
    return gatherStyleText(template.content);
  }
  /**
   * Prepare the styling and template for the given element type
   *
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} typeExtension
   */


  prepareTemplate(template, elementName, typeExtension) {
    this.prepareTemplateDom(template, elementName);
    this.prepareTemplateStyles(template, elementName, typeExtension);
  }
  /**
   * Prepare styling for the given element type
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} typeExtension
   */


  prepareTemplateStyles(template, elementName, typeExtension) {
    if (template._prepared || disableRuntime) {
      return;
    } // style placeholders are only used when ShadyDOM is active


    if (!nativeShadow) {
      ensureStylePlaceholder(elementName);
    }

    template._prepared = true;
    template.name = elementName;
    template.extends = typeExtension;
    template_map[elementName] = template;
    let cssBuild = getCssBuild(template);
    const optimalBuild = isOptimalCssBuild(cssBuild);
    let info = {
      is: elementName,
      extends: typeExtension
    };
    let cssText = this._gatherStyles(template) + (adoptedCssTextMap[elementName] || ''); // check if the styling has mixin definitions or uses

    this._ensure();

    if (!optimalBuild) {
      let hasMixins = !cssBuild && detectMixin(cssText);
      let ast = parse(cssText); // only run the applyshim transforms if there is a mixin involved

      if (hasMixins && nativeCssVariables && this._applyShim) {
        this._applyShim['transformRules'](ast, elementName);
      }

      template['_styleAst'] = ast;
    }

    let ownPropertyNames = [];

    if (!nativeCssVariables) {
      ownPropertyNames = style_properties.decorateStyles(template['_styleAst']);
    }

    if (!ownPropertyNames.length || nativeCssVariables) {
      let root = nativeShadow ? template.content : null;
      let placeholder = getStylePlaceholder(elementName);

      let style = this._generateStaticStyle(info, template['_styleAst'], root, placeholder, cssBuild, optimalBuild ? cssText : '');

      template._style = style;
    }

    template._ownPropertyNames = ownPropertyNames;
  }
  /**
   * @param {!Array<string>} cssTextArray
   * @param {string} elementName
   */


  prepareAdoptedCssText(cssTextArray, elementName) {
    adoptedCssTextMap[elementName] = cssTextArray.join(' ');
  }
  /**
   * Prepare template for the given element type
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   */


  prepareTemplateDom(template, elementName) {
    if (disableRuntime) {
      return;
    }

    const cssBuild = getCssBuild(template);

    if (!nativeShadow && cssBuild !== 'shady' && !template._domPrepared) {
      template._domPrepared = true;
      style_transformer.domAddScope(template.content, elementName);
    }
  }
  /**
   * @param {!{is: string, extends: (string|undefined)}} info
   * @param {!StyleNode} rules
   * @param {DocumentFragment} shadowroot
   * @param {Node} placeholder
   * @param {string} cssBuild
   * @param {string=} cssText
   * @return {?HTMLStyleElement}
   */


  _generateStaticStyle(info, rules, shadowroot, placeholder, cssBuild, cssText) {
    cssText = style_transformer.elementStyles(info, rules, null, cssBuild, cssText);

    if (cssText.length) {
      return applyCss(cssText, info.is, shadowroot, placeholder);
    }

    return null;
  }

  _prepareHost(host) {
    const {
      is,
      typeExtension
    } = getIsExtends(host);
    const placeholder = getStylePlaceholder(is);
    const template = template_map[is];

    if (!template) {
      return;
    }

    const ast = template['_styleAst'];
    const ownStylePropertyNames = template._ownPropertyNames;
    const cssBuild = getCssBuild(template);
    const styleInfo = new StyleInfo(ast, placeholder, ownStylePropertyNames, is, typeExtension, cssBuild);
    StyleInfo.set(host, styleInfo);
    return styleInfo;
  }

  _ensureApplyShim() {
    if (this._applyShim) {
      return;
    } else if (window.ShadyCSS && window.ShadyCSS.ApplyShim) {
      this._applyShim =
      /** @type {!Object} */
      window.ShadyCSS.ApplyShim;
      this._applyShim['invalidCallback'] = invalidate;
    }
  }

  _ensureCustomStyleInterface() {
    if (this._customStyleInterface) {
      return;
    } else if (window.ShadyCSS && window.ShadyCSS.CustomStyleInterface) {
      this._customStyleInterface =
      /** @type {!CustomStyleInterfaceInterface} */
      window.ShadyCSS.CustomStyleInterface;
      /** @type {function(!HTMLStyleElement)} */

      this._customStyleInterface['transformCallback'] = style => {
        this.transformCustomStyleForDocument(style);
      };

      this._customStyleInterface['validateCallback'] = () => {
        requestAnimationFrame(() => {
          if (this._customStyleInterface['enqueued'] || this._elementsHaveApplied) {
            this.flushCustomStyles();
          }
        });
      };
    }
  }

  _ensure() {
    this._ensureApplyShim();

    this._ensureCustomStyleInterface();
  }
  /**
   * Flush and apply custom styles to document
   */


  flushCustomStyles() {
    if (disableRuntime) {
      return;
    }

    this._ensure();

    if (!this._customStyleInterface) {
      return;
    }

    let customStyles = this._customStyleInterface['processStyles'](); // early return if custom-styles don't need validation


    if (!this._customStyleInterface['enqueued']) {
      return;
    } // bail if custom styles are built optimally


    if (isOptimalCssBuild(this._documentOwnerStyleInfo.cssBuild)) {
      return;
    }

    if (!nativeCssVariables) {
      this._updateProperties(this._documentOwner, this._documentOwnerStyleInfo);

      this._applyCustomStyles(customStyles);

      if (this._elementsHaveApplied) {
        // if custom elements have upgraded and there are no native css variables, we must recalculate the whole tree
        this.styleDocument();
      }
    } else if (!this._documentOwnerStyleInfo.cssBuild) {
      this._revalidateCustomStyleApplyShim(customStyles);
    }

    this._customStyleInterface['enqueued'] = false;
  }
  /**
   * Apply styles for the given element
   *
   * @param {!HTMLElement} host
   * @param {Object=} overrideProps
   */


  styleElement(host, overrideProps) {
    if (disableRuntime) {
      if (overrideProps) {
        if (!StyleInfo.get(host)) {
          StyleInfo.set(host, new StyleInfo(null));
        }

        const styleInfo =
        /** @type {!StyleInfo} */
        StyleInfo.get(host);

        this._mixOverrideStyleProps(styleInfo, overrideProps);

        this.styleElementNativeVariables(host, styleInfo);
      }

      return;
    }

    const styleInfo = StyleInfo.get(host) || this._prepareHost(host); // if there is no style info at this point, bail


    if (!styleInfo) {
      return;
    } // Only trip the `elementsHaveApplied` flag if a node other that the root document has `applyStyle` called


    if (!this._isRootOwner(host)) {
      this._elementsHaveApplied = true;
    }

    if (overrideProps) {
      this._mixOverrideStyleProps(styleInfo, overrideProps);
    }

    if (!nativeCssVariables) {
      this.styleElementShimVariables(host, styleInfo);
    } else {
      this.styleElementNativeVariables(host, styleInfo);
    }
  }
  /**
   * @param {!StyleInfo} styleInfo
   * @param {Object} overrideProps
   */


  _mixOverrideStyleProps(styleInfo, overrideProps) {
    styleInfo.overrideStyleProperties = styleInfo.overrideStyleProperties || {};
    Object.assign(styleInfo.overrideStyleProperties, overrideProps);
  }
  /**
   * @param {!HTMLElement} host
   * @param {!StyleInfo} styleInfo
   */


  styleElementShimVariables(host, styleInfo) {
    this.flush();

    this._updateProperties(host, styleInfo);

    if (styleInfo.ownStylePropertyNames && styleInfo.ownStylePropertyNames.length) {
      this._applyStyleProperties(host, styleInfo);
    }
  }
  /**
   * @param {!HTMLElement} host
   * @param {!StyleInfo} styleInfo
   */


  styleElementNativeVariables(host, styleInfo) {
    const {
      is
    } = getIsExtends(host);

    if (styleInfo.overrideStyleProperties) {
      updateNativeProperties(host, styleInfo.overrideStyleProperties);
    }

    const template = template_map[is]; // bail early if there is no shadowroot for this element

    if (!template && !this._isRootOwner(host)) {
      return;
    } // bail early if the template was built with polymer-css-build


    if (template && elementHasBuiltCss(template)) {
      return;
    }

    if (template && template._style && !templateIsValid(template)) {
      // update template
      if (!templateIsValidating(template)) {
        this._ensure();

        this._applyShim && this._applyShim['transformRules'](template['_styleAst'], is);
        template._style.textContent = style_transformer.elementStyles(host, styleInfo.styleRules);
        startValidatingTemplate(template);
      } // update instance if native shadowdom


      if (nativeShadow) {
        let root = host.shadowRoot;

        if (root) {
          let style = root.querySelector('style');

          if (style) {
            style.textContent = style_transformer.elementStyles(host, styleInfo.styleRules);
          }
        }
      }

      styleInfo.styleRules = template['_styleAst'];
    }
  }

  _styleOwnerForNode(node) {
    let root = wrap(node).getRootNode();
    let host = root.host;

    if (host) {
      if (StyleInfo.get(host) || this._prepareHost(host)) {
        return host;
      } else {
        return this._styleOwnerForNode(host);
      }
    }

    return this._documentOwner;
  }

  _isRootOwner(node) {
    return node === this._documentOwner;
  }

  _applyStyleProperties(host, styleInfo) {
    let is = getIsExtends(host).is;
    let cacheEntry = styleCache.fetch(is, styleInfo.styleProperties, styleInfo.ownStylePropertyNames);
    let cachedScopeSelector = cacheEntry && cacheEntry.scopeSelector;
    let cachedStyle = cacheEntry ? cacheEntry.styleElement : null;
    let oldScopeSelector = styleInfo.scopeSelector; // only generate new scope if cached style is not found

    styleInfo.scopeSelector = cachedScopeSelector || this._generateScopeSelector(is);
    let style = style_properties.applyElementStyle(host, styleInfo.styleProperties, styleInfo.scopeSelector, cachedStyle);

    if (!nativeShadow) {
      style_properties.applyElementScopeSelector(host, styleInfo.scopeSelector, oldScopeSelector);
    }

    if (!cacheEntry) {
      styleCache.store(is, styleInfo.styleProperties, style, styleInfo.scopeSelector);
    }

    return style;
  }

  _updateProperties(host, styleInfo) {
    let owner = this._styleOwnerForNode(host);

    let ownerStyleInfo = StyleInfo.get(owner);
    let ownerProperties = ownerStyleInfo.styleProperties; // style owner has not updated properties yet
    // go up the chain and force property update,
    // except if the owner is the document

    if (owner !== this._documentOwner && !ownerProperties) {
      this._updateProperties(owner, ownerStyleInfo);

      ownerProperties = ownerStyleInfo.styleProperties;
    }

    let props = Object.create(ownerProperties || null);
    let hostAndRootProps = style_properties.hostAndRootPropertiesForScope(host, styleInfo.styleRules, styleInfo.cssBuild);
    let propertyData = style_properties.propertyDataFromStyles(ownerStyleInfo.styleRules, host);
    let propertiesMatchingHost = propertyData.properties;
    Object.assign(props, hostAndRootProps.hostProps, propertiesMatchingHost, hostAndRootProps.rootProps);

    this._mixinOverrideStyles(props, styleInfo.overrideStyleProperties);

    style_properties.reify(props);
    styleInfo.styleProperties = props;
  }

  _mixinOverrideStyles(props, overrides) {
    for (let p in overrides) {
      let v = overrides[p]; // skip override props if they are not truthy or 0
      // in order to fall back to inherited values

      if (v || v === 0) {
        props[p] = v;
      }
    }
  }
  /**
   * Update styles of the whole document
   *
   * @param {Object=} properties
   */


  styleDocument(properties) {
    this.styleSubtree(this._documentOwner, properties);
  }
  /**
   * Update styles of a subtree
   *
   * @param {!HTMLElement} host
   * @param {Object=} properties
   */


  styleSubtree(host, properties) {
    const wrappedHost = wrap(host);
    let root = wrappedHost.shadowRoot;

    if (root || this._isRootOwner(host)) {
      this.styleElement(host, properties);
    } // process the shadowdom children of `host`


    let shadowChildren = root && (
    /** @type {!ParentNode} */
    root.children || root.childNodes);

    if (shadowChildren) {
      for (let i = 0; i < shadowChildren.length; i++) {
        let c =
        /** @type {!HTMLElement} */
        shadowChildren[i];
        this.styleSubtree(c);
      }
    } else {
      // process the lightdom children of `host`
      let children = wrappedHost.children || wrappedHost.childNodes;

      if (children) {
        for (let i = 0; i < children.length; i++) {
          let c =
          /** @type {!HTMLElement} */
          children[i];
          this.styleSubtree(c);
        }
      }
    }
  }
  /* Custom Style operations */


  _revalidateCustomStyleApplyShim(customStyles) {
    for (let i = 0; i < customStyles.length; i++) {
      let c = customStyles[i];

      let s = this._customStyleInterface['getStyleForCustomStyle'](c);

      if (s) {
        this._revalidateApplyShim(s);
      }
    }
  }

  _applyCustomStyles(customStyles) {
    for (let i = 0; i < customStyles.length; i++) {
      let c = customStyles[i];

      let s = this._customStyleInterface['getStyleForCustomStyle'](c);

      if (s) {
        style_properties.applyCustomStyle(s, this._documentOwnerStyleInfo.styleProperties);
      }
    }
  }

  transformCustomStyleForDocument(style) {
    const cssBuild = getCssBuild(style);

    if (cssBuild !== this._documentOwnerStyleInfo.cssBuild) {
      this._documentOwnerStyleInfo.cssBuild = cssBuild;
    }

    if (isOptimalCssBuild(cssBuild)) {
      return;
    }

    let ast = rulesForStyle(style);
    forEachRule(ast, rule => {
      if (nativeShadow) {
        style_transformer.normalizeRootSelector(rule);
      } else {
        style_transformer.documentRule(rule);
      }

      if (nativeCssVariables && cssBuild === '') {
        this._ensure();

        this._applyShim && this._applyShim['transformRule'](rule);
      }
    });

    if (nativeCssVariables) {
      style.textContent = toCssText(ast);
    } else {
      this._documentOwnerStyleInfo.styleRules['rules'].push(ast);
    }
  }

  _revalidateApplyShim(style) {
    if (nativeCssVariables && this._applyShim) {
      let ast = rulesForStyle(style);

      this._ensure();

      this._applyShim['transformRules'](ast);

      style.textContent = toCssText(ast);
    }
  }

  getComputedStyleValue(element, property) {
    let value;

    if (!nativeCssVariables) {
      // element is either a style host, or an ancestor of a style host
      let styleInfo = StyleInfo.get(element) || StyleInfo.get(this._styleOwnerForNode(element));
      value = styleInfo.styleProperties[property];
    } // fall back to the property value from the computed styling


    value = value || window.getComputedStyle(element).getPropertyValue(property); // trim whitespace that can come after the `:` in css
    // example: padding: 2px -> " 2px"

    return value ? value.trim() : '';
  } // given an element and a classString, replaces
  // the element's class with the provided classString and adds
  // any necessary ShadyCSS static and property based scoping selectors


  setElementClass(element, classString) {
    let root = wrap(element).getRootNode();
    let classes = classString ? classString.split(/\s/) : [];
    let scopeName = root.host && root.host.localName; // If no scope, try to discover scope name from existing class.
    // This can occur if, for example, a template stamped element that
    // has been scoped is manipulated when not in a root.

    if (!scopeName) {
      var classAttr = element.getAttribute('class');

      if (classAttr) {
        let k$ = classAttr.split(/\s/);

        for (let i = 0; i < k$.length; i++) {
          if (k$[i] === style_transformer.SCOPE_NAME) {
            scopeName = k$[i + 1];
            break;
          }
        }
      }
    }

    if (scopeName) {
      classes.push(style_transformer.SCOPE_NAME, scopeName);
    }

    if (!nativeCssVariables) {
      let styleInfo = StyleInfo.get(element);

      if (styleInfo && styleInfo.scopeSelector) {
        classes.push(style_properties.XSCOPE_NAME, styleInfo.scopeSelector);
      }
    }

    setElementClassRaw(element, classes.join(' '));
  }

  _styleInfoForNode(node) {
    return StyleInfo.get(node);
  }
  /**
   * @param {!Element} node
   * @param {string} scope
   */


  scopeNode(node, scope) {
    style_transformer.element(node, scope);
  }
  /**
   * @param {!Element} node
   * @param {string} scope
   */


  unscopeNode(node, scope) {
    style_transformer.element(node, scope, true);
  }
  /**
   * @param {!Node} node
   * @return {string}
   */


  scopeForNode(node) {
    return getOwnerScope(node);
  }
  /**
   * @param {!Element} node
   * @return {string}
   */


  currentScopeForNode(node) {
    return getCurrentScope(node);
  }

}
/* exports */

/* eslint-disable no-self-assign */

scoping_shim_ScopingShim.prototype['flush'] = scoping_shim_ScopingShim.prototype.flush;
scoping_shim_ScopingShim.prototype['prepareTemplate'] = scoping_shim_ScopingShim.prototype.prepareTemplate;
scoping_shim_ScopingShim.prototype['styleElement'] = scoping_shim_ScopingShim.prototype.styleElement;
scoping_shim_ScopingShim.prototype['styleDocument'] = scoping_shim_ScopingShim.prototype.styleDocument;
scoping_shim_ScopingShim.prototype['styleSubtree'] = scoping_shim_ScopingShim.prototype.styleSubtree;
scoping_shim_ScopingShim.prototype['getComputedStyleValue'] = scoping_shim_ScopingShim.prototype.getComputedStyleValue;
scoping_shim_ScopingShim.prototype['setElementClass'] = scoping_shim_ScopingShim.prototype.setElementClass;
scoping_shim_ScopingShim.prototype['_styleInfoForNode'] = scoping_shim_ScopingShim.prototype._styleInfoForNode;
scoping_shim_ScopingShim.prototype['transformCustomStyleForDocument'] = scoping_shim_ScopingShim.prototype.transformCustomStyleForDocument;
scoping_shim_ScopingShim.prototype['getStyleAst'] = scoping_shim_ScopingShim.prototype.getStyleAst;
scoping_shim_ScopingShim.prototype['styleAstToString'] = scoping_shim_ScopingShim.prototype.styleAstToString;
scoping_shim_ScopingShim.prototype['flushCustomStyles'] = scoping_shim_ScopingShim.prototype.flushCustomStyles;
scoping_shim_ScopingShim.prototype['scopeNode'] = scoping_shim_ScopingShim.prototype.scopeNode;
scoping_shim_ScopingShim.prototype['unscopeNode'] = scoping_shim_ScopingShim.prototype.unscopeNode;
scoping_shim_ScopingShim.prototype['scopeForNode'] = scoping_shim_ScopingShim.prototype.scopeForNode;
scoping_shim_ScopingShim.prototype['currentScopeForNode'] = scoping_shim_ScopingShim.prototype.currentScopeForNode;
scoping_shim_ScopingShim.prototype['prepareAdoptedCssText'] = scoping_shim_ScopingShim.prototype.prepareAdoptedCssText;
/* eslint-enable no-self-assign */

Object.defineProperties(scoping_shim_ScopingShim.prototype, {
  'nativeShadow': {
    get() {
      return nativeShadow;
    }

  },
  'nativeCss': {
    get() {
      return nativeCssVariables;
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@webcomponents/shadycss/entrypoints/scoping-shim.js
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




/** @const {ScopingShim} */

const scopingShim = new scoping_shim_ScopingShim();
let ApplyShim, scoping_shim_CustomStyleInterface;

if (window['ShadyCSS']) {
  ApplyShim = window['ShadyCSS']['ApplyShim'];
  scoping_shim_CustomStyleInterface = window['ShadyCSS']['CustomStyleInterface'];
}

window.ShadyCSS = {
  ScopingShim: scopingShim,

  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} elementExtends
   */
  prepareTemplate(template, elementName, elementExtends) {
    scopingShim.flushCustomStyles();
    scopingShim.prepareTemplate(template, elementName, elementExtends);
  },

  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   */
  prepareTemplateDom(template, elementName) {
    scopingShim.prepareTemplateDom(template, elementName);
  },

  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} elementExtends
   */
  prepareTemplateStyles(template, elementName, elementExtends) {
    scopingShim.flushCustomStyles();
    scopingShim.prepareTemplateStyles(template, elementName, elementExtends);
  },

  /**
   * @param {!HTMLElement} element
   * @param {Object=} properties
   */
  styleSubtree(element, properties) {
    scopingShim.flushCustomStyles();
    scopingShim.styleSubtree(element, properties);
  },

  /**
   * @param {!HTMLElement} element
   */
  styleElement(element) {
    scopingShim.flushCustomStyles();
    scopingShim.styleElement(element);
  },

  /**
   * @param {Object=} properties
   */
  styleDocument(properties) {
    scopingShim.flushCustomStyles();
    scopingShim.styleDocument(properties);
  },

  flushCustomStyles() {
    scopingShim.flushCustomStyles();
  },

  /**
   * @param {Element} element
   * @param {string} property
   * @return {string}
   */
  getComputedStyleValue(element, property) {
    return scopingShim.getComputedStyleValue(element, property);
  },

  nativeCss: nativeCssVariables,
  nativeShadow: nativeShadow,
  cssBuild: style_settings_cssBuild,
  disableRuntime: disableRuntime
};

if (ApplyShim) {
  window.ShadyCSS.ApplyShim = ApplyShim;
}

if (scoping_shim_CustomStyleInterface) {
  window.ShadyCSS.CustomStyleInterface = scoping_shim_CustomStyleInterface;
}

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Utilities.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
const reservedTagList = new Set(['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph']);
/**
 * @param {string} localName
 * @returns {boolean}
 */

function isValidCustomElementName(localName) {
  const reserved = reservedTagList.has(localName);
  const validForm = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(localName);
  return !reserved && validForm;
}
/**
 * @param {!Node} node
 * @return {boolean}
 */

function Utilities_isConnected(node) {
  // Use `Node#isConnected`, if defined.
  const nativeValue = node.isConnected;

  if (nativeValue !== undefined) {
    return nativeValue;
  }
  /** @type {?Node|undefined} */


  let current = node;

  while (current && !(current.__CE_isImportDocument || current instanceof Document)) {
    current = current.parentNode || (window.ShadowRoot && current instanceof ShadowRoot ? current.host : undefined);
  }

  return !!(current && (current.__CE_isImportDocument || current instanceof Document));
}
/**
 * @param {!Node} root
 * @param {!Node} start
 * @return {?Node}
 */

function nextSiblingOrAncestorSibling(root, start) {
  let node = start;

  while (node && node !== root && !node.nextSibling) {
    node = node.parentNode;
  }

  return !node || node === root ? null : node.nextSibling;
}
/**
 * @param {!Node} root
 * @param {!Node} start
 * @return {?Node}
 */


function nextNode(root, start) {
  return start.firstChild ? start.firstChild : nextSiblingOrAncestorSibling(root, start);
}
/**
 * @param {!Node} root
 * @param {!function(!Element)} callback
 * @param {!Set<Node>=} visitedImports
 */


function walkDeepDescendantElements(root, callback, visitedImports = new Set()) {
  let node = root;

  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element =
      /** @type {!Element} */
      node;
      callback(element);
      const localName = element.localName;

      if (localName === 'link' && element.getAttribute('rel') === 'import') {
        // If this import (polyfilled or not) has it's root node available,
        // walk it.
        const importNode =
        /** @type {!Node} */
        element.import;

        if (importNode instanceof Node && !visitedImports.has(importNode)) {
          // Prevent multiple walks of the same import root.
          visitedImports.add(importNode);

          for (let child = importNode.firstChild; child; child = child.nextSibling) {
            walkDeepDescendantElements(child, callback, visitedImports);
          }
        } // Ignore descendants of import links to prevent attempting to walk the
        // elements created by the HTML Imports polyfill that we just walked
        // above.


        node = nextSiblingOrAncestorSibling(root, element);
        continue;
      } else if (localName === 'template') {
        // Ignore descendants of templates. There shouldn't be any descendants
        // because they will be moved into `.content` during construction in
        // browsers that support template but, in case they exist and are still
        // waiting to be moved by a polyfill, they will be ignored.
        node = nextSiblingOrAncestorSibling(root, element);
        continue;
      } // Walk shadow roots.


      const shadowRoot = element.__CE_shadowRoot;

      if (shadowRoot) {
        for (let child = shadowRoot.firstChild; child; child = child.nextSibling) {
          walkDeepDescendantElements(child, callback, visitedImports);
        }
      }
    }

    node = nextNode(root, node);
  }
}
/**
 * Used to suppress Closure's "Modifying the prototype is only allowed if the
 * constructor is in the same scope" warning without using
 * `@suppress {newCheckTypes, duplicate}` because `newCheckTypes` is too broad.
 *
 * @param {!Object} destination
 * @param {string} name
 * @param {*} value
 */

function setPropertyUnchecked(destination, name, value) {
  destination[name] = value;
}
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/CustomElementState.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * @enum {number}
 */
const CustomElementState = {
  custom: 1,
  failed: 2
};
/* harmony default export */ var src_CustomElementState = (CustomElementState);
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/CustomElementInternals.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


class CustomElementInternals_CustomElementInternals {
  constructor() {
    /** @type {!Map<string, !CustomElementDefinition>} */
    this._localNameToDefinition = new Map();
    /** @type {!Map<!Function, !CustomElementDefinition>} */

    this._constructorToDefinition = new Map();
    /** @type {!Array<!function(!Node)>} */

    this._patchesNode = [];
    /** @type {!Array<!function(!Element)>} */

    this._patchesElement = [];
    /** @type {boolean} */

    this._hasPatches = false;
  }
  /**
   * @param {string} localName
   * @param {!CustomElementDefinition} definition
   */


  setDefinition(localName, definition) {
    this._localNameToDefinition.set(localName, definition);

    this._constructorToDefinition.set(definition.constructorFunction, definition);
  }
  /**
   * @param {string} localName
   * @return {!CustomElementDefinition|undefined}
   */


  localNameToDefinition(localName) {
    return this._localNameToDefinition.get(localName);
  }
  /**
   * @param {!Function} constructor
   * @return {!CustomElementDefinition|undefined}
   */


  constructorToDefinition(constructor) {
    return this._constructorToDefinition.get(constructor);
  }
  /**
   * @param {!function(!Node)} patch
   */


  addNodePatch(patch) {
    this._hasPatches = true;

    this._patchesNode.push(patch);
  }
  /**
   * @param {!function(!Element)} patch
   */


  addElementPatch(patch) {
    this._hasPatches = true;

    this._patchesElement.push(patch);
  }
  /**
   * @param {!Node} node
   */


  patchTree(node) {
    if (!this._hasPatches) return;
    walkDeepDescendantElements(node, element => this.patchElement(element));
  }
  /**
   * @param {!Node} node
   */


  patchNode(node) {
    if (!this._hasPatches) return;
    if (node.__CE_patched) return;
    node.__CE_patched = true;

    for (let i = 0; i < this._patchesNode.length; i++) {
      this._patchesNode[i](node);
    }
  }
  /**
   * @param {!Element} element
   */


  patchElement(element) {
    if (!this._hasPatches) return;
    if (element.__CE_patched) return;
    element.__CE_patched = true;

    for (let i = 0; i < this._patchesNode.length; i++) {
      this._patchesNode[i](element);
    }

    for (let i = 0; i < this._patchesElement.length; i++) {
      this._patchesElement[i](element);
    }
  }
  /**
   * @param {!Node} root
   */


  connectTree(root) {
    const elements = [];
    walkDeepDescendantElements(root, element => elements.push(element));

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.__CE_state === src_CustomElementState.custom) {
        this.connectedCallback(element);
      } else {
        this.upgradeElement(element);
      }
    }
  }
  /**
   * @param {!Node} root
   */


  disconnectTree(root) {
    const elements = [];
    walkDeepDescendantElements(root, element => elements.push(element));

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.__CE_state === src_CustomElementState.custom) {
        this.disconnectedCallback(element);
      }
    }
  }
  /**
   * Upgrades all uncustomized custom elements at and below a root node for
   * which there is a definition. When custom element reaction callbacks are
   * assumed to be called synchronously (which, by the current DOM / HTML spec
   * definitions, they are *not*), callbacks for both elements customized
   * synchronously by the parser and elements being upgraded occur in the same
   * relative order.
   *
   * NOTE: This function, when used to simulate the construction of a tree that
   * is already created but not customized (i.e. by the parser), does *not*
   * prevent the element from reading the 'final' (true) state of the tree. For
   * example, the element, during truly synchronous parsing / construction would
   * see that it contains no children as they have not yet been inserted.
   * However, this function does not modify the tree, the element will
   * (incorrectly) have children. Additionally, self-modification restrictions
   * for custom element constructors imposed by the DOM spec are *not* enforced.
   *
   *
   * The following nested list shows the steps extending down from the HTML
   * spec's parsing section that cause elements to be synchronously created and
   * upgraded:
   *
   * The "in body" insertion mode:
   * https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
   * - Switch on token:
   *   .. other cases ..
   *   -> Any other start tag
   *      - [Insert an HTML element](below) for the token.
   *
   * Insert an HTML element:
   * https://html.spec.whatwg.org/multipage/syntax.html#insert-an-html-element
   * - Insert a foreign element for the token in the HTML namespace:
   *   https://html.spec.whatwg.org/multipage/syntax.html#insert-a-foreign-element
   *   - Create an element for a token:
   *     https://html.spec.whatwg.org/multipage/syntax.html#create-an-element-for-the-token
   *     - Will execute script flag is true?
   *       - (Element queue pushed to the custom element reactions stack.)
   *     - Create an element:
   *       https://dom.spec.whatwg.org/#concept-create-element
   *       - Sync CE flag is true?
   *         - Constructor called.
   *         - Self-modification restrictions enforced.
   *       - Sync CE flag is false?
   *         - (Upgrade reaction enqueued.)
   *     - Attributes appended to element.
   *       (`attributeChangedCallback` reactions enqueued.)
   *     - Will execute script flag is true?
   *       - (Element queue popped from the custom element reactions stack.
   *         Reactions in the popped stack are invoked.)
   *   - (Element queue pushed to the custom element reactions stack.)
   *   - Insert the element:
   *     https://dom.spec.whatwg.org/#concept-node-insert
   *     - Shadow-including descendants are connected. During parsing
   *       construction, there are no shadow-*excluding* descendants.
   *       However, the constructor may have validly attached a shadow
   *       tree to itself and added descendants to that shadow tree.
   *       (`connectedCallback` reactions enqueued.)
   *   - (Element queue popped from the custom element reactions stack.
   *     Reactions in the popped stack are invoked.)
   *
   * @param {!Node} root
   * @param {{
   *   visitedImports: (!Set<!Node>|undefined),
   *   upgrade: (!function(!Element)|undefined),
   * }=} options
   */


  patchAndUpgradeTree(root, options = {}) {
    const visitedImports = options.visitedImports || new Set();

    const upgrade = options.upgrade || (element => this.upgradeElement(element));

    const elements = [];

    const gatherElements = element => {
      if (element.localName === 'link' && element.getAttribute('rel') === 'import') {
        // The HTML Imports polyfill sets a descendant element of the link to
        // the `import` property, specifically this is *not* a Document.
        const importNode =
        /** @type {?Node} */
        element.import;

        if (importNode instanceof Node) {
          importNode.__CE_isImportDocument = true; // Connected links are associated with the registry.

          importNode.__CE_hasRegistry = true;
        }

        if (importNode && importNode.readyState === 'complete') {
          importNode.__CE_documentLoadHandled = true;
        } else {
          // If this link's import root is not available, its contents can't be
          // walked. Wait for 'load' and walk it when it's ready.
          element.addEventListener('load', () => {
            const importNode =
            /** @type {!Node} */
            element.import;
            if (importNode.__CE_documentLoadHandled) return;
            importNode.__CE_documentLoadHandled = true; // Clone the `visitedImports` set that was populated sync during
            // the `patchAndUpgradeTree` call that caused this 'load' handler to
            // be added. Then, remove *this* link's import node so that we can
            // walk that import again, even if it was partially walked later
            // during the same `patchAndUpgradeTree` call.

            const clonedVisitedImports = new Set(visitedImports);
            clonedVisitedImports.delete(importNode);
            this.patchAndUpgradeTree(importNode, {
              visitedImports: clonedVisitedImports,
              upgrade
            });
          });
        }
      } else {
        elements.push(element);
      }
    }; // `walkDeepDescendantElements` populates (and internally checks against)
    // `visitedImports` when traversing a loaded import.


    walkDeepDescendantElements(root, gatherElements, visitedImports);

    if (this._hasPatches) {
      for (let i = 0; i < elements.length; i++) {
        this.patchElement(elements[i]);
      }
    }

    for (let i = 0; i < elements.length; i++) {
      upgrade(elements[i]);
    }
  }
  /**
   * @param {!HTMLElement} element
   */


  upgradeElement(element) {
    const currentState = element.__CE_state;
    if (currentState !== undefined) return; // Prevent elements created in documents without a browsing context from
    // upgrading.
    //
    // https://html.spec.whatwg.org/multipage/custom-elements.html#look-up-a-custom-element-definition
    //   "If document does not have a browsing context, return null."
    //
    // https://html.spec.whatwg.org/multipage/window-object.html#dom-document-defaultview
    //   "The defaultView IDL attribute of the Document interface, on getting,
    //   must return this Document's browsing context's WindowProxy object, if
    //   this Document has an associated browsing context, or null otherwise."

    const ownerDocument = element.ownerDocument;
    if (!ownerDocument.defaultView && !(ownerDocument.__CE_isImportDocument && ownerDocument.__CE_hasRegistry)) return;
    const definition = this.localNameToDefinition(element.localName);
    if (!definition) return;
    definition.constructionStack.push(element);
    const constructor = definition.constructorFunction;

    try {
      try {
        let result = new constructor();

        if (result !== element) {
          throw new Error('The custom element constructor did not produce the element being upgraded.');
        }
      } finally {
        definition.constructionStack.pop();
      }
    } catch (e) {
      element.__CE_state = src_CustomElementState.failed;
      throw e;
    }

    element.__CE_state = src_CustomElementState.custom;
    element.__CE_definition = definition;

    if (definition.attributeChangedCallback) {
      const observedAttributes = definition.observedAttributes;

      for (let i = 0; i < observedAttributes.length; i++) {
        const name = observedAttributes[i];
        const value = element.getAttribute(name);

        if (value !== null) {
          this.attributeChangedCallback(element, name, null, value, null);
        }
      }
    }

    if (Utilities_isConnected(element)) {
      this.connectedCallback(element);
    }
  }
  /**
   * @param {!Element} element
   */


  connectedCallback(element) {
    const definition = element.__CE_definition;

    if (definition.connectedCallback) {
      definition.connectedCallback.call(element);
    }
  }
  /**
   * @param {!Element} element
   */


  disconnectedCallback(element) {
    const definition = element.__CE_definition;

    if (definition.disconnectedCallback) {
      definition.disconnectedCallback.call(element);
    }
  }
  /**
   * @param {!Element} element
   * @param {string} name
   * @param {?string} oldValue
   * @param {?string} newValue
   * @param {?string} namespace
   */


  attributeChangedCallback(element, name, oldValue, newValue, namespace) {
    const definition = element.__CE_definition;

    if (definition.attributeChangedCallback && definition.observedAttributes.indexOf(name) > -1) {
      definition.attributeChangedCallback.call(element, name, oldValue, newValue, namespace);
    }
  }

}
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/DocumentConstructionObserver.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

class DocumentConstructionObserver {
  constructor(internals, doc) {
    /**
     * @type {!CustomElementInternals}
     */
    this._internals = internals;
    /**
     * @type {!Document}
     */

    this._document = doc;
    /**
     * @type {MutationObserver|undefined}
     */

    this._observer = undefined; // Simulate tree construction for all currently accessible nodes in the
    // document.

    this._internals.patchAndUpgradeTree(this._document);

    if (this._document.readyState === 'loading') {
      this._observer = new MutationObserver(this._handleMutations.bind(this)); // Nodes created by the parser are given to the observer *before* the next
      // task runs. Inline scripts are run in a new task. This means that the
      // observer will be able to handle the newly parsed nodes before the inline
      // script is run.

      this._observer.observe(this._document, {
        childList: true,
        subtree: true
      });
    }
  }

  disconnect() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }
  /**
   * @param {!Array<!MutationRecord>} mutations
   */


  _handleMutations(mutations) {
    // Once the document's `readyState` is 'interactive' or 'complete', all new
    // nodes created within that document will be the result of script and
    // should be handled by patching.
    const readyState = this._document.readyState;

    if (readyState === 'interactive' || readyState === 'complete') {
      this.disconnect();
    }

    for (let i = 0; i < mutations.length; i++) {
      const addedNodes = mutations[i].addedNodes;

      for (let j = 0; j < addedNodes.length; j++) {
        const node = addedNodes[j];

        this._internals.patchAndUpgradeTree(node);
      }
    }
  }

}
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Deferred.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * @template T
 */
class Deferred {
  constructor() {
    /**
     * @private
     * @type {T|undefined}
     */
    this._value = undefined;
    /**
     * @private
     * @type {Function|undefined}
     */

    this._resolve = undefined;
    /**
     * @private
     * @type {!Promise<T>}
     */

    this._promise = new Promise(resolve => {
      this._resolve = resolve;

      if (this._value) {
        resolve(this._value);
      }
    });
  }
  /**
   * @param {T} value
   */


  resolve(value) {
    if (this._value) {
      throw new Error('Already resolved.');
    }

    this._value = value;

    if (this._resolve) {
      this._resolve(value);
    }
  }
  /**
   * @return {!Promise<T>}
   */


  toPromise() {
    return this._promise;
  }

}
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/CustomElementRegistry.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */




/**
 * @unrestricted
 */

class CustomElementRegistry_CustomElementRegistry {
  /**
   * @param {!CustomElementInternals} internals
   */
  constructor(internals) {
    /**
     * @private
     * @type {boolean}
     */
    this._elementDefinitionIsRunning = false;
    /**
     * @private
     * @type {!CustomElementInternals}
     */

    this._internals = internals;
    /**
     * @private
     * @type {!Map<string, !Deferred<undefined>>}
     */

    this._whenDefinedDeferred = new Map();
    /**
     * The default flush callback triggers the document walk synchronously.
     * @private
     * @type {!Function}
     */

    this._flushCallback = fn => fn();
    /**
     * @private
     * @type {boolean}
     */


    this._flushPending = false;
    /**
     * @private
     * @type {!Array<!CustomElementDefinition>}
     */

    this._pendingDefinitions = [];
    /**
     * @private
     * @type {!DocumentConstructionObserver}
     */

    this._documentConstructionObserver = new DocumentConstructionObserver(internals, document);
  }
  /**
   * @param {string} localName
   * @param {!Function} constructor
   */


  define(localName, constructor) {
    if (!(constructor instanceof Function)) {
      throw new TypeError('Custom element constructors must be functions.');
    }

    if (!isValidCustomElementName(localName)) {
      throw new SyntaxError(`The element name '${localName}' is not valid.`);
    }

    if (this._internals.localNameToDefinition(localName)) {
      throw new Error(`A custom element with name '${localName}' has already been defined.`);
    }

    if (this._elementDefinitionIsRunning) {
      throw new Error('A custom element is already being defined.');
    }

    this._elementDefinitionIsRunning = true;
    let connectedCallback;
    let disconnectedCallback;
    let adoptedCallback;
    let attributeChangedCallback;
    let observedAttributes;

    try {
      /** @type {!Object} */
      const prototype = constructor.prototype;

      if (!(prototype instanceof Object)) {
        throw new TypeError('The custom element constructor\'s prototype is not an object.');
      }

      function getCallback(name) {
        const callbackValue = prototype[name];

        if (callbackValue !== undefined && !(callbackValue instanceof Function)) {
          throw new Error(`The '${name}' callback must be a function.`);
        }

        return callbackValue;
      }

      connectedCallback = getCallback('connectedCallback');
      disconnectedCallback = getCallback('disconnectedCallback');
      adoptedCallback = getCallback('adoptedCallback');
      attributeChangedCallback = getCallback('attributeChangedCallback');
      observedAttributes = constructor['observedAttributes'] || [];
    } catch (e) {
      return;
    } finally {
      this._elementDefinitionIsRunning = false;
    }

    const definition = {
      localName,
      constructorFunction: constructor,
      connectedCallback,
      disconnectedCallback,
      adoptedCallback,
      attributeChangedCallback,
      observedAttributes,
      constructionStack: []
    };

    this._internals.setDefinition(localName, definition);

    this._pendingDefinitions.push(definition); // If we've already called the flush callback and it hasn't called back yet,
    // don't call it again.


    if (!this._flushPending) {
      this._flushPending = true;

      this._flushCallback(() => this._flush());
    }
  }

  upgrade(element) {
    this._internals.patchAndUpgradeTree(element);
  }

  _flush() {
    // If no new definitions were defined, don't attempt to flush. This could
    // happen if a flush callback keeps the function it is given and calls it
    // multiple times.
    if (this._flushPending === false) return;
    this._flushPending = false;
    const pendingDefinitions = this._pendingDefinitions;
    /**
     * Unupgraded elements with definitions that were defined *before* the last
     * flush, in document order.
     * @type {!Array<!HTMLElement>}
     */

    const elementsWithStableDefinitions = [];
    /**
     * A map from `localName`s of definitions that were defined *after* the last
     * flush to unupgraded elements matching that definition, in document order.
     * @type {!Map<string, !Array<!HTMLElement>>}
     */

    const elementsWithPendingDefinitions = new Map();

    for (let i = 0; i < pendingDefinitions.length; i++) {
      elementsWithPendingDefinitions.set(pendingDefinitions[i].localName, []);
    }

    this._internals.patchAndUpgradeTree(document, {
      upgrade: element => {
        // Ignore the element if it has already upgraded or failed to upgrade.
        if (element.__CE_state !== undefined) return;
        const localName = element.localName; // If there is an applicable pending definition for the element, add the
        // element to the list of elements to be upgraded with that definition.

        const pendingElements = elementsWithPendingDefinitions.get(localName);

        if (pendingElements) {
          pendingElements.push(element); // If there is *any other* applicable definition for the element, add it
          // to the list of elements with stable definitions that need to be upgraded.
        } else if (this._internals.localNameToDefinition(localName)) {
          elementsWithStableDefinitions.push(element);
        }
      }
    }); // Upgrade elements with 'stable' definitions first.


    for (let i = 0; i < elementsWithStableDefinitions.length; i++) {
      this._internals.upgradeElement(elementsWithStableDefinitions[i]);
    } // Upgrade elements with 'pending' definitions in the order they were defined.


    while (pendingDefinitions.length > 0) {
      const definition = pendingDefinitions.shift();
      const localName = definition.localName; // Attempt to upgrade all applicable elements.

      const pendingUpgradableElements = elementsWithPendingDefinitions.get(definition.localName);

      for (let i = 0; i < pendingUpgradableElements.length; i++) {
        this._internals.upgradeElement(pendingUpgradableElements[i]);
      } // Resolve any promises created by `whenDefined` for the definition.


      const deferred = this._whenDefinedDeferred.get(localName);

      if (deferred) {
        deferred.resolve(undefined);
      }
    }
  }
  /**
   * @param {string} localName
   * @return {Function|undefined}
   */


  get(localName) {
    const definition = this._internals.localNameToDefinition(localName);

    if (definition) {
      return definition.constructorFunction;
    }

    return undefined;
  }
  /**
   * @param {string} localName
   * @return {!Promise<undefined>}
   */


  whenDefined(localName) {
    if (!isValidCustomElementName(localName)) {
      return Promise.reject(new SyntaxError(`'${localName}' is not a valid custom element name.`));
    }

    const prior = this._whenDefinedDeferred.get(localName);

    if (prior) {
      return prior.toPromise();
    }

    const deferred = new Deferred();

    this._whenDefinedDeferred.set(localName, deferred);

    const definition = this._internals.localNameToDefinition(localName); // Resolve immediately only if the given local name has a definition *and*
    // the full document walk to upgrade elements with that local name has
    // already happened.


    if (definition && !this._pendingDefinitions.some(d => d.localName === localName)) {
      deferred.resolve(undefined);
    }

    return deferred.toPromise();
  }

  polyfillWrapFlushCallback(outer) {
    this._documentConstructionObserver.disconnect();

    const inner = this._flushCallback;

    this._flushCallback = flush => outer(() => inner(flush));
  }

} // Closure compiler exports.

window['CustomElementRegistry'] = CustomElementRegistry_CustomElementRegistry;
CustomElementRegistry_CustomElementRegistry.prototype['define'] = CustomElementRegistry_CustomElementRegistry.prototype.define;
CustomElementRegistry_CustomElementRegistry.prototype['upgrade'] = CustomElementRegistry_CustomElementRegistry.prototype.upgrade;
CustomElementRegistry_CustomElementRegistry.prototype['get'] = CustomElementRegistry_CustomElementRegistry.prototype.get;
CustomElementRegistry_CustomElementRegistry.prototype['whenDefined'] = CustomElementRegistry_CustomElementRegistry.prototype.whenDefined;
CustomElementRegistry_CustomElementRegistry.prototype['polyfillWrapFlushCallback'] = CustomElementRegistry_CustomElementRegistry.prototype.polyfillWrapFlushCallback;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/Native.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
/* harmony default export */ var Native = ({
  Document_createElement: window.Document.prototype.createElement,
  Document_createElementNS: window.Document.prototype.createElementNS,
  Document_importNode: window.Document.prototype.importNode,
  Document_prepend: window.Document.prototype['prepend'],
  Document_append: window.Document.prototype['append'],
  DocumentFragment_prepend: window.DocumentFragment.prototype['prepend'],
  DocumentFragment_append: window.DocumentFragment.prototype['append'],
  Node_cloneNode: window.Node.prototype.cloneNode,
  Node_appendChild: window.Node.prototype.appendChild,
  Node_insertBefore: window.Node.prototype.insertBefore,
  Node_removeChild: window.Node.prototype.removeChild,
  Node_replaceChild: window.Node.prototype.replaceChild,
  Node_textContent: Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
  Element_attachShadow: window.Element.prototype['attachShadow'],
  Element_innerHTML: Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
  Element_getAttribute: window.Element.prototype.getAttribute,
  Element_setAttribute: window.Element.prototype.setAttribute,
  Element_removeAttribute: window.Element.prototype.removeAttribute,
  Element_getAttributeNS: window.Element.prototype.getAttributeNS,
  Element_setAttributeNS: window.Element.prototype.setAttributeNS,
  Element_removeAttributeNS: window.Element.prototype.removeAttributeNS,
  Element_insertAdjacentElement: window.Element.prototype['insertAdjacentElement'],
  Element_insertAdjacentHTML: window.Element.prototype['insertAdjacentHTML'],
  Element_prepend: window.Element.prototype['prepend'],
  Element_append: window.Element.prototype['append'],
  Element_before: window.Element.prototype['before'],
  Element_after: window.Element.prototype['after'],
  Element_replaceWith: window.Element.prototype['replaceWith'],
  Element_remove: window.Element.prototype['remove'],
  HTMLElement: window.HTMLElement,
  HTMLElement_innerHTML: Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML'),
  HTMLElement_insertAdjacentElement: window.HTMLElement.prototype['insertAdjacentElement'],
  HTMLElement_insertAdjacentHTML: window.HTMLElement.prototype['insertAdjacentHTML']
});
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/AlreadyConstructedMarker.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * This class exists only to work around Closure's lack of a way to describe
 * singletons. It represents the 'already constructed marker' used in custom
 * element construction stacks.
 *
 * https://html.spec.whatwg.org/#concept-already-constructed-marker
 * @extends AlreadyConstructedMarkerType
 */
class AlreadyConstructedMarker {}

/* harmony default export */ var src_AlreadyConstructedMarker = (new AlreadyConstructedMarker());
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/HTMLElement.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */




/**
 * @param {!CustomElementInternals} internals
 */

/* harmony default export */ var Patch_HTMLElement = (function (internals) {
  window['HTMLElement'] = function () {
    /**
     * @type {function(new: HTMLElement): !HTMLElement}
     */
    function HTMLElement() {
      // This should really be `new.target` but `new.target` can't be emulated
      // in ES5. Assuming the user keeps the default value of the constructor's
      // prototype's `constructor` property, this is equivalent.
      const constructor =
      /** @type {!Function} */
      this.constructor;
      const definition = internals.constructorToDefinition(constructor);

      if (!definition) {
        throw new Error('The custom element being constructed was not registered with `customElements`.');
      }

      const constructionStack = definition.constructionStack;

      if (constructionStack.length === 0) {
        const element =
        /** @type {!HTMLElement} */
        Native.Document_createElement.call(document, definition.localName);
        Object.setPrototypeOf(element, constructor.prototype);
        element.__CE_state = src_CustomElementState.custom;
        element.__CE_definition = definition;
        internals.patchElement(element);
        return element;
      }

      const lastIndex = constructionStack.length - 1;
      const element = constructionStack[lastIndex];

      if (element === src_AlreadyConstructedMarker) {
        throw new Error('The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.');
      }

      const toConstructElement =
      /** @type {!HTMLElement} */
      element;
      constructionStack[lastIndex] = src_AlreadyConstructedMarker;
      Object.setPrototypeOf(toConstructElement, constructor.prototype);
      internals.patchElement(toConstructElement);
      return toConstructElement;
    }

    HTMLElement.prototype = Native.HTMLElement.prototype; // Safari 9 has `writable: false` on the propertyDescriptor
    // Make it writable so that TypeScript can patch up the
    // constructor in the ES5 compiled code.

    Object.defineProperty(HTMLElement.prototype, 'constructor', {
      writable: true,
      configurable: true,
      enumerable: false,
      value: HTMLElement
    });
    return HTMLElement;
  }();
});
;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/Interface/ParentNode.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


/**
 * @typedef {{
 *   prepend: !function(...(!Node|string)),
  *  append: !function(...(!Node|string)),
 * }}
 */

let ParentNodeNativeMethods;
/**
 * @param {!CustomElementInternals} internals
 * @param {!Object} destination
 * @param {!ParentNodeNativeMethods} builtIn
 */

/* harmony default export */ var ParentNode = (function (internals, destination, builtIn) {
  /**
   * @param {!function(...(!Node|string))} builtInMethod
   * @return {!function(...(!Node|string))}
   */
  function appendPrependPatch(builtInMethod) {
    return (
      /** @this {!Node} */
      function (...nodes) {
        /**
         * A copy of `nodes`, with any DocumentFragment replaced by its children.
         * @type {!Array<!Node>}
         */
        const flattenedNodes = [];
        /**
         * Elements in `nodes` that were connected before this call.
         * @type {!Array<!Node>}
         */

        const connectedElements = [];

        for (var i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          if (node instanceof Element && Utilities_isConnected(node)) {
            connectedElements.push(node);
          }

          if (node instanceof DocumentFragment) {
            for (let child = node.firstChild; child; child = child.nextSibling) {
              flattenedNodes.push(child);
            }
          } else {
            flattenedNodes.push(node);
          }
        }

        builtInMethod.apply(this, nodes);

        for (let i = 0; i < connectedElements.length; i++) {
          internals.disconnectTree(connectedElements[i]);
        }

        if (Utilities_isConnected(this)) {
          for (let i = 0; i < flattenedNodes.length; i++) {
            const node = flattenedNodes[i];

            if (node instanceof Element) {
              internals.connectTree(node);
            }
          }
        }
      }
    );
  }

  if (builtIn.prepend !== undefined) {
    setPropertyUnchecked(destination, 'prepend', appendPrependPatch(builtIn.prepend));
  }

  if (builtIn.append !== undefined) {
    setPropertyUnchecked(destination, 'append', appendPrependPatch(builtIn.append));
  }
});
;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/Document.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */




/**
 * @param {!CustomElementInternals} internals
 */

/* harmony default export */ var Patch_Document = (function (internals) {
  setPropertyUnchecked(Document.prototype, 'createElement',
  /**
   * @this {Document}
   * @param {string} localName
   * @return {!Element}
   */
  function (localName) {
    // Only create custom elements if this document is associated with the registry.
    if (this.__CE_hasRegistry) {
      const definition = internals.localNameToDefinition(localName);

      if (definition) {
        return new definition.constructorFunction();
      }
    }

    const result =
    /** @type {!Element} */
    Native.Document_createElement.call(this, localName);
    internals.patchElement(result);
    return result;
  });
  setPropertyUnchecked(Document.prototype, 'importNode',
  /**
   * @this {Document}
   * @param {!Node} node
   * @param {boolean=} deep
   * @return {!Node}
   */
  function (node, deep) {
    const clone =
    /** @type {!Node} */
    Native.Document_importNode.call(this, node, !!deep); // Only create custom elements if this document is associated with the registry.

    if (!this.__CE_hasRegistry) {
      internals.patchTree(clone);
    } else {
      internals.patchAndUpgradeTree(clone);
    }

    return clone;
  });
  const NS_HTML = "http://www.w3.org/1999/xhtml";
  setPropertyUnchecked(Document.prototype, 'createElementNS',
  /**
   * @this {Document}
   * @param {?string} namespace
   * @param {string} localName
   * @return {!Element}
   */
  function (namespace, localName) {
    // Only create custom elements if this document is associated with the registry.
    if (this.__CE_hasRegistry && (namespace === null || namespace === NS_HTML)) {
      const definition = internals.localNameToDefinition(localName);

      if (definition) {
        return new definition.constructorFunction();
      }
    }

    const result =
    /** @type {!Element} */
    Native.Document_createElementNS.call(this, namespace, localName);
    internals.patchElement(result);
    return result;
  });
  ParentNode(internals, Document.prototype, {
    prepend: Native.Document_prepend,
    append: Native.Document_append
  });
});
;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/DocumentFragment.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */



/**
 * @param {!CustomElementInternals} internals
 */

/* harmony default export */ var Patch_DocumentFragment = (function (internals) {
  ParentNode(internals, DocumentFragment.prototype, {
    prepend: Native.DocumentFragment_prepend,
    append: Native.DocumentFragment_append
  });
});
;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/Node.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */



/**
 * @param {!CustomElementInternals} internals
 */

/* harmony default export */ var Patch_Node = (function (internals) {
  // `Node#nodeValue` is implemented on `Attr`.
  // `Node#textContent` is implemented on `Attr`, `Element`.
  setPropertyUnchecked(Node.prototype, 'insertBefore',
  /**
   * @this {Node}
   * @param {!Node} node
   * @param {?Node} refNode
   * @return {!Node}
   */
  function (node, refNode) {
    if (node instanceof DocumentFragment) {
      const insertedNodes = Array.prototype.slice.apply(node.childNodes);
      const nativeResult = Native.Node_insertBefore.call(this, node, refNode); // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (Utilities_isConnected(this)) {
        for (let i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return nativeResult;
    }

    const nodeWasConnected = Utilities_isConnected(node);
    const nativeResult = Native.Node_insertBefore.call(this, node, refNode);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    if (Utilities_isConnected(this)) {
      internals.connectTree(node);
    }

    return nativeResult;
  });
  setPropertyUnchecked(Node.prototype, 'appendChild',
  /**
   * @this {Node}
   * @param {!Node} node
   * @return {!Node}
   */
  function (node) {
    if (node instanceof DocumentFragment) {
      const insertedNodes = Array.prototype.slice.apply(node.childNodes);
      const nativeResult = Native.Node_appendChild.call(this, node); // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (Utilities_isConnected(this)) {
        for (let i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return nativeResult;
    }

    const nodeWasConnected = Utilities_isConnected(node);
    const nativeResult = Native.Node_appendChild.call(this, node);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    if (Utilities_isConnected(this)) {
      internals.connectTree(node);
    }

    return nativeResult;
  });
  setPropertyUnchecked(Node.prototype, 'cloneNode',
  /**
   * @this {Node}
   * @param {boolean=} deep
   * @return {!Node}
   */
  function (deep) {
    const clone = Native.Node_cloneNode.call(this, !!deep); // Only create custom elements if this element's owner document is
    // associated with the registry.

    if (!this.ownerDocument.__CE_hasRegistry) {
      internals.patchTree(clone);
    } else {
      internals.patchAndUpgradeTree(clone);
    }

    return clone;
  });
  setPropertyUnchecked(Node.prototype, 'removeChild',
  /**
   * @this {Node}
   * @param {!Node} node
   * @return {!Node}
   */
  function (node) {
    const nodeWasConnected = Utilities_isConnected(node);
    const nativeResult = Native.Node_removeChild.call(this, node);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    return nativeResult;
  });
  setPropertyUnchecked(Node.prototype, 'replaceChild',
  /**
   * @this {Node}
   * @param {!Node} nodeToInsert
   * @param {!Node} nodeToRemove
   * @return {!Node}
   */
  function (nodeToInsert, nodeToRemove) {
    if (nodeToInsert instanceof DocumentFragment) {
      const insertedNodes = Array.prototype.slice.apply(nodeToInsert.childNodes);
      const nativeResult = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove); // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (Utilities_isConnected(this)) {
        internals.disconnectTree(nodeToRemove);

        for (let i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return nativeResult;
    }

    const nodeToInsertWasConnected = Utilities_isConnected(nodeToInsert);
    const nativeResult = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove);
    const thisIsConnected = Utilities_isConnected(this);

    if (thisIsConnected) {
      internals.disconnectTree(nodeToRemove);
    }

    if (nodeToInsertWasConnected) {
      internals.disconnectTree(nodeToInsert);
    }

    if (thisIsConnected) {
      internals.connectTree(nodeToInsert);
    }

    return nativeResult;
  });

  function patch_textContent(destination, baseDescriptor) {
    Object.defineProperty(destination, 'textContent', {
      enumerable: baseDescriptor.enumerable,
      configurable: true,
      get: baseDescriptor.get,
      set:
      /** @this {Node} */
      function (assignedValue) {
        // If this is a text node then there are no nodes to disconnect.
        if (this.nodeType === Node.TEXT_NODE) {
          baseDescriptor.set.call(this, assignedValue);
          return;
        }

        let removedNodes = undefined; // Checking for `firstChild` is faster than reading `childNodes.length`
        // to compare with 0.

        if (this.firstChild) {
          // Using `childNodes` is faster than `children`, even though we only
          // care about elements.
          const childNodes = this.childNodes;
          const childNodesLength = childNodes.length;

          if (childNodesLength > 0 && Utilities_isConnected(this)) {
            // Copying an array by iterating is faster than using slice.
            removedNodes = new Array(childNodesLength);

            for (let i = 0; i < childNodesLength; i++) {
              removedNodes[i] = childNodes[i];
            }
          }
        }

        baseDescriptor.set.call(this, assignedValue);

        if (removedNodes) {
          for (let i = 0; i < removedNodes.length; i++) {
            internals.disconnectTree(removedNodes[i]);
          }
        }
      }
    });
  }

  if (Native.Node_textContent && Native.Node_textContent.get) {
    patch_textContent(Node.prototype, Native.Node_textContent);
  } else {
    internals.addNodePatch(function (element) {
      patch_textContent(element, {
        enumerable: true,
        configurable: true,
        // NOTE: This implementation of the `textContent` getter assumes that
        // text nodes' `textContent` getter will not be patched.
        get:
        /** @this {Node} */
        function () {
          /** @type {!Array<string>} */
          const parts = [];

          for (let i = 0; i < this.childNodes.length; i++) {
            const childNode = this.childNodes[i];

            if (childNode.nodeType === Node.COMMENT_NODE) {
              continue;
            }

            parts.push(childNode.textContent);
          }

          return parts.join('');
        },
        set:
        /** @this {Node} */
        function (assignedValue) {
          while (this.firstChild) {
            Native.Node_removeChild.call(this, this.firstChild);
          } // `textContent = null | undefined | ''` does not result in
          // a TextNode childNode


          if (assignedValue != null && assignedValue !== '') {
            Native.Node_appendChild.call(this, document.createTextNode(assignedValue));
          }
        }
      });
    });
  }
});
;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/Interface/ChildNode.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


/**
 * @typedef {{
 *   before: !function(...(!Node|string)),
 *   after: !function(...(!Node|string)),
 *   replaceWith: !function(...(!Node|string)),
 *   remove: !function(),
 * }}
 */

let ChildNodeNativeMethods;
/**
 * @param {!CustomElementInternals} internals
 * @param {!Object} destination
 * @param {!ChildNodeNativeMethods} builtIn
 */

/* harmony default export */ var ChildNode = (function (internals, destination, builtIn) {
  /**
   * @param {!function(...(!Node|string))} builtInMethod
   * @return {!function(...(!Node|string))}
   */
  function beforeAfterPatch(builtInMethod) {
    return (
      /** @this {!Node} */
      function (...nodes) {
        /**
         * A copy of `nodes`, with any DocumentFragment replaced by its children.
         * @type {!Array<!Node>}
         */
        const flattenedNodes = [];
        /**
         * Elements in `nodes` that were connected before this call.
         * @type {!Array<!Node>}
         */

        const connectedElements = [];

        for (var i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          if (node instanceof Element && Utilities_isConnected(node)) {
            connectedElements.push(node);
          }

          if (node instanceof DocumentFragment) {
            for (let child = node.firstChild; child; child = child.nextSibling) {
              flattenedNodes.push(child);
            }
          } else {
            flattenedNodes.push(node);
          }
        }

        builtInMethod.apply(this, nodes);

        for (let i = 0; i < connectedElements.length; i++) {
          internals.disconnectTree(connectedElements[i]);
        }

        if (Utilities_isConnected(this)) {
          for (let i = 0; i < flattenedNodes.length; i++) {
            const node = flattenedNodes[i];

            if (node instanceof Element) {
              internals.connectTree(node);
            }
          }
        }
      }
    );
  }

  if (builtIn.before !== undefined) {
    setPropertyUnchecked(destination, 'before', beforeAfterPatch(builtIn.before));
  }

  if (builtIn.before !== undefined) {
    setPropertyUnchecked(destination, 'after', beforeAfterPatch(builtIn.after));
  }

  if (builtIn.replaceWith !== undefined) {
    setPropertyUnchecked(destination, 'replaceWith',
    /**
     * @param {...(!Node|string)} nodes
     * @this {!Node}
     */
    function (...nodes) {
      /**
       * A copy of `nodes`, with any DocumentFragment replaced by its children.
       * @type {!Array<!Node|string>}
       */
      const flattenedNodes = [];
      /**
       * Elements in `nodes` that were connected before this call.
       * @type {!Array<!Node>}
       */

      const connectedElements = [];

      for (var i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node instanceof Element && Utilities_isConnected(node)) {
          connectedElements.push(node);
        }

        if (node instanceof DocumentFragment) {
          for (let child = node.firstChild; child; child = child.nextSibling) {
            flattenedNodes.push(child);
          }
        } else {
          flattenedNodes.push(node);
        }
      }

      const wasConnected = Utilities_isConnected(this);
      builtIn.replaceWith.apply(this, nodes);

      for (let i = 0; i < connectedElements.length; i++) {
        internals.disconnectTree(connectedElements[i]);
      }

      if (wasConnected) {
        internals.disconnectTree(this);

        for (let i = 0; i < flattenedNodes.length; i++) {
          const node = flattenedNodes[i];

          if (node instanceof Element) {
            internals.connectTree(node);
          }
        }
      }
    });
  }

  if (builtIn.remove !== undefined) {
    setPropertyUnchecked(destination, 'remove',
    /** @this {!Node} */
    function () {
      const wasConnected = Utilities_isConnected(this);
      builtIn.remove.call(this);

      if (wasConnected) {
        internals.disconnectTree(this);
      }
    });
  }
});
;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/Patch/Element.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */






/**
 * @param {!CustomElementInternals} internals
 */

/* harmony default export */ var Patch_Element = (function (internals) {
  if (Native.Element_attachShadow) {
    setPropertyUnchecked(Element.prototype, 'attachShadow',
    /**
     * @this {Element}
     * @param {!{mode: string}} init
     * @return {ShadowRoot}
     */
    function (init) {
      const shadowRoot = Native.Element_attachShadow.call(this, init);
      internals.patchNode(shadowRoot);
      this.__CE_shadowRoot = shadowRoot;
      return shadowRoot;
    });
  }

  function patch_innerHTML(destination, baseDescriptor) {
    Object.defineProperty(destination, 'innerHTML', {
      enumerable: baseDescriptor.enumerable,
      configurable: true,
      get: baseDescriptor.get,
      set:
      /** @this {Element} */
      function (htmlString) {
        const isConnected = Utilities_isConnected(this); // NOTE: In IE11, when using the native `innerHTML` setter, all nodes
        // that were previously descendants of the context element have all of
        // their children removed as part of the set - the entire subtree is
        // 'disassembled'. This work around walks the subtree *before* using the
        // native setter.

        /** @type {!Array<!Element>|undefined} */

        let removedElements = undefined;

        if (isConnected) {
          removedElements = [];
          walkDeepDescendantElements(this, element => {
            if (element !== this) {
              removedElements.push(element);
            }
          });
        }

        baseDescriptor.set.call(this, htmlString);

        if (removedElements) {
          for (let i = 0; i < removedElements.length; i++) {
            const element = removedElements[i];

            if (element.__CE_state === src_CustomElementState.custom) {
              internals.disconnectedCallback(element);
            }
          }
        } // Only create custom elements if this element's owner document is
        // associated with the registry.


        if (!this.ownerDocument.__CE_hasRegistry) {
          internals.patchTree(this);
        } else {
          internals.patchAndUpgradeTree(this);
        }

        return htmlString;
      }
    });
  }

  if (Native.Element_innerHTML && Native.Element_innerHTML.get) {
    patch_innerHTML(Element.prototype, Native.Element_innerHTML);
  } else if (Native.HTMLElement_innerHTML && Native.HTMLElement_innerHTML.get) {
    patch_innerHTML(HTMLElement.prototype, Native.HTMLElement_innerHTML);
  } else {
    internals.addElementPatch(function (element) {
      patch_innerHTML(element, {
        enumerable: true,
        configurable: true,
        // Implements getting `innerHTML` by performing an unpatched `cloneNode`
        // of the element and returning the resulting element's `innerHTML`.
        // TODO: Is this too expensive?
        get:
        /** @this {Element} */
        function () {
          return (
            /** @type {!Element} */
            Native.Node_cloneNode.call(this, true).innerHTML
          );
        },
        // Implements setting `innerHTML` by creating an unpatched element,
        // setting `innerHTML` of that element and replacing the target
        // element's children with those of the unpatched element.
        set:
        /** @this {Element} */
        function (assignedValue) {
          // NOTE: re-route to `content` for `template` elements.
          // We need to do this because `template.appendChild` does not
          // route into `template.content`.
          const isTemplate = this.localName === 'template';
          /** @type {!Node} */

          const content = isTemplate ?
          /** @type {!HTMLTemplateElement} */
          this.content : this;
          /** @type {!Element} */

          const rawElement = Native.Document_createElementNS.call(document, this.namespaceURI, this.localName);
          rawElement.innerHTML = assignedValue;

          while (content.childNodes.length > 0) {
            Native.Node_removeChild.call(content, content.childNodes[0]);
          }

          const container = isTemplate ?
          /** @type {!HTMLTemplateElement} */
          rawElement.content : rawElement;

          while (container.childNodes.length > 0) {
            Native.Node_appendChild.call(content, container.childNodes[0]);
          }
        }
      });
    });
  }

  setPropertyUnchecked(Element.prototype, 'setAttribute',
  /**
   * @this {Element}
   * @param {string} name
   * @param {string} newValue
   */
  function (name, newValue) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== src_CustomElementState.custom) {
      return Native.Element_setAttribute.call(this, name, newValue);
    }

    const oldValue = Native.Element_getAttribute.call(this, name);
    Native.Element_setAttribute.call(this, name, newValue);
    newValue = Native.Element_getAttribute.call(this, name);
    internals.attributeChangedCallback(this, name, oldValue, newValue, null);
  });
  setPropertyUnchecked(Element.prototype, 'setAttributeNS',
  /**
   * @this {Element}
   * @param {?string} namespace
   * @param {string} name
   * @param {string} newValue
   */
  function (namespace, name, newValue) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== src_CustomElementState.custom) {
      return Native.Element_setAttributeNS.call(this, namespace, name, newValue);
    }

    const oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
    Native.Element_setAttributeNS.call(this, namespace, name, newValue);
    newValue = Native.Element_getAttributeNS.call(this, namespace, name);
    internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
  });
  setPropertyUnchecked(Element.prototype, 'removeAttribute',
  /**
   * @this {Element}
   * @param {string} name
   */
  function (name) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== src_CustomElementState.custom) {
      return Native.Element_removeAttribute.call(this, name);
    }

    const oldValue = Native.Element_getAttribute.call(this, name);
    Native.Element_removeAttribute.call(this, name);

    if (oldValue !== null) {
      internals.attributeChangedCallback(this, name, oldValue, null, null);
    }
  });
  setPropertyUnchecked(Element.prototype, 'removeAttributeNS',
  /**
   * @this {Element}
   * @param {?string} namespace
   * @param {string} name
   */
  function (namespace, name) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== src_CustomElementState.custom) {
      return Native.Element_removeAttributeNS.call(this, namespace, name);
    }

    const oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
    Native.Element_removeAttributeNS.call(this, namespace, name); // In older browsers, `Element#getAttributeNS` may return the empty string
    // instead of null if the attribute does not exist. For details, see;
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNS#Notes

    const newValue = Native.Element_getAttributeNS.call(this, namespace, name);

    if (oldValue !== newValue) {
      internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
    }
  });

  function patch_insertAdjacentElement(destination, baseMethod) {
    setPropertyUnchecked(destination, 'insertAdjacentElement',
    /**
     * @this {Element}
     * @param {string} position
     * @param {!Element} element
     * @return {?Element}
     */
    function (position, element) {
      const wasConnected = Utilities_isConnected(element);
      const insertedElement =
      /** @type {!Element} */
      baseMethod.call(this, position, element);

      if (wasConnected) {
        internals.disconnectTree(element);
      }

      if (Utilities_isConnected(insertedElement)) {
        internals.connectTree(element);
      }

      return insertedElement;
    });
  }

  if (Native.HTMLElement_insertAdjacentElement) {
    patch_insertAdjacentElement(HTMLElement.prototype, Native.HTMLElement_insertAdjacentElement);
  } else if (Native.Element_insertAdjacentElement) {
    patch_insertAdjacentElement(Element.prototype, Native.Element_insertAdjacentElement);
  } else {
    console.warn('Custom Elements: `Element#insertAdjacentElement` was not patched.');
  }

  function patch_insertAdjacentHTML(destination, baseMethod) {
    /**
     * Patches and upgrades all nodes which are siblings between `start`
     * (inclusive) and `end` (exclusive). If `end` is `null`, then all siblings
     * following `start` will be patched and upgraded.
     * @param {!Node} start
     * @param {?Node} end
     */
    function upgradeNodesInRange(start, end) {
      const nodes = [];

      for (let node = start; node !== end; node = node.nextSibling) {
        nodes.push(node);
      }

      for (let i = 0; i < nodes.length; i++) {
        internals.patchAndUpgradeTree(nodes[i]);
      }
    }

    setPropertyUnchecked(destination, 'insertAdjacentHTML',
    /**
     * @this {Element}
     * @param {string} position
     * @param {string} text
     */
    function (position, text) {
      position = position.toLowerCase();

      if (position === "beforebegin") {
        const marker = this.previousSibling;
        baseMethod.call(this, position, text);
        upgradeNodesInRange(marker ||
        /** @type {!Node} */
        this.parentNode.firstChild, this);
      } else if (position === "afterbegin") {
        const marker = this.firstChild;
        baseMethod.call(this, position, text);
        upgradeNodesInRange(
        /** @type {!Node} */
        this.firstChild, marker);
      } else if (position === "beforeend") {
        const marker = this.lastChild;
        baseMethod.call(this, position, text);
        upgradeNodesInRange(marker ||
        /** @type {!Node} */
        this.firstChild, null);
      } else if (position === "afterend") {
        const marker = this.nextSibling;
        baseMethod.call(this, position, text);
        upgradeNodesInRange(
        /** @type {!Node} */
        this.nextSibling, marker);
      } else {
        throw new SyntaxError(`The value provided (${String(position)}) is ` + "not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      }
    });
  }

  if (Native.HTMLElement_insertAdjacentHTML) {
    patch_insertAdjacentHTML(HTMLElement.prototype, Native.HTMLElement_insertAdjacentHTML);
  } else if (Native.Element_insertAdjacentHTML) {
    patch_insertAdjacentHTML(Element.prototype, Native.Element_insertAdjacentHTML);
  } else {
    console.warn('Custom Elements: `Element#insertAdjacentHTML` was not patched.');
  }

  ParentNode(internals, Element.prototype, {
    prepend: Native.Element_prepend,
    append: Native.Element_append
  });
  ChildNode(internals, Element.prototype, {
    before: Native.Element_before,
    after: Native.Element_after,
    replaceWith: Native.Element_replaceWith,
    remove: Native.Element_remove
  });
});
;
// CONCATENATED MODULE: ./node_modules/@webcomponents/custom-elements/src/custom-elements.js
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */







const priorCustomElements = window['customElements'];

if (!priorCustomElements || priorCustomElements['forcePolyfill'] || typeof priorCustomElements['define'] != 'function' || typeof priorCustomElements['get'] != 'function') {
  /** @type {!CustomElementInternals} */
  const internals = new CustomElementInternals_CustomElementInternals();
  Patch_HTMLElement(internals);
  Patch_Document(internals);
  Patch_DocumentFragment(internals);
  Patch_Node(internals);
  Patch_Element(internals); // The main document is always associated with the registry.

  document.__CE_hasRegistry = true;
  /** @type {!CustomElementRegistry} */

  const customElements = new CustomElementRegistry_CustomElementRegistry(internals);
  Object.defineProperty(window, 'customElements', {
    configurable: true,
    enumerable: true,
    value: customElements
  });
}

/***/ })

}]);
//# sourceMappingURL=0.js.map