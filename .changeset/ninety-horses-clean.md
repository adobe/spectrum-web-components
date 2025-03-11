---
'@spectrum-web-components/checkbox': patch
'@spectrum-web-components/dialog': patch
'@spectrum-web-components/menu': patch
'@spectrum-web-components/overlay': patch
---

1. chore(checkbox): updated to latest css v10.1.1 for s2 fast follow

2. chore(dialog):
   The error property was not properly deprecated with a full migration plan in place. This has caused confusion and false sense of urgency for consumers to migrate. We are removing it to eliminate those pain points for consumers while we take a deep look at our dialogs and patterns.

3. chore(menu): updated to latest css v9.1.1 for s2 fast follow

4. fix(overlay):
   sp-overlay with type="manual" should close on pressing ESC key. When the last item is on overlay stack we are triggering the close method on esc key event.
