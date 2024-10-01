import { E as ElementResolutionController, e as elementResolverUpdatedSymbol } from './ElementResolution-B9KteuX8.js';
import { r as randomID } from './random-id-BST1Puzz.js';
import { g as guaranteedAllTransitionend, a as nextFrame, o as overlayTimer, A as AbstractOverlay } from './AbstractOverlay-CPSq4yHG.js';
import { f as firstFocusableIn, a as firstFocusableSlottedIn } from './first-focusable-in-BK_DAWOm.js';
import { V as VirtualTrigger } from './VirtualTrigger-CpG-Ut2t.js';
import { u as userFocusableSelector } from './focusable-selectors-CUZEb4r9.js';
import { s as strategies } from './strategies-BipNjU_G.js';
export { L as LONGPRESS_INSTRUCTIONS } from './strategies-BipNjU_G.js';
import { S as SlottableRequestEvent, r as removeSlottableRequest } from './slottable-request-event-DXuuyGoq.js';
import { i as i$1 } from './lit-element-BulMEkr1.js';
import { n } from './define-element-C_3bgzm7.js';
import { e } from './query-DQF6X5qW.js';
import { o as o$1 } from './query-assigned-elements-C9WOp2R6.js';
import { r as r$1 } from './state-DrummH0c.js';
import { x } from './lit-html-COgVUehj.js';
import { o as o$2 } from './if-defined-DDJGFaN4.js';
import { o as o$3 } from './style-map-DtKTc8KS.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './platform-r3Lf9REX.js';
import './base-u8Z1Hrsd.js';
import './directive-Bn5c4u4M.js';

class BeforetoggleClosedEvent extends Event{constructor(){super("beforetoggle",{bubbles:!1,composed:!1});this.currentState="open";this.newState="closed";}}class BeforetoggleOpenEvent extends Event{constructor(){super("beforetoggle",{bubbles:!1,composed:!1});this.currentState="closed";this.newState="open";}}class OverlayStateEvent extends Event{constructor(r,l,{publish:o,interaction:s,reason:n}){super(r,{bubbles:o,composed:o});this.overlay=l;this.detail={interaction:s,reason:n};}}

function OverlayDialog(h){class p extends h{async manageDialogOpen(){const e=this.open;if(await this.managePosition(),this.open!==e)return;const i=await this.dialogMakeTransition(e);this.open===e&&await this.dialogApplyFocus(e,i);}async dialogMakeTransition(e){let i=null;const m=(t,s)=>async()=>{if(t.open=e,!e){const n=()=>{t.removeEventListener("close",n);};t.addEventListener("close",n);}if(s>0)return;const o=e?BeforetoggleOpenEvent:BeforetoggleClosedEvent;this.dispatchEvent(new o),e&&(t.matches(userFocusableSelector)&&(i=t),i=i||firstFocusableIn(t),i||t.querySelectorAll("slot").forEach(r=>{i||(i=firstFocusableSlottedIn(r));}),!(!this.isConnected||this.dialogEl.open)&&this.dialogEl.showModal());},a=(t,s)=>()=>{if(this.open!==e)return;const o=e?"sp-opened":"sp-closed";if(s>0){t.dispatchEvent(new OverlayStateEvent(o,this,{interaction:this.type,publish:!1}));return}if(!this.isConnected||e!==this.open)return;const n=async()=>{const r=this.triggerElement instanceof VirtualTrigger;this.dispatchEvent(new OverlayStateEvent(o,this,{interaction:this.type,publish:r})),t.dispatchEvent(new OverlayStateEvent(o,this,{interaction:this.type,publish:!1})),this.triggerElement&&!r&&this.triggerElement.dispatchEvent(new OverlayStateEvent(o,this,{interaction:this.type,publish:!0})),this.state=e?"opened":"closed",this.returnFocus(),await nextFrame(),await nextFrame(),e===this.open&&e===!1&&this.requestSlottable();};!e&&this.dialogEl.open?(this.dialogEl.addEventListener("close",()=>{n();},{once:!0}),this.dialogEl.close()):n();};return this.elements.forEach((t,s)=>{guaranteedAllTransitionend(t,m(t,s),a(t,s));}),i}async dialogApplyFocus(e,i){this.applyFocus(e,i);}}return p}

