"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[6794],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"./packages/help-text/src/manage-help-text.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{M:function(){return ManageHelpText}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),condition_attribute_with_id_dev=__webpack_require__("./tools/base/src/condition-attribute-with-id.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js");class HelpTextManager{constructor(host,{mode:mode}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:target})=>{this.handleHelpText(target),this.handleNegativeHelpText(target)},this.host=host,this.id=`sp-help-text-${(0,random_id_dev.l)()}`,this.mode=mode}get isInternal(){return"internal"===this.mode}render(negative){return index_dev.qy`
            <div
                id=${(0,directives_dev.JR)(this.isInternal?this.id:void 0)}
                aria-live="assertive"
            >
                <slot
                    name=${negative?"negative-help-text":`pass-through-help-text-${(0,random_id_dev.l)()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const id=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=(0,condition_attribute_with_id_dev.$)(this.host,"aria-describedby",id),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),this.helpTextElement||(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(target){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const nextHelpTextElement=target.assignedElements()[0];this.helpTextElement=nextHelpTextElement,nextHelpTextElement&&(nextHelpTextElement.id||(nextHelpTextElement.id=this.id),this.addId())}handleNegativeHelpText(target){if("negative-help-text"!==target.name)return;target.assignedElements().forEach(el=>el.variant="negative")}}function ManageHelpText(constructor,{mode:mode}={mode:"internal"}){return class HelpTextElement extends constructor{constructor(){super(...arguments),this.helpTextManager=new HelpTextManager(this,{mode:mode})}get helpTextId(){return this.helpTextManager.id}renderHelpText(negative){return this.helpTextManager.render(negative)}}}},"./packages/icons-workflow/icons/sp-icon-magnify.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Magnify=__webpack_require__("./packages/icons-workflow/src/icons/Magnify.js"),Search=__webpack_require__("./packages/icons-workflow/src/icons-s2/Search.js");class IconMagnify extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,Magnify.j)({hidden:!this.label,title:this.label}):(0,Search.W)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-magnify",IconMagnify)},"./packages/icons-workflow/icons/sp-icon-open-in.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var OpenIn=__webpack_require__("./packages/icons-workflow/src/icons/OpenIn.js");class IconOpenIn extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:t=24,hidden:l=!1,title:r="Open In"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m18,15.75V4.25c0-1.24072-1.00928-2.25-2.25-2.25H4.25c-1.24072,0-2.25,1.00928-2.25,2.25v3.71777c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.71777c0-.41357.33643-.75.75-.75h11.5c.41357,0,.75.33643.75.75v11.5c0,.41357-.33643.75-.75.75h-3.81104c-.41406,0-.75.33594-.75.75s.33594.75.75.75h3.81104c1.24072,0,2.25-1.00928,2.25-2.25Z"
      fill="currentColor"
    />
    <path
      d="m11,9.75v4.24268c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-2.43213l-6.46973,6.46973c-.14648.14648-.33838.21973-.53027.21973s-.38379-.07324-.53027-.21973c-.29297-.29297-.29297-.76758,0-1.06055l6.46973-6.46973h-2.43213c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h4.24268c.41406,0,.75.33594.75.75Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,OpenIn.F)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-open-in",IconOpenIn)},"./packages/icons-workflow/src/icons-s2/Search.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{W:function(){return SearchIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const SearchIcon=({width:e=24,height:t=24,hidden:r=!1,title:l="Search"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m18.53027,17.46973l-5.08325-5.08325c.96936-1.20142,1.55298-2.72644,1.55298-4.38647,0-3.85938-3.14062-7-7-7S1,4.14062,1,8s3.14062,7,7,7c1.66003,0,3.18506-.58362,4.38647-1.55298l5.08325,5.08325c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Zm-10.53027-3.96973c-3.03223,0-5.5-2.46777-5.5-5.5s2.46777-5.5,5.5-5.5,5.5,2.46777,5.5,5.5-2.46777,5.5-5.5,5.5Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Magnify.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{j:function(){return MagnifyIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MagnifyIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Magnify"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33.173 30.215 25.4 22.443a12.826 12.826 0 1 0-2.957 2.957l7.772 7.772a2.1 2.1 0 0 0 2.958-2.958ZM6 15a9 9 0 1 1 9 9 9 9 0 0 1-9-9Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/OpenIn.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{F:function(){return OpenInIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const OpenInIcon=({width:a=24,height:e=24,hidden:t=!1,title:l="Open In"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${a}"
    height="${e}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6h24v24H19a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
    />
    <path
      d="M18.636 27.764a.784.784 0 0 0 .56.236.803.803 0 0 0 .804-.754v-10.75a.497.497 0 0 0-.496-.496H8.754a.803.803 0 0 0-.754.804.785.785 0 0 0 .235.56l3.786 3.786-9.042 9.042a1 1 0 0 0 0 1.415l1.414 1.414a1 1 0 0 0 1.414 0l9.043-9.042Z"
    />
  </svg>`},"./packages/link/sp-link.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js");var link_css=__webpack_require__("./tools/base/src/index.dev.js").AH`
            /*!
 * Copyright 2025 Adobe. All rights reserved. This file is licensed to you under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License./
 * 
 *  Override divider background color when used inside alert-dialog/
 * .divider {
 *     --spectrum-divider-background-color: var(--system-alert-dialog-divider-background-color);
 *     --spectrum-divider-background-color-static-white: var(--spectrum-alert-dialog-divider-background-color-static-white);
 *     --spectrum-divider-background-color-static-black: var(--spectrum-alert-dialog-divider-background-color-static-black);
 * }
 */
@media (forced-colors:active){:host{--highcontrast-link-text-color:LinkText}}:host([variant=secondary]) a{--mod-link-text-color:var(--mod-link-text-color-secondary-default,var(--spectrum-neutral-content-color-default));--mod-link-text-color-hover:var(--mod-link-text-color-secondary-hover,var(--spectrum-neutral-content-color-hover));--mod-link-text-color-active:var(--mod-link-text-color-secondary-active,var(--spectrum-neutral-content-color-down));--mod-link-text-color-focus:var(--mod-link-text-color-secondary-focus,var(--spectrum-neutral-content-color-key-focus))}a{background-color:initial;text-decoration-skip:objects;transition:color var(--mod-link-animation-duration,var(--spectrum-animation-duration-100))ease-in-out;cursor:pointer;color:var(--highcontrast-link-text-color,var(--mod-link-text-color,var(--mod-link-text-color-primary-default,var(--spectrum-accent-content-color-default))));outline:none;text-decoration:underline}a:active{--mod-link-text-color:var(--mod-link-text-color-active,var(--mod-link-text-color-primary-active,var(--spectrum-accent-content-color-down)))}:host([quiet]) a{text-decoration:none}a:focus-visible,:host([quiet]) a:focus-visible{--mod-link-text-color:var(--mod-link-text-color-focus,var(--mod-link-text-color-primary-focus,var(--spectrum-accent-content-color-key-focus)));text-decoration:underline double;text-decoration-color:inherit}@media (hover:hover){a:hover{--mod-link-text-color:var(--mod-link-text-color-hover,var(--mod-link-text-color-primary-hover,var(--spectrum-accent-content-color-hover)))}:host([quiet]) a:hover{text-decoration:underline}}:host([static-color=white]) a{--mod-link-text-color:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-hover:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-active:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-focus:var(--mod-link-text-color-white,var(--spectrum-white))}:host([static-color=black]) a{--mod-link-text-color:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-hover:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-active:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-focus:var(--mod-link-text-color-black,var(--spectrum-black))}:host{display:inline}:host(:focus){outline:none}:host([href]) a:focus-visible{text-decoration:underline double}:host([disabled]){pointer-events:none}
        `,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Link extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[link_css]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}__decorateClass([(0,decorators_dev.P)("#anchor")],Link.prototype,"anchorElement",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Link.prototype,"variant",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],Link.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"quiet"})],Link.prototype,"quiet",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-link",Link)},"./packages/menu/sp-menu-group.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js"),Menu_dev=__webpack_require__("./packages/menu/src/Menu.dev.js");__webpack_require__("./packages/menu/sp-menu.dev.js");var menu_group_css=index_dev.AH`
    .spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.header{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-section-header-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));min-inline-size:var(--mod-menu-section-header-min-width,var(--spectrum-menu-section-header-min-width));padding-block-start:var(--mod-menu-section-header-top-edge-to-text,var(--mod-menu-item-top-edge-to-text,var(--spectrum-menu-item-top-edge-to-text)));padding-block-end:var(--mod-menu-section-header-bottom-edge-to-text,var(--mod-menu-item-bottom-edge-to-text,var(--spectrum-menu-item-bottom-edge-to-text)));padding-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));grid-area:sectionHeadingArea/1/sectionHeadingArea/-1;display:block}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-back .header{padding:0}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-direction:column;margin:0;display:flex;overflow:visible}[hidden]{display:none!important}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class MenuGroup extends Menu_dev.W{constructor(){super(...arguments),this.headerId=""}static get styles(){return[...super.styles,menu_group_css]}get ownRole(){return"group"}get controlsRovingTabindex(){return!1}updateLabel(){const headerElement=this.headerElements.length?this.headerElements[0]:void 0;if(headerElement!==this.headerElement)if(this.headerElement&&this.headerElement.id===this.headerId&&this.headerElement.removeAttribute("id"),headerElement){this.headerId=this.headerId||`sp-menu-group-label-${(0,random_id_dev.l)()}`;const headerId=headerElement.id||this.headerId;headerElement.id||(headerElement.id=headerId),this.setAttribute("aria-labelledby",headerId)}else this.removeAttribute("aria-labelledby");this.headerElement=headerElement}render(){return index_dev.qy`
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            ${this.renderMenuItemSlot()}
        `}}__decorateClass([(0,decorators_dev.gZ)({slot:"header",flatten:!0})],MenuGroup.prototype,"headerElements",2),__decorateClass([(0,decorators_dev.wk)()],MenuGroup.prototype,"headerElement",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-group",MenuGroup)},"./packages/overlay/stories/overlay.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},WithInteractiveContent:function(){return WithInteractiveContent},__namedExportsOrder:function(){return __namedExportsOrder},accordion:function(){return accordion},clickAndHoverTarget:function(){return clickAndHoverTarget},clickAndHoverTargets:function(){return clickAndHoverTargets},clickContentClosedOnScroll:function(){return clickContentClosedOnScroll},complexModal:function(){return complexModal},customizedClickContent:function(){return customizedClickContent},deep:function(){return deep},deepChildTooltip:function(){return deepChildTooltip},deepNesting:function(){return deepNesting},definedOverlayElement:function(){return definedOverlayElement},detachedElement:function(){return detachedElement},disabledOverlayTrigger:function(){return disabledOverlayTrigger},edges:function(){return edges},hoverWithInteractiveContent:function(){return hoverWithInteractiveContent},inline:function(){return inline},longpress:function(){return longpress},modalLoose:function(){return modalLoose},modalManaged:function(){return modalManaged},modalNoFocus:function(){return modalNoFocus},modalWithinNonModal:function(){return modalWithinNonModal},noCloseOnResize:function(){return noCloseOnResize},openClickContent:function(){return openClickContent},openHoverContent:function(){return openHoverContent},pickerInDialog:function(){return pickerInDialog},replace:function(){return replace},sideHoverDraggable:function(){return sideHoverDraggable},superComplexModal:function(){return superComplexModal},triggeredByOptimization:function(){return triggeredByOptimization},updated:function(){return updated},updating:function(){return updating},virtualElement:function(){return virtualElement},virtualElementDeclaratively:function(){return virtualElementDeclaratively},virtualElementV1:function(){return virtualElementV1}});__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js");var _a,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./tools/base/src/directives.dev.js"),_spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/dialog/sp-dialog-wrapper.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-magnify.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-open-in.js"),__webpack_require__("./packages/link/sp-link.dev.js"),__webpack_require__("./packages/overlay/src/index.dev.js")),lit_html__WEBPACK_IMPORTED_MODULE_29__=(__webpack_require__("./packages/overlay/overlay-trigger.dev.js"),__webpack_require__("./packages/accordion/sp-accordion-item.dev.js"),__webpack_require__("./packages/accordion/sp-accordion.dev.js"),__webpack_require__("./packages/button-group/sp-button-group.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/menu/sp-menu-group.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/overlay/sp-overlay.dev.js"),__webpack_require__("./packages/picker/sp-picker.dev.js"),__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/radio/sp-radio-group.dev.js"),__webpack_require__("./packages/radio/sp-radio.dev.js"),__webpack_require__("./packages/slider/sp-slider.dev.js"),__webpack_require__("./tools/theme/sp-theme.dev.js"),__webpack_require__("./tools/theme/src/themes.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("../node_modules/lit-html/development/lit-html.js")),__freeze=(__webpack_require__("./packages/overlay/stories/overlay-story-components.js"),Object.freeze),__defProp=Object.defineProperty;const storyStyles=_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: var(--styled-div-background-color, blue);
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;__webpack_exports__.default={title:"Overlay",argTypes:{offset:{control:"number"},placement:{control:{type:"inline-radio",options:["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end","auto","auto-start","auto-end","none"]}},type:{control:{type:"inline-radio",options:["modal","replace","inline"]}},colorStop:{control:{type:"inline-radio",options:["light","dark"]}}},args:{placement:"bottom",offset:0,colorStop:"light"}};const template=({placement:placement,offset:offset,open:open,type:type})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        ${storyStyles}
        <overlay-trigger
            triggered-by="click hover"
            id="trigger"
            placement="${placement}"
            offset="${offset}"
            open=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_3__.JR)(open)}
            type=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_3__.JR)(type)}
        >
            <sp-button variant="primary" slot="trigger">Show Popover</sp-button>
            <sp-popover slot="click-content" placement="${placement}" tip>
                <sp-dialog no-divider>
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                        default-value="10"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger
                        id="inner-trigger"
                        placement="bottom"
                        triggered-by="click hover"
                    >
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover slot="click-content" placement="bottom" tip>
                            <sp-dialog size="s" no-divider>
                                Another Popover
                            </sp-dialog>
                        </sp-popover>

                        <sp-tooltip slot="hover-content" delayed tip="bottom">
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
            <sp-tooltip
                slot="hover-content"
                ?delayed=${"hover"!==open}
                tip="bottom"
            >
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `,extraText=_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
    <p>This is some text.</p>
    <p>This is some text.</p>
    <p>
        This is a
        <a href="#anchor">link</a>
        .
    </p>
`;function nextFrame(){return new Promise(res=>requestAnimationFrame(()=>res()))}const Default=args=>template(args),accordion=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger
            type="modal"
            placement="top-start"
            triggered-by="click"
        >
            <style>
                sp-button {
                    margin-top: 70vh;
                }
            </style>
            <sp-button variant="primary" slot="trigger">
                Open overlay w/ accordion
            </sp-button>
            <sp-popover
                slot="click-content"
                style="overflow-y: scroll;position: static;"
            >
                <sp-dialog size="s" no-divider>
                    <sp-accordion allow-multiple>
                        <sp-accordion-item label="Some things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Other things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="More things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Additional things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                    </sp-accordion>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;accordion.swc_vrt={skip:!0},accordion.parameters={chromatic:{disableSnapshot:!0}};const clickAndHoverTarget=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger type="modal" triggered-by="click hover">
            <sp-button variant="primary" slot="trigger">Button</sp-button>
            <sp-popover slot="click-content" placement="bottom" tip>
                Popover content
            </sp-popover>
            <sp-tooltip slot="hover-content" placement="right">
                Tooltip content
            </sp-tooltip>
        </overlay-trigger>
    `;clickAndHoverTarget.swc_vrt={skip:!0},clickAndHoverTarget.parameters={chromatic:{disableSnapshot:!0}};const clickAndHoverTargets=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <div>
            ${storyStyles}
            <style>
                .friendly-target {
                    padding: 4px;
                    margin: 6px;
                    border: 2px solid black;
                    border-radius: 6px;
                    cursor: default;
                }
            </style>
            <overlay-trigger placement="right" triggered-by="click">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Click me
                </div>
                <sp-tooltip slot="click-content" tip="right">
                    Ok, now hover the other trigger
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger placement="left" triggered-by="hover">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Then hover me
                </div>
                <sp-tooltip slot="hover-content" tip="right">
                    Now click my trigger -- I should stay open, but the other
                    overlay should close
                </sp-tooltip>
            </overlay-trigger>
        </div>
    `;clickAndHoverTargets.swc_vrt={skip:!0},clickAndHoverTargets.parameters={chromatic:{disableSnapshot:!0}};class ScrollForcer extends HTMLElement{constructor(){super(),this.doScroll=async()=>{var _a2;null==(_a2=this.previousElementSibling)||_a2.addEventListener("sp-opened",this.doScroll),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),document.scrollingElement&&(document.scrollingElement.scrollTop=100),await nextFrame(),await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res}),this.setup()}async setup(){var _a2,_b;await nextFrame(),await nextFrame(),null==(_a2=this.previousElementSibling)||_a2.addEventListener("sp-opened",this.doScroll),await nextFrame(),await nextFrame(),(null==(_b=this.previousElementSibling)?void 0:_b.lastElementChild).open="click"}get updateComplete(){return this.readyPromise}}customElements.define("scroll-forcer",ScrollForcer);const clickContentClosedOnScroll=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
    <div style="margin: 50vh 0 100vh;">
        ${template({...args})}
    </div>
