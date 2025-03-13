import { s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { H as HelpOutlineIcon, I as InfoOutlineIcon } from './InfoOutline-d80wZh7p.js';
import { D as DefaultIcon } from './DefaultIcon-BpPg5UB-.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';
import { I as InfoCircleIcon } from './InfoCircle-DLqulD5C.js';

class IconHelpOutline extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===1?HelpOutlineIcon({hidden:!this.label,title:this.label}):DefaultIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-help-outline",IconHelpOutline);

class IconInfoOutline extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===1?InfoOutlineIcon({hidden:!this.label,title:this.label}):InfoCircleIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-info-outline",IconInfoOutline);