const C$1=CSS.supports("(overlay: auto)");function f(a){let c=!1;try{c=a.matches(":popover-open");}catch(e){}let p=!1;try{p=a.matches(":open");}catch(e){}return c||p}function OverlayPopover(a){class c extends a{async manageDelay(e){if(e===!1||e!==this.open){overlayTimer.close(this);return}this.delayed&&await overlayTimer.openTimer(this)&&(this.open=!e);}async shouldHidePopover(e){if(e&&this.open!==e)return;const o=async({newState:i}={})=>{i!=="open"&&await this.placementController.resetOverlayPosition();};if(!f(this.dialogEl)){o();return}this.dialogEl.addEventListener("toggle",o,{once:!0});}async shouldShowPopover(e){let o=!1;try{o=this.dialogEl.matches(":popover-open");}catch(u){}let i=!1;try{i=this.dialogEl.matches(":open");}catch(u){}e&&this.open===e&&!o&&!i&&this.isConnected&&(this.dialogEl.showPopover(),await this.managePosition());}async ensureOnDOM(e){await nextFrame(),C$1||await this.shouldHidePopover(e),await this.shouldShowPopover(e),await nextFrame();}async makeTransition(e){if(this.open!==e)return null;let o=null;const i=(t,s)=>()=>{if(t.open=e,s===0){const r=e?BeforetoggleOpenEvent:BeforetoggleClosedEvent;this.dispatchEvent(new r);}if(!e||(t.matches(userFocusableSelector)&&(o=t),o=o||firstFocusableIn(t),o))return;t.querySelectorAll("slot").forEach(r=>{o||(o=firstFocusableSlottedIn(r));});},u=(t,s)=>async()=>{if(this.open!==e)return;const n=e?"sp-opened":"sp-closed";if(s>0){t.dispatchEvent(new OverlayStateEvent(n,this,{interaction:this.type,publish:!1}));return}const r=async()=>{if(this.open!==e)return;await nextFrame();const d=this.triggerElement instanceof VirtualTrigger;this.dispatchEvent(new OverlayStateEvent(n,this,{interaction:this.type,publish:d})),t.dispatchEvent(new OverlayStateEvent(n,this,{interaction:this.type,publish:!1})),this.triggerElement&&!d&&this.triggerElement.dispatchEvent(new OverlayStateEvent(n,this,{interaction:this.type,publish:!0})),this.state=e?"opened":"closed",this.returnFocus(),await nextFrame(),await nextFrame(),e===this.open&&e===!1&&this.requestSlottable();};if(this.open!==e)return;const v=f(this.dialogEl);e!==!0&&v&&this.isConnected?(this.dialogEl.addEventListener("beforetoggle",()=>{r();},{once:!0}),this.dialogEl.hidePopover()):r();};return this.elements.forEach((t,s)=>{guaranteedAllTransitionend(t,i(t,s),u(t,s));}),o}}return c}

function OverlayNoPopover(a){class m extends a{async managePopoverOpen(){await this.managePosition();}async manageDelay(e){if(e===!1||e!==this.open){overlayTimer.close(this);return}this.delayed&&await overlayTimer.openTimer(this)&&(this.open=!e);}async ensureOnDOM(e){document.body.offsetHeight;}async makeTransition(e){if(this.open!==e)return null;let o=null;const h=(t,r)=>()=>{if(e!==this.open)return;if(t.open=e,r===0){const i=e?BeforetoggleOpenEvent:BeforetoggleClosedEvent;this.dispatchEvent(new i);}if(e!==!0||(t.matches(userFocusableSelector)&&(o=t),o=o||firstFocusableIn(t),o))return;t.querySelectorAll("slot").forEach(i=>{o||(o=firstFocusableSlottedIn(i));});},u=(t,r)=>async()=>{if(this.open!==e)return;const n=e?"sp-opened":"sp-closed";if(t.dispatchEvent(new OverlayStateEvent(n,this,{interaction:this.type})),r>0)return;const i=this.triggerElement instanceof VirtualTrigger;this.dispatchEvent(new OverlayStateEvent(n,this,{interaction:this.type,publish:i})),this.triggerElement&&!i&&this.triggerElement.dispatchEvent(new OverlayStateEvent(n,this,{interaction:this.type,publish:!0})),this.state=e?"opened":"closed",this.returnFocus(),await nextFrame(),await nextFrame(),e===this.open&&e===!1&&this.requestSlottable();};return this.elements.forEach((t,r)=>{guaranteedAllTransitionend(t,h(t,r),u(t,r));}),o}}return m}

