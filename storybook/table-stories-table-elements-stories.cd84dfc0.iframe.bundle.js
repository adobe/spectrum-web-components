"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[6696],{"./packages/table/stories/table-elements.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},elements:function(){return elements},emphasized:function(){return emphasized},noSelectsSpecified:function(){return noSelectsSpecified},selectsMultiple:function(){return selectsMultiple},selectsSingle:function(){return selectsSingle},small:function(){return small}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/table/sp-table.dev.js"),__webpack_require__("./packages/table/sp-table-checkbox-cell.dev.js"),__webpack_require__("./packages/table/sp-table-head.dev.js"),__webpack_require__("./packages/table/sp-table-head-cell.dev.js"),__webpack_require__("./packages/table/sp-table-body.dev.js"),__webpack_require__("./packages/table/sp-table-row.dev.js"),__webpack_require__("./packages/table/sp-table-cell.dev.js");__webpack_exports__.default={title:"Table",component:"sp-table",args:{selected:[],selects:""},argTypes:{selected:{name:"selected",description:"The value of the selected `<sp-table-row>`(s).",control:{type:"text"}},selects:{name:"selects",description:"Whether the elements selects its children and how many it can select at a time.",table:{type:{summary:"string"},defaultValue:{summary:""}},control:{type:"inline-radio",options:["","single","multiple"]}}}};const elements=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-table>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 200px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `,small=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-table size="s">
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `,selectsSingle=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-table
            selects="single"
            .selected=${["row1"]}
            @change=${({target:target})=>{target.nextElementSibling.textContent=`Selected: ${JSON.stringify(target.selected)}`}}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
        <div>Selected: ["row1"]</div>
    `,noSelectsSpecified=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-table .selected=${["row1","row2"]}>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `,selectsMultiple=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-table
            selects="multiple"
            .selected=${["row1","row2"]}
            @change=${({target:target})=>{const next=target.nextElementSibling;next.textContent=`Selected: ${JSON.stringify(target.selected,null," ")}`;next.nextElementSibling.textContent=`Selected Count: ${target.selected.length}`}}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
        <div>Selected: ["row1", "row2"]</div>
        <div>Selected Count: 2</div>
    `,emphasized=()=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-table emphasized selects="multiple" .selected=${["row1","row2"]}>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body style="height: 120px">
                <sp-table-row value="row1" class="row1">
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                    <sp-table-cell>Row Item Alpha</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row2" class="row2">
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                    <sp-table-cell>Row Item Bravo</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row3" class="row3">
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                    <sp-table-cell>Row Item Charlie</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row4" class="row4">
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                    <sp-table-cell>Row Item Delta</sp-table-cell>
                </sp-table-row>
                <sp-table-row value="row5" class="row5">
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                    <sp-table-cell>Row Item Echo</sp-table-cell>
                </sp-table-row>
            </sp-table-body>
        </sp-table>
    `,__namedExportsOrder=["elements","small","selectsSingle","noSelectsSpecified","selectsMultiple","emphasized"];elements.parameters={...elements.parameters,docs:{...elements.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-table>\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n            <sp-table-body style="height: 200px">\n                <sp-table-row value="row1" class="row1">\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row2" class="row2">\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row3" class="row3">\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row4" class="row4">\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row5" class="row5">\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                </sp-table-row>\n            </sp-table-body>\n        </sp-table>\n    `;\n}',...elements.parameters?.docs?.source}}},small.parameters={...small.parameters,docs:{...small.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-table size="s">\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n            <sp-table-body style="height: 120px">\n                <sp-table-row value="row1" class="row1">\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row2" class="row2">\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row3" class="row3">\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row4" class="row4">\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row5" class="row5">\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                </sp-table-row>\n            </sp-table-body>\n        </sp-table>\n    `;\n}',...small.parameters?.docs?.source}}},selectsSingle.parameters={...selectsSingle.parameters,docs:{...selectsSingle.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-table\n            selects="single"\n            .selected=${["row1"]}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected)}`;\n  }}\n        >\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n            <sp-table-body style="height: 120px">\n                <sp-table-row value="row1" class="row1">\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row2" class="row2">\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row3" class="row3">\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row4" class="row4">\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row5" class="row5">\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                </sp-table-row>\n            </sp-table-body>\n        </sp-table>\n        <div>Selected: ["row1"]</div>\n    `;\n}',...selectsSingle.parameters?.docs?.source}}},noSelectsSpecified.parameters={...noSelectsSpecified.parameters,docs:{...noSelectsSpecified.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-table .selected=${["row1", "row2"]}>\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n            <sp-table-body style="height: 120px">\n                <sp-table-row value="row1" class="row1">\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row2" class="row2">\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row3" class="row3">\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row4" class="row4">\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row5" class="row5">\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                </sp-table-row>\n            </sp-table-body>\n        </sp-table>\n    `;\n}',...noSelectsSpecified.parameters?.docs?.source}}},selectsMultiple.parameters={...selectsMultiple.parameters,docs:{...selectsMultiple.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-table\n            selects="multiple"\n            .selected=${["row1", "row2"]}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected, null, " ")}`;\n    const nextNext = next.nextElementSibling;\n    nextNext.textContent = `Selected Count: ${target.selected.length}`;\n  }}\n        >\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n            <sp-table-body style="height: 120px">\n                <sp-table-row value="row1" class="row1">\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row2" class="row2">\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row3" class="row3">\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row4" class="row4">\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row5" class="row5">\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                </sp-table-row>\n            </sp-table-body>\n        </sp-table>\n        <div>Selected: ["row1", "row2"]</div>\n        <div>Selected Count: 2</div>\n    `;\n}',...selectsMultiple.parameters?.docs?.source}}},emphasized.parameters={...emphasized.parameters,docs:{...emphasized.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-table emphasized selects="multiple" .selected=${["row1", "row2"]}>\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n            <sp-table-body style="height: 120px">\n                <sp-table-row value="row1" class="row1">\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                    <sp-table-cell>Row Item Alpha</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row2" class="row2">\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                    <sp-table-cell>Row Item Bravo</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row3" class="row3">\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                    <sp-table-cell>Row Item Charlie</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row4" class="row4">\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                    <sp-table-cell>Row Item Delta</sp-table-cell>\n                </sp-table-row>\n                <sp-table-row value="row5" class="row5">\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                </sp-table-row>\n            </sp-table-body>\n        </sp-table>\n    `;\n}',...emphasized.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=table-stories-table-elements-stories.cd84dfc0.iframe.bundle.js.map