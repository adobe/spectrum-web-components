---
name: documentation-standards
description: When writing documentation in a variety of scenarios, follow the Adobe content writing standards.
---

# Documentation standards

Understand the Spectrum Design System's content writing standards and expectations at an expert level.

## When to Use This Skill

- Designing and writing story documentation (i.e. JSDoc comments) for Storybook
- Updating documentation for 1st-gen documentation site
- Writing any documentation that is shipped to external consumers
- Creating documentation that is internal
- Developing a changeset for a pull request
- Drafting Jira tickets
- Writing a pull request description

## Example

### 🚨 Not following Adobe content standards

ALL VALUES IN THE ITEM ARRAY ARE ASSUMED TO BE HOMOGENOUS BY DEFAULT which means that all of the rendered rows are either delivered as provided or in the case you are leveraging selects rendered with an <sp-table-checkbox-cell> element however when virtualizing a table with selection it can sometimes be useful to surface rows with ADDITIONAL INTERACTIONS e.g. "Load More Data" Links, and to support that you can optionally include the _$rowType$ brand in your item and the values for this are outlined by the RowType enum and include ITEM (0) and INFORMATION (1) and when _$rowType$: RowType.INFORMATION is provided it instructs the <sp-table> not to deliver an <sp-table-checkbox-cell> in that row BUT you should be careful when doing this because it might cause issues with your implementation!!!

The SP-ACCORDION Element Contains A List Of Items that can be expanded or collapsed to reveal ADDITIONAL CONTENT or information associated with each item and there can be zero expanded items exactly one expanded item or more than one item expanded at a time depending on the configuration (which is really important!!!) and this list of items is defined by child sp-accordion-item elements that are targeted to the default slot of their sp-accordion parent. however you should note that the configuration can be changed dynamically at runtime and the items will be automatically updated to reflect the new state. But you need to be careful about how you implement this because it might not work as expected in all situations and you should always test your implementation thoroughly before deploying to production.

### ✅ Following Adobe content standards

All values in the item array are assumed to be homogenous by default. This means all of the rendered rows are either delivered as provided, or, in the case you are leveraging `selects`, rendered with an `<sp-table-checkbox-cell>`. However, when virtualizing a table with selection, it can sometimes be useful to surface rows with additional interactions, e.g. "Load more data" links. To support that, you can optionally include the `_$rowType$` brand in your item. The values for this are outlined by the `RowType` enum and include `ITEM` (0) and `INFORMATION` (1). When `_$rowType$: RowType.INFORMATION` is provided, it instructs the `<sp-table>` not to deliver an `<sp-table-checkbox-cell>` in that row.

The `<sp-accordion>` element contains a list of items that can be expanded or collapsed to reveal additional content or information associated with each item. There can be zero expanded items, exactly one expanded item, or more than one item expanded at a time, depending on the configuration. This list of items is defined by child [`<sp-accordion-item>`](../accordion-item/) elements that are targeted to the default slot of their `<sp-accordion>` parent.

## Key patterns

Most often, documentation is written in Markdown or JSDoc formats.

### Markdown syntax reference

#### Headers

```markdown
# H1 Header

## H2 Header

### H3 Header

#### H4 Header

##### H5 Header

###### H6 Header

# Alternative H1

## Alternative H2
```

#### Text Formatting

```markdown
**Bold text**
**Also bold**

_Italic text_
_Also italic_

**_Bold and italic_**
**_Also bold and italic_**

~~Strikethrough~~

`Inline code`

> Blockquote
> Multiple lines
> in blockquote

---

Horizontal rule (also \_\_\_ or \*\*\*)
```

#### Lists

```markdown
Unordered list:

- Item 1
- Item 2
    - Nested item 2.1
    - Nested item 2.2
- Item 3

Using asterisks:

- Item 1
- Item 2

Using plus:

- Item 1
- Item 2

Ordered list:

1. First item
2. Second item
    1. Nested item 2.1
    2. Nested item 2.2
3. Third item

Task list (GitHub Flavored Markdown):

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

#### Links and Images

```markdown
[Link text](https://example.com)
[Link with title](https://example.com 'Link title')

Reference-style link:
[Link text][reference]
[reference]: https://example.com

Automatic link:
<https://example.com>
<email@example.com>

![Alt text](image.png)
![Alt text](image.png 'Image title')

Reference-style image:
![Alt text][image-ref]
[image-ref]: image.png
```

#### Code Blocks

````markdown
Inline code: `const x = 5;`

Code block with language:

```javascript
function hello(name) {
    console.log(`Hello, ${name}!`);
}
```

```python
def hello(name):
    print(f"Hello, {name}!")
```

```bash
npm install
npm start
```

Indented code block (4 spaces):
const x = 5;
console.log(x);
````

#### Tables

```markdown
Simple table:
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1 | Data | Data |
| Row 2 | Data | Data |

Aligned columns:
| Left | Center | Right |
|:-----|:------:|------:|
| Left | Center | Right |
| Text | Text | Text |

Minimal table:
Column 1 | Column 2
---------|----------
Data | Data
Data | Data
```

### JSDoc Tags Reference

````ts
/**
 * Summary description.
 *
 * @remarks
 * Additional details and implementation notes.
 *
 * @param name - Parameter description
 * @typeParam T - Type parameter description
 * @returns Return value description
 *
 * @throws {ErrorType} When error condition
 *
 * @example
 * ```typescript
 * // Example code
 * ```
 *
 * @see {@link RelatedItem} for related documentation
 * @see https://example.com External link
 *
 * @deprecated Use `newFunction` instead
 * @since 1.0.0
 * @version 2.0.0
 *
 * @alpha - Early preview
 * @beta - Feature complete but may change
 * @public - Stable API
 * @internal - Not for public use
 * @private - Internal/private member (similar to @internal)
 * @description - Explicit description
 * @readonly - Cannot be modified
 * @virtual - Can be overridden
 * @override - Overrides parent
 * @sealed - Cannot be extended
 * @element swc-component-name - Custom element tag name
 * @slot [name] - Slot description (omit name for default slot)
 * @slot named-slot - Named slot description
 * @prop {type} property-name - Property description
 * @prop {type} name - Component property
 * @attribute {type} attribute-name - HTML attribute description
 * @attr {type} name - HTML attribute (short form)
 * @todo Description of work to be done
 * @type {TypeExpression} - Type of a property/variable
 * @defaultValue default value
 * @fires event-name - Custom event dispatched by component
 * @event event-name - Alternative to @fires
 * @eventProperty - For event properties
 */
````

## Resources

- [Adobe voice and tone](https://spectrum.adobe.com/page/voice-and-tone/)
- [Grammar and mechanics](https://spectrum.adobe.com/page/grammar-and-mechanics/)
- [Inclusive UX writing](https://spectrum.adobe.com/page/inclusive-ux-writing/)
- [Writing about people](https://spectrum.adobe.com/page/writing-about-people/)
- [Writing for readability](https://spectrum.adobe.com/page/writing-for-readability/)
- [Writing with visuals](https://spectrum.adobe.com/page/writing-with-visuals/)
- [In-product word list](https://spectrum.adobe.com/page/in-product-word-list/)
- [Writing for errors](https://spectrum.adobe.com/page/writing-for-errors/)
- [Writing for onboarding](https://spectrum.adobe.com/page/writing-for-onboarding/)
- [Writing a changeset](https://github.com/adobe/spectrum-web-components/blob/main/.changeset/README.md)
