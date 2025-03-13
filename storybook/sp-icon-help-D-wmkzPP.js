import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { H as HelpIcon } from './Help-DwXA_pCu.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const HelpCircleIcon=({width:e=24,height:l=24,hidden:r=!1,title:t="Help Circle"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
  >
    <path
      d="m9.9881,15.52679c-.23065.00813-.45538-.07387-.62661-.22862-.33033-.36505-.33033-.92102,0-1.28607.16935-.15851.39483-.24308.62664-.23504.23635-.00948.46589.08035.63302.24775.16207.1679.24916.39432.24137.62755.01238.23497-.06959.46515-.2277.6394-.17358.16474-.40786.24988-.64671.23503Z"
      fill="currentColor"
    />
    <path
      d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="m9.99219,12.70605c-.41406,0-.75-.33594-.75-.75,0-1.02246.07031-1.71387,1.03906-2.68262.78516-.78613.91797-1.10156.91797-1.65137,0-.20996-.06641-1.25781-1.37402-1.25781-1.36523,0-1.51074,1.15625-1.52637,1.3877-.02637.41309-.39258.7207-.79688.69922-.41406-.02734-.72656-.38379-.69922-.79688.06348-.96484.77637-2.79004,3.02246-2.79004,1.88672,0,2.87402,1.3877,2.87402,2.75781,0,1.14355-.45703,1.81055-1.35742,2.71191-.57617.57617-.59961.81152-.59961,1.62207,0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`;

class IconHelp extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===1?HelpIcon({hidden:!this.label,title:this.label}):HelpCircleIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-help",IconHelp);

export { HelpCircleIcon as H };
