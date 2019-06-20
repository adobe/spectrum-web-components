(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 28:
/***/ (function(module, exports) {

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function () {
  'use strict'; // defaultPrevented is broken in IE.
  // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called

  var workingDefaultPrevented = function () {
    var e = document.createEvent('Event');
    e.initEvent('foo', true, true);
    e.preventDefault();
    return e.defaultPrevented;
  }();

  if (!workingDefaultPrevented) {
    var origPreventDefault = Event.prototype.preventDefault;

    Event.prototype.preventDefault = function () {
      if (!this.cancelable) {
        return;
      }

      origPreventDefault.call(this);
      Object.defineProperty(this, 'defaultPrevented', {
        get: function () {
          return true;
        },
        configurable: true
      });
    };
  }

  var isIE = /Trident/.test(navigator.userAgent); // Event constructor shim

  if (!window.Event || isIE && typeof window.Event !== 'function') {
    var origEvent = window.Event;
    /**
     * @param {!string} inType
     * @param {?(EventInit)=} params
     */

    window.Event = function (inType, params) {
      params = params || {};
      var e = document.createEvent('Event');
      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
      return e;
    };

    if (origEvent) {
      for (var i in origEvent) {
        window.Event[i] = origEvent[i];
      }

      window.Event.prototype = origEvent.prototype;
    }
  } // CustomEvent constructor shim


  if (!window.CustomEvent || isIE && typeof window.CustomEvent !== 'function') {
    /**
     * @template T
     * @param {!string} inType
     * @param {?(CustomEventInit<T>)=} params
     */
    window.CustomEvent = function (inType, params) {
      params = params || {};
      var e =
      /** @type {!CustomEvent} */
      document.createEvent('CustomEvent');
      e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
      return e;
    };

    window.CustomEvent.prototype = window.Event.prototype;
  }

  if (!window.MouseEvent || isIE && typeof window.MouseEvent !== 'function') {
    var origMouseEvent = window.MouseEvent;
    /**
     *
     * @param {!string} inType
     * @param {?(MouseEventInit)=} params
     */

    window.MouseEvent = function (inType, params) {
      params = params || {};
      var e = document.createEvent('MouseEvent');
      e.initMouseEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.view || window, params.detail, params.screenX, params.screenY, params.clientX, params.clientY, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.button, params.relatedTarget);
      return e;
    };

    if (origMouseEvent) {
      for (var i in origMouseEvent) {
        window.MouseEvent[i] = origMouseEvent[i];
      }
    }

    window.MouseEvent.prototype = origMouseEvent.prototype;
  } // ES6 stuff


  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(
      /** @type {IArrayLike} */
      object);
    };
  }

  if (!Object.assign) {
    var assign = function (target, source) {
      var n$ = Object.getOwnPropertyNames(source);

      for (var i = 0, p; i < n$.length; i++) {
        p = n$[i];
        target[p] = source[p];
      }
    };

    Object.assign = function (target, sources) {
      var args = [].slice.call(arguments, 1);

      for (var i = 0, s; i < args.length; i++) {
        s = args[i];

        if (s) {
          assign(target, s);
        }
      }

      return target;
    };
  }
})();

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// minimal template polyfill
(function () {
  'use strict';

  var needsTemplate = typeof HTMLTemplateElement === 'undefined';
  var brokenDocFragment = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
  var needsDocFrag = false; // NOTE: Replace DocumentFragment to work around IE11 bug that
  // causes children of a document fragment modified while
  // there is a mutation observer to not have a parentNode, or
  // have a broken parentNode (!?!)

  if (/Trident/.test(navigator.userAgent)) {
    (function () {
      needsDocFrag = true;
      var origCloneNode = Node.prototype.cloneNode;

      Node.prototype.cloneNode = function cloneNode(deep) {
        var newDom = origCloneNode.call(this, deep);

        if (this instanceof DocumentFragment) {
          newDom.__proto__ = DocumentFragment.prototype;
        }

        return newDom;
      }; // IE's DocumentFragment querySelector code doesn't work when
      // called on an element instance


      DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
      DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
      Object.defineProperties(DocumentFragment.prototype, {
        'nodeType': {
          get: function () {
            return Node.DOCUMENT_FRAGMENT_NODE;
          },
          configurable: true
        },
        'localName': {
          get: function () {
            return undefined;
          },
          configurable: true
        },
        'nodeName': {
          get: function () {
            return '#document-fragment';
          },
          configurable: true
        }
      });
      var origInsertBefore = Node.prototype.insertBefore;

      function insertBefore(newNode, refNode) {
        if (newNode instanceof DocumentFragment) {
          var child;

          while (child = newNode.firstChild) {
            origInsertBefore.call(this, child, refNode);
          }
        } else {
          origInsertBefore.call(this, newNode, refNode);
        }

        return newNode;
      }

      Node.prototype.insertBefore = insertBefore;
      var origAppendChild = Node.prototype.appendChild;

      Node.prototype.appendChild = function appendChild(child) {
        if (child instanceof DocumentFragment) {
          insertBefore.call(this, child, null);
        } else {
          origAppendChild.call(this, child);
        }

        return child;
      };

      var origRemoveChild = Node.prototype.removeChild;
      var origReplaceChild = Node.prototype.replaceChild;

      Node.prototype.replaceChild = function replaceChild(newChild, oldChild) {
        if (newChild instanceof DocumentFragment) {
          insertBefore.call(this, newChild, oldChild);
          origRemoveChild.call(this, oldChild);
        } else {
          origReplaceChild.call(this, newChild, oldChild);
        }

        return oldChild;
      };

      Document.prototype.createDocumentFragment = function createDocumentFragment() {
        var frag = this.createElement('df');
        frag.__proto__ = DocumentFragment.prototype;
        return frag;
      };

      var origImportNode = Document.prototype.importNode;

      Document.prototype.importNode = function importNode(impNode, deep) {
        deep = deep || false;
        var newNode = origImportNode.call(this, impNode, deep);

        if (impNode instanceof DocumentFragment) {
          newNode.__proto__ = DocumentFragment.prototype;
        }

        return newNode;
      };
    })();
  } // NOTE: we rely on this cloneNode not causing element upgrade.
  // This means this polyfill must load before the CE polyfill and
  // this would need to be re-worked if a browser supports native CE
  // but not <template>.


  var capturedCloneNode = Node.prototype.cloneNode;
  var capturedCreateElement = Document.prototype.createElement;
  var capturedImportNode = Document.prototype.importNode;
  var capturedRemoveChild = Node.prototype.removeChild;
  var capturedAppendChild = Node.prototype.appendChild;
  var capturedReplaceChild = Node.prototype.replaceChild;
  var capturedParseFromString = DOMParser.prototype.parseFromString;
  var capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML') || {
    /**
     * @this {!HTMLElement}
     * @return {string}
     */
    get: function () {
      return this.innerHTML;
    },

    /**
     * @this {!HTMLElement}
     * @param {string}
     */
    set: function (text) {
      this.innerHTML = text;
    }
  };
  var capturedChildNodes = Object.getOwnPropertyDescriptor(window.Node.prototype, 'childNodes') || {
    /**
     * @this {!Node}
     * @return {!NodeList}
     */
    get: function () {
      return this.childNodes;
    }
  };
  var elementQuerySelectorAll = Element.prototype.querySelectorAll;
  var docQuerySelectorAll = Document.prototype.querySelectorAll;
  var fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;
  var scriptSelector = 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';

  function QSA(node, selector) {
    // IE 11 throws a SyntaxError with `scriptSelector` if the node has no children due to the `:not([type])` syntax
    if (!node.childNodes.length) {
      return [];
    }

    switch (node.nodeType) {
      case Node.DOCUMENT_NODE:
        return docQuerySelectorAll.call(node, selector);

      case Node.DOCUMENT_FRAGMENT_NODE:
        return fragQuerySelectorAll.call(node, selector);

      default:
        return elementQuerySelectorAll.call(node, selector);
    }
  } // returns true if nested templates cannot be cloned (they cannot be on
  // some impl's like Safari 8 and Edge)
  // OR if cloning a document fragment does not result in a document fragment


  var needsCloning = function () {
    if (!needsTemplate) {
      var t = document.createElement('template');
      var t2 = document.createElement('template');
      t2.content.appendChild(document.createElement('div'));
      t.content.appendChild(t2);
      var clone = t.cloneNode(true);
      return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0 || brokenDocFragment;
    }
  }();

  var TEMPLATE_TAG = 'template';

  var PolyfilledHTMLTemplateElement = function () {};

  if (needsTemplate) {
    var contentDoc = document.implementation.createHTMLDocument('template');
    var canDecorate = true;
    var templateStyle = document.createElement('style');
    templateStyle.textContent = TEMPLATE_TAG + '{display:none;}';
    var head = document.head;
    head.insertBefore(templateStyle, head.firstElementChild);
    /**
      Provides a minimal shim for the <template> element.
    */

    PolyfilledHTMLTemplateElement.prototype = Object.create(HTMLElement.prototype); // if elements do not have `innerHTML` on instances, then
    // templates can be patched by swizzling their prototypes.

    var canProtoPatch = !document.createElement('div').hasOwnProperty('innerHTML');
    /**
      The `decorate` method moves element children to the template's `content`.
      NOTE: there is no support for dynamically adding elements to templates.
    */

    PolyfilledHTMLTemplateElement.decorate = function (template) {
      // if the template is decorated or not in HTML namespace, return fast
      if (template.content || template.namespaceURI !== document.documentElement.namespaceURI) {
        return;
      }

      template.content = contentDoc.createDocumentFragment();
      var child;

      while (child = template.firstChild) {
        capturedAppendChild.call(template.content, child);
      } // NOTE: prefer prototype patching for performance and
      // because on some browsers (IE11), re-defining `innerHTML`
      // can result in intermittent errors.


      if (canProtoPatch) {
        template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
      } else {
        template.cloneNode = function (deep) {
          return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
        }; // add innerHTML to template, if possible
        // Note: this throws on Safari 7


        if (canDecorate) {
          try {
            defineInnerHTML(template);
            defineOuterHTML(template);
          } catch (err) {
            canDecorate = false;
          }
        }
      } // bootstrap recursively


      PolyfilledHTMLTemplateElement.bootstrap(template.content);
    }; // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/wrapMap.js


    var topLevelWrappingMap = {
      'option': ['select'],
      'thead': ['table'],
      'col': ['colgroup', 'table'],
      'tr': ['tbody', 'table'],
      'th': ['tr', 'tbody', 'table'],
      'td': ['tr', 'tbody', 'table']
    };

    var getTagName = function (text) {
      // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/var/rtagName.js
      return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
    };

    var defineInnerHTML = function defineInnerHTML(obj) {
      Object.defineProperty(obj, 'innerHTML', {
        get: function () {
          return getInnerHTML(this);
        },
        set: function (text) {
          // For IE11, wrap the text in the correct (table) context
          var wrap = topLevelWrappingMap[getTagName(text)];

          if (wrap) {
            for (var i = 0; i < wrap.length; i++) {
              text = '<' + wrap[i] + '>' + text + '</' + wrap[i] + '>';
            }
          }

          contentDoc.body.innerHTML = text;
          PolyfilledHTMLTemplateElement.bootstrap(contentDoc);

          while (this.content.firstChild) {
            capturedRemoveChild.call(this.content, this.content.firstChild);
          }

          var body = contentDoc.body; // If we had wrapped, get back to the original node

          if (wrap) {
            for (var j = 0; j < wrap.length; j++) {
              body = body.lastChild;
            }
          }

          while (body.firstChild) {
            capturedAppendChild.call(this.content, body.firstChild);
          }
        },
        configurable: true
      });
    };

    var defineOuterHTML = function defineOuterHTML(obj) {
      Object.defineProperty(obj, 'outerHTML', {
        get: function () {
          return '<' + TEMPLATE_TAG + '>' + this.innerHTML + '</' + TEMPLATE_TAG + '>';
        },
        set: function (innerHTML) {
          if (this.parentNode) {
            contentDoc.body.innerHTML = innerHTML;
            var docFrag = this.ownerDocument.createDocumentFragment();

            while (contentDoc.body.firstChild) {
              capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
            }

            capturedReplaceChild.call(this.parentNode, docFrag, this);
          } else {
            throw new Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
          }
        },
        configurable: true
      });
    };

    defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
    defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);
    /**
      The `bootstrap` method is called automatically and "fixes" all
      <template> elements in the document referenced by the `doc` argument.
    */

    PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
      var templates = QSA(doc, TEMPLATE_TAG);

      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
        PolyfilledHTMLTemplateElement.decorate(t);
      }
    }; // auto-bootstrapping for main document


    document.addEventListener('DOMContentLoaded', function () {
      PolyfilledHTMLTemplateElement.bootstrap(document);
    }); // Patch document.createElement to ensure newly created templates have content

    Document.prototype.createElement = function createElement() {
      var el = capturedCreateElement.apply(this, arguments);

      if (el.localName === 'template') {
        PolyfilledHTMLTemplateElement.decorate(el);
      }

      return el;
    };

    DOMParser.prototype.parseFromString = function () {
      var el = capturedParseFromString.apply(this, arguments);
      PolyfilledHTMLTemplateElement.bootstrap(el);
      return el;
    };

    Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
      get: function () {
        return getInnerHTML(this);
      },
      set: function (text) {
        capturedHTMLElementInnerHTML.set.call(this, text);
        PolyfilledHTMLTemplateElement.bootstrap(this);
      },
      configurable: true,
      enumerable: true
    }); // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString

    var escapeAttrRegExp = /[&\u00A0"]/g;
    var escapeDataRegExp = /[&\u00A0<>]/g;

    var escapeReplace = function (c) {
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
    };

    var escapeAttr = function (s) {
      return s.replace(escapeAttrRegExp, escapeReplace);
    };

    var escapeData = function (s) {
      return s.replace(escapeDataRegExp, escapeReplace);
    };

    var makeSet = function (arr) {
      var set = {};

      for (var i = 0; i < arr.length; i++) {
        set[arr[i]] = true;
      }

      return set;
    }; // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


    var voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    var plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);
    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {Function=} callback
     */

    var getOuterHTML = function (node, parentNode, callback) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          {
            var tagName = node.localName;
            var s = '<' + tagName;
            var attrs = node.attributes;

            for (var i = 0, attr; attr = attrs[i]; i++) {
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
            var data =
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
    };
    /**
     * @param {Node} node
     * @param {Function=} callback
     */


    var getInnerHTML = function (node, callback) {
      if (node.localName === 'template') {
        node =
        /** @type {HTMLTemplateElement} */
        node.content;
      }

      var s = '';
      var c$ = callback ? callback(node) : capturedChildNodes.get.call(node);

      for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
        s += getOuterHTML(child, node, callback);
      }

      return s;
    };
  } // make cloning/importing work!


  if (needsTemplate || needsCloning) {
    PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(template, deep) {
      var clone = capturedCloneNode.call(template, false); // NOTE: decorate doesn't auto-fix children because they are already
      // decorated so they need special clone fixup.

      if (this.decorate) {
        this.decorate(clone);
      }

      if (deep) {
        // NOTE: use native clone node to make sure CE's wrapped
        // cloneNode does not cause elements to upgrade.
        capturedAppendChild.call(clone.content, capturedCloneNode.call(template.content, true)); // now ensure nested templates are cloned correctly.

        fixClonedDom(clone.content, template.content);
      }

      return clone;
    }; // Given a source and cloned subtree, find <template>'s in the cloned
    // subtree and replace them with cloned <template>'s from source.
    // We must do this because only the source templates have proper .content.


    var fixClonedDom = function fixClonedDom(clone, source) {
      // do nothing if cloned node is not an element
      if (!source.querySelectorAll) return; // these two lists should be coincident

      var s$ = QSA(source, TEMPLATE_TAG);

      if (s$.length === 0) {
        return;
      }

      var t$ = QSA(clone, TEMPLATE_TAG);

      for (var i = 0, l = t$.length, t, s; i < l; i++) {
        s = s$[i];
        t = t$[i];

        if (PolyfilledHTMLTemplateElement && PolyfilledHTMLTemplateElement.decorate) {
          PolyfilledHTMLTemplateElement.decorate(s);
        }

        capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
      }
    }; // make sure scripts inside of a cloned template are executable


    var fixClonedScripts = function fixClonedScripts(fragment) {
      var scripts = QSA(fragment, scriptSelector);

      for (var ns, s, i = 0; i < scripts.length; i++) {
        s = scripts[i];
        ns = capturedCreateElement.call(document, 'script');
        ns.textContent = s.textContent;
        var attrs = s.attributes;

        for (var ai = 0, a; ai < attrs.length; ai++) {
          a = attrs[ai];
          ns.setAttribute(a.name, a.value);
        }

        capturedReplaceChild.call(s.parentNode, ns, s);
      }
    }; // override all cloning to fix the cloned subtree to contain properly
    // cloned templates.


    var cloneNode = Node.prototype.cloneNode = function cloneNode(deep) {
      var dom; // workaround for Edge bug cloning documentFragments
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/

      if (!needsDocFrag && brokenDocFragment && this instanceof DocumentFragment) {
        if (!deep) {
          return this.ownerDocument.createDocumentFragment();
        } else {
          dom = importNode.call(this.ownerDocument, this, true);
        }
      } else if (this.nodeType === Node.ELEMENT_NODE && this.localName === TEMPLATE_TAG && this.namespaceURI == document.documentElement.namespaceURI) {
        dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
      } else {
        dom = capturedCloneNode.call(this, deep);
      } // template.content is cloned iff `deep`.


      if (deep) {
        fixClonedDom(dom, this);
      }

      return dom;
    }; // NOTE: we are cloning instead of importing <template>'s.
    // However, the ownerDocument of the cloned template will be correct!
    // This is because the native import node creates the right document owned
    // subtree and `fixClonedDom` inserts cloned templates into this subtree,
    // thus updating the owner doc.


    var importNode = Document.prototype.importNode = function importNode(element, deep) {
      deep = deep || false;

      if (element.localName === TEMPLATE_TAG) {
        return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
      } else {
        var dom = capturedImportNode.call(this, element, deep);

        if (deep) {
          fixClonedDom(dom, element);
          fixClonedScripts(dom);
        }

        return dom;
      }
    };
  }

  if (needsTemplate) {
    window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
  }
})();

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webcomponents_webcomponents_platform_webcomponents_platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _webcomponents_webcomponents_platform_webcomponents_platform_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_webcomponents_platform_webcomponents_platform_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _webcomponents_template_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var _webcomponents_template_template_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_template_template_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _webcomponents_shadydom_src_shadydom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _webcomponents_custom_elements_src_custom_elements_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _webcomponents_shadycss_entrypoints_scoping_shim_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);






