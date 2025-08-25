---
'@spectrum-web-components/overlay': minor
---

Added `allow-outside-click` property to `<sp-overlay>` with deprecation notice. This property allows clicks outside the overlay to close it, but is not recommended for accessibility reasons and will be removed in a future version.

This property is being added as deprecated to support the fallback for `showModal()` which was removed as part of performance optimization. We will no longer support outside clicks for modal overlays as they violate accessibility guidelines.

**Breaking Change**: The property defaults to `false` and shows deprecation warnings when used. Consider using explicit close buttons or modal/page overlay types instead for better accessibility.
