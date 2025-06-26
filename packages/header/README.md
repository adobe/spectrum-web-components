<!-- TODO: Check if this README structure matches other established packages -->
<!-- TODO: Verify all required documentation sections are included -->
<!-- TODO: Consider adding more examples like button package has extensive story examples -->
<!-- TODO: Ensure API documentation is complete and matches the actual component interface -->

# Header

## Description

The `<sp-header>` element provides a consistent page header structure with flexible configuration for both L1 (top-level) and L2 (sub-page) layouts. It supports customizable title/subtitle content, action buttons, status indicators, and an optional editable title flow.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/header?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/header)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/header?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/header)

```bash
yarn add @spectrum-web-components/header
```

Import the side effectful registration of `<sp-header>` via:

```js
import '@spectrum-web-components/header/sp-header.js';
```

When looking to leverage the `Header` base class as a type and/or for extension purposes, do so via:

```js
import { Header } from '@spectrum-web-components/header';
```

## Variants

### L1 Header (Top-level)

L1 headers are designed for top-level pages like Dashboard, Projects, or Settings. They feature a prominent title, optional subtitle, and action areas.

```html
<sp-header variant="l1" title="Dashboard" subtitle="Welcome to your workspace">
    <sp-action-button slot="start-actions" quiet>
        <sp-icon-settings slot="icon"></sp-icon-settings>
        Settings
    </sp-action-button>
    <sp-button slot="end-actions" variant="accent">Create Project</sp-button>
</sp-header>
```

### L2 Header (Sub-page)

L2 headers are for sub-pages and include navigation elements like back buttons, status indicators, and optional title editing.

```html
<sp-header variant="l2" title="Project Settings" show-back editable-title>
    <sp-action-button slot="middle-actions" quiet>
        <sp-icon-star slot="icon"></sp-icon-star>
        Favorite
    </sp-action-button>
    <sp-button slot="end-actions" variant="accent">Save Changes</sp-button>
    <sp-badge slot="status" variant="positive">Published</sp-badge>
    <span slot="status">Last saved: 2 minutes ago</span>
</sp-header>
```

## Editable Title

L2 headers support editable titles with built-in validation:

```html
<sp-header
    variant="l2"
    title="Editable Project Name"
    editable-title
    .titleValidation="${(value)"
    =""
>
    { if (value.length > 50) { return [{ type: 'length', message: 'Title must be
    50 characters or less' }]; } return null; }}
    @sp-header-edit-save=${handleTitleSave} >
</sp-header>
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-header size="s" title="Small Header">
    <sp-button slot="end-actions">Action</sp-button>
</sp-header>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-header size="m" title="Medium Header">
    <sp-button slot="end-actions">Action</sp-button>
</sp-header>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-header size="l" title="Large Header">
    <sp-button slot="end-actions">Action</sp-button>
</sp-header>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-header size="xl" title="Extra Large Header">
    <sp-button slot="end-actions">Action</sp-button>
</sp-header>
```

</sp-tab-panel>
</sp-tabs>

## Slots

| Slot Name        | Description                  | L1 Support | L2 Support |
| ---------------- | ---------------------------- | ---------- | ---------- |
| `title`          | Main title content           | ✅         | ✅         |
| `subtitle`       | Subtitle content             | ✅         | ❌         |
| `start-actions`  | Action buttons at the start  | ✅         | ✅         |
| `middle-actions` | Action buttons in the middle | ❌         | ✅         |
| `end-actions`    | Action buttons at the end    | ✅         | ✅         |
| `status`         | Status indicators and badges | ❌         | ✅         |

### Action Slot Limitations

- **L1 Header**: Maximum **2 action slots** (start-actions, end-actions)
- **L2 Header**: Maximum **3 action slots** (start-actions, middle-actions, end-actions)
- Each slot can contain multiple action buttons
- Visual dividers between action slots are available for L2 headers only

## Events

