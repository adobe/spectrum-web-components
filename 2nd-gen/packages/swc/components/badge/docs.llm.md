---
component: swc-badge
title: Badge
source: components/badge/docs.mdx
generated: 2026-05-19T10:33:45.201Z
---

# Badge

_Display small amounts of color-categorized metadata to get a user's attention._

Similar to [status lights](/docs/components-status-light--docs), badges use color and text to convey status or category information.

Badges come in three styles: bold fill (default), subtle fill, and outline. Choose one style consistently within a product; `outline` and `subtle` fill draw similar attention levels. Reserve bold fill for high-attention badging only.

#### Example: Overview

```html
<swc-badge variant="neutral" size="s"> Active </swc-badge>
```

## Getting started

Add the package to your project:

```zsh
yarn add @adobe/spectrum-wc
```

Import the side effectful registration of `<swc-badge>` via:

```typescript
import '@adobe/spectrum-wc/components/badge/swc-badge.js';
```

To reference the `Badge` type, import it as a type-only import:

```typescript
import type { Badge } from '@adobe/spectrum-wc/components/badge';
```

> The class is exposed primarily for type purposes. Extending it is possible, but the internal shape is not part of the public API; if you choose to subclass, you do so at your own risk and may need to adjust your code between releases.

## Anatomy

A badge consists of:

1. **Container** - Colored background with rounded corners
2. **Label** - Text content describing the status or category (required)
3. **Icon** (optional) - Visual indicator positioned before the label

### Content

- **Default slot**: Text content describing the status or category (required for accessibility)
- **icon slot**: (optional) - Visual indicator positioned before the label

#### Example: Anatomy

```html
<swc-badge variant="neutral" size="s"> Label only </swc-badge>
<swc-badge role="img" aria-label="Checkmark" variant="neutral" size="s">
  <swc-icon slot="icon" size="s" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
      <path
        d="M3.79102 8.77246c-.17871 0-.34961-.07715-.46875-.21191L.9541 5.87402c-.22852-.25879-.20312-.65332.05566-.88184.25684-.22656.65332-.2041.88184.05566l1.85352 2.10254L8.06738 1.23145c.20117-.2793.59277-.3418.87305-.13672.2793.2041.33984.59473.13672.87305l-4.78125 6.54785c-.1123.15332-.28711.24707-.47656.25586-.00879.00098-.01855.00098-.02832.00098Z"
      ></path>
    </svg>
  </swc-icon>
</swc-badge>
<swc-badge variant="neutral" size="s">
  <swc-icon slot="icon" size="s" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
      <path
        d="M3.79102 8.77246c-.17871 0-.34961-.07715-.46875-.21191L.9541 5.87402c-.22852-.25879-.20312-.65332.05566-.88184.25684-.22656.65332-.2041.88184.05566l1.85352 2.10254L8.06738 1.23145c.20117-.2793.59277-.3418.87305-.13672.2793.2041.33984.59473.13672.87305l-4.78125 6.54785c-.1123.15332-.28711.24707-.47656.25586-.00879.00098-.01855.00098-.02832.00098Z"
      ></path>
    </svg>
  </swc-icon>
  Icon and label
</swc-badge>
```

## Upcoming features

### Notification and indicator badge types

- **Notification**: Displays a numeric count to signal unread or pending items, such as a message counter on an icon
- **Indicator**: A dot-only badge that signals activity or updated content without showing a count

## Options

### Sizes

Badges come in four sizes to fit various contexts:

- **Small (`s`)**: Default size; compact spaces, inline with text, or in tables
- **Medium (`m`)**: Common usage when slightly more emphasis is needed
- **Large (`l`)**: Increased emphasis in cards or content areas
- **Extra-large (`xl`)**: Maximum visibility for primary status indicators

The `s` size is the default. Use larger sizes sparingly to create a hierarchy of importance on a page.

#### Example: Sizes

