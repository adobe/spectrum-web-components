import { R as RovingTabindexController } from './RovingTabindex-LnbiEVTh.js';
import { t as t$1 } from './mutation-controller-KeE5MDSl.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-IBQibr2z.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-z6bXN_P5.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-swatch-yHI7gGox.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import './FocusGroup-TIL3fP6n.js';
import './base-STdhtiz1.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './opacity-checkerboard.css-tb-AybJj.js';
import './sp-icon-dash300-mmtDel6j.js';
import './Dash300-GtH_7nnW.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './spectrum-icon-dash.css-itJ-5huq.js';
import './when-kvvOyHr2.js';

const a=i`
    :host{--spectrum-swatchgroup-spacing-compact:var(--spectrum-spacing-50);--spectrum-swatchgroup-spacing-regular:var(--spectrum-spacing-75);--spectrum-swatchgroup-spacing-spacious:var(--spectrum-spacing-100);justify-content:flex-start;align-items:flex-start;gap:var(--mod-swatchgroup-spacing-regular,var(--spectrum-swatchgroup-spacing-regular));flex-flow:wrap;display:inline-flex}:host([density=compact]){gap:var(--mod-swatchgroup-spacing-compact,var(--spectrum-swatchgroup-spacing-compact))}:host([density=spacious]){gap:var(--mod-swatchgroup-spacing-spacious,var(--spectrum-swatchgroup-spacing-spacious))}
`;var w = a;

var d=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var l=(c,a,e,t)=>{for(var i=t>1?void 0:t?h(a,e):a,s=c.length-1,r;s>=0;s--)(r=c[s])&&(i=(t?r(a,e,i):r(i))||i);return t&&i&&d(a,e,i),i};class SwatchGroup extends SizedMixin(SpectrumElement,{validSizes:["xs","s","m","l"],noDefaultSize:!0}){constructor(){super();this.selected=[];this.selectedSet=new Set;this.rovingTabindexController=new RovingTabindexController(this,{focusInIndex:e=>{let t=-1;const i=e.findIndex((s,r)=>(!e[t]&&!s.disabled&&(t=r),s.selected&&!s.disabled));return e[i]?i:t},elements:()=>[...this.children],isFocusableElement:e=>!e.disabled});this.manageChange=()=>{const e=new Set;this.selectedSet=new Set(this.selected),[...this.children].forEach(i=>{e.add(i.value),i.selected&&this.selectedSet.add(i.value);}),this.selectedSet.forEach(i=>{e.has(i)||this.selectedSet.delete(i);}),this.selected=[...this.selectedSet];};new t$1(this,{config:{attributes:!0,childList:!0,subtree:!0},callback:()=>{this.manageChange();}});}static get styles(){return [w]}focus(e){this.rovingTabindexController.focus(e);}handleChange(e){e.stopPropagation();const t=this.selected;if(!this.selects){e.preventDefault();return}if(this.selects==="single"){const{target:s}=e;if(s.tabIndex=0,s.selected=!0,this.selectedSet.has(s.value))return;this.selectedSet.clear(),this.selectedSet.add(s.value),this.rovingTabindexController.elements.forEach(r=>{r!==s&&(r.selected=!1);});}else if(this.selects==="multiple"){const{target:s}=e;s.selected?this.selectedSet.add(s.value):this.selectedSet.delete(s.value);}this.selected=[...this.selectedSet],this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||(this.selected=t,e.preventDefault());}getPassthroughSwatchActions(e){const t={};e.has("selects")&&(this.selects||typeof e.get("selects")!="undefined")&&(t.selects=this.selects),e.has("border")&&(this.border||typeof e.get("border")!="undefined")&&(t.border=this.border),e.has("rounding")&&(this.rounding||typeof e.get("rounding")!="undefined")&&(t.rounding=this.rounding),e.has("size")&&(this.size!=="m"||typeof e.get("size")!="undefined")&&(t.size=this.size),e.has("shape")&&(this.shape||typeof e.get("shape")!="undefined")&&(t.shape=this.shape);const i=[];return Object.keys(t).length&&i.push(s=>{"border"in t&&(s.border=t.border),"rounding"in t&&(s.rounding=t.rounding),"shape"in t&&(s.shape=t.shape),"size"in t&&(s.size=t.size);}),i}getSelectionSwatchActions(e){const t=[];if(!e.has("selects"))return t;this.selects?this.setAttribute("role",this.selects==="single"?"radiogroup":"group"):this.removeAttribute("role");const i={single:"radio",multiple:"checkbox"},s=this.selects?i[this.selects]:"button";return t.push(r=>{r.setAttribute("role",s);}),t}render(){return x`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `}willUpdate(e){const t=[...this.getPassthroughSwatchActions(e),...this.getSelectionSwatchActions(e)],i=new Set(this.selected),s=new Set;e.has("selected")&&t.push(r=>{s.add(r.value),i.has(r.value)||!this.hasUpdated&&r.selected?r.selected=!0:r.selected=!1;}),this.rovingTabindexController.elements.forEach(r=>{t.forEach(n=>{n(r);});}),e.has("selected")&&(this.selected=[...i].filter(r=>s.has(r)),this.rovingTabindexController.clearElementCache());}}l([n({reflect:!0})],SwatchGroup.prototype,"border",2),l([n({reflect:!0})],SwatchGroup.prototype,"rounding",2),l([n({type:Array})],SwatchGroup.prototype,"selected",2),l([n()],SwatchGroup.prototype,"selects",2),l([n({reflect:!0})],SwatchGroup.prototype,"shape",2),l([n({reflect:!0})],SwatchGroup.prototype,"density",2);

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
      if (event.defaultPrevented)
        return;
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
  "--spectrum-global-color-gray-500",
  "--spectrum-global-color-red-500",
  "--spectrum-global-color-orange-500",
  "--spectrum-global-color-yellow-500",
  "--spectrum-global-color-chartreuse-500",
  "--spectrum-global-color-celery-500",
  "--spectrum-global-color-green-500",
  "--spectrum-global-color-seafoam-500",
  "--spectrum-global-color-blue-500",
  "--spectrum-global-color-indigo-500",
  "--spectrum-global-color-purple-500",
  "--spectrum-global-color-fuchsia-500",
  "--spectrum-global-color-magenta-500"
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
            border=${l$1(border === "normal" ? void 0 : border)}
            density=${l$1(density === "normal" ? void 0 : density)}
            rounding=${l$1(rounding === "normal" ? void 0 : rounding)}
            selects=${l$1(selects === "none" ? void 0 : selects)}
            .selected=${selected}
            shape=${l$1(shape === "normal" ? void 0 : shape)}
            aria-label=${l$1(groupLabel)}
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
  selected: ["--spectrum-global-color-yellow-500"]
};
const selectsMultiple = (args) => template(args);
selectsMultiple.args = {
  selects: "multiple",
  selected: [
    "--spectrum-global-color-celery-500",
    "--spectrum-global-color-red-500",
    "--spectrum-global-color-purple-500",
    "--spectrum-global-color-blue-500"
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
