# Progress-circle
## Overview

They can represent determinate or indeterminate progress.

## Sizes

Progress circles come in three sizes to fit various contexts:
- **Small (`s`)**: Used for inline indicators or space-constrained areas, such as in tables or alongside small text
- **Medium (`m`)**: Default size, used for typical loading states in cards, forms, or content areas
- **Large (`l`)**: Used for prominent loading states, primary content areas, or full-page loading indicators

## Static Colors

Use the `static-color` attribute when displaying over images or colored backgrounds:
- **white**: Use on dark or colored backgrounds for better contrast
- **black**: Use on light backgrounds for better contrast

## Indeterminate

The indeterminate state shows an animated loading indicator when progress is unknown or cannot be determined.
Set the `indeterminate` attribute to `true` to activate this state.
This removes `aria-valuenow` from the element and provides appropriate feedback to assistive technologies.
Use indeterminate progress when:
- The operation duration is unknown
- Progress cannot be accurately measured
- Multiple sub-operations are running in parallel

## Accessibility

### Features
The `<swc-progress-circle>` element implements several accessibility features:
#### ARIA implementation
1. **ARIA role**: Automatically sets `role="progressbar"` for proper semantic meaning
2. **Labeling**:
- Uses the `label` attribute value as `aria-label`
- Alternative: Content in the default slot can provide the label
3. **Progress state** (determinate):
- Sets `aria-valuenow` with the current `progress` value
4. **Loading state** (indeterminate):
- Removes `aria-valuenow` when `indeterminate="true"`
- Screen readers understand this as an ongoing operation with unknown duration
5. **Status communication**: Screen readers announce progress updates as values change
#### Visual accessibility
- Progress is shown visually through the fill amount, not relying solely on color
- High contrast mode is supported with appropriate color overrides
- Static color variants ensure sufficient contrast on different backgrounds
### Best practices
- Always provide a descriptive `label` that explains what the progress represents
- Use specific, meaningful labels (e.g., "Uploading profile photo" instead of "Loading")
- Use determinate progress (`progress="50"`) when possible to give users a clear sense of completion
- For determinate progress, ensure the `progress` value accurately reflects the actual progress
- Use indeterminate progress only when duration is truly unknown
- Consider using `size="l"` for primary loading states to improve visibility
- Ensure sufficient color contrast between the progress circle and its background
- Use `static-color="white"` on dark backgrounds or `static-color="black"` on light backgrounds
- Test with screen readers to verify progress announcements are clear and timely
- Avoid updating progress values more frequently than every 1-2 seconds to prevent announcement overload

## Progress Values

Progress circles can show specific progress values from 0% to 100%.
Set the `progress` attribute to a value between 0 and 100 to represent determinate progress.
This automatically sets `aria-valuenow` to the provided value for screen readers.
