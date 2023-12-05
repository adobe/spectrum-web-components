import { o as o$1 } from './base-511c8c11.js';
import { l } from './sizedMixin-9a9da45c.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o(o,n,r){let l$1,s=o;return "object"==typeof o?(s=o.slot,l$1=o):l$1={flatten:n},r?l({slot:s,flatten:n,selector:r}):o$1({descriptor:e=>({get(){var e,t;const o="slot"+(s?`[name=${s}]`:":not([name])"),n=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(o);return null!==(t=null==n?void 0:n.assignedNodes(l$1))&&void 0!==t?t:[]},enumerable:!0,configurable:!0})})}

export { o };
