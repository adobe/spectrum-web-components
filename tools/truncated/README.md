## Overview

`<sp-truncated>` renders a line of text, truncating it if it overflows its container. When overflowing, a tooltip is automatically created that renders the entire non-truncated content. Additionally, clicking on overflowing text copies the full content to the clipboard and displays a success message.

This component is designed like a `<span>` to contain potentially-long strings that are important for users to see, even when in small containers, such as full names, email addresses, file paths, and other text data that may exceed the available space.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/truncated?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/truncated)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/truncated?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/truncated)

```bash
yarn add @spectrum-web-components/truncated
```

Import the side effectful registration of `<sp-truncated>` as follows:

```typescript
import '@spectrum-web-components/truncated/sp-truncated.js';
```

When looking to leverage the `Truncated` base class as a type and/or for extension purposes, do so via:

```typescript
import { Truncated } from '@spectrum-web-components/truncated';
```

### Anatomy

The basic structure of the truncated component:

```html
<sp-truncated>
    This will truncate into a tooltip if there isn't enough space for it.
</sp-truncated>
```

### Examples

#### Basic usage

By default, `<sp-truncated>` will automatically detect when text overflows its container and display a tooltip with the full content on hover. When the truncated text is clicked, it copies the full text to the clipboard.

```html demo
<div
    style="width: 200px; border: 1px solid var(--spectrum-gray-300); padding: 8px; overflow: hidden; resize: both;"
>
    <sp-truncated>
        This is a very long sentence that should be truncated when there isn't
        enough space to display it fully.
    </sp-truncated>
</div>
```

#### With mixed content

`<sp-truncated>` supports mixed content including text formatting and inline elements:

```html demo
<div
    style="width: 250px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
>
    <sp-truncated>
        This is a
        <strong>very long</strong>
        sentence with
        <em>formatted text</em>
        that should be truncated.
    </sp-truncated>
</div>
```

#### Long words without spaces

The component handles long words or strings without spaces appropriately:

```html demo
<div
    style="width: 150px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
>
    <sp-truncated>
        ThisIsAVeryLongWordWithoutAnySpacesThatShouldBeTruncated
    </sp-truncated>
</div>
```

#### Custom overflow content

By default, tooltip text will be extracted from the overflowing content. To provide your own custom overflow content for the tooltip, slot it into the `overflow` slot:

```html demo
<div
    style="width: 200px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
>
    <sp-truncated>
        This is the inline content that gets truncated
        <span slot="overflow">
            This custom overflow content will appear in the tooltip with any
            additional information or formatting you need.
        </span>
    </sp-truncated>
</div>
```

#### Tooltip placement

You can control the placement of the tooltip using the `placement` attribute. The default placement is `top-start`.

```html demo
<div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <div
        style="width: 150px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
    >
        <sp-truncated placement="top">
            Top placement for this truncated text
        </sp-truncated>
    </div>
    <div
        style="width: 150px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
    >
        <sp-truncated placement="bottom">
            Bottom placement for this truncated text
        </sp-truncated>
    </div>
    <div
        style="width: 150px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
    >
        <sp-truncated placement="left">
            Left placement for this truncated text
        </sp-truncated>
    </div>
    <div
        style="width: 150px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
    >
        <sp-truncated placement="right">
            Right placement for this truncated text
        </sp-truncated>
    </div>
</div>
```

#### Custom success message

When text is copied to the clipboard, a custom success message can be displayed:

```html demo
<div
    style="width: 200px; border: 1px solid var(--spectrum-gray-300); padding: 8px;"
>
    <sp-truncated success-message="Email copied successfully!">
        user.name@example.com
    </sp-truncated>
</div>
```

### Usage in patterns

#### With field labels

`<sp-truncated>` is commonly used with form fields to display long values that might overflow:

```html demo
<sp-field-label for="email-field">Email address</sp-field-label>
<div
    style="width: 250px; border: 1px solid var(--spectrum-gray-300); padding: 8px; border-radius: 4px;"
>
    <sp-truncated>very.long.email.address@subdomain.example.com</sp-truncated>
</div>
```

#### In popovers

For use within overlays, ensure the popover has appropriate width constraints:

```html
<sp-button id="user-trigger">User Info</sp-button>
<sp-overlay trigger="user-trigger@click" placement="bottom">
    <sp-popover style="width: 250px;">
        <div style="padding: 16px;">
            <sp-field-label>Username</sp-field-label>
            <div style="width: 200px;">
                <sp-truncated>
                    very.long.username.that.exceeds.the.available.width
                </sp-truncated>
            </div>
        </div>
    </sp-popover>
</sp-overlay>
```

### Accessibility

#### Keyboard navigation

The `<sp-truncated>` component does not receive keyboard focus by itself, as it functions as inline content. However, the tooltip that appears on hover follows standard Spectrum tooltip accessibility patterns:

- The tooltip appears on hover and focus
- The tooltip is dismissed when the user moves away or presses the Escape key

#### Click to copy

When truncated text is clicked, the full text content is copied to the clipboard. This interaction provides a quick way for users to access the complete content.

**Important accessibility note:** The click handler on the truncated text does not include keyboard event handlers (`/* eslint-disable lit-a11y/click-events-have-key-events */`). This is a known limitation. Users who rely on keyboard navigation will need to use the tooltip hover interaction to view the full content, but cannot copy it via keyboard alone.

#### Screen readers

Screen readers will announce the visible truncated text. When the tooltip appears on hover, screen readers will announce the full content if it differs from the visible text.

For custom overflow content, ensure that the slotted content is semantically meaningful and properly structured for screen readers.

### Content guidelines

#### Do

- Use `<sp-truncated>` for non-critical text that users may need to see in full but can afford to be shortened in compact views
- Provide meaningful text that makes sense even when truncated
- Use for email addresses, file paths, long names, and similar data
- Test with actual content to ensure the truncation point makes sense

#### Don't

- Don't use for critical actions or navigation labels that must always be visible
- Don't use for very short text that is unlikely to overflow
- Don't truncate text where the beginning or end context is essential for comprehension
- Don't rely solely on truncated text for important information without providing alternative access

### Additional resources

For more information on accessibility best practices for truncated text, refer to:

- [Spectrum Design System - Text Overflow Guidelines](https://spectrum.adobe.com/page/text-field/#Text-overflow)
- [WCAG 2.1 Success Criterion 1.4.8 - Visual Presentation](https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html)

### Design reference

For design specifications and usage guidelines, refer to the Spectrum Design System documentation:

- [Spectrum Text Field Component - Text Overflow](https://spectrum.adobe.com/page/text-field/#Text-overflow)

**Note:** While `<sp-truncated>` is not a standalone component in the official Spectrum Design System, it implements common text truncation patterns used throughout Spectrum components.
