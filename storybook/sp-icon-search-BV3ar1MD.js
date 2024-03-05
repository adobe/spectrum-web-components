import { D as DownloadIcon, L as LinkIcon, S as SearchIcon } from './Search-2Qr7hc0V.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-JXLWq-Sj.js';
import { I as IconBase } from './IconBase-1lzddWrP.js';
import { x } from './lit-html-GmIhAbMP.js';
import { d as defineElement } from './define-element-z6bXN_P5.js';

class IconDownload extends IconBase{render(){return setCustomTemplateLiteralTag(x),DownloadIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-download",IconDownload);

class IconLink extends IconBase{render(){return setCustomTemplateLiteralTag(x),LinkIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-link",IconLink);

class IconSearch extends IconBase{render(){return setCustomTemplateLiteralTag(x),SearchIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-search",IconSearch);
