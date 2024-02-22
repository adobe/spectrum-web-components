import { i } from './lit-element-xBOPiTek.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { S as SpectrumElement, n } from './define-element-b58XwwBM.js';
import { i as i$1 } from './query-JMOstM_r.js';

const o=i`
:host{opacity:0;pointer-events:none;transition:transform var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,opacity var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,visibility 0s linear var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:var(
--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s)
);visibility:visible}:host{--flow-direction:1}:host([dir=rtl]){--flow-direction:-1}:host{--spectrum-popover-animation-distance:var(--spectrum-spacing-100);--spectrum-popover-background-color:var(
--spectrum-background-layer-2-color
);--spectrum-popover-border-color:var(--spectrum-gray-400);--spectrum-popover-content-area-spacing-vertical:var(
--spectrum-popover-top-to-content-area
);--spectrum-popover-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-popover-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-popover-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-popover-shadow-color:var(--spectrum-drop-shadow-color);--spectrum-popover-corner-radius:var(--spectrum-corner-radius-100);--spectrum-popover-pointer-width:var(--spectrum-popover-tip-width);--spectrum-popover-pointer-height:var(--spectrum-popover-tip-height);--spectrum-popover-pointer-edge-offset:calc(var(--spectrum-corner-radius-100) + var(--spectrum-popover-tip-width)/2);--spectrum-popover-pointer-edge-spacing:calc(var(--spectrum-popover-pointer-edge-offset) - var(--spectrum-popover-tip-width)/2)}@media (forced-colors:active){:host{--highcontrast-popover-border-color:CanvasText}}:host{--spectrum-popover-filter:drop-shadow(var(
--mod-popover-shadow-horizontal,var(--spectrum-popover-shadow-horizontal)
) var(
--mod-popover-shadow-vertical,var(--spectrum-popover-shadow-vertical)
) var(--mod-popover-shadow-blur,var(--spectrum-popover-shadow-blur)) var(
--mod-popover-shadow-color,var(--spectrum-popover-shadow-color)
));background-color:var(
--mod-popover-background-color,var(--spectrum-popover-background-color)
);border-color:var(
--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color))
);border-radius:var(
--mod-popover-corner-radius,var(--spectrum-popover-corner-radius)
);border-style:solid;border-width:var(
--mod-popover-border-width,var(--spectrum-popover-border-width)
);box-sizing:border-box;display:inline-flex;filter:var(--mod-popover-filter,var(--spectrum-popover-filter));flex-direction:column;outline:none;padding:var(
--mod-popover-content-area-spacing-vertical,var(--spectrum-popover-content-area-spacing-vertical)
) 0;position:absolute}:host([tip]) #tip .triangle{stroke-linecap:square;stroke-linejoin:miter;fill:var(
--highcontrast-popover-background-color,var(
--mod-popover-background-color,var(--spectrum-popover-background-color)
)
);stroke:var(
--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color))
);stroke-width:var(
--mod-popover-border-width,var(--spectrum-popover-border-width)
)}*{--mod-popover-filter:none}:host([placement*=top][tip]),:host([tip]) .spectrum-Popover--top-end,:host([tip]) .spectrum-Popover--top-left,:host([tip]) .spectrum-Popover--top-right,:host([tip]) .spectrum-Popover--top-start{margin-bottom:calc(var(
--mod-popover-pointer-height,
var(--spectrum-popover-pointer-height)
) - var(
--mod-popover-border-width,
var(--spectrum-popover-border-width)
))}:host([open]) .spectrum-Popover--top-end,:host([open]) .spectrum-Popover--top-left,:host([open]) .spectrum-Popover--top-right,:host([open]) .spectrum-Popover--top-start,:host([placement*=top][open]){transform:translateY(calc(var(
--mod-popover-animation-distance,
var(--spectrum-popover-animation-distance)
)*-1))}:host([placement*=bottom][tip]),:host([tip]) .spectrum-Popover--bottom-end,:host([tip]) .spectrum-Popover--bottom-left,:host([tip]) .spectrum-Popover--bottom-right,:host([tip]) .spectrum-Popover--bottom-start{margin-top:calc(var(
--mod-popover-pointer-height,
var(--spectrum-popover-pointer-height)
) - var(
--mod-popover-border-width,
var(--spectrum-popover-border-width)
))}:host([open]) .spectrum-Popover--bottom-end,:host([open]) .spectrum-Popover--bottom-left,:host([open]) .spectrum-Popover--bottom-right,:host([open]) .spectrum-Popover--bottom-start,:host([placement*=bottom][open]){transform:translateY(var(
--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)
))}:host([placement*=right][tip]),:host([tip]) .spectrum-Popover--right-bottom,:host([tip]) .spectrum-Popover--right-top{margin-left:calc(var(--mod-popover-pointer-width, var(--spectrum-popover-pointer-width)) - var(
--mod-popover-border-width,
var(--spectrum-popover-border-width)
))}:host([open]) .spectrum-Popover--right-bottom,:host([open]) .spectrum-Popover--right-top,:host([placement*=right][open]){transform:translateX(var(
--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)
))}:host([placement*=left][tip]),:host([tip]) .spectrum-Popover--left-bottom,:host([tip]) .spectrum-Popover--left-top{margin-right:calc(var(--mod-popover-pointer-width, var(--spectrum-popover-pointer-width)) - var(
--mod-popover-border-width,
var(--spectrum-popover-border-width)
))}:host([open]) .spectrum-Popover--left-bottom,:host([open]) .spectrum-Popover--left-top,:host([placement*=left][open]){transform:translateX(calc(var(
--mod-popover-animation-distance,
var(--spectrum-popover-animation-distance)
)*-1))}:host([tip]) .spectrum-Popover--start,:host([tip]) .spectrum-Popover--start-bottom,:host([tip]) .spectrum-Popover--start-top{margin-inline-end:calc(var(--mod-popover-pointer-width, var(--spectrum-popover-pointer-width)) - var(
--mod-popover-border-width,
var(--spectrum-popover-border-width)
))}:host([open]) .spectrum-Popover--start,:host([open]) .spectrum-Popover--start-bottom,:host([open]) .spectrum-Popover--start-top{transform:translateX(calc(var(
--mod-popover-animation-distance,
var(--spectrum-popover-animation-distance)
)*-1))}:host([dir=rtl][open]) .spectrum-Popover--start,:host([dir=rtl][open]) .spectrum-Popover--start-bottom,:host([dir=rtl][open]) .spectrum-Popover--start-top{transform:translateX(var(
--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)
))}:host([tip]) .spectrum-Popover--end,:host([tip]) .spectrum-Popover--end-bottom,:host([tip]) .spectrum-Popover--end-top{margin-inline-start:calc(var(--mod-popover-pointer-width, var(--spectrum-popover-pointer-width)) - var(
--mod-popover-border-width,
var(--spectrum-popover-border-width)
))}:host([open]) .spectrum-Popover--end,:host([open]) .spectrum-Popover--end-bottom,:host([open]) .spectrum-Popover--end-top{transform:translateX(var(
--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)
))}:host([dir=rtl][open]) .spectrum-Popover--end,:host([dir=rtl][open]) .spectrum-Popover--end-bottom,:host([dir=rtl][open]) .spectrum-Popover--end-top{transform:translateX(calc(var(
--mod-popover-animation-distance,
var(--spectrum-popover-animation-distance)
)*-1))}:host([tip]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip,:host([tip]) .spectrum-Popover--top-end #tip,:host([tip]) .spectrum-Popover--top-left #tip,:host([tip]) .spectrum-Popover--top-right #tip,:host([tip]) .spectrum-Popover--top-start #tip,:host([tip][placement*=bottom]) #tip,:host([tip][placement*=top]) #tip{height:var(
--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)
);left:0;margin:auto;position:absolute;right:0;top:100%;transform:translate(0);width:var(
--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)
)}:host([tip]) .spectrum-Popover--top-left #tip{left:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
);right:auto}:host([tip]) .spectrum-Popover--top-right #tip{left:auto;right:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
)}:host([tip]) .spectrum-Popover--top-start #tip{margin-inline-start:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
)}:host([tip]) .spectrum-Popover--top-end #tip{margin-inline-end:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
)}:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip,:host([tip][placement*=bottom]) #tip{bottom:100%;top:auto;transform:scaleY(-1)}:host([tip]) .spectrum-Popover--bottom-left #tip{left:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
);right:auto}:host([tip]) .spectrum-Popover--bottom-right #tip{left:auto;right:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
)}:host([tip]) .spectrum-Popover--bottom-start #tip{margin-inline-start:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
)}:host([tip]) .spectrum-Popover--bottom-end #tip{margin-inline-end:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
)}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip,:host([tip][placement*=left]) #tip,:host([tip][placement*=right]) #tip{bottom:0;height:var(
--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)
);top:0;width:var(
--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)
)}:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--left-top #tip,:host([tip][placement*=left]) .spectrum-Popover--end #tip,:host([tip][placement*=left]) .spectrum-Popover--end-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--end-top #tip,:host([tip][placement*=left]) .spectrum-Popover--left-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--left-top #tip,:host([tip][placement*=left]) .spectrum-Popover--right-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--right-top #tip,:host([tip][placement*=left]) .spectrum-Popover--start #tip,:host([tip][placement*=left]) .spectrum-Popover--start-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--start-top #tip,:host([tip][placement*=left][placement*=left]) #tip,:host([tip][placement*=right]) .spectrum-Popover--left-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--left-top #tip,:host([tip][placement*=right][placement*=left]) #tip{left:100%;right:auto}:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--right-top #tip,:host([tip][placement*=left]) .spectrum-Popover--right-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--right-top #tip,:host([tip][placement*=left][placement*=right]) #tip,:host([tip][placement*=right]) .spectrum-Popover--end #tip,:host([tip][placement*=right]) .spectrum-Popover--end-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--end-top #tip,:host([tip][placement*=right]) .spectrum-Popover--left-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--left-top #tip,:host([tip][placement*=right]) .spectrum-Popover--right-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--right-top #tip,:host([tip][placement*=right]) .spectrum-Popover--start #tip,:host([tip][placement*=right]) .spectrum-Popover--start-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--start-top #tip,:host([tip][placement*=right][placement*=right]) #tip{left:auto;right:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--start-top #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--start-top #tip,:host([tip][placement*=left]) .spectrum-Popover--end-top #tip,:host([tip][placement*=left]) .spectrum-Popover--left-top #tip,:host([tip][placement*=left]) .spectrum-Popover--right-top #tip,:host([tip][placement*=left]) .spectrum-Popover--start-top #tip,:host([tip][placement*=right]) .spectrum-Popover--end-top #tip,:host([tip][placement*=right]) .spectrum-Popover--left-top #tip,:host([tip][placement*=right]) .spectrum-Popover--right-top #tip,:host([tip][placement*=right]) .spectrum-Popover--start-top #tip{bottom:auto;top:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
)}:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--end-bottom.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--end-top.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--end.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--left-top.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-top.spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start.spectrum-Popover--start-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--end-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--left-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--right-bottom #tip,:host([tip][placement*=left]) .spectrum-Popover--start-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--end-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--left-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--right-bottom #tip,:host([tip][placement*=right]) .spectrum-Popover--start-bottom #tip{bottom:var(
--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing)
);top:auto}:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{margin-inline-start:100%}:host([dir=rtl][tip]) .spectrum-Popover--start #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-top #tip{transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip{margin-inline-end:100%;transform:scaleX(-1)}:host([dir=rtl][tip]) .spectrum-Popover--end #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-top #tip{transform:scaleX(1)}:host{--spectrum-popover-border-width:var(
--system-spectrum-popover-border-width
)}:host{clip-path:none;max-height:100%;max-width:100%;min-width:min-content}::slotted(*){overscroll-behavior:contain}:host([placement*=left]) #tip[style],:host([placement*=right]) #tip[style]{bottom:auto}:host([placement*=bottom]) #tip[style],:host([placement*=top]) #tip[style]{right:auto}.block,.inline{display:block;height:100%;width:100%}:host([placement*=left]) .block,:host([placement*=right]) .block{display:none}:host([placement*=bottom]) .inline,:host([placement*=top]) .inline{display:none}::slotted(.visually-hidden){border:0;clip:rect(0,0,0,0);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}::slotted(sp-menu){margin:0}:host([dialog]){min-width:var(
--mod-popover-dialog-min-width,var(--spectrum-popover-dialog-min-width,270px)
);padding:var(
--mod-popover-dialog-padding,var(--spectrum-popover-dialog-padding,30px 29px)
)}:host([tip][placement]) #tip{height:auto}
`;var g = o;

