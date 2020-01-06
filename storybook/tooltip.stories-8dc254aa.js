import"./lit-html-6898710b.js";import{e as t,i as e,k as i,h as o}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-a4bc040d.js";import"./iconset-svg-cf078571.js";import"./index-1e0c2eab.js";var p=["top","bottom","left","right"],n=["","info","positive","negative"],l=["AlertSmall","CheckmarkSmall","InfoSmall"],m=()=>t`
        <sp-tooltip
            ?open=${e("Open",!0,"Element")}
            tip=${i("Tip direction",p,p[0],"Element")}
            variant=${i("Variant",n,n[0],"Element")}
        >
            ${o("Tip text","Tooltip","Element")}
        </sp-tooltip>
    `,s=()=>t`
        <sp-icons-medium></sp-icons-medium>
        <sp-tooltip
            ?open=${e("Open",!0,"Element")}
            tip=${i("Tip direction",p,p[0],"Element")}
            variant=${i("Variant",n,n[0],"Element")}
        >
            <sp-icon
                size="s"
                name="ui:${i("Icon",l,l[0],"Element")}"
                slot="icon"
            ></sp-icon>
            ${o("Tip text","Tooltip","Element")}
        </sp-tooltip>
    `;s.story={name:"w/ Icon"};export default{component:"sp-tooltip",title:"Tooltip"};export{m as Default,s as wIcon};
//# sourceMappingURL=tooltip.stories-8dc254aa.js.map
