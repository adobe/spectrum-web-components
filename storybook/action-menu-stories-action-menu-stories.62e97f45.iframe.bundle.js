"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[7454],{"./node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/async-directive.js")},"./packages/action-menu/stories/action-menu.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},MenuItemAlerts:function(){return MenuItemAlerts},__namedExportsOrder:function(){return __namedExportsOrder},controlled:function(){return controlled},customIcon:function(){return customIcon},directive:function(){return directive},forcePopoverOnMobile:function(){return forcePopoverOnMobile},groups:function(){return groups},groupsWithSelects:function(){return groupsWithSelects},iconOnly:function(){return iconOnly},labelOnly:function(){return labelOnly},quiet:function(){return quiet},selects:function(){return selects},staticBlack:function(){return staticBlack},staticWhite:function(){return staticWhite},submenu:function(){return submenu},tooltipDescriptionAndPlacement:function(){return tooltipDescriptionAndPlacement},withScrollEvent:function(){return withScrollEvent}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js"),_spectrum_web_components_overlay_src_slottable_request_directive_js__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/menu/sp-menu-group.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/overlay/src/slottable-request-directive.dev.js")),_button_stories_index_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./packages/button/stories/index.js")),_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./packages/overlay/stories/index.js"),___WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./packages/action-menu/stories/index.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-settings.js");__webpack_exports__.default={component:"sp-action-menu",title:"Action menu",argTypes:{onChange:{action:"change"},disabled:{name:"disabled",type:{name:"boolean",required:!1},description:"Disable this control. It will not receive focus or events.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},open:{name:"open",type:{name:"boolean",required:!1},description:"Whether the menu is open or not.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:"boolean"},visibleLabel:{name:"Visible Label",description:"The placeholder content for the picker.",type:{name:"string",required:!1},table:{type:{summary:"string"},defaultValue:{summary:""}},control:"text"},tooltipDescription:{name:"Tooltip Description",type:{name:"string",required:!1},description:"Tooltip description",table:{type:{summary:"string"},defaultValue:{summary:""}},control:{type:"text"}},tooltipPlacement:{name:"Tooltip Placement",type:{name:"string",required:!1},description:"Tooltip Placement.",table:{defaultValue:{summary:"bottom"}},control:{options:["auto","auto-start","auto-end","top","bottom","right","left","top-start","top-end","bottom-start","bottom-end","right-start","right-end","left-start","left-end","none"],type:"select"}},quiet:{name:"quiet",type:{name:"boolean",required:!1},description:"Quiet rendering",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},staticColorValue:{name:"static-color",type:{name:"string",required:!1},description:"The visual static color variant to apply to the button.",table:{type:{summary:"string"},defaultValue:{summary:"none"}},control:{type:"select",labels:{white:"white",black:"black",none:void 0},options:["white","black","none"]}},align:{name:"align",type:{name:"string",required:!1},description:"Alignment of the Action Menu",table:{defaultValue:{summary:"start"}},control:{type:"select",labels:{start:"start",end:"end"}},options:["start","end"]}},args:{align:"start",visibleLabel:"More Actions",disabled:!1,forcePopover:!1,open:!1,quiet:!1,tooltipDescription:"",tooltipPlacement:"bottom",static:void 0}};const Template=(args={})=>(0,___WEBPACK_IMPORTED_MODULE_11__.q)(args),Default=(args={})=>Template(args),staticWhite=(args={})=>Template(args);staticWhite.args={staticValue:"white"},staticWhite.decorators=[(0,_button_stories_index_js__WEBPACK_IMPORTED_MODULE_9__.dg)()];const staticBlack=(args={})=>Template(args);staticBlack.args={staticValue:"black"},staticBlack.decorators=[(0,_button_stories_index_js__WEBPACK_IMPORTED_MODULE_9__.dg)()];const quiet=(args={})=>Template(args);quiet.args={quiet:!0};const forcePopoverOnMobile=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <div style="padding: 40px">
        <h1>Force Popover on Mobile</h1>
        <p>
            The force-popover attribute overrides the mobile device
            functionality of rendering a tray so that a popover will always
            render no matter the device.
        </p>
        <ol>
            <li>Open Chrome DevTools (or equivalent).</li>
            <li>Toggle the Device Toolbar (the phone/tablet icon).</li>
            <li>Select a device preset (e.g. iPhone 12).</li>
            <li>
                Chrome will set user-agent strings, simulate touch, and adjust
                DPI.
            </li>
            <li>Reload the page</li>
            <li>Click the Action Menu and see a popover</li>
        </ol>
        <sp-action-menu force-popover>
            <span slot="icon">
                <sp-icon-settings></sp-icon-settings>
            </span>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    </div>
`,labelOnly=({align:align="start",changeHandler:changeHandler=()=>{},disabled:disabled=!1,open:open=!1,size:size="m",selects:selects2="",selected:selected=!1}={})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <sp-action-menu
        ?disabled=${disabled}
        ?open=${open}
        size=${size}
        @change=${event=>{navigator.clipboard.writeText(event.target.value),changeHandler(event)}}
        .selects=${selects2||void 0}
        value=${selected?"Select Inverse":""}
        style=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)("end"===align?"float: inline-end;":void 0)}
    >
        <span slot="label-only">Label Only</span>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    </sp-action-menu>
`,selects=(args={})=>Template({...args,selects:"single",selected:!0});selects.args={open:!0},selects.decorators=[_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__.Z],selects.swc_vrt={skip:!0};const iconOnly=(args={})=>Template(args);iconOnly.args={visibleLabel:""};const tooltipDescriptionAndPlacement=(args={})=>Template(args);tooltipDescriptionAndPlacement.args={tooltipDescription:"Your tooltip string here",visibleLabel:"",tooltipPlacement:"bottom"};const customIcon=args=>Template(args);customIcon.args={customIcon:'<sp-icon-settings slot="icon"></sp-icon-settings>',visibleLabel:""};const submenu=({align:align="start"}={})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu
            label="More Actions"
            style=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)("end"===align?"float: inline-end;":void 0)}
        >
            <sp-menu-item>One</sp-menu-item>
            <sp-menu-item>Two</sp-menu-item>
            <sp-menu-item>
                Select some items
                <sp-menu slot="submenu" selects="multiple">
                    <sp-menu-item>A</sp-menu-item>
                    <sp-menu-item selected>B</sp-menu-item>
                    <sp-menu-item>C</sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
    `,controlled=({align:align="start"}={})=>{const state={snap:!0,grid:!1,guides:!0,latestChange:""};function toggle(prop){return event=>{const item=event.target;state[prop]=!state[prop],item.selected=state[prop]}}return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu
            label="View"
            @change=${function onChange(event){state.latestChange=event.target.value,function logState(){document.getElementById("state-json").textContent=`application state: ${JSON.stringify(state)}`}()}}
            style=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)("end"===align?"float: inline-end;":void 0)}
        >
            <sp-menu-item value="action" @click=${()=>alert("action")}>
                Non-selectable action
            </sp-menu-item>
            <sp-menu-item
                value="snap"
                ?selected=${state.snap}
                @click=${toggle("snap")}
            >
                Snap
            </sp-menu-item>
            <sp-menu-item>
                Show
                <sp-menu
                    slot="submenu"
                    selects="multiple"
                    @change=${event=>event.preventDefault()}
                >
                    <sp-menu-item
                        value="grid"
                        ?selected=${state.grid}
                        @click=${toggle("grid")}
                    >
                        Grid
                    </sp-menu-item>
                    <sp-menu-item
                        value="guides"
                        ?selected=${state.guides}
                        @click=${toggle("guides")}
                    >
                        Guides
                    </sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
        <span id="state-json"></span>
    `},groups=({align:align="start",onChange:onChange})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <sp-action-menu
        id="groups"
        @change=${({target:{value:value}})=>onChange(value)}
        open
        style=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)("end"===align?"float: inline-end;":void 0)}
    >
        <sp-menu-group id="cms">
            <span slot="header">cms</span>
            <sp-menu-item value="updateAllSiteContent">
                Update All Content
            </sp-menu-item>
            <sp-menu-item value="refreshAllXDs">Refresh All XDs</sp-menu-item>
        </sp-menu-group>
        <sp-menu-group id="ssg">
            <span slot="header">ssg</span>
            <sp-menu-item value="clearCache">Clear Cache</sp-menu-item>
        </sp-menu-group>
        <sp-menu-group id="vrt">
            <span slot="header">vrt</span>
            <sp-menu-item value="vrt-contributions">Contributions</sp-menu-item>
            <sp-menu-item value="vrt-internal">Internal</sp-menu-item>
            <sp-menu-item value="vrt-public">Public</sp-menu-item>
            <sp-menu-item value="vrt-patterns">Patterns</sp-menu-item>
            <sp-menu-item value="vrt">All</sp-menu-item>
        </sp-menu-group>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-group id="misc">
            <sp-menu-item value="logout">Logout</sp-menu-item>
        </sp-menu-group>
    </sp-action-menu>
