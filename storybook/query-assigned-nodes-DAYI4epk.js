import { e } from './base-u8Z1Hrsd.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n(n){return (o,r)=>{const{slot:e$1}=n??{},s="slot"+(e$1?`[name=${e$1}]`:":not([name])");return e(o,r,{get(){const t=this.renderRoot?.querySelector(s);return t?.assignedNodes(n)??[]}})}}

export { n };
