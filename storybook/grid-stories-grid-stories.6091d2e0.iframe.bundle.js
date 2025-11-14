"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[7664],{"./packages/action-bar/sp-action-bar.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/button/sp-close-button.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js");var action_bar_css=index_dev.AH`
    :host{--spectrum-actionbar-height:var(--spectrum-action-bar-height);--spectrum-actionbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-actionbar-item-counter-font-size:var(--spectrum-font-size-100);--spectrum-actionbar-item-counter-line-height:var(--spectrum-line-height-100);--spectrum-actionbar-item-counter-color:var(--spectrum-neutral-content-color-default);--spectrum-actionbar-emphasized-background-color:var(--spectrum-informative-background-color-default);--spectrum-actionbar-emphasized-item-counter-color:var(--spectrum-white);--spectrum-actionbar-spacing-outer-edge:var(--spectrum-spacing-300);--spectrum-actionbar-spacing-close-button-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-start:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-end:var(--spectrum-spacing-75);--spectrum-actionbar-spacing-item-counter-top:var(--spectrum-action-bar-top-to-item-counter);--spectrum-actionbar-spacing-item-counter-end:var(--spectrum-spacing-400);--spectrum-actionbar-spacing-action-group-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-action-group-end:var(--spectrum-spacing-100);--spectrum-actionbar-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-actionbar-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-actionbar-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-actionbar-shadow-color:var(--spectrum-drop-shadow-color)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-actionbar-item-counter-line-height-cjk:var(--spectrum-cjk-line-height-100)}@media (forced-colors:active){:host,:host([emphasized]) #popover{--highcontrast-actionbar-popover-border-color:CanvasText}}:host{padding:0 var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge));z-index:1;box-sizing:border-box;pointer-events:none;opacity:0;block-size:0;inset-block-end:0}:host([open]){block-size:calc(var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge)) + var(--mod-actionbar-height,var(--spectrum-actionbar-height)));opacity:1}#popover{block-size:var(--mod-actionbar-height,var(--spectrum-actionbar-height));box-sizing:border-box;border-radius:var(--mod-actionbar-corner-radius,var(--spectrum-actionbar-corner-radius));border-color:var(--highcontrast-actionbar-popover-border-color,var(--mod-actionbar-popover-border-color,var(--spectrum-actionbar-popover-border-color)));background-color:var(--mod-actionbar-popover-background-color,var(--spectrum-actionbar-popover-background-color));inline-size:100%;filter:drop-shadow(var(--mod-actionbar-shadow-horizontal,var(--spectrum-actionbar-shadow-horizontal))var(--mod-actionbar-shadow-vertical,var(--spectrum-actionbar-shadow-vertical))var(--mod-actionbar-shadow-blur,var(--spectrum-actionbar-shadow-blur))var(--mod-actionbar-shadow-color,var(--spectrum-actionbar-shadow-color)));pointer-events:auto;flex-direction:row;margin:auto;padding-block:0;display:flex;position:relative}.close-button{flex-shrink:0;margin-block-start:var(--mod-actionbar-spacing-close-button-top,var(--spectrum-actionbar-spacing-close-button-top));margin-inline-start:var(--mod-actionbar-spacing-close-button-start,var(--spectrum-actionbar-spacing-close-button-start));margin-inline-end:var(--mod-actionbar-spacing-close-button-end,var(--spectrum-actionbar-spacing-close-button-end))}.field-label{font-size:var(--mod-actionbar-item-counter-font-size,var(--spectrum-actionbar-item-counter-font-size));color:var(--mod-actionbar-item-counter-color,var(--spectrum-actionbar-item-counter-color));line-height:var(--mod-actionbar-item-counter-line-height,var(--spectrum-actionbar-item-counter-line-height));margin-block-start:var(--mod-actionbar-spacing-item-counter-top,var(--spectrum-actionbar-spacing-item-counter-top));margin-inline-end:var(--mod-actionbar-spacing-item-counter-end,var(--spectrum-actionbar-spacing-item-counter-end));padding:0}.field-label:lang(ja),.field-label:lang(ko),.field-label:lang(zh){line-height:var(--mod-actionbar-item-counter-line-height-cjk,var(--spectrum-actionbar-item-counter-line-height-cjk))}.action-group{margin-block-start:var(--mod-actionbar-spacing-action-group-top,var(--spectrum-actionbar-spacing-action-group-top));margin-inline-start:auto;margin-inline-end:var(--mod-actionbar-spacing-action-group-end,var(--spectrum-actionbar-spacing-action-group-end))}:host([emphasized]) #popover{filter:none;background-color:var(--mod-actionbar-emphasized-background-color,var(--spectrum-actionbar-emphasized-background-color));border-color:#0000}:host([emphasized]) .field-label{color:var(--mod-actionbar-emphasized-item-counter-color,var(--spectrum-actionbar-emphasized-item-counter-color))}:host([variant=sticky]){position:sticky;inset-inline:0}:host([variant=fixed]){position:fixed}:host([flexible]) #popover{inline-size:auto}:host{--spectrum-actionbar-popover-background-color:var(--system-action-bar-popover-background-color);--spectrum-actionbar-popover-border-color:var(--system-action-bar-popover-border-color)}:host{display:block}:host([flexible]){display:inline-block}
`,directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),focus_visible_dev=__webpack_require__("./tools/shared/src/focus-visible.dev.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};const actionBarVariants=["sticky","fixed"];class ActionBar extends((0,focus_visible_dev.p)(index_dev.wG)){constructor(){super(...arguments),this.emphasized=!1,this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[action_bar_css]}set variant(variant){if(variant!==this.variant){if(actionBarVariants.includes(variant))return this.setAttribute("variant",variant),void(this._variant=variant);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}handleClick(){this.open=!1;this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0)}render(){return index_dev.qy`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static-color=${(0,directives_dev.JR)(this.emphasized?"white":void 0)}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static-color=${(0,directives_dev.JR)(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionBar.prototype,"emphasized",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionBar.prototype,"flexible",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionBar.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionBar.prototype,"variant",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-bar",ActionBar)},"./packages/button/sp-close-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/CloseButton.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-close-button",_src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__.J)},"./packages/icons-workflow/icons/sp-icon-edit.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Edit=__webpack_require__("./packages/icons-workflow/src/icons/Edit.js");class IconEdit extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:l=24,hidden:e=!1,title:r="Edit"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m17.78076,1.75684c-1.27197-1.04102-3.22705-.89844-4.4502.32324L3.07764,12.33398c-.32031.31934-.55859.7168-.68896,1.15039l-1.38428,4.58398c-.08008.26465-.00781.55176.1875.74707.14258.14258.33447.21973.53027.21973.07227,0,.14551-.01074.2168-.03223l4.58252-1.38379c.43359-.12988.83154-.36816,1.15088-.68848,0,0,10.16846-10.16797,10.35547-10.35547.64795-.64746.99316-1.54492.94775-2.45996-.0459-.91504-.48145-1.77539-1.19482-2.3584ZM2.84473,17.16309l.97998-3.24609c.02716-.09033.06714-.17578.11377-.25732l2.40869,2.40918c-.08154.04639-.16718.08643-.25781.11377l-3.24463.98047Zm14.12158-11.64746c-.15472.15552-7.09985,7.1001-9.52545,9.52588l-2.47461-2.4751L14.39111,3.14062c.38623-.38672.896-.58594,1.38965-.58594.38086,0,.75244.11914,1.05029.3623.3916.32129.62109.77246.646,1.27246.0249.49316-.16113.97656-.51074,1.32617Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Edit.q)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-edit",IconEdit)},"./packages/icons-workflow/src/icons/Edit.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{q:function(){return EditIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const EditIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Edit"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
      d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
    />
  </svg>`},"./tools/grid/stories/grid.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return grid_stories},scrollParentInAssignedSlot:function(){return scrollParentInAssignedSlot},sized:function(){return sized}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),LitVirtualizer=__webpack_require__("../node_modules/@lit-labs/virtualizer/LitVirtualizer.js"),grid=__webpack_require__("../node_modules/@lit-labs/virtualizer/layouts/grid.js");var grid_css=index_dev.AH`
    :host{contain:strict;pointer-events:none;display:block;position:relative}::slotted(*){pointer-events:all}
`,resize_controller=__webpack_require__("../node_modules/@lit-labs/observers/development/resize-controller.js"),RovingTabindex_dev=__webpack_require__("./tools/reactive-controllers/src/RovingTabindex.dev.js");const doCallbackAfterPaint=cb=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{cb()})})};class GridController{constructor(host,{elements:elements,itemSize:itemSize,gap:gap,padding:padding}){this._first=0,this._last=0,this.handleFocusin=event=>{const scrollToFirst=()=>this.host.scrollToIndex(0),focusIntoGrid=()=>{this.focus(),this.host.tabIndex=-1};event.target===this.host&&(this._first>0?doCallbackAfterPaint(()=>{scrollToFirst(),doCallbackAfterPaint(focusIntoGrid)}):doCallbackAfterPaint(focusIntoGrid))},this.handleFocusout=event=>{event.relatedTarget&&this.host.contains(event.relatedTarget)||(this.host.tabIndex=0)},this.handleRangeChanged=event=>{this.rovingTabindexController.clearElementCache(event.first)},this.handleVisibleChanged=event=>{this._first=event.first,this._last=event.last},this.host=host,this.host.addController(this),this.applyLayout(itemSize,gap,padding),this.resizeController=new resize_controller.P(this.host,{callback:entries=>{entries.forEach(entry=>{this.measureDirectionLength(entry.contentRect)})}}),this.rovingTabindexController=new RovingTabindex_dev.t(this.host,{direction:"grid",elements:elements,focusInIndex:()=>this.host.getRootNode().activeElement===this.host?0:-1})}get itemSize(){return this._itemSize()}_itemSize(){return{width:100,height:100}}get gap(){return this._gap()}_gap(){}get padding(){return this._padding()}_padding(){}focus(options){this.rovingTabindexController.focus(options)}applyLayout(itemSize,gap,padding){"object"==typeof itemSize?this._itemSize=()=>itemSize:"function"==typeof itemSize&&void 0!==itemSize()&&(this._itemSize=itemSize),"string"==typeof gap?this._gap=()=>gap:"function"==typeof gap&&(this._gap=gap),"string"==typeof padding?this._padding=()=>padding:"function"==typeof padding&&(this._padding=padding)}update({elements:elements,itemSize:itemSize,gap:gap,padding:padding}){this.rovingTabindexController.update({elements:elements}),this.applyLayout(itemSize,gap,padding);const contentRect=this.host.getBoundingClientRect();this.measureDirectionLength(contentRect)}measureDirectionLength(contentRect){const gap=this.gap?parseFloat(this.gap):0,padding=this.padding?parseFloat(this.padding):0,contentBoxWidth=contentRect.width-2*padding,directionLength=Math.floor((contentBoxWidth-this.itemSize.width)/(gap+this.itemSize.width))+1;this.rovingTabindexController.directionLength=Math.floor(directionLength)}hostConnected(){this.host.addEventListener("rangeChanged",this.handleRangeChanged),this.host.addEventListener("visibilityChanged",this.handleVisibleChanged),this.host.addEventListener("focusin",this.handleFocusin),this.host.addEventListener("focusout",this.handleFocusout),this.host.tabIndex=0,this.host.style.setProperty("outline","none","important")}hostDisconnected(){this.host.removeEventListener("rangeChanged",this.handleRangeChanged),this.host.removeEventListener("visibilityChanged",this.handleVisibleChanged),this.host.removeEventListener("focusin",this.handleFocusin),this.host.removeEventListener("focusout",this.handleFocusout)}}var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Grid extends LitVirtualizer.F{constructor(){super(...arguments),this.__gridPart=void 0,this.gap="0",this.items=[],this.itemSize={width:200,height:200},this.selected=[],this.gridController=new GridController(this,{elements:()=>[],itemSize:()=>this.itemSize,gap:()=>this.gap,padding:()=>this.padding||this.gap})}static get styles(){return[grid_css]}handleChange(event){const target=event.target;if(this.lastTargetForChange===target)return;this.lastTargetForChange=target,this.animationFrameId=requestAnimationFrame(()=>{this.lastTargetForChange=void 0});const value=this.items[parseFloat(target.getAttribute("key")||"")],selected=[...this.selected];if(selected.includes(value)){const index=selected.indexOf(value);index>-1&&selected.splice(index,1)}else selected.push(value);this.selected=selected}createRenderRoot(){var _a;const renderRoot=null!=(_a=this.shadowRoot)?_a:this.attachShadow(this.constructor.shadowRootOptions);return(0,index_dev.Rf)(renderRoot,this.constructor.elementStyles),renderRoot}render(){return index_dev.qy`
            <slot></slot>
        `}update(changes){if((changes.has("itemSize")||changes.has("gap")||changes.has("padding")||changes.has("focusableSelector"))&&(this.updateComplete.then(()=>{this.gridController.update({elements:()=>[...this.querySelectorAll(this.focusableSelector)],itemSize:()=>this.itemSize,gap:()=>this.gap,padding:()=>this.padding||this.gap})}),this.layout=(0,grid.V)({itemSize:{width:`${this.itemSize.width}px`,height:`${this.itemSize.height}px`},gap:this.gap,padding:this.padding||this.gap})),changes.has("renderItem")){const fn=this.renderItem;this.renderItem=(item,index)=>{const selected=this.selected.includes(item);return fn(item,index,selected)}}this.isConnected&&(this.__gridPart=(0,index_dev.XX)(super.render(),this)),super.update(changes)}connectedCallback(){var _a;super.connectedCallback(),null==(_a=this.__gridPart)||_a.setConnected(!0),this.addEventListener("change",this.handleChange,{capture:!0})}disconnectedCallback(){var _a;this.removeEventListener("change",this.handleChange,{capture:!0}),null==(_a=this.__gridPart)||_a.setConnected(!1),this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=void 0,this.lastTargetForChange=void 0),super.disconnectedCallback()}}__decorateClass([(0,decorators_dev.MZ)({type:String})],Grid.prototype,"focusableSelector",2),__decorateClass([(0,decorators_dev.MZ)({type:String})],Grid.prototype,"gap",2),__decorateClass([(0,decorators_dev.MZ)({type:String})],Grid.prototype,"padding",2),__decorateClass([(0,decorators_dev.MZ)({type:Array})],Grid.prototype,"items",2),__decorateClass([(0,decorators_dev.MZ)({type:Object})],Grid.prototype,"itemSize",2),__decorateClass([(0,decorators_dev.MZ)({type:Array})],Grid.prototype,"selected",2),customElements.define("sp-grid",Grid);__webpack_require__("./packages/action-bar/sp-action-bar.dev.js"),__webpack_require__("./packages/card/sp-card.dev.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./packages/checkbox/sp-checkbox.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-edit.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var grid_stories={title:"Grid",component:"sp-grid"};function generateItems(count){const items=[];for(;count;)count-=1,items.unshift({id:count});return items}const renderItem=(item,index,selected)=>index_dev.qy`
        <sp-card
            toggles
            variant="quiet"
            heading="Card Heading ${item.id}"
            subheading="JPG Photo"
            style="contain: strict; padding: 1px;"
            value="card-${item.id}"
            .selected=${selected}
            key=${index}
            draggable="true"
            role="row"
            aria-selected=${selected}
            aria-rowindex=${index+1}
            label="Card Heading ${item.id}"
        >
            <img
                alt=""
                slot="preview"
                src="https://picsum.photos/id/${item.id}/200/300"
                decoding="async"
            />
            <div slot="description">10/15/18</div>
            <div slot="footer">Footer</div>
            <sp-action-menu
                label="File actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
                <sp-tooltip slot="tooltip" self-managed placement="top">
                    Do stuff
                </sp-tooltip>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `,handleChange=event=>{const actionbar=document.querySelector("sp-action-bar"),selected=document.querySelector(".selected"),ids=document.querySelector(".ids");actionbar.open=!!event.currentTarget.selected.length,actionbar.style.setProperty("display",event.currentTarget.selected.length?"flex":"none"),selected.textContent=""+event.currentTarget.selected.length,ids.textContent=`[${""+event.currentTarget.selected.map(selection=>selection.id).join(", ")}]`},handleActionBarChange=event=>{event.preventDefault();const grid=document.querySelector("sp-grid");document.querySelector("sp-action-bar").open=!1,grid.selected=[]},Default=()=>{const items=generateItems(40);return index_dev.qy`
        <h1>
            <label for="first-input">
                Random before content that is focusable
            </label>
        </h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${"sp-card"}
            .renderItem=${renderItem}
            role="grid"
            aria-label="Select images"
            aria-multiselectable="true"
            aria-rowcount=${items.length}
            aria-colcount=${1}
        ></sp-grid>
        <sp-action-bar variant="fixed">
            <sp-checkbox
                style="margin-block-start: calc(var(--spectrum-checkbox-top-to-control-small) * -1);"
                @click=${handleActionBarChange}
                checked
            >
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet slot="buttons">
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>
            <label for="last-input">
                Random after content that is focusable
            </label>
        </h2>
        <input id="last-input" />
    `};Default.swc_vrt={skip:!0},Default.parameters={chromatic:{disableSnapshot:!0}};const sized=({gap:gap,padding:padding}={gap:10,padding:10})=>{const items=generateItems(1e3);function handleMediaChange(){let width=.4*document.body.offsetWidth;matchMedium.matches?width=300:matchLarge.matches&&(width=400),document.querySelector("sp-grid").itemSize={width:width,height:300}}const matchSmall=window.matchMedia("(max-width: 600px)"),matchMedium=window.matchMedia("(min-width: 601px) and (max-width: 1200px)"),matchLarge=window.matchMedia("(min-width: 1201px)");return matchSmall.addEventListener("change",handleMediaChange),matchMedium.addEventListener("change",handleMediaChange),matchLarge.addEventListener("change",handleMediaChange),index_dev.qy`
        <h1>Random before content that is focusable</h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${"sp-card"}
            .renderItem=${renderItem}
            .itemSize=${{width:200,height:300}}
            .gap=${`${gap}px`}
            .padding=${`${padding}px`}
        ></sp-grid>
        <sp-action-bar variant="fixed" style="display: none">
            <sp-checkbox @click=${handleActionBarChange} checked>
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet>
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>Random after content that is focusable</h2>
        <input id="last-input" />
    `};sized.args={gap:10,padding:10},sized.argTypes={gap:{name:"gap",type:{name:"number",required:!1},description:"Spacing between items.",table:{type:{summary:"number"}},control:{type:"number"}},padding:{name:"padding",type:{name:"number",required:!1},description:"Spacing around all items.",table:{type:{summary:"number"}},control:{type:"number"}}},sized.swc_vrt={skip:!0},sized.parameters={chromatic:{disableSnapshot:!0}};class MyParent extends index_dev.wG{render(){return index_dev.qy`
            <div class="child"><slot></slot></div>
        `}}MyParent.styles=[index_dev.AH`
            :host {
                display: block;
                height: 100vh;
                overflow: hidden;
            }

            .child {
                height: 100%;
                overflow: scroll;
            }
        `],customElements.define("my-parent",MyParent);const scrollParentInAssignedSlot=()=>{const items=generateItems(1e3);return index_dev.qy`
        <my-parent>
            <sp-grid
                .items=${items}
                .focusableSelector=${"sp-card"}
                .renderItem=${renderItem}
            ></sp-grid>
        </my-parent>
    `};scrollParentInAssignedSlot.swc_vrt={skip:!0},scrollParentInAssignedSlot.parameters={chromatic:{disableSnapshot:!0}};const __namedExportsOrder=["Default","sized","scrollParentInAssignedSlot"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => {\n  const items = generateItems(40);\n  return html`\n        <h1>\n            <label for="first-input">\n                Random before content that is focusable\n            </label>\n        </h1>\n        <input id="first-input" />\n        <sp-grid\n            @change=${handleChange}\n            .items=${items}\n            .focusableSelector=${"sp-card"}\n            .renderItem=${renderItem}\n            role="grid"\n            aria-label="Select images"\n            aria-multiselectable="true"\n            aria-rowcount=${items.length}\n            aria-colcount=${1}\n        ></sp-grid>\n        <sp-action-bar variant="fixed">\n            <sp-checkbox\n                style="margin-block-start: calc(var(--spectrum-checkbox-top-to-control-small) * -1);"\n                @click=${handleActionBarChange}\n                checked\n            >\n                <span class="selected"></span>\n                Selected\n                <span class="ids"></span>\n            </sp-checkbox>\n            <sp-action-group quiet slot="buttons">\n                <sp-action-button>\n                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>\n                </sp-action-button>\n                <sp-action-button>\n                    <sp-icon-more slot="icon" label="More"></sp-icon-more>\n                </sp-action-button>\n            </sp-action-group>\n        </sp-action-bar>\n        <h2>\n            <label for="last-input">\n                Random after content that is focusable\n            </label>\n        </h2>\n        <input id="last-input" />\n    `;\n}',...Default.parameters?.docs?.source}}},sized.parameters={...sized.parameters,docs:{...sized.parameters?.docs,source:{originalSource:'({\n  gap,\n  padding\n} = {\n  gap: 10,\n  padding: 10\n}) => {\n  const items = generateItems(1e3);\n  function handleMediaChange() {\n    let width = document.body.offsetWidth * 0.4;\n    const height = 300;\n    if (matchMedium.matches) {\n      width = 300;\n    } else if (matchLarge.matches) {\n      width = 400;\n    }\n    document.querySelector("sp-grid").itemSize = {\n      width,\n      height\n    };\n  }\n  const matchSmall = window.matchMedia("(max-width: 600px)");\n  const matchMedium = window.matchMedia("(min-width: 601px) and (max-width: 1200px)");\n  const matchLarge = window.matchMedia("(min-width: 1201px)");\n  matchSmall.addEventListener("change", handleMediaChange);\n  matchMedium.addEventListener("change", handleMediaChange);\n  matchLarge.addEventListener("change", handleMediaChange);\n  return html`\n        <h1>Random before content that is focusable</h1>\n        <input id="first-input" />\n        <sp-grid\n            @change=${handleChange}\n            .items=${items}\n            .focusableSelector=${"sp-card"}\n            .renderItem=${renderItem}\n            .itemSize=${{\n    width: 200,\n    height: 300\n  }}\n            .gap=${`${gap}px`}\n            .padding=${`${padding}px`}\n        ></sp-grid>\n        <sp-action-bar variant="fixed" style="display: none">\n            <sp-checkbox @click=${handleActionBarChange} checked>\n                <span class="selected"></span>\n                Selected\n                <span class="ids"></span>\n            </sp-checkbox>\n            <sp-action-group quiet>\n                <sp-action-button>\n                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>\n                </sp-action-button>\n                <sp-action-button>\n                    <sp-icon-more slot="icon" label="More"></sp-icon-more>\n                </sp-action-button>\n            </sp-action-group>\n        </sp-action-bar>\n        <h2>Random after content that is focusable</h2>\n        <input id="last-input" />\n    `;\n}',...sized.parameters?.docs?.source}}},scrollParentInAssignedSlot.parameters={...scrollParentInAssignedSlot.parameters,docs:{...scrollParentInAssignedSlot.parameters?.docs,source:{originalSource:'() => {\n  const items = generateItems(1e3);\n  return html`\n        <my-parent>\n            <sp-grid\n                .items=${items}\n                .focusableSelector=${"sp-card"}\n                .renderItem=${renderItem}\n            ></sp-grid>\n        </my-parent>\n    `;\n}',...scrollParentInAssignedSlot.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=grid-stories-grid-stories.6091d2e0.iframe.bundle.js.map