`;groups.decorators=[_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__.Z];const groupsWithSelects=({onChange:onChange})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu
            @change=${({target:{value:value}})=>onChange(value)}
            label="Filter or Sort"
        >
            <sp-menu-group selects="single">
                <span slot="header">Sort By</span>
                <sp-menu-item>Name</sp-menu-item>
                <sp-menu-item>Created</sp-menu-item>
                <sp-menu-item>Modified</sp-menu-item>
            </sp-menu-group>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-group selects="multiple">
                <sp-menu-item>Reverse Order</sp-menu-item>
            </sp-menu-group>
        </sp-action-menu>
    `;groupsWithSelects.swc_vrt={skip:!0},groupsWithSelects.parameters={chromatic:{disableSnapshot:!0}};const directive=()=>{const renderSubmenu=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu-item>Submenu Item 1</sp-menu-item>
        <sp-menu-item>Submenu Item 2</sp-menu-item>
        <sp-menu-item>Submenu Item 3</sp-menu-item>
        <sp-menu-item>Submenu Item 4</sp-menu-item>
    `;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu ${(0,_spectrum_web_components_overlay_src_slottable_request_directive_js__WEBPACK_IMPORTED_MODULE_7__.i)(()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select Inverse</sp-menu-item>
        <sp-menu-item>
            Feather...
            <sp-menu
                slot="submenu"
                ${(0,_spectrum_web_components_overlay_src_slottable_request_directive_js__WEBPACK_IMPORTED_MODULE_7__.i)(renderSubmenu)}
            ></sp-menu>
        </sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    `)}>
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
        </sp-action-menu>
    `};directive.swc_vrt={skip:!0},directive.parameters={chromatic:{disableSnapshot:!0}};const withScrollEvent=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-menu @scroll=${function handleActionMenuScroll(){console.log("attached action menu scroll listener")}} open>
            <span slot="label">This is an Action Menu</span>
            ${function renderMenuItems(){return Array.from({length:30},(_,i)=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                <sp-menu-item style="width: 100%;">
                    This is an Action Menu Item ${i+1}
                </sp-menu-item>
            `)}()}
        </sp-action-menu>
    `;withScrollEvent.parameters={chromatic:{disableSnapshot:!0}};const MenuItemAlerts=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <sp-action-menu size="m">
        <span slot="label">More Actions</span>
        <sp-menu-item @click=${()=>alert("Deselect")}>Deselect</sp-menu-item>
        <sp-menu-item @click=${()=>alert("Select inverse")}>
            Select inverse
        </sp-menu-item>
        <sp-menu-item @click=${()=>alert("Feather...")}>
            Feather...
        </sp-menu-item>
        <sp-menu-item @click=${()=>alert("Select and mask...")}>
            Select and mask...
        </sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item @click=${()=>alert("Save selection")}>
            Save selection
        </sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
    </sp-action-menu>
`,__namedExportsOrder=["Default","staticWhite","staticBlack","quiet","forcePopoverOnMobile","labelOnly","selects","iconOnly","tooltipDescriptionAndPlacement","customIcon","submenu","controlled","groups","groupsWithSelects","directive","withScrollEvent","MenuItemAlerts"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"(args = {}) => Template(args)",...Default.parameters?.docs?.source}}},staticWhite.parameters={...staticWhite.parameters,docs:{...staticWhite.parameters?.docs,source:{originalSource:"(args = {}) => Template(args)",...staticWhite.parameters?.docs?.source}}},staticBlack.parameters={...staticBlack.parameters,docs:{...staticBlack.parameters?.docs,source:{originalSource:"(args = {}) => Template(args)",...staticBlack.parameters?.docs?.source}}},quiet.parameters={...quiet.parameters,docs:{...quiet.parameters?.docs,source:{originalSource:"(args = {}) => Template(args)",...quiet.parameters?.docs?.source}}},forcePopoverOnMobile.parameters={...forcePopoverOnMobile.parameters,docs:{...forcePopoverOnMobile.parameters?.docs,source:{originalSource:'() => html`\n    <div style="padding: 40px">\n        <h1>Force Popover on Mobile</h1>\n        <p>\n            The force-popover attribute overrides the mobile device\n            functionality of rendering a tray so that a popover will always\n            render no matter the device.\n        </p>\n        <ol>\n            <li>Open Chrome DevTools (or equivalent).</li>\n            <li>Toggle the Device Toolbar (the phone/tablet icon).</li>\n            <li>Select a device preset (e.g. iPhone 12).</li>\n            <li>\n                Chrome will set user-agent strings, simulate touch, and adjust\n                DPI.\n            </li>\n            <li>Reload the page</li>\n            <li>Click the Action Menu and see a popover</li>\n        </ol>\n        <sp-action-menu force-popover>\n            <span slot="icon">\n                <sp-icon-settings></sp-icon-settings>\n            </span>\n            <sp-menu-item>Deselect</sp-menu-item>\n            <sp-menu-item>Select Inverse</sp-menu-item>\n            <sp-menu-item>Feather...</sp-menu-item>\n            <sp-menu-item>Select and Mask...</sp-menu-item>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-item>Save Selection</sp-menu-item>\n            <sp-menu-item disabled>Make Work Path</sp-menu-item>\n        </sp-action-menu>\n    </div>\n`',...forcePopoverOnMobile.parameters?.docs?.source}}},labelOnly.parameters={...labelOnly.parameters,docs:{...labelOnly.parameters?.docs,source:{originalSource:'({\n  align = "start",\n  changeHandler = () => void 0,\n  disabled = false,\n  open = false,\n  size = "m",\n  selects: selects2 = "",\n  selected = false\n} = {}) => html`\n    <sp-action-menu\n        ?disabled=${disabled}\n        ?open=${open}\n        size=${size}\n        @change=${event => {\n  navigator.clipboard.writeText(event.target.value);\n  changeHandler(event);\n}}\n        .selects=${selects2 ? selects2 : void 0}\n        value=${selected ? "Select Inverse" : ""}\n        style=${ifDefined(align === "end" ? "float: inline-end;" : void 0)}\n    >\n        <span slot="label-only">Label Only</span>\n        <sp-menu-item>Deselect</sp-menu-item>\n        <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>\n        <sp-menu-item>Feather...</sp-menu-item>\n        <sp-menu-item>Select and Mask...</sp-menu-item>\n        <sp-menu-divider></sp-menu-divider>\n        <sp-menu-item>Save Selection</sp-menu-item>\n        <sp-menu-item disabled>Make Work Path</sp-menu-item>\n    </sp-action-menu>\n`',...labelOnly.parameters?.docs?.source}}},selects.parameters={...selects.parameters,docs:{...selects.parameters?.docs,source:{originalSource:'(args = {}) => Template({\n  ...args,\n  selects: "single",\n  selected: true\n})',...selects.parameters?.docs?.source}}},iconOnly.parameters={...iconOnly.parameters,docs:{...iconOnly.parameters?.docs,source:{originalSource:"(args = {}) => Template(args)",...iconOnly.parameters?.docs?.source}}},tooltipDescriptionAndPlacement.parameters={...tooltipDescriptionAndPlacement.parameters,docs:{...tooltipDescriptionAndPlacement.parameters?.docs,source:{originalSource:"(args = {}) => Template(args)",...tooltipDescriptionAndPlacement.parameters?.docs?.source}}},customIcon.parameters={...customIcon.parameters,docs:{...customIcon.parameters?.docs,source:{originalSource:"args => Template(args)",...customIcon.parameters?.docs?.source}}},submenu.parameters={...submenu.parameters,docs:{...submenu.parameters?.docs,source:{originalSource:'({\n  align = "start"\n} = {}) => {\n  return html`\n        <sp-action-menu\n            label="More Actions"\n            style=${ifDefined(align === "end" ? "float: inline-end;" : void 0)}\n        >\n            <sp-menu-item>One</sp-menu-item>\n            <sp-menu-item>Two</sp-menu-item>\n            <sp-menu-item>\n                Select some items\n                <sp-menu slot="submenu" selects="multiple">\n                    <sp-menu-item>A</sp-menu-item>\n                    <sp-menu-item selected>B</sp-menu-item>\n                    <sp-menu-item>C</sp-menu-item>\n                </sp-menu>\n            </sp-menu-item>\n        </sp-action-menu>\n    `;\n}',...submenu.parameters?.docs?.source}}},controlled.parameters={...controlled.parameters,docs:{...controlled.parameters?.docs,source:{originalSource:'({\n  align = "start"\n} = {}) => {\n  const state = {\n    snap: true,\n    grid: false,\n    guides: true,\n    latestChange: ""\n  };\n  function toggle(prop) {\n    return event => {\n      const item = event.target;\n      state[prop] = !state[prop];\n      item.selected = state[prop];\n    };\n  }\n  function onChange(event) {\n    state.latestChange = event.target.value;\n    logState();\n  }\n  function logState() {\n    document.getElementById("state-json").textContent = `application state: ${JSON.stringify(state)}`;\n  }\n  return html`\n        <sp-action-menu\n            label="View"\n            @change=${onChange}\n            style=${ifDefined(align === "end" ? "float: inline-end;" : void 0)}\n        >\n            <sp-menu-item value="action" @click=${() => alert("action")}>\n                Non-selectable action\n            </sp-menu-item>\n            <sp-menu-item\n                value="snap"\n                ?selected=${state.snap}\n                @click=${toggle("snap")}\n            >\n                Snap\n            </sp-menu-item>\n            <sp-menu-item>\n                Show\n                <sp-menu\n                    slot="submenu"\n                    selects="multiple"\n                    @change=${event => event.preventDefault()}\n                >\n                    <sp-menu-item\n                        value="grid"\n                        ?selected=${state.grid}\n                        @click=${toggle("grid")}\n                    >\n                        Grid\n                    </sp-menu-item>\n                    <sp-menu-item\n                        value="guides"\n                        ?selected=${state.guides}\n                        @click=${toggle("guides")}\n                    >\n                        Guides\n                    </sp-menu-item>\n                </sp-menu>\n            </sp-menu-item>\n        </sp-action-menu>\n        <span id="state-json"></span>\n    `;\n}',...controlled.parameters?.docs?.source}}},groups.parameters={...groups.parameters,docs:{...groups.parameters?.docs,source:{originalSource:'({\n  align = "start",\n  onChange\n}) => html`\n    <sp-action-menu\n        id="groups"\n        @change=${({\n  target: {\n    value\n  }\n}) => onChange(value)}\n        open\n        style=${ifDefined(align === "end" ? "float: inline-end;" : void 0)}\n    >\n        <sp-menu-group id="cms">\n            <span slot="header">cms</span>\n            <sp-menu-item value="updateAllSiteContent">\n                Update All Content\n            </sp-menu-item>\n            <sp-menu-item value="refreshAllXDs">Refresh All XDs</sp-menu-item>\n        </sp-menu-group>\n        <sp-menu-group id="ssg">\n            <span slot="header">ssg</span>\n            <sp-menu-item value="clearCache">Clear Cache</sp-menu-item>\n        </sp-menu-group>\n        <sp-menu-group id="vrt">\n            <span slot="header">vrt</span>\n            <sp-menu-item value="vrt-contributions">Contributions</sp-menu-item>\n            <sp-menu-item value="vrt-internal">Internal</sp-menu-item>\n            <sp-menu-item value="vrt-public">Public</sp-menu-item>\n            <sp-menu-item value="vrt-patterns">Patterns</sp-menu-item>\n            <sp-menu-item value="vrt">All</sp-menu-item>\n        </sp-menu-group>\n        <sp-menu-divider></sp-menu-divider>\n        <sp-menu-group id="misc">\n            <sp-menu-item value="logout">Logout</sp-menu-item>\n        </sp-menu-group>\n    </sp-action-menu>\n`',...groups.parameters?.docs?.source}}},groupsWithSelects.parameters={...groupsWithSelects.parameters,docs:{...groupsWithSelects.parameters?.docs,source:{originalSource:'({\n  onChange\n}) => {\n  return html`\n        <sp-action-menu\n            @change=${({\n    target: {\n      value\n    }\n  }) => onChange(value)}\n            label="Filter or Sort"\n        >\n            <sp-menu-group selects="single">\n                <span slot="header">Sort By</span>\n                <sp-menu-item>Name</sp-menu-item>\n                <sp-menu-item>Created</sp-menu-item>\n                <sp-menu-item>Modified</sp-menu-item>\n            </sp-menu-group>\n            <sp-menu-divider></sp-menu-divider>\n            <sp-menu-group selects="multiple">\n                <sp-menu-item>Reverse Order</sp-menu-item>\n            </sp-menu-group>\n        </sp-action-menu>\n    `;\n}',...groupsWithSelects.parameters?.docs?.source}}},directive.parameters={...directive.parameters,docs:{...directive.parameters?.docs,source:{originalSource:'() => {\n  const renderSubmenu = () => html`\n        <sp-menu-item>Submenu Item 1</sp-menu-item>\n        <sp-menu-item>Submenu Item 2</sp-menu-item>\n        <sp-menu-item>Submenu Item 3</sp-menu-item>\n        <sp-menu-item>Submenu Item 4</sp-menu-item>\n    `;\n  const renderOptions = () => html`\n        <sp-menu-item>Deselect</sp-menu-item>\n        <sp-menu-item>Select Inverse</sp-menu-item>\n        <sp-menu-item>\n            Feather...\n            <sp-menu\n                slot="submenu"\n                ${slottableRequest(renderSubmenu)}\n            ></sp-menu>\n        </sp-menu-item>\n        <sp-menu-item>Select and Mask...</sp-menu-item>\n        <sp-menu-divider></sp-menu-divider>\n        <sp-menu-item>Save Selection</sp-menu-item>\n        <sp-menu-item disabled>Make Work Path</sp-menu-item>\n    `;\n  return html`\n        <sp-action-menu ${slottableRequest(renderOptions)}>\n            <span slot="label">\n                Select a Country with a very long label, too long in fact\n            </span>\n        </sp-action-menu>\n    `;\n}',...directive.parameters?.docs?.source}}},withScrollEvent.parameters={...withScrollEvent.parameters,docs:{...withScrollEvent.parameters?.docs,source:{originalSource:'() => {\n  function handleActionMenuScroll() {\n    console.log("attached action menu scroll listener");\n  }\n  function renderMenuItems() {\n    return Array.from({\n      length: 30\n    }, (_, i) => html`\n                <sp-menu-item style="width: 100%;">\n                    This is an Action Menu Item ${i + 1}\n                </sp-menu-item>\n            `);\n  }\n  return html`\n        <sp-action-menu @scroll=${handleActionMenuScroll} open>\n            <span slot="label">This is an Action Menu</span>\n            ${renderMenuItems()}\n        </sp-action-menu>\n    `;\n}',...withScrollEvent.parameters?.docs?.source}}},MenuItemAlerts.parameters={...MenuItemAlerts.parameters,docs:{...MenuItemAlerts.parameters?.docs,source:{originalSource:'() => html`\n    <sp-action-menu size="m">\n        <span slot="label">More Actions</span>\n        <sp-menu-item @click=${() => alert("Deselect")}>Deselect</sp-menu-item>\n        <sp-menu-item @click=${() => alert("Select inverse")}>\n            Select inverse\n        </sp-menu-item>\n        <sp-menu-item @click=${() => alert("Feather...")}>\n            Feather...\n        </sp-menu-item>\n        <sp-menu-item @click=${() => alert("Select and mask...")}>\n            Select and mask...\n        </sp-menu-item>\n        <sp-menu-divider></sp-menu-divider>\n        <sp-menu-item @click=${() => alert("Save selection")}>\n            Save selection\n        </sp-menu-item>\n        <sp-menu-item disabled>Make work path</sp-menu-item>\n    </sp-action-menu>\n`',...MenuItemAlerts.parameters?.docs?.source}}}},"./packages/button/sp-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/Button.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-button",_src_Button_dev_js__WEBPACK_IMPORTED_MODULE_0__.$n)},"./packages/button/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{BK:function(){return renderLink},Uv:function(){return argTypes},a2:function(){return args},aR:function(){return renderWithIconOnly},c5:function(){return renderLinkWithTarget},dg:function(){return makeOverBackground},jM:function(){return renderButtonSet},oX:function(){return renderWithIcon},pG:function(){return renderMinWidthButton},vb:function(){return renderButton}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js");__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/icon/sp-icon.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-help.js");const args={disabled:!1,variant:"cta",pending:!1},argTypes={disabled:{name:"disabled",type:{name:"boolean",required:!1},description:"Disable this control. It will not receive focus or events.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},variant:{name:"variant",type:{name:"string",required:!1},description:"The visual variant to apply to the button.",table:{type:{summary:"string"},defaultValue:{summary:"cta"}},control:{type:"inline-radio",options:["cta","accent","primary","secondary","negative","overBackground","black","white"]}},treatment:{name:"treatment",type:{name:"string",required:!1},description:"The visual treatment to apply to the button.",table:{type:{summary:"string"},defaultValue:{summary:"fill"}},control:{type:"inline-radio",options:["fill","outline"]}},pending:{name:"pending",type:{name:"boolean",required:!1},description:"Shows the pending state of the button.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},label:{name:"label",type:{name:"string",required:!1},description:"The label to apply to the aria-label of the button.",table:{type:{summary:"string"}},control:{type:"text"}}},makeOverBackground=staticColor=>story=>{const color="black"===staticColor?"var(--spectrum-docs-static-black-background-color)":"var(--spectrum-docs-static-white-background-color)";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <div
                style="
                    background-color: ${color};
                    padding: calc(var(--swc-scale-factor) * 14px) calc(var(--swc-scale-factor) * 20px);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `};function renderButton(properties){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-button
            ?disabled=${!!properties.disabled}
            href=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.href)}
            ?icon-only=${properties.iconOnly}
            ?pending=${!!properties.pending}
            ?quiet="${!!properties.quiet}"
            ?no-wrap="${!!properties.noWrap}"
            size=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.size)}
            target=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.target)}
            treatment=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.treatment)}
            variant=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.variant)}
            static-color=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.staticColor)}
            label=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(properties.label)}
        >
            ${properties.content||"Click Me"}
        </sp-button>
    `}function renderButtonSet(properties){const disabled=Object.assign({},properties,{disabled:!0}),icon=Object.assign({},properties,{content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-icon-help slot="icon"></sp-icon-help>
            Click Me
        `});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${renderButton(properties)} ${renderButton(disabled)}
        ${renderButton(icon)}
    `}const bellIcon=_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
    <svg slot="icon" viewBox="0 0 36 36" focusable="false" aria-hidden="true">
        <path
            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
        ></path>
    </svg>
`,renderWithIcon=props=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            .row {
                padding: 10px;
            }
        </style>
        <div class="row">
            ${renderButtonSet({...props,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <sp-icon-help slot="icon"></sp-icon-help>
                    Help
                `})}
        </div>
        <div class="row">
            ${renderButtonSet({...props,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                    ${bellIcon} Custom SVG
                `})}
        </div>
    `,renderWithIconOnly=props=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${function renderIconButtonSet(properties){const disabled=Object.assign({},properties,{iconOnly:!0,disabled:!0}),iconOnly=Object.assign({},properties,{iconOnly:!0,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
            <sp-icon-help slot="icon"></sp-icon-help>
        `});return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${renderButton(iconOnly)} ${renderButton(disabled)}
    `}({...props,content:_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                <sp-icon-help slot="icon"></sp-icon-help>
            `})}
    `,renderMinWidthButton=props=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            sp-button {
                min-width: 300px;
            }
        </style>
        ${renderButtonSet(props)}
    `,href="https://github.com/adobe/spectrum-web-components",renderLink=props=>renderButtonSet({...props,href:href}),renderLinkWithTarget=props=>renderButtonSet({...props,href:href,target:"_blank"})},"./packages/icons-workflow/icons/sp-icon-help.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Help=__webpack_require__("./packages/icons-workflow/src/icons/Help.js"),HelpCircle=__webpack_require__("./packages/icons-workflow/src/icons-s2/HelpCircle.js");class IconHelp extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,Help.N)({hidden:!this.label,title:this.label}):(0,HelpCircle.V)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-help",IconHelp)},"./packages/icons-workflow/icons/sp-icon-settings.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Settings=__webpack_require__("./packages/icons-workflow/src/icons/Settings.js");class IconSettings extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:l=24,height:c=24,hidden:t=!1,title:e="Settings"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${c}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${e}"
  >
    <path
      d="M10.00391,12.58887c-.88818,0-1.75293-.45996-2.22803-1.2832h0c-.70801-1.22754-.28613-2.80078.93994-3.50879.59326-.34375,1.28516-.43359,1.94922-.25684.6626.17773,1.21631.60352,1.55908,1.19727.34326.59375.43408,1.28613.25684,1.94824-.17773.66309-.60254,1.2168-1.19678,1.55957-.40332.2334-.84473.34375-1.28027.34375ZM9.07471,10.55566c.29443.50879.94824.68359,1.45947.39062.24707-.14258.42383-.37305.49756-.64844s.03613-.56348-.10645-.81055c-.14307-.24707-.37305-.42383-.64893-.49805-.2749-.07324-.56299-.03516-.81055.10645-.51025.29492-.68555.94922-.39111,1.45996h0Z"
      fill="currentColor"
    />
    <path
      d="M6.90674,18.31836c-.33936,0-.68213-.08496-.99219-.26465l-.81982-.47266c-.89307-.51367-1.25-1.64941-.81104-2.58301l.58008-1.2334c-.26514-.36328-.48975-.75098-.67188-1.16113l-1.35693-.1123c-1.02881-.08496-1.83447-.95996-1.83447-1.99121l-.00098-.94629c0-1.0332.80518-1.90918,1.8335-1.99414l1.35449-.11426c.0918-.20898.19238-.40918.30176-.59961.10986-.19141.2334-.37891.36914-.56445l-.58057-1.22949c-.44092-.93262-.08643-2.06836.80713-2.58496l.82031-.47363c.89258-.5166,2.05371-.25879,2.64258.58984l.77734,1.11816c.44385-.0498.89209-.04785,1.34082,0l.77539-1.11914c.58887-.84961,1.75098-1.10938,2.64355-.59375l.81982.47266c.89404.51562,1.24951,1.65137.81055,2.58398l-.58008,1.23242c.26562.36426.49023.75195.67188,1.16113l1.35693.1123c1.02832.08496,1.83398.95996,1.83496,1.99121l.00049.94727c.00098,1.03125-.80371,1.90723-1.83203,1.99414l-1.35547.11426c-.09131.20898-.19189.4082-.30273.59961h0c-.10938.18945-.23242.37793-.36816.56348l.58057,1.22949c.44043.93164.08643,2.06738-.80664,2.58496l-.8208.47461c-.89355.51855-2.05371.25781-2.64258-.59082l-.77734-1.11816c-.4458.04883-.89404.04785-1.34082.00098l-.77637,1.12012c-.38379.55371-1.01172.85645-1.65039.85645ZM6.9043,3.22461c-.08496,0-.17041.02148-.24805.06641l-.8208.47461c-.22266.12891-.31152.41211-.20117.64551l.77881,1.65039c.12598.2666.08398.58203-.10742.80664-.2041.23926-.37305.47656-.5166.72559-.14111.24609-.26514.51855-.36816.80957-.09814.27832-.3501.47266-.64404.49707l-1.81885.15332c-.26172.02246-.4585.23633-.4585.49902l.00098.94629c0,.25781.20117.47656.4585.49805l1.81934.15039c.29395.02441.54639.21875.64502.49707.19873.56055.49707,1.07617.88672,1.53223.19189.22363.23438.54004.10889.80664l-.77783,1.65234c-.10938.2334-.021.51758.20264.64551l.82031.47363c.22412.12988.51416.06348.66016-.14746l1.04102-1.50195c.16748-.24219.45898-.36914.75244-.30957.58838.10742,1.18457.1084,1.77002-.00098.28955-.05469.58496.06641.75342.30957l1.04199,1.49902c.14648.20996.43848.27637.66064.14746l.82031-.47363c.22607-.13086.31348-.40918.20117-.64648l-.77881-1.65039c-.12598-.2666-.08398-.58203.10742-.80664.2041-.24023.37305-.47656.51562-.72461l.00049-.00098c.14258-.24707.26318-.51172.36865-.80957.09863-.27832.35059-.47266.64453-.49707l1.81885-.15234c.25635-.02246.45752-.24121.45752-.49902l-.00049-.94727c0-.26172-.19727-.47559-.45898-.49805l-1.81885-.15039c-.29395-.02441-.54639-.21875-.64502-.49707-.19775-.55957-.49658-1.0752-.88721-1.53223-.19141-.22461-.23389-.54004-.1084-.80664l.77734-1.65234c.10986-.2334.021-.51758-.20264-.64648l-.81982-.47266c-.22461-.12695-.51416-.06152-.66113.14941l-1.03955,1.5c-.16797.24316-.45898.36816-.75293.31055-.59131-.10938-1.1875-.10938-1.77002,0-.29199.05176-.58545-.06738-.75342-.30957l-1.04199-1.49902c-.09619-.1377-.25293-.21387-.41211-.21387Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Settings.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-settings",IconSettings)},"./packages/icons-workflow/src/icons-s2/HelpCircle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return HelpCircleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const HelpCircleIcon=({width:e=24,height:l=24,hidden:r=!1,title:t="Help Circle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
  >
    <path
      d="m9.9881,15.52679c-.23065.00813-.45538-.07387-.62661-.22862-.33033-.36505-.33033-.92102,0-1.28607.16935-.15851.39483-.24308.62664-.23504.23635-.00948.46589.08035.63302.24775.16207.1679.24916.39432.24137.62755.01238.23497-.06959.46515-.2277.6394-.17358.16474-.40786.24988-.64671.23503Z"
      fill="currentColor"
    />
    <path
      d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="m9.99219,12.70605c-.41406,0-.75-.33594-.75-.75,0-1.02246.07031-1.71387,1.03906-2.68262.78516-.78613.91797-1.10156.91797-1.65137,0-.20996-.06641-1.25781-1.37402-1.25781-1.36523,0-1.51074,1.15625-1.52637,1.3877-.02637.41309-.39258.7207-.79688.69922-.41406-.02734-.72656-.38379-.69922-.79688.06348-.96484.77637-2.79004,3.02246-2.79004,1.88672,0,2.87402,1.3877,2.87402,2.75781,0,1.14355-.45703,1.81055-1.35742,2.71191-.57617.57617-.59961.81152-.59961,1.62207,0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Help.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return HelpIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const HelpIcon=({width:e=24,height:a=24,hidden:t=!1,title:l="Help"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${a}"
    viewBox="0 0 36 36"
    width="${e}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm.047 26.876a2.69 2.69 0 1 1 0-5.375 2.62 2.62 0 0 1 2.8 2.67 2.581 2.581 0 0 1-2.8 2.705Zm3.566-12.818-.2.21c-.789.829-1.684 1.768-1.684 2.351a2.771 2.771 0 0 0 .359 1.348l.145.277-.113.429a.617.617 0 0 1-.567.378h-2.682a.867.867 0 0 1-.65-.235 4.111 4.111 0 0 1-.845-2.525c0-1.677.934-2.714 2.225-4.15.2-.219.39-.42.575-.609.629-.651 1.013-1.071 1.013-1.515 0-.308 0-1.245-1.786-1.245a5.918 5.918 0 0 0-3.159.919.592.592 0 0 1-.653-.02l-.237-.169-.055-.443v-2.9a.879.879 0 0 1 .393-.819 8.275 8.275 0 0 1 4.3-1.1c3.291 0 5.5 2.117 5.5 5.272a6.131 6.131 0 0 1-1.879 4.546Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Settings.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return SettingsIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const SettingsIcon=({width:a=24,height:l=24,hidden:t=!1,title:e="Settings"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${l}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${e}"
  >
    <path
      d="M32.9 15.793h-3.111a11.953 11.953 0 0 0-1.842-4.507l2.205-2.206a1.1 1.1 0 0 0 0-1.56l-1.673-1.672a1.1 1.1 0 0 0-1.56 0l-2.205 2.205a11.925 11.925 0 0 0-4.507-1.841V3.1A1.1 1.1 0 0 0 19.1 2h-2.2a1.1 1.1 0 0 0-1.1 1.1v3.112a11.925 11.925 0 0 0-4.507 1.841l-2.2-2.205a1.1 1.1 0 0 0-1.56 0L5.848 7.52a1.1 1.1 0 0 0 0 1.56l2.205 2.206a11.953 11.953 0 0 0-1.842 4.507H3.1A1.1 1.1 0 0 0 2 16.9v2.2a1.1 1.1 0 0 0 1.1 1.1h3.111a11.934 11.934 0 0 0 1.842 4.507l-2.205 2.212a1.1 1.1 0 0 0 0 1.56l1.673 1.673a1.1 1.1 0 0 0 1.56 0l2.205-2.205a11.925 11.925 0 0 0 4.507 1.841V32.9A1.1 1.1 0 0 0 16.9 34h2.2a1.1 1.1 0 0 0 1.1-1.1v-3.112a11.925 11.925 0 0 0 4.507-1.841l2.205 2.205a1.1 1.1 0 0 0 1.56 0l1.673-1.673a1.1 1.1 0 0 0 0-1.56l-2.205-2.205a11.934 11.934 0 0 0 1.842-4.507H32.9A1.1 1.1 0 0 0 34 19.1v-2.2a1.1 1.1 0 0 0-1.1-1.107ZM22.414 18A4.414 4.414 0 1 1 18 13.586 4.414 4.414 0 0 1 22.414 18Z"
    />
  </svg>`},"./packages/menu/sp-menu-group.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js"),Menu_dev=__webpack_require__("./packages/menu/src/Menu.dev.js");__webpack_require__("./packages/menu/sp-menu.dev.js");var menu_group_css=index_dev.AH`
    .spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.header{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-section-header-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));min-inline-size:var(--mod-menu-section-header-min-width,var(--spectrum-menu-section-header-min-width));padding-block-start:var(--mod-menu-section-header-top-edge-to-text,var(--mod-menu-item-top-edge-to-text,var(--spectrum-menu-item-top-edge-to-text)));padding-block-end:var(--mod-menu-section-header-bottom-edge-to-text,var(--mod-menu-item-bottom-edge-to-text,var(--spectrum-menu-item-bottom-edge-to-text)));padding-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));grid-area:sectionHeadingArea/1/sectionHeadingArea/-1;display:block}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-back .header{padding:0}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-direction:column;margin:0;display:flex;overflow:visible}[hidden]{display:none!important}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class MenuGroup extends Menu_dev.W{constructor(){super(...arguments),this.headerId=""}static get styles(){return[...super.styles,menu_group_css]}get ownRole(){return"group"}get controlsRovingTabindex(){return!1}updateLabel(){const headerElement=this.headerElements.length?this.headerElements[0]:void 0;if(headerElement!==this.headerElement)if(this.headerElement&&this.headerElement.id===this.headerId&&this.headerElement.removeAttribute("id"),headerElement){this.headerId=this.headerId||`sp-menu-group-label-${(0,random_id_dev.l)()}`;const headerId=headerElement.id||this.headerId;headerElement.id||(headerElement.id=headerId),this.setAttribute("aria-labelledby",headerId)}else this.removeAttribute("aria-labelledby");this.headerElement=headerElement}render(){return index_dev.qy`
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            ${this.renderMenuItemSlot()}
        `}}__decorateClass([(0,decorators_dev.gZ)({slot:"header",flatten:!0})],MenuGroup.prototype,"headerElements",2),__decorateClass([(0,decorators_dev.wk)()],MenuGroup.prototype,"headerElement",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-group",MenuGroup)},"./packages/overlay/src/slottable-request-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return SlottableRequestDirective},i:function(){return slottableRequest}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/async-directive.dev.js"),_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js");class SlottableRequestDirective extends _spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{render(_template){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[template]){this.template=template,this.target!==part.element&&(this.target=part.element,this.renderBefore=this.target.children[0]),this.listenerHost=this.target,this.init()}handleSlottableRequest(event){if(event.target!==event.currentTarget)return;const willRemoveSlottable=event.data===_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__.g;(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.XX)(willRemoveSlottable?void 0:this.template(),this.target,{renderBefore:this.renderBefore})}init(){var _a;null==(_a=this.listeners)||_a.abort(),this.listeners=new AbortController;const{signal:signal}=this.listeners;this.listenerHost.addEventListener("slottable-request",event=>this.handleSlottableRequest(event),{signal:signal}),window.__swc.warn(void 0,'⚠️  WARNING ⚠️ : The Overlay Trigger Directive is experimental and there is no guarantees behind its usage in an application!! Its API and presence within the library could be changed at anytime. See "sp-overlay" or "Overlay.open()" for a stable API for overlaying content on your application.',"https://opensource.adobe.com/spectrum-web-components/components/overlay",{level:"high",type:"api"})}disconnected(){var _a;null==(_a=this.listeners)||_a.abort()}reconnected(){this.init()}}const slottableRequest=(0,_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SlottableRequestDirective)},"./tools/base/src/async-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/async-directive.js")}}]);
//# sourceMappingURL=action-menu-stories-action-menu-stories.62e97f45.iframe.bundle.js.map