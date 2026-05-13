<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / For consumers

<!-- Document title (editable) -->

# For consumers

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About this folder](#about-this-folder)
- [Consumer content in the published Storybook](#consumer-content-in-the-published-storybook)
- [Files in this folder](#files-in-this-folder)
- [Authoring new consumer content](#authoring-new-consumer-content)

</details>

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Using the issue tracker](using-the-issue-tracker.md)

</details>

<!-- Document content (editable) -->

## About this folder

This folder is the audience landing for **app developers using Spectrum Web Components in a product**.

It is intentionally small. Most consumer-facing content — install instructions, component demos, customization guides, accessibility guidance — lives in the **published Storybook docs site**, where consumers can see live demos, click through variants, copy code from canvases, and share polished URLs. The Storybook MDX is the canonical source of truth for consumer content (see the [audience-based docs Storybook residency audit](../project-planning/05_strategies/audience-based-docs-storybook-residency-audit.md)).

This folder holds only:

- Process and workflow documents that are MD-friendly and benefit from being PR-discussable on GitHub (e.g., how to file a bug or request a feature)
- This README, which points consumers at the right Storybook URLs for everything else

## Consumer content in the published Storybook

| Section | Storybook URL |
|---|---|
| **Get started** — install, first component, framework notes | [Get started — Welcome](https://opensource.adobe.com/spectrum-web-components/docs/get-started-welcome--docs) |
| **Components** — the full 2nd-gen library with live demos | [Components](https://opensource.adobe.com/spectrum-web-components/docs/components-badge--docs) |
| **Customization → Cheatsheet** — quick reference for theming, scales, tokens, fonts | [Learn → Customization → Cheatsheet](https://opensource.adobe.com/spectrum-web-components/docs/learn-customization-cheat-sheet--docs) |
| **Customization → Long-form docs** — getting started, component styles, fonts, global elements, theme and scales | Each page is a sibling of the cheatsheet in the `Learn → Customization` sidebar section |
| **Accessibility → Cheatsheet** — quick reference for shipping accessible SWC apps | [Learn → Accessibility → Cheatsheet](https://opensource.adobe.com/spectrum-web-components/docs/learn-accessibility-cheat-sheet--docs) |
| **Accessibility → Long-form docs** — overview, semantic HTML and ARIA, keyboard / screen reader / WAVE testing, headings and landmarks, pattern libraries, resources | Each page is a sibling of the cheatsheet in the `Learn → Accessibility` sidebar section |
| **Reference → Component status** — at-a-glance status matrix with live badges | [Reference → Component status](https://opensource.adobe.com/spectrum-web-components/docs/reference-component-status--docs) |

## Files in this folder

- [Using the issue tracker](./using-the-issue-tracker.md) — how to file a bug report or feature request

## Authoring new consumer content

New consumer-facing pages are authored as **MDX in `.storybook/docs/`**, not as MD here. Clone the [consumer quickstart template](../for-contributors/authoring-contributor-docs/templates/consumer-quickstart.md) when adding a new consumer onboarding page.

If a new process or workflow doc is genuinely MD-friendly and serves the consumer audience on GitHub (like the issue tracker page), it belongs here. Most other consumer content does not.
