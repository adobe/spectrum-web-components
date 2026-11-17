# Guide page templates

Copy the skeleton that matches the page's declared type. Replace every `<placeholder>`, and delete optional sections you don't need. Keep the section order.

Every skeleton starts with the same header. Add image imports and a header image only on section entry pages.

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="<Sidebar path>" />

{/* page-type: <tutorial | how-to | reference | explanation> */}
```

## Tutorial

One guaranteed path for a first-time reader. No choices and no alternatives.

````mdx
{/* page-type: tutorial */}

# <Outcome, such as "Build your first SWC page">

<One sentence: what the reader has working at the end.>

- **For:** <audience>
- **Time:** about <N> minutes across <M> steps
- **Before you start:** <linked prerequisites; omit if none>

## Step 1: <Verb phrase>

<Up to one sentence on what this step does.>

```bash
<command>
```

You should see <observable result>.

## Step 2: <Verb phrase>

...

You should see <observable result>.

## Troubleshooting

### <Symptom in the reader's words>

**Cause:** <one sentence>

**Fix:** <one action, or a short numbered list>

## Next step

<Verb phrase> with [<page title>](/docs/<story-id>--docs).
````

## How-to

A known task for a reader who already has the basics. State any branch, such as "Adobe Fonts or self-hosted", before the first step. Each task section holds numbered actions and ends with one `You should see` check.

````mdx
{/* page-type: how-to */}

# <Task, such as "Load Adobe Clean Spectrum VF">

<One sentence: what the reader has done when they finish.>

- **For:** <audience>
- **Time:** about <N> minutes
- **Before you start:** <linked prerequisites; omit if none>
- **Journey:** <name>, step <N> of <M> (multi-page journeys only)

## Choose your approach (optional)

| If you…     | Use                    |
| ----------- | ---------------------- |
| <situation> | [<section>](#<anchor>) |

## <Verb phrase>

1. <Action>
2. <Action>

   ```ts
   <code that this step changes>
   ```

3. <Action>

You should see <observable result>.

## Troubleshooting

| Symptom   | Cause   | Fix          |
| --------- | ------- | ------------ |
| <symptom> | <cause> | <one action> |

## Next step

<Verb phrase> with [<page title>](/docs/<story-id>--docs).
````

## Reference

Facts to look up. Structure it like the thing it describes, and lead with the table the reader most often needs. Omit **Next step** when there's no natural next action, such as on a changelog or a link directory.

```mdx
{/* page-type: reference */}

# <Subject, such as "Theme classes">

<One sentence: what this page lists and when you'd look it up.>

- **For:** <audience>

## <Thing, such as "Color scheme classes">

| Class    | Effect   |
| -------- | -------- |
| `<name>` | <effect> |

## <Thing>

| Option   | Default   | Description |
| -------- | --------- | ----------- |
| `<name>` | `<value>` | <one line>  |

## Next step (optional)

<Verb phrase> with [<how-to page>](/docs/<story-id>--docs).
```

## Explanation

Context that helps the reader understand or decide. No steps. Link to the how-to that acts on it.

```mdx
{/* page-type: explanation */}

# <Concept or question, such as "Gen1 vs Gen2">

<One sentence: what the reader understands or can decide after reading.>

- **For:** <audience>

## <Noun phrase or question>

<Up to three sentences per paragraph.>

## <Comparison>

| Aspect   | <Option A> | <Option B> |
| -------- | ---------- | ---------- |
| <aspect> | <value>    | <value>    |

## Next step

<Verb phrase> with [<page title>](/docs/<story-id>--docs).
```

### Section entry variant

A section entry page, such as Overview, is an explanation page that ends with a fork instead of **Next step**.

```mdx
## Choose your path

| If you're…                       | Start with                             |
| -------------------------------- | -------------------------------------- |
| <reader situation, up to 5 rows> | [<page title>](/docs/<story-id>--docs) |
```
