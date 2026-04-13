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
- [Shadow DOM and cross-root ARIA](#shadow-dom-and-cross-root-aria)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc tells you how **`swc-avatar`** should work for **accessibility**. The target standard is **WCAG 2.2 Level AA**.

### Also read

[Avatar migration roadmap](./rendering-and-styling-migration-analysis.md) for DOM structure, CSS selectors, and size mapping.
[Avatar migration plan](./migration-plan.md) for the full Phase checklist.

### What an avatar is

An avatar is a **circular profile image** that identifies a person or entity. On its own it is a
**static image** — not interactive. Its only job is to display a recognisable visual cue.

### The linked variant ("avatar-link")

**The linked variant is not part of the 2nd-gen migration.** The Spectrum 2 spec does not include
a linked avatar variant — the `href` attribute and all `LikeAnchor` mixin properties (`target`,
`rel`, `download`, `referrerpolicy`, `type`) have been dropped.

Consumers who need a linked avatar should wrap `<swc-avatar>` in a standard `<a>` element. The
`alt` attribute on `swc-avatar` becomes the link's accessible name. Do not use `alt=""` or
`decorative` on a linked avatar — the link would have no accessible name, violating WCAG 2.4.4.

```html
<a href="https://example.com/profile">
  <swc-avatar alt="Jane Doe" src="/img/user.jpg"></swc-avatar>
</a>
```

**Scope decision:** The linked variant is **out of scope** for this migration.

### When to use something else

- Need a **button** that happens to show a face? Use **`swc-action-button`** with an avatar inside.
- Need a **removable chip** or **tagged user**? Use **`swc-tag`** with an avatar inside.
- The avatar itself should never carry `role="button"`.

---

## ARIA and WCAG context

### Pattern in the APG

The [APG](https://www.w3.org/WAI/ARIA/apg/) does not list a dedicated "avatar" widget.

**Non-linked avatar** — treat as an **`<img>`**: requires a text alternative (WCAG 1.1.1).

### Guidelines that apply

| Criterion | Plain meaning |
|-----------|---------------|
| [1.1.1 Non-text content](https://www.w3.org/TR/WCAG22/#non-text-content) | The avatar image must have a text alternative, or be explicitly marked decorative. |
| [1.4.1 Use of color](https://www.w3.org/TR/WCAG22/#use-of-color) | Color alone must not carry meaning. |
| [2.4.3 Focus order](https://www.w3.org/TR/WCAG22/#focus-order) | Non-linked avatar must not be in the tab order. |

---

## Recommendations: `<swc-avatar>` (non-linked)

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Image role** | The inner `<img>` already carries an implicit `img` role. Do **not** add `role="img"` to the host. |
| **Alt text (required)** | When `alt` is provided: set `alt="${alt}"` on the `<img>`. |
| **Decorative** | When `decorative` is set (with `alt=""`): the host receives `aria-hidden="true"`, removing the entire shadow tree from the accessibility tree. |
| **Neither `alt` nor `decorative`** | Set `alt=""` as a safe fallback on `<img>`. Emit a **DEBUG warning** directing the developer to add `alt` or `decorative`. |
| **Host role** | No `role` attribute on `:host`. The `<img>` inside provides the correct semantics. |
| **`disabled`** | Renders at reduced opacity — purely visual. Do not surface `aria-disabled`. The avatar remains in the accessibility tree. |

### Accessibility tree expectations

**Avatar with alt text:**

```
img "Jane Doe"
```

**Decorative avatar (`decorative` + `alt=""`):**

```
(not in accessibility tree — host has aria-hidden="true")
```

**Avatar with neither `alt` nor `decorative` (fallback — triggers DEBUG warning):**

```
img ""
```

### Keyboard and focus

**Not focusable.** A non-linked avatar must not receive keyboard focus. No `tabindex` should be
set on the host or the inner `<img>`.

---

## Shadow DOM and cross-root ARIA

No cross-root ARIA issues for avatar. The accessible name flows naturally through the shadow DOM
via the `<img alt="…">` attribute.

No `aria-labelledby` cross-shadow wiring is required.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit — alt text** | `alt` provided → `alt="[value]"` on `<img>`. `decorative` set → host `aria-hidden="true"`. Neither → `alt=""` + DEBUG warning fires. |
| **Unit — DEBUG warnings** | Missing `alt` (no `decorative`) → warning fires. Setting `decorative` suppresses it. |
| **aXe + Storybook** | Run WCAG 2.x rules on all avatar stories. |
| **Playwright ARIA snapshots** | Cover: labeled avatar, decorative avatar, disabled avatar. |
| **Focus ring contrast** | Non-linked avatar is not focusable; no focus ring required. |

---

## Summary checklist

- [ ] Avatar with `alt` → `<img alt="[value]">`, not focusable.
- [ ] Avatar with `decorative` (+ `alt=""`) → host `aria-hidden="true"`, not focusable.
- [ ] Avatar with neither → `<img alt="">` + DEBUG warning.
- [ ] `disabled` → visual opacity only; avatar remains in accessibility tree.
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
