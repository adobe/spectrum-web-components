---
'@adobe/spectrum-wc': patch
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc-icons': patch
---

Fix Gen2 package subpath exports so component classes, registration modules, CSS declarations, and core controllers resolve from published packages. Remove redundant deep-file exports that are already available through core barrels.
