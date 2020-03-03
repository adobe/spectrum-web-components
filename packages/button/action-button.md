## Description

An `<sp-action-button>` represents an action a user can take.

### Installation

```
npm install @spectrum-web-components/button

# or

yarn add @spectrum-web-components/button
```

## Example

```html demo
<sp-action-button>
    Do action
</sp-action-button>
<sp-action-button selected>
    Do action
</sp-action-button>
<sp-action-button disabled>
    Do action
</sp-action-button>
```

## Variants

### Action button with icon

```html demo
<sp-action-button>
    <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
        <path
            d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
        ></path>
    </svg>
    This is an action button
</sp-action-button>
```

### Icon only action button

```html demo
<sp-action-button>
    <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
        <path
            d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
        ></path>
    </svg>
</sp-action-button>
```
