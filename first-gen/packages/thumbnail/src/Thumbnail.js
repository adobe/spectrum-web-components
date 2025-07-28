"use strict";var n=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var s=(o,i,r,e)=>{for(var t=e>1?void 0:e?y(i,r):i,a=o.length-1,c;a>=0;a--)(c=o[a])&&(t=(e?c(i,r,t):c(t))||t);return e&&t&&n(i,r,t),t};import{html as p,SpectrumElement as z}from"@spectrum-web-components/base";import{property as l}from"@spectrum-web-components/base/src/decorators.js";import b from"@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js";import h from"./thumbnail.css.js";const u=["50","75","100","200","300","400","500","600","700","800","900","1000"],d=u[6];export class Thumbnail extends z{constructor(){super(...arguments);this.cover=!1;this.layer=!1;this._size=d}static get styles(){return[b,h]}get size(){return this._size}set size(r){const e=u.includes(r)?r:d;if(e&&this.setAttribute("size",`${e}`),this._size===e)return;const t=this._size;this._size=e,this.requestUpdate("size",t)}update(r){this.hasAttribute("size")||this.setAttribute("size",this.size),super.update(r)}render(){return this.background?p`
                <div
                    class="opacity-checkerboard background"
                    style="background: ${this.background}"
                >
                    <div class="image-wrapper">
                        <slot></slot>
                    </div>
                </div>
            `:this.layer?p`
                <div class="opacity-checkerboard layer-inner">
                    <slot></slot>
                </div>
            `:p`
                <div class="opacity-checkerboard image-wrapper">
                    <slot></slot>
                </div>
            `}}s([l({type:String,reflect:!0})],Thumbnail.prototype,"background",2),s([l({type:Boolean,reflect:!0})],Thumbnail.prototype,"cover",2),s([l({type:Boolean,reflect:!0})],Thumbnail.prototype,"layer",2),s([l({type:String,reflect:!0})],Thumbnail.prototype,"size",1);
//# sourceMappingURL=Thumbnail.js.map
