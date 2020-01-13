import"./lit-element-45614e86.js";import{z as e,u as i,v as l,x as s,j as a,w as t}from"./storybook-preview-54ad6afb.js";import"./tslib.es6-d9c764b6.js";import{i as r}from"./if-defined-b94f78ef.js";import"./focusable-03c6e0e8.js";import{v as p}from"./index-71082d44.js";var d=()=>{var d=["",...p],o=e("Value",50,{},"Element"),n=e("Min",0,{},"Element"),m=e("Max",100,{},"Element"),x=e("Step",1,{},"Element"),v=e("Tick Step",10,{},"Element"),c=i("Label","Opacity","Element"),b=l("Tick Labels",!1,"Element"),$=s("Variant",d,d[0],"Element"),u=e=>{var i=e.target;t(e.type)(i.value)};return a`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="${o}"
                step="${x}"
                tick-step="${v}"
                min="${n}"
                max="${m}"
                label="${c}"
                ?tick-labels="${b}"
                id="opacity-slider"
                variant=${r($||void 0)}
                @sp-slider:input=${u}
                @sp-slider:change=${u}
            ></sp-slider>
        </div>
    `},o=()=>{var e=i("Label","Intensity");return a`
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
    `},n=()=>a`
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
    `,m=()=>a`
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
    `,x=()=>a`
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
    `,v=()=>{var i=e("Value",50),l=e("Min",0),s=e("Max",100),t=e("Step",1);return a`
        <div style="width: 500px; margin: 12px 20px 20px;">
            <sp-slider
                value="${i}"
                step="${t}"
                min="${l}"
                max="${s}"
                label="Opacity"
                id="opacity-slider-opacity"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px;">
            <sp-slider
                value="${i}"
                step="${t}"
                min="${l}"
                max="${s}"
                label="Lightness"
                id="opacity-slider-lightness"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px 20px 12px;">
            <sp-slider
                value="${i}"
                step="${t}"
                min="${l}"
                max="${s}"
                label="Saturation"
                id="opacity-slider-saturation"
            ></sp-slider>
        </div>
    `},c=["Default","Disabled","Color","colorWithAlpha","colorDisabled","focusTabDemo"];export default{component:"sp-slider",title:"Slider"};export{n as Color,d as Default,o as Disabled,c as __namedExportsOrder,x as colorDisabled,m as colorWithAlpha,v as focusTabDemo};
//# sourceMappingURL=slider.stories-c15acf3b.js.map
