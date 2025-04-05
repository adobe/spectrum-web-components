---
'@spectrum-web-components/popover': patch
---

📝 #[​3566](https://github.com/adobe/spectrum-css/pull/3566) Thanks [@​aramos-adobe](https://github.com/aramos-adobe)!

Popover overflow bug on Safari

-   `translateZ` has been added to the open popover to prevent clipping of the `filter: drop-shadow` when overflow is applied. `translateZ` or `translate3d` on the open state accelerates the component to the GPU layer maintaining any transformations and animations.
-   `overflow: visible` applied to CSS `*--withTip` so the tip is still visible if overflow is applied to the component.
