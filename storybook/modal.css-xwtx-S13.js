import { i as i$1 } from './lit-element-xBOPiTek.js';

const i=i$1`
.modal{opacity:0;pointer-events:none;transition:transform var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,opacity var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
) ease-in-out,visibility 0s linear var(
--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)
);visibility:hidden}:host([open]) .modal{opacity:1;pointer-events:auto;transition-delay:var(
--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s)
);visibility:visible}:host{--spectrum-modal-confirm-exit-animation-delay:var(
--spectrum-animation-duration-0
);--spectrum-modal-fullscreen-margin:32px;--spectrum-modal-max-height:90vh;--spectrum-modal-max-width:90%;--spectrum-modal-background-color:var(--spectrum-gray-100);--spectrum-modal-confirm-border-radius:var(--spectrum-corner-radius-100);--spectrum-modal-confirm-exit-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-modal-confirm-entry-animation-duration:var(
--spectrum-animation-duration-500
);--spectrum-modal-confirm-entry-animation-delay:var(
--spectrum-animation-duration-200
);--spectrum-modal-transition-animation-duration:var(
--spectrum-animation-duration-100
)}.modal{background:var(
--mod-modal-background-color,var(--spectrum-modal-background-color)
);border-radius:var(
--mod-modal-confirm-border-radius,var(--spectrum-modal-confirm-border-radius)
);max-block-size:var(
--mod-modal-max-height,var(--spectrum-modal-max-height)
);max-inline-size:var(
--mod-modal-max-width,var(--spectrum-modal-max-width)
);outline:none;overflow:hidden;pointer-events:auto;transform:translateY(var(
--mod-modal-confirm-entry-animation-distance,var(--spectrum-modal-confirm-entry-animation-distance)
));transition:opacity var(
--mod-modal-confirm-exit-animation-duration,var(--spectrum-modal-confirm-exit-animation-duration)
) var(--spectrum-animation-ease-in) var(
--mod-modal-confirm-exit-animation-delay,var(--spectrum-modal-confirm-exit-animation-delay)
),visibility 0s linear calc(var(
--mod-modal-confirm-exit-animation-delay,
var(--spectrum-modal-confirm-exit-animation-delay)
) + var(
--mod-modal-confirm-exit-animation-duration,
var(--spectrum-modal-confirm-exit-animation-duration)
)),transform 0s linear calc(var(
--mod-modal-confirm-exit-animation-delay,
var(--spectrum-modal-confirm-exit-animation-delay)
) + var(
--mod-modal-confirm-exit-animation-duration,
var(--spectrum-modal-confirm-exit-animation-duration)
));z-index:2}:host([open]) .modal{transform:translateY(0);transition:transform var(
--mod-modal-confirm-entry-animation-duration,var(--spectrum-modal-confirm-entry-animation-duration)
) var(--spectrum-animation-ease-out) var(
--mod-modal-confirm-entry-animation-delay,var(--spectrum-modal-confirm-entry-animation-delay)
),opacity var(
--mod-modal-confirm-entry-animation-duration,var(--spectrum-modal-confirm-entry-animation-duration)
) var(--spectrum-animation-ease-out) var(
--mod-modal-confirm-entry-animation-delay,var(--spectrum-modal-confirm-entry-animation-delay)
)}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]) .modal{border-radius:0;inline-size:100%;height:100%;max-inline-size:100%;max-height:100%}}.fullscreen{inset-block-end:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
);inset-block-start:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
);inset-inline-end:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
);inset-inline-start:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
)}.fullscreen,.fullscreenTakeover{max-inline-size:none;max-height:none;position:fixed}.fullscreenTakeover{border:none;border-radius:0;box-sizing:border-box;inset:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(
--swc-test-duration
);height:100dvh}.modal{overflow:visible}
`;var v = i;

export { v };