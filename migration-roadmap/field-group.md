# Field Group migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-FieldGroup`
- `.spectrum-FieldGroup--horizontal .spectrum-FieldGroupInputLayout`
- `.spectrum-FieldGroup--horizontal .spectrum-FieldGroupInputLayout .spectrum-FieldGroup-item:not(:last-child)`
- `.spectrum-FieldGroup--horizontal .spectrum-FieldGroupInputLayout .spectrum-HelpText`
- `.spectrum-FieldGroup--sidelabel`
- `.spectrum-FieldGroup--toplabel`
- `.spectrum-FieldGroup--vertical .spectrum-FieldGroupInputLayout`
- `.spectrum-FieldGroupInputLayout`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

None found for this component.

</details>

### SWC

<details>
<summary>Attributes</summary>

- `horizontal` - Boolean attribute for horizontal layout orientation
- `invalid` - Boolean attribute for invalid state to show negative help text

</details>

<details>
<summary>Slots</summary>

- Default slot - The form controls that make up the group
- `help-text` - Default or non-negative help text to associate to your form element
- `negative-help-text` - Negative help text to associate to your form element when `invalid`

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<div class="group" role="presentation">
    <slot @slotchange="handleSlotchange"></slot>
</div>
<!-- Help text rendered via renderHelpText() method -->
<sp-help-text slot="help-text" variant="neutral" icon id="help-text-id">
    Help text content
</sp-help-text>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-FieldGroup spectrum-FieldGroup--vertical spectrum-FieldGroup--toplabel"
    role="radiogroup"
    aria-labelledby="group-label-cg6lg"
>
    <label
        class=" spectrum-FieldLabel spectrum-FieldLabel--sizeM spectrum-FieldLabel--top "
        style=""
        id="group-label-cg6lg"
    >
        Field group label
    </label>
    <div class="spectrum-FieldGroupInputLayout">
        <div
            class=" spectrum-Radio spectrum-Radio--sizeM spectrum-FieldGroup-item "
            style=""
        >
            <input
                type="radio"
                name="field-group-example-spectrum-ctk9m"
                class="spectrum-Radio-input"
                id="radio-9ossr-input"
            />
            <span
                class="spectrum-Radio-button spectrum-Radio-button--sizeS"
            ></span>
            <label
                class="spectrum-Radio-label spectrum-Radio-label--sizeS"
                for="radio-9ossr-input"
            >
                Apples are best
            </label>
        </div>
        <div
            class=" spectrum-Radio spectrum-Radio--sizeM spectrum-FieldGroup-item "
            style=""
        >
            <!-- radio component internals -->
        </div>
        <div
            class=" spectrum-Radio spectrum-Radio--sizeM spectrum-FieldGroup-item "
            style=""
        >
            <!-- radio component internals -->
        </div>

        <div
            class=" spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral "
            style=""
            id="helptext-l2iu5"
        >
            <div class="spectrum-HelpText-text">Select an option.</div>
        </div>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-FieldGroup spectrum-FieldGroup--vertical spectrum-FieldGroup--toplabel"
    role="radiogroup"
    aria-labelledby="group-label-cg6lg"
>
    <label
        class=" spectrum-FieldLabel spectrum-FieldLabel--sizeM spectrum-FieldLabel--top "
        style=""
        id="group-label-cg6lg"
    >
        Field group label
    </label>
    <div class="spectrum-FieldGroupInputLayout">
        <div
            class=" spectrum-Radio spectrum-Radio--sizeM spectrum-FieldGroup-item "
            style=""
        >
            <input
                type="radio"
                name="field-group-example-spectrum-ctk9m"
                class="spectrum-Radio-input"
                id="radio-9ossr-input"
            />
            <span
                class="spectrum-Radio-button spectrum-Radio-button--sizeS"
            ></span>
            <label
                class="spectrum-Radio-label spectrum-Radio-label--sizeS"
                for="radio-9ossr-input"
            >
                Apples are best
            </label>
        </div>
        <div
            class=" spectrum-Radio spectrum-Radio--sizeM spectrum-FieldGroup-item "
            style=""
        >
            <!-- radio component internals -->
        </div>
        <div
            class=" spectrum-Radio spectrum-Radio--sizeM spectrum-FieldGroup-item "
            style=""
        >
            <!-- radio component internals -->
        </div>

        <div
            class=" spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral "
            style=""
            id="helptext-l2iu5"
        >
            <div class="spectrum-HelpText-text">Select an option.</div>
        </div>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**No differences found between main and spectrum-two branches.**

</details>

### CSS => SWC mapping

| CSS selector                       | Attribute or slot                     | Status                               |
| ---------------------------------- | ------------------------------------- | ------------------------------------ |
| `.spectrum-FieldGroup`             | `:host`                               | Implemented                          |
| `.spectrum-FieldGroup--horizontal` | `horizontal` attribute                | Implemented                          |
| `.spectrum-FieldGroup--vertical`   | Default variant; `vertical` attribute | Implemented                          |
| `.spectrum-FieldGroup--sidelabel`  | Layout variant                        | Missing from WC (implementation gap) |
| `.spectrum-FieldGroup--toplabel`   | Layout variant                        | Missing from WC (implementation gap) |
| `.spectrum-FieldGroupInputLayout`  | Internal layout container             | Missing from WC (implementation gap) |
| `.spectrum-FieldGroup-item`        | Individual field item classes         | Missing from WC (implementation gap) |
| `.spectrum-HelpText`               | Help text styling                     | Implemented via `sp-help-text`       |

## Summary of changes

### CSS => SWC implementation gaps

- In CSS, the field label is incorporated into the field group component in both S1 and S2, however `<sp-field-group>` does not have a slot for a corresponding `<sp-field-label>`. Because of this, `<sp-field-group>` doesn't technically support `.spectrum-FieldGroup--sidelabel` and `.spectrum-FieldGroup--toplabel` layout variants. However, `<sp-field-label>` can be defined as top- or side-aligned, so we may be able to reevaluate if this behavior can be supported.
- `.spectrum-FieldGroupInputLayout` wrapper container is not generated by the web component. This class is the flex container that orients the items vertically or horizontally.
- `.spectrum-FieldGroup-item` classes are not automatically applied to slotted elements. The class provides the appropriate spacing between items.

### CSS Spectrum 2 changes

No structural differences found between the legacy (CSS main) and Spectrum 2 (CSS spectrum-two) branches. The template structure and class naming remain consistent across both branches.

## Resources

- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-field-group--docs)
