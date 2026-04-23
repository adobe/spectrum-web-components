<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Link / Link accessibility migration analysis

<!-- Document title (editable) -->

# Link accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a link is (2nd-gen)](#what-a-link-is-2nd-gen)
    - [When to use something else](#when-to-use-something-else)
    - [Button-shaped navigation to another route](#button-shaped-navigation-to-another-route)
    - [Why avoid a link component (for default content)](#why-avoid-a-link-component-for-default-content)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: native `a` with Spectrum / prose link styles](#recommendations-native-a-with-spectrum--prose-link-styles)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

2nd-gen does not ship a `<swc-link>` custom element. Link is delivered as Spectrum link styles on native **`<a href="…">`** (the same class / token set as the default link look inside prose / typography blocks) so long passages of text get consistent styling without a custom element. This doc targets **WCAG 2.2 Level AA** and should be read with the [Link migration roadmap](./rendering-and-styling-migration-analysis.md) and the 2nd-gen **Semantic HTML and ARIA** guide ([repo](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx)).

### Also read

[Link migration roadmap](./rendering-and-styling-migration-analysis.md).

### What a link is (2nd-gen)

- A real **HTML** anchor with a `href`, class names from the design system (inline, quiet, static color, etc.—see the roadmap and [Typography: Prose container (Storybook preview)](https://swcpreviews.z13.web.core.windows.net/docs/?path=/docs/components-typography--readme#prose-container)), and no `sp-` custom element for in-body copy. Markup uses the open document tree, not a shadow-encapsulated proxy anchor by default.

### When to use something else

- **Actions** that do **not** **navigate** to another URL and are not **same-document** **fragments** → use **`<button type="button">`**, not a fake link.
- **Destructive** or **irreversible** work → use controls and **copy** that match the risk, not a lightweight text link alone.

### Button-shaped navigation to another route

1st-gen has been moving away from “links as buttons” (for example, anchors or `href`-driven custom elements that use button visuals to move between routes). 2nd-gen continues that direction: for in-app navigation when the design is button-shaped, prefer a real **`<button type="button">`** (or a framework control with the same **role** and keyboard behavior) with Spectrum button styles, and wire routing from that control, instead of link styling or a link-like `href` surface to get a button look. Inline text links in prose still use a classed **`<a href>`**.

### Why avoid a link component (for default content)

- **Proxy** and **double-activation** problems can appear when web components wrap or duplicate **`<a>`** behavior (see patterns similar to `sp-button` / `sp-action-button` with `href` and 1st-gen `sp-link`). [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) and [SWC-921](https://jira.corp.adobe.com/browse/SWC-921) illustrate ecosystem issues with `href` composition and duplicate handlers; [SWC-598](https://jira.corp.adobe.com/browse/SWC-598) is related refactor context. A classed **`<a href>`** in the light DOM is one clear activation target with normal browser and assistive technology behavior.

### Related

- Router frameworks may wrap anchors; that is separate from a Spectrum **CE** for every sentence-level link. Document **one** real `<a href>` per user-facing navigation in prose.

---

## ARIA and WCAG context

### Pattern in the APG

- The APG does not define a separate “link” widget. **Hyperlinks** are **HTML**; [`<a href>`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element) gets the implicit **[`link` role](https://www.w3.org/TR/wai-aria-1.2/#link)**. Prefer real markup and `href` over `role="link"` on a non-anchor.

### Guidelines that apply

| Idea | Plain meaning |
|------|---------------|
| [Link purpose (2.4.4 / 2.4.9)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Link text (or name from image/label) must make sense in context. Avoid “click here” as the only label. If you support 2.4.9, destination information must meet that criterion. |
| [Use of color (1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) & [contrast (1.4.3 / 1.4.6)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | Do not mark links by color alone. Link text and states (default, hover, **focus-visible**, visited if styled) must be readable; [SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160) tracks 1st-gen `sp-link` contrast next to body text—2nd-gen **CSS** and tokens should not reintroduce that failure. |
| Quiet / minimal link presentation | **Quiet** styling (for example, links without underlines) should be used only in **sections** such as **footers** (or similar scoped regions) where the **section** itself provides enough **visible** context to indicate that each item is a link—not in undifferentiated body copy. |
| [Focus visible (2.4.7 / 1.4.11 as applicable)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Prose and static-color link styles should not remove perceivable focus treatment without a deliberate replacement. |
| [Non-text content (1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | Icon-only or image-only links: sufficient `alt`, or `aria-label`, or visible text plus a visually hidden label if needed. |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) | Use real list, paragraph, and heading structure around prose; prose classes should not replace semantic markup for a link. |

**Bottom line:** ship a classed **`<a href>`** in the light DOM with a valid `href` and name. **CSS** carries the Spectrum look; a11y follows **HTML** and WCAG, not a separate host `role` for default links.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160) | Bug | To Do | Unresolved | [Accessibility] - Link contrast is not at least 3:1 with surrounding text - sp-link |
| [SWC-926](https://jira.corp.adobe.com/browse/SWC-926) | Bug | To Do | Unresolved | [sp-link] Create global link styling for native HTML anchor elements |
| [SWC-1428](https://jira.corp.adobe.com/browse/SWC-1428) | Bug | To Do | Unresolved | [sp-link] Deprecate link API features in favor of native HTML styling |
| [SWC-966](https://jira.corp.adobe.com/browse/SWC-966) | Story | To Do | Unresolved | Deprecate(link): Remove `disabled` attribute from `sp-link` |

---

## Recommendations: native `a` with Spectrum / prose link styles

There is no `<swc-link>` host in this model. Authors apply shared link classes to real **`<a href>`** elements (as in the [prose / Typography Storybook “Prose container”](https://swcpreviews.z13.web.core.windows.net/docs/?path=/docs/components-typography--readme#prose-container)).

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Use `<a href>`** | Do not add `role="link"` by default. Do not fake a link on `<span>` / `<div>`. For navigation, use a real `href` or [router-appropriate](https://reactrouter.com/en/main/components/link) `a` in framework docs. |
| **Name** | Visible text in the element; for icon-only links, `aria-label` or `alt` + text pattern; meet [4.1.2](https://www.w3.org/WAI/WCAG22/#name-role-value). |
| **Attributes** | `target`, `rel`, `download`, `lang`, and `type` on the real element—no cross-root ID wiring for a CE host. |
| **Styles** | Class names from the Spectrum link system and **prose** (see [Typography: prose (preview)](https://swcpreviews.z13.web.core.windows.net/docs/?path=/docs/components-typography--readme#prose-container) and the roadmap). Use **quiet** (non-underline) link styles only in **sections** such as **footers** (or other clearly scoped link groups) where the **section** gives enough visible context that items read as links; in long **body** **prose**, use a more obvious link treatment. Prefer a classed **`<a>`** in running text over inventing a new `sp-` link for each paragraph. |
| **No `disabled` on a navigational link** | A real `<a href>` is not a disabled form control. If the action is unavailable, use a **`<button disabled>`** (with explanation) or **remove** the **link**—[SWC-966](https://jira.corp.adobe.com/browse/SWC-966) removes the invalid 1st-gen `disabled` pattern on `sp-link`; do not bring it back as a “class-only” feature. |
| **Ecosystem** | Avoid architectures that attach `href` twice or layer router and custom-element `click` listeners in ways that [duplicate navigation](https://jira.corp.adobe.com/browse/SWC-923) or [open two tabs](https://jira.corp.adobe.com/browse/SWC-921) on one user gesture. Styling a single native `a` avoids an extra indirection for plain prose links. |

### Shadow DOM and cross-root ARIA issues

**None** for the default model: the anchor and its ARIA state live in the light tree.

### Accessibility tree expectations

- **Role:** **link** from a valid `a href` (or an `area` in image maps, if you document that explicitly).
- **Name:** from link text, `aria-label`, or image `alt` with supporting text; relationship to lists and headings from surrounding semantic HTML ([Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx)).

### Keyboard and focus

Native links participate in the **tab** order; **Enter** (and platform conventions) activate them. Do not add `tabindex` to reorder without an accessibility review and a concrete need. Do not rely on JavaScript to **proxy** a click in place of a real `href` for standard navigation in prose (see [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx) on preferring native semantics).

**Manual screen reader testing** in browse mode (as required for custom widgets that are not focusable) is not a separate extra step for a plain `a`—use the general [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide for prose and navigation checks.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|---------------|
| **Unit** | Examples use valid `<a href>`; names; classes cover static-color / on-image from design. |
| **aXe + Storybook** | Typography and prose stories with links pass WCAG rules; no contrast or name regressions. |
| **E2E** (if the repo has them) | For router-like demos, no double navigation or double open per one user click (regression guard for the class of bugs in [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) and [SWC-921](https://jira.corp.adobe.com/browse/SWC-921)) |

---

## Summary checklist

- [ ] Typography and prose **Storybook** docs and examples show classed **`<a href>`**; 2nd-gen in-body copy does not require **`<sp-link>`**.
- [ ] Deprecate or document away `disabled` on `sp-link`; align consumer guides with [SWC-966](https://jira.corp.adobe.com/browse/SWC-966) (see [roadmap](./rendering-and-styling-migration-analysis.md)).
- [ ] Contrast and 1.4.1 for link vs surrounding text: avoid repeating [SWC-1160](https://jira.corp.adobe.com/browse/SWC-1160); use [SWC-926](https://jira.corp.adobe.com/browse/SWC-926) and [SWC-1428](https://jira.corp.adobe.com/browse/SWC-1428) as pointers from 1st-gen / roadmap to native anchor styling.
- [ ] [Semantic HTML and ARIA examples](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx) and link-purpose guidance appear in or alongside prose docs; **Storybook** and usage docs call out that **quiet** (non-underline) link styles are for **section**-scoped patterns such as **footers**, not generic body text.
- [ ] Program-level (gen2) Jira is tracked in Jira, not duplicated in the 1st-gen table above, per the accessibility-migration skill.

## References

- [HTML: The `a` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
- [WAI-ARIA: `link` role](https://www.w3.org/TR/wai-aria-1.2/#link)
- [WCAG: Link purpose in context (2.4.4)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)
- [WCAG: Use of color (1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
- [WAI-ARIA APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [2nd-gen: Semantic HTML and ARIA (repo)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx)
- [2nd-gen: Screen reader testing (repo)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
- [Storybook: Typography, prose (preview) — Prose container](https://swcpreviews.z13.web.core.windows.net/docs/?path=/docs/components-typography--readme#prose-container)
- [Link migration roadmap](./rendering-and-styling-migration-analysis.md)
