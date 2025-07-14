"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  css,
  html,
  nothing,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  queryAsync
} from "@spectrum-web-components/base/src/decorators.js";
import { DARK_MODE } from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/src/spectrum-two/themes.js";
import "@spectrum-web-components/theme/src/express/themes.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/switch/sp-switch.js";
import {
  Theme
} from "@spectrum-web-components/theme";
import "./types.dev.js";
import { Locales } from "./locales.dev.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export let dir = urlParams.get("sp_dir") || "ltr";
export const theme = urlParams.get("sp_theme") || "spectrum";
export let system = urlParams.get("sp_system") || "spectrum";
export let color = urlParams.get("sp_color") || (matchMedia(DARK_MODE).matches ? "dark" : "light");
export let scale = urlParams.get("sp_scale") || "medium";
export let reduceMotion = urlParams.get("sp_reduceMotion") === "true";
export const screenshot = urlParams.get("sp_screenshot") === "true";
export const locale = urlParams.get("sp_locale") || "en-US";
export const direction = urlParams.get("sp_direction") || "ltr";
window.__swc_hack_knobs__ = window.__swc_hack_knobs__ || {
  defaultSystemVariant: system,
  defaultColor: color,
  defaultScale: scale,
  defaultDirection: dir,
  defaultReduceMotion: reduceMotion,
  defaultLocale: locale
};
const reduceMotionProperties = css`
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
`;
export class StoryDecorator extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.system = window.__swc_hack_knobs__.defaultSystemVariant;
    this.color = window.__swc_hack_knobs__.defaultColor;
    this.scale = window.__swc_hack_knobs__.defaultScale;
    this.direction = window.__swc_hack_knobs__.defaultDirection;
    this.reduceMotion = window.__swc_hack_knobs__.defaultReduceMotion;
    this.lang = window.__swc_hack_knobs__.defaultLocale;
    this.screenshot = screenshot;
    this.ready = false;
  }
  static get styles() {
    return [
      css`
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
                    ${reduceMotionProperties}
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
            `
    ];
  }
  async startManagingContentDirection(el) {
    (await this.themeRoot).startManagingContentDirection(el);
  }
  async stopManagingContentDirection(el) {
    (await this.themeRoot).stopManagingContentDirection(el);
  }
  updateTheme({ target }) {
    const { id } = target;
    const { value } = target;
    const { checked } = target;
    switch (id) {
      case "system":
        this.system = system = window.__swc_hack_knobs__.defaultSystemVariant = value;
        break;
      case "color":
        this.color = color = window.__swc_hack_knobs__.defaultColor = value;
        break;
      case "scale":
        this.scale = scale = window.__swc_hack_knobs__.defaultScale = value;
        break;
      case "dir":
        this.direction = dir = window.__swc_hack_knobs__.defaultDirection = value;
        if (document.documentElement.dir !== dir) {
          document.documentElement.dir = dir;
        }
        break;
      case "reduceMotion":
        this.reduceMotion = reduceMotion = window.__swc_hack_knobs__.defaultReduceMotion = checked;
        break;
      case "locale":
        this.lang = window.__swc_hack_knobs__.defaultLocale = value;
        break;
    }
  }
  get backgroundStyle() {
    if (this.system === "spectrum-two") {
      return `background-color: var(--spectrum-gray-50)`;
    }
    return `background-color: var(--spectrum-gray-100);`;
  }
  handleKeydown(event) {
    const path = event.composedPath();
    const hasInput = path.some(
      (node) => node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement || !!node.isContentEditable
    );
    if (hasInput) {
      event.stopPropagation();
    }
  }
  render() {
    return html`
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
                ${this.screenshot ? nothing : this.manageTheme}
            </sp-theme>
        `;
  }
  async checkReady({
    target
  }) {
    this.ready = false;
    const assignedElements = target.assignedElements({
      flatten: true
    });
    const descendents = assignedElements;
    assignedElements.forEach((descendent) => {
      const gathered = [
        ...descendent.querySelectorAll("*") || []
      ];
      descendents.push(...gathered);
    });
    const litElementDescendents = descendents.filter(
      (el) => el.tagName.search("-") !== -1 && typeof el.updateComplete !== "undefined"
    );
    const updates = litElementDescendents.map((el) => el.updateComplete);
    await Promise.all(updates);
    new Promise((res) => {
      setTimeout(res);
    }).then(async () => {
      await (document.fonts ? document.fonts.ready : Promise.resolve());
      setTimeout(() => {
        this.ready = true;
      });
    });
  }
  get manageTheme() {
    return html`
            <div class="manage-theme" part="controls">
                ${this.systemControl} ${this.colorControl} ${this.scaleControl}
                ${this.localeControl} ${this.dirControl}
                ${this.reduceMotionControl}
            </div>
        `;
  }
  get systemControl() {
    return html`
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
        `;
  }
  get colorControl() {
    return html`
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
        `;
  }
  get scaleControl() {
    return html`
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
        `;
  }
  get localeControl() {
    const renderLocaleOption = (locale2) => html`
            <sp-menu-item value=${locale2}>${Locales[locale2]}</sp-menu-item>
        `;
    return html`
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
                ${Object.keys(Locales).map(renderLocaleOption)}
            </sp-picker>
        `;
  }
  get dirControl() {
    return html`
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
        `;
  }
  get reduceMotionControl() {
    return html`
            <sp-switch
                id="reduceMotion"
                ?checked=${this.reduceMotion}
                @change=${this.updateTheme}
            >
                Reduce Motion
            </sp-switch>
        `;
  }
  willUpdate(changes) {
    if (changes.has("screenshot") && this.screenshot) {
      Theme.registerThemeFragment(
        "app",
        "app",
        css`
                    :host {
                        --swc-test-caret-color: transparent;
                        --swc-test-forced-color-adjust: none;
                    }
                `
      );
    }
  }
}
__decorateClass([
  property({ type: String })
], StoryDecorator.prototype, "system", 2);
__decorateClass([
  property({ type: String })
], StoryDecorator.prototype, "color", 2);
__decorateClass([
  property({ type: String })
], StoryDecorator.prototype, "scale", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "dir" })
], StoryDecorator.prototype, "direction", 2);
__decorateClass([
  property({ type: Boolean, attribute: "reduce-motion", reflect: true })
], StoryDecorator.prototype, "reduceMotion", 2);
__decorateClass([
  property({ type: String })
], StoryDecorator.prototype, "lang", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], StoryDecorator.prototype, "screenshot", 2);
__decorateClass([
  queryAsync("sp-theme")
], StoryDecorator.prototype, "themeRoot", 2);
//# sourceMappingURL=StoryDecorator.dev.js.map
