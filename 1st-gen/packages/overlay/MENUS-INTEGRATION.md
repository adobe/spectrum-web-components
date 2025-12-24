# Menus integration

This guide covers integrating overlays with menus for action menus, dropdown menus, context menus, and picker components.

## Table of contents

- [Action menus](#action-menus)
- [Dropdown menus](#dropdown-menus)
- [Context menus](#context-menus)
- [Split button menus](#split-button-menus)
- [Nested menus](#nested-menus)
- [Menu keyboard navigation](#menu-keyboard-navigation)

## Action menus

Action menus provide a list of actions that can be performed on an item or selection.

### Basic action menu

```html
<sp-action-button id="actions-btn">
    Actions
    <sp-icon-more slot="icon"></sp-icon-more>
</sp-action-button>

<sp-overlay trigger="actions-btn@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu id="actions-menu">
            <sp-menu-item>Copy</sp-menu-item>
            <sp-menu-item>Paste</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Delete</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<script>
    const menu = document.querySelector('#actions-menu');

    menu.addEventListener('change', (e) => {
        const selected = e.target.selectedItems[0];
        console.log('Selected action:', selected.textContent);

        // Perform action based on selection
        switch (selected.textContent) {
            case 'Copy':
                // Handle copy
                break;
            case 'Paste':
                // Handle paste
                break;
            case 'Delete':
                // Handle delete
                break;
        }
    });
</script>
```

### Action menu with icons

Add icons to menu items for better visual clarity:

```html
<sp-overlay trigger="actions-btn@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu>
            <sp-menu-item>
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item>
                <sp-icon-paste slot="icon"></sp-icon-paste>
                Paste
            </sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

### Action menu with disabled items

Disable items based on current state:

```javascript
const menu = document.querySelector('#actions-menu');
const clipboard = navigator.clipboard;

// Disable paste if clipboard is empty
clipboard.readText().then((text) => {
    const pasteItem = menu.querySelector('[value="paste"]');
    pasteItem.disabled = !text;
});

// Disable delete if nothing selected
const deleteItem = menu.querySelector('[value="delete"]');
const selectedItems = getSelectedItems();
deleteItem.disabled = selectedItems.length === 0;
```

## Dropdown menus

Dropdown menus for navigation or selection.

### Navigation dropdown

```html
<sp-button id="nav-menu-btn">
    Products
    <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
</sp-button>

<sp-overlay trigger="nav-menu-btn@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu>
            <sp-menu-item href="/products/desktop">Desktop</sp-menu-item>
            <sp-menu-item href="/products/mobile">Mobile</sp-menu-item>
            <sp-menu-item href="/products/web">Web</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

### Selection dropdown with current value

Show currently selected value in button:

```html
<sp-button id="sort-btn">
    <span id="sort-label">Sort by: Name</span>
    <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
</sp-button>

<sp-overlay trigger="sort-btn@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu id="sort-menu" selects="single">
            <sp-menu-item value="name" selected>Name</sp-menu-item>
            <sp-menu-item value="date">Date</sp-menu-item>
            <sp-menu-item value="size">Size</sp-menu-item>
            <sp-menu-item value="type">Type</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<script>
    const sortLabel = document.querySelector('#sort-label');
    const sortMenu = document.querySelector('#sort-menu');

    sortMenu.addEventListener('change', (e) => {
        const selected = e.target.selectedItems[0];
        sortLabel.textContent = `Sort by: ${selected.textContent}`;

        // Apply sorting
        applySorting(selected.value);
    });
</script>
```

### Multi-select dropdown

Allow multiple selections:

```html
<sp-button id="filter-btn">
    <span id="filter-label">Filters</span>
    <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
</sp-button>

<sp-overlay trigger="filter-btn@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu id="filter-menu" selects="multiple">
            <sp-menu-item value="active">Active</sp-menu-item>
            <sp-menu-item value="pending">Pending</sp-menu-item>
            <sp-menu-item value="completed">Completed</sp-menu-item>
            <sp-menu-item value="archived">Archived</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<script>
    const filterLabel = document.querySelector('#filter-label');
    const filterMenu = document.querySelector('#filter-menu');

    filterMenu.addEventListener('change', (e) => {
        const selected = e.target.selectedItems;
        const count = selected.length;

        if (count === 0) {
            filterLabel.textContent = 'Filters';
        } else {
            filterLabel.textContent = `Filters (${count})`;
        }

        // Apply filters
        const filterValues = Array.from(selected).map((item) => item.value);
        applyFilters(filterValues);
    });
</script>
```

## Context menus

Context menus triggered by right-click using VirtualTrigger.

### Basic context menu

```html
<div id="content-area" style="height: 200px; border: 1px solid #ccc;">
    Right-click anywhere in this area
</div>

<sp-overlay id="context-menu" type="auto" placement="right-start">
    <sp-popover>
        <sp-menu>
            <sp-menu-item>Cut</sp-menu-item>
            <sp-menu-item>Copy</sp-menu-item>
            <sp-menu-item>Paste</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Delete</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<script>
    import { VirtualTrigger } from '@spectrum-web-components/overlay';

    const contentArea = document.querySelector('#content-area');
    const contextMenu = document.querySelector('#context-menu');

    contentArea.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        // Create virtual trigger at mouse position
        const trigger = new VirtualTrigger(event.clientX, event.clientY);
        contextMenu.triggerElement = trigger;
        contextMenu.open = true;
    });
</script>
```

### Context menu with dynamic items

Generate menu items based on what was clicked:

```javascript
contentArea.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    const clickedElement = event.target;
    const menu = contextMenu.querySelector('sp-menu');

    // Clear existing items
    menu.innerHTML = '';

    // Add items based on context
    if (clickedElement.matches('img')) {
        menu.innerHTML = `
      <sp-menu-item>Save Image</sp-menu-item>
      <sp-menu-item>Copy Image</sp-menu-item>
      <sp-menu-item>View Full Size</sp-menu-item>
    `;
    } else if (clickedElement.matches('a')) {
        menu.innerHTML = `
      <sp-menu-item>Open Link</sp-menu-item>
      <sp-menu-item>Copy Link</sp-menu-item>
      <sp-menu-item>Open in New Tab</sp-menu-item>
    `;
    } else {
        menu.innerHTML = `
      <sp-menu-item>Cut</sp-menu-item>
      <sp-menu-item>Copy</sp-menu-item>
      <sp-menu-item>Paste</sp-menu-item>
    `;
    }

    // Position and open
    const trigger = new VirtualTrigger(event.clientX, event.clientY);
    contextMenu.triggerElement = trigger;
    contextMenu.open = true;
});
```

### Context menu for table rows

```html
<table id="data-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr data-id="1">
            <td>Item 1</td>
            <td>Active</td>
            <td></td>
        </tr>
        <tr data-id="2">
            <td>Item 2</td>
            <td>Pending</td>
            <td></td>
        </tr>
    </tbody>
</table>

<sp-overlay id="row-context-menu" type="auto">
    <sp-popover>
        <sp-menu id="row-menu">
            <sp-menu-item value="edit">Edit</sp-menu-item>
            <sp-menu-item value="duplicate">Duplicate</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item value="delete">Delete</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<script>
    import { VirtualTrigger } from '@spectrum-web-components/overlay';

    const table = document.querySelector('#data-table tbody');
    const contextMenu = document.querySelector('#row-context-menu');
    const rowMenu = document.querySelector('#row-menu');
    let currentRow = null;

    table.addEventListener('contextmenu', (event) => {
        const row = event.target.closest('tr');
        if (!row) return;

        event.preventDefault();
        currentRow = row;

        const trigger = new VirtualTrigger(event.clientX, event.clientY);
        contextMenu.triggerElement = trigger;
        contextMenu.open = true;
    });

    rowMenu.addEventListener('change', (e) => {
        if (!currentRow) return;

        const action = e.target.selectedItems[0].value;
        const itemId = currentRow.dataset.id;

        switch (action) {
            case 'edit':
                editItem(itemId);
                break;
            case 'duplicate':
                duplicateItem(itemId);
                break;
            case 'delete':
                deleteItem(itemId);
                break;
        }
    });
</script>
```

## Split button menus

Combine a primary action with additional options.

### Basic split button

```html
<div style="display: flex; gap: 0;">
    <sp-button variant="accent" id="save-btn">Save</sp-button>
    <sp-action-button
        variant="accent"
        id="save-options-btn"
        style="border-left: 1px solid rgba(255,255,255,0.3);"
    >
        <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
    </sp-action-button>
</div>

<sp-overlay trigger="save-options-btn@click" type="auto" placement="bottom-end">
    <sp-popover>
        <sp-menu id="save-menu">
            <sp-menu-item value="save-copy">Save as Copy</sp-menu-item>
            <sp-menu-item value="save-template">Save as Template</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item value="save-exit">Save and Exit</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<script>
    const saveBtn = document.querySelector('#save-btn');
    const saveMenu = document.querySelector('#save-menu');

    saveBtn.addEventListener('click', () => {
        // Primary save action
        save();
    });

    saveMenu.addEventListener('change', (e) => {
        const action = e.target.selectedItems[0].value;

        switch (action) {
            case 'save-copy':
                saveAsCopy();
                break;
            case 'save-template':
                saveAsTemplate();
                break;
            case 'save-exit':
                save().then(() => exit());
                break;
        }
    });
</script>
```

## Nested menus

Create submenus for hierarchical options.

### Basic nested menu

```html
<sp-overlay trigger="actions-btn@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu>
            <sp-menu-item>Copy</sp-menu-item>
            <sp-menu-item>Paste</sp-menu-item>

            <sp-menu-item id="export-trigger">
                Export
                <sp-icon-chevron-right slot="icon"></sp-icon-chevron-right>
            </sp-menu-item>

            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Delete</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<!-- Submenu -->
<sp-overlay
    trigger="export-trigger@hover"
    type="auto"
    placement="right-start"
    delayed
>
    <sp-popover>
        <sp-menu>
            <sp-menu-item value="export-pdf">Export as PDF</sp-menu-item>
            <sp-menu-item value="export-png">Export as PNG</sp-menu-item>
            <sp-menu-item value="export-svg">Export as SVG</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

### Multi-level nested menus

```html
<sp-menu id="main-menu">
    <sp-menu-item>New</sp-menu-item>
    <sp-menu-item>Open</sp-menu-item>

    <sp-menu-item id="recent-trigger">
        Open Recent
        <sp-icon-chevron-right slot="icon"></sp-icon-chevron-right>
    </sp-menu-item>
</sp-menu>

<!-- Level 2: Recent files -->
<sp-overlay trigger="recent-trigger@hover" type="auto" placement="right-start">
    <sp-popover>
        <sp-menu>
            <sp-menu-item>Document 1.txt</sp-menu-item>
            <sp-menu-item>Document 2.txt</sp-menu-item>

            <sp-menu-item id="more-trigger">
                More...
                <sp-icon-chevron-right slot="icon"></sp-icon-chevron-right>
            </sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<!-- Level 3: More files -->
<sp-overlay trigger="more-trigger@hover" type="auto" placement="right-start">
    <sp-popover>
        <sp-menu>
            <sp-menu-item>Document 3.txt</sp-menu-item>
            <sp-menu-item>Document 4.txt</sp-menu-item>
            <sp-menu-item>Document 5.txt</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

## Menu keyboard navigation

### Standard keyboard support

Menus support standard keyboard navigation:

- **Arrow Up/Down** - Navigate menu items
- **Home** - First item
- **End** - Last item
- **Enter/Space** - Select item
- **ESC** - Close menu
- **Tab** - Move to next focusable element (closes menu)

### Type-ahead search

Add type-ahead search to menus:

```javascript
const menu = document.querySelector('#actions-menu');
let searchTerm = '';
let searchTimeout;

menu.addEventListener('keydown', (e) => {
    // Ignore special keys
    if (e.key.length > 1) return;

    // Add character to search term
    searchTerm += e.key.toLowerCase();

    // Find matching item
    const items = Array.from(menu.querySelectorAll('sp-menu-item'));
    const match = items.find((item) =>
        item.textContent.toLowerCase().startsWith(searchTerm)
    );

    if (match) {
        // Focus the matching item
        match.focus();
    }

    // Clear search term after 500ms
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchTerm = '';
    }, 500);
});
```

### Custom keyboard shortcuts

Add keyboard shortcuts to menu items:

```html
<sp-menu>
    <sp-menu-item value="copy">
        Copy
        <span slot="value">Ctrl+C</span>
    </sp-menu-item>
    <sp-menu-item value="paste">
        Paste
        <span slot="value">Ctrl+V</span>
    </sp-menu-item>
    <sp-menu-item value="delete">
        Delete
        <span slot="value">Del</span>
    </sp-menu-item>
</sp-menu>

<script>
    // Handle keyboard shortcuts globally
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            performCopy();
        } else if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            performPaste();
        } else if (e.key === 'Delete') {
            e.preventDefault();
            performDelete();
        }
    });
</script>
```

## Performance optimization

### Shared menu overlay

For tables with many rows, share a single menu overlay:

```javascript
const sharedMenu = document.querySelector('#shared-context-menu');
const table = document.querySelector('#data-table');
let currentRowId = null;

table.addEventListener('contextmenu', (event) => {
    const row = event.target.closest('tr');
    if (!row) return;

    event.preventDefault();
    currentRowId = row.dataset.id;

    // Update menu items based on row data
    updateMenuForRow(currentRowId);

    // Position and open
    const trigger = new VirtualTrigger(event.clientX, event.clientY);
    sharedMenu.triggerElement = trigger;
    sharedMenu.open = true;
});
```

### Lazy menu loading

Load menu items only when needed:

```javascript
import { removeSlottableRequest } from '@spectrum-web-components/overlay';

menuOverlay.addEventListener('slottable-request', async (event) => {
    if (event.data === removeSlottableRequest) {
        menuOverlay.innerHTML = '';
        return;
    }

    // Load menu items from API
    const items = await fetchMenuItems();

    menuOverlay.innerHTML = `
    <sp-popover>
      <sp-menu>
        ${items
            .map(
                (item) => `
          <sp-menu-item value="${item.id}">${item.label}</sp-menu-item>
        `
            )
            .join('')}
      </sp-menu>
    </sp-popover>
  `;
});
```

## See also

- [README.md](./README.md) - Overlay system overview
- [imperative-api.md](./imperative-api.md) - VirtualTrigger for context menus
- [PERFORMANCE.md](./PERFORMANCE.md) - Optimization strategies
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Keyboard and screen reader support
