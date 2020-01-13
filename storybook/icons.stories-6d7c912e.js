import{p as e,a as s,L as t,c as i}from"./lit-element-45614e86.js";import{o,j as n,B as d}from"./storybook-preview-54ad6afb.js";import{_ as a}from"./tslib.es6-d9c764b6.js";import"./if-defined-b94f78ef.js";import"./iconset-svg-5d368e15.js";import"./index-d58ab459.js";var c=class extends t{constructor(){super(),this.name="ui",this.iconset=[],this.iconset=[],this.handleIconSetAdded=this.handleIconSetAdded.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("sp-iconset-added",this.handleIconSetAdded)}disconnectedCallback(){window.removeEventListener("sp-iconset-added",this.handleIconSetAdded),super.disconnectedCallback()}handleIconSetAdded(e){var{iconset:s}=e.detail;this.iconset=s.getIconList(),this.requestUpdate()}static get styles(){return[i`:host{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px}.icon{display:flex;flex-direction:column;align-items:center}sp-icon{margin-bottom:10px}`]}render(){return o` <slot></slot> ${this.iconset.map(e=>o` <div class="icon"> <sp-icon size="l" name="${`${this.name}:${e}`}"></sp-icon> ${e} </div> `)} `}};a([e()],c.prototype,"name",void 0),c=a([s("icons-demo")],c);var r=()=>n`
    <icons-demo style="color: ${d("Color","#000","Element")}">
        <sp-icons-medium></sp-icons-medium>
    </icons-demo>
`;r.story={name:"List - Medium"};var l=()=>n`
    <icons-demo style="color: ${d("Color","#000","Element")}">
        <sp-icons-large></sp-icons-large>
    </icons-demo>
`;l.story={name:"List - Large"};var m=["listMedium","listLarge"];export default{title:"Icons"};export{m as __namedExportsOrder,l as listLarge,r as listMedium};
//# sourceMappingURL=icons.stories-6d7c912e.js.map