const h="showPopover"in document.createElement("div");let c$1 = class c{constructor(){this.root=document.body;this.stack=[];this.handlePointerdown=t=>{this.pointerdownPath=t.composedPath(),this.lastOverlay=this.stack[this.stack.length-1];};this.handlePointerup=()=>{const t=this.pointerdownPath;if(this.pointerdownPath=void 0,!this.stack.length||!(t!=null&&t.length))return;const e=this.stack.length-1,s=this.stack.filter((n,i)=>!t.find(a=>a===n||a===(n==null?void 0:n.triggerElement)&&(n==null?void 0:n.type)==="hint"||i===e&&n!==this.lastOverlay&&n.triggerInteraction==="longpress")&&!n.shouldPreventClose()&&n.type!=="manual");s.reverse(),s.forEach(n=>{this.closeOverlay(n);let i=n.parentOverlayToForceClose;for(;i;)this.closeOverlay(i),i=i.parentOverlayToForceClose;});};this.handleBeforetoggle=t=>{const{target:e,newState:s}=t;s!=="open"&&this.closeOverlay(e);};this.handleKeydown=t=>{if(t.code!=="Escape"||!this.stack.length)return;const e=this.stack[this.stack.length-1];if((e==null?void 0:e.type)==="page"){t.preventDefault();return}h||(e==null?void 0:e.type)!=="manual"&&e&&this.closeOverlay(e);};this.bindEvents();}get document(){return this.root.ownerDocument||document}bindEvents(){this.document.addEventListener("pointerdown",this.handlePointerdown),this.document.addEventListener("pointerup",this.handlePointerup),this.document.addEventListener("keydown",this.handleKeydown);}closeOverlay(t){const e=this.stack.indexOf(t);e>-1&&this.stack.splice(e,1),t.open=!1;}overlaysByTriggerElement(t){return this.stack.filter(e=>e.triggerElement===t)}add(t){if(this.stack.includes(t)){const e=this.stack.indexOf(t);e>-1&&(this.stack.splice(e,1),this.stack.push(t));return}if(t.type==="auto"||t.type==="modal"||t.type==="page"){const e="sp-overlay-query-path",s=new Event(e,{composed:!0,bubbles:!0});t.addEventListener(e,n=>{const i=n.composedPath();this.stack.forEach(r=>{!i.find(o=>o===r)&&r.type!=="manual"&&this.closeOverlay(r);});},{once:!0}),t.dispatchEvent(s);}else if(t.type==="hint"){if(this.stack.some(s=>s.type!=="manual"&&s.triggerElement&&s.triggerElement===t.triggerElement)){t.open=!1;return}this.stack.forEach(s=>{s.type==="hint"&&this.closeOverlay(s);});}requestAnimationFrame(()=>{this.stack.push(t),t.addEventListener("beforetoggle",this.handleBeforetoggle,{once:!0});});}remove(t){this.closeOverlay(t);}};const overlayStack=new c$1;

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

