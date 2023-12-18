import { P as PropertiesIcon, V as ViewAllTagsIcon } from './ViewAllTags-0af463f4.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-7772fb01.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-7dc6a572.js';

class IconProperties extends IconBase{render(){return setCustomTemplateLiteralTag(x),PropertiesIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-properties",IconProperties);

class IconViewAllTags extends IconBase{render(){return setCustomTemplateLiteralTag(x),ViewAllTagsIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-view-all-tags",IconViewAllTags);
