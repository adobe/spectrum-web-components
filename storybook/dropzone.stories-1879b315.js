import { i as i$1 } from './lit-element-9354aa77.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-43d4edd5.js';
import { x } from './lit-html-126adc72.js';
import { i as illustration } from './sp-illustrated-message-ec7cf352.js';
import './sp-link-312b9e34.js';
import './heading-2d6e356c.js';
import './spectrum-lang.css-9eeeffe9.js';
import './body-734819b4.js';
import './like-anchor-0c856f1c.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';

const e=i$1`
:host{--spectrum-drop-zone-padding:var(--spectrum-spacing-400);--spectrum-drop-zone-illustration-to-heading:var(--spectrum-spacing-400);--spectrum-drop-zone-heading-to-body:var(--spectrum-spacing-75);--spectrum-drop-zone-border-width:var(--spectrum-border-width-200);--spectrum-drop-zone-corner-radius:var(--spectrum-corner-radius-100);--spectrum-drop-zone-border-color:var(--spectrum-gray-300);--spectrum-drop-zone-heading-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-drop-zone-heading-font-weight:var(
--spectrum-heading-sans-serif-font-weight
);--spectrum-drop-zone-heading-font-style:var(
--spectrum-heading-sans-serif-font-style
);--spectrum-drop-zone-heading-font-size:var(
--spectrum-drop-zone-title-size
);--spectrum-drop-zone-heading-line-height:var(
--spectrum-heading-line-height
);--spectrum-drop-zone-heading-color:var(--spectrum-heading-color);--spectrum-drop-zone-body-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-drop-zone-body-font-weight:var(
--spectrum-body-sans-serif-font-weight
);--spectrum-drop-zone-body-font-style:var(
--spectrum-body-sans-serif-font-style
);--spectrum-drop-zone-body-font-size:var(--spectrum-drop-zone-body-size);--spectrum-drop-zone-body-line-height:var(--spectrum-body-line-height);--spectrum-drop-zone-body-color:var(--spectrum-body-color);--spectrum-drop-zone-background-color:var(
--spectrum-drop-zone-background-color-rgb
);--spectrum-drop-zone-border-color-hover:var(
--spectrum-accent-visual-color
);--spectrum-drop-zone-illustration-color:var(
--spectrum-neutral-visual-color
);--spectrum-drop-zone-illustration-color-hover:var(
--spectrum-accent-visual-color
);--spectrum-drop-zone-content-height:var(--spectrum-component-height-300);--spectrum-drop-zone-content-max-width:var(
--spectrum-drop-zone-content-maximum-width
);--spectrum-drop-zone-content-edge-to-text:var(
--spectrum-component-edge-to-text-300
);--spectrum-drop-zone-content-top-to-text:var(
--spectrum-component-top-to-text-300
);--spectrum-drop-zone-content-bottom-to-text:var(
--spectrum-component-bottom-to-text-300
);--spectrum-drop-zone-content-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-drop-zone-content-font-weight:var(--spectrum-bold-font-weight);--spectrum-drop-zone-content-font-style:var(--spectrum-default-font-style);--spectrum-drop-zone-content-font-size:var(--spectrum-font-size-300);--spectrum-drop-zone-content-line-height:var(--spectrum-line-height-100);--spectrum-drop-zone-content-background-color:var(
--spectrum-accent-visual-color
);--spectrum-drop-zone-content-color:var(--spectrum-white);--mod-illustrated-message-pointer-events:none;--mod-illustrated-message-content-maximum-width:var(
--mod-drop-zone-content-maximum-width,var(--spectrum-drop-zone-content-maximum-width)
);--mod-illustrated-message-illustration-color:var(
--mod-drop-zone-illustration-color,var(--spectrum-drop-zone-illustration-color)
);--mod-illustrated-message-title-to-heading:var(
--mod-drop-zone-illustration-to-heading,var(--spectrum-drop-zone-illustration-to-heading)
);--mod-illustrated-message-heading-to-body:var(
--mod-drop-zone-heading-to-body,var(--spectrum-drop-zone-heading-to-body)
);--mod-illustrated-message-title-font-family:var(
--mod-drop-zone-heading-font-family,var(--spectrum-drop-zone-heading-font-family)
);--mod-illustrated-message-title-font-weight:var(
--mod-drop-zone-heading-font-weight,var(--spectrum-drop-zone-heading-font-weight)
);--mod-illustrated-message-title-font-style:var(
--mod-drop-zone-heading-font-style,var(--spectrum-drop-zone-heading-font-style)
);--mod-illustrated-message-title-font-size:var(
--mod-drop-zone-heading-font-size,var(--spectrum-drop-zone-heading-font-size)
);--mod-illustrated-message-title-line-height:var(
--mod-drop-zone-heading-line-height,var(--spectrum-drop-zone-heading-line-height)
);--mod-illustrated-message-title-color:var(
--mod-drop-zone-heading-color,var(--spectrum-drop-zone-heading-color)
);--mod-illustrated-message-description-position:relative;--mod-illustrated-message-description-z-index:10;--mod-illustrated-message-description-pointer-events:initial;--mod-illustrated-message-heading-to-description:0;--mod-illustrated-message-description-font-family:var(
--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family)
);--mod-illustrated-message-description-font-weight:var(
--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight)
);--mod-illustrated-message-description-font-style:var(
--mod-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style)
);--mod-illustrated-message-description-font-size:var(
--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size)
);--mod-illustrated-message-description-line-height:var(
--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height)
);--mod-illustrated-message-description-color:var(
--mod-drop-zone-body-color,var(--spectrum-drop-zone-body-color)
);--mod-actionbutton-font-size:var(
--mod-drop-zone-content-font-size,var(--spectrum-drop-zone-content-font-size)
);--mod-actionbutton-label-color:var(
--mod-drop-zone-content-color,var(--spectrum-drop-zone-content-color)
);--mod-actionbutton-edge-to-text:var(
--mod-drop-zone-content-edge-to-text,var(--spectrum-drop-zone-content-edge-to-text)
)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-drop-zone-heading-font-size:var(
--spectrum-drop-zone-cjk-title-size
)}:host{background-size:cover;border-color:var(
--mod-drop-zone-border-color,var(--spectrum-drop-zone-border-color)
);border-radius:var(
--mod-drop-zone-corner-radius,var(--spectrum-drop-zone-corner-radius)
);border-style:var(--mod-drop-zone-border-style,dashed);border-width:var(
--mod-drop-zone-border-width,var(--spectrum-drop-zone-border-width)
);box-sizing:border-box;inline-size:var(--mod-drop-zone-width,var(--spectrum-drop-zone-width));padding:calc(var(--mod-drop-zone-padding, var(--spectrum-drop-zone-padding)) - var(
--mod-drop-zone-border-width,
var(--spectrum-drop-zone-border-width)
));position:relative;text-align:center}:host:after{background-color:var(
--mod-drop-zone-background-color,var(--spectrum-drop-zone-background-color)
);block-size:100%;content:"";inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}:host([dragged]){--mod-drop-zone-border-style:var(
--mod-drop-zone-border-style--dragged,solid
);--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(
--mod-drop-zone-background-color-opacity,var(--spectrum-drop-zone-background-color-opacity)
));--spectrum-drop-zone-border-color:var(
--highcontrast-drop-zone-border-color-hover,var(
--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)
)
);--mod-illustrated-message-illustration-color:var(
--mod-drop-zone-illustration-color-hover,var(--spectrum-drop-zone-illustration-color-hover)
)}:host .is-filled{--mod-drop-zone-background-color:rgba(var(--spectrum-drop-zone-background-color),var(
--mod-drop-zone-background-color-opacity-filled,var(--spectrum-drop-zone-background-color-opacity-filled)
));--mod-illustrated-message-display:none}:host([dragged]) .is-filled{--mod-drop-zone-content-display:flex}:host(:focus),:host:focus-within{--mod-drop-zone-border-style:solid;--spectrum-drop-zone-border-color:var(
--highcontrast-drop-zone-border-color-hover,var(
--mod-drop-zone-border-color-hover,var(--spectrum-drop-zone-border-color-hover)
)
);outline:0}.spectrum-DropZone-content{align-items:center;display:var(--mod-drop-zone-content-display,none);height:100%;justify-content:center;position:relative;z-index:10}.spectrum-DropZone-button{background-color:var(
--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color)
);block-size:var(
--mod-drop-zone-content-height,var(--spectrum-drop-zone-content-height)
);border:none;box-sizing:border-box;font-family:var(
--mod-drop-zone-content-font-family,var(--spectrum-drop-zone-content-font-family)
);font-style:var(
--mod-drop-zone-content-font-style,var(--spectrum-drop-zone-content-font-style)
);font-weight:var(
--mod-drop-zone-content-font-weight,var(--spectrum-drop-zone-content-font-weight)
);line-height:var(
--mod-drop-zone-content-line-height,var(--spectrum-drop-zone-content-line-height)
);max-inline-size:var(
--mod-drop-zone-content-max-width,var(--spectrum-drop-zone-content-max-width)
);padding-block-end:var(
--mod-drop-zone-content-bottom-to-text,var(--spectrum-drop-zone-content-bottom-to-text)
);padding-block-start:var(
--mod-drop-zone-content-top-to-text,var(--spectrum-drop-zone-content-top-to-text)
)}.spectrum-DropZone-button:focus,.spectrum-DropZone-button:hover{background-color:var(
--mod-drop-zone-content-background-color,var(--spectrum-drop-zone-content-background-color)
)}@media (forced-colors:active){:host{--highcontrast-drop-zone-illustration-color:CanvasText;--highcontrast-drop-zone-illustration-color-hover:Highlight;--highcontrast-drop-zone-border-color-hover:Highlight;--highcontrast-illustrated-message-illustration-color:var(
--highcontrast-drop-zone-illustration-color-hover
)}}:host{display:block}::slotted(*){font-family:var(
--mod-drop-zone-body-font-family,var(--spectrum-drop-zone-body-font-family)
);font-size:var(
--mod-drop-zone-body-font-size,var(--spectrum-drop-zone-body-font-size)
);font-style:var(
--spectrum-drop-zone-body-font-style,var(--spectrum-drop-zone-body-font-style)
);font-weight:var(
--mod-drop-zone-body-font-weight,var(--spectrum-drop-zone-body-font-weight)
);line-height:var(
--mod-drop-zone-body-line-height,var(--spectrum-drop-zone-body-line-height)
);margin-bottom:0;margin-top:0}
`;var u = e;