| Event Name              | Description                             | Detail                                   |
| ----------------------- | --------------------------------------- | ---------------------------------------- |
| `sp-header-back`        | Dispatched when back button is clicked  | `undefined`                              |
| `sp-header-edit-start`  | Dispatched when edit mode starts        | `{ currentTitle: string }`               |
| `sp-header-edit-save`   | Dispatched when title edit is saved     | `{ newTitle: string, oldTitle: string }` |
| `sp-header-edit-cancel` | Dispatched when title edit is cancelled | `undefined`                              |

## Properties

| Property          | Attribute        | Type                        | Default | Description                           |
| ----------------- | ---------------- | --------------------------- | ------- | ------------------------------------- |
| `variant`         | `variant`        | `'l1' \| 'l2'`              | `'l1'`  | Header variant                        |
| `title`           | `title`          | `string`                    | `''`    | Main title text                       |
| `subtitle`        | `subtitle`       | `string`                    | `''`    | Subtitle text (L1 only)               |
| `editableTitle`   | `editable-title` | `boolean`                   | `false` | Whether title can be edited (L2 only) |
| `showBack`        | `show-back`      | `boolean`                   | `false` | Show back button (L2 only)            |
| `disableBack`     | `disable-back`   | `boolean`                   | `false` | Disable back button                   |
| `size`            | `size`           | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'`   | Size of the header                    |
| `titleValidation` | -                | `HeaderValidationCallback`  | -       | Custom validation function            |

## Accessibility

The header component follows Spectrum accessibility guidelines:

- Proper heading levels (h1 for L1, h2 for L2)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management during edit mode
- High contrast mode support

## Examples

### Basic L1 Header

```html
<sp-header variant="l1" title="My Application">
    <sp-button slot="end-actions" variant="accent">Get Started</sp-button>
</sp-header>
```

### L2 Header with All Features

```html
<sp-header
    variant="l2"
    title="Advanced Settings"
    show-back
    editable-title
    @sp-header-back="${()"
    =""
>
    router.back()} @sp-header-edit-save=${handleSave} >
    <sp-action-button slot="start-actions" quiet>Help</sp-action-button>
    <sp-action-button slot="middle-actions" quiet>Bookmark</sp-action-button>
    <sp-button slot="end-actions" variant="accent">Save</sp-button>
    <sp-button slot="end-actions">Cancel</sp-button>

    <sp-badge slot="status" variant="notice">Pending Review</sp-badge>
    <span slot="status">Modified 5 minutes ago</span>
</sp-header>
```

## Development Status

🚧 **This component is currently in development** 🚧

- ✅ Basic structure and L1/L2 variants
- ✅ Editable title functionality
- ✅ Action slots and status indicators
- ✅ FocusVisiblePolyfillMixin integration
- ✅ Variant validation with dev mode warnings
- ✅ Property validation (maxTitleLength)
- ✅ Basic error handling for DOM operations
- ⏳ Overflow handling (in progress)
- ⏳ Comprehensive testing suite
- ⏳ Accessibility improvements

For the latest development progress, see [HEADER_DEVELOPMENT.md](./HEADER_DEVELOPMENT.md).

## 🚧 Open Design Decisions & Required Input

The following features and improvements need design decisions and user input before implementation:

### 🎨 **Component Architecture Decisions**

#### 1. **Size Variants**

Should the Header component support size variants like Button does (`s`, `m`, `l`, `xl`)?

- **Current**: No size variants implemented
- **Option A**: Add size variants with different paddings and font sizes
- **Option B**: Keep header size consistent across the system
- **Decision needed**: Product/Design team input required

#### 2. **Static Color Variants**

Should headers support static color variants for different background contexts?

- **Current**: No static color support
- **Option A**: Add `static-color="white"` and `static-color="black"` like Button
- **Option B**: Handle theming through CSS custom properties only
- **Decision needed**: Design system requirements

