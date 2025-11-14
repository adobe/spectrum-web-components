"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[6534],{"./packages/table/stories/table-virtualized.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return table_virtualized_stories},virtualized:function(){return virtualized},virtualizedCustomRow:function(){return virtualizedCustomRow},virtualizedCustomValue:function(){return virtualizedCustomValue},virtualizedMultiple:function(){return virtualizedMultiple},virtualizedNoScroller:function(){return virtualizedNoScroller},virtualizedSingle:function(){return virtualizedSingle}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/table/sp-table.dev.js"),__webpack_require__("./packages/table/sp-table-checkbox-cell.dev.js"),__webpack_require__("./packages/table/sp-table-head.dev.js"),__webpack_require__("./packages/table/sp-table-head-cell.dev.js"),__webpack_require__("./packages/table/sp-table-body.dev.js"),__webpack_require__("./packages/table/sp-table-row.dev.js"),__webpack_require__("./packages/table/sp-table-cell.dev.js");function makeItems(count){const total=count,items=[];for(;count;)count--,items.push({name:String(total-count),date:count});return items}const renderItem=(item,index)=>1===item._$rowType$?index_dev.qy`
            <sp-table-cell>This row has no checkbox!</sp-table-cell>
        `:index_dev.qy`
        <sp-table-cell>Row Item ${item.name}</sp-table-cell>
        <sp-table-cell>Row Item ${item.date}</sp-table-cell>
        <sp-table-cell>Row Item ${index}</sp-table-cell>
    `;var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,table_virtualized_stories={title:"Table/Virtualized",component:"sp-table",argTypes:{onChange:{action:"change"},selected:{name:"selected",description:"The array of item values selected by the Table.",type:{name:"",required:!1},control:"text"},selects:{name:"selects",description:'If the Table accepts a "single" or "multiple" selection.',control:{type:"inline-radio",options:["","single","multiple"]}}},args:{selects:"",selected:[]}};class VirtualTable extends index_dev.wG{constructor(){super(),this.items=makeItems(50),this.compareItems=(sortKey,sortDirection)=>(a,b)=>{const doSortKey=sortKey;if(isNaN(Number(a[doSortKey]))){const first=String(a[doSortKey]),second=String(b[doSortKey]);return"asc"===sortDirection?first.localeCompare(second):second.localeCompare(first)}{const first=Number(a[doSortKey]),second=Number(b[doSortKey]);return"asc"===sortDirection?first-second:second-first}},this.items.sort(this.compareItems("name","desc"))}render(){return index_dev.qy`
            <sp-table
                .items=${this.items}
                .renderItem=${renderItem}
                size="m"
                scroller="true"
                style="height: 200px"
                @sorted=${event=>{const{sortKey:sortKey,sortDirection:sortDirection}=event.detail,items=[...this.items];items.sort(this.compareItems(sortKey,sortDirection)),this.items=items}}
            >
                <sp-table-head>
                    <sp-table-head-cell
                        sortable
                        sort-key="name"
                        sort-direction="desc"
                    >
                        Column Title
                    </sp-table-head-cell>
                    <sp-table-head-cell sortable sort-key="date">
                        Column Title
                    </sp-table-head-cell>
                    <sp-table-head-cell>Column Title</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
        `}}((decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);kind&&result&&__defProp(target,key,result)})([(0,decorators_dev.MZ)({type:Array})],VirtualTable.prototype,"items",2),customElements.define("virtual-table",VirtualTable);const virtualItems=makeItems(50),virtualized=()=>index_dev.qy`
        <virtual-table></virtual-table>
    `,virtualizedSingle=args=>{const onChange=args.onChange||(()=>{});return index_dev.qy`
        <sp-table
            size="m"
            scroller="true"
            style="height: 300px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({target:target})=>{target.nextElementSibling.textContent=`Selected: ${JSON.stringify(target.selected)}`}}
            .items=${virtualItems}
            .renderItem=${renderItem}
            @visibilityChanged=${event=>onChange({first:event.first,last:event.last,type:"visibility"})}
            @rangeChanged=${event=>onChange({first:event.first,last:event.last,type:"range"})}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["49"]</div>
    `};virtualizedSingle.args={selects:"single",selected:["49"]};const virtualizedMultiple=args=>index_dev.qy`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({target:target})=>{const next=target.nextElementSibling;next.textContent=`Selected: ${JSON.stringify(target.selected,null," ")}`;next.nextElementSibling.textContent=`Selected Count: ${target.selected.length}`}}
            .items=${virtualItems}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["0", "48"]</div>
        <div>Selected Count: 2</div>
    `;virtualizedMultiple.args={selects:"multiple",selected:["0","48"]};const virtualizedCustomValue=args=>index_dev.qy`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${args.onChange}
            .items=${virtualItems}
            .itemValue=${item=>"applied-"+item.date}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
            <sp-table-body></sp-table-body>
        </sp-table>
        <div>Selected: ["0", "48", "applied-47"]</div>
        <div>Selected Count: 2</div>
    `;virtualizedCustomValue.args={selected:["0","48","applied-47"],selects:"multiple",onChange:({target:target})=>{const next=target.nextElementSibling;next.textContent=`Selected: ${JSON.stringify(target.selected,null," ")}`;next.nextElementSibling.textContent=`Selected Count: ${target.selected.length}`}};const virtualizedCustomRow=args=>(virtualItems.splice(3,1,{name:"Scoobert",date:2,_$rowType$:1}),index_dev.qy`
        <sp-table
            size="m"
            scroller="true"
            style="height: 200px"
            selects=${args.selects}
            .selected=${args.selected}
            @change=${({target:target})=>{const next=target.nextElementSibling;next.textContent=`Selected: ${JSON.stringify(target.selected,null," ")}`;next.nextElementSibling.textContent=`Selected Count: ${target.selected.length}`}}
            scroller?="false"
            .items=${virtualItems}
            .renderItem=${renderItem}
        >
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
        <div>Selected: ["0", "48"]</div>
        <div>Selected Count: 2</div>
    `);virtualizedCustomRow.args={selects:"multiple",selected:["0","48"]};const virtualizedNoScroller=()=>index_dev.qy`
        <sp-table size="m" .items=${virtualItems} .renderItem=${renderItem}>
            <sp-table-head>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
                <sp-table-head-cell>Column Title</sp-table-head-cell>
            </sp-table-head>
        </sp-table>
    `,__namedExportsOrder=["virtualized","virtualizedSingle","virtualizedMultiple","virtualizedCustomValue","virtualizedCustomRow","virtualizedNoScroller"];virtualized.parameters={...virtualized.parameters,docs:{...virtualized.parameters?.docs,source:{originalSource:"() => {\n  return html`\n        <virtual-table></virtual-table>\n    `;\n}",...virtualized.parameters?.docs?.source}}},virtualizedSingle.parameters={...virtualizedSingle.parameters,docs:{...virtualizedSingle.parameters?.docs,source:{originalSource:'args => {\n  const onChange = args.onChange || (() => {\n    return;\n  });\n  return html`\n        <sp-table\n            size="m"\n            scroller="true"\n            style="height: 300px"\n            selects=${args.selects}\n            .selected=${args.selected}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected)}`;\n  }}\n            .items=${virtualItems}\n            .renderItem=${renderItem}\n            @visibilityChanged=${event => onChange({\n    first: event.first,\n    last: event.last,\n    type: "visibility"\n  })}\n            @rangeChanged=${event => onChange({\n    first: event.first,\n    last: event.last,\n    type: "range"\n  })}\n        >\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n        </sp-table>\n        <div>Selected: ["49"]</div>\n    `;\n}',...virtualizedSingle.parameters?.docs?.source}}},virtualizedMultiple.parameters={...virtualizedMultiple.parameters,docs:{...virtualizedMultiple.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-table\n            size="m"\n            scroller="true"\n            style="height: 200px"\n            selects=${args.selects}\n            .selected=${args.selected}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected, null, " ")}`;\n    const nextNext = next.nextElementSibling;\n    nextNext.textContent = `Selected Count: ${target.selected.length}`;\n  }}\n            .items=${virtualItems}\n            .renderItem=${renderItem}\n        >\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n        </sp-table>\n        <div>Selected: ["0", "48"]</div>\n        <div>Selected Count: 2</div>\n    `;\n}',...virtualizedMultiple.parameters?.docs?.source}}},virtualizedCustomValue.parameters={...virtualizedCustomValue.parameters,docs:{...virtualizedCustomValue.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-table\n            size="m"\n            scroller="true"\n            style="height: 200px"\n            selects=${args.selects}\n            .selected=${args.selected}\n            @change=${args.onChange}\n            .items=${virtualItems}\n            .itemValue=${item => "applied-" + item.date}\n            .renderItem=${renderItem}\n        >\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n            <sp-table-body></sp-table-body>\n        </sp-table>\n        <div>Selected: ["0", "48", "applied-47"]</div>\n        <div>Selected Count: 2</div>\n    `;\n}',...virtualizedCustomValue.parameters?.docs?.source}}},virtualizedCustomRow.parameters={...virtualizedCustomRow.parameters,docs:{...virtualizedCustomRow.parameters?.docs,source:{originalSource:'args => {\n  virtualItems.splice(3, 1, {\n    name: "Scoobert",\n    date: 2,\n    _$rowType$: 1\n  });\n  return html`\n        <sp-table\n            size="m"\n            scroller="true"\n            style="height: 200px"\n            selects=${args.selects}\n            .selected=${args.selected}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected, null, " ")}`;\n    const nextNext = next.nextElementSibling;\n    nextNext.textContent = `Selected Count: ${target.selected.length}`;\n  }}\n            scroller?="false"\n            .items=${virtualItems}\n            .renderItem=${renderItem}\n        >\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n        </sp-table>\n        <div>Selected: ["0", "48"]</div>\n        <div>Selected Count: 2</div>\n    `;\n}',...virtualizedCustomRow.parameters?.docs?.source}}},virtualizedNoScroller.parameters={...virtualizedNoScroller.parameters,docs:{...virtualizedNoScroller.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-table size="m" .items=${virtualItems} .renderItem=${renderItem}>\n            <sp-table-head>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n                <sp-table-head-cell>Column Title</sp-table-head-cell>\n            </sp-table-head>\n        </sp-table>\n    `;\n}',...virtualizedNoScroller.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=table-stories-table-virtualized-stories.6dda0f26.iframe.bundle.js.map