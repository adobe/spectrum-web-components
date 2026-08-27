---
'@spectrum-web-components/progress-bar': patch
---

Fix the `side-label` and `progress` deprecation warnings on `sp-progress-bar`, which pointed consumers to a `label-position` attribute and a `value` attribute that do not exist on `sp-progress-bar`. Those properties only exist on the 2nd-gen `swc-progress-bar`. The JSDoc and runtime warnings now state that there is no 1st-gen replacement and name `swc-progress-bar` as the actual replacement.