`;clickContentClosedOnScroll.decorators=[story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            html,
            body,
            #root,
            #root-inner,
            sp-story-decorator {
                height: auto !important;
            }
        </style>
        ${story()}
        <scroll-forcer></scroll-forcer>
    `];class ComplexModalReady extends HTMLElement{constructor(){super(),this.handleTriggerOpened=async()=>{await nextFrame();const picker=document.querySelector("#test-picker");picker.addEventListener("sp-opened",this.handlePickerOpen),picker.open=!0},this.handlePickerOpen=async()=>{const picker=document.querySelector("#test-picker"),actions=[nextFrame,picker.updateComplete];picker.focus(),await Promise.all(actions),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame();document.querySelector("overlay-trigger").addEventListener("sp-opened",this.handleTriggerOpened)}get updateComplete(){return this.readyPromise}}customElements.define("complex-modal-ready",ComplexModalReady);const complexModal=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            body {
                --swc-margin-test: 10px;
                margin: var(--swc-margin-test);
            }
            sp-story-decorator::part(container) {
                min-height: calc(100vh - (2 * var(--swc-margin-test)));
                padding: 0;
                display: grid;
                place-content: center;
            }
        </style>
        <overlay-trigger type="modal" open="click" triggered-by="click">
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                footer="Content for footer"
            >
                <sp-field-label for="test-picker">
                    Selection type:
                </sp-field-label>
                <sp-picker id="test-picker">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-picker>
            </sp-dialog-wrapper>
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
        </overlay-trigger>
    `;complexModal.decorators=[story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        ${story()}
        <complex-modal-ready></complex-modal-ready>
    `];const customizedClickContent=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
    <style>
        sp-popover {
            --styled-div-background-color: var(
                --spectrum-accent-background-color-default
            );
            --mod-button-background-color-default: rebeccapurple;
        }
    </style>
    ${template({...args,open:"click"})}
