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
- ⏳ Overflow handling (in progress)
- ⏳ Comprehensive testing suite
- ⏳ Accessibility improvements

For the latest development progress, see [HEADER_DEVELOPMENT.md](./HEADER_DEVELOPMENT.md).
