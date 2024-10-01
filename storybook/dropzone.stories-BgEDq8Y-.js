import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { i, s } from './lit-element-BulMEkr1.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-action-button-BGmiWspi.js';
import { i as illustration } from './sp-illustrated-message-DQaVFFhP.js';
import './sp-link-DslkogVS.js';
import { r } from './state-DrummH0c.js';
import './sp-icon-corner-triangle300-Df1iqVxq.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BzkTbMb8.js';
import './heading-C6ZIrIYw.js';
import './spectrum-lang.css-DOD3bmds.js';
import './body-gNxcWIKV.js';

const e=i`
    :host{--spectrum-drop-zone-padding:var(--spectrum-spacing-400);--spectrum-drop-zone-illustration-to-heading:var(--spectrum-spacing-400);--spectrum-drop-zone-heading-to-body:var(--spectrum-spacing-75);--spectrum-drop-zone-border-width:var(--spectrum-border-width-200);--spectrum-drop-zone-corner-radius:var(--spectrum-corner-radius-100);--spectrum-drop-zone-border-color:var(--spectrum-gray-300);--spectrum-drop-zone-heading-font-family:var(--spectrum-sans-font-family-stack);--spectrum-drop-zone-heading-font-weight:var(--spectrum-heading-sans-serif-font-weight);--spectrum-drop-zone-heading-font-style:var(--spectrum-heading-sans-serif-font-style);--spectrum-drop-zone-heading-font-size:var(--spectrum-drop-zone-title-size);--spectrum-drop-zone-heading-line-height:var(--spectrum-heading-line-height);--spectrum-drop-zone-heading-color:var(--spectrum-heading-color);--spectrum-drop-zone-body-font-family:var(--spectrum-sans-font-family-stack);--spectrum-drop-zone-body-font-weight:var(--spectrum-body-sans-serif-font-weight);--spectrum-drop-zone-body-font-style:var(--spectrum-body-sans-serif-font-style);--spectrum-drop-zone-body-font-size:var(--spectrum-drop-zone-body-size);--spectrum-drop-zone-body-line-height:var(--spectrum-body-line-height);--spectrum-drop-zone-body-color:var(--spectrum-body-color);--spectrum-drop-zone-background-color:var(--spectrum-drop-zone-background-color-rgb);--spectrum-drop-zone-border-color-hover:var(--spectrum-accent-visual-color);--spectrum-drop-zone-illustration-color:var(--spectrum-neutral-visual-color);--spectrum-drop-zone-illustration-color-hover:var(--spectrum-accent-visual-color);--spectrum-drop-zone-content-height:var(--spectrum-component-height-300);--spectrum-drop-zone-content-max-width:var(--spectrum-drop-zone-content-maximum-width);--spectrum-drop-zone-content-edge-to-text:var(--spectrum-component-edge-to-text-300);--spectrum-drop-zone-content-top-to-text:var(--spectrum-component-top-to-text-300);--spectrum-drop-zone-content-bottom-to-text:var(--spectrum-component-bottom-to-text-300);--spectrum-drop-zone-content-font-family:var(--spectrum-sans-font-family-stack);--spectrum-drop-zone-content-font-weight:var(--spectrum-bold-font-weight);--spectrum-drop-zone-content-font-style:var(--spectrum-default-font-style);--spectrum-drop-zone-content-font-size:var(--spectrum-font-size-300);--spectrum-drop-zone-content-line-height:var(--spectrum-line-height-100);--spectrum-drop-zone-content-background-color:var(--spectrum-accent-visual-color);--spectrum-drop-zone-content-color:var(--spectrum-white);--mod-illustrated-message-content-maximum-width:var(--mod-drop-zone-content-maximum-width,var(--spectrum-drop-zone-content-maximum-width));--mod-illustrated-message-illustration-color:var(--mod-drop-zone-illustration-color,var(--spectrum-drop-zone-illustration-color));--mod-illustrated-message-title-to-heading:var(--mod-drop-zone-illustration-to-heading,var(--spectrum-drop-zone-illustration-to-heading));--mod-illustrated-message-heading-to-body:var(--mod-drop-zone-heading-to-body,var(--spectrum-drop-zone-heading-to-body));--mod-illustrated-message-title-font-family:var(--mod-drop-zone-heading-font-family,var(--spectrum-drop-zone-heading-font-family));--mod-illustrated-message-title-font-weight:var(--mod-drop-zone-heading-font-weight,var(--spectrum-drop-zone-heading-font-weight));--mod-illustrated-message-title-font-style:var(--mod-drop-zone-heading-font-style,var(--spectrum-drop-zone-heading-font-style));--mod-illustrated-message-title-font-size:var(--mod-drop-zone-heading-font-size,var(--spectrum-drop-zone-heading-font-size));--mod-illustrated-message-title-line-height:var(--mod-drop-zone-heading-line-height,var(--spectrum-drop-zone-heading-line-height));--mod-illustrated-message-title-color:var(--mod-drop-zone-heading-color,var(--spectrum-drop-zone-heading-color));--mod-illustrated-message-description-position:relative;--mod-illustrated-message-description-z-index:1;--mod-illustrated-message-heading-to-description:0;--mod-illustrated-message-description-font-family:var(--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family));--mod-illustrated-message-description-font-weight:var(--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight));--mod-illustrated-message-description-font-style:var(--mod-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style));--mod-illustrated-message-description-font-size:var(--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size));--mod-illustrated-message-description-line-height:var(--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height));--mod-illustrated-message-description-color:var(--mod-drop-zone-body-color,var(--spectrum-drop-zone-body-color));--mod-actionbutton-font-size:var(--mod-drop-zone-content-font-size,var(--spectrum-drop-zone-content-font-size));--mod-actionbutton-label-color:var(--mod-drop-zone-content-color,var(--spectrum-drop-zone-content-color));--mod-actionbutton-edge-to-text:var(--mod-drop-zone-content-edge-to-text,var(--spectrum-drop-zone-content-edge-to-text))}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-drop-zone-heading-font-size:var(--spectrum-drop-zone-cjk-title-size)}:host{box-sizing:border-box;inline-size:var(--mod-drop-zone-width,var(--spectrum-drop-zone-width));padding:calc(var(--mod-drop-zone-padding,var(--spectrum-drop-zone-padding)) - var(--mod-drop-zone-border-width,var(--spectrum-drop-zone-border-width)));text-align:center;border-color:var(--mod-drop-zone-border-color,var(--spectrum-drop-zone-border-color));border-width:var(--mod-drop-zone-border-width,var(--spectrum-drop-zone-border-width));border-radius:var(--mod-drop-zone-corner-radius,var(--spectrum-drop-zone-corner-radius));border-style:var(--mod-drop-zone-border-style,dashed);background-size:cover;background-color:var(--mod-drop-zone-background-color,var(--spectrum-drop-zone-background-color))}:host([dragged]){--mod-drop-zone-border-style:var(--mod-drop-zone-border-style--dragged,var(--mod-drop-zone-border-style-dragged,solid));--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(--mod-drop-zone-background-color-opacity,var(--spectrum-drop-zone-background-color-opacity)));--spectrum-drop-zone-border-color:var(--highcontrast-drop-zone-border-color-hover,var(--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)));--mod-illustrated-message-illustration-color:var(--mod-drop-zone-illustration-color-hover,var(--spectrum-drop-zone-illustration-color-hover))}:host([filled]){--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(--mod-drop-zone-background-color-opacity-filled,var(--spectrum-drop-zone-background-color-opacity-filled)));--mod-illustrated-message-display:none}:host([filled][dragged]){--mod-drop-zone-content-display:flex}:host(:focus-visible){--mod-drop-zone-border-style:solid;--spectrum-drop-zone-border-color:var(--highcontrast-drop-zone-border-color-hover,var(--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)));outline:0}.spectrum-DropZone-content{display:var(--mod-drop-zone-content-display,none);block-size:100%;z-index:1;justify-content:center;align-items:center;position:relative}.spectrum-DropZone-button{box-sizing:border-box;block-size:var(--mod-drop-zone-content-height,var(--spectrum-drop-zone-content-height));max-inline-size:var(--mod-drop-zone-content-max-width,var(--spectrum-drop-zone-content-max-width));font-family:var(--mod-drop-zone-content-font-family,var(--spectrum-drop-zone-content-font-family));font-weight:var(--mod-drop-zone-content-font-weight,var(--spectrum-drop-zone-content-font-weight));font-style:var(--mod-drop-zone-content-font-style,var(--spectrum-drop-zone-content-font-style));line-height:var(--mod-drop-zone-content-line-height,var(--spectrum-drop-zone-content-line-height));border:none;padding-block-start:var(--mod-drop-zone-content-top-to-text,var(--spectrum-drop-zone-content-top-to-text));padding-block-end:var(--mod-drop-zone-content-bottom-to-text,var(--spectrum-drop-zone-content-bottom-to-text))}.spectrum-DropZone-button,.spectrum-DropZone-button:focus{background-color:var(--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color))}@media (hover:hover){.spectrum-DropZone-button:hover{background-color:var(--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color))}}@media (forced-colors:active){:host{--highcontrast-drop-zone-illustration-color:CanvasText;--highcontrast-drop-zone-border-color-hover:Highlight;--highcontrast-illustrated-message-illustration-color:var(--highcontrast-drop-zone-illustration-color)}}:host{display:block}::slotted(*){font-family:var(--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family));font-size:var(--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size));font-weight:var(--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight));line-height:var(--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height));font-style:var(--spectrum-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style));margin-top:0;margin-bottom:0}
`;