`,deep=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
    <overlay-trigger triggered-by="click">
        <sp-button variant="primary" slot="trigger">
            Open popover 1 with buttons + selfmanaged Tooltips
        </sp-button>
        <sp-popover slot="click-content" placement="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom">
                        My Tooltip 1
                    </sp-tooltip>
                    A
                </sp-action-button>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom">
                        My Tooltip 1
                    </sp-tooltip>
                    B
                </sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger triggered-by="click">
        <sp-button variant="primary" slot="trigger">
            Open popover 2 with buttons without ToolTips
        </sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>X</sp-action-button>
                <sp-action-button>Y</sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`;deep.swc_vrt={skip:!0},deep.parameters={chromatic:{disableSnapshot:!0}};const deepChildTooltip=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
    <overlay-trigger triggered-by="click">
        <sp-button variant="primary" slot="trigger">Open popover</sp-button>
        <sp-popover slot="click-content" plaeemenm="bottom" tip>
            <sp-dialog no-divider>
                <p>Let us open another overlay here</p>
                <overlay-trigger triggered-by="click">
                    <sp-button variant="primary" slot="trigger">
                        Open sub popover
                    </sp-button>
                    <sp-popover slot="click-content" placement="bottom" tip>
                        <sp-dialog no-divider>
                            <p>
                                Render an action button with tooltips. Clicking
                                the action button shouldn't close everything
                            </p>
                            <sp-action-button>
                                Button with self-managed tooltip
                                <sp-tooltip self-managed placement="top">
                                    Deep Child ToolTip
                                </sp-tooltip>
                            </sp-action-button>
                            <sp-action-button>Just a button</sp-action-button>
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`,deepNesting=()=>{const color=window.__swc_hack_knobs__.defaultColor,outter="light"===color?"dark":"light";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        ${storyStyles}
        <sp-theme
            color=${outter}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
            scale=${window.__swc_hack_knobs__.defaultScale}
            dir=${window.__swc_hack_knobs__.defaultDirection}
        >
            <sp-theme
                color=${color}
                system=${window.__swc_hack_knobs__.defaultSystemVariant}
                scale=${window.__swc_hack_knobs__.defaultScale}
                dir=${window.__swc_hack_knobs__.defaultDirection}
            >
                <recursive-popover
                    tabindex=""
                    style="
                        background-color: var(--spectrum-gray-100);
                        color: var(--spectrum-gray-800);
                        padding: calc(var(--swc-scale-factor) * 22px);
                    "
                ></recursive-popover>
            </sp-theme>
        </sp-theme>
    `};class DefinedOverlayReady extends HTMLElement{constructor(){super(...arguments),this.handleTriggerOpened=async()=>{this.overlayElement.removeEventListener("sp-opened",this.handleTriggerOpened),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),this.popoverElement=document.querySelector("popover-content"),this.popoverElement&&(this.popoverElement.addEventListener("sp-opened",this.handlePopoverOpen),await nextFrame(),await nextFrame(),this.popoverElement.button.click())},this.handlePopoverOpen=async()=>{await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1)}connectedCallback(){this.ready||(this.readyPromise=new Promise(res=>{this.ready=res,this.setup()}))}async setup(){await nextFrame(),await nextFrame(),this.overlayElement=document.querySelector("overlay-trigger");const button=document.querySelector('[slot="trigger"]');this.overlayElement.addEventListener("sp-opened",this.handleTriggerOpened),await nextFrame(),await nextFrame(),button.click()}disconnectedCallback(){this.overlayElement.removeEventListener("sp-opened",this.handleTriggerOpened),this.popoverElement.removeEventListener("sp-opened",this.handlePopoverOpen)}get updateComplete(){return this.readyPromise}}customElements.define("defined-overlay-ready",DefinedOverlayReady);const definedOverlayElement=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger placement="bottom" type="modal" triggered-by="click">
            <sp-button variant="primary" slot="trigger">Open popover</sp-button>
            <sp-popover slot="click-content" placement="bottom">
                <sp-dialog no-divider>
                    <popover-content></popover-content>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;definedOverlayElement.decorators=[story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        ${story()}
        <defined-overlay-ready></defined-overlay-ready>
    `];const detachedElement=()=>{let overlay;const openDetachedOverlayContent=async({target:target})=>{if(overlay)return overlay.open=!1,void(overlay=void 0);const div=document.createElement("div");div.open=!1,div.textContent="This div is overlaid",div.setAttribute("style","\n            background-color: var(--spectrum-gray-50);\n            color: var(--spectrum-gray-800);\n            border: 1px solid;\n            padding: 2em;\n        "),overlay=await _spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__.hJ.open(div,{type:"auto",trigger:target,receivesFocus:"auto",placement:"bottom",offset:0}),overlay.addEventListener("sp-closed",()=>{overlay=void 0}),target.insertAdjacentElement("afterend",overlay)};return requestAnimationFrame(()=>{openDetachedOverlayContent({target:document.querySelector("#detached-content-trigger")})}),_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            sp-overlay div:not([placement]) {
                visibility: hidden;
            }
        </style>
        <sp-action-button
            id="detached-content-trigger"
            @click=${openDetachedOverlayContent}
        >
            <sp-icon-open-in
                slot="icon"
                label="Open in overlay"
            ></sp-icon-open-in>
        </sp-action-button>
    `},edges=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            .demo {
                position: absolute;
            }
            .top-left {
                top: 0;
                left: 0;
            }
            .top-right {
                top: 0;
                right: 0;
            }
            .bottom-right {
                bottom: 0;
                right: 0;
            }
            .bottom-left {
                bottom: 0;
                left: 0;
            }
        </style>
        <overlay-trigger
            class="demo top-left"
            placement="bottom"
            triggered-by="hover"
        >
            <sp-button slot="trigger">
                Top/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger
            class="demo top-right"
            placement="bottom"
            triggered-by="hover"
        >
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger
            class="demo bottom-left"
            placement="top"
            triggered-by="hover"
        >
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger
            placement="top"
            class="demo bottom-right"
            triggered-by="hover"
        >
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `,inline=()=>{const closeEvent=new Event("close",{bubbles:!0,composed:!0});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger type="inline" triggered-by="click">
            <sp-button slot="trigger">Open</sp-button>
            <sp-popover slot="click-content">
                <sp-button
                    @click=${event=>{event.target.dispatchEvent(closeEvent)}}
                >
                    Close
                </sp-button>
            </sp-popover>
        </overlay-trigger>
        ${extraText}
    `},longpress=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger triggered-by="longpress" placement="right-start">
            <sp-action-button slot="trigger" hold-affordance>
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-tooltip slot="hover-content">Search real hard...</sp-tooltip>
            <sp-popover slot="longpress-content" tip>
                <sp-action-group
                    @change=${event=>event.target.dispatchEvent(new Event("close",{bubbles:!0}))}
                    selects="single"
                    vertical
                    style="margin: calc(var(--spectrum-actiongroup-button-gap-y,calc(var(--swc-scale-factor) * 10px)) / 2);"
                >
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </overlay-trigger>
    `,modalLoose=()=>{const closeEvent=new Event("close",{bubbles:!0,composed:!0});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger type="modal" triggered-by="click">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog
                size="s"
                dismissable
                slot="click-content"
                @closed=${event=>event.target.dispatchEvent(closeEvent)}
            >
                <h2 slot="heading">Loose Dialog</h2>
                <p>
                    The
                    <code>sp-dialog</code>
                    element is not "meant" to be a modal alone. In that way it
                    does not manage its own
                    <code>open</code>
                    attribute or outline when it should have
                    <code>pointer-events: auto</code>
                    . It's a part of this test suite to prove that content in
                    this way can be used in an
                    <code>overlay-trigger</code>
                    element.
                </p>
            </sp-dialog>
        </overlay-trigger>
        ${extraText}
    `},modalNoFocus=()=>{const closeEvent=new Event("close",{bubbles:!0,composed:!0});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger
            type="modal"
            receives-focus="false"
            triggered-by="click"
        >
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog-wrapper
                underlay
                slot="click-content"
                headline="Wrapped Dialog w/ Hero Image"
                size="s"
            >
                <p>
                    The
                    <code>sp-dialog-wrapper</code>
                    element has been prepared for use in an
                    <code>overlay-trigger</code>
                    element by it's combination of modal, underlay, etc. styles
                    and features.
                </p>
                <sp-button-group style="margin-inline-start: auto">
                    <sp-button
                        data-test-id="dialog-cancel-btn"
                        variant="secondary"
                        treatment="outline"
                        size="l"
                        @click=${event=>event.target.dispatchEvent(closeEvent)}
                    >
                        ${"Cancel"}
                    </sp-button>
                    <sp-button
                        data-test-id="dialog-override-btn"
                        variant="negative"
                        size="l"
                        @click=${event=>event.target.dispatchEvent(closeEvent)}
                    >
                        ${"Override"}
                    </sp-button>
                </sp-button-group>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `},modalManaged=()=>{const closeEvent=new Event("close",{bubbles:!0,composed:!0});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger type="modal" triggered-by="click">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog-wrapper
                underlay
                slot="click-content"
                headline="Wrapped Dialog w/ Hero Image"
                confirm-label="Keep Both"
                secondary-label="Replace"
                cancel-label="Cancel"
                footer="Content for footer"
                @confirm=${event=>{event.target.dispatchEvent(closeEvent)}}
                @secondary=${event=>{event.target.dispatchEvent(closeEvent)}}
                @cancel=${event=>{event.target.dispatchEvent(closeEvent)}}
            >
                <p>
                    The
                    <code>sp-dialog-wrapper</code>
                    element has been prepared for use in an
                    <code>overlay-trigger</code>
                    element by it's combination of modal, underlay, etc. styles
                    and features.
                </p>
            </sp-dialog-wrapper>
        </overlay-trigger>
        ${extraText}
    `},modalWithinNonModal=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger type="inline" triggered-by="click">
            <sp-button variant="primary" slot="trigger">
                Open inline overlay
            </sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s" no-divider>
                    <overlay-trigger type="modal" triggered-by="click">
                        <sp-button variant="primary" slot="trigger">
                            Open modal overlay
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog size="s" no-divider>
                                Modal overlay
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `,noCloseOnResize=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
    <style>
        sp-button:hover {
            border: 10px solid;
            width: 100px;
        }
    </style>
    ${template({...args,open:"click"})}
`;noCloseOnResize.swc_vrt={skip:!0},noCloseOnResize.parameters={chromatic:{disableSnapshot:!0}};const openClickContent=args=>template({...args,open:"click"}),openHoverContent=args=>template({...args,open:"hover"}),replace=()=>{const closeEvent=new Event("close",{bubbles:!0,composed:!0});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger type="replace" triggered-by="click">
            <sp-button slot="trigger">Open</sp-button>
            <sp-popover slot="click-content">
                <sp-button
                    @click=${event=>{event.target.dispatchEvent(closeEvent)}}
                >
                    Close
                </sp-button>
            </sp-popover>
        </overlay-trigger>
        ${extraText}
    `},sideHoverDraggable=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        ${storyStyles}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger placement="right" triggered-by="hover">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed tip="right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus egestas sed enim sed condimentum. Nunc facilisis
                    scelerisque massa sed luctus. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Suspendisse sagittis sodales purus vitae ultricies. Integer
                    at dui sem. Sed quam tortor, ornare in nisi et, rhoncus
                    lacinia mauris. Sed vel rutrum mauris, ac pellentesque nibh.
                    Sed feugiat semper libero, sit amet vehicula orci fermentum
                    id. Vivamus imperdiet egestas luctus. Mauris tincidunt
                    malesuada ante, faucibus viverra nunc blandit a. Fusce et
                    nisl nisi. Aenean dictum quam id mollis faucibus. Nulla a
                    ultricies dui. In hac habitasse platea dictumst. Curabitur
                    gravida lobortis vestibulum.
                </sp-tooltip>
            </overlay-trigger>
        </overlay-drag>
    `,superComplexModal=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger type="modal" triggered-by="click">
            <sp-button slot="trigger" variant="accent">Toggle Dialog</sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s">
                    <overlay-trigger triggered-by="click">
                        <sp-button slot="trigger" variant="primary">
                            Toggle Dialog
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog size="s" no-divider>
                                <overlay-trigger
                                    type="modal"
                                    triggered-by="click"
                                >
                                    <sp-button
                                        slot="trigger"
                                        variant="secondary"
                                    >
                                        Toggle Dialog
                                    </sp-button>
                                    <sp-popover slot="click-content">
                                        <sp-dialog size="s" no-divider>
                                            <p>
                                                When you get this deep, this
                                                ActiveOverlay should be the only
                                                one in [slot="open"].
                                            </p>
                                            <p>
                                                All of the rest of the
                                                ActiveOverlay elements should
                                                have had their [slot] attribute
                                                removed.
                                            </p>
                                            <p>
                                                Closing this ActiveOverlay
                                                should replace them...
                                            </p>
                                        </sp-dialog>
                                    </sp-popover>
                                </overlay-trigger>
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `,updated=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        ${storyStyles}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger
                class="demo top-left"
                placement="bottom"
                triggered-by="hover"
            >
                <overlay-target-icon
                    slot="trigger"
                    style="translate(400px, 300px)"
                ></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed tip="bottom">
                    Click to open popover
                </sp-tooltip>
                <sp-popover slot="click-content" placement="bottom" tip>
                    <sp-dialog size="s" no-divider>
                        <sp-slider
                            value="5"
                            step="0.5"
                            min="0"
                            max="20"
                            label="Awesomeness"
                        ></sp-slider>
                        <div id="styled-div">
                            The background of this div should be blue
                        </div>
                        <overlay-trigger
                            id="inner-trigger"
                            placement="bottom"
                            triggered-by="click hover"
                        >
                            <sp-button slot="trigger">Press Me</sp-button>
                            <sp-popover
                                slot="click-content"
                                placement="bottom"
                                tip
                            >
                                <sp-dialog size="s" no-divider>
                                    Another Popover
                                </sp-dialog>
                            </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        </overlay-drag>
    `,updating=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <overlay-trigger triggered-by="click">
            <sp-button variant="primary" slot="trigger">
                Open inline overlay
            </sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s" no-divider>
                    <sp-button variant="primary" @click=${()=>{const button=document.querySelector('[slot="trigger"]');button.style.left=`${Math.floor(200*Math.random())}px`,button.style.top=`${Math.floor(200*Math.random())}px`,button.style.position="fixed"}}>
                        Update trigger location.
                    </sp-button>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;updating.swc_vrt={skip:!0},updating.parameters={chromatic:{disableSnapshot:!0}};class StartEndContextmenu extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n            <style>\n                :host {\n                    display: flex;\n                    align-items: stretch;\n                }\n                div {\n                    width: 50%;\n                    height: 100%;\n                }\n            </style>\n            <div id="start"></div>\n            <div id="end"></div>\n        '}}customElements.define("start-end-contextmenu",StartEndContextmenu);const virtualElementV1=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{capture:!0,handleEvent:async event=>{event.preventDefault(),event.stopPropagation();const source=event.composedPath()[0],{id:id}=source,trigger=event.target,virtualTrigger=new _spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__.ec(event.clientX,event.clientY),fragment=document.createDocumentFragment();(0,lit_html__WEBPACK_IMPORTED_MODULE_29__.XX)(((kind="")=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <sp-popover
            style="width:300px;"
            @click=${event=>{var _a2;"sp-menu-item"===event.target.localName&&(null==(_a2=event.target)||_a2.dispatchEvent(new Event("close",{bubbles:!0})))}}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `)(id),fragment);const popover=fragment.querySelector("sp-popover");(0,_spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__.F9)(trigger,"click",popover,{placement:args.placement,receivesFocus:"auto",virtualTrigger:virtualTrigger,offset:0,notImmediatelyClosable:!0})}}}
        ></start-end-contextmenu>
    `;virtualElementV1.args={placement:"right-start"};const virtualElement=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{capture:!0,handleEvent:async event=>{event.preventDefault(),event.stopPropagation();const source=event.composedPath()[0],{id:id}=source,trigger=event.target,virtualTrigger=new _spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__.ec(event.clientX,event.clientY),fragment=document.createDocumentFragment();(0,lit_html__WEBPACK_IMPORTED_MODULE_29__.XX)(((kind="")=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <sp-popover
            style="width:300px;"
            @click=${event=>{var _a2;"sp-menu-item"===event.target.localName&&(null==(_a2=event.target)||_a2.dispatchEvent(new Event("close",{bubbles:!0})))}}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `)(id),fragment);const popover=fragment.querySelector("sp-popover"),overlay=await(0,_spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__.F9)(popover,{trigger:virtualTrigger,placement:args.placement,offset:0,notImmediatelyClosable:!0,type:"auto"});trigger.insertAdjacentElement("afterend",overlay)}}}
        ></start-end-contextmenu>
    `;virtualElement.args={placement:"right-start"};const virtualElementDeclaratively=args=>{const overlay=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <sp-overlay
            offset="0"
            type="auto"
            placement=${args.placement}
            .triggerElement=${new _spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__.ec(0,0)}
        >
            <sp-popover
                style="width:300px;"
                @change=${event=>{var _a2;null==(_a2=event.target)||_a2.dispatchEvent(new Event("close",{bubbles:!0}))}}
            >
                <sp-menu>
                    <sp-menu-group>
                        <span slot="header">Menu</span>
                        <sp-menu-item>Deselect</sp-menu-item>
                        <sp-menu-item>Select inverse</sp-menu-item>
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and mask...</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Save selection</sp-menu-item>
                        <sp-menu-item disabled>Make work path</sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        </sp-overlay>
    `;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <div
            class="app-root"
            @contextmenu=${{capture:!0,handleEvent:async event=>{event.preventDefault(),event.stopPropagation();const overlay2=document.querySelector("sp-overlay:not([open])");overlay2.triggerElement instanceof _spectrum_web_components_overlay__WEBPACK_IMPORTED_MODULE_11__.ec&&overlay2.triggerElement.updateBoundingClientRect(event.clientX,event.clientY),overlay2.willPreventClose=!0,overlay2.open=!0}}}
        >
            ${overlay()} ${overlay()}
        </div>
    `};virtualElementDeclaratively.args={placement:"right-start"},virtualElementDeclaratively.swc_vrt={skip:!0},virtualElementDeclaratively.parameters={chromatic:{disableSnapshot:!0}};const triggeredByOptimization=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <h2>"triggered-by" attribute optimization</h2>
        <p>
            This demo shows different ways to trigger overlays using the
            <code>triggered-by</code>
            attribute.
        </p>
        <p>
            <strong>Pro tip:</strong>
            Inspect the DOM to verify that only the respective overlay elements
            are being rendered into the DOM based on the
            <code>triggered-by</code>
            value.
        </p>
        <p>
            Unused interaction types aren't rendered. This improves performance,
            reduces the number of unecessary DOM nodes and avoids race
            conditions in slot reparenting.
        </p>
        <div style="display: flex; gap: 20px; flex-direction: column;">
            <!-- Click and hover only -->
            <overlay-trigger triggered-by="click hover">
                <sp-button slot="trigger">Click and hover trigger</sp-button>
                <sp-popover slot="click-content" direction="right" tip>
                    <sp-dialog size="s" no-divider>Click content</sp-dialog>
                </sp-popover>
                <sp-tooltip slot="hover-content">Hover content</sp-tooltip>
            </overlay-trigger>

            <!-- Longpress only -->
            <overlay-trigger triggered-by="longpress">
                <sp-button slot="trigger">Longpress trigger</sp-button>
                <sp-popover slot="longpress-content" direction="right" tip>
                    <sp-dialog size="s" no-divider>Longpress content</sp-dialog>
                </sp-popover>
                <div slot="longpress-describedby-descriptor">
                    Press and hold to reveal more options
                </div>
            </overlay-trigger>

            <!-- Click only -->
            <overlay-trigger triggered-by="click">
                <sp-button slot="trigger">Click only trigger</sp-button>
                <sp-popover slot="click-content" direction="right" tip>
                    <sp-dialog size="s" no-divider>Click content</sp-dialog>
                </sp-popover>
            </overlay-trigger>

            <!-- Hover only -->
            <overlay-trigger triggered-by="hover">
                <sp-button slot="trigger">Hover only trigger</sp-button>
                <sp-tooltip slot="hover-content">Hover content</sp-tooltip>
            </overlay-trigger>
        </div>
    `,hoverWithInteractiveContent=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <div
            style="display: flex; gap: 20px; flex-direction: column; padding: 40px;"
        >
            <!-- Hover with interactive buttons -->
            <overlay-trigger triggered-by="hover" placement="right">
                <sp-button slot="trigger">
                    Hover for interactive buttons
                </sp-button>
                <sp-popover slot="hover-content" tip>
                    <sp-dialog size="s" no-divider>
                        <h3 style="margin-top: 0;">Interactive content</h3>
                        <p>Tab into these buttons:</p>
                        <div
                            style="display: flex; gap: 8px; flex-direction: column;"
                        >
                            <sp-button>Action 1</sp-button>
                            <sp-button>Action 2</sp-button>
                            <sp-button>Action 3</sp-button>
                        </div>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>

            <!-- Hover with links -->
            <overlay-trigger triggered-by="hover" placement="right">
                <sp-button slot="trigger">
                    Hover for interactive links
                </sp-button>
                <sp-popover slot="hover-content" tip>
                    <sp-dialog size="s" no-divider>
                        <h3 style="margin-top: 0;">Quick links</h3>
                        <ul>
                            <li>
                                <sp-link href="#example1">
                                    Example link 1
                                </sp-link>
                            </li>
                            <li>
                                <sp-link href="#example2">
                                    Example link 2
                                </sp-link>
                            </li>
                            <li>
                                <sp-link href="#example3">
                                    Example link 3
                                </sp-link>
                            </li>
                        </ul>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>

            <!-- Hover with action group (like Arrange icon example) -->
            <overlay-trigger triggered-by="hover" placement="right">
                <sp-button slot="trigger">Hover for action group</sp-button>
                <sp-popover slot="hover-content" tip>
                    <sp-action-group
                        selects="single"
                        vertical
                        style="margin: var(--spectrum-spacing-200);"
                    >
                        <sp-action-button>
                            <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            Send to Front
                        </sp-action-button>
                        <sp-action-button>
                            <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            Send to Back
                        </sp-action-button>
                        <sp-action-button>
                            <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            Align Center
                        </sp-action-button>
                    </sp-action-group>
                </sp-popover>
            </overlay-trigger>
        </div>
    `;hoverWithInteractiveContent.swc_vrt={skip:!0};const pickerInDialog=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <sp-button variant="primary" id="mybutton">Button popover</sp-button>
        <sp-overlay trigger="mybutton@click" type="modal" placement="bottom">
            <sp-popover tip>
                <sp-dialog no-divider>
                    <sp-field-label for="picker-value">
                        Open picker, then try clicking outside to close it:
                    </sp-field-label>
                    <sp-picker
                        label="Select a Country with a very long label, too long in fact"
                        value="item-2"
                        id="picker-value"
                    >
                        <sp-menu-item value="item-1">Deselect</sp-menu-item>
                        <sp-menu-item value="item-2">
                            Select inverse
                        </sp-menu-item>
                        <sp-menu-item value="item-3">Feather...</sp-menu-item>
                        <sp-menu-item value="item-4">
                            Select and mask...
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item value="item-5">
                            Save selection
                        </sp-menu-item>
                        <sp-menu-item disabled value="item-6">
                            Make work path
                        </sp-menu-item>
                    </sp-picker>
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    `;pickerInDialog.swc_vrt={skip:!0},pickerInDialog.args={chromatic:{disableSnapshot:!0}};const disabledOverlayTrigger=()=>{return(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy)(_a||(_a=__freeze(__defProp(cooked=["\n        ",'\n        <h2>Disabled Overlay Trigger</h2>\n        <p>This demonstrates how disabled overlay-triggers should work:</p>\n        <ul>\n            <li>\n                The overlay (tooltip/popover) functionality should be disabled\n            </li>\n            <li>But the trigger content itself should remain interactive</li>\n        </ul>\n\n        <div style="display: flex; gap: 24px; margin: 24px 0;">\n            \x3c!-- Disabled overlay-trigger with interactive content --\x3e\n            <div>\n                <h3>Disabled overlay-trigger</h3>\n                <overlay-trigger triggered-by="click hover" disabled>\n                    <div\n                        slot="trigger"\n                        style="padding: 8px; border: 1px solid #ccc;"\n                    >\n                        <p>This container has a disabled overlay-trigger</p>\n                        <sp-button variant="primary" id="test-button-disabled">\n                            This button should still be clickable\n                        </sp-button>\n                    </div>\n                    <sp-tooltip slot="hover-content">\n                        This tooltip should not appear (disabled)\n                    </sp-tooltip>\n                    <sp-popover slot="click-content" placement="bottom" tip>\n                        <sp-dialog size="s" no-divider>\n                            This popover should not appear (disabled)\n                        </sp-dialog>\n                    </sp-popover>\n                </overlay-trigger>\n                <p id="disabled-click-indicator">Button not clicked yet</p>\n            </div>\n\n            \x3c!-- Regular overlay-trigger for comparison --\x3e\n            <div>\n                <h3>Regular overlay-trigger (for comparison)</h3>\n                <overlay-trigger triggered-by="click hover">\n                    <div\n                        slot="trigger"\n                        style="padding: 8px; border: 1px solid #ccc;"\n                    >\n                        <p>This container has a regular overlay-trigger</p>\n                        <sp-button variant="primary" id="test-button-enabled">\n                            This button should be clickable\n                        </sp-button>\n                    </div>\n                    <sp-tooltip slot="hover-content">\n                        This tooltip should appear on hover\n                    </sp-tooltip>\n                    <sp-popover slot="click-content" placement="bottom" tip>\n                        <sp-dialog size="s" no-divider>\n                            This popover should appear on click\n                        </sp-dialog>\n                    </sp-popover>\n                </overlay-trigger>\n                <p id="enabled-click-indicator">Button not clicked yet</p>\n            </div>\n        </div>\n\n        <script>\n            // Add click handlers to demonstrate button interactivity\n            setTimeout(() => {\n                const disabledButton = document.getElementById(\n                    \'test-button-disabled\'\n                );\n                const enabledButton = document.getElementById(\n                    \'test-button-enabled\'\n                );\n                const disabledIndicator = document.getElementById(\n                    \'disabled-click-indicator\'\n                );\n                const enabledIndicator = document.getElementById(\n                    \'enabled-click-indicator\'\n                );\n\n                if (disabledButton) {\n                    disabledButton.addEventListener(\'click\', () => {\n                        disabledIndicator.textContent =\n                            \'Button was clicked! ✅\';\n                        disabledIndicator.style.color = \'green\';\n                    });\n                }\n\n                if (enabledButton) {\n                    enabledButton.addEventListener(\'click\', () => {\n                        enabledIndicator.textContent = \'Button was clicked! ✅\';\n                        enabledIndicator.style.color = \'green\';\n                    });\n                }\n            }, 100);\n        <\/script>\n    '],"raw",{value:__freeze(raw||cooked.slice())}))),storyStyles);var cooked,raw};disabledOverlayTrigger.swc_vrt={skip:!0};const WithInteractiveContent=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_2__.qy`
        <div>
            <sp-button id="trigger">Open Overlay</sp-button>
            <sp-overlay trigger="trigger@click" type="auto" placement="bottom">
                <sp-popover dialog>
                    <p>
                        My slider in overlay element:
                        <sp-slider
                            label="Slider Label - Editable"
                            editable
                        ></sp-slider>
                    </p>
                </sp-popover>
            </sp-overlay>
        </div>
    `,__namedExportsOrder=["Default","accordion","clickAndHoverTarget","clickAndHoverTargets","clickContentClosedOnScroll","complexModal","customizedClickContent","deep","deepChildTooltip","deepNesting","definedOverlayElement","detachedElement","edges","inline","longpress","modalLoose","modalNoFocus","modalManaged","modalWithinNonModal","noCloseOnResize","openClickContent","openHoverContent","replace","sideHoverDraggable","superComplexModal","updated","updating","virtualElementV1","virtualElement","virtualElementDeclaratively","triggeredByOptimization","hoverWithInteractiveContent","pickerInDialog","disabledOverlayTrigger","WithInteractiveContent"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => template(args)",...Default.parameters?.docs?.source}}},accordion.parameters={...accordion.parameters,docs:{...accordion.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <overlay-trigger\n            type="modal"\n            placement="top-start"\n            triggered-by="click"\n        >\n            <style>\n                sp-button {\n                    margin-top: 70vh;\n                }\n            </style>\n            <sp-button variant="primary" slot="trigger">\n                Open overlay w/ accordion\n            </sp-button>\n            <sp-popover\n                slot="click-content"\n                style="overflow-y: scroll;position: static;"\n            >\n                <sp-dialog size="s" no-divider>\n                    <sp-accordion allow-multiple>\n                        <sp-accordion-item label="Some things">\n                            <p>\n                                Thing\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                more things\n                            </p>\n                        </sp-accordion-item>\n                        <sp-accordion-item label="Other things">\n                            <p>\n                                Thing\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                more things\n                            </p>\n                        </sp-accordion-item>\n                        <sp-accordion-item label="More things">\n                            <p>\n                                Thing\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                more things\n                            </p>\n                        </sp-accordion-item>\n                        <sp-accordion-item label="Additional things">\n                            <p>\n                                Thing\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                <br />\n                                more things\n                            </p>\n                        </sp-accordion-item>\n                    </sp-accordion>\n                </sp-dialog>\n            </sp-popover>\n        </overlay-trigger>\n    `;\n}',...accordion.parameters?.docs?.source}}},clickAndHoverTarget.parameters={...clickAndHoverTarget.parameters,docs:{...clickAndHoverTarget.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <overlay-trigger type="modal" triggered-by="click hover">\n            <sp-button variant="primary" slot="trigger">Button</sp-button>\n            <sp-popover slot="click-content" placement="bottom" tip>\n                Popover content\n            </sp-popover>\n            <sp-tooltip slot="hover-content" placement="right">\n                Tooltip content\n            </sp-tooltip>\n        </overlay-trigger>\n    `;\n}',...clickAndHoverTarget.parameters?.docs?.source}}},clickAndHoverTargets.parameters={...clickAndHoverTargets.parameters,docs:{...clickAndHoverTargets.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div>\n            ${storyStyles}\n            <style>\n                .friendly-target {\n                    padding: 4px;\n                    margin: 6px;\n                    border: 2px solid black;\n                    border-radius: 6px;\n                    cursor: default;\n                }\n            </style>\n            <overlay-trigger placement="right" triggered-by="click">\n                <div class="friendly-target" slot="trigger" tabindex="0">\n                    Click me\n                </div>\n                <sp-tooltip slot="click-content" tip="right">\n                    Ok, now hover the other trigger\n                </sp-tooltip>\n            </overlay-trigger>\n            <overlay-trigger placement="left" triggered-by="hover">\n                <div class="friendly-target" slot="trigger" tabindex="0">\n                    Then hover me\n                </div>\n                <sp-tooltip slot="hover-content" tip="right">\n                    Now click my trigger -- I should stay open, but the other\n                    overlay should close\n                </sp-tooltip>\n            </overlay-trigger>\n        </div>\n    `;\n}',...clickAndHoverTargets.parameters?.docs?.source}}},clickContentClosedOnScroll.parameters={...clickContentClosedOnScroll.parameters,docs:{...clickContentClosedOnScroll.parameters?.docs,source:{originalSource:'args => html`\n    <div style="margin: 50vh 0 100vh;">\n        ${template({\n  ...args\n})}\n    </div>\n`',...clickContentClosedOnScroll.parameters?.docs?.source}}},complexModal.parameters={...complexModal.parameters,docs:{...complexModal.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <style>\n            body {\n                --swc-margin-test: 10px;\n                margin: var(--swc-margin-test);\n            }\n            sp-story-decorator::part(container) {\n                min-height: calc(100vh - (2 * var(--swc-margin-test)));\n                padding: 0;\n                display: grid;\n                place-content: center;\n            }\n        </style>\n        <overlay-trigger type="modal" open="click" triggered-by="click">\n            <sp-dialog-wrapper\n                slot="click-content"\n                headline="Dialog title"\n                dismissable\n                underlay\n                footer="Content for footer"\n            >\n                <sp-field-label for="test-picker">\n                    Selection type:\n                </sp-field-label>\n                <sp-picker id="test-picker">\n                    <sp-menu-item>Deselect</sp-menu-item>\n                    <sp-menu-item>Select inverse</sp-menu-item>\n                    <sp-menu-item>Feather...</sp-menu-item>\n                    <sp-menu-item>Select and mask...</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Save selection</sp-menu-item>\n                    <sp-menu-item disabled>Make work path</sp-menu-item>\n                </sp-picker>\n            </sp-dialog-wrapper>\n            <sp-button slot="trigger" variant="primary">\n                Toggle Dialog\n            </sp-button>\n        </overlay-trigger>\n    `;\n}',...complexModal.parameters?.docs?.source}}},customizedClickContent.parameters={...customizedClickContent.parameters,docs:{...customizedClickContent.parameters?.docs,source:{originalSource:'args => html`\n    <style>\n        sp-popover {\n            --styled-div-background-color: var(\n                --spectrum-accent-background-color-default\n            );\n            --mod-button-background-color-default: rebeccapurple;\n        }\n    </style>\n    ${template({\n  ...args,\n  open: "click"\n})}\n`',...customizedClickContent.parameters?.docs?.source}}},deep.parameters={...deep.parameters,docs:{...deep.parameters?.docs,source:{originalSource:'() => html`\n    <overlay-trigger triggered-by="click">\n        <sp-button variant="primary" slot="trigger">\n            Open popover 1 with buttons + selfmanaged Tooltips\n        </sp-button>\n        <sp-popover slot="click-content" placement="bottom" tip>\n            <sp-dialog size="s" no-divider>\n                <sp-action-button>\n                    <sp-tooltip self-managed placement="bottom">\n                        My Tooltip 1\n                    </sp-tooltip>\n                    A\n                </sp-action-button>\n                <sp-action-button>\n                    <sp-tooltip self-managed placement="bottom">\n                        My Tooltip 1\n                    </sp-tooltip>\n                    B\n                </sp-action-button>\n            </sp-dialog>\n        </sp-popover>\n    </overlay-trigger>\n\n    <overlay-trigger triggered-by="click">\n        <sp-button variant="primary" slot="trigger">\n            Open popover 2 with buttons without ToolTips\n        </sp-button>\n        <sp-popover slot="click-content" direction="bottom" tip>\n            <sp-dialog size="s" no-divider>\n                <sp-action-button>X</sp-action-button>\n                <sp-action-button>Y</sp-action-button>\n            </sp-dialog>\n        </sp-popover>\n    </overlay-trigger>\n`',...deep.parameters?.docs?.source}}},deepChildTooltip.parameters={...deepChildTooltip.parameters,docs:{...deepChildTooltip.parameters?.docs,source:{originalSource:'() => html`\n    <overlay-trigger triggered-by="click">\n        <sp-button variant="primary" slot="trigger">Open popover</sp-button>\n        <sp-popover slot="click-content" plaeemenm="bottom" tip>\n            <sp-dialog no-divider>\n                <p>Let us open another overlay here</p>\n                <overlay-trigger triggered-by="click">\n                    <sp-button variant="primary" slot="trigger">\n                        Open sub popover\n                    </sp-button>\n                    <sp-popover slot="click-content" placement="bottom" tip>\n                        <sp-dialog no-divider>\n                            <p>\n                                Render an action button with tooltips. Clicking\n                                the action button shouldn\'t close everything\n                            </p>\n                            <sp-action-button>\n                                Button with self-managed tooltip\n                                <sp-tooltip self-managed placement="top">\n                                    Deep Child ToolTip\n                                </sp-tooltip>\n                            </sp-action-button>\n                            <sp-action-button>Just a button</sp-action-button>\n                        </sp-dialog>\n                    </sp-popover>\n                </overlay-trigger>\n            </sp-dialog>\n        </sp-popover>\n    </overlay-trigger>\n`',...deepChildTooltip.parameters?.docs?.source}}},deepNesting.parameters={...deepNesting.parameters,docs:{...deepNesting.parameters?.docs,source:{originalSource:'() => {\n  const color = window.__swc_hack_knobs__.defaultColor;\n  const outter = color === "light" ? "dark" : "light";\n  return html`\n        ${storyStyles}\n        <sp-theme\n            color=${outter}\n            system=${window.__swc_hack_knobs__.defaultSystemVariant}\n            scale=${window.__swc_hack_knobs__.defaultScale}\n            dir=${window.__swc_hack_knobs__.defaultDirection}\n        >\n            <sp-theme\n                color=${color}\n                system=${window.__swc_hack_knobs__.defaultSystemVariant}\n                scale=${window.__swc_hack_knobs__.defaultScale}\n                dir=${window.__swc_hack_knobs__.defaultDirection}\n            >\n                <recursive-popover\n                    tabindex=""\n                    style="\n                        background-color: var(--spectrum-gray-100);\n                        color: var(--spectrum-gray-800);\n                        padding: calc(var(--swc-scale-factor) * 22px);\n                    "\n                ></recursive-popover>\n            </sp-theme>\n        </sp-theme>\n    `;\n}',...deepNesting.parameters?.docs?.source}}},definedOverlayElement.parameters={...definedOverlayElement.parameters,docs:{...definedOverlayElement.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <overlay-trigger placement="bottom" type="modal" triggered-by="click">\n            <sp-button variant="primary" slot="trigger">Open popover</sp-button>\n            <sp-popover slot="click-content" placement="bottom">\n                <sp-dialog no-divider>\n                    <popover-content></popover-content>\n                </sp-dialog>\n            </sp-popover>\n        </overlay-trigger>\n    `;\n}',...definedOverlayElement.parameters?.docs?.source}}},detachedElement.parameters={...detachedElement.parameters,docs:{...detachedElement.parameters?.docs,source:{originalSource:'() => {\n  let overlay;\n  const openDetachedOverlayContent = async ({\n    target\n  }) => {\n    if (overlay) {\n      overlay.open = false;\n      overlay = void 0;\n      return;\n    }\n    const div = document.createElement("div");\n    div.open = false;\n    div.textContent = "This div is overlaid";\n    div.setAttribute("style", `\n            background-color: var(--spectrum-gray-50);\n            color: var(--spectrum-gray-800);\n            border: 1px solid;\n            padding: 2em;\n        `);\n    overlay = await Overlay.open(div, {\n      type: "auto",\n      trigger: target,\n      receivesFocus: "auto",\n      placement: "bottom",\n      offset: 0\n    });\n    overlay.addEventListener("sp-closed", () => {\n      overlay = void 0;\n    });\n    target.insertAdjacentElement("afterend", overlay);\n  };\n  requestAnimationFrame(() => {\n    openDetachedOverlayContent({\n      target: document.querySelector("#detached-content-trigger")\n    });\n  });\n  return html`\n        <style>\n            sp-overlay div:not([placement]) {\n                visibility: hidden;\n            }\n        </style>\n        <sp-action-button\n            id="detached-content-trigger"\n            @click=${openDetachedOverlayContent}\n        >\n            <sp-icon-open-in\n                slot="icon"\n                label="Open in overlay"\n            ></sp-icon-open-in>\n        </sp-action-button>\n    `;\n}',...detachedElement.parameters?.docs?.source}}},edges.parameters={...edges.parameters,docs:{...edges.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <style>\n            .demo {\n                position: absolute;\n            }\n            .top-left {\n                top: 0;\n                left: 0;\n            }\n            .top-right {\n                top: 0;\n                right: 0;\n            }\n            .bottom-right {\n                bottom: 0;\n                right: 0;\n            }\n            .bottom-left {\n                bottom: 0;\n                left: 0;\n            }\n        </style>\n        <overlay-trigger\n            class="demo top-left"\n            placement="bottom"\n            triggered-by="hover"\n        >\n            <sp-button slot="trigger">\n                Top/\n                <br />\n                Left\n            </sp-button>\n            <sp-tooltip slot="hover-content" delayed tip="bottom">\n                Triskaidekaphobia and More\n            </sp-tooltip>\n        </overlay-trigger>\n        <overlay-trigger\n            class="demo top-right"\n            placement="bottom"\n            triggered-by="hover"\n        >\n            <sp-button slot="trigger">\n                Top/\n                <br />\n                Right\n            </sp-button>\n            <sp-tooltip slot="hover-content" delayed tip="bottom">\n                Triskaidekaphobia and More\n            </sp-tooltip>\n        </overlay-trigger>\n        <overlay-trigger\n            class="demo bottom-left"\n            placement="top"\n            triggered-by="hover"\n        >\n            <sp-button slot="trigger">\n                Bottom/\n                <br />\n                Left\n            </sp-button>\n            <sp-tooltip slot="hover-content" delayed tip="top">\n                Triskaidekaphobia and More\n            </sp-tooltip>\n        </overlay-trigger>\n        <overlay-trigger\n            placement="top"\n            class="demo bottom-right"\n            triggered-by="hover"\n        >\n            <sp-button slot="trigger">\n                Bottom/\n                <br />\n                Right\n            </sp-button>\n            <sp-tooltip slot="hover-content" delayed tip="top">\n                Triskaidekaphobia and More\n            </sp-tooltip>\n        </overlay-trigger>\n    `;\n}',...edges.parameters?.docs?.source}}},inline.parameters={...inline.parameters,docs:{...inline.parameters?.docs,source:{originalSource:'() => {\n  const closeEvent = new Event("close", {\n    bubbles: true,\n    composed: true\n  });\n  return html`\n        <overlay-trigger type="inline" triggered-by="click">\n            <sp-button slot="trigger">Open</sp-button>\n            <sp-popover slot="click-content">\n                <sp-button\n                    @click=${event => {\n    event.target.dispatchEvent(closeEvent);\n  }}\n                >\n                    Close\n                </sp-button>\n            </sp-popover>\n        </overlay-trigger>\n        ${extraText}\n    `;\n}',...inline.parameters?.docs?.source}}},longpress.parameters={...longpress.parameters,docs:{...longpress.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <overlay-trigger triggered-by="longpress" placement="right-start">\n            <sp-action-button slot="trigger" hold-affordance>\n                <sp-icon-magnify slot="icon"></sp-icon-magnify>\n            </sp-action-button>\n            <sp-tooltip slot="hover-content">Search real hard...</sp-tooltip>\n            <sp-popover slot="longpress-content" tip>\n                <sp-action-group\n                    @change=${event => event.target.dispatchEvent(new Event("close", {\n    bubbles: true\n  }))}\n                    selects="single"\n                    vertical\n                    style="margin: calc(var(--spectrum-actiongroup-button-gap-y,calc(var(--swc-scale-factor) * 10px)) / 2);"\n                >\n                    <sp-action-button>\n                        <sp-icon-magnify slot="icon"></sp-icon-magnify>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-magnify slot="icon"></sp-icon-magnify>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-magnify slot="icon"></sp-icon-magnify>\n                    </sp-action-button>\n                </sp-action-group>\n            </sp-popover>\n        </overlay-trigger>\n    `;\n}',...longpress.parameters?.docs?.source}}},modalLoose.parameters={...modalLoose.parameters,docs:{...modalLoose.parameters?.docs,source:{originalSource:'() => {\n  const closeEvent = new Event("close", {\n    bubbles: true,\n    composed: true\n  });\n  return html`\n        <overlay-trigger type="modal" triggered-by="click">\n            <sp-button slot="trigger">Open</sp-button>\n            <sp-dialog\n                size="s"\n                dismissable\n                slot="click-content"\n                @closed=${event => event.target.dispatchEvent(closeEvent)}\n            >\n                <h2 slot="heading">Loose Dialog</h2>\n                <p>\n                    The\n                    <code>sp-dialog</code>\n                    element is not "meant" to be a modal alone. In that way it\n                    does not manage its own\n                    <code>open</code>\n                    attribute or outline when it should have\n                    <code>pointer-events: auto</code>\n                    . It\'s a part of this test suite to prove that content in\n                    this way can be used in an\n                    <code>overlay-trigger</code>\n                    element.\n                </p>\n            </sp-dialog>\n        </overlay-trigger>\n        ${extraText}\n    `;\n}',...modalLoose.parameters?.docs?.source}}},modalNoFocus.parameters={...modalNoFocus.parameters,docs:{...modalNoFocus.parameters?.docs,source:{originalSource:'() => {\n  const closeEvent = new Event("close", {\n    bubbles: true,\n    composed: true\n  });\n  return html`\n        <overlay-trigger\n            type="modal"\n            receives-focus="false"\n            triggered-by="click"\n        >\n            <sp-button slot="trigger">Open</sp-button>\n            <sp-dialog-wrapper\n                underlay\n                slot="click-content"\n                headline="Wrapped Dialog w/ Hero Image"\n                size="s"\n            >\n                <p>\n                    The\n                    <code>sp-dialog-wrapper</code>\n                    element has been prepared for use in an\n                    <code>overlay-trigger</code>\n                    element by it\'s combination of modal, underlay, etc. styles\n                    and features.\n                </p>\n                <sp-button-group style="margin-inline-start: auto">\n                    <sp-button\n                        data-test-id="dialog-cancel-btn"\n                        variant="secondary"\n                        treatment="outline"\n                        size="l"\n                        @click=${event => event.target.dispatchEvent(closeEvent)}\n                    >\n                        ${"Cancel"}\n                    </sp-button>\n                    <sp-button\n                        data-test-id="dialog-override-btn"\n                        variant="negative"\n                        size="l"\n                        @click=${event => event.target.dispatchEvent(closeEvent)}\n                    >\n                        ${"Override"}\n                    </sp-button>\n                </sp-button-group>\n            </sp-dialog-wrapper>\n        </overlay-trigger>\n    `;\n}',...modalNoFocus.parameters?.docs?.source}}},modalManaged.parameters={...modalManaged.parameters,docs:{...modalManaged.parameters?.docs,source:{originalSource:'() => {\n  const closeEvent = new Event("close", {\n    bubbles: true,\n    composed: true\n  });\n  return html`\n        <overlay-trigger type="modal" triggered-by="click">\n            <sp-button slot="trigger">Open</sp-button>\n            <sp-dialog-wrapper\n                underlay\n                slot="click-content"\n                headline="Wrapped Dialog w/ Hero Image"\n                confirm-label="Keep Both"\n                secondary-label="Replace"\n                cancel-label="Cancel"\n                footer="Content for footer"\n                @confirm=${event => {\n    event.target.dispatchEvent(closeEvent);\n  }}\n                @secondary=${event => {\n    event.target.dispatchEvent(closeEvent);\n  }}\n                @cancel=${event => {\n    event.target.dispatchEvent(closeEvent);\n  }}\n            >\n                <p>\n                    The\n                    <code>sp-dialog-wrapper</code>\n                    element has been prepared for use in an\n                    <code>overlay-trigger</code>\n                    element by it\'s combination of modal, underlay, etc. styles\n                    and features.\n                </p>\n            </sp-dialog-wrapper>\n        </overlay-trigger>\n        ${extraText}\n    `;\n}',...modalManaged.parameters?.docs?.source}}},modalWithinNonModal.parameters={...modalWithinNonModal.parameters,docs:{...modalWithinNonModal.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <overlay-trigger type="inline" triggered-by="click">\n            <sp-button variant="primary" slot="trigger">\n                Open inline overlay\n            </sp-button>\n            <sp-popover slot="click-content">\n                <sp-dialog size="s" no-divider>\n                    <overlay-trigger type="modal" triggered-by="click">\n                        <sp-button variant="primary" slot="trigger">\n                            Open modal overlay\n                        </sp-button>\n                        <sp-popover slot="click-content">\n                            <sp-dialog size="s" no-divider>\n                                Modal overlay\n                            </sp-dialog>\n                        </sp-popover>\n                    </overlay-trigger>\n                </sp-dialog>\n            </sp-popover>\n        </overlay-trigger>\n    `;\n}',...modalWithinNonModal.parameters?.docs?.source}}},noCloseOnResize.parameters={...noCloseOnResize.parameters,docs:{...noCloseOnResize.parameters?.docs,source:{originalSource:'args => html`\n    <style>\n        sp-button:hover {\n            border: 10px solid;\n            width: 100px;\n        }\n    </style>\n    ${template({\n  ...args,\n  open: "click"\n})}\n`',...noCloseOnResize.parameters?.docs?.source}}},openClickContent.parameters={...openClickContent.parameters,docs:{...openClickContent.parameters?.docs,source:{originalSource:'args => template({\n  ...args,\n  open: "click"\n})',...openClickContent.parameters?.docs?.source}}},openHoverContent.parameters={...openHoverContent.parameters,docs:{...openHoverContent.parameters?.docs,source:{originalSource:'args => template({\n  ...args,\n  open: "hover"\n})',...openHoverContent.parameters?.docs?.source}}},replace.parameters={...replace.parameters,docs:{...replace.parameters?.docs,source:{originalSource:'() => {\n  const closeEvent = new Event("close", {\n    bubbles: true,\n    composed: true\n  });\n  return html`\n        <overlay-trigger type="replace" triggered-by="click">\n            <sp-button slot="trigger">Open</sp-button>\n            <sp-popover slot="click-content">\n                <sp-button\n                    @click=${event => {\n    event.target.dispatchEvent(closeEvent);\n  }}\n                >\n                    Close\n                </sp-button>\n            </sp-popover>\n        </overlay-trigger>\n        ${extraText}\n    `;\n}',...replace.parameters?.docs?.source}}},sideHoverDraggable.parameters={...sideHoverDraggable.parameters,docs:{...sideHoverDraggable.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        ${storyStyles}\n        <style>\n            sp-tooltip {\n                transition: none;\n            }\n        </style>\n        <overlay-drag>\n            <overlay-trigger placement="right" triggered-by="hover">\n                <overlay-target-icon slot="trigger"></overlay-target-icon>\n                <sp-tooltip slot="hover-content" delayed tip="right">\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n                    Vivamus egestas sed enim sed condimentum. Nunc facilisis\n                    scelerisque massa sed luctus. Orci varius natoque penatibus\n                    et magnis dis parturient montes, nascetur ridiculus mus.\n                    Suspendisse sagittis sodales purus vitae ultricies. Integer\n                    at dui sem. Sed quam tortor, ornare in nisi et, rhoncus\n                    lacinia mauris. Sed vel rutrum mauris, ac pellentesque nibh.\n                    Sed feugiat semper libero, sit amet vehicula orci fermentum\n                    id. Vivamus imperdiet egestas luctus. Mauris tincidunt\n                    malesuada ante, faucibus viverra nunc blandit a. Fusce et\n                    nisl nisi. Aenean dictum quam id mollis faucibus. Nulla a\n                    ultricies dui. In hac habitasse platea dictumst. Curabitur\n                    gravida lobortis vestibulum.\n                </sp-tooltip>\n            </overlay-trigger>\n        </overlay-drag>\n    `;\n}',...sideHoverDraggable.parameters?.docs?.source}}},superComplexModal.parameters={...superComplexModal.parameters,docs:{...superComplexModal.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <overlay-trigger type="modal" triggered-by="click">\n            <sp-button slot="trigger" variant="accent">Toggle Dialog</sp-button>\n            <sp-popover slot="click-content">\n                <sp-dialog size="s">\n                    <overlay-trigger triggered-by="click">\n                        <sp-button slot="trigger" variant="primary">\n                            Toggle Dialog\n                        </sp-button>\n                        <sp-popover slot="click-content">\n                            <sp-dialog size="s" no-divider>\n                                <overlay-trigger\n                                    type="modal"\n                                    triggered-by="click"\n                                >\n                                    <sp-button\n                                        slot="trigger"\n                                        variant="secondary"\n                                    >\n                                        Toggle Dialog\n                                    </sp-button>\n                                    <sp-popover slot="click-content">\n                                        <sp-dialog size="s" no-divider>\n                                            <p>\n                                                When you get this deep, this\n                                                ActiveOverlay should be the only\n                                                one in [slot="open"].\n                                            </p>\n                                            <p>\n                                                All of the rest of the\n                                                ActiveOverlay elements should\n                                                have had their [slot] attribute\n                                                removed.\n                                            </p>\n                                            <p>\n                                                Closing this ActiveOverlay\n                                                should replace them...\n                                            </p>\n                                        </sp-dialog>\n                                    </sp-popover>\n                                </overlay-trigger>\n                            </sp-dialog>\n                        </sp-popover>\n                    </overlay-trigger>\n                </sp-dialog>\n            </sp-popover>\n        </overlay-trigger>\n    `;\n}',...superComplexModal.parameters?.docs?.source}}},updated.parameters={...updated.parameters,docs:{...updated.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        ${storyStyles}\n        <style>\n            sp-tooltip {\n                transition: none;\n            }\n        </style>\n        <overlay-drag>\n            <overlay-trigger\n                class="demo top-left"\n                placement="bottom"\n                triggered-by="hover"\n            >\n                <overlay-target-icon\n                    slot="trigger"\n                    style="translate(400px, 300px)"\n                ></overlay-target-icon>\n                <sp-tooltip slot="hover-content" delayed tip="bottom">\n                    Click to open popover\n                </sp-tooltip>\n                <sp-popover slot="click-content" placement="bottom" tip>\n                    <sp-dialog size="s" no-divider>\n                        <sp-slider\n                            value="5"\n                            step="0.5"\n                            min="0"\n                            max="20"\n                            label="Awesomeness"\n                        ></sp-slider>\n                        <div id="styled-div">\n                            The background of this div should be blue\n                        </div>\n                        <overlay-trigger\n                            id="inner-trigger"\n                            placement="bottom"\n                            triggered-by="click hover"\n                        >\n                            <sp-button slot="trigger">Press Me</sp-button>\n                            <sp-popover\n                                slot="click-content"\n                                placement="bottom"\n                                tip\n                            >\n                                <sp-dialog size="s" no-divider>\n                                    Another Popover\n                                </sp-dialog>\n                            </sp-popover>\n\n                            <sp-tooltip\n                                slot="hover-content"\n                                delayed\n                                tip="bottom"\n                            >\n                                Click to open another popover.\n                            </sp-tooltip>\n                        </overlay-trigger>\n                    </sp-dialog>\n                </sp-popover>\n            </overlay-trigger>\n        </overlay-drag>\n    `;\n}',...updated.parameters?.docs?.source}}},updating.parameters={...updating.parameters,docs:{...updating.parameters?.docs,source:{originalSource:'() => {\n  const update = () => {\n    const button = document.querySelector(\'[slot="trigger"]\');\n    button.style.left = `${Math.floor(Math.random() * 200)}px`;\n    button.style.top = `${Math.floor(Math.random() * 200)}px`;\n    button.style.position = "fixed";\n  };\n  return html`\n        <overlay-trigger triggered-by="click">\n            <sp-button variant="primary" slot="trigger">\n                Open inline overlay\n            </sp-button>\n            <sp-popover slot="click-content">\n                <sp-dialog size="s" no-divider>\n                    <sp-button variant="primary" @click=${update}>\n                        Update trigger location.\n                    </sp-button>\n                </sp-dialog>\n            </sp-popover>\n        </overlay-trigger>\n    `;\n}',...updating.parameters?.docs?.source}}},virtualElementV1.parameters={...virtualElementV1.parameters,docs:{...virtualElementV1.parameters?.docs,source:{originalSource:'args => {\n  const contextMenuTemplate = (kind = "") => html`\n        <sp-popover\n            style="width:300px;"\n            @click=${event => {\n    var _a2;\n    if (event.target.localName === "sp-menu-item") {\n      (_a2 = event.target) == null ? void 0 : _a2.dispatchEvent(new Event("close", {\n        bubbles: true\n      }));\n    }\n  }}\n        >\n            <sp-menu>\n                <sp-menu-group>\n                    <span slot="header">Menu source: ${kind}</span>\n                    <sp-menu-item>Deselect</sp-menu-item>\n                    <sp-menu-item>Select inverse</sp-menu-item>\n                    <sp-menu-item>Feather...</sp-menu-item>\n                    <sp-menu-item>Select and mask...</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Save selection</sp-menu-item>\n                    <sp-menu-item disabled>Make work path</sp-menu-item>\n                </sp-menu-group>\n            </sp-menu>\n        </sp-popover>\n    `;\n  const handleContextmenu = async event => {\n    event.preventDefault();\n    event.stopPropagation();\n    const source = event.composedPath()[0];\n    const {\n      id\n    } = source;\n    const trigger = event.target;\n    const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);\n    const fragment = document.createDocumentFragment();\n    render(contextMenuTemplate(id), fragment);\n    const popover = fragment.querySelector("sp-popover");\n    openOverlay(trigger, "click", popover, {\n      placement: args.placement,\n      receivesFocus: "auto",\n      virtualTrigger,\n      offset: 0,\n      notImmediatelyClosable: true\n    });\n  };\n  return html`\n        <style>\n            .app-root {\n                position: absolute;\n                inset: 0;\n            }\n        </style>\n        <start-end-contextmenu\n            class="app-root"\n            @contextmenu=${{\n    capture: true,\n    handleEvent: handleContextmenu\n  }}\n        ></start-end-contextmenu>\n    `;\n}',...virtualElementV1.parameters?.docs?.source}}},virtualElement.parameters={...virtualElement.parameters,docs:{...virtualElement.parameters?.docs,source:{originalSource:'args => {\n  const contextMenuTemplate = (kind = "") => html`\n        <sp-popover\n            style="width:300px;"\n            @click=${event => {\n    var _a2;\n    if (event.target.localName === "sp-menu-item") {\n      (_a2 = event.target) == null ? void 0 : _a2.dispatchEvent(new Event("close", {\n        bubbles: true\n      }));\n    }\n  }}\n        >\n            <sp-menu>\n                <sp-menu-group>\n                    <span slot="header">Menu source: ${kind}</span>\n                    <sp-menu-item>Deselect</sp-menu-item>\n                    <sp-menu-item>Select inverse</sp-menu-item>\n                    <sp-menu-item>Feather...</sp-menu-item>\n                    <sp-menu-item>Select and mask...</sp-menu-item>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-item>Save selection</sp-menu-item>\n                    <sp-menu-item disabled>Make work path</sp-menu-item>\n                </sp-menu-group>\n            </sp-menu>\n        </sp-popover>\n    `;\n  const handleContextmenu = async event => {\n    event.preventDefault();\n    event.stopPropagation();\n    const source = event.composedPath()[0];\n    const {\n      id\n    } = source;\n    const trigger = event.target;\n    const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);\n    const fragment = document.createDocumentFragment();\n    render(contextMenuTemplate(id), fragment);\n    const popover = fragment.querySelector("sp-popover");\n    const overlay = await openOverlay(popover, {\n      trigger: virtualTrigger,\n      placement: args.placement,\n      offset: 0,\n      notImmediatelyClosable: true,\n      type: "auto"\n    });\n    trigger.insertAdjacentElement("afterend", overlay);\n  };\n  return html`\n        <style>\n            .app-root {\n                position: absolute;\n                inset: 0;\n            }\n        </style>\n        <start-end-contextmenu\n            class="app-root"\n            @contextmenu=${{\n    capture: true,\n    handleEvent: handleContextmenu\n  }}\n        ></start-end-contextmenu>\n    `;\n}',...virtualElement.parameters?.docs?.source}}},virtualElementDeclaratively.parameters={...virtualElementDeclaratively.parameters,docs:{...virtualElementDeclaratively.parameters?.docs,source:{originalSource:'args => {\n  const handleContextmenu = async event => {\n    event.preventDefault();\n    event.stopPropagation();\n    const overlay2 = document.querySelector("sp-overlay:not([open])");\n    if (overlay2.triggerElement instanceof VirtualTrigger) {\n      overlay2.triggerElement.updateBoundingClientRect(event.clientX, event.clientY);\n    }\n    overlay2.willPreventClose = true;\n    overlay2.open = true;\n  };\n  const overlay = () => html`\n        <sp-overlay\n            offset="0"\n            type="auto"\n            placement=${args.placement}\n            .triggerElement=${new VirtualTrigger(0, 0)}\n        >\n            <sp-popover\n                style="width:300px;"\n                @change=${event => {\n    var _a2;\n    (_a2 = event.target) == null ? void 0 : _a2.dispatchEvent(new Event("close", {\n      bubbles: true\n    }));\n  }}\n            >\n                <sp-menu>\n                    <sp-menu-group>\n                        <span slot="header">Menu</span>\n                        <sp-menu-item>Deselect</sp-menu-item>\n                        <sp-menu-item>Select inverse</sp-menu-item>\n                        <sp-menu-item>Feather...</sp-menu-item>\n                        <sp-menu-item>Select and mask...</sp-menu-item>\n                        <sp-menu-divider></sp-menu-divider>\n                        <sp-menu-item>Save selection</sp-menu-item>\n                        <sp-menu-item disabled>Make work path</sp-menu-item>\n                    </sp-menu-group>\n                </sp-menu>\n            </sp-popover>\n        </sp-overlay>\n    `;\n  return html`\n        <style>\n            .app-root {\n                position: absolute;\n                inset: 0;\n            }\n        </style>\n        <div\n            class="app-root"\n            @contextmenu=${{\n    capture: true,\n    handleEvent: handleContextmenu\n  }}\n        >\n            ${overlay()} ${overlay()}\n        </div>\n    `;\n}',...virtualElementDeclaratively.parameters?.docs?.source}}},triggeredByOptimization.parameters={...triggeredByOptimization.parameters,docs:{...triggeredByOptimization.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <h2>"triggered-by" attribute optimization</h2>\n        <p>\n            This demo shows different ways to trigger overlays using the\n            <code>triggered-by</code>\n            attribute.\n        </p>\n        <p>\n            <strong>Pro tip:</strong>\n            Inspect the DOM to verify that only the respective overlay elements\n            are being rendered into the DOM based on the\n            <code>triggered-by</code>\n            value.\n        </p>\n        <p>\n            Unused interaction types aren\'t rendered. This improves performance,\n            reduces the number of unecessary DOM nodes and avoids race\n            conditions in slot reparenting.\n        </p>\n        <div style="display: flex; gap: 20px; flex-direction: column;">\n            \x3c!-- Click and hover only --\x3e\n            <overlay-trigger triggered-by="click hover">\n                <sp-button slot="trigger">Click and hover trigger</sp-button>\n                <sp-popover slot="click-content" direction="right" tip>\n                    <sp-dialog size="s" no-divider>Click content</sp-dialog>\n                </sp-popover>\n                <sp-tooltip slot="hover-content">Hover content</sp-tooltip>\n            </overlay-trigger>\n\n            \x3c!-- Longpress only --\x3e\n            <overlay-trigger triggered-by="longpress">\n                <sp-button slot="trigger">Longpress trigger</sp-button>\n                <sp-popover slot="longpress-content" direction="right" tip>\n                    <sp-dialog size="s" no-divider>Longpress content</sp-dialog>\n                </sp-popover>\n                <div slot="longpress-describedby-descriptor">\n                    Press and hold to reveal more options\n                </div>\n            </overlay-trigger>\n\n            \x3c!-- Click only --\x3e\n            <overlay-trigger triggered-by="click">\n                <sp-button slot="trigger">Click only trigger</sp-button>\n                <sp-popover slot="click-content" direction="right" tip>\n                    <sp-dialog size="s" no-divider>Click content</sp-dialog>\n                </sp-popover>\n            </overlay-trigger>\n\n            \x3c!-- Hover only --\x3e\n            <overlay-trigger triggered-by="hover">\n                <sp-button slot="trigger">Hover only trigger</sp-button>\n                <sp-tooltip slot="hover-content">Hover content</sp-tooltip>\n            </overlay-trigger>\n        </div>\n    `;\n}',...triggeredByOptimization.parameters?.docs?.source}}},hoverWithInteractiveContent.parameters={...hoverWithInteractiveContent.parameters,docs:{...hoverWithInteractiveContent.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div\n            style="display: flex; gap: 20px; flex-direction: column; padding: 40px;"\n        >\n            \x3c!-- Hover with interactive buttons --\x3e\n            <overlay-trigger triggered-by="hover" placement="right">\n                <sp-button slot="trigger">\n                    Hover for interactive buttons\n                </sp-button>\n                <sp-popover slot="hover-content" tip>\n                    <sp-dialog size="s" no-divider>\n                        <h3 style="margin-top: 0;">Interactive content</h3>\n                        <p>Tab into these buttons:</p>\n                        <div\n                            style="display: flex; gap: 8px; flex-direction: column;"\n                        >\n                            <sp-button>Action 1</sp-button>\n                            <sp-button>Action 2</sp-button>\n                            <sp-button>Action 3</sp-button>\n                        </div>\n                    </sp-dialog>\n                </sp-popover>\n            </overlay-trigger>\n\n            \x3c!-- Hover with links --\x3e\n            <overlay-trigger triggered-by="hover" placement="right">\n                <sp-button slot="trigger">\n                    Hover for interactive links\n                </sp-button>\n                <sp-popover slot="hover-content" tip>\n                    <sp-dialog size="s" no-divider>\n                        <h3 style="margin-top: 0;">Quick links</h3>\n                        <ul>\n                            <li>\n                                <sp-link href="#example1">\n                                    Example link 1\n                                </sp-link>\n                            </li>\n                            <li>\n                                <sp-link href="#example2">\n                                    Example link 2\n                                </sp-link>\n                            </li>\n                            <li>\n                                <sp-link href="#example3">\n                                    Example link 3\n                                </sp-link>\n                            </li>\n                        </ul>\n                    </sp-dialog>\n                </sp-popover>\n            </overlay-trigger>\n\n            \x3c!-- Hover with action group (like Arrange icon example) --\x3e\n            <overlay-trigger triggered-by="hover" placement="right">\n                <sp-button slot="trigger">Hover for action group</sp-button>\n                <sp-popover slot="hover-content" tip>\n                    <sp-action-group\n                        selects="single"\n                        vertical\n                        style="margin: var(--spectrum-spacing-200);"\n                    >\n                        <sp-action-button>\n                            <sp-icon-magnify slot="icon"></sp-icon-magnify>\n                            Send to Front\n                        </sp-action-button>\n                        <sp-action-button>\n                            <sp-icon-magnify slot="icon"></sp-icon-magnify>\n                            Send to Back\n                        </sp-action-button>\n                        <sp-action-button>\n                            <sp-icon-magnify slot="icon"></sp-icon-magnify>\n                            Align Center\n                        </sp-action-button>\n                    </sp-action-group>\n                </sp-popover>\n            </overlay-trigger>\n        </div>\n    `;\n}',...hoverWithInteractiveContent.parameters?.docs?.source}}},pickerInDialog.parameters={...pickerInDialog.parameters,docs:{...pickerInDialog.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-button variant="primary" id="mybutton">Button popover</sp-button>\n        <sp-overlay trigger="mybutton@click" type="modal" placement="bottom">\n            <sp-popover tip>\n                <sp-dialog no-divider>\n                    <sp-field-label for="picker-value">\n                        Open picker, then try clicking outside to close it:\n                    </sp-field-label>\n                    <sp-picker\n                        label="Select a Country with a very long label, too long in fact"\n                        value="item-2"\n                        id="picker-value"\n                    >\n                        <sp-menu-item value="item-1">Deselect</sp-menu-item>\n                        <sp-menu-item value="item-2">\n                            Select inverse\n                        </sp-menu-item>\n                        <sp-menu-item value="item-3">Feather...</sp-menu-item>\n                        <sp-menu-item value="item-4">\n                            Select and mask...\n                        </sp-menu-item>\n                        <sp-menu-divider></sp-menu-divider>\n                        <sp-menu-item value="item-5">\n                            Save selection\n                        </sp-menu-item>\n                        <sp-menu-item disabled value="item-6">\n                            Make work path\n                        </sp-menu-item>\n                    </sp-picker>\n                </sp-dialog>\n            </sp-popover>\n        </sp-overlay>\n    `;\n}',...pickerInDialog.parameters?.docs?.source}}},disabledOverlayTrigger.parameters={...disabledOverlayTrigger.parameters,docs:{...disabledOverlayTrigger.parameters?.docs,source:{originalSource:'() => {\n  return html(_a || (_a = __template(["\\n        ", `\n        <h2>Disabled Overlay Trigger</h2>\n        <p>This demonstrates how disabled overlay-triggers should work:</p>\n        <ul>\n            <li>\n                The overlay (tooltip/popover) functionality should be disabled\n            </li>\n            <li>But the trigger content itself should remain interactive</li>\n        </ul>\n\n        <div style="display: flex; gap: 24px; margin: 24px 0;">\n            \x3c!-- Disabled overlay-trigger with interactive content --\x3e\n            <div>\n                <h3>Disabled overlay-trigger</h3>\n                <overlay-trigger triggered-by="click hover" disabled>\n                    <div\n                        slot="trigger"\n                        style="padding: 8px; border: 1px solid #ccc;"\n                    >\n                        <p>This container has a disabled overlay-trigger</p>\n                        <sp-button variant="primary" id="test-button-disabled">\n                            This button should still be clickable\n                        </sp-button>\n                    </div>\n                    <sp-tooltip slot="hover-content">\n                        This tooltip should not appear (disabled)\n                    </sp-tooltip>\n                    <sp-popover slot="click-content" placement="bottom" tip>\n                        <sp-dialog size="s" no-divider>\n                            This popover should not appear (disabled)\n                        </sp-dialog>\n                    </sp-popover>\n                </overlay-trigger>\n                <p id="disabled-click-indicator">Button not clicked yet</p>\n            </div>\n\n            \x3c!-- Regular overlay-trigger for comparison --\x3e\n            <div>\n                <h3>Regular overlay-trigger (for comparison)</h3>\n                <overlay-trigger triggered-by="click hover">\n                    <div\n                        slot="trigger"\n                        style="padding: 8px; border: 1px solid #ccc;"\n                    >\n                        <p>This container has a regular overlay-trigger</p>\n                        <sp-button variant="primary" id="test-button-enabled">\n                            This button should be clickable\n                        </sp-button>\n                    </div>\n                    <sp-tooltip slot="hover-content">\n                        This tooltip should appear on hover\n                    </sp-tooltip>\n                    <sp-popover slot="click-content" placement="bottom" tip>\n                        <sp-dialog size="s" no-divider>\n                            This popover should appear on click\n                        </sp-dialog>\n                    </sp-popover>\n                </overlay-trigger>\n                <p id="enabled-click-indicator">Button not clicked yet</p>\n            </div>\n        </div>\n\n        <script>\n            // Add click handlers to demonstrate button interactivity\n            setTimeout(() => {\n                const disabledButton = document.getElementById(\n                    \'test-button-disabled\'\n                );\n                const enabledButton = document.getElementById(\n                    \'test-button-enabled\'\n                );\n                const disabledIndicator = document.getElementById(\n                    \'disabled-click-indicator\'\n                );\n                const enabledIndicator = document.getElementById(\n                    \'enabled-click-indicator\'\n                );\n\n                if (disabledButton) {\n                    disabledButton.addEventListener(\'click\', () => {\n                        disabledIndicator.textContent =\n                            \'Button was clicked! \\u2705\';\n                        disabledIndicator.style.color = \'green\';\n                    });\n                }\n\n                if (enabledButton) {\n                    enabledButton.addEventListener(\'click\', () => {\n                        enabledIndicator.textContent = \'Button was clicked! \\u2705\';\n                        enabledIndicator.style.color = \'green\';\n                    });\n                }\n            }, 100);\n        <\\/script>\n    `])), storyStyles);\n}',...disabledOverlayTrigger.parameters?.docs?.source}}},WithInteractiveContent.parameters={...WithInteractiveContent.parameters,docs:{...WithInteractiveContent.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div>\n            <sp-button id="trigger">Open Overlay</sp-button>\n            <sp-overlay trigger="trigger@click" type="auto" placement="bottom">\n                <sp-popover dialog>\n                    <p>\n                        My slider in overlay element:\n                        <sp-slider\n                            label="Slider Label - Editable"\n                            editable\n                        ></sp-slider>\n                    </p>\n                </sp-popover>\n            </sp-overlay>\n        </div>\n    `;\n}',...WithInteractiveContent.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=overlay-stories-overlay-stories.b1834890.iframe.bundle.js.map