# `card`

#### `loads`

```html
<slot id="cover-photo" name="cover-photo"></slot>
<div id="body">
    <div id="header">
        <div id="title">
            <slot name="title">
                Card Title
            </slot>
        </div>
    </div>
    <div id="content">
        <div id="subtitle">
            JPG
        </div>
    </div>
</div>
<div id="footer">
    <slot name="footer"></slot>
</div>
```

#### `loads - [quiet]`

```html
<slot name="preview"></slot>
<div id="body">
    <div id="header">
        <div id="title">
            <slot name="title">
                Card Title
            </slot>
        </div>
    </div>
    <div id="content">
        <div id="subtitle">
            JPG
        </div>
        <slot name="description"></slot>
    </div>
</div>
```

#### `loads - [gallery]`

```html
<slot name="preview"></slot>
<div id="body">
    <div id="header">
        <div id="title">
            <slot name="title">
                Card Title
            </slot>
        </div>
        <div id="subtitle">
            JPG
        </div>
        <slot name="description"></slot>
    </div>
</div>
```
