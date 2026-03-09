<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Visual regression testing

<!-- Document title (editable) -->

# Visual regression testing

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When to use](#when-to-use)
- [How it works](#how-it-works)
- [Tips for reliable VRT](#tips-for-reliable-vrt)

</details>

<!-- Document content (editable) -->

Visual regression testing (VRT) catches rendering changes across browsers and themes. Stories themselves serve as the test cases — Chromatic captures screenshots and compares them to baselines.

## When to use

VRT covers things that are hard to test programmatically:

- Color and styling
- Layout and spacing
- Cross-browser rendering
- Theme support (light, dark, high contrast)
- Animation states

## How it works

Every story is a VRT test case. When you create a story in your `*.stories.ts` file, it automatically becomes part of VRT. No extra code is needed.

Stories tagged with `'!test'` are excluded from VRT runs (useful for interactive-only demos like `StaticColors`).

## Tips for reliable VRT

- Use deterministic content (no random data, no timestamps)
- Use static image IDs from picsum.photos (see stories format guide)
- Disable animations in test mode (Playwright config sets `reducedMotion: 'reduce'`)
- Keep stories focused — one visual state per story is easier to debug
