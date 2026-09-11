"use strict";var c=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var t=(o,u,e,l)=>{for(var r=l>1?void 0:l?m(u,e):u,s=o.length-1,d;s>=0;s--)(d=o[s])&&(r=(l?d(u,e,r):d(r))||r);return l&&r&&c(u,e,r),r};import{html as a,nothing as p,SizedMixin as v}from"@spectrum-web-components/base";import{property as i,query as y,state as h}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as n,live as b}from"@spectrum-web-components/base/src/directives.js";import{ManageHelpText as g}from"@spectrum-web-components/help-text/src/manage-help-text.js";import f from"@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js";import{Focusable as $}from"@spectrum-web-components/shared/src/focusable.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import E from"./textfield.css.js";import{TruncatedValueTooltipController as S}from"./TruncatedValueTooltipController.js";export{TruncatedValueTooltipController,truncatedValueTooltipUpdatedSymbol}from"./TruncatedValueTooltipController.js";const T=["text","url","tel","email","password"];export class TextfieldBase extends g(v($,{noDefaultSize:!0})){constructor(){super(...arguments);this.truncatedValueTooltipController=new S(this);this.allowedKeys="";this.focused=!1;this.invalid=!1;this.label="";this.placeholder="";this._type="text";this.grows=!1;this.maxlength=-1;this.minlength=-1;this.multiline=!1;this.readonly=!1;this.truncatedValueTooltipPlacement="bottom";this.rows=-1;this.valid=!1;this._value="";this.quiet=!1;this.required=!1}static get styles(){return[E,f]}set type(e){const l=this._type;this._type=e,this.requestUpdate("type",l)}get type(){var e;return(e=T.find(l=>l===this._type))!=null?e:"text"}set value(e){if(e===this.value)return;const l=this._value;this._value=e,this.requestUpdate("value",l)}get value(){return this._value}get focusElement(){return this.inputElement}setSelectionRange(e,l,r="none"){this.inputElement.setSelectionRange(e,l,r)}select(){this.inputElement.select()}handleInput(e){if(this.allowedKeys&&this.inputElement.value&&!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const s=this.inputElement.selectionStart-1;this.inputElement.value=this.value.toString(),this.inputElement.setSelectionRange(s,s);return}this.value=this.inputElement.value}handleChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!this.readonly&&!0}onBlur(e){this.focused=!this.readonly&&!1}handleInputElementPointerdown(){}renderStateIcons(){return this.invalid?a`
        <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
      `:this.valid?a`
        <sp-icon-checkmark100
          id="valid"
          class="icon spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>
      `:p}get displayValue(){return this.value.toString()}get renderMultiline(){return a`
            ${this.multiline&&this.grows&&this.rows===-1?a`
                      <div id="sizer" class="input" aria-hidden="true">${this.value}&#8203;
                      </div>
                  `:p}
            <!-- @ts-ignore -->
            <textarea
                name=${n(this.name||void 0)}
                aria-describedby=${this.helpTextId}
                aria-label=${n(this.label||this.appliedLabel||this.placeholder||void 0)}
                aria-invalid=${n(this.invalid||void 0)}
                class="input"
                maxlength=${n(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${n(this.minlength>-1?this.minlength:void 0)}
                title=${this.invalid?"":p}
                pattern=${n(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                rows=${n(this.rows>-1?this.rows:void 0)}
                autocomplete=${n(this.autocomplete)}
            ></textarea>
        `}get renderInput(){return a`
      <!-- @ts-ignore -->
      <input
        name=${n(this.name||void 0)}
        type=${this.type}
        aria-describedby=${this.helpTextId}
        aria-label=${n(this.label||this.appliedLabel||this.placeholder||void 0)}
        aria-invalid=${n(this.invalid||void 0)}
        class="input"
        title=${this.invalid?"":p}
        maxlength=${n(this.maxlength>-1?this.maxlength:void 0)}
        minlength=${n(this.minlength>-1?this.minlength:void 0)}
        pattern=${n(this.pattern)}
        placeholder=${this.placeholder}
        .value=${b(this.displayValue)}
        @change=${this.handleChange}
        @input=${this.handleInput}
        @pointerdown=${this.handleInputElementPointerdown}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        ?disabled=${this.disabled}
        ?required=${this.required}
        ?readonly=${this.readonly}
        autocomplete=${n(this.autocomplete)}
      />
    `}renderField(){return a`
      ${this.renderStateIcons()}
      ${this.multiline?this.renderMultiline:this.renderInput}
    `}render(){return a`
      <div id="textfield">${this.renderField()}</div>
      ${this.truncatedValueTooltipController.render()}
      ${this.renderHelpText(this.invalid)}
    `}update(e){(e.has("value")||e.has("required")&&this.required)&&this.updateComplete.then(()=>{this.checkValidity(),e.has("value")&&this.truncatedValueTooltipController.refresh()}),super.update(e),e.has("focused")&&!this.focused&&this.truncatedValueTooltipController.refresh()}checkValidity(){let e=this.inputElement.checkValidity();return(this.required||this.value&&this.pattern)&&((this.disabled||this.multiline)&&this.pattern&&(e=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())),typeof this.minlength!="undefined"&&(e=e&&this.value.toString().length>=this.minlength),this.valid=e,this.invalid=!e),e}}t([h()],TextfieldBase.prototype,"appliedLabel",2),t([i({attribute:"allowed-keys"})],TextfieldBase.prototype,"allowedKeys",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"focused",2),t([y(".input:not(#sizer)")],TextfieldBase.prototype,"inputElement",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"invalid",2),t([i()],TextfieldBase.prototype,"label",2),t([i({type:String,reflect:!0})],TextfieldBase.prototype,"name",2),t([i()],TextfieldBase.prototype,"placeholder",2),t([h()],TextfieldBase.prototype,"type",1),t([i({attribute:"type",reflect:!0})],TextfieldBase.prototype,"_type",2),t([i()],TextfieldBase.prototype,"pattern",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"grows",2),t([i({type:Number})],TextfieldBase.prototype,"maxlength",2),t([i({type:Number})],TextfieldBase.prototype,"minlength",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"multiline",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"readonly",2),t([i({attribute:"tooltip-placement"})],TextfieldBase.prototype,"truncatedValueTooltipPlacement",2),t([i({type:Number})],TextfieldBase.prototype,"rows",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"valid",2),t([i({type:String})],TextfieldBase.prototype,"value",1),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"quiet",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"required",2),t([i({type:String,reflect:!0})],TextfieldBase.prototype,"autocomplete",2);export class Textfield extends TextfieldBase{constructor(){super(...arguments);this._value=""}set value(e){if(e===this.value)return;const l=this._value;this._value=e,this.requestUpdate("value",l)}get value(){return this._value}}t([i({type:String})],Textfield.prototype,"value",1);
//# sourceMappingURL=Textfield.js.map
