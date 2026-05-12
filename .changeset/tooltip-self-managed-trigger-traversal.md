---
'@spectrum-web-components/tooltip': patch
'@spectrum-web-components/action-menu': patch
'@spectrum-web-components/picker': patch
---

**Fixed**: Self-managed tooltips slotted into host components (Action Menu, Picker) no longer emit false `[TRAVERSAL_EXHAUSTED]` warnings. Added a public `triggerElement` setter on `sp-tooltip` that allows host components to explicitly wire their internal trigger element, bypassing the ancestor-based composed-tree traversal that fails when the intended trigger is a sibling of the tooltip slot rather than an ancestor.