```html
<div style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-200); align-items: center">
  <swc-badge variant="neutral" size="s">
    <swc-icon slot="icon" size="s" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
        <path
          d="M3.79102 8.77246c-.17871 0-.34961-.07715-.46875-.21191L.9541 5.87402c-.22852-.25879-.20312-.65332.05566-.88184.25684-.22656.65332-.2041.88184.05566l1.85352 2.10254L8.06738 1.23145c.20117-.2793.59277-.3418.87305-.13672.2793.2041.33984.59473.13672.87305l-4.78125 6.54785c-.1123.15332-.28711.24707-.47656.25586-.00879.00098-.01855.00098-.02832.00098Z"
        ></path>
      </svg>
    </swc-icon>
    Small
  </swc-badge>
  <swc-badge variant="neutral" size="m">
    <swc-icon slot="icon" size="m" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
        <path
          d="M3.66406 9.24121c-.21484 0-.41992-.0918-.5625-.25391L.48535 6.01855c-.27441-.31055-.24414-.78516.06641-1.05859s.78516-.24414 1.05859.06641l1.99902 2.26855L8.3418.81348c.24316-.33496.71191-.40918 1.04785-.16309.33398.24414.40723.71289.16309 1.04785l-5.2832 7.23535c-.13379.18359-.34375.29688-.57129.30664-.01172.00098-.02246.00098-.03418.00098Z"
        ></path>
      </svg>
    </swc-icon>
    Medium
  </swc-badge>
  <swc-badge variant="neutral" size="l">
    <swc-icon slot="icon" size="l" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" role="img" aria-hidden="true">
        <path
          d="M4.47754 10.79492c-.23633 0-.46191-.10156-.61914-.28027L.87793 7.13184c-.30078-.3418-.26855-.8623.07422-1.16406.33984-.29883.8623-.26855 1.16406.07422l2.30078 2.61133L9.83105 1.24023c.26758-.36816.78516-.44824 1.15234-.17969.36816.26855.44824.78418.17969 1.15234l-6.01953 8.24316c-.14746.20215-.37891.32617-.62793.33789-.0127.00098-.02539.00098-.03809.00098Z"
        ></path>
      </svg>
    </swc-icon>
    Large
  </swc-badge>
  <swc-badge variant="neutral" size="xl">
    <swc-icon slot="icon" size="xl" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" role="img" aria-hidden="true">
        <path
          d="M5.06152 13.07324c-.28613 0-.55957-.12305-.75-.33887L.51465 8.42578c-.36523-.41406-.3252-1.0459.08887-1.41113.41504-.36426 1.0459-.32617 1.41113.08887l2.97363 3.37402L11.9209.9834c.32617-.44434.95117-.54297 1.39746-.21777.44629.32617.54297.95117.21777 1.39746l-7.66699 10.5c-.17871.24512-.45898.39551-.76172.40918-.01562.00098-.03027.00098-.0459.00098Z"
        ></path>
      </svg>
    </swc-icon>
    Extra-large
  </swc-badge>
</div>
<div
  style="
    display: flex;
    flex-wrap: wrap;
    gap: var(--swc-spacing-200);
    align-items: center;
    margin-block-start: var(--swc-spacing-300);
  "
>
  <swc-badge variant="neutral" size="s"> Small </swc-badge>
  <swc-badge variant="neutral" size="m"> Medium </swc-badge>
  <swc-badge variant="neutral" size="l"> Large </swc-badge>
  <swc-badge variant="neutral" size="xl"> Extra-large </swc-badge>
</div>
<div
  style="
    display: flex;
    flex-wrap: wrap;
    gap: var(--swc-spacing-200);
    align-items: center;
    margin-block-start: var(--swc-spacing-300);
  "
>
  <swc-badge role="img" variant="neutral" size="s" aria-label="Small">
    <swc-icon slot="icon" size="s" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
        <path
          d="M3.79102 8.77246c-.17871 0-.34961-.07715-.46875-.21191L.9541 5.87402c-.22852-.25879-.20312-.65332.05566-.88184.25684-.22656.65332-.2041.88184.05566l1.85352 2.10254L8.06738 1.23145c.20117-.2793.59277-.3418.87305-.13672.2793.2041.33984.59473.13672.87305l-4.78125 6.54785c-.1123.15332-.28711.24707-.47656.25586-.00879.00098-.01855.00098-.02832.00098Z"
        ></path>
      </svg>
    </swc-icon>
  </swc-badge>
  <swc-badge role="img" variant="neutral" size="m" aria-label="Medium">
    <swc-icon slot="icon" size="m" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
        <path
          d="M3.66406 9.24121c-.21484 0-.41992-.0918-.5625-.25391L.48535 6.01855c-.27441-.31055-.24414-.78516.06641-1.05859s.78516-.24414 1.05859.06641l1.99902 2.26855L8.3418.81348c.24316-.33496.71191-.40918 1.04785-.16309.33398.24414.40723.71289.16309 1.04785l-5.2832 7.23535c-.13379.18359-.34375.29688-.57129.30664-.01172.00098-.02246.00098-.03418.00098Z"
        ></path>
      </svg>
    </swc-icon>
  </swc-badge>
  <swc-badge role="img" variant="neutral" size="l" aria-label="Large">
    <swc-icon slot="icon" size="l" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" role="img" aria-hidden="true">
        <path
          d="M4.47754 10.79492c-.23633 0-.46191-.10156-.61914-.28027L.87793 7.13184c-.30078-.3418-.26855-.8623.07422-1.16406.33984-.29883.8623-.26855 1.16406.07422l2.30078 2.61133L9.83105 1.24023c.26758-.36816.78516-.44824 1.15234-.17969.36816.26855.44824.78418.17969 1.15234l-6.01953 8.24316c-.14746.20215-.37891.32617-.62793.33789-.0127.00098-.02539.00098-.03809.00098Z"
        ></path>
      </svg>
    </swc-icon>
  </swc-badge>
  <swc-badge role="img" variant="neutral" size="xl" aria-label="Extra-large">
    <swc-icon slot="icon" size="xl" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" role="img" aria-hidden="true">
        <path
          d="M5.06152 13.07324c-.28613 0-.55957-.12305-.75-.33887L.51465 8.42578c-.36523-.41406-.3252-1.0459.08887-1.41113.41504-.36426 1.0459-.32617 1.41113.08887l2.97363 3.37402L11.9209.9834c.32617-.44434.95117-.54297 1.39746-.21777.44629.32617.54297.95117.21777 1.39746l-7.66699 10.5c-.17871.24512-.45898.39551-.76172.40918-.01562.00098-.03027.00098-.0459.00098Z"
        ></path>
      </svg>
    </swc-icon>
  </swc-badge>
</div>
```