var p=Object.defineProperty;var d=(s,o,e,t)=>{for(var r=void 0,a=s.length-1,n;a>=0;a--)(n=s[a])&&(r=(n(o,e,r))||r);return r&&p(o,e,r),r};class Dropzone extends SpectrumElement{constructor(){super(...arguments);this._dropEffect="copy";this.isDragged=!1;this.isFilled=!1;this.debouncedDragLeave=null;}static get styles(){return [e]}get dropEffect(){return this._dropEffect}set dropEffect(e){["copy","move","link","none"].includes(e)&&(this._dropEffect=e);}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave);}onDragOver(e){const t=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:e}),r=this.dispatchEvent(t);if(!e.dataTransfer)return;if(!r){e.dataTransfer.dropEffect="none";return}e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,e.dataTransfer.dropEffect=this.dropEffect;const a=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(a);}onDragLeave(e){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout(()=>{this.isDragged=!1;const t=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t);},100);}onDrop(e){e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const t=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t);}render(){return x`
            <slot></slot>
        `}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null);}}d([n({type:Boolean,reflect:!0,attribute:"dragged"})],Dropzone.prototype,"isDragged"),d([n({type:Boolean,attribute:"filled"})],Dropzone.prototype,"isFilled");

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
    isDragged: false,
    isFilled: false
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
    },
    isFilled: {
      name: "isFilled",
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
const Filled = (args) => {
  return x`
        <sp-dropzone id="dropzone" ?filled=${args.isFilled}>
            Filled dropzone
        </sp-dropzone>
    `;
};
Filled.args = {
  isFilled: true
};
class ControlledDropzone extends s {
  constructor() {
    super(...arguments);
    this.beingDraggedOver = false;
    this.input = void 0;
  }
  render() {
    return x`
            <span>
                <sp-action-button
                    draggable="true"
                    style="margin-block-end: 16px;"
                >
                    Drag me
                </sp-action-button>
                <sp-dropzone
                    tabindex="0"
                    id="dropzone"
                    drop-effect="copy"
                    ?filled=${this.input !== void 0}
                    @sp-dropzone-drop=${this.onChange}
                    @sp-dropzone-dragover=${this.onDragOver}
                    @sp-dropzone-dragleave=${this.onDragLeave}
                >
                    <sp-illustrated-message
                        style="--mod-illustrated-message-display: flex;"
                        heading=${this.input !== void 0 ? this.beingDraggedOver ? "Drop here to replace!" : "You dropped something!" : "Drag and drop your file"}
                    >
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
                </sp-dropzone>
            </span>
        `;
  }
  onChange() {
    this.input = "mock-file";
    this.beingDraggedOver = false;
  }
  onDragOver() {
    this.beingDraggedOver = true;
  }
  onDragLeave() {
    this.beingDraggedOver = false;
  }
}
__decorateClass([
  r()
], ControlledDropzone.prototype, "beingDraggedOver");
__decorateClass([
  r()
], ControlledDropzone.prototype, "input");
defineElement("controlled-dropzone", ControlledDropzone);
const Controlled = () => {
  return x`
        <controlled-dropzone></controlled-dropzone>
    `;
};
const __namedExportsOrder = ['Default', 'Dragged', 'Filled', 'Controlled'];

export { Controlled, Default, Dragged, Filled, __namedExportsOrder, dropzone_stories as default };
