import { P as PropertiesIcon, V as ViewAllTagsIcon } from './ViewAllTags-0af463f4.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-d00b1a4e.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-e64f5ea4.js';

class IconProperties extends IconBase{render(){return setCustomTemplateLiteralTag(x),PropertiesIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-properties",IconProperties);

class IconViewAllTags extends IconBase{render(){return setCustomTemplateLiteralTag(x),ViewAllTagsIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-view-all-tags",IconViewAllTags);
