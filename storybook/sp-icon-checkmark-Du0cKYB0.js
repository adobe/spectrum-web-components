import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { C as CheckmarkIcon$1 } from './Checkmark-D8WZ4StE.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const CheckmarkIcon=({width:e=24,height:t=24,hidden:l=!1,title:r="Checkmark"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M4.6968,10.04796c-.26562-.31934-.73926-.36084-1.05664-.09619-.31738.26514-.36133.73828-.0957,1.05615l3.74707,4.49707c.01526.01831.0376.02502.05414.0415.02179.02191.03418.04974.05914.06934.03326.02625.07172.03888.10767.05859.02417.01318.04578.02832.07104.0387.09161.0379.18652.06287.2832.06287.00525,0,.01001-.0033.01526-.00342.09357-.00177.18512-.02454.27325-.0614.03125-.01306.0575-.03223.08691-.04956.03528-.02063.07349-.03345.10602-.06042.02319-.01941.03418-.04639.05444-.06787.01666-.01746.03967-.0246.05493-.04395l8.01173-10.19776c.25586-.32568.19922-.79736-.12695-1.05322-.3252-.25586-.7959-.19922-1.05273.12646l-7.43872,9.46844-3.15405-3.78534h-.00001Z"
      fill="currentColor"
    />
  </svg>`;

class IconCheckmark extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?CheckmarkIcon({hidden:!this.label,title:this.label}):CheckmarkIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-checkmark",IconCheckmark);
