import{h as e}from"./lit-html-6898710b.js";import{e as s,n as t}from"./index-2626287a.js";import{p as i,a as o,L as n,c as d}from"./lit-element-81619d09.js";import{_ as a}from"./tslib.es6-d9c764b6.js";import"./if-defined-a4bc040d.js";import"./iconset-svg-cf078571.js";import"./index-047233f1.js";var c=class extends n{constructor(){super(),this.name="ui",this.iconset=[],this.iconset=[],this.handleIconSetAdded=this.handleIconSetAdded.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("sp-iconset-added",this.handleIconSetAdded)}disconnectedCallback(){window.removeEventListener("sp-iconset-added",this.handleIconSetAdded),super.disconnectedCallback()}handleIconSetAdded(e){var{iconset:s}=e.detail;this.iconset=s.getIconList(),this.requestUpdate()}static get styles(){return[d`:host{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px}.icon{display:flex;flex-direction:column;align-items:center}sp-icon{margin-bottom:10px}`]}render(){return e` <slot></slot> ${this.iconset.map(s=>e` <div class="icon"> <sp-icon size="l" name="${`${this.name}:${s}`}"></sp-icon> ${s} </div> `)} `}};a([i()],c.prototype,"name",void 0),c=a([o("icons-demo")],c);var r=()=>s`
    <icons-demo style="color: ${t("Color","#000","Element")}">
        <sp-icons-medium></sp-icons-medium>
    </icons-demo>
`;r.story={name:"List - Medium"};var l=()=>s`
    <icons-demo style="color: ${t("Color","#000","Element")}">
        <sp-icons-large></sp-icons-large>
    </icons-demo>
`;l.story={name:"List - Large"};export default{title:"Icons"};export{l as listLarge,r as listMedium};
//# sourceMappingURL=icons.stories-a6b48549.js.map
