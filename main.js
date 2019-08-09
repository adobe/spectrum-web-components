/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/lit-html/lit-html.js + 1 modules
var lit_html = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/dom.js
var dom = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/template.js
var lib_template = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/lit-html/lib/modify-template.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module shady-render
 */

const walkerNodeFilter = 133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if (Object(lib_template["d" /* isTemplatePartActive */])(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}
// EXTERNAL MODULE: ./node_modules/lit-html/lib/render.js
var render = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/template-factory.js
var template_factory = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/template-instance.js
var template_instance = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/template-result.js
var template_result = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/lit-html/lib/shady-render.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @module shady-render
 * @preferred
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */







 // Get a key to lookup in `templateCaches`.

const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected.` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);
  let templateCache = template_factory["a" /* templateCaches */].get(cacheKey);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    template_factory["a" /* templateCaches */].set(cacheKey, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  }

  const key = result.strings.join(lib_template["f" /* marker */]);
  template = templateCache.keyString.get(key);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new lib_template["a" /* Template */](result, element);
    templateCache.keyString.set(key, template);
  }

  templateCache.stringsArray.set(result.strings, template);
  return template;
};

const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = template_factory["a" /* templateCaches */].get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.keyString.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        removeNodesFromTemplate(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (renderedDOM, template, scopeName) => {
  shadyRenderSet.add(scopeName); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style'); // If there are no styles, skip unnecessary work

  if (styles.length === 0) {
    // Ensure prepareTemplateStyles is called to support adding
    // styles via `prepareAdoptedCssText` since that requires that
    // `prepareTemplateStyles` is called.
    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  insertNodeIntoTemplate(template, condensedStyle, template.element.content.firstChild); // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).

  window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

  if (window.ShadyCSS.nativeShadow) {
    // When in native Shadow DOM, re-add styling to rendered content using
    // the style ShadyCSS produced.
    const style = template.element.content.querySelector('style');
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else {
    // When not in native Shadow DOM, at this point ShadyCSS will have
    // removed the style from the lit template and parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    removeNodesFromTemplate(template, removes);
  }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */


const shady_render_render = (result, container, options) => {
  const scopeName = options.scopeName;
  const hasRendered = render["a" /* parts */].has(container);
  const needsScoping = container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof template_result["b" /* TemplateResult */]; // Handle first render to a scope specially...

  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
  // fragment that is reused since nested renders can occur synchronously.

  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  Object(render["b" /* render */])(result, renderContainer, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When performing first scope render,
  // (1) We've rendered into a fragment so that there's a chance to
  // `prepareTemplateStyles` before sub-elements hit the DOM
  // (which might cause them to render based on a common pattern of
  // rendering in a custom element's `connectedCallback`);
  // (2) Scope the template with ShadyCSS one time only for this scope.
  // (3) Render the fragment into the container and make sure the
  // container knows its `part` is the one we just rendered. This ensures
  // DOM will be re-used on subsequent renders.

  if (firstScopeRender) {
    const part = render["a" /* parts */].get(renderContainer);
    render["a" /* parts */].delete(renderContainer);

    if (part.value instanceof template_instance["a" /* TemplateInstance */]) {
      prepareTemplateStyles(renderContainer, part.value.template, scopeName);
    }

    Object(dom["b" /* removeNodes */])(container, container.firstChild);
    container.appendChild(renderContainer);
    render["a" /* parts */].set(container, part);
  } // After elements have hit the DOM, update styling if this is the
  // initial render to this container.
  // This is needed whenever dynamic changes are made so it would be
  // safest to do every render; however, this would regress performance
  // so we leave it up to the user to call `ShadyCSSS.styleElement`
  // for dynamic changes.


  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};
// CONCATENATED MODULE: ./node_modules/lit-element/lib/updating-element.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty = (prop, _obj) => prop;

const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? '' : null;

      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        return value == null ? value : JSON.stringify(value);
    }

    return value;
  },

  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;

      case Number:
        return value === null ? null : Number(value);

      case Object:
      case Array:
        return JSON.parse(value);
    }

    return value;
  }

};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */

const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const microtaskPromise = Promise.resolve(true);
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const STATE_HAS_CONNECTED = 1 << 5;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this._updateState = 0;
    this._instanceProperties = undefined;
    this._updatePromise = microtaskPromise;
    this._hasConnectedResolver = undefined;
    /**
     * Map with keys for any properties that have changed since the last
     * update cycle with previous values.
     */

    this._changedProperties = new Map();
    /**
     * Map with keys of properties that should be reflected when updated.
     */

    this._reflectingProperties = undefined;
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're finalized.
    this.finalize();
    const attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays

    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    });

    return attributes;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */

  /** @nocollapse */


  static _ensureClassProperties() {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   * @nocollapse
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // Note, since this can be called by the `@property` decorator which
    // is called before `finalize`, we ensure storage exists for property
    // metadata.
    this._ensureClassProperties();

    this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
    // it would be lost otherwise and that would never be the user's intention;
    // Instead, we expect users to call `requestUpdate` themselves from
    // user-defined accessors. Note that if the super has an accessor we will
    // still overwrite it


    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }

    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    Object.defineProperty(this.prototype, name, {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[key];
      },

      set(value) {
        // tslint:disable-next-line:no-any no symbol in index
        const oldValue = this[name]; // tslint:disable-next-line:no-any no symbol in index

        this[key] = value;

        this._requestUpdate(name, oldValue);
      },

      configurable: true,
      enumerable: true
    });
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */


  static finalize() {
    if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
      return;
    } // finalize any superclasses


    const superCtor = Object.getPrototypeOf(this);

    if (typeof superCtor.finalize === 'function') {
      superCtor.finalize();
    }

    this.finalized = true;

    this._ensureClassProperties(); // initialize Map populated in observedAttributes


    this._attributeToPropertyMap = new Map(); // make any properties
    // Note, only process "own" properties since this element will inherit
    // any properties defined on the superClass, and finalization ensures
    // the entire prototype chain is finalized.

    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])]; // This for/of is ok because propKeys is an array

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        // tslint:disable-next-line:no-any no symbol in index
        this.createProperty(p, props[p]);
      }
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */


  static _propertyValueToAttribute(value, options) {
    if (options.reflect === undefined) {
      return;
    }

    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this._saveInstanceProperties(); // ensures first update will be caught by an early access of `updateComplete`


    this._requestUpdate();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    });
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    // tslint:disable-next-line:no-any
    this._instanceProperties.forEach((v, p) => this[p] = v);

    this._instanceProperties = undefined;
  }

  connectedCallback() {
    this._updateState = this._updateState | STATE_HAS_CONNECTED; // Ensure first connection completes an update. Updates cannot complete before
    // connection and if one is pending connection the `_hasConnectionResolver`
    // will exist. If so, resolve it to complete the update, otherwise
    // requestUpdate.

    if (this._hasConnectedResolver) {
      this._hasConnectedResolver();

      this._hasConnectedResolver = undefined;
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attr = ctor._attributeNameForProperty(name, options);

    if (attr !== undefined) {
      const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


      if (attrValue === undefined) {
        return;
      } // Track if the property is being reflected to avoid
      // setting the property again via `attributeChangedCallback`. Note:
      // 1. this takes advantage of the fact that the callback is synchronous.
      // 2. will behave incorrectly if multiple attributes are in the reaction
      // stack at time of calling. However, since we process attributes
      // in `update` this should not be possible (or an extreme corner case
      // that we'd like to discover).
      // mark state reflecting


      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      } // mark state not reflecting


      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }

    const ctor = this.constructor;

    const propName = ctor._attributeToPropertyMap.get(name);

    if (propName !== undefined) {
      const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration; // mark state reflecting

      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = // tslint:disable-next-line:no-any
      ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  /**
   * This private version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */


  _requestUpdate(name, oldValue) {
    let shouldRequestUpdate = true; // If we have a property key, perform property update steps.

    if (name !== undefined) {
      const ctor = this.constructor;
      const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;

      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        } // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `_reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.


        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === undefined) {
            this._reflectingProperties = new Map();
          }

          this._reflectingProperties.set(name, options);
        }
      } else {
        // Abort the request if the property should not be considered changed.
        shouldRequestUpdate = false;
      }
    }

    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._enqueueUpdate();
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    this._requestUpdate(name, oldValue);

    return this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */


  _enqueueUpdate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // Mark state updating...
      _this._updateState = _this._updateState | STATE_UPDATE_REQUESTED;
      let resolve;
      let reject;
      const previousUpdatePromise = _this._updatePromise;
      _this._updatePromise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });

      try {
        // Ensure any previous update has resolved before updating.
        // This `await` also ensures that property changes are batched.
        yield previousUpdatePromise;
      } catch (e) {} // Ignore any previous errors. We only care that the previous cycle is
      // done. Any error should have been handled in the previous update.
      // Make sure the element has connected before updating.


      if (!_this._hasConnected) {
        yield new Promise(res => _this._hasConnectedResolver = res);
      }

      try {
        const result = _this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.


        if (result != null) {
          yield result;
        }
      } catch (e) {
        reject(e);
      }

      resolve(!_this._hasRequestedUpdate);
    })();
  }

  get _hasConnected() {
    return this._updateState & STATE_HAS_CONNECTED;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }

  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */


  performUpdate() {
    // Mixin instance properties once, if they exist.
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    let shouldUpdate = false;
    const changedProperties = this._changedProperties;

    try {
      shouldUpdate = this.shouldUpdate(changedProperties);

      if (shouldUpdate) {
        this.update(changedProperties);
      }
    } catch (e) {
      // Prevent `firstUpdated` and `updated` from running when there's an
      // update exception.
      shouldUpdate = false;
      throw e;
    } finally {
      // Ensure element can accept additional updates after an exception.
      this._markUpdated();
    }

    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update. This getter can be implemented to
   * await additional state. For example, it is sometimes useful to await a
   * rendered element before fulfilling this Promise. To do this, first await
   * `super.updateComplete` then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      // Use forEach so this works even if for/of loops are compiled to for
      // loops expecting arrays
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));

      this._reflectingProperties = undefined;
    }
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}
/**
 * Marks class as having finished creating properties.
 */

UpdatingElement.finalized = true;
// CONCATENATED MODULE: ./node_modules/lit-element/lib/decorators.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz); // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // tslint:disable-next-line:no-any

  return clazz;
};

const standardCustomElement = (tagName, descriptor) => {
  const {
    kind,
    elements
  } = descriptor;
  return {
    kind,
    elements,

    // This callback is called once the class is otherwise fully defined
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }

  };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 */


const customElement = tagName => classOrDescriptor => typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);

const standardProperty = (options, element) => {
  // When decorating an accessor, pass it through and add property metadata.
  // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
  // stomp over the user's accessor.
  if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
    return Object.assign({}, element, {
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    });
  } else {
    // createProperty() takes care of defining the property, but we still
    // must return some kind of descriptor, so return a descriptor for an
    // unused prototype field. The finisher calls createProperty().
    return {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},

      // When @babel/plugin-proposal-decorators implements initializers,
      // do this instead of the initializer below. See:
      // https://github.com/babel/babel/issues/9260 extras: [
      //   {
      //     kind: 'initializer',
      //     placement: 'own',
      //     initializer: descriptor.initializer,
      //   }
      // ],
      // tslint:disable-next-line:no-any decorator
      initializer() {
        if (typeof element.initializer === 'function') {
          this[element.key] = element.initializer.call(this);
        }
      },

      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    };
  }
};

const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A `PropertyDeclaration` may optionally be
 * supplied to configure property features.
 *
 * @ExportDecoratedItems
 */


function property(options) {
  // tslint:disable-next-line:no-any decorator
  return (protoOrDescriptor, name) => name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @ExportDecoratedItems
 */

function query(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @ExportDecoratedItems
 */

function queryAll(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelectorAll(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}

const legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};

const standardQuery = (descriptor, element) => ({
  kind: 'method',
  placement: 'prototype',
  key: element.key,
  descriptor
});

const standardEventOptions = (options, element) => {
  return Object.assign({}, element, {
    finisher(clazz) {
      Object.assign(clazz.prototype[element.key], options);
    }

  });
};

const legacyEventOptions = // tslint:disable-next-line:no-any legacy decorator
(options, proto, name) => {
  Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifis event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 *
 *     class MyElement {
 *
 *       clicked = false;
 *
 *       render() {
 *         return html`<div @click=${this._onClick}`><button></button></div>`;
 *       }
 *
 *       @eventOptions({capture: true})
 *       _onClick(e) {
 *         this.clicked = true;
 *       }
 *     }
 */


const eventOptions = options => // Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
(protoOrDescriptor, name) => name !== undefined ? legacyEventOptions(options, protoOrDescriptor, name) : standardEventOptions(options, protoOrDescriptor);
// CONCATENATED MODULE: ./node_modules/lit-element/lib/css-tag.js
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }

    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  get styleSheet() {
    if (this._styleSheet === undefined) {
      // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
      // is constructable.
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();

        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }

    return this._styleSheet;
  }

  toString() {
    return this.cssText;
  }

}
/**
 * Wrap a value for interpolation in a css tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */

const unsafeCSS = value => {
  return new CSSResult(String(value), constructionToken);
};

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
/**
 * Template tag which which can be used with LitElement's `style` property to
 * set element styles. For security reasons, only literal string values may be
 * used. To incorporate non-literal values `unsafeCSS` may be used inside a
 * template string part.
 */


const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};
// CONCATENATED MODULE: ./node_modules/lit-element/lit-element.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return lit_element_LitElement; });
/* unused concated harmony import defaultConverter */
/* unused concated harmony import notEqual */
/* unused concated harmony import UpdatingElement */
/* concated harmony reexport customElement */__webpack_require__.d(__webpack_exports__, "c", function() { return customElement; });
/* concated harmony reexport property */__webpack_require__.d(__webpack_exports__, "e", function() { return property; });
/* concated harmony reexport query */__webpack_require__.d(__webpack_exports__, "f", function() { return query; });
/* unused concated harmony import queryAll */
/* unused concated harmony import eventOptions */
/* concated harmony reexport html */__webpack_require__.d(__webpack_exports__, "d", function() { return lit_html["d" /* html */]; });
/* concated harmony reexport svg */__webpack_require__.d(__webpack_exports__, "g", function() { return lit_html["f" /* svg */]; });
/* unused concated harmony import TemplateResult */
/* unused concated harmony import SVGTemplateResult */
/* unused concated harmony import supportsAdoptingStyleSheets */
/* unused concated harmony import CSSResult */
/* unused concated harmony import unsafeCSS */
/* concated harmony reexport css */__webpack_require__.d(__webpack_exports__, "b", function() { return css; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







 // IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time

(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.0.1');
/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */

function arrayFlat(styles, result = []) {
  for (let i = 0, length = styles.length; i < length; i++) {
    const value = styles[i];

    if (Array.isArray(value)) {
      arrayFlat(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}
/** Deeply flattens styles array. Uses native flat if available. */


const flattenStyles = styles => styles.flat ? styles.flat(Infinity) : arrayFlat(styles);

class lit_element_LitElement extends UpdatingElement {
  /** @nocollapse */
  static finalize() {
    super.finalize(); // Prepare styling that is stamped at first render time. Styling
    // is built from user provided `styles` or is inherited from the superclass.

    this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ? this._getUniqueStyles() : this._styles || [];
  }
  /** @nocollapse */


  static _getUniqueStyles() {
    // Take care not to call `this.styles` multiple times since this generates
    // new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any
    // shared styles will generate new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable
    // stylesheets.
    const userStyles = this.styles;
    const styles = [];

    if (Array.isArray(userStyles)) {
      const flatStyles = flattenStyles(userStyles); // As a performance optimization to avoid duplicated styling that can
      // occur especially when composing via subclassing, de-duplicate styles
      // preserving the last item in the list. The last item is kept to
      // try to preserve cascade order with the assumption that it's most
      // important that last added styles override previous styles.

      const styleSet = flatStyles.reduceRight((set, s) => {
        set.add(s); // on IE set.add does not return the set.

        return set;
      }, new Set()); // Array.from does not work on Set in IE

      styleSet.forEach(v => styles.unshift(v));
    } else if (userStyles) {
      styles.push(userStyles);
    }

    return styles;
  }
  /**
   * Performs element initialization. By default this calls `createRenderRoot`
   * to create the element `renderRoot` node and captures any pre-set values for
   * registered properties.
   */


  initialize() {
    super.initialize();
    this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
    // element's getRootNode(). While this could be done, we're choosing not to
    // support this now since it would require different logic around de-duping.

    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow({
      mode: 'open'
    });
  }
  /**
   * Applies styling to the element shadowRoot using the `static get styles`
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */


  adoptStyles() {
    const styles = this.constructor._styles;

    if (styles.length === 0) {
      return;
    } // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it.
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering


    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
    } else if (supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => s.styleSheet);
    } else {
      // This must be done after rendering so the actual style insertion is done
      // in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  connectedCallback() {
    super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
    // connected after first update.

    if (this.hasUpdated && window.ShadyCSS !== undefined) {
      window.ShadyCSS.styleElement(this);
    }
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * * @param _changedProperties Map of changed properties with old values
   */


  update(changedProperties) {
    super.update(changedProperties);
    const templateResult = this.render();

    if (templateResult instanceof lit_html["b" /* TemplateResult */]) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    } // When native Shadow DOM is used but adoptedStyles are not supported,
    // insert styling after rendering to ensure adoptedStyles have highest
    // priority.


    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;

      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */


  render() {}

}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 */

lit_element_LitElement.finalized = true;
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */

lit_element_LitElement.render = shady_render_render;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return nodeMarker; });
/* unused harmony export markerRegex */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return boundAttributeSuffix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isTemplatePartActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return lastAttributeNameRegex; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    let index = -1;
    let partIndex = 0;
    const nodesToRemove = [];

    const _prepareTemplate = template => {
      const content = template.content; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null

      const walker = document.createTreeWalker(content, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false); // Keeps track of the last index associated with a part. We try to delete
      // unnecessary nodes, but we never want to associate two different parts
      // to the same index. They must have a constant node between.

      let lastPartIndex = 0;

      while (walker.nextNode()) {
        index++;
        const node = walker.currentNode;

        if (node.nodeType === 1
        /* Node.ELEMENT_NODE */
        ) {
            if (node.hasAttributes()) {
              const attributes = node.attributes; // Per
              // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
              // attributes are not guaranteed to be returned in document order.
              // In particular, Edge/IE can return them out of order, so we cannot
              // assume a correspondance between part index and attribute index.

              let count = 0;

              for (let i = 0; i < attributes.length; i++) {
                if (attributes[i].value.indexOf(marker) >= 0) {
                  count++;
                }
              }

              while (count-- > 0) {
                // Get the template literal section leading up to the first
                // expression in this attribute
                const stringForPart = result.strings[partIndex]; // Find the attribute name

                const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                // All bound attributes have had a suffix added in
                // TemplateResult#getHTML to opt out of special attribute
                // handling. To look up the attribute value we also need to add
                // the suffix.

                const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                const attributeValue = node.getAttribute(attributeLookupName);
                const strings = attributeValue.split(markerRegex);
                this.parts.push({
                  type: 'attribute',
                  index,
                  name,
                  strings
                });
                node.removeAttribute(attributeLookupName);
                partIndex += strings.length - 1;
              }
            }

            if (node.tagName === 'TEMPLATE') {
              _prepareTemplate(node);
            }
          } else if (node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
            const data = node.data;

            if (data.indexOf(marker) >= 0) {
              const parent = node.parentNode;
              const strings = data.split(markerRegex);
              const lastIndex = strings.length - 1; // Generate a new text node for each literal section
              // These nodes are also used as the markers for node parts

              for (let i = 0; i < lastIndex; i++) {
                parent.insertBefore(strings[i] === '' ? createMarker() : document.createTextNode(strings[i]), node);
                this.parts.push({
                  type: 'node',
                  index: ++index
                });
              } // If there's no text, we must insert a comment to mark our place.
              // Else, we can trust it will stick around after cloning.


              if (strings[lastIndex] === '') {
                parent.insertBefore(createMarker(), node);
                nodesToRemove.push(node);
              } else {
                node.data = strings[lastIndex];
              } // We have a part for each match found


              partIndex += lastIndex;
            }
          } else if (node.nodeType === 8
        /* Node.COMMENT_NODE */
        ) {
            if (node.data === marker) {
              const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
              // the following are true:
              //  * We don't have a previousSibling
              //  * The previousSibling is already the start of a previous part

              if (node.previousSibling === null || index === lastPartIndex) {
                index++;
                parent.insertBefore(createMarker(), node);
              }

              lastPartIndex = index;
              this.parts.push({
                type: 'node',
                index
              }); // If we don't have a nextSibling, keep this node so we have an end.
              // Else, we can remove it to save future costs.

              if (node.nextSibling === null) {
                node.data = '';
              } else {
                nodesToRemove.push(node);
                index--;
              }

              partIndex++;
            } else {
              let i = -1;

              while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                // Comment node has a binding marker inside, make an inactive part
                // The binding won't work, but subsequent bindings will
                // TODO (justinfagnani): consider whether it's even worth it to
                // make bindings in comments work
                this.parts.push({
                  type: 'node',
                  index: -1
                });
              }
            }
          }
      }
    };

    _prepareTemplate(element); // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}
const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */

const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/lit-html/lib/parts.js
var parts = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/lit-html/lib/default-template-processor.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */

class default_template_processor_DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const comitter = new parts["f" /* PropertyCommitter */](element, name.slice(1), strings);
      return comitter.parts;
    }

    if (prefix === '@') {
      return [new parts["d" /* EventPart */](element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new parts["c" /* BooleanAttributePart */](element, name.slice(1), strings)];
    }

    const comitter = new parts["a" /* AttributeCommitter */](element, name, strings);
    return comitter.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new parts["e" /* NodePart */](options);
  }

}
const defaultTemplateProcessor = new default_template_processor_DefaultTemplateProcessor();
// EXTERNAL MODULE: ./node_modules/lit-html/lib/template-result.js
var template_result = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/directive.js
var directive = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/dom.js
var dom = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/part.js
var part = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/render.js
var render = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/template-factory.js
var template_factory = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/template-instance.js
var template_instance = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/lit-html/lib/template.js
var template = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/lit-html/lit-html.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return svg; });
/* unused concated harmony import DefaultTemplateProcessor */
/* unused concated harmony import defaultTemplateProcessor */
/* concated harmony reexport directive */__webpack_require__.d(__webpack_exports__, "c", function() { return directive["a" /* directive */]; });
/* unused concated harmony import isDirective */
/* unused concated harmony import removeNodes */
/* unused concated harmony import reparentNodes */
/* unused concated harmony import noChange */
/* concated harmony reexport nothing */__webpack_require__.d(__webpack_exports__, "e", function() { return part["b" /* nothing */]; });
/* unused concated harmony import AttributeCommitter */
/* concated harmony reexport AttributePart */__webpack_require__.d(__webpack_exports__, "a", function() { return parts["b" /* AttributePart */]; });
/* unused concated harmony import BooleanAttributePart */
/* unused concated harmony import EventPart */
/* unused concated harmony import isPrimitive */
/* unused concated harmony import NodePart */
/* unused concated harmony import PropertyCommitter */
/* unused concated harmony import PropertyPart */
/* unused concated harmony import parts */
/* unused concated harmony import render */
/* unused concated harmony import templateCaches */
/* unused concated harmony import templateFactory */
/* unused concated harmony import TemplateInstance */
/* unused concated harmony import SVGTemplateResult */
/* concated harmony reexport TemplateResult */__webpack_require__.d(__webpack_exports__, "b", function() { return template_result["b" /* TemplateResult */]; });
/* unused concated harmony import createMarker */
/* unused concated harmony import isTemplatePartActive */
/* unused concated harmony import Template */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */



 // TODO(justinfagnani): remove line when we get NodePart moving methods








 // IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time

(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */

const html = (strings, ...values) => new template_result["b" /* TemplateResult */](strings, values, 'html', defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */

const svg = (strings, ...values) => new template_result["a" /* SVGTemplateResult */](strings, values, 'svg', defaultTemplateProcessor);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isPrimitive */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttributeCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return NodePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BooleanAttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PropertyCommitter; });
/* unused harmony export PropertyPart */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return EventPart; });
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */






const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (v != null && (Array.isArray(v) || // tslint:disable-next-line:no-any
        typeof v !== 'string' && v[Symbol.iterator])) {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        } else {
          text += typeof v === 'string' ? v : String(v);
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
class AttributePart {
  constructor(comitter) {
    this.value = undefined;
    this.committer = comitter;
  }

  setValue(value) {
    if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"] && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[/* isDirective */ "b"])(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[/* isDirective */ "b"])(this.value)) {
      const directive = this.value;
      this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"];
      directive(this);
    }

    if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"]) {
      return;
    }

    this.committer.commit();
  }

}
class NodePart {
  constructor(options) {
    this.value = undefined;
    this._pendingValue = undefined;
    this.options = options;
  }
  /**
   * Inserts this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[/* createMarker */ "c"])());
    this.endNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[/* createMarker */ "c"])());
  }
  /**
   * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
   * its next sibling must be static, unchanging nodes such as those that appear
   * in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part._insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[/* createMarker */ "c"])());

    part._insert(this.endNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[/* createMarker */ "c"])());
  }
  /**
   * Appends this part after `ref`
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref._insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[/* createMarker */ "c"])());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[/* isDirective */ "b"])(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"];
      directive(this);
    }

    const value = this._pendingValue;

    if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"]) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this._commitText(value);
      }
    } else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__[/* TemplateResult */ "b"]) {
      this._commitTemplateResult(value);
    } else if (value instanceof Node) {
      this._commitNode(value);
    } else if (Array.isArray(value) || // tslint:disable-next-line:no-any
    value[Symbol.iterator]) {
      this._commitIterable(value);
    } else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__[/* nothing */ "b"]) {
      this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__[/* nothing */ "b"];
      this.clear();
    } else {
      // Fallback, will render the string representation
      this._commitText(value);
    }
  }

  _insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  _commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this._insert(value);

    this.value = value;
  }

  _commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value;

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = value;
      } else {
      this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
    }

    this.value = value;
  }

  _commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__[/* TemplateInstance */ "a"] && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__[/* TemplateInstance */ "a"](template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this._commitNode(fragment);

      this.value = instance;
    }
  }

  _commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    Object(_dom_js__WEBPACK_IMPORTED_MODULE_1__[/* removeNodes */ "b"])(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this._pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[/* isDirective */ "b"])(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"];
      directive(this);
    }

    if (this._pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"]) {
      return;
    }

    const value = !!this._pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }
    }

    this.value = value;
    this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"];
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // tslint:disable-next-line:no-any

      this.element[this.name] = this._getValue();
    }
  }

}
class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.

let eventOptionsSupported = false;

try {
  const options = {
    get capture() {
      eventOptionsSupported = true;
      return false;
    }

  }; // tslint:disable-next-line:no-any

  window.addEventListener('test', options, options); // tslint:disable-next-line:no-any

  window.removeEventListener('test', options, options);
} catch (_e) {}

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this._pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this._boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[/* isDirective */ "b"])(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"];
      directive(this);
    }

    if (this._pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"]) {
      return;
    }

    const newListener = this._pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
    }

    if (shouldAddListener) {
      this._options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
    }

    this.value = newListener;
    this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[/* noChange */ "a"];
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return noChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nothing; });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

const nothing = {};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isCEPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return reparentNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return removeNodes; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */

const reparentNodes = (container, start, end = null, before = null) => {
  let node = start;

  while (node !== end) {
    const n = node.nextSibling;
    container.insertBefore(node, before);
    node = n;
  }
};
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */

const removeNodes = (container, startNode, endNode = null) => {
  let node = startNode;

  while (node !== endNode) {
    const n = node.nextSibling;
    container.removeChild(node);
    node = n;
  }
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SVGTemplateResult; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */


/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const endIndex = this.strings.length - 1;
    let html = '';

    for (let i = 0; i < endIndex; i++) {
      const s = this.strings[i]; // This exec() call does two things:
      // 1) Appends a suffix to the bound attribute name to opt out of special
      // attribute value parsing that IE11 and Edge do, like for style and
      // many SVG attributes. The Template class also appends the same suffix
      // when looking up attributes to create Parts.
      // 2) Adds an unquoted-attribute-safe marker for the first expression in
      // an attribute. Subsequent attribute expressions will use node markers,
      // and this is safe since attributes with multiple expressions are
      // guaranteed to be quoted.

      const match = _template_js__WEBPACK_IMPORTED_MODULE_1__[/* lastAttributeNameRegex */ "e"].exec(s);

      if (match) {
        // We're starting a new bound attribute.
        // Add the safe attribute suffix, and use unquoted-attribute-safe
        // marker.
        html += s.substr(0, match.index) + match[1] + match[2] + _template_js__WEBPACK_IMPORTED_MODULE_1__[/* boundAttributeSuffix */ "b"] + match[3] + _template_js__WEBPACK_IMPORTED_MODULE_1__[/* marker */ "f"];
      } else {
        // We're either in a bound node, or trailing bound attribute.
        // Either way, nodeMarker is safe to use.
        html += s + _template_js__WEBPACK_IMPORTED_MODULE_1__[/* nodeMarker */ "g"];
      }
    }

    return html + this.strings[endIndex];
  }

  getTemplateElement() {
    const template = document.createElement('template');
    template.innerHTML = this.getHTML();
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__[/* reparentNodes */ "c"])(content, svgElement.firstChild);
    return template;
  }

}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return templateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return templateCaches; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */

function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__[/* marker */ "f"]); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new _template_js__WEBPACK_IMPORTED_MODULE_0__[/* Template */ "a"](result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = new Map();

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isDirective; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive so that lit-html will call the function
 * during template rendering, rather than passing as a value.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object
 *
 * @example
 *
 * ```
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 * ```
 */
// tslint:disable-next-line:no-any

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */



const parts = new WeakMap();
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__[/* removeNodes */ "b"])(container, container.firstChild);
    parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__[/* NodePart */ "e"](Object.assign({
      templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__[/* templateFactory */ "b"]
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateInstance; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */

class TemplateInstance {
  constructor(template, processor, options) {
    this._parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this._parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this._parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // When using the Custom Elements polyfill, clone the node, rather than
    // importing it, to keep the fragment in the template's document. This
    // leaves the fragment inert so custom elements won't upgrade and
    // potentially modify their contents by creating a polyfilled ShadowRoot
    // while we traverse the tree.
    const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__[/* isCEPolyfill */ "a"] ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const parts = this.template.parts;
    let partIndex = 0;
    let nodeIndex = 0;

    const _prepareInstance = fragment => {
      // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null
      const walker = document.createTreeWalker(fragment, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false);
      let node = walker.nextNode(); // Loop through all the nodes and parts of a template

      while (partIndex < parts.length && node !== null) {
        const part = parts[partIndex]; // Consecutive Parts may have the same node index, in the case of
        // multiple bound attributes on an element. So each iteration we either
        // increment the nodeIndex, if we aren't on a node with a part, or the
        // partIndex if we are. By not incrementing the nodeIndex when we find a
        // part, we allow for the next part to be associated with the current
        // node if neccessasry.

        if (!Object(_template_js__WEBPACK_IMPORTED_MODULE_1__[/* isTemplatePartActive */ "d"])(part)) {
          this._parts.push(undefined);

          partIndex++;
        } else if (nodeIndex === part.index) {
          if (part.type === 'node') {
            const part = this.processor.handleTextExpression(this.options);
            part.insertAfterNode(node.previousSibling);

            this._parts.push(part);
          } else {
            this._parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
          }

          partIndex++;
        } else {
          nodeIndex++;

          if (node.nodeName === 'TEMPLATE') {
            _prepareInstance(node.content);
          }

          node = walker.nextNode();
        }
      }
    };

    _prepareInstance(fragment);

    if (_dom_js__WEBPACK_IMPORTED_MODULE_0__[/* isCEPolyfill */ "a"]) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vaadin/router/dist/vaadin-router.js
function toArray(objectOrArray) {
  objectOrArray = objectOrArray || [];
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}

function log(msg) {
  return `[Vaadin.Router] ${msg}`;
}

function logValue(value) {
  if (typeof value !== 'object') {
    return String(value);
  }

  const stringType = Object.prototype.toString.call(value).match(/ (.*)\]$/)[1];

  if (stringType === 'Object' || stringType === 'Array') {
    return `${stringType} ${JSON.stringify(value)}`;
  } else {
    return stringType;
  }
}

const MODULE = 'module';
const NOMODULE = 'nomodule';
const bundleKeys = [MODULE, NOMODULE];

function ensureBundle(src) {
  if (!src.match(/.+\.[m]?js$/)) {
    throw new Error(log(`Unsupported type for bundle "${src}": .js or .mjs expected.`));
  }
}

function ensureRoute(route) {
  if (!route || !isString(route.path)) {
    throw new Error(log(`Expected route config to be an object with a "path" string property, or an array of such objects`));
  }

  const bundle = route.bundle;
  const stringKeys = ['component', 'redirect', 'bundle'];

  if (!isFunction(route.action) && !Array.isArray(route.children) && !isFunction(route.children) && !isObject(bundle) && !stringKeys.some(key => isString(route[key]))) {
    throw new Error(log(`Expected route config "${route.path}" to include either "${stringKeys.join('", "')}" ` + `or "action" function but none found.`));
  }

  if (bundle) {
    if (isString(bundle)) {
      ensureBundle(bundle);
    } else if (!bundleKeys.some(key => key in bundle)) {
      throw new Error(log('Expected route bundle to include either "' + NOMODULE + '" or "' + MODULE + '" keys, or both'));
    } else {
      bundleKeys.forEach(key => key in bundle && ensureBundle(bundle[key]));
    }
  }

  if (route.redirect) {
    ['bundle', 'component'].forEach(overriddenProp => {
      if (overriddenProp in route) {
        console.warn(log(`Route config "${route.path}" has both "redirect" and "${overriddenProp}" properties, ` + `and "redirect" will always override the latter. Did you mean to only use "${overriddenProp}"?`));
      }
    });
  }
}

function ensureRoutes(routes) {
  toArray(routes).forEach(route => ensureRoute(route));
}

function loadScript(src, key) {
  let script = document.head.querySelector('script[src="' + src + '"][async]');

  if (!script) {
    script = document.createElement('script');
    script.setAttribute('src', src);

    if (key === MODULE) {
      script.setAttribute('type', MODULE);
    } else if (key === NOMODULE) {
      script.setAttribute(NOMODULE, '');
    }

    script.async = true;
  }

  return new Promise((resolve, reject) => {
    script.onreadystatechange = script.onload = e => {
      script.__dynamicImportLoaded = true;
      resolve(e);
    };

    script.onerror = e => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      reject(e);
    };

    if (script.parentNode === null) {
      document.head.appendChild(script);
    } else if (script.__dynamicImportLoaded) {
      resolve();
    }
  });
}

function loadBundle(bundle) {
  if (isString(bundle)) {
    return loadScript(bundle);
  } else {
    return Promise.race(bundleKeys.filter(key => key in bundle).map(key => loadScript(bundle[key], key)));
  }
}

function fireRouterEvent(type, detail) {
  return !window.dispatchEvent(new CustomEvent(`vaadin-router-${type}`, {
    cancelable: type === 'go',
    detail
  }));
}

function isObject(o) {
  // guard against null passing the typeof check
  return typeof o === 'object' && !!o;
}

function isFunction(f) {
  return typeof f === 'function';
}

function isString(s) {
  return typeof s === 'string';
}

function getNotFoundError(context) {
  const error = new Error(log(`Page not found (${context.pathname})`));
  error.context = context;
  error.code = 404;
  return error;
}

const notFoundResult = new class NotFoundResult {}();
/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */

function getAnchorOrigin(anchor) {
  // IE11: on HTTP and HTTPS the default port is not included into
  // window.location.origin, so won't include it here either.
  const port = anchor.port;
  const protocol = anchor.protocol;
  const defaultHttp = protocol === 'http:' && port === '80';
  const defaultHttps = protocol === 'https:' && port === '443';
  const host = defaultHttp || defaultHttps ? anchor.hostname // does not include the port number (e.g. www.example.org)
  : anchor.host; // does include the port number (e.g. www.example.org:80)

  return `${protocol}//${host}`;
} // The list of checks is not complete:
//  - SVG support is missing
//  - the 'rel' attribute is not considered


function vaadinRouterGlobalClickHandler(event) {
  // ignore the click if the default action is prevented
  if (event.defaultPrevented) {
    return;
  } // ignore the click if not with the primary mouse button


  if (event.button !== 0) {
    return;
  } // ignore the click if a modifier key is pressed


  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
    return;
  } // find the <a> element that the click is at (or within)


  let anchor = event.target;
  const path = event.composedPath ? event.composedPath() : event.path || []; // FIXME(web-padawan): `Symbol.iterator` used by webcomponentsjs is broken for arrays
  // example to check: `for...of` loop here throws the "Not yet implemented" error

  for (let i = 0; i < path.length; i++) {
    const target = path[i];

    if (target.nodeName && target.nodeName.toLowerCase() === 'a') {
      anchor = target;
      break;
    }
  }

  while (anchor && anchor.nodeName.toLowerCase() !== 'a') {
    anchor = anchor.parentNode;
  } // ignore the click if not at an <a> element


  if (!anchor || anchor.nodeName.toLowerCase() !== 'a') {
    return;
  } // ignore the click if the <a> element has a non-default target


  if (anchor.target && anchor.target.toLowerCase() !== '_self') {
    return;
  } // ignore the click if the <a> element has the 'download' attribute


  if (anchor.hasAttribute('download')) {
    return;
  } // ignore the click if the target URL is a fragment on the current page


  if (anchor.pathname === window.location.pathname && anchor.hash !== '') {
    return;
  } // ignore the click if the target is external to the app
  // In IE11 HTMLAnchorElement does not have the `origin` property


  const origin = anchor.origin || getAnchorOrigin(anchor);

  if (origin !== window.location.origin) {
    return;
  } // if none of the above, convert the click into a navigation event


  if (fireRouterEvent('go', {
    pathname: anchor.pathname
  })) {
    event.preventDefault();
  }
}
/**
 * A navigation trigger for Vaadin Router that translated clicks on `<a>` links
 * into Vaadin Router navigation events.
 *
 * Only regular clicks on in-app links are translated (primary mouse button, no
 * modifier keys, the target href is within the app's URL space).
 *
 * @memberOf Vaadin.Router.Triggers
 * @type {NavigationTrigger}
 */


const CLICK = {
  activate() {
    window.document.addEventListener('click', vaadinRouterGlobalClickHandler);
  },

  inactivate() {
    window.document.removeEventListener('click', vaadinRouterGlobalClickHandler);
  }

}; // PopStateEvent constructor shim

const isIE = /Trident/.test(navigator.userAgent);
/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */

if (isIE && !isFunction(window.PopStateEvent)) {
  window.PopStateEvent = function (inType, params) {
    params = params || {};
    var e = document.createEvent('Event');
    e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
    e.state = params.state || null;
    return e;
  };

  window.PopStateEvent.prototype = window.Event.prototype;
}

function vaadinRouterGlobalPopstateHandler(event) {
  if (event.state === 'vaadin-router-ignore') {
    return;
  }

  fireRouterEvent('go', {
    pathname: window.location.pathname
  });
}
/**
 * A navigation trigger for Vaadin Router that translates popstate events into
 * Vaadin Router navigation events.
 *
 * @memberOf Vaadin.Router.Triggers
 * @type {NavigationTrigger}
 */


const POPSTATE = {
  activate() {
    window.addEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  },

  inactivate() {
    window.removeEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  }

};
/**
 * Expose `pathToRegexp`.
 */

var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
/**
 * Default configs.
 */

var DEFAULT_DELIMITER = '/';
var DEFAULT_DELIMITERS = './';
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
'(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || DEFAULT_DELIMITER;
  var delimiters = options && options.delimiters || DEFAULT_DELIMITERS;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue;
    }

    var prev = '';
    var next = str[index];
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k];
        path = path.slice(0, k);
      }
    } // Push the current path onto the tokens.


    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var partial = prev !== '' && next !== undefined && next !== prev;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = prev || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Push any remaining characters.


  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (data, options) {
    var path = '';
    var encode = options && options.encode || encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array');
        }

        if (value.length === 0) {
          if (token.optional) continue;
          throw new TypeError('Expected "' + token.name + '" to not be empty');
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token);

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
        }

        path += token.prefix + segment;
        continue;
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix;
        continue;
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'));
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, '\\$1');
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options && options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  if (!keys) return path; // Use a negative lookahead to match only capturing groups.

  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      });
    }
  }

  return path;
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options));
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
  var delimiters = options.delimiters || DEFAULT_DELIMITERS;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = '';
  var isEndDelimited = tokens.length === 0; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
    } else {
      var prefix = escapeString(token.prefix);
      var capture = token.repeat ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*' : token.pattern;
      if (keys) keys.push(token);

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?';
        } else {
          route += '(?:' + prefix + '(' + capture + '))?';
        }
      } else {
        route += prefix + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?';
    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?';
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')';
  }

  return new RegExp('^' + route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys);
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path, keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path, keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {
  hasOwnProperty: vaadin_router_hasOwnProperty
} = Object.prototype;
const cache = new Map(); // see https://github.com/pillarjs/path-to-regexp/issues/148

cache.set('|false', {
  keys: [],
  pattern: /(?:)/
});

function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    return val;
  }
}

function matchPath(routepath, path, exact, parentKeys, parentParams) {
  exact = !!exact;
  const cacheKey = `${routepath}|${exact}`;
  let regexp = cache.get(cacheKey);

  if (!regexp) {
    const keys = [];
    regexp = {
      keys,
      pattern: pathToRegexp_1(routepath, keys, {
        end: exact,
        strict: routepath === ''
      })
    };
    cache.set(cacheKey, regexp);
  }

  const m = regexp.pattern.exec(path);

  if (!m) {
    return null;
  }

  const params = Object.assign({}, parentParams);

  for (let i = 1; i < m.length; i++) {
    const key = regexp.keys[i - 1];
    const prop = key.name;
    const value = m[i];

    if (value !== undefined || !vaadin_router_hasOwnProperty.call(params, prop)) {
      if (key.repeat) {
        params[prop] = value ? value.split(key.delimiter).map(decodeParam) : [];
      } else {
        params[prop] = value ? decodeParam(value) : value;
      }
    }
  }

  return {
    path: m[0],
    keys: (parentKeys || []).concat(regexp.keys),
    params
  };
}
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Traverses the routes tree and matches its nodes to the given pathname from
 * the root down to the leaves. Each match consumes a part of the pathname and
 * the matching process continues for as long as there is a matching child
 * route for the remaining part of the pathname.
 *
 * The returned value is a lazily evaluated iterator.
 *
 * The leading "/" in a route path matters only for the root of the routes
 * tree (or if all parent routes are ""). In all other cases a leading "/" in
 * a child route path has no significance.
 *
 * The trailing "/" in a _route path_ matters only for the leaves of the
 * routes tree. A leaf route with a trailing "/" matches only a pathname that
 * also has a trailing "/".
 *
 * The trailing "/" in a route path does not affect matching of child routes
 * in any way.
 *
 * The trailing "/" in a _pathname_ generally does not matter (except for
 * the case of leaf nodes described above).
 *
 * The "" and "/" routes have special treatment:
 *  1. as a single route
 *     the "" and "/" routes match only the "" and "/" pathnames respectively
 *  2. as a parent in the routes tree
 *     the "" route matches any pathname without consuming any part of it
 *     the "/" route matches any absolute pathname consuming its leading "/"
 *  3. as a leaf in the routes tree
 *     the "" and "/" routes match only if the entire pathname is consumed by
 *         the parent routes chain. In this case "" and "/" are equivalent.
 *  4. several directly nested "" or "/" routes
 *     - directly nested "" or "/" routes are 'squashed' (i.e. nesting two
 *       "/" routes does not require a double "/" in the pathname to match)
 *     - if there are only "" in the parent routes chain, no part of the
 *       pathname is consumed, and the leading "/" in the child routes' paths
 *       remains significant
 *
 * Side effect:
 *   - the routes tree { path: '' } matches only the '' pathname
 *   - the routes tree { path: '', children: [ { path: '' } ] } matches any
 *     pathname (for the tree root)
 *
 * Prefix matching can be enabled also by `children: true`.
 */


function matchRoute(route, pathname, ignoreLeadingSlash, parentKeys, parentParams) {
  let match;
  let childMatches;
  let childIndex = 0;
  let routepath = route.path || '';

  if (routepath.charAt(0) === '/') {
    if (ignoreLeadingSlash) {
      routepath = routepath.substr(1);
    }

    ignoreLeadingSlash = true;
  }

  return {
    next(routeToSkip) {
      if (route === routeToSkip) {
        return {
          done: true
        };
      }

      const children = route.__children = route.__children || route.children;

      if (!match) {
        match = matchPath(routepath, pathname, !children, parentKeys, parentParams);

        if (match) {
          return {
            done: false,
            value: {
              route,
              keys: match.keys,
              params: match.params,
              path: match.path
            }
          };
        }
      }

      if (match && children) {
        while (childIndex < children.length) {
          if (!childMatches) {
            const childRoute = children[childIndex];
            childRoute.parent = route;
            let matchedLength = match.path.length;

            if (matchedLength > 0 && pathname.charAt(matchedLength) === '/') {
              matchedLength += 1;
            }

            childMatches = matchRoute(childRoute, pathname.substr(matchedLength), ignoreLeadingSlash, match.keys, match.params);
          }

          const childMatch = childMatches.next(routeToSkip);

          if (!childMatch.done) {
            return {
              done: false,
              value: childMatch.value
            };
          }

          childMatches = null;
          childIndex++;
        }
      }

      return {
        done: true
      };
    }

  };
}
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function resolveRoute(context) {
  if (isFunction(context.route.action)) {
    return context.route.action(context);
  }

  return undefined;
}
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function isChildRoute(parentRoute, childRoute) {
  let route = childRoute;

  while (route) {
    route = route.parent;

    if (route === parentRoute) {
      return true;
    }
  }

  return false;
}

function generateErrorMessage(currentContext) {
  let errorMessage = `Path '${currentContext.pathname}' is not properly resolved due to an error.`;
  const routePath = (currentContext.route || {}).path;

  if (routePath) {
    errorMessage += ` Resolution had failed on route: '${routePath}'`;
  }

  return errorMessage;
}

function addRouteToChain(context, match) {
  const {
    route,
    path
  } = match;

  function shouldDiscardOldChain(oldChain, route) {
    return !route.parent || !oldChain || !oldChain.length || oldChain[oldChain.length - 1].route !== route.parent;
  }

  if (route && !route.__synthetic) {
    const item = {
      path,
      route
    };

    if (shouldDiscardOldChain(context.chain, route)) {
      context.chain = [item];
    } else {
      context.chain.push(item);
    }
  }
}
/**
 * @memberof Vaadin
 */


class Resolver {
  constructor(routes, options = {}) {
    if (Object(routes) !== routes) {
      throw new TypeError('Invalid routes');
    }

    this.baseUrl = options.baseUrl || '';
    this.errorHandler = options.errorHandler;
    this.resolveRoute = options.resolveRoute || resolveRoute;
    this.context = Object.assign({
      resolver: this
    }, options.context);
    this.root = Array.isArray(routes) ? {
      path: '',
      __children: routes,
      parent: null,
      __synthetic: true
    } : routes;
    this.root.parent = null;
  }
  /**
   * Returns the current list of routes (as a shallow copy). Adding / removing
   * routes to / from the returned array does not affect the routing config,
   * but modifying the route objects does.
   *
   * @return {!Array<!Route>}
   */


  getRoutes() {
    return [...this.root.__children];
  }
  /**
   * Sets the routing config (replacing the existing one).
   *
   * @param {!Array<!Route>|!Route} routes a single route or an array of those
   *    (the array is shallow copied)
   */


  setRoutes(routes) {
    ensureRoutes(routes);
    const newRoutes = [...toArray(routes)];
    this.root.__children = newRoutes;
  }
  /**
   * Appends one or several routes to the routing config and returns the
   * effective routing config after the operation.
   *
   * @param {!Array<!Route>|!Route} routes a single route or an array of those
   *    (the array is shallow copied)
   * @return {!Array<!Route>}
   * @protected
   */


  addRoutes(routes) {
    ensureRoutes(routes);

    this.root.__children.push(...toArray(routes));

    return this.getRoutes();
  }
  /**
   * Removes all existing routes from the routing config.
   */


  removeRoutes() {
    this.setRoutes([]);
  }
  /**
   * Asynchronously resolves the given pathname, i.e. finds all routes matching
   * the pathname and tries resolving them one after another in the order they
   * are listed in the routes config until the first non-null result.
   *
   * Returns a promise that is fulfilled with the return value of an object that consists of the first
   * route handler result that returns something other than `null` or `undefined` and context used to get this result.
   *
   * If no route handlers return a non-null result, or if no route matches the
   * given pathname the returned promise is rejected with a 'page not found'
   * `Error`.
   *
   * @param {!string|!{pathname: !string}} pathnameOrContext the pathname to
   *    resolve or a context object with a `pathname` property and other
   *    properties to pass to the route resolver functions.
   * @return {!Promise<any>}
   */


  resolve(pathnameOrContext) {
    const context = Object.assign({}, this.context, isString(pathnameOrContext) ? {
      pathname: pathnameOrContext
    } : pathnameOrContext);
    const match = matchRoute(this.root, this.__normalizePathname(context.pathname), this.baseUrl);
    const resolve = this.resolveRoute;
    let matches = null;
    let nextMatches = null;
    let currentContext = context;

    function next(resume, parent = matches.value.route, prevResult) {
      const routeToSkip = prevResult === null && matches.value.route;
      matches = nextMatches || match.next(routeToSkip);
      nextMatches = null;

      if (!resume) {
        if (matches.done || !isChildRoute(parent, matches.value.route)) {
          nextMatches = matches;
          return Promise.resolve(notFoundResult);
        }
      }

      if (matches.done) {
        return Promise.reject(getNotFoundError(context));
      }

      addRouteToChain(context, matches.value);
      currentContext = Object.assign({}, context, matches.value);
      return Promise.resolve(resolve(currentContext)).then(resolution => {
        if (resolution !== null && resolution !== undefined && resolution !== notFoundResult) {
          currentContext.result = resolution.result || resolution;
          return currentContext;
        }

        return next(resume, parent, resolution);
      });
    }

    context.next = next;
    return Promise.resolve().then(() => next(true, this.root)).catch(error => {
      const errorMessage = generateErrorMessage(currentContext);

      if (!error) {
        error = new Error(errorMessage);
      } else {
        console.warn(errorMessage);
      }

      error.context = error.context || currentContext; // DOMException has its own code which is read-only

      if (!(error instanceof DOMException)) {
        error.code = error.code || 500;
      }

      if (this.errorHandler) {
        currentContext.result = this.errorHandler(error);
        return currentContext;
      }

      throw error;
    });
  }
  /**
   * URL constructor polyfill hook. Creates and returns an URL instance.
   */


  static __createUrl(url, base) {
    return new URL(url, base);
  }
  /**
   * If the baseUrl property is set, transforms the baseUrl and returns the full
   * actual `base` string for using in the `new URL(path, base);` and for
   * prepernding the paths with. The returned base ends with a trailing slash.
   *
   * Otherwise, returns empty string.
   */


  get __effectiveBaseUrl() {
    return this.baseUrl ? this.constructor.__createUrl(this.baseUrl, document.baseURI || document.URL).href.replace(/[^\/]*$/, '') : '';
  }
  /**
   * If the baseUrl is set, matches the pathname with the router’s baseUrl,
   * and returns the local pathname with the baseUrl stripped out.
   *
   * If the pathname does not match the baseUrl, returns undefined.
   *
   * If the `baseUrl` is not set, returns the unmodified pathname argument.
   */


  __normalizePathname(pathname) {
    if (!this.baseUrl) {
      // No base URL, no need to transform the pathname.
      return pathname;
    }

    const base = this.__effectiveBaseUrl;

    const normalizedUrl = this.constructor.__createUrl(pathname, base).href;

    if (normalizedUrl.slice(0, base.length) === base) {
      return normalizedUrl.slice(base.length);
    }
  }

}

Resolver.pathToRegexp = pathToRegexp_1;
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {
  pathToRegexp: pathToRegexp$1
} = Resolver;
const cache$1 = new Map();

function cacheRoutes(routesByName, route, routes) {
  const name = route.name || route.component;

  if (name) {
    if (routesByName.has(name)) {
      routesByName.get(name).push(route);
    } else {
      routesByName.set(name, [route]);
    }
  }

  if (Array.isArray(routes)) {
    for (let i = 0; i < routes.length; i++) {
      const childRoute = routes[i];
      childRoute.parent = route;
      cacheRoutes(routesByName, childRoute, childRoute.__children || childRoute.children);
    }
  }
}

function getRouteByName(routesByName, routeName) {
  const routes = routesByName.get(routeName);

  if (routes && routes.length > 1) {
    throw new Error(`Duplicate route with name "${routeName}".` + ` Try seting unique 'name' route properties.`);
  }

  return routes && routes[0];
}

function getRoutePath(route) {
  let path = route.path;
  path = Array.isArray(path) ? path[0] : path;
  return path !== undefined ? path : '';
}

function generateUrls(router, options = {}) {
  if (!(router instanceof Resolver)) {
    throw new TypeError('An instance of Resolver is expected');
  }

  const routesByName = new Map();
  return (routeName, params) => {
    let route = getRouteByName(routesByName, routeName);

    if (!route) {
      routesByName.clear(); // clear cache

      cacheRoutes(routesByName, router.root, router.root.__children);
      route = getRouteByName(routesByName, routeName);

      if (!route) {
        throw new Error(`Route "${routeName}" not found`);
      }
    }

    let regexp = cache$1.get(route.fullPath);

    if (!regexp) {
      let fullPath = getRoutePath(route);
      let rt = route.parent;

      while (rt) {
        const path = getRoutePath(rt);

        if (path) {
          fullPath = path.replace(/\/$/, '') + '/' + fullPath.replace(/^\//, '');
        }

        rt = rt.parent;
      }

      const tokens = pathToRegexp$1.parse(fullPath);
      const toPath = pathToRegexp$1.tokensToFunction(tokens);
      const keys = Object.create(null);

      for (let i = 0; i < tokens.length; i++) {
        if (!isString(tokens[i])) {
          keys[tokens[i].name] = true;
        }
      }

      regexp = {
        toPath,
        keys
      };
      cache$1.set(fullPath, regexp);
      route.fullPath = fullPath;
    }

    let url = regexp.toPath(params, options) || '/';

    if (options.stringifyQueryParams && params) {
      const queryParams = {};
      const keys = Object.keys(params);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!regexp.keys[key]) {
          queryParams[key] = params[key];
        }
      }

      const query = options.stringifyQueryParams(queryParams);

      if (query) {
        url += query.charAt(0) === '?' ? query : `?${query}`;
      }
    }

    return url;
  };
}
/**
 * @typedef NavigationTrigger
 * @type {object}
 * @property {function()} activate
 * @property {function()} inactivate
 */

/** @type {Array<NavigationTrigger>} */


let triggers = [];

function setNavigationTriggers(newTriggers) {
  triggers.forEach(trigger => trigger.inactivate());
  newTriggers.forEach(trigger => trigger.activate());
  triggers = newTriggers;
}

const willAnimate = elem => {
  const name = getComputedStyle(elem).getPropertyValue('animation-name');
  return name && name !== 'none';
};

const waitForAnimation = (elem, cb) => {
  const listener = () => {
    elem.removeEventListener('animationend', listener);
    cb();
  };

  elem.addEventListener('animationend', listener);
};

function animate(elem, className) {
  elem.classList.add(className);
  return new Promise(resolve => {
    if (willAnimate(elem)) {
      const rect = elem.getBoundingClientRect();
      const size = `height: ${rect.bottom - rect.top}px; width: ${rect.right - rect.left}px`;
      elem.setAttribute('style', `position: absolute; ${size}`);
      waitForAnimation(elem, () => {
        elem.classList.remove(className);
        elem.removeAttribute('style');
        resolve();
      });
    } else {
      elem.classList.remove(className);
      resolve();
    }
  });
}

const MAX_REDIRECT_COUNT = 256;

function isResultNotEmpty(result) {
  return result !== null && result !== undefined;
}

function copyContextWithoutNext(context) {
  const copy = Object.assign({}, context);
  delete copy.next;
  return copy;
}

function createLocation({
  pathname = '',
  chain = [],
  params = {},
  redirectFrom,
  resolver
}, route) {
  const routes = chain.map(item => item.route);
  return {
    baseUrl: resolver && resolver.baseUrl || '',
    pathname,
    routes,
    route: route || routes.length && routes[routes.length - 1] || null,
    params,
    redirectFrom,
    getUrl: (userParams = {}) => getPathnameForRouter(Router.pathToRegexp.compile(getMatchedPath(routes))(Object.assign({}, params, userParams)), resolver)
  };
}

function createRedirect(context, pathname) {
  const params = Object.assign({}, context.params);
  return {
    redirect: {
      pathname,
      from: context.pathname,
      params
    }
  };
}

function renderComponent(context, component) {
  const element = document.createElement(component);
  element.location = createLocation(context);
  const index = context.chain.map(item => item.route).indexOf(context.route);
  context.chain[index].element = element;
  return element;
}

function runCallbackIfPossible(callback, args, thisArg) {
  if (isFunction(callback)) {
    return callback.apply(thisArg, args);
  }
}

function amend(amendmentFunction, args, element) {
  return amendmentResult => {
    if (amendmentResult && (amendmentResult.cancel || amendmentResult.redirect)) {
      return amendmentResult;
    }

    if (element) {
      return runCallbackIfPossible(element[amendmentFunction], args, element);
    }
  };
}

function processNewChildren(newChildren, route) {
  if (!Array.isArray(newChildren) && !isObject(newChildren)) {
    throw new Error(log(`Incorrect "children" value for the route ${route.path}: expected array or object, but got ${newChildren}`));
  }

  route.__children = [];
  const childRoutes = toArray(newChildren);

  for (let i = 0; i < childRoutes.length; i++) {
    ensureRoute(childRoutes[i]);

    route.__children.push(childRoutes[i]);
  }
}

function removeDomNodes(nodes) {
  if (nodes && nodes.length) {
    const parent = nodes[0].parentNode;

    for (let i = 0; i < nodes.length; i++) {
      parent.removeChild(nodes[i]);
    }
  }
}

function getPathnameForRouter(pathname, router) {
  const base = router.__effectiveBaseUrl;
  return base ? router.constructor.__createUrl(pathname.replace(/^\//, ''), base).pathname : pathname;
}

function getMatchedPath(chain) {
  return chain.map(item => item.path).reduce((a, b) => {
    if (b.length) {
      return a.replace(/\/$/, '') + '/' + b.replace(/^\//, '');
    }

    return a;
  }, '');
}
/**
 * A simple client-side router for single-page applications. It uses
 * express-style middleware and has a first-class support for Web Components and
 * lazy-loading. Works great in Polymer and non-Polymer apps.
 *
 * Use `new Router(outlet, options)` to create a new Router instance.
 *
 * * The `outlet` parameter is a reference to the DOM node to render
 *   the content into.
 *
 * * The `options` parameter is an optional object with options. The following
 *   keys are supported:
 *   * `baseUrl` — the initial value for [
 *     the `baseUrl` property
 *   ](#/classes/Vaadin.Router#property-baseUrl)
 *
 * The Router instance is automatically subscribed to navigation events
 * on `window`.
 *
 * See [Live Examples](#/classes/Vaadin.Router/demos/demo/index.html) for the detailed usage demo and code snippets.
 *
 * See also detailed API docs for the following methods, for the advanced usage:
 *
 * * [setOutlet](#/classes/Vaadin.Router#method-setOutlet) – should be used to configure the outlet.
 * * [setTriggers](#/classes/Vaadin.Router#method-setTriggers) – should be used to configure the navigation events.
 * * [setRoutes](#/classes/Vaadin.Router#method-setRoutes) – should be used to configure the routes.
 *
 * Only `setRoutes` has to be called manually, others are automatically invoked when creating a new instance.
 *
 * @memberof Vaadin
 * @extends Vaadin.Resolver
 * @demo demo/index.html
 * @summary JavaScript class that renders different DOM content depending on
 *    a given path. It can re-render when triggered or automatically on
 *    'popstate' and / or 'click' events.
 */


class Router extends Resolver {
  /**
   * Creates a new Router instance with a given outlet, and
   * automatically subscribes it to navigation events on the `window`.
   * Using a constructor argument or a setter for outlet is equivalent:
   *
   * ```
   * const router = new Vaadin.Router();
   * router.setOutlet(outlet);
   * ```
   * @param {?Node} outlet
   * @param {?RouterOptions} options
   */
  constructor(outlet, options) {
    const baseElement = document.head.querySelector('base');
    super([], Object.assign({
      // Default options
      baseUrl: baseElement && baseElement.getAttribute('href')
    }, options));

    this.resolveRoute = context => this.__resolveRoute(context);

    const triggers = Router.NavigationTrigger;
    Router.setTriggers.apply(Router, Object.keys(triggers).map(key => triggers[key]));
    /**
     * The base URL for all routes in the router instance. By default,
     * takes the `<base href>` attribute value if the base element exists
     * in the `<head>`.
     *
     * @public
     * @type {string}
     */

    this.baseUrl;
    /**
     * A promise that is settled after the current render cycle completes. If
     * there is no render cycle in progress the promise is immediately settled
     * with the last render cycle result.
     *
     * @public
     * @type {!Promise<!Vaadin.Router.Location>}
     */

    this.ready;
    this.ready = Promise.resolve(outlet);
    /**
     * Contains read-only information about the current router location:
     * pathname, active routes, parameters. See the
     * [Location type declaration](#/classes/Vaadin.Router.Location)
     * for more details.
     *
     * @public
     * @type {!Vaadin.Router.Location}
     */

    this.location;
    this.location = createLocation({
      resolver: this
    });
    this.__lastStartedRenderId = 0;
    this.__navigationEventHandler = this.__onNavigationEvent.bind(this);
    this.setOutlet(outlet);
    this.subscribe();
  }

  __resolveRoute(context) {
    const route = context.route;
    let callbacks = Promise.resolve();

    if (isFunction(route.children)) {
      callbacks = callbacks.then(() => route.children(copyContextWithoutNext(context))).then(children => {
        // The route.children() callback might have re-written the
        // route.children property instead of returning a value
        if (!isResultNotEmpty(children) && !isFunction(route.children)) {
          children = route.children;
        }

        processNewChildren(children, route);
      });
    }

    const commands = {
      redirect: path => createRedirect(context, path),
      component: component => renderComponent(context, component)
    };
    return callbacks.then(() => runCallbackIfPossible(route.action, [context, commands], route)).then(result => {
      if (isResultNotEmpty(result)) {
        // Actions like `() => import('my-view.js')` are not expected to
        // end the resolution, despite the result is not empty. Checking
        // the result with a whitelist of values that end the resulution.
        if (result instanceof HTMLElement || result.redirect || result === notFoundResult) {
          return result;
        }
      }

      if (isString(route.redirect)) {
        return commands.redirect(route.redirect);
      }

      if (route.bundle) {
        return loadBundle(route.bundle).then(() => {}, () => {
          throw new Error(log(`Bundle not found: ${route.bundle}. Check if the file name is correct`));
        });
      }
    }).then(result => {
      if (isResultNotEmpty(result)) {
        return result;
      }

      if (isString(route.component)) {
        return commands.component(route.component);
      }
    });
  }
  /**
   * Sets the router outlet (the DOM node where the content for the current
   * route is inserted). Any content pre-existing in the router outlet is
   * removed at the end of each render pass.
   *
   * NOTE: this method is automatically invoked first time when creating a new Router instance.
   *
   * @param {?Node} outlet the DOM node where the content for the current route
   *     is inserted.
   */


  setOutlet(outlet) {
    if (outlet) {
      this.__ensureOutlet(outlet);
    }

    this.__outlet = outlet;
  }
  /**
   * Returns the current router outlet. The initial value is `undefined`.
   *
   * @return {?Node} the current router outlet (or `undefined`)
   */


  getOutlet() {
    return this.__outlet;
  }
  /**
   * Sets the routing config (replacing the existing one) and triggers a
   * navigation event so that the router outlet is refreshed according to the
   * current `window.location` and the new routing config.
   *
   * Each route object may have the following properties, listed here in the processing order:
   * * `path` – the route path (relative to the parent route if any) in the
   * [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   *
   * * `children` – an array of nested routes or a function that provides this
   * array at the render time. The function can be synchronous or asynchronous:
   * in the latter case the render is delayed until the returned promise is
   * resolved. The `children` function is executed every time when this route is
   * being rendered. This allows for dynamic route structures (e.g. backend-defined),
   * but it might have a performance impact as well. In order to avoid calling
   * the function on subsequent renders, you can override the `children` property
   * of the route object and save the calculated array there
   * (via `context.route.children = [ route1, route2, ...];`).
   * Parent routes are fully resolved before resolving the children. Children
   * 'path' values are relative to the parent ones.
   *
   * * `action` – the action that is executed before the route is resolved.
   * The value for this property should be a function, accepting `context`
   * and `commands` parameters described below. If present, this function is
   * always invoked first, disregarding of the other properties' presence.
   * The action can return a result directly or within a `Promise`, which
   * resolves to the result. If the action result is an `HTMLElement` instance,
   * a `commands.component(name)` result, a `commands.redirect(path)` result,
   * or a `context.next()` result, the current route resolution is finished,
   * and other route config properties are ignored.
   * See also **Route Actions** section in [Live Examples](#/classes/Vaadin.Router/demos/demo/index.html).
   *
   * * `redirect` – other route's path to redirect to. Passes all route parameters to the redirect target.
   * The target route should also be defined.
   * See also **Redirects** section in [Live Examples](#/classes/Vaadin.Router/demos/demo/index.html).
   *
   * * `bundle` – string containing the path to `.js` or `.mjs` bundle to load before resolving the route,
   * or the object with "module" and "nomodule" keys referring to different bundles.
   * Each bundle is only loaded once. If "module" and "nomodule" are set, only one bundle is loaded,
   * depending on whether the browser supports ES modules or not.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * Any error, e.g. 404 while loading bundle will cause route resolution to throw.
   * See also **Code Splitting** section in [Live Examples](#/classes/Vaadin.Router/demos/demo/index.html).
   *
   * * `component` – the tag name of the Web Component to resolve the route to.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * If route contains the `component` property (or an action that return a component)
   * and its child route also contains the `component` property, child route's component
   * will be rendered as a light dom child of a parent component.
   *
   * * `name` – the string name of the route to use in the
   * [`router.urlForName(name, params)`](#/classes/Vaadin.Router#method-urlForName)
   * navigation helper method.
   *
   * For any route function (`action`, `children`) defined, the corresponding `route` object is available inside the callback
   * through the `this` reference. If you need to access it, make sure you define the callback as a non-arrow function
   * because arrow functions do not have their own `this` reference.
   *
   * `context` object that is passed to `action` function holds the following properties:
   * * `context.pathname` – string with the pathname being resolved
   *
   * * `context.params` – object with route parameters
   *
   * * `context.route` – object that holds the route that is currently being rendered.
   *
   * * `context.next()` – function for asynchronously getting the next route
   * contents from the resolution chain (if any)
   *
   * `commands` object that is passed to `action` function has
   * the following methods:
   *
   * * `commands.redirect(path)` – function that creates a redirect data
   * for the path specified.
   *
   * * `commands.component(component)` – function that creates a new HTMLElement
   * with current context
   *
   * @param {!Array<!Object>|!Object} routes a single route or an array of those
   */


  setRoutes(routes) {
    this.__urlForName = undefined;
    super.setRoutes(routes);

    this.__onNavigationEvent();
  }
  /**
   * Asynchronously resolves the given pathname and renders the resolved route
   * component into the router outlet. If no router outlet is set at the time of
   * calling this method, or at the time when the route resolution is completed,
   * a `TypeError` is thrown.
   *
   * Returns a promise that is fulfilled with the router outlet DOM Node after
   * the route component is created and inserted into the router outlet, or
   * rejected if no route matches the given path.
   *
   * If another render pass is started before the previous one is completed, the
   * result of the previous render pass is ignored.
   *
   * @param {!string|!{pathname: !string}} pathnameOrContext the pathname to
   *    render or a context object with a `pathname` property and other
   *    properties to pass to the resolver.
   * @return {!Promise<!Node>}
   */


  render(pathnameOrContext, shouldUpdateHistory) {
    const renderId = ++this.__lastStartedRenderId;
    const pathname = pathnameOrContext.pathname || pathnameOrContext; // Find the first route that resolves to a non-empty result

    this.ready = this.resolve(pathnameOrContext) // Process the result of this.resolve() and handle all special commands:
    // (redirect / prevent / component). If the result is a 'component',
    // then go deeper and build the entire chain of nested components matching
    // the pathname. Also call all 'on before' callbacks along the way.
    .then(context => this.__fullyResolveChain(context)).then(context => {
      if (renderId === this.__lastStartedRenderId) {
        const previousContext = this.__previousContext; // Check if the render was prevented and make an early return in that case

        if (context === previousContext) {
          return this.location;
        }

        this.location = createLocation(context);
        fireRouterEvent('location-changed', {
          router: this,
          location: this.location
        });

        if (shouldUpdateHistory) {
          this.__updateBrowserHistory(context.pathname, context.redirectFrom);
        }

        this.__addAppearingContent(context, previousContext);

        const animationDone = this.__animateIfNeeded(context);

        this.__runOnAfterEnterCallbacks(context);

        this.__runOnAfterLeaveCallbacks(context, previousContext);

        return animationDone.then(() => {
          if (renderId === this.__lastStartedRenderId) {
            // If there is another render pass started after this one,
            // the 'disappearing content' would be removed when the other
            // render pass calls `this.__addAppearingContent()`
            this.__removeDisappearingContent();

            this.__previousContext = context;
            return this.location;
          }
        });
      }
    }).catch(error => {
      if (renderId === this.__lastStartedRenderId) {
        if (shouldUpdateHistory) {
          this.__updateBrowserHistory(pathname);
        }

        removeDomNodes(this.__outlet && this.__outlet.children);
        this.location = createLocation({
          pathname,
          resolver: this
        });
        fireRouterEvent('error', {
          router: this,
          error,
          pathname
        });
        throw error;
      }
    });
    return this.ready;
  }

  __fullyResolveChain(originalContext, currentContext = originalContext) {
    return this.__amendWithResolutionResult(currentContext).then(amendedContext => {
      const initialContext = amendedContext !== currentContext ? amendedContext : originalContext;
      return amendedContext.next().then(nextContext => {
        if (nextContext === null || nextContext === notFoundResult) {
          const matchedPath = getPathnameForRouter(getMatchedPath(amendedContext.chain), amendedContext.resolver);

          if (matchedPath !== amendedContext.pathname) {
            throw getNotFoundError(initialContext);
          }
        }

        return nextContext && nextContext !== notFoundResult ? this.__fullyResolveChain(initialContext, nextContext) : this.__amendWithOnBeforeCallbacks(initialContext);
      });
    });
  }

  __amendWithResolutionResult(context) {
    const result = context.result;

    if (result instanceof HTMLElement) {
      return Promise.resolve(context);
    } else if (result.redirect) {
      return this.__redirect(result.redirect, context.__redirectCount).then(context => this.__amendWithResolutionResult(context));
    } else if (result instanceof Error) {
      return Promise.reject(result);
    } else {
      return Promise.reject(new Error(log(`Invalid route resolution result for path "${context.pathname}". ` + `Expected redirect object or HTML element, but got: "${logValue(result)}". ` + `Double check the action return value for the route.`)));
    }
  }

  __amendWithOnBeforeCallbacks(contextWithFullChain) {
    return this.__runOnBeforeCallbacks(contextWithFullChain).then(amendedContext => {
      if (amendedContext === this.__previousContext || amendedContext === contextWithFullChain) {
        return amendedContext;
      }

      return this.__fullyResolveChain(amendedContext);
    });
  }

  __runOnBeforeCallbacks(newContext) {
    const previousContext = this.__previousContext || {};
    const previousChain = previousContext.chain || [];
    const newChain = newContext.chain;
    let callbacks = Promise.resolve();

    const prevent = () => ({
      cancel: true
    });

    const redirect = pathname => createRedirect(newContext, pathname);

    newContext.__divergedChainIndex = 0;

    if (previousChain.length) {
      for (let i = 0; i < Math.min(previousChain.length, newChain.length); i = ++newContext.__divergedChainIndex) {
        if (previousChain[i].route !== newChain[i].route || previousChain[i].path !== newChain[i].path || (previousChain[i].element && previousChain[i].element.localName) !== (newChain[i].element && newChain[i].element.localName)) {
          break;
        }
      }

      for (let i = previousChain.length - 1; i >= newContext.__divergedChainIndex; i--) {
        const location = createLocation(newContext);
        callbacks = callbacks.then(amend('onBeforeLeave', [location, {
          prevent
        }, this], previousChain[i].element)).then(result => {
          if (!(result || {}).redirect) {
            return result;
          }
        });
      }
    }

    for (let i = newContext.__divergedChainIndex; i < newChain.length; i++) {
      const location = createLocation(newContext, newChain[i].route);
      callbacks = callbacks.then(amend('onBeforeEnter', [location, {
        prevent,
        redirect
      }, this], newChain[i].element));
    }

    return callbacks.then(amendmentResult => {
      if (amendmentResult) {
        if (amendmentResult.cancel) {
          return this.__previousContext;
        }

        if (amendmentResult.redirect) {
          return this.__redirect(amendmentResult.redirect, newContext.__redirectCount);
        }
      }

      return newContext;
    });
  }

  __redirect(redirectData, counter) {
    if (counter > MAX_REDIRECT_COUNT) {
      throw new Error(log(`Too many redirects when rendering ${redirectData.from}`));
    }

    return this.resolve({
      pathname: this.urlForPath(redirectData.pathname, redirectData.params),
      redirectFrom: redirectData.from,
      __redirectCount: (counter || 0) + 1
    });
  }

  __ensureOutlet(outlet = this.__outlet) {
    if (!(outlet instanceof Node)) {
      throw new TypeError(log(`Expected router outlet to be a valid DOM Node (but got ${outlet})`));
    }
  }

  __updateBrowserHistory(pathname, replace) {
    if (window.location.pathname !== pathname) {
      const changeState = replace ? 'replaceState' : 'pushState';
      window.history[changeState](null, document.title, pathname);
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: 'vaadin-router-ignore'
      }));
    }
  }

  __addAppearingContent(context, previousContext) {
    this.__ensureOutlet(); // If the previous 'entering' animation has not completed yet,
    // stop it and remove that content from the DOM before adding new one.


    this.__removeAppearingContent(); // Find the deepest common parent between the last and the new component
    // chains. Update references for the unchanged elements in the new chain


    let deepestCommonParent = this.__outlet;

    for (let i = 0; i < context.__divergedChainIndex; i++) {
      const unchangedElement = previousContext && previousContext.chain[i].element;

      if (unchangedElement) {
        if (unchangedElement.parentNode === deepestCommonParent) {
          context.chain[i].element = unchangedElement;
          deepestCommonParent = unchangedElement;
        } else {
          break;
        }
      }
    } // Keep two lists of DOM elements:
    //  - those that should be removed once the transition animation is over
    //  - and those that should remain


    this.__disappearingContent = Array.from(deepestCommonParent.children);
    this.__appearingContent = []; // Add new elements (starting after the deepest common parent) to the DOM.
    // That way only the components that are actually different between the two
    // locations are added to the DOM (and those that are common remain in the
    // DOM without first removing and then adding them again).

    let parentElement = deepestCommonParent;

    for (let i = context.__divergedChainIndex; i < context.chain.length; i++) {
      const elementToAdd = context.chain[i].element;

      if (elementToAdd) {
        parentElement.appendChild(elementToAdd);

        if (parentElement === deepestCommonParent) {
          this.__appearingContent.push(elementToAdd);
        }

        parentElement = elementToAdd;
      }
    }
  }

  __removeDisappearingContent() {
    if (this.__disappearingContent) {
      removeDomNodes(this.__disappearingContent);
    }

    this.__disappearingContent = null;
    this.__appearingContent = null;
  }

  __removeAppearingContent() {
    if (this.__disappearingContent && this.__appearingContent) {
      removeDomNodes(this.__appearingContent);
      this.__disappearingContent = null;
      this.__appearingContent = null;
    }
  }

  __runOnAfterLeaveCallbacks(currentContext, targetContext) {
    if (!targetContext) {
      return;
    } // REVERSE iteration: from Z to A


    for (let i = targetContext.chain.length - 1; i >= currentContext.__divergedChainIndex; i--) {
      const currentComponent = targetContext.chain[i].element;

      if (!currentComponent) {
        continue;
      }

      try {
        const location = createLocation(currentContext);
        runCallbackIfPossible(currentComponent.onAfterLeave, [location, {}, targetContext.resolver], currentComponent);
      } finally {
        removeDomNodes(currentComponent.children);
      }
    }
  }

  __runOnAfterEnterCallbacks(currentContext) {
    // forward iteration: from A to Z
    for (let i = currentContext.__divergedChainIndex; i < currentContext.chain.length; i++) {
      const currentComponent = currentContext.chain[i].element || {};
      const location = createLocation(currentContext, currentContext.chain[i].route);
      runCallbackIfPossible(currentComponent.onAfterEnter, [location, {}, currentContext.resolver], currentComponent);
    }
  }

  __animateIfNeeded(context) {
    const from = (this.__disappearingContent || [])[0];
    const to = (this.__appearingContent || [])[0];
    const promises = [];
    const chain = context.chain;
    let config;

    for (let i = chain.length; i > 0; i--) {
      if (chain[i - 1].route.animate) {
        config = chain[i - 1].route.animate;
        break;
      }
    }

    if (from && to && config) {
      const leave = isObject(config) && config.leave || 'leaving';
      const enter = isObject(config) && config.enter || 'entering';
      promises.push(animate(from, leave));
      promises.push(animate(to, enter));
    }

    return Promise.all(promises).then(() => context);
  }
  /**
   * Subscribes this instance to navigation events on the `window`.
   *
   * NOTE: beware of resource leaks. For as long as a router instance is
   * subscribed to navigation events, it won't be garbage collected.
   */


  subscribe() {
    window.addEventListener('vaadin-router-go', this.__navigationEventHandler);
  }
  /**
   * Removes the subscription to navigation events created in the `subscribe()`
   * method.
   */


  unsubscribe() {
    window.removeEventListener('vaadin-router-go', this.__navigationEventHandler);
  }

  __onNavigationEvent(event) {
    const pathname = event ? event.detail.pathname : window.location.pathname;

    if (isString(this.__normalizePathname(pathname))) {
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      this.render(pathname, true);
    }
  }
  /**
   * Configures what triggers Vaadin.Router navigation events:
   *  - `POPSTATE`: popstate events on the current `window`
   *  - `CLICK`: click events on `<a>` links leading to the current page
   *
   * This method is invoked with the pre-configured values when creating a new Router instance.
   * By default, both `POPSTATE` and `CLICK` are enabled. This setup is expected to cover most of the use cases.
   *
   * See the `router-config.js` for the default navigation triggers config. Based on it, you can
   * create the own one and only import the triggers you need, instead of pulling in all the code,
   * e.g. if you want to handle `click` differently.
   *
   * See also **Navigation Triggers** section in [Live Examples](#/classes/Vaadin.Router/demos/demo/index.html).
   *
   * @param {...NavigationTrigger} triggers
   */


  static setTriggers(...triggers) {
    setNavigationTriggers(triggers);
  }
  /**
   * Generates a URL for the route with the given name, optionally performing
   * substitution of parameters.
   *
   * The route is searched in all the Vaadin.Router instances subscribed to
   * navigation events.
   *
   * **Note:** For child route names, only array children are considered.
   * It is not possible to generate URLs using a name for routes set with
   * a children function.
   *
   * @function urlForName
   * @param {!string} name the route name or the route’s `component` name.
   * @param {?Object} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */


  urlForName(name, params) {
    if (!this.__urlForName) {
      this.__urlForName = generateUrls(this);
    }

    return getPathnameForRouter(this.__urlForName(name, params), this);
  }
  /**
   * Generates a URL for the given route path, optionally performing
   * substitution of parameters.
   *
   * @param {!string} path string route path declared in [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   * @param {?Object} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */


  urlForPath(path, params) {
    return getPathnameForRouter(Router.pathToRegexp.compile(path)(params), this);
  }
  /**
   * Triggers navigation to a new path. Returns a boolean without waiting until
   * the navigation is complete. Returns `true` if at least one `Vaadin.Router`
   * has handled the navigation (was subscribed and had `baseUrl` matching
   * the `pathname` argument), otherwise returns `false`.
   *
   * @param {!string} pathname a new in-app path
   * @return {boolean}
   */


  static go(pathname) {
    return fireRouterEvent('go', {
      pathname
    });
  }

}

const DEV_MODE_CODE_REGEXP = /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;

function isMinified() {
  function test() {
    /** vaadin-dev-mode:start
    return false;
    vaadin-dev-mode:end **/
    return true;
  }

  return uncommentAndRun(test);
}

function isDevelopmentMode() {
  try {
    return isForcedDevelopmentMode() || isLocalhost() && !isMinified() && !isFlowProductionMode();
  } catch (e) {
    // Some error in this code, assume production so no further actions will be taken
    return false;
  }
}

function isForcedDevelopmentMode() {
  return localStorage.getItem("vaadin.developmentmode.force");
}

function isLocalhost() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}

function isFlowProductionMode() {
  if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
    const productionModeApps = Object.keys(window.Vaadin.Flow.clients).map(key => window.Vaadin.Flow.clients[key]).filter(client => client.productionMode);

    if (productionModeApps.length > 0) {
      return true;
    }
  }

  return false;
}

function uncommentAndRun(callback, args) {
  if (typeof callback !== 'function') {
    return;
  }

  const match = DEV_MODE_CODE_REGEXP.exec(callback.toString());

  if (match) {
    try {
      // requires CSP: script-src 'unsafe-eval'
      callback = new Function(match[1]);
    } catch (e) {
      // eat the exception
      console.log('vaadin-development-mode-detector: uncommentAndRun() failed', e);
    }
  }

  return callback(args);
} // A guard against polymer-modulizer removing the window.Vaadin
// initialization above.


window['Vaadin'] = window['Vaadin'] || {};
/**
 * Inspects the source code of the given `callback` function for
 * specially-marked _commented_ code. If such commented code is found in the
 * callback source, uncomments and runs that code instead of the callback
 * itself. Otherwise runs the callback as is.
 *
 * The optional arguments are passed into the callback / uncommented code,
 * the result is returned.
 *
 * See the `isMinified()` function source code in this file for an example.
 *
 */

const runIfDevelopmentMode = function (callback, args) {
  if (window.Vaadin.developmentMode) {
    return uncommentAndRun(callback, args);
  }
};

if (window.Vaadin.developmentMode === undefined) {
  window.Vaadin.developmentMode = isDevelopmentMode();
}
/* This file is autogenerated from src/vaadin-usage-statistics.tpl.html */


function maybeGatherAndSendStats() {
  /** vaadin-dev-mode:start
  (function () {
  'use strict';
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
  } : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
  };
  var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
   return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
  }();
  var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
  };
  var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);
     this.now = new Date().getTime();
    this.logger = logger;
  }
   createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }
           jQuery.toString = function () {
            return _jQuery.toString();
          };
           return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { "version": version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];
       types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });
       var previousStats = JSON.stringify(storedStats);
       this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);
       var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { "firstUsed": now };
          }
          // Discards any previously logged version numebr
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });
       var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
  }();
  var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);
     this.key = key;
  }
   createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });
       return empty;
    }
  }]);
  return StatisticsStorage;
  }();
  var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);
     this.url = url;
    this.logger = logger;
  }
   createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;
       if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);
       var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
  }();
  var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);
     this.id = id;
  }
   createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
  }();
  var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);
     this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;
     this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }
   createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;
       if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return Math.random() <= 0.05;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
       if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }
       if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }
       this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);
       // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.0.1';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
  }();
  try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatistics = window.Vaadin.usageStatistics || new UsageStatistics();
  window.Vaadin.usageStatistics.maybeGatherAndSend();
  } catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
  }
  }());
   vaadin-dev-mode:end **/
}

const usageStatistics = function () {
  if (typeof runIfDevelopmentMode === 'function') {
    return runIfDevelopmentMode(maybeGatherAndSendStats);
  }
};

window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];
window.Vaadin.registrations.push({
  is: '@vaadin/router',
  version: '1.2.0'
});
usageStatistics();
Router.NavigationTrigger = {
  POPSTATE,
  CLICK
};

// CONCATENATED MODULE: ./documentation/src/router.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRouter", function() { return AppRouter; });
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const githubUrl = 'http://opensource.adobe.com/spectrum-web-components/';
const baseUrl = document.location.hostname === 'opensource.adobe.com' ? githubUrl : undefined;

class router_DocumentationRouter extends Router {
  constructor(outlet, options) {
    super(outlet, options);
  }

  go(pathname) {
    return Router.go(pathname);
  }

  changeParams(params) {
    if (!this.location || !this.location.route) return false;
    const newUrl = this.urlForPath(this.location.route.path, params);
    return this.go(newUrl);
  }

}

const AppRouter = new router_DocumentationRouter(document.body, {
  baseUrl: baseUrl
});
AppRouter.setRoutes([{
  path: '/',
  component: 'docs-home'
}, {
  path: '/components/:component/:tab?',
  component: 'docs-component'
}, {
  path: '/guides/:guide',
  component: 'docs-guide'
}]);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* **********************************************
     Begin prism-core.js
********************************************** */
var _self = typeof window !== 'undefined' ? window // if in browser
: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
: {} // if in node js
;
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */


var Prism = function () {
  // Private helper vars
  var lang = /\blang(?:uage)?-([\w-]+)\b/i;
  var uniqueId = 0;

  var _ = _self.Prism = {
    manual: _self.Prism && _self.Prism.manual,
    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
    util: {
      encode: function (tokens) {
        if (tokens instanceof Token) {
          return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
        } else if (_.util.type(tokens) === 'Array') {
          return tokens.map(_.util.encode);
        } else {
          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        }
      },
      type: function (o) {
        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
      },
      objId: function (obj) {
        if (!obj['__id']) {
          Object.defineProperty(obj, '__id', {
            value: ++uniqueId
          });
        }

        return obj['__id'];
      },
      // Deep clone a language definition (e.g. to extend it)
      clone: function (o, visited) {
        var type = _.util.type(o);

        visited = visited || {};

        switch (type) {
          case 'Object':
            if (visited[_.util.objId(o)]) {
              return visited[_.util.objId(o)];
            }

            var clone = {};
            visited[_.util.objId(o)] = clone;

            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = _.util.clone(o[key], visited);
              }
            }

            return clone;

          case 'Array':
            if (visited[_.util.objId(o)]) {
              return visited[_.util.objId(o)];
            }

            var clone = [];
            visited[_.util.objId(o)] = clone;
            o.forEach(function (v, i) {
              clone[i] = _.util.clone(v, visited);
            });
            return clone;
        }

        return o;
      }
    },
    languages: {
      extend: function (id, redef) {
        var lang = _.util.clone(_.languages[id]);

        for (var key in redef) {
          lang[key] = redef[key];
        }

        return lang;
      },

      /**
       * Insert a token before another token in a language literal
       * As this needs to recreate the object (we cannot actually insert before keys in object literals),
       * we cannot just provide an object, we need anobject and a key.
       * @param inside The key (or language id) of the parent
       * @param before The key to insert before. If not provided, the function appends instead.
       * @param insert Object with the key/value pairs to insert
       * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
       */
      insertBefore: function (inside, before, insert, root) {
        root = root || _.languages;
        var grammar = root[inside];

        if (arguments.length == 2) {
          insert = arguments[1];

          for (var newToken in insert) {
            if (insert.hasOwnProperty(newToken)) {
              grammar[newToken] = insert[newToken];
            }
          }

          return grammar;
        }

        var ret = {};

        for (var token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }

            ret[token] = grammar[token];
          }
        } // Update references in other language definitions


        _.languages.DFS(_.languages, function (key, value) {
          if (value === root[inside] && key != inside) {
            this[key] = ret;
          }
        });

        return root[inside] = ret;
      },
      // Traverse a language definition with Depth First Search
      DFS: function (o, callback, type, visited) {
        visited = visited || {};

        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);

            if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
              visited[_.util.objId(o[i])] = true;

              _.languages.DFS(o[i], callback, null, visited);
            } else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
              visited[_.util.objId(o[i])] = true;

              _.languages.DFS(o[i], callback, i, visited);
            }
          }
        }
      }
    },
    plugins: {},
    highlightAll: function (async, callback) {
      _.highlightAllUnder(document, async, callback);
    },
    highlightAllUnder: function (container, async, callback) {
      var env = {
        callback: callback,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };

      _.hooks.run("before-highlightall", env);

      var elements = env.elements || container.querySelectorAll(env.selector);

      for (var i = 0, element; element = elements[i++];) {
        _.highlightElement(element, async === true, env.callback);
      }
    },
    highlightElement: function (element, async, callback) {
      // Find language
      var language,
          grammar,
          parent = element;

      while (parent && !lang.test(parent.className)) {
        parent = parent.parentNode;
      }

      if (parent) {
        language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
        grammar = _.languages[language];
      } // Set language on the element, if not present


      element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

      if (element.parentNode) {
        // Set language on the parent, for styling
        parent = element.parentNode;

        if (/pre/i.test(parent.nodeName)) {
          parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
        }
      }

      var code = element.textContent;
      var env = {
        element: element,
        language: language,
        grammar: grammar,
        code: code
      };

      _.hooks.run('before-sanity-check', env);

      if (!env.code || !env.grammar) {
        if (env.code) {
          _.hooks.run('before-highlight', env);

          env.element.textContent = env.code;

          _.hooks.run('after-highlight', env);
        }

        _.hooks.run('complete', env);

        return;
      }

      _.hooks.run('before-highlight', env);

      if (async && _self.Worker) {
        var worker = new Worker(_.filename);

        worker.onmessage = function (evt) {
          env.highlightedCode = evt.data;

          _.hooks.run('before-insert', env);

          env.element.innerHTML = env.highlightedCode;
          callback && callback.call(env.element);

          _.hooks.run('after-highlight', env);

          _.hooks.run('complete', env);
        };

        worker.postMessage(JSON.stringify({
          language: env.language,
          code: env.code,
          immediateClose: true
        }));
      } else {
        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;
        callback && callback.call(element);

        _.hooks.run('after-highlight', env);

        _.hooks.run('complete', env);
      }
    },
    highlight: function (text, grammar, language) {
      var env = {
        code: text,
        grammar: grammar,
        language: language
      };

      _.hooks.run('before-tokenize', env);

      env.tokens = _.tokenize(env.code, env.grammar);

      _.hooks.run('after-tokenize', env);

      return Token.stringify(_.util.encode(env.tokens), env.language);
    },
    matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
      var Token = _.Token;

      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }

        if (token == target) {
          return;
        }

        var patterns = grammar[token];
        patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
          var pattern = patterns[j],
              inside = pattern.inside,
              lookbehind = !!pattern.lookbehind,
              greedy = !!pattern.greedy,
              lookbehindLength = 0,
              alias = pattern.alias;

          if (greedy && !pattern.pattern.global) {
            // Without the global flag, lastIndex won't work
            var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
            pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
          }

          pattern = pattern.pattern || pattern; // Don’t cache length as it changes during the loop

          for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
            var str = strarr[i];

            if (strarr.length > text.length) {
              // Something went terribly wrong, ABORT, ABORT!
              return;
            }

            if (str instanceof Token) {
              continue;
            }

            if (greedy && i != strarr.length - 1) {
              pattern.lastIndex = pos;
              var match = pattern.exec(text);

              if (!match) {
                break;
              }

              var from = match.index + (lookbehind ? match[1].length : 0),
                  to = match.index + match[0].length,
                  k = i,
                  p = pos;

              for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                p += strarr[k].length; // Move the index i to the element in strarr that is closest to from

                if (from >= p) {
                  ++i;
                  pos = p;
                }
              } // If strarr[i] is a Token, then the match starts inside another Token, which is invalid


              if (strarr[i] instanceof Token) {
                continue;
              } // Number of tokens to delete and replace with the new match


              delNum = k - i;
              str = text.slice(pos, p);
              match.index -= pos;
            } else {
              pattern.lastIndex = 0;
              var match = pattern.exec(str),
                  delNum = 1;
            }

            if (!match) {
              if (oneshot) {
                break;
              }

              continue;
            }

            if (lookbehind) {
              lookbehindLength = match[1] ? match[1].length : 0;
            }

            var from = match.index + lookbehindLength,
                match = match[0].slice(lookbehindLength),
                to = from + match.length,
                before = str.slice(0, from),
                after = str.slice(to);
            var args = [i, delNum];

            if (before) {
              ++i;
              pos += before.length;
              args.push(before);
            }

            var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
            args.push(wrapped);

            if (after) {
              args.push(after);
            }

            Array.prototype.splice.apply(strarr, args);
            if (delNum != 1) _.matchGrammar(text, strarr, grammar, i, pos, true, token);
            if (oneshot) break;
          }
        }
      }
    },
    tokenize: function (text, grammar, language) {
      var strarr = [text];
      var rest = grammar.rest;

      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }

        delete grammar.rest;
      }

      _.matchGrammar(text, strarr, grammar, 0, 0, false);

      return strarr;
    },
    hooks: {
      all: {},
      add: function (name, callback) {
        var hooks = _.hooks.all;
        hooks[name] = hooks[name] || [];
        hooks[name].push(callback);
      },
      run: function (name, env) {
        var callbacks = _.hooks.all[name];

        if (!callbacks || !callbacks.length) {
          return;
        }

        for (var i = 0, callback; callback = callbacks[i++];) {
          callback(env);
        }
      }
    }
  };

  var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
    this.type = type;
    this.content = content;
    this.alias = alias; // Copy of the full string this token was created from

    this.length = (matchedStr || "").length | 0;
    this.greedy = !!greedy;
  };

  Token.stringify = function (o, language, parent) {
    if (typeof o == 'string') {
      return o;
    }

    if (_.util.type(o) === 'Array') {
      return o.map(function (element) {
        return Token.stringify(element, language, o);
      }).join('');
    }

    var env = {
      type: o.type,
      content: Token.stringify(o.content, language, parent),
      tag: 'span',
      classes: ['token', o.type],
      attributes: {},
      language: language,
      parent: parent
    };

    if (o.alias) {
      var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
      Array.prototype.push.apply(env.classes, aliases);
    }

    _.hooks.run('wrap', env);

    var attributes = Object.keys(env.attributes).map(function (name) {
      return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
    }).join(' ');
    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
  };

  if (!_self.document) {
    if (!_self.addEventListener) {
      // in Node.js
      return _self.Prism;
    }

    if (!_.disableWorkerMessageHandler) {
      // In worker
      _self.addEventListener('message', function (evt) {
        var message = JSON.parse(evt.data),
            lang = message.language,
            code = message.code,
            immediateClose = message.immediateClose;

        _self.postMessage(_.highlight(code, _.languages[lang], lang));

        if (immediateClose) {
          _self.close();
        }
      }, false);
    }

    return _self.Prism;
  } //Get current script and highlight


  var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

  if (script) {
    _.filename = script.src;

    if (!_.manual && !script.hasAttribute('data-manual')) {
      if (document.readyState !== "loading") {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(_.highlightAll);
        } else {
          window.setTimeout(_.highlightAll, 16);
        }
      } else {
        document.addEventListener('DOMContentLoaded', _.highlightAll);
      }
    }
  }

  return _self.Prism;
}();

if ( true && module.exports) {
  module.exports = Prism;
} // hack for components to work correctly in node.js


if (typeof global !== 'undefined') {
  global.Prism = Prism;
}
/* **********************************************
     Begin prism-markup.js
********************************************** */


Prism.languages.markup = {
  'comment': /<!--[\s\S]*?-->/,
  'prolog': /<\?[\s\S]+?\?>/,
  'doctype': /<!DOCTYPE[\s\S]+?>/i,
  'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'attr-value': {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          'punctuation': [/^=/, {
            pattern: /(^|[^\\])["']/,
            lookbehind: true
          }]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }
    }
  },
  'entity': /&#?[\da-z]{1,8};/i
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity']; // Plugin to make entity title show the real entity, idea by Roman Komarov

Prism.hooks.add('wrap', function (env) {
  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
  'comment': /\/\*[\s\S]*?\*\//,
  'atrule': {
    pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
    inside: {
      'rule': /@[\w-]+/ // See rest below

    }
  },
  'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
  'string': {
    pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  'important': /\B!important\b/i,
  'function': /[-a-z0-9]+(?=\()/i,
  'punctuation': /[(){};:]/
};
Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'style': {
      pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
      lookbehind: true,
      inside: Prism.languages.css,
      alias: 'language-css',
      greedy: true
    }
  });
  Prism.languages.insertBefore('inside', 'attr-value', {
    'style-attr': {
      pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
      inside: {
        'attr-name': {
          pattern: /^\s*style/i,
          inside: Prism.languages.markup.tag.inside
        },
        'punctuation': /^\s*=\s*['"]|['"]\s*$/,
        'attr-value': {
          pattern: /.+/i,
          inside: Prism.languages.css
        }
      },
      alias: 'language-css'
    }
  }, Prism.languages.markup.tag);
}
/* **********************************************
     Begin prism-clike.js
********************************************** */


Prism.languages.clike = {
  'comment': [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  }],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'class-name': {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: true,
    inside: {
      punctuation: /[.\\]/
    }
  },
  'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  'boolean': /\b(?:true|false)\b/,
  'function': /[a-z0-9_]+(?=\()/i,
  'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  'punctuation': /[{}[\];(),.:]/
};
/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
  'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  'number': /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
  'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});
Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: true,
    greedy: true
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
    alias: 'function'
  },
  'constant': /\b[A-Z][A-Z\d_]*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
  'template-string': {
    pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
    greedy: true,
    inside: {
      'interpolation': {
        pattern: /\${[^}]+}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\${|}$/,
            alias: 'punctuation'
          },
          rest: null // See below

        }
      },
      'string': /[\s\S]+/
    }
  }
});
Prism.languages.javascript['template-string'].inside['interpolation'].inside.rest = Prism.languages.javascript;

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'script': {
      pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript,
      alias: 'language-javascript',
      greedy: true
    }
  });
}

Prism.languages.js = Prism.languages.javascript;
/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
  if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
    return;
  }

  self.Prism.fileHighlight = function () {
    var Extensions = {
      'js': 'javascript',
      'py': 'python',
      'rb': 'ruby',
      'ps1': 'powershell',
      'psm1': 'powershell',
      'sh': 'bash',
      'bat': 'batch',
      'h': 'c',
      'tex': 'latex'
    };
    Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
      var src = pre.getAttribute('data-src');
      var language,
          parent = pre;
      var lang = /\blang(?:uage)?-([\w-]+)\b/i;

      while (parent && !lang.test(parent.className)) {
        parent = parent.parentNode;
      }

      if (parent) {
        language = (pre.className.match(lang) || [, ''])[1];
      }

      if (!language) {
        var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
        language = Extensions[extension] || extension;
      }

      var code = document.createElement('code');
      code.className = 'language-' + language;
      pre.textContent = '';
      code.textContent = 'Loading…';
      pre.appendChild(code);
      var xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status < 400 && xhr.responseText) {
            code.textContent = xhr.responseText;
            Prism.highlightElement(code);
          } else if (xhr.status >= 400) {
            code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
          } else {
            code.textContent = '✖ Error: File does not exist or is empty';
          }
        }
      };

      xhr.send(null);
    });

    if (Prism.plugins.toolbar) {
      Prism.plugins.toolbar.registerButton('download-file', function (env) {
        var pre = env.element.parentNode;

        if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
          return;
        }

        var src = pre.getAttribute('data-src');
        var a = document.createElement('a');
        a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
        a.setAttribute('download', '');
        a.href = src;
        return a;
      });
    }
  };

  document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./banner.md": 15,
	"./button.md": 16,
	"./card.md": 17,
	"./checkbox.md": 18,
	"./dropzone.md": 19,
	"./icons.md": 20,
	"./illustrated-message.md": 21,
	"./link.md": 22,
	"./overlay-root.md": 23,
	"./overlay-trigger.md": 24,
	"./popover.md": 25,
	"./radio.md": 26,
	"./sidenav.md": 27,
	"./switch.md": 28,
	"./tab.md": 29,
	"./theme.md": 30
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 14;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-banner</strong> is an additional label an existing component may have. Banners cannot be interacted with. Banners in Spectrum have three variations for different uses as well as the ability to place it overlaid in the top-right corner of a container.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-banner&gt;\n    &lt;div slot=&quot;header&quot;&gt;Header Text&lt;/div&gt;\n    &lt;div slot=&quot;content&quot;&gt;Content of the banner&lt;/div&gt;\n&lt;/sp-banner&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<h3 id=\"info-banners\" class=\"spectrum-Heading3\">Info Banners</h3>\n<p class=\"spectrum-Body3\">Banners intended for providing information. This is the default banner variant.</p>\n<code-example class=\"language-html\">&lt;sp-banner type=&quot;info&quot;&gt;\n    &lt;div slot=&quot;header&quot;&gt;This is an info banner&lt;/div&gt;\n    &lt;div slot=&quot;content&quot;&gt;Description here&lt;/div&gt;\n&lt;/sp-banner&gt;</code-example>\n<h3 id=\"warning-banners\" class=\"spectrum-Heading3\">Warning Banners</h3>\n<p class=\"spectrum-Body3\">Banners intended to provided a warning with a brief description. Less severe than an error banner.</p>\n<code-example class=\"language-html\">&lt;sp-banner type=&quot;warning&quot;&gt;\n    &lt;div slot=&quot;header&quot;&gt;This is a warning banner&lt;/div&gt;\n    &lt;div slot=&quot;content&quot;&gt;Be careful!&lt;/div&gt;\n&lt;/sp-banner&gt;</code-example>\n<h3 id=\"error-banners\" class=\"spectrum-Heading3\">Error Banners</h3>\n<p class=\"spectrum-Body3\">Banners intended to indicate an error as occurred, with a brief description of the issue. More severe than a warning banner.</p>\n<code-example class=\"language-html\">&lt;sp-banner type=&quot;error&quot;&gt;\n    &lt;div slot=&quot;header&quot;&gt;This is an error banner&lt;/div&gt;\n    &lt;div slot=&quot;content&quot;&gt;Something bad happened&lt;/div&gt;\n&lt;/sp-banner&gt;</code-example>\n<h2 id=\"corner-placement\" class=\"spectrum-Heading2--quiet\">Corner Placement</h2>\n<p class=\"spectrum-Body3\">In addition to the variant, banners can be placed in the top-right corner of its container by giving them a corner prop. Note that the position of the containing element needs to be either relative or absolute</p>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;width: 300px; height: 100px; background-color: #ba598b; position: relative;&quot;\n&gt;\n    &lt;sp-banner type=&quot;warning&quot; corner&gt;\n        &lt;div slot=&quot;header&quot;&gt;This banner is in a corner&lt;/div&gt;\n        &lt;div slot=&quot;content&quot;&gt;Neat!&lt;/div&gt;\n    &lt;/sp-banner&gt;\n&lt;/div&gt;</code-example>\n<h2 id=\"accessibility\" class=\"spectrum-Heading2--quiet\">Accessibility</h2>\n<p class=\"spectrum-Body3\">A Banner does not have a default semantic role communicated to assistive technology, but it does accept id, role and other aria- props that can be added to to improve accessibility depending on context.</p>\n";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-button</strong> represents an action a user can take. sp-buttons can be clicked\nor tapped to perform an action or to navigate to another page. sp-buttons in\nSpectrum have several variations for different uses and multiple levels of\nloudness for various attention-getting needs.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-button&gt;Hello world&lt;/sp-button&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<p class=\"spectrum-Body3\">There are many button variants to choose from in Spectrum. The <code>variant</code>\nattribute controls the main variant of the button, and a few other boolean\nattributes can be combined to apply sub-variants, e.g. <code>quiet</code>.</p>\n<h3 id=\"normal\" class=\"spectrum-Heading3\">Normal</h3>\n<code-example class=\"language-html\">&lt;sp-button variant=&quot;cta&quot;&gt;CTA&lt;/sp-button&gt;\n&lt;sp-button variant=&quot;primary&quot;&gt;Primary&lt;/sp-button&gt;\n&lt;sp-button variant=&quot;secondary&quot;&gt;Secondary&lt;/sp-button&gt;\n&lt;sp-button variant=&quot;negative&quot;&gt;Negative&lt;/sp-button&gt;</code-example>\n<h3 id=\"quiet\" class=\"spectrum-Heading3\">Quiet</h3>\n<code-example class=\"language-html\">&lt;sp-button quiet variant=&quot;primary&quot;&gt;Quiet Primary&lt;/sp-button&gt;\n&lt;sp-button quiet variant=&quot;secondary&quot;&gt;Quiet Secondary&lt;/sp-button&gt;\n&lt;sp-button quiet variant=&quot;negative&quot;&gt;Quiet Negative&lt;/sp-button&gt;</code-example>\n<h2 id=\"content\" class=\"spectrum-Heading2--quiet\">Content</h2>\n<p class=\"spectrum-Body3\"><strong>sp-buttons</strong> can have a label, and icon, or both. An icon is provided by\nplacing an icon component to the <code>icon</code> slot. The icon may be an <code>sp-icon</code> or an\nSVG.</p>\n<code-example class=\"language-html\">&lt;sp-icons-medium&gt;&lt;/sp-icons-medium&gt;\n&lt;sp-button variant=&quot;primary&quot;&gt;Label only&lt;/sp-button&gt;\n&lt;sp-button variant=&quot;primary&quot;&gt;\n    &lt;sp-icon slot=&quot;icon&quot; size=&quot;s&quot; name=&quot;ui:HelpMedium&quot;&gt;&lt;/sp-icon&gt;\n    Icon + Label\n&lt;/sp-button&gt;\n&lt;sp-button variant=&quot;primary&quot;&gt;\n    &lt;sp-icon slot=&quot;icon&quot; size=&quot;s&quot; name=&quot;ui:HelpMedium&quot;&gt;&lt;/sp-icon&gt;\n&lt;/sp-button&gt;\n&lt;sp-button variant=&quot;primary&quot;&gt;\n    &lt;svg\n        slot=&quot;icon&quot;\n        viewBox=&quot;0 0 36 36&quot;\n        focusable=&quot;false&quot;\n        aria-hidden=&quot;true&quot;\n        role=&quot;img&quot;\n    &gt;\n        &lt;path\n            d=&quot;M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z&quot;\n        &gt;&lt;/path&gt;\n    &lt;/svg&gt;\n    SVG Icon + Label\n&lt;/sp-button&gt;</code-example>\n<h2 id=\"states\" class=\"spectrum-Heading2--quiet\">States</h2>\n<p class=\"spectrum-Body3\">In addition to the variant, <strong>sp-buttons</strong> have a disabled state visual state\nwhich can be applied by adding the attribute <code>disabled</code>. All spectrum-button\nvariants support the In addition to affectng the visual state, the <code>disabled</code>\nattribute prevents focus and disallows <code>click</code> events.</p>\n<code-example class=\"language-html\">&lt;sp-button variant=&quot;primary&quot;&gt;Normal&lt;/sp-button&gt;\n&lt;sp-button variant=&quot;primary&quot; disabled&gt;Disabled&lt;/sp-button&gt;</code-example>\n<h2 id=\"handling-events\" class=\"spectrum-Heading2--quiet\">Handling Events</h2>\n<p class=\"spectrum-Body3\">Events handlers for clicks and other user actions can be registered on a\n<code>spectrum-button</code> just as on a normal HTML <code>button</code> element.</p>\n<code-example class=\"language-html\">&lt;sp-button onclick=&quot;alert(&#39;spectrum-button clicked!&#39;)&quot;&gt;Click me!&lt;/sp-button&gt;</code-example>\n<h3 id=\"autofocus\" class=\"spectrum-Heading3\">Autofocus</h3>\n<p class=\"spectrum-Body3\">The <code>autofocus</code> attribute sets focus to the <strong>sp-button</strong> when the component\nmounts. This is useful for setting focus to a specific sp-button when a\npopover or dialog opens.</p>\n<code-example class=\"language-html\">&lt;sp-button autofocus&gt;Confirm&lt;/sp-button&gt;</code-example>\n";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-card</strong> represents a rectangular card that contains\na variety of text and image layouts. Cards are typically used\nto encapsulate units of a data set, such as a gallery of\nimage/caption pairs.\nSpectrum has several card variations for different uses.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-card title=&quot;Card Title&quot; subtitle=&quot;JPG&quot;&gt;\n    &lt;img slot=&quot;cover-photo&quot; src=&quot;https://picsum.photos/200/300&quot; /&gt;\n    &lt;div slot=&quot;footer&quot;&gt;Footer&lt;/div&gt;\n&lt;/sp-card&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<p class=\"spectrum-Body3\">There are multiple card variants to choose from in Spectrum. The <code>variant</code>\nattribute controls the main variant of the card.</p>\n<h3 id=\"normal\" class=\"spectrum-Heading3\">Normal</h3>\n<p class=\"spectrum-Body3\">Normal cards can contain a title, a subtitle, a cover photo, and a footer.</p>\n<code-example class=\"language-html\">&lt;sp-card title=&quot;Card Title&quot; subtitle=&quot;JPG&quot;&gt;\n    &lt;img slot=&quot;cover-photo&quot; src=&quot;https://picsum.photos/200/300&quot; /&gt;\n    &lt;div slot=&quot;footer&quot;&gt;Footer&lt;/div&gt;\n&lt;/sp-card&gt;</code-example>\n<h3 id=\"quiet\" class=\"spectrum-Heading3\">Quiet</h3>\n<p class=\"spectrum-Body3\">Quiet cards can contain a title, a subtitle, a cover photo, a description, and a footer.</p>\n<code-example class=\"language-html\">&lt;div style=&quot;width: 208px; height: 264px&quot;&gt;\n    &lt;sp-card variant=&quot;quiet&quot; title=&quot;Card Title&quot; subtitle=&quot;JPG&quot;&gt;\n        &lt;img slot=&quot;preview&quot; src=&quot;https://picsum.photos/200/300&quot; /&gt;\n        &lt;div slot=&quot;description&quot;&gt;10/15/18&lt;/div&gt;\n        &lt;div slot=&quot;footer&quot;&gt;Footer&lt;/div&gt;\n    &lt;/sp-card&gt;\n&lt;/div&gt;</code-example>\n<h3 id=\"gallery\" class=\"spectrum-Heading3\">Gallery</h3>\n<p class=\"spectrum-Body3\">Gallery cards can contain a title, a subtitle, an image preview, a description, and a footer.</p>\n<code-example class=\"language-html\">&lt;div style=&quot;width: 532px; height: 224px&quot;&gt;\n    &lt;sp-card variant=&quot;gallery&quot; title=&quot;Card Title&quot; subtitle=&quot;JPG&quot;&gt;\n        &lt;img\n            slot=&quot;preview&quot;\n            src=&quot;https://picsum.photos/532/192&quot;\n            style=&quot;object-fit: cover&quot;\n        /&gt;\n        &lt;div slot=&quot;description&quot;&gt;10/15/18&lt;/div&gt;\n        &lt;div slot=&quot;footer&quot;&gt;Footer&lt;/div&gt;\n    &lt;/sp-card&gt;\n&lt;/div&gt;</code-example>\n";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\"><strong>sp-checkbox</strong> allow users to select multiple items from a list of independent\noptions, or to mark an individual option as selected.</p>\n<p class=\"spectrum-Body3\">Should I use a checkbox or a switch? Use a switch when activating something\ninstead of selecting.</p>\n<h3 id=\"example\" class=\"spectrum-Heading3\">Example</h3>\n<p class=\"spectrum-Body3\"><sp-icons-medium></sp-icons-medium></p>\n<code-example class=\"language-html\">&lt;sp-checkbox&gt;Web component&lt;/sp-checkbox&gt;</code-example>\n<h3 id=\"standard-checkboxes\" class=\"spectrum-Heading3\">Standard Checkboxes</h3>\n<p class=\"spectrum-Body3\">Standard checkboxes are the default style for checkboxes. The blue color\nprovides a visual prominence that is optimal for forms, settings, lists or grids\nof assets, etc. where the checkboxes need to be noticed.</p>\n<Checkbox label=\"React\" defaultChecked=\"\">\n\n<code-example class=\"language-html\">&lt;sp-checkbox checked&gt;Web component&lt;/sp-checkbox&gt;</code-example>\n<h3 id=\"quiet-checkboxes\" class=\"spectrum-Heading3\">Quiet Checkboxes</h3>\n<p class=\"spectrum-Body3\">Quiet checkboxes are a secondary style for checkboxes. The gray color provides a\nless prominent style than the standard checkboxes. They are optimal for\napplication panels where all visual elements are monochrome in order to direct\nfocus to the content.</p>\n<code-example class=\"language-html\">&lt;sp-checkbox quiet&gt;Web component&lt;/sp-checkbox&gt;</code-example>\n<h3 id=\"states\" class=\"spectrum-Heading3\">States</h3>\n<p class=\"spectrum-Body3\">In addition to the variant, sp-checkboxes have a number of attributes for\ncontrolling their visual state. All checkbox variants support the <code>disabled</code>,\n<code>indeterminate</code>, <code>invalid</code> attributes, which applies a disabled style to the\ncheckbox, and also prevents clicks from activating it.</p>\n<code-example class=\"language-html\">&lt;div&gt;checked:&lt;/div&gt;\n&lt;sp-checkbox checked&gt;Web component&lt;/sp-checkbox&gt;\n\n&lt;div&gt;indeterminate:&lt;/div&gt;\n&lt;sp-checkbox indeterminate&gt;Web component&lt;/sp-checkbox&gt;\n\n&lt;div&gt;invalid:&lt;/div&gt;\n&lt;sp-checkbox invalid&gt;Web component&lt;/sp-checkbox&gt;\n\n&lt;div&gt;disabled:&lt;/div&gt;\n&lt;sp-checkbox disabled&gt;Web component&lt;/sp-checkbox&gt;</code-example>\n<h3 id=\"handling-events\" class=\"spectrum-Heading3\">Handling Events</h3>\n<p class=\"spectrum-Body3\">Event handlers for clicks and other user actions can be registered on an <code>sp-checkbox</code> just as a normal <code>&lt;input type=&quot;checkbox&quot;&gt;</code> element.</p>\n<code-example class=\"language-html\">&lt;sp-checkbox id=&quot;checkbox-example&quot; onclick=&quot;javascript:alert(&#39;Click&#39;)&quot;&gt;\n    Web component\n&lt;/sp-checkbox&gt;</code-example>\n<h2 id=\"accessibility\" class=\"spectrum-Heading2--quiet\">Accessibility</h2>\n<p class=\"spectrum-Body3\">Checkboxes are accessible by default, rendered in HTML using the <code>&lt;input type=&quot;checkbox&quot;&gt;</code> element. When the checkbox is set as <code>indeterminate</code> or\n<code>invalid</code>, the appropriate ARIA state attribute will automatically be applied.</p>\n</Checkbox>";

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">A <strong>sp-dropzone</strong> is an area on the screen into which an object can be dragged and dropped to accomplish a task. For example, a DropZone might be used in an upload workflow to enable the user to simply drop a file from their operating system into the DropZone, which is a more efficient and intuitive action, rather than utilize the standard &quot;Choose File&quot; dialog.</p>\n<p class=\"spectrum-Body3\">DropZones should be used with an IllustratedMessage component as a child if the drop zone is empty, otherwise the existing content should be passed as a child.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-dropzone id=&quot;dropzone&quot; tabindex=&quot;1&quot; style=&quot;width: 400px; height: 200px&quot;&gt;\n    &lt;sp-illustrated-message heading=&quot;Drag and Drop Your File&quot;&gt;\n        &lt;svg\n            xmlns=&quot;http://www.w3.org/2000/svg&quot;\n            viewBox=&quot;0 0 150 103&quot;\n            width=&quot;150&quot;\n            height=&quot;103&quot;\n            viewBox=&quot;0 0 150 103&quot;\n        &gt;\n            &lt;path\n                d=&quot;M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z&quot;\n            &gt;&lt;/path&gt;\n        &lt;/svg&gt;\n    &lt;/sp-illustrated-message&gt;\n\n    &lt;div style=&quot;color: grey&quot;&gt;\n        &lt;div&gt;\n            &lt;label for=&quot;file-input&quot;&gt;\n                &lt;sp-link&gt;Select a File&lt;/sp-link&gt;\n                from your computer\n            &lt;/label&gt;\n            &lt;input type=&quot;file&quot; id=&quot;file-input&quot; style=&quot;display: none&quot; /&gt;\n        &lt;/div&gt;\n        &lt;div&gt;\n            or\n            &lt;sp-link href=&quot;http://stock.adobe.com&quot; target=&quot;blank&quot;&gt;\n                Search Adobe Stock\n            &lt;/sp-link&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/sp-dropzone&gt;</code-example>\n<h3 id=\"dragged\" class=\"spectrum-Heading3\">Dragged</h3>\n<code-example class=\"language-html\">&lt;sp-dropzone\n    id=&quot;dropzone&quot;\n    tabindex=&quot;1&quot;\n    dragged\n    style=&quot;width: 400px; height: 200px&quot;\n&gt;\n    &lt;sp-illustrated-message heading=&quot;Drag and Drop Your File&quot;&gt;\n        &lt;svg\n            xmlns=&quot;http://www.w3.org/2000/svg&quot;\n            viewBox=&quot;0 0 150 103&quot;\n            width=&quot;150&quot;\n            height=&quot;103&quot;\n            viewBox=&quot;0 0 150 103&quot;\n        &gt;\n            &lt;path\n                d=&quot;M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z&quot;\n            &gt;&lt;/path&gt;\n        &lt;/svg&gt;\n    &lt;/sp-illustrated-message&gt;\n\n    &lt;div style=&quot;color: grey&quot;&gt;\n        &lt;div&gt;\n            &lt;label for=&quot;file-input&quot;&gt;\n                &lt;sp-link&gt;Select a File&lt;/sp-link&gt;\n                from your computer\n            &lt;/label&gt;\n            &lt;input type=&quot;file&quot; id=&quot;file-input&quot; style=&quot;display: none&quot; /&gt;\n        &lt;/div&gt;\n        &lt;div&gt;\n            or\n            &lt;sp-link href=&quot;http://stock.adobe.com&quot; target=&quot;blank&quot;&gt;\n                Search Adobe Stock\n            &lt;/sp-link&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/sp-dropzone&gt;</code-example>\n";

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\"><strong>sp-icon</strong> will allow you to render icons that have been supplied to the page via icon sets.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<p class=\"spectrum-Body3\"><sp-icons-medium></sp-icons-medium></p>\n<code-example class=\"language-html\">&lt;sp-icon name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<p class=\"spectrum-Body3\">Icons are available in various sizes in Spectrum ranging from <code>xxs</code> to <code>xxl</code>, <code>m</code> being the default. We can specify the size via <code>size</code> attribute.</p>\n<h3 id=\"size-variants\" class=\"spectrum-Heading3\">Size variants</h3>\n<p class=\"spectrum-Body3\"><sp-icon size=\"xxs\" name=\"ui:Magnifier\"></sp-icon>\n<sp-icon size=\"xs\" name=\"ui:Magnifier\"></sp-icon>\n<sp-icon size=\"s\" name=\"ui:Magnifier\"></sp-icon>\n<sp-icon size=\"m\" name=\"ui:Magnifier\"></sp-icon>\n<sp-icon size=\"l\" name=\"ui:Magnifier\"></sp-icon>\n<sp-icon size=\"xl\" name=\"ui:Magnifier\"></sp-icon>\n<sp-icon size=\"xxl\" name=\"ui:Magnifier\"></sp-icon></p>\n<code-example>&lt;sp-icon size=&quot;xxs&quot; name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;\n&lt;sp-icon size=&quot;xs&quot; name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;\n&lt;sp-icon size=&quot;s&quot; name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;\n&lt;sp-icon size=&quot;m&quot; name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;\n&lt;sp-icon size=&quot;l&quot; name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;\n&lt;sp-icon size=&quot;xl&quot; name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;\n&lt;sp-icon size=&quot;xxl&quot; name=&quot;ui:Magnifier&quot;&gt;&lt;/sp-icon&gt;</code-example><h2 id=\"color-icon\" class=\"spectrum-Heading2--quiet\">Color Icon</h2>\n<p class=\"spectrum-Body3\">Icons apply their color as <code>currentColor</code> so change the <code>color</code> property of the element for customization.</p>\n<p class=\"spectrum-Body3\"><sp-icon name=\"ui:Magnifier\" style=\"color: red;\"></sp-icon></p>\n<code-example>&lt;sp-icon name=&quot;ui:Magnifier&quot; style=&quot;color: red;&quot;&gt;&lt;/sp-icon&gt;</code-example><h2 id=\"accessibility\" class=\"spectrum-Heading2--quiet\">Accessibility</h2>\n<p class=\"spectrum-Body3\"><code>aria-hidden</code> is set to true by default for Icons. The <code>label</code> attribute suppresses this and adds the label text as the aria-label of the icon.</p>\n<p class=\"spectrum-Body3\"><sp-icon name=\"ui:Magnifier\" label=\"Magnify\"></sp-icon></p>\n<code-example>&lt;sp-icon name=&quot;ui:Magnifier&quot; label=&quot;Magnify&quot;&gt;&lt;/sp-icon&gt;</code-example>";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-illustrated-message</strong> displays an illustration icon and a message, usually in an empty state or on an error page. It is also used inside a DropZone.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-illustrated-message\n    heading=&quot;Drag and Drop Your File&quot;\n    description=&quot;This message has italics&quot;\n&gt;\n    &lt;svg\n        xmlns=&quot;http://www.w3.org/2000/svg&quot;\n        viewBox=&quot;0 0 150 103&quot;\n        width=&quot;150&quot;\n        height=&quot;103&quot;\n        viewBox=&quot;0 0 150 103&quot;\n    &gt;\n        &lt;path\n            d=&quot;M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z&quot;\n        &gt;&lt;/path&gt;\n    &lt;/svg&gt;\n&lt;/sp-illustrated-message&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<h3 id=\"cta-variant\" class=\"spectrum-Heading3\">CTA Variant</h3>\n<p class=\"spectrum-Body3\">In this variant, the description text is not italisized.</p>\n<code-example class=\"language-html\">&lt;sp-illustrated-message\n    heading=&quot;Drag and Drop Your File&quot;\n    description=&quot;This message has no italics&quot;\n    cta\n&gt;\n    &lt;svg\n        xmlns=&quot;http://www.w3.org/2000/svg&quot;\n        viewBox=&quot;0 0 150 103&quot;\n        width=&quot;150&quot;\n        height=&quot;103&quot;\n        viewBox=&quot;0 0 150 103&quot;\n    &gt;\n        &lt;path\n            d=&quot;M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z&quot;\n        &gt;&lt;/path&gt;\n    &lt;/svg&gt;\n&lt;/sp-illustrated-message&gt;</code-example>\n<h2 id=\"content\" class=\"spectrum-Heading2--quiet\">Content</h2>\n<p class=\"spectrum-Body3\">The popover accepts an svg into its default slot. This svg is displayed as an illustration above the heading and description</p>\n";

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-link</strong> allow users to navigate to a different location. They can be presented in-line inside a paragraph or as a standalone text.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<!-- prettier-ignore -->\n<code-example class=\"language-html\">This is an &lt;sp-link href=&quot;#&quot;&gt;example link&lt;/sp-link&gt;.</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<h3 id=\"standard-links\" class=\"spectrum-Heading3\">Standard Links</h3>\n<p class=\"spectrum-Body3\">Standard links can follow any of the character styles defined in Spectrum. Therefore, they can be displayed in various font sizes and weights. Standard links appear blue, in order to stand out from the rest of the text and be recognized as interactive.</p>\n<!-- prettier-ignore -->\n<code-example class=\"language-html\">This is a &lt;sp-link href=&quot;#&quot;&gt;standard link&lt;/sp-link&gt;.</code-example>\n<h3 id=\"quiet-links\" class=\"spectrum-Heading3\">Quiet Links</h3>\n<p class=\"spectrum-Body3\">Quiet links appear with an underline and use the default text color. The subdued appearance is optimal for use in content lower in your application’s hierarchy such as links in a footer.</p>\n<!-- prettier-ignore -->\n<code-example class=\"language-html\">This is a &lt;sp-link quiet href=&quot;#&quot;&gt;quiet link&lt;/sp-link&gt;.</code-example>\n<h3 id=\"links-over-backgrounds\" class=\"spectrum-Heading3\">Links Over Backgrounds</h3>\n<p class=\"spectrum-Body3\">When a link needs to be placed on top of a colored background or a visual, use the over background link. This link uses a white opaque color instead of a blue color and stands out from the rest of the text with the addition of an underline.</p>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;background-color: rgb(255, 160, 175); padding: 15px 20px; display: inline-block;&quot;\n&gt;\n    &lt;p style=&quot;color: rgb(240, 240, 240);&quot;&gt;\n        This\n        &lt;sp-link over-background href=&quot;#&quot;&gt;link&lt;/sp-link&gt;\n        is over a background.\n    &lt;/p&gt;\n&lt;/div&gt;</code-example>\n<h2 id=\"accessibility\" class=\"spectrum-Heading2--quiet\">Accessibility</h2>\n<p class=\"spectrum-Body3\">Links are accessible by default, rendered in HTML using the <code>&lt;a&gt;</code> element. The correct aria roles will automatically be applied.</p>\n";

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>overlay-root</strong> defines the DOM element which defines the bounds in which overlay\nelements (e.g. <code>sp-popover</code>) are rendered. An overlay root is intended to be used with\nan <a href=\"/components/overlay-trigger\" class=\"spectrum-Link\"><code>overlay-trigger</code></a>. Please see the documentation for\n<a href=\"/components/overlay-trigger\" class=\"spectrum-Link\"><code>overlay-trigger</code></a>.</p>\n";

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>overlay-trigger</strong> is used to overlay content that is positioned relative to\nanother control. Two kinds of triggers are supported, <code>hover</code> and <code>click</code>. Each\nmay have it&#39;s own content.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;style&gt;\n    overlay-root {\n        position: relative;\n        width: 100%;\n        height: 400px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    overlay-trigger {\n        flex: none;\n    }\n\n    .tooltip {\n        background-color: var(--spectrum-global-color-gray-800);\n        color: var(--spectrum-global-color-gray-50);\n        padding: 4px 10px;\n        font-size: 10px;\n    }\n&lt;/style&gt;\n&lt;overlay-root placement=&quot;bottom&quot; offset=&quot;6&quot;&gt;\n    &lt;overlay-trigger id=&quot;trigger&quot; placement=&quot;bottom&quot; offset=&quot;6&quot;&gt;\n        &lt;sp-button variant=&quot;primary&quot; slot=&quot;trigger&quot;&gt;\n            Bottom Popover\n        &lt;/sp-button&gt;\n        &lt;sp-popover dialog slot=&quot;click-content&quot; direction=&quot;bottom&quot; tip open&gt;\n            &lt;div class=&quot;options-popover-content&quot;&gt;\n                &lt;sp-slider\n                    value=&quot;5&quot;\n                    step=&quot;0.5&quot;\n                    min=&quot;0&quot;\n                    max=&quot;20&quot;\n                    label=&quot;Awesomeness&quot;\n                &gt;&lt;/sp-slider&gt;\n                &lt;sp-button&gt;Press Me&lt;/sp-button&gt;\n            &lt;/div&gt;\n        &lt;/sp-popover&gt;\n        &lt;div slot=&quot;hover-content&quot; class=&quot;tooltip&quot; delay=&quot;100&quot;&gt;\n            Tooltip\n        &lt;/div&gt;\n    &lt;/overlay-trigger&gt;\n&lt;/overlay-root&gt;</code-example>\n";

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-popover</strong> is used to display transient content (menus, options, additional actions etc.) and appears when clicking/tapping on a source (tools, buttons, etc.) It stands out via its visual style (stroke and drop shadow) and floats on top of the rest of the interface.\nThis component does not implement the actual overlay behavior and interactions.\nThis is handled in the <code>Overlay Root</code> and <code>Overlay Trigger</code></p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px&quot;\n&gt;\n    &lt;sp-popover variant=&quot;dialog&quot; open&gt;\n        &lt;div style=&quot;padding-bottom: 30px; font-size: 18px; font-weight: 700&quot;&gt;\n            Popover Title\n        &lt;/div&gt;\n        &lt;div style=&quot;font-size: 14px&quot;&gt;\n            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.\n            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake\n            sweet roll cake danish candy biscuit halvah\n        &lt;/div&gt;\n    &lt;/sp-popover&gt;\n&lt;/div&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<h3 id=\"default-with-no-tip\" class=\"spectrum-Heading3\">Default with No Tip</h3>\n<p class=\"spectrum-Body3\">Default popover with no tip and no direction. Popovers will fill up the space of they&#39;re containing\nelement by default. The default popover has no padding by default</p>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;color: var(--spectrum-global-color-gray-800); width: 320px; height: 200px&quot;\n&gt;\n    &lt;sp-popover variant=&quot;default&quot; open style=&quot;max-width: 320px&quot;&gt;\n        &lt;div style=&quot;font-size: 14px; padding: 10px&quot;&gt;\n            &lt;div\n                style=&quot;padding-bottom: 30px; font-size: 18px; font-weight: 700&quot;\n            &gt;\n                Popover Title\n            &lt;/div&gt;\n            &lt;div style=&quot;font-size: 14px&quot;&gt;\n                Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly\n                caramels. Icing soufflé chupa chups donut cheesecake. Jelly-o\n                chocolate cake sweet roll cake danish candy biscuit halvah\n            &lt;/div&gt;\n        &lt;/div&gt;\n    &lt;/sp-popover&gt;\n&lt;/div&gt;</code-example>\n<h3 id=\"dialog-popovers\" class=\"spectrum-Heading3\">Dialog Popovers</h3>\n<p class=\"spectrum-Body3\">Popovers with padding, ideal for dialogs.</p>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px&quot;\n&gt;\n    &lt;sp-popover variant=&quot;dialog&quot; open&gt;\n        &lt;div style=&quot;padding-bottom: 30px; font-size: 18px; font-weight: 700&quot;&gt;\n            Popover Title\n        &lt;/div&gt;\n        &lt;div style=&quot;font-size: 14px&quot;&gt;\n            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.\n            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake\n            sweet roll cake danish candy biscuit halvah\n        &lt;/div&gt;\n    &lt;/sp-popover&gt;\n&lt;/div&gt;</code-example>\n<h3 id=\"popover-with-tip\" class=\"spectrum-Heading3\">Popover with Tip</h3>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px&quot;\n&gt;\n    &lt;sp-popover variant=&quot;dialog&quot; direction=&quot;bottom&quot; tip open&gt;\n        &lt;div style=&quot;padding-bottom: 30px; font-size: 18px; font-weight: 700&quot;&gt;\n            Popover Title\n        &lt;/div&gt;\n        &lt;div style=&quot;font-size: 14px&quot;&gt;\n            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.\n            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake\n            sweet roll cake danish candy biscuit halvah\n        &lt;/div&gt;\n    &lt;/sp-popover&gt;\n&lt;/div&gt;</code-example>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px&quot;\n&gt;\n    &lt;sp-popover variant=&quot;dialog&quot; direction=&quot;top&quot; tip open&gt;\n        &lt;div style=&quot;padding-bottom: 30px; font-size: 18px; font-weight: 700&quot;&gt;\n            Popover Title\n        &lt;/div&gt;\n        &lt;div style=&quot;font-size: 14px&quot;&gt;\n            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.\n            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake\n            sweet roll cake danish candy biscuit halvah\n        &lt;/div&gt;\n    &lt;/sp-popover&gt;\n&lt;/div&gt;</code-example>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px&quot;\n&gt;\n    &lt;sp-popover variant=&quot;dialog&quot; direction=&quot;left&quot; tip open&gt;\n        &lt;div style=&quot;padding-bottom: 30px; font-size: 18px; font-weight: 700&quot;&gt;\n            Popover Title\n        &lt;/div&gt;\n        &lt;div style=&quot;font-size: 14px&quot;&gt;\n            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.\n            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake\n            sweet roll cake danish candy biscuit halvah\n        &lt;/div&gt;\n    &lt;/sp-popover&gt;\n&lt;/div&gt;</code-example>\n<code-example class=\"language-html\">&lt;div\n    style=&quot;color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px&quot;\n&gt;\n    &lt;sp-popover variant=&quot;dialog&quot; direction=&quot;right&quot; tip open&gt;\n        &lt;div style=&quot;padding-bottom: 30px; font-size: 18px; font-weight: 700&quot;&gt;\n            Popover Title\n        &lt;/div&gt;\n        &lt;div style=&quot;font-size: 14px&quot;&gt;\n            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.\n            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake\n            sweet roll cake danish candy biscuit halvah\n        &lt;/div&gt;\n    &lt;/sp-popover&gt;\n&lt;/div&gt;</code-example>\n";

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\"><strong>sp-radio</strong> and <strong>sp-radio-group</strong> allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.</p>\n<p class=\"spectrum-Body3\"><strong>sp-radio-group</strong> holds a list of <strong>sp-radio</strong> elements, and is responsible for deselecting radio buttons when a new one is selected, which in turn makes it responsible for keeping track of which one is selected. <strong>sp-radio</strong> is responsible for handling user interactions and for visually reflecting if it is the one that is checked or not.</p>\n<h3 id=\"example\" class=\"spectrum-Heading3\">Example</h3>\n<code-example class=\"language-html\">&lt;sp-radio-group selected=&quot;first&quot; name=&quot;example&quot;&gt;\n    &lt;sp-radio value=&quot;first&quot;&gt;Option 1&lt;/sp-radio&gt;\n    &lt;sp-radio value=&quot;second&quot;&gt;Option 2&lt;/sp-radio&gt;\n    &lt;sp-radio value=&quot;third&quot;&gt;Option 3&lt;/sp-radio&gt;\n    &lt;sp-radio value=&quot;fourth&quot;&gt;Option 4&lt;/sp-radio&gt;\n&lt;/sp-radio-group&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<h3 id=\"standard-radio\" class=\"spectrum-Heading3\">Standard Radio</h3>\n<p class=\"spectrum-Body3\">Standard radio buttons are the default style for radio buttons. The blue color provides a visual prominence that is optimal for forms, settings, etc. where the radio buttons need to be noticed.</p>\n<code-example class=\"language-html\">&lt;sp-radio&gt;Standard Radio Button&lt;/sp-radio&gt;</code-example>\n<h3 id=\"quiet-radio\" class=\"spectrum-Heading3\">Quiet Radio</h3>\n<p class=\"spectrum-Body3\">Quiet radio buttons are a secondary style for radio buttons. The gray color provides a\nless prominent style than the standard radioes. They are optimal for\napplication panels where all visual elements are monochrome in order to direct\nfocus to the content.</p>\n<code-example class=\"language-html\">&lt;sp-radio quiet&gt;Quiet Radio Button&lt;/sp-radio&gt;</code-example>\n<h2 id=\"states\" class=\"spectrum-Heading2--quiet\">States</h2>\n<p class=\"spectrum-Body3\">In addition to the variant, <strong>sp-radio</strong> buttons have a number of attributes for\ncontrolling their visual state. All radio variants support the <code>disabled</code> and <code>invalid</code> attributes. Invalid which applies a disabled style to the\nradio, and also prevents clicks from activating it.</p>\n<h3 id=\"checked\" class=\"spectrum-Heading3\">Checked</h3>\n<p class=\"spectrum-Body3\">When the radio is selected. Can be deselected only by selecting another radio in the group or by manually setting checked property</p>\n<code-example class=\"language-html\">&lt;sp-radio checked&gt;Checked Radio Button&lt;/sp-radio&gt;</code-example>\n<h3 id=\"invalid\" class=\"spectrum-Heading3\">Invalid</h3>\n<p class=\"spectrum-Body3\">Indicates some error state related to the radio button. Can still be checked.</p>\n<code-example class=\"language-html\">&lt;sp-radio invalid&gt;Invalid Radio Button&lt;/sp-radio&gt;</code-example>\n<h3 id=\"disabled\" class=\"spectrum-Heading3\">Disabled</h3>\n<p class=\"spectrum-Body3\">When the radio button is no longer interactable. The button cannot be checked.</p>\n<code-example class=\"language-html\">&lt;sp-radio disabled&gt;Disabled Radio Button&lt;/sp-radio&gt;</code-example>\n<h3 id=\"radio-group-column\" class=\"spectrum-Heading3\">Radio Group Column</h3>\n<p class=\"spectrum-Body3\">By default, radio groups are inline and appear vertically. By adding the <code>column</code> property to <strong>sp-radio-group</strong>\nthe radio buttons will be listed vertically on their own line.</p>\n<code-example class=\"language-html\">&lt;sp-radio-group column name=&quot;column-example&quot;&gt;\n    &lt;sp-radio value=&quot;first&quot;&gt;Option 1&lt;/sp-radio&gt;\n    &lt;sp-radio value=&quot;second&quot;&gt;Option 2&lt;/sp-radio&gt;\n    &lt;sp-radio value=&quot;third&quot;&gt;Option 3&lt;/sp-radio&gt;\n&lt;/sp-radio-group&gt;</code-example>\n<h3 id=\"handling-events\" class=\"spectrum-Heading3\">Handling Events</h3>\n<p class=\"spectrum-Body3\">Event handlers for clicks and other user actions can be registered on an <code>sp-radio</code> just as a normal <code>&lt;input type=&quot;radio&quot;&gt;</code> element.</p>\n<code-example class=\"language-html\">&lt;sp-radio id=&quot;radio-example&quot; onclick=&quot;javascript:alert(&#39;Click&#39;)&quot;&gt;\n    Web component\n&lt;/sp-radio&gt;</code-example>\n<h2 id=\"accessibility\" class=\"spectrum-Heading2--quiet\">Accessibility</h2>\n<p class=\"spectrum-Body3\">Radio buttons are accessible by default, rendered in HTML using the <code>&lt;input type=&quot;radio&quot;&gt;</code> element. Tabbing into a group of radio buttons places the focus on the first radio button selected. If none of the radio buttons are selected, the focus is set on the first one in the group. Space selects the radio button in focus (if not already selected). Using the arrow keys moves focus and selection to the previous or next radio button in the group (last becomes first, and first becomes last). The new radio button in focus gets selected even if the previous one was not.</p>\n";

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">Side navigation allows users to locate information and features within the UI.\nIt can be used for either hierarchical or flat navigation, and gives the ability\nto group navigable items categorically. Side navigation is an opportunity to\nprioritize content or features based on your users’ needs in a way that\nmaintains clear, persistent visibility. Use side navigation within the context\nof larger elements and mechanisms within the app frame.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-sidenav defaultValue=&quot;Docs&quot;&gt;\n    &lt;sp-sidenav-item\n        value=&quot;Docs&quot;\n        label=&quot;Docs&quot;\n        href=&quot;/components/SideNav&quot;\n    &gt;&lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item\n        value=&quot;Guides&quot;\n        label=&quot;Guides&quot;\n        href=&quot;/guides/getting_started&quot;\n    &gt;&lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item\n        value=&quot;Community&quot;\n        label=&quot;Community&quot;\n        href=&quot;/community&quot;\n    &gt;&lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item\n        value=&quot;Storybook&quot;\n        label=&quot;Storybook&quot;\n        href=&quot;/storybook&quot;\n        target=&quot;_blank&quot;\n    &gt;&lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item\n        value=&quot;Releases&quot;\n        label=&quot;Releases&quot;\n        href=&quot;http://git.corp.adobe.com/React/react-spectrum/releases&quot;\n        target=&quot;_blank&quot;\n        disabled\n    &gt;&lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item\n        value=&quot;GitHub&quot;\n        label=&quot;GitHub&quot;\n        href=&quot;http://git.corp.adobe.com/React/react-spectrum&quot;\n        target=&quot;_blank&quot;\n    &gt;&lt;/sp-sidenav-item&gt;\n&lt;/sp-sidenav&gt;</code-example>\n<h2 id=\"multi-level\" class=\"spectrum-Heading2--quiet\">Multi-Level</h2>\n<p class=\"spectrum-Body3\">Use this variation when you have multiple layers of hierarchical navigation. The\nheaders are styled differently and possess the same interactive behavior as a\ntreeview; clicking the header opens and collapses the children navigation items.\nIn the instances where a top-level navigation item has no children, clicking\nwill send the user to the location of the item.</p>\n<code-example class=\"language-html\">&lt;sp-sidenav variant=&quot;multiLevel&quot; defaultValue=&quot;Layout&quot;&gt;\n    &lt;sp-sidenav-item value=&quot;Guidelines&quot; label=&quot;Guidelines&quot;&gt;&lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item value=&quot;Styles&quot; label=&quot;Styles&quot;&gt;\n        &lt;sp-sidenav-item value=&quot;Color&quot; label=&quot;Color&quot;&gt;&lt;/sp-sidenav-item&gt;\n        &lt;sp-sidenav-item value=&quot;Grid&quot; label=&quot;Grid&quot;&gt;\n            &lt;sp-sidenav-item value=&quot;Layout&quot; label=&quot;Layout&quot;&gt;&lt;/sp-sidenav-item&gt;\n            &lt;sp-sidenav-item value=&quot;Responsive&quot; label=&quot;Responsive&quot;&gt;&lt;/sp-sidenav-item&gt;\n        &lt;/sp-sidenav-item&gt;\n        &lt;sp-sidenav-item value=&quot;Typography&quot; label=&quot;Typography&quot;&gt;&lt;/sp-sidenav-item&gt;\n    &lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item value=&quot;Elements&quot; label=&quot;Elements&quot;&gt;&lt;/sp-sidenav-item&gt;\n    &lt;sp-sidenav-item value=&quot;Patterns&quot; label=&quot;Patterns&quot;&gt;&lt;/sp-sidenav-item&gt;\n&lt;/sp-sidenav-itm&gt;</code-example>\n";

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-switch</strong> is used to turn an option on or off. Switches allow users to select the state of a single option at a time. Use a switch rather than a checkbox when activating (or deactivating) an option, instead of selecting.</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-switch label=&quot;Switch&quot; onclick=&quot;javascript:alert(&#39;Click&#39;)&quot;&gt;Switch&lt;/sp-switch&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<h3 id=\"standard-switches\" class=\"spectrum-Heading3\">Standard Switches</h3>\n<p class=\"spectrum-Body3\">Standard switches are the default style for switches. The blue color provides a\nvisual prominence that is optimal for forms, settings, etc. where the switches\nneed to be noticed.</p>\n<code-example class=\"language-html\">&lt;sp-switch checked&gt;Web component&lt;/sp-switch&gt;</code-example>\n<h3 id=\"quiet-switches\" class=\"spectrum-Heading3\">Quiet Switches</h3>\n<p class=\"spectrum-Body3\">Quiet switches are a secondary style for switches. The gray color provides a\nless prominent style than the standard switches. They are optimal for\napplication panels where all visual elements are monochrome in order to direct\nfocus to the content.</p>\n<code-example class=\"language-html\">&lt;sp-switch checked quiet&gt;Web component&lt;/sp-switch&gt;</code-example>\n<h2 id=\"state\" class=\"spectrum-Heading2--quiet\">State</h2>\n<h3 id=\"checked-controlled\" class=\"spectrum-Heading3\">Checked (controlled)</h3>\n<code-example class=\"language-html\">&lt;sp-switch checked&gt;Checked true&lt;/sp-switch&gt;</code-example>\n<h3 id=\"disabled\" class=\"spectrum-Heading3\">Disabled</h3>\n<code-example class=\"language-html\">&lt;sp-switch disabled&gt;Disabled switch&lt;/sp-switch&gt;</code-example>\n<h2 id=\"accessibility\" class=\"spectrum-Heading2--quiet\">Accessibility</h2>\n<p class=\"spectrum-Body3\">Switch are accessible by default, rendered in HTML using the <code>&lt;input type=&quot;checkbox&quot;&gt;</code> element with the appropriate accessibility role, <code>switch</code>. When the Switch is <code>checked</code> or <code>invalid</code>, the appropriate ARIA state attribute will automatically be applied.</p>\n";

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">The sp-tab-list component contains set of tab-item elements. This is typically used as the interface for controlling a set of layered sections of content that display one panel of content at a time</p>\n<h2 id=\"example\" class=\"spectrum-Heading2--quiet\">Example</h2>\n<code-example class=\"language-html\">&lt;sp-tab-list selected=&quot;1&quot;&gt;\n    &lt;sp-tab label=&quot;Tab 1&quot; value=&quot;1&quot; tabindex=&quot;1&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 2&quot; value=&quot;2&quot; tabindex=&quot;2&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 3&quot; value=&quot;3&quot; tabindex=&quot;3&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 4&quot; value=&quot;4&quot; tabindex=&quot;4&quot;&gt;&lt;/sp-tab&gt;\n&lt;/sp-tab-list&gt;</code-example>\n<h3 id=\"vertical\" class=\"spectrum-Heading3\">Vertical</h3>\n<code-example class=\"language-html\">&lt;sp-tab-list selected=&quot;1&quot; direction=&quot;vertical&quot;&gt;\n    &lt;sp-tab label=&quot;Tab 1&quot; value=&quot;1&quot; tabindex=&quot;1&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 2&quot; value=&quot;2&quot; tabindex=&quot;2&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 3&quot; value=&quot;3&quot; tabindex=&quot;3&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 4&quot; value=&quot;4&quot; tabindex=&quot;4&quot;&gt;&lt;/sp-tab&gt;\n&lt;/sp-tab-list&gt;</code-example>\n<h2 id=\"variants\" class=\"spectrum-Heading2--quiet\">Variants</h2>\n<h3 id=\"quiet\" class=\"spectrum-Heading3\">Quiet</h3>\n<code-example class=\"language-html\">&lt;sp-tab-list selected=&quot;1&quot; quiet&gt;\n    &lt;sp-tab label=&quot;Tab 1&quot; value=&quot;1&quot; tabindex=&quot;1&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 2&quot; value=&quot;2&quot; tabindex=&quot;2&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 3&quot; value=&quot;3&quot; tabindex=&quot;3&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 4&quot; value=&quot;4&quot; tabindex=&quot;4&quot;&gt;&lt;/sp-tab&gt;\n&lt;/sp-tab-list&gt;</code-example>\n<h3 id=\"compact\" class=\"spectrum-Heading3\">Compact</h3>\n<code-example class=\"language-html\">&lt;sp-tab-list selected=&quot;1&quot; compact&gt;\n    &lt;sp-tab label=&quot;Tab 1&quot; value=&quot;1&quot; tabindex=&quot;1&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 2&quot; value=&quot;2&quot; tabindex=&quot;2&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 3&quot; value=&quot;3&quot; tabindex=&quot;3&quot;&gt;&lt;/sp-tab&gt;\n    &lt;sp-tab label=&quot;Tab 4&quot; value=&quot;4&quot; tabindex=&quot;4&quot;&gt;&lt;/sp-tab&gt;\n&lt;/sp-tab-list&gt;</code-example>\n<h2 id=\"with-icons\" class=\"spectrum-Heading2--quiet\">With Icons</h2>\n<code-example class=\"language-html\">&lt;div&gt;\n    &lt;sp-icons-medium&gt;&lt;/sp-icons-medium&gt;\n    &lt;sp-tab-list selected=&quot;1&quot; direction=&quot;horizontal&quot;&gt;\n        &lt;sp-tab label=&quot;Tab 1&quot; value=&quot;1&quot; tabindex=&quot;1&quot;&gt;\n            &lt;sp-icon slot=&quot;icon&quot; size=&quot;m&quot; name=&quot;ui:CheckmarkSmall&quot;&gt;&lt;/sp-icon&gt;\n        &lt;/sp-tab&gt;\n        &lt;sp-tab label=&quot;Tab 2&quot; value=&quot;2&quot; tabindex=&quot;2&quot;&gt;\n            &lt;sp-icon slot=&quot;icon&quot; size=&quot;m&quot; name=&quot;ui:CrossSmall&quot;&gt;&lt;/sp-icon&gt;\n        &lt;/sp-tab&gt;\n        &lt;sp-tab label=&quot;Tab 3&quot; value=&quot;3&quot; tabindex=&quot;3&quot;&gt;\n            &lt;sp-icon slot=&quot;icon&quot; size=&quot;m&quot; name=&quot;ui:ChevronDownSmall&quot;&gt;&lt;/sp-icon&gt;\n        &lt;/sp-tab&gt;\n        &lt;sp-tab label=&quot;Tab 4&quot; value=&quot;4&quot; tabindex=&quot;4&quot;&gt;\n            &lt;sp-icon slot=&quot;icon&quot; size=&quot;m&quot; name=&quot;ui:HelpSmall&quot;&gt;&lt;/sp-icon&gt;\n        &lt;/sp-tab&gt;\n    &lt;/sp-tab-list&gt;\n&lt;/div&gt;</code-example>\n<h2 id=\"keyboard-focus\" class=\"spectrum-Heading2--quiet\">Keyboard Focus</h2>\n<p class=\"spectrum-Body3\">By default, the first tab in tab-list automatically becomes selected when the tab-list receives focus.</p>\n";

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"overview\" class=\"spectrum-Heading2--quiet\">Overview</h2>\n<p class=\"spectrum-Body3\">An <strong>sp-theme</strong> sets the rendering theme for all child components.\nThe Spectrum design system supports four color themes and two different\nscales. <code>spectrum-web-components</code> currently supports two of the four\ncolor themes (dark and light) one one of the scales (medium).</p>\n<h2 id=\"light-theme\" class=\"spectrum-Heading2--quiet\">Light theme</h2>\n<code-example class=\"language-html\">&lt;style type=&quot;text/css&quot;&gt;\n    #example {\n        width: 500px;\n        padding: 3em;\n        background-color: var(--spectrum-global-color-gray-100);\n        color: var(--spectrum-global-color-gray-800);\n    }\n\n    #buttons {\n        margin-top: 2em;\n    }\n&lt;/style&gt;\n&lt;sp-theme color=&quot;light&quot;&gt;\n    &lt;div id=&quot;example&quot;&gt;\n        &lt;div&gt;\n            &lt;sp-slider\n                value=&quot;5&quot;\n                step=&quot;1&quot;\n                min=&quot;1&quot;\n                max=&quot;11&quot;\n                label=&quot;Volume&quot;\n                id=&quot;volume-slider&quot;\n            &gt;&lt;/sp-slider&gt;\n        &lt;/div&gt;\n        &lt;div&gt;&lt;sp-switch&gt;Overdrive&lt;/sp-switch&gt;&lt;/div&gt;\n        &lt;div id=&quot;buttons&quot;&gt;\n            &lt;sp-button variant=&quot;primary&quot;&gt;Cancel&lt;/sp-button&gt;\n            &lt;sp-button variant=&quot;cta&quot;&gt;Continue&lt;/sp-button&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/sp-theme&gt;</code-example>\n<h2 id=\"dark-theme\" class=\"spectrum-Heading2--quiet\">Dark theme</h2>\n<code-example class=\"language-html\">&lt;style type=&quot;text/css&quot;&gt;\n    #example {\n        width: 500px;\n        padding: 3em;\n        background-color: var(--spectrum-global-color-gray-100);\n        color: var(--spectrum-global-color-gray-800);\n    }\n\n    #buttons {\n        margin-top: 2em;\n    }\n&lt;/style&gt;\n&lt;sp-theme color=&quot;dark&quot;&gt;\n    &lt;div id=&quot;example&quot;&gt;\n        &lt;div&gt;\n            &lt;sp-slider\n                value=&quot;5&quot;\n                step=&quot;1&quot;\n                min=&quot;1&quot;\n                max=&quot;11&quot;\n                label=&quot;Volume&quot;\n                id=&quot;volume-slider&quot;\n            &gt;&lt;/sp-slider&gt;\n        &lt;/div&gt;\n        &lt;div&gt;&lt;sp-switch&gt;Overdrive&lt;/sp-switch&gt;&lt;/div&gt;\n        &lt;div id=&quot;buttons&quot;&gt;\n            &lt;sp-button variant=&quot;primary&quot;&gt;Cancel&lt;/sp-button&gt;\n            &lt;sp-button variant=&quot;cta&quot;&gt;Continue&lt;/sp-button&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/sp-theme&gt;</code-example>\n<h2 id=\"embedding-themes\" class=\"spectrum-Heading2--quiet\">Embedding themes</h2>\n<p class=\"spectrum-Body3\">There are a few cases where it is necessary to embed one theme within another.\nFor example, if you have an application that is using a dark theme that is\npreviewing or editing content that will be displayed in a light theme.</p>\n<p class=\"spectrum-Body3\">If you only want to change colors, you can use the <code>sp-theme-dark</code> or\n<code>sp-theme-light</code> class instead. They are a little lighter weight than\nthe full <code>sp-theme</code> class. You should still use <code>sp-theme</code> at the root\nbecause it installs extra styles that do not change between colors.</p>\n<code-example class=\"language-html\">&lt;style type=&quot;text/css&quot;&gt;\n    #outer {\n        width: 500px;\n        padding: 3em;\n        background-color: var(--spectrum-global-color-gray-100);\n        color: var(--spectrum-global-color-gray-800);\n    }\n\n    #inner {\n        margin-top: 2em;\n        padding: 2em;\n        background-color: var(--spectrum-global-color-gray-100);\n        color: var(--spectrum-global-color-gray-800);\n    }\n\n    #buttons {\n        margin-top: 2em;\n    }\n&lt;/style&gt;\n&lt;sp-theme color=&quot;dark&quot;&gt;\n    &lt;div id=&quot;outer&quot;&gt;\n        &lt;div&gt;\n            &lt;sp-slider\n                value=&quot;5&quot;\n                step=&quot;1&quot;\n                min=&quot;1&quot;\n                max=&quot;11&quot;\n                label=&quot;Volume&quot;\n                id=&quot;volume-slider&quot;\n            &gt;&lt;/sp-slider&gt;\n        &lt;/div&gt;\n        &lt;div&gt;&lt;sp-switch&gt;Overdrive&lt;/sp-switch&gt;&lt;/div&gt;\n        &lt;div id=&quot;buttons&quot;&gt;\n            &lt;sp-button variant=&quot;primary&quot;&gt;Cancel&lt;/sp-button&gt;\n            &lt;sp-button variant=&quot;cta&quot;&gt;Continue&lt;/sp-button&gt;\n        &lt;/div&gt;\n        &lt;sp-theme-light&gt;\n            &lt;div id=&quot;inner&quot;&gt;\n                &lt;div&gt;\n                    &lt;sp-slider\n                        value=&quot;5&quot;\n                        step=&quot;1&quot;\n                        min=&quot;1&quot;\n                        max=&quot;11&quot;\n                        label=&quot;Volume&quot;\n                        id=&quot;volume-slider&quot;\n                    &gt;&lt;/sp-slider&gt;\n                &lt;/div&gt;\n                &lt;div&gt;&lt;sp-switch&gt;Overdrive&lt;/sp-switch&gt;&lt;/div&gt;\n                &lt;div id=&quot;buttons&quot;&gt;\n                    &lt;sp-button variant=&quot;primary&quot;&gt;Cancel&lt;/sp-button&gt;\n                    &lt;sp-button variant=&quot;cta&quot;&gt;Continue&lt;/sp-button&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n        &lt;/sp-theme-light&gt;\n    &lt;/div&gt;\n&lt;/sp-theme&gt;</code-example>\n";

/***/ }),
/* 31 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 31;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./adding-component.md": 33,
	"./spectrum-config.md": 34
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 32;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spectrum-Article\"><h1 class=\"spectrum-Heading1\">Adding a New Component</h1></div>\n<p class=\"spectrum-Body3\">This guide explains how to contribute the implementation of a Spectrum control\nto <a href=\"https://github.com/adobe/spectrum-web-components\" class=\"spectrum-Link\">spectrum-web-components</a>.</p>\n<p class=\"spectrum-Body3\">The components in spectrum-web-components are based on the CSS definitions in\n<a href=\"https://github.com/adobe/spectrum-css\" class=\"spectrum-Link\">spectrum-css</a>. Typically, component\nimplementations contain very little code. The CSS from the <code>spectrum-css</code>\nproject typically specifies all of the presentation details.</p>\n<h2 id=\"what-is-a-web-component\" class=\"spectrum-Heading2--quiet\">What is a web component?</h2>\n<hr class=\"spectrum-Rule spectrum-Rule--large\">\n<p class=\"spectrum-Body3\">According to <a href=\"https://www.webcomponents.org/introduction\" class=\"spectrum-Link\">webcomponents.org</a>,\nweb components are:</p>\n<blockquote>\n<p class=\"spectrum-Body3\">... a set of web platform APIs that allow you to create new custom, reusable,\nencapsulated HTML tags to use in web pages and web apps. Custom components and\nwidgets build on the Web Component standards, will work across modern\nbrowsers, and can be used with any JavaScript library or framework that works\nwith HTML.</p>\n</blockquote>\n<p class=\"spectrum-Body3\">In order to add a new component to this library, you will need to develop a\nworking knowledge of the following technologies:</p>\n<ul class=\"spectrum-Body3\">\n<li><a href=\"https://github.com/adobe/spectrum-css\" class=\"spectrum-Link\">Spectrum CSS</a>: A CSS implementation of the Spectrum design language</li>\n<li><a href=\"https://developers.google.com/web/fundamentals/web-components/customelements\" class=\"spectrum-Link\">Web Components</a>: Standards based method for adding new HTML tags to a browser</li>\n<li><a href=\"https://developers.google.com/web/fundamentals/web-components/shadowdom\" class=\"spectrum-Link\">Shadow DOM</a>: The part of the Web Component spec that allows for encapsulation of component styles and child nodes</li>\n<li><a href=\"https://lit-element.polymer-project.org/guide\" class=\"spectrum-Link\">lit-element</a>: A simple base class for creating fast, lightweight web components</li>\n<li><a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties\" class=\"spectrum-Link\">CSS custom properties</a>: CSS variables that can be used throughout a document</li>\n<li><a href=\"https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html\" class=\"spectrum-Link\">Typescript</a>: A typesafe variant of JavaScript</li>\n</ul>\n<h2 id=\"setting-up-the-styling\" class=\"spectrum-Heading2--quiet\">Setting up the styling</h2>\n<hr class=\"spectrum-Rule spectrum-Rule--large\">\n<p class=\"spectrum-Body3\">The most complicated part of implementing a Spectrum web component is getting\nthe styles set up correctly. The <a href=\"https://developers.google.com/web/fundamentals/web-components/shadowdom\" class=\"spectrum-Link\">shadow\nDOM</a> is\nthe heart of a web component. It isolates the component from the styles and DOM\nof the containing page. While this offers many benefits, it also means that we\nmust structure our CSS very differently.</p>\n<p class=\"spectrum-Body3\">The CSS from the <a href=\"https://github.com/adobe/spectrum-css\" class=\"spectrum-Link\">spectrum-css</a> project\nis intended to be installed globally on a web page. Using it in the context of a\nweb component requires that we modify it. To facilitate that, this project comes\nwith a <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/scripts/process-spectrum-postcss-plugin.js\" class=\"spectrum-Link\">config-driven processor</a> that can transform the Spectrum CSS into a format\nthat can be consumed in a web component.</p>\n<p class=\"spectrum-Body3\">The first step is to create a directory and a <code>spectrum-config.js</code> file for your\nnew component. This config file contains information about the structure of\nthe web component in relation to the Spectrum CSS classes.</p>\n<p class=\"spectrum-Body3\">Below is a fragment of the <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js\" class=\"spectrum-Link\"><code>spectrum-config.js</code> file for <code>sp-button</code></a>.</p>\n<code-example class=\"language-javascript\">module.exports = {\n    spectrum: &#39;button&#39;,\n    components: [\n        {\n            name: &#39;button&#39;,\n            host: {\n                selector: &#39;.spectrum-Button&#39;,\n                shadowSelector: &#39;#button&#39;,\n            },\n            focus: &#39;#button&#39;,\n            attributes: [\n                {\n                    type: &#39;boolean&#39;,\n                    selector: &#39;.spectrum-Button--quiet&#39;,\n                },\n                {\n                    type: &#39;boolean&#39;,\n                    selector: &#39;:disabled&#39;,\n                },\n                {\n                    type: &#39;enum&#39;,\n                    name: &#39;variant&#39;,\n                    values: [\n                        &#39;.spectrum-Button--cta&#39;,\n                        &#39;.spectrum-Button--primary&#39;,\n                        &#39;.spectrum-Button--secondary&#39;,\n                        {\n                            name: &#39;negative&#39;,\n                            selector: &#39;.spectrum-Button--warning&#39;,\n                        },\n                        &#39;.spectrum-Button--overBackground&#39;,\n                        &#39;.spectrum-Button--secondary&#39;,\n                    ],\n                },\n            ],\n            ids: [&#39;.spectrum-Button-label&#39;],\n            slots: [\n                {\n                    name: &#39;icon&#39;,\n                    selector: &#39;.spectrum-Icon&#39;,\n                },\n            ],\n            exclude: [/\\.is-disabled/],\n        },\n    ],\n};</code-example>\n<p class=\"spectrum-Body3\">If we wanted to create a button component using this config file, the steps would be as\nfollows:</p>\n<ol>\n<li>Make the directory <a href=\"https://github.com/adobe/spectrum-web-components/tree/master/src/button\" class=\"spectrum-Link\"><code>src/components/button</code></a></li>\n<li>In that new directory, create a <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js\" class=\"spectrum-Link\"><code>spectrum-config.js</code></a>\nfile with the above contents</li>\n<li>Run the command <code>npm run process-spectrum</code> to create the <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-button.css\" class=\"spectrum-Link\">CSS file</a></li>\n</ol>\n<p class=\"spectrum-Body3\">When you do the above, the <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/scripts/process-spectrum-postcss-plugin.js\" class=\"spectrum-Link\">config-driven processor</a>\nwill look in the <a href=\"https://github.com/adobe/spectrum-css\" class=\"spectrum-Link\"><code>spectrum-css</code></a> project\nfor the <a href=\"https://unpkg.com/@adobe/spectrum-css@2.13.0/dist/components/button/index-vars.css\" class=\"spectrum-Link\">matching CSS file</a>.\nIt will parse that file and restructure the CSS as per the configuration\ninstructions.</p>\n<h2 id=\"structure-of-a-spectrum-web-component\" class=\"spectrum-Heading2--quiet\">Structure of a Spectrum Web Component</h2>\n<hr class=\"spectrum-Rule spectrum-Rule--large\">\n<p class=\"spectrum-Body3\">If you look at an <code>sp-button</code> in the Chrome developer tools, you will see a DOM\nstructure that looks like this.</p>\n<style>\n    .indented { \n        padding-left: 50pt; \n        padding-right: 50pt; \n    }\n\n    .dom-example {\n        background-color: var(--spectrum-global-color-gray-50);\n        max-width: 100%;\n        line-height: 1.3em;\n        padding: 0.75rem 1.5rem;\n        box-shadow: 0 0 18px rgba(0, 0, 0, 0.15);\n        margin: 1rem -4px 2rem;\n        border-radius: 6px;\n        overflow: auto hidden;\n        white-space: pre;\n    }\n\n    .flip {\n        display: inline-block;\n        transform: scale(-1, 1);\n    }\n</style>\n<div class=\"dom-example\">\n&#x25BC;&lt;sp-button tabindex=\"0\" variant=\"cta\"&gt;\n    &#x25BC; #shadow-root (open)\n        &#x25BC; &lt;button id=\"button\" tabindex=\"0\"&gt;\n            &#x25BC; &lt;div id=\"label&gt;\n                &#x25BC; &lt;slot&gt;\n                    <div class=\"flip\">&crarr;</div> #text\n                &lt;/slot&gt;\n            &lt;/div&gt;\n        &lt;/button&gt;\n    &#34;Click Me&#34;\n&lt;/sp-button&gt;\n</div>\n\n<p class=\"spectrum-Body3\">If anything here looks unfamiliar, it is probably a good time to do some reading\nabout <a href=\"https://developers.google.com/web/fundamentals/web-components/customelements\" class=\"spectrum-Link\">web components</a>.</p>\n<p class=\"spectrum-Body3\">You can compare this markup with the <a href=\"http://opensource.adobe.com/spectrum-css/2.13.0/docs/#button---cta\" class=\"spectrum-Link\">reference markup in the <code>spectrum-css</code> documentation</a></p>\n<h3 id=\"host-class-mapping\" class=\"spectrum-Heading3\">Host Class Mapping</h3>\n<p class=\"spectrum-Body3\">We need to determine what the main CSS class is for our component in the\noriginal <code>spectrum-css</code>. In the case of <code>sp-button</code>, we can see that the\ntop-level class is <code>.Spectrum-Button</code>. We then need to determine where we want\nthat CSS to be applied. In many cases, you will want that CSS to be applied to\nthe actual web component via the <code>:host</code> selector. That is the default behaviour\nof the conversion script. In this case, we wanted to preserve all of the default\nbehaviour of the <code>button</code> element in HTML. So, we want the main CSS to be\napplied to our <code>&lt;button&gt;</code> instead. If you look at the <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js#L18-L21\" class=\"spectrum-Link\"><code>host</code> definition in\n<code>spectrum-config.js</code></a>\nyou can see that we have supplied a <code>shadowSelector</code> option. That tells the\nscript to move all of the CSS for <code>.Spectrum-Button</code> to the <code>#button</code> element in\nthe shadow DOM.</p>\n<code-example class=\"language-javascript\">    host: {\n        selector: &#39;.spectrum-Button&#39;,\n        shadowSelector: &#39;#button&#39;,\n    },</code-example>\n<h3 id=\"shadow-dom-structure\" class=\"spectrum-Heading3\">Shadow DOM Structure</h3>\n<p class=\"spectrum-Body3\">The next step is to fill out the remaining structure of the shadow DOM portion\nof the component. Note that, in the shadow DOM, we are using ids instead of long\nclass names. We can do that because the namespace of each instance of our web\ncomponent has it&#39;s own DOM scope. So, there can never be an id name collision.</p>\n<p class=\"spectrum-Body3\">Typically, you will reference the <a href=\"http://opensource.adobe.com/spectrum-css/2.13.0/docs/#checkbox\" class=\"spectrum-Link\">sample code from the\n<code>spectrum-css</code></a>\ndocumentation and <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/checkbox/checkbox.ts#L30-L48\" class=\"spectrum-Link\">recreate that structure in the shadow DOM of your\ncomponent</a>.</p>\n<p class=\"spectrum-Body3\">In the case of <code>sp-checkbox</code>, we turn this sample DOM code:</p>\n<code-example class=\"language-markup\">&lt;label class=&quot;spectrum-Checkbox&quot;&gt;\n  &lt;input type=&quot;checkbox&quot; class=&quot;spectrum-Checkbox-input&quot; id=&quot;checkbox-0&quot;&gt;\n  &lt;span class=&quot;spectrum-Checkbox-box&quot;&gt;\n    &lt;svg class=&quot;spectrum-Icon spectrum-UIIcon-CheckmarkSmall spectrum-Checkbox-checkmark&quot; focusable=&quot;false&quot; aria-hidden=&quot;true&quot;&gt;\n      &lt;use xlink:href=&quot;#spectrum-css-icon-CheckmarkSmall&quot; /&gt;\n    &lt;/svg&gt;\n    &lt;svg class=&quot;spectrum-Icon spectrum-UIIcon-DashSmall spectrum-Checkbox-partialCheckmark&quot; focusable=&quot;false&quot; aria-hidden=&quot;true&quot;&gt;\n      &lt;use xlink:href=&quot;#spectrum-css-icon-DashSmall&quot; /&gt;\n    &lt;/svg&gt;\n  &lt;/span&gt;\n  &lt;span class=&quot;spectrum-Checkbox-label&quot;&gt;Checkbox&lt;/span&gt;\n&lt;/label&gt;</code-example>\n<p class=\"spectrum-Body3\">into this code in our component&#39;s render method (actually implementation is\nslightly different):</p>\n<code-example class=\"language-javascript\">return html`\n        &lt;label id=&quot;root&quot;&gt;\n            &lt;input\n                id=&quot;input&quot;\n                type=&quot;checkbox&quot;\n                ?checked=${this.checked}\n                @change=${this.handleChange}\n            &lt;span id=&quot;box&quot;&gt;\n                &lt;sp-icon\n                    id=&quot;checkmark&quot;\n                    size=&quot;s&quot;\n                    name=&quot;ui:CheckmarkSmall&quot;\n                    aria-hidden=&quot;true&quot;\n                &gt;&lt;/sp-icon&gt;\n                &lt;sp-icon\n                    id=&quot;partialCheckmark&quot;\n                    size=&quot;s&quot;\n                    name=&quot;ui:DashSmall&quot;\n                    aria-hidden=&quot;true&quot;\n                &gt;&lt;/sp-icon&gt;\n            &lt;/span&gt;\n            &lt;span id=&quot;label&quot;&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/span&gt;\n        &lt;/label&gt;\n    `;</code-example>\n<p class=\"spectrum-Body3\">You will notice that many of the <code>spectrum-css</code> classes are mapped to ids in the\nweb component. For example, <code>.spectrum-Checkbox-input</code> and\n<code>.spectrum-Checkbox-box</code> become <code>#input</code> and <code>#box</code>. Those transformations are\ndescribed in the <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/checkbox/spectrum-config.js#L43-L64\" class=\"spectrum-Link\"><code>ids</code> section of the <code>spectrum-config.js</code>\nfile</a>.</p>\n<code-example class=\"language-javascript\">    ids: [\n        {\n            selector: &#39;.spectrum-Checkbox-input&#39;,\n            name: &#39;input&#39;,\n        },\n        {\n            selector: &#39;.spectrum-Checkbox-box&#39;,\n            name: &#39;box&#39;,\n        },\n        {\n            selector: &#39;.spectrum-Checkbox-checkmark&#39;,\n            name: &#39;checkmark&#39;,\n        },\n        {\n            selector: &#39;.spectrum-Checkbox-partialCheckmark&#39;,\n            name: &#39;partialCheckmark&#39;,\n        },\n        {\n            selector: &#39;.spectrum-Checkbox-label&#39;,\n            name: &#39;label&#39;,\n        },\n    ],</code-example>\n<h3 id=\"properties-and-attributes\" class=\"spectrum-Heading3\">Properties and Attributes</h3>\n<p class=\"spectrum-Body3\">Most of our controls have options that affect how they are rendered. For\nexample, Spectrum supports a number of different kinds of buttons (e.g primary,\nsecondary or call-to-action). <code>spectrum-css</code> supports these visual styles using\nCSS classes. In web components, we typically support these options using\nattributes/properties on the component. For example, here is a call-to-action\nstyle button.</p>\n<code-example class=\"language-html\">&lt;sp-button variant=&quot;cta&quot;&gt;CTA&lt;/sp-button&gt;</code-example>\n<p class=\"spectrum-Body3\">We could conditionally add CSS classes to the elements of the shadow DOM during\nrendering, but it is much easier to just let the attributes on the DOM node\ndrive the styling directly. In order to facilitate that, the\n<a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js#L23-L47\" class=\"spectrum-Link\"><code>spectrum-config.js</code> file lets you specify how to map the various\n<code>spectrum-css</code> classes to CSS that is based on the attributes on the <code>:host</code> of\nthe web\ncomponent</a>.</p>\n<code-example class=\"language-javascript\">    attributes: [\n        {\n            type: &#39;boolean&#39;,\n            selector: &#39;.spectrum-Button--quiet&#39;,\n        },\n        {\n            type: &#39;boolean&#39;,\n            selector: &#39;:disabled&#39;,\n        },\n        {\n            type: &#39;enum&#39;,\n            name: &#39;variant&#39;,\n            values: [\n                &#39;.spectrum-Button--cta&#39;,\n                &#39;.spectrum-Button--primary&#39;,\n                &#39;.spectrum-Button--secondary&#39;,\n                {\n                    name: &#39;negative&#39;,\n                    selector: &#39;.spectrum-Button--warning&#39;,\n                },\n                &#39;.spectrum-Button--overBackground&#39;,\n                &#39;.spectrum-Button--secondary&#39;,\n            ],\n        },\n    ],</code-example>\n<p class=\"spectrum-Body3\">We support two different kinds of attributes, booleans and enums. Booleans are\nturned on or off by the presence or absence of the attribute. Enum attributes\nmust be set to one of the allowed values. The <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-button.css#L204-L212\" class=\"spectrum-Link\">CSS generated will reference the\nattributes on the <code>host:</code> element\ndirectly</a>.</p>\n<h3 id=\"class-to-class-mapping\" class=\"spectrum-Heading3\">Class to Class Mapping</h3>\n<p class=\"spectrum-Body3\">In some cases, you will need to retain the <code>spectrum-css</code> classes as classes. An\nexample of that is when you need to apply CSS rules to multiple items in the\nshadow DOM. In that case, we simply map class names to shorter classnames. There\nis an <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/slider/spectrum-config.js#L91-L96\" class=\"spectrum-Link\">example of remapping classes in the slider\ncomponent</a>.</p>\n<code-example class=\"language-javacript\">    classes: [\n        {\n            selector: &#39;.spectrum-Slider-track&#39;,\n            name: &#39;track&#39;,\n        },\n    ],</code-example>\n<h3 id=\"slots\" class=\"spectrum-Heading3\">Slots</h3>\n<p class=\"spectrum-Body3\"><a href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot\" class=\"spectrum-Link\">Slot tags</a> are\nhow we host our child content (light DOM) in our component&#39;s shadow DOM. The\n<code>spectrum-css</code> for a component sometimes contains rules for laying out the child\ncontent. There is a <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js#L49-L54\" class=\"spectrum-Link\"><code>slots</code>\nsection</a>\nin the <code>spectrum-config.js</code> file for mapping those rules to the slotted content.</p>\n<code-example class=\"language-javascript\">    slots: [\n        {\n            name: &#39;icon&#39;,\n            selector: &#39;.spectrum-Icon&#39;,\n        },\n    ],</code-example>\n<p class=\"spectrum-Body3\">The above section tells our CSS processor to map CSS for the <code>.spectrum-Icon</code>\nclass to the content that is being hosted in the <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-button.css#L148-L158\" class=\"spectrum-Link\">slot with the name\n<code>icon</code></a>.</p>\n<h2 id=\"coding-the-component\" class=\"spectrum-Heading2--quiet\">Coding the Component</h2>\n<hr class=\"spectrum-Rule spectrum-Rule--large\">\n<p class=\"spectrum-Body3\">All of the <code>spectrum-web-components</code> are written using the\n<a href=\"https://lit-element.polymer-project.org/guide\" class=\"spectrum-Link\">lit-element</a> framework and\n<a href=\"https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html\" class=\"spectrum-Link\">Typescript</a>.\nYour best bet is to look at <a href=\"https://github.com/adobe/spectrum-web-components/tree/master/src\" class=\"spectrum-Link\">similar\ncomponents</a>\nand match the style.</p>\n<p class=\"spectrum-Body3\">We have a working specification for the APIs for each of the Spectrum components.\nIf you file an issue for the component that you want to implement, we can provide\nthe necessary specifications for it.</p>\n<h3 id=\"documenting-the-component\" class=\"spectrum-Heading3\">Documenting the component</h3>\n<p class=\"spectrum-Body3\">Each component should have a page in the documentation system. The pages are\nwritten in <a href=\"https://www.markdownguide.org/cheat-sheet\" class=\"spectrum-Link\">Markdown</a>. See one of\nthe <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/documentation/components/button.md\" class=\"spectrum-Link\">existing pages</a> for an example.</p>\n<p class=\"spectrum-Body3\">To run the local documentation server, use the command:</p>\n<code-example>npm run docs:start</code-example><p class=\"spectrum-Body3\">The documentation automatically extracts the properties and attributes from the\nsource code. You should document your component using the <a href=\"https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc\" class=\"spectrum-Link\">appropriate jsdoc\ntags</a>.\nSee\n<a href=\"https://github.com/adobe/spectrum-web-components/blob/master/src/button/button.ts\" class=\"spectrum-Link\">button.ts</a>\nfor an example.</p>\n<h3 id=\"working-with-storybook\" class=\"spectrum-Heading3\">Working with Storybook</h3>\n<p class=\"spectrum-Body3\">We use <a href=\"https://storybook.js.org/\" class=\"spectrum-Link\">Storybook</a> for developing our components.\nThis gives us a rapid way to test our components in various configurations. The\nbest way to start is to copy <a href=\"https://github.com/adobe/spectrum-web-components/blob/master/stories/button.stories.ts\" class=\"spectrum-Link\">one of the existing\nstories</a>.</p>\n<p class=\"spectrum-Body3\">To run Storybook, use the command:</p>\n<code-example>npm run storybook</code-example>";

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "<div class=\"spectrum-Article\"><h1 class=\"spectrum-Heading1\">Specification for .spectrum-config.js files</h1></div>\n<p class=\"spectrum-Body3\">The following is an annotated example that serves to document the format\nof the spectrum-config.js file. A higher-level explanation may be found\n<a href=\"/guides/adding-component\" class=\"spectrum-Link\">here</a>.</p>\n<h2 id=\"annotated-sample\" class=\"spectrum-Heading2--quiet\">Annotated Sample</h2>\n<hr class=\"spectrum-Rule spectrum-Rule--large\">\n<code-example class=\"language-javascript\">module.exports = {\n    // This is the name that the component has in spectrum-css. If you look\n    // in node_modules/@adobe/spectrum-css/dist/components, what is the name\n    // of the directory that contains the CSS for the component that you are\n    // implementing\n    spectrum: &#39;button&#39;,\n    // A list of the components that we would like to generate CSS for. We can\n    // generate CSS for multiple related components (e.g button and action button)\n    components: [\n        {\n            // The basename for this component. This will control the naming of the\n            // generated CSS file\n            name: &#39;button&#39;,\n            // Information about the main CSS class for this component. This is the\n            // name of the CSS class in the spectrum-css file that relates to this\n            // component (e.g. .spectrum-Button). You can optionally provide a\n            // shadowSelector which will allow you to map the rules to an element\n            // in your shadow DOM. The default selector for the CSS rules is :host.\n            // If you are mapping to the default host: selector then you can\n            // simply say &quot;host: &#39;.spectrum-Button&#39;&quot;\n            host: {\n                // The selector from spectrum-css for the root of the component\n                selector: &#39;.spectrum-Button&#39;,\n                // The selector in the shadow DOM to map to (defaults to :host)\n                shadowSelector: &#39;#button&#39;,\n            },\n            // For components that can receive focus, this is the element in the\n            // shadow DOM that should receive focus\n            focus: &#39;#button&#39;,\n            // These are the options for the component that are set using attributes\n            // on the web component (e.g. quiet in &lt;sp-button quiet&gt;Click me&lt;/sp-button&gt;)\n            attributes: [\n                // Attributes may have a boolean type. In that case, if the attribute\n                // is present, the option is true\n                {\n                    // Type of the attribute\n                    type: &#39;boolean&#39;,\n                    // The selector whos rules should come into effect when the\n                    // option is true\n                    selector: &#39;.spectrum-Button--quiet&#39;,\n                },\n                {\n                    type: &#39;boolean&#39;,\n                    // An example of mapping a pseudo attribute to an attribute\n                    // on the web component\n                    selector: &#39;:disabled&#39;,\n                },\n                // Attributes may also be of type enum. In that case, there is\n                // usually a list of CSS classes in spectrum-css, of which only\n                // one should be present at a time.\n                {\n                    type: &#39;enum&#39;,\n                    // For enums, we need to provide a name here for the attribute\n                    // as it is defined in the implementation of the component\n                    name: &#39;variant&#39;,\n                    // This is a list of possible values for the attribute. If\n                    // the option is of the form &quot;.spectrum-Button--cta&quot; where\n                    // &quot;.spectrum-Button&quot; is the root CSS class, then we can extract\n                    // the enum value name automatically\n                    values: [\n                        // This related the enum value &lt;sp-button variant=&quot;cta&quot;&gt;\n                        &#39;.spectrum-Button--cta&#39;,\n                        &#39;.spectrum-Button--primary&#39;,\n                        &#39;.spectrum-Button--secondary&#39;,\n                        // If for some reason, we need to override the enum\n                        // values name, we can provide an object with the\n                        // selector and name explicitly\n                        {\n                            name: &#39;negative&#39;,\n                            selector: &#39;.spectrum-Button--warning&#39;,\n                        },\n                        &#39;.spectrum-Button--overBackground&#39;,\n                        &#39;.spectrum-Button--secondary&#39;,\n                    ],\n                },\n            ],\n            // This is a list of all of the spectrum-css class names that we\n            // wish to map to ids in the shadow DOM.\n            ids: [\n                // If the class name follows the patter of starting with the\n                // root class, then we can extract the id automatically. In this\n                // case it would be #label\n                &#39;.spectrum-Button-label&#39;,\n                // We can also explicitly provide the selector and the name\n                {\n                    selector: &#39;.spectrum-Button-label&#39;,\n                    name: &#39;label&#39;\n                }\n            ],\n            // We can provide a list of classes that we wish to map. It is\n            // preferred to use ids when possible. There are some cases\n            // where it is necessary to use a set CSS rules on multiple\n            // components in the shadow DOM. In that case, you should map\n            // the spectrum-css class to a shorter name\n            classes: [\n                {\n                    // Classname in the original spectrum-css\n                    selector: &#39;.spectrum-Slider-track&#39;,\n                    // New name to use. This will create the class .track\n                    name: &#39;track&#39;,\n                },\n            ],\n            // A list of slots on our web component that we wish to apply\n            // spectrum-css rules to\n            slots: [\n                {\n                    // The name of the slot (e.g. &lt;slot name=&quot;icon&quot;&gt;)\n                    name: &#39;icon&#39;,\n                    // The spectrum-css selector who&#39;s rules we wish to apply\n                    selector: &#39;.spectrum-Icon&#39;,\n                },\n            ],\n            // Regular expressions for rules that we wish to exclude from our\n            // processing. There are rules that do not make sense in a web\n            // component, and it is good form to keep our CSS as small as\n            // possible\n            exclude: [/\\.is-disabled/],\n        },\n        {\n            // A second component specification in the same file\n            name: &#39;action-button&#39;,\n            host: {\n                selector: &#39;.spectrum-ActionButton&#39;,\n                shadowSelector: &#39;#button&#39;,\n            },\n            ...\n        }\n    ],\n};</code-example>\n";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(36);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(38)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(37)(false);
// Module
exports.push([module.i, "/*\nCopyright 2018 Adobe. All rights reserved.\nThis file is licensed to you under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License. You may obtain a copy\nof the License at http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software distributed under\nthe License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\nOF ANY KIND, either express or implied. See the License for the specific language\ngoverning permissions and limitations under the License.\n*/\n\n:root,\nbody {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    margin: 0;\n}\n", ""]);



/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(39);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  } // blank or null?


  if (!css || typeof css !== "string") {
    return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"); // convert each url(...)

  /*
  This regular expression is just a way to recursively match brackets within
  a string.
  	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
     (  = Start a capturing group
       (?:  = Start a non-capturing group
           [^)(]  = Match anything that isn't a parentheses
           |  = OR
           \(  = Match a start parentheses
               (?:  = Start another non-capturing groups
                   [^)(]+  = Match anything that isn't a parentheses
                   |  = OR
                   \(  = Match a start parentheses
                       [^)(]*  = Match anything that isn't a parentheses
                   \)  = Match a end parentheses
               )  = End Group
               *\) = Match anything and then a close parens
           )  = Close non-capturing group
           *  = Match anything
        )  = Close capturing group
   \)  = Match a close parens
  	 /gi  = Get all matches, not the first.  Be case insensitive.
   */

  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
    // strip quotes (if they exist)
    var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
      return $1;
    }).replace(/^'(.*)'$/, function (o, $1) {
      return $1;
    }); // already a full url? no change

    if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
      return fullMatch;
    } // convert the url to a full url


    var newUrl;

    if (unquotedOrigUrl.indexOf("//") === 0) {
      //TODO: should we add protocol?
      newUrl = unquotedOrigUrl;
    } else if (unquotedOrigUrl.indexOf("/") === 0) {
      // path should be relative to the base url
      newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
    } else {
      // path should be relative to current directory
      newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
    } // send back the fixed url(...)


    return "url(" + JSON.stringify(newUrl) + ")";
  }); // send back the fixed css

  return fixedCss;
};

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var icons_medium_namespaceObject = {};
__webpack_require__.r(icons_medium_namespaceObject);
__webpack_require__.d(icons_medium_namespaceObject, "IconsMedium", function() { return icons_medium_IconsMedium; });
var src_namespaceObject = {};
__webpack_require__.r(src_namespaceObject);
__webpack_require__.d(src_namespaceObject, "IconsMedium", function() { return icons_medium_IconsMedium; });
__webpack_require__.d(src_namespaceObject, "IconsetSVG", function() { return iconset_svg_IconsetSVG; });
__webpack_require__.d(src_namespaceObject, "defineCustomElement", function() { return defineCustomElement; });
__webpack_require__.d(src_namespaceObject, "defineCustomElements", function() { return defineCustomElements; });
__webpack_require__.d(src_namespaceObject, "strictCustomEvent", function() { return strictCustomEvent; });
__webpack_require__.d(src_namespaceObject, "Banner", function() { return banner_Banner; });
__webpack_require__.d(src_namespaceObject, "Button", function() { return button_Button; });
__webpack_require__.d(src_namespaceObject, "ActionButton", function() { return action_button_ActionButton; });
__webpack_require__.d(src_namespaceObject, "Card", function() { return card_Card; });
__webpack_require__.d(src_namespaceObject, "Checkbox", function() { return checkbox_Checkbox; });
__webpack_require__.d(src_namespaceObject, "Dropzone", function() { return dropzone_Dropzone; });
__webpack_require__.d(src_namespaceObject, "IllustratedMessage", function() { return illustrated_message_IllustratedMessage; });
__webpack_require__.d(src_namespaceObject, "Link", function() { return link_Link; });
__webpack_require__.d(src_namespaceObject, "Radio", function() { return radio_Radio; });
__webpack_require__.d(src_namespaceObject, "RadioGroup", function() { return radio_group_RadioGroup; });
__webpack_require__.d(src_namespaceObject, "Slider", function() { return slider_Slider; });
__webpack_require__.d(src_namespaceObject, "Icon", function() { return icon_Icon; });
__webpack_require__.d(src_namespaceObject, "IconsLarge", function() { return icons_large_IconsLarge; });
__webpack_require__.d(src_namespaceObject, "Iconset", function() { return iconset_Iconset; });
__webpack_require__.d(src_namespaceObject, "IconsetRegistry", function() { return iconset_registry_IconsetRegistry; });
__webpack_require__.d(src_namespaceObject, "SideNav", function() { return sidenav_SideNav; });
__webpack_require__.d(src_namespaceObject, "SideNavItem", function() { return sidenav_item_SideNavItem; });
__webpack_require__.d(src_namespaceObject, "SideNavHeading", function() { return sidenav_heading_SideNavHeading; });
__webpack_require__.d(src_namespaceObject, "Switch", function() { return switch_Switch; });
__webpack_require__.d(src_namespaceObject, "Tab", function() { return tab_Tab; });
__webpack_require__.d(src_namespaceObject, "TabList", function() { return tab_list_TabList; });
__webpack_require__.d(src_namespaceObject, "ThemeDark", function() { return theme_dark_ThemeDark; });
__webpack_require__.d(src_namespaceObject, "ScaleMedium", function() { return scale_medium_ScaleMedium; });
__webpack_require__.d(src_namespaceObject, "OverlayRoot", function() { return overlay_root_OverlayRoot; });
__webpack_require__.d(src_namespaceObject, "OverlayTrigger", function() { return overlay_trigger_OverlayTrigger; });
__webpack_require__.d(src_namespaceObject, "Popover", function() { return popover_Popover; });

// EXTERNAL MODULE: ./node_modules/lit-element/lit-element.js + 5 modules
var lit_element = __webpack_require__(0);

// CONCATENATED MODULE: ./src/banner/banner.css

const styles = lit_element["b" /* css */]`
:host{display:inline-block;border-radius:var(--spectrum-banner-border-radius,8px);padding:var(--spectrum-banner-padding-y,4px) var(--spectrum-banner-padding-x,8px);font-size:var(--spectrum-banner-text-size,var(--spectrum-global-dimension-size-150));line-height:var(--spectrum-banner-text-line-height,1.3);color:var(--spectrum-banner-text-color,#fff)}#header{font-weight:700}:host([corner]){position:absolute;top:-10px;right:-10px}:host([type=info]){background-color:var(--spectrum-banner-info-background-color,var(--spectrum-global-color-blue-500))}:host([type=warning]){background-color:var(--spectrum-banner-warning-background-color,var(--spectrum-global-color-orange-500))}:host([type=error]){background-color:var(--spectrum-banner-error-background-color,var(--spectrum-global-color-red-500))}
`;
/* harmony default export */ var banner = (styles);
// CONCATENATED MODULE: ./src/banner/banner.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/**
 * Banner component
 *
 * @attr type - Determines the style, can be "info", "warning", or "error". Default is "info"
 * @attr corner - Determines if banner sets position at upper right corner or not.
 *
 * @slot header - Primary message of the banner.
 * @slot content - Secondary message of the banner. Used to provide a description.
 */

class banner_Banner extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.type = 'info';
    this.corner = false;
  }

  static get styles() {
    return [banner];
  }

  render() {
    return lit_element["d" /* html */]`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `;
  }

}

__decorate([Object(lit_element["e" /* property */])({
  reflect: true,
  type: String
})], banner_Banner.prototype, "type", void 0);

__decorate([Object(lit_element["e" /* property */])({
  reflect: true,
  type: Boolean
})], banner_Banner.prototype, "corner", void 0);
// CONCATENATED MODULE: ./src/banner/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-banner')) {
  customElements.define('sp-banner', banner_Banner);
}
// CONCATENATED MODULE: ./src/shared/focusable.ts
var focusable_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



/**
 * Focusable base class handles tabindex setting into shadowed elements automatically.
 *
 * This implementation is based heavily on the aybolit delegate-focus-mixin at
 * https://github.com/web-padawan/aybolit/blob/master/packages/core/src/mixins/delegate-focus-mixin.js
 */

class focusable_Focusable extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    /**
     * Disable this control. It will not receive focus or events
     */

    this.disabled = false;
    /**
     * When this control is rendered, focus it automatically
     */

    this.autofocus = false;
    /**
     * The tab index to apply to this control. See general documentation about
     * the tabindex HTML property
     */

    this.tabIndex = 0;
    this.isShiftTabbing = false;
  }

  get focusElement() {
    throw new Error('Must implement focusElement getter!');
  }

  focus() {
    if (this.disabled) {
      return;
    }

    this.focusElement.focus();
  }

  blur() {
    this.focusElement.blur();
  }

  firstUpdated() {
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }

    if (this.autofocus) {
      this.focus();
    }

    this.addEventListener('focusin', event => {
      if (event.composedPath()[0] === this) {
        this.handleFocus();
      }
    });
    this.addEventListener('keydown', event => {
      if (!event.defaultPrevented && event.shiftKey && event.keyCode === 9) {
        this.isShiftTabbing = true;
        HTMLElement.prototype.focus.apply(this);
        setTimeout(() => this.isShiftTabbing = false, 0);
      }
    });
  }

  update(changedProperties) {
    if (changedProperties.has('disabled')) {
      this.handleDisabledChanged(this.disabled, changedProperties.get('disabled'));
    }

    if (changedProperties.has('tabIndex')) {
      // save value of tabindex, as it can be overridden to
      // undefined in case if the element is disabled
      this.newTabindex = this.tabIndex;
      this.handleTabIndexChanged(this.tabIndex);
    }

    super.update(changedProperties);
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      if (this.focusElement instanceof HTMLInputElement) {
        this.focusElement.disabled = this.disabled;
      }

      if (this.disabled) {
        this.blur();
      }
    }

    if (changedProperties.has('tabIndex') && this.newTabindex !== undefined) {
      this.focusElement.tabIndex = this.newTabindex;
      this.newTabindex = undefined;
    }
  }

  handleFocus() {
    if (this.isShiftTabbing) {
      return;
    }

    this.focusElement.focus();
  }

  handleDisabledChanged(disabled, oldDisabled) {
    if (disabled) {
      this.oldTabindex = this.tabIndex;
      this.tabIndex = -1;
      this.setAttribute('aria-disabled', 'true');
    } else if (oldDisabled) {
      if (this.oldTabindex !== undefined) {
        this.tabIndex = this.oldTabindex;
      }

      this.removeAttribute('aria-disabled');
    }
  }

  handleTabIndexChanged(tabindex) {
    if (this.disabled && tabindex) {
      if (this.tabIndex !== -1) {
        this.oldTabindex = this.tabIndex;
      }

      this.tabIndex = -1;
    }
  }

}

focusable_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], focusable_Focusable.prototype, "disabled", void 0);

focusable_decorate([Object(lit_element["e" /* property */])({
  type: Boolean
})], focusable_Focusable.prototype, "autofocus", void 0);

focusable_decorate([Object(lit_element["e" /* property */])({
  type: Number,
  reflect: true
})], focusable_Focusable.prototype, "tabIndex", void 0);
// CONCATENATED MODULE: ./src/button/button-base.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var button_base_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class button_base_ButtonBase extends focusable_Focusable {
  constructor() {
    super(...arguments);
    this.iconRight = false;
  }

  get hasIcon() {
    return !!this.querySelector('[slot="icon"]');
  }

  get focusElement() {
    if (this.shadowRoot) {
      return this.shadowRoot.querySelector('#button');
    }

    return this;
  }

  get buttonContent() {
    const icon = lit_element["d" /* html */]`
            <slot name="icon"></slot>
        `;
    const content = [lit_element["d" /* html */]`
                <div id="label"><slot></slot></div>
            `];

    if (!this.hasIcon) {
      return content;
    }

    this.iconRight ? content.push(icon) : content.unshift(icon);
    return content;
  }

  render() {
    return this.href && this.href.length > 0 ? lit_element["d" /* html */]`
                  <a href="${this.href}" id="button">
                      ${this.buttonContent}
                  </a>
              ` : lit_element["d" /* html */]`
                  <button id="button">${this.buttonContent}</button>
              `;
  }

}

button_base_decorate([Object(lit_element["e" /* property */])()], button_base_ButtonBase.prototype, "href", void 0);

button_base_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true,
  attribute: 'icon-right'
})], button_base_ButtonBase.prototype, "iconRight", void 0);
// CONCATENATED MODULE: ./src/button/button.css

const button_styles = lit_element["b" /* css */]`
#button{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;overflow:visible;margin:0;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;vertical-align:top;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;text-decoration:none;font-family:adobe-clean,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.3;cursor:pointer;border-width:var(--spectrum-button-primary-border-size,2px);border-style:solid;border-radius:var(--spectrum-button-primary-border-radius,var(--spectrum-global-dimension-size-200));min-height:var(--spectrum-button-primary-height,var(--spectrum-global-dimension-size-400));height:auto;min-width:var(--spectrum-button-primary-min-width,var(--spectrum-button-cta-min-width));padding:var(--spectrum-global-dimension-size-50) calc(var(--spectrum-button-primary-padding-x,
var(--spectrum-global-dimension-size-200)) - var(--spectrum-button-primary-border-size, 2px));padding-bottom:calc(var(--spectrum-global-dimension-size-50) + .5px);padding-top:calc(var(--spectrum-global-dimension-size-50) - .5px);font-size:var(--spectrum-button-primary-text-size,var(--spectrum-global-dimension-font-size-150));font-weight:var(--spectrum-button-primary-text-font-weight,700)}#button:focus{outline:none;box-shadow:0 0 0 var(--spectrum-button-primary-border-size-increase-key-focus,1px) var(--spectrum-button-primary-border-color-key-focus,#1473e6)}#button::-moz-focus-inner{border:0;border-style:none;padding:0;margin-top:-2px;margin-bottom:-2px}#button:-moz-focusring{outline:1px dotted ButtonText}:host([disabled]) #button{cursor:default}::slotted([slot=icon]){max-height:100%;flex-shrink:0}#button:active,#button:hover{box-shadow:none}slot[name=icon]+#label{margin-left:var(--spectrum-button-primary-text-gap,var(--spectrum-global-dimension-size-100))}#label+::slotted([slot=icon]){margin-left:calc(var(--spectrum-button-primary-text-gap,
var(--spectrum-global-dimension-size-100))/2)}#label{align-self:center;justify-self:center;width:100%}#label:empty{display:none}#button:active{box-shadow:none}:host([variant=cta]) #button{background-color:var(--spectrum-button-cta-background-color,#1473e6);border-color:var(--spectrum-button-cta-border-color,#1473e6);color:var(--spectrum-button-cta-text-color,#fff)}:host([variant=cta]) #button:hover{background-color:var(--spectrum-button-cta-background-color-hover,#0d66d0);border-color:var(--spectrum-button-cta-border-color-hover,#0d66d0);color:var(--spectrum-button-cta-text-color-hover,#fff)}:host([variant=cta]) #button:focus{background-color:var(--spectrum-button-cta-background-color-key-focus,#1473e6);border-color:var(--spectrum-button-cta-border-color-key-focus,#1473e6);color:var(--spectrum-button-cta-text-color-key-focus,#fff)}:host([variant=cta]) #button:active{background-color:var(--spectrum-button-cta-background-color-down,#0d66d0);border-color:var(--spectrum-button-cta-border-color-down,#0d66d0);color:var(--spectrum-button-cta-text-color-down,#fff)}:host([variant=cta][disabled]) #button{background-color:var(--spectrum-button-cta-background-color-disabled,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-button-cta-border-color-disabled,var(--spectrum-global-color-gray-200));color:var(--spectrum-button-cta-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([variant=primary]) #button{background-color:var(--spectrum-button-primary-background-color,transparent);border-color:var(--spectrum-button-primary-border-color,var(--spectrum-global-color-gray-800));color:var(--spectrum-button-primary-text-color,var(--spectrum-global-color-gray-800))}:host([variant=primary]) #button:hover{background-color:var(--spectrum-button-primary-background-color-hover,var(--spectrum-global-color-gray-800));border-color:var(--spectrum-button-primary-border-color-hover,var(--spectrum-global-color-gray-800));color:var(--spectrum-button-primary-text-color-hover,var(--spectrum-global-color-gray-50))}:host([variant=primary]) #button:focus{background-color:var(--spectrum-button-primary-background-color-key-focus,#1473e6);border-color:var(--spectrum-button-primary-border-color-key-focus,#1473e6);color:var(--spectrum-button-primary-text-color-key-focus,#fff)}:host([variant=primary]) #button:active{background-color:var(--spectrum-button-primary-background-color-down,var(--spectrum-global-color-gray-900));border-color:var(--spectrum-button-primary-border-color-down,var(--spectrum-global-color-gray-900));color:var(--spectrum-button-primary-text-color-down,var(--spectrum-global-color-gray-50))}:host([variant=primary][disabled]) #button{background-color:var(--spectrum-button-primary-background-color-disabled,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-button-primary-border-color-disabled,var(--spectrum-global-color-gray-200));color:var(--spectrum-button-primary-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([variant=secondary]) #button{background-color:var(--spectrum-button-secondary-background-color,transparent);border-color:var(--spectrum-button-secondary-border-color,var(--spectrum-global-color-gray-700));color:var(--spectrum-button-secondary-text-color,var(--spectrum-global-color-gray-700))}:host([variant=secondary]) #button:hover{background-color:var(--spectrum-button-secondary-background-color-hover,var(--spectrum-global-color-gray-700));border-color:var(--spectrum-button-secondary-border-color-hover,var(--spectrum-global-color-gray-700));color:var(--spectrum-button-secondary-text-color-hover,var(--spectrum-global-color-gray-50))}:host([variant=secondary]) #button:focus{background-color:var(--spectrum-button-secondary-background-color-key-focus,#1473e6);border-color:var(--spectrum-button-secondary-border-color-key-focus,#1473e6);color:var(--spectrum-button-secondary-text-color-key-focus,#fff)}:host([variant=secondary]) #button:active{background-color:var(--spectrum-button-secondary-background-color-down,var(--spectrum-global-color-gray-800));border-color:var(--spectrum-button-secondary-border-color-down,var(--spectrum-global-color-gray-800));color:var(--spectrum-button-secondary-text-color-down,var(--spectrum-global-color-gray-50))}:host([variant=secondary][disabled]) #button{background-color:var(--spectrum-button-secondary-background-color-disabled,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-button-secondary-border-color-disabled,var(--spectrum-global-color-gray-200));color:var(--spectrum-button-secondary-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([variant=negative]) #button{background-color:var(--spectrum-button-warning-background-color,transparent);border-color:var(--spectrum-button-warning-border-color,var(--spectrum-global-color-red-600));color:var(--spectrum-button-warning-text-color,var(--spectrum-global-color-red-600))}:host([variant=negative]) #button:hover{background-color:var(--spectrum-button-warning-background-color-hover,var(--spectrum-global-color-red-600));border-color:var(--spectrum-button-warning-border-color-hover,var(--spectrum-global-color-red-600));color:var(--spectrum-button-warning-text-color-hover,var(--spectrum-global-color-gray-50))}:host([variant=negative]) #button:focus{background-color:var(--spectrum-button-warning-background-color-key-focus,#1473e6);border-color:var(--spectrum-button-warning-border-color-key-focus,#1473e6);color:var(--spectrum-button-warning-text-color-key-focus,#fff)}:host([variant=negative]) #button:active{background-color:var(--spectrum-button-warning-background-color-down,var(--spectrum-global-color-red-700));border-color:var(--spectrum-button-warning-border-color-down,var(--spectrum-global-color-red-700));color:var(--spectrum-button-warning-text-color-down,var(--spectrum-global-color-gray-50))}:host([variant=negative][disabled]) #button{background-color:var(--spectrum-button-warning-background-color-disabled,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-button-warning-border-color-disabled,var(--spectrum-global-color-gray-200));color:var(--spectrum-button-warning-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([variant=overBackground]) #button{background-color:var(--spectrum-button-over-background-background-color,transparent);border-color:var(--spectrum-button-over-background-border-color,#fff);color:var(--spectrum-button-over-background-text-color,#fff)}:host([variant=overBackground]) #button:hover{background-color:var(--spectrum-button-over-background-background-color-hover,#fff);border-color:var(--spectrum-button-over-background-border-color-hover,#fff);color:inherit}:host([variant=overBackground]) #button:focus{background-color:var(--spectrum-button-over-background-background-color-key-focus,#fff);border-color:var(--spectrum-button-over-background-border-color-key-focus,#fff);color:inherit;box-shadow:0 0 0 var(--spectrum-button-primary-border-size-increase-key-focus,1px) var(--spectrum-button-over-background-border-color-key-focus,#fff)}:host([variant=overBackground]) #button:active{background-color:var(--spectrum-button-over-background-background-color-down,#fff);border-color:var(--spectrum-button-over-background-border-color-down,#fff);color:inherit;box-shadow:none}:host([variant=overBackground][disabled]) #button{background-color:var(--spectrum-button-over-background-background-color-disabled,hsla(0,0%,100%,.1));border-color:var(--spectrum-button-over-background-border-color-disabled,transparent);color:var(--spectrum-button-over-background-text-color-disabled,hsla(0,0%,100%,.35))}:host([variant=overBackground][quiet]) #button{background-color:var(--spectrum-button-quiet-over-background-background-color,transparent);border-color:var(--spectrum-button-quiet-over-background-border-color,transparent);color:var(--spectrum-button-quiet-over-background-text-color,#fff)}:host([variant=overBackground][quiet]) #button:hover{background-color:var(--spectrum-button-quiet-over-background-background-color-hover,hsla(0,0%,100%,.1));border-color:var(--spectrum-button-quiet-over-background-border-color-hover,transparent);color:var(--spectrum-button-quiet-over-background-text-color-hover,#fff)}:host([variant=overBackground][quiet]) #button:focus{background-color:var(--spectrum-button-quiet-over-background-background-color-key-focus,#fff);border-color:var(--spectrum-button-quiet-over-background-border-color-key-focus,#fff);color:inherit;box-shadow:0 0 0 var(--spectrum-button-primary-border-size-increase-key-focus,1px) var(--spectrum-button-quiet-over-background-border-color-key-focus,#fff)}:host([variant=overBackground][quiet]) #button:active{background-color:var(--spectrum-button-quiet-over-background-background-color-down,hsla(0,0%,100%,.15));border-color:var(--spectrum-button-quiet-over-background-border-color-down,transparent);color:var(--spectrum-button-quiet-over-background-text-color-down,#fff);box-shadow:none}:host([variant=overBackground][quiet][disabled]) #button{background-color:var(--spectrum-button-quiet-over-background-background-color-disabled,transparent);border-color:var(--spectrum-button-quiet-over-background-border-color-disabled,transparent);color:var(--spectrum-button-quiet-over-background-text-color-disabled,hsla(0,0%,100%,.15))}:host([variant=primary][quiet]) #button{background-color:var(--spectrum-button-quiet-primary-background-color,transparent);border-color:var(--spectrum-button-quiet-primary-border-color,transparent);color:var(--spectrum-button-quiet-primary-text-color,var(--spectrum-global-color-gray-800))}:host([variant=primary][quiet]) #button:hover{background-color:var(--spectrum-button-quiet-primary-background-color-hover,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-button-quiet-primary-border-color-hover,var(--spectrum-global-color-gray-200));color:var(--spectrum-button-quiet-primary-text-color-hover,var(--spectrum-global-color-gray-900))}:host([variant=primary][quiet]) #button:focus{background-color:var(--spectrum-button-quiet-primary-background-color-key-focus,#1473e6);border-color:var(--spectrum-button-quiet-primary-border-color-key-focus,#1473e6);color:var(--spectrum-button-quiet-primary-text-color-key-focus,#fff)}:host([variant=primary][quiet]) #button:active{background-color:var(--spectrum-button-quiet-primary-background-color-down,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-button-quiet-primary-border-color-down,var(--spectrum-global-color-gray-300));color:var(--spectrum-button-quiet-primary-text-color-down,var(--spectrum-global-color-gray-900))}:host([variant=primary][quiet][disabled]) #button{background-color:var(--spectrum-button-quiet-primary-background-color-disabled,transparent);border-color:var(--spectrum-button-quiet-primary-border-color-disabled,transparent);color:var(--spectrum-button-quiet-primary-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([variant=secondary][quiet]) #button{background-color:var(--spectrum-button-quiet-secondary-background-color,transparent);border-color:var(--spectrum-button-quiet-secondary-border-color,transparent);color:var(--spectrum-button-quiet-secondary-text-color,var(--spectrum-global-color-gray-700))}:host([variant=secondary][quiet]) #button:hover{background-color:var(--spectrum-button-quiet-secondary-background-color-hover,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-button-quiet-secondary-border-color-hover,var(--spectrum-global-color-gray-200));color:var(--spectrum-button-quiet-secondary-text-color-hover,var(--spectrum-global-color-gray-800))}:host([variant=secondary][quiet]) #button:focus{background-color:var(--spectrum-button-quiet-secondary-background-color-key-focus,#1473e6);border-color:var(--spectrum-button-quiet-secondary-border-color-key-focus,#1473e6);color:var(--spectrum-button-quiet-secondary-text-color-key-focus,#fff)}:host([variant=secondary][quiet]) #button:active{background-color:var(--spectrum-button-quiet-secondary-background-color-down,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-button-quiet-secondary-border-color-down,var(--spectrum-global-color-gray-300));color:var(--spectrum-button-quiet-secondary-text-color-down,var(--spectrum-global-color-gray-800))}:host([variant=secondary][quiet][disabled]) #button{background-color:var(--spectrum-button-quiet-secondary-background-color-disabled,transparent);border-color:var(--spectrum-button-quiet-secondary-border-color-disabled,transparent);color:var(--spectrum-button-quiet-secondary-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([variant=negative][quiet]) #button{background-color:var(--spectrum-button-quiet-warning-background-color,transparent);border-color:var(--spectrum-button-quiet-warning-border-color,transparent);color:var(--spectrum-button-quiet-warning-text-color,var(--spectrum-global-color-red-500))}:host([variant=negative][quiet]) #button:hover{background-color:var(--spectrum-button-quiet-warning-background-color-hover,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-button-quiet-warning-border-color-hover,var(--spectrum-global-color-gray-200));color:var(--spectrum-button-quiet-warning-text-color-hover,var(--spectrum-global-color-red-600))}:host([variant=negative][quiet]) #button:focus{background-color:var(--spectrum-button-quiet-warning-background-color-key-focus,#1473e6);border-color:var(--spectrum-button-quiet-warning-border-color-key-focus,#1473e6);color:var(--spectrum-button-quiet-warning-text-color-key-focus,#fff)}:host([variant=negative][quiet]) #button:active{background-color:var(--spectrum-button-quiet-warning-background-color-down,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-button-quiet-warning-border-color-down,var(--spectrum-global-color-gray-300));color:var(--spectrum-button-quiet-warning-text-color-down,var(--spectrum-global-color-red-600))}:host([variant=negative][quiet][disabled]) #button{background-color:var(--spectrum-button-quiet-warning-background-color-disabled,transparent);border-color:var(--spectrum-button-quiet-warning-border-color-disabled,transparent);color:var(--spectrum-button-quiet-warning-text-color-disabled,var(--spectrum-global-color-gray-500))}:host{display:inline-flex;flex-direction:row}#button{display:flex;flex:1 1 auto;-webkit-appearance:none}#button:focus,:host(:focus){outline:none}:host([disabled]){pointer-events:none}slot[name=icon]::slotted(svg){fill:currentColor;stroke:currentColor;width:var(--spectrum-alias-workflow-icon-size,18px);height:var(--spectrum-alias-workflow-icon-size,18px)}
`;
/* harmony default export */ var button_button = (button_styles);
// CONCATENATED MODULE: ./src/button/button.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var button_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/**
 * A Spectrum button control.
 * @element sp-button
 */

class button_Button extends button_base_ButtonBase {
  constructor() {
    super(...arguments);
    /**
     * The visual variant to apply to this button.
     */

    this.variant = 'cta';
    /**
     * There is a warning in place for this control
     */

    this.warning = false;
    /**
     * Style this button to be less obvious
     */

    this.quiet = false;
  }

  static get styles() {
    return [button_button];
  }

}

button_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], button_Button.prototype, "variant", void 0);

button_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], button_Button.prototype, "warning", void 0);

button_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], button_Button.prototype, "quiet", void 0);
// CONCATENATED MODULE: ./src/button/action-button.css

const action_button_styles = lit_element["b" /* css */]`
#button{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;overflow:visible;margin:0;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;vertical-align:top;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;text-decoration:none;font-family:adobe-clean,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.3;cursor:pointer;position:relative;height:var(--spectrum-actionbutton-height,var(--spectrum-global-dimension-size-400));min-width:var(--spectrum-actionbutton-min-width,var(--spectrum-global-dimension-size-400));padding:0 calc(var(--spectrum-actionbutton-icon-padding-x,
var(--spectrum-global-dimension-size-85)) - var(--spectrum-actionbutton-border-size, 1px));border-radius:var(--spectrum-actionbutton-border-radius,var(--spectrum-global-dimension-size-50));font-size:var(--spectrum-actionbutton-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-actionbutton-text-font-weight,400);background-color:var(--spectrum-actionbutton-background-color,var(--spectrum-global-color-gray-75));border:var(--spectrum-actionbutton-border-size,1px) solid var(--spectrum-actionbutton-border-color,var(--spectrum-global-color-gray-300));color:var(--spectrum-actionbutton-text-color,var(--spectrum-global-color-gray-800))}#button:focus{outline:none;background-color:var(--spectrum-actionbutton-background-color-key-focus,var(--spectrum-global-color-gray-50));border-color:var(--spectrum-actionbutton-border-color-key-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 var(--spectrum-button-primary-border-size-increase-key-focus,1px) var(--spectrum-actionbutton-border-color-key-focus,var(--spectrum-global-color-blue-400));color:var(--spectrum-actionbutton-text-color-key-focus,var(--spectrum-global-color-gray-900))}#button::-moz-focus-inner{border:0;border-style:none;padding:0;margin-top:-2px;margin-bottom:-2px}#button:-moz-focusring{outline:1px dotted ButtonText}:host([disabled]) #button{cursor:default;background-color:var(--spectrum-actionbutton-background-color-disabled,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-border-color-disabled,var(--spectrum-global-color-gray-200));color:var(--spectrum-actionbutton-text-color-disabled,var(--spectrum-global-color-gray-500))}.spectrum-Icon{max-height:100%;flex-shrink:0;color:var(--spectrum-actionbutton-icon-color,var(--spectrum-global-color-gray-700))}.spectrum-Icon+#label{padding-left:var(--spectrum-actionbutton-icon-padding-x,var(--spectrum-global-dimension-size-85));padding-right:calc(var(--spectrum-actionbutton-text-padding-x,
var(--spectrum-global-dimension-size-150)) - var(--spectrum-actionbutton-icon-padding-x,
var(--spectrum-global-dimension-size-85)))}.spectrum-Icon--sizeS:only-child{position:absolute;top:calc(50% - var(--spectrum-actionbutton-icon-size,
var(--spectrum-global-dimension-size-225))/2);left:calc(50% - var(--spectrum-actionbutton-icon-size,
var(--spectrum-global-dimension-size-225))/2)}#label:only-child{padding:0 calc(var(--spectrum-actionbutton-text-padding-x,
var(--spectrum-global-dimension-size-150)) - var(--spectrum-actionbutton-icon-padding-x,
var(--spectrum-global-dimension-size-85)))}#hold-affordance{position:absolute;right:var(--spectrum-actionbutton-hold-icon-padding-right,var(--spectrum-global-dimension-size-40));bottom:var(--spectrum-actionbutton-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-40));color:var(--spectrum-actionbutton-hold-icon-color,var(--spectrum-global-color-gray-700))}#label{align-self:center;justify-self:center;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#label:empty{display:none}:host([quiet]) #button{border-width:var(--spectrum-actionbutton-quiet-border-size,1px);border-radius:var(--spectrum-actionbutton-quiet-border-radius,var(--spectrum-global-dimension-size-50));font-size:var(--spectrum-actionbutton-quiet-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-actionbutton-quiet-text-font-weight,400);background-color:var(--spectrum-actionbutton-quiet-background-color,transparent);border-color:var(--spectrum-actionbutton-quiet-border-color,transparent);color:var(--spectrum-actionbutton-quiet-text-color,var(--spectrum-global-color-gray-800))}#button:hover{background-color:var(--spectrum-actionbutton-background-color-hover,var(--spectrum-global-color-gray-50));border-color:var(--spectrum-actionbutton-border-color-hover,var(--spectrum-global-color-gray-400));box-shadow:none;color:var(--spectrum-actionbutton-text-color-hover,var(--spectrum-global-color-gray-900))}#button:hover .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-hover,var(--spectrum-global-color-gray-900))}#button:hover #hold-affordance{color:var(--spectrum-actionbutton-hold-icon-color-hover,var(--spectrum-global-color-gray-900))}#button:focus .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-key-focus,var(--spectrum-global-color-gray-900))}#button:focus #hold-affordance{color:var(--spectrum-actionbutton-hold-icon-color-key-focus,var(--spectrum-global-color-gray-900))}#button:active{background-color:var(--spectrum-actionbutton-background-color-down,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-border-color-down,var(--spectrum-global-color-gray-400));box-shadow:none;color:var(--spectrum-actionbutton-text-color-down,var(--spectrum-global-color-gray-900))}#button:active #hold-affordance{color:var(--spectrum-actionbutton-hold-icon-color-down,var(--spectrum-global-color-gray-900))}:host([disabled]) #button .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-disabled,var(--spectrum-global-color-gray-400))}:host([disabled]) #button #hold-affordance{color:var(--spectrum-actionbutton-hold-icon-color-disabled,var(--spectrum-global-color-gray-400))}:host([selected]) #button{background-color:var(--spectrum-actionbutton-background-color-selected,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-border-color-selected,var(--spectrum-global-color-gray-300));color:var(--spectrum-actionbutton-text-color-selected,var(--spectrum-global-color-gray-800))}:host([selected]) #button .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-selected,var(--spectrum-global-color-gray-700))}:host([selected]) #button:focus{background-color:var(--spectrum-actionbutton-background-color-selected-key-focus,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-border-color-selected-key-focus,var(--spectrum-global-color-blue-400));color:var(--spectrum-actionbutton-text-color-selected-key-focus,var(--spectrum-global-color-gray-900))}:host([selected]) #button:focus .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-selected-key-focus,var(--spectrum-global-color-gray-900))}:host([selected]) #button:hover{background-color:var(--spectrum-actionbutton-background-color-selected-hover,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-border-color-selected-hover,var(--spectrum-global-color-gray-400));color:var(--spectrum-actionbutton-text-color-selected-hover,var(--spectrum-global-color-gray-900))}:host([selected]) #button:hover .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-selected-hover,var(--spectrum-global-color-gray-900))}:host([selected]) #button:active{background-color:var(--spectrum-actionbutton-background-color-selected-down,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-border-color-selected-down,var(--spectrum-global-color-gray-400));color:var(--spectrum-actionbutton-text-color-selected-down,var(--spectrum-global-color-gray-900))}:host([selected]) #button:active .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-selected-down,var(--spectrum-global-color-gray-900))}:host([selected][disabled]) #button{background-color:var(--spectrum-actionbutton-background-color-selected-disabled,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-border-color-selected-disabled,var(--spectrum-global-color-gray-200));color:var(--spectrum-actionbutton-text-color-selected-disabled,var(--spectrum-global-color-gray-500))}:host([selected][disabled]) #button .spectrum-Icon{color:var(--spectrum-actionbutton-icon-color-selected-disabled,var(--spectrum-global-color-gray-400))}:host([quiet]) #button:hover{background-color:var(--spectrum-actionbutton-quiet-background-color-hover,transparent);border-color:var(--spectrum-actionbutton-quiet-border-color-hover,transparent);color:var(--spectrum-actionbutton-quiet-text-color-hover,var(--spectrum-global-color-gray-900));box-shadow:none}:host([quiet]) #button:focus{background-color:var(--spectrum-actionbutton-quiet-background-color-key-focus,transparent);box-shadow:0 0 0 var(--spectrum-actionbutton-quiet-border-size-key-focus,2px) var(--spectrum-actionbutton-quiet-border-color-key-focus,var(--spectrum-global-color-blue-400));border-color:var(--spectrum-actionbutton-quiet-border-color-key-focus,var(--spectrum-global-color-blue-400));color:var(--spectrum-actionbutton-quiet-text-color-key-focus,var(--spectrum-global-color-gray-900))}:host([quiet]) #button:active{background-color:var(--spectrum-actionbutton-quiet-background-color-down,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-actionbutton-quiet-border-color-down,var(--spectrum-global-color-gray-300));color:var(--spectrum-actionbutton-quiet-text-color-down,var(--spectrum-global-color-gray-900));box-shadow:none}:host([quiet][disabled]) #button{background-color:var(--spectrum-actionbutton-quiet-background-color-disabled,transparent);border-color:var(--spectrum-actionbutton-quiet-border-color-disabled,transparent);color:var(--spectrum-actionbutton-quiet-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([quiet][selected]) #button{background-color:var(--spectrum-actionbutton-quiet-background-color-selected,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-actionbutton-quiet-border-color-selected,var(--spectrum-global-color-gray-300));color:var(--spectrum-actionbutton-quiet-text-color-selected,var(--spectrum-global-color-gray-800))}:host([quiet][selected]) #button:focus{background-color:var(--spectrum-actionbutton-quiet-background-color-selected-key-focus,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-actionbutton-quiet-border-color-selected-key-focus,var(--spectrum-global-color-blue-400));color:var(--spectrum-actionbutton-quiet-text-color-selected-key-focus,var(--spectrum-global-color-gray-900))}:host([quiet][selected]) #button:hover{background-color:var(--spectrum-actionbutton-quiet-background-color-selected-hover,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-actionbutton-quiet-border-color-selected-hover,var(--spectrum-global-color-gray-300));color:var(--spectrum-actionbutton-quiet-text-color-selected-hover,var(--spectrum-global-color-gray-900))}:host([quiet][selected]) #button:active{background-color:var(--spectrum-actionbutton-quiet-background-color-selected-down,var(--spectrum-global-color-gray-300));border-color:var(--spectrum-actionbutton-quiet-border-color-selected-down,var(--spectrum-global-color-gray-300));color:var(--spectrum-actionbutton-quiet-text-color-selected-down,var(--spectrum-global-color-gray-900))}:host([quiet][selected][disabled]) #button{background-color:var(--spectrum-actionbutton-quiet-background-color-selected-disabled,var(--spectrum-global-color-gray-200));border-color:var(--spectrum-actionbutton-quiet-border-color-selected-disabled,var(--spectrum-global-color-gray-200));color:var(--spectrum-actionbutton-quiet-text-color-selected-disabled,var(--spectrum-global-color-gray-500))}:host{display:inline-flex;flex-direction:row}#button{display:flex;flex:1 1 auto;-webkit-appearance:none}#button:focus,:host(:focus){outline:none}:host([disabled]){pointer-events:none}slot[name=icon]::slotted(svg){fill:currentColor;stroke:currentColor;width:var(--spectrum-alias-workflow-icon-size,18px);height:var(--spectrum-alias-workflow-icon-size,18px)}
`;
/* harmony default export */ var action_button = (action_button_styles);
// CONCATENATED MODULE: ./src/button/action-button.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var action_button_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class action_button_ActionButton extends button_base_ButtonBase {
  constructor() {
    super(...arguments);
    this.quiet = false;
    this.selected = false;
    this.holdAffordance = false;
  }

  static get styles() {
    return [action_button];
  }

}

action_button_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], action_button_ActionButton.prototype, "quiet", void 0);

action_button_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], action_button_ActionButton.prototype, "selected", void 0);

action_button_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true,
  attribute: 'hold-affordance'
})], action_button_ActionButton.prototype, "holdAffordance", void 0);
// CONCATENATED MODULE: ./src/button/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/





if (!customElements.get('sp-action-button')) {
  customElements.define('sp-action-button', action_button_ActionButton);
}

if (!customElements.get('sp-button')) {
  customElements.define('sp-button', button_Button);
}
// CONCATENATED MODULE: ./src/card/card.css

const card_styles = lit_element["b" /* css */]`
:host{position:relative;display:inline-flex;flex-direction:column;box-sizing:border-box;min-width:var(--spectrum-card-min-width,var(--spectrum-global-dimension-size-3000));border-color:transparent;border-radius:var(--spectrum-card-border-radius,var(--spectrum-global-dimension-size-50));border:var(--spectrum-card-border-size,1px) solid var(--spectrum-card-border-color,var(--spectrum-global-color-gray-200));background-color:var(--spectrum-card-background-color,var(--spectrum-global-color-gray-50))}:host(:focus){outline:none}:host(.is-focused) #actions,:host(.is-focused) .spectrum-Card-quickActions,:host(:focus) #actions,:host(:focus) .spectrum-Card-quickActions,:host(:hover) #actions,:host(:hover) .spectrum-Card-quickActions,:host([selected]) #actions,:host([selected]) .spectrum-Card-quickActions{visibility:visible;opacity:1;pointer-events:all}#actions{right:var(--spectrum-card-actions-margin,var(--spectrum-global-dimension-size-125));top:var(--spectrum-card-actions-margin,var(--spectrum-global-dimension-size-125))}#actions,.spectrum-Card-quickActions{position:absolute;height:var(--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500));visibility:hidden}.spectrum-Card-quickActions{left:var(--spectrum-card-checkbox-margin,var(--spectrum-global-dimension-size-200));top:var(--spectrum-card-checkbox-margin,var(--spectrum-global-dimension-size-200));width:var(--spectrum-quickactions-height,var(--spectrum-global-dimension-size-500))}.spectrum-Card-quickActions .spectrum-Checkbox{margin:0}::slotted([slot=cover-photo]){height:var(--spectrum-card-coverphoto-height,var(--spectrum-global-dimension-size-1700));box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-bottom-color:transparent;border-radius:calc(var(--spectrum-card-border-radius,
var(--spectrum-global-dimension-size-50)) - 1px) calc(var(--spectrum-card-border-radius,
var(--spectrum-global-dimension-size-50)) - 1px) 0 0;background-size:cover;background-position:50%;background-color:var(--spectrum-card-coverphoto-background-color,var(--spectrum-global-color-gray-200));border-bottom:var(--spectrum-card-coverphoto-border-bottom-size,1px) solid var(--spectrum-card-coverphoto-border-color,var(--spectrum-global-color-gray-200))}#body{padding:var(--spectrum-card-body-padding-top,var(--spectrum-global-dimension-size-250)) var(--spectrum-card-body-padding-right,var(--spectrum-global-dimension-size-300)) var(--spectrum-card-body-padding-bottom,var(--spectrum-global-dimension-size-250)) var(--spectrum-card-body-padding-left,var(--spectrum-global-dimension-size-300))}#body:last-child{border-radius:0 0 var(--spectrum-card-border-radius,var(--spectrum-global-dimension-size-50)) var(--spectrum-card-border-radius,var(--spectrum-global-dimension-size-50))}::slotted([slot=preview]){overflow:hidden;border-radius:calc(var(--spectrum-card-border-radius,
var(--spectrum-global-dimension-size-50)) - 1px) calc(var(--spectrum-card-border-radius,
var(--spectrum-global-dimension-size-50)) - 1px) 0 0}#header{height:var(--spectrum-card-body-header-height,var(--spectrum-global-dimension-size-225));display:flex;align-items:baseline}#content{display:flex;height:var(--spectrum-card-body-content-height,var(--spectrum-global-dimension-size-175));margin-top:var(--spectrum-card-body-content-margin-top,var(--spectrum-global-dimension-size-75))}#title{font-size:var(--spectrum-card-title-text-size,var(--spectrum-global-dimension-font-size-100));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:var(--spectrum-card-title-padding-right,var(--spectrum-global-dimension-size-100))}#subtitle{letter-spacing:var(--spectrum-card-subtitle-letter-spacing,.06em);text-transform:uppercase;padding-right:var(--spectrum-card-subtitle-padding-right,var(--spectrum-global-dimension-size-100))}#subtitle,::slotted([slot=description]){font-size:var(--spectrum-card-subtitle-text-size,var(--spectrum-global-dimension-font-size-50))}::slotted([slot=description]){color:var(--spectrum-card-description-text-color,var(--spectrum-global-color-gray-700))}#subtitle+slot[name=description]:before{content:"•";padding-right:var(--spectrum-card-subtitle-padding-right,var(--spectrum-global-dimension-size-100))}::slotted([slot=footer]){padding-top:var(--spectrum-card-footer-padding-top,var(--spectrum-global-dimension-size-175));margin-right:var(--spectrum-card-body-padding-right,var(--spectrum-global-dimension-size-300));padding-bottom:var(--spectrum-card-body-padding-bottom,var(--spectrum-global-dimension-size-250));margin-left:var(--spectrum-card-body-padding-left,var(--spectrum-global-dimension-size-300));border-top:var(--spectrum-card-footer-border-top-size,1px) solid;border-color:var(--spectrum-card-border-color,var(--spectrum-global-color-gray-200))}.spectrum-Card-actionButton{flex:1;align-self:center;display:flex;justify-content:flex-end}:host([variant=gallery]),:host([variant=quiet]){width:100%;height:100%;min-width:var(--spectrum-card-quiet-min-size,var(--spectrum-global-dimension-size-1700));border-width:0;border-radius:0;overflow:visible}:host([variant=gallery]) ::slotted([slot=preview]),:host([variant=quiet]) ::slotted([slot=preview]){width:100%;flex:1;min-height:var(--spectrum-card-quiet-min-size,var(--spectrum-global-dimension-size-1700));padding:var(--spectrum-card-quiet-preview-padding,var(--spectrum-global-dimension-size-250));margin:0 auto;box-sizing:border-box;border-radius:var(--spectrum-card-quiet-border-radius,var(--spectrum-global-dimension-size-50));position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s);overflow:visible}:host([variant=gallery]) ::slotted([slot=preview]):before,:host([variant=quiet]) ::slotted([slot=preview]):before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;border:var(--spectrum-card-quiet-border-size,1px) solid transparent}:host([variant=gallery][drop-target]) ::slotted([slot=preview]),:host([variant=quiet][drop-target]) ::slotted([slot=preview]){transition:none}:host([variant=gallery]) #header,:host([variant=quiet]) #header{height:var(--spectrum-card-quiet-body-header-height,var(--spectrum-global-dimension-size-225));margin-top:var(--spectrum-card-quiet-body-header-margin-top,var(--spectrum-global-dimension-size-175))}:host([variant=gallery]) #body,:host([variant=quiet]) #body{padding:0}.spectrum-Card--small{min-width:var(--spectrum-card-quiet-small-min-size,var(--spectrum-global-dimension-size-900))}.spectrum-Card--small .spectrum-Card-quickActions{left:var(--spectrum-card-quiet-small-checkbox-margin,var(--spectrum-global-dimension-size-125));top:var(--spectrum-card-quiet-small-checkbox-margin,var(--spectrum-global-dimension-size-125))}.spectrum-Card--small ::slotted([slot=preview]){padding:var(--spectrum-card-quiet-small-preview-padding,var(--spectrum-global-dimension-size-150));min-height:var(--spectrum-card-quiet-small-min-size,var(--spectrum-global-dimension-size-900))}.spectrum-Card--small #header{margin-top:var(--spectrum-card-quiet-small-body-margin-top,var(--spectrum-global-dimension-size-100));height:var(--spectrum-card-quiet-small-body-header-height,var(--spectrum-global-dimension-size-150))}.spectrum-Card--small #title{font-size:var(--spectrum-card-quiet-small-title-text-size,var(--spectrum-global-dimension-font-size-100))}:host([variant=gallery]){min-width:0}:host([variant=gallery]) ::slotted([slot=preview]){padding:0;border-radius:0}:host(:hover){border-color:var(--spectrum-card-border-color-hover,var(--spectrum-global-color-gray-400))}:host(:focus),:host([drop-target]),:host([selected]){border-color:var(--spectrum-card-border-color-key-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 1px var(--spectrum-card-border-color-key-focus,var(--spectrum-global-color-blue-400))}:host([drop-target]){background-color:var(--spectrum-alias-highlight-selected)}:host([variant=gallery]),:host([variant=quiet]){border-color:transparent;background-color:initial}:host([variant=gallery]) ::slotted([slot=preview]),:host([variant=quiet]) ::slotted([slot=preview]){background-color:var(--spectrum-card-quiet-preview-background-color,var(--spectrum-global-color-gray-200))}:host([variant=gallery]) :hover,:host([variant=quiet]) :hover{border-color:transparent}:host([variant=gallery]) :hover ::slotted([slot=preview]),:host([variant=quiet]) :hover ::slotted([slot=preview]){background-color:var(--spectrum-card-quiet-preview-background-color-hover,var(--spectrum-global-color-gray-300))}:host([variant=gallery]) :focus,:host([variant=gallery][selected]),:host([variant=quiet]) :focus,:host([variant=quiet][selected]){border-color:transparent;box-shadow:none}:host([variant=gallery]) :focus ::slotted([slot=preview]),:host([variant=gallery][selected]) ::slotted([slot=preview]),:host([variant=quiet]) :focus ::slotted([slot=preview]),:host([variant=quiet][selected]) ::slotted([slot=preview]){background-color:var(--spectrum-card-quiet-preview-background-color,var(--spectrum-global-color-gray-200))}:host([variant=gallery]) :focus ::slotted([slot=preview]):before,:host([variant=gallery][selected]) ::slotted([slot=preview]):before,:host([variant=quiet]) :focus ::slotted([slot=preview]):before,:host([variant=quiet][selected]) ::slotted([slot=preview]):before{border-color:var(--spectrum-card-quiet-border-color-selected,var(--spectrum-global-color-blue-500));box-shadow:0 0 0 1px var(--spectrum-card-quiet-border-color-selected,var(--spectrum-global-color-blue-500))}:host([variant=gallery][drop-target]),:host([variant=quiet][drop-target]){border-color:transparent;background-color:initial;box-shadow:none}:host([variant=gallery][drop-target]) ::slotted([slot=preview]),:host([variant=quiet][drop-target]) ::slotted([slot=preview]){background-color:var(--spectrum-alias-highlight-selected)}:host([variant=gallery][drop-target]) ::slotted([slot=preview]):before,:host([variant=quiet][drop-target]) ::slotted([slot=preview]):before{border-color:var(--spectrum-card-quiet-border-color-selected,var(--spectrum-global-color-blue-500));box-shadow:0 0 0 1px var(--spectrum-card-quiet-border-color-selected,var(--spectrum-global-color-blue-500))}:host([variant=gallery][drop-target]) .spectrum-Asset-fileBackground,:host([variant=gallery][drop-target]) .spectrum-Asset-folderBackground,:host([variant=quiet][drop-target]) .spectrum-Asset-fileBackground,:host([variant=quiet][drop-target]) .spectrum-Asset-folderBackground{fill:var(--spectrum-alias-highlight-selected)}:host([variant=gallery][drop-target]) .spectrum-Asset-fileOutline,:host([variant=gallery][drop-target]) .spectrum-Asset-folderOutline,:host([variant=quiet][drop-target]) .spectrum-Asset-fileOutline,:host([variant=quiet][drop-target]) .spectrum-Asset-folderOutline{fill:var(--spectrum-card-quiet-border-color-selected,var(--spectrum-global-color-blue-500))}:host([variant=gallery]) #title,:host([variant=quiet]) #title{color:var(--spectrum-card-quiet-title-text-color,var(--spectrum-global-color-gray-800))}:host([variant=gallery]) #subtitle,:host([variant=quiet]) #subtitle{color:var(--spectrum-card-quiet-subtitle-text-color,var(--spectrum-global-color-gray-700))}slot[name=cover-photo]::slotted(*),slot[name=preview]::slotted(*){object-fit:cover}slot[name=description]{font-size:var(--spectrum-card-subtitle-text-size,var(--spectrum-global-dimension-font-size-50))}
`;
/* harmony default export */ var card = (card_styles);
// CONCATENATED MODULE: ./src/card/card.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var card_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/**
 * @slot preview - This is the preview image for Gallery Cards
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot description - A description of the card
 * @slot footer - Footer text
 */

class card_Card extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.variant = 'default';
    this.title = '';
    this.subtitle = '';
  }

  static get styles() {
    return [card];
  }

  renderGallery() {
    return lit_element["d" /* html */]`
            <slot name="preview"></slot>
            <div id="body">
                <div id="header">
                    <div id="title">${this.title}</div>
                    <div id="subtitle">${this.subtitle}</div>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
  }

  renderQuiet() {
    return lit_element["d" /* html */]`
            <slot name="preview"></slot>
            <div id="body">
                <div id="header"><div id="title">${this.title}</div></div>
                <div id="content">
                    <div id="subtitle">${this.subtitle}</div>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
  }

  renderDefault() {
    return lit_element["d" /* html */]`
            <slot name="cover-photo" id="cover-photo"></slot>
            <div id="body">
                <div id="header">
                    <div id="title">${this.title}</div>
                </div>
                <div id="content">
                    <div id="subtitle">${this.subtitle}</div>
                </div>
            </div>
            <div id="footer"><slot name="footer"></slot></div>
        `;
  }

  render() {
    switch (this.variant) {
      case 'gallery':
        return this.renderGallery();

      case 'quiet':
        return this.renderQuiet();

      default:
        return this.renderDefault();
    }
  }

}

card_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], card_Card.prototype, "variant", void 0);

card_decorate([Object(lit_element["e" /* property */])()], card_Card.prototype, "title", void 0);

card_decorate([Object(lit_element["e" /* property */])()], card_Card.prototype, "subtitle", void 0);
// CONCATENATED MODULE: ./src/card/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-card')) {
  customElements.define('sp-card', card_Card);
}
// CONCATENATED MODULE: ./src/checkbox/checkbox-base.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var checkbox_base_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class checkbox_base_CheckboxBase extends focusable_Focusable {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.quiet = false;
  }

  get focusElement() {
    return this.inputElement;
  }

  handleChange(event) {
    this.checked = this.inputElement.checked; // Change events from the shadow DOM are not transmitted into
    // the parent light DOM

    const changeEvent = new CustomEvent('change', {
      detail: {
        sourceEvent: event
      },
      bubbles: event.bubbles,
      cancelable: event.cancelable
    });
    this.dispatchEvent(changeEvent);
  }

  render() {
    return lit_element["d" /* html */]`
            <input
                id="input"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `;
  }

}

checkbox_base_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], checkbox_base_CheckboxBase.prototype, "checked", void 0);

checkbox_base_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], checkbox_base_CheckboxBase.prototype, "quiet", void 0);

checkbox_base_decorate([Object(lit_element["f" /* query */])('#input')], checkbox_base_CheckboxBase.prototype, "inputElement", void 0);
// CONCATENATED MODULE: ./src/checkbox/checkbox.css

const checkbox_styles = lit_element["b" /* css */]`
#root{display:inline-flex;align-items:flex-start;position:relative;min-height:var(--spectrum-checkbox-height,var(--spectrum-global-dimension-size-400));max-width:100%;margin-right:calc(var(--spectrum-checkbox-cursor-hit-x,
var(--spectrum-global-dimension-size-100))*2);vertical-align:top;border-color:var(--spectrum-checkbox-box-border-color,var(--spectrum-global-color-gray-600))}#input{font-family:inherit;font-size:100%;line-height:1.15;margin:0;overflow:visible;box-sizing:border-box;padding:0;position:absolute;top:0;left:calc(var(--spectrum-checkbox-cursor-hit-x,
var(--spectrum-global-dimension-size-100))*-1);width:calc(100% + var(--spectrum-checkbox-cursor-hit-x,
var(--spectrum-global-dimension-size-100))*2);height:100%;opacity:.0001;z-index:1;cursor:pointer}:host([disabled]) #input{cursor:default}#input:checked+#box{border-width:calc(var(--spectrum-checkbox-box-size,
var(--spectrum-global-dimension-size-175))/2)}#input:checked+#box #checkmark{transform:scale(1);opacity:1}:host([indeterminate]) #root #box,:host([indeterminate]) #root #input:checked+#box{border-width:calc(var(--spectrum-checkbox-box-size,
var(--spectrum-global-dimension-size-175))/2)}:host([indeterminate]) #root #box #checkmark,:host([indeterminate]) #root #input:checked+#box #checkmark{display:none}:host([indeterminate]) #root #box #partialCheckmark,:host([indeterminate]) #root #input:checked+#box #partialCheckmark{display:block;transform:scale(1);opacity:1}#label{margin-left:var(--spectrum-checkbox-text-gap,var(--spectrum-global-dimension-size-125));font-size:var(--spectrum-checkbox-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-checkbox-text-font-weight,400);transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;margin-top:var(--spectrum-global-dimension-size-75);color:var(--spectrum-checkbox-text-color,var(--spectrum-global-color-gray-800))}#box{position:relative;box-sizing:border-box;width:var(--spectrum-checkbox-box-size,var(--spectrum-global-dimension-size-175));height:var(--spectrum-checkbox-box-size,var(--spectrum-global-dimension-size-175));margin:calc((var(--spectrum-checkbox-height,
var(--spectrum-global-dimension-size-400)) - var(--spectrum-checkbox-box-size,
var(--spectrum-global-dimension-size-175)))/2) 0;flex-grow:0;flex-shrink:0;border-radius:var(--spectrum-checkbox-box-border-radius,2px);transition:border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;border:var(--spectrum-checkbox-box-border-size,2px) solid var(--spectrum-checkbox-box-border-color,var(--spectrum-global-color-gray-600));background-color:var(--spectrum-checkbox-box-background-color,var(--spectrum-global-color-gray-75))}#checkmark,#partialCheckmark{position:absolute;top:50%;left:50%;margin-top:calc(var(--spectrum-icon-checkmark-small-height,
var(--spectrum-global-dimension-font-size-25))/-2);margin-left:calc(var(--spectrum-icon-checkmark-small-width,
var(--spectrum-global-dimension-font-size-25))/-2);opacity:0;transform:scale(0);transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out}#partialCheckmark{display:none}#checkmark,#partialCheckmark{color:var(--spectrum-checkbox-checkmark-color,var(--spectrum-global-color-gray-75))}#input:checked+#box,:host([indeterminate]) #root #box{border-color:var(--spectrum-checkbox-box-border-color-selected,var(--spectrum-global-color-blue-500))}#root:hover #input:checked+#box,:host([indeterminate]) #root:hover #box{border-color:var(--spectrum-checkbox-box-border-color-selected-hover,var(--spectrum-global-color-blue-600))}#root:active #input:checked+#box,:host([indeterminate]) #root:active #box{border-color:var(--spectrum-checkbox-box-border-color-selected-down,var(--spectrum-global-color-blue-700))}#root:hover #box{border-color:var(--spectrum-checkbox-box-border-color-hover,var(--spectrum-global-color-gray-700));box-shadow:none}#root:hover #label{color:var(--spectrum-checkbox-text-color-hover,var(--spectrum-global-color-gray-900))}#root:active #box{border-color:var(--spectrum-checkbox-box-border-color-down,var(--spectrum-global-color-gray-800))}#root:active #label{color:var(--spectrum-checkbox-text-color-down,var(--spectrum-global-color-gray-900))}:host([disabled]) #input+#box{border-color:var(--spectrum-checkbox-box-border-color-disabled,var(--spectrum-global-color-gray-400))!important;background-color:var(--spectrum-checkbox-box-background-color-disabled,var(--spectrum-global-color-gray-75))}:host([disabled]) #input~#label{color:var(--spectrum-checkbox-text-color-disabled,var(--spectrum-global-color-gray-500))}#input:focus+#box{border-color:var(--spectrum-checkbox-box-border-color-key-focus,var(--spectrum-global-color-blue-400))!important;box-shadow:0 0 0 1px var(--spectrum-checkbox-box-border-color-key-focus,var(--spectrum-global-color-blue-400))!important}#input:focus~#label{color:var(--spectrum-checkbox-text-color-key-focus,var(--spectrum-global-color-blue-600))!important}:host([quiet]) #input:checked+#box,:host([quiet][indeterminate]) #root #box{border-color:var(--spectrum-checkbox-quiet-box-border-color-selected,var(--spectrum-global-color-gray-700))}:host([quiet]) #root:hover #input:checked+#box,:host([quiet][indeterminate]) #root:hover #box{border-color:var(--spectrum-checkbox-quiet-box-border-color-selected-hover,var(--spectrum-global-color-gray-800))}:host([quiet]) #root:active #input:checked+#box,:host([quiet][indeterminate]) #root:active #box{border-color:var(--spectrum-checkbox-quiet-box-border-color-selected-down,var(--spectrum-global-color-gray-900))}:host([invalid]) #root #box,:host([invalid]) #root #input:checked+#box{border-color:var(--spectrum-checkbox-box-border-color-error,var(--spectrum-global-color-red-500))}:host([invalid]) #root #label{color:var(--spectrum-checkbox-text-color-error,var(--spectrum-global-color-red-600))}:host([invalid]) #root:hover #box,:host([invalid]) #root:hover #input:checked+#box{border-color:var(--spectrum-checkbox-box-border-color-error-hover,var(--spectrum-global-color-red-600))}:host([invalid]) #root:hover #label{color:var(--spectrum-checkbox-text-color-error-hover,var(--spectrum-global-color-red-700))}:host([invalid]) #root:active #box,:host([invalid]) #root:active #input:checked+#box{border-color:var(--spectrum-checkbox-box-border-color-error-down,var(--spectrum-global-color-red-700))}:host([invalid]) #root:active #label{color:var(--spectrum-checkbox-text-color-error-down,var(--spectrum-global-color-red-700))}:host{display:inline-flex}#box sp-icon#checkmark,#box sp-icon#partialCheckmark{margin-top:calc(var(---spectrum-alias-workflow-icon-size,
var(--spectrum-global-dimension-size-225))/-2);margin-left:calc(var(--spectrum-alias-workflow-icon-size,
var(--spectrum-global-dimension-size-225))/-2)}#label{overflow:visible}
`;
/* harmony default export */ var checkbox_checkbox = (checkbox_styles);
// CONCATENATED MODULE: ./src/events.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Creates a strictly typed CustomEvent<T> using the DocumentEventMap.
 *
 * To make use of this helper ensure that your events are added to the DocumentEventMap. The
 * easiest way to do this is to include them in the GlobalEventMap
 *
 * @param name The name of the CustomEvent to create
 * @param payload The arguments for the CustomEvent constructor
 */
function strictCustomEvent(name, payload) {
  return new CustomEvent(name, payload);
}
// CONCATENATED MODULE: ./src/iconset/iconset-registry.ts

class iconset_registry_IconsetRegistry {
  constructor() {
    this.iconsetMap = new Map();
  } // singleton getter


  static getInstance() {
    if (!iconset_registry_IconsetRegistry.instance) {
      iconset_registry_IconsetRegistry.instance = new iconset_registry_IconsetRegistry();
    }

    return iconset_registry_IconsetRegistry.instance;
  }

  addIconset(name, iconset) {
    this.iconsetMap.set(name, iconset); // dispatch a sp-iconset-added event on window to let everyone know we have a new iconset
    // note we're using window here for efficiency since we don't need to bubble through the dom since everyone
    // will know where to look for this event

    const event = strictCustomEvent('sp-iconset:added', {
      detail: {
        name,
        iconset
      }
    }); // we're dispatching this event in the next tick to allow the iconset to finish any slotchange or other event
    // listeners caused by connection to the dom and first render to complete, this way any icons listening for
    // this iconset will be able to access the completed iconset

    setTimeout(() => window.dispatchEvent(event), 0);
  }

  removeIconset(name) {
    this.iconsetMap.delete(name); // dispatch a sp-iconset-removed event on window to let everyone know we have a new iconset
    // note we're using window here for efficiency since we don't need to bubble through the dom since everyone
    // will know where to look for this event

    const event = strictCustomEvent('sp-iconset:removed', {
      detail: {
        name
      }
    }); // we're dispatching this event in the next tick To keep the event model consistent with the added event

    setTimeout(() => window.dispatchEvent(event), 0);
  }

  getIconset(name) {
    return this.iconsetMap.get(name);
  }

}
// CONCATENATED MODULE: ./src/icon/icon.css

const icon_styles = lit_element["b" /* css */]`
:host{display:inline-block;color:inherit;fill:currentColor;pointer-events:none}:host(:not(:root)){overflow:hidden}:host([size=xxs]),:host([size=xxs]) img,:host([size=xxs]) svg{height:calc(var(--spectrum-alias-workflow-icon-size,
var(--spectrum-global-dimension-size-225))/2);width:calc(var(--spectrum-alias-workflow-icon-size,
var(--spectrum-global-dimension-size-225))/2)}:host([size=xs]),:host([size=xs]) img,:host([size=xs]) svg{height:calc(var(--spectrum-global-dimension-size-300)/2);width:calc(var(--spectrum-global-dimension-size-300)/2)}:host([size=s]),:host([size=s]) img,:host([size=s]) svg{height:var(--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225));width:var(--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225))}:host([size=m]),:host([size=m]) img,:host([size=m]) svg{height:var(--spectrum-global-dimension-size-300);width:var(--spectrum-global-dimension-size-300)}:host([size=l]),:host([size=l]) img,:host([size=l]) svg{height:calc(var(--spectrum-alias-workflow-icon-size,
var(--spectrum-global-dimension-size-225))*2);width:calc(var(--spectrum-alias-workflow-icon-size,
var(--spectrum-global-dimension-size-225))*2)}:host([size=xl]),:host([size=xl]) img,:host([size=xl]) svg{height:calc(var(--spectrum-global-dimension-size-300)*2);width:calc(var(--spectrum-global-dimension-size-300)*2)}:host([size=xxl]),:host([size=xxl]) img,:host([size=xxl]) svg{height:calc(var(--spectrum-global-dimension-size-300)*3);width:calc(var(--spectrum-global-dimension-size-300)*3)}
`;
/* harmony default export */ var icon_icon = (icon_styles);
// EXTERNAL MODULE: ./node_modules/lit-html/lit-html.js + 1 modules
var lit_html = __webpack_require__(2);

// CONCATENATED MODULE: ./src/icon/icon.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var icon_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class icon_Icon extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.size = 'm';
  }

  static get styles() {
    return [icon_icon];
  }

  connectedCallback() {
    super.connectedCallback(); // start listening for iconset-added and do updateIcon if we get one later

    this.iconsetListener = ev => {
      if (!this.name) {
        return;
      } // parse the icon name to get iconset name


      const icon = this.parseIcon(this.name);

      if (!icon) {
        return;
      }

      if (ev.detail.name === icon.iconset) {
        this.updateIcon();
      }
    };

    window.addEventListener('sp-iconset:added', this.iconsetListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.iconsetListener) {
      window.removeEventListener('sp-iconset:added', this.iconsetListener);
    }
  }

  firstUpdated() {
    this.updateIcon();
  }

  attributeChangedCallback(name, old, value) {
    super.attributeChangedCallback(name, old, value);
    this.updateIcon(); // any of our attributes change, update our icon
  }

  render() {
    return lit_element["d" /* html */]`
            <div id="container">${this.renderIcon()}</div>
        `;
  }

  updateIcon() {
    if (!this.name) {
      return;
    } // parse the icon name to get iconset name


    const icon = this.parseIcon(this.name);

    if (!icon) {
      return;
    } // try to retrieve the iconset


    const iconset = iconset_registry_IconsetRegistry.getInstance().getIconset(icon.iconset);

    if (!iconset) {
      // we can stop here as there's nothing to be done till we get the iconset
      return;
    }

    if (!this.iconContainer) {
      return;
    }

    this.iconContainer.innerHTML = '';
    iconset.applyIconToElement(this.iconContainer, icon.icon, this.size ? this.size : '', this.label ? this.label : '');
  }

  parseIcon(icon) {
    if (!icon) {
      return null;
    }

    const iconParts = icon.split(':');
    let iconsetName = 'default';
    let iconName = icon;

    if (iconParts.length > 1) {
      iconsetName = iconParts[0];
      iconName = iconParts[1];
    }

    return {
      iconset: iconsetName,
      icon: iconName
    };
  }

  renderIcon() {
    // handle src image case
    return lit_element["d" /* html */]`
            ${this.src ? lit_element["d" /* html */]`
                      <img src="${this.src}" />
                  ` : lit_html["e" /* nothing */]}
        `;
  }

}
icon_Icon.is = 'sp-icon';

icon_decorate([Object(lit_element["e" /* property */])()], icon_Icon.prototype, "src", void 0);

icon_decorate([Object(lit_element["e" /* property */])()], icon_Icon.prototype, "name", void 0);

icon_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], icon_Icon.prototype, "size", void 0);

icon_decorate([Object(lit_element["e" /* property */])()], icon_Icon.prototype, "label", void 0);

icon_decorate([Object(lit_element["f" /* query */])('#container')], icon_Icon.prototype, "iconContainer", void 0);
// CONCATENATED MODULE: ./src/icon/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-icon')) {
  customElements.define('sp-icon', icon_Icon);
}
// CONCATENATED MODULE: ./src/checkbox/checkbox.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var checkbox_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class checkbox_Checkbox extends checkbox_base_CheckboxBase {
  constructor() {
    super(...arguments);
    this.indeterminate = false;
    this.invalid = false;
  }

  static get styles() {
    return [checkbox_checkbox];
  }

  render() {
    return lit_element["d" /* html */]`
            <label id="root">
                ${super.render()}
                <span id="box">
                    <sp-icon
                        id="checkmark"
                        size="s"
                        name="ui:CheckmarkSmall"
                        aria-hidden="true"
                    ></sp-icon>
                    <sp-icon
                        id="partialCheckmark"
                        size="s"
                        name="ui:DashSmall"
                        aria-hidden="true"
                    ></sp-icon>
                </span>
                <span id="label"><slot></slot></span>
            </label>
        `;
  }

}

checkbox_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], checkbox_Checkbox.prototype, "indeterminate", void 0);

checkbox_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], checkbox_Checkbox.prototype, "invalid", void 0);
// CONCATENATED MODULE: ./src/checkbox/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-checkbox')) {
  customElements.define('sp-checkbox', checkbox_Checkbox);
}
// CONCATENATED MODULE: ./src/dropzone/dropzone.css

const dropzone_styles = lit_element["b" /* css */]`
:host{text-align:center;border-radius:var(--spectrum-dropzone-border-radius,var(--spectrum-global-dimension-size-50));padding:var(--spectrum-dropzone-padding,var(--spectrum-global-dimension-size-900));border:var(--spectrum-dropzone-border-width,2px) dashed var(--spectrum-dropzone-border-color,var(--spectrum-global-color-gray-300))}:host([dragged]){border-style:solid;border-color:var(--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400));background-color:var(--spectrum-dropzone-background-color-selected-hover,var(--spectrum-alias-highlight-selected))}:host(:focus){outline:0;border-style:dashed;border-color:var(--spectrum-dropzone-border-color,var(--spectrum-global-color-gray-300))}:host(:focus:focus){border-style:solid;border-color:var(--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400))}:host([dragged]) ::slotted(*){color:var(--spectrum-global-color-blue-400)}:host(:focus) ::slotted(*){color:var(--spectrum-global-color-static-gray-500,#bcbcbc)}:host(:focus:focus[dragged]) ::slotted(*){color:var(--spectrum-global-color-blue-400)}:host{display:block;--spectrum-dropzone-illustration-color:var(--spectrum-global-color-static-blue-400)}:host([dragged]) ::slotted(*){--spectrum-global-color-gray-500:var(--spectrum-dropzone-illustration-color)}
`;
/* harmony default export */ var dropzone = (dropzone_styles);
// CONCATENATED MODULE: ./src/dropzone/dropzone.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var dropzone_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/**
 * @slot default - This is the illustrated message slot
 */

class dropzone_Dropzone extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this._dropEffect = 'copy';
    this.isDragged = false;
    this.debouncedDragLeave = null;
  }

  static get styles() {
    return [dropzone];
  }

  get dropEffect() {
    return this._dropEffect;
  }

  set dropEffect(value) {
    if (['copy', 'move', 'link', 'none'].includes(value)) {
      this._dropEffect = value;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('drop', this.onDrop);
    this.addEventListener('dragover', this.onDragOver);
    this.addEventListener('dragleave', this.onDragLeave);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('drop', this.onDrop);
    this.removeEventListener('dragover', this.onDragOver);
    this.removeEventListener('dragleave', this.onDragLeave);
  }

  onDragOver(ev) {
    const shouldAcceptEvent = strictCustomEvent('sp-dropzone:should-accept', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: ev
    }); // dispatch event returns true if preventDefault() is not called

    const shouldAccept = this.dispatchEvent(shouldAcceptEvent);

    if (!ev.dataTransfer) {
      return;
    }

    if (!shouldAccept) {
      ev.dataTransfer.dropEffect = 'none';
      return;
    }

    ev.preventDefault();
    this.clearDebouncedDragLeave();
    this.isDragged = true;
    ev.dataTransfer.dropEffect = this.dropEffect;
    const dragOverEvent = strictCustomEvent('sp-dropzone:dragover', {
      bubbles: true,
      composed: true,
      detail: ev
    });
    this.dispatchEvent(dragOverEvent);
  }

  onDragLeave(ev) {
    this.clearDebouncedDragLeave();
    this.debouncedDragLeave = window.setTimeout(() => {
      if (this.isDragged) {
        this.isDragged = false;
      }

      const dragLeave = strictCustomEvent('sp-dropzone:dragleave', {
        bubbles: true,
        composed: true,
        detail: ev
      });
      this.dispatchEvent(dragLeave);
    }, 100);
  }

  onDrop(ev) {
    ev.preventDefault();
    this.clearDebouncedDragLeave();

    if (this.isDragged) {
      this.isDragged = false;
    }

    const dropEvent = strictCustomEvent('sp-dropzone:drop', {
      bubbles: true,
      composed: true,
      detail: ev
    });
    this.dispatchEvent(dropEvent);
  }

  render() {
    return lit_element["d" /* html */]`
            <slot></slot>
        `;
  }

  clearDebouncedDragLeave() {
    if (this.debouncedDragLeave) {
      clearTimeout(this.debouncedDragLeave);
      this.debouncedDragLeave = null;
    }
  }

}
dropzone_Dropzone.is = 'sp-dropzone';

dropzone_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true,
  attribute: 'dragged'
})], dropzone_Dropzone.prototype, "isDragged", void 0);
// CONCATENATED MODULE: ./src/dropzone/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-dropzone')) {
  customElements.define('sp-dropzone', dropzone_Dropzone);
}
// CONCATENATED MODULE: ./src/illustrated-message/illustrated-message.css

const illustrated_message_styles = lit_element["b" /* css */]`
:host{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}#illustration{margin-bottom:24px;color:var(--spectrum-global-color-gray-500);fill:currentColor;stroke:currentColor}#heading{max-width:500px;margin:0}#description{max-width:500px;margin:4px 0 0;font-style:italic}:host([cta]) #description{font-style:normal}#heading{font-size:var(--spectrum-heading-quiet-2-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-quiet-2-text-font-weight,300);line-height:var(--spectrum-heading-quiet-2-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-2-text-letter-spacing,0);text-transform:var(--spectrum-heading-quiet-2-text-transform,none);margin-top:0;margin-bottom:0}
`;
/* harmony default export */ var illustrated_message = (illustrated_message_styles);
// CONCATENATED MODULE: ./src/illustrated-message/illustrated-message.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var illustrated_message_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/**
 * @slot - The SVG that represents the illustration
 */

class illustrated_message_IllustratedMessage extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.heading = '';
    this.description = '';
  }

  static get styles() {
    return [illustrated_message];
  }

  render() {
    return lit_element["d" /* html */]`
            <div id="illustration"><slot></slot></div>
            <div id="heading">${this.heading}</div>
            <div id="description">${this.description}</div>
        `;
  }

}
illustrated_message_IllustratedMessage.is = 'sp-illustrated-message';

illustrated_message_decorate([Object(lit_element["e" /* property */])()], illustrated_message_IllustratedMessage.prototype, "heading", void 0);

illustrated_message_decorate([Object(lit_element["e" /* property */])()], illustrated_message_IllustratedMessage.prototype, "description", void 0);
// CONCATENATED MODULE: ./src/illustrated-message/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-illustrated-message')) {
  customElements.define('sp-illustrated-message', illustrated_message_IllustratedMessage);
}
// CONCATENATED MODULE: ./node_modules/lit-html/directives/if-defined.js
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */

const ifDefined = Object(lit_html["c" /* directive */])(value => part => {
  if (value === undefined && part instanceof lit_html["a" /* AttributePart */]) {
    if (value !== part.value) {
      const name = part.committer.name;
      part.committer.element.removeAttribute(name);
    }
  } else {
    part.setValue(value);
  }
});
// CONCATENATED MODULE: ./src/link/link.css

const link_styles = lit_element["b" /* css */]`
a{background-color:initial;-webkit-text-decoration-skip:objects;text-decoration:none;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;outline:none;color:var(--spectrum-link-text-color,var(--spectrum-global-color-blue-600))}a:hover{color:var(--spectrum-link-text-color-hover,var(--spectrum-global-color-blue-600))}a:focus,a:hover{text-decoration:underline}a:focus{-webkit-text-decoration-style:double;text-decoration-style:double;color:var(--spectrum-link-text-color-key-focus,var(--spectrum-global-color-blue-600))}:host([quiet]) a{text-decoration:underline;color:inherit}:host([over-background]) a{text-decoration:underline;color:var(--spectrum-link-over-background-text-color,#fff)}a:active{color:var(--spectrum-link-text-color-down,var(--spectrum-global-color-blue-700))}:host([quiet]) a:active,:host([quiet]) a:focus,:host([quiet]) a:hover{color:inherit}:host([over-background]) a:hover{color:var(--spectrum-link-over-background-text-color-hover,#fff)}:host([over-background]) a:active{color:var(--spectrum-link-over-background-text-color-down,#fff)}:host([over-background]) a:focus{color:var(--spectrum-link-over-background-text-color-key-focus,#fff)}
`;
/* harmony default export */ var link_link = (link_styles);
// CONCATENATED MODULE: ./src/link/link.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var link_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/**
 * Spectrum Link Component
 *
 * @attr quiet - uses quiet styles or not
 * @attr over-background - uses over background styles or not
 */

class link_Link extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.href = undefined;
    this.target = undefined;
  }

  static get styles() {
    return [link_link];
  }

  render() {
    // prettier-ignore
    return lit_element["d" /* html */]`<a href=${ifDefined(this.href)} target=${ifDefined(this.target)}><slot></slot></a>`;
  }

}

link_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], link_Link.prototype, "href", void 0);

link_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], link_Link.prototype, "target", void 0);
// CONCATENATED MODULE: ./src/link/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-link')) {
  customElements.define('sp-link', link_Link);
}
// CONCATENATED MODULE: ./src/radio/radio.css

const radio_styles = lit_element["b" /* css */]`
#root{display:inline-flex;align-items:flex-start;position:relative;min-height:var(--spectrum-radio-height,var(--spectrum-global-dimension-size-400));max-width:100%;margin-right:calc(var(--spectrum-radio-cursor-hit-x,
var(--spectrum-global-dimension-size-100))*2);vertical-align:top}#input{font-family:inherit;font-size:100%;line-height:1.15;margin:0;overflow:visible;box-sizing:border-box;padding:0;position:absolute;top:0;left:calc(var(--spectrum-radio-cursor-hit-x,
var(--spectrum-global-dimension-size-100))*-1);width:calc(100% + var(--spectrum-radio-cursor-hit-x,
var(--spectrum-global-dimension-size-100))*2);height:100%;opacity:.0001;z-index:1;cursor:pointer}:host([disabled]) #input{cursor:default}:host([checked]) #input+#button{border-width:calc(var(--spectrum-radio-circle-diameter,
var(--spectrum-global-dimension-size-175))/2 - var(--spectrum-radio-circle-dot-size, 4px)/2);border-color:var(--spectrum-radio-circle-border-color-selected,var(--spectrum-global-color-blue-500))}#label{margin-left:var(--spectrum-radio-text-gap,var(--spectrum-global-dimension-size-125));font-size:var(--spectrum-radio-text-size,var(--spectrum-global-dimension-font-size-100));transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;margin-top:var(--spectrum-global-dimension-size-75);color:var(--spectrum-radio-text-color,var(--spectrum-global-color-gray-800))}#button{position:relative;box-sizing:border-box;width:var(--spectrum-radio-circle-diameter,var(--spectrum-global-dimension-size-175));height:var(--spectrum-radio-circle-diameter,var(--spectrum-global-dimension-size-175));margin:calc((var(--spectrum-radio-height,
var(--spectrum-global-dimension-size-400)) - var(--spectrum-radio-circle-diameter,
var(--spectrum-global-dimension-size-175)))/2) 0;flex-grow:0;flex-shrink:0;border-radius:calc(var(--spectrum-radio-circle-diameter,
var(--spectrum-global-dimension-size-175))/2);transition:border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;background-color:var(--spectrum-radio-circle-background-color,var(--spectrum-global-color-gray-75));border:var(--spectrum-radio-circle-border-size,2px) solid var(--spectrum-radio-circle-border-color,var(--spectrum-global-color-gray-600))}:host([label-below]) #root{display:inline-flex;flex-direction:column;align-items:center;height:auto}:host([label-below]) #button{flex-shrink:0}:host([label-below]) #label{margin:var(--spectrum-global-dimension-size-40) 0 0 0}#root:hover #button{border-color:var(--spectrum-radio-circle-border-color-hover,var(--spectrum-global-color-gray-700));box-shadow:none}:host([checked]) #root:hover #input+#button{border-color:var(--spectrum-radio-circle-border-color-selected-hover,var(--spectrum-global-color-blue-600))}#root:hover #label{color:var(--spectrum-radio-text-color-hover,var(--spectrum-global-color-gray-900))}#root:active #button{border-color:var(--spectrum-radio-circle-border-color-down,var(--spectrum-global-color-gray-800))}:host([checked]) #root:active #input+#button{border-color:var(--spectrum-radio-circle-border-color-selected-down,var(--spectrum-global-color-blue-700))}#root:active #label{color:var(--spectrum-radio-text-color-down,var(--spectrum-global-color-gray-900))}:host([quiet][checked]) #input+#button{border-color:var(--spectrum-radio-quiet-circle-border-color-selected,var(--spectrum-global-color-gray-700))}:host([quiet][checked]) #root:hover #input+#button{border-color:var(--spectrum-radio-quiet-circle-border-color-selected-hover,var(--spectrum-global-color-gray-800))}:host([quiet][checked]) #root:active #input+#button{border-color:var(--spectrum-radio-quiet-circle-border-color-selected-down,var(--spectrum-global-color-gray-900))}:host([invalid]) #root:hover #input+#button,:host([quiet][invalid]) #root:hover #input+#button{border-color:var(--spectrum-radio-circle-border-color-error-hover,var(--spectrum-global-color-red-600))}:host([invalid]) #root:hover #label,:host([quiet][invalid]) #root:hover #label{color:var(--spectrum-radio-circle-border-color-error-hover,var(--spectrum-global-color-red-600))}:host([invalid]) #root:active #input+#button,:host([quiet][invalid]) #root:active #input+#button{border-color:var(--spectrum-radio-circle-border-color-error-down,var(--spectrum-global-color-red-700))}:host([invalid]) #root:active #label,:host([quiet][invalid]) #root:active #label{color:var(--spectrum-radio-circle-border-color-error-down,var(--spectrum-global-color-red-700))}:host([invalid]) #root #button,:host([invalid][checked]) #root #input+#button,:host([quiet][invalid]) #root #button,:host([quiet][invalid][checked]) #root #input+#button{border-color:var(--spectrum-radio-circle-border-color-error,var(--spectrum-global-color-red-500))}:host([invalid]) #root #label,:host([quiet][invalid]) #root #label{color:var(--spectrum-radio-circle-border-color-error,var(--spectrum-global-color-red-500))}:host([disabled]) #input+#button{border-color:var(--spectrum-radio-circle-border-color-disabled,var(--spectrum-global-color-gray-400))!important}:host([disabled]) #input~#label{color:var(--spectrum-radio-text-color-disabled,var(--spectrum-global-color-gray-500))!important}#input:focus+#button,#root:hover #input:focus+#button,:host([quiet]) #input:focus+#button,:host([quiet]) #root:hover #input:focus+#button{border-color:var(--spectrum-radio-circle-border-color-key-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 1px var(--spectrum-radio-circle-border-color-key-focus,var(--spectrum-global-color-blue-400))}#input:focus~#label,#root:hover #input:focus~#label,:host([quiet]) #input:focus~#label,:host([quiet]) #root:hover #input:focus~#label{color:var(--spectrum-radio-text-color-key-focus,var(--spectrum-global-color-blue-600))}:host([invalid][checked]) #root #input:focus+#button,:host([quiet][invalid][checked]) #root #input:focus+#button{border-color:var(--spectrum-radio-circle-border-color-key-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 1px var(--spectrum-radio-circle-border-color-key-focus,var(--spectrum-global-color-blue-400))}
`;
/* harmony default export */ var radio_radio = (radio_styles);
// CONCATENATED MODULE: ./src/radio/radio.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var radio_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





/**
 * Spectrum Radio Button Component
 *
 * @attr quiet - Uses the quiet style
 * @attr label-below - Moves the label below the radio button
 * @attr invalid - Uses the invalid style
 * @attr disabled - Uses the disabled style
 * @attr checked - Represents when the input is checked
 * @attr name - Represents the group this radio is a part of
 * @attr value - Identifies this radio button within its radio group
 *
 * @event sp-radio:change - When the input is interacted with and its state is changed
 */

class radio_Radio extends focusable_Focusable {
  constructor() {
    super(...arguments);
    this.name = '';
    this.value = '';
    this.checked = false;
  }

  static get styles() {
    return [radio_radio];
  }

  get focusElement() {
    return this.inputElement;
  }

  handleChange() {
    this.checked = this.inputElement.checked;
    this.dispatchEvent(strictCustomEvent('sp-radio:change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value
      }
    }));
  }

  render() {
    return lit_element["d" /* html */]`
        <label id="root">
            <input
                id="input"
                type="radio"
                name=${this.name}
                value=${this.value}
                .checked=${this.checked}
                @change=${this.handleChange}
            />
            <span id="button"></span>
            <span id="label"><slot></slot></span>
        </div>
        `;
  }

}

radio_decorate([Object(lit_element["e" /* property */])({
  type: String,
  reflect: true
})], radio_Radio.prototype, "name", void 0);

radio_decorate([Object(lit_element["e" /* property */])({
  type: String,
  reflect: true
})], radio_Radio.prototype, "value", void 0);

radio_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], radio_Radio.prototype, "checked", void 0);

radio_decorate([Object(lit_element["f" /* query */])('#input')], radio_Radio.prototype, "inputElement", void 0);
// CONCATENATED MODULE: ./src/radio/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-radio')) {
  customElements.define('sp-radio', radio_Radio);
}
// CONCATENATED MODULE: ./src/radio-group/radio-group.css

const radio_group_styles = lit_element["b" /* css */]`
:host{display:flex;flex-direction:row}:host([column]){flex-direction:column}
`;
/* harmony default export */ var radio_group = (radio_group_styles);
// CONCATENATED MODULE: ./src/radio-group/radio-group.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var radio_group_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/**
 * Radio group component
 *
 * @attr column - arranges radio buttons vertically
 */

class radio_group_RadioGroup extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.name = '';
    this._selected = '';
  }

  static get styles() {
    return [radio_group];
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    const radio = value ? this.querySelector(`sp-radio[value=${value}]`) : undefined;
    this.deselectChecked();

    if (radio) {
      this._selected = value;
      radio.checked = true;
    } else {
      // If no matching radio, selected is reset to empty string
      this._selected = '';
    }
  }

  render() {
    return lit_element["d" /* html */]`
            <slot></slot>
        `;
  }

  firstUpdated() {
    const checkedRadio = this.querySelector('sp-radio[checked]');
    const checkedRadioValue = checkedRadio ? checkedRadio.value : ''; // If selected already assigned, don't overwrite

    this.selected = this.selected || checkedRadioValue;
    this.addEventListener('sp-radio:change', ev => {
      this.selected = ev.detail.value;
    });
  }

  deselectChecked() {
    const previousChecked = this.querySelectorAll('sp-radio[checked]');
    previousChecked.forEach(element => {
      const radio = element;
      radio.checked = false;
    });
  }

}

radio_group_decorate([Object(lit_element["e" /* property */])({
  type: String,
  reflect: true
})], radio_group_RadioGroup.prototype, "name", void 0);

radio_group_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], radio_group_RadioGroup.prototype, "selected", null);
// CONCATENATED MODULE: ./src/radio-group/index.ts
/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-radio-group')) {
  customElements.define('sp-radio-group', radio_group_RadioGroup);
}
// CONCATENATED MODULE: ./src/slider/spectrum-slider.css

const spectrum_slider_styles = lit_element["b" /* css */]`
:host{z-index:1;display:block;min-width:var(--spectrum-slider-min-width,var(--spectrum-global-dimension-size-1600));-webkit-user-select:none;-moz-user-select:none;user-select:none}#controls,:host{position:relative;min-height:var(--spectrum-slider-height,var(--spectrum-global-dimension-size-400))}#controls{display:inline-block;box-sizing:border-box;z-index:auto;width:calc(100% - var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*2);margin-left:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2);vertical-align:top}#buffer,#fill,#ramp,.track{height:var(--spectrum-slider-track-height,2px);box-sizing:border-box;position:absolute;z-index:1;top:calc(var(--spectrum-slider-height, var(--spectrum-global-dimension-size-400))/2);left:0;right:auto;margin-top:calc(var(--spectrum-slider-fill-track-height, 2px)/-2);pointer-events:none}#buffer,#fill,.track{padding:0 var(--spectrum-slider-handle-gap,4px) 0 0;margin-left:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*-1)}#buffer:before,#fill:before,.track:before{content:"";display:block;height:100%;border-radius:var(--spectrum-slider-track-border-radius,1px)}#fill{margin-left:0;padding:0 0 0 calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2 + var(--spectrum-slider-handle-gap, 4px))}.spectrum-Slider-fill--right{padding:0 calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2 + var(--spectrum-slider-handle-gap, 4px)) 0 0}#buffer{padding:0 var(--spectrum-slider-handle-gap,4px) 0 0;z-index:2}#buffer~#buffer,.track~.track{left:auto;right:0;padding:0 0 0 var(--spectrum-slider-handle-gap,4px);margin-left:0;margin-right:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*-1)}#buffer~#buffer{margin-right:0;padding:0 0 0 calc(var(--spectrum-slider-handle-gap, 4px) + var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2)}#buffer~#buffer:after{display:none}:host([variant=range]) #value{-webkit-user-select:text;-moz-user-select:text;user-select:text}:host([variant=range]) .track:first-of-type{padding:0 var(--spectrum-slider-handle-gap,4px) 0 0;left:0;right:auto;margin-left:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*-1)}:host([variant=range]) .track{padding:0 calc(var(--spectrum-slider-handle-gap, 4px) + var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2) 0 calc(var(--spectrum-slider-handle-gap, 4px) + var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2);left:auto;right:auto;margin:0}:host([variant=range]) .track:last-of-type{padding:0 0 0 var(--spectrum-slider-handle-gap,4px);left:auto;right:0;margin-right:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*-1)}#ramp{margin-top:0;height:var(--spectrum-slider-ramp-track-height,16px);position:absolute;left:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*-1);right:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*-1);top:calc(var(--spectrum-slider-ramp-track-height, 16px)/2)}#ramp svg{width:100%;height:100%}#handle{position:absolute;left:0;top:calc(var(--spectrum-slider-height, var(--spectrum-global-dimension-size-400))/2);z-index:2;display:inline-block;box-sizing:border-box;width:var(--spectrum-slider-handle-width,var(--spectrum-global-dimension-size-200));height:var(--spectrum-slider-handle-height,var(--spectrum-global-dimension-size-200));margin:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/-2) 0 0 calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/-2);border-radius:var(--spectrum-slider-handle-border-radius,var(--spectrum-global-dimension-size-100));transition:border-width var(--spectrum-slider-animation-duration,.13s) ease-in-out;outline:none;cursor:pointer;cursor:-webkit-grab;cursor:grab;border:var(--spectrum-slider-handle-border-size,2px) solid var(--spectrum-slider-handle-border-color,var(--spectrum-global-color-gray-700));background:var(--spectrum-alias-background-color-default,var(--spectrum-global-color-gray-100))}#handle:active,:host([dragging]) #handle,:host([handle-highlight]) #handle{border-width:var(--spectrum-slider-handle-border-size-down,var(--spectrum-global-dimension-size-75));cursor:ns-resize;cursor:-webkit-grabbing;cursor:grabbing}#handle.is-tophandle,#handle:active,:host([dragging]) #handle,:host([handle-highlight]) #handle{z-index:3}#input{margin:0;width:var(--spectrum-slider-handle-width,var(--spectrum-global-dimension-size-200));height:var(--spectrum-slider-handle-height,var(--spectrum-global-dimension-size-200));padding:0;position:absolute;top:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/-2/4);left:calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/-2/4);overflow:hidden;opacity:.000001;cursor:default;-webkit-appearance:none;border:0;pointer-events:none;background:transparent}#input:focus{outline:none}#labelContainer{display:flex;position:relative;width:auto;padding-top:var(--spectrum-fieldlabel-padding-top,var(--spectrum-global-dimension-size-50));font-size:var(--spectrum-label-text-size,var(--spectrum-global-dimension-size-150));line-height:var(--spectrum-label-text-line-height,1.3);color:var(--spectrum-label-text-color,var(--spectrum-global-color-gray-700))}#label{padding-left:0;flex-grow:1}#value{flex-grow:0;padding-right:0;cursor:default;margin-left:var(--spectrum-slider-label-gap-x,var(--spectrum-global-dimension-size-200))}.spectrum-Slider-ticks{display:flex;justify-content:space-between;z-index:0;margin:0 calc(var(--spectrum-slider-handle-width,
var(--spectrum-global-dimension-size-200))/2*-1);margin-top:calc(var(--spectrum-slider-tick-mark-height, 10px) + var(--spectrum-slider-track-height, 2px)/2)}#tick{position:relative}#tick,#tick:after{width:var(--spectrum-slider-tick-mark-width,2px)}#tick:after{display:block;position:absolute;top:0;left:calc(50% - var(--spectrum-slider-tick-mark-width, 2px)/2);content:"";height:var(--spectrum-slider-tick-mark-height,10px);border-radius:var(--spectrum-slider-tick-mark-border-radius,1px);background-color:var(--spectrum-slider-tick-mark-color,var(--spectrum-global-color-gray-300))}#tick #tickLabel{display:flex;align-items:center;justify-content:center;margin:var(--spectrum-slider-label-gap-x,var(--spectrum-global-dimension-size-200)) calc(var(--spectrum-slider-label-gap-x,
var(--spectrum-global-dimension-size-200))*-1) 0 calc(var(--spectrum-slider-label-gap-x,
var(--spectrum-global-dimension-size-200))*-1);font-size:var(--spectrum-label-text-size,var(--spectrum-global-dimension-size-150));line-height:var(--spectrum-label-text-line-height,1.3)}#tick:first-of-type #tickLabel,#tick:last-of-type #tickLabel{display:block;position:absolute;margin:var(--spectrum-slider-label-gap-x,var(--spectrum-global-dimension-size-200)) 0 0 0}#tick:first-of-type #tickLabel{left:0}#tick:last-of-type #tickLabel{right:0}:host([variant=color]) #labelContainer,:host([variant=color]) .spectrum-Dial-labelContainer{padding-bottom:var(--spectrum-fieldlabel-padding-bottom,var(--spectrum-global-dimension-size-65))}:host([variant=color]) #controls,:host([variant=color]) #controls:before,:host([variant=color]) .spectrum-Dial-controls,:host([variant=color]) .spectrum-Dial-controls:before,:host([variant=color]) .track{min-height:auto;height:var(--spectrum-slider-color-track-height,24px);margin-left:0;width:100%}:host([variant=color]) #controls:before,:host([variant=color]) .spectrum-Dial-controls:before{display:block;content:""}:host([variant=color]) #controls:before,:host([variant=color]) .spectrum-Dial-controls:before,:host([variant=color]) .track{top:0;padding:0;margin-top:0;margin-right:0;border-radius:var(--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50))}:host([variant=color]) #handle,:host([variant=color]) .spectrum-Dial-handle{top:50%}:host([disabled]){cursor:default}:host([disabled]) #handle,:host([disabled]) .spectrum-Dial-handle{cursor:default;pointer-events:none}:host([disabled][variant=color]) #handle:active,:host([disabled][variant=color]) #handle:hover,:host([disabled][variant=color]) .spectrum-Dial-handle:active,:host([disabled][variant=color]) .spectrum-Dial-handle:hover{border-width:var(--spectrum-slider-color-handle-outset-border-size,1px)}.track:before{background:var(--spectrum-slider-track-color,var(--spectrum-global-color-gray-300))}#fill:before,:host([variant=filled]) .track:first-child:before{background:var(--spectrum-slider-fill-track-color,var(--spectrum-global-color-gray-700))}#buffer:after,#buffer:before{background:var(--spectrum-slider-player-track-buffer-color,var(--spectrum-global-color-gray-500))}#ramp path{fill:var(--spectrum-slider-track-color,var(--spectrum-global-color-gray-300))}#handle:hover{border-color:var(--spectrum-slider-handle-border-color-hover,var(--spectrum-global-color-gray-800))}:host([handle-highlight]) #handle{border-color:var(--spectrum-slider-handle-border-color-key-focus,var(--spectrum-global-color-blue-400));background:var(--spectrum-slider-handle-background-color-key-focus,var(--spectrum-global-color-blue-400))}#handle:active,:host([dragging]) #handle{border-color:var(--spectrum-slider-handle-border-color-down,var(--spectrum-global-color-gray-800))}.spectrum-Slider--ramp #handle,.spectrum-Slider--ramp .spectrum-Dial-handle{box-shadow:0 0 0 4px var(--spectrum-alias-background-color-default,var(--spectrum-global-color-gray-100))}:host([dragging]) #handle{border-color:var(--spectrum-slider-handle-border-color-down,var(--spectrum-global-color-gray-800));background:var(--spectrum-slider-handle-background-color-down,transparent)}:host([variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(--spectrum-slider-fill-track-color,var(--spectrum-global-color-gray-700))}:host([variant=color]) #controls:before,:host([variant=color]) .spectrum-Dial-controls:before{background-color:var(--spectrum-global-color-static-white,#fff);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-global-color-static-gray-500,#bcbcbc) 0),linear-gradient(45deg,transparent 75.5%,var(--spectrum-global-color-static-gray-500,#bcbcbc) 0),linear-gradient(-45deg,var(--spectrum-global-color-static-gray-500,#bcbcbc) 25.5%,transparent 0),linear-gradient(45deg,var(--spectrum-global-color-static-gray-500,#bcbcbc) 25.5%,transparent 0);background-size:var(--spectrum-global-dimension-static-size-200,16px) var(--spectrum-global-dimension-static-size-200,16px);background-position:0 0,0 var(--spectrum-global-dimension-static-size-100,8px),var(--spectrum-global-dimension-static-size-100,8px) calc(-1*var(--spectrum-global-dimension-static-size-100, 8px)),calc(-1*var(--spectrum-global-dimension-static-size-100, 8px)) 0;z-index:0}:host([variant=color]) .track{background-color:initial;background-image:linear-gradient(90deg,var(--spectrum-slider-color-track-background-color-gradient-start,var(--spectrum-global-color-blue-400)),var(--spectrum-slider-color-track-background-color-gradient-end,var(--spectrum-global-color-blue-700)));box-shadow:inset 0 0 0 1px var(--spectrum-slider-color-track-border-color,rgba(0,0,0,.05))}:host([variant=color]) .track:before{display:none}:host([variant=color]) #handle,:host([variant=color]) .spectrum-Dial-handle{box-shadow:inset 0 0 0 1px var(--spectrum-slider-color-handle-inset-border-color,rgba(0,0,0,.05)),0 0 0 1px var(--spectrum-slider-color-handle-outset-border-color,rgba(0,0,0,.05));border-color:var(--spectrum-slider-color-handle-border-color,var(--spectrum-global-color-gray-50));background:var(--spectrum-slider-color-handle-color,transparent)}:host([variant=color][handle-highlight]) #handle{box-shadow:0 0 0 1px var(--spectrum-slider-color-handle-outset-border-color-key-focus,rgba(0,0,0,.05))}:host([disabled]) #labelContainer,:host([disabled]) .spectrum-Dial-labelContainer{color:var(--spectrum-label-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([disabled]) #handle,:host([disabled]) .spectrum-Dial-handle{border-color:var(--spectrum-slider-handle-border-color-disabled,var(--spectrum-global-color-gray-400));background:var(--spectrum-alias-background-color-default,var(--spectrum-global-color-gray-100))}:host([disabled]) #handle:active,:host([disabled]) #handle:hover,:host([disabled]) .spectrum-Dial-handle:active,:host([disabled]) .spectrum-Dial-handle:hover{border-color:var(--spectrum-slider-handle-border-color-disabled,var(--spectrum-global-color-gray-400));background:var(--spectrum-slider-handle-background-color,transparent)}:host([disabled]) .track:before{background:var(--spectrum-slider-track-color-disabled,var(--spectrum-global-color-gray-300))}:host([disabled]) #fill:before,:host([disabled][variant=filled]) .track:first-child:before{background:var(--spectrum-slider-fill-track-color-disabled,var(--spectrum-global-color-gray-300))}:host([disabled]) #buffer:before{background:var(--spectrum-slider-player-track-buffer-color-disabled,var(--spectrum-global-color-gray-300))}:host([disabled]) #ramp path{fill:var(--spectrum-slider-ramp-track-color-disabled,var(--spectrum-global-color-gray-200))}:host([disabled][variant=color]) .track{background:var(--spectrum-slider-color-track-color-disabled,var(--spectrum-global-color-gray-200))!important;box-shadow:none}:host([disabled][variant=color]) #handle,:host([disabled][variant=color]) #handle:active,:host([disabled][variant=color]) #handle:hover,:host([disabled][variant=color]) .spectrum-Dial-handle,:host([disabled][variant=color]) .spectrum-Dial-handle:active,:host([disabled][variant=color]) .spectrum-Dial-handle:hover{background:var(--spectrum-slider-color-handle-color-disabled,transparent);box-shadow:none;border-color:var(--spectrum-slider-color-handle-border-color-disabled,var(--spectrum-global-color-gray-400))}:host([disabled][variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(--spectrum-slider-fill-track-color-disabled,var(--spectrum-global-color-gray-300))}
`;
/* harmony default export */ var spectrum_slider = (spectrum_slider_styles);
// CONCATENATED MODULE: ./src/slider/slider.css

const slider_styles = lit_element["b" /* css */]`
:host(:focus){outline-width:0}:host([has-alpha][variant=color]) .track{background:linear-gradient(90deg,rgba(38,128,235,.5),#095aba)}
`;
/* harmony default export */ var slider = (slider_styles);
// CONCATENATED MODULE: ./src/slider/slider.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var slider_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






class slider_Slider extends focusable_Focusable {
  constructor() {
    super(...arguments);
    this.type = '';
    this._value = 10;
    this.variant = '';
    this.label = '';
    this.ariaLabel = null;
    this.max = 20;
    this.min = 0;
    this.step = 1;
    this.disabled = false;
    this.dragging = false;
    this.handleHighlight = false;
  }

  static get styles() {
    return [slider, spectrum_slider];
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const oldValue = this.value;

    if (value === oldValue) {
      return;
    }

    this._value = this.clampValue(value);
    this.requestUpdate('value', oldValue);
  }

  get focusElement() {
    return this.input ? this.input : this;
  }

  render() {
    return lit_element["d" /* html */]`
            ${this.renderLabel()}
            ${this.variant === 'color' ? this.renderColorTrack() : this.renderTrack()}
        `;
  }

  renderLabel() {
    return lit_element["d" /* html */]`
            <div id="labelContainer">
                <label id="label" for="input">${this.label}</label>
                <div
                    id="value"
                    role="textbox"
                    aria-readonly="true"
                    aria-labelledby="label"
                >
                    ${this.value}
                </div>
            </div>
        `;
  }

  renderHandle() {
    return lit_element["d" /* html */]`
            <div
                id="handle"
                style=${this.handleStyle}
                @pointermove=${this.onPointerMove}
                @pointerdown=${this.onPointerDown}
                @pointerup=${this.onPointerUp}
                @pointercancel=${this.onPointerCancel}
                role="presentation"
            >
                <input
                    type="range"
                    id="input"
                    value="${this.value}"
                    step="${this.step}"
                    min="${this.min}"
                    max="${this.max}"
                    aria-disabled=${this.disabled}
                    aria-label=${this.ariaLabel || this.label}
                    aria-valuemin=${this.min}
                    aria-valuemax=${this.max}
                    aria-valuetext=${this.value}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                />
            </div>
        `;
  }

  renderTrack() {
    return lit_element["d" /* html */]`
            <div id="controls" @pointerdown=${this.onTrackPointerDown}>
                <div class="track" id="track-left"
                    style=${this.trackLeftStyle} 
                    role="presentation"
                >
                </div>
                ${this.renderHandle()}
                <div class="track"
                    id="track-right"
                    style=${this.trackRightStyle}
                    role="presentation"
                >
                </div>
                </div>
            </div>
        `;
  }

  renderColorTrack() {
    return lit_element["d" /* html */]`
            <div id="controls" @pointerdown=${this.onTrackPointerDown}>
                <div class="track"></div>
                ${this.renderHandle()}
            </div>
        `;
  }

  onPointerDown(ev) {
    if (this.disabled) {
      return;
    }

    this.input.focus();
    this.dragging = true;
    this.handle.setPointerCapture(ev.pointerId);
  }

  onPointerUp(ev) {
    // Retain focus on input element after mouse up to enable keyboard interactions
    this.input.focus();
    this.handleHighlight = false;
    this.dragging = false;
    this.handle.releasePointerCapture(ev.pointerId);
    this.dispatchChangeEvent();
  }

  onPointerMove(ev) {
    if (!this.dragging) {
      return;
    }

    this.value = this.calculateHandlePosition(ev);
    this.dispatchInputEvent();
  }

  onPointerCancel(ev) {
    this.dragging = false;
    this.handle.releasePointerCapture(ev.pointerId);
  }
  /**
   * Move the handle under the cursor and begin start a pointer capture when the track
   * is moused down
   */


  onTrackPointerDown(ev) {
    if (ev.target === this.handle || this.disabled) {
      return;
    }

    this.dragging = true;
    this.handle.setPointerCapture(ev.pointerId);
    this.value = this.calculateHandlePosition(ev);
    this.dispatchInputEvent();
  }
  /**
   * Keep the slider value property in sync with the input element's value
   */


  onInputChange() {
    const inputValue = parseFloat(this.input.value);
    this.value = this.clampValue(inputValue);
    this.input.value = this.value.toString();
    this.dispatchInputEvent();
    this.dispatchChangeEvent();
  }

  onInputFocus() {
    this.handleHighlight = true;
  }

  onInputBlur() {
    this.handleHighlight = false;
  }
  /**
   * Returns the value under the cursor
   * @param: PointerEvent on slider
   * @return: Slider value that correlates to the position under the pointer
   */


  calculateHandlePosition(ev) {
    const rect = this.getBoundingClientRect();
    const minOffset = rect.left;
    const offset = ev.clientX;
    const size = rect.width;
    const percent = (offset - minOffset) / size;
    let value = this.min + (this.max - this.min) * percent;
    value = this.clampValue(value);

    if (this.step) {
      value = Math.round(value / this.step) * this.step;
    }

    return value;
  }
  /**
   * @param: value to be clamped
   * @return: the original value if in range, this.max if over, and this.min if under
   */


  clampValue(value) {
    const reducedValue = Math.min(value, this.max);
    return Math.max(reducedValue, this.min);
  }

  dispatchInputEvent() {
    const inputEvent = strictCustomEvent('sp-slider:input', {
      bubbles: true,
      composed: true,
      detail: this.value
    });
    this.dispatchEvent(inputEvent);
  }

  dispatchChangeEvent() {
    this.input.value = this.value.toString();
    const changeEvent = strictCustomEvent('sp-slider:change', {
      bubbles: true,
      composed: true,
      detail: this.value
    });
    this.dispatchEvent(changeEvent);
  }
  /**
   * Ratio representing the slider's position on the track
   */


  get trackProgress() {
    const range = this.max - this.min;
    const progress = this.value - this.min;
    return progress / range;
  }

  get trackLeftStyle() {
    return `width: ${this.trackProgress * 100}%`;
  }

  get trackRightStyle() {
    const width = `width: ${(1 - this.trackProgress) * 100}%; `;
    const offset = `left: calc(${this.trackProgress * 100}% + 8px)`;
    return width + offset;
  }

  get handleStyle() {
    return `left: ${this.trackProgress * 100}%`;
  }

}

slider_decorate([Object(lit_element["e" /* property */])()], slider_Slider.prototype, "type", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], slider_Slider.prototype, "value", null);

slider_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], slider_Slider.prototype, "variant", void 0);

slider_decorate([Object(lit_element["e" /* property */])()], slider_Slider.prototype, "label", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  reflect: true,
  attribute: 'aria-label'
})], slider_Slider.prototype, "ariaLabel", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  type: Number
})], slider_Slider.prototype, "max", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  type: Number
})], slider_Slider.prototype, "min", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  type: Number
})], slider_Slider.prototype, "step", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], slider_Slider.prototype, "disabled", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], slider_Slider.prototype, "dragging", void 0);

slider_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true,
  attribute: 'handle-highlight'
})], slider_Slider.prototype, "handleHighlight", void 0);

slider_decorate([Object(lit_element["f" /* query */])('#handle')], slider_Slider.prototype, "handle", void 0);

slider_decorate([Object(lit_element["f" /* query */])('#input')], slider_Slider.prototype, "input", void 0);
// CONCATENATED MODULE: ./src/slider/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-slider')) {
  customElements.define('sp-slider', slider_Slider);
}
// CONCATENATED MODULE: ./src/iconset/iconset.ts
var iconset_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/




class iconset_Iconset extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.registered = false;

    this.handleRemoved = ({
      detail
    }) => {
      if (detail.name === this.name) {
        this.registered = false;
        this.addIconset();
      }
    };
  }

  firstUpdated() {
    // force no display for all iconsets
    this.style.display = 'none';
  }
  /**
   * Name of the iconset, used by the IconsetRegistry to serve this icon set
   * to consuming icons.
   */


  set name(value) {
    // if we're already registered in the iconset registry
    // we'll need to update our registration
    if (this.registered) {
      if (this._name) {
        // remove from the iconset map using the old name
        iconset_registry_IconsetRegistry.getInstance().removeIconset(this._name);
      }

      if (value) {
        // set in the map using the new name
        iconset_registry_IconsetRegistry.getInstance().addIconset(value, this);
      }
    }

    this._name = value;
  }

  get name() {
    return this._name;
  }
  /**
   * Returns a list of all icons in this iconset.
   */


  getIconList() {
    throw new Error('Not implemented!');
  }
  /**
   * On updated we register the iconset if we're not already registered
   */


  connectedCallback() {
    super.connectedCallback();
    this.addIconset();
    window.addEventListener('sp-iconset:removed', this.handleRemoved);
  }
  /**
   * On disconnected we remove the iconset
   */


  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('sp-iconset:removed', this.handleRemoved);
    this.removeIconset();
  }

  addIconset() {
    if (!this.name || this.registered) {
      return;
    }

    iconset_registry_IconsetRegistry.getInstance().addIconset(this.name, this);
    this.registered = true;
  }

  removeIconset() {
    if (!this.name) {
      return;
    }

    iconset_registry_IconsetRegistry.getInstance().removeIconset(this.name);
    this.registered = false;
  }

}
iconset_Iconset.is = 'sp-iconset';

iconset_decorate([Object(lit_element["e" /* property */])()], iconset_Iconset.prototype, "name", null);
// CONCATENATED MODULE: ./src/iconset/iconset-svg.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var iconset_svg_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class iconset_svg_IconsetSVG extends iconset_Iconset {
  constructor() {
    super(...arguments);
    this.iconMap = new Map();
  }
  /**
   * First updated handler just ensures we've processed any slotted symbols
   */


  updated(changedProperties) {
    if (!this.slotContainer) {
      return;
    }

    const currentSVGNodes = this.getSVGNodes(this.slotContainer);
    this.updateSVG(currentSVGNodes);
    super.updated(changedProperties);
  }
  /**
   * Applies the requested icon from this iconset instance to the given element.
   *
   * @param el - the element to apply the icon to
   * @param icon - the name of the icon within this set to apply.
   */


  applyIconToElement(el, icon, size, label) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.updateComplete;

      const iconSymbol = _this.iconMap.get(icon);

      if (!iconSymbol) {
        throw new Error(`Unable to find icon ${icon}`);
      } // we cannot share a single SVG globally across shadowroot boundaries
      // so copy the template node so we can inject it where we need it


      const clonedNode = _this.prepareSvgClone(iconSymbol);

      clonedNode.setAttribute('role', 'img');

      if (label) {
        clonedNode.setAttribute('aria-label', label);
      } else {
        clonedNode.setAttribute('aria-hidden', 'true');
      } // append the svg to the node either in its shadowroot or directly into its dom


      if (el.shadowRoot) {
        el.shadowRoot.appendChild(clonedNode);
      } else {
        el.appendChild(clonedNode);
      }
    })();
  }
  /**
   * Returns a list of all icons in this iconset.
   */


  getIconList() {
    return [...this.iconMap.keys()];
  }

  prepareSvgClone(sourceSvg) {
    const content = sourceSvg.cloneNode(true); // we're going to create a new svg element that will have our symbol geometry inside

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const viewBox = content.getAttribute('viewBox') || ''; // inline style isn't ideal but will work in all cases and means our icons don't need to know
    // if they are svg or spritesheet provided

    const cssText = 'pointer-events: none; display: block; width: 100%; height: 100%;';
    svg.style.cssText = cssText; // copy the viewbox and other properties into the svg

    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('focusable', 'false'); // move all the child nodes over to the svg

    while (content.childNodes.length > 0) {
      svg.appendChild(content.childNodes[0]);
    }

    return svg;
  }

  getSVGIconName(icon) {
    return icon;
  }

  getSanitizedIconName(icon) {
    return icon;
  }

  renderDefaultContent() {
    return lit_element["d" /* html */]``;
  }

  render() {
    return lit_element["d" /* html */]`
            <slot @slotchange=${this.onSlotChange}>
                ${this.renderDefaultContent()}
            </slot>
        `;
  }

  updateSVG(nodes) {
    // iterate over the nodes that were passed in, and find all the top level symbols
    const symbols = nodes.reduce((prev, svgNode) => {
      const containedSymbols = svgNode.querySelectorAll('symbol');
      prev.push(...containedSymbols);
      return prev;
    }, []);
    symbols.forEach(symbol => {
      this.iconMap.set(this.getSanitizedIconName(symbol.id), symbol);
    });
  }

  getSVGNodes(slotTarget) {
    const nodes = slotTarget.assignedNodes({
      flatten: true
    }); // find all the svg nodes

    const svgNodes = nodes.filter(node => {
      return node.nodeName === 'svg';
    });
    return svgNodes;
  }

  onSlotChange(evt) {
    const slotTarget = evt.target;
    const svgNodes = this.getSVGNodes(slotTarget);
    this.updateSVG(svgNodes);
  }

}
iconset_svg_IconsetSVG.is = 'sp-iconset-svg';

iconset_svg_decorate([Object(lit_element["f" /* query */])('slot')], iconset_svg_IconsetSVG.prototype, "slotContainer", void 0);
// CONCATENATED MODULE: ./src/icons/icons-large.svg.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* harmony default export */ var icons_large_svg = (lit_element["g" /* svg */]`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-AlertMedium" viewBox="-1 -1 24 24"><path d="M10.563 2.206l-9.249 16.55a.5.5 0 0 0 .436.744h18.5a.5.5 0 0 0 .436-.744l-9.251-16.55a.5.5 0 0 0-.872 0zm1.436 15.044a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25zm0-3.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-6a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25z"/></symbol><symbol id="spectrum-icon-AlertSmall" viewBox="-3 -3 24 24"><path d="M8.564 1.289L.2 16.256A.5.5 0 0 0 .636 17h16.728a.5.5 0 0 0 .436-.744L9.436 1.289a.5.5 0 0 0-.872 0zM10 14.75a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25zm0-3a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-6a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25z"/></symbol><symbol id="spectrum-icon-ArrowDownSmall" viewBox="-7 -6 24 24"><path d="M9.99 7.01a1 1 0 0 0-1.707-.707L6 8.586V1.01a1 1 0 0 0-2 0v7.576L1.717 6.303A1 1 0 1 0 .303 7.717l3.99 3.98a1 1 0 0 0 1.414 0l3.99-3.98a.997.997 0 0 0 .293-.707z"/></symbol><symbol id="spectrum-icon-ArrowLeftMedium" viewBox="-3 -5 24 24"><path d="M16.99 6H3.414l4.283-4.283A1 1 0 1 0 6.283.303l-5.98 5.99a1 1 0 0 0 0 1.414l5.98 5.99a1 1 0 1 0 1.414-1.414L3.414 8H16.99a1 1 0 0 0 0-2z"/></symbol><symbol id="spectrum-icon-ArrowUpSmall" viewBox="-7 -6 24 24"><path d="M9.99 4.99a1 1 0 0 1-1.707.707L6 3.414v7.576a1 1 0 0 1-2 0V3.414L1.717 5.697A1 1 0 1 1 .303 4.283l3.99-3.98a1 1 0 0 1 1.414 0l3.99 3.98a.997.997 0 0 1 .293.707z"/></symbol><symbol id="spectrum-icon-Asterisk" viewBox="-7 -7 24 24"><path d="M7.867 7.872c.061.062.103.145 0 .228l-1.283.827c-.104.061-.145.02-.186-.083L4.804 6.07l-2.09 2.297c-.021.042-.083.083-.145 0l-.994-1.035c-.103-.062-.082-.124 0-.186l2.36-1.966-2.691-1.014c-.042 0-.104-.083-.062-.186l.703-1.41a.11.11 0 0 1 .187-.04L4.43 4.06l.145-3.02A.109.109 0 0 1 4.7.917l1.718.227c.104 0 .124.042.104.145l-.808 2.96 2.734-.828c.061-.042.124-.042.165.082l.27 1.532c.02.103 0 .145-.084.145l-2.856.227z"/></symbol><symbol id="spectrum-icon-CheckmarkMedium" viewBox="-4 -4 24 24"><path d="M6 14a1 1 0 0 1-.789-.385l-4-5a1 1 0 1 1 1.577-1.23L6 11.376l7.213-8.99a1 1 0 1 1 1.576 1.23l-8 10a1 1 0 0 1-.789.384z"/></symbol><symbol id="spectrum-icon-CheckmarkSmall" viewBox="-6 -6 24 24"><path d="M4.5 11a.999.999 0 0 1-.788-.385l-3-4a1 1 0 1 1 1.576-1.23L4.5 8.376l5.212-6.99a1 1 0 1 1 1.576 1.23l-6 8A.999.999 0 0 1 4.5 11z"/></symbol><symbol id="spectrum-icon-ChevronDownMedium" viewBox="-6 -8 24 24"><path d="M11.99 1.51a1 1 0 0 0-1.707-.707L6 5.086 1.717.803A1 1 0 1 0 .303 2.217l4.99 4.99a1 1 0 0 0 1.414 0l4.99-4.99a.997.997 0 0 0 .293-.707z"/></symbol><symbol id="spectrum-icon-ChevronDownSmall" viewBox="-7 -8 24 24"><path d="M5 7a.747.747 0 0 0 .53-.22l4.24-4.24a.75.75 0 1 0-1.06-1.06L5 5.19 1.29 1.48A.75.75 0 1 0 .23 2.54l4.24 4.24A.747.747 0 0 0 5 7z"/></symbol><symbol id="spectrum-icon-ChevronLeftLarge" viewBox="-4 -2 24 24"><path d="M12.109 17.853l-8.066-7.849 8.066-7.84a1.243 1.243 0 0 0 .381-.894 1.24 1.24 0 0 0-2.12-.894L1.379 9.108a1.246 1.246 0 0 0 .003 1.79l8.99 8.744a1.247 1.247 0 1 0 1.738-1.789z"/></symbol><symbol id="spectrum-icon-ChevronLeftMedium" viewBox="-8 -6 24 24"><path d="M7.197 10.283L2.914 6l4.283-4.283A1 1 0 1 0 5.783.303l-4.99 4.99a1 1 0 0 0 0 1.414l4.99 4.99a1 1 0 1 0 1.414-1.414z"/></symbol><symbol id="spectrum-icon-ChevronRightLarge" viewBox="-4 -2 24 24"><path d="M15 10.004a1.243 1.243 0 0 0-.38-.894L5.631.364a1.249 1.249 0 1 0-1.741 1.79l8.066 7.85-8.069 7.847a1.249 1.249 0 0 0 1.741 1.79l8.992-8.74a1.246 1.246 0 0 0 .379-.897z"/></symbol><symbol id="spectrum-icon-ChevronRightMedium" viewBox="-8 -6 24 24"><path d="M7.5 6a.997.997 0 0 0-.293-.707L2.217.303A1 1 0 1 0 .803 1.717L5.086 6 .803 10.283a1 1 0 1 0 1.414 1.414l4.99-4.99A.997.997 0 0 0 7.5 6z"/></symbol><symbol id="spectrum-icon-ChevronRightSmall" viewBox="-8 -7 24 24"><path d="M7 5a.747.747 0 0 0-.22-.53L2.54.23a.75.75 0 1 0-1.06 1.06L5.19 5 1.48 8.71a.75.75 0 1 0 1.06 1.06l4.24-4.24A.747.747 0 0 0 7 5z"/></symbol><symbol id="spectrum-icon-ChevronUpSmall" viewBox="-7 -8 24 24"><path d="M5 1a.747.747 0 0 0-.53.22L.23 5.46a.75.75 0 1 0 1.06 1.06L5 2.81l3.71 3.71a.75.75 0 1 0 1.06-1.06L5.53 1.22A.747.747 0 0 0 5 1z"/></symbol><symbol id="spectrum-icon-CornerTriangle" viewBox="-9 -9 24 24"><path d="M5.74.01a.25.25 0 0 0-.177.073l-5.48 5.48a.25.25 0 0 0 .177.427h5.48a.25.25 0 0 0 .25-.25V.26a.25.25 0 0 0-.25-.25z"/></symbol><symbol id="spectrum-icon-CrossLarge" viewBox="-4 -4 24 24"><path d="M15.697 14.283L9.414 8l6.283-6.283A1 1 0 1 0 14.283.303L8 6.586 1.717.303A1 1 0 1 0 .303 1.717L6.586 8 .303 14.283a1 1 0 1 0 1.414 1.414L8 9.414l6.283 6.283a1 1 0 1 0 1.414-1.414z"/></symbol><symbol id="spectrum-icon-CrossMedium" viewBox="-7 -7 24 24"><path d="M9.77 8.71L6.06 5l3.71-3.71A.75.75 0 1 0 8.71.23L5 3.94 1.29.23A.75.75 0 1 0 .23 1.29L3.94 5 .23 8.71a.75.75 0 1 0 1.06 1.06L5 6.06l3.71 3.71a.75.75 0 1 0 1.06-1.06z"/></symbol><symbol id="spectrum-icon-CrossSmall" viewBox="-7 -7 24 24"><path d="M9.317 8.433L5.884 5l3.433-3.433a.625.625 0 1 0-.884-.884L5 4.116 1.567.683a.625.625 0 1 0-.884.884C.83 1.713 2.77 3.657 4.116 5L.683 8.433a.625.625 0 1 0 .884.884L5 5.884l3.433 3.433a.625.625 0 0 0 .884-.884z"/></symbol><symbol id="spectrum-icon-DashSmall" viewBox="-6 -6 24 24"><path d="M10.99 5H1.01a1 1 0 0 0 0 2h9.98a1 1 0 1 0 0-2z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="-2 -9.5 24 24"><path d="M19.49 4H.51a.5.5 0 1 0 0 1h18.98a.5.5 0 0 0 0-1zM.51 1h18.98a.5.5 0 0 0 0-1H.51a.5.5 0 0 0 0 1z"/></symbol><symbol id="spectrum-icon-HelpMedium" viewBox="-1 -1 24 24"><path d="M11 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm-.007 14.681a1.145 1.145 0 0 1-1.227-1.215 1.159 1.159 0 0 1 1.115-1.201q.056-.002.112.001a1.159 1.159 0 0 1 1.226 1.088q.003.056.001.112a1.127 1.127 0 0 1-1.227 1.215zm1.981-6.63c-.684.642-1.344 1.215-1.333 1.736a2.275 2.275 0 0 0 .176.732.25.25 0 0 1-.232.343h-1.26a.3.3 0 0 1-.228-.069 1.886 1.886 0 0 1-.421-1.2c0-.816.508-1.336 1.35-2.17.578-.573.911-.937.911-1.475 0-.625-.421-1.059-1.49-1.059a5.337 5.337 0 0 0-2 .473.249.249 0 0 1-.347-.23v-1.24a.5.5 0 0 1 .3-.459 6.413 6.413 0 0 1 2.434-.5c2.1.006 3.261 1.2 3.261 2.725a3.053 3.053 0 0 1-1.121 2.393z"/></symbol><symbol id="spectrum-icon-HelpSmall" viewBox="-3 -3 24 24"><path d="M9 1a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm.023 13.438a1.345 1.345 0 0 1-.104-2.688q.052-.002.104 0a1.31 1.31 0 0 1 1.397 1.217q.004.059.003.118a1.291 1.291 0 0 1-1.4 1.353zm1.783-6.409l-.1.1c-.395.414-.842.884-.842 1.175a1.386 1.386 0 0 0 .179.674l.073.139-.057.215a.308.308 0 0 1-.284.189H8.436a.434.434 0 0 1-.325-.117 2.056 2.056 0 0 1-.422-1.262A3.058 3.058 0 0 1 8.8 7.071c.1-.11.2-.21.288-.3.314-.325.507-.535.507-.758 0-.154 0-.622-.893-.622a2.958 2.958 0 0 0-1.58.459.3.3 0 0 1-.327-.01l-.118-.085-.028-.225V4.081a.44.44 0 0 1 .2-.41A4.135 4.135 0 0 1 9 3.119a2.552 2.552 0 0 1 2.751 2.636 3.067 3.067 0 0 1-.944 2.274z"/></symbol><symbol id="spectrum-icon-InfoMedium" viewBox="-1 -1 24 24"><path d="M11 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm-.15 2.65a1.359 1.359 0 0 1 1.431 1.283q.004.064.001.129a1.332 1.332 0 0 1-1.432 1.432 1.353 1.353 0 0 1-1.432-1.433 1.359 1.359 0 0 1 1.304-1.412q.064-.002.128.001zM13.5 16a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1v-4H9a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 .5.5v5.5h1a.5.5 0 0 1 .5.5z"/></symbol><symbol id="spectrum-icon-InfoSmall" viewBox="-3 -3 24 24"><path d="M9 1a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm-.15 2.15a1.359 1.359 0 0 1 1.431 1.283q.004.064.001.129A1.332 1.332 0 0 1 8.85 5.994a1.353 1.353 0 0 1-1.432-1.433 1.359 1.359 0 0 1 1.304-1.412q.064-.002.128.001zM11 13.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H8V9h-.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V12h.5a.5.5 0 0 1 .5.5z"/></symbol><symbol id="spectrum-icon-Magnifier" viewBox="-2 -2 24 24"><path d="M19.77 18.71l-5.464-5.464a7.503 7.503 0 1 0-1.06 1.06l5.463 5.464a.75.75 0 1 0 1.061-1.06zM2.5 8.5a6 6 0 1 1 6 6 6.007 6.007 0 0 1-6-6z"/></symbol><symbol id="spectrum-icon-SkipLeft" viewBox="-7 -6 24 24"><path d="M9.697 10.283L5.414 6l4.283-4.283A1 1 0 1 0 8.283.303l-4.99 4.99a1 1 0 0 0 0 1.414l4.99 4.99a1 1 0 1 0 1.414-1.414zM1 .01a1 1 0 0 0-1 1v9.98a1 1 0 0 0 2 0V1.01a1 1 0 0 0-1-1z"/></symbol><symbol id="spectrum-icon-SkipRight" viewBox="-7 -6 24 24"><path d="M9 .01a1 1 0 0 0-1 1v9.98a1 1 0 1 0 2 0V1.01a1 1 0 0 0-1-1zM7 6a.997.997 0 0 0-.293-.707L1.717.303A1 1 0 1 0 .303 1.717L4.586 6 .303 10.283a1 1 0 1 0 1.414 1.414l4.99-4.99A.997.997 0 0 0 7 6z"/></symbol><symbol id="spectrum-icon-Star" viewBox="-1 -1 24 24"><path d="M11.361 1.68l2.259 5.975a.257.257 0 0 0 .228.166l6.381.3a.386.386 0 0 1 .223.686L15.467 12.8a.257.257 0 0 0-.087.268l1.684 6.162a.386.386 0 0 1-.584.424l-5.34-3.506a.257.257 0 0 0-.282 0l-5.34 3.506a.386.386 0 0 1-.584-.424l1.686-6.158a.257.257 0 0 0-.087-.268L1.548 8.809a.386.386 0 0 1 .223-.686l6.381-.3a.257.257 0 0 0 .228-.166l2.259-5.977a.386.386 0 0 1 .722 0z"/></symbol><symbol id="spectrum-icon-StarOutline" viewBox="-1 -1 24 24"><path d="M11 4.9l1.231 3.255A1.777 1.777 0 0 0 13.809 9.3l3.476.165-2.715 2.18a1.777 1.777 0 0 0-.6 1.855l.918 3.357-2.909-1.91a1.777 1.777 0 0 0-1.951 0l-2.909 1.91.914-3.357a1.778 1.778 0 0 0-.6-1.856L4.715 9.469 8.191 9.3a1.777 1.777 0 0 0 1.578-1.142zm0-3.458a.448.448 0 0 0-.426.294L8.35 7.621a.26.26 0 0 1-.231.168l-6.282.3a.455.455 0 0 0-.263.81l4.907 3.933a.26.26 0 0 1 .088.271l-1.657 6.064a.457.457 0 0 0 .44.577.45.45 0 0 0 .249-.076l5.257-3.452a.26.26 0 0 1 .285 0l5.257 3.451a.45.45 0 0 0 .249.076.457.457 0 0 0 .44-.577L15.43 13.1a.26.26 0 0 1 .088-.271L20.426 8.9a.455.455 0 0 0-.263-.81l-6.282-.3a.26.26 0 0 1-.231-.168l-2.224-5.883A.448.448 0 0 0 11 1.445z"/></symbol><symbol id="spectrum-icon-SuccessMedium" viewBox="-1 -1 24 24"><path d="M11 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm5.638 5.609L10.1 15.652a.5.5 0 0 1-.742.038L5.086 11.5a.5.5 0 0 1 0-.707l.707-.707a.5.5 0 0 1 .707 0L9.6 13.1l5.486-6.751a.5.5 0 0 1 .7-.073l.776.631a.5.5 0 0 1 .076.702z"/></symbol><symbol id="spectrum-icon-SuccessSmall" viewBox="-3 -3 24 24"><path d="M9 1a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm5.333 4.54l-6.324 8.13a.6.6 0 0 1-.437.23h-.037a.6.6 0 0 1-.425-.176l-3.893-3.9a.6.6 0 0 1 0-.849l.663-.663a.6.6 0 0 1 .848 0L7.4 10.991l5.256-6.754a.6.6 0 0 1 .843-.1l.728.566a.6.6 0 0 1 .106.837z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="-6 -7.5 24 24"><path d="M11.49 8H.51a.5.5 0 1 0 0 1h10.98a.5.5 0 1 0 0-1zM11.49 4H.51a.5.5 0 1 0 0 1h10.98a.5.5 0 0 0 0-1zM.51 1h10.98a.5.5 0 0 0 0-1H.51a.5.5 0 0 0 0 1z"/></symbol></svg>`);
// CONCATENATED MODULE: ./src/icons/icons-large.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


class icons_large_IconsLarge extends iconset_svg_IconsetSVG {
  constructor() {
    super();
    this.name = 'ui'; // default iconset name for these icons
  }

  renderDefaultContent() {
    return icons_large_svg;
  }
  /**
   * Overrides createIconName to make icon strings compatible with spectrum-icon id format
   * @param icon
   * @param size
   */


  getSVGIconName(icon) {
    return `spectrum-icon-${icon}`;
  }

  getSanitizedIconName(icon) {
    return icon.replace('spectrum-icon-', '');
  }

}
icons_large_IconsLarge.is = 'sp-icons-large';
// CONCATENATED MODULE: ./src/icons/icons-medium.svg.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* harmony default export */ var icons_medium_svg = (lit_element["g" /* svg */]`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="spectrum-icon-AlertMedium" viewBox="0 0 18 18"><path d="M8.564 1.289L.2 16.256A.5.5 0 0 0 .636 17h16.728a.5.5 0 0 0 .436-.744L9.436 1.289a.5.5 0 0 0-.872 0zM10 14.75a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25zm0-3a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-6a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25z"/></symbol><symbol id="spectrum-icon-AlertSmall" viewBox="-2 -2 18 18"><path d="M6.66 1.003L.157 12.643a.389.389 0 0 0 .339.58h13.01a.389.389 0 0 0 .34-.58L7.338 1.004a.389.389 0 0 0-.678 0zm1.118 10.47a.194.194 0 0 1-.195.194H6.417a.194.194 0 0 1-.195-.195v-1.166a.194.194 0 0 1 .195-.195h1.166a.194.194 0 0 1 .195.195zm0-2.334a.194.194 0 0 1-.195.194H6.417a.194.194 0 0 1-.195-.194V4.472a.194.194 0 0 1 .195-.194h1.166a.194.194 0 0 1 .195.194z"/></symbol><symbol id="spectrum-icon-ArrowDownSmall" viewBox="-5 -4 18 18"><path d="M7.99 6.01a1 1 0 0 0-1.707-.707L5 6.586V1a1 1 0 0 0-2 0v5.586L1.717 5.303A1 1 0 1 0 .303 6.717l2.99 2.98a1 1 0 0 0 1.414 0l2.99-2.98a.997.997 0 0 0 .293-.707z"/></symbol><symbol id="spectrum-icon-ArrowLeftMedium" viewBox="-2 -4 18 18"><path d="M12.99 4H3.414l2.283-2.283A1 1 0 1 0 4.283.303l-3.98 3.99a1 1 0 0 0 0 1.414l3.98 3.99a1 1 0 1 0 1.414-1.414L3.414 6h9.576a1 1 0 1 0 0-2z"/></symbol><symbol id="spectrum-icon-ArrowUpSmall" viewBox="-5 -4 18 18"><path d="M7.99 3.99a1 1 0 0 1-1.707.707L5 3.414V9a1 1 0 0 1-2 0V3.414L1.717 4.697A1 1 0 1 1 .303 3.283l2.99-2.98a1 1 0 0 1 1.414 0l2.99 2.98a.997.997 0 0 1 .293.707z"/></symbol><symbol id="spectrum-icon-Asterisk" viewBox="-5 -5 18 18"><path d="M6.573 6.558c.056.055.092.13 0 .204l-1.148.74c-.093.056-.13.02-.167-.073L3.832 4.947l-1.87 2.055c-.02.037-.075.074-.13 0l-.889-.926c-.092-.055-.074-.111 0-.167l2.111-1.76-2.408-.906c-.037 0-.092-.074-.055-.167l.63-1.259a.097.097 0 0 1 .166-.036l2.111 1.37.13-2.704a.097.097 0 0 1 .111-.11L5.277.54c.092 0 .11.037.092.13l-.722 2.647 2.444-.74c.056-.038.111-.038.148.073l.241 1.37c.019.093 0 .13-.074.13l-2.556.204z"/></symbol><symbol id="spectrum-icon-CheckmarkMedium" viewBox="-3 -3 18 18"><path d="M4.5 10a1.022 1.022 0 0 1-.799-.384l-2.488-3a1 1 0 0 1 1.576-1.233L4.5 7.376l4.712-5.991a1 1 0 1 1 1.576 1.23l-5.51 7A.978.978 0 0 1 4.5 10z"/></symbol><symbol id="spectrum-icon-CheckmarkSmall" viewBox="-4 -4 18 18"><path d="M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z"/></symbol><symbol id="spectrum-icon-ChevronDownMedium" viewBox="-4 -6 18 18"><path d="M9.99 1.01A1 1 0 0 0 8.283.303L5 3.586 1.717.303A1 1 0 1 0 .303 1.717l3.99 3.98a1 1 0 0 0 1.414 0l3.99-3.98a.997.997 0 0 0 .293-.707z"/></symbol><symbol id="spectrum-icon-ChevronDownSmall" viewBox="-5 -6 18 18"><path d="M4 5.5a.747.747 0 0 0 .53-.22c.607-.577 1.97-2.038 3.24-3.24A.75.75 0 1 0 6.71.98L4 3.69 1.29.98A.75.75 0 1 0 .23 2.04l3.24 3.24A.747.747 0 0 0 4 5.5z"/></symbol><symbol id="spectrum-icon-ChevronLeftLarge" viewBox="-3 -1 18 18"><path d="M9.605 13.843L3.55 8l6.056-5.84A1.248 1.248 0 1 0 7.876.363L.882 7.1a1.243 1.243 0 0 0 .003 1.797l6.988 6.742a1.248 1.248 0 1 0 1.732-1.796z"/></symbol><symbol id="spectrum-icon-ChevronLeftMedium" viewBox="-6 -4 18 18"><path d="M5.697 8.283L2.414 5l3.283-3.283A1 1 0 1 0 4.283.303l-3.98 3.99a1 1 0 0 0 0 1.414l3.98 3.99a1 1 0 1 0 1.414-1.414z"/></symbol><symbol id="spectrum-icon-ChevronRightLarge" viewBox="-3 -1 18 18"><path d="M11.5 8a1.241 1.241 0 0 0-.386-.897L4.128.36a1.248 1.248 0 1 0-1.733 1.797L8.45 8l-6.058 5.84a1.248 1.248 0 1 0 1.733 1.797L11.117 8.9A1.245 1.245 0 0 0 11.5 8z"/></symbol><symbol id="spectrum-icon-ChevronRightMedium" viewBox="-6 -4 18 18"><path d="M5.99 5a.997.997 0 0 0-.293-.707L1.717.303A1 1 0 1 0 .303 1.717L3.586 5 .303 8.283a1 1 0 1 0 1.414 1.414l3.98-3.99A.997.997 0 0 0 5.99 5z"/></symbol><symbol id="spectrum-icon-ChevronRightSmall" viewBox="-6 -5 18 18"><path d="M5.5 4a.747.747 0 0 0-.22-.53C4.703 2.862 3.242 1.5 2.04.23A.75.75 0 1 0 .98 1.29L3.69 4 .98 6.71a.75.75 0 1 0 1.06 1.06l3.24-3.24A.747.747 0 0 0 5.5 4z"/></symbol><symbol id="spectrum-icon-ChevronUpSmall" viewBox="-5 -6 18 18"><path d="M4 .5a.747.747 0 0 0-.53.22C2.862 1.297 1.5 2.758.23 3.96a.75.75 0 1 0 1.06 1.06L4 2.31l2.71 2.71a.75.75 0 1 0 1.06-1.06L4.53.72A.747.747 0 0 0 4 .5z"/></symbol><symbol id="spectrum-icon-CornerTriangle" viewBox="-6.5 -6.5 18 18"><path d="M4.74.01a.25.25 0 0 0-.177.073l-4.48 4.48a.25.25 0 0 0 .177.427h4.48a.25.25 0 0 0 .25-.25V.26a.25.25 0 0 0-.25-.25z"/></symbol><symbol id="spectrum-icon-CrossLarge" viewBox="-3 -3 18 18"><path d="M11.697 10.283L7.414 6l4.283-4.283A1 1 0 1 0 10.283.303L6 4.586 1.717.303A1 1 0 1 0 .303 1.717L4.586 6 .303 10.283a1 1 0 1 0 1.414 1.414L6 7.414l4.283 4.283a1 1 0 1 0 1.414-1.414z"/></symbol><symbol id="spectrum-icon-CrossMedium" viewBox="-5 -5 18 18"><path d="M7.77 6.71L5.06 4l2.71-2.71A.75.75 0 1 0 6.71.23L4 2.94 1.29.23A.75.75 0 1 0 .23 1.29L2.94 4 .23 6.71a.75.75 0 1 0 1.06 1.06L4 5.06l2.71 2.71a.75.75 0 1 0 1.06-1.06z"/></symbol><symbol id="spectrum-icon-CrossSmall" viewBox="-5 -5 18 18"><path d="M7.317 6.433L4.884 4l2.433-2.433a.625.625 0 1 0-.884-.884L4 3.116 1.567.683a.625.625 0 1 0-.884.884L3.116 4 .683 6.433a.625.625 0 1 0 .884.884L4 4.884l2.433 2.433a.625.625 0 0 0 .884-.884z"/></symbol><symbol id="spectrum-icon-DashSmall" viewBox="-4 -4 18 18"><path d="M8 4H2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/></symbol><symbol id="spectrum-icon-DoubleGripper" viewBox="-1 -7 18 18"><path d="M15.49 3H.51a.5.5 0 1 0 0 1h14.98a.5.5 0 1 0 0-1zM.51 1h14.98a.5.5 0 0 0 0-1H.51a.5.5 0 0 0 0 1z"/></symbol><symbol id="spectrum-icon-HelpMedium" viewBox="0 0 18 18"><path d="M9 1a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1.3 12.3a1.222 1.222 0 0 1-.3.9 1.223 1.223 0 0 1-.9.3 1.2 1.2 0 0 1 0-2.4c.8 0 1.3.5 1.2 1.2zm.1-4.5c-.4.4-.8.8-.8 1.2a1.135 1.135 0 0 0 .3.8v.1a.098.098 0 0 1-.096.1H8.4a.229.229 0 0 1-.2-.1 1.666 1.666 0 0 1-.4-1.1 2.772 2.772 0 0 1 1-1.7 2.772 2.772 0 0 0 1-1.7c0-.5-.4-1.1-1.4-1.1a5.018 5.018 0 0 0-2 .4h-.2V4.3c0-.1 0-.2.1-.2a6.183 6.183 0 0 1 2.4-.5c1.9 0 3.1 1.1 3.1 2.7a3.704 3.704 0 0 1-1.4 2.5z"/></symbol><symbol id="spectrum-icon-HelpSmall" viewBox="-2 -2 18 18"><path d="M7 .778A6.222 6.222 0 1 0 13.222 7 6.222 6.222 0 0 0 7 .778zm.018 10.452a1.046 1.046 0 1 1-.08-2.091q.04-.002.08 0a1.019 1.019 0 0 1 1.087.946q.003.046.002.092a1.004 1.004 0 0 1-1.09 1.053zm1.387-4.985l-.078.078c-.307.322-.655.687-.655.913a1.078 1.078 0 0 0 .14.525l.056.108-.044.167a.24.24 0 0 1-.221.147H6.56a.338.338 0 0 1-.252-.091 1.6 1.6 0 0 1-.329-.982 2.378 2.378 0 0 1 .864-1.61c.078-.086.156-.164.224-.234.245-.252.395-.416.395-.59 0-.119 0-.483-.695-.483a2.3 2.3 0 0 0-1.229.357.233.233 0 0 1-.254-.008l-.092-.066-.022-.175V3.174a.342.342 0 0 1 .156-.319A3.216 3.216 0 0 1 7 2.425a1.985 1.985 0 0 1 2.14 2.051 2.385 2.385 0 0 1-.735 1.769z"/></symbol><symbol id="spectrum-icon-InfoMedium" viewBox="0 0 18 18"><path d="M9 1a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm-.15 2.15a1.359 1.359 0 0 1 1.431 1.283q.004.064.001.129A1.332 1.332 0 0 1 8.85 5.994a1.353 1.353 0 0 1-1.432-1.433 1.359 1.359 0 0 1 1.304-1.412q.064-.002.128.001zM11 13.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H8V9h-.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V12h.5a.5.5 0 0 1 .5.5z"/></symbol><symbol id="spectrum-icon-InfoSmall" viewBox="-2 -2 18 18"><path d="M7 .778A6.222 6.222 0 1 0 13.222 7 6.222 6.222 0 0 0 7 .778zM6.883 2.45a1.057 1.057 0 0 1 1.113.998q.003.05.001.1a1.036 1.036 0 0 1-1.114 1.114A1.052 1.052 0 0 1 5.77 3.547 1.057 1.057 0 0 1 6.784 2.45q.05-.002.1.001zm1.673 8.05a.389.389 0 0 1-.39.389H5.834a.389.389 0 0 1-.389-.389v-.778a.389.389 0 0 1 .39-.389h.388V7h-.389a.389.389 0 0 1-.389-.389v-.778a.389.389 0 0 1 .39-.389h1.555a.389.389 0 0 1 .389.39v3.5h.389a.389.389 0 0 1 .389.388z"/></symbol><symbol id="spectrum-icon-Magnifier" viewBox="-1 -1 18 18"><path d="M15.77 14.71l-4.534-4.535a6.014 6.014 0 1 0-1.06 1.06l4.533 4.535a.75.75 0 1 0 1.061-1.06zM6.5 11A4.5 4.5 0 1 1 11 6.5 4.505 4.505 0 0 1 6.5 11z"/></symbol><symbol id="spectrum-icon-SkipLeft" viewBox="-4.5 -4 18 18"><path d="M8.697 8.283L5.414 5l3.283-3.283A1 1 0 1 0 7.283.303l-3.99 3.99a1 1 0 0 0 0 1.414l3.99 3.99a1 1 0 1 0 1.414-1.414zM1 .01a1 1 0 0 0-1 1v7.98a1 1 0 0 0 2 0V1.01a1 1 0 0 0-1-1z"/></symbol><symbol id="spectrum-icon-SkipRight" viewBox="-4.5 -4 18 18"><path d="M8 .01a1 1 0 0 0-1 1v7.98a1 1 0 1 0 2 0V1.01a1 1 0 0 0-1-1zM6 5a.997.997 0 0 0-.293-.707L1.717.303A1 1 0 1 0 .303 1.717L3.586 5 .303 8.283a1 1 0 1 0 1.414 1.414l3.99-3.99A.997.997 0 0 0 6 5z"/></symbol><symbol id="spectrum-icon-Star" viewBox="0 0 18 18"><path d="M9.241.3l2.161 5.715 6.106.289a.255.255 0 0 1 .147.454l-4.77 3.823 1.612 5.9a.255.255 0 0 1-.386.28L9.002 13.4l-5.11 3.358a.255.255 0 0 1-.386-.28l1.612-5.9-4.77-3.821A.255.255 0 0 1 .495 6.3l6.107-.285L8.763.3a.255.255 0 0 1 .478 0z"/></symbol><symbol id="spectrum-icon-StarOutline" viewBox="0 0 18 18"><path d="M9.031 2.541l1.777 4.753 5.11.241-3.987 3.2 1.336 4.913-4.266-2.782-4.282 2.808 1.352-4.937-3.987-3.2 5.1-.245zM9.042.412a.369.369 0 0 0-.349.239L6.486 6.326l-6.1.293a.375.375 0 0 0-.217.667l4.762 3.821L3.318 17a.376.376 0 0 0 .362.475.371.371 0 0 0 .2-.063l5.121-3.351 5.095 3.324a.371.371 0 0 0 .2.062.376.376 0 0 0 .363-.475l-1.595-5.866 4.767-3.826a.375.375 0 0 0-.217-.667l-6.1-.287L9.393.655a.369.369 0 0 0-.351-.243z"/></symbol><symbol id="spectrum-icon-SuccessMedium" viewBox="0 0 18 18"><path d="M9 1a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm5.333 4.54l-6.324 8.13a.6.6 0 0 1-.437.23h-.037a.6.6 0 0 1-.425-.176l-3.893-3.9a.6.6 0 0 1 0-.849l.663-.663a.6.6 0 0 1 .848 0L7.4 10.991l5.256-6.754a.6.6 0 0 1 .843-.1l.728.566a.6.6 0 0 1 .106.837z"/></symbol><symbol id="spectrum-icon-SuccessSmall" viewBox="-2 -2 18 18"><path d="M7 .778A6.222 6.222 0 1 0 13.222 7 6.222 6.222 0 0 0 7 .778zm4.148 3.53l-4.919 6.324a.467.467 0 0 1-.34.18h-.028a.467.467 0 0 1-.331-.138L2.502 7.641a.467.467 0 0 1 0-.66l.516-.516a.467.467 0 0 1 .66 0l2.078 2.084 4.088-5.254a.467.467 0 0 1 .655-.078l.566.44a.467.467 0 0 1 .083.652z"/></symbol><symbol id="spectrum-icon-TripleGripper" viewBox="-4 -5.5 18 18"><path d="M9.49 6H.51a.5.5 0 1 0 0 1h8.98a.5.5 0 0 0 0-1zM9.49 3H.51a.5.5 0 1 0 0 1h8.98a.5.5 0 0 0 0-1zM.51 1h8.98a.5.5 0 0 0 0-1H.51a.5.5 0 0 0 0 1z"/></symbol></svg>`);
// CONCATENATED MODULE: ./src/icons/icons-medium.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


class icons_medium_IconsMedium extends iconset_svg_IconsetSVG {
  constructor() {
    super();
    this.name = 'ui'; // default iconset name for these icons
  }

  renderDefaultContent() {
    return icons_medium_svg;
  }
  /**
   * Overrides createIconName to make icon strings compatible with spectrum-icon id format
   * @param icon
   * @param size
   */


  getSVGIconName(icon) {
    return `spectrum-icon-${icon}`;
  }

  getSanitizedIconName(icon) {
    return icon.replace('spectrum-icon-', '');
  }

}
icons_medium_IconsMedium.is = 'sp-icons-medium';
// CONCATENATED MODULE: ./src/icons/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


// CONCATENATED MODULE: ./src/iconset/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



// CONCATENATED MODULE: ./src/sidenav/sidenav.css

const sidenav_styles = lit_element["b" /* css */]`
:host{display:block;width:240px;--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,400)}:host([variant=multilevel]){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-multilevel-main-item-font-weight,700)}ul{list-style-type:none;margin:0;padding:0}
`;
/* harmony default export */ var sidenav = (sidenav_styles);
// CONCATENATED MODULE: ./src/sidenav/sidenav.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var sidenav_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class sidenav_SideNav extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.value = undefined;
  }

  static get styles() {
    return [sidenav];
  }

  handleSelect(ev) {
    this.value = ev.detail.value;
  }

  render() {
    return lit_element["d" /* html */]`
            <nav @sidenav-select=${this.handleSelect}>
                <ul>
                    <slot></slot>
                </ul>
            </nav>
        `;
  }

}
sidenav_SideNav.is = 'sp-sidenav';

sidenav_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], sidenav_SideNav.prototype, "value", void 0);
// CONCATENATED MODULE: ./src/sidenav/sidenav-item.css

const sidenav_item_styles = lit_element["b" /* css */]`
#list{margin:0;padding:0}#list,:host{list-style-type:none}:host{margin:var(--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)) 0}#itemLink{position:relative;display:inline-flex;align-items:center;justify-content:left;box-sizing:border-box;width:100%;min-height:var(--spectrum-sidenav-item-height,var(--spectrum-global-dimension-size-400));padding:var(--spectrum-global-dimension-size-65) var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150));border-radius:var(--spectrum-sidenav-item-border-radius,var(--spectrum-global-dimension-size-50));font-size:var(--spectrum-sidenav-item-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-sidenav-item-font-weight,400);font-style:normal;text-decoration:none;word-break:break-word;-webkit-hyphens:auto;hyphens:auto;cursor:pointer;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out;background-color:var(--spectrum-sidenav-item-background-color,transparent);color:var(--spectrum-sidenav-item-text-color,var(--spectrum-global-color-gray-800))}#itemLink:focus{outline:none;background-color:var(--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover));color:var(--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-global-color-gray-900))}#itemLink:focus:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-color:transparent;border-radius:var(--spectrum-sidenav-item-border-radius,var(--spectrum-global-dimension-size-50));border:var(--spectrum-tabs-focus-ring-size,2px) solid var(--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-global-color-blue-400))}#itemLink .spectrum-SideNav-itemIcon{margin-right:var(--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100))}:host([selected])>#itemLink{color:var(--spectrum-sidenav-item-text-color-selected,var(--spectrum-global-color-gray-900));background-color:var(--spectrum-sidenav-item-background-color-selected,var(--spectrum-alias-highlight-hover))}.is-active>#itemLink{background-color:var(--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover))}:host([disabled]) #itemLink{background-color:var(--spectrum-sidenav-item-background-color-disabled,transparent);color:var(--spectrum-sidenav-item-text-color-disabled,var(--spectrum-global-color-gray-500));cursor:default;pointer-events:none}#itemLink:hover{background-color:var(--spectrum-sidenav-item-background-color-hover,var(--spectrum-alias-highlight-hover));color:var(--spectrum-sidenav-item-text-color-hover,var(--spectrum-global-color-gray-900))}#itemLink:active{background-color:var(--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover))}:host([multiLevel]){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,700)}::slotted(sp-sidenav-item){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,400)}#itemLink{font-weight:var(--spectrum-web-component-sidenav-font-weight)}#itemLink[data-level="1"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,
var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,
var(--spectrum-global-dimension-size-150)))}#itemLink[data-level="2"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,
var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,
var(--spectrum-global-dimension-size-150)))}
`;
/* harmony default export */ var sidenav_item = (sidenav_item_styles);
// CONCATENATED MODULE: ./src/sidenav/sidenav-item.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var sidenav_item_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class sidenav_item_SideNavItem extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.value = undefined;
    this.selected = false;
    this.disabled = false;
    this.expanded = true;
    this.href = undefined;
    this.target = undefined;
    this.label = '';
  }

  static get styles() {
    return [sidenav_item];
  }

  get parentSideNav() {
    return this.closest('sp-sidenav');
  }

  get hasChildren() {
    return !!this.querySelector('sp-sidenav-item');
  }

  get depth() {
    let depth = 0;
    let element = this.parentElement;

    while (element instanceof sidenav_item_SideNavItem) {
      depth++;
      element = element.parentElement;
    }

    return depth;
  }

  firstUpdated() {
    const parentSideNav = this.parentSideNav;

    if (parentSideNav) {
      parentSideNav.addEventListener('sp-sidenav:select', ev => this.handleSideNavSelect(ev));
      this.selected = this.value != null && this.value === parentSideNav.value;
    }
  }

  handleSideNavSelect(ev) {
    this.selected = ev.target === this;
  }

  handleClick() {
    if (this.value && !this.disabled) {
      if (this.hasChildren) {
        this.expanded = !this.expanded;
      } else {
        const selectDetail = {
          value: this.value
        };
        const selectionEvent = strictCustomEvent('sp-sidenav:select', {
          bubbles: true,
          composed: true,
          detail: selectDetail
        });
        this.dispatchEvent(selectionEvent);
      }
    }
  }

  render() {
    return lit_element["d" /* html */]`
            <a
                .href=${ifDefined(this.href)}
                .target=${ifDefined(this.target)}
                data-level="${this.depth}"
                @click="${this.handleClick}"
                id="itemLink"
            >
                ${this.label}
            </a>
            ${this.expanded ? lit_element["d" /* html */]`
                      <slot></slot>
                  ` : undefined}
        `;
  }

}
sidenav_item_SideNavItem.is = 'sp-sidenav-item';

sidenav_item_decorate([Object(lit_element["e" /* property */])()], sidenav_item_SideNavItem.prototype, "value", void 0);

sidenav_item_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], sidenav_item_SideNavItem.prototype, "selected", void 0);

sidenav_item_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], sidenav_item_SideNavItem.prototype, "disabled", void 0);

sidenav_item_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], sidenav_item_SideNavItem.prototype, "expanded", void 0);

sidenav_item_decorate([Object(lit_element["e" /* property */])()], sidenav_item_SideNavItem.prototype, "href", void 0);

sidenav_item_decorate([Object(lit_element["e" /* property */])()], sidenav_item_SideNavItem.prototype, "target", void 0);

sidenav_item_decorate([Object(lit_element["e" /* property */])()], sidenav_item_SideNavItem.prototype, "label", void 0);
// CONCATENATED MODULE: ./src/sidenav/sidenav-heading.css

const sidenav_heading_styles = lit_element["b" /* css */]`
#list{list-style-type:none;margin:0;padding:0}#heading{height:var(--spectrum-sidenav-header-height,var(--spectrum-global-dimension-size-400));line-height:var(--spectrum-sidenav-header-height,var(--spectrum-global-dimension-size-400));margin:var(--spectrum-sidenav-header-gap-top,var(--spectrum-global-dimension-size-200)) 0 var(--spectrum-sidenav-header-gap-bottom,var(--spectrum-global-dimension-size-50)) 0;padding:0 var(--spectrum-sidenav-header-padding-x,var(--spectrum-global-dimension-size-150));border-radius:var(--spectrum-sidenav-header-border-radius,var(--spectrum-global-dimension-size-50));font-size:var(--spectrum-sidenav-header-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-sidenav-header-font-weight,500);font-style:normal;letter-spacing:var(--spectrum-sidenav-header-letter-spacing,.06em);text-transform:uppercase;color:var(--spectrum-sidenav-header-text-color,var(--spectrum-global-color-gray-700))}:host{display:block}
`;
/* harmony default export */ var sidenav_heading = (sidenav_heading_styles);
// CONCATENATED MODULE: ./src/sidenav/sidenav-heading.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var sidenav_heading_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class sidenav_heading_SideNavHeading extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.label = '';
  }

  static get styles() {
    return [sidenav_item, sidenav_heading];
  }

  render() {
    return lit_element["d" /* html */]`
            <h2 id="heading">${this.label}</h2>
            <ul id="list" aria-labelledby="heading">
                <slot></slot>
            </ul>
        `;
  }

}
sidenav_heading_SideNavHeading.is = 'sp-sidenav-heading';

sidenav_heading_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], sidenav_heading_SideNavHeading.prototype, "label", void 0);
// CONCATENATED MODULE: ./src/sidenav/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



// CONCATENATED MODULE: ./src/switch/switch.css

const switch_styles = lit_element["b" /* css */]`
:host{display:inline-flex;align-items:flex-start;position:relative;min-height:var(--spectrum-switch-height,var(--spectrum-global-dimension-size-400));max-width:100%;margin-right:calc(var(--spectrum-switch-cursor-hit-x,
var(--spectrum-global-dimension-size-100))*2);vertical-align:top}#input{margin:0;box-sizing:border-box;padding:0;position:absolute;width:100%;height:100%;top:0;left:0;opacity:.0001;z-index:1;cursor:pointer}:host([checked]) #input+#switch:after{transform:translateX(calc(var(--spectrum-switch-track-width) - var(--spectrum-switch-handle-size,
var(--spectrum-global-dimension-size-175))));border-color:var(--spectrum-switch-handle-border-color-selected,var(--spectrum-global-color-blue-500))}#input[disabled],:host([disabled]) #input{cursor:default}#label{margin:0 var(--spectrum-switch-text-gap,var(--spectrum-global-dimension-size-125));font-size:var(--spectrum-switch-text-size,var(--spectrum-global-dimension-font-size-100));transition:color var(--spectrum-global-animation-duration-200,.16s) ease-in-out;margin-top:var(--spectrum-global-dimension-size-75)}#switch{display:inline-block;position:relative;height:var(--spectrum-switch-track-height,var(--spectrum-global-dimension-size-175));width:var(--spectrum-switch-track-width);margin:calc((var(--spectrum-switch-height,
var(--spectrum-global-dimension-size-400)) - var(--spectrum-switch-track-height,
var(--spectrum-global-dimension-size-175)))/2) 0;flex-grow:0;flex-shrink:0;vertical-align:middle}#switch:after,#switch:before{display:block;position:absolute;content:"";box-sizing:border-box}#switch:before{transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out;height:var(--spectrum-switch-track-height,var(--spectrum-global-dimension-size-175));left:0;right:0;border-radius:calc(var(--spectrum-switch-track-height,
var(--spectrum-global-dimension-size-175))/2);background-color:var(--spectrum-switch-track-color,var(--spectrum-global-color-gray-300))}#switch:after{transition:background var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border var(--spectrum-global-animation-duration-100,.13s) ease-in-out,transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-switch-handle-size,var(--spectrum-global-dimension-size-175));height:var(--spectrum-switch-handle-size,var(--spectrum-global-dimension-size-175));top:0;left:0;border-radius:var(--spectrum-switch-handle-border-radius,var(--spectrum-global-dimension-size-85));background-color:var(--spectrum-switch-handle-background-color,var(--spectrum-global-color-gray-75));border:var(--spectrum-switch-handle-border-size,2px) solid var(--spectrum-switch-handle-border-color,var(--spectrum-global-color-gray-600))}#input~#label{color:var(--spectrum-switch-text-color,var(--spectrum-global-color-gray-800))}:host([checked]) #input+#switch:before{background-color:var(--spectrum-switch-track-color-selected,var(--spectrum-global-color-blue-500))}:host(:hover) #input+#switch:after{border-color:var(--spectrum-switch-handle-border-color-hover,var(--spectrum-global-color-gray-700));box-shadow:none}:host(:hover) #input~#label{color:var(--spectrum-switch-text-color-hover,var(--spectrum-global-color-gray-900))}:host(:hover[checked]) #input:enabled+#switch:before{background-color:var(--spectrum-switch-track-color-selected-hover,var(--spectrum-global-color-blue-600))}:host(:hover[checked]) #input:enabled+#switch:after{border-color:var(--spectrum-switch-handle-border-color-selected-hover,var(--spectrum-global-color-blue-600))}:host(:active) #input+#switch:after{border-color:var(--spectrum-switch-handle-border-color-down,var(--spectrum-global-color-gray-800))}:host(:active) #input~#label{color:var(--spectrum-switch-text-color-down,var(--spectrum-global-color-gray-900))}:host(:active[checked]) #input:enabled+#switch:before{background-color:var(--spectrum-switch-track-color-selected-down,var(--spectrum-global-color-blue-700))}:host(:active[checked]) #input:enabled+#switch:after{border-color:var(--spectrum-switch-handle-border-color-selected-down,var(--spectrum-global-color-blue-700))}:host([disabled]) #input+#switch:before{background-color:var(--spectrum-switch-track-color-disabled,var(--spectrum-global-color-gray-300))}:host([disabled]) #input+#switch:after{border-color:var(--spectrum-switch-handle-border-color-disabled,var(--spectrum-global-color-gray-400))}:host([disabled]) #input~#label{color:var(--spectrum-switch-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([disabled][checked]) #input+#switch:before{background-color:var(--spectrum-switch-track-color-selected-disabled,var(--spectrum-global-color-gray-400))}:host([disabled][checked]) #input+#switch:after{border-color:var(--spectrum-switch-handle-border-color-selected-disabled,var(--spectrum-global-color-gray-400))}:host([disabled][checked]) #input~#label{color:var(--spectrum-switch-text-color-selected-disabled,var(--spectrum-global-color-gray-500))}:host([quiet][checked]) #input+#switch:before{background-color:var(--spectrum-switch-quiet-track-color-selected,var(--spectrum-global-color-gray-700))}:host([quiet][checked]) #input+#switch:after{border-color:var(--spectrum-switch-quiet-handle-border-color-selected,var(--spectrum-global-color-gray-700))}:host([quiet][checked]) :hover #input:enabled+#switch:before{background-color:var(--spectrum-switch-quiet-track-color-selected-hover,var(--spectrum-global-color-gray-800))}:host([quiet][checked]) :hover #input:enabled+#switch:after{border-color:var(--spectrum-switch-quiet-handle-border-color-selected-hover,var(--spectrum-global-color-gray-800))}:host(:active[quiet][checked]) #input:enabled+#switch:before{background-color:var(--spectrum-switch-quiet-track-color-selected-down,var(--spectrum-global-color-gray-900))}:host(:active[quiet][checked]) #input:enabled+#switch:after{border-color:var(--spectrum-switch-quiet-handle-border-color-selected-down,var(--spectrum-global-color-gray-900))}#input:focus+#switch:after,:host(:hover) #input:focus+#switch:after,:host([quiet]) #input:focus+#switch:after,:host([quiet]) :hover #input:focus+#switch:after{border-color:var(--spectrum-switch-handle-border-color-key-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 1px var(--spectrum-switch-handle-border-color-key-focus,var(--spectrum-global-color-blue-400))}#input:focus~#label,:host(:hover) #input:focus~#label,:host([quiet]) #input:focus~#label,:host([quiet]) :hover #input:focus~#label{color:var(--spectrum-switch-text-color-key-focus,var(--spectrum-global-color-blue-600))}:host(:hover[checked]) #input:focus+#switch:before,:host([checked]) #input:focus+#switch:before,:host([quiet][checked]) #input:focus+#switch:before,:host([quiet][checked]) :hover #input:focus+#switch:before{background-color:var(--spectrum-switch-track-color-selected-key-focus,var(--spectrum-global-color-blue-400))}:host(:hover[checked]) #input:focus+#switch:after,:host([checked]) #input:focus+#switch:after,:host([quiet][checked]) #input:focus+#switch:after,:host([quiet][checked]) :hover #input:focus+#switch:after{border-color:var(--spectrum-switch-handle-border-color-selected-key-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 1px var(--spectrum-switch-handle-border-color-selected-key-focus,var(--spectrum-global-color-blue-400))}:host(:hover[checked]) #input:focus~#label,:host([checked]) #input:focus~#label,:host([quiet][checked]) #input:focus~#label,:host([quiet][checked]) :hover #input:focus~#label{color:var(--spectrum-switch-text-color-selected-key-focus,var(--spectrum-global-color-blue-600))}
`;
/* harmony default export */ var switch_switch = (switch_styles);
// CONCATENATED MODULE: ./src/switch/switch.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



class switch_Switch extends checkbox_base_CheckboxBase {
  static get styles() {
    return [switch_switch];
  }

  render() {
    return lit_element["d" /* html */]`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `;
  }

}
// CONCATENATED MODULE: ./src/switch/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-switch')) {
  customElements.define('sp-switch', switch_Switch);
}
// CONCATENATED MODULE: ./src/tab/tab.css

const tab_styles = lit_element["b" /* css */]`
#tab{position:relative;box-sizing:border-box;height:calc(var(--spectrum-tabs-height, var(--spectrum-global-dimension-size-600)) - var(--spectrum-tabs-rule-height, 2px));line-height:calc(var(--spectrum-tabs-height, var(--spectrum-global-dimension-size-600)) - var(--spectrum-tabs-rule-height, 2px));z-index:1;text-decoration:none;white-space:nowrap;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-out;cursor:pointer;outline:none;color:var(--spectrum-tabs-text-color,var(--spectrum-global-color-gray-700))}:host([disabled]) #tab{cursor:default;color:var(--spectrum-tabs-text-color-disabled,var(--spectrum-global-color-gray-500))}:host([disabled]) #tab #itemLabel{cursor:default}::slotted([slot=icon]){height:calc(var(--spectrum-tabs-height, var(--spectrum-global-dimension-size-600)) - var(--spectrum-tabs-rule-height, 2px));color:var(--spectrum-tabs-icon-color,var(--spectrum-global-color-gray-700))}slot[name=icon]+#itemLabel{margin-left:calc(var(--spectrum-tabs-icon-gap, var(--spectrum-global-dimension-size-100)) - var(--spectrum-global-dimension-size-40))}#tab:before{content:"";position:absolute;top:50%;box-sizing:border-box;height:var(--spectrum-tabs-focus-ring-height,var(--spectrum-global-dimension-size-400));margin-top:calc(var(--spectrum-tabs-focus-ring-height,
var(--spectrum-global-dimension-size-400))/-2 + var(--spectrum-tabs-rule-height, 2px)/2);left:calc(-1*var(--spectrum-tabs-focus-ring-padding-x, var(--spectrum-global-dimension-size-100)));right:calc(-1*var(--spectrum-tabs-focus-ring-padding-x, var(--spectrum-global-dimension-size-100)));border:var(--spectrum-tabs-focus-ring-size,2px) solid transparent;border-radius:var(--spectrum-tabs-focus-ring-border-radius,var(--spectrum-global-dimension-size-65));pointer-events:none}#itemLabel{cursor:pointer;vertical-align:top;display:inline-block;font-size:var(--spectrum-tabs-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-tabs-text-font-weight,400)}#itemLabel:empty{display:none}#tab:hover{color:var(--spectrum-tabs-text-color-hover,var(--spectrum-global-color-gray-900))}#tab:hover ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-hover,var(--spectrum-global-color-gray-900))}:host([selected]) #tab{color:var(--spectrum-tabs-text-color-selected,var(--spectrum-global-color-gray-900))}:host([selected]) #tab ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-selected,var(--spectrum-global-color-gray-900))}#tab:focus{color:var(--spectrum-tabs-text-color-key-focus,var(--spectrum-global-color-gray-900))}#tab:focus:before{border-color:var(--spectrum-tabs-focus-ring-color,var(--spectrum-global-color-blue-400))}#tab:focus ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-key-focus,var(--spectrum-global-color-gray-900))}:host([disabled]) #tab ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-disabled,var(--spectrum-global-color-gray-400))}
`;
/* harmony default export */ var tab = (tab_styles);
// CONCATENATED MODULE: ./src/tab/tab.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var tab_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/**
 * @slot icon - The icon that appears on the left of the label
 */

class tab_Tab extends focusable_Focusable {
  constructor() {
    super(...arguments);
    this.label = '';
    this.selected = false;
    this.value = '';
  }

  static get styles() {
    return [tab];
  }

  get focusElement() {
    return this.tabElement;
  }

  render() {
    return lit_element["d" /* html */]`
            <div id="tab">
                <slot name="icon"></slot>
                <label id="itemLabel">
                    ${this.label}
                </label>
            </div>
        `;
  }

}

tab_decorate([Object(lit_element["f" /* query */])('#tab')], tab_Tab.prototype, "tabElement", void 0);

tab_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], tab_Tab.prototype, "label", void 0);

tab_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], tab_Tab.prototype, "selected", void 0);

tab_decorate([Object(lit_element["e" /* property */])({
  type: String,
  reflect: true
})], tab_Tab.prototype, "value", void 0);
// CONCATENATED MODULE: ./src/tab/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-tab')) {
  customElements.define('sp-tab', tab_Tab);
}
// CONCATENATED MODULE: ./src/tab-list/tab-list.css

const tab_list_styles = lit_element["b" /* css */]`
:host{display:flex;position:relative;z-index:0;margin:0;padding:0 var(--spectrum-tabs-focus-ring-padding-x,var(--spectrum-global-dimension-size-100));vertical-align:top;border-bottom-color:var(--spectrum-tabs-rule-color,var(--spectrum-global-color-gray-200))}#selectionIndicator{position:absolute;left:0;z-index:0;transition:transform var(--spectrum-tabs-selection-indicator-animation-duration,.13s) ease-in-out;transform-origin:top left;border-radius:var(--spectrum-tabs-rule-border-radius,1px);background-color:var(--spectrum-tabs-selection-indicator-color,var(--spectrum-global-color-gray-900))}:host([compact]) ::slotted(*){line-height:calc(var(--spectrum-tabs-quiet-compact-height,
var(--spectrum-global-dimension-size-400)) - var(--spectrum-tabs-rule-height, 2px))}:host([compact]) ::slotted(*),:host([compact]) ::slotted(*) .spectrum-Icon{height:calc(var(--spectrum-tabs-quiet-compact-height,
var(--spectrum-global-dimension-size-400)) - var(--spectrum-tabs-rule-height, 2px))}:host([direction=horizontal]){align-items:center;border-bottom:var(--spectrum-tabs-rule-height,2px) solid}:host([direction=horizontal]) ::slotted(*){vertical-align:top}:host([direction=horizontal]) ::slotted(*)+:not(.spectrum-Tabs-selectionIndicator){margin-left:var(--spectrum-tabs-item-gap,var(--spectrum-global-dimension-size-300))}:host([direction=horizontal]) #selectionIndicator{position:absolute;bottom:0;height:var(--spectrum-tabs-rule-height,2px);bottom:calc(-1*var(--spectrum-tabs-rule-height, 2px))}:host([direction=horizontal][compact]){box-sizing:initial;height:calc(var(--spectrum-tabs-quiet-compact-height,
var(--spectrum-global-dimension-size-400)) - var(--spectrum-tabs-rule-height, 2px));align-items:end}:host([quiet]){display:inline-flex;border-bottom-color:var(--spectrum-tabs-quiet-rule-color,transparent)}:host([direction=vertical]){display:inline-flex;flex-direction:column;padding:0;border-left:var(--spectrum-tabs-vertical-rule-width,2px) solid;border-left-color:var(--spectrum-tabs-vertical-rule-color,var(--spectrum-global-color-gray-200))}:host([direction=vertical]) ::slotted(*){height:var(--spectrum-tabs-vertical-item-height,var(--spectrum-global-dimension-size-550));padding:0 var(--spectrum-tabs-focus-ring-padding-x,var(--spectrum-global-dimension-size-100));margin-left:calc(var(--spectrum-tabs-vertical-item-margin-left,
var(--spectrum-global-dimension-size-150)) - var(--spectrum-tabs-focus-ring-padding-x,
var(--spectrum-global-dimension-size-100)));margin-bottom:var(--spectrum-tabs-vertical-item-gap,var(--spectrum-global-dimension-size-50))}:host([direction=vertical]) ::slotted(*):before{left:calc(-1*var(--spectrum-tabs-focus-ring-size, 2px));right:calc(-1*var(--spectrum-tabs-focus-ring-size, 2px));margin-top:calc(var(--spectrum-tabs-focus-ring-height,
var(--spectrum-global-dimension-size-400))/-2)}:host([direction=vertical][compact]) ::slotted(*){line-height:var(--spectrum-tabs-compact-vertical-item-height,var(--spectrum-global-dimension-size-400));margin-bottom:var(--spectrum-tabs-compact-vertical-item-gap,var(--spectrum-global-dimension-size-50))}:host([direction=vertical][compact]) ::slotted(*),:host([direction=vertical][compact]) ::slotted(*) .spectrum-Icon{height:var(--spectrum-tabs-compact-vertical-item-height,var(--spectrum-global-dimension-size-400))}:host([direction=vertical]) #selectionIndicator{position:absolute;left:0;width:var(--spectrum-tabs-vertical-rule-width,2px);left:calc(-1*var(--spectrum-tabs-vertical-rule-width, 2px))}:host([quiet]) #selectionIndicator{background-color:var(--spectrum-tabs-quiet-selection-indicator-color,var(--spectrum-global-color-gray-900))}:host([direction=vertical][compact]),:host([direction=vertical][quiet]){border-left-color:var(--spectrum-tabs-quiet-vertical-rule-color,transparent)}:host([direction=vertical][compact]) #selectionIndicator,:host([direction=vertical][quiet]) #selectionIndicator{background-color:var(--spectrum-tabs-quiet-selection-indicator-color,var(--spectrum-global-color-gray-900))}:host([direction=horizontal]){border-bottom-color:var(--spectrum-tabs-rule-color,var(--spectrum-global-color-gray-200))}:host([direction=horizontal]) ::slotted(sp-tab:not(:first-child)){margin-left:var(--spectrum-tabs-item-gap,var(--spectrum-global-dimension-size-300))}:host([compact]){--spectrum-tabs-height:var(--spectrum-tabs-quiet-compact-height)}
`;
/* harmony default export */ var tab_list = (tab_list_styles);
// CONCATENATED MODULE: ./src/tab-list/tab-list.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var tab_list_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/**
 * @slot - Child tab elements
 * @attr {Boolean} quiet - The tab-list border is a lot smaller
 * @attr {Boolean} compact - The collection of tabs take up less space
 */

class tab_list_TabList extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.direction = 'horizontal';
    this.selectionIndicatorStyle = '';
    this.value = '';
    this._selected = '';
  }

  static get styles() {
    return [tab_list];
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    const oldValue = this.selected;

    if (value === oldValue) {
      return;
    }

    this.updateCheckedState(value);
    this._selected = value;
    this.requestUpdate('selected', oldValue);
  }

  render() {
    return lit_element["d" /* html */]`
            <slot
                @click=${this.onClick}
                @keydown=${this.onKeyDown}
                @slotchange=${this.onSlotChange}
            ></slot>
            <div
                id="selectionIndicator"
                style=${this.selectionIndicatorStyle}
            ></div>
        `;
  }

  onClick(ev) {
    const target = ev.target;

    if (target) {
      this.selectTarget(target);
    }
  }

  onKeyDown(ev) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      const target = ev.target;

      if (target) {
        this.selectTarget(target);
      }
    }
  }

  selectTarget(target) {
    const value = target.getAttribute('value');

    if (value) {
      const applyDefault = this.dispatchEvent(new Event('change'));

      if (applyDefault) {
        this.selected = value;
      }
    }
  }

  onSlotChange() {
    this.updateCheckedState(this.selected);
  }

  updateCheckedState(value) {
    const previousChecked = this.querySelectorAll('[selected]');
    previousChecked.forEach(element => {
      element.removeAttribute('selected');
    });

    if (value.length) {
      const currentChecked = this.querySelector(`[value="${value}"]`);

      if (currentChecked) {
        currentChecked.setAttribute('selected', '');
      }
    }

    this.updateSelectionIndicator();
  }

  updateSelectionIndicator() {
    const selectedElement = this.querySelector('[selected]');

    if (!selectedElement) {
      return;
    }

    const bounds = selectedElement.getBoundingClientRect();

    if (this.direction === 'horizontal') {
      const width = bounds.width;
      const parentOffset = this.getBoundingClientRect().left;
      const offset = bounds.left - parentOffset;
      this.selectionIndicatorStyle = `width: ${width}px; transform: translateX(${offset}px)`;
    } else {
      const height = bounds.height;
      const parentOffset = this.getBoundingClientRect().top;
      const offset = bounds.top - parentOffset;
      this.selectionIndicatorStyle = `height: ${height}px; transform: translateY(${offset}px)`;
    }
  }

}

tab_list_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], tab_list_TabList.prototype, "direction", void 0);

tab_list_decorate([Object(lit_element["e" /* property */])()], tab_list_TabList.prototype, "selectionIndicatorStyle", void 0);

tab_list_decorate([Object(lit_element["e" /* property */])({
  type: String,
  reflect: true
})], tab_list_TabList.prototype, "value", void 0);

tab_list_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], tab_list_TabList.prototype, "selected", null);
// CONCATENATED MODULE: ./src/tab-list/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-tab-list')) {
  customElements.define('sp-tab-list', tab_list_TabList);
}
// CONCATENATED MODULE: ./src/themes/theme-dark.css

const theme_dark_styles = lit_element["b" /* css */]`
:host,:root{--spectrum-global-color-celery-400:#44b556;--spectrum-global-color-celery-500:#4bc35f;--spectrum-global-color-celery-600:#51d267;--spectrum-global-color-celery-700:#58e06f;--spectrum-global-color-chartreuse-400:#85d044;--spectrum-global-color-chartreuse-500:#8ede49;--spectrum-global-color-chartreuse-600:#9bec54;--spectrum-global-color-chartreuse-700:#a3f858;--spectrum-global-color-yellow-400:#dfbf00;--spectrum-global-color-yellow-500:#edcc00;--spectrum-global-color-yellow-600:#fad900;--spectrum-global-color-yellow-700:#ffe22e;--spectrum-global-color-magenta-400:#d83790;--spectrum-global-color-magenta-500:#e2499d;--spectrum-global-color-magenta-600:#ec5aaa;--spectrum-global-color-magenta-700:#f56bb7;--spectrum-global-color-fuchsia-400:#c038cc;--spectrum-global-color-fuchsia-500:#cf3edc;--spectrum-global-color-fuchsia-600:#d951e5;--spectrum-global-color-fuchsia-700:#e366ef;--spectrum-global-color-purple-400:#9256d9;--spectrum-global-color-purple-500:#9d64e1;--spectrum-global-color-purple-600:#a873e9;--spectrum-global-color-purple-700:#b483f0;--spectrum-global-color-indigo-400:#6767ec;--spectrum-global-color-indigo-500:#7575f1;--spectrum-global-color-indigo-600:#8282f6;--spectrum-global-color-indigo-700:#9090fa;--spectrum-global-color-seafoam-400:#1b959a;--spectrum-global-color-seafoam-500:#20a3a8;--spectrum-global-color-seafoam-600:#23b2b8;--spectrum-global-color-seafoam-700:#26c0c7;--spectrum-global-color-red-400:#e34850;--spectrum-global-color-red-500:#ec5b62;--spectrum-global-color-red-600:#f76d74;--spectrum-global-color-red-700:#ff7b82;--spectrum-global-color-orange-400:#e68619;--spectrum-global-color-orange-500:#f29423;--spectrum-global-color-orange-600:#f9a43f;--spectrum-global-color-orange-700:#ffb55b;--spectrum-global-color-green-400:#2d9d78;--spectrum-global-color-green-500:#33ab84;--spectrum-global-color-green-600:#39b990;--spectrum-global-color-green-700:#3fc89c;--spectrum-global-color-blue-400:#2680eb;--spectrum-global-color-blue-500:#378ef0;--spectrum-global-color-blue-600:#4b9cf5;--spectrum-global-color-blue-700:#5aa9fa;--spectrum-global-color-gray-50:#252525;--spectrum-alias-pasteboard-background-color:#252525;--spectrum-global-color-gray-75:#2f2f2f;--spectrum-global-color-gray-100:#323232;--spectrum-global-color-gray-200:#3e3e3e;--spectrum-global-color-gray-300:#4a4a4a;--spectrum-global-color-gray-400:#5a5a5a;--spectrum-global-color-gray-500:#6e6e6e;--spectrum-global-color-gray-600:#909090;--spectrum-global-color-gray-700:#b9b9b9;--spectrum-global-color-gray-800:#e3e3e3;--spectrum-global-color-gray-900:#fff;--spectrum-alias-background-color-modal-overlay:rgba(0,0,0,0.5);--spectrum-alias-dropshadow-color:rgba(0,0,0,0.5);--spectrum-alias-background-color-hover-overlay:hsla(0,0%,100%,0.06);--spectrum-alias-highlight-hover:hsla(0,0%,100%,0.07);--spectrum-alias-highlight-active:hsla(0,0%,100%,0.1);--spectrum-colorarea-border-color:hsla(0,0%,100%,0.1);--spectrum-alias-highlight-selected:rgba(55,142,240,0.15);--spectrum-alias-highlight-selected-hover:rgba(55,142,240,0.25);--spectrum-alias-background-color-quickactions:rgba(50,50,50,0.9);--spectrum-alias-radial-reaction-color-default:hsla(0,0%,89%,0.6);--spectrum-miller-column-item-background-color-selected:rgba(55,142,240,0.1);--spectrum-miller-column-item-background-color-selected-hover:rgba(55,142,240,0.2);--spectrum-well-background-color:hsla(0,0%,89%,0.02);--spectrum-well-border-color:hsla(0,0%,100%,0.05)}:host{display:block}
`;
/* harmony default export */ var theme_dark = (theme_dark_styles);
// CONCATENATED MODULE: ./src/themes/theme-dark.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


class theme_dark_ThemeDark extends lit_element["a" /* LitElement */] {
  static get styles() {
    return [theme_dark];
  }

  render() {
    return lit_element["d" /* html */]`
            <slot></slot>
        `;
  }

}
// CONCATENATED MODULE: ./src/themes/scale-medium.css

const scale_medium_styles = lit_element["b" /* css */]`
:host,:root{--spectrum-global-dimension-scale-factor:1;--spectrum-global-dimension-size-40:3px;--spectrum-actionbutton-touch-hit-x:8px;--spectrum-dropdown-quiet-touch-hit-y:32px;--spectrum-selectlist-option-icon-margin-top:5px;--spectrum-global-dimension-size-50:4px;--spectrum-global-dimension-size-65:5px;--spectrum-global-dimension-size-75:6px;--spectrum-colorhandle-loupe-margin:10px;--spectrum-radio-margin-bottom:0px;--spectrum-global-dimension-size-85:7px;--spectrum-colorslider-touch-hit-y:12px;--spectrum-global-dimension-size-100:8px;--spectrum-icon-skip-left-width:9px;--spectrum-global-dimension-size-115:9px;--spectrum-global-dimension-size-125:10px;--spectrum-global-dimension-font-size-50:11px;--spectrum-global-dimension-size-130:11px;--spectrum-slider-handle-touch-hit-x:16px;--spectrum-global-dimension-size-150:12px;--spectrum-dialog-content-text-size:14px;--spectrum-global-dimension-size-160:13px;--spectrum-icon-checkmark-medium-width:12px;--spectrum-selectlist-option-icon-padding-y:10px;--spectrum-global-dimension-size-175:14px;--spectrum-global-dimension-font-size-150:15px;--spectrum-global-dimension-size-200:16px;--spectrum-fieldbutton-quiet-min-width:18px;--spectrum-global-dimension-size-225:18px;--spectrum-alias-heading3-margin-top:20px;--spectrum-global-dimension-size-250:20px;--spectrum-tabs-baseline:18px;--spectrum-global-dimension-size-300:24px;--spectrum-global-dimension-size-350:28px;--spectrum-global-dimension-size-400:32px;--spectrum-dialog-content-margin-bottom:48px;--spectrum-global-dimension-size-450:36px;--spectrum-global-dimension-size-500:40px;--spectrum-global-dimension-size-550:44px;--spectrum-global-dimension-size-600:48px;--spectrum-global-dimension-size-700:56px;--spectrum-global-dimension-size-800:64px;--spectrum-global-dimension-size-900:72px;--spectrum-global-dimension-size-1000:80px;--spectrum-global-dimension-size-1200:96px;--spectrum-global-dimension-size-1600:128px;--spectrum-global-dimension-size-1700:136px;--spectrum-global-dimension-size-2400:192px;--spectrum-global-dimension-size-3000:240px;--spectrum-global-dimension-size-3400:272px;--spectrum-global-dimension-size-3600:288px;--spectrum-global-dimension-size-4600:368px;--spectrum-global-dimension-size-5000:400px;--spectrum-global-dimension-size-6000:480px;--spectrum-global-dimension-font-size-25:10px;--spectrum-checkbox-text-gap-key-focus:9px;--spectrum-global-dimension-font-size-100:14px;--spectrum-global-dimension-font-size-200:16px;--spectrum-dialog-title-text-size:18px;--spectrum-global-dimension-font-size-400:20px;--spectrum-alias-heading3-text-size:22px;--spectrum-dialog-padding:40px;--spectrum-global-dimension-font-size-500:22px;--spectrum-alias-heading2-margin-top:25px;--spectrum-global-dimension-font-size-600:25px;--spectrum-alias-heading2-text-size:28px;--spectrum-global-dimension-font-size-700:28px;--spectrum-alias-heading1-margin-top:32px;--spectrum-global-dimension-font-size-800:32px;--spectrum-alias-heading-display2-margin-top:36px;--spectrum-global-dimension-font-size-900:36px;--spectrum-alias-heading-display1-margin-top:40px;--spectrum-global-dimension-font-size-1000:40px;--spectrum-alias-heading-display1-text-size:45px;--spectrum-global-dimension-font-size-1100:45px;--spectrum-barloader-small-border-radius:2px;--spectrum-pagination-page-button-line-height:26px;--spectrum-button-cta-min-width:72px;--spectrum-selectlist-option-height:32px;--spectrum-colorwheel-min-size:192px;--spectrum-dialog-max-width:480px;--spectrum-switch-track-width:26px;--spectrum-tabs-compact-margin-left:-8px;--spectrum-tooltip-content-max-width:101px}:host{display:block}
`;
/* harmony default export */ var scale_medium = (scale_medium_styles);
// CONCATENATED MODULE: ./src/themes/scale-medium.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


class scale_medium_ScaleMedium extends lit_element["a" /* LitElement */] {
  static get styles() {
    return [scale_medium];
  }

  render() {
    return lit_element["d" /* html */]`
            <slot></slot>
        `;
  }

}
// CONCATENATED MODULE: ./src/themes/theme-light.css

const theme_light_styles = lit_element["b" /* css */]`
:host,:root{--spectrum-global-color-celery-400:#44b556;--spectrum-global-color-celery-500:#3da74e;--spectrum-global-color-celery-600:#379947;--spectrum-global-color-celery-700:#318b40;--spectrum-global-color-chartreuse-400:#85d044;--spectrum-global-color-chartreuse-500:#7cc33f;--spectrum-global-color-chartreuse-600:#73b53a;--spectrum-global-color-chartreuse-700:#6aa834;--spectrum-global-color-yellow-400:#dfbf00;--spectrum-global-color-yellow-500:#d2b200;--spectrum-global-color-yellow-600:#c4a600;--spectrum-global-color-yellow-700:#b79900;--spectrum-global-color-magenta-400:#d83790;--spectrum-global-color-magenta-500:#ce2783;--spectrum-global-color-magenta-600:#bc1c74;--spectrum-global-color-magenta-700:#ae0e66;--spectrum-global-color-fuchsia-400:#c038cc;--spectrum-global-color-fuchsia-500:#b130bd;--spectrum-global-color-fuchsia-600:#a228ad;--spectrum-global-color-fuchsia-700:#93219e;--spectrum-global-color-purple-400:#9256d9;--spectrum-global-color-purple-500:#864ccc;--spectrum-global-color-purple-600:#7a42bf;--spectrum-global-color-purple-700:#6f38b1;--spectrum-global-color-indigo-400:#6767ec;--spectrum-global-color-indigo-500:#5c5ce0;--spectrum-global-color-indigo-600:#5151d3;--spectrum-global-color-indigo-700:#4646c6;--spectrum-global-color-seafoam-400:#1b959a;--spectrum-global-color-seafoam-500:#16878c;--spectrum-global-color-seafoam-600:#0f797d;--spectrum-global-color-seafoam-700:#096c6f;--spectrum-global-color-red-400:#e34850;--spectrum-global-color-red-500:#d7373f;--spectrum-global-color-red-600:#c9252d;--spectrum-global-color-red-700:#bb121a;--spectrum-global-color-orange-400:#e68619;--spectrum-global-color-orange-500:#da7b11;--spectrum-global-color-orange-600:#cb6f10;--spectrum-global-color-orange-700:#bd640d;--spectrum-global-color-green-400:#2d9d78;--spectrum-global-color-green-500:#268e6c;--spectrum-global-color-green-600:#12805c;--spectrum-global-color-green-700:#107154;--spectrum-global-color-blue-400:#2680eb;--spectrum-global-color-blue-500:#1473e6;--spectrum-global-color-blue-600:#0d66d0;--spectrum-global-color-blue-700:#095aba;--spectrum-global-color-gray-50:#fff;--spectrum-alias-pasteboard-background-color:#e1e1e1;--spectrum-global-color-gray-75:#fafafa;--spectrum-global-color-gray-100:#f5f5f5;--spectrum-global-color-gray-200:#eaeaea;--spectrum-global-color-gray-300:#e1e1e1;--spectrum-global-color-gray-400:#cacaca;--spectrum-global-color-gray-500:#b3b3b3;--spectrum-global-color-gray-600:#8e8e8e;--spectrum-global-color-gray-700:#6e6e6e;--spectrum-global-color-gray-800:#4b4b4b;--spectrum-global-color-gray-900:#2c2c2c;--spectrum-alias-background-color-modal-overlay:rgba(0,0,0,0.4);--spectrum-alias-dropshadow-color:rgba(0,0,0,0.15);--spectrum-alias-background-color-hover-overlay:rgba(44,44,44,0.04);--spectrum-alias-highlight-hover:rgba(44,44,44,0.06);--spectrum-alias-highlight-active:rgba(44,44,44,0.1);--spectrum-colorarea-border-color:rgba(44,44,44,0.1);--spectrum-alias-highlight-selected:rgba(20,115,230,0.1);--spectrum-alias-highlight-selected-hover:rgba(20,115,230,0.2);--spectrum-alias-background-color-quickactions:hsla(0,0%,96.1%,0.9);--spectrum-alias-radial-reaction-color-default:rgba(75,75,75,0.6);--spectrum-miller-column-item-background-color-selected:rgba(20,115,230,0.1);--spectrum-miller-column-item-background-color-selected-hover:rgba(20,115,230,0.2);--spectrum-well-background-color:rgba(75,75,75,0.02);--spectrum-well-border-color:rgba(44,44,44,0.05)}:host{display:block}
`;
/* harmony default export */ var theme_light = (theme_light_styles);
// CONCATENATED MODULE: ./src/themes/theme-light.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


class theme_light_ThemeLight extends lit_element["a" /* LitElement */] {
  static get styles() {
    return [theme_light];
  }

  render() {
    return lit_element["d" /* html */]`
            <slot></slot>
        `;
  }

}
// CONCATENATED MODULE: ./src/themes/theme.css

const theme_styles = lit_element["b" /* css */]`
:host,:root{--spectrum-global-color-static-black:#000;--spectrum-global-color-static-white:#fff;--spectrum-global-color-static-blue:#1473e6;--spectrum-global-color-static-gray-50:#fff;--spectrum-global-color-static-gray-75:#fff;--spectrum-global-color-static-gray-100:#fff;--spectrum-global-color-static-gray-200:#f4f4f4;--spectrum-global-color-static-gray-300:#eaeaea;--spectrum-global-color-static-gray-400:#d3d3d3;--spectrum-global-color-static-gray-500:#bcbcbc;--spectrum-global-color-static-gray-600:#959595;--spectrum-global-color-static-gray-700:#747474;--spectrum-global-color-static-gray-800:#505050;--spectrum-global-color-static-gray-900:#323232;--spectrum-global-color-static-blue-400:#378ef0;--spectrum-global-color-static-blue-500:#2680eb;--spectrum-global-color-static-blue-600:#1473e6;--spectrum-global-color-static-blue-700:#0d66d0;--spectrum-global-color-static-red-400:#ec5b62;--spectrum-global-color-static-red-500:#e34850;--spectrum-global-color-static-red-600:#d7373f;--spectrum-global-color-static-red-700:#c9252d;--spectrum-global-color-static-orange-400:#f29423;--spectrum-global-color-static-orange-500:#e68619;--spectrum-global-color-static-orange-600:#da7b11;--spectrum-global-color-static-orange-700:#cb6f10;--spectrum-global-color-static-green-400:#33ab84;--spectrum-global-color-static-green-500:#2d9d78;--spectrum-global-color-static-green-600:#268e6c;--spectrum-global-color-static-green-700:#12805c;--spectrum-global-color-opacity-100:1;--spectrum-global-color-opacity-90:0.9;--spectrum-global-color-opacity-80:0.8;--spectrum-global-color-opacity-60:0.6;--spectrum-global-color-opacity-50:0.5;--spectrum-global-color-opacity-40:0.4;--spectrum-global-color-opacity-30:0.3;--spectrum-global-color-opacity-25:0.25;--spectrum-global-color-opacity-20:0.2;--spectrum-global-color-opacity-15:0.15;--spectrum-global-color-opacity-10:0.1;--spectrum-global-color-opacity-8:0.08;--spectrum-global-color-opacity-7:0.07;--spectrum-global-color-opacity-6:0.06;--spectrum-global-color-opacity-5:0.05;--spectrum-global-color-opacity-4:0.04;--spectrum-global-font-family-base:adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-global-font-family-serif:adobe-clean-serif,"Source Serif Pro",Georgia,serif;--spectrum-global-font-family-code:"Source Code Pro",Monaco,monospace;--spectrum-global-font-weight-thin:100;--spectrum-global-font-weight-ultra-light:200;--spectrum-global-font-weight-light:300;--spectrum-global-font-weight-regular:400;--spectrum-global-font-weight-medium:500;--spectrum-global-font-weight-semi-bold:600;--spectrum-global-font-weight-bold:700;--spectrum-global-font-weight-extra-bold:800;--spectrum-global-font-weight-black:900;--spectrum-global-font-style-regular:normal;--spectrum-global-font-style-italic:italic;--spectrum-global-font-letter-spacing-none:0;--spectrum-global-font-letter-spacing-small:0.0125em;--spectrum-global-font-letter-spacing-han:0.05em;--spectrum-global-font-letter-spacing-medium:0.06em;--spectrum-global-font-line-height-large:1.7;--spectrum-global-font-line-height-medium:1.5;--spectrum-global-font-line-height-small:1.3;--spectrum-global-font-multiplier-25:0.25em;--spectrum-global-font-multiplier-75:0.75em;--spectrum-global-dimension-static-size-0:0px;--spectrum-global-dimension-static-size-10:1px;--spectrum-global-dimension-static-size-25:2px;--spectrum-global-dimension-static-size-50:4px;--spectrum-global-dimension-static-size-40:3px;--spectrum-global-dimension-static-size-65:5px;--spectrum-global-dimension-static-size-100:8px;--spectrum-global-dimension-static-size-115:9px;--spectrum-global-dimension-static-size-125:10px;--spectrum-global-dimension-static-size-150:12px;--spectrum-global-dimension-static-size-175:14px;--spectrum-global-dimension-static-size-200:16px;--spectrum-global-dimension-static-size-225:18px;--spectrum-global-dimension-static-size-250:20px;--spectrum-global-dimension-static-size-300:24px;--spectrum-global-dimension-static-size-400:32px;--spectrum-global-dimension-static-size-450:36px;--spectrum-global-dimension-static-size-500:40px;--spectrum-global-dimension-static-size-550:44px;--spectrum-global-dimension-static-size-600:48px;--spectrum-global-dimension-static-size-700:56px;--spectrum-global-dimension-static-size-800:64px;--spectrum-global-dimension-static-size-900:72px;--spectrum-global-dimension-static-size-1000:80px;--spectrum-global-dimension-static-size-1200:96px;--spectrum-global-dimension-static-size-1700:136px;--spectrum-global-dimension-static-size-2400:192px;--spectrum-global-dimension-static-size-2600:208px;--spectrum-global-dimension-static-size-3400:272px;--spectrum-global-dimension-static-size-3600:288px;--spectrum-global-dimension-static-size-4600:368px;--spectrum-global-dimension-static-size-5000:400px;--spectrum-global-dimension-static-size-6000:480px;--spectrum-global-dimension-static-font-size-50:11px;--spectrum-global-dimension-static-font-size-75:12px;--spectrum-global-dimension-static-font-size-100:14px;--spectrum-global-dimension-static-font-size-150:15px;--spectrum-global-dimension-static-font-size-200:16px;--spectrum-global-dimension-static-font-size-300:18px;--spectrum-global-dimension-static-font-size-400:20px;--spectrum-global-dimension-static-font-size-500:22px;--spectrum-global-dimension-static-font-size-600:25px;--spectrum-global-dimension-static-font-size-700:28px;--spectrum-global-dimension-static-font-size-800:32px;--spectrum-global-dimension-static-font-size-900:36px;--spectrum-global-dimension-static-font-size-1000:40px;--spectrum-global-dimension-static-percent-50:50%;--spectrum-global-dimension-static-percent-100:100%;--spectrum-global-dimension-static-breakpoint-xsmall:304px;--spectrum-global-dimension-static-breakpoint-small:768px;--spectrum-global-dimension-static-breakpoint-medium:1280px;--spectrum-global-dimension-static-breakpoint-large:1768px;--spectrum-global-dimension-static-breakpoint-xlarge:2160px;--spectrum-global-dimension-static-grid-columns:12;--spectrum-global-dimension-static-grid-fluid-width:100%;--spectrum-global-dimension-static-grid-fixed-max-width:1280px;--spectrum-global-animation-duration-0:0ms;--spectrum-global-animation-duration-100:130ms;--spectrum-global-animation-duration-200:160ms;--spectrum-global-animation-duration-300:190ms;--spectrum-global-animation-duration-400:220ms;--spectrum-global-animation-duration-500:250ms;--spectrum-global-animation-duration-600:300ms;--spectrum-global-animation-duration-700:350ms;--spectrum-global-animation-duration-800:400ms;--spectrum-global-animation-duration-900:450ms;--spectrum-global-animation-duration-1000:500ms;--spectrum-global-animation-duration-2000:1000ms;--spectrum-global-animation-duration-4000:2000ms;--spectrum-global-animation-ease-in-out:(0.45,0,0.4,1);--spectrum-global-animation-ease-in:(0.5,0,1,1);--spectrum-global-animation-ease-out:(0,0,0.4,1);--spectrum-global-animation-linear:(0,0,1,1);font-family:var(--spectrum-global-font-family-base);font-size:var(--spectrum-alias-font-size-default);--spectrum-font-fallbacks-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;--spectrum-font-fallbacks-serif:serif;--spectrum-font-fallbacks-mono:monospace;--spectrum-font-family-ar:myriad-arabic,var(--spectrum-font-fallbacks-sans);--spectrum-font-family-article:adobe-clean-serif,"Source Serif",var(--spectrum-font-fallbacks-serif);--spectrum-font-family-article-ar:adobe-arabic,var(--spectrum-font-fallbacks-serif);--spectrum-font-family-article-he:adobe-hebrew,var(--spectrum-font-fallbacks-serif);--spectrum-font-family-article-ja:source-han-serif-japanese,var(--spectrum-font-fallbacks-serif);--spectrum-font-family-article-ko:source-han-serif-korean,var(--spectrum-font-fallbacks-serif);--spectrum-font-family-article-zh-hans:source-han-serif-sc,var(--spectrum-font-fallbacks-serif);--spectrum-font-family-article-zh-hant:source-han-serif-tc,var(--spectrum-font-fallbacks-serif);--spectrum-font-family-base:adobe-clean,"Source Sans Pro",var(--spectrum-font-fallbacks-sans);--spectrum-font-family-code:source-code-pro,"Source Code Pro",var(--spectrum-font-fallbacks-mono);--spectrum-font-family-han:adobe-clean-han-japanese,var(--spectrum-font-fallbacks-sans);--spectrum-font-family-he:var(--spectrum-font-fallbacks-sans);--spectrum-font-family-zh:var(--spectrum-font-family-han);--spectrum-font-family-zhhans:var(--spectrum-font-family-han);--spectrum-font-family-ko:var(--spectrum-font-family-han);--spectrum-font-family-ja:var(--spectrum-font-family-han);--spectrum-font-family-condensed:adobe-clean-condensed,var(--spectrum-font-family-base);--spectrum-text-size:var(--spectrum-alias-font-size-default);--spectrum-text-body-line-height:var(--spectrum-alias-line-height-medium);--spectrum-text-size-text-label:var(--spectrum-label-text-size);--spectrum-line-height-text-label:var(--spectrum-label-text-line-height)}:host{position:relative;display:block}#scale,#theme{width:100%;height:100%}
`;
/* harmony default export */ var theme = (theme_styles);
// CONCATENATED MODULE: ./src/themes/theme.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var theme_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class theme_Theme extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    /**
     * The color theme to apply to Spectrum controls
     */

    this.color = 'light';
    /**
     * The scale to apply to Spectrum controls. Currently only medium is supported
     */

    this.scale = 'medium';
  }

  static get styles() {
    return [theme];
  }

  renderTheme(children) {
    let result;

    if (this.color === 'light') {
      result = lit_element["d" /* html */]`
                <sp-theme-light id="theme">${children}</sp-theme-light>
            `;
    } else if (this.color === 'dark') {
      result = lit_element["d" /* html */]`
                <sp-theme-dark id="theme">${children}</sp-theme-dark>
            `;
    } else {
      console.warn(`Unknown color ${this.color} for sp-theme`);
      return children;
    }

    if (!customElements.get(`sp-theme-${this.color}`)) {
      console.warn(`Theme component sp-theme-${this.color} has not been registered`);
    }

    return result;
  }

  renderScale(children) {
    let result;

    if (this.scale === 'medium') {
      result = lit_element["d" /* html */]`
                <sp-scale-medium id="scale">${children}</sp-scale-medium>
            `;
    } else {
      console.warn(`Unknown scale ${this.scale} for sp-theme`);
      return children;
    }

    if (!customElements.get(`sp-theme-${this.color}`)) {
      console.warn(`Theme component sp-scale-${this.scale} has not been registered`);
    }

    return result;
  }

  render() {
    return this.renderTheme(this.renderScale(lit_element["d" /* html */]`
                    <slot></slot>
                `));
  }

}

theme_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], theme_Theme.prototype, "color", void 0);

theme_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], theme_Theme.prototype, "scale", void 0);
// CONCATENATED MODULE: ./src/themes/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/







if (!customElements.get('sp-theme-dark')) {
  customElements.define('sp-theme-dark', theme_dark_ThemeDark);
}

if (!customElements.get('sp-theme-light')) {
  customElements.define('sp-theme-light', theme_light_ThemeLight);
}

if (!customElements.get('sp-scale-medium')) {
  customElements.define('sp-scale-medium', scale_medium_ScaleMedium);
}

if (!customElements.get('sp-theme')) {
  customElements.define('sp-theme', theme_Theme);
}
// CONCATENATED MODULE: ./src/overlay-root/overlay-root.css

const overlay_root_styles = lit_element["b" /* css */]`
:host{display:flex;flex-direction:column;width:100%;height:100%}#overlay{z-index:2;position:absolute;display:none;opacity:0;background:red}#overlay[active]{display:block}#overlay[visible]{opacity:1;transform:translate(0)!important;visibility:visible;pointer-events:all;transition:transform var(--spectrum-global-animation-duration-100) ease-in-out,opacity var(--spectrum-global-animation-duration-100) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100)}:host([placement=top]) #overlay{transform:translateY(6px)}:host([placement=right]) #overlay{transform:translate(-6px)}:host([placement=bottom]) #overlay{transform:translateY(-6px)}:host([placement=left]) #overlay{transform:translate(6px)}
`;
/* harmony default export */ var overlay_root = (overlay_root_styles);
// CONCATENATED MODULE: ./src/overlay-root/calculate-position.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const AXIS = {
  bottom: 'top',
  left: 'left',
  right: 'left',
  top: 'top'
};
const FLIPPED_DIRECTION = {
  bottom: 'top',
  left: 'right',
  right: 'left',
  top: 'bottom'
};
const CROSS_AXIS = {
  left: 'top',
  top: 'left'
};
const AXIS_SIZE = {
  left: 'width',
  top: 'height'
};
const PARSED_PLACEMENT_CACHE = {};

function getContainerDimensions(containerDOMNode) {
  let width;
  let height;
  let top = 0;
  let left = 0;
  const scroll = {
    top: 0,
    left: 0
  };

  if (containerDOMNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;

    if (containerDOMNode.ownerDocument) {
      scroll.top = containerDOMNode.ownerDocument.documentElement.scrollTop;
      scroll.left = containerDOMNode.ownerDocument.documentElement.scrollLeft;
    } else {
      scroll.top = containerDOMNode.scrollTop;
      scroll.left = containerDOMNode.scrollLeft;
    }
  } else {
    ({
      width,
      height,
      top,
      left
    } = containerDOMNode.getBoundingClientRect());
    scroll.top = containerDOMNode.scrollTop;
    scroll.left = containerDOMNode.scrollLeft;
  }

  return {
    width,
    height,
    scroll,
    top,
    left
  };
}

function getDelta(axis, offset, size, containerDimensions, padding) {
  const containerScroll = containerDimensions.scroll[axis];
  const containerHeight = containerDimensions[AXIS_SIZE[axis]];
  const startEdgeOffset = offset - padding - containerScroll;
  const endEdgeOffset = offset + padding - containerScroll + size;

  if (startEdgeOffset < 0) {
    return -startEdgeOffset;
  } else if (endEdgeOffset > containerHeight) {
    return Math.max(containerHeight - endEdgeOffset, -startEdgeOffset);
  } else {
    return 0;
  }
}

function shouldFlip(axis, offset, size, padding, placement, flipContainerDimensions, containerOffsetWithBoundary) {
  const containerScroll = flipContainerDimensions.scroll[axis];
  const containerHeight = flipContainerDimensions[AXIS_SIZE[axis]];
  const startEdgeOffset = containerOffsetWithBoundary[axis] + offset - padding - containerScroll;
  const endEdgeOffset = containerOffsetWithBoundary[axis] + offset + padding - containerScroll + size;

  if (startEdgeOffset < 0 && (placement === 'top' || placement === 'left')) {
    return true;
  } else if (endEdgeOffset > containerHeight && (placement === 'bottom' || placement === 'right')) {
    return true;
  } else {
    return false;
  }
}

function getMargins(node) {
  const style = window.getComputedStyle(node);
  return {
    bottom: parseInt(style.marginBottom, 10) || 0,
    left: parseInt(style.marginLeft, 10) || 0,
    right: parseInt(style.marginRight, 10) || 0,
    top: parseInt(style.marginTop, 10) || 0
  };
}

function parsePlacement(input) {
  if (PARSED_PLACEMENT_CACHE[input]) {
    return PARSED_PLACEMENT_CACHE[input];
  }

  const [placement] = input.split(' ');
  let [, crossPlacement] = input.split(' ');
  const axis = AXIS[placement] || 'right';
  const crossAxis = CROSS_AXIS[axis];

  if (!AXIS[crossPlacement]) {
    crossPlacement = 'center';
  }

  const size = AXIS_SIZE[axis];
  const crossSize = AXIS_SIZE[crossAxis];
  PARSED_PLACEMENT_CACHE[input] = {
    axis,
    crossAxis,
    crossPlacement,
    crossSize,
    placement,
    size
  };
  return PARSED_PLACEMENT_CACHE[input];
}

function computePosition(childOffset, containerDimensions, overlaySize, placementInfo, offset, crossOffset) {
  const {
    axis,
    crossAxis,
    crossPlacement,
    crossSize,
    size,
    placement
  } = placementInfo;
  const position = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  };
  position[crossAxis] = childOffset[crossAxis] + crossOffset;

  if (crossPlacement === 'center') {
    position[crossAxis] += (childOffset[crossSize] - overlaySize[crossSize]) / 2;
  } else if (crossPlacement !== crossAxis) {
    position[crossAxis] += childOffset[crossSize] - overlaySize[crossSize];
  } // Ensure overlay sticks to target(ignore for overlays smaller than target)


  if (childOffset[crossSize] < overlaySize[crossSize]) {
    const positionForPositiveSideOverflow = Math.min(position[crossAxis], childOffset[crossAxis]);
    position[crossAxis] = Math.max(positionForPositiveSideOverflow, childOffset[crossAxis] - overlaySize[crossSize] + childOffset[crossSize]);
  }

  position[axis] = placement === axis ? childOffset[axis] - overlaySize[size] - offset : childOffset[axis] + childOffset[size] + offset;
  return position;
}

function calculatePositionInternal(placementInput, containerDimensions, childOffset, overlaySize, margins, padding, flip, boundaryDimensions, containerOffsetWithBoundary, offset, crossOffset) {
  let placementInfo = parsePlacement(placementInput);
  const {
    axis,
    size,
    crossAxis,
    crossSize,
    placement,
    crossPlacement
  } = placementInfo;
  let position = computePosition(childOffset, containerDimensions, overlaySize, placementInfo, offset, crossOffset);
  let normalizedOffset = offset; // First check if placement should be flipped

  if (flip && shouldFlip(axis, position[axis], overlaySize[size], padding, placement, boundaryDimensions, containerOffsetWithBoundary)) {
    const flippedPlacementInfo = parsePlacement(`${FLIPPED_DIRECTION[placement]} ${crossPlacement}`);
    const flippedAxis = flippedPlacementInfo.axis;
    const flippedSize = flippedPlacementInfo.size;
    const flippedPosition = computePosition(childOffset, containerDimensions, overlaySize, flippedPlacementInfo, -1 * offset, crossOffset); // Check if flipped placement has enough space otherwise flip is not possible

    if (!shouldFlip(flippedAxis, flippedPosition[flippedAxis], overlaySize[flippedSize], padding, FLIPPED_DIRECTION[placement], boundaryDimensions, containerOffsetWithBoundary)) {
      placementInfo = flippedPlacementInfo;
      position = flippedPosition;
      normalizedOffset = -1 * offset;
    }
  }

  let delta = getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, padding);
  position[crossAxis] += delta;
  const maxHeight = Math.max(0, boundaryDimensions.height + boundaryDimensions.top + boundaryDimensions.scroll.top - containerOffsetWithBoundary.top - position.top - margins.top - margins.bottom - padding);
  overlaySize.height = Math.min(overlaySize.height, maxHeight);
  position = computePosition(childOffset, containerDimensions, overlaySize, placementInfo, normalizedOffset, crossOffset);
  delta = delta = getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, padding);
  position[crossAxis] += delta;
  const arrowPosition = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  arrowPosition[crossAxis] = childOffset[crossSize] > overlaySize[crossSize] ? null : childOffset[crossAxis] - position[crossAxis] + childOffset[crossSize] / 2;
  return {
    arrowOffsetLeft: arrowPosition.left || 0,
    arrowOffsetTop: arrowPosition.top || 0,
    maxHeight,
    placement: placementInfo.placement,
    positionLeft: position.left || 0,
    positionTop: position.top || 0
  };
}

function getShadowPosition(target, container) {
  const targetPosition = target.getBoundingClientRect();
  const containerPosition = container.getBoundingClientRect();
  return {
    bottom: targetPosition.bottom - containerPosition.bottom,
    height: targetPosition.height,
    left: targetPosition.left - containerPosition.left,
    right: targetPosition.right - containerPosition.right,
    top: targetPosition.top - containerPosition.top,
    width: targetPosition.width,
    x: targetPosition.x,
    y: targetPosition.y
  };
}

function calculatePosition(placementInput, overlayNode, target, container, padding, flip, boundariesElement, offset, crossOffset) {
  const isBodyContainer = container.tagName === 'BODY';
  const childOffset = isBodyContainer ? target.getBoundingClientRect() : getShadowPosition(target, container);

  if (!isBodyContainer) {
    childOffset.top += parseInt(target.style.marginTop, 10) || 0;
    childOffset.left += parseInt(target.style.marginLeft, 10) || 0;
  }

  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
    x,
    y
  } = overlayNode.getBoundingClientRect();
  const overlaySize = {
    top,
    right,
    bottom,
    left,
    width,
    height,
    x,
    y
  };
  const margins = getMargins(overlayNode);
  overlaySize.width += margins.left + margins.right;
  overlaySize.height += margins.top + margins.bottom;
  const containerDimensions = getContainerDimensions(container);
  const boundaryContainer = container;
  const boundaryDimensions = getContainerDimensions(boundaryContainer);
  const containerOffsetWithBoundary = boundaryContainer.tagName === 'BODY' ? container.getBoundingClientRect() : getShadowPosition(container, boundaryContainer);
  return calculatePositionInternal(placementInput, containerDimensions, childOffset, overlaySize, margins, padding, flip, boundaryDimensions, containerOffsetWithBoundary, offset, crossOffset);
}
// CONCATENATED MODULE: ./src/overlay-root/overlay-root.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var overlay_root_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}; //TODO: Closing overlay should also have transition






const defaultOptions = {
  containerPadding: 10,
  crossOffset: 0,
  flip: true,
  offset: 0,
  placement: 'left'
};
class overlay_root_OverlayRoot extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.visible = false;
    this.placement = 'bottom';
    this.offset = 6;
    this.interaction = 'hover';
    this.active = false;
  }

  static get styles() {
    return [overlay_root];
  }

  onMaskClick(ev) {
    const secondClick = this.detectSecondClick(ev);

    if (!this.active) {
      return;
    }

    if (this.interaction === 'click' && secondClick) {
      //Prevent second clicks from reopening the overlay
      ev.stopPropagation();
    }

    this.removeOverlay();
    const clickOutEvent = strictCustomEvent('sp-overlay:click-out', {
      bubbles: true,
      composed: true,
      detail: ev
    });
    this.dispatchEvent(clickOutEvent);
    this.active = false;
    this.visible = false;
  }

  onOverlayOpen(ev) {
    if (this.active) {
      return;
    }

    this.active = true;
    this.removeOverlay();
    this.extractEventDetail(ev);

    if (this.overlayContent) {
      this.overlayContent.setAttribute('slot', 'overlay');
      this.appendChild(this.overlayContent);
    }

    this.timeout = window.setTimeout(() => {
      this.visible = true;
      this.updateOverlayPosition();
    }, ev.detail.delay);
  }

  onOverlayClose(ev) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (ev.detail.content === this.overlayContent) {
      this.removeOverlay();
      this.active = false;
      this.visible = false;
    }
  }

  render() {
    return lit_element["d" /* html */]`
            <slot></slot>
            <div
                id="overlay"
                ?active=${this.active}
                ?visible=${this.visible}
                style=${this.overlayStyles}
            >
                <slot name="overlay"></slot>
            </div>
        `;
  }

  detectSecondClick(ev) {
    //TODO: event.composedPath is not supported in internet explorer or edge.
    // Consider using another implementation for the future
    const path = Array.from(ev.composedPath());

    if (path && path.length) {
      //Check if current active trigger is in the event path
      for (const eventTarget of path) {
        const element = eventTarget;

        if (element === this.trigger) {
          return true;
        }
      }
    }

    return false;
  }

  removeOverlay() {
    if (this.overlayContent && this.overlayContent.parentNode) {
      this.overlayContent.parentNode.removeChild(this.overlayContent);
    }
  }

  extractEventDetail(ev) {
    this.overlayContent = ev.detail.content;
    this.trigger = ev.detail.trigger;
    this.placement = ev.detail.placement;
    this.offset = ev.detail.offset;
    this.interaction = ev.detail.interaction;
  }

  updateOverlayPosition() {
    if (!this.trigger || !this.overlayContent) {
      return;
    }

    const options = {
      containerPadding: 0,
      crossOffset: 0,
      flip: false,
      offset: this.offset,
      placement: this.placement
    };
    const positionOptions = Object.assign({}, defaultOptions, options);
    this.position = calculatePosition(positionOptions.placement, this.overlayContent, this.trigger, this, positionOptions.containerPadding, positionOptions.flip, this, positionOptions.offset, positionOptions.crossOffset);
  }

  get overlayStyles() {
    if (this.position) {
      return `top: ${this.position.positionTop}px; left: ${this.position.positionLeft}px`;
    }

    return '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.onMaskClick, true);
    this.addEventListener('sp-overlay:open', this.onOverlayOpen);
    this.addEventListener('sp-overlay:close', this.onOverlayClose);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onMaskClick, true);
    this.removeEventListener('sp-overlay:open', this.onOverlayOpen);
    this.removeEventListener('sp-overlay:close', this.onOverlayClose);
    super.disconnectedCallback();
  }

}
overlay_root_OverlayRoot.is = 'overlay-root';

overlay_root_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], overlay_root_OverlayRoot.prototype, "visible", void 0);

overlay_root_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], overlay_root_OverlayRoot.prototype, "placement", void 0);

overlay_root_decorate([Object(lit_element["e" /* property */])({
  type: Number,
  reflect: true
})], overlay_root_OverlayRoot.prototype, "offset", void 0);

overlay_root_decorate([Object(lit_element["e" /* property */])()], overlay_root_OverlayRoot.prototype, "interaction", void 0);

overlay_root_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], overlay_root_OverlayRoot.prototype, "active", void 0);

overlay_root_decorate([Object(lit_element["e" /* property */])()], overlay_root_OverlayRoot.prototype, "position", void 0);

overlay_root_decorate([Object(lit_element["e" /* property */])()], overlay_root_OverlayRoot.prototype, "trigger", void 0);

overlay_root_decorate([Object(lit_element["e" /* property */])()], overlay_root_OverlayRoot.prototype, "overlayContent", void 0);
// CONCATENATED MODULE: ./src/overlay-root/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('overlay-root')) {
  customElements.define('overlay-root', overlay_root_OverlayRoot);
}
// CONCATENATED MODULE: ./src/overlay-trigger/overlay-trigger.css

const overlay_trigger_styles = lit_element["b" /* css */]`
#overlay-content{display:none}
`;
/* harmony default export */ var overlay_trigger = (overlay_trigger_styles);
// CONCATENATED MODULE: ./src/overlay-trigger/overlay-trigger.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var overlay_trigger_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/**
 * A overlay trigger component for displaying overlays relative to other content.
 * @element overlay-trigger
 *
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 */

class overlay_trigger_OverlayTrigger extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.placement = 'bottom';
    this.offset = 6;
  }

  static get styles() {
    return [overlay_trigger];
  }

  onOverlayOpen(ev, interaction) {
    const isClick = interaction === 'click'; // if (!isClick) return;

    const overlayElement = isClick ? this.clickContent : this.hoverContent;
    const delayAttribute = overlayElement ? overlayElement.getAttribute('delay') : null;
    const delay = delayAttribute ? parseFloat(delayAttribute) : 0;

    if (!overlayElement) {
      return;
    }

    const overlayOpenDetail = {
      content: overlayElement,
      delay: delay,
      offset: this.offset,
      placement: this.placement,
      trigger: this,
      interaction: interaction
    };
    const overlayOpenEvent = strictCustomEvent('sp-overlay:open', {
      bubbles: true,
      composed: true,
      detail: overlayOpenDetail
    });
    this.dispatchEvent(overlayOpenEvent);
  }

  onOverlayClose(ev, interaction) {
    const isClick = interaction === 'click';
    const overlayElement = isClick ? this.clickContent : this.hoverContent;

    if (!overlayElement) {
      return;
    }

    const overlayCloseDetail = {
      content: overlayElement
    };
    const overlayCloseEvent = strictCustomEvent('sp-overlay:close', {
      bubbles: true,
      composed: true,
      detail: overlayCloseDetail
    });
    this.dispatchEvent(overlayCloseEvent);
  }

  onTriggerClick(ev) {
    if (this.clickContent) {
      this.onOverlayOpen(ev, 'click');
    }
  }

  onTriggerMouseOver(ev) {
    if (this.hoverContent) {
      this.onOverlayOpen(ev, 'hover');
    }
  }

  onTriggerMouseLeave(ev) {
    if (this.hoverContent) {
      this.onOverlayClose(ev, 'hover');
    }
  }

  render() {
    return lit_element["d" /* html */]`
            <div
                id="trigger"
                @click=${this.onTriggerClick}
                @mouseenter=${this.onTriggerMouseOver}
                @mouseleave=${this.onTriggerMouseLeave}
            >
                <slot name="trigger"></slot>
            </div>
            <div id="overlay-content">
                <slot
                    @slotchange=${this.onClickSlotChange}
                    name="click-content"
                ></slot>
                <slot
                    @slotchange=${this.onHoverSlotChange}
                    name="hover-content"
                ></slot>
            </div>
        `;
  }

  onClickSlotChange(ev) {
    if (ev.target) {
      const slot = ev.target;
      const content = this.extractSlotContent(slot);

      if (content) {
        this.clickContent = content;
      }
    }
  }

  onHoverSlotChange(ev) {
    if (ev.target) {
      const slot = ev.target;
      const content = this.extractSlotContent(slot);

      if (content) {
        this.hoverContent = content;
      }
    }
  }

  extractSlotContent(slot) {
    const nodes = slot.assignedNodes();

    if (nodes.length) {
      return nodes[0];
    }

    return null;
  }

}
overlay_trigger_OverlayTrigger.is = 'overlay-trigger';

overlay_trigger_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], overlay_trigger_OverlayTrigger.prototype, "placement", void 0);

overlay_trigger_decorate([Object(lit_element["e" /* property */])({
  type: Number,
  reflect: true
})], overlay_trigger_OverlayTrigger.prototype, "offset", void 0);
// CONCATENATED MODULE: ./src/overlay-trigger/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('overlay-trigger')) {
  customElements.define('overlay-trigger', overlay_trigger_OverlayTrigger);
}
// CONCATENATED MODULE: ./src/popover/popover.css

const popover_styles = lit_element["b" /* css */]`
:host{visibility:hidden;opacity:0;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0ms linear var(--spectrum-global-animation-duration-100,.13s);pointer-events:none;display:inline-flex;flex-direction:column;box-sizing:border-box;min-width:var(--spectrum-global-dimension-size-400);min-height:var(--spectrum-global-dimension-size-400);position:absolute;border-radius:var(--spectrum-popover-border-radius,var(--spectrum-global-dimension-size-50));outline:none;background-color:var(--spectrum-popover-background-color,var(--spectrum-global-color-gray-50));border:var(--spectrum-popover-border-size,1px) solid var(--spectrum-popover-border-color,var(--spectrum-global-color-gray-400));box-shadow:0 1px 4px var(--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color))}:host([open]){visibility:visible;opacity:1;transition-delay:0ms;pointer-events:auto}:host([direction=bottom][open]){transform:translateY(var(--spectrum-dropdown-flyout-menu-offset-y,var(--spectrum-global-dimension-size-75)))}:host([direction=top][open]){transform:translateY(calc(-1*var(--spectrum-dropdown-flyout-menu-offset-y, var(--spectrum-global-dimension-size-75))))}:host([direction=right][open]){transform:translateX(var(--spectrum-dropdown-flyout-menu-offset-y,var(--spectrum-global-dimension-size-75)))}:host([direction=left][open]){transform:translateX(calc(-1*var(--spectrum-dropdown-flyout-menu-offset-y, var(--spectrum-global-dimension-size-75))))}#tip{overflow:hidden;width:calc(var(--spectrum-popover-tip-width,
var(--spectrum-global-dimension-size-250)) + 1px);height:calc(var(--spectrum-popover-tip-width,
var(--spectrum-global-dimension-size-250))/2 + var(--spectrum-popover-border-size, 1px))}#tip,#tip:after{position:absolute}#tip:after{content:"";width:var(--spectrum-popover-tip-width,var(--spectrum-global-dimension-size-250));height:var(--spectrum-popover-tip-width,var(--spectrum-global-dimension-size-250));transform:rotate(45deg);top:-18px;left:-1px;background-color:var(--spectrum-popover-background-color,var(--spectrum-global-color-gray-50));border:var(--spectrum-popover-border-size,1px) solid var(--spectrum-popover-border-color,var(--spectrum-global-color-gray-400));box-shadow:-1px -1px 4px var(--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color))}:host([dialog]){min-width:270px;padding:30px 29px}:host([direction=left][tip]){margin-right:13px}:host([direction=left]) #tip{right:-16px;transform:rotate(-90deg)}:host([direction=right][tip]){margin-left:13px}:host([direction=right]) #tip{left:-16px;transform:rotate(90deg)}:host([direction=left]) #tip,:host([direction=right]) #tip{top:50%;margin-top:-6px}:host([direction=bottom][tip]){margin-top:13px}:host([direction=bottom]) #tip{top:-11px;transform:rotate(180deg)}:host([direction=top][tip]){margin-bottom:13px}:host([direction=top]) #tip{bottom:-11px}:host([direction=bottom]) #tip,:host([direction=top]) #tip{left:50%;margin-left:-12px}.spectrum-Dialog-footer,.spectrum-Dialog-header,.spectrum-Dialog-wrapper{background-color:initial}
`;
/* harmony default export */ var popover = (popover_styles);
// CONCATENATED MODULE: ./src/popover/popover.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var popover_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/**
 * @attr {Boolean} open - The open state of the popover
 * @attr {Boolean} dialog - Adds some padding to the popover
 */

class popover_Popover extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.direction = 'none';
    this.tip = false;
  }

  static get styles() {
    return [popover];
  }

  renderTip() {
    return lit_element["d" /* html */]`
            <div id="tip"></div>
        `;
  }

  render() {
    return lit_element["d" /* html */]`
            <slot></slot>
            ${this.tip ? this.renderTip() : lit_html["e" /* nothing */]}
        `;
  }

}
popover_Popover.is = 'sp-popover';

popover_decorate([Object(lit_element["e" /* property */])({
  reflect: true
})], popover_Popover.prototype, "direction", void 0);

popover_decorate([Object(lit_element["e" /* property */])({
  type: Boolean,
  reflect: true
})], popover_Popover.prototype, "tip", void 0);
// CONCATENATED MODULE: ./src/popover/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/



if (!customElements.get('sp-popover')) {
  customElements.define('sp-popover', popover_Popover);
}
// CONCATENATED MODULE: ./src/define.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * A helper function for registering custom elements and first checking conditionally if they are already registered.
 *
 * @param classCtor A HTMLElement constructor that has a static 'is' property defining the desired tag name.
 */
function defineCustomElement(classCtor) {
  if (!customElements.get(classCtor.is)) {
    customElements.define(classCtor.is, classCtor);
  }
}
/**
 * Registers all given class constructors with the custom elements registry, avoiding duplicate registration errors.
 *
 * @param classCtors - Any number of arguments each defining a custom element with an 'is' static property.
 */

function defineCustomElements(...classCtors) {
  for (const ctor of classCtors) {
    defineCustomElement(ctor);
  }
}
// CONCATENATED MODULE: ./src/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/






















 // NOTE: we do not export demo-page because it has dependencies on other modules we don't want to force on users
// CONCATENATED MODULE: ./documentation/src/utils/spectrum.ts
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  return t;
};




const {
  defineCustomElement: spectrum_defineCustomElement,
  defineCustomElements: spectrum_defineCustomElements
} = src_namespaceObject,
      Elements = __rest(src_namespaceObject, ["defineCustomElement", "defineCustomElements"]);

const spectrum_customElements = Object.values(Elements).filter(element => {
  return !!element.is;
});
spectrum_defineCustomElements(...spectrum_customElements, ...Object.values(icons_medium_namespaceObject));

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/lit-element/lit-element.js + 5 modules
var lit_element = __webpack_require__(0);

// CONCATENATED MODULE: ./documentation/src/utils/templates.ts

function toHtmlTemplateString(code) {
  const stringArray = [`${code}`];
  stringArray.raw = [`${code}`];
  return Object(lit_element["d" /* html */])(stringArray);
}
function toCssTemplateString(code) {
  const stringArray = [`${code}`];
  stringArray.raw = [`${code}`];
  return Object(lit_element["b" /* css */])(stringArray);
}
// CONCATENATED MODULE: ./documentation/components/index.ts


const componentDocs = __webpack_require__(14);

const ComponentDocs = new Map();

for (const key of componentDocs.keys()) {
  const componentName = /([a-zA-Z-]+)\.md$/.exec(key)[1];
  const templateString = toHtmlTemplateString(componentDocs(key));
  ComponentDocs.set(componentName, templateString);
}
// EXTERNAL MODULE: ./documentation/src/router.ts + 1 modules
var router = __webpack_require__(11);

// CONCATENATED MODULE: ./documentation/src/components/side-nav.css

const styles = lit_element["b" /* css */]`
:host{display:flex;flex-direction:column}#nav-header{padding-top:30px;padding-bottom:20px;text-align:center;font-size:12px}#nav-header a,#nav-header a:visited{color:var(--spectrum-global-color-gray-800);text-decoration:none}#nav-header docs-spectrum-logo{margin-bottom:11px}
`;
/* harmony default export */ var side_nav = (styles);
// CONCATENATED MODULE: ./documentation/src/components/spectrum-logo.css

const spectrum_logo_styles = lit_element["b" /* css */]`
:host{display:inline-flex}
`;
/* harmony default export */ var spectrum_logo = (spectrum_logo_styles);
// CONCATENATED MODULE: ./documentation/src/components/spectrum-logo.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class spectrum_logo_SpectrumLogo extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.size = '32px';
  }

  static get styles() {
    return [spectrum_logo];
  }

  render() {
    return lit_element["d" /* html */]`
            <svg
                version="1.1"
                id="logosvg"
                width="${this.size}"
                height="${this.size}"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="61.2 0 177.7 150"
                enableBackground="new 61.2 0 177.7 150"
                xmlSpace="preserve"
            >
                <path
                    className="tier3"
                    fill="#757575"
                    d="M238.8,94.9L150,150L61.2,94.9L88.3,78l61.7,38l61.7-38L238.8,94.9z"
                ></path>
                <path
                    className="tier2"
                    fill="#999999"
                    d="M188.3,43.5L150,67.2l-38.3-23.7L88.3,57.9l61.7,38l61.4-38L188.3,43.5z"
                ></path>
                <path
                    className="tier1"
                    fill="#C7C7C7"
                    d="M150,0l-38.5,23.7l38.3,23.7L188,23.7L150,0z"
                ></path>
            </svg>
        `;
  }

}

__decorate([Object(lit_element["e" /* property */])({
  type: String
})], spectrum_logo_SpectrumLogo.prototype, "size", void 0);

customElements.define('docs-spectrum-logo', spectrum_logo_SpectrumLogo);
// CONCATENATED MODULE: ./documentation/src/components/side-nav.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/






class side_nav_SideNav extends lit_element["a" /* LitElement */] {
  static get styles() {
    return [side_nav];
  }

  get components() {
    return Array.from(ComponentDocs.keys());
  }

  handleSelect(event, kind) {
    const path = router["AppRouter"].urlForPath(`/${kind}/${event.detail.value}`);
    router["AppRouter"].go(path);
  }

  handleComponentSelect(event) {
    this.handleSelect(event, 'components');
  }

  handleGuideSelect(event) {
    this.handleSelect(event, 'guides');
  }

  render() {
    return lit_element["d" /* html */]`
            <div id="nav-header">
                <a href="/">
                    <docs-spectrum-logo></docs-spectrum-logo>
                    <div>SPECTRUM WEB COMPONENTS</div>
                </a>
            </div>
            <sp-sidenav>
                <sp-sidenav-heading
                    label="Components"
                    @sp-sidenav:select=${this.handleComponentSelect}
                >
                    ${this.components.map(name => lit_element["d" /* html */]`
                                <sp-sidenav-item
                                    value="${name}"
                                    label="${name}"
                                ></sp-sidenav-item>
                            `)}
                </sp-sidenav-heading>
                <sp-sidenav-heading
                    label="Contributing"
                    @sp-sidenav:select=${this.handleGuideSelect}
                >
                    <sp-sidenav-item
                        value="adding-component"
                        label="Adding Components"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        value="spectrum-config"
                        label="Spectrum Config Reference"
                    ></sp-sidenav-item>
                </sp-sidenav-heading>
            </sp-sidenav>
        `;
  }

}

customElements.define('docs-side-nav', side_nav_SideNav);
// CONCATENATED MODULE: ./documentation/src/components/layout.css

const layout_styles = lit_element["b" /* css */]`
#app{width:100%;height:100%;display:flex;flex-direction:column}#side-nav{display:flex;flex:0 0 auto;padding:1.5em}#body{display:flex;flex-direction:row;flex:1 1 auto;padding-bottom:40px;background-color:var(--spectrum-global-color-gray-100);color:var(--spectrum-global-color-gray-800)}#body,#body #layout-content{position:relative;height:100%}#body #layout-content{width:100%;overflow:auto}#body #layout-content #page{padding:40px 52px 24px;max-width:1080px;margin-left:auto;margin-right:auto}
`;
/* harmony default export */ var layout = (layout_styles);
// CONCATENATED MODULE: ./documentation/src/components/route-component.ts

class route_component_RouteComponent extends lit_element["a" /* LitElement */] {}
// CONCATENATED MODULE: ./documentation/src/components/layout.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/




class layout_LayoutElement extends route_component_RouteComponent {
  static get styles() {
    return [layout];
  }

  renderContent() {
    return lit_element["d" /* html */]`
            <div></div>
        `;
  }

  render() {
    return lit_element["d" /* html */]`
            <sp-theme color="light" scale="medium" id="app">
                <div id="body">
                    <docs-side-nav id="side-nav"></docs-side-nav>
                    <div id="layout-content">
                        <div id="page">
                            ${this.renderContent()}
                        </div>
                    </div>
                </div>
            </sp-theme>
        `;
  }

}
// CONCATENATED MODULE: ./documentation/src/components/markdown.css

const markdown_styles = lit_element["b" /* css */]`
.spectrum{font-family:adobe-clean,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:var(--spectrum-alias-font-size-default,var(--spectrum-global-dimension-font-size-100))}.spectrum:lang(ar){font-family:myriad-arabic,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.spectrum:lang(he){font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.spectrum:lang(ja),.spectrum:lang(ko),.spectrum:lang(zh),.spectrum:lang(zh-Hans){font-family:adobe-clean-han-japanese,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.spectrum-Body1{font-size:var(--spectrum-body-1-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-1-text-font-weight,400);line-height:var(--spectrum-body-1-text-line-height,1.5);font-style:var(--spectrum-body-1-text-font-style,normal);letter-spacing:var(--spectrum-body-1-text-letter-spacing,0);text-transform:var(--spectrum-body-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body1 em{font-size:var(--spectrum-body-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-1-emphasis-text-font-weight,400);line-height:var(--spectrum-body-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body1 strong{font-size:var(--spectrum-body-1-strong-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-1-strong-text-font-weight,700);line-height:var(--spectrum-body-1-strong-text-line-height,1.5);font-style:var(--spectrum-body-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body2,.spectrum-Body--large{font-size:var(--spectrum-body-2-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-2-text-font-weight,400);line-height:var(--spectrum-body-2-text-line-height,1.5);font-style:var(--spectrum-body-2-text-font-style,normal);letter-spacing:var(--spectrum-body-2-text-letter-spacing,0);text-transform:var(--spectrum-body-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body2 em,.spectrum-Body--large em{font-size:var(--spectrum-body-2-emphasis-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-2-emphasis-text-font-weight,400);line-height:var(--spectrum-body-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body2 strong,.spectrum-Body--large strong{font-size:var(--spectrum-body-2-strong-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-2-strong-text-font-weight,700);line-height:var(--spectrum-body-2-strong-text-line-height,1.5);font-style:var(--spectrum-body-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body3{font-size:var(--spectrum-body-3-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-3-text-font-weight,400);line-height:var(--spectrum-body-3-text-line-height,1.5);font-style:var(--spectrum-body-3-text-font-style,normal);letter-spacing:var(--spectrum-body-3-text-letter-spacing,0);text-transform:var(--spectrum-body-3-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body3 em{font-size:var(--spectrum-body-3-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-3-emphasis-text-font-weight,400);line-height:var(--spectrum-body-3-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-3-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-3-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-3-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body3 strong{font-size:var(--spectrum-body-3-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-3-strong-text-font-weight,700);line-height:var(--spectrum-body-3-strong-text-line-height,1.5);font-style:var(--spectrum-body-3-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-3-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-3-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body4,.spectrum-Body--secondary{font-size:var(--spectrum-body-4-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-4-text-font-weight,400);line-height:var(--spectrum-body-4-text-line-height,1.5);font-style:var(--spectrum-body-4-text-font-style,normal);letter-spacing:var(--spectrum-body-4-text-letter-spacing,0);text-transform:var(--spectrum-body-4-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body4 em,.spectrum-Body--secondary em{font-size:var(--spectrum-body-4-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-4-emphasis-text-font-weight,400);line-height:var(--spectrum-body-4-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-4-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-4-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-4-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body4 strong,.spectrum-Body--secondary strong{font-size:var(--spectrum-body-4-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-4-strong-text-font-weight,700);line-height:var(--spectrum-body-4-strong-text-line-height,1.5);font-style:var(--spectrum-body-4-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-4-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-4-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body5,.spectrum-Body--small{font-size:var(--spectrum-body-5-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-5-text-font-weight,400);line-height:var(--spectrum-body-5-text-line-height,1.5);font-style:var(--spectrum-body-5-text-font-style,normal);letter-spacing:var(--spectrum-body-5-text-letter-spacing,0);text-transform:var(--spectrum-body-5-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body5 em,.spectrum-Body--small em{font-size:var(--spectrum-body-5-emphasis-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-5-emphasis-text-font-weight,400);line-height:var(--spectrum-body-5-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-5-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-5-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-5-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body5 strong,.spectrum-Body--small strong{font-size:var(--spectrum-body-5-strong-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-5-strong-text-font-weight,700);line-height:var(--spectrum-body-5-strong-text-line-height,1.5);font-style:var(--spectrum-body-5-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-5-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-5-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1{font-size:var(--spectrum-heading-1-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-1-text-font-weight,700);line-height:var(--spectrum-heading-1-text-line-height,1.3);font-style:var(--spectrum-heading-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-1-text-letter-spacing,0);text-transform:var(--spectrum-heading-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1 em{font-size:var(--spectrum-heading-1-emphasis-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-1-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1 strong{font-size:var(--spectrum-heading-1-strong-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-1-strong-text-font-weight,900);line-height:var(--spectrum-heading-1-strong-text-line-height,1.3);font-style:var(--spectrum-heading-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2{font-size:var(--spectrum-heading-2-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-2-text-font-weight,700);line-height:var(--spectrum-heading-2-text-line-height,1.3);font-style:var(--spectrum-heading-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-2-text-letter-spacing,0);text-transform:var(--spectrum-heading-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2 em{font-size:var(--spectrum-heading-2-emphasis-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-2-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2 strong{font-size:var(--spectrum-heading-2-strong-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-2-strong-text-font-weight,900);line-height:var(--spectrum-heading-2-strong-text-line-height,1.3);font-style:var(--spectrum-heading-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading3{font-size:var(--spectrum-heading-3-text-size,var(--spectrum-alias-heading3-text-size));font-weight:var(--spectrum-heading-3-text-font-weight,700);line-height:var(--spectrum-heading-3-text-line-height,1.3);font-style:var(--spectrum-heading-3-text-font-style,normal);letter-spacing:var(--spectrum-heading-3-text-letter-spacing,0);text-transform:var(--spectrum-heading-3-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading3 em{font-size:var(--spectrum-heading-3-emphasis-text-size,var(--spectrum-alias-heading3-text-size));font-weight:var(--spectrum-heading-3-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-3-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-3-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-3-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-3-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading3 strong{font-size:var(--spectrum-heading-3-strong-text-size,var(--spectrum-alias-heading3-text-size));font-weight:var(--spectrum-heading-3-strong-text-font-weight,900);line-height:var(--spectrum-heading-3-strong-text-line-height,1.3);font-style:var(--spectrum-heading-3-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-3-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-3-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading4,.spectrum-Heading--subtitle1{font-size:var(--spectrum-heading-4-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-4-text-font-weight,700);line-height:var(--spectrum-heading-4-text-line-height,1.3);font-style:var(--spectrum-heading-4-text-font-style,normal);letter-spacing:var(--spectrum-heading-4-text-letter-spacing,0);text-transform:var(--spectrum-heading-4-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading4 em,.spectrum-Heading--subtitle1 em{font-size:var(--spectrum-heading-4-emphasis-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-4-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-4-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-4-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-4-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-4-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading4 strong,.spectrum-Heading--subtitle1 strong{font-size:var(--spectrum-heading-4-strong-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-4-strong-text-font-weight,900);line-height:var(--spectrum-heading-4-strong-text-line-height,1.3);font-style:var(--spectrum-heading-4-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-4-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-4-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading5{font-size:var(--spectrum-heading-5-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-5-text-font-weight,700);line-height:var(--spectrum-heading-5-text-line-height,1.3);font-style:var(--spectrum-heading-5-text-font-style,normal);letter-spacing:var(--spectrum-heading-5-text-letter-spacing,0);text-transform:var(--spectrum-heading-5-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading5 em{font-size:var(--spectrum-heading-5-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-5-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-5-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-5-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-5-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-5-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading5 strong{font-size:var(--spectrum-heading-5-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-5-strong-text-font-weight,900);line-height:var(--spectrum-heading-5-strong-text-line-height,1.3);font-style:var(--spectrum-heading-5-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-5-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-5-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading6,.spectrum-Heading--subtitle2{font-size:var(--spectrum-heading-6-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-6-text-font-weight,700);line-height:var(--spectrum-heading-6-text-line-height,1.3);font-style:var(--spectrum-heading-6-text-font-style,normal);letter-spacing:var(--spectrum-heading-6-text-letter-spacing,0);text-transform:var(--spectrum-heading-6-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading6 em,.spectrum-Heading--subtitle2 em{font-size:var(--spectrum-heading-6-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-6-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-6-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-6-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-6-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-6-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading6 strong,.spectrum-Heading--subtitle2 strong{font-size:var(--spectrum-heading-6-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-6-strong-text-font-weight,900);line-height:var(--spectrum-heading-6-strong-text-line-height,1.3);font-style:var(--spectrum-heading-6-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-6-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-6-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--subtitle3,.spectrum-Subheading{font-size:var(--spectrum-subheading-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-text-font-weight,700);line-height:var(--spectrum-subheading-text-line-height,1.3);font-style:var(--spectrum-subheading-text-font-style,normal);letter-spacing:var(--spectrum-subheading-text-letter-spacing,.06em);text-transform:var(--spectrum-subheading-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum-Heading--subtitle3 em,.spectrum-Subheading em{font-size:var(--spectrum-subheading-emphasis-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-emphasis-text-font-weight,700);line-height:var(--spectrum-subheading-emphasis-text-line-height,1.3);font-style:var(--spectrum-subheading-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-subheading-emphasis-text-letter-spacing,.06em);text-transform:var(--spectrum-subheading-emphasis-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum-Heading--subtitle3 strong,.spectrum-Subheading strong{font-size:var(--spectrum-subheading-strong-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-strong-text-font-weight,900);line-height:var(--spectrum-subheading-strong-text-line-height,1.3);font-style:var(--spectrum-subheading-strong-text-font-style,normal);letter-spacing:var(--spectrum-subheading-strong-text-letter-spacing,.06em);text-transform:var(--spectrum-subheading-strong-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum-Detail{font-size:var(--spectrum-detail-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-text-font-weight,400);line-height:var(--spectrum-detail-text-line-height,1.5);font-style:var(--spectrum-detail-text-font-style,normal);letter-spacing:var(--spectrum-detail-text-letter-spacing,.06em);text-transform:var(--spectrum-detail-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum-Detail em{font-size:var(--spectrum-detail-emphasis-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-emphasis-text-font-weight,400);line-height:var(--spectrum-detail-emphasis-text-line-height,1.5);font-style:var(--spectrum-detail-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-detail-emphasis-text-letter-spacing,.06em);text-transform:var(--spectrum-detail-emphasis-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum-Detail strong{font-size:var(--spectrum-detail-strong-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-strong-text-font-weight,700);line-height:var(--spectrum-detail-strong-text-line-height,1.5);font-style:var(--spectrum-detail-strong-text-font-style,normal);letter-spacing:var(--spectrum-detail-strong-text-letter-spacing,.06em);text-transform:var(--spectrum-detail-strong-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum-Heading1--quiet{font-size:var(--spectrum-heading-quiet-1-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-quiet-1-text-font-weight,300);line-height:var(--spectrum-heading-quiet-1-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-1-text-letter-spacing,0);text-transform:var(--spectrum-heading-quiet-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--quiet em{font-size:var(--spectrum-heading-quiet-1-emphasis-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-quiet-1-emphasis-text-font-weight,300);line-height:var(--spectrum-heading-quiet-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-quiet-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-quiet-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--quiet strong{font-size:var(--spectrum-heading-quiet-1-strong-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-quiet-1-strong-text-font-weight,700);line-height:var(--spectrum-heading-quiet-1-strong-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-quiet-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--quiet,.spectrum-Heading--pageTitle{font-size:var(--spectrum-heading-quiet-2-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-quiet-2-text-font-weight,300);line-height:var(--spectrum-heading-quiet-2-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-2-text-letter-spacing,0);text-transform:var(--spectrum-heading-quiet-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--quiet em,.spectrum-Heading--pageTitle em{font-size:var(--spectrum-heading-quiet-2-emphasis-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-quiet-2-emphasis-text-font-weight,300);line-height:var(--spectrum-heading-quiet-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-quiet-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-quiet-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--quiet strong,.spectrum-Heading--pageTitle strong{font-size:var(--spectrum-heading-quiet-2-strong-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-quiet-2-strong-text-font-weight,700);line-height:var(--spectrum-heading-quiet-2-strong-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-quiet-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--strong{font-size:var(--spectrum-heading-strong-1-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-strong-1-text-font-weight,900);line-height:var(--spectrum-heading-strong-1-text-line-height,1.3);font-style:var(--spectrum-heading-strong-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-1-text-letter-spacing,0);text-transform:var(--spectrum-heading-strong-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--strong em{font-size:var(--spectrum-heading-strong-1-emphasis-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-strong-1-emphasis-text-font-weight,900);line-height:var(--spectrum-heading-strong-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-strong-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-strong-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-strong-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--strong strong{font-size:var(--spectrum-heading-strong-1-strong-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-strong-1-strong-text-font-weight,900);line-height:var(--spectrum-heading-strong-1-strong-text-line-height,1.3);font-style:var(--spectrum-heading-strong-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-strong-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--strong{font-size:var(--spectrum-heading-strong-2-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-strong-2-text-font-weight,900);line-height:var(--spectrum-heading-strong-2-text-line-height,1.3);font-style:var(--spectrum-heading-strong-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-2-text-letter-spacing,0);text-transform:var(--spectrum-heading-strong-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--strong em{font-size:var(--spectrum-heading-strong-2-emphasis-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-strong-2-emphasis-text-font-weight,900);line-height:var(--spectrum-heading-strong-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-strong-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-strong-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-heading-strong-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--strong strong{font-size:var(--spectrum-heading-strong-2-strong-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-strong-2-strong-text-font-weight,900);line-height:var(--spectrum-heading-strong-2-strong-text-line-height,1.3);font-style:var(--spectrum-heading-strong-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-heading-strong-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display{font-size:var(--spectrum-display-1-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-1-text-font-weight,700);line-height:var(--spectrum-display-1-text-line-height,1.3);font-style:var(--spectrum-display-1-text-font-style,normal);letter-spacing:var(--spectrum-display-1-text-letter-spacing,0);text-transform:var(--spectrum-display-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display em{font-size:var(--spectrum-display-1-emphasis-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-1-emphasis-text-font-weight,700);line-height:var(--spectrum-display-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-display-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display strong{font-size:var(--spectrum-display-1-strong-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-1-strong-text-font-weight,900);line-height:var(--spectrum-display-1-strong-text-line-height,1.3);font-style:var(--spectrum-display-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-display-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display{font-size:var(--spectrum-display-2-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-2-text-font-weight,700);line-height:var(--spectrum-display-2-text-line-height,1.3);font-style:var(--spectrum-display-2-text-font-style,normal);letter-spacing:var(--spectrum-display-2-text-letter-spacing,0);text-transform:var(--spectrum-display-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display em{font-size:var(--spectrum-display-2-emphasis-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-2-emphasis-text-font-weight,700);line-height:var(--spectrum-display-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-display-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display strong{font-size:var(--spectrum-display-2-strong-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-2-strong-text-font-weight,900);line-height:var(--spectrum-display-2-strong-text-line-height,1.3);font-style:var(--spectrum-display-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-display-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display.spectrum-Heading1--strong{font-size:var(--spectrum-display-strong-1-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-strong-1-text-font-weight,900);line-height:var(--spectrum-display-strong-1-text-line-height,1.3);font-style:var(--spectrum-display-strong-1-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-1-text-letter-spacing,0);text-transform:var(--spectrum-display-strong-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display.spectrum-Heading1--strong em{font-size:var(--spectrum-display-strong-1-emphasis-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-strong-1-emphasis-text-font-weight,900);line-height:var(--spectrum-display-strong-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-strong-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-strong-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-display-strong-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display.spectrum-Heading1--strong strong{font-size:var(--spectrum-display-strong-1-strong-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-strong-1-strong-text-font-weight,900);line-height:var(--spectrum-display-strong-1-strong-text-line-height,1.3);font-style:var(--spectrum-display-strong-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-display-strong-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display.spectrum-Heading2--strong{font-size:var(--spectrum-display-strong-2-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-strong-2-text-font-weight,900);line-height:var(--spectrum-display-strong-2-text-line-height,1.3);font-style:var(--spectrum-display-strong-2-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-2-text-letter-spacing,0);text-transform:var(--spectrum-display-strong-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display.spectrum-Heading2--strong em{font-size:var(--spectrum-display-strong-2-emphasis-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-strong-2-emphasis-text-font-weight,900);line-height:var(--spectrum-display-strong-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-strong-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-strong-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-display-strong-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display.spectrum-Heading2--strong strong{font-size:var(--spectrum-display-strong-2-strong-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-strong-2-strong-text-font-weight,900);line-height:var(--spectrum-display-strong-2-strong-text-line-height,1.3);font-style:var(--spectrum-display-strong-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-display-strong-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display.spectrum-Heading1--quiet{font-size:var(--spectrum-display-quiet-1-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-quiet-1-text-font-weight,300);line-height:var(--spectrum-display-quiet-1-text-line-height,1.3);font-style:var(--spectrum-display-quiet-1-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-1-text-letter-spacing,0);text-transform:var(--spectrum-display-quiet-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display.spectrum-Heading1--quiet em{font-size:var(--spectrum-display-quiet-1-emphasis-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-quiet-1-emphasis-text-font-weight,300);line-height:var(--spectrum-display-quiet-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-quiet-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-quiet-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-display-quiet-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading1--display.spectrum-Heading1--quiet strong{font-size:var(--spectrum-display-quiet-1-strong-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-quiet-1-strong-text-font-weight,700);line-height:var(--spectrum-display-quiet-1-strong-text-line-height,1.3);font-style:var(--spectrum-display-quiet-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-display-quiet-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum-Heading--display{font-size:var(--spectrum-display-quiet-2-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-quiet-2-text-font-weight,300);line-height:var(--spectrum-display-quiet-2-text-line-height,1.3);font-style:var(--spectrum-display-quiet-2-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-2-text-letter-spacing,0);text-transform:var(--spectrum-display-quiet-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display.spectrum-Heading2--quiet em,.spectrum-Heading--display em{font-size:var(--spectrum-display-quiet-2-emphasis-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-quiet-2-emphasis-text-font-weight,300);line-height:var(--spectrum-display-quiet-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-quiet-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-quiet-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-display-quiet-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading2--display.spectrum-Heading2--quiet strong,.spectrum-Heading--display strong{font-size:var(--spectrum-display-quiet-2-strong-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-quiet-2-strong-text-font-weight,700);line-height:var(--spectrum-display-quiet-2-strong-text-line-height,1.3);font-style:var(--spectrum-display-quiet-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-display-quiet-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Typography .spectrum-Body1{margin-top:var(--spectrum-body-1-margin-top,0);margin-bottom:var(--spectrum-body-1-margin-bottom,var(--spectrum-global-dimension-size-200))}.spectrum-Typography .spectrum-Body2,.spectrum-Typography .spectrum-Body--large{margin-top:var(--spectrum-body-2-margin-top,0);margin-bottom:var(--spectrum-body-2-margin-bottom,var(--spectrum-global-dimension-size-160))}.spectrum-Typography .spectrum-Body3{margin-top:var(--spectrum-body-3-margin-top,0);margin-bottom:var(--spectrum-body-3-margin-bottom,var(--spectrum-global-dimension-size-150))}.spectrum-Typography .spectrum-Body4,.spectrum-Typography .spectrum-Body--secondary{margin-top:var(--spectrum-body-4-margin-top,0);margin-bottom:var(--spectrum-body-4-margin-bottom,var(--spectrum-global-dimension-size-125))}.spectrum-Typography .spectrum-Body5,.spectrum-Typography .spectrum-Body--small{margin-top:var(--spectrum-body-5-margin-top,0);margin-bottom:var(--spectrum-body-5-margin-bottom,var(--spectrum-global-dimension-size-115))}.spectrum-Typography .spectrum-Heading1{margin-top:var(--spectrum-heading-1-margin-top,var(--spectrum-alias-heading1-margin-top));margin-bottom:var(--spectrum-heading-1-margin-bottom,var(--spectrum-global-dimension-size-115))}.spectrum-Typography .spectrum-Heading2{margin-top:var(--spectrum-heading-2-margin-top,var(--spectrum-alias-heading2-margin-top));margin-bottom:var(--spectrum-heading-2-margin-bottom,var(--spectrum-global-dimension-size-85))}.spectrum-Typography .spectrum-Heading3{margin-top:var(--spectrum-heading-3-margin-top,var(--spectrum-alias-heading3-margin-top));margin-bottom:var(--spectrum-heading-3-margin-bottom,var(--spectrum-global-dimension-size-75))}.spectrum-Typography .spectrum-Heading4,.spectrum-Typography .spectrum-Heading--subtitle1{margin-top:var(--spectrum-heading-4-margin-top,var(--spectrum-global-dimension-font-size-200));margin-bottom:var(--spectrum-heading-4-margin-bottom,var(--spectrum-global-dimension-size-65))}.spectrum-Typography .spectrum-Heading5{margin-top:var(--spectrum-heading-5-margin-top,var(--spectrum-global-dimension-font-size-100));margin-bottom:var(--spectrum-heading-5-margin-bottom,var(--spectrum-global-dimension-size-50))}.spectrum-Typography .spectrum-Heading6,.spectrum-Typography .spectrum-Heading--subtitle2{margin-top:var(--spectrum-heading-6-margin-top,var(--spectrum-global-dimension-size-150));margin-bottom:var(--spectrum-heading-6-margin-bottom,var(--spectrum-global-dimension-size-40))}.spectrum-Typography .spectrum-Heading--subtitle3,.spectrum-Typography .spectrum-Subheading{margin-top:var(--spectrum-subheading-margin-top,var(--spectrum-global-dimension-size-150));margin-bottom:var(--spectrum-subheading-margin-bottom,var(--spectrum-global-dimension-size-40))}.spectrum-Typography .spectrum-Detail{margin-top:var(--spectrum-detail-margin-top,0);margin-bottom:var(--spectrum-detail-margin-bottom,var(--spectrum-global-dimension-size-100))}.spectrum-Typography .spectrum-Heading1--quiet{margin-top:var(--spectrum-heading-quiet-1-margin-top,var(--spectrum-alias-heading1-margin-top));margin-bottom:var(--spectrum-heading-quiet-1-margin-bottom,var(--spectrum-global-dimension-size-115))}.spectrum-Typography .spectrum-Heading2--quiet,.spectrum-Typography .spectrum-Heading--pageTitle{margin-top:var(--spectrum-heading-quiet-2-margin-top,var(--spectrum-alias-heading2-margin-top));margin-bottom:var(--spectrum-heading-quiet-2-margin-bottom,var(--spectrum-global-dimension-size-85))}.spectrum-Typography .spectrum-Heading1--strong{margin-top:var(--spectrum-heading-strong-1-margin-top,var(--spectrum-alias-heading1-margin-top));margin-bottom:var(--spectrum-heading-strong-1-margin-bottom,var(--spectrum-global-dimension-size-115))}.spectrum-Typography .spectrum-Heading2--strong{margin-top:var(--spectrum-heading-strong-2-margin-top,var(--spectrum-alias-heading2-margin-top));margin-bottom:var(--spectrum-heading-strong-2-margin-bottom,var(--spectrum-global-dimension-size-85))}.spectrum-Typography .spectrum-Heading1--display{margin-top:var(--spectrum-display-1-margin-top,var(--spectrum-alias-heading-display1-margin-top));margin-bottom:var(--spectrum-display-1-margin-bottom,var(--spectrum-global-dimension-size-130))}.spectrum-Typography .spectrum-Heading2--display{margin-top:var(--spectrum-display-2-margin-top,var(--spectrum-alias-heading-display2-margin-top));margin-bottom:var(--spectrum-display-2-margin-bottom,var(--spectrum-global-dimension-size-125))}.spectrum-Typography .spectrum-Heading1--display.spectrum-Heading1--strong{margin-top:var(--spectrum-display-strong-1-margin-top,var(--spectrum-alias-heading-display1-margin-top));margin-bottom:var(--spectrum-display-strong-1-margin-bottom,var(--spectrum-global-dimension-size-130))}.spectrum-Typography .spectrum-Heading2--display.spectrum-Heading2--strong{margin-top:var(--spectrum-display-strong-2-margin-top,var(--spectrum-alias-heading-display2-margin-top));margin-bottom:var(--spectrum-display-strong-2-margin-bottom,var(--spectrum-global-dimension-size-125))}.spectrum-Typography .spectrum-Heading1--display.spectrum-Heading1--quiet{margin-top:var(--spectrum-display-quiet-1-margin-top,var(--spectrum-alias-heading-display1-margin-top));margin-bottom:var(--spectrum-display-quiet-1-margin-bottom,var(--spectrum-global-dimension-size-130))}.spectrum-Typography .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum-Typography .spectrum-Heading--display{margin-top:var(--spectrum-display-quiet-2-margin-top,var(--spectrum-alias-heading-display2-margin-top));margin-bottom:var(--spectrum-display-quiet-2-margin-bottom,var(--spectrum-global-dimension-size-125))}.spectrum-Article{font-family:var(--spectrum-body-article-1-text-font-family,adobe-clean-serif,"Source Serif Pro",Georgia,serif)}.spectrum-Article .spectrum-Body1{font-size:var(--spectrum-body-article-1-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-article-1-text-font-weight,400);line-height:var(--spectrum-body-article-1-text-line-height,1.5);font-style:var(--spectrum-body-article-1-text-font-style,normal);letter-spacing:var(--spectrum-body-article-1-text-letter-spacing,0);text-transform:var(--spectrum-body-article-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body1 em{font-size:var(--spectrum-body-article-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-article-1-emphasis-text-font-weight,400);line-height:var(--spectrum-body-article-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-article-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-article-1-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-article-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body1 strong{font-size:var(--spectrum-body-article-1-strong-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-article-1-strong-text-font-weight,900);line-height:var(--spectrum-body-article-1-strong-text-line-height,1.5);font-style:var(--spectrum-body-article-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-article-1-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-article-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body2,.spectrum-Article .spectrum-Body--large{font-size:var(--spectrum-body-article-2-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-article-2-text-font-weight,400);line-height:var(--spectrum-body-article-2-text-line-height,1.5);font-style:var(--spectrum-body-article-2-text-font-style,normal);letter-spacing:var(--spectrum-body-article-2-text-letter-spacing,0);text-transform:var(--spectrum-body-article-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body2 em,.spectrum-Article .spectrum-Body--large em{font-size:var(--spectrum-body-article-2-emphasis-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-article-2-emphasis-text-font-weight,400);line-height:var(--spectrum-body-article-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-article-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-article-2-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-article-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body2 strong,.spectrum-Article .spectrum-Body--large strong{font-size:var(--spectrum-body-article-2-strong-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-article-2-strong-text-font-weight,900);line-height:var(--spectrum-body-article-2-strong-text-line-height,1.5);font-style:var(--spectrum-body-article-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-article-2-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-article-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body3{font-size:var(--spectrum-body-article-3-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-article-3-text-font-weight,400);line-height:var(--spectrum-body-article-3-text-line-height,1.5);font-style:var(--spectrum-body-article-3-text-font-style,normal);letter-spacing:var(--spectrum-body-article-3-text-letter-spacing,0);text-transform:var(--spectrum-body-article-3-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body3 em{font-size:var(--spectrum-body-article-3-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-article-3-emphasis-text-font-weight,400);line-height:var(--spectrum-body-article-3-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-article-3-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-article-3-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-article-3-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body3 strong{font-size:var(--spectrum-body-article-3-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-article-3-strong-text-font-weight,900);line-height:var(--spectrum-body-article-3-strong-text-line-height,1.5);font-style:var(--spectrum-body-article-3-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-article-3-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-article-3-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body4,.spectrum-Article .spectrum-Body--secondary{font-size:var(--spectrum-body-article-4-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-article-4-text-font-weight,400);line-height:var(--spectrum-body-article-4-text-line-height,1.5);font-style:var(--spectrum-body-article-4-text-font-style,normal);letter-spacing:var(--spectrum-body-article-4-text-letter-spacing,0);text-transform:var(--spectrum-body-article-4-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body4 em,.spectrum-Article .spectrum-Body--secondary em{font-size:var(--spectrum-body-article-4-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-article-4-emphasis-text-font-weight,400);line-height:var(--spectrum-body-article-4-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-article-4-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-article-4-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-article-4-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body4 strong,.spectrum-Article .spectrum-Body--secondary strong{font-size:var(--spectrum-body-article-4-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-article-4-strong-text-font-weight,900);line-height:var(--spectrum-body-article-4-strong-text-line-height,1.5);font-style:var(--spectrum-body-article-4-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-article-4-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-article-4-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body5,.spectrum-Article .spectrum-Body--small{font-size:var(--spectrum-body-article-5-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-article-5-text-font-weight,400);line-height:var(--spectrum-body-article-5-text-line-height,1.5);font-style:var(--spectrum-body-article-5-text-font-style,normal);letter-spacing:var(--spectrum-body-article-5-text-letter-spacing,0);text-transform:var(--spectrum-body-article-5-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body5 em,.spectrum-Article .spectrum-Body--small em{font-size:var(--spectrum-body-article-5-emphasis-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-article-5-emphasis-text-font-weight,400);line-height:var(--spectrum-body-article-5-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-article-5-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-article-5-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-body-article-5-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Body5 strong,.spectrum-Article .spectrum-Body--small strong{font-size:var(--spectrum-body-article-5-strong-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-article-5-strong-text-font-weight,900);line-height:var(--spectrum-body-article-5-strong-text-line-height,1.5);font-style:var(--spectrum-body-article-5-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-article-5-strong-text-letter-spacing,0);text-transform:var(--spectrum-body-article-5-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1{font-size:var(--spectrum-heading-article-1-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-article-1-text-font-weight,700);line-height:var(--spectrum-heading-article-1-text-line-height,1.3);font-style:var(--spectrum-heading-article-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-1-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1 em{font-size:var(--spectrum-heading-article-1-emphasis-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-article-1-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-article-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-article-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-article-1-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1 strong{font-size:var(--spectrum-heading-article-1-strong-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-article-1-strong-text-font-weight,900);line-height:var(--spectrum-heading-article-1-strong-text-line-height,1.3);font-style:var(--spectrum-heading-article-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-1-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2{font-size:var(--spectrum-heading-article-2-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-article-2-text-font-weight,700);line-height:var(--spectrum-heading-article-2-text-line-height,1.3);font-style:var(--spectrum-heading-article-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-2-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2 em{font-size:var(--spectrum-heading-article-2-emphasis-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-article-2-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-article-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-article-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-article-2-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2 strong{font-size:var(--spectrum-heading-article-2-strong-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-article-2-strong-text-font-weight,900);line-height:var(--spectrum-heading-article-2-strong-text-line-height,1.3);font-style:var(--spectrum-heading-article-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-2-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading3{font-size:var(--spectrum-heading-article-3-text-size,var(--spectrum-alias-heading3-text-size));font-weight:var(--spectrum-heading-article-3-text-font-weight,700);line-height:var(--spectrum-heading-article-3-text-line-height,1.3);font-style:var(--spectrum-heading-article-3-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-3-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-3-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading3 em{font-size:var(--spectrum-heading-article-3-emphasis-text-size,var(--spectrum-alias-heading3-text-size));font-weight:var(--spectrum-heading-article-3-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-article-3-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-article-3-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-article-3-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-3-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading3 strong{font-size:var(--spectrum-heading-article-3-strong-text-size,var(--spectrum-alias-heading3-text-size));font-weight:var(--spectrum-heading-article-3-strong-text-font-weight,900);line-height:var(--spectrum-heading-article-3-strong-text-line-height,1.3);font-style:var(--spectrum-heading-article-3-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-3-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-3-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading4,.spectrum-Article .spectrum-Heading--subtitle1{font-size:var(--spectrum-heading-article-4-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-article-4-text-font-weight,700);line-height:var(--spectrum-heading-article-4-text-line-height,1.3);font-style:var(--spectrum-heading-article-4-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-4-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-4-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading4 em,.spectrum-Article .spectrum-Heading--subtitle1 em{font-size:var(--spectrum-heading-article-4-emphasis-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-article-4-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-article-4-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-article-4-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-article-4-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-4-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading4 strong,.spectrum-Article .spectrum-Heading--subtitle1 strong{font-size:var(--spectrum-heading-article-4-strong-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-article-4-strong-text-font-weight,900);line-height:var(--spectrum-heading-article-4-strong-text-line-height,1.3);font-style:var(--spectrum-heading-article-4-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-4-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-4-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading5{font-size:var(--spectrum-heading-article-5-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-article-5-text-font-weight,700);line-height:var(--spectrum-heading-article-5-text-line-height,1.3);font-style:var(--spectrum-heading-article-5-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-5-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-5-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading5 em{font-size:var(--spectrum-heading-article-5-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-article-5-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-article-5-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-article-5-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-article-5-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-5-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading5 strong{font-size:var(--spectrum-heading-article-5-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-article-5-strong-text-font-weight,900);line-height:var(--spectrum-heading-article-5-strong-text-line-height,1.3);font-style:var(--spectrum-heading-article-5-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-5-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-5-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading6,.spectrum-Article .spectrum-Heading--subtitle2{font-size:var(--spectrum-heading-article-6-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-article-6-text-font-weight,700);line-height:var(--spectrum-heading-article-6-text-line-height,1.3);font-style:var(--spectrum-heading-article-6-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-6-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-6-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading6 em,.spectrum-Article .spectrum-Heading--subtitle2 em{font-size:var(--spectrum-heading-article-6-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-article-6-emphasis-text-font-weight,700);line-height:var(--spectrum-heading-article-6-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-article-6-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-article-6-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-6-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading6 strong,.spectrum-Article .spectrum-Heading--subtitle2 strong{font-size:var(--spectrum-heading-article-6-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-article-6-strong-text-font-weight,900);line-height:var(--spectrum-heading-article-6-strong-text-line-height,1.3);font-style:var(--spectrum-heading-article-6-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-article-6-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-article-6-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading--subtitle3,.spectrum-Article .spectrum-Subheading{font-size:var(--spectrum-subheading-article-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-article-text-font-weight,700);line-height:var(--spectrum-subheading-article-text-line-height,1.3);font-style:var(--spectrum-subheading-article-text-font-style,normal);letter-spacing:var(--spectrum-subheading-article-text-letter-spacing,.0125em);text-transform:var(--spectrum-subheading-article-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading--subtitle3 em,.spectrum-Article .spectrum-Subheading em{font-size:var(--spectrum-subheading-article-emphasis-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-article-emphasis-text-font-weight,700);line-height:var(--spectrum-subheading-article-emphasis-text-line-height,1.3);font-style:var(--spectrum-subheading-article-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-subheading-article-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-subheading-article-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading--subtitle3 strong,.spectrum-Article .spectrum-Subheading strong{font-size:var(--spectrum-subheading-article-strong-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-article-strong-text-font-weight,900);line-height:var(--spectrum-subheading-article-strong-text-line-height,1.3);font-style:var(--spectrum-subheading-article-strong-text-font-style,normal);letter-spacing:var(--spectrum-subheading-article-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-subheading-article-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Detail{font-size:var(--spectrum-detail-article-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-article-text-font-weight,400);line-height:var(--spectrum-detail-article-text-line-height,1.5);font-style:var(--spectrum-detail-article-text-font-style,normal);letter-spacing:var(--spectrum-detail-article-text-letter-spacing,0);text-transform:var(--spectrum-detail-article-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Detail em{font-size:var(--spectrum-detail-article-emphasis-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-article-emphasis-text-font-weight,400);line-height:var(--spectrum-detail-article-emphasis-text-line-height,1.5);font-style:var(--spectrum-detail-article-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-detail-article-emphasis-text-letter-spacing,0);text-transform:var(--spectrum-detail-article-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Detail strong{font-size:var(--spectrum-detail-article-strong-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-article-strong-text-font-weight,700);line-height:var(--spectrum-detail-article-strong-text-line-height,1.5);font-style:var(--spectrum-detail-article-strong-text-font-style,normal);letter-spacing:var(--spectrum-detail-article-strong-text-letter-spacing,0);text-transform:var(--spectrum-detail-article-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--quiet{font-size:var(--spectrum-heading-quiet-article-1-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-quiet-article-1-text-font-weight,400);line-height:var(--spectrum-heading-quiet-article-1-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-article-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-article-1-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-quiet-article-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--quiet em{font-size:var(--spectrum-heading-quiet-article-1-emphasis-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-quiet-article-1-emphasis-text-font-weight,400);line-height:var(--spectrum-heading-quiet-article-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-article-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-quiet-article-1-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-quiet-article-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--quiet strong{font-size:var(--spectrum-heading-quiet-article-1-strong-text-size,var(--spectrum-alias-heading-display2-margin-top));font-weight:var(--spectrum-heading-quiet-article-1-strong-text-font-weight,900);line-height:var(--spectrum-heading-quiet-article-1-strong-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-article-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-article-1-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-quiet-article-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--quiet,.spectrum-Article .spectrum-Heading--pageTitle{font-size:var(--spectrum-heading-quiet-article-2-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-quiet-article-2-text-font-weight,400);line-height:var(--spectrum-heading-quiet-article-2-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-article-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-article-2-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-quiet-article-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--quiet em,.spectrum-Article .spectrum-Heading--pageTitle em{font-size:var(--spectrum-heading-quiet-article-2-emphasis-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-quiet-article-2-emphasis-text-font-weight,400);line-height:var(--spectrum-heading-quiet-article-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-article-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-heading-quiet-article-2-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-quiet-article-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--quiet strong,.spectrum-Article .spectrum-Heading--pageTitle strong{font-size:var(--spectrum-heading-quiet-article-2-strong-text-size,var(--spectrum-alias-heading2-text-size));font-weight:var(--spectrum-heading-quiet-article-2-strong-text-font-weight,900);line-height:var(--spectrum-heading-quiet-article-2-strong-text-line-height,1.3);font-style:var(--spectrum-heading-quiet-article-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-article-2-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-heading-quiet-article-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--display{font-size:var(--spectrum-display-article-1-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-article-1-text-font-weight,700);line-height:var(--spectrum-display-article-1-text-line-height,1.3);font-style:var(--spectrum-display-article-1-text-font-style,normal);letter-spacing:var(--spectrum-display-article-1-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-article-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--display em{font-size:var(--spectrum-display-article-1-emphasis-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-article-1-emphasis-text-font-weight,700);line-height:var(--spectrum-display-article-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-article-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-article-1-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-article-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--display strong{font-size:var(--spectrum-display-article-1-strong-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-article-1-strong-text-font-weight,900);line-height:var(--spectrum-display-article-1-strong-text-line-height,1.3);font-style:var(--spectrum-display-article-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-article-1-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-article-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--display{font-size:var(--spectrum-display-article-2-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-article-2-text-font-weight,700);line-height:var(--spectrum-display-article-2-text-line-height,1.3);font-style:var(--spectrum-display-article-2-text-font-style,normal);letter-spacing:var(--spectrum-display-article-2-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-article-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--display em{font-size:var(--spectrum-display-article-2-emphasis-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-article-2-emphasis-text-font-weight,700);line-height:var(--spectrum-display-article-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-article-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-article-2-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-article-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--display strong{font-size:var(--spectrum-display-article-2-strong-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-article-2-strong-text-font-weight,900);line-height:var(--spectrum-display-article-2-strong-text-line-height,1.3);font-style:var(--spectrum-display-article-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-article-2-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-article-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--display.spectrum-Heading1--quiet{font-size:var(--spectrum-display-quiet-article-1-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-quiet-article-1-text-font-weight,400);line-height:var(--spectrum-display-quiet-article-1-text-line-height,1.3);font-style:var(--spectrum-display-quiet-article-1-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-article-1-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-quiet-article-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--display.spectrum-Heading1--quiet em{font-size:var(--spectrum-display-quiet-article-1-emphasis-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-quiet-article-1-emphasis-text-font-weight,400);line-height:var(--spectrum-display-quiet-article-1-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-quiet-article-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-quiet-article-1-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-quiet-article-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading1--display.spectrum-Heading1--quiet strong{font-size:var(--spectrum-display-quiet-article-1-strong-text-size,var(--spectrum-alias-heading-display1-text-size));font-weight:var(--spectrum-display-quiet-article-1-strong-text-font-weight,700);line-height:var(--spectrum-display-quiet-article-1-strong-text-line-height,1.3);font-style:var(--spectrum-display-quiet-article-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-article-1-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-quiet-article-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum-Article .spectrum-Heading--display{font-size:var(--spectrum-display-quiet-article-2-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-quiet-article-2-text-font-weight,400);line-height:var(--spectrum-display-quiet-article-2-text-line-height,1.3);font-style:var(--spectrum-display-quiet-article-2-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-article-2-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-quiet-article-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--display.spectrum-Heading2--quiet em,.spectrum-Article .spectrum-Heading--display em{font-size:var(--spectrum-display-quiet-article-2-emphasis-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-quiet-article-2-emphasis-text-font-weight,400);line-height:var(--spectrum-display-quiet-article-2-emphasis-text-line-height,1.3);font-style:var(--spectrum-display-quiet-article-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-display-quiet-article-2-emphasis-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-quiet-article-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Article .spectrum-Heading2--display.spectrum-Heading2--quiet strong,.spectrum-Article .spectrum-Heading--display strong{font-size:var(--spectrum-display-quiet-article-2-strong-text-size,var(--spectrum-alias-heading-display1-margin-top));font-weight:var(--spectrum-display-quiet-article-2-strong-text-font-weight,700);line-height:var(--spectrum-display-quiet-article-2-strong-text-line-height,1.3);font-style:var(--spectrum-display-quiet-article-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-article-2-strong-text-letter-spacing,.0125em);text-transform:var(--spectrum-display-quiet-article-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body1,.spectrum:lang(ko) .spectrum-Body1,.spectrum:lang(zh) .spectrum-Body1{font-size:var(--spectrum-body-han-1-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-han-1-text-font-weight,400);line-height:var(--spectrum-body-han-1-text-line-height,1.7);font-style:var(--spectrum-body-han-1-text-font-style,normal);letter-spacing:var(--spectrum-body-han-1-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body1 em,.spectrum:lang(ko) .spectrum-Body1 em,.spectrum:lang(zh) .spectrum-Body1 em{font-size:var(--spectrum-body-han-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-han-1-emphasis-text-font-weight,700);line-height:var(--spectrum-body-han-1-emphasis-text-line-height,1.7);font-style:var(--spectrum-body-han-1-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-body-han-1-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body1 strong,.spectrum:lang(ko) .spectrum-Body1 strong,.spectrum:lang(zh) .spectrum-Body1 strong{font-size:var(--spectrum-body-han-1-strong-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-han-1-strong-text-font-weight,900);line-height:var(--spectrum-body-han-1-strong-text-line-height,1.7);font-style:var(--spectrum-body-han-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-han-1-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body2,.spectrum:lang(ja) .spectrum-Body--large,.spectrum:lang(ko) .spectrum-Body2,.spectrum:lang(ko) .spectrum-Body--large,.spectrum:lang(zh) .spectrum-Body2,.spectrum:lang(zh) .spectrum-Body--large{font-size:var(--spectrum-body-han-2-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-han-2-text-font-weight,400);line-height:var(--spectrum-body-han-2-text-line-height,1.7);font-style:var(--spectrum-body-han-2-text-font-style,normal);letter-spacing:var(--spectrum-body-han-2-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body2 em,.spectrum:lang(ja) .spectrum-Body--large em,.spectrum:lang(ko) .spectrum-Body2 em,.spectrum:lang(ko) .spectrum-Body--large em,.spectrum:lang(zh) .spectrum-Body2 em,.spectrum:lang(zh) .spectrum-Body--large em{font-size:var(--spectrum-body-han-2-emphasis-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-han-2-emphasis-text-font-weight,700);line-height:var(--spectrum-body-han-2-emphasis-text-line-height,1.7);font-style:var(--spectrum-body-han-2-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-body-han-2-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body2 strong,.spectrum:lang(ja) .spectrum-Body--large strong,.spectrum:lang(ko) .spectrum-Body2 strong,.spectrum:lang(ko) .spectrum-Body--large strong,.spectrum:lang(zh) .spectrum-Body2 strong,.spectrum:lang(zh) .spectrum-Body--large strong{font-size:var(--spectrum-body-han-2-strong-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-han-2-strong-text-font-weight,900);line-height:var(--spectrum-body-han-2-strong-text-line-height,1.7);font-style:var(--spectrum-body-han-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-han-2-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body3,.spectrum:lang(ko) .spectrum-Body3,.spectrum:lang(zh) .spectrum-Body3{font-size:var(--spectrum-body-han-3-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-han-3-text-font-weight,400);line-height:var(--spectrum-body-han-3-text-line-height,1.7);font-style:var(--spectrum-body-han-3-text-font-style,normal);letter-spacing:var(--spectrum-body-han-3-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-3-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body3 em,.spectrum:lang(ko) .spectrum-Body3 em,.spectrum:lang(zh) .spectrum-Body3 em{font-size:var(--spectrum-body-han-3-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-han-3-emphasis-text-font-weight,700);line-height:var(--spectrum-body-han-3-emphasis-text-line-height,1.7);font-style:var(--spectrum-body-han-3-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-body-han-3-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-3-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body3 strong,.spectrum:lang(ko) .spectrum-Body3 strong,.spectrum:lang(zh) .spectrum-Body3 strong{font-size:var(--spectrum-body-han-3-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-han-3-strong-text-font-weight,900);line-height:var(--spectrum-body-han-3-strong-text-line-height,1.7);font-style:var(--spectrum-body-han-3-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-han-3-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-3-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body4,.spectrum:lang(ja) .spectrum-Body--secondary,.spectrum:lang(ko) .spectrum-Body4,.spectrum:lang(ko) .spectrum-Body--secondary,.spectrum:lang(zh) .spectrum-Body4,.spectrum:lang(zh) .spectrum-Body--secondary{font-size:var(--spectrum-body-han-4-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-han-4-text-font-weight,400);line-height:var(--spectrum-body-han-4-text-line-height,1.7);font-style:var(--spectrum-body-han-4-text-font-style,normal);letter-spacing:var(--spectrum-body-han-4-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-4-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body4 em,.spectrum:lang(ja) .spectrum-Body--secondary em,.spectrum:lang(ko) .spectrum-Body4 em,.spectrum:lang(ko) .spectrum-Body--secondary em,.spectrum:lang(zh) .spectrum-Body4 em,.spectrum:lang(zh) .spectrum-Body--secondary em{font-size:var(--spectrum-body-han-4-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-han-4-emphasis-text-font-weight,700);line-height:var(--spectrum-body-han-4-emphasis-text-line-height,1.7);font-style:var(--spectrum-body-han-4-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-body-han-4-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-4-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body4 strong,.spectrum:lang(ja) .spectrum-Body--secondary strong,.spectrum:lang(ko) .spectrum-Body4 strong,.spectrum:lang(ko) .spectrum-Body--secondary strong,.spectrum:lang(zh) .spectrum-Body4 strong,.spectrum:lang(zh) .spectrum-Body--secondary strong{font-size:var(--spectrum-body-han-4-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-han-4-strong-text-font-weight,900);line-height:var(--spectrum-body-han-4-strong-text-line-height,1.7);font-style:var(--spectrum-body-han-4-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-han-4-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-4-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body5,.spectrum:lang(ja) .spectrum-Body--small,.spectrum:lang(ko) .spectrum-Body5,.spectrum:lang(ko) .spectrum-Body--small,.spectrum:lang(zh) .spectrum-Body5,.spectrum:lang(zh) .spectrum-Body--small{font-size:var(--spectrum-body-han-5-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-han-5-text-font-weight,400);line-height:var(--spectrum-body-han-5-text-line-height,1.7);font-style:var(--spectrum-body-han-5-text-font-style,normal);letter-spacing:var(--spectrum-body-han-5-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-5-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body5 em,.spectrum:lang(ja) .spectrum-Body--small em,.spectrum:lang(ko) .spectrum-Body5 em,.spectrum:lang(ko) .spectrum-Body--small em,.spectrum:lang(zh) .spectrum-Body5 em,.spectrum:lang(zh) .spectrum-Body--small em{font-size:var(--spectrum-body-han-5-emphasis-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-han-5-emphasis-text-font-weight,700);line-height:var(--spectrum-body-han-5-emphasis-text-line-height,1.7);font-style:var(--spectrum-body-han-5-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-body-han-5-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-5-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body5 strong,.spectrum:lang(ja) .spectrum-Body--small strong,.spectrum:lang(ko) .spectrum-Body5 strong,.spectrum:lang(ko) .spectrum-Body--small strong,.spectrum:lang(zh) .spectrum-Body5 strong,.spectrum:lang(zh) .spectrum-Body--small strong{font-size:var(--spectrum-body-han-5-strong-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-han-5-strong-text-font-weight,900);line-height:var(--spectrum-body-han-5-strong-text-line-height,1.7);font-style:var(--spectrum-body-han-5-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-han-5-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-body-han-5-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1,.spectrum:lang(ko) .spectrum-Heading1,.spectrum:lang(zh) .spectrum-Heading1{font-size:var(--spectrum-heading-han-1-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-han-1-text-font-weight,700);line-height:var(--spectrum-heading-han-1-text-line-height,1.5);font-style:var(--spectrum-heading-han-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-1-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1 em,.spectrum:lang(ko) .spectrum-Heading1 em,.spectrum:lang(zh) .spectrum-Heading1 em{font-size:var(--spectrum-heading-han-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-han-1-emphasis-text-font-weight,800);line-height:var(--spectrum-heading-han-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-han-1-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-1-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1 strong,.spectrum:lang(ko) .spectrum-Heading1 strong,.spectrum:lang(zh) .spectrum-Heading1 strong{font-size:var(--spectrum-heading-han-1-strong-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-han-1-strong-text-font-weight,900);line-height:var(--spectrum-heading-han-1-strong-text-line-height,1.5);font-style:var(--spectrum-heading-han-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-1-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2,.spectrum:lang(ko) .spectrum-Heading2,.spectrum:lang(zh) .spectrum-Heading2{font-size:var(--spectrum-heading-han-2-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-han-2-text-font-weight,700);line-height:var(--spectrum-heading-han-2-text-line-height,1.5);font-style:var(--spectrum-heading-han-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-2-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2 em,.spectrum:lang(ko) .spectrum-Heading2 em,.spectrum:lang(zh) .spectrum-Heading2 em{font-size:var(--spectrum-heading-han-2-emphasis-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-han-2-emphasis-text-font-weight,800);line-height:var(--spectrum-heading-han-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-han-2-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-2-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2 strong,.spectrum:lang(ko) .spectrum-Heading2 strong,.spectrum:lang(zh) .spectrum-Heading2 strong{font-size:var(--spectrum-heading-han-2-strong-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-han-2-strong-text-font-weight,900);line-height:var(--spectrum-heading-han-2-strong-text-line-height,1.5);font-style:var(--spectrum-heading-han-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-2-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading3,.spectrum:lang(ko) .spectrum-Heading3,.spectrum:lang(zh) .spectrum-Heading3{font-size:var(--spectrum-heading-han-3-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-heading-han-3-text-font-weight,700);line-height:var(--spectrum-heading-han-3-text-line-height,1.5);font-style:var(--spectrum-heading-han-3-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-3-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-3-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading3 em,.spectrum:lang(ko) .spectrum-Heading3 em,.spectrum:lang(zh) .spectrum-Heading3 em{font-size:var(--spectrum-heading-han-3-emphasis-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-heading-han-3-emphasis-text-font-weight,800);line-height:var(--spectrum-heading-han-3-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-han-3-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-3-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-3-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading3 strong,.spectrum:lang(ko) .spectrum-Heading3 strong,.spectrum:lang(zh) .spectrum-Heading3 strong{font-size:var(--spectrum-heading-han-3-strong-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-heading-han-3-strong-text-font-weight,900);line-height:var(--spectrum-heading-han-3-strong-text-line-height,1.5);font-style:var(--spectrum-heading-han-3-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-3-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-3-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading4,.spectrum:lang(ja) .spectrum-Heading--subtitle1,.spectrum:lang(ko) .spectrum-Heading4,.spectrum:lang(ko) .spectrum-Heading--subtitle1,.spectrum:lang(zh) .spectrum-Heading4,.spectrum:lang(zh) .spectrum-Heading--subtitle1{font-size:var(--spectrum-heading-han-4-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-han-4-text-font-weight,700);line-height:var(--spectrum-heading-han-4-text-line-height,1.5);font-style:var(--spectrum-heading-han-4-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-4-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-4-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading4 em,.spectrum:lang(ja) .spectrum-Heading--subtitle1 em,.spectrum:lang(ko) .spectrum-Heading4 em,.spectrum:lang(ko) .spectrum-Heading--subtitle1 em,.spectrum:lang(zh) .spectrum-Heading4 em,.spectrum:lang(zh) .spectrum-Heading--subtitle1 em{font-size:var(--spectrum-heading-han-4-emphasis-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-han-4-emphasis-text-font-weight,800);line-height:var(--spectrum-heading-han-4-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-han-4-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-4-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-4-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading4 strong,.spectrum:lang(ja) .spectrum-Heading--subtitle1 strong,.spectrum:lang(ko) .spectrum-Heading4 strong,.spectrum:lang(ko) .spectrum-Heading--subtitle1 strong,.spectrum:lang(zh) .spectrum-Heading4 strong,.spectrum:lang(zh) .spectrum-Heading--subtitle1 strong{font-size:var(--spectrum-heading-han-4-strong-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-heading-han-4-strong-text-font-weight,900);line-height:var(--spectrum-heading-han-4-strong-text-line-height,1.5);font-style:var(--spectrum-heading-han-4-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-4-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-4-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading5,.spectrum:lang(ko) .spectrum-Heading5,.spectrum:lang(zh) .spectrum-Heading5{font-size:var(--spectrum-heading-han-5-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-han-5-text-font-weight,700);line-height:var(--spectrum-heading-han-5-text-line-height,1.5);font-style:var(--spectrum-heading-han-5-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-5-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-5-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading5 em,.spectrum:lang(ko) .spectrum-Heading5 em,.spectrum:lang(zh) .spectrum-Heading5 em{font-size:var(--spectrum-heading-han-5-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-han-5-emphasis-text-font-weight,800);line-height:var(--spectrum-heading-han-5-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-han-5-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-5-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-5-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading5 strong,.spectrum:lang(ko) .spectrum-Heading5 strong,.spectrum:lang(zh) .spectrum-Heading5 strong{font-size:var(--spectrum-heading-han-5-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-heading-han-5-strong-text-font-weight,900);line-height:var(--spectrum-heading-han-5-strong-text-line-height,1.5);font-style:var(--spectrum-heading-han-5-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-5-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-5-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading6,.spectrum:lang(ja) .spectrum-Heading--subtitle2,.spectrum:lang(ko) .spectrum-Heading6,.spectrum:lang(ko) .spectrum-Heading--subtitle2,.spectrum:lang(zh) .spectrum-Heading6,.spectrum:lang(zh) .spectrum-Heading--subtitle2{font-size:var(--spectrum-heading-han-6-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-han-6-text-font-weight,700);line-height:var(--spectrum-heading-han-6-text-line-height,1.5);font-style:var(--spectrum-heading-han-6-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-6-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-6-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading6 em,.spectrum:lang(ja) .spectrum-Heading--subtitle2 em,.spectrum:lang(ko) .spectrum-Heading6 em,.spectrum:lang(ko) .spectrum-Heading--subtitle2 em,.spectrum:lang(zh) .spectrum-Heading6 em,.spectrum:lang(zh) .spectrum-Heading--subtitle2 em{font-size:var(--spectrum-heading-han-6-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-han-6-emphasis-text-font-weight,800);line-height:var(--spectrum-heading-han-6-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-han-6-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-6-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-6-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading6 strong,.spectrum:lang(ja) .spectrum-Heading--subtitle2 strong,.spectrum:lang(ko) .spectrum-Heading6 strong,.spectrum:lang(ko) .spectrum-Heading--subtitle2 strong,.spectrum:lang(zh) .spectrum-Heading6 strong,.spectrum:lang(zh) .spectrum-Heading--subtitle2 strong{font-size:var(--spectrum-heading-han-6-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-heading-han-6-strong-text-font-weight,900);line-height:var(--spectrum-heading-han-6-strong-text-line-height,1.5);font-style:var(--spectrum-heading-han-6-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-han-6-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-han-6-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--subtitle3,.spectrum:lang(ja) .spectrum-Subheading,.spectrum:lang(ko) .spectrum-Heading--subtitle3,.spectrum:lang(ko) .spectrum-Subheading,.spectrum:lang(zh) .spectrum-Heading--subtitle3,.spectrum:lang(zh) .spectrum-Subheading{font-size:var(--spectrum-subheading-han-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-han-text-font-weight,700);line-height:var(--spectrum-subheading-han-text-line-height,1.5);font-style:var(--spectrum-subheading-han-text-font-style,normal);letter-spacing:var(--spectrum-subheading-han-text-letter-spacing,.05em);text-transform:var(--spectrum-subheading-han-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--subtitle3 em,.spectrum:lang(ja) .spectrum-Subheading em,.spectrum:lang(ko) .spectrum-Heading--subtitle3 em,.spectrum:lang(ko) .spectrum-Subheading em,.spectrum:lang(zh) .spectrum-Heading--subtitle3 em,.spectrum:lang(zh) .spectrum-Subheading em{font-size:var(--spectrum-subheading-han-emphasis-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-han-emphasis-text-font-weight,800);line-height:var(--spectrum-subheading-han-emphasis-text-line-height,1.5);font-style:var(--spectrum-subheading-han-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-subheading-han-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-subheading-han-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--subtitle3 strong,.spectrum:lang(ja) .spectrum-Subheading strong,.spectrum:lang(ko) .spectrum-Heading--subtitle3 strong,.spectrum:lang(ko) .spectrum-Subheading strong,.spectrum:lang(zh) .spectrum-Heading--subtitle3 strong,.spectrum:lang(zh) .spectrum-Subheading strong{font-size:var(--spectrum-subheading-han-strong-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-subheading-han-strong-text-font-weight,900);line-height:var(--spectrum-subheading-han-strong-text-line-height,1.5);font-style:var(--spectrum-subheading-han-strong-text-font-style,normal);letter-spacing:var(--spectrum-subheading-han-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-subheading-han-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail,.spectrum:lang(ko) .spectrum-Detail,.spectrum:lang(zh) .spectrum-Detail{font-size:var(--spectrum-detail-han-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-han-text-font-weight,400);line-height:var(--spectrum-detail-han-text-line-height,1.7);font-style:var(--spectrum-detail-han-text-font-style,normal);letter-spacing:var(--spectrum-detail-han-text-letter-spacing,.05em);text-transform:var(--spectrum-detail-han-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail em,.spectrum:lang(ko) .spectrum-Detail em,.spectrum:lang(zh) .spectrum-Detail em{font-size:var(--spectrum-detail-han-emphasis-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-han-emphasis-text-font-weight,700);line-height:var(--spectrum-detail-han-emphasis-text-line-height,1.7);font-style:var(--spectrum-detail-han-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-detail-han-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-detail-han-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail strong,.spectrum:lang(ko) .spectrum-Detail strong,.spectrum:lang(zh) .spectrum-Detail strong{font-size:var(--spectrum-detail-han-strong-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-han-strong-text-font-weight,900);line-height:var(--spectrum-detail-han-strong-text-line-height,1.7);font-style:var(--spectrum-detail-han-strong-text-font-style,normal);letter-spacing:var(--spectrum-detail-han-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-detail-han-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--quiet,.spectrum:lang(ko) .spectrum-Heading1--quiet,.spectrum:lang(zh) .spectrum-Heading1--quiet{font-size:var(--spectrum-heading-quiet-han-1-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-quiet-han-1-text-font-weight,300);line-height:var(--spectrum-heading-quiet-han-1-text-line-height,1.5);font-style:var(--spectrum-heading-quiet-han-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-han-1-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-quiet-han-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--quiet em,.spectrum:lang(ko) .spectrum-Heading1--quiet em,.spectrum:lang(zh) .spectrum-Heading1--quiet em{font-size:var(--spectrum-heading-quiet-han-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-quiet-han-1-emphasis-text-font-weight,400);line-height:var(--spectrum-heading-quiet-han-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-quiet-han-1-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-han-1-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-quiet-han-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--quiet strong,.spectrum:lang(ko) .spectrum-Heading1--quiet strong,.spectrum:lang(zh) .spectrum-Heading1--quiet strong{font-size:var(--spectrum-heading-quiet-han-1-strong-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-quiet-han-1-strong-text-font-weight,700);line-height:var(--spectrum-heading-quiet-han-1-strong-text-line-height,1.5);font-style:var(--spectrum-heading-quiet-han-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-han-1-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-quiet-han-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--quiet,.spectrum:lang(ja) .spectrum-Heading--pageTitle,.spectrum:lang(ko) .spectrum-Heading2--quiet,.spectrum:lang(ko) .spectrum-Heading--pageTitle,.spectrum:lang(zh) .spectrum-Heading2--quiet,.spectrum:lang(zh) .spectrum-Heading--pageTitle{font-size:var(--spectrum-heading-quiet-han-2-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-quiet-han-2-text-font-weight,300);line-height:var(--spectrum-heading-quiet-han-2-text-line-height,1.5);font-style:var(--spectrum-heading-quiet-han-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-han-2-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-quiet-han-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--quiet em,.spectrum:lang(ja) .spectrum-Heading--pageTitle em,.spectrum:lang(ko) .spectrum-Heading2--quiet em,.spectrum:lang(ko) .spectrum-Heading--pageTitle em,.spectrum:lang(zh) .spectrum-Heading2--quiet em,.spectrum:lang(zh) .spectrum-Heading--pageTitle em{font-size:var(--spectrum-heading-quiet-han-2-emphasis-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-quiet-han-2-emphasis-text-font-weight,400);line-height:var(--spectrum-heading-quiet-han-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-quiet-han-2-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-han-2-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-quiet-han-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--quiet strong,.spectrum:lang(ja) .spectrum-Heading--pageTitle strong,.spectrum:lang(ko) .spectrum-Heading2--quiet strong,.spectrum:lang(ko) .spectrum-Heading--pageTitle strong,.spectrum:lang(zh) .spectrum-Heading2--quiet strong,.spectrum:lang(zh) .spectrum-Heading--pageTitle strong{font-size:var(--spectrum-heading-quiet-han-2-strong-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-quiet-han-2-strong-text-font-weight,700);line-height:var(--spectrum-heading-quiet-han-2-strong-text-line-height,1.5);font-style:var(--spectrum-heading-quiet-han-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-quiet-han-2-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-quiet-han-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--strong,.spectrum:lang(ko) .spectrum-Heading1--strong,.spectrum:lang(zh) .spectrum-Heading1--strong{font-size:var(--spectrum-heading-strong-han-1-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-strong-han-1-text-font-weight,900);line-height:var(--spectrum-heading-strong-han-1-text-line-height,1.5);font-style:var(--spectrum-heading-strong-han-1-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-han-1-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-strong-han-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--strong em,.spectrum:lang(ko) .spectrum-Heading1--strong em,.spectrum:lang(zh) .spectrum-Heading1--strong em{font-size:var(--spectrum-heading-strong-han-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-strong-han-1-emphasis-text-font-weight,900);line-height:var(--spectrum-heading-strong-han-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-strong-han-1-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-han-1-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-strong-han-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--strong strong,.spectrum:lang(ko) .spectrum-Heading1--strong strong,.spectrum:lang(zh) .spectrum-Heading1--strong strong{font-size:var(--spectrum-heading-strong-han-1-strong-text-size,var(--spectrum-global-dimension-font-size-800));font-weight:var(--spectrum-heading-strong-han-1-strong-text-font-weight,900);line-height:var(--spectrum-heading-strong-han-1-strong-text-line-height,1.5);font-style:var(--spectrum-heading-strong-han-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-han-1-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-strong-han-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--strong,.spectrum:lang(ko) .spectrum-Heading2--strong,.spectrum:lang(zh) .spectrum-Heading2--strong{font-size:var(--spectrum-heading-strong-han-2-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-strong-han-2-text-font-weight,900);line-height:var(--spectrum-heading-strong-han-2-text-line-height,1.5);font-style:var(--spectrum-heading-strong-han-2-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-han-2-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-strong-han-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--strong em,.spectrum:lang(ko) .spectrum-Heading2--strong em,.spectrum:lang(zh) .spectrum-Heading2--strong em{font-size:var(--spectrum-heading-strong-han-2-emphasis-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-strong-han-2-emphasis-text-font-weight,900);line-height:var(--spectrum-heading-strong-han-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-heading-strong-han-2-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-han-2-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-strong-han-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--strong strong,.spectrum:lang(ko) .spectrum-Heading2--strong strong,.spectrum:lang(zh) .spectrum-Heading2--strong strong{font-size:var(--spectrum-heading-strong-han-2-strong-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-heading-strong-han-2-strong-text-font-weight,900);line-height:var(--spectrum-heading-strong-han-2-strong-text-line-height,1.5);font-style:var(--spectrum-heading-strong-han-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-heading-strong-han-2-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-heading-strong-han-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display,.spectrum:lang(ko) .spectrum-Heading1--display,.spectrum:lang(zh) .spectrum-Heading1--display{font-size:var(--spectrum-display-han-1-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-han-1-text-font-weight,700);line-height:var(--spectrum-display-han-1-text-line-height,1.5);font-style:var(--spectrum-display-han-1-text-font-style,normal);letter-spacing:var(--spectrum-display-han-1-text-letter-spacing,.05em);text-transform:var(--spectrum-display-han-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display em,.spectrum:lang(ko) .spectrum-Heading1--display em,.spectrum:lang(zh) .spectrum-Heading1--display em{font-size:var(--spectrum-display-han-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-han-1-emphasis-text-font-weight,800);line-height:var(--spectrum-display-han-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-display-han-1-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-display-han-1-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-display-han-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display strong,.spectrum:lang(ko) .spectrum-Heading1--display strong,.spectrum:lang(zh) .spectrum-Heading1--display strong{font-size:var(--spectrum-display-han-1-strong-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-han-1-strong-text-font-weight,900);line-height:var(--spectrum-display-han-1-strong-text-line-height,1.5);font-style:var(--spectrum-display-han-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-han-1-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-display-han-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display,.spectrum:lang(ko) .spectrum-Heading2--display,.spectrum:lang(zh) .spectrum-Heading2--display{font-size:var(--spectrum-display-han-2-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-han-2-text-font-weight,700);line-height:var(--spectrum-display-han-2-text-line-height,1.5);font-style:var(--spectrum-display-han-2-text-font-style,normal);letter-spacing:var(--spectrum-display-han-2-text-letter-spacing,.05em);text-transform:var(--spectrum-display-han-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display em,.spectrum:lang(ko) .spectrum-Heading2--display em,.spectrum:lang(zh) .spectrum-Heading2--display em{font-size:var(--spectrum-display-han-2-emphasis-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-han-2-emphasis-text-font-weight,800);line-height:var(--spectrum-display-han-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-display-han-2-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-display-han-2-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-display-han-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display strong,.spectrum:lang(ko) .spectrum-Heading2--display strong,.spectrum:lang(zh) .spectrum-Heading2--display strong{font-size:var(--spectrum-display-han-2-strong-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-han-2-strong-text-font-weight,900);line-height:var(--spectrum-display-han-2-strong-text-line-height,1.5);font-style:var(--spectrum-display-han-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-han-2-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-display-han-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--strong,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--strong,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--strong{font-size:var(--spectrum-display-strong-han-1-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-strong-han-1-text-font-weight,900);line-height:var(--spectrum-display-strong-han-1-text-line-height,1.5);font-style:var(--spectrum-display-strong-han-1-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-han-1-text-letter-spacing,.05em);text-transform:var(--spectrum-display-strong-han-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--strong em,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--strong em,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--strong em{font-size:var(--spectrum-display-strong-han-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-strong-han-1-emphasis-text-font-weight,900);line-height:var(--spectrum-display-strong-han-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-display-strong-han-1-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-han-1-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-display-strong-han-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--strong strong,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--strong strong,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--strong strong{font-size:var(--spectrum-display-strong-han-1-strong-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-strong-han-1-strong-text-font-weight,900);line-height:var(--spectrum-display-strong-han-1-strong-text-line-height,1.5);font-style:var(--spectrum-display-strong-han-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-han-1-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-display-strong-han-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--strong,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--strong,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--strong{font-size:var(--spectrum-display-strong-han-2-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-strong-han-2-text-font-weight,900);line-height:var(--spectrum-display-strong-han-2-text-line-height,1.5);font-style:var(--spectrum-display-strong-han-2-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-han-2-text-letter-spacing,.05em);text-transform:var(--spectrum-display-strong-han-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--strong em,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--strong em,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--strong em{font-size:var(--spectrum-display-strong-han-2-emphasis-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-strong-han-2-emphasis-text-font-weight,900);line-height:var(--spectrum-display-strong-han-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-display-strong-han-2-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-han-2-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-display-strong-han-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--strong strong,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--strong strong,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--strong strong{font-size:var(--spectrum-display-strong-han-2-strong-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-strong-han-2-strong-text-font-weight,900);line-height:var(--spectrum-display-strong-han-2-strong-text-line-height,1.5);font-style:var(--spectrum-display-strong-han-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-strong-han-2-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-display-strong-han-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--quiet,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--quiet,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--quiet{font-size:var(--spectrum-display-quiet-han-1-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-quiet-han-1-text-font-weight,300);line-height:var(--spectrum-display-quiet-han-1-text-line-height,1.5);font-style:var(--spectrum-display-quiet-han-1-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-han-1-text-letter-spacing,.05em);text-transform:var(--spectrum-display-quiet-han-1-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--quiet em,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--quiet em,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--quiet em{font-size:var(--spectrum-display-quiet-han-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-quiet-han-1-emphasis-text-font-weight,400);line-height:var(--spectrum-display-quiet-han-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-display-quiet-han-1-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-han-1-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-display-quiet-han-1-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--quiet strong,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--quiet strong,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--quiet strong{font-size:var(--spectrum-display-quiet-han-1-strong-text-size,var(--spectrum-global-dimension-font-size-1000));font-weight:var(--spectrum-display-quiet-han-1-strong-text-font-weight,700);line-height:var(--spectrum-display-quiet-han-1-strong-text-line-height,1.5);font-style:var(--spectrum-display-quiet-han-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-han-1-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-display-quiet-han-1-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum:lang(ja) .spectrum-Heading--display,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum:lang(ko) .spectrum-Heading--display,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum:lang(zh) .spectrum-Heading--display{font-size:var(--spectrum-display-quiet-han-2-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-quiet-han-2-text-font-weight,300);line-height:var(--spectrum-display-quiet-han-2-text-line-height,1.5);font-style:var(--spectrum-display-quiet-han-2-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-han-2-text-letter-spacing,.05em);text-transform:var(--spectrum-display-quiet-han-2-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--quiet em,.spectrum:lang(ja) .spectrum-Heading--display em,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--quiet em,.spectrum:lang(ko) .spectrum-Heading--display em,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--quiet em,.spectrum:lang(zh) .spectrum-Heading--display em{font-size:var(--spectrum-display-quiet-han-2-emphasis-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-quiet-han-2-emphasis-text-font-weight,400);line-height:var(--spectrum-display-quiet-han-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-display-quiet-han-2-emphasis-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-han-2-emphasis-text-letter-spacing,.05em);text-transform:var(--spectrum-display-quiet-han-2-emphasis-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--quiet strong,.spectrum:lang(ja) .spectrum-Heading--display strong,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--quiet strong,.spectrum:lang(ko) .spectrum-Heading--display strong,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--quiet strong,.spectrum:lang(zh) .spectrum-Heading--display strong{font-size:var(--spectrum-display-quiet-han-2-strong-text-size,var(--spectrum-global-dimension-font-size-900));font-weight:var(--spectrum-display-quiet-han-2-strong-text-font-weight,700);line-height:var(--spectrum-display-quiet-han-2-strong-text-line-height,1.5);font-style:var(--spectrum-display-quiet-han-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-display-quiet-han-2-strong-text-letter-spacing,.05em);text-transform:var(--spectrum-display-quiet-han-2-strong-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Code1{font-size:var(--spectrum-body-code-1-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-code-1-text-font-weight,400);line-height:var(--spectrum-body-code-1-text-line-height,1.5);font-style:var(--spectrum-body-code-1-text-font-style,normal);letter-spacing:var(--spectrum-body-code-1-text-letter-spacing,0);margin-top:0;margin-bottom:0;font-family:var(--spectrum-body-code-1-text-font-family,"Source Code Pro",Monaco,monospace)}.spectrum-Code1 em{font-size:var(--spectrum-body-code-1-emphasis-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-code-1-emphasis-text-font-weight,400);line-height:var(--spectrum-body-code-1-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-code-1-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-code-1-emphasis-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code1 strong{font-size:var(--spectrum-body-code-1-strong-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-code-1-strong-text-font-weight,700);line-height:var(--spectrum-body-code-1-strong-text-line-height,1.5);font-style:var(--spectrum-body-code-1-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-code-1-strong-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code2{font-size:var(--spectrum-body-code-2-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-code-2-text-font-weight,400);line-height:var(--spectrum-body-code-2-text-line-height,1.5);font-style:var(--spectrum-body-code-2-text-font-style,normal);letter-spacing:var(--spectrum-body-code-2-text-letter-spacing,0);margin-top:0;margin-bottom:0;font-family:var(--spectrum-body-code-2-text-font-family,"Source Code Pro",Monaco,monospace)}.spectrum-Code2 em{font-size:var(--spectrum-body-code-2-emphasis-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-code-2-emphasis-text-font-weight,400);line-height:var(--spectrum-body-code-2-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-code-2-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-code-2-emphasis-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code2 strong{font-size:var(--spectrum-body-code-2-strong-text-size,var(--spectrum-global-dimension-size-225));font-weight:var(--spectrum-body-code-2-strong-text-font-weight,700);line-height:var(--spectrum-body-code-2-strong-text-line-height,1.5);font-style:var(--spectrum-body-code-2-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-code-2-strong-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code3{font-size:var(--spectrum-body-code-3-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-code-3-text-font-weight,400);line-height:var(--spectrum-body-code-3-text-line-height,1.5);font-style:var(--spectrum-body-code-3-text-font-style,normal);letter-spacing:var(--spectrum-body-code-3-text-letter-spacing,0);margin-top:0;margin-bottom:0;font-family:var(--spectrum-body-code-3-text-font-family,"Source Code Pro",Monaco,monospace)}.spectrum-Code3 em{font-size:var(--spectrum-body-code-3-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-code-3-emphasis-text-font-weight,400);line-height:var(--spectrum-body-code-3-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-code-3-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-code-3-emphasis-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code3 strong{font-size:var(--spectrum-body-code-3-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-code-3-strong-text-font-weight,700);line-height:var(--spectrum-body-code-3-strong-text-line-height,1.5);font-style:var(--spectrum-body-code-3-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-code-3-strong-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code4{font-size:var(--spectrum-body-code-4-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-code-4-text-font-weight,400);line-height:var(--spectrum-body-code-4-text-line-height,1.5);font-style:var(--spectrum-body-code-4-text-font-style,normal);letter-spacing:var(--spectrum-body-code-4-text-letter-spacing,0);margin-top:0;margin-bottom:0;font-family:var(--spectrum-body-code-4-text-font-family,"Source Code Pro",Monaco,monospace)}.spectrum-Code4 em{font-size:var(--spectrum-body-code-4-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-code-4-emphasis-text-font-weight,400);line-height:var(--spectrum-body-code-4-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-code-4-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-code-4-emphasis-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code4 strong{font-size:var(--spectrum-body-code-4-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-code-4-strong-text-font-weight,700);line-height:var(--spectrum-body-code-4-strong-text-line-height,1.5);font-style:var(--spectrum-body-code-4-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-code-4-strong-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code5{font-size:var(--spectrum-body-code-5-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-code-5-text-font-weight,400);line-height:var(--spectrum-body-code-5-text-line-height,1.5);font-style:var(--spectrum-body-code-5-text-font-style,normal);letter-spacing:var(--spectrum-body-code-5-text-letter-spacing,0);margin-top:0;margin-bottom:0;font-family:var(--spectrum-body-code-5-text-font-family,"Source Code Pro",Monaco,monospace)}.spectrum-Code5 em{font-size:var(--spectrum-body-code-5-emphasis-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-code-5-emphasis-text-font-weight,400);line-height:var(--spectrum-body-code-5-emphasis-text-line-height,1.5);font-style:var(--spectrum-body-code-5-emphasis-text-font-style,italic);letter-spacing:var(--spectrum-body-code-5-emphasis-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum-Code5 strong{font-size:var(--spectrum-body-code-5-strong-text-size,var(--spectrum-global-dimension-size-150));font-weight:var(--spectrum-body-code-5-strong-text-font-weight,700);line-height:var(--spectrum-body-code-5-strong-text-line-height,1.5);font-style:var(--spectrum-body-code-5-strong-text-font-style,normal);letter-spacing:var(--spectrum-body-code-5-strong-text-letter-spacing,0);margin-top:0;margin-bottom:0}.spectrum,.spectrum-Body,.spectrum.spectrum-Body{font-size:var(--spectrum-body-4-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-body-4-text-font-weight,400);line-height:var(--spectrum-body-4-text-line-height,1.5);font-style:var(--spectrum-body-4-text-font-style,normal)}.spectrum-Body--italic{font-style:var(--spectrum-body-4-emphasis-text-font-style,italic)}.spectrum-Body1{color:var(--spectrum-body-1-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Body2,.spectrum-Body--large{color:var(--spectrum-body-2-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Body3{color:var(--spectrum-body-3-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Body4,.spectrum-Body--secondary{color:var(--spectrum-body-4-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Body5,.spectrum-Body--small{color:var(--spectrum-body-5-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Heading1{color:var(--spectrum-heading-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading2{color:var(--spectrum-heading-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading3{color:var(--spectrum-heading-3-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading4,.spectrum-Heading--subtitle1{color:var(--spectrum-heading-4-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading5{color:var(--spectrum-heading-5-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading6,.spectrum-Heading--subtitle2{color:var(--spectrum-heading-6-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading--subtitle3,.spectrum-Subheading{color:var(--spectrum-subheading-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Detail{color:var(--spectrum-detail-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Heading1--quiet{color:var(--spectrum-heading-quiet-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading2--quiet,.spectrum-Heading--pageTitle{color:var(--spectrum-heading-quiet-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading1--strong{color:var(--spectrum-heading-strong-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading2--strong{color:var(--spectrum-heading-strong-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading1--display{color:var(--spectrum-display-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading2--display{color:var(--spectrum-display-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading1--display.spectrum-Heading1--strong{color:var(--spectrum-display-strong-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading2--display.spectrum-Heading2--strong{color:var(--spectrum-display-strong-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading1--display.spectrum-Heading1--quiet{color:var(--spectrum-display-quiet-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum-Heading--display{color:var(--spectrum-display-quiet-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Body1{color:var(--spectrum-body-article-1-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Article .spectrum-Body2,.spectrum-Article .spectrum-Body--large{color:var(--spectrum-body-article-2-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Article .spectrum-Body3{color:var(--spectrum-body-article-3-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Article .spectrum-Body4,.spectrum-Article .spectrum-Body--secondary{color:var(--spectrum-body-article-4-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Article .spectrum-Body5,.spectrum-Article .spectrum-Body--small{color:var(--spectrum-body-article-5-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Article .spectrum-Heading1{color:var(--spectrum-heading-article-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading2{color:var(--spectrum-heading-article-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading3{color:var(--spectrum-heading-article-3-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading4,.spectrum-Article .spectrum-Heading--subtitle1{color:var(--spectrum-heading-article-4-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading5{color:var(--spectrum-heading-article-5-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading6,.spectrum-Article .spectrum-Heading--subtitle2{color:var(--spectrum-heading-article-6-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading--subtitle3,.spectrum-Article .spectrum-Subheading{color:var(--spectrum-subheading-article-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Detail{color:var(--spectrum-detail-article-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Article .spectrum-Heading1--quiet{color:var(--spectrum-heading-quiet-article-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading2--quiet,.spectrum-Article .spectrum-Heading--pageTitle{color:var(--spectrum-heading-quiet-article-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading1--display{color:var(--spectrum-display-article-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading2--display{color:var(--spectrum-display-article-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading1--display.spectrum-Heading1--quiet{color:var(--spectrum-display-quiet-article-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Article .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum-Article .spectrum-Heading--display{color:var(--spectrum-display-quiet-article-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Body1,.spectrum:lang(ko) .spectrum-Body1,.spectrum:lang(zh) .spectrum-Body1{color:var(--spectrum-body-han-1-text-color,var(--spectrum-global-color-gray-800))}.spectrum:lang(ja) .spectrum-Body2,.spectrum:lang(ja) .spectrum-Body--large,.spectrum:lang(ko) .spectrum-Body2,.spectrum:lang(ko) .spectrum-Body--large,.spectrum:lang(zh) .spectrum-Body2,.spectrum:lang(zh) .spectrum-Body--large{color:var(--spectrum-body-han-2-text-color,var(--spectrum-global-color-gray-800))}.spectrum:lang(ja) .spectrum-Body3,.spectrum:lang(ko) .spectrum-Body3,.spectrum:lang(zh) .spectrum-Body3{color:var(--spectrum-body-han-3-text-color,var(--spectrum-global-color-gray-800))}.spectrum:lang(ja) .spectrum-Body4,.spectrum:lang(ja) .spectrum-Body--secondary,.spectrum:lang(ko) .spectrum-Body4,.spectrum:lang(ko) .spectrum-Body--secondary,.spectrum:lang(zh) .spectrum-Body4,.spectrum:lang(zh) .spectrum-Body--secondary{color:var(--spectrum-body-han-4-text-color,var(--spectrum-global-color-gray-800))}.spectrum:lang(ja) .spectrum-Body5,.spectrum:lang(ja) .spectrum-Body--small,.spectrum:lang(ko) .spectrum-Body5,.spectrum:lang(ko) .spectrum-Body--small,.spectrum:lang(zh) .spectrum-Body5,.spectrum:lang(zh) .spectrum-Body--small{color:var(--spectrum-body-han-5-text-color,var(--spectrum-global-color-gray-800))}.spectrum:lang(ja) .spectrum-Heading1,.spectrum:lang(ko) .spectrum-Heading1,.spectrum:lang(zh) .spectrum-Heading1{color:var(--spectrum-heading-han-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading2,.spectrum:lang(ko) .spectrum-Heading2,.spectrum:lang(zh) .spectrum-Heading2{color:var(--spectrum-heading-han-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading3,.spectrum:lang(ko) .spectrum-Heading3,.spectrum:lang(zh) .spectrum-Heading3{color:var(--spectrum-heading-han-3-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading4,.spectrum:lang(ja) .spectrum-Heading--subtitle1,.spectrum:lang(ko) .spectrum-Heading4,.spectrum:lang(ko) .spectrum-Heading--subtitle1,.spectrum:lang(zh) .spectrum-Heading4,.spectrum:lang(zh) .spectrum-Heading--subtitle1{color:var(--spectrum-heading-han-4-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading5,.spectrum:lang(ko) .spectrum-Heading5,.spectrum:lang(zh) .spectrum-Heading5{color:var(--spectrum-heading-han-5-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading6,.spectrum:lang(ja) .spectrum-Heading--subtitle2,.spectrum:lang(ko) .spectrum-Heading6,.spectrum:lang(ko) .spectrum-Heading--subtitle2,.spectrum:lang(zh) .spectrum-Heading6,.spectrum:lang(zh) .spectrum-Heading--subtitle2{color:var(--spectrum-heading-han-6-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading--subtitle3,.spectrum:lang(ja) .spectrum-Subheading,.spectrum:lang(ko) .spectrum-Heading--subtitle3,.spectrum:lang(ko) .spectrum-Subheading,.spectrum:lang(zh) .spectrum-Heading--subtitle3,.spectrum:lang(zh) .spectrum-Subheading{color:var(--spectrum-subheading-han-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Detail,.spectrum:lang(ko) .spectrum-Detail,.spectrum:lang(zh) .spectrum-Detail{color:var(--spectrum-detail-han-text-color,var(--spectrum-global-color-gray-800))}.spectrum:lang(ja) .spectrum-Heading1--quiet,.spectrum:lang(ko) .spectrum-Heading1--quiet,.spectrum:lang(zh) .spectrum-Heading1--quiet{color:var(--spectrum-heading-quiet-han-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading2--quiet,.spectrum:lang(ja) .spectrum-Heading--pageTitle,.spectrum:lang(ko) .spectrum-Heading2--quiet,.spectrum:lang(ko) .spectrum-Heading--pageTitle,.spectrum:lang(zh) .spectrum-Heading2--quiet,.spectrum:lang(zh) .spectrum-Heading--pageTitle{color:var(--spectrum-heading-quiet-han-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading1--strong,.spectrum:lang(ko) .spectrum-Heading1--strong,.spectrum:lang(zh) .spectrum-Heading1--strong{color:var(--spectrum-heading-strong-han-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading2--strong,.spectrum:lang(ko) .spectrum-Heading2--strong,.spectrum:lang(zh) .spectrum-Heading2--strong{color:var(--spectrum-heading-strong-han-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading1--display,.spectrum:lang(ko) .spectrum-Heading1--display,.spectrum:lang(zh) .spectrum-Heading1--display{color:var(--spectrum-display-han-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading2--display,.spectrum:lang(ko) .spectrum-Heading2--display,.spectrum:lang(zh) .spectrum-Heading2--display{color:var(--spectrum-display-han-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--strong,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--strong,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--strong{color:var(--spectrum-display-strong-han-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--strong,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--strong,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--strong{color:var(--spectrum-display-strong-han-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading1--display.spectrum-Heading1--quiet,.spectrum:lang(ko) .spectrum-Heading1--display.spectrum-Heading1--quiet,.spectrum:lang(zh) .spectrum-Heading1--display.spectrum-Heading1--quiet{color:var(--spectrum-display-quiet-han-1-text-color,var(--spectrum-global-color-gray-900))}.spectrum:lang(ja) .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum:lang(ja) .spectrum-Heading--display,.spectrum:lang(ko) .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum:lang(ko) .spectrum-Heading--display,.spectrum:lang(zh) .spectrum-Heading2--display.spectrum-Heading2--quiet,.spectrum:lang(zh) .spectrum-Heading--display{color:var(--spectrum-display-quiet-han-2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Code1{color:var(--spectrum-body-code-1-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Code2{color:var(--spectrum-body-code-2-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Code3{color:var(--spectrum-body-code-3-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Code4{color:var(--spectrum-body-code-4-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Code5{color:var(--spectrum-body-code-5-text-color,var(--spectrum-global-color-gray-800))}.spectrum,.spectrum-Body{color:var(--spectrum-body-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Body--large{color:var(--spectrum-body-large-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Body--small{color:var(--spectrum-body-small-text-color,var(--spectrum-global-color-gray-800))}.spectrum-Body--secondary{color:var(--spectrum-body-secondary-text-color,var(--spectrum-global-color-gray-700))}.spectrum-Heading--display{color:var(--spectrum-heading-display-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading--pageTitle{color:var(--spectrum-heading-page-title-text-color,var(--spectrum-global-color-gray-700))}.spectrum-Heading--subtitle1{color:var(--spectrum-heading-subtitle1-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading--subtitle2{color:var(--spectrum-heading-subtitle2-text-color,var(--spectrum-global-color-gray-900))}.spectrum-Heading--subtitle3{color:var(--spectrum-heading-subtitle3-text-color,var(--spectrum-global-color-gray-700))}.spectrum-Rule{width:100%;overflow:visible;border:none;border-width:var(--spectrum-rule-medium-height,2px);border-radius:var(--spectrum-rule-medium-height,2px)}.spectrum-Rule--large{height:var(--spectrum-rule-large-height,4px);border-radius:var(--spectrum-rule-large-border-radius,2px)}.spectrum-Rule--medium{height:var(--spectrum-rule-medium-height,2px);border-radius:var(--spectrum-rule-medium-border-radius,1px)}.spectrum-Rule--small{height:var(--spectrum-rule-small-height,1px);border-radius:var(--spectrum-rule-small-border-radius,1px)}.spectrum-Rule--vertical{height:100%}.spectrum-Rule--vertical.spectrum-Rule--large{width:var(--spectrum-rule-large-height,4px)}.spectrum-Rule--vertical.spectrum-Rule--medium{width:var(--spectrum-rule-medium-height,2px)}.spectrum-Rule--vertical.spectrum-Rule--small{width:var(--spectrum-rule-small-height,1px)}.spectrum-Rule--large{background-color:var(--spectrum-rule-large-background-color,var(--spectrum-global-color-gray-800))}.spectrum-Rule--medium{background-color:var(--spectrum-rule-medium-background-color,var(--spectrum-global-color-gray-300))}.spectrum-Rule--small{background-color:var(--spectrum-rule-small-background-color,var(--spectrum-global-color-gray-300))}.spectrum-Link{background-color:initial;-webkit-text-decoration-skip:objects;text-decoration:none;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;outline:none}.spectrum-Link:hover{text-decoration:underline}.spectrum-Link.focus-ring{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}.spectrum-Link.is-disabled{cursor:default;pointer-events:none}.spectrum-Link.is-disabled:focus,.spectrum-Link.is-disabled:hover{text-decoration:none}.spectrum-Link--overBackground,.spectrum-Link--quiet,.spectrum-Link--subtle{text-decoration:underline}.spectrum-Link{color:var(--spectrum-link-text-color,var(--spectrum-global-color-blue-600))}.spectrum-Link:hover{color:var(--spectrum-link-text-color-hover,var(--spectrum-global-color-blue-600))}.spectrum-Link:active{color:var(--spectrum-link-text-color-down,var(--spectrum-global-color-blue-700))}.spectrum-Link.focus-ring{color:var(--spectrum-link-text-color-key-focus,var(--spectrum-global-color-blue-600))}.spectrum-Link.is-disabled{color:var(--spectrum-link-text-color-disabled,var(--spectrum-global-color-gray-500))}.spectrum-Link--quiet,.spectrum-Link--quiet:active,.spectrum-Link--quiet:focus,.spectrum-Link--quiet:hover,.spectrum-Link--subtle,.spectrum-Link--subtle:active,.spectrum-Link--subtle:focus,.spectrum-Link--subtle:hover{color:inherit}.spectrum-Link--overBackground{color:var(--spectrum-link-over-background-text-color,#fff)}.spectrum-Link--overBackground:hover{color:var(--spectrum-link-over-background-text-color-hover,#fff)}.spectrum-Link--overBackground:active{color:var(--spectrum-link-over-background-text-color-down,#fff)}.spectrum-Link--overBackground:focus{color:var(--spectrum-link-over-background-text-color-key-focus,#fff)}.spectrum-Link--overBackground.is-disabled{color:var(--spectrum-link-over-background-text-color-disabled,hsla(0,0%,100%,.5))}.spectrum-Table{border-collapse:initial;border-spacing:0}.spectrum-Table-sortedIcon{display:none;margin-left:var(--spectrum-table-header-sort-icon-gap,var(--spectrum-global-dimension-size-125));vertical-align:middle;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.spectrum-Table-headCell{box-sizing:border-box;text-align:left;font-size:var(--spectrum-table-header-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-table-header-text-font-weight,700);line-height:var(--spectrum-table-header-text-line-height,1.3);min-height:var(--spectrum-table-header-min-height,var(--spectrum-global-dimension-size-150));letter-spacing:var(--spectrum-table-header-text-letter-spacing,.06em);text-transform:uppercase;padding:var(--spectrum-table-header-padding-y,10px) var(--spectrum-table-header-padding-x,var(--spectrum-global-dimension-size-200));transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;cursor:default;outline:0;border-radius:var(--spectrum-table-header-border-radius,0)}.spectrum-Table-headCell.is-sortable{cursor:pointer}.spectrum-Table-headCell.is-sorted-asc .spectrum-Table-sortedIcon,.spectrum-Table-headCell.is-sorted-desc .spectrum-Table-sortedIcon{display:inline-block;margin-top:calc(var(--spectrum-global-dimension-size-25, 2px)*-1)}.spectrum-Table-headCell.is-sorted-asc .spectrum-Table-sortedIcon{transform:rotate(180deg)}.spectrum-Table-cell--alignCenter{text-align:center}.spectrum-Table-cell--alignRight{text-align:right}.spectrum-Table-body.is-drop-target:before,.spectrum-Table-row.is-drop-target:before{content:"";position:absolute;top:0;left:0;bottom:0;right:0;z-index:1}.spectrum-Table-body{position:relative;overflow:auto;vertical-align:var(--spectrum-table-cell-vertical-alignment,top)}.spectrum-Table-body,.spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body{border-width:var(--spectrum-table-border-size,1px);border-radius:var(--spectrum-table-border-radius,var(--spectrum-global-dimension-size-50))}.spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-left-radius:var(--spectrum-table-border-radius,var(--spectrum-global-dimension-size-50))}.spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-right-radius:var(--spectrum-table-border-radius,var(--spectrum-global-dimension-size-50))}.spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-left-radius:var(--spectrum-table-border-radius,var(--spectrum-global-dimension-size-50))}.spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-right-radius:var(--spectrum-table-border-radius,var(--spectrum-global-dimension-size-50))}.spectrum-Table-cell{box-sizing:border-box;font-size:var(--spectrum-table-cell-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-table-cell-text-font-weight,400);line-height:var(--spectrum-table-cell-text-line-height,1.5);padding:var(--spectrum-table-cell-padding-y,var(--spectrum-global-dimension-size-175)) var(--spectrum-table-cell-padding-x,var(--spectrum-global-dimension-size-200));min-height:calc(var(--spectrum-table-cell-min-height, var(--spectrum-global-dimension-size-600)) - var(--spectrum-table-cell-padding-y, var(--spectrum-global-dimension-size-175))*2)}.spectrum-Table-cell,.spectrum-Table-headCell{position:relative}.spectrum-Table-cell.focus-ring,.spectrum-Table-cell.is-focused,.spectrum-Table-headCell.focus-ring,.spectrum-Table-headCell.is-focused{outline:none}.spectrum-Table-cell.focus-ring:before,.spectrum-Table-cell.is-focused:before,.spectrum-Table-headCell.focus-ring:before,.spectrum-Table-headCell.is-focused:before{content:"";z-index:1;position:absolute;top:0;right:0;bottom:0;left:0;border-radius:calc(var(--spectrum-table-cell-border-radius-key-focus, var(--spectrum-global-dimension-size-50)) - 1px)}.spectrum-Table-headCell.focus-ring:before,.spectrum-Table-headCell.is-focused:before{top:var(--spectrum-table-border-size,1px);right:var(--spectrum-table-border-size,1px);bottom:var(--spectrum-table-border-size,1px);left:var(--spectrum-table-border-size,1px)}.spectrum-Table-cell--divider{border-right-width:var(--spectrum-table-divider-border-size,1px)}.spectrum-Table-row{position:relative;cursor:pointer;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.spectrum-Table-row:focus{outline:0}.spectrum-Table>.spectrum-Table-body>.spectrum-Table-row:last-of-type{border-bottom-style:none}.spectrum-Table--quiet .spectrum-Table-body{border-radius:var(--spectrum-table-quiet-border-radius,0)}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before,.spectrum-Table--quiet .spectrum-Table-row.is-drop-target:before{border-radius:var(--spectrum-global-dimension-size-50)}.spectrum-Table-checkboxCell{padding-right:var(--spectrum-table-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100));padding-top:0;padding-bottom:0;vertical-align:var(--spectrum-table-cell-checkbox-vertical-alignment,middle)}.spectrum-Table-checkbox{vertical-align:super}.spectrum-Table-headCell{color:var(--spectrum-table-header-text-color,var(--spectrum-global-color-gray-700));background-color:var(--spectrum-table-header-background-color,transparent)}.spectrum-Table-headCell.is-sortable .spectrum-Table-sortedIcon{color:var(--spectrum-table-header-sort-icon-color,var(--spectrum-global-color-gray-600))}.spectrum-Table-headCell.is-sortable:hover{color:var(--spectrum-table-header-text-color-hover,var(--spectrum-global-color-gray-900))}.spectrum-Table-headCell.is-sortable:hover .spectrum-Table-sortedIcon{color:var(--spectrum-table-header-sort-icon-color-hover,var(--spectrum-global-color-gray-900))}.spectrum-Table-headCell.is-sortable.focus-ring,.spectrum-Table-headCell.is-sortable.is-focused{color:var(--spectrum-table-header-text-color-key-focus,var(--spectrum-global-color-gray-900))}.spectrum-Table-headCell.is-sortable.focus-ring .spectrum-Table-sortedIcon,.spectrum-Table-headCell.is-sortable.is-focused .spectrum-Table-sortedIcon{color:var(--spectrum-table-header-sort-icon-color-key-focus,var(--spectrum-global-color-gray-900))}.spectrum-Table-headCell.is-sortable:active{color:var(--spectrum-table-header-text-color-down,var(--spectrum-global-color-gray-900))}.spectrum-Table-headCell.is-sortable:active .spectrum-Table-sortedIcon{color:var(--spectrum-table-header-sort-icon-color-down,var(--spectrum-global-color-gray-900))}.spectrum-Table-body.is-drop-target,.spectrum-Table-row.is-drop-target{border-color:var(--spectrum-alias-border-color-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 1px var(--spectrum-alias-border-color-focus,var(--spectrum-global-color-blue-400))}.spectrum-Table-body.is-drop-target:before,.spectrum-Table-row.is-drop-target:before{background-color:var(--spectrum-alias-highlight-selected)}.spectrum-Table-cell.focus-ring:before,.spectrum-Table-cell.is-focused:before,.spectrum-Table-headCell.focus-ring:before,.spectrum-Table-headCell.is-focused:before{box-shadow:inset 0 0 0 2px var(--spectrum-table-cell-border-color-key-focus,var(--spectrum-global-color-blue-400))}.spectrum-Table-body{border-style:solid;border-color:var(--spectrum-table-border-color,var(--spectrum-global-color-gray-300));background-color:var(--spectrum-table-background-color,var(--spectrum-global-color-gray-50))}.spectrum-Table-body.is-drop-target{border-color:var(--spectrum-alias-border-color-focus,var(--spectrum-global-color-blue-400));box-shadow:0 0 0 1px var(--spectrum-alias-border-color-focus,var(--spectrum-global-color-blue-400))}.spectrum-Table-body.is-drop-target:before{background-color:var(--spectrum-alias-highlight-selected)}tbody.spectrum-Table-body{border:none}tbody.spectrum-Table-body .spectrum-Table-row{border-top:none}tbody.spectrum-Table-body .spectrum-Table-cell{border-top:1px solid var(--spectrum-table-cell-border-color,var(--spectrum-global-color-gray-300))}tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child{border-left:1px solid var(--spectrum-table-cell-border-color,var(--spectrum-global-color-gray-300))}tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-right:1px solid var(--spectrum-table-cell-border-color,var(--spectrum-global-color-gray-300))}.spectrum-Table-row,tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell{border-bottom:1px solid var(--spectrum-table-cell-border-color,var(--spectrum-global-color-gray-300))}.spectrum-Table-row{background-color:var(--spectrum-table-row-background-color,transparent)}.spectrum-Table-row.focus-ring,.spectrum-Table-row.is-focused,.spectrum-Table-row:hover{background-color:var(--spectrum-table-row-background-color-hover,var(--spectrum-alias-highlight-hover))}.spectrum-Table-row:active{background-color:var(--spectrum-table-row-background-color-down,var(--spectrum-alias-highlight-active))}.spectrum-Table-row.is-selected{background-color:var(--spectrum-table-row-background-color-selected,var(--spectrum-alias-highlight-selected))}.spectrum-Table-row.is-selected:hover{background-color:var(--spectrum-table-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover))}.spectrum-Table-row.is-selected.focus-ring,.spectrum-Table-row.is-selected.is-focused{background-color:var(--spectrum-table-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover))}.spectrum-Table-row.is-drop-target:before{box-shadow:inset 0 0 0 2px var(--spectrum-alias-border-color-focus,var(--spectrum-global-color-blue-400));background-color:var(--spectrum-alias-highlight-selected)}.spectrum-Table-cell{color:var(--spectrum-table-cell-text-color,var(--spectrum-global-color-gray-800));background-color:var(--spectrum-table-cell-background-color,transparent)}.spectrum-Table-cell--divider{border-right-style:solid;border-right-color:var(--spectrum-table-divider-border-color,var(--spectrum-global-color-gray-300))}.spectrum-Table--quiet .spectrum-Table-body{border-width:1px 0;background-color:var(--spectrum-table-quiet-cell-background-color,transparent)}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target{box-shadow:none;border-color:transparent}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before{box-shadow:inset 0 0 0 2px var(--spectrum-alias-border-color-focus,var(--spectrum-global-color-blue-400))}.spectrum-Table--quiet .spectrum-Table-row{background-color:var(--spectrum-table-quiet-row-background-color,transparent)}.spectrum-Table--quiet .spectrum-Table-row.focus-ring,.spectrum-Table--quiet .spectrum-Table-row.is-focused,.spectrum-Table--quiet .spectrum-Table-row:hover{background-color:var(--spectrum-table-quiet-row-background-color-hover,var(--spectrum-alias-highlight-hover))}.spectrum-Table--quiet .spectrum-Table-row:active{background-color:var(--spectrum-table-quiet-row-background-color-down,var(--spectrum-alias-highlight-active))}.spectrum-Table--quiet .spectrum-Table-row.is-selected{background-color:var(--spectrum-table-quiet-row-background-color-selected,var(--spectrum-alias-highlight-selected))}.spectrum-Table--quiet .spectrum-Table-row.is-selected:hover{background-color:var(--spectrum-table-quiet-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover))}.spectrum-Table--quiet .spectrum-Table-row.is-selected.focus-ring,.spectrum-Table--quiet .spectrum-Table-row.is-selected.is-focused{background-color:var(--spectrum-table-quiet-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover))}.spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,.spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-left:none;border-right:none}#title-header{margin-bottom:2rem}.spectrum-Body4 code{color:var(--spectrum-global-color-blue-700)}.spectrum-Article .spectrum-Heading1{margin-bottom:28px}hr.spectrum-Rule{margin-bottom:33px}article{margin-bottom:3em}
`;
/* harmony default export */ var markdown = (markdown_styles);
// CONCATENATED MODULE: ./documentation/src/components/home.css

const home_styles = lit_element["b" /* css */]`
#hero{margin-bottom:3em}#hero .spectrum-Article{text-align:center;padding-bottom:2em}#hero-buttons{margin-top:1em;text-align:center}#features{display:flex;flex-direction:row}.feature{flex:1 1 33%;padding:0 20px 20px;box-sizing:border-box}.feature:first-of-type{padding-left:0}.feature:last-of-type{padding-right:0}#example{margin-top:2em}code-example{max-width:500px}
`;
/* harmony default export */ var home = (home_styles);
// CONCATENATED MODULE: ./documentation/src/components/home.ts





class home_HomeElement extends layout_LayoutElement {
  static get styles() {
    return [super.styles, markdown, home];
  }

  renderContent() {
    return lit_element["d" /* html */]`
            <section id="hero">
                <div class="spectrum-Article">
                    <docs-spectrum-logo size="128px"></docs-spectrum-logo>
                    <h1 class="spectrum-Heading1--display">
                        Spectrum Web Components
                    </h1>
                </div>
                <p class="spectrum-Body3">
                    The Spectrum Web Components project is an implementation of
                    Adobe's Spectrum design language that is designed to work
                    with any web framework, or even without one.
                </p>
                <div id="hero-buttons">
                    <sp-button
                        href="https://github.com/adobe/spectrum-web-components"
                        variant="secondary"
                    >
                        Github
                    </sp-button>
                </div>
            </section>
            <hr class="spectrum-Rule spectrum-Rule--large" />
            <section id="features">
                <div class="feature">
                    <p class="spectrum-Heading spectrum-Heading--pageTitle">
                        Standards Based
                    </p>
                    <p class="spectrum-Body3">
                        <a
                            class="spectrum-Link"
                            href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                        >
                            Web Components
                        </a>
                        are set of technologies that work together to allow you
                        create custom elements that work just like the standard
                        HTML elements that are built into your browser.
                    </p>
                </div>
                <div class="feature">
                    <p class="spectrum-Heading spectrum-Heading--pageTitle">
                        Light Weight
                    </p>
                    <p class="spectrum-Body3">
                        The Spectrum Web Components are implemented using the
                        <a
                            class="spectrum-Link"
                            href="https://lit-element.polymer-project.org/"
                        >
                            LitElement
                        </a>
                        framework. LitElement is designed for creating Web
                        Components with a minimum amount of overhead.
                    </p>
                </div>
                <div class="feature">
                    <p class="spectrum-Heading spectrum-Heading--pageTitle">
                        Framework Agnostic
                    </p>
                    <p class="spectrum-Body3">
                        Because Web Components are supported and encapsulated at
                        the browser level, you can use them from any framework
                        without.
                    </p>
                </div>
            </section>
            <section id="example">
                <p class="spectrum-Heading spectrum-Heading--pageTitle">
                    Example
                </p>
                <code-example class="language-html">
                    &lt;sp-button variant='cta'&gt;Click Here&lt;/sp-button&gt;
                </code-example>
            </section>
        `;
  }

}

customElements.define('docs-home', home_HomeElement);
// EXTERNAL MODULE: ./node_modules/prismjs/prism.js
var prism = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/prismjs/themes/prism-okaidia.css

const prism_okaidia_styles = lit_element["b" /* css */]`
code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:none;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;tab-size:4;-webkit-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#272822}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#f8f8f2}.namespace{opacity:.7}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#f92672}.token.boolean,.token.number{color:#ae81ff}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#a6e22e}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.class-name,.token.function{color:#e6db74}.token.keyword{color:#66d9ef}.token.important,.token.regex{color:#fd971f}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}
`;
/* harmony default export */ var prism_okaidia = (prism_okaidia_styles);
// CONCATENATED MODULE: ./node_modules/prismjs/themes/prism.css

const prism_styles = lit_element["b" /* css */]`
code[class*=language-],pre[class*=language-]{color:#000;background:none;text-shadow:0 1px #fff;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;tab-size:4;-webkit-hyphens:none;hyphens:none}code[class*=language-]::selection,code[class*=language-] ::selection,pre[class*=language-]::selection,pre[class*=language-] ::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#999}.namespace{opacity:.7}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#905}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#690}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url{color:#9a6e3a;background:hsla(0,0%,100%,.5)}.token.atrule,.token.attr-value,.token.keyword{color:#07a}.token.class-name,.token.function{color:#dd4a68}.token.important,.token.regex,.token.variable{color:#e90}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}
`;
/* harmony default export */ var themes_prism = (prism_styles);
// CONCATENATED MODULE: ./documentation/src/components/code-example.css

const code_example_styles = lit_element["b" /* css */]`
:host{display:flex;margin:1rem -4px 2rem;flex-direction:column;border-radius:6px;border:1px solid var(--spectrum-alias-border-color-mid);box-shadow:0 0 18px var(--spectrum-alias-dropshadow-color)}#demo{flex:1;padding:3rem 4rem;border-radius:6px 6px 0 0}#markup{position:relative;max-width:100%;padding:.75rem 1.5rem;border-radius:0 0 6px 6px;border-top:1px solid var(--spectrum-alias-border-color-mid);background:var(--spectrum-global-color-gray-50);overflow:hidden;line-height:1.3em;overflow-x:auto}
`;
/* harmony default export */ var code_example = (code_example_styles);
// CONCATENATED MODULE: ./node_modules/common-tags/es/TemplateTag/TemplateTag.js
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */


var TemplateTag = function () {
  /**
   * constructs a template tag
   * @constructs TemplateTag
   * @param  {...Object} [...transformers] - an array or arguments list of transformers
   * @return {Function}                    - a template tag
   */
  function TemplateTag() {
    var _this = this;

    for (var _len = arguments.length, transformers = Array(_len), _key = 0; _key < _len; _key++) {
      transformers[_key] = arguments[_key];
    }

    _classCallCheck(this, TemplateTag);

    this.tag = function (strings) {
      for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        expressions[_key2 - 1] = arguments[_key2];
      }

      if (typeof strings === 'function') {
        // if the first argument passed is a function, assume it is a template tag and return
        // an intermediary tag that processes the template using the aforementioned tag, passing the
        // result to our tag
        return _this.interimTag.bind(_this, strings);
      }

      if (typeof strings === 'string') {
        // if the first argument passed is a string, just transform it
        return _this.transformEndResult(strings);
      } // else, return a transformed end result of processing the template with our tag


      strings = strings.map(_this.transformString.bind(_this));
      return _this.transformEndResult(strings.reduce(_this.processSubstitutions.bind(_this, expressions)));
    }; // if first argument is an array, extrude it as a list of transformers


    if (transformers.length > 0 && Array.isArray(transformers[0])) {
      transformers = transformers[0];
    } // if any transformers are functions, this means they are not initiated - automatically initiate them


    this.transformers = transformers.map(function (transformer) {
      return typeof transformer === 'function' ? transformer() : transformer;
    }); // return an ES2015 template tag

    return this.tag;
  }
  /**
   * Applies all transformers to a template literal tagged with this method.
   * If a function is passed as the first argument, assumes the function is a template tag
   * and applies it to the template, returning a template tag.
   * @param  {(Function|String|Array<String>)} strings        - Either a template tag or an array containing template strings separated by identifier
   * @param  {...*}                            ...expressions - Optional list of substitution values.
   * @return {(String|Function)}                              - Either an intermediary tag function or the results of processing the template.
   */


  _createClass(TemplateTag, [{
    key: 'interimTag',

    /**
     * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
     * template tag to our own template tag.
     * @param  {Function}        nextTag          - the received template tag
     * @param  {Array<String>}   template         - the template to process
     * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
     * @return {*}                                - the final processed value
     */
    value: function interimTag(previousTag, template) {
      for (var _len3 = arguments.length, substitutions = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        substitutions[_key3 - 2] = arguments[_key3];
      }

      return this.tag(_templateObject, previousTag.apply(undefined, [template].concat(substitutions)));
    }
    /**
     * Performs bulk processing on the tagged template, transforming each substitution and then
     * concatenating the resulting values into a string.
     * @param  {Array<*>} substitutions - an array of all remaining substitutions present in this template
     * @param  {String}   resultSoFar   - this iteration's result string so far
     * @param  {String}   remainingPart - the template chunk after the current substitution
     * @return {String}                 - the result of joining this iteration's processed substitution with the result
     */

  }, {
    key: 'processSubstitutions',
    value: function processSubstitutions(substitutions, resultSoFar, remainingPart) {
      var substitution = this.transformSubstitution(substitutions.shift(), resultSoFar);
      return ''.concat(resultSoFar, substitution, remainingPart);
    }
    /**
     * Iterate through each transformer, applying the transformer's `onString` method to the template
     * strings before all substitutions are processed.
     * @param {String}  str - The input string
     * @return {String}     - The final results of processing each transformer
     */

  }, {
    key: 'transformString',
    value: function transformString(str) {
      var cb = function cb(res, transform) {
        return transform.onString ? transform.onString(res) : res;
      };

      return this.transformers.reduce(cb, str);
    }
    /**
     * When a substitution is encountered, iterates through each transformer and applies the transformer's
     * `onSubstitution` method to the substitution.
     * @param  {*}      substitution - The current substitution
     * @param  {String} resultSoFar  - The result up to and excluding this substitution.
     * @return {*}                   - The final result of applying all substitution transformations.
     */

  }, {
    key: 'transformSubstitution',
    value: function transformSubstitution(substitution, resultSoFar) {
      var cb = function cb(res, transform) {
        return transform.onSubstitution ? transform.onSubstitution(res, resultSoFar) : res;
      };

      return this.transformers.reduce(cb, substitution);
    }
    /**
     * Iterates through each transformer, applying the transformer's `onEndResult` method to the
     * template literal after all substitutions have finished processing.
     * @param  {String} endResult - The processed template, just before it is returned from the tag
     * @return {String}           - The final results of processing each transformer
     */

  }, {
    key: 'transformEndResult',
    value: function transformEndResult(endResult) {
      var cb = function cb(res, transform) {
        return transform.onEndResult ? transform.onEndResult(res) : res;
      };

      return this.transformers.reduce(cb, endResult);
    }
  }]);

  return TemplateTag;
}();

/* harmony default export */ var TemplateTag_TemplateTag = (TemplateTag);
// CONCATENATED MODULE: ./node_modules/common-tags/es/TemplateTag/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/trimResultTransformer/trimResultTransformer.js
/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
var trimResultTransformer = function trimResultTransformer() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    onEndResult: function onEndResult(endResult) {
      if (side === '') {
        return endResult.trim();
      }

      side = side.toLowerCase();

      if (side === 'start' || side === 'left') {
        return endResult.replace(/^\s*/, '');
      }

      if (side === 'end' || side === 'right') {
        return endResult.replace(/\s*$/, '');
      }

      throw new Error('Side not supported: ' + side);
    }
  };
};

/* harmony default export */ var trimResultTransformer_trimResultTransformer = (trimResultTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/trimResultTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndentTransformer/stripIndentTransformer.js
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
}
/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */


var stripIndentTransformer = function stripIndentTransformer() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
  return {
    onEndResult: function onEndResult(endResult) {
      if (type === 'initial') {
        // remove the shortest leading indentation from each line
        var match = endResult.match(/^[^\S\n]*(?=\S)/gm);
        var indent = match && Math.min.apply(Math, _toConsumableArray(match.map(function (el) {
          return el.length;
        })));

        if (indent) {
          var regexp = new RegExp('^.{' + indent + '}', 'gm');
          return endResult.replace(regexp, '');
        }

        return endResult;
      }

      if (type === 'all') {
        // remove all indentation from each line
        return endResult.replace(/^[^\S\n]+/gm, '');
      }

      throw new Error('Unknown type: ' + type);
    }
  };
};

/* harmony default export */ var stripIndentTransformer_stripIndentTransformer = (stripIndentTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndentTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceResultTransformer/replaceResultTransformer.js
/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
var replaceResultTransformer = function replaceResultTransformer(replaceWhat, replaceWith) {
  return {
    onEndResult: function onEndResult(endResult) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceResultTransformer requires at least 2 arguments.');
      }

      return endResult.replace(replaceWhat, replaceWith);
    }
  };
};

/* harmony default export */ var replaceResultTransformer_replaceResultTransformer = (replaceResultTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceResultTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceSubstitutionTransformer/replaceSubstitutionTransformer.js
var replaceSubstitutionTransformer = function replaceSubstitutionTransformer(replaceWhat, replaceWith) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceSubstitutionTransformer requires at least 2 arguments.');
      } // Do not touch if null or undefined


      if (substitution == null) {
        return substitution;
      } else {
        return substitution.toString().replace(replaceWhat, replaceWith);
      }
    }
  };
};

/* harmony default export */ var replaceSubstitutionTransformer_replaceSubstitutionTransformer = (replaceSubstitutionTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceSubstitutionTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceStringTransformer/replaceStringTransformer.js
var replaceStringTransformer = function replaceStringTransformer(replaceWhat, replaceWith) {
  return {
    onString: function onString(str) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceStringTransformer requires at least 2 arguments.');
      }

      return str.replace(replaceWhat, replaceWith);
    }
  };
};

/* harmony default export */ var replaceStringTransformer_replaceStringTransformer = (replaceStringTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceStringTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineArrayTransformer/inlineArrayTransformer.js
var defaults = {
  separator: '',
  conjunction: '',
  serial: false
};
/**
 * Converts an array substitution to a string containing a list
 * @param  {String} [opts.separator = ''] - the character that separates each item
 * @param  {String} [opts.conjunction = '']  - replace the last separator with this
 * @param  {Boolean} [opts.serial = false] - include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                     - a TemplateTag transformer
 */

var inlineArrayTransformer = function inlineArrayTransformer() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      // only operate on arrays
      if (Array.isArray(substitution)) {
        var arrayLength = substitution.length;
        var separator = opts.separator;
        var conjunction = opts.conjunction;
        var serial = opts.serial; // join each item in the array into a string where each item is separated by separator
        // be sure to maintain indentation

        var indent = resultSoFar.match(/(\n?[^\S\n]+)$/);

        if (indent) {
          substitution = substitution.join(separator + indent[1]);
        } else {
          substitution = substitution.join(separator + ' ');
        } // if conjunction is set, replace the last separator with conjunction, but only if there is more than one substitution


        if (conjunction && arrayLength > 1) {
          var separatorIndex = substitution.lastIndexOf(separator);
          substitution = substitution.slice(0, separatorIndex) + (serial ? separator : '') + ' ' + conjunction + substitution.slice(separatorIndex + 1);
        }
      }

      return substitution;
    }
  };
};

/* harmony default export */ var inlineArrayTransformer_inlineArrayTransformer = (inlineArrayTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineArrayTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/splitStringTransformer/splitStringTransformer.js
var splitStringTransformer = function splitStringTransformer(splitBy) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (splitBy != null && typeof splitBy === 'string') {
        if (typeof substitution === 'string' && substitution.includes(splitBy)) {
          substitution = substitution.split(splitBy);
        }
      } else {
        throw new Error('You need to specify a string character to split by.');
      }

      return substitution;
    }
  };
};

/* harmony default export */ var splitStringTransformer_splitStringTransformer = (splitStringTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/splitStringTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/removeNonPrintingValuesTransformer/removeNonPrintingValuesTransformer.js
var isValidValue = function isValidValue(x) {
  return x != null && !Number.isNaN(x) && typeof x !== 'boolean';
};

var removeNonPrintingValuesTransformer = function removeNonPrintingValuesTransformer() {
  return {
    onSubstitution: function onSubstitution(substitution) {
      if (Array.isArray(substitution)) {
        return substitution.filter(isValidValue);
      }

      if (isValidValue(substitution)) {
        return substitution;
      }

      return '';
    }
  };
};

/* harmony default export */ var removeNonPrintingValuesTransformer_removeNonPrintingValuesTransformer = (removeNonPrintingValuesTransformer);
// CONCATENATED MODULE: ./node_modules/common-tags/es/removeNonPrintingValuesTransformer/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/commaLists/commaLists.js




var commaLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ','
}), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var commaLists_commaLists = (commaLists);
// CONCATENATED MODULE: ./node_modules/common-tags/es/commaLists/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsAnd/commaListsAnd.js




var commaListsAnd = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'and'
}), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var commaListsAnd_commaListsAnd = (commaListsAnd);
// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsAnd/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsOr/commaListsOr.js




var commaListsOr = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'or'
}), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var commaListsOr_commaListsOr = (commaListsOr);
// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsOr/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/html/html.js






var html = new TemplateTag_TemplateTag(splitStringTransformer_splitStringTransformer('\n'), removeNonPrintingValuesTransformer_removeNonPrintingValuesTransformer, inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var html_html = (html);
// CONCATENATED MODULE: ./node_modules/common-tags/es/html/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/codeBlock/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/source/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/safeHtml/safeHtml.js






var safeHtml = new TemplateTag_TemplateTag(splitStringTransformer_splitStringTransformer('\n'), inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer, replaceSubstitutionTransformer_replaceSubstitutionTransformer(/&/g, '&amp;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/</g, '&lt;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/>/g, '&gt;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/"/g, '&quot;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/'/g, '&#x27;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/`/g, '&#x60;'));
/* harmony default export */ var safeHtml_safeHtml = (safeHtml);
// CONCATENATED MODULE: ./node_modules/common-tags/es/safeHtml/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLine/oneLine.js



var oneLine = new TemplateTag_TemplateTag(replaceResultTransformer_replaceResultTransformer(/(?:\n(?:\s*))+/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLine_oneLine = (oneLine);
// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLine/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineTrim/oneLineTrim.js



var oneLineTrim = new TemplateTag_TemplateTag(replaceResultTransformer_replaceResultTransformer(/(?:\n\s*)/g, ''), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineTrim_oneLineTrim = (oneLineTrim);
// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineTrim/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaLists/oneLineCommaLists.js




var oneLineCommaLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ','
}), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineCommaLists_oneLineCommaLists = (oneLineCommaLists);
// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaLists/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsOr/oneLineCommaListsOr.js




var oneLineCommaListsOr = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'or'
}), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineCommaListsOr_oneLineCommaListsOr = (oneLineCommaListsOr);
// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsOr/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsAnd/oneLineCommaListsAnd.js




var oneLineCommaListsAnd = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'and'
}), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineCommaListsAnd_oneLineCommaListsAnd = (oneLineCommaListsAnd);
// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsAnd/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineLists/inlineLists.js




var inlineLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var inlineLists_inlineLists = (inlineLists);
// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineLists/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineInlineLists/oneLineInlineLists.js




var oneLineInlineLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer, replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineInlineLists_oneLineInlineLists = (oneLineInlineLists);
// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineInlineLists/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndent/stripIndent.js



var stripIndent = new TemplateTag_TemplateTag(stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var stripIndent_stripIndent = (stripIndent);
// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndent/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndents/stripIndents.js



var stripIndents = new TemplateTag_TemplateTag(stripIndentTransformer_stripIndentTransformer('all'), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var stripIndents_stripIndents = (stripIndents);
// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndents/index.js


// CONCATENATED MODULE: ./node_modules/common-tags/es/index.js
// core

 // transformers
















 // tags

































// CONCATENATED MODULE: ./documentation/src/components/code-example.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var code_example_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};









class code_example_Code extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.code = '';
  }

  get highlightedCode() {
    return toHtmlTemplateString(this.code);
  }

  render() {
    return lit_element["d" /* html */]`
            <pre><code>${this.highlightedCode}</code></pre>
        `;
  }

}

code_example_decorate([Object(lit_element["e" /* property */])()], code_example_Code.prototype, "code", void 0);

let code_example_DarkCode = class DarkCode extends code_example_Code {
  static get styles() {
    return [prism_okaidia];
  }

};
code_example_DarkCode = code_example_decorate([Object(lit_element["c" /* customElement */])('dark-code')], code_example_DarkCode);

let code_example_LightCode = class LightCode extends code_example_Code {
  static get styles() {
    return [themes_prism];
  }

};
code_example_LightCode = code_example_decorate([Object(lit_element["c" /* customElement */])('light-code')], code_example_LightCode);

let code_example_CodeExample = class CodeExample extends lit_element["a" /* LitElement */] {
  constructor() {
    super(...arguments);
    this.codeTheme = 'light';
  }

  static get styles() {
    return [code_example];
  }

  get code() {
    return stripIndent_stripIndent`${this.textContent}` || '';
  }

  get language() {
    if (this.classList.contains('language-javascript')) {
      return 'javascript';
    }

    return 'markup';
  }

  get showDemo() {
    return this.classList.contains('language-html');
  }

  get highlightedCode() {
    const highlightedHtml = prism["highlight"](this.code, prism["languages"][this.language], this.language);

    if (this.codeTheme === 'dark') {
      return lit_element["d" /* html */]`
                <dark-code .code=${highlightedHtml}></dark-code>
            `;
    }

    return lit_element["d" /* html */]`
            <light-code .code=${highlightedHtml}></light-code>
        `;
  }

  get renderedCode() {
    return toHtmlTemplateString(this.code);
  }

  render() {
    return lit_element["d" /* html */]`
            ${this.showDemo ? lit_element["d" /* html */]`
                      <div id="demo">
                          ${this.renderedCode}
                      </div>
                  ` : undefined}
            <div id="markup">
                ${this.highlightedCode}
            </div>
        `;
  }

};

code_example_decorate([Object(lit_element["e" /* property */])()], code_example_CodeExample.prototype, "codeTheme", void 0);

code_example_CodeExample = code_example_decorate([Object(lit_element["c" /* customElement */])('code-example')], code_example_CodeExample);

// CONCATENATED MODULE: ./documentation/api-docs/index.ts


const componentApiDocs = __webpack_require__(31);

const ComponentApiDocs = new Map();

for (const key of componentApiDocs.keys()) {
  const componentName = /([a-zA-Z-]+)\.html$/.exec(key)[1];
  const templateString = toHtmlTemplateString(componentApiDocs(key));
  ComponentApiDocs.set(componentName, templateString);
}
// CONCATENATED MODULE: ./documentation/src/components/component.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/







var TabValue;

(function (TabValue) {
  TabValue["Api"] = "api";
  TabValue["Examples"] = "examples";
})(TabValue || (TabValue = {}));

class component_ComponentElement extends layout_LayoutElement {
  static get styles() {
    return [super.styles, markdown];
  }

  get componentName() {
    if (this.location) {
      return `sp-${this.location.params.component}`;
    }

    return '';
  }

  get tab() {
    if (this.location && this.location.params.tab === 'api') {
      return TabValue.Api;
    }

    return TabValue.Examples;
  }

  handleTabChange(event) {
    if (!this.location || !event.target) return;
    const target = event.target;
    const selected = target.getAttribute('selected');
    router["AppRouter"].changeParams({
      component: this.location.params.component,
      tab: selected
    });
  }

  renderContent() {
    let result;

    if (this.location && this.location.params) {
      result = lit_element["d" /* html */]`
                <article class="spectrum-Typography">
                    <div id="title-header" class="spectrum-Article">
                        <p
                            class="spectrum-Heading1--display spectrum-Heading1--quiet"
                        >
                            ${this.componentName}
                        </p>
                    </div>
                    <sp-tab-list
                        selected="${this.tab}"
                        @change="${this.handleTabChange}"
                        direction="row"
                    >
                        <sp-tab value="examples">
                            Examples
                        </sp-tab>
                        <sp-tab value="api">
                            API
                        </sp-tab>
                    </sp-tab-list>
                    ${this.tab === TabValue.Examples ? ComponentDocs.get(this.location.params.component) : ComponentApiDocs.get(this.location.params.component)}
                </article>
            `;
    }

    return result || super.renderContent();
  }

}

customElements.define('docs-component', component_ComponentElement);
// CONCATENATED MODULE: ./documentation/guides/index.ts


const guideDocs = __webpack_require__(32);

const GuideDocs = new Map();

for (const key of guideDocs.keys()) {
  const componentName = /([a-zA-Z-]+)\.md$/.exec(key)[1];
  const templateString = toHtmlTemplateString(guideDocs(key));
  GuideDocs.set(componentName, templateString);
}
// CONCATENATED MODULE: ./documentation/src/components/guide.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/







class guide_GuideElement extends layout_LayoutElement {
  static get styles() {
    return [super.styles, markdown];
  }

  get componentName() {
    if (this.location) {
      return `sp-${this.location.params.guide}`;
    }

    return '';
  }

  renderContent() {
    let result;

    if (this.location && this.location.params) {
      result = lit_element["d" /* html */]`
                <article class="spectrum-Typography">
                    ${GuideDocs.get(this.location.params.guide)}
                </article>
            `;
    }

    return result || super.renderContent();
  }

}

customElements.define('docs-guide', guide_GuideElement);
// CONCATENATED MODULE: ./documentation/src/components/index.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/




/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@open-wc/polyfills-loader/polyfills-loader.js
/**
 * Web component polyfills loader, based on: https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-loader.js
 *
 * Adapted to not load language polyfills and use dynamic imports
 */
function needsTemplatePolyfill() {
  // no real <template> because no `content` property (IE and older browsers)
  const template = document.createElement('template');

  if (!('content' in template)) {
    return true;
  } // broken doc fragment (older Edge)


  if (!(template.content.cloneNode() instanceof DocumentFragment)) {
    return true;
  } // broken <template> cloning (Edge up to at least version 17)


  const template2 = document.createElement('template');
  template2.content.appendChild(document.createElement('div'));
  template.content.appendChild(template2);
  const clone = template.cloneNode(true);
  return (// @ts-ignore
    clone.content.childNodes.length === 0 || // @ts-ignore
    clone.content.firstChild.content.childNodes.length === 0
  );
}
/**
 * Loads web component polyfills if needed
 *
 * @returns {Promise} resolves when polyfills are loaded
 */


function loadPolyfills() {
  const polyfills = [];
  const needsTemplate = needsTemplatePolyfill();
  const needsShadowDom = !('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || // @ts-ignore
  window.ShadyDOM && window.ShadyDOM.force; // @ts-ignore

  const needsCustomElements = !window.customElements || window.customElements.forcePolyfill; // URL is required by webcomponents polyfill
  // We can use URLSearchParams as a watermark for URL support

  if (!('URLSearchParams' in window)) {
    // @ts-ignore
    polyfills.push(__webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, 48)));
  }

  if (needsTemplate) {
    // template is a watermark for requiring all polyfills (IE11 and Edge)
    polyfills.push(Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, 49)));
  } else if (needsShadowDom || needsCustomElements) {
    // only chrome 53 supports shadow dom but not custom elements. this is an older browser, there is no need
    // for complicating the setup here. there is no harm in loading the polyfills there
    polyfills.push(Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 50)));
  }

  return Promise.all(polyfills);
}
// CONCATENATED MODULE: ./node_modules/element-closest/index.mjs
function polyfill(window) {
  const ElementPrototype = window.Element.prototype;

  if (typeof ElementPrototype.matches !== 'function') {
    ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.webkitMatchesSelector || function matches(selector) {
      let element = this;
      const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      let index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
  }

  if (typeof ElementPrototype.closest !== 'function') {
    ElementPrototype.closest = function closest(selector) {
      let element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
}

/* harmony default export */ var element_closest = (polyfill);
//# sourceMappingURL=index.mjs.map

// CONCATENATED MODULE: ./documentation/src/main.ts
/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


loadPolyfills().then(() => {
  element_closest(window);

  __webpack_require__(40);

  __webpack_require__(41);

  __webpack_require__(11);

  __webpack_require__(35);
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map