# Menu Divider migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Menu .spectrum-Menu-divider`
- `.spectrum-Menu .spectrum-Menu-divider.spectrum-Divider--sizeS`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-menu-section-divider-margin-block`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `size` (string: 's', 'm', 'l') - inherited from SizedMixin

</details>

<details>
<summary>Slots</summary>

None found for this component.

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-menu-divider role="separator" size="m"></sp-menu-divider>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<li class="spectrum-Divider spectrum-Divider--sizeS spectrum-Menu-divider"></li>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<li class="spectrum-Divider spectrum-Divider--sizeS spectrum-Menu-divider"></li>
```

</details>

### CSS => SWC mapping

| CSS selector                              | Attribute or slot                | Status      |
| ----------------------------------------- | -------------------------------- | ----------- |
| `.spectrum-Menu-divider`                  | Menu divider element             | Implemented |
| `.spectrum-Divider--sizeS`                | `size="s"`                       | Implemented |
| `.spectrum-Divider--sizeM`                | `size="m"`                       | Implemented |
| `.spectrum-Divider--sizeL`                | `size="l"`                       | Implemented |
| `--mod-menu-section-divider-margin-block` | CSS modifier for divider spacing | Implemented |

## Summary of changes

### CSS => SWC implementation gaps

No implementation gaps found. The menu divider component has complete feature parity between CSS and Web Components implementations. All size variants are supported, and the component properly implements the separator role for accessibility.

### CSS Spectrum 2 changes

The CSS template files are identical between the `main` and `spectrum-two` branches. No structural changes were detected in the DOM between legacy and Spectrum 2 implementations for menu dividers. Both branches use the same HTML structure with the divider rendered as a `<li>` element with appropriate CSS classes.

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
