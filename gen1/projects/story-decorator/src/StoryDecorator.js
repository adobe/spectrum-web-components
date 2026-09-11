"use strict";var g=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var n=(d,l,t,a)=>{for(var e=a>1?void 0:a?_(l,t):l,s=d.length-1,m;s>=0;s--)(m=d[s])&&(e=(a?m(l,t,e):m(e))||e);return a&&e&&g(l,t,e),e};import{css as p,html as i,nothing as f,SpectrumElement as w}from"@spectrum-web-components/base";import{property as c}from"@spectrum-web-components/base/src/decorators.js";import{DARK_MODE as b}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import{Theme as k}from"@spectrum-web-components/theme";import"@spectrum-web-components/theme/sp-theme.js";import"@spectrum-web-components/theme/src/themes.js";import"@spectrum-web-components/theme/src/spectrum-two/themes.js";import"@spectrum-web-components/theme/src/express/themes.js";import"@spectrum-web-components/field-label/sp-field-label.js";import"@spectrum-web-components/picker/sp-picker.js";import"@spectrum-web-components/menu/sp-menu.js";import"@spectrum-web-components/menu/sp-menu-item.js";import"@spectrum-web-components/switch/sp-switch.js";import"./types.js";import{Locales as u}from"./locales.js";const v=window.location.search,o=new URLSearchParams(v);export let dir=o.get("sp_dir")||"ltr";export const theme=o.get("sp_theme")||"spectrum";export let system=o.get("sp_system")||"spectrum",color=o.get("sp_color")||(matchMedia(b).matches?"dark":"light"),scale=o.get("sp_scale")||"medium",reduceMotion=o.get("sp_reduceMotion")==="true";export const screenshot=o.get("sp_screenshot")==="true",locale=o.get("sp_locale")||"en-US",direction=o.get("sp_direction")||"ltr";window.__swc_hack_knobs__=window.__swc_hack_knobs__||{defaultSystemVariant:system,defaultColor:color,defaultScale:scale,defaultDirection:dir,defaultReduceMotion:reduceMotion,defaultLocale:locale};const y=p`
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
`;export class StoryDecorator extends w{constructor(){super(...arguments);this.system=window.__swc_hack_knobs__.defaultSystemVariant;this.color=window.__swc_hack_knobs__.defaultColor;this.scale=window.__swc_hack_knobs__.defaultScale;this.direction=window.__swc_hack_knobs__.defaultDirection;this.reduceMotion=window.__swc_hack_knobs__.defaultReduceMotion;this.lang=window.__swc_hack_knobs__.defaultLocale;this.screenshot=screenshot;this.ready=!1}static get styles(){return[p`
        :host(:focus) {
          outline: none;
        }
        sp-theme {
          overflow-x: hidden;
          display: block;
          box-sizing: border-box;
          width: 100%;
          min-height: 100vh;
          padding: var(--decorator-padding-100) var(--decorator-padding-100)
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
          ${y}
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
          padding-bottom: calc(2 * var(--spectrum-alias-focus-ring-size));
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
      `]}updateTheme({target:t}){const{id:a}=t,{value:e}=t,{checked:s}=t;switch(a){case"system":this.system=system=window.__swc_hack_knobs__.defaultSystemVariant=e;break;case"color":this.color=color=window.__swc_hack_knobs__.defaultColor=e;break;case"scale":this.scale=scale=window.__swc_hack_knobs__.defaultScale=e;break;case"dir":this.direction=dir=window.__swc_hack_knobs__.defaultDirection=e,document.documentElement.dir!==dir&&(document.documentElement.dir=dir),requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))});break;case"reduceMotion":this.reduceMotion=reduceMotion=window.__swc_hack_knobs__.defaultReduceMotion=s;break;case"locale":this.lang=window.__swc_hack_knobs__.defaultLocale=e;break}}get backgroundStyle(){return this.system==="spectrum-two"?"background-color: var(--spectrum-gray-50)":"background-color: var(--spectrum-gray-100);"}handleKeydown(t){t.composedPath().some(s=>s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||!!s.isContentEditable)&&t.stopPropagation()}render(){return i`
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
    `}async checkReady({target:t}){this.ready=!1;const a=t.assignedElements({flatten:!0}),e=a;a.forEach(r=>{const h=[...r.querySelectorAll("*")||[]];e.push(...h)});const m=e.filter(r=>r.tagName.search("-")!==-1&&typeof r.updateComplete!="undefined").map(r=>r.updateComplete);await Promise.all(m),await new Promise(r=>{setTimeout(()=>r())}),await(document.fonts?document.fonts.ready:Promise.resolve()),this.ready=!0}get manageTheme(){return i`
      <div class="manage-theme" part="controls">
        ${this.systemControl} ${this.colorControl} ${this.scaleControl}
        ${this.localeControl} ${this.dirControl} ${this.reduceMotionControl}
      </div>
    `}get systemControl(){return i`
      <sp-field-label side-aligned="start" for="system">System</sp-field-label>
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
    `}get colorControl(){return i`
      <sp-field-label side-aligned="start" for="color">Theme</sp-field-label>
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
    `}get scaleControl(){return i`
      <sp-field-label side-aligned="start" for="scale">Scale</sp-field-label>
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
    `}get localeControl(){const t=a=>i`
      <sp-menu-item value=${a}>${u[a]}</sp-menu-item>
    `;return i`
      <sp-field-label side-aligned="start" for="locale">Locale</sp-field-label>
      <sp-picker
        id="locale"
        label="Locale"
        placement="top"
        quiet
        .value=${this.lang}
        @change=${this.updateTheme}
      >
        ${Object.keys(u).map(t)}
      </sp-picker>
    `}get dirControl(){return i`
      <sp-field-label side-aligned="start" for="dir">Direction</sp-field-label>
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
    `}get reduceMotionControl(){return i`
      <sp-switch
        id="reduceMotion"
        ?checked=${this.reduceMotion}
        @change=${this.updateTheme}
      >
        Reduce motion
      </sp-switch>
    `}willUpdate(t){t.has("screenshot")&&this.screenshot&&k.registerThemeFragment("app","app",p`
          :host {
            --swc-test-caret-color: transparent;
            --swc-test-forced-color-adjust: none;
          }
        `)}}n([c({type:String})],StoryDecorator.prototype,"system",2),n([c({type:String})],StoryDecorator.prototype,"color",2),n([c({type:String})],StoryDecorator.prototype,"scale",2),n([c({type:String,reflect:!0,attribute:"dir"})],StoryDecorator.prototype,"direction",2),n([c({type:Boolean,attribute:"reduce-motion",reflect:!0})],StoryDecorator.prototype,"reduceMotion",2),n([c({type:String})],StoryDecorator.prototype,"lang",2),n([c({type:Boolean,reflect:!0})],StoryDecorator.prototype,"screenshot",2);
//# sourceMappingURL=StoryDecorator.js.map
