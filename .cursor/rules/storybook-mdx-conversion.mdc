# Storybook MDX conversion

Converts markdown files to MDX format compatible with Storybook rendering.

## When to apply

Apply this rule when converting `.md` files to `.mdx` files for display in Storybook, particularly for documentation pages in the 2nd-gen SWC Storybook guides.

## Conversion steps

### 1. File extension and imports

- Change file extension from `.md` to `.mdx`
- Add Storybook imports at the top of the file:

```typescript
import { Meta } from '@storybook/addon-docs/blocks';
```

- Add a blank line after imports

### 2. Meta tag

- Add a `<Meta title="Your Title Here" />` tag after the imports
- The title should match the document's main heading
- Add a blank line after the Meta tag

### 3. Convert HTML comments to JSX comments

Replace HTML comments with JSX-style comments:

**Before (Markdown):**

```markdown
<!-- Document title (editable) -->
```

**After (MDX):**

```mdx
{/* Document title (editable) */}
```

### 4. Preserve all other content

- Keep all markdown syntax as-is (headings, lists, links, code blocks, etc.)
- Keep all `<details>` and `<summary>` HTML elements unchanged
- Keep all list formatting and indentation unchanged
- Preserve all relative link paths (e.g., `./01_contributor-guides/README.md`)
- Do not modify any content within `<details>` blocks or navigation lists

## Example transformation

**Before (README.md):**

```markdown
<!-- Document title (editable) -->

# Contributor Documentation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About Spectrum Web Components](#about-spectrum-web-components)

</details>

<!-- Document content (editable) -->

## About Spectrum Web Components

Content here...
```

**After (README.mdx):**

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Contributor Documentation" />
{/* Document title (editable) */}

# Contributor Documentation

{/* Generated TOC - DO NOT EDIT */}

<details open>
<summary><strong>In this doc</strong></summary>

- [About Spectrum Web Components](#about-spectrum-web-components)

</details>

{/* Document content (editable) */}

## About Spectrum Web Components

Content here...
```

## Critical rules

1. **Only add imports and Meta tag** - Do not modify any other structural elements
2. **Preserve exact formatting** - Keep all whitespace, indentation, and line breaks
3. **Convert ALL HTML comments** - Every `<!-- comment -->` must become `{/* comment */}`
4. **Keep markdown links** - Do not convert `.md` links to `.mdx` (Storybook may need the original paths)
5. **Blank lines matter** - Maintain blank line after imports and after Meta tag

## Common mistakes to avoid

❌ Don't change the document's heading structure
❌ Don't modify navigation lists or TOC content
❌ Don't convert markdown to JSX (keep lists as markdown lists)
❌ Don't add extra formatting or styling
❌ Don't forget to convert ALL HTML comments to JSX comments
