import { A as AnchorSelectIcon, P as PolygonSelectIcon, R as RectSelectIcon } from './RectSelect-7ce6add0.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-d9572ad8.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-617dba69.js';

class IconAnchorSelect extends IconBase{render(){return setCustomTemplateLiteralTag(x),AnchorSelectIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-anchor-select",IconAnchorSelect);

class IconPolygonSelect extends IconBase{render(){return setCustomTemplateLiteralTag(x),PolygonSelectIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-polygon-select",IconPolygonSelect);

class IconRectSelect extends IconBase{render(){return setCustomTemplateLiteralTag(x),RectSelectIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-rect-select",IconRectSelect);
