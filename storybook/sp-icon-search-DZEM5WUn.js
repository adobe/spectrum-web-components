import { D as DownloadIcon, L as LinkIcon, S as SearchIcon } from './Search-DKXUsL-Z.js';
import { s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { I as IconBase } from './IconBase-BIYWpr2G.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-C_3bgzm7.js';

class IconDownload extends IconBase{render(){return setCustomTemplateLiteralTag(x),DownloadIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-download",IconDownload);

class IconLink extends IconBase{render(){return setCustomTemplateLiteralTag(x),LinkIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-link",IconLink);

class IconSearch extends IconBase{render(){return setCustomTemplateLiteralTag(x),SearchIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-search",IconSearch);
