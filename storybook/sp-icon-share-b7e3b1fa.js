import { E as ExportIcon, F as FolderOpenIcon, S as ShareIcon } from './Share-a3b5a4de.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-7772fb01.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-7dc6a572.js';

class IconExport extends IconBase{render(){return setCustomTemplateLiteralTag(x),ExportIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-export",IconExport);

class IconFolderOpen extends IconBase{render(){return setCustomTemplateLiteralTag(x),FolderOpenIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-folder-open",IconFolderOpen);

class IconShare extends IconBase{render(){return setCustomTemplateLiteralTag(x),ShareIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-share",IconShare);
