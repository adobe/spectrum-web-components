import"./lit-element-089a5717.js";import{z as i,v as e,w as l,j as a,k as s,x as t}from"./storybook-preview-9aba481c.js";import"./tslib.es6-d9c764b6.js";import{i as r}from"./if-defined-f9b5fa5b.js";import"./focusable-f84f80fc.js";import{v as p}from"./index-fcda0df5.js";var d=()=>{var d=["",...p],o=i("Value",50,{},"Element"),n=i("Min",0,{},"Element"),m=i("Max",100,{},"Element"),x=i("Step",1,{},"Element"),v=i("Tick Step",10,{},"Element"),c=e("Label","Opacity","Element"),b=l("Tick Labels",!1,"Element"),$=a("Variant",d,d[0],"Element"),u=i=>{var e=i.target;t(i.type)(e.value)};return s`
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
    `},o=()=>{var i=e("Label","Intensity");return s`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                disabled
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="${i}"
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
    `,v=()=>{var e=i("Value",50),l=i("Min",0),a=i("Max",100),t=i("Step",1);return s`
        <div style="width: 500px; margin: 12px 20px 20px;">
            <sp-slider
                value="${e}"
                step="${t}"
                min="${l}"
                max="${a}"
                label="Opacity"
                id="opacity-slider-opacity"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px;">
            <sp-slider
                value="${e}"
                step="${t}"
                min="${l}"
                max="${a}"
                label="Lightness"
                id="opacity-slider-lightness"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px 20px 12px;">
            <sp-slider
                value="${e}"
                step="${t}"
                min="${l}"
                max="${a}"
                label="Saturation"
                id="opacity-slider-saturation"
            ></sp-slider>
        </div>
    `},c=["Default","Disabled","Color","colorWithAlpha","colorDisabled","focusTabDemo"];export default{component:"sp-slider",title:"Slider"};export{n as Color,d as Default,o as Disabled,c as __namedExportsOrder,x as colorDisabled,m as colorWithAlpha,v as focusTabDemo};
//# sourceMappingURL=slider.stories-f35bc279.js.map
