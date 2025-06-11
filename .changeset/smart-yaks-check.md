---
'@spectrum-web-components/progress-bar': patch
---

Smooths the transition animation of indeterminate progress bar by overriding the incoming CSS, and positioning the animating fill element completely off of the progress bar track in both LTR and RTL languages. Before, the fill element was automatically starting on the track which led to a jarring animation loop.
