import { E as ExportIcon, F as FolderOpenIcon, S as ShareIcon } from './Share-DW986jm5.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { I as IconBase } from './IconBase-B8dJ3OhJ.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-DeMmBNCp.js';

class IconExport extends IconBase{render(){return setCustomTemplateLiteralTag(x),ExportIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-export",IconExport);

class IconFolderOpen extends IconBase{render(){return setCustomTemplateLiteralTag(x),FolderOpenIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-folder-open",IconFolderOpen);

class IconShare extends IconBase{render(){return setCustomTemplateLiteralTag(x),ShareIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-share",IconShare);
