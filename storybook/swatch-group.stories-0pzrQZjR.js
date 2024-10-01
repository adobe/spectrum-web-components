import { R as RovingTabindexController } from './RovingTabindex-Bi74mHtS.js';
import { t as t$1 } from './mutation-controller-D2lT1xZk.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-BzkTbMb8.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './query-assigned-elements-C9WOp2R6.js';
import './sp-swatch-1Y5zqasr.js';
import { o as o$1 } from './if-defined-DDJGFaN4.js';
import './FocusGroup-DQHKf855.js';
import './base-u8Z1Hrsd.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './opacity-checkerboard.css-Cz3bIIfY.js';
import './sp-icon-dash300--ZN9FvZF.js';
import './Dash300-DagFK8mn.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './spectrum-icon-dash.css-lElR_d7u.js';
import './when-DEJm_QN9.js';

const a$1=i`
    :host{--spectrum-swatchgroup-spacing-compact:var(--spectrum-spacing-50);--spectrum-swatchgroup-spacing-regular:var(--spectrum-spacing-75);--spectrum-swatchgroup-spacing-spacious:var(--spectrum-spacing-100);justify-content:flex-start;align-items:flex-start;gap:var(--mod-swatchgroup-spacing-regular,var(--spectrum-swatchgroup-spacing-regular));flex-flow:wrap;display:inline-flex}:host([density=compact]){gap:var(--mod-swatchgroup-spacing-compact,var(--spectrum-swatchgroup-spacing-compact))}:host([density=spacious]){gap:var(--mod-swatchgroup-spacing-spacious,var(--spectrum-swatchgroup-spacing-spacious))}
`;

var h=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var a=(n,o,t,e)=>{for(var i=e>1?void 0:e?u(o,t):o,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(e?r(o,t,i):r(i))||i);return e&&i&&h(o,t,i),i};class SwatchGroup extends SizedMixin(SpectrumElement,{validSizes:["xs","s","m","l"],noDefaultSize:!0}){constructor(){super();this._selected=[];this.selectedSet=new Set;this.rovingTabindexController=new RovingTabindexController(this,{focusInIndex:t=>{let e=-1;const i=t.findIndex((s,r)=>(!t[e]&&!s.disabled&&(e=r),s.selected&&!s.disabled));return t[i]?i:e},elements:()=>this.swatches,isFocusableElement:t=>!t.disabled});this.manageChange=async()=>{const t=new Set;this.selectedSet=new Set(this.selected),await Promise.all(this.swatches.map(e=>e.updateComplete)),this.swatches.forEach(e=>{t.add(e.value),e.selected&&this.selectedSet.add(e.value);}),this.selectedSet.forEach(e=>{t.has(e)||this.selectedSet.delete(e);}),this._selected=[...this.selectedSet],this.rovingTabindexController.clearElementCache();};new t$1(this,{config:{attributes:!0,childList:!0,subtree:!0},callback:()=>{this.manageChange();}});}static get styles(){return [a$1]}get selected(){return this._selected}set selected(t){if(t===this.selected)return;const e=this.selected;this._selected=t,this.requestUpdate("selected",e);}focus(t){this.rovingTabindexController.focus(t);}handleChange(t){t.stopPropagation();const e=this.selected;if(!this.selects){t.preventDefault();return}if(this.selects==="single"){const{target:s}=t;if(s.tabIndex=0,s.selected=!0,this.selectedSet.has(s.value))return;this.selectedSet.clear(),this.selectedSet.add(s.value),this.rovingTabindexController.elements.forEach(r=>{r!==s&&(r.selected=!1);});}else if(this.selects==="multiple"){const{target:s}=t;s.selected?this.selectedSet.add(s.value):this.selectedSet.delete(s.value);}this._selected=[...this.selectedSet],this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||(this._selected=e,t.preventDefault());}getPassthroughSwatchActions(t){const e={};t.has("selects")&&(this.selects||typeof t.get("selects")!="undefined")&&(e.selects=this.selects),t.has("border")&&(this.border||typeof t.get("border")!="undefined")&&(e.border=this.border),t.has("rounding")&&(this.rounding||typeof t.get("rounding")!="undefined")&&(e.rounding=this.rounding),t.has("size")&&(this.size!=="m"||typeof t.get("size")!="undefined")&&(e.size=this.size),t.has("shape")&&(this.shape||typeof t.get("shape")!="undefined")&&(e.shape=this.shape);const i=[];return Object.keys(e).length&&i.push(s=>{"border"in e&&(s.border=e.border),"rounding"in e&&(s.rounding=e.rounding),"shape"in e&&(s.shape=e.shape),"size"in e&&(s.size=e.size);}),i}getSelectionSwatchActions(t){const e=[];if(!t.has("selects"))return e;this.selects?this.setAttribute("role",this.selects==="single"?"radiogroup":"group"):this.removeAttribute("role");const i={single:"radio",multiple:"checkbox"},s=this.selects?i[this.selects]:"button";return e.push(r=>{r.setAttribute("role",s);}),e}render(){return x`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `}willUpdate(t){const e=[...this.getPassthroughSwatchActions(t),...this.getSelectionSwatchActions(t)];let i=new Set(this.selected);const s=new Set;t.has("selected")&&e.push(l=>{s.add(l.value),i.has(l.value)||!this.hasUpdated&&l.selected?l.selected=!0:l.selected=!1;});const r=()=>{i=new Set(this.selected),this.swatches.forEach(l=>{e.forEach(d=>{d(l);});}),t.has("selected")&&(this._selected=[...i.values()].filter(l=>s.has(l)));};this.hasUpdated?r():this.shadowRoot.addEventListener("slotchange",()=>{requestAnimationFrame(r);},{once:!0});}}a([n({reflect:!0})],SwatchGroup.prototype,"border",2),a([n({reflect:!0})],SwatchGroup.prototype,"density",2),a([n({reflect:!0})],SwatchGroup.prototype,"rounding",2),a([n({type:Array})],SwatchGroup.prototype,"selected",1),a([n()],SwatchGroup.prototype,"selects",2),a([n({reflect:!0})],SwatchGroup.prototype,"shape",2),a([o({flatten:!0})],SwatchGroup.prototype,"swatches",2);

