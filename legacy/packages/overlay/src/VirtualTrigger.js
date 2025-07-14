"use strict";import{AbstractOverlay as e}from"./AbstractOverlay.js";export class VirtualTrigger{constructor(t,i){this.x=0;this.y=0;this.x=t,this.y=i}updateBoundingClientRect(t,i){this.x=t,this.y=i,e.update()}getBoundingClientRect(){return{width:0,height:0,top:this.y,right:this.x,y:this.y,x:this.x,bottom:this.y,left:this.x,toJSON(){}}}}
//# sourceMappingURL=VirtualTrigger.js.map
