import { T } from './lit-html-126adc72.js';
import { i as i$1 } from './directive-helpers-aa9210f2.js';
import { c as c$1 } from './async-directive-e6357bae.js';
import { e } from './directive-2bb7789e.js';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s{constructor(t){this.G=t;}disconnect(){this.G=void 0;}reconnect(t){this.G=t;}deref(){return this.G}}class i{constructor(){this.Y=void 0,this.Z=void 0;}get(){return this.Y}pause(){var t;null!==(t=this.Y)&&void 0!==t||(this.Y=new Promise((t=>this.Z=t)));}resume(){var t;null===(t=this.Z)||void 0===t||t.call(this),this.Y=this.Z=void 0;}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n=t=>!i$1(t)&&"function"==typeof t.then,h=1073741823;class c extends c$1{constructor(){super(...arguments),this._$C_t=h,this._$Cwt=[],this._$Cq=new s(this),this._$CK=new i;}render(...s){var i;return null!==(i=s.find((t=>!n(t))))&&void 0!==i?i:T}update(s,i){const r=this._$Cwt;let e=r.length;this._$Cwt=i;const o=this._$Cq,c=this._$CK;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$C_t);t++){const s=i[t];if(!n(s))return this._$C_t=t,s;t<e&&s===r[t]||(this._$C_t=h,e=0,Promise.resolve(s).then((async t=>{for(;c.get();)await c.get();const i=o.deref();if(void 0!==i){const r=i._$Cwt.indexOf(s);r>-1&&r<i._$C_t&&(i._$C_t=r,i.setValue(t));}})));}return T}disconnected(){this._$Cq.disconnect(),this._$CK.pause();}reconnected(){this._$Cq.reconnect(this),this._$CK.resume();}}const m=e(c);

export { m };
