import"./lit-element-45614e86.js";import{z as e,u as i,v as l,x as a,j as s,w as t}from"./storybook-preview-54ad6afb.js";import"./tslib.es6-d9c764b6.js";import{i as r}from"./if-defined-b94f78ef.js";import"./focusable-b12aa67a.js";import{v as p}from"./index-0a4961e4.js";var d=()=>{var d=["",...p],o=e("Value",50,{},"Element"),n=e("Min",0,{},"Element"),m=e("Max",100,{},"Element"),x=e("Step",1,{},"Element"),v=e("Tick Step",10,{},"Element"),b=i("Label","Opacity","Element"),c=l("Tick Labels",!1,"Element"),$=a("Variant",d,d[0],"Element"),u=e=>{var i=e.target;t(e.type)(i.value)};return s`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="${o}"
                step="${x}"
                tick-step="${v}"
                min="${n}"
                max="${m}"
                label="${b}"
                ?tick-labels="${c}"
                id="opacity-slider"
                variant=${r($||void 0)}
                @sp-slider:input=${u}
                @sp-slider:change=${u}
            ></sp-slider>
        </div>
    `},o=()=>{var e=i("Label","Intensity");return s`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                disabled
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="${e}"
            ></sp-slider>
        </div>
    `},n=()=>s`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                variant="color"
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Color"
                id="color-slider"
            ></sp-slider>
        </div>
    `,m=()=>s`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                variant="color"
                has-alpha
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Color"
                id="color-slider"
            ></sp-slider>
        </div>
    `,x=()=>s`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                variant="color"
                has-alpha
                disabled
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Color"
                id="color-slider"
            ></sp-slider>
        </div>
    `,v=()=>{var i=e("Value",50),l=e("Min",0),a=e("Max",100),t=e("Step",1);return s`
        <div style="width: 500px; margin: 12px 20px 20px;">
            <sp-slider
                value="${i}"
                step="${t}"
                min="${l}"
                max="${a}"
                label="Opacity"
                id="opacity-slider-opacity"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px;">
            <sp-slider
                value="${i}"
                step="${t}"
                min="${l}"
                max="${a}"
                label="Lightness"
                id="opacity-slider-lightness"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px 20px 12px;">
            <sp-slider
                value="${i}"
                step="${t}"
                min="${l}"
                max="${a}"
                label="Saturation"
                id="opacity-slider-saturation"
            ></sp-slider>
        </div>
    `},b=["Default","Disabled","Color","colorWithAlpha","colorDisabled","focusTabDemo"];export default{component:"sp-slider",title:"Slider"};export{n as Color,d as Default,o as Disabled,b as __namedExportsOrder,x as colorDisabled,m as colorWithAlpha,v as focusTabDemo};
//# sourceMappingURL=slider.stories-ee5b5fca.js.map
