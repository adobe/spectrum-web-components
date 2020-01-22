import"./lit-element-089a5717.js";import{k as t,w as e,j as o,v as i}from"./storybook-preview-9aba481c.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-f9b5fa5b.js";import"./iconset-svg-7745673b.js";import"./index-03bf7d38.js";var p=["top","bottom","left","right"],n=["","info","positive","negative"],l=["AlertSmall","CheckmarkSmall","InfoSmall"],s=()=>t`
        <sp-tooltip
            ?open=${e("Open",!0,"Element")}
            tip=${o("Tip direction",p,p[0],"Element")}
            variant=${o("Variant",n,n[0],"Element")}
        >
            ${i("Tip text","Tooltip","Element")}
        </sp-tooltip>
    `,m=()=>t`
        <sp-icons-medium></sp-icons-medium>
        <sp-tooltip
            ?open=${e("Open",!0,"Element")}
            tip=${o("Tip direction",p,p[0],"Element")}
            variant=${o("Variant",n,n[0],"Element")}
        >
            <sp-icon
                size="s"
                name="ui:${o("Icon",l,l[0],"Element")}"
                slot="icon"
            ></sp-icon>
            ${i("Tip text","Tooltip","Element")}
        </sp-tooltip>
    `;m.story={name:"w/ Icon"};var a=["Default","wIcon"];export default{component:"sp-tooltip",title:"Tooltip"};export{s as Default,a as __namedExportsOrder,m as wIcon};
//# sourceMappingURL=tooltip.stories-db2e82ce.js.map
