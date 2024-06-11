import { S as SpectrumElement, n, d as defineElement } from './define-element-DeMmBNCp.js';
import { i as i$1, s } from './lit-element-BL-po2DW.js';
import { x } from './lit-html-COgVUehj.js';
import { i as illustration } from './sp-illustrated-message-KbELjsVb.js';
import './sp-link-Bxo359-S.js';
import { r } from './state-BMiL7_R7.js';
import './heading-HGbZSp2m.js';
import './spectrum-lang.css-J6J1vfcw.js';
import './body-DaM1E36c.js';
import './like-anchor-vdd4WF9w.js';
import './if-defined-DDJGFaN4.js';
import './focusable-X_T5Q3Xx.js';
import './focus-visible-D29Av9Xb.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';

const e=i$1`
    :host{--spectrum-drop-zone-padding:var(--spectrum-spacing-400);--spectrum-drop-zone-illustration-to-heading:var(--spectrum-spacing-400);--spectrum-drop-zone-heading-to-body:var(--spectrum-spacing-75);--spectrum-drop-zone-border-width:var(--spectrum-border-width-200);--spectrum-drop-zone-corner-radius:var(--spectrum-corner-radius-100);--spectrum-drop-zone-border-color:var(--spectrum-gray-300);--spectrum-drop-zone-heading-font-family:var(--spectrum-sans-font-family-stack);--spectrum-drop-zone-heading-font-weight:var(--spectrum-heading-sans-serif-font-weight);--spectrum-drop-zone-heading-font-style:var(--spectrum-heading-sans-serif-font-style);--spectrum-drop-zone-heading-font-size:var(--spectrum-drop-zone-title-size);--spectrum-drop-zone-heading-line-height:var(--spectrum-heading-line-height);--spectrum-drop-zone-heading-color:var(--spectrum-heading-color);--spectrum-drop-zone-body-font-family:var(--spectrum-sans-font-family-stack);--spectrum-drop-zone-body-font-weight:var(--spectrum-body-sans-serif-font-weight);--spectrum-drop-zone-body-font-style:var(--spectrum-body-sans-serif-font-style);--spectrum-drop-zone-body-font-size:var(--spectrum-drop-zone-body-size);--spectrum-drop-zone-body-line-height:var(--spectrum-body-line-height);--spectrum-drop-zone-body-color:var(--spectrum-body-color);--spectrum-drop-zone-background-color:var(--spectrum-drop-zone-background-color-rgb);--spectrum-drop-zone-border-color-hover:var(--spectrum-accent-visual-color);--spectrum-drop-zone-illustration-color:var(--spectrum-neutral-visual-color);--spectrum-drop-zone-illustration-color-hover:var(--spectrum-accent-visual-color);--spectrum-drop-zone-content-height:var(--spectrum-component-height-300);--spectrum-drop-zone-content-max-width:var(--spectrum-drop-zone-content-maximum-width);--spectrum-drop-zone-content-edge-to-text:var(--spectrum-component-edge-to-text-300);--spectrum-drop-zone-content-top-to-text:var(--spectrum-component-top-to-text-300);--spectrum-drop-zone-content-bottom-to-text:var(--spectrum-component-bottom-to-text-300);--spectrum-drop-zone-content-font-family:var(--spectrum-sans-font-family-stack);--spectrum-drop-zone-content-font-weight:var(--spectrum-bold-font-weight);--spectrum-drop-zone-content-font-style:var(--spectrum-default-font-style);--spectrum-drop-zone-content-font-size:var(--spectrum-font-size-300);--spectrum-drop-zone-content-line-height:var(--spectrum-line-height-100);--spectrum-drop-zone-content-background-color:var(--spectrum-accent-visual-color);--spectrum-drop-zone-content-color:var(--spectrum-white);--mod-illustrated-message-content-maximum-width:var(--mod-drop-zone-content-maximum-width,var(--spectrum-drop-zone-content-maximum-width));--mod-illustrated-message-illustration-color:var(--mod-drop-zone-illustration-color,var(--spectrum-drop-zone-illustration-color));--mod-illustrated-message-title-to-heading:var(--mod-drop-zone-illustration-to-heading,var(--spectrum-drop-zone-illustration-to-heading));--mod-illustrated-message-heading-to-body:var(--mod-drop-zone-heading-to-body,var(--spectrum-drop-zone-heading-to-body));--mod-illustrated-message-title-font-family:var(--mod-drop-zone-heading-font-family,var(--spectrum-drop-zone-heading-font-family));--mod-illustrated-message-title-font-weight:var(--mod-drop-zone-heading-font-weight,var(--spectrum-drop-zone-heading-font-weight));--mod-illustrated-message-title-font-style:var(--mod-drop-zone-heading-font-style,var(--spectrum-drop-zone-heading-font-style));--mod-illustrated-message-title-font-size:var(--mod-drop-zone-heading-font-size,var(--spectrum-drop-zone-heading-font-size));--mod-illustrated-message-title-line-height:var(--mod-drop-zone-heading-line-height,var(--spectrum-drop-zone-heading-line-height));--mod-illustrated-message-title-color:var(--mod-drop-zone-heading-color,var(--spectrum-drop-zone-heading-color));--mod-illustrated-message-description-position:relative;--mod-illustrated-message-description-z-index:1;--mod-illustrated-message-heading-to-description:0;--mod-illustrated-message-description-font-family:var(--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family));--mod-illustrated-message-description-font-weight:var(--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight));--mod-illustrated-message-description-font-style:var(--mod-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style));--mod-illustrated-message-description-font-size:var(--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size));--mod-illustrated-message-description-line-height:var(--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height));--mod-illustrated-message-description-color:var(--mod-drop-zone-body-color,var(--spectrum-drop-zone-body-color));--mod-actionbutton-font-size:var(--mod-drop-zone-content-font-size,var(--spectrum-drop-zone-content-font-size));--mod-actionbutton-label-color:var(--mod-drop-zone-content-color,var(--spectrum-drop-zone-content-color));--mod-actionbutton-edge-to-text:var(--mod-drop-zone-content-edge-to-text,var(--spectrum-drop-zone-content-edge-to-text))}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-drop-zone-heading-font-size:var(--spectrum-drop-zone-cjk-title-size)}:host{box-sizing:border-box;inline-size:var(--mod-drop-zone-width,var(--spectrum-drop-zone-width));padding:calc(var(--mod-drop-zone-padding,var(--spectrum-drop-zone-padding)) - var(--mod-drop-zone-border-width,var(--spectrum-drop-zone-border-width)));text-align:center;border-color:var(--mod-drop-zone-border-color,var(--spectrum-drop-zone-border-color));border-width:var(--mod-drop-zone-border-width,var(--spectrum-drop-zone-border-width));border-radius:var(--mod-drop-zone-corner-radius,var(--spectrum-drop-zone-corner-radius));border-style:var(--mod-drop-zone-border-style,dashed);background-size:cover;background-color:var(--mod-drop-zone-background-color,var(--spectrum-drop-zone-background-color))}:host([dragged]){--mod-drop-zone-border-style:var(--mod-drop-zone-border-style--dragged,var(--mod-drop-zone-border-style-dragged,solid));--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(--mod-drop-zone-background-color-opacity,var(--spectrum-drop-zone-background-color-opacity)));--spectrum-drop-zone-border-color:var(--highcontrast-drop-zone-border-color-hover,var(--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)));--mod-illustrated-message-illustration-color:var(--mod-drop-zone-illustration-color-hover,var(--spectrum-drop-zone-illustration-color-hover))}:host .is-filled{--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(--mod-drop-zone-background-color-opacity-filled,var(--spectrum-drop-zone-background-color-opacity-filled)));--mod-illustrated-message-display:none}:host([dragged]) .is-filled{--mod-drop-zone-content-display:flex}:host(:focus-visible){--mod-drop-zone-border-style:solid;--spectrum-drop-zone-border-color:var(--highcontrast-drop-zone-border-color-hover,var(--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)));outline:0}.spectrum-DropZone-content{display:var(--mod-drop-zone-content-display,none);z-index:1;justify-content:center;align-items:center;block-size:100%;position:relative}.spectrum-DropZone-button{box-sizing:border-box;block-size:var(--mod-drop-zone-content-height,var(--spectrum-drop-zone-content-height));max-inline-size:var(--mod-drop-zone-content-max-width,var(--spectrum-drop-zone-content-max-width));font-family:var(--mod-drop-zone-content-font-family,var(--spectrum-drop-zone-content-font-family));font-weight:var(--mod-drop-zone-content-font-weight,var(--spectrum-drop-zone-content-font-weight));font-style:var(--mod-drop-zone-content-font-style,var(--spectrum-drop-zone-content-font-style));line-height:var(--mod-drop-zone-content-line-height,var(--spectrum-drop-zone-content-line-height));border:none;padding-block-start:var(--mod-drop-zone-content-top-to-text,var(--spectrum-drop-zone-content-top-to-text));padding-block-end:var(--mod-drop-zone-content-bottom-to-text,var(--spectrum-drop-zone-content-bottom-to-text))}.spectrum-DropZone-button,.spectrum-DropZone-button:focus{background-color:var(--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color))}@media (hover:hover){.spectrum-DropZone-button:hover{background-color:var(--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color))}}@media (forced-colors:active){:host{--highcontrast-drop-zone-illustration-color:CanvasText;--highcontrast-drop-zone-border-color-hover:Highlight;--highcontrast-illustrated-message-illustration-color:var(--highcontrast-drop-zone-illustration-color)}}:host{display:block}::slotted(*){font-family:var(--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family));font-size:var(--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size));font-weight:var(--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight));line-height:var(--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height));font-style:var(--spectrum-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style));margin-top:0;margin-bottom:0}
`;

