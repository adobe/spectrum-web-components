# @adobe/postcss-token

This package provides a PostCSS plugin that enables the use of a `token()` function in CSS, allowing authors to reference Spectrum design tokens by name.

It is intended for use alongside `@adobe/swc-tokens`, which supplies the processed token data and resolution logic.

## Overview

`@adobe/postcss-token` allows CSS such as:

```css
.spectrum-Button {
    background-color: token('accent-background-color-default');
}
```

to be transformed at build time into valid CSS values:

```css
.spectrum-Button {
    background-color: var(--swc-accent-background-color-default);
}
```

The plugin resolves token references using the exported `lookupToken()` function from `@adobe/swc-tokens`.

## Responsibilities

This package is intentionally **narrow in scope**.

### What This Plugin Does

- Parses `token('…')` function calls in CSS
- Replaces them with resolved token values from `@adobe/swc-tokens`
- Works in:
    - Property values
    - Nested functions
    - Fallback expressions (e.g. inside `var()`)
- Fails fast when a referenced token does not exist

### What This Plugin Does _Not_ Do

- ❌ Does not read or parse token JSON files
- ❌ Does not resolve aliases
- ❌ Does not understand token sets (light/dark, scale sets, etc.)
- ❌ Does not apply theming or runtime logic
- ❌ Does not generate CSS custom properties

All of the above are handled by `@adobe/swc-tokens`.

## Relationship to `@adobe/swc-tokens`

```mermaid
flowchart LR
    A[Design Token Data] --> B[@adobe/swc-tokens]
    B -->|lookupToken()| C[@adobe/postcss-token]
    C --> D[Final CSS Output]
```

## Usage

### Installation

```bash
npm install @adobe/postcss-token
```

### PostCSS Configuration

```js
import postcss from 'postcss';
import postcssToken from '@adobe/postcss-token';

export default {
    plugins: [
        postcssToken({
            prefix: 'swc',
        }),
    ],
};
```

## Supported Patterns

### Basic Token Replacement

```css
color: token('black');
```

⬇

```css
color: rgb(0 0 0);
```

### Composite Tokens

```css
color: token('gray-700');
```

⬇

```css
color: var(--swc-gray-700);
```

### Nested and Fallback Usage

```css
min-height: var(--swc-button-height, token('component-height-100'));
```

⬇

```css
min-height: var(--swc-button-height, var(--swc-component-height-100));
```

## Error Handling

If a token cannot be found, the plugin throws an error during the PostCSS transform:

```css
color: token('not-a-real-token');
```

```
Error: token() not found: 'not-a-real-token'
```

## Plugin Options

### `prefix`

**Required** to match prefix provided to `@adobe/swc-tokens` in order to correctly reference custom properties from the token stylesheet.

## Testing

Tests are written using [Vitest](https://vitest.dev/) and are located in `./tests`.

```bash
yarn test
yarn test:watch
```
