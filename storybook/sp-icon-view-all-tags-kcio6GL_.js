import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { P as PropertiesIcon$1, V as ViewAllTagsIcon } from './ViewAllTags-C4mr4XS8.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';
import { D as DefaultIcon } from './DefaultIcon-BpPg5UB-.js';

const PropertiesIcon=({width:e=24,height:t=24,hidden:r=!1,title:s="Properties"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${s}"
  >
    <path
      d="m1.75,6.77148h2.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h7.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-7.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75Zm5.82275-2.5c.96484,0,1.75.78516,1.75,1.75s-.78516,1.75-1.75,1.75-1.75-.78516-1.75-1.75.78516-1.75,1.75-1.75Z"
      fill="currentColor"
    />
    <path
      d="m18.25,13.27148h-2.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h7.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h2.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-5.67725,2.5c-.96484,0-1.75-.78516-1.75-1.75s.78516-1.75,1.75-1.75,1.75.78516,1.75,1.75-.78516,1.75-1.75,1.75Z"
      fill="currentColor"
    />
  </svg>`;

class IconProperties extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?PropertiesIcon({hidden:!this.label,title:this.label}):PropertiesIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-properties",IconProperties);

class IconViewAllTags extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===1?ViewAllTagsIcon({hidden:!this.label,title:this.label}):DefaultIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-view-all-tags",IconViewAllTags);
