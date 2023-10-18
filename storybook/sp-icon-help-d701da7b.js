import { H as HelpIcon } from './Help-10c43472.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-d00b1a4e.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-e64f5ea4.js';

class IconHelp extends IconBase{render(){return setCustomTemplateLiteralTag(x),HelpIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-help",IconHelp);