### Semantic variants

Semantic variants provide meaning through color and should be used when status has specific significance. These variants align consistently with other design system components that use the same semantic meanings.

Use these variants for the following statuses:

- **accent**: New, beta, prototype, draft
- **informative**: Active, in use, live, published
- **neutral**: Archived, deleted, paused, not started, ended
- **positive**: Approved, complete, success, purchased, licensed
- **notice**: Pending, expiring soon, limited, deprecated
- **negative**: Rejected, error, alert, failed

#### Example: Semantic Variants

```html
<swc-badge variant="accent" size="s"> New </swc-badge>
<swc-badge variant="informative" size="s"> Active </swc-badge>
<swc-badge variant="neutral" size="s"> Archived </swc-badge>
<swc-badge variant="positive" size="s"> Approved </swc-badge>
<swc-badge variant="notice" size="s"> Pending approval </swc-badge>
<swc-badge variant="negative" size="s"> Rejected </swc-badge>
```

### Non-semantic variants

Non-semantic variants use distinctive colors for visual categorization without inherent meaning. These are ideal for color-coding categories, teams, or projects, especially when there are 8 categories or fewer.

Use non-semantic variants when:

- Categories don't have universal status meanings
- Visual distinction matters more than semantic meaning
- Creating department, team, or project color schemes

> **Note**: 2nd-gen adds `pink`, `turquoise`, `brown`, `cinnamon`, and `silver` variants.

#### Example: Non Semantic Variants

