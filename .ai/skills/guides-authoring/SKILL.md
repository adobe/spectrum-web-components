---
name: guides-authoring
description: Authoring standard for gen2 Storybook guide pages in learn-about-swc, guides, and resources. Covers page types, outcome-first leads, numbered steps with checks, journey position, scannable structure, troubleshooting, and the single next step. Use when writing, rewriting, reviewing, or auditing a guide page.
---

# Guides authoring

Write gen2 guide pages that a reader can scan, act on, and finish. The standard adapts the `i-have-adhd` output rules to documentation and pairs them with [Diátaxis](https://diataxis.fr/) page types and the guide patterns in GOV.UK, Polaris, and Carbon.

## When to use this skill

- Writing a new page in `gen2/packages/swc/.storybook/learn-about-swc/`, `guides/`, or `resources/`
- Rewriting or reviewing an existing guide page
- Auditing guide pages and scoring them against the checklist

## Scope and precedence

| Page                                                       | Follow                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| Guide pages in `learn-about-swc/`, `guides/`, `resources/` | This skill                                                         |
| Per-unit component, pattern, and controller docs pages     | [`stories-documentation`](../stories-documentation/SKILL.md)       |
| Per-component `migration-guide.mdx` pages                  | [`consumer-migration-guide`](../consumer-migration-guide/SKILL.md) |

This skill sets page structure. For mechanics such as sentence case, em dashes, `<kbd>`, callout format, and WCAG links, follow `.ai/rules/text-formatting.md`. For voice and tone, follow [`documentation-standards`](../documentation-standards/SKILL.md). Never hard-wrap prose in `.mdx` files.

## Why these rules

Guide readers are mid-task and switching between the docs and their code. Five facts shape the rules:

1. **Working memory is small.** Anything off screen is forgotten, so restate position and don't write "as mentioned above."
2. **Knowing isn't doing.** Each step names one action and the result to check.
3. **Starting is the hardest part.** The first lines say what the reader gets and what they need.
4. **Vague estimates fail.** "Quick" and "a few hours" read the same. Use minutes and hours.
5. **Visible progress keeps readers going.** A "You should see" check after each step confirms the win.

## The standard

### 1. Declare the page type

Put `{/* page-type: <type> */}` on the line after `<Meta />`. Use exactly one type and follow its template in [`references/page-templates.md`](references/page-templates.md).

| Type        | Reader's goal                  | Contains                                  | Never contains                    |
| ----------- | ------------------------------ | ----------------------------------------- | --------------------------------- |
| tutorial    | Learn by doing, first time     | One guaranteed path, numbered steps       | Choices, alternatives, deep "why" |
| how-to      | Finish a known task            | Numbered steps, branches stated up front  | Teaching basics, history          |
| reference   | Look up a fact                 | Tables and lists of classes, values, APIs | Steps, opinions, narrative        |
| explanation | Understand a concept or decide | Short sections, comparisons, trade-offs   | Step-by-step instructions         |

If a page needs two types, split it, or keep one type and link to the other page.

### 2. Lead with the outcome

Directly under the H1, write one sentence that names what the reader gets. Follow it with a short lead list:

- **For:** the audience, such as application developers, contributors, or designers
- **Time:** a concrete estimate, such as "about 10 minutes" (tutorial and how-to only)
- **Before you start:** prerequisites, each one linked (omit when there are none)

Don't open with "This page walks you through", "This guide covers", history, or statistics. The H1 names the outcome or the subject, not the page type.

### 3. One action per step, then a check

In tutorials and how-tos, each step is one numbered, bounded action that starts with an imperative verb. A step never contains "and then" twice.

End each step, or each `## Step N:` section, with a sentence that starts `You should see` and names an observable result. Use the fewest steps that still work.

### 4. Restate position in a journey

- **Single-page sequence:** title each major section `## Step N: <verb phrase>`, and put the step count in the lead's **Time** item, such as "about 2 hours across 7 steps."
- **Multi-page journey:** add a **Journey** item to the lead list, such as `- **Journey:** Migration, step 3 of 7`. The **Next step** link goes to step 4.

Never ask the reader to remember an earlier page. Link to it instead.

### 5. Keep it scannable

- **Headings:** H2 and H3 only, in sentence case. Tutorial and how-to headings start with a verb ("Set the color scheme"). Reference headings name the thing ("Theme classes"). Explanation headings are noun phrases or questions.
- **Lists:** five items or fewer per group. Group a longer list under H3s, or use a table.
- **Tables:** use one when you compare two or more options across two or more attributes.
- **Prose:** three sentences or fewer per paragraph, 25 words or fewer per sentence.
- **Code:** every block has a language tag and shows only what the step changes.

### 6. Cut tangents and repetition

- **Tangents:** no "Did you know?" asides, history, or motivation in tutorials and how-tos. Move them to an explanation page and link to it.
- **Repetition:** each fact has one home page. Other pages link to it and don't restate it. For example, the full list of theme classes lives on Theme and scales.
- **Callouts:** use `> ⚠️ **Important:**` only for something the reader must not skip, at most once per section.

### 7. Troubleshoot as symptom, cause, and fix

Put troubleshooting in a `## Troubleshooting` section just before the last section. Title each H3 with the symptom in the reader's words, then give `**Cause:**` and `**Fix:**`. Keep the tone matter-of-fact: no "Uh oh" or "Unfortunately."

When every fix fits on one line, use a table with **Symptom**, **Cause**, and **Fix** columns instead.

### 8. End with one next step

The last section is `## Next step`: one sentence with one link. No recap, "Summary", "Learn more" list, or "Hope this helps."

**Exception:** a section entry page, such as Overview, may end with `## Choose your path` instead. That's a table of five rows or fewer, and each row pairs a reader goal with one link.

## Voice

These add to [`documentation-standards`](../documentation-standards/SKILL.md) and `.ai/rules/text-formatting.md`; they don't replace them.

- **Second person, present tense, active voice:** "Import the stylesheet," not "The stylesheet should be imported."
- **No minimizers:** cut "just", "simply", "easy", "quick", and "obviously."
- **No idioms:** write the literal action, such as "return to step 2" instead of "circle back."
- **Hedge only real uncertainty:** delete "perhaps" and "might" unless the outcome truly varies, and then say what it depends on.
- **Link text names the destination:** `see [Fonts](/docs/guides-customization-fonts--docs)`, never "click here" or "this page."

## Proposed page types for existing guides

A starting point for rewrites. Confirm or change the type during each rewrite.

| Type        | Pages                                                                                                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tutorial    | Get started                                                                                                                                                                                         |
| how-to      | Customization: Getting started, Component styles, Theme and scales, Fonts. Accessibility: Keyboard testing, Screen reader testing, WAVE toolbar testing. Migrate from Gen1 (journey). Build with AI |
| reference   | Global element styling, Dev mode warnings, Accessibility resources, Support and compatibility, Changelog                                                                                            |
| explanation | Overview (section entry), Gen1 vs Gen2. Accessibility: Overview, Semantic HTML and ARIA, Headings and landmarks, Accessible pattern libraries, ElementInternals and axe-core                        |

## Review checklist

Score each item yes or no. A page passes when every item that applies is yes.

### Type and lead

- [ ] `{/* page-type: ... */}` follows `<Meta />`, and the page matches that type's template
- [ ] The first sentence under the H1 names the outcome, with no preamble
- [ ] The lead list has **For**, plus **Time** with a concrete unit for tutorials and how-tos
- [ ] Every prerequisite is linked in **Before you start**
- [ ] Journey pages have a **Journey** item with "step N of M"

### Steps

- [ ] Each step is one action that starts with a verb
- [ ] Each step or `## Step N:` section ends with a `You should see` check
- [ ] Single-page sequences use `## Step N:` headings and state the step count in **Time**

### Scannability

- [ ] Only H2 and H3 headings, in sentence case, phrased for the page type
- [ ] No list group has more than five items
- [ ] No paragraph has more than three sentences, and no sentence has more than 25 words
- [ ] Comparisons are tables, and every code block has a language tag
- [ ] No tangents, and no fact restated from its home page

### Ending and voice

- [ ] Troubleshooting, if present, uses symptom, cause, and fix
- [ ] The page ends with `## Next step` and one link, or `## Choose your path` on a section entry page
- [ ] No recap, minimizers, idioms, or "click here" links
- [ ] Mechanics pass `.ai/rules/text-formatting.md`, with no em dashes and no hard-wrapped prose

### Pre-publish test

Read only the lead and the last section. If you know what the page gets you and where to go next, publish.

## Examples

[`references/examples.md`](references/examples.md) has before-and-after rewrites taken from current guide pages: the lead, a step with a check, a tangent, repeated content, troubleshooting, and the ending.

## Resources

- [Diátaxis](https://diataxis.fr/): tutorial, how-to, reference, and explanation page types
- [GOV.UK: Writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk): front-loading, sentence length, and plain English
- [GOV.UK Design System: Step by step navigation](https://design-system.service.gov.uk/patterns/step-by-step-navigation/): numbered journeys across pages
- [Polaris: Actionable language](https://polaris.shopify.com/content/actionable-language): verb-first headings and links
- [Carbon: Writing style](https://carbondesignsystem.com/guidelines/content/writing-style/): concise, scannable product writing
- [Spectrum: Writing for readability](https://spectrum.adobe.com/page/writing-for-readability/)
