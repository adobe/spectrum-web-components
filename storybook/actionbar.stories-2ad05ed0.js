import{c as t,p as i,L as e}from"./lit-element-089a5717.js";import{q as o,k as s,w as r,j as a}from"./storybook-preview-9aba481c.js";import{_ as n}from"./tslib.es6-d9c764b6.js";import{i as c}from"./if-defined-f9b5fa5b.js";import"./index-16f3b7d2.js";import"./focusable-f84f80fc.js";import"./iconset-svg-7745673b.js";import"./index-71d657ab.js";import"./observe-slot-text-5194cee4.js";import"./checkbox-base-97c86c8c.js";import"./index-9862025a.js";import"./spectrum-icon-checkmark-small.css-32c1abfd.js";var p=t`:host{display:flex;justify-content:center;bottom:0;z-index:1;box-sizing:border-box;padding:0 var(--spectrum-global-dimension-size-200);height:0;opacity:0;overflow:hidden;pointer-events:none;transition:height var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([open]){height:calc(var(--spectrum-global-dimension-size-600) + var(--spectrum-global-dimension-size-200)*2);opacity:1}:host([variant=sticky]){left:0;right:0;position:-webkit-sticky;position:sticky}:host([flexible]) #popover{width:auto}:host([variant=fixed]){position:fixed}#popover{position:relative;box-sizing:border-box;width:100%;margin:auto;height:var(--spectrum-global-dimension-size-600);min-width:280px;max-width:960px;padding:0 var(--spectrum-global-dimension-size-200);flex-direction:row;align-items:center;justify-content:space-between;pointer-events:auto}`,l=["sticky","fixed"];class d extends e{constructor(){super(...arguments),this.open=!1,this._variant=""}static get styles(){return[p]}set variant(t){if(t!==this.variant){if(l.includes(t))return this.setAttribute("variant",t),void(this._variant=t);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}render(){return o` <sp-popover open id="popover"> <slot></slot> </sp-popover> `}}n([i({type:Boolean,reflect:!0})],d.prototype,"open",void 0),n([i({type:String,reflect:!0})],d.prototype,"variant",null),customElements.get("sp-actionbar")||customElements.define("sp-actionbar",d);var m=()=>{var t=["",...l];return s`
        <sp-actionbar
            ?open=${r("Open",!0,"Element")}
            variant=${c(a("Variant",t,t[0],"Element")||void 0)}
        >
            <sp-checkbox indeterminate>228 Selected</sp-checkbox>
            <div class="spectrum-ButtonGroup">
                <sp-action-button quiet>
                    <svg
                        slot="icon"
                        id="spectrum-icon-18-Edit"
                        viewBox="0 0 36 36"
                    >
                        <path
                            d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                        ></path>
                    </svg>
                </sp-action-button>
                <sp-action-button quiet>
                    <svg
                        slot="icon"
                        id="spectrum-icon-18-More"
                        viewBox="0 0 36 36"
                    >
                        <circle cx="17.8" cy="18.2" r="3.4"></circle>
                        <circle cx="29.5" cy="18.2" r="3.4"></circle>
                        <circle cx="6.1" cy="18.2" r="3.4"></circle>
                    </svg>
                </sp-action-button>
            </div>
        </sp-actionbar>
    `},v=["Default"];export default{component:"sp-actionbar",title:"Actionbar"};export{m as Default,v as __namedExportsOrder};
//# sourceMappingURL=actionbar.stories-2ad05ed0.js.map