var i=Object.defineProperty;var d=(n,o,e,t)=>{for(var r=void 0,a=n.length-1,s;a>=0;a--)(s=n[a])&&(r=(s(o,e,r))||r);return r&&i(o,e,r),r};class Dropzone extends SpectrumElement{constructor(){super(...arguments);this._dropEffect="copy";this.isDragged=!1;this.debouncedDragLeave=null;}static get styles(){return [e]}get dropEffect(){return this._dropEffect}set dropEffect(e){["copy","move","link","none"].includes(e)&&(this._dropEffect=e);}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave);}onDragOver(e){const t=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:e}),r=this.dispatchEvent(t);if(!e.dataTransfer)return;if(!r){e.dataTransfer.dropEffect="none";return}e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,e.dataTransfer.dropEffect=this.dropEffect;const a=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(a);}onDragLeave(e){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout(()=>{this.isDragged=!1;const t=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t);},100);}onDrop(e){e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const t=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t);}render(){return x`
            <slot></slot>
        `}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null);}}d([n({type:Boolean,reflect:!0,attribute:"dragged"})],Dropzone.prototype,"isDragged");

defineElement("sp-dropzone",Dropzone);

var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0 ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
var dropzone_stories = {
  component: "sp-dropzone",
  title: "Dropzone",
  args: {
    isDragged: false
  },
  argTypes: {
    isDragged: {
      name: "isDragged",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
const Default = (args) => {
  return x`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File">
                ${illustration}
            </sp-illustrated-message>
            <div>
                <label for="file-input">
                    <sp-link
                        href="javascript:;"
                        onclick="this.parentElement.nextElementSibling.click()"
                    >
                        Select a File
                    </sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
            </div>
        </sp-dropzone>
    `;
};
const Dragged = (args) => {
  return x`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File">
                ${illustration}
            </sp-illustrated-message>
            <div>
                <label for="file-input">
                    <sp-link
                        href="javascript:;"
                        onclick="this.parentElement.nextElementSibling.click()"
                    >
                        Select a File
                    </sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
            </div>
        </sp-dropzone>
    `;
};
Dragged.args = {
  isDragged: true
};
class ControlledDropzone extends s {
  constructor() {
    super(...arguments);
    this.fileName = "mock_file.png";
    this.input = void 0;
  }
  render() {
    return x`
            <span>
                ${this.renderMockFile()}
                <sp-dropzone
                    tabindex="0"
                    id="dropzone"
                    drop-effect="copy"
                    ?dragged=${this.input !== void 0}
                    @sp-dropzone-drop=${this.onChange}
                >
                    <sp-illustrated-message heading="Drag and Drop Your File">
                        ${illustration}
                    </sp-illustrated-message>
                    <div>
                        <label for="file-input">
                            <sp-link
                                href="javascript:;"
                                onclick="this.parentElement.nextElementSibling.click()"
                            >
                                Select a File
                            </sp-link>
                            from your computer
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            style="display: none"
                            @change=${this.onChange}
                        />
                    </div>
                    ${this.renderUploadButton()}
                </sp-dropzone>
            </span>
        `;
  }
  renderMockFile() {
    return this.input === void 0 ? x`
                  <sp-action-button
                      draggable="true"
                      style="margin-bottom: 16px;"
                  >
                      Drag ${this.fileName}
                  </sp-action-button>
              ` : x`
                  <sp-action-button style="margin-bottom: 16px;">
                      Added ${this.fileName}
                  </sp-action-button>
              `;
  }
  renderUploadButton() {
    return this.input === void 0 ? null : x`
                  <sp-action-button autofocus style="margin-top: 16px;">
                      Upload ${this.fileName}
                  </sp-action-button>
              `;
  }
  onChange() {
    this.input = this.fileName;
  }
}
__decorateClass([
  r()
], ControlledDropzone.prototype, "input");
defineElement("controlled-dropzone", ControlledDropzone);
const Controlled = () => {
  return x`
        <controlled-dropzone></controlled-dropzone>
    `;
};
const __namedExportsOrder = ['Default', 'Dragged', 'Controlled'];

export { Controlled, Default, Dragged, __namedExportsOrder, dropzone_stories as default };
