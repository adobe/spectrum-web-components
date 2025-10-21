<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Workstream Info](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Migrate rendering & styles from Spectrum CSS

<!-- Document title (editable) -->

# Migrate rendering & styles from Spectrum CSS

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [[TODO: Integrate this content]](#-todo-integrate-this-content-)
- [Bring over styles from Spectrum CSS](#bring-over-styles-from-spectrum-css)
- [Update styles in the 2nd-generation component](#update-styles-in-the-2nd-generation-component)

</details>

<!-- Document content (editable) -->

## [ TODO: Integrate this content ]

The following bits from the top-level migration guide outline need to be integrated into this doc:

> - In RENDERING & STYLING section:
>     - Add static `styles` getter returning the S2 stylesheet
>     - Implement the `render()` method with S2 rendering logic
> - Create the S2 stylesheet (`[component].css`)

## Bring over styles from Spectrum CSS

Now we can bring over styles from the `spectrum-two` package in Spectrum CSS. Start by checking out the `@adobe/spectrum-css` repository and pulling down the `spectrum-two` branch.

Identify the component you need to migrate by searching the `components` directory for the component name.

Inside the CSS directory, you can expect to find the following files:

- `index.css` - This is the source of truth for the component Styles
- `dist/index.css` - This is the processed version of the component styles; for now, this is the best place to source styles for SWC. When copying files from Spectrum CSS into the 2nd-generation component, using this file will ensure you get the benefits of the CSS build tooling.
- `stories/<component-name>.stories.js` - This is a great source-of-truth for the SWC storybook. These stories are organized into logic groups with API defined in a customer-friendly fashion with typing and human-readable labels. These files also include migration notes and guidance specific to the S2-specific implementation of the component.
- `stories/template.js` - This is a great source-of-truth for the SWC render function; these templates already include property and class mappings. When bringing this file over to SWC, be sure to remove the `id` and `customStyles` attributes as they do not translate to the web component APIs.

Next, we need to copy the styles from the Spectrum CSS component to the 2nd-generation component.

```bash
cp -r spectrum-css/components/<component-name>/dist/index.css spectrum-web-components/second-gen/packages/swc/components/<component-name>/<component-name>.css
```

## Update styles in the 2nd-generation component

Now that we have the base styles in place, we need to check the first-gen implementation for any unique web component-specific styles that would not exist in the vanilla CSS implementation. This information will most likely be found in the `first-gen/packages/components/<component-name>/<component-name>.css` file.

For example, look for styles specific to slots, such as `::slotted([name="icon"]) {}`.

If these styles are found, we need to confirm if they are needed in the 2nd-generation component. Not all first-gen overrides or component-specific styles are needed in the 2nd-generation components and sometimes there are other ways to source those styles using the original classes provided by the Spectrum CSS asset.

It might be helpful, at this point, to define the render function for the second-gen component so you can spin up Storybook and start seeing these new styles in action. A quick way to kick this off is to copy the `spectrum-css/components/<component-name>/stories/template.js` file into a render function on your new 2nd-generation component.

Let's use the `Badge` component as an example. First, we need to add the styles to the component.

Start by importing the CSS file:

```ts
import styles from './badge.css';
```

Next, we import those styles into the component:

```ts
public static override get styles(): CSSResultArray {
    return [styles];
}
```

Finally, we can start to implement the render function:

```ts
protected override render(): TemplateResult {
    return html`
        <div
            class=${classMap({
                ['spectrum-Badge']: true,
                [`spectrum-Badge--size${this.size?.toUpperCase()}`]: typeof this.size !== 'undefined',
                [`spectrum-Badge--${this.variant}`]: typeof this.variant !== 'undefined',
                [`spectrum-Badge--subtle`]: this.subtle,
                [`spectrum-Badge--outline`]: this.outline,
                [`spectrum-Badge--fixed-${this.fixed}`]: typeof this.fixed !== 'undefined',
            })}
        >
            ${when(
                this.hasIcon,
                () => html`
                    <div
                        class=${classMap({
                            [`spectrum-Badge-icon`]: true,
                            [`spectrum-Badge-icon--no-label`]:
                                !this.slotHasContent,
                        })}
                    >
                        <slot name="icon"></slot>
                    </div>
                `
            )}
            <div class="spectrum-Badge-label">
                <slot></slot>
            </div>
        </div>
    `;
}
```

Let's compare this to the 1st-generation implementation:

```ts
protected override render(): TemplateResult {
    return html`
        ${this.hasIcon
            ? html`
                    <slot
                        name="icon"
                        ?icon-only=${!this.slotHasContent}
                    ></slot>
                `
            : nothing}
        <div class="label">
            <slot></slot>
        </div>
    `;
}
```

As you can see, the 2nd-generation implementation leverages the `classMap` function to conditionally apply classes to the component based on the component's properties. This is a common pattern in the 2nd-generation components. This approach has several benefits:

- It separates the styling application from the properties and states of the component
- It creates a container inside the Shadow DOM which provides stronger encapsulation
- It allows for more efficient rendering by only applying the necessary classes to the component

In our 2nd-generation version, we will likely want to maintain any slots available in the 1st-generation component unless design changes from S2 provide a compelling reason to change or remove them.
