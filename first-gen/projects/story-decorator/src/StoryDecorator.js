"use strict";var g=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var i=(p,l,e,a)=>{for(var t=a>1?void 0:a?_(l,e):l,s=p.length-1,m;s>=0;s--)(m=p[s])&&(t=(a?m(l,e,t):m(t))||t);return a&&t&&g(l,e,t),t};import{css as d,html as o,nothing as f,SpectrumElement as b}from"@spectrum-web-components/base";import{property as c,queryAsync as w}from"@spectrum-web-components/base/src/decorators.js";import{DARK_MODE as k}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import"@spectrum-web-components/theme/sp-theme.js";import"@spectrum-web-components/theme/src/themes.js";import"@spectrum-web-components/theme/src/spectrum-two/themes.js";import"@spectrum-web-components/theme/src/express/themes.js";import"@spectrum-web-components/field-label/sp-field-label.js";import"@spectrum-web-components/picker/sp-picker.js";import"@spectrum-web-components/menu/sp-menu.js";import"@spectrum-web-components/menu/sp-menu-item.js";import"@spectrum-web-components/switch/sp-switch.js";import{Theme as v}from"@spectrum-web-components/theme";import"./types.js";import{Locales as u}from"./locales.js";const y=window.location.search,r=new URLSearchParams(y);export let dir=r.get("sp_dir")||"ltr";export const theme=r.get("sp_theme")||"spectrum";export let system=r.get("sp_system")||"spectrum",color=r.get("sp_color")||(matchMedia(k).matches?"dark":"light"),scale=r.get("sp_scale")||"medium",reduceMotion=r.get("sp_reduceMotion")==="true";export const screenshot=r.get("sp_screenshot")==="true",locale=r.get("sp_locale")||"en-US",direction=r.get("sp_direction")||"ltr";window.__swc_hack_knobs__=window.__swc_hack_knobs__||{defaultSystemVariant:system,defaultColor:color,defaultScale:scale,defaultDirection:dir,defaultReduceMotion:reduceMotion,defaultLocale:locale};const S=d`
    --spectrum-animation-duration-0: 0ms;
    --spectrum-animation-duration-100: 0ms;
    --spectrum-animation-duration-200: 0ms;
    --spectrum-animation-duration-300: 0ms;
    --spectrum-animation-duration-400: 0ms;
    --spectrum-animation-duration-500: 0ms;
    --spectrum-animation-duration-600: 0ms;
    --spectrum-animation-duration-700: 0ms;
    --spectrum-animation-duration-800: 0ms;
    --spectrum-animation-duration-900: 0ms;
    --spectrum-animation-duration-1000: 0ms;
    --spectrum-animation-duration-2000: 0ms;
    --spectrum-animation-duration-4000: 0ms;
    --spectrum-animation-duration-6000: 0ms;
    --pending-delay: 0s;
    --spectrum-coachmark-animation-indicator-ring-duration: 0ms;
    --swc-test-duration: 1ms;
`;export class StoryDecorator extends b{constructor(){super(...arguments);this.system=window.__swc_hack_knobs__.defaultSystemVariant;this.color=window.__swc_hack_knobs__.defaultColor;this.scale=window.__swc_hack_knobs__.defaultScale;this.direction=window.__swc_hack_knobs__.defaultDirection;this.reduceMotion=window.__swc_hack_knobs__.defaultReduceMotion;this.lang=window.__swc_hack_knobs__.defaultLocale;this.screenshot=screenshot;this.ready=!1}static get styles(){return[d`
                :host(:focus) {
                    outline: none;
                }
                sp-theme {
                    overflow-x: hidden;
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    min-height: 100vh;
                    padding: var(--decorator-padding-100)
                        var(--decorator-padding-100)
                        calc(
                            2 * var(--spectrum-focus-indicator-thickness) +
                                var(--spectrum-component-height-100)
                        );
                    box-sizing: border-box;
                    background-color: var(--spectrum-background-base-color);
                    color: var(--spectrum-body-color);

                    --decorator-padding-100: calc(
                        var(--swc-scale-factor, 1) * var(--spectrum-spacing-100)
                    );
                    --decorator-padding-200: calc(
                        var(--swc-scale-factor, 1) * var(--spectrum-spacing-200)
                    );
                    --decorator-padding-400: calc(
                        var(--swc-scale-factor, 1) * var(--spectrum-spacing-400)
                    );
                }
                :host([screenshot]) sp-theme {
                    padding: var(--decorator-padding-100);
                }
                :host([reduce-motion]) sp-theme {
                    ${S}
                }
                .manage-theme {
                    position: fixed;
                    bottom: 0;
                    left: var(--decorator-padding-200);
                    right: var(--decorator-padding-200);
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;
                    box-sizing: border-box;
                    padding-bottom: calc(
                        2 * var(--spectrum-alias-focus-ring-size)
                    );
                }
                sp-field-label {
                    padding-inline-end: var(
                        --spectrum-fieldlabel-side-padding-x,
                        var(--decorator-padding-100)
                    );
                    margin-inline-start: var(--decorator-padding-400);
                }
                sp-switch {
                    margin-inline-start: var(--decorator-padding-400);
                }
            `]}async startManagingContentDirection(e){(await this.themeRoot).startManagingContentDirection(e)}async stopManagingContentDirection(e){(await this.themeRoot).stopManagingContentDirection(e)}updateTheme({target:e}){const{id:a}=e,{value:t}=e,{checked:s}=e;switch(a){case"system":this.system=system=window.__swc_hack_knobs__.defaultSystemVariant=t;break;case"color":this.color=color=window.__swc_hack_knobs__.defaultColor=t;break;case"scale":this.scale=scale=window.__swc_hack_knobs__.defaultScale=t;break;case"dir":this.direction=dir=window.__swc_hack_knobs__.defaultDirection=t,document.documentElement.dir!==dir&&(document.documentElement.dir=dir);break;case"reduceMotion":this.reduceMotion=reduceMotion=window.__swc_hack_knobs__.defaultReduceMotion=s;break;case"locale":this.lang=window.__swc_hack_knobs__.defaultLocale=t;break}}get backgroundStyle(){return this.system==="spectrum-two"?"background-color: var(--spectrum-gray-50)":"background-color: var(--spectrum-gray-100);"}handleKeydown(e){e.composedPath().some(s=>s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||!!s.isContentEditable)&&e.stopPropagation()}render(){return o`
            <sp-theme
                system=${this.system}
                color=${this.color}
                scale=${this.scale}
                dir=${this.direction}
                style=${this.backgroundStyle}
                part="container"
                lang=${this.lang}
                @keydown=${this.handleKeydown}
            >
                <slot @slotchange=${this.checkReady}></slot>
                ${this.screenshot?f:this.manageTheme}
            </sp-theme>
        `}async checkReady({target:e}){this.ready=!1;const a=e.assignedElements({flatten:!0}),t=a;a.forEach(n=>{const h=[...n.querySelectorAll("*")||[]];t.push(...h)});const m=t.filter(n=>n.tagName.search("-")!==-1&&typeof n.updateComplete!="undefined").map(n=>n.updateComplete);await Promise.all(m),new Promise(n=>{setTimeout(n)}).then(async()=>{await(document.fonts?document.fonts.ready:Promise.resolve()),setTimeout(()=>{this.ready=!0})})}get manageTheme(){return o`
            <div class="manage-theme" part="controls">
                ${this.systemControl} ${this.colorControl} ${this.scaleControl}
                ${this.localeControl} ${this.dirControl}
                ${this.reduceMotionControl}
            </div>
        `}get systemControl(){return o`
            <sp-field-label side-aligned="start" for="system">
                System
            </sp-field-label>
            <sp-picker
                id="system"
                placement="top"
                quiet
                .value=${this.system}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="spectrum">Spectrum</sp-menu-item>
                <sp-menu-item value="express">Express</sp-menu-item>
                <sp-menu-item value="spectrum-two">Spectrum 2</sp-menu-item>
            </sp-picker>
        `}get colorControl(){return o`
            <sp-field-label side-aligned="start" for="color">
                Theme
            </sp-field-label>
            <sp-picker
                id="color"
                placement="top"
                quiet
                .value=${this.color}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="light">Light</sp-menu-item>
                <sp-menu-item value="dark">Dark</sp-menu-item>
            </sp-picker>
        `}get scaleControl(){return o`
            <sp-field-label side-aligned="start" for="scale">
                Scale
            </sp-field-label>
            <sp-picker
                id="scale"
                label="Scale"
                placement="top"
                quiet
                .value=${this.scale}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="medium">Medium</sp-menu-item>
                <sp-menu-item value="large">Large</sp-menu-item>
            </sp-picker>
        `}get localeControl(){const e=a=>o`
            <sp-menu-item value=${a}>${u[a]}</sp-menu-item>
        `;return o`
            <sp-field-label side-aligned="start" for="locale">
                Locale
            </sp-field-label>
            <sp-picker
                id="locale"
                label="Locale"
                placement="top"
                quiet
                .value=${this.lang}
                @change=${this.updateTheme}
            >
                ${Object.keys(u).map(e)}
            </sp-picker>
        `}get dirControl(){return o`
            <sp-field-label side-aligned="start" for="dir">
                Direction
            </sp-field-label>
            <sp-picker
                id="dir"
                label="Direction"
                placement="top"
                quiet
                .value=${this.direction}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="ltr">LTR</sp-menu-item>
                <sp-menu-item value="rtl">RTL</sp-menu-item>
            </sp-picker>
        `}get reduceMotionControl(){return o`
            <sp-switch
                id="reduceMotion"
                ?checked=${this.reduceMotion}
                @change=${this.updateTheme}
            >
                Reduce Motion
            </sp-switch>
        `}willUpdate(e){e.has("screenshot")&&this.screenshot&&v.registerThemeFragment("app","app",d`
                    :host {
                        --swc-test-caret-color: transparent;
                        --swc-test-forced-color-adjust: none;
                    }
                `)}}i([c({type:String})],StoryDecorator.prototype,"system",2),i([c({type:String})],StoryDecorator.prototype,"color",2),i([c({type:String})],StoryDecorator.prototype,"scale",2),i([c({type:String,reflect:!0,attribute:"dir"})],StoryDecorator.prototype,"direction",2),i([c({type:Boolean,attribute:"reduce-motion",reflect:!0})],StoryDecorator.prototype,"reduceMotion",2),i([c({type:String})],StoryDecorator.prototype,"lang",2),i([c({type:Boolean,reflect:!0})],StoryDecorator.prototype,"screenshot",2),i([w("sp-theme")],StoryDecorator.prototype,"themeRoot",2);
//# sourceMappingURL=StoryDecorator.js.map