var i=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var d=(n,o,e,t)=>{for(var r=t>1?void 0:t?p(o,e):o,a=n.length-1,s;a>=0;a--)(s=n[a])&&(r=(t?s(o,e,r):s(r))||r);return t&&r&&i(o,e,r),r};class Dropzone extends SpectrumElement{constructor(){super(...arguments);this._dropEffect="copy";this.isDragged=!1;this.debouncedDragLeave=null;}static get styles(){return [u]}get dropEffect(){return this._dropEffect}set dropEffect(e){["copy","move","link","none"].includes(e)&&(this._dropEffect=e);}connectedCallback(){super.connectedCallback(),this.addEventListener("drop",this.onDrop),this.addEventListener("dragover",this.onDragOver),this.addEventListener("dragleave",this.onDragLeave);}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("drop",this.onDrop),this.removeEventListener("dragover",this.onDragOver),this.removeEventListener("dragleave",this.onDragLeave);}onDragOver(e){const t=new CustomEvent("sp-dropzone-should-accept",{bubbles:!0,cancelable:!0,composed:!0,detail:e}),r=this.dispatchEvent(t);if(!e.dataTransfer)return;if(!r){e.dataTransfer.dropEffect="none";return}e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!0,e.dataTransfer.dropEffect=this.dropEffect;const a=new CustomEvent("sp-dropzone-dragover",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(a);}onDragLeave(e){this.clearDebouncedDragLeave(),this.debouncedDragLeave=window.setTimeout(()=>{this.isDragged=!1;const t=new CustomEvent("sp-dropzone-dragleave",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t);},100);}onDrop(e){e.preventDefault(),this.clearDebouncedDragLeave(),this.isDragged=!1;const t=new CustomEvent("sp-dropzone-drop",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t);}render(){return x`
            <slot></slot>
        `}clearDebouncedDragLeave(){this.debouncedDragLeave&&(clearTimeout(this.debouncedDragLeave),this.debouncedDragLeave=null);}}d([n({type:Boolean,reflect:!0,attribute:"dragged"})],Dropzone.prototype,"isDragged",2);