var c=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var t=(o,r,l,p)=>{for(var e=p>1?void 0:p?d(r,l):r,i=o.length-1,a;i>=0;i--)(a=o[i])&&(e=(p?a(r,l,e):a(e))||e);return p&&e&&c(r,l,e),e};class Popover extends SpectrumElement{constructor(){super(...arguments);this.dialog=!1;this.open=!1;this.tip=!1;}static get styles(){return [g]}renderTip(){return x`
            <div id="tip" aria-hidden="true">
                <svg class="tip block" viewBox="0 -0.5 16 9">
                    <path class="triangle" d="M-1,-1 8,8 17,-1"></path>
                </svg>
                <svg class="tip inline" viewBox="0 -0.5 9 16">
                    <path class="triangle" d="M-1,-1 8,8 -1,17"></path>
                </svg>
            </div>
        `}update(l){super.update(l);}render(){return x`
            <slot></slot>
            ${this.tip?this.renderTip():A}
        `}}t([n({type:Boolean,reflect:!0})],Popover.prototype,"dialog",2),t([n({type:Boolean,reflect:!0})],Popover.prototype,"open",2),t([n({reflect:!0})],Popover.prototype,"placement",2),t([n({type:Boolean,reflect:!0})],Popover.prototype,"tip",2),t([i$1("#tip")],Popover.prototype,"tipElement",2);

export { Popover as P };
