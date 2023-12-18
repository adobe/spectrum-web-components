import { C as CopyIcon, D as DeleteIcon } from './Delete-8be4a327.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-7772fb01.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-7dc6a572.js';

class IconCopy extends IconBase{render(){return setCustomTemplateLiteralTag(x),CopyIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-copy",IconCopy);

class IconDelete extends IconBase{render(){return setCustomTemplateLiteralTag(x),DeleteIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-delete",IconDelete);