defineElement("sp-dropzone",Dropzone);

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
            <sp-illustrated-message heading="Drag and Drop Your File" cta>
                ${illustration}
                <div slot="description">
                    <label for="file-input">
                        <sp-link>Select a File</sp-link>
                        from your computer
                    </label>
                    <input type="file" id="file-input" style="display: none" />
                </div>
                <div slot="description">
                    or
                    <sp-link href="http://stock.adobe.com" target="blank">
                        Search Adobe Stock
                    </sp-link>
                </div>
            </sp-illustrated-message>
        </sp-dropzone>
    `;
};
const Dragged = (args) => {
  return x`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File" cta>
                ${illustration}
                <div slot="description">
                    <label for="file-input">
                        <sp-link>Select a File</sp-link>
                        from your computer
                    </label>
                    <input type="file" id="file-input" style="display: none" />
                </div>
                <div slot="description">
                    or
                    <sp-link href="http://stock.adobe.com" target="blank">
                        Search Adobe Stock
                    </sp-link>
                </div>
            </sp-illustrated-message>
        </sp-dropzone>
    `;
};
Dragged.args = {
  isDragged: true
};
const __namedExportsOrder = ['Default', 'Dragged'];

export { Default, Dragged, __namedExportsOrder, dropzone_stories as default };
