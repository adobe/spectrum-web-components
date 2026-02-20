# Divider
## Overview

A divider is a visual separator that brings clarity to a layout by grouping and dividing
content in close proximity. Dividers help establish rhythm and hierarchy, making it easier
for users to scan and understand content structure.

## Sizes

Dividers come in three sizes to fit various contexts:
- **Small (`s`)**: Used to divide similar components such as table rows, action button groups, and components within a panel
- **Medium (`m`)**: Used for dividing subsections on a page, or to separate different groupings of components such as panels, rails, etc.
- **Large (`l`)**: Should only be used for page titles or section titles

## Static Colors

Use the `static-color` attribute when displaying over images or colored backgrounds:
- **white**: Use on dark or colored backgrounds for better contrast
- **black**: Use on light backgrounds for better contrast

## Accessibility

### Features
The `<swc-divider>` element implements several accessibility features:
#### ARIA implementation
1. **ARIA role**: Automatically sets `role="separator"` to ensure proper semantic meaning for assistive technologies
2. **Orientation support**: When `vertical` is true, automatically sets `aria-orientation="vertical"` to indicate the divider's orientation
#### Visual accessibility
- Dividers use sufficient thickness and color contrast to be perceivable
- Static color variants ensure contrast on different backgrounds
- High contrast mode is supported with appropriate color overrides
### Best practices
- Place medium or large dividers below header text to visually create a section or page title
- Use dividers to create meaningful visual separation, not just decorative lines
- Use dividers sparingly; excessive use can diminish their visual impact
- Ensure sufficient color contrast when using `static-color` variants on colored backgrounds
- Consider using headings or other semantic elements for screen reader users when dividers mark major content transitions

## Vertical

The default horizontal divider is used to separate content stacked vertically. To separate
horizontal content, use the `vertical` attribute.
