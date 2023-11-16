import { n as n$1, d as defineElement } from './define-element-467f3dc4.js';
import { b as isIOS, a as isAndroid } from './platform-a32a5617.js';
import { E as ElementResolutionController, e as elementResolverUpdatedSymbol } from './ElementResolution-b58a0825.js';
import { c as conditionAttributeWithId } from './condition-attribute-with-id-62869347.js';
import { g as guaranteedAllTransitionend, B as BeforetoggleOpenEvent, a as BeforetoggleClosedEvent, V as VirtualTrigger, o as overlayTimer, n as nextFrame, f as forcePaint, b as noop, A as AbstractOverlay } from './VirtualTrigger-ca1345a7.js';
import { f as firstFocusableIn, a as firstFocusableSlottedIn } from './first-focusable-in-184a26e2.js';
import { u as userFocusableSelector } from './focusable-selectors-252ae36e.js';
import { i } from './lit-element-9354aa77.js';
import { l } from './sizedMixin-95b38e3e.js';
import { i as i$1 } from './query-d0113d5a.js';
import { t } from './state-879d3fe4.js';
import { x } from './lit-html-126adc72.js';
import { l as l$1 } from './if-defined-ae83b405.js';
import { o as o$2 } from './style-map-156e3c36.js';

function OverlayDialog(a){class c extends a{async manageDialogOpen(){const e=this.open;if(await this.managePosition(),this.open!==e||this.open!==e)return;const o=await this.dialogMakeTransition(e);this.open===e&&await this.dialogApplyFocus(e,o);}async dialogMakeTransition(e){let o=null;const p=(t,s)=>async()=>{if(typeof t.open!="undefined"&&(t.open=e),!e){const i=()=>{t.removeEventListener("close",i);};t.addEventListener("close",i);}if(s>0)return;const n=e?BeforetoggleOpenEvent:BeforetoggleClosedEvent;this.dispatchEvent(new n),e&&(t.matches(userFocusableSelector)&&(o=t),o=o||firstFocusableIn(t),o||t.querySelectorAll("slot").forEach(r=>{o||(o=firstFocusableSlottedIn(r));}),!(!this.isConnected||this.dialogEl.open)&&this.dialogEl.showModal());},l=(t,s)=>()=>{if(this.open!==e)return;const n=e?"sp-opened":"sp-closed";if(s>0){t.dispatchEvent(new CustomEvent(n,{bubbles:!1,composed:!1,detail:{interaction:this.type}}));return}if(!this.isConnected||e!==this.open)return;const i=()=>{const r=this.triggerElement instanceof VirtualTrigger;this.dispatchEvent(new Event(n,{bubbles:r,composed:r})),t.dispatchEvent(new Event(n,{bubbles:!1,composed:!1})),this.triggerElement&&!r&&this.triggerElement.dispatchEvent(new CustomEvent(n,{bubbles:!0,composed:!0,detail:{interaction:this.type}})),this.state=e?"opened":"closed";};!e&&this.dialogEl.open?(this.dialogEl.addEventListener("close",()=>{i();},{once:!0}),this.dialogEl.close()):i();};return this.elements.forEach((t,s)=>{guaranteedAllTransitionend(t,p(t,s),l(t,s));}),o}async dialogApplyFocus(e,o){this.applyFocus(e,o);}}return c}