```html
<swc-badge variant="fuchsia" size="s"> Marketing </swc-badge>
<swc-badge variant="indigo" size="s"> Engineering </swc-badge>
<swc-badge variant="magenta" size="s"> Design </swc-badge>
<swc-badge variant="purple" size="s"> Product </swc-badge>
<swc-badge variant="seafoam" size="s"> Support </swc-badge>
<swc-badge variant="yellow" size="s"> Busy </swc-badge>
<swc-badge variant="gray" size="s"> Available </swc-badge>
<swc-badge variant="red" size="s"> Sales </swc-badge>
<swc-badge variant="orange" size="s"> Research </swc-badge>
<swc-badge variant="chartreuse" size="s"> Quality </swc-badge>
<swc-badge variant="celery" size="s"> Documentation </swc-badge>
<swc-badge variant="green" size="s"> Legal </swc-badge>
<swc-badge variant="cyan" size="s"> Analytics </swc-badge>
<swc-badge variant="blue" size="s"> Security </swc-badge>
<swc-badge variant="pink" size="s"> Creative </swc-badge>
<swc-badge variant="turquoise" size="s"> Training </swc-badge>
<swc-badge variant="brown" size="s"> Facilities </swc-badge>
<swc-badge variant="cinnamon" size="s"> Compliance </swc-badge>
<swc-badge variant="silver" size="s"> Version 1.2.10 </swc-badge>
```

### Outline

The `outline` style provides a bordered appearance with a transparent background. This style reduces visual weight while maintaining semantic meaning.

**Important**: The outline style is only valid for semantic variants (`accent`, `informative`, `neutral`, `positive`, `notice`, `negative`). Attempting to use `outline` with non-semantic color variants will not apply the style.

#### Example: Outline

```html
<swc-badge variant="accent" size="s" outline=""> New </swc-badge>
<swc-badge variant="informative" size="s" outline=""> Active </swc-badge>
<swc-badge variant="neutral" size="s" outline=""> Archived </swc-badge>
<swc-badge variant="positive" size="s" outline=""> Approved </swc-badge>
<swc-badge variant="notice" size="s" outline=""> Pending approval </swc-badge>
<swc-badge variant="negative" size="s" outline=""> Rejected </swc-badge>
```

### Subtle

The `subtle` style reduces visual prominence with a softer background fill. Unlike outline, subtle is available for **all** variants (semantic and non-semantic).

Use subtle style when:

- Multiple badges appear together and need less visual competition
- Status is secondary to main content
- Maintaining design system color palette while reducing emphasis

#### Example: Subtle

```html
<swc-badge variant="accent" size="s" subtle=""> New </swc-badge>
<swc-badge variant="informative" size="s" subtle=""> Active </swc-badge>
<swc-badge variant="neutral" size="s" subtle=""> Archived </swc-badge>
<swc-badge variant="positive" size="s" subtle=""> Approved </swc-badge>
<swc-badge variant="notice" size="s" subtle=""> Pending approval </swc-badge>
<swc-badge variant="negative" size="s" subtle=""> Rejected </swc-badge>
<swc-badge variant="fuchsia" size="s" subtle=""> Marketing </swc-badge>
<swc-badge variant="indigo" size="s" subtle=""> Engineering </swc-badge>
<swc-badge variant="magenta" size="s" subtle=""> Design </swc-badge>
<swc-badge variant="purple" size="s" subtle=""> Product </swc-badge>
<swc-badge variant="seafoam" size="s" subtle=""> Support </swc-badge>
<swc-badge variant="yellow" size="s" subtle=""> Busy </swc-badge>
<swc-badge variant="gray" size="s" subtle=""> Available </swc-badge>
<swc-badge variant="red" size="s" subtle=""> Sales </swc-badge>
<swc-badge variant="orange" size="s" subtle=""> Research </swc-badge>
<swc-badge variant="chartreuse" size="s" subtle=""> Quality </swc-badge>
<swc-badge variant="celery" size="s" subtle=""> Documentation </swc-badge>
<swc-badge variant="green" size="s" subtle=""> Legal </swc-badge>
<swc-badge variant="cyan" size="s" subtle=""> Analytics </swc-badge>
<swc-badge variant="blue" size="s" subtle=""> Security </swc-badge>
<swc-badge variant="pink" size="s" subtle=""> Creative </swc-badge>
<swc-badge variant="turquoise" size="s" subtle=""> Training </swc-badge>
<swc-badge variant="brown" size="s" subtle=""> Facilities </swc-badge>
<swc-badge variant="cinnamon" size="s" subtle=""> Compliance </swc-badge>
<swc-badge variant="silver" size="s" subtle=""> Version 1.2.10 </swc-badge>
```

### Fixed

The `fixed` attribute adjusts border radius based on edge positioning, creating the appearance that the badge is "fixed" to a UI edge.

