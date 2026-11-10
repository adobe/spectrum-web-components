# Before-and-after examples

Each example quotes a current guide page in `gen2/packages/swc/.storybook/`, then rewrites it to the standard in [`../SKILL.md`](../SKILL.md). Time estimates in the "after" versions are placeholders. Measure real values during each rewrite.

## 1. Lead with the outcome

Source: `resources/migrate-from-gen1.mdx`, opening paragraphs.

### Before

```mdx
# Migrate from Gen1

This page walks an application team through moving from SWC Gen1 (`@spectrum-web-components/*`) to SWC Gen2 (`@adobe/spectrum-wc`). You do not have to migrate everything at once — Gen1 and Gen2 are designed to coexist in the same app so you can move one component (or one screen) at a time.

For a high-level comparison of what changed, see [Gen1 vs Gen2](/docs/learn-about-swc-gen1-vs-gen2--docs).
```

### After

```mdx
# Migrate from Gen1

Move your app from SWC Gen1 (`@spectrum-web-components/*`) to Gen2 (`@adobe/spectrum-wc`) one component at a time, with both running side by side.

- **For:** application developers
- **Time:** about 2 hours of setup across 7 steps, then about 30 minutes per component
- **Before you start:** read [Gen1 vs Gen2](/docs/learn-about-swc-gen1-vs-gen2--docs) to confirm the components you use have shipped
```

### What changed

- The first sentence names the outcome instead of describing the page.
- **Time** gives a concrete estimate and the step count, so the reader can plan.
- The em dash and the parenthetical are gone.

## 2. One action per step, then a check

Source: `learn-about-swc/get-started.mdx`, "Set the application color scheme."

### Before

````mdx
## Set the application color scheme

Apply `swc-theme` plus one color class on a root element. Nested SWC components inherit it. Without any class, the theme defaults to light.

```html
<html class="swc-theme swc-theme--dark">
  <body>
    <swc-badge variant="positive">Ready</swc-badge>
  </body>
</html>
```

- `swc-theme--light`: light color scheme.
- `swc-theme--dark`: dark color scheme.
- `swc-theme--adaptive`: follows the user's OS setting.
````

### After

````mdx
## Step 3: Set the color scheme

Add `swc-theme` and one color class to your root element. Nested SWC components inherit it, and `swc-theme--adaptive` follows the user's OS setting.

```html
<html class="swc-theme swc-theme--adaptive"></html>
```

You should see `color-scheme: light dark` on `<html>` in your browser's **Computed** styles. For the other color classes, see [Theme and scales](/docs/guides-customization-theme-and-scales--docs).
````

### What changed

- The heading starts with a verb and carries the step number.
- The code shows only what this step changes; the badge belongs to its own step.
- A `You should see` check confirms the step worked.
- The class list moves to its home page, Theme and scales, and this page links to it.

## 3. Cut tangents

Source: `guides/accessibility-guides/keyboard_testing.mdx`, opening and "Why keyboard accessibility matters."

### Before

```mdx
# Keyboard testing

This guide covers testing keyboard accessibility in Spectrum Web Components, for contributors testing a component implementation and consumers validating an application, so that all users can navigate and interact with an interface using only a keyboard.

> **Did you know?**
>
> Approximately **[15% of all digital accessibility issues](https://www.deque.com/blog/how-keyboard-testing-improves-digital-accessibility/)** relate to keyboard support gaps, and manual keyboard testing catches issues that automated tools cannot detect.

## Why keyboard accessibility matters

Keyboard accessibility ensures that users who cannot or prefer not to use a mouse can still fully interact with web content. This is not just about supporting a specific disability — it's about making interfaces work for everyone.

### Who benefits from keyboard accessibility

...
```

### After

```mdx
{/* page-type: how-to */}

# Keyboard testing

Confirm that every control in a component or an app works with a keyboard alone.

- **For:** contributors testing a component, and consumers testing an app
- **Time:** about 30 minutes per page
- **Before you start:** on macOS, turn on keyboard navigation in step 1

To learn who relies on keyboard access, see the [Accessibility overview](/docs/guides-accessibility-overview--docs).
```

### What changed

- The "Did you know?" statistic and the "Why" section were motivation in a how-to. They move to the explanation page, and one link replaces them.
- The reader reaches the first action in about five lines instead of about 30.

## 4. Don't repeat another page

Source: `resources/migrate-from-gen1.mdx`, "Step 3: Add the Gen2 stylesheet and theme classes."

### Before

```mdx
Available classes:

- `swc-theme--light` / `swc-theme--dark` / `swc-theme--adaptive` (follows OS preference)

You can scope a theme to a region by applying these classes lower in the tree. See the [Theme and scales guide](/docs/guides-customization-theme-and-scales--docs) for the full list.
```

### After

```mdx
To scope a theme to one region, or to pick a different color class, see [Theme and scales](/docs/guides-customization-theme-and-scales--docs).
```

### What changed

The same class list also appears in Get started and Theme and scales. Three copies drift apart, so two pages now link to the one home page.

## 5. Troubleshoot as symptom, cause, and fix

Source: `guides/customization/fonts.mdx`, "Troubleshooting: Fonts not loading."

### Before

```mdx
### Fonts not loading

1. Check browser **Network** tab for failed requests to Adobe Fonts
2. Verify your Adobe Fonts kit ID is correct
3. Ensure your domain is allowlisted in your Adobe Fonts web project settings
4. Check for CORS issues if self-hosting fonts
```

### After

```mdx
### Text renders in a system font instead of Adobe Clean Spectrum VF

**Cause:** the browser can't load the font files. The kit ID is wrong, your domain isn't allowlisted, or self-hosted files are blocked by CORS.

**Fix:**

1. Open the browser's **Network** tab and find the failed font request.
2. If it's an Adobe Fonts request, confirm the kit ID and add your domain to the web project's allowlist.
3. If you self-host, allow your app's origin in the font server's CORS headers.
```

### What changed

- The heading describes what the reader sees, not the system's state.
- The cause is stated once, so the reader knows why each fix applies.
- Each fix step names the condition it applies to.

## 6. End with one next step

Source: `learn-about-swc/get-started.mdx`, "Where to look next."

### Before

```mdx
## Where to look next

- **Components**: individual building blocks such as badge, button, avatar, progress circle, and more
- **Patterns**: higher-level UI flows composed of components
- **Guides**: deeper setup for theme color schemes, fonts, customization, and accessibility
- **[Support and compatibility](/docs/resources-support-and-compatibility--docs)**: versioning, APIs, and browser support for `@adobe/spectrum-wc`
- **[Changelog](/docs/resources-changelog--docs)**: release notes for `@adobe/spectrum-wc`
```

### After

```mdx
## Next step

Load the Spectrum 2 font with the [Fonts guide](/docs/guides-customization-fonts--docs).
```

### What changed

- Five options become one action, the one this page already said is required.
- Components, Patterns, and Guides are sidebar sections, so a list of them adds a choice without adding information.