function u(l){let a=!1;try{a=l.matches(":popover-open");}catch(e){}let c=!1;try{c=l.matches(":open");}catch(e){}return a||c}function OverlayPopover(l){class a extends l{async manageDelay(e){if(e===!1||e!==this.open){overlayTimer.close(this);return}this.delayed&&await overlayTimer.openTimer(this)&&(this.open=!e);}async shouldHidePopover(e){if(e&&this.open!==e)return;const o=async({newState:i}={})=>{i!=="open"&&await this.placementController.resetOverlayPosition();};if(!u(this.dialogEl)){o();return}this.dialogEl.addEventListener("toggle",o,{once:!0});}async shouldShowPopover(e){let o=!1;try{o=this.dialogEl.matches(":popover-open");}catch(p){}let i=!1;try{i=this.dialogEl.matches(":open");}catch(p){}e&&this.open===e&&!o&&!i&&this.isConnected&&(this.dialogEl.showPopover(),await this.managePosition());}async ensureOnDOM(e){await nextFrame(),await this.shouldHidePopover(e),await this.shouldShowPopover(e),await nextFrame();}async makeTransition(e){if(this.open!==e)return null;let o=null;const i=(t,s)=>()=>{if(typeof t.open!="undefined"&&(t.open=e),s===0){const r=e?BeforetoggleOpenEvent:BeforetoggleClosedEvent;this.dispatchEvent(new r);}if(!e||(t.matches(userFocusableSelector)&&(o=t),o=o||firstFocusableIn(t),o))return;t.querySelectorAll("slot").forEach(r=>{o||(o=firstFocusableSlottedIn(r));});},p=(t,s)=>async()=>{if(this.open!==e)return;const n=e?"sp-opened":"sp-closed";if(s>0){t.dispatchEvent(new CustomEvent(n,{bubbles:!1,composed:!1,detail:{interaction:this.type}}));return}const r=async()=>{if(this.open!==e)return;await nextFrame();const d=this.triggerElement instanceof VirtualTrigger;this.dispatchEvent(new Event(n,{bubbles:d,composed:d})),t.dispatchEvent(new CustomEvent(n,{bubbles:!1,composed:!1,detail:{interaction:this.type}})),this.triggerElement&&!d&&this.triggerElement.dispatchEvent(new CustomEvent(n,{bubbles:!0,composed:!0,detail:{interaction:this.type}})),this.state=e?"opened":"closed";};if(this.open!==e)return;const v=u(this.dialogEl);e!==!0&&v&&this.isConnected?(this.dialogEl.addEventListener("beforetoggle",()=>{r();},{once:!0}),this.dialogEl.hidePopover()):r();};return this.elements.forEach((t,s)=>{guaranteedAllTransitionend(t,i(t,s),p(t,s));}),o}}return a}

function OverlayNoPopover(l){class a extends l{async managePopoverOpen(){await this.managePosition();}async manageDelay(e){if(e===!1||e!==this.open){overlayTimer.close(this);return}this.delayed&&await overlayTimer.openTimer(this)&&(this.open=!e);}async ensureOnDOM(e){forcePaint();}async makeTransition(e){if(this.open!==e)return null;let o=null;const c=(t,n)=>()=>{if(e!==this.open)return;if(typeof t.open!="undefined"&&(t.open=e),n===0){const r=e?BeforetoggleOpenEvent:BeforetoggleClosedEvent;this.dispatchEvent(new r);}if(e!==!0||(t.matches(userFocusableSelector)&&(o=t),o=o||firstFocusableIn(t),o))return;t.querySelectorAll("slot").forEach(r=>{o||(o=firstFocusableSlottedIn(r));});},m=(t,n)=>()=>{if(this.open!==e)return;const s=e?"sp-opened":"sp-closed";if(t.dispatchEvent(new CustomEvent(s,{bubbles:!1,composed:!1,detail:{interaction:this.type}})),n>0)return;const r=this.triggerElement instanceof VirtualTrigger;this.dispatchEvent(new Event(s,{bubbles:r,composed:r})),this.triggerElement&&!r&&this.triggerElement.dispatchEvent(new CustomEvent(s,{bubbles:!0,composed:!0,detail:{interaction:this.type}})),this.state=e?"opened":"closed";};return this.elements.forEach((t,n)=>{guaranteedAllTransitionend(t,c(t,n),m(t,n));}),o}}return a}

