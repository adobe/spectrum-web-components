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
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  customElement,
  property,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/search/sp-search.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import bodyStyles from "@spectrum-web-components/styles/body.js";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
import iconsList from "./iconsList.json";
import {
  SystemResolutionController,
  systemResolverUpdatedSymbol
} from "@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js";
export let DelayedReady = class extends SpectrumElement {
  render() {
    return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
  }
  firstUpdated() {
    this._delayedReady = new Promise(
      (res) => this._resolveDelayedReady = res
    );
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this._delayedReady;
    return complete;
  }
  handleSlotchange({
    target
  }) {
    if (target.assignedElements({ flatten: true }).length) {
      requestAnimationFrame(() => {
        this._resolveDelayedReady();
      });
    }
  }
};
DelayedReady = __decorateClass([
  customElement("delayed-ready")
], DelayedReady);
export let IconsDemo = class extends SpectrumElement {
  constructor() {
    super();
    this.name = "ui";
    this.package = "";
    this.size = "m";
    this.search = "";
    this.icons = [];
    this.filteredIcons = [];
    this.unsubscribeSystemContext = null;
    this.spectrumVersion = 1;
    this.iconset = [];
    this.systemResolver = new SystemResolutionController(this);
    this.iconset = [];
    this.handleIconSetAdded = this.handleIconSetAdded.bind(this);
  }
  async connectedCallback() {
    super.connectedCallback();
    window.addEventListener("sp-iconset-added", this.handleIconSetAdded);
  }
  disconnectedCallback() {
    window.removeEventListener("sp-iconset-added", this.handleIconSetAdded);
    super.disconnectedCallback();
    if (this.unsubscribeSystemContext) {
      this.unsubscribeSystemContext();
      this.unsubscribeSystemContext = null;
    }
  }
  filterIconsBySpectrumVersion() {
    const iconVersion = this.spectrumVersion === 2 ? "s2" : "s1";
    let filteredIcons = this.icons;
    if (this.name === "workflow") {
      filteredIcons = filteredIcons.filter((icon) => {
        const iconName = icon.name.replace(/\s/g, "").toLowerCase();
        return iconsList[iconVersion].includes(iconName);
      });
    }
    const iconSet = /* @__PURE__ */ new Set();
    filteredIcons = filteredIcons.filter((icon) => {
      if (iconSet.has(icon.name)) {
        return false;
      }
      iconSet.add(icon.name);
      return true;
    });
    this.filteredIcons = filteredIcons;
  }
  update(changes) {
    if (changes.has(systemResolverUpdatedSymbol)) {
      this.spectrumVersion = this.systemResolver.system === "spectrum-two" ? 2 : 1;
      this.filterIconsBySpectrumVersion();
    }
    if (changes.has("icons")) {
      this.filterIconsBySpectrumVersion();
    }
    super.update(changes);
  }
  handleIconSetAdded(event) {
    const { iconset } = event.detail;
    this.iconset = iconset.getIconList();
    this.requestUpdate();
  }
  static get styles() {
    return [
      ...bodyStyles,
      css`
                :host {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 20px;
                    align-items: flex-start;
                }
                .icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    border-radius: var(
                        --spectrum-alias-focus-ring-gap,
                        var(--spectrum-spacing-50)
                    );
                }
                :host([package]) .icon {
                    cursor: pointer;
                }
                sp-icon {
                    margin-bottom: 10px;
                }
                .search {
                    grid-column-start: 1;
                    grid-column-end: -1;
                }
                .icon[tabindex]:focus {
                    outline: none;
                }
                .icon[tabindex]:focus-visible {
                    outline: var(--spectrum-alias-focus-ring-size) solid
                        var(--spectrum-alias-focus-ring-color);
                    outline-offset: calc(
                        var(
                                --spectrum-alias-focus-ring-gap,
                                var(--spectrum-spacing-50)
                            ) * 2
                    );
                }
            `
    ];
  }
  handleKeydown(event, tag) {
    const { code } = event;
    if (code !== "Enter" && code !== "NumpadEnter" && code !== "Space") {
      return;
    }
    event.preventDefault();
    this.shouldCopy(tag);
  }
  shouldCopy(tag) {
    if (!this.package) return;
    const conditionedTag = tag.slice(1, tag.length - 1);
    const importURL = `import '@spectrum-web-components/${this.package}/icons/${conditionedTag}.js';`;
    this.dispatchEvent(
      new CustomEvent("copy-text", {
        bubbles: true,
        composed: true,
        detail: {
          message: "Import statement copied to clipboard!",
          text: importURL
        }
      })
    );
  }
  updateSearch(event) {
    event.stopPropagation();
    this.search = event.target.value;
  }
  submit(event) {
    event.stopPropagation();
    this.updateSearch(event);
  }
  renderSearch() {
    const matchingIcons = this.search ? this.filteredIcons.filter(
      (icon) => icon.name.toLowerCase().includes(this.search.toLowerCase())
    ) : this.filteredIcons;
    return html`
            <div class="search" part="search">
                <sp-field-label for="search">Spectrum icons:</sp-field-label>
                <sp-search
                    id="search"
                    @keydown=${this.updateSearch}
                    @input=${this.updateSearch}
                    @submit=${this.submit}
                    .value=${this.search}
                    label="Search for icons"
                    autocomplete="off"
                >
                    <sp-help-text slot="help-text">
                        Showing ${matchingIcons.length} of
                        ${this.filteredIcons.length} available icons.
                    </sp-help-text>
                </sp-search>
            </div>
            ${matchingIcons.map((icon) => {
      return html`
                    <bdo
                        class="icon"
                        part="icon"
                        dir="ltr"
                        class="icon"
                        @click=${() => this.shouldCopy(icon.tag)}
                        @keydown=${(event) => this.handleKeydown(event, icon.tag)}
                        tabindex=${ifDefined(this.package ? "0" : void 0)}
                    >
                        ${icon.story(this.size)} ${icon.tag}
                    </bdo>
                `;
    })}
        `;
  }
  render() {
    return html`
            ${this.filteredIcons.length ? this.renderSearch() : html`
                      <slot></slot>
                  `}
            ${this.iconset.map(
      (icon) => html`
                    <bdo class="icon" dir="ltr">
                        <sp-icon
                            size="xl"
                            name=${`${this.name}:${icon}`}
                        ></sp-icon>
                        ${icon}
                    </bdo>
                `
    )}
        `;
  }
};
__decorateClass([
  property()
], IconsDemo.prototype, "name", 2);
__decorateClass([
  property()
], IconsDemo.prototype, "package", 2);
__decorateClass([
  property()
], IconsDemo.prototype, "size", 2);
__decorateClass([
  property()
], IconsDemo.prototype, "search", 2);
__decorateClass([
  property({ attribute: false })
], IconsDemo.prototype, "icons", 2);
__decorateClass([
  state()
], IconsDemo.prototype, "spectrumVersion", 2);
IconsDemo = __decorateClass([
  customElement("icons-demo")
], IconsDemo);
//# sourceMappingURL=icons-demo.js.map
