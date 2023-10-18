import { E as ExportIcon, F as FolderOpenIcon, S as ShareIcon } from './Share-a3b5a4de.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-b5526d41.js';
import { I as IconBase } from './IconBase-d00b1a4e.js';
import { x } from './lit-html-126adc72.js';
import { d as defineElement } from './define-element-e64f5ea4.js';

class IconExport extends IconBase{render(){return setCustomTemplateLiteralTag(x),ExportIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-export",IconExport);

class IconFolderOpen extends IconBase{render(){return setCustomTemplateLiteralTag(x),FolderOpenIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-folder-open",IconFolderOpen);

class IconShare extends IconBase{render(){return setCustomTemplateLiteralTag(x),ShareIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-share",IconShare);
