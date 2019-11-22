# `Search`

#### `loads`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<form id="form">
    <input aria-label="Search" id="input" placeholder="Search" />
    <sp-icon
        class="icon magnifier"
        id="icon"
        name="ui:Magnifier"
        size="s"
    ></sp-icon>
</form>
```

#### `can be cleared`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<form id="form">
    <input aria-label="Search" id="input" placeholder="Search" />
    <sp-icon
        class="icon magnifier"
        id="icon"
        name="ui:Magnifier"
        size="s"
    ></sp-icon>
    <sp-clear-button
        data-js-focus-visible=""
        id="button"
        label="Reset"
        tabindex="0"
        variant=""
    ></sp-clear-button>
</form>
```
