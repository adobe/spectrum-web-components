import"./lit-html-6898710b.js";import{m as i,h as e,i as l,k as s,e as a,j as t}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import{i as p}from"./if-defined-a4bc040d.js";import"./focusable-5c74bfe6.js";import{v as r}from"./index-26954003.js";var d=()=>{var d=["",...r],n=i("Value",50,{},"Element"),m=i("Min",0,{},"Element"),o=i("Max",100,{},"Element"),x=i("Step",1,{},"Element"),v=i("Tick Step",10,{},"Element"),c=e("Label","Opacity","Element"),$=l("Tick Labels",!1,"Element"),b=s("Variant",d,d[0],"Element"),u=i=>{var e=i.target;t(i.type)(e.value)};return a`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                value="${n}"
                step="${x}"
                tick-step="${v}"
                min="${m}"
                max="${o}"
                label="${c}"
                ?tick-labels="${$}"
                id="opacity-slider"
                variant=${p(b||void 0)}
                @sp-slider:input=${u}
                @sp-slider:change=${u}
            ></sp-slider>
        </div>
    `},n=()=>{var i=e("Label","Intensity");return a`
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
    `},m=()=>a`
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
    `,o=()=>a`
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
    `,v=()=>{var e=i("Value",50),l=i("Min",0),s=i("Max",100),t=i("Step",1);return a`
        <div style="width: 500px; margin: 12px 20px 20px;">
            <sp-slider
                value="${e}"
                step="${t}"
                min="${l}"
                max="${s}"
                label="Opacity"
                id="opacity-slider-opacity"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px;">
            <sp-slider
                value="${e}"
                step="${t}"
                min="${l}"
                max="${s}"
                label="Lightness"
                id="opacity-slider-lightness"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px 20px 12px;">
            <sp-slider
                value="${e}"
                step="${t}"
                min="${l}"
                max="${s}"
                label="Saturation"
                id="opacity-slider-saturation"
            ></sp-slider>
        </div>
    `};export default{component:"sp-slider",title:"Slider"};export{m as Color,d as Default,n as Disabled,x as colorDisabled,o as colorWithAlpha,v as focusTabDemo};
//# sourceMappingURL=slider.stories-9bf77689.js.map