defineElement("sp-swatch-group",SwatchGroup);

var swatchGroup_stories = {
  title: "Swatch group",
  component: "sp-swatch-group",
  args: {},
  argTypes: {
    border: {
      name: "border",
      type: { name: "string", required: false },
      description: "The border to apply to the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "light", "none"]
      }
    },
    density: {
      name: "density",
      type: { name: "string", required: false },
      description: "The density at which to display the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "compact", "spacious"]
      }
    },
    rounding: {
      name: "rounding",
      type: { name: "string", required: false },
      description: "The rounding to apply to the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "none", "full"]
      }
    },
    selects: {
      name: "selects",
      type: { name: "string", required: false },
      description: "Whether the Swatch Group manages a selection, and whether it is a sinlge or multiple selection.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["none", "single", "multiple"]
      }
    },
    shape: {
      name: "shape",
      type: { name: "string", required: false },
      description: "The shape to apply to the Swatch children.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["normal", "rectangle"]
      }
    }
  },
  decorators: [
    (story, {
      args: { selected = [] }
    }) => x`
            <div
                @change=${async (event) => {
      await 0;
      if (event.defaultPrevented) return;
      const next = event.target.nextElementSibling;
      next.textContent = `Selected: ${JSON.stringify(
        event.target.selected
      )}`;
    }}
            >
                ${story()}
                <div>Selected: ${JSON.stringify(selected)}</div>
            </div>
        `
  ]
};
const colors = [
  "--spectrum-gray-700",
  "--spectrum-red-700",
  "--spectrum-orange-700",
  "--spectrum-yellow-700",
  "--spectrum-chartreuse-700",
  "--spectrum-celery-700",
  "--spectrum-green-700",
  "--spectrum-seafoam-700",
  "--spectrum-blue-700",
  "--spectrum-indigo-700",
  "--spectrum-purple-700",
  "--spectrum-fuchsia-700",
  "--spectrum-magenta-700"
];
const template = ({
  border,
  density,
  rounding,
  selects,
  selected = [],
  shape
}) => {
  const groupLabel = !!selects ? selects === "single" ? "Select a color" : "Selects color(s)" : void 0;
  return x`
        <sp-swatch-group
            border=${o$1(border === "normal" ? void 0 : border)}
            density=${o$1(density === "normal" ? void 0 : density)}
            rounding=${o$1(rounding === "normal" ? void 0 : rounding)}
            selects=${o$1(selects === "none" ? void 0 : selects)}
            .selected=${selected}
            shape=${o$1(shape === "normal" ? void 0 : shape)}
            aria-label=${o$1(groupLabel)}
        >
            ${colors.map(
    (color) => x`
                    <sp-swatch
                        color="var(${color})"
                        label=${color}
                        value=${color}
                    ></sp-swatch>
                `
  )}
        </sp-swatch-group>
    `;
};
const Default = (args) => template(args);
Default.args = {};
const densityCompact = (args) => template(args);
densityCompact.args = {
  density: "compact"
};
const densitySpacious = (args) => template(args);
densitySpacious.args = {
  density: "spacious"
};
const selectsSingle = (args) => template(args);
selectsSingle.args = {
  selects: "single",
  selected: ["--spectrum-yellow-500"]
};
const selectsMultiple = (args) => template(args);
selectsMultiple.args = {
  selects: "multiple",
  selected: [
    "--spectrum-celery-500",
    "--spectrum-red-500",
    "--spectrum-purple-500",
    "--spectrum-blue-500"
  ]
};
const borderLight = (args) => template(args);
borderLight.args = {
  border: "light"
};
const borderNone = (args) => template(args);
borderNone.args = {
  border: "none"
};
const roundingNone = (args) => template(args);
roundingNone.args = {
  rounding: "none"
};
const roundingFull = (args) => template(args);
roundingFull.args = {
  rounding: "full"
};
const shapeRectangle = (args) => template(args);
shapeRectangle.args = {
  shape: "rectangle"
};
const __namedExportsOrder = ['Default', 'densityCompact', 'densitySpacious', 'selectsSingle', 'selectsMultiple', 'borderLight', 'borderNone', 'roundingNone', 'roundingFull', 'shapeRectangle'];

export { Default, __namedExportsOrder, borderLight, borderNone, swatchGroup_stories as default, densityCompact, densitySpacious, roundingFull, roundingNone, selectsMultiple, selectsSingle, shapeRectangle };