const topLayerSelectors = [':popover-open', ':modal'];
function isTopLayer(element) {
  return topLayerSelectors.some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = size$1;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = arrow$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

function c(o){if(typeof o=="undefined")return 0;const t=window.devicePixelRatio||1;return Math.round(o*t)/t}const p$1=8,C=100,T=o=>{var e;return (e={left:["right","bottom","top"],"left-start":["right-start","bottom","top"],"left-end":["right-end","bottom","top"],right:["left","bottom","top"],"right-start":["left-start","bottom","top"],"right-end":["left-end","bottom","top"],top:["bottom","left","right"],"top-start":["bottom-start","left","right"],"top-end":["bottom-end","left","right"],bottom:["top","left","right"],"bottom-start":["top-start","left","right"],"bottom-end":["top-end","left","right"]}[o])!=null?e:[o]};class PlacementController{constructor(t){this.originalPlacements=new WeakMap;this.allowPlacementUpdate=!1;this.closeForAncestorUpdate=()=>{!this.allowPlacementUpdate&&this.options.type!=="modal"&&this.cleanup&&this.target.dispatchEvent(new Event("close",{bubbles:!0})),this.allowPlacementUpdate=!1;};this.updatePlacement=()=>{this.computePlacement();};this.resetOverlayPosition=()=>{!this.target||!this.options||(this.clearOverlayPosition(),this.host.offsetHeight,this.computePlacement());};this.host=t,this.host.addController(this);}async placeOverlay(t=this.target,e=this.options){if(this.target=t,this.options=e,!t||!e)return;const m=autoUpdate(e.trigger,t,this.closeForAncestorUpdate,{ancestorResize:!1,elementResize:!1,layoutShift:!1}),h=autoUpdate(e.trigger,t,this.updatePlacement,{ancestorScroll:!1});this.cleanup=()=>{var n;(n=this.host.elements)==null||n.forEach(a=>{a.addEventListener("sp-closed",()=>{const r=this.originalPlacements.get(a);r&&a.setAttribute("placement",r),this.originalPlacements.delete(a);},{once:!0});}),m(),h();};}async computePlacement(){var g,u;const{options:t,target:e}=this;await(document.fonts?document.fonts.ready:Promise.resolve());const m=t.trigger instanceof HTMLElement?flip():flip({padding:p$1,fallbackPlacements:T(t.placement)}),[h=0,n=0]=Array.isArray(t==null?void 0:t.offset)?t.offset:[t.offset,0],a=(g=this.host.elements.find(i=>i.tipElement))==null?void 0:g.tipElement,r=[offset({mainAxis:h,crossAxis:n}),shift({padding:p$1}),m,size({padding:p$1,apply:({availableWidth:i,availableHeight:d,rects:{floating:x}})=>{const b=Math.max(C,Math.floor(d)),l=x.height;this.initialHeight=this.isConstrained&&this.initialHeight||l,this.isConstrained=l<this.initialHeight||b<=l;const O=this.isConstrained?`${b}px`:"";Object.assign(e.style,{maxWidth:`${Math.floor(i)}px`,maxHeight:O});}}),...a?[arrow({element:a,padding:t.tipPadding||p$1})]:[]],{x:P,y:E,placement:s,middlewareData:f}=await computePosition(t.trigger,e,{placement:t.placement,middleware:r,strategy:"fixed"});if(Object.assign(e.style,{top:"0px",left:"0px",translate:`${c(P)}px ${c(E)}px`}),e.setAttribute("actual-placement",s),(u=this.host.elements)==null||u.forEach(i=>{this.originalPlacements.has(i)||this.originalPlacements.set(i,i.getAttribute("placement")),i.setAttribute("placement",s);}),a&&f.arrow){const{x:i,y:d}=f.arrow;Object.assign(a.style,{top:s.startsWith("right")||s.startsWith("left")?"0px":"",left:s.startsWith("bottom")||s.startsWith("top")?"0px":"",translate:`${c(i)}px ${c(d)}px`});}}clearOverlayPosition(){this.target&&(this.target.style.removeProperty("max-height"),this.target.style.removeProperty("max-width"),this.initialHeight=void 0,this.isConstrained=!1);}hostConnected(){document.addEventListener("sp-update-overlays",this.resetOverlayPosition);}hostUpdated(){var t;this.host.open||((t=this.cleanup)==null||t.call(this),this.cleanup=void 0);}hostDisconnected(){var t;(t=this.cleanup)==null||t.call(this),this.cleanup=void 0,document.removeEventListener("sp-update-overlays",this.resetOverlayPosition);}}

const o=i$1`
    :host{pointer-events:none;--swc-overlay-animation-distance:var(--spectrum-spacing-100);display:contents}:host(:has(>sp-tooltip)){--swc-overlay-animation-distance:var(--spectrum-tooltip-animation-distance)}.dialog{box-sizing:border-box;max-height:calc(100vh - 16px);max-height:calc(100dvh - 16px);max-width:calc(100vw - 16px);height:auto;--sp-overlay-open:true;background:0 0;border:0;margin:0;padding:0;display:flex;position:fixed;inset:0 auto auto 0;overflow:visible;opacity:1!important}.dialog:not([is-visible]){display:none}.dialog:focus{outline:none}dialog:modal{--mod-popover-filter:var(--spectrum-popover-filter)}:host(:not([open])) .dialog{--sp-overlay-open:false}.dialog::backdrop{display:none}.dialog:before{content:"";position:absolute;inset:-999em;pointer-events:auto!important}.dialog:not(.not-immediately-closable):before{display:none}.dialog>div{width:100%}::slotted(*){pointer-events:auto;visibility:visible!important}::slotted(sp-popover){position:static}.dialog:not([actual-placement])[placement*=top]{padding-block:var(--swc-overlay-animation-distance);margin-top:var(--swc-overlay-animation-distance)}.dialog:not([actual-placement])[placement*=right]{padding-inline:var(--swc-overlay-animation-distance);margin-left:calc(-1*var(--swc-overlay-animation-distance))}.dialog:not([actual-placement])[placement*=bottom]{padding-block:var(--swc-overlay-animation-distance);margin-top:calc(-1*var(--swc-overlay-animation-distance))}.dialog:not([actual-placement])[placement*=left]{padding-inline:var(--swc-overlay-animation-distance);margin-left:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=top]{padding-block:var(--swc-overlay-animation-distance);margin-top:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=right]{padding-inline:var(--swc-overlay-animation-distance);margin-left:calc(-1*var(--swc-overlay-animation-distance))}.dialog[actual-placement*=bottom]{padding-block:var(--swc-overlay-animation-distance);margin-top:calc(-1*var(--swc-overlay-animation-distance))}.dialog[actual-placement*=left]{padding-inline:var(--swc-overlay-animation-distance);margin-left:var(--swc-overlay-animation-distance)}slot[name=longpress-describedby-descriptor]{display:none}@supports selector(:open){.dialog{opacity:0}.dialog:open{opacity:1;--mod-popover-filter:var(--spectrum-popover-filter)}}@supports selector(:popover-open){.dialog{opacity:0}.dialog:popover-open{opacity:1;--mod-popover-filter:var(--spectrum-popover-filter)}}@supports (overlay:auto){.dialog{transition:all var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)),translate 0s,display var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s));transition-behavior:allow-discrete;display:none}.dialog:popover-open,.dialog:modal{display:flex}}@supports (not selector(:open)) and (not selector(:popover-open)){:host:not([open]) .dialog{pointer-events:none}.dialog[actual-placement]{z-index:calc(var(--swc-overlay-z-index-base,1000) + var(--swc-overlay-open-count))}}
`;

var b=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var r=(u,a,e,t)=>{for(var o=t>1?void 0:t?E(a,e):a,s=u.length-1,l;s>=0;s--)(l=u[s])&&(o=(t?l(a,e,o):l(o))||o);return t&&o&&b(a,e,o),o};const B="showPopover"in document.createElement("div");let p=OverlayDialog(AbstractOverlay);B?p=OverlayPopover(p):p=OverlayNoPopover(p);const i=class i extends p{constructor(){super(...arguments);this._delayed=!1;this._disabled=!1;this.offset=0;this._open=!1;this.lastRequestSlottableState=!1;this.receivesFocus="auto";this._state="closed";this.triggerElement=null;this.type="auto";this.wasOpen=!1;this.closeOnFocusOut=e=>{if(!e.relatedTarget)return;const t=new Event("overlay-relation-query",{bubbles:!0,composed:!0});e.relatedTarget.addEventListener(t.type,o=>{o.composedPath().includes(this)||(this.open=!1);}),e.relatedTarget.dispatchEvent(t);};}get delayed(){var e;return ((e=this.elements.at(-1))==null?void 0:e.hasAttribute("delayed"))||this._delayed}set delayed(e){this._delayed=e;}get disabled(){return this._disabled}set disabled(e){var t;this._disabled=e,e?((t=this.strategy)==null||t.abort(),this.wasOpen=this.open,this.open=!1):(this.bindEvents(),this.open=this.open||this.wasOpen,this.wasOpen=!1);}get hasNonVirtualTrigger(){return !!this.triggerElement&&!(this.triggerElement instanceof VirtualTrigger)}get placementController(){return this._placementController||(this._placementController=new PlacementController(this)),this._placementController}get open(){return this._open}set open(e){var t;e&&this.disabled||e!==this.open&&((t=this.strategy)!=null&&t.activelyOpening&&!e||(this._open=e,this.open&&(i.openCount+=1),this.requestUpdate("open",!this.open),this.open&&this.requestSlottable()));}get state(){return this._state}set state(e){var o;if(e===this.state)return;const t=this.state;this._state=e,(this.state==="opened"||this.state==="closed")&&((o=this.strategy)==null||o.shouldCompleteOpen()),this.requestUpdate("state",t);}get elementResolver(){return this._elementResolver||(this._elementResolver=new ElementResolutionController(this)),this._elementResolver}get usesDialog(){return this.type==="modal"||this.type==="page"}get popoverValue(){if("popover"in this)switch(this.type){case"modal":case"page":return;case"hint":return "manual";default:return this.type}}get requiresPosition(){return !(this.type==="page"||!this.open||!this.triggerElement||!this.placement&&this.type!=="hint")}managePosition(){if(!this.requiresPosition||!this.open)return;const e=this.offset||0,t=this.triggerElement,o=this.placement||"right",s=this.tipPadding;this.placementController.placeOverlay(this.dialogEl,{offset:e,placement:o,tipPadding:s,trigger:t,type:this.type});}async managePopoverOpen(){super.managePopoverOpen();const e=this.open;if(this.open!==e||(await this.manageDelay(e),this.open!==e)||(await this.ensureOnDOM(e),this.open!==e))return;const t=await this.makeTransition(e);this.open===e&&await this.applyFocus(e,t);}async applyFocus(e,t){if(!(this.receivesFocus==="false"||this.type==="hint")){if(await nextFrame(),await nextFrame(),e===this.open&&!this.open){this.hasNonVirtualTrigger&&this.contains(this.getRootNode().activeElement)&&this.triggerElement.focus();return}t==null||t.focus();}}returnFocus(){var t;if(this.open||this.type==="hint")return;const e=()=>{var l,m;const o=[];let s=document.activeElement;for(;(l=s==null?void 0:s.shadowRoot)!=null&&l.activeElement;)s=s.shadowRoot.activeElement;for(;s;){const h=s.assignedSlot||s.parentElement||((m=s.getRootNode())==null?void 0:m.host);h&&o.push(h),s=h;}return o};this.receivesFocus!=="false"&&((t=this.triggerElement)!=null&&t.focus)&&(this.contains(this.getRootNode().activeElement)||e().includes(this)||document.activeElement===document.body)&&this.triggerElement.focus();}async manageOpen(e){if(!(!this.isConnected&&this.open)&&(this.hasUpdated||await this.updateComplete,this.open?(overlayStack.add(this),this.willPreventClose&&(document.addEventListener("pointerup",()=>{this.dialogEl.classList.toggle("not-immediately-closable",!1),this.willPreventClose=!1;},{once:!0}),this.dialogEl.classList.toggle("not-immediately-closable",!0))):(e&&this.dispose(),overlayStack.remove(this)),this.open&&this.state!=="opened"?this.state="opening":!this.open&&this.state!=="closed"&&(this.state="closing"),this.usesDialog?this.manageDialogOpen():this.managePopoverOpen(),this.type==="auto")){const t=this.getRootNode();this.open?t.addEventListener("focusout",this.closeOnFocusOut,{capture:!0}):t.removeEventListener("focusout",this.closeOnFocusOut,{capture:!0});}}bindEvents(){var e;(e=this.strategy)==null||e.abort(),this.strategy=void 0,this.hasNonVirtualTrigger&&this.triggerInteraction&&(this.strategy=new strategies[this.triggerInteraction](this.triggerElement,{overlay:this}));}handleBeforetoggle(e){e.newState!=="open"&&this.handleBrowserClose();}handleBrowserClose(){var e;if(!((e=this.strategy)!=null&&e.activelyOpening)){this.open=!1;return}this.manuallyKeepOpen();}manuallyKeepOpen(){this.open=!0,this.placementController.allowPlacementUpdate=!0,this.manageOpen(!1);}handleSlotchange(){var e,t;this.elements.length?this.hasNonVirtualTrigger&&((t=this.strategy)==null||t.prepareDescription(this.triggerElement)):(e=this.strategy)==null||e.releaseDescription();}shouldPreventClose(){const e=this.willPreventClose;return this.willPreventClose=!1,e}requestSlottable(){this.lastRequestSlottableState!==this.open&&(this.open||document.body.offsetHeight,this.dispatchEvent(new SlottableRequestEvent("overlay-content",this.open?{}:removeSlottableRequest)),this.lastRequestSlottableState=this.open);}willUpdate(e){var o;if(this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${randomID()}`),e.has("open")&&(this.hasUpdated||this.open)&&this.manageOpen(e.get("open")),e.has("trigger")){const[s,l]=((o=this.trigger)==null?void 0:o.split("@"))||[];this.elementResolver.selector=s?`#${s}`:"",this.triggerInteraction=l;}let t=!1;e.has(elementResolverUpdatedSymbol)&&(t=this.triggerElement,this.triggerElement=this.elementResolver.element),e.has("triggerElement")&&(t=e.get("triggerElement")),t!==!1&&this.bindEvents();}updated(e){super.updated(e),e.has("placement")&&(this.placement?this.dialogEl.setAttribute("actual-placement",this.placement):this.dialogEl.removeAttribute("actual-placement"),this.open&&typeof e.get("placement")!="undefined"&&this.placementController.resetOverlayPosition()),e.has("state")&&this.state==="closed"&&typeof e.get("state")!="undefined"&&this.placementController.clearOverlayPosition();}renderContent(){return x`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}get dialogStyleMap(){return {"--swc-overlay-open-count":i.openCount.toString()}}renderDialog(){return x`
            <dialog
                class="dialog"
                part="dialog"
                placement=${o$2(this.requiresPosition?this.placement||"right":void 0)}
                style=${o$3(this.dialogStyleMap)}
                @close=${this.handleBrowserClose}
                @cancel=${this.handleBrowserClose}
                @beforetoggle=${this.handleBeforetoggle}
                ?is-visible=${this.state!=="closed"}
            >
                ${this.renderContent()}
            </dialog>
        `}renderPopover(){return x`
            <div
                class="dialog"
                part="dialog"
                placement=${o$2(this.requiresPosition?this.placement||"right":void 0)}
                popover=${o$2(this.popoverValue)}
                style=${o$3(this.dialogStyleMap)}
                @beforetoggle=${this.handleBeforetoggle}
                @close=${this.handleBrowserClose}
                ?is-visible=${this.state!=="closed"}
            >
                ${this.renderContent()}
            </div>
        `}render(){const e=this.type==="modal"||this.type==="page";return x`
            ${e?this.renderDialog():this.renderPopover()}
            <slot name="longpress-describedby-descriptor"></slot>
        `}connectedCallback(){super.connectedCallback(),this.addEventListener("close",()=>{this.open=!1;}),this.hasUpdated&&this.bindEvents();}disconnectedCallback(){var e;(e=this.strategy)==null||e.releaseDescription(),this.open=!1,super.disconnectedCallback();}};i.styles=[o],i.openCount=1,r([n({type:Boolean})],i.prototype,"delayed",1),r([e(".dialog")],i.prototype,"dialogEl",2),r([n({type:Boolean})],i.prototype,"disabled",1),r([o$1({flatten:!0,selector:':not([slot="longpress-describedby-descriptor"], slot)'})],i.prototype,"elements",2),r([n({type:Number})],i.prototype,"offset",2),r([n({type:Boolean,reflect:!0})],i.prototype,"open",1),r([n()],i.prototype,"placement",2),r([n({attribute:"receives-focus"})],i.prototype,"receivesFocus",2),r([e("slot")],i.prototype,"slotEl",2),r([r$1()],i.prototype,"state",1),r([n({type:Number,attribute:"tip-padding"})],i.prototype,"tipPadding",2),r([n()],i.prototype,"trigger",2),r([n({attribute:!1})],i.prototype,"triggerElement",2),r([n({attribute:!1})],i.prototype,"triggerInteraction",2),r([n()],i.prototype,"type",2);let Overlay=i;

export { Overlay };