const a="showPopover"in document.createElement("div");let c$1 = class c{constructor(){this.root=document.body;this.stack=[];this.handlePointerdown=t=>{this.pointerdownPath=t.composedPath();};this.handlePointerup=()=>{var i;if(!this.stack.length||!((i=this.pointerdownPath)!=null&&i.length))return;const t=this.pointerdownPath;this.pointerdownPath=void 0;const e=this.stack.filter(n=>!t.find(o=>o===n||o===(n==null?void 0:n.triggerElement))&&!n.shouldPreventClose()&&n.type!=="manual");e.reverse(),e.forEach(n=>{this.closeOverlay(n);let s=n.parentOverlayToForceClose;for(;s;)this.closeOverlay(s),s=s.parentOverlayToForceClose;});};this.handleBeforetoggle=t=>{const{target:e,newState:i}=t;i!=="open"&&this.closeOverlay(e);};this.handleKeydown=t=>{if(t.code!=="Escape")return;const e=this.stack.at(-1);if((e==null?void 0:e.type)==="page"){t.preventDefault();return}a||this.stack.length&&e&&this.closeOverlay(e);};this.bindEvents();}get document(){return this.root.ownerDocument||document}bindEvents(){this.document.addEventListener("pointerdown",this.handlePointerdown),this.document.addEventListener("pointerup",this.handlePointerup),this.document.addEventListener("keydown",this.handleKeydown);}closeOverlay(t){const e=this.stack.indexOf(t);e>-1&&this.stack.splice(e,1),t.open=!1;}overlaysByTriggerElement(t){return this.stack.filter(e=>e.triggerElement===t)}add(t){if(this.stack.includes(t)){const e=this.stack.indexOf(t);e>-1&&(this.stack.splice(e,1),this.stack.push(t));return}if(t.type==="auto"||t.type==="modal"||t.type==="page"){const e="sp-overlay-query-path",i=new Event(e,{composed:!0,bubbles:!0});t.addEventListener(e,n=>{const s=n.composedPath();this.stack.forEach(o=>{!s.find(r=>r===o)&&o.type!=="manual"&&this.closeOverlay(o);});},{once:!0}),t.dispatchEvent(i);}else t.type==="hint"&&this.stack.forEach(e=>{e.type==="hint"&&this.closeOverlay(e);});requestAnimationFrame(()=>{this.stack.push(t),t.addEventListener("beforetoggle",this.handleBeforetoggle,{once:!0});});}remove(t){this.closeOverlay(t);}};const overlayStack=new c$1;

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
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
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
 * next to a reference element when it is given a certain positioning strategy.
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
      continue;
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
const arrow = options => ({
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
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
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
const flip = function (options) {
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

  // eslint-disable-next-line prefer-const
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
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      const {
        x,
        y
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
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
const size = function (options) {
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
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
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
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle$1(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
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
function getComputedStyle$1(element) {
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
  const css = getComputedStyle$1(element);
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
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
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
  if (getComputedStyle$1(body).direction === 'rtl') {
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
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
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
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
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
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
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
  return getCssDimensions(element);
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
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
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
  const window = getWindow(element);
  if (!isHTMLElement(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
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
    clearTimeout(timeoutId);
    io && io.disconnect();
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
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
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
          resizeObserver && resizeObserver.observe(floating);
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
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
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

const topLayerOverTransforms=()=>({name:"topLayer",async fn(g){const{x:s,y:l,elements:{reference:c,floating:o}}=g;let e=!1,f=!1,d=!1;const r={x:0,y:0};try{e=e||o.matches(":popover-open");}catch(a){}try{e=e||o.matches(":open");}catch(a){}try{e=e||o.matches(":modal");}catch(a){}f=e;const p=new Event("floating-ui-dialog-test",{composed:!0,bubbles:!0});o.addEventListener("floating-ui-dialog-test",a=>{a.composedPath().forEach(n=>{if(d=d||n===c,!(n===o||n.localName!=="dialog"))try{e=e||n.matches(":modal");}catch(t){}});},{once:!0}),o.dispatchEvent(p);let m=!1;if(!(c instanceof VirtualTrigger)){const a=d?c:o,n=isContainingBlock(a)?a:getContainingBlock(a);let t={};if(n!==null&&getWindow(n)!==n&&(t=getComputedStyle(n),m=t.transform!=="none"||t.translate!=="none"||(t.backdropFilter?t.backdropFilter!=="none":!1)||(t.filter?t.filter!=="none":!1)||t.willChange.search("transform")>-1||t.willChange.search("translate")>-1||["paint","layout","strict","content"].some(i=>(t.contain||"").includes(i))),e&&m&&n){const i=n.getBoundingClientRect(),{marginInlineStart:y="0",marginBlockStart:u="0"}=t;r.x=i.x+parseFloat(y),r.y=i.y+parseFloat(u);}}return e&&f?{x:s+r.x,y:l+r.y,data:r}:e?{x:s,y:l,data:r}:{x:s-r.x,y:l-r.y,data:r}}});

function p(o){if(typeof o=="undefined")return 0;const t=window.devicePixelRatio||1;return Math.round(o*t)/t}const m=8,L=100,A=o=>{var e;return (e={left:["right","bottom","top"],"left-start":["right-start","bottom","top"],"left-end":["right-end","bottom","top"],right:["left","bottom","top"],"right-start":["left-start","bottom","top"],"right-end":["left-end","bottom","top"],top:["bottom","left","right"],"top-start":["bottom-start","left","right"],"top-end":["bottom-end","left","right"],bottom:["top","left","right"],"bottom-start":["top-start","left","right"],"bottom-end":["top-end","left","right"]}[o])!=null?e:[o]};class PlacementController{constructor(t){this.originalPlacements=new WeakMap;this.allowPlacementUpdate=!1;this.updatePlacement=()=>{if(!this.allowPlacementUpdate&&this.options.type!=="modal"&&this.cleanup){this.target.dispatchEvent(new Event("close",{bubbles:!0}));return}this.computePlacement(),this.allowPlacementUpdate=!1;};this.resetOverlayPosition=()=>{!this.target||!this.options||(this.target.style.removeProperty("max-height"),this.target.style.removeProperty("height"),this.initialHeight=void 0,this.isConstrained=!1,this.host.offsetHeight,this.computePlacement());};this.host=t,this.host.addController(this);}async placeOverlay(t=this.target,e=this.options){if(this.target=t,this.options=e,!t||!e)return;const c=autoUpdate(e.trigger,t,this.updatePlacement,{elementResize:!1,layoutShift:!1});this.cleanup=()=>{var r;(r=this.host.elements)==null||r.forEach(s=>{s.addEventListener("sp-closed",()=>{const a=this.originalPlacements.get(s);a&&s.setAttribute("placement",a),this.originalPlacements.delete(s);},{once:!0});}),c();};}async computePlacement(){var f,g;const{options:t,target:e}=this;await(document.fonts?document.fonts.ready:Promise.resolve());const c=t.trigger instanceof HTMLElement?flip():flip({padding:m,fallbackPlacements:A(t.placement)}),[r=0,s=0]=Array.isArray(t==null?void 0:t.offset)?t.offset:[t.offset,0],a=(f=this.host.elements.find(i=>i.tipElement))==null?void 0:f.tipElement,v=[offset({mainAxis:r,crossAxis:s}),shift({padding:m}),c,size({padding:m,apply:({availableWidth:i,availableHeight:h,rects:{floating:x}})=>{const u=Math.max(L,Math.floor(h)),l=x.height;this.initialHeight=this.isConstrained&&this.initialHeight||l,this.isConstrained=l<this.initialHeight||u<=l;const b=this.isConstrained?`${u}px`:"";Object.assign(e.style,{maxWidth:`${Math.floor(i)}px`,maxHeight:b,height:b});}}),...a?[arrow({element:a,padding:t.tipPadding||m})]:[],topLayerOverTransforms()],{x:P,y:E,placement:n,middlewareData:d}=await computePosition(t.trigger,e,{placement:t.placement,middleware:v,strategy:"fixed"});if(Object.assign(e.style,{top:"0px",left:"0px",translate:`${p(P)}px ${p(E)}px`}),e.setAttribute("actual-placement",n),(g=this.host.elements)==null||g.forEach(i=>{this.originalPlacements.set(i,i.getAttribute("placement")),i.setAttribute("placement",n);}),a&&d.arrow){const{x:i,y:h}=d.arrow;Object.assign(a.style,{top:n.startsWith("right")||n.startsWith("left")?"0px":"",left:n.startsWith("bottom")||n.startsWith("top")?"0px":"",translate:`${p(i)}px ${p(h)}px`});}}hostConnected(){document.addEventListener("sp-update-overlays",this.resetOverlayPosition);}hostUpdated(){var t;this.host.open||((t=this.cleanup)==null||t.call(this),this.cleanup=void 0);}hostDisconnected(){var t;(t=this.cleanup)==null||t.call(this),this.cleanup=void 0,document.removeEventListener("sp-update-overlays",this.resetOverlayPosition);}}

const o$1=i`
:host{--swc-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);display:contents;pointer-events:none}.dialog{--sp-overlay-open:true;background:none;border:0;box-sizing:border-box;display:flex;height:auto;inset:auto;left:0;margin:0;max-height:calc(100vh - 16px);max-height:calc(100dvh - 16px);max-width:calc(100vw - 16px);opacity:1!important;overflow:visible;padding:0;position:fixed;top:0}.dialog:not([is-visible]){translate:-999em -999em!important}.dialog:focus{outline:none}dialog:modal{--mod-popover-filter:var(--spectrum-popover-filter)}:host(:not([open])) .dialog{--sp-overlay-open:false}.dialog::backdrop{display:none}.dialog:before{content:"";inset:-999em;pointer-events:auto!important;position:absolute}.dialog:not(.not-immediately-closable):before{display:none}.dialog>div{width:100%}::slotted(*){pointer-events:auto}::slotted(sp-popover){position:static}::slotted(sp-tooltip){--swc-tooltip-margin:0}.dialog:not([actual-placement])[placement*=top]{margin-top:var(--swc-overlay-animation-distance);padding-block:var(--swc-overlay-animation-distance)}.dialog:not([actual-placement])[placement*=right]{margin-left:calc(var(--swc-overlay-animation-distance)*-1);padding-inline:var(--swc-overlay-animation-distance)}.dialog:not([actual-placement])[placement*=bottom]{margin-top:calc(var(--swc-overlay-animation-distance)*-1);padding-block:var(--swc-overlay-animation-distance)}.dialog:not([actual-placement])[placement*=left]{margin-left:var(--swc-overlay-animation-distance);padding-inline:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=top]{margin-top:var(--swc-overlay-animation-distance);padding-block:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=right]{margin-left:calc(var(--swc-overlay-animation-distance)*-1);padding-inline:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=bottom]{margin-top:calc(var(--swc-overlay-animation-distance)*-1);padding-block:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=left]{margin-left:var(--swc-overlay-animation-distance);padding-inline:var(--swc-overlay-animation-distance)}slot[name=longpress-describedby-descriptor]{display:none}@supports selector(:open){.dialog{opacity:0}.dialog:open{--mod-popover-filter:var(--spectrum-popover-filter);opacity:1}}@supports selector(:popover-open){.dialog{opacity:0}.dialog:popover-open{--mod-popover-filter:var(--spectrum-popover-filter);opacity:1}}@supports (not selector(:open)) and (not selector(:popover-open)){:host:not([open]) .dialog{pointer-events:none}.dialog[actual-placement]{z-index:calc(var(--swc-overlay-z-index-base, 1000) + var(--swc-overlay-open-count))}}
`;var I = o$1;

var P=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var n=(v,h,e,t)=>{for(var i=t>1?void 0:t?w(h,e):h,r=v.length-1,s;r>=0;r--)(s=v[r])&&(i=(t?s(h,e,i):s(i))||i);return t&&i&&P(h,e,i),i};const V=300,F=300;const LONGPRESS_INSTRUCTIONS={touch:"Double tap and long press for additional options",keyboard:"Press Space or Alt+Down Arrow for additional options",mouse:"Click and hold for additional options"};const U="showPopover"in document.createElement("div");let c=OverlayDialog(AbstractOverlay);U?c=OverlayPopover(c):c=OverlayNoPopover(c);const o=class o extends c{constructor(){super(...arguments);this._delayed=!1;this._disabled=!1;this.longpressState="null";this.offset=6;this.placementController=new PlacementController(this);this._open=!1;this.receivesFocus="auto";this.releaseAriaDescribedby=noop;this.releaseLongpressDescribedby=noop;this._state="closed";this.triggerElement=null;this.type="auto";this.wasOpen=!1;this.elementResolver=new ElementResolutionController(this);this.closeOnFocusOut=e=>{if(!e.relatedTarget)return;const t=new Event("overlay-relation-query",{bubbles:!0,composed:!0});e.relatedTarget.addEventListener(t.type,i=>{i.composedPath().includes(this)||(this.open=!1);}),e.relatedTarget.dispatchEvent(t);};this.elementIds=[];this.handlePointerdown=e=>{if(!this.triggerElement||e.button!==0)return;const t=this.triggerElement;this.longpressState="potential",document.addEventListener("pointerup",this.handlePointerup),document.addEventListener("pointercancel",this.handlePointerup),!t.holdAffordance&&(this.longressTimeout=setTimeout(()=>{t&&t.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"pointer"}}));},V));};this.handlePointerup=()=>{clearTimeout(this.longressTimeout),this.triggerElement&&(this.longpressState=this.state==="opening"?"pressed":"null",document.removeEventListener("pointerup",this.handlePointerup),document.removeEventListener("pointercancel",this.handlePointerup));};this.handleKeydown=e=>{const{code:t,altKey:i}=e;(t==="Space"||i&&t==="ArrowDown")&&t==="ArrowDown"&&(e.stopPropagation(),e.stopImmediatePropagation());};this.handleKeyup=e=>{const{code:t,altKey:i}=e;if(t==="Space"||i&&t==="ArrowDown"){if(!this.triggerElement||!this.hasNonVirtualTrigger)return;e.stopPropagation(),this.triggerElement.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"keyboard"}})),setTimeout(()=>{this.longpressState="null";});}};this.preventNextToggle=!1;this.handlePointerdownForClick=()=>{this.preventNextToggle=this.open;};this.handleClick=()=>{this.longpressState==="opening"||this.longpressState==="pressed"||(this.preventNextToggle||(this.open=!this.open),this.preventNextToggle=!1);};this.focusedin=!1;this.handleFocusin=()=>{this.open=!0,this.focusedin=!0;};this.handleFocusout=()=>{this.focusedin=!1,!this.pointerentered&&(this.open=!1);};this.pointerentered=!1;this.handlePointerenter=()=>{this.hoverTimeout&&(clearTimeout(this.hoverTimeout),delete this.hoverTimeout),!this.disabled&&(this.open=!0,this.pointerentered=!0);};this.handleOverlayPointerenter=()=>{this.hoverTimeout&&(clearTimeout(this.hoverTimeout),delete this.hoverTimeout);};this.handlePointerleave=()=>{this.doPointerleave();};this.handleOverlayPointerleave=()=>{this.doPointerleave();};this.handleLongpress=()=>{this.open=!0,this.longpressState=this.longpressState==="potential"?"opening":"pressed";};}get delayed(){var e;return ((e=this.elements.at(-1))==null?void 0:e.hasAttribute("delayed"))||this._delayed}set delayed(e){this._delayed=e;}get disabled(){return this._disabled}set disabled(e){this._disabled=e,e?(this.hasNonVirtualTrigger&&this.unbindEvents(),this.wasOpen=this.open,this.open=!1):(this.bindEvents(),this.open=this.open||this.wasOpen,this.wasOpen=!1);}get hasNonVirtualTrigger(){return !!this.triggerElement&&!(this.triggerElement instanceof VirtualTrigger)}get open(){return this._open}set open(e){e&&this.disabled||e!==this.open&&((this.longpressState==="opening"||this.longpressState==="pressed")&&!e||(this._open=e,this.open&&(o.openCount+=1),this.requestUpdate("open",!this.open)));}get state(){return this._state}set state(e){if(e===this.state)return;const t=this.state;this._state=e,(this.state==="opened"||this.state==="closed")&&(this.longpressState=this.longpressState==="pressed"?"null":this.longpressState),this.requestUpdate("state",t);}get usesDialog(){return this.type==="modal"||this.type==="page"}get popoverValue(){if("popover"in this)switch(this.type){case"modal":case"page":return;case"hint":return "manual";default:return this.type}}get requiresPosition(){return !(this.type==="page"||!this.open||!this.triggerElement||!this.placement&&this.type!=="hint")}managePosition(){if(!this.requiresPosition||!this.open)return;const e=this.offset||0,t=this.triggerElement,i=this.placement||"right",r=this.tipPadding;this.placementController.placeOverlay(this.dialogEl,{offset:e,placement:i,tipPadding:r,trigger:t,type:this.type});}async managePopoverOpen(){super.managePopoverOpen();const e=this.open;if(this.open!==e||(await this.manageDelay(e),this.open!==e)||(await this.ensureOnDOM(e),this.open!==e))return;const t=await this.makeTransition(e);this.open===e&&await this.applyFocus(e,t);}async applyFocus(e,t){if(!(this.receivesFocus==="false"||this.type==="hint")){if(await nextFrame(),await nextFrame(),e===this.open&&!this.open){this.hasNonVirtualTrigger&&this.contains(this.getRootNode().activeElement)&&this.triggerElement.focus();return}t==null||t.focus();}}async manageOpen(e){var t;if(!(!this.isConnected&&this.open)){if(this.hasUpdated||await this.updateComplete,this.open?(overlayStack.add(this),this.willPreventClose&&(document.addEventListener("pointerup",()=>{this.dialogEl.classList.toggle("not-immediately-closable",!1),this.willPreventClose=!1;},{once:!0}),this.dialogEl.classList.toggle("not-immediately-closable",!0))):(e&&this.dispose(),overlayStack.remove(this)),this.open&&this.state!=="opened"?this.state="opening":!this.open&&this.state!=="closed"&&(this.state="closing"),this.usesDialog?this.manageDialogOpen():this.managePopoverOpen(),this.type==="auto"){const i=this.getRootNode();this.open?i.addEventListener("focusout",this.closeOnFocusOut,{capture:!0}):i.removeEventListener("focusout",this.closeOnFocusOut,{capture:!0});}if(!this.open&&this.type!=="hint"){const i=()=>{var p;const r=[];let s=document.activeElement;for(;s!=null&&s.shadowRoot&&s.shadowRoot.activeElement;)s=s.shadowRoot.activeElement;for(;s;){const a=s.assignedSlot||s.parentElement||((p=s.getRootNode())==null?void 0:p.host);a&&r.push(a),s=a;}return r};(t=this.triggerElement)!=null&&t.focus&&(this.contains(this.getRootNode().activeElement)||i().includes(this))&&this.triggerElement.focus();}}}unbindEvents(){var e;(e=this.abortController)==null||e.abort();}bindEvents(){if(!this.hasNonVirtualTrigger)return;this.abortController=new AbortController;const e=this.triggerElement;switch(this.triggerInteraction){case"click":this.bindClickEvents(e);return;case"longpress":this.bindLongpressEvents(e);return;case"hover":this.bindHoverEvents(e);return}}bindClickEvents(e){const t={signal:this.abortController.signal};e.addEventListener("click",this.handleClick,t),e.addEventListener("pointerdown",this.handlePointerdownForClick,t);}bindLongpressEvents(e){const t={signal:this.abortController.signal};e.addEventListener("longpress",this.handleLongpress,t),e.addEventListener("pointerdown",this.handlePointerdown,t),this.prepareLongpressDescription(e),!e.holdAffordance&&(e.addEventListener("keydown",this.handleKeydown,t),e.addEventListener("keyup",this.handleKeyup,t));}bindHoverEvents(e){const t={signal:this.abortController.signal};e.addEventListener("focusin",this.handleFocusin,t),e.addEventListener("focusout",this.handleFocusout,t),e.addEventListener("pointerenter",this.handlePointerenter,t),e.addEventListener("pointerleave",this.handlePointerleave,t),this.addEventListener("pointerenter",this.handleOverlayPointerenter,t),this.addEventListener("pointerleave",this.handleOverlayPointerleave,t);}manageTriggerElement(e){e&&(this.unbindEvents(),this.releaseAriaDescribedby()),!(!this.triggerElement||this.triggerElement instanceof VirtualTrigger)&&(this.bindEvents(),this.receivesFocus!=="true"&&this.prepareAriaDescribedby());}prepareLongpressDescription(e){if(this.triggerInteraction!=="longpress"||this.releaseLongpressDescribedby!==noop||!this.elements.length)return;const t=document.createElement("div");t.id=`longpress-describedby-descriptor-${crypto.randomUUID().slice(0,8)}`;const i=isIOS()||isAndroid()?"touch":"keyboard";t.textContent=LONGPRESS_INSTRUCTIONS[i],t.slot="longpress-describedby-descriptor";const r=e.getRootNode(),s=this.getRootNode();r===s?this.append(t):(t.hidden=!("host"in r),e.insertAdjacentElement("afterend",t));const p=conditionAttributeWithId(e,"aria-describedby",[t.id]);this.releaseLongpressDescribedby=()=>{p(),t.remove(),this.releaseLongpressDescribedby=noop;};}prepareAriaDescribedby(){if(this.triggerInteraction!=="hover"||this.releaseAriaDescribedby!==noop||!this.elements.length||!this.hasNonVirtualTrigger)return;const e=this.triggerElement,t=e.getRootNode(),i=this.elements[0].getRootNode(),r=this.getRootNode();if(t==r){const s=conditionAttributeWithId(e,"aria-describedby",[this.id]);this.releaseAriaDescribedby=()=>{s(),this.releaseAriaDescribedby=noop;};}else if(t===i){this.elementIds=this.elements.map(a=>a.id);const s=this.elements.map(a=>(a.id||(a.id=`${this.tagName.toLowerCase()}-helper-${crypto.randomUUID().slice(0,8)}`),a.id)),p=conditionAttributeWithId(e,"aria-describedby",s);this.releaseAriaDescribedby=()=>{p(),this.elements.map((a,L)=>{a.id=this.elementIds[L];}),this.releaseAriaDescribedby=noop;};}}doPointerleave(){this.pointerentered=!1;const e=this.triggerElement;this.focusedin&&e.matches(":focus-visible")||(this.hoverTimeout=setTimeout(()=>{this.open=!1;},F));}handleBeforetoggle(e){e.newState!=="open"&&this.handleBrowserClose();}handleBrowserClose(){if(this.longpressState!=="opening"&&this.longpressState!=="pressed"){this.open=!1;return}this.manuallyKeepOpen();}manuallyKeepOpen(){super.manuallyKeepOpen(),this.open=!0,this.placementController.allowPlacementUpdate=!0,this.manageOpen(!1);}handleSlotchange(){this.triggerElement&&this.prepareAriaDescribedby(),this.elements.length?this.hasNonVirtualTrigger&&this.prepareLongpressDescription(this.triggerElement):this.releaseLongpressDescribedby();}shouldPreventClose(){const e=this.willPreventClose;return this.willPreventClose=!1,e}willUpdate(e){var i;if(this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${crypto.randomUUID().slice(0,8)}`),e.has("open")&&(typeof e.get("open")!="undefined"||this.open)&&this.manageOpen(e.get("open")),e.has("trigger")){const[r,s]=((i=this.trigger)==null?void 0:i.split("@"))||[];this.elementResolver.selector=r?`#${r}`:"",this.triggerInteraction=s;}const t=this.triggerElement;e.has(elementResolverUpdatedSymbol)&&(this.triggerElement=this.elementResolver.element,this.manageTriggerElement(t)),e.has("triggerElement")&&this.manageTriggerElement(e.get("triggerElement"));}updated(e){super.updated(e),e.has("placement")&&(this.placement?this.dialogEl.setAttribute("actual-placement",this.placement):this.dialogEl.removeAttribute("actual-placement"),this.open&&typeof e.get("placement")!="undefined"&&this.placementController.resetOverlayPosition());}renderContent(){return x`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}get dialogStyleMap(){return {"--swc-overlay-open-count":o.openCount.toString()}}renderDialog(){return x`
            <dialog
                class="dialog"
                part="dialog"
                placement=${l$1(this.requiresPosition?this.placement||"right":void 0)}
                style=${o$2(this.dialogStyleMap)}
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
                placement=${l$1(this.requiresPosition?this.placement||"right":void 0)}
                popover=${l$1(this.popoverValue)}
                style=${o$2(this.dialogStyleMap)}
                @beforetoggle=${this.handleBeforetoggle}
                @close=${this.handleBrowserClose}
                ?is-visible=${this.state!=="closed"}
            >
                ${this.renderContent()}
            </div>
        `}render(){const e=this.type==="modal"||this.type==="page";return x`
            ${e?this.renderDialog():this.renderPopover()}
            <slot name="longpress-describedby-descriptor"></slot>
        `}connectedCallback(){super.connectedCallback(),this.addEventListener("close",()=>{this.open=!1;}),this.hasNonVirtualTrigger&&this.bindEvents();}disconnectedCallback(){this.hasNonVirtualTrigger&&this.unbindEvents(),this.releaseAriaDescribedby(),this.releaseLongpressDescribedby(),this.open=!1,super.disconnectedCallback();}};o.styles=[I],o.openCount=1,n([n$1({type:Boolean})],o.prototype,"delayed",1),n([i$1(".dialog")],o.prototype,"dialogEl",2),n([n$1({type:Boolean})],o.prototype,"disabled",1),n([l({flatten:!0,selector:':not([slot="longpress-describedby-descriptor"], slot)'})],o.prototype,"elements",2),n([n$1({type:Number})],o.prototype,"offset",2),n([n$1({type:Boolean,reflect:!0})],o.prototype,"open",1),n([n$1()],o.prototype,"placement",2),n([n$1({attribute:"receives-focus"})],o.prototype,"receivesFocus",2),n([i$1("slot")],o.prototype,"slotEl",2),n([t()],o.prototype,"state",1),n([n$1({type:Number,attribute:"tip-padding"})],o.prototype,"tipPadding",2),n([n$1()],o.prototype,"trigger",2),n([n$1({attribute:!1})],o.prototype,"triggerElement",2),n([n$1({attribute:!1})],o.prototype,"triggerInteraction",2),n([n$1()],o.prototype,"type",2);let Overlay=o;

defineElement("sp-overlay",Overlay);

var spOverlay = /*#__PURE__*/Object.freeze({
  __proto__: null
});

export { Overlay as O, spOverlay as s };
