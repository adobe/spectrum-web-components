<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Avatar / Avatar accessibility migration analysis

<!-- Document title (editable) -->

# Avatar accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What an avatar is](#what-an-avatar-is)
    - [The linked variant ("avatar-link")](#the-linked-variant-avatar-link)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `<swc-avatar>` (non-linked)](#recommendations-swc-avatar-non-linked)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Recommendations: `<swc-avatar href="…">` (linked variant)](#recommendations-swc-avatar-href-linked-variant)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Shadow DOM and cross-root ARIA](#shadow-dom-and-cross-root-aria)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc tells you how **`swc-avatar`** should work for **accessibility**, covering both the
static (image-only) and linked variants. The target standard is **WCAG 2.2 Level AA**.

### Also read

[Avatar migration roadmap](./rendering-and-styling-migration-analysis.md) for DOM structure, CSS selectors, and size mapping.
[Avatar migration plan](./migration-plan.md) for the full Phase checklist.

### What an avatar is

An avatar is a **circular profile image** that identifies a person or entity. On its own it is a
**static image** — not interactive. Its only job is to display a recognisable visual cue.

### The linked variant ("avatar-link")

**"Avatar-link" is not a separate component.** The `.spectrum-Avatar-link` CSS class is the
`<a>` element rendered inside `<swc-avatar>` when the `href` attribute is present. It is the
**linked variant of the same component**, not a distinct element.

This is consistent with the 1st-gen implementation (via `LikeAnchor` mixin) and with the
Spectrum CSS `spectrum-two` branch, whose DOM structure for avatar is identical between the
main and spectrum-two branches.

**Scope decision:** The linked variant is **in scope** for this migration. No separate
avatar-link component needs to be created.

### When to use something else

- Need a **button** that happens to show a face? Use **`swc-action-button`** with an avatar inside.
- Need a **removable chip** or **tagged user**? Use **`swc-tag`** with an avatar inside.
- The avatar itself should never carry `role="button"`.

---

## ARIA and WCAG context

### Pattern in the APG

The [APG](https://www.w3.org/WAI/ARIA/apg/) does not list a dedicated "avatar" widget.

- **Non-linked avatar** — treat as an **`<img>`**: requires a text alternative (WCAG 1.1.1).
- **Linked avatar** — treat as a **link** (`<a>`): requires an accessible name and standard
  keyboard interaction (WCAG 2.4.4, 2.4.7).

### Guidelines that apply

| Criterion | Plain meaning |
|-----------|---------------|
| [1.1.1 Non-text content](https://www.w3.org/TR/WCAG22/#non-text-content) | The avatar image must have a text alternative, or be explicitly marked decorative. |
| [1.4.1 Use of color](https://www.w3.org/TR/WCAG22/#use-of-color) | Color alone must not carry meaning. |
| [1.4.3 Contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Focus ring must meet contrast requirements. |
| [2.1.1 Keyboard](https://www.w3.org/TR/WCAG22/#keyboard) | Linked avatar must be operable by keyboard. |
| [2.4.3 Focus order](https://www.w3.org/TR/WCAG22/#focus-order) | Tab order must be logical; non-linked avatar must not be in it. |
| [2.4.4 Link purpose](https://www.w3.org/TR/WCAG22/#link-purpose-in-context) | Linked avatar's accessible name must describe its destination. |
| [2.4.7 Focus visible](https://www.w3.org/TR/WCAG22/#focus-visible) | Linked avatar must show a visible focus indicator. |

---

## Recommendations: `<swc-avatar>` (non-linked)

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Image role** | The inner `<img>` already carries an implicit `img` role. Do **not** add `role="img"` to the host. |
| **Alt text (required)** | When `label` is provided: set `alt="${label}"` on the `<img>`. |
| **Decorative** | When `is-decorative` is set (and no `label`): set `alt=""` and `aria-hidden="true"` on the `<img>`. Do **not** set `aria-hidden` on the host — this would hide the element from consumers who wrap it with their own labelling. |
| **Neither label nor is-decorative** | Set `alt=""` as a safe fallback. Emit a **DEBUG warning** directing the developer to add `label` or `is-decorative`. |
| **Host role** | No `role` attribute on `:host`. The `<img>` inside provides the correct semantics. |
| **`disabled`** | Not applicable to the non-linked avatar. Do not surface `aria-disabled` when `href` is absent. |

### Accessibility tree expectations

**Avatar with label:**
```
img "Jane Doe"
```

**Decorative avatar:**
```
(not in accessibility tree)
```

**Avatar with neither label nor is-decorative (fallback — triggers DEBUG warning):**
```
img ""
```

### Keyboard and focus

**Not focusable.** A non-linked avatar must not receive keyboard focus. No `tabindex` should be
set on the host or the inner `<img>`.

---

## Recommendations: `<swc-avatar href="…">` (linked variant)

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Link role** | The inner `<a>` provides an implicit `link` role. Do **not** add `role="link"` to the host. |
| **Accessible name (required)** | The `<a>` element must have an accessible name. This comes from the `label` attribute (set as `alt` on `<img>`, which names the link via its content). A link with no accessible name fails WCAG 2.4.4. |
| **`is-decorative` + `href` without `label`** | This combination is **invalid**. If `alt=""` on the image is the only text content, the link has no accessible name. Emit a **DEBUG warning** requiring a `label`. |
| **`disabled`** | When `disabled` is set alongside `href`: remove the `<a>` element (or omit the `href` attribute) so the element is not in the tab order. Do **not** use `aria-disabled` on the link — this keeps it focusable and adds confusion. Render the disabled avatar as a plain image (same as non-linked state). |
| **`target="_blank"`** | If `target="_blank"` is used, consumers should be aware that screen readers may announce "opens in new tab". No additional ARIA is required from the component itself. |

### Accessibility tree expectations

**Linked avatar with label:**
```
link "Jane Doe"
  img "Jane Doe"
```

**Linked avatar, disabled (rendered as static image):**
```
img "Jane Doe"
```

**Linked avatar with is-decorative but no label (invalid — triggers DEBUG warning):**
```
link ""   ← fails WCAG 2.4.4
```

### Keyboard and focus

- **Tab**: moves focus to the avatar link.
- **Enter**: activates the link (navigates).
- **Focus ring**: must be visible. The focus ring is rendered via `::after` on `.swc-Avatar-link:focus-visible`. Verify it meets WCAG 1.4.3 contrast.
- **Disabled**: when `disabled` is set, the avatar must be removed from the tab order (no `<a>` rendered, or `href` omitted).

---

## Shadow DOM and cross-root ARIA

No cross-root ARIA issues for avatar. The accessible name flows naturally through the shadow DOM:
the `<img alt="…">` names both the image and (via its text content) the enclosing `<a>` link.

No `aria-labelledby` cross-shadow wiring is required.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit — alt text** | `label` → `alt="[label]"`. `is-decorative` (no label) → `alt=""` + `aria-hidden="true"`. Neither → `alt=""` + DEBUG warning fires. |
| **Unit — link** | `href` set → `<a>` rendered. `disabled` + `href` → no `<a>` (or no `href`), not in tab order. |
| **Unit — DEBUG warnings** | Missing label/is-decorative → warning. `is-decorative` + `href` + no label → warning. |
| **aXe + Storybook** | Run WCAG 2.x rules on all avatar stories. |
| **Playwright ARIA snapshots** | Cover: label only, is-decorative, linked with label, disabled linked. |
| **Focus ring contrast** | Verify focus ring color meets WCAG 1.4.3 against common backgrounds. |

---

## Summary checklist

- [ ] Non-linked avatar with `label` → `<img alt="[label]">`, not focusable.
- [ ] Non-linked avatar with `is-decorative` → `<img alt="" aria-hidden="true">`, not focusable.
- [ ] Non-linked avatar with neither → `<img alt="">` + DEBUG warning.
- [ ] Linked avatar with `label` → `<a><img alt="[label]"></a>`, focusable, Enter activates.
- [ ] Linked avatar with `is-decorative` + no `label` → DEBUG warning (invalid combination).
- [ ] `disabled` + `href` → no `<a>` rendered, removed from tab order.
- [ ] Focus ring visible on `.swc-Avatar-link:focus-visible`.
- [ ] aXe passes on all Storybook stories.
- [ ] Playwright ARIA snapshot tests cover all states above.
- [ ] DEBUG warnings tested in unit tests.

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Avatar migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Avatar migration plan](./migration-plan.md)
- [React Aria Avatar](https://react-spectrum.adobe.com/Avatar)
