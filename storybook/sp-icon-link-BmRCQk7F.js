import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { S as SaveToIcon, L as LinkIcon$1 } from './Link-BaB7nP6a.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const DownloadIcon=({width:l=24,height:t=24,hidden:e=!1,title:r="Download"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m13.53027,9.42676c-.29199-.29199-.7666-.29395-1.06055,0l-1.7168,1.71411V2.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v8.39941l-1.72266-1.72266c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l2.99805,2.99805c.14648.14648.33789.21973.53027.21973.19141,0,.38379-.07324.53027-.21973l3.00195-2.99805c.29297-.29199.29297-.76758,0-1.06055Z"
      fill="currentColor"
    />
    <path
      d="m15.75,18H4.25c-1.24023,0-2.25-1.00977-2.25-2.25v-2.02148c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.02148c0,.41309.33691.75.75.75h11.5c.41309,0,.75-.33691.75-.75v-2.02148c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.02148c0,1.24023-1.00977,2.25-2.25,2.25Z"
      fill="currentColor"
    />
  </svg>`;

class IconDownload extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?DownloadIcon({hidden:!this.label,title:this.label}):SaveToIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-download",IconDownload);

const LinkIcon=({width:l=24,height:t=24,hidden:e=!1,title:r="Link"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m5.31348,18.74805c-1.04102,0-2.08105-.39648-2.87305-1.18848-1.58398-1.58398-1.58398-4.16211,0-5.74707l3.90527-3.90527c1.58496-1.58398,4.16211-1.58301,5.74707,0,.2168.21777.40723.45703.56641.70996.2207.35059.11523.81348-.23535,1.03418-.35254.22168-.81348.11426-1.03418-.23535-.10059-.16016-.22168-.31152-.35938-.44922-.99902-.99902-2.625-.99805-3.62402.00098l-3.90527,3.90527c-.99902,1-.99902,2.62695,0,3.62598,1.00098,1.00098,2.62695.99707,3.62598,0l1.95215-1.95215c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-1.95215,1.95215c-.79199.79199-1.83301,1.1875-2.87402,1.18848Zm8.34082-6.65527l3.90527-3.90527c1.58398-1.58496,1.58398-4.16309,0-5.74707s-4.16309-1.58398-5.74707,0l-1.95215,1.95215c-.29297.29297-.29297.76758,0,1.06055s.76758.29297,1.06055,0l1.95215-1.95215c.99902-.99805,2.625-1,3.62598,0,.99902.99902.99902,2.62598,0,3.62598l-3.90527,3.90527c-.99902.99902-2.625,1-3.62402.00098-.1377-.1377-.25879-.28906-.35938-.44922-.2207-.34961-.68164-.45703-1.03418-.23535-.35059.2207-.45605.68359-.23535,1.03418.15918.25293.34961.49219.56641.70996.79297.79199,1.83301,1.18848,2.87402,1.18848,1.04004,0,2.08105-.39648,2.87305-1.18848Z"
      fill="currentColor"
    />
  </svg>`;

class IconLink extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?LinkIcon({hidden:!this.label,title:this.label}):LinkIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-link",IconLink);

export { DownloadIcon as D };
