import { a as CloseIcon, C as ChevronDownIcon } from './ChevronDown-8a6d0720.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-fdbfb1c1.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-467f3dc4.js';

class IconClose extends IconBase{render(){return setCustomTemplateLiteralTag(x),CloseIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-close",IconClose);

class IconChevronDown extends IconBase{render(){return setCustomTemplateLiteralTag(x),ChevronDownIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-chevron-down",IconChevronDown);
