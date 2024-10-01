import './sp-search-D2Bw7FXH.js';
import './sp-field-label-oZHlTsnx.js';
import { b as bodyStyles } from './body-gNxcWIKV.js';
import './sp-icon-DY-5T7Ex.js';
import './sp-help-text-84jFBGqE.js';
import { t } from './custom-element-Drg7uMpU.js';
import { n, S as SpectrumElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import { i } from './lit-element-BulMEkr1.js';
import { o } from './if-defined-DDJGFaN4.js';

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
let DelayedReady = class extends SpectrumElement {
  render() {
    return x`
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
  t("delayed-ready")
], DelayedReady);
let IconsDemo = class extends SpectrumElement {
  constructor() {
    super();
    this.name = "ui";
    this.package = "";
    this.size = "m";
    this.search = "";
    this.icons = [];
    this.iconset = [];
    this.iconset = [];
    this.handleIconSetAdded = this.handleIconSetAdded.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("sp-iconset-added", this.handleIconSetAdded);
  }
  disconnectedCallback() {
    window.removeEventListener("sp-iconset-added", this.handleIconSetAdded);
    super.disconnectedCallback();
  }
  handleIconSetAdded(event) {
    const { iconset } = event.detail;
    this.iconset = iconset.getIconList();
    this.requestUpdate();
  }
  static get styles() {
    return [
      ...bodyStyles,
      i`
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
                        var(--spectrum-global-dimension-static-size-25)
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
                                var(--spectrum-global-dimension-static-size-25)
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
    const matchingIcons = this.search ? this.icons.filter(
      (icon) => icon.name.toLowerCase().search(this.search) !== -1
    ) : this.icons;
    return x`
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
                        Showing ${matchingIcons.length} of ${this.icons.length}
                        available icons.
                    </sp-help-text>
                </sp-search>
            </div>
            ${matchingIcons.map((icon) => {
      return x`
                    <bdo
                        class="icon"
                        part="icon"
                        dir="ltr"
                        class="icon"
                        @click=${() => this.shouldCopy(icon.tag)}
                        @keydown=${(event) => this.handleKeydown(event, icon.tag)}
                        tabindex=${o(this.package ? "0" : void 0)}
                    >
                        ${icon.story(this.size)} ${icon.tag}
                    </bdo>
                `;
    })}
        `;
  }
  render() {
    return x`
            ${this.icons.length ? this.renderSearch() : x`
                      <slot></slot>
                  `}
            ${this.iconset.map(
      (icon) => x`
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
  n()
], IconsDemo.prototype, "name", 2);
__decorateClass([
  n()
], IconsDemo.prototype, "package", 2);
__decorateClass([
  n()
], IconsDemo.prototype, "size", 2);
__decorateClass([
  n()
], IconsDemo.prototype, "search", 2);
__decorateClass([
  n({ attribute: false })
], IconsDemo.prototype, "icons", 2);
IconsDemo = __decorateClass([
  t("icons-demo")
], IconsDemo);