Fixed positioning options:

- **block-start**: Top edge (removes top-left and top-right border radius)
- **block-end**: Bottom edge (removes bottom-left and bottom-right border radius)
- **inline-start**: Left edge (removes top-left and bottom-left border radius)
- **inline-end**: Right edge (removes top-right and bottom-right border radius)

This is purely visual styling; actual positioning must be handled separately with CSS.

#### Example: Fixed

```html
<swc-badge variant="neutral" size="s" fixed="block-start"> Block start </swc-badge>
<swc-badge variant="neutral" size="s" fixed="block-end"> Block end </swc-badge>
<swc-badge variant="neutral" size="s" fixed="inline-start"> Inline start </swc-badge>
<swc-badge variant="neutral" size="s" fixed="inline-end"> Inline end </swc-badge>
```

## Behaviors

### Text wrapping

When a badge's label is too long for the available horizontal space, it wraps to form multiple lines. Text wrapping can be controlled by applying a `max-inline-size` constraint to the badge.

This ensures badges remain readable even with longer status messages or category names.

#### Example: Text Wrapping

```html
<swc-badge variant="notice" size="s" style="max-inline-size: 120px">
  Document review pending approval from manager
</swc-badge>
```

### Inline

Badges flow naturally within prose text to annotate inline content such as headings, labels, list items, or table cells.

Because `<swc-badge>` renders as `inline-flex`, it participates in the normal text flow without any extra wrapper styling required. Use small (`s`) badges in most inline contexts to avoid disrupting line height.

#### Example: Inline

```html
<p>
  Design system components
  <swc-badge variant="accent" size="s"> Beta </swc-badge>
</p>
<p>
  API documentation
  <swc-badge variant="positive" size="s"> Stable </swc-badge>
</p>
<p>
  Legacy components
  <swc-badge variant="notice" size="s"> Deprecated </swc-badge>
</p>
```

## Accessibility

### Features

The `<swc-badge>` element implements several accessibility features:

#### Color meaning

- Colors are used in combination with text labels and/or icons to ensure that status information is not conveyed through color alone
- Users with color vision deficiencies can understand badge meaning through text content
- High contrast mode is supported with appropriate color overrides

#### Non-interactive element

- Badges have no interactive behavior and are not focusable
- Screen readers will announce the badge content as static text
- No keyboard interaction is required or expected

