import { i as i$1 } from './lit-element-BulMEkr1.js';
import { r as r$1 } from './opacity-checkerboard.css-Cz3bIIfY.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';

const r=i$1`
    :host{--spectrum-colorloupe-width:var(--spectrum-color-loupe-width);--spectrum-colorloupe-height:var(--spectrum-color-loupe-height);--spectrum-colorloupe-offset:var(--spectrum-color-loupe-bottom-to-color-handle);--spectrum-colorloupe-animation-distance:8px;--spectrum-colorloupe-drop-shadow-x:var(--spectrum-drop-shadow-x);--spectrum-colorloupe-drop-shadow-y:var(--spectrum-color-loupe-drop-shadow-y);--spectrum-colorloupe-drop-shadow-blur:var(--spectrum-color-loupe-drop-shadow-blur);--spectrum-colorloupe-drop-shadow-color:var(--spectrum-color-loupe-drop-shadow-color);--spectrum-colorloupe-outer-border-width:var(--spectrum-color-loupe-outer-border-width);--spectrum-colorloupe-inner-border-width:var(--spectrum-color-loupe-inner-border-width);--spectrum-colorloupe-outer-border-color:var(--spectrum-color-loupe-outer-border);--spectrum-colorloupe-inner-border-color:var(--spectrum-color-loupe-inner-border);--spectrum-colorloupe-checkerboard-dark-color:var(--spectrum-opacity-checkerboard-square-dark);--spectrum-colorloupe-checkerboard-light-color:var(--spectrum-opacity-checkerboard-square-light);inline-size:var(--spectrum-colorloupe-width);block-size:var(--spectrum-colorloupe-height);transform:translateY(var(--mod-colorloupe-animation-distance,var(--spectrum-colorloupe-animation-distance)));opacity:0;transform-origin:bottom;pointer-events:none;filter:drop-shadow(var(--mod-colorloupe-drop-shadow-x,var(--spectrum-colorloupe-drop-shadow-x))var(--mod-colorloupe-drop-shadow-y,var(--spectrum-colorloupe-drop-shadow-y))var(--mod-colorloupe-drop-shadow-blur,var(--spectrum-colorloupe-drop-shadow-blur))var(--mod-colorloupe-drop-shadow-color,var(--spectrum-colorloupe-drop-shadow-color)));transition:transform .1s ease-in-out,opacity .125s ease-in-out;position:absolute;inset-block-end:calc(var(--spectrum-color-handle-size) - var(--spectrum-color-handle-outer-border-width) + var(--mod-colorloupe-offset,var(--spectrum-colorloupe-offset)));inset-inline-end:calc(50% - var(--spectrum-colorloupe-width)/2)}:host:dir(rtl),:host([dir=rtl]){inset-inline-end:calc(50% - var(--spectrum-colorloupe-width)/2 - 1px)}:host([open]){opacity:1;transform:translate(0)}.spectrum-ColorLoupe-inner-border{fill:var(--spectrum-picked-color);stroke:var(--mod-colorloupe-inner-border-color,var(--spectrum-colorloupe-inner-border-color));stroke-width:var(--mod-colorloupe-inner-border-width,var(--spectrum-colorloupe-inner-border-width))}.spectrum-ColorLoupe-outer-border{fill:none;stroke:var(--highcontrast-colorloupe-outer-border-color,var(--mod-colorloupe-outer-border-color,var(--spectrum-colorloupe-outer-border-color)));stroke-width:calc(var(--mod-colorloupe-outer-border-width,var(--spectrum-colorloupe-outer-border-width)) + 2px)}.spectrum-ColorLoupe-checkerboard-pattern{fill:var(--spectrum-colorloupe-checkerboard-dark-color)}.spectrum-ColorLoupe-checkerboard-background{fill:var(--spectrum-colorloupe-checkerboard-light-color)}.spectrum-ColorLoupe-checkerboard-fill{fill:var(--spectrum-colorloupe-checkerboard-fill)}@media (forced-colors:active){:host{--highcontrast-colorloupe-outer-border-color:CanvasText}}svg{width:inherit;height:inherit}.loupe-clipped{clip-path:path("M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ")}.opacity-checkerboard{block-size:100%;inline-size:100%;position:absolute;top:2px;left:2px}
`;

var u=Object.defineProperty;var i=(l,r,t,o)=>{for(var e=void 0,s=l.length-1,p;s>=0;s--)(p=l[s])&&(e=(p(r,t,e))||e);return e&&u(r,t,e),e};class ColorLoupe extends SpectrumElement{constructor(){super(...arguments);this.open=!1;this.color="rgba(255, 0, 0, 0.5)";}static get styles(){return [r$1,r]}render(){return x`
            <div class="opacity-checkerboard loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-inner-border loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-outer-border loupe-clipped"></div>
            <svg
                aria-hidden="true"
                class="spectrum-ColorLoupe is-open"
                overflow="visible"
                style="--spectrum-picked-color: ${this.color}; position: absolute;"
            >
                <defs>
                    <path
                        id="loupe-path"
                        d="M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ"
                        transform="translate(2, 2)"
                    />
                    <mask id="loupe-mask">
                        <rect
                            x="0"
                            y="0"
                            height="100"
                            width="100"
                            fill="white"
                        />
                        <use xlink:href="#path" fill="black" />
                    </mask>
                </defs>

                <g class="spectrum-ColorLoupe-loupe">
                    <g>
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            transform="translate(2, 2)"
                            class="spectrum-ColorLoupe-inner-border"
                        />
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            class="spectrum-ColorLoupe-outer-border"
                        />
                    </g>
                </g>
            </svg>
        `}}i([n({type:Boolean,reflect:!0})],ColorLoupe.prototype,"open"),i([n({type:String})],ColorLoupe.prototype,"color");

defineElement("sp-color-loupe",ColorLoupe);
