---
'@spectrum-web-components/switch': patch
---

### Fix down state colors for switch

Because the `postcss-hover-media-feature` plugin converts hover styles into a media query for devices that support hover, the hover styles were overriding any active/down state styles. We needed to target the active/down states of the switch with additional active state selectors, in order to ensure that the active state takes precedence over the hover state, maintaining the correct visual behavior of the switch component across different interaction states.

This fix should address hover + active state discrepancies in S1 and S2 foundations.
