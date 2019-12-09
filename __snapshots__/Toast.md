# `Toast`

#### `loads`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<div class="body">
    <div class="content">
        <slot></slot>
    </div>
    <slot name="action"></slot>
</div>
<div class="buttons">
    <sp-clear-button
        data-js-focus-visible=""
        label="Close"
        tabindex="0"
        variant="overBackground"
    ></sp-clear-button>
</div>
```

#### `loads - [variant="negative"]`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<sp-icon class="type" label="Error" name="ui:AlertSmall" size="s"></sp-icon>
<div class="body">
    <div class="content">
        <slot></slot>
    </div>
    <slot name="action"></slot>
</div>
<div class="buttons">
    <sp-clear-button
        data-js-focus-visible=""
        label="Close"
        tabindex="0"
        variant="overBackground"
    ></sp-clear-button>
</div>
```

#### `loads - [variant="positive"]`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<sp-icon class="type" label="Success" name="ui:SuccessSmall" size="s"></sp-icon>
<div class="body">
    <div class="content">
        <slot></slot>
    </div>
    <slot name="action"></slot>
</div>
<div class="buttons">
    <sp-clear-button
        data-js-focus-visible=""
        label="Close"
        tabindex="0"
        variant="overBackground"
    ></sp-clear-button>
</div>
```

#### `loads - [variant="info"]`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<sp-icon
    class="type"
    label="Information"
    name="ui:InfoSmall"
    size="s"
></sp-icon>
<div class="body">
    <div class="content">
        <slot></slot>
    </div>
    <slot name="action"></slot>
</div>
<div class="buttons">
    <sp-clear-button
        data-js-focus-visible=""
        label="Close"
        tabindex="0"
        variant="overBackground"
    ></sp-clear-button>
</div>
```

#### `loads - [variant="error"]`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<sp-icon class="type" label="Error" name="ui:AlertSmall" size="s"></sp-icon>
<div class="body">
    <div class="content">
        <slot></slot>
    </div>
    <slot name="action"></slot>
</div>
<div class="buttons">
    <sp-clear-button
        data-js-focus-visible=""
        label="Close"
        tabindex="0"
        variant="overBackground"
    ></sp-clear-button>
</div>
```

#### `loads - [variant="warning"]`

```html
<sp-icons-medium style="display: none;"></sp-icons-medium>
<sp-icon class="type" label="Error" name="ui:AlertSmall" size="s"></sp-icon>
<div class="body">
    <div class="content">
        <slot></slot>
    </div>
    <slot name="action"></slot>
</div>
<div class="buttons">
    <sp-clear-button
        data-js-focus-visible=""
        label="Close"
        tabindex="0"
        variant="overBackground"
    ></sp-clear-button>
</div>
```
