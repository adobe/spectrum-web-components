"use strict";var u=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var i=(l,r,t,o)=>{for(var e=o>1?void 0:o?c(r,t):r,s=l.length-1,p;s>=0;s--)(p=l[s])&&(e=(o?p(r,t,e):p(e))||e);return o&&e&&u(r,t,e),e};import{html as d,SpectrumElement as m}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import n from"./color-loupe.css.js";import C from"@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js";export class ColorLoupe extends m{constructor(){super(...arguments);this.open=!1;this.color="rgba(255, 0, 0, 0.5)"}static get styles(){return[C,n]}render(){return d`
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
        `}}i([a({type:Boolean,reflect:!0})],ColorLoupe.prototype,"open",2),i([a({type:String})],ColorLoupe.prototype,"color",2);
//# sourceMappingURL=ColorLoupe.js.map