#### 3. **Pending State Management**

Should headers support async operation states like Button's PendingStateController?

- **Current**: Basic saving state for title editing only
- **Option A**: Add comprehensive pending state for all async operations
- **Option B**: Keep minimal state management
- **Use cases**: Title saving, back navigation, action button operations
- **Decision needed**: UX requirements for loading states

### ⚡ **Performance & UX Optimizations**

#### 4. **Debouncing Configuration**

Which operations should be debounced and with what timing?

- **Validation**: Real-time title validation (suggested: 300ms)
- **Resize operations**: Action overflow calculations (suggested: 100ms)
- **Slot changes**: Re-render triggers (suggested: 50ms)
- **Decision needed**: Performance requirements and user experience preferences

#### 5. **Animation Support**

What animations should be supported for state transitions?

- **Action overflow**: Slide/fade animations when actions move to overflow
- **Edit mode**: Smooth transitions between static and editable title
- **Toast notifications**: Entry/exit animations
- **Validation errors**: Error state animations
- **Decision needed**: Animation library choice and performance budget

#### 6. **Configuration Options**

Which layout parameters should be configurable?

- **Gap values**: Spacing between header elements (current: 12px hardcoded)
- **Overflow behavior**: When to start moving actions to overflow menu
- **Overflow menu width**: Reserved space for overflow button (current: 40px)
- **Decision needed**: Design flexibility vs. consistency requirements

### 🎭 **Toast & Notification Systems**

#### 7. **Toast Types & Positioning**

Should headers support different toast notification types?

- **Current**: Success toast only for title rename
- **Proposed types**: `success`, `error`, `warning`, `info`
- **Positioning**: Fixed position vs. header-relative
- **Stacking**: Multiple toast management
- **Auto-dismiss timing**: Configurable timeouts
- **Decision needed**: Notification system architecture

### 🧪 **Testing Strategy Decisions**

#### 8. **Visual Regression Testing Scope**

Which visual scenarios should be covered by VRT?

- **All size variants** (if implemented)
- **All color variants** (if implemented)
- **Overflow states** at different viewport sizes
- **Edit mode transitions**
- **Error states** and validation displays
- **Decision needed**: Testing infrastructure and maintenance budget

#### 9. **Accessibility Testing Depth**

What level of accessibility testing is required?

- **Screen reader compatibility**: Full narrative flow testing
- **Keyboard navigation**: Complex interaction sequences
- **High contrast mode**: All state combinations
- **Motion preferences**: Animation respect testing
- **Decision needed**: Accessibility compliance level (WCAG AA vs AAA)

### 📱 **Responsive Behavior**

#### 10. **Mobile/Touch Optimizations**

How should headers behave on mobile devices?

- **Touch targets**: Minimum sizes for action buttons
- **Swipe gestures**: Back navigation support
- **Viewport handling**: Responsive typography and spacing
- **Orientation changes**: Layout adaptations
- **Decision needed**: Mobile-first design requirements

### 🔧 **Developer Experience**

#### 11. **Helper Functions & Utilities**

What developer utilities should be provided?

- **Validation helpers**: Pre-built validation functions
- **Event helpers**: Simplified event handling patterns
- **Layout utilities**: Responsive layout calculation helpers
- **Testing utilities**: Component testing helpers
- **Decision needed**: DX priorities and maintenance scope

### 📋 **Implementation Priority**

Please review these decisions and provide input on:

1. **High Priority** (affects core functionality):

    - Size variants (#1)
    - Pending state management (#3)
    - Toast types (#7)

2. **Medium Priority** (affects user experience):

    - Animation support (#5)
    - Debouncing configuration (#4)
    - Mobile optimizations (#10)

3. **Low Priority** (nice to have):
    - Static color variants (#2)
    - Configuration options (#6)
    - Helper functions (#11)

---

_Once decisions are made on these items, implementation can proceed with the remaining TODO items in the codebase._
