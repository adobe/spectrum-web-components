import { d as dedent } from './index-Kjm4kNkQ.js';
import './lit-element-BulMEkr1.js';
import { j } from './lit-html-COgVUehj.js';
import { e } from './directive-helpers-icdnqxxc.js';

var {Node}=__STORYBOOK_MODULE_GLOBAL__.global,render=(args,context)=>{let{id,component}=context;if(!component)throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);let element=document.createElement(component);return Object.entries(args).forEach(([key,val])=>{element[key]=val;}),element};function renderToCanvas({storyFn,kind,name,showMain,showError,forceRemount},canvasElement){let element=storyFn();if(showMain(),e(element)){(forceRemount||!canvasElement.querySelector('[id="root-inner"]'))&&(canvasElement.innerHTML='<div id="root-inner"></div>');let renderTo=canvasElement.querySelector('[id="root-inner"]');j(element,renderTo),__STORYBOOK_MODULE_PREVIEW_API__.simulatePageLoad(canvasElement);}else if(typeof element=="string")canvasElement.innerHTML=element,__STORYBOOK_MODULE_PREVIEW_API__.simulatePageLoad(canvasElement);else if(element instanceof Node){if(canvasElement.firstChild===element&&!forceRemount)return;canvasElement.innerHTML="",canvasElement.appendChild(element),__STORYBOOK_MODULE_PREVIEW_API__.simulateDOMContentLoaded();}else showError({title:`Expecting an HTML snippet or DOM node from the story: "${name}" of "${kind}".`,description:dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `});}

export { renderToCanvas as a, render as r };
