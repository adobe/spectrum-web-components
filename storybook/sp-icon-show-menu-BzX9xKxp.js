import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { S as ShowMenuIcon } from './ShowMenu-t3rqWNPf.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const MenuHamburgerIcon=({width:r=24,height:e=24,hidden:t=!1,title:l="Menu Hamburger"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m16.25,14H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h12.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m3.75,5.5h12.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75Z"
      fill="currentColor"
    />
    <path
      d="m16.25,9H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h12.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
  </svg>`;

class IconShowMenu extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===1?ShowMenuIcon({hidden:!this.label,title:this.label}):MenuHamburgerIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-show-menu",IconShowMenu);

export { MenuHamburgerIcon as M };
