# Merge "attributes" and "properties" into a single "Properties" category

## Problem

Currently, `getStorybookHelpers` splits component fields into two separate categories in the API table:

- **"attributes"** — fields that have a corresponding HTML attribute (`@property()`)
- **"properties"** — fields that are JS-only (`@property({ attribute: false })`)

This is misleading because every attribute _is also_ a property. A consumer looking at the "Properties" section would think it's the complete JS API, but it only contains the small subset of property-only fields. Most Lit properties have attributes by default, so in practice:

- "Attributes" has most of the API
- "Properties" is often nearly empty
- Consumers miss that all "attributes" are settable via JS as properties too

### Relevant code

In `getAttributesAndProperties()`:

```js
const attribute = component.attributes?.find(x => member.name === x.fieldName);
const args = attribute ? attrArgs : propArgs;
// ...
category: attribute ? "attributes" : "properties",
```

A field goes into _either_ `attrArgs` or `propArgs`, never both.

## Proposal

1. **Show all fields under a single "Properties" category** — because they are all JS properties
2. **Annotate which properties have a corresponding HTML attribute** — either via `table.subcategory`, or by appending to the `description` (e.g., `HTML attribute: \`my-attr\` (reflects)`)

This gives consumers a complete view of the API in one place while still surfacing which properties can be set as HTML attributes.

### Possible implementation

```js
// Always assign to "properties" category
args[name] = {
  name,
  description: getDescription(member.description, propName, member.deprecated),
  table: {
    category: 'properties',
    // optionally use subcategory to group reflected vs non-reflected
  },
};

// Append attribute info to description when applicable
if (attribute) {
  const reflects = member.reflects ? ' (reflects)' : '';
  args[name].description +=
    `\n\nHTML attribute: \`${attribute.name}\`${reflects}`;
}
```

### Alternatively

Expose a configuration option (e.g., `mergeAttributesIntoProperties: true`) so consumers can opt in without breaking existing behavior.

## Related

- #52 — Property/attribute name mismatch causing args not to work (same underlying attributes-vs-properties tension)
