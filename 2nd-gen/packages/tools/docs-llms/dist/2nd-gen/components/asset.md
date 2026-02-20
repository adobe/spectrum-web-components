# Asset
## Overview

The `file` and `folder` variants center themselves horizontally and vertically in the space provided.
Images are contained within the element, growing to the element's full height while centering within the width provided.

## Accessibility

### Features
The `<swc-asset>` element implements several accessibility features:
#### ARIA implementation
- **Icon labeling**: File and folder SVG icons automatically use the `label` property as `aria-label`
- **Non-interactive**: Assets have no interactive behavior and are not focusable
#### Visual accessibility
- Icons use sufficient color contrast in both light and dark modes
- High contrast mode is supported with appropriate color overrides
- Content automatically centers for consistent layout and visual balance
### Best practices
- Always provide a descriptive `label` attribute for file and folder variants
- Use specific, meaningful labels or alt text (e.g., "Project proposal PDF", "projects/2025/proposal.pdf", or not just "File")
- The `label` on the asset itself should describe the asset's purpose or context
- For decorative images, use an empty `alt=""` attribute on the img tag
- Test with screen readers to verify assets are announced appropriately in context

## Variants

Assets support two built-in icon variants for representing files and folders:
- **`file`**: Displays a file icon, useful for representing documents, files, or file types
- **`folder`**: Displays a folder icon, useful for representing directories or collections
When no variant is specified, the asset displays custom content provided via the default slot (typically an image).