/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdlYmNvbXBvbmVudHMvd2ViY29tcG9uZW50cy1wbGF0Zm9ybS93ZWJjb21wb25lbnRzLXBsYXRmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ad2ViY29tcG9uZW50cy90ZW1wbGF0ZS90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG9wZW4td2MvcG9seWZpbGxzLWxvYWRlci9zcmMvd2ViY29tcG9uZW50cy1hbGwuanMiXSwibmFtZXMiOlsid29ya2luZ0RlZmF1bHRQcmV2ZW50ZWQiLCJlIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsInByZXZlbnREZWZhdWx0IiwiZGVmYXVsdFByZXZlbnRlZCIsIm9yaWdQcmV2ZW50RGVmYXVsdCIsIkV2ZW50IiwicHJvdG90eXBlIiwiY2FuY2VsYWJsZSIsImNhbGwiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImNvbmZpZ3VyYWJsZSIsImlzSUUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwid2luZG93Iiwib3JpZ0V2ZW50IiwiaW5UeXBlIiwicGFyYW1zIiwiQm9vbGVhbiIsImJ1YmJsZXMiLCJpIiwiQ3VzdG9tRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJNb3VzZUV2ZW50Iiwib3JpZ01vdXNlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsInZpZXciLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiY3RybEtleSIsImFsdEtleSIsInNoaWZ0S2V5IiwibWV0YUtleSIsImJ1dHRvbiIsInJlbGF0ZWRUYXJnZXQiLCJBcnJheSIsImZyb20iLCJvYmplY3QiLCJzbGljZSIsImFzc2lnbiIsInRhcmdldCIsInNvdXJjZSIsIm4kIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInAiLCJsZW5ndGgiLCJzb3VyY2VzIiwiYXJncyIsImFyZ3VtZW50cyIsInMiLCJuZWVkc1RlbXBsYXRlIiwiSFRNTFRlbXBsYXRlRWxlbWVudCIsImJyb2tlbkRvY0ZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImNsb25lTm9kZSIsIkRvY3VtZW50RnJhZ21lbnQiLCJuZWVkc0RvY0ZyYWciLCJvcmlnQ2xvbmVOb2RlIiwiTm9kZSIsImRlZXAiLCJuZXdEb20iLCJfX3Byb3RvX18iLCJxdWVyeVNlbGVjdG9yQWxsIiwiSFRNTEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGVmaW5lUHJvcGVydGllcyIsIkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUiLCJ1bmRlZmluZWQiLCJvcmlnSW5zZXJ0QmVmb3JlIiwiaW5zZXJ0QmVmb3JlIiwibmV3Tm9kZSIsInJlZk5vZGUiLCJjaGlsZCIsImZpcnN0Q2hpbGQiLCJvcmlnQXBwZW5kQ2hpbGQiLCJhcHBlbmRDaGlsZCIsIm9yaWdSZW1vdmVDaGlsZCIsInJlbW92ZUNoaWxkIiwib3JpZ1JlcGxhY2VDaGlsZCIsInJlcGxhY2VDaGlsZCIsIm5ld0NoaWxkIiwib2xkQ2hpbGQiLCJEb2N1bWVudCIsImZyYWciLCJjcmVhdGVFbGVtZW50Iiwib3JpZ0ltcG9ydE5vZGUiLCJpbXBvcnROb2RlIiwiaW1wTm9kZSIsImNhcHR1cmVkQ2xvbmVOb2RlIiwiY2FwdHVyZWRDcmVhdGVFbGVtZW50IiwiY2FwdHVyZWRJbXBvcnROb2RlIiwiY2FwdHVyZWRSZW1vdmVDaGlsZCIsImNhcHR1cmVkQXBwZW5kQ2hpbGQiLCJjYXB0dXJlZFJlcGxhY2VDaGlsZCIsImNhcHR1cmVkUGFyc2VGcm9tU3RyaW5nIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwiY2FwdHVyZWRIVE1MRWxlbWVudElubmVySFRNTCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlubmVySFRNTCIsInNldCIsInRleHQiLCJjYXB0dXJlZENoaWxkTm9kZXMiLCJjaGlsZE5vZGVzIiwiZWxlbWVudFF1ZXJ5U2VsZWN0b3JBbGwiLCJFbGVtZW50IiwiZG9jUXVlcnlTZWxlY3RvckFsbCIsImZyYWdRdWVyeVNlbGVjdG9yQWxsIiwic2NyaXB0U2VsZWN0b3IiLCJRU0EiLCJub2RlIiwic2VsZWN0b3IiLCJub2RlVHlwZSIsIkRPQ1VNRU5UX05PREUiLCJuZWVkc0Nsb25pbmciLCJ0IiwidDIiLCJjb250ZW50IiwiY2xvbmUiLCJURU1QTEFURV9UQUciLCJQb2x5ZmlsbGVkSFRNTFRlbXBsYXRlRWxlbWVudCIsImNvbnRlbnREb2MiLCJpbXBsZW1lbnRhdGlvbiIsImNyZWF0ZUhUTUxEb2N1bWVudCIsImNhbkRlY29yYXRlIiwidGVtcGxhdGVTdHlsZSIsInRleHRDb250ZW50IiwiaGVhZCIsImZpcnN0RWxlbWVudENoaWxkIiwiY3JlYXRlIiwiY2FuUHJvdG9QYXRjaCIsImhhc093blByb3BlcnR5IiwiZGVjb3JhdGUiLCJ0ZW1wbGF0ZSIsIm5hbWVzcGFjZVVSSSIsImRvY3VtZW50RWxlbWVudCIsIl9jbG9uZU5vZGUiLCJkZWZpbmVJbm5lckhUTUwiLCJkZWZpbmVPdXRlckhUTUwiLCJlcnIiLCJib290c3RyYXAiLCJ0b3BMZXZlbFdyYXBwaW5nTWFwIiwiZ2V0VGFnTmFtZSIsImV4ZWMiLCJ0b0xvd2VyQ2FzZSIsIm9iaiIsImdldElubmVySFRNTCIsIndyYXAiLCJib2R5IiwiaiIsImxhc3RDaGlsZCIsInBhcmVudE5vZGUiLCJkb2NGcmFnIiwib3duZXJEb2N1bWVudCIsIkVycm9yIiwiZG9jIiwidGVtcGxhdGVzIiwibCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbCIsImFwcGx5IiwibG9jYWxOYW1lIiwiZW51bWVyYWJsZSIsImVzY2FwZUF0dHJSZWdFeHAiLCJlc2NhcGVEYXRhUmVnRXhwIiwiZXNjYXBlUmVwbGFjZSIsImMiLCJlc2NhcGVBdHRyIiwicmVwbGFjZSIsImVzY2FwZURhdGEiLCJtYWtlU2V0IiwiYXJyIiwidm9pZEVsZW1lbnRzIiwicGxhaW50ZXh0UGFyZW50cyIsImdldE91dGVySFRNTCIsImNhbGxiYWNrIiwiRUxFTUVOVF9OT0RFIiwidGFnTmFtZSIsImF0dHJzIiwiYXR0cmlidXRlcyIsImF0dHIiLCJuYW1lIiwidmFsdWUiLCJURVhUX05PREUiLCJkYXRhIiwiQ09NTUVOVF9OT0RFIiwiY29uc29sZSIsImVycm9yIiwiYyQiLCJmaXhDbG9uZWREb20iLCJzJCIsInQkIiwiZml4Q2xvbmVkU2NyaXB0cyIsImZyYWdtZW50Iiwic2NyaXB0cyIsIm5zIiwiYWkiLCJhIiwic2V0QXR0cmlidXRlIiwiZG9tIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7O0FBVUEsQ0FBQyxZQUFXO0FBRVYsZUFGVSxDQUlWO0FBQ0E7O0FBQ0EsTUFBSUEsdUJBQXVCLEdBQUksWUFBVztBQUN4QyxRQUFJQyxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQixPQUFyQixDQUFSO0FBQ0FGLEtBQUMsQ0FBQ0csU0FBRixDQUFZLEtBQVosRUFBbUIsSUFBbkIsRUFBeUIsSUFBekI7QUFDQUgsS0FBQyxDQUFDSSxjQUFGO0FBQ0EsV0FBT0osQ0FBQyxDQUFDSyxnQkFBVDtBQUNELEdBTDZCLEVBQTlCOztBQU9BLE1BQUksQ0FBQ04sdUJBQUwsRUFBOEI7QUFDNUIsUUFBSU8sa0JBQWtCLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkosY0FBekM7O0FBQ0FHLFNBQUssQ0FBQ0MsU0FBTixDQUFnQkosY0FBaEIsR0FBaUMsWUFBVztBQUMxQyxVQUFJLENBQUMsS0FBS0ssVUFBVixFQUFzQjtBQUNwQjtBQUNEOztBQUVESCx3QkFBa0IsQ0FBQ0ksSUFBbkIsQ0FBd0IsSUFBeEI7QUFFQUMsWUFBTSxDQUFDQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLGtCQUE1QixFQUFnRDtBQUM5Q0MsV0FBRyxFQUFFLFlBQVc7QUFDZCxpQkFBTyxJQUFQO0FBQ0QsU0FINkM7QUFJOUNDLG9CQUFZLEVBQUU7QUFKZ0MsT0FBaEQ7QUFNRCxLQWJEO0FBY0Q7O0FBRUQsTUFBSUMsSUFBSSxHQUFHLFVBQVVDLElBQVYs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SUFBTixDQUFaO0FBQ0Q7O0FBQ0QsYUFBT0EsR0FBUDtBQUNELEtBdEJELENBM0RpQyxDQW1GakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsUUFBSWpILFVBQVUsR0FBR0osUUFBUSxDQUFDbEYsU0FBVCxDQUFtQnNGLFVBQW5CLEdBQWdDLFNBQVNBLFVBQVQsQ0FBb0JrSCxPQUFwQixFQUE2QjdJLElBQTdCLEVBQW1DO0FBQ2xGQSxVQUFJLEdBQUdBLElBQUksSUFBSSxLQUFmOztBQUNBLFVBQUk2SSxPQUFPLENBQUN2QyxTQUFSLEtBQXNCMUMsWUFBMUIsRUFBd0M7QUFDdEMsZUFBT0MsNkJBQTZCLENBQUNnQixVQUE5QixDQUF5Q2dFLE9BQXpDLEVBQWtEN0ksSUFBbEQsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUk0SSxHQUFHLEdBQUc3RyxrQkFBa0IsQ0FBQ3hGLElBQW5CLENBQXdCLElBQXhCLEVBQThCc00sT0FBOUIsRUFBdUM3SSxJQUF2QyxDQUFWOztBQUNBLFlBQUlBLElBQUosRUFBVTtBQUNSa0ksc0JBQVksQ0FBQ1UsR0FBRCxFQUFNQyxPQUFOLENBQVo7QUFDQVIsMEJBQWdCLENBQUNPLEdBQUQsQ0FBaEI7QUFDRDs7QUFDRCxlQUFPQSxHQUFQO0FBQ0Q7QUFDRixLQVpEO0FBYUQ7O0FBRUQsTUFBSXJKLGFBQUosRUFBbUI7QUFDakJ2QyxVQUFNLENBQUN3QyxtQkFBUCxHQUE2QnFFLDZCQUE3QjtBQUNEO0FBRUYsQ0E1a0JELEk7Ozs7Ozs7O0FDWEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IjIuMTdmN2M1NDExOWRhZmY5MDYyZDAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBkZWZhdWx0UHJldmVudGVkIGlzIGJyb2tlbiBpbiBJRS5cbiAgLy8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy83OTAzODkvZXZlbnQtZGVmYXVsdHByZXZlbnRlZC1yZXR1cm5zLWZhbHNlLWFmdGVyLXByZXZlbnRkZWZhdWx0LXdhcy1jYWxsZWRcbiAgdmFyIHdvcmtpbmdEZWZhdWx0UHJldmVudGVkID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZS5pbml0RXZlbnQoJ2ZvbycsIHRydWUsIHRydWUpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZS5kZWZhdWx0UHJldmVudGVkO1xuICB9KSgpO1xuXG4gIGlmICghd29ya2luZ0RlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICB2YXIgb3JpZ1ByZXZlbnREZWZhdWx0ID0gRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0O1xuICAgIEV2ZW50LnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmNhbmNlbGFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcmlnUHJldmVudERlZmF1bHQuY2FsbCh0aGlzKTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkZWZhdWx0UHJldmVudGVkJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICB2YXIgaXNJRSA9IC9UcmlkZW50Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIC8vIEV2ZW50IGNvbnN0cnVjdG9yIHNoaW1cbiAgaWYgKCF3aW5kb3cuRXZlbnQgfHwgaXNJRSAmJiAodHlwZW9mIHdpbmRvdy5FdmVudCAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB2YXIgb3JpZ0V2ZW50ID0gd2luZG93LkV2ZW50O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7IXN0cmluZ30gaW5UeXBlXG4gICAgICogQHBhcmFtIHs/KEV2ZW50SW5pdCk9fSBwYXJhbXNcbiAgICAgKi9cbiAgICB3aW5kb3cuRXZlbnQgPSBmdW5jdGlvbihpblR5cGUsIHBhcmFtcykge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIGUuaW5pdEV2ZW50KGluVHlwZSwgQm9vbGVhbihwYXJhbXMuYnViYmxlcyksIEJvb2xlYW4ocGFyYW1zLmNhbmNlbGFibGUpKTtcbiAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgaWYgKG9yaWdFdmVudCkge1xuICAgICAgZm9yICh2YXIgaSBpbiBvcmlnRXZlbnQpIHtcbiAgICAgICAgd2luZG93LkV2ZW50W2ldID0gb3JpZ0V2ZW50W2ldO1xuICAgICAgfVxuICAgICAgd2luZG93LkV2ZW50LnByb3RvdHlwZSA9IG9yaWdFdmVudC5wcm90b3R5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gQ3VzdG9tRXZlbnQgY29uc3RydWN0b3Igc2hpbVxuICBpZiAoIXdpbmRvdy5DdXN0b21FdmVudCB8fCBpc0lFICYmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ICE9PSAnZnVuY3Rpb24nKSkge1xuICAgIC8qKlxuICAgICAqIEB0ZW1wbGF0ZSBUXG4gICAgICogQHBhcmFtIHshc3RyaW5nfSBpblR5cGVcbiAgICAgKiBAcGFyYW0gez8oQ3VzdG9tRXZlbnRJbml0PFQ+KT19IHBhcmFtc1xuICAgICAqL1xuICAgIHdpbmRvdy5DdXN0b21FdmVudCA9IGZ1bmN0aW9uKGluVHlwZSwgcGFyYW1zKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgICB2YXIgZSA9IC8qKiBAdHlwZSB7IUN1c3RvbUV2ZW50fSAqLyAoZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JykpO1xuICAgICAgZS5pbml0Q3VzdG9tRXZlbnQoaW5UeXBlLCBCb29sZWFuKHBhcmFtcy5idWJibGVzKSwgQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSksIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICB3aW5kb3cuQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgfVxuXG4gIGlmICghd2luZG93Lk1vdXNlRXZlbnQgfHwgaXNJRSAmJiAodHlwZW9mIHdpbmRvdy5Nb3VzZUV2ZW50ICE9PSAnZnVuY3Rpb24nKSkge1xuICAgIHZhciBvcmlnTW91c2VFdmVudCA9IHdpbmRvdy5Nb3VzZUV2ZW50O1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHshc3RyaW5nfSBpblR5cGVcbiAgICAgKiBAcGFyYW0gez8oTW91c2VFdmVudEluaXQpPX0gcGFyYW1zXG4gICAgICovXG4gICAgd2luZG93Lk1vdXNlRXZlbnQgPSBmdW5jdGlvbihpblR5cGUsIHBhcmFtcykge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICAgICAgZS5pbml0TW91c2VFdmVudChpblR5cGUsXG4gICAgICAgIEJvb2xlYW4ocGFyYW1zLmJ1YmJsZXMpLCBCb29sZWFuKHBhcmFtcy5jYW5jZWxhYmxlKSxcbiAgICAgICAgcGFyYW1zLnZpZXcgfHwgd2luZG93LCBwYXJhbXMuZGV0YWlsLFxuICAgICAgICBwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksIHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcbiAgICAgICAgcGFyYW1zLmN0cmxLZXksIHBhcmFtcy5hbHRLZXksIHBhcmFtcy5zaGlmdEtleSwgcGFyYW1zLm1ldGFLZXksXG4gICAgICAgIHBhcmFtcy5idXR0b24sIHBhcmFtcy5yZWxhdGVkVGFyZ2V0KTtcbiAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgaWYgKG9yaWdNb3VzZUV2ZW50KSB7XG4gICAgICBmb3IgKHZhciBpIGluIG9yaWdNb3VzZUV2ZW50KSB7XG4gICAgICAgIHdpbmRvdy5Nb3VzZUV2ZW50W2ldID0gb3JpZ01vdXNlRXZlbnRbaV07XG4gICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5Nb3VzZUV2ZW50LnByb3RvdHlwZSA9IG9yaWdNb3VzZUV2ZW50LnByb3RvdHlwZTtcbiAgfVxuXG4gIC8vIEVTNiBzdHVmZlxuICBpZiAoIUFycmF5LmZyb20pIHtcbiAgICBBcnJheS5mcm9tID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoLyoqIEB0eXBlIHtJQXJyYXlMaWtlfSAqLyhvYmplY3QpKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFPYmplY3QuYXNzaWduKSB7XG4gICAgdmFyIGFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKSB7XG4gICAgICB2YXIgbiQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpO1xuICAgICAgZm9yICh2YXIgaT0wLCBwOyBpIDwgbiQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcCA9IG4kW2ldO1xuICAgICAgICB0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlcykge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBmb3IgKHZhciBpPTAsIHM7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmdzW2ldO1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgIGFzc2lnbih0YXJnZXQsIHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgfVxuXG59KSgpO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5cbi8vIG1pbmltYWwgdGVtcGxhdGUgcG9seWZpbGxcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBuZWVkc1RlbXBsYXRlID0gKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAndW5kZWZpbmVkJyk7XG4gIHZhciBicm9rZW5Eb2NGcmFnbWVudCA9ICEoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLmNsb25lTm9kZSgpIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCk7XG4gIHZhciBuZWVkc0RvY0ZyYWcgPSBmYWxzZTtcblxuICAvLyBOT1RFOiBSZXBsYWNlIERvY3VtZW50RnJhZ21lbnQgdG8gd29yayBhcm91bmQgSUUxMSBidWcgdGhhdFxuICAvLyBjYXVzZXMgY2hpbGRyZW4gb2YgYSBkb2N1bWVudCBmcmFnbWVudCBtb2RpZmllZCB3aGlsZVxuICAvLyB0aGVyZSBpcyBhIG11dGF0aW9uIG9ic2VydmVyIHRvIG5vdCBoYXZlIGEgcGFyZW50Tm9kZSwgb3JcbiAgLy8gaGF2ZSBhIGJyb2tlbiBwYXJlbnROb2RlICghPyEpXG4gIGlmICgvVHJpZGVudC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgIChmdW5jdGlvbigpIHtcblxuICAgICAgbmVlZHNEb2NGcmFnID0gdHJ1ZTtcblxuICAgICAgdmFyIG9yaWdDbG9uZU5vZGUgPSBOb2RlLnByb3RvdHlwZS5jbG9uZU5vZGU7XG4gICAgICBOb2RlLnByb3RvdHlwZS5jbG9uZU5vZGUgPSBmdW5jdGlvbiBjbG9uZU5vZGUoZGVlcCkge1xuICAgICAgICB2YXIgbmV3RG9tID0gb3JpZ0Nsb25lTm9kZS5jYWxsKHRoaXMsIGRlZXApO1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBuZXdEb20uX19wcm90b19fID0gRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RvbTtcbiAgICAgIH07XG5cbiAgICAgIC8vIElFJ3MgRG9jdW1lbnRGcmFnbWVudCBxdWVyeVNlbGVjdG9yIGNvZGUgZG9lc24ndCB3b3JrIHdoZW5cbiAgICAgIC8vIGNhbGxlZCBvbiBhbiBlbGVtZW50IGluc3RhbmNlXG4gICAgICBEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yQWxsID0gSFRNTEVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGw7XG4gICAgICBEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yID0gSFRNTEVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3I7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKERvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLCB7XG4gICAgICAgICdub2RlVHlwZSc6IHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAnbG9jYWxOYW1lJzoge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgICdub2RlTmFtZSc6IHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnI2RvY3VtZW50LWZyYWdtZW50JztcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdmFyIG9yaWdJbnNlcnRCZWZvcmUgPSBOb2RlLnByb3RvdHlwZS5pbnNlcnRCZWZvcmU7XG4gICAgICBmdW5jdGlvbiBpbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmTm9kZSkge1xuICAgICAgICBpZiAobmV3Tm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICB2YXIgY2hpbGQ7XG4gICAgICAgICAgd2hpbGUgKChjaGlsZCA9IG5ld05vZGUuZmlyc3RDaGlsZCkpIHtcbiAgICAgICAgICAgIG9yaWdJbnNlcnRCZWZvcmUuY2FsbCh0aGlzLCBjaGlsZCwgcmVmTm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9yaWdJbnNlcnRCZWZvcmUuY2FsbCh0aGlzLCBuZXdOb2RlLCByZWZOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3Tm9kZTtcbiAgICAgIH1cbiAgICAgIE5vZGUucHJvdG90eXBlLmluc2VydEJlZm9yZSA9IGluc2VydEJlZm9yZTtcblxuICAgICAgdmFyIG9yaWdBcHBlbmRDaGlsZCA9IE5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkO1xuICAgICAgTm9kZS5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbiBhcHBlbmRDaGlsZChjaGlsZCkge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgaW5zZXJ0QmVmb3JlLmNhbGwodGhpcywgY2hpbGQsIG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9yaWdBcHBlbmRDaGlsZC5jYWxsKHRoaXMsIGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9O1xuXG4gICAgICB2YXIgb3JpZ1JlbW92ZUNoaWxkID0gTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQ7XG4gICAgICB2YXIgb3JpZ1JlcGxhY2VDaGlsZCA9IE5vZGUucHJvdG90eXBlLnJlcGxhY2VDaGlsZDtcbiAgICAgIE5vZGUucHJvdG90eXBlLnJlcGxhY2VDaGlsZCA9IGZ1bmN0aW9uIHJlcGxhY2VDaGlsZChuZXdDaGlsZCwgb2xkQ2hpbGQpIHtcbiAgICAgICAgaWYgKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIGluc2VydEJlZm9yZS5jYWxsKHRoaXMsIG5ld0NoaWxkLCBvbGRDaGlsZCk7XG4gICAgICAgICAgb3JpZ1JlbW92ZUNoaWxkLmNhbGwodGhpcywgb2xkQ2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9yaWdSZXBsYWNlQ2hpbGQuY2FsbCh0aGlzLCBuZXdDaGlsZCwgb2xkQ2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGRDaGlsZDtcbiAgICAgIH07XG5cbiAgICAgIERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVEb2N1bWVudEZyYWdtZW50ID0gZnVuY3Rpb24gY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIHtcbiAgICAgICAgdmFyIGZyYWcgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2RmJyk7XG4gICAgICAgIGZyYWcuX19wcm90b19fID0gRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGU7XG4gICAgICAgIHJldHVybiBmcmFnO1xuICAgICAgfTtcblxuICAgICAgdmFyIG9yaWdJbXBvcnROb2RlID0gRG9jdW1lbnQucHJvdG90eXBlLmltcG9ydE5vZGU7XG4gICAgICBEb2N1bWVudC5wcm90b3R5cGUuaW1wb3J0Tm9kZSA9IGZ1bmN0aW9uIGltcG9ydE5vZGUoaW1wTm9kZSwgZGVlcCkge1xuICAgICAgICBkZWVwID0gZGVlcCB8fCBmYWxzZTtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBvcmlnSW1wb3J0Tm9kZS5jYWxsKHRoaXMsIGltcE5vZGUsIGRlZXApO1xuICAgICAgICBpZiAoaW1wTm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBuZXdOb2RlLl9fcHJvdG9fXyA9IERvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdOb2RlO1xuICAgICAgfTtcbiAgICB9KSgpO1xuICB9XG5cbiAgLy8gTk9URTogd2UgcmVseSBvbiB0aGlzIGNsb25lTm9kZSBub3QgY2F1c2luZyBlbGVtZW50IHVwZ3JhZGUuXG4gIC8vIFRoaXMgbWVhbnMgdGhpcyBwb2x5ZmlsbCBtdXN0IGxvYWQgYmVmb3JlIHRoZSBDRSBwb2x5ZmlsbCBhbmRcbiAgLy8gdGhpcyB3b3VsZCBuZWVkIHRvIGJlIHJlLXdvcmtlZCBpZiBhIGJyb3dzZXIgc3VwcG9ydHMgbmF0aXZlIENFXG4gIC8vIGJ1dCBub3QgPHRlbXBsYXRlPi5cbiAgdmFyIGNhcHR1cmVkQ2xvbmVOb2RlID0gTm9kZS5wcm90b3R5cGUuY2xvbmVOb2RlO1xuICB2YXIgY2FwdHVyZWRDcmVhdGVFbGVtZW50ID0gRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQ7XG4gIHZhciBjYXB0dXJlZEltcG9ydE5vZGUgPSBEb2N1bWVudC5wcm90b3R5cGUuaW1wb3J0Tm9kZTtcbiAgdmFyIGNhcHR1cmVkUmVtb3ZlQ2hpbGQgPSBOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZDtcbiAgdmFyIGNhcHR1cmVkQXBwZW5kQ2hpbGQgPSBOb2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZDtcbiAgdmFyIGNhcHR1cmVkUmVwbGFjZUNoaWxkID0gTm9kZS5wcm90b3R5cGUucmVwbGFjZUNoaWxkO1xuICB2YXIgY2FwdHVyZWRQYXJzZUZyb21TdHJpbmcgPSBET01QYXJzZXIucHJvdG90eXBlLnBhcnNlRnJvbVN0cmluZztcbiAgdmFyIGNhcHR1cmVkSFRNTEVsZW1lbnRJbm5lckhUTUwgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MRWxlbWVudC5wcm90b3R5cGUsICdpbm5lckhUTUwnKSB8fCB7XG4gICAgLyoqXG4gICAgICogQHRoaXMgeyFIVE1MRWxlbWVudH1cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVySFRNTDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHshSFRNTEVsZW1lbnR9XG4gICAgICogQHBhcmFtIHtzdHJpbmd9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9IHRleHQ7XG4gICAgfVxuICB9O1xuICB2YXIgY2FwdHVyZWRDaGlsZE5vZGVzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuTm9kZS5wcm90b3R5cGUsICdjaGlsZE5vZGVzJykgfHwge1xuICAgIC8qKlxuICAgICAqIEB0aGlzIHshTm9kZX1cbiAgICAgKiBAcmV0dXJuIHshTm9kZUxpc3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXM7XG4gICAgfVxuICB9O1xuXG4gIHZhciBlbGVtZW50UXVlcnlTZWxlY3RvckFsbCA9IEVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGw7XG4gIHZhciBkb2NRdWVyeVNlbGVjdG9yQWxsID0gRG9jdW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGw7XG4gIHZhciBmcmFnUXVlcnlTZWxlY3RvckFsbCA9IERvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGw7XG5cbiAgdmFyIHNjcmlwdFNlbGVjdG9yID0gJ3NjcmlwdDpub3QoW3R5cGVdKSxzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIl0sc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl0nO1xuXG4gIGZ1bmN0aW9uIFFTQShub2RlLCBzZWxlY3Rvcikge1xuICAgIC8vIElFIDExIHRocm93cyBhIFN5bnRheEVycm9yIHdpdGggYHNjcmlwdFNlbGVjdG9yYCBpZiB0aGUgbm9kZSBoYXMgbm8gY2hpbGRyZW4gZHVlIHRvIHRoZSBgOm5vdChbdHlwZV0pYCBzeW50YXhcbiAgICBpZiAoIW5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgICBjYXNlIE5vZGUuRE9DVU1FTlRfTk9ERTpcbiAgICAgICAgcmV0dXJuIGRvY1F1ZXJ5U2VsZWN0b3JBbGwuY2FsbChub2RlLCBzZWxlY3Rvcik7XG4gICAgICBjYXNlIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTpcbiAgICAgICAgcmV0dXJuIGZyYWdRdWVyeVNlbGVjdG9yQWxsLmNhbGwobm9kZSwgc2VsZWN0b3IpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRRdWVyeVNlbGVjdG9yQWxsLmNhbGwobm9kZSwgc2VsZWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJldHVybnMgdHJ1ZSBpZiBuZXN0ZWQgdGVtcGxhdGVzIGNhbm5vdCBiZSBjbG9uZWQgKHRoZXkgY2Fubm90IGJlIG9uXG4gIC8vIHNvbWUgaW1wbCdzIGxpa2UgU2FmYXJpIDggYW5kIEVkZ2UpXG4gIC8vIE9SIGlmIGNsb25pbmcgYSBkb2N1bWVudCBmcmFnbWVudCBkb2VzIG5vdCByZXN1bHQgaW4gYSBkb2N1bWVudCBmcmFnbWVudFxuICB2YXIgbmVlZHNDbG9uaW5nID0gKGZ1bmN0aW9uKCkge1xuICAgIGlmICghbmVlZHNUZW1wbGF0ZSkge1xuICAgICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgdmFyIHQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgIHQyLmNvbnRlbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgICAgdC5jb250ZW50LmFwcGVuZENoaWxkKHQyKTtcbiAgICAgIHZhciBjbG9uZSA9IHQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgcmV0dXJuIChjbG9uZS5jb250ZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAwIHx8IGNsb25lLmNvbnRlbnQuZmlyc3RDaGlsZC5jb250ZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAwXG4gICAgICAgIHx8IGJyb2tlbkRvY0ZyYWdtZW50KTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgdmFyIFRFTVBMQVRFX1RBRyA9ICd0ZW1wbGF0ZSc7XG4gIHZhciBQb2x5ZmlsbGVkSFRNTFRlbXBsYXRlRWxlbWVudCA9IGZ1bmN0aW9uKCkge307XG5cbiAgaWYgKG5lZWRzVGVtcGxhdGUpIHtcblxuICAgIHZhciBjb250ZW50RG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHZhciBjYW5EZWNvcmF0ZSA9IHRydWU7XG5cbiAgICB2YXIgdGVtcGxhdGVTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGVtcGxhdGVTdHlsZS50ZXh0Q29udGVudCA9IFRFTVBMQVRFX1RBRyArICd7ZGlzcGxheTpub25lO30nO1xuXG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkO1xuICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHRlbXBsYXRlU3R5bGUsIGhlYWQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgLyoqXG4gICAgICBQcm92aWRlcyBhIG1pbmltYWwgc2hpbSBmb3IgdGhlIDx0ZW1wbGF0ZT4gZWxlbWVudC5cbiAgICAqL1xuICAgIFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcblxuXG4gICAgLy8gaWYgZWxlbWVudHMgZG8gbm90IGhhdmUgYGlubmVySFRNTGAgb24gaW5zdGFuY2VzLCB0aGVuXG4gICAgLy8gdGVtcGxhdGVzIGNhbiBiZSBwYXRjaGVkIGJ5IHN3aXp6bGluZyB0aGVpciBwcm90b3R5cGVzLlxuICAgIHZhciBjYW5Qcm90b1BhdGNoID1cbiAgICAgICEoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuaGFzT3duUHJvcGVydHkoJ2lubmVySFRNTCcpKTtcblxuICAgIC8qKlxuICAgICAgVGhlIGBkZWNvcmF0ZWAgbWV0aG9kIG1vdmVzIGVsZW1lbnQgY2hpbGRyZW4gdG8gdGhlIHRlbXBsYXRlJ3MgYGNvbnRlbnRgLlxuICAgICAgTk9URTogdGhlcmUgaXMgbm8gc3VwcG9ydCBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIGVsZW1lbnRzIHRvIHRlbXBsYXRlcy5cbiAgICAqL1xuICAgIFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50LmRlY29yYXRlID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgIC8vIGlmIHRoZSB0ZW1wbGF0ZSBpcyBkZWNvcmF0ZWQgb3Igbm90IGluIEhUTUwgbmFtZXNwYWNlLCByZXR1cm4gZmFzdFxuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgfHxcbiAgICAgICAgICB0ZW1wbGF0ZS5uYW1lc3BhY2VVUkkgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5uYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGVtcGxhdGUuY29udGVudCA9IGNvbnRlbnREb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgdmFyIGNoaWxkO1xuICAgICAgd2hpbGUgKChjaGlsZCA9IHRlbXBsYXRlLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgIGNhcHR1cmVkQXBwZW5kQ2hpbGQuY2FsbCh0ZW1wbGF0ZS5jb250ZW50LCBjaGlsZCk7XG4gICAgICB9XG4gICAgICAvLyBOT1RFOiBwcmVmZXIgcHJvdG90eXBlIHBhdGNoaW5nIGZvciBwZXJmb3JtYW5jZSBhbmRcbiAgICAgIC8vIGJlY2F1c2Ugb24gc29tZSBicm93c2VycyAoSUUxMSksIHJlLWRlZmluaW5nIGBpbm5lckhUTUxgXG4gICAgICAvLyBjYW4gcmVzdWx0IGluIGludGVybWl0dGVudCBlcnJvcnMuXG4gICAgICBpZiAoY2FuUHJvdG9QYXRjaCkge1xuICAgICAgICB0ZW1wbGF0ZS5fX3Byb3RvX18gPSBQb2x5ZmlsbGVkSFRNTFRlbXBsYXRlRWxlbWVudC5wcm90b3R5cGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wbGF0ZS5jbG9uZU5vZGUgPSBmdW5jdGlvbihkZWVwKSB7XG4gICAgICAgICAgcmV0dXJuIFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50Ll9jbG9uZU5vZGUodGhpcywgZGVlcCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGFkZCBpbm5lckhUTUwgdG8gdGVtcGxhdGUsIGlmIHBvc3NpYmxlXG4gICAgICAgIC8vIE5vdGU6IHRoaXMgdGhyb3dzIG9uIFNhZmFyaSA3XG4gICAgICAgIGlmIChjYW5EZWNvcmF0ZSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkZWZpbmVJbm5lckhUTUwodGVtcGxhdGUpO1xuICAgICAgICAgICAgZGVmaW5lT3V0ZXJIVE1MKHRlbXBsYXRlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNhbkRlY29yYXRlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBib290c3RyYXAgcmVjdXJzaXZlbHlcbiAgICAgIFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50LmJvb3RzdHJhcCh0ZW1wbGF0ZS5jb250ZW50KTtcbiAgICB9O1xuXG4gICAgLy8gVGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzczZDdlNjI1OWM2M2FjNDVmNDJjNjU5M2RhOGMyNzk2YzZjZTkyODEvc3JjL21hbmlwdWxhdGlvbi93cmFwTWFwLmpzXG4gICAgdmFyIHRvcExldmVsV3JhcHBpbmdNYXAgPSB7XG4gICAgICAnb3B0aW9uJzogWydzZWxlY3QnXSxcbiAgICAgICd0aGVhZCc6IFsndGFibGUnXSxcbiAgICAgICdjb2wnOiBbJ2NvbGdyb3VwJywgJ3RhYmxlJ10sXG4gICAgICAndHInOiBbJ3Rib2R5JywgJ3RhYmxlJ10sXG4gICAgICAndGgnOiBbJ3RyJywgJ3Rib2R5JywgJ3RhYmxlJ10sXG4gICAgICAndGQnOiBbJ3RyJywgJ3Rib2R5JywgJ3RhYmxlJ11cbiAgICB9O1xuXG4gICAgdmFyIGdldFRhZ05hbWUgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvNzNkN2U2MjU5YzYzYWM0NWY0MmM2NTkzZGE4YzI3OTZjNmNlOTI4MS9zcmMvbWFuaXB1bGF0aW9uL3Zhci9ydGFnTmFtZS5qc1xuICAgICAgcmV0dXJuICggLzwoW2Etel1bXi9cXDA+XFx4MjBcXHRcXHJcXG5cXGZdKykvaS5leGVjKHRleHQpIHx8IFsnJywgJyddKVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgIH07XG5cbiAgICB2YXIgZGVmaW5lSW5uZXJIVE1MID0gZnVuY3Rpb24gZGVmaW5lSW5uZXJIVE1MKG9iaikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ2lubmVySFRNTCcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0SW5uZXJIVE1MKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAvLyBGb3IgSUUxMSwgd3JhcCB0aGUgdGV4dCBpbiB0aGUgY29ycmVjdCAodGFibGUpIGNvbnRleHRcbiAgICAgICAgICB2YXIgd3JhcCA9IHRvcExldmVsV3JhcHBpbmdNYXBbZ2V0VGFnTmFtZSh0ZXh0KV07XG4gICAgICAgICAgaWYgKHdyYXApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd3JhcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0ZXh0ID0gJzwnICsgd3JhcFtpXSArICc+JyArIHRleHQgKyAnPC8nICsgd3JhcFtpXSArICc+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGVudERvYy5ib2R5LmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgICAgUG9seWZpbGxlZEhUTUxUZW1wbGF0ZUVsZW1lbnQuYm9vdHN0cmFwKGNvbnRlbnREb2MpO1xuICAgICAgICAgIHdoaWxlICh0aGlzLmNvbnRlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgY2FwdHVyZWRSZW1vdmVDaGlsZC5jYWxsKHRoaXMuY29udGVudCwgdGhpcy5jb250ZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgYm9keSA9IGNvbnRlbnREb2MuYm9keTtcbiAgICAgICAgICAvLyBJZiB3ZSBoYWQgd3JhcHBlZCwgZ2V0IGJhY2sgdG8gdGhlIG9yaWdpbmFsIG5vZGVcbiAgICAgICAgICBpZiAod3JhcCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3cmFwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGJvZHkgPSBib2R5Lmxhc3RDaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgd2hpbGUgKGJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgY2FwdHVyZWRBcHBlbmRDaGlsZC5jYWxsKHRoaXMuY29udGVudCwgYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBkZWZpbmVPdXRlckhUTUwgPSBmdW5jdGlvbiBkZWZpbmVPdXRlckhUTUwob2JqKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnb3V0ZXJIVE1MJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAnPCcgKyBURU1QTEFURV9UQUcgKyAnPicgKyB0aGlzLmlubmVySFRNTCArICc8LycgKyBURU1QTEFURV9UQUcgKyAnPic7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oaW5uZXJIVE1MKSB7XG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgY29udGVudERvYy5ib2R5LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgICAgICAgICAgIHZhciBkb2NGcmFnID0gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIHdoaWxlIChjb250ZW50RG9jLmJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICBjYXB0dXJlZEFwcGVuZENoaWxkLmNhbGwoZG9jRnJhZywgY29udGVudERvYy5ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FwdHVyZWRSZXBsYWNlQ2hpbGQuY2FsbCh0aGlzLnBhcmVudE5vZGUsIGRvY0ZyYWcsIHRoaXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gc2V0IHRoZSAnb3V0ZXJIVE1MJyBwcm9wZXJ0eSBvbiAnRWxlbWVudCc6IFRoaXMgZWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZGVmaW5lSW5uZXJIVE1MKFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50LnByb3RvdHlwZSk7XG4gICAgZGVmaW5lT3V0ZXJIVE1MKFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50LnByb3RvdHlwZSk7XG5cbiAgICAvKipcbiAgICAgIFRoZSBgYm9vdHN0cmFwYCBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYW5kIFwiZml4ZXNcIiBhbGxcbiAgICAgIDx0ZW1wbGF0ZT4gZWxlbWVudHMgaW4gdGhlIGRvY3VtZW50IHJlZmVyZW5jZWQgYnkgdGhlIGBkb2NgIGFyZ3VtZW50LlxuICAgICovXG4gICAgUG9seWZpbGxlZEhUTUxUZW1wbGF0ZUVsZW1lbnQuYm9vdHN0cmFwID0gZnVuY3Rpb24gYm9vdHN0cmFwKGRvYykge1xuICAgICAgdmFyIHRlbXBsYXRlcyA9IFFTQShkb2MsIFRFTVBMQVRFX1RBRyk7XG4gICAgICBmb3IgKHZhciBpPTAsIGw9dGVtcGxhdGVzLmxlbmd0aCwgdDsgKGk8bCkgJiYgKHQ9dGVtcGxhdGVzW2ldKTsgaSsrKSB7XG4gICAgICAgIFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50LmRlY29yYXRlKHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBhdXRvLWJvb3RzdHJhcHBpbmcgZm9yIG1haW4gZG9jdW1lbnRcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICBQb2x5ZmlsbGVkSFRNTFRlbXBsYXRlRWxlbWVudC5ib290c3RyYXAoZG9jdW1lbnQpO1xuICAgIH0pO1xuXG4gICAgLy8gUGF0Y2ggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCB0byBlbnN1cmUgbmV3bHkgY3JlYXRlZCB0ZW1wbGF0ZXMgaGF2ZSBjb250ZW50XG4gICAgRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgdmFyIGVsID0gY2FwdHVyZWRDcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoZWwubG9jYWxOYW1lID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgIFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50LmRlY29yYXRlKGVsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgRE9NUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZyb21TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbCA9IGNhcHR1cmVkUGFyc2VGcm9tU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBQb2x5ZmlsbGVkSFRNTFRlbXBsYXRlRWxlbWVudC5ib290c3RyYXAoZWwpO1xuICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlLCAnaW5uZXJIVE1MJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdldElubmVySFRNTCh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgY2FwdHVyZWRIVE1MRWxlbWVudElubmVySFRNTC5zZXQuY2FsbCh0aGlzLCB0ZXh0KTtcbiAgICAgICAgUG9seWZpbGxlZEhUTUxUZW1wbGF0ZUVsZW1lbnQuYm9vdHN0cmFwKHRoaXMpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcblxuICAgIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS1lbmQuaHRtbCNlc2NhcGluZ1N0cmluZ1xuICAgIHZhciBlc2NhcGVBdHRyUmVnRXhwID0gL1smXFx1MDBBMFwiXS9nO1xuICAgIHZhciBlc2NhcGVEYXRhUmVnRXhwID0gL1smXFx1MDBBMDw+XS9nO1xuXG4gICAgdmFyIGVzY2FwZVJlcGxhY2UgPSBmdW5jdGlvbihjKSB7XG4gICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgY2FzZSAnJic6XG4gICAgICAgICAgcmV0dXJuICcmYW1wOyc7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgIHJldHVybiAnJmx0Oyc7XG4gICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgIHJldHVybiAnJmd0Oyc7XG4gICAgICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgICByZXR1cm4gJyZxdW90Oyc7XG4gICAgICAgIGNhc2UgJ1xcdTAwQTAnOlxuICAgICAgICAgIHJldHVybiAnJm5ic3A7JztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGVzY2FwZUF0dHIgPSBmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKGVzY2FwZUF0dHJSZWdFeHAsIGVzY2FwZVJlcGxhY2UpO1xuICAgIH07XG5cbiAgICB2YXIgZXNjYXBlRGF0YSA9IGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLnJlcGxhY2UoZXNjYXBlRGF0YVJlZ0V4cCwgZXNjYXBlUmVwbGFjZSk7XG4gICAgfTtcblxuICAgIHZhciBtYWtlU2V0ID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgICB2YXIgc2V0ID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZXRbYXJyW2ldXSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2V0O1xuICAgIH07XG5cbiAgICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrLyN2b2lkLWVsZW1lbnRzXG4gICAgdmFyIHZvaWRFbGVtZW50cyA9IG1ha2VTZXQoW1xuICAgICAgJ2FyZWEnLFxuICAgICAgJ2Jhc2UnLFxuICAgICAgJ2JyJyxcbiAgICAgICdjb2wnLFxuICAgICAgJ2NvbW1hbmQnLFxuICAgICAgJ2VtYmVkJyxcbiAgICAgICdocicsXG4gICAgICAnaW1nJyxcbiAgICAgICdpbnB1dCcsXG4gICAgICAna2V5Z2VuJyxcbiAgICAgICdsaW5rJyxcbiAgICAgICdtZXRhJyxcbiAgICAgICdwYXJhbScsXG4gICAgICAnc291cmNlJyxcbiAgICAgICd0cmFjaycsXG4gICAgICAnd2JyJ1xuICAgIF0pO1xuXG4gICAgdmFyIHBsYWludGV4dFBhcmVudHMgPSBtYWtlU2V0KFtcbiAgICAgICdzdHlsZScsXG4gICAgICAnc2NyaXB0JyxcbiAgICAgICd4bXAnLFxuICAgICAgJ2lmcmFtZScsXG4gICAgICAnbm9lbWJlZCcsXG4gICAgICAnbm9mcmFtZXMnLFxuICAgICAgJ3BsYWludGV4dCcsXG4gICAgICAnbm9zY3JpcHQnXG4gICAgXSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IHBhcmVudE5vZGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uPX0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICB2YXIgZ2V0T3V0ZXJIVE1MID0gZnVuY3Rpb24obm9kZSwgcGFyZW50Tm9kZSwgY2FsbGJhY2spIHtcbiAgICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOiB7XG4gICAgICAgICAgdmFyIHRhZ05hbWUgPSBub2RlLmxvY2FsTmFtZTtcbiAgICAgICAgICB2YXIgcyA9ICc8JyArIHRhZ05hbWU7XG4gICAgICAgICAgdmFyIGF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBhdHRyOyAoYXR0ciA9IGF0dHJzW2ldKTsgaSsrKSB7XG4gICAgICAgICAgICBzICs9ICcgJyArIGF0dHIubmFtZSArICc9XCInICsgZXNjYXBlQXR0cihhdHRyLnZhbHVlKSArICdcIic7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgKz0gJz4nO1xuICAgICAgICAgIGlmICh2b2lkRWxlbWVudHNbdGFnTmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcyArIGdldElubmVySFRNTChub2RlLCBjYWxsYmFjaykgKyAnPC8nICsgdGFnTmFtZSArICc+JztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIE5vZGUuVEVYVF9OT0RFOiB7XG4gICAgICAgICAgdmFyIGRhdGEgPSAvKiogQHR5cGUge1RleHR9ICovIChub2RlKS5kYXRhO1xuICAgICAgICAgIGlmIChwYXJlbnROb2RlICYmIHBsYWludGV4dFBhcmVudHNbcGFyZW50Tm9kZS5sb2NhbE5hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGVzY2FwZURhdGEoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBOb2RlLkNPTU1FTlRfTk9ERToge1xuICAgICAgICAgIHJldHVybiAnPCEtLScgKyAvKiogQHR5cGUge0NvbW1lbnR9ICovIChub2RlKS5kYXRhICsgJy0tPic7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmVycm9yKG5vZGUpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgICovXG4gICAgdmFyIGdldElubmVySFRNTCA9IGZ1bmN0aW9uKG5vZGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAobm9kZS5sb2NhbE5hbWUgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgbm9kZSA9ICAvKiogQHR5cGUge0hUTUxUZW1wbGF0ZUVsZW1lbnR9ICovIChub2RlKS5jb250ZW50O1xuICAgICAgfVxuICAgICAgdmFyIHMgPSAnJztcbiAgICAgIHZhciBjJCA9IGNhbGxiYWNrID8gY2FsbGJhY2sobm9kZSkgOiBjYXB0dXJlZENoaWxkTm9kZXMuZ2V0LmNhbGwobm9kZSk7XG4gICAgICBmb3IgKHZhciBpPTAsIGw9YyQubGVuZ3RoLCBjaGlsZDsgKGk8bCkgJiYgKGNoaWxkPWMkW2ldKTsgaSsrKSB7XG4gICAgICAgIHMgKz0gZ2V0T3V0ZXJIVE1MKGNoaWxkLCBub2RlLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcztcbiAgICB9O1xuXG4gIH1cblxuICAvLyBtYWtlIGNsb25pbmcvaW1wb3J0aW5nIHdvcmshXG4gIGlmIChuZWVkc1RlbXBsYXRlIHx8IG5lZWRzQ2xvbmluZykge1xuXG4gICAgUG9seWZpbGxlZEhUTUxUZW1wbGF0ZUVsZW1lbnQuX2Nsb25lTm9kZSA9IGZ1bmN0aW9uIF9jbG9uZU5vZGUodGVtcGxhdGUsIGRlZXApIHtcbiAgICAgIHZhciBjbG9uZSA9IGNhcHR1cmVkQ2xvbmVOb2RlLmNhbGwodGVtcGxhdGUsIGZhbHNlKTtcbiAgICAgIC8vIE5PVEU6IGRlY29yYXRlIGRvZXNuJ3QgYXV0by1maXggY2hpbGRyZW4gYmVjYXVzZSB0aGV5IGFyZSBhbHJlYWR5XG4gICAgICAvLyBkZWNvcmF0ZWQgc28gdGhleSBuZWVkIHNwZWNpYWwgY2xvbmUgZml4dXAuXG4gICAgICBpZiAodGhpcy5kZWNvcmF0ZSkge1xuICAgICAgICB0aGlzLmRlY29yYXRlKGNsb25lKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWVwKSB7XG4gICAgICAgIC8vIE5PVEU6IHVzZSBuYXRpdmUgY2xvbmUgbm9kZSB0byBtYWtlIHN1cmUgQ0UncyB3cmFwcGVkXG4gICAgICAgIC8vIGNsb25lTm9kZSBkb2VzIG5vdCBjYXVzZSBlbGVtZW50cyB0byB1cGdyYWRlLlxuICAgICAgICBjYXB0dXJlZEFwcGVuZENoaWxkLmNhbGwoY2xvbmUuY29udGVudCwgY2FwdHVyZWRDbG9uZU5vZGUuY2FsbCh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKSk7XG4gICAgICAgIC8vIG5vdyBlbnN1cmUgbmVzdGVkIHRlbXBsYXRlcyBhcmUgY2xvbmVkIGNvcnJlY3RseS5cbiAgICAgICAgZml4Q2xvbmVkRG9tKGNsb25lLmNvbnRlbnQsIHRlbXBsYXRlLmNvbnRlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG5cbiAgICAvLyBHaXZlbiBhIHNvdXJjZSBhbmQgY2xvbmVkIHN1YnRyZWUsIGZpbmQgPHRlbXBsYXRlPidzIGluIHRoZSBjbG9uZWRcbiAgICAvLyBzdWJ0cmVlIGFuZCByZXBsYWNlIHRoZW0gd2l0aCBjbG9uZWQgPHRlbXBsYXRlPidzIGZyb20gc291cmNlLlxuICAgIC8vIFdlIG11c3QgZG8gdGhpcyBiZWNhdXNlIG9ubHkgdGhlIHNvdXJjZSB0ZW1wbGF0ZXMgaGF2ZSBwcm9wZXIgLmNvbnRlbnQuXG4gICAgdmFyIGZpeENsb25lZERvbSA9IGZ1bmN0aW9uIGZpeENsb25lZERvbShjbG9uZSwgc291cmNlKSB7XG4gICAgICAvLyBkbyBub3RoaW5nIGlmIGNsb25lZCBub2RlIGlzIG5vdCBhbiBlbGVtZW50XG4gICAgICBpZiAoIXNvdXJjZS5xdWVyeVNlbGVjdG9yQWxsKSByZXR1cm47XG4gICAgICAvLyB0aGVzZSB0d28gbGlzdHMgc2hvdWxkIGJlIGNvaW5jaWRlbnRcbiAgICAgIHZhciBzJCA9IFFTQShzb3VyY2UsIFRFTVBMQVRFX1RBRyk7XG4gICAgICBpZiAocyQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciB0JCA9IFFTQShjbG9uZSwgVEVNUExBVEVfVEFHKTtcbiAgICAgIGZvciAodmFyIGk9MCwgbD10JC5sZW5ndGgsIHQsIHM7IGk8bDsgaSsrKSB7XG4gICAgICAgIHMgPSBzJFtpXTtcbiAgICAgICAgdCA9IHQkW2ldO1xuICAgICAgICBpZiAoUG9seWZpbGxlZEhUTUxUZW1wbGF0ZUVsZW1lbnQgJiYgUG9seWZpbGxlZEhUTUxUZW1wbGF0ZUVsZW1lbnQuZGVjb3JhdGUpIHtcbiAgICAgICAgICBQb2x5ZmlsbGVkSFRNTFRlbXBsYXRlRWxlbWVudC5kZWNvcmF0ZShzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlZFJlcGxhY2VDaGlsZC5jYWxsKHQucGFyZW50Tm9kZSwgY2xvbmVOb2RlLmNhbGwocywgdHJ1ZSksIHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBtYWtlIHN1cmUgc2NyaXB0cyBpbnNpZGUgb2YgYSBjbG9uZWQgdGVtcGxhdGUgYXJlIGV4ZWN1dGFibGVcbiAgICB2YXIgZml4Q2xvbmVkU2NyaXB0cyA9IGZ1bmN0aW9uIGZpeENsb25lZFNjcmlwdHMoZnJhZ21lbnQpIHtcbiAgICAgIHZhciBzY3JpcHRzID0gUVNBKGZyYWdtZW50LCBzY3JpcHRTZWxlY3Rvcik7XG4gICAgICBmb3IgKHZhciBucywgcywgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHMgPSBzY3JpcHRzW2ldO1xuICAgICAgICBucyA9IGNhcHR1cmVkQ3JlYXRlRWxlbWVudC5jYWxsKGRvY3VtZW50LCAnc2NyaXB0Jyk7XG4gICAgICAgIG5zLnRleHRDb250ZW50ID0gcy50ZXh0Q29udGVudDtcbiAgICAgICAgdmFyIGF0dHJzID0gcy5hdHRyaWJ1dGVzO1xuICAgICAgICBmb3IgKHZhciBhaSA9IDAsIGE7IGFpIDwgYXR0cnMubGVuZ3RoOyBhaSsrKSB7XG4gICAgICAgICAgYSA9IGF0dHJzW2FpXTtcbiAgICAgICAgICBucy5zZXRBdHRyaWJ1dGUoYS5uYW1lLCBhLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlZFJlcGxhY2VDaGlsZC5jYWxsKHMucGFyZW50Tm9kZSwgbnMsIHMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBvdmVycmlkZSBhbGwgY2xvbmluZyB0byBmaXggdGhlIGNsb25lZCBzdWJ0cmVlIHRvIGNvbnRhaW4gcHJvcGVybHlcbiAgICAvLyBjbG9uZWQgdGVtcGxhdGVzLlxuICAgIHZhciBjbG9uZU5vZGUgPSBOb2RlLnByb3RvdHlwZS5jbG9uZU5vZGUgPSBmdW5jdGlvbiBjbG9uZU5vZGUoZGVlcCkge1xuICAgICAgdmFyIGRvbTtcbiAgICAgIC8vIHdvcmthcm91bmQgZm9yIEVkZ2UgYnVnIGNsb25pbmcgZG9jdW1lbnRGcmFnbWVudHNcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzg2MTk2NDYvXG4gICAgICBpZiAoIW5lZWRzRG9jRnJhZyAmJiBicm9rZW5Eb2NGcmFnbWVudCAmJiB0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICBpZiAoIWRlZXApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb20gPSBpbXBvcnROb2RlLmNhbGwodGhpcy5vd25lckRvY3VtZW50LCB0aGlzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJlxuICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsTmFtZSA9PT0gVEVNUExBVEVfVEFHICYmXG4gICAgICAgICAgICAgICAgIHRoaXMubmFtZXNwYWNlVVJJID09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5uYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgZG9tID0gUG9seWZpbGxlZEhUTUxUZW1wbGF0ZUVsZW1lbnQuX2Nsb25lTm9kZSh0aGlzLCBkZWVwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbSA9IGNhcHR1cmVkQ2xvbmVOb2RlLmNhbGwodGhpcywgZGVlcCk7XG4gICAgICB9XG4gICAgICAvLyB0ZW1wbGF0ZS5jb250ZW50IGlzIGNsb25lZCBpZmYgYGRlZXBgLlxuICAgICAgaWYgKGRlZXApIHtcbiAgICAgICAgZml4Q2xvbmVkRG9tKGRvbSwgdGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH07XG5cbiAgICAvLyBOT1RFOiB3ZSBhcmUgY2xvbmluZyBpbnN0ZWFkIG9mIGltcG9ydGluZyA8dGVtcGxhdGU+J3MuXG4gICAgLy8gSG93ZXZlciwgdGhlIG93bmVyRG9jdW1lbnQgb2YgdGhlIGNsb25lZCB0ZW1wbGF0ZSB3aWxsIGJlIGNvcnJlY3QhXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZSBuYXRpdmUgaW1wb3J0IG5vZGUgY3JlYXRlcyB0aGUgcmlnaHQgZG9jdW1lbnQgb3duZWRcbiAgICAvLyBzdWJ0cmVlIGFuZCBgZml4Q2xvbmVkRG9tYCBpbnNlcnRzIGNsb25lZCB0ZW1wbGF0ZXMgaW50byB0aGlzIHN1YnRyZWUsXG4gICAgLy8gdGh1cyB1cGRhdGluZyB0aGUgb3duZXIgZG9jLlxuICAgIHZhciBpbXBvcnROb2RlID0gRG9jdW1lbnQucHJvdG90eXBlLmltcG9ydE5vZGUgPSBmdW5jdGlvbiBpbXBvcnROb2RlKGVsZW1lbnQsIGRlZXApIHtcbiAgICAgIGRlZXAgPSBkZWVwIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09PSBURU1QTEFURV9UQUcpIHtcbiAgICAgICAgcmV0dXJuIFBvbHlmaWxsZWRIVE1MVGVtcGxhdGVFbGVtZW50Ll9jbG9uZU5vZGUoZWxlbWVudCwgZGVlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZG9tID0gY2FwdHVyZWRJbXBvcnROb2RlLmNhbGwodGhpcywgZWxlbWVudCwgZGVlcCk7XG4gICAgICAgIGlmIChkZWVwKSB7XG4gICAgICAgICAgZml4Q2xvbmVkRG9tKGRvbSwgZWxlbWVudCk7XG4gICAgICAgICAgZml4Q2xvbmVkU2NyaXB0cyhkb20pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb207XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmIChuZWVkc1RlbXBsYXRlKSB7XG4gICAgd2luZG93LkhUTUxUZW1wbGF0ZUVsZW1lbnQgPSBQb2x5ZmlsbGVkSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxuXG59KSgpO1xuIiwiaW1wb3J0ICdAd2ViY29tcG9uZW50cy93ZWJjb21wb25lbnRzLXBsYXRmb3JtL3dlYmNvbXBvbmVudHMtcGxhdGZvcm0uanMnO1xuaW1wb3J0ICdAd2ViY29tcG9uZW50cy90ZW1wbGF0ZS90ZW1wbGF0ZS5qcyc7XG5pbXBvcnQgJ0B3ZWJjb21wb25lbnRzL3NoYWR5ZG9tL3NyYy9zaGFkeWRvbS5qcyc7XG5pbXBvcnQgJ0B3ZWJjb21wb25lbnRzL2N1c3RvbS1lbGVtZW50cy9zcmMvY3VzdG9tLWVsZW1lbnRzLmpzJztcbmltcG9ydCAnQHdlYmNvbXBvbmVudHMvc2hhZHljc3MvZW50cnlwb2ludHMvc2NvcGluZy1zaGltLmpzJztcbiJdLCJzb3VyY2VSb290IjoiIn0=