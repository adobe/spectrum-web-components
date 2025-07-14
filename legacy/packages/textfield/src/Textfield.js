"use strict";var c=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var t=(p,a,e,n)=>{for(var r=n>1?void 0:n?m(a,e):a,u=p.length-1,h;u>=0;u--)(h=p[u])&&(r=(n?h(a,e,r):h(r))||r);return n&&r&&c(a,e,r),r};import{html as s,nothing as o,SizedMixin as v}from"@spectrum-web-components/base";import{ifDefined as l,live as y}from"@spectrum-web-components/base/src/directives.js";import{property as i,query as b,state as d}from"@spectrum-web-components/base/src/decorators.js";import{ManageHelpText as g}from"@spectrum-web-components/help-text/src/manage-help-text.js";import{Focusable as f}from"@spectrum-web-components/shared/src/focusable.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import $ from"./textfield.css.js";import E from"@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js";const S=["text","url","tel","email","password"];export class TextfieldBase extends g(v(f,{noDefaultSize:!0})){constructor(){super(...arguments);this.allowedKeys="";this.focused=!1;this.invalid=!1;this.label="";this.placeholder="";this._type="text";this.grows=!1;this.maxlength=-1;this.minlength=-1;this.multiline=!1;this.readonly=!1;this.rows=-1;this.valid=!1;this._value="";this.quiet=!1;this.required=!1}static get styles(){return[$,E]}set type(e){const n=this._type;this._type=e,this.requestUpdate("type",n)}get type(){var e;return(e=S.find(n=>n===this._type))!=null?e:"text"}set value(e){if(e===this.value)return;const n=this._value;this._value=e,this.requestUpdate("value",n)}get value(){return this._value}get focusElement(){return this.inputElement}setSelectionRange(e,n,r="none"){this.inputElement.setSelectionRange(e,n,r)}select(){this.inputElement.select()}handleInput(e){if(this.allowedKeys&&this.inputElement.value&&!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const u=this.inputElement.selectionStart-1;this.inputElement.value=this.value.toString(),this.inputElement.setSelectionRange(u,u);return}this.value=this.inputElement.value}handleChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!this.readonly&&!0}onBlur(e){this.focused=!this.readonly&&!1}handleInputElementPointerdown(){}renderStateIcons(){return this.invalid?s`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `:this.valid?s`
                <sp-icon-checkmark100
                    id="valid"
                    class="icon spectrum-UIIcon-Checkmark100"
                ></sp-icon-checkmark100>
            `:o}get displayValue(){return this.value.toString()}get renderMultiline(){return s`
            ${this.multiline&&this.grows&&this.rows===-1?s`
                      <div id="sizer" class="input" aria-hidden="true">${this.value}&#8203;
                      </div>
                  `:o}
            <!-- @ts-ignore -->
            <textarea
                name=${l(this.name||void 0)}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.appliedLabel||this.placeholder}
                aria-invalid=${l(this.invalid||void 0)}
                class="input"
                maxlength=${l(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${l(this.minlength>-1?this.minlength:void 0)}
                title=${this.invalid?"":o}
                pattern=${l(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                rows=${l(this.rows>-1?this.rows:void 0)}
                autocomplete=${l(this.autocomplete)}
            ></textarea>
        `}get renderInput(){return s`
            <!-- @ts-ignore -->
            <input
                name=${l(this.name||void 0)}
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.appliedLabel||this.placeholder}
                aria-invalid=${l(this.invalid||void 0)}
                class="input"
                title=${this.invalid?"":o}
                maxlength=${l(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${l(this.minlength>-1?this.minlength:void 0)}
                pattern=${l(this.pattern)}
                placeholder=${this.placeholder}
                .value=${y(this.displayValue)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @pointerdown=${this.handleInputElementPointerdown}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete=${l(this.autocomplete)}
            />
        `}renderField(){return s`
            ${this.renderStateIcons()}
            ${this.multiline?this.renderMultiline:this.renderInput}
        `}render(){return s`
            <div id="textfield">${this.renderField()}</div>
            ${this.renderHelpText(this.invalid)}
        `}update(e){(e.has("value")||e.has("required")&&this.required)&&this.updateComplete.then(()=>{this.checkValidity()}),super.update(e)}checkValidity(){let e=this.inputElement.checkValidity();return(this.required||this.value&&this.pattern)&&((this.disabled||this.multiline)&&this.pattern&&(e=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())),typeof this.minlength!="undefined"&&(e=e&&this.value.toString().length>=this.minlength),this.valid=e,this.invalid=!e),e}}t([d()],TextfieldBase.prototype,"appliedLabel",2),t([i({attribute:"allowed-keys"})],TextfieldBase.prototype,"allowedKeys",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"focused",2),t([b(".input:not(#sizer)")],TextfieldBase.prototype,"inputElement",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"invalid",2),t([i()],TextfieldBase.prototype,"label",2),t([i({type:String,reflect:!0})],TextfieldBase.prototype,"name",2),t([i()],TextfieldBase.prototype,"placeholder",2),t([d()],TextfieldBase.prototype,"type",1),t([i({attribute:"type",reflect:!0})],TextfieldBase.prototype,"_type",2),t([i()],TextfieldBase.prototype,"pattern",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"grows",2),t([i({type:Number})],TextfieldBase.prototype,"maxlength",2),t([i({type:Number})],TextfieldBase.prototype,"minlength",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"multiline",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"readonly",2),t([i({type:Number})],TextfieldBase.prototype,"rows",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"valid",2),t([i({type:String})],TextfieldBase.prototype,"value",1),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"quiet",2),t([i({type:Boolean,reflect:!0})],TextfieldBase.prototype,"required",2),t([i({type:String,reflect:!0})],TextfieldBase.prototype,"autocomplete",2);export class Textfield extends TextfieldBase{constructor(){super(...arguments);this._value=""}set value(e){if(e===this.value)return;const n=this._value;this._value=e,this.requestUpdate("value",n)}get value(){return this._value}}t([i({type:String})],Textfield.prototype,"value",1);
//# sourceMappingURL=Textfield.js.map
