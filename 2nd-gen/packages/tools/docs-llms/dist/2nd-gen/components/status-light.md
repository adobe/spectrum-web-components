# Status-light
## Overview

Status lights describe the condition of an entity. Much like [badges](../?path=/docs/components-badge--readme), they can be used to convey semantic meaning, such as statuses and categories.

## Sizes

Status lights come in four sizes to fit various contexts:
- **Small (`s`)**: Used for inline indicators or space-constrained areas
- **Medium (`m`)**: Default size, used for typical use cases
- **Large (`l`)**: Used for prominent displays or primary content areas
- **Extra-large (`xl`)**: Maximum visibility for high-priority statuses
All sizes shown below for comparison.

## Semantic Variants

Semantic variants provide meaning through color:
- **`info`**: Active, in use, live, published
- **`neutral`**: Archived, deleted, paused, draft, not started, ended
- **`positive`**: Approved, complete, success, new, purchased, licensed
- **`notice`**: Needs approval, pending, scheduled, syncing, indexing, processing
- **`negative`**: Error, alert, rejected, failed

## Non Semantic Variants

Non-semantic variants use color-coded categories, ideal for data visualization and labeling.
Best used when there are **8 or fewer** categories being color coded.
**Note**: The `pink`, `turquoise`, `brown`, `cinnamon`, and `silver` variants are new in 2nd-gen and not available in 1st-gen.

## Text Wrapping

When the text is too long for the horizontal space available, it wraps to form another line.
You can control the wrapping behavior by setting a `max-inline-size` style on the component.

## Accessibility

### Features
The `<swc-status-light>` element implements several accessibility features:
#### Visual accessibility
- Status information is conveyed through both color and text labels, not relying on color alone
- High contrast mode is supported with appropriate color overrides
- Sufficient color contrast is maintained between the status dot and background
#### Semantic meaning
- Semantic variants provide consistent color associations for common statuses
- Text labels provide clear context for all users
### Best practices
- Always provide a descriptive text label that explains the status
- Use semantic variants (`info`, `positive`, `negative`, `notice`, `neutral`) when the status has specific meaning
- Use meaningful, specific labels (e.g., "Approved" instead of "Green")
- Ensure sufficient color contrast between the status light and its background
- For non-semantic variants, ensure the text label provides complete context
