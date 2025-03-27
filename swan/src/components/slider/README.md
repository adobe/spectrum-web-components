# Slider Component Architecture

> Note: This document was AI-generated. It's generally accurate, but treat opinions / suggestions with appropriate skepticism.

The slider components in Swan provide a base implementation that can be extended and registered by consuming libraries. This README documents the current architecture, particularly focusing on the registration mechanism and the relationship between `SliderBase` and `SliderHandle` components.

## Current Registration Mechanism

The slider implementation consists of three main parts:

-   `SliderBase`: The base class for slider components
-   `SliderHandle`: The handle component used within sliders
-   `HandleController`: A controller that manages slider handles and their interactions

### Tagname Registration Pattern

One unique aspect of this implementation is how the tagname for the slider handle is communicated from the registration file to the component class:

1. `SliderBase` has a static property `sliderHandleTagname` that is used to create handle elements:

    ```typescript
    export class SliderBase extends SWCBaseClass {
        static sliderHandleTagname: string; // Set during registration
        // ...
    }
    ```

2. This property gets set in the registration file (e.g., `sp-slider.ts`):

    ```typescript
    // Set the tag name to use when creating slider handle elements
    Slider.sliderHandleTagname = 'sp-slider-handle';

    defineElement('sp-slider', Slider);
    ```

3. The `HandleController` uses this property to create slider handles and check types:

    ```typescript
    // Inside HandleController
    private get sliderHandleTagname(): string {
        return (this.host.constructor as typeof SliderBase).sliderHandleTagname;
    }

    private get sliderHandleConstructor(): typeof SliderHandle {
        return customElements.get(
            this.sliderHandleTagname
        ) as typeof SliderHandle;
    }

    // Used when creating a default handle
    if (!this.defaultHandle) {
        const tagName = this.sliderHandleTagname;
        this.defaultHandle = document.createElement(tagName) as SliderHandle;
        // ...
    }

    // Used for type checking when waiting for handle upgrades
    private waitForUpgrade(handle: HTMLElement): boolean {
        if (handle instanceof this.sliderHandleConstructor) {
            return false;
        }
        handle.addEventListener(
            'sp-slider-handle-ready',
            () => this.extractModelFromLightDom(),
            { once: true, passive: true }
        );
        return true;
    }
    ```

## Advantages of Current Approach

1. **Separation of Concerns**: Keeps the class definition separate from element registration
2. **Flexibility**: Allows different consuming libraries to use their own custom element names
3. **Avoids Registration Errors**: Prevents errors with custom element registration happening multiple times
4. **Runtime Component Creation**: Enables the controller to dynamically create handle elements with the correct tag name at runtime

## Future Considerations

This pattern, while functional, may not be the optimal long-term solution. Areas to consider for improvement:

1. **Cleaner Coupling**: The current use of static properties creates a coupling that could be made more explicit
2. **Dependency Injection**: A more formalized dependency injection approach might be cleaner
3. **Context Providers**: Using context providers could be a more modern approach to sharing this information
4. **Constructor Arguments**: Passing the handle tag name as a constructor argument to the controller might be more explicit

## Usage Pattern for Consuming Libraries

Libraries using these components should:

1. Import the base classes from Swan
2. Extend them if needed to create concrete implementations (required for SliderBase as it's abstract)
3. Register them with appropriate tagnames
4. Set the static `sliderHandleTagname` property on the Slider class

Example:

```typescript
// Import the concrete Slider class (which is an implementation of Swan's abstract SliderBase)
import { Slider } from './src/Slider.js';
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';

// Set the tag name to use when creating slider handle elements
Slider.sliderHandleTagname = 'my-slider-handle';

defineElement('my-slider', Slider);
```

## Implementation Details

The current implementation:

1. Uses a static property on the constructor to store the handle tagname
2. Retrieves this value in the `HandleController` by accessing the host constructor
3. Uses the retrieved tagname to:
    - Create default handles when none are provided
    - Check if existing handles have been upgraded by the custom elements registry
    - Perform type checking of handles

This approach allows the entire slider system to function without hardcoding element tag names, making it more flexible and reusable across different component libraries.

---

This architecture will be reviewed in the future to ensure it's the most maintainable and developer-friendly approach.
