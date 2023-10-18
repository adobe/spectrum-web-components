import { A as AlignLeftIcon, a as AlignRightIcon } from './AlignRight-add3a932.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-d00b1a4e.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-e64f5ea4.js';

class IconAlignLeft extends IconBase{render(){return setCustomTemplateLiteralTag(x),AlignLeftIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-align-left",IconAlignLeft);

class IconAlignRight extends IconBase{render(){return setCustomTemplateLiteralTag(x),AlignRightIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-align-right",IconAlignRight);
