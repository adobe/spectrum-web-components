# Badge
## Overview

Similar to [status lights](/docs/components-status-light--readme), they use color and text to convey status or category information.
Badges come in three styles: bold fill (default), subtle fill, and outline.
Choose one style consistently within a product - `outline` and `subtle` fill draw similar attention levels.
Reserve bold fill for high-attention badging only.

## Anatomy

A badge consists of:
1. **Container** - Colored background with rounded corners
2. **Label** - Text content describing the status or category (required)
3. **Icon** (optional) - Visual indicator positioned before the label
### Content
- **Default slot**: Text content describing the status or category (required for accessibility)
- **icon slot**: (optional) - Visual indicator positioned before the label

## Sizes

Badges come in four sizes to fit various contexts:
- **Small (`s`)**: Compact spaces, inline with text, or in tables
- **Medium (`m`)**: Default size for most common usage scenarios
- **Large (`l`)**: Increased emphasis in cards or content areas
- **Extra-large (`xl`)**: Maximum visibility for primary status indicators
The `m` size is the default and most frequently used option. Use larger sizes sparingly to create a hierarchy of importance on a page.

## Semantic Variants

Semantic variants provide meaning through color and should be used when status has specific significance.
These variants align consistently with other design system components that use the same semantic meanings.
Use these variants for the following statuses:
- **accent**: New, beta, prototype, draft
- **informative**: Active, in use, live, published
- **neutral**: Archived, deleted, paused, not started, ended
- **positive**: Approved, complete, success, purchased, licensed
- **notice**: Pending, expiring soon, limited, deprecated
- **negative**: Rejected, error, alert, failed

## Non Semantic Variants

Non-semantic variants use distinctive colors for visual categorization without inherent meaning.
These are ideal for color-coding categories, teams, or projects - especially when there are 8 categories or fewer.
Use non-semantic variants when:
- Categories don't have universal status meanings
- Visual distinction matters more than semantic meaning
- Creating department, team, or project color schemes
> **Note**: 2nd-gen adds `pink`, `turquoise`, `brown`, `cinnamon`, and `silver` variants.
1st-gen variants `gray`, `red`, `orange`, `green`, and `blue` are not available in 2nd-gen.

## Outline

The `outline` style provides a bordered appearance with a transparent background.
This style reduces visual weight while maintaining semantic meaning.
**Important**: The outline style is only valid for semantic variants (`accent`, `informative`, `neutral`, `positive`, `notice`, `negative`).
Attempting to use `outline` with non-semantic color variants will not apply the style.

## Subtle

The `subtle` style reduces visual prominence with a softer background fill.
Unlike outline, subtle is available for **all** variants (semantic and non-semantic).
Use subtle style when:
- Multiple badges appear together and need less visual competition
- Status is secondary to main content
- Maintaining design system color palette while reducing emphasis

## Fixed

The `fixed` attribute adjusts border radius based on edge positioning, creating the appearance that the badge is "fixed" to a UI edge.
Fixed positioning options:
- **block-start**: Top edge (removes top-left and top-right border radius)
- **block-end**: Bottom edge (removes bottom-left and bottom-right border radius)
- **inline-start**: Left edge (removes top-left and bottom-left border radius)
- **inline-end**: Right edge (removes top-right and bottom-right border radius)
This is purely visual styling - actual positioning must be handled separately with CSS.
All fixed positions shown below for comparison.

## Text Wrapping

When a badge's label is too long for the available horizontal space, it wraps to form multiple lines.
Text wrapping can be controlled by applying a `max-inline-size` constraint to the badge.
This ensures badges remain readable even with longer status messages or category names.

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
### Best practices
- Use semantic variants (`positive`, `negative`, `notice`, `informative`, `neutral`, `accent`) when the status has specific meaning
- Include clear, descriptive labels that explain the status without relying on color alone
- For icon-only badges, provide descriptive text in the default slot or use the `aria-label` attribute directly on the element
- Ensure sufficient color contrast between the badge and its background
- Badges are not interactive elements - for interactive status indicators, consider using buttons, tags, or links instead
- When using multiple badges together, ensure they're clearly associated with their related content
- Use consistent badge variants across your application for the same statuses
- Test with screen readers to verify badge content is announced in context
- Consider placement carefully - badges should be close to the content they describe
