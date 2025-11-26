---
layout: root.njk
title: 'Migrating to Spectrum 2'
displayName: Migrating to Spectrum 2
slug: migrating-to-spectrum2
---

# Migrating to Spectrum 2

In Spectrum 2, sp-theme's system variables are updated to support new design tokens, which optimize for different scales and themes. To complete the migration, update the system variable in sp-theme to reference Spectrum 2, adjust import paths, and ensure all components are using version 1.0.0.

### Update `system` variable in `sp-theme`:

Change the `system` variable in `sp-theme` to `spectrum-two` to apply the new theme and scale tokens.

```js
<sp-theme system="spectrum-two" scale="medium" color="light"></sp-theme>
```

### Update import paths for scale and theme modules:

Replace existing scale and theme imports with Spectrum 2 equivalents. This ensures that your project references the new color and scale options.

```js
// Replace current theme imports with the following:
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/spectrum-two/scale-medium.js';
import '@spectrum-web-components/theme/spectrum-two/scale-large.js';
import '@spectrum-web-components/theme/spectrum-two/theme-light.js';
import '@spectrum-web-components/theme/spectrum-two/theme-dark.js';
```

### Update all components to version ^1.0.0:

Before applying other changes, ensure all components are updated to at least version 1.0.0 to enable compatibility with the Spectrum 2 system. For more information, see the [1.0.0 migration guide](</migrations/2024-10-31%20(1.0.0)/>).
