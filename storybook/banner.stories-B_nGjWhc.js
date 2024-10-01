import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';

const e=i`
    :host{border-radius:var(--spectrum-banner-border-radius,var(--spectrum-global-dimension-static-size-100));padding-top:var(--spectrum-banner-padding-y,var(--spectrum-global-dimension-static-size-50));padding-bottom:var(--spectrum-banner-padding-y,var(--spectrum-global-dimension-static-size-50));padding-left:var(--spectrum-banner-padding-x,var(--spectrum-global-dimension-static-size-100));padding-right:var(--spectrum-banner-padding-x,var(--spectrum-global-dimension-static-size-100));font-size:var(--spectrum-banner-text-size,var(--spectrum-global-dimension-font-size-75));line-height:var(--spectrum-banner-text-line-height,var(--spectrum-alias-heading-text-line-height));display:inline-block}#header{font-weight:700}:host([dir=ltr][corner]){right:-10px}:host([dir=rtl][corner]){left:-10px}:host([corner]){position:absolute;top:-10px}:host{color:var(--spectrum-banner-text-color,var(--spectrum-global-color-static-white))}:host([type=info]){background-color:var(--spectrum-banner-info-background-color,var(--spectrum-semantic-informative-color-default))}:host([type=warning]){background-color:var(--spectrum-banner-warning-background-color,var(--spectrum-semantic-notice-color-default))}:host([type=error]){background-color:var(--spectrum-banner-error-background-color,var(--spectrum-semantic-negative-color-default))}
`;

var a=Object.defineProperty;var s=(i,t,r,o)=>{for(var e=void 0,n=i.length-1,l;n>=0;n--)(l=i[n])&&(e=(l(t,r,e))||e);return e&&a(t,r,e),e};class Banner extends SpectrumElement{constructor(){super(...arguments);this.type="info";this.corner=!1;}static get styles(){return [e]}update(r){super.update(r);}render(){return x`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `}}s([n({reflect:!0,type:String})],Banner.prototype,"type"),s([n({reflect:!0,type:Boolean})],Banner.prototype,"corner");

defineElement("sp-banner",Banner);

var banner_stories = {
  component: "sp-banner",
  title: "Banner",
  argTypes: {
    header: {
      name: "header",
      description: "Primary message of the banner.",
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      },
      control: "text"
    },
    content: {
      name: "content",
      description: "Secondary message of the banner. Used to provide a description.",
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      },
      control: "text"
    },
    type: {
      name: "type",
      description: "Determines the style of the banner.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "info" }
      },
      control: {
        type: "inline-radio",
        options: ["info", "warning", "error"]
      }
    },
    inCorner: {
      name: "inCorner",
      type: { name: "boolean", required: false },
      description: "Determines if banner sets position at upper right corner or not.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  },
  args: {
    header: "Header Text",
    content: "Content of the banner!",
    inCorner: false,
    type: "info"
  },
  parameters: {
    badges: ["deprecated"]
  }
};
const Template = ({
  header = "Header text",
  content = "Content of the banner!",
  type = "info",
  inCorner
} = {}) => {
  return x`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner type="${type}" ?corner=${inCorner}>
                    <div slot="header">${header}</div>
                    <div slot="content">${content}</div>
                </sp-banner>
            </div>
        </div>
    `;
};
const Default = (args) => Template(args);
const bannerTypes = () => {
  return x`
        <sp-banner type="info">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="warning">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="error">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
    `;
};
bannerTypes.storyName = "Banner Types";
const cornerPlacement = (args) => {
  return x`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner ${spreadProps(args)}>
                    <div slot="header">${args.header}</div>
                    <div slot="content">${args.content}</div>
                </sp-banner>
            </div>
        </div>
    `;
};
cornerPlacement.args = {
  inCorner: true,
  header: "A corner banner!",
  content: "Content of the banner!"
};
cornerPlacement.storyName = "Corner Placement";
const __namedExportsOrder = ['Default', 'bannerTypes', 'cornerPlacement'];

export { Default, __namedExportsOrder, bannerTypes, cornerPlacement, banner_stories as default };
