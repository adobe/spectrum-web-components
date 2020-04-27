# `Button`

#### `loads default`

```html
<button
  id="button"
  tabindex="0"
>
  <div id="label">
    <slot id="slot">
    </slot>
  </div>
</button>

```

#### `loads default w/ element content`

```html
<button
  id="button"
  tabindex="0"
>
  <div id="label">
    <slot id="slot">
    </slot>
  </div>
</button>

```

#### `loads default w/ an icon`

```html
<button
  id="button"
  tabindex="0"
>
  <slot name="icon">
  </slot>
  <div id="label">
    <slot id="slot">
    </slot>
  </div>
</button>

```

#### `loads default only icon`

```html
<button
  id="button"
  tabindex="0"
>
  <slot name="icon">
  </slot>
  <div
    hidden=""
    id="label"
  >
    <slot id="slot">
    </slot>
  </div>
</button>

```

#### `loads default w/ an icon on the right`

```html
<button
  id="button"
  tabindex="0"
>
  <div id="label">
    <slot id="slot">
    </slot>
  </div>
  <slot name="icon">
  </slot>
</button>

```

#### `loads with href`

```html
<a
  href="test_url"
  id="button"
  tabindex="0"
>
  <div id="label">
    <slot id="slot">
    </slot>
  </div>
</a>

```

#### `loads with href and target`

```html
<a
  href="test_url"
  id="button"
  tabindex="0"
  target="_blank"
>
  <div id="label">
    <slot id="slot">
    </slot>
  </div>
</a>

```