> Important: In focus mode, only interactive elements and their associated labels/descriptions are announced. If content is not a label or description for a focusable element, it will not be read. For non-interactive content, screen reader users must [switch to Browse mode](https://swcpreviews.z13.web.core.windows.net/pr-6122/docs/second-gen-storybook/?path=/docs/guides-accessibility-guides-screen-reader-testing--readme#screen-reader-modes). This is expected behavior, not a bug; ensure you test both modes when evaluating component accessibility.

### Text label

Badges with visible text are announced directly by screen readers. The text in the default slot is the accessible name.

### Icon + text

When an icon accompanies a text label, the icon is decorative and should be hidden from assistive technology. Apply `aria-hidden="true"` to the `<swc-icon>` so screen readers only announce the label text.

### Icon only

When space is limited and no visible label is shown, the badge **must** have an accessible name. Set `role="img"` and `aria-label` directly on the `<swc-badge>` element to describe the badge's meaning. `role="img"` is required because custom elements have no implicit ARIA role; without it, `aria-label` is not permitted by the ARIA specification and will fail automated accessibility checks. Without both attributes, the badge has no accessible name and fails WCAG 1.1.1.

### Best practices

- Use semantic variants (`positive`, `negative`, `notice`, `informative`, `neutral`, `accent`) when the status has specific meaning
- Include clear, descriptive labels that explain the status without relying on color alone
- For icon-only badges, always set `role="img"` and `aria-label` on `swc-badge`
- Ensure sufficient color contrast between the badge and its background
- Badges are not interactive elements; for interactive status indicators, consider using buttons, tags, or links instead
- When using multiple badges together, ensure they're clearly associated with their related content
- Use consistent badge variants across your application for the same statuses
- Test with screen readers to verify badge content is announced in context
- Consider placement carefully; badges should be close to the content they describe

#### Example: Accessibility

```html
<swc-badge variant="positive" size="s"> Approved </swc-badge>
<swc-badge variant="negative" size="s"> Rejected </swc-badge>
<swc-badge variant="notice" size="s"> Pending approval </swc-badge>
<swc-badge variant="informative" size="s"> Active </swc-badge>
<swc-badge variant="neutral" size="s"> Archived </swc-badge>
<swc-badge variant="celery" size="s"> Documentation </swc-badge>
<swc-badge variant="yellow" size="s"> Busy </swc-badge>
<swc-badge variant="silver" size="s"> Version 1.2.10 </swc-badge>
<swc-badge variant="positive" size="s">
  <swc-icon slot="icon" aria-hidden="true" size="s">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
      <path
        d="M3.79102 8.77246c-.17871 0-.34961-.07715-.46875-.21191L.9541 5.87402c-.22852-.25879-.20312-.65332.05566-.88184.25684-.22656.65332-.2041.88184.05566l1.85352 2.10254L8.06738 1.23145c.20117-.2793.59277-.3418.87305-.13672.2793.2041.33984.59473.13672.87305l-4.78125 6.54785c-.1123.15332-.28711.24707-.47656.25586-.00879.00098-.01855.00098-.02832.00098Z"
      ></path>
    </svg>
  </swc-icon>
  Approved
</swc-badge>
<swc-badge variant="positive" role="img" aria-label="Approved" size="s">
  <swc-icon slot="icon" size="s" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-hidden="true">
      <path
        d="M3.79102 8.77246c-.17871 0-.34961-.07715-.46875-.21191L.9541 5.87402c-.22852-.25879-.20312-.65332.05566-.88184.25684-.22656.65332-.2041.88184.05566l1.85352 2.10254L8.06738 1.23145c.20117-.2793.59277-.3418.87305-.13672.2793.2041.33984.59473.13672.87305l-4.78125 6.54785c-.1123.15332-.28711.24707-.47656.25586-.00879.00098-.01855.00098-.02832.00098Z"
      ></path>
    </svg>
  </swc-icon>
</swc-badge>
```

## API

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` (reflects) | `BadgeVariant` | `'neutral'` |  |
| `size` | `size` | `ElementSize` | `s` | The size of the badge. |
| `fixed` | `fixed` (reflects) | `FixedValues \| undefined` | - | The fixed position of the badge. |
| `subtle` | `subtle` (reflects) | `boolean` | `false` | Whether the badge is subtle. |
| `outline` | `outline` (reflects) | `boolean` | `false` | Whether the badge is outlined.  Can only be used with semantic variants. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Text label of the badge. |
| `icon` | Optional icon that appears to the left of the label |

### CSS custom properties

| Name | Default | Description |
| --- | --- | --- |
| `--swc-badge-height` | - | Minimum block size of the badge. |
| `--swc-badge-corner-radius` | - | Corner radius of the badge. |
| `--swc-badge-gap` | - | Gap between the icon and label. |
| `--swc-badge-padding-block` | - | Block padding. |
| `--swc-badge-padding-inline` | - | Inline padding. |
| `--swc-badge-padding-inline-start` | - | Inline-start padding; overrides the start side of `--swc-badge-padding-inline`. |
| `--swc-badge-font-size` | - | Font size of the label. |
| `--swc-badge-line-height` | - | Line height of the label. |
| `--swc-badge-icon-size` | - | Size of the icon in the icon slot. |
| `--swc-badge-label-icon-color` | - | Color of the label text and icon. |
| `--swc-badge-background-color` | - | Background color of the badge. |
| `--swc-badge-border-color` | - | Border color; visible on the outline variant. |
| `--swc-badge-with-icon-padding-inline` | - | Inline padding when the badge has both an icon and a label. |
| `--swc-badge-with-icon-only-padding-inline` | - | Inline padding for icon-only badges. |
| `--swc-badge-with-icon-only-padding-block` | - | Block padding for icon-only badges. |
| `--swc-badge-outline-background-color` | - | Background color override for the outline variant. |
| `--swc-badge-outline-label-icon-color` | - | Label and icon color override for the outline variant. |

## Feedback

Have feedback or questions? [Open an issue](https://github.com/adobe/spectrum-web-components/issues/new/choose).
