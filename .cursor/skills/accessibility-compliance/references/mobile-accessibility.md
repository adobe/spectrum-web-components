# Mobile Accessibility

## Overview

Mobile accessibility ensures apps work for users with disabilities on iOS and Android devices. This includes support for screen readers (VoiceOver, TalkBack), motor impairments, and various visual disabilities.

Web examples in this document use **Lit** (the library used by Spectrum Web Components) so patterns more closely match SWC implementation context.

## Touch Target Sizing

### Minimum Sizes

```css
/* WCAG 2.2 Level AA: 24x24px minimum */
.interactive-element {
  min-width: 24px;
  min-height: 24px;
}

/* WCAG 2.2 Level AAA / Apple HIG / Material Design: 44x44dp */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

### Touch Target Spacing

```html
<!-- Ensure adequate spacing between touch targets (e.g. 12px minimum gap) -->
<div class="button-group" style="display: flex; gap: 12px;">
  <button type="button" style="min-width: 44px; min-height: 44px;">Save</button>
  <button type="button" style="min-width: 44px; min-height: 44px;">
    Cancel
  </button>
</div>
```

```ts
// Expand hit area without changing visual size (44x44 touch area)
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class IconButton extends LitElement {
  @property() label = '';
  @property() icon = '';

  override render() {
    return html`
      <button
        type="button"
        aria-label=${this.label}
        style="position: relative; padding: 12px; min-width: 44px; min-height: 44px;"
      >
        <span
          aria-hidden="true"
          style="display: block; width: 20px; height: 20px;"
        >
          ${this.icon}
        </span>
      </button>
    `;
  }
}
```

## Screen reader support

On web, use ARIA attributes and live regions so VoiceOver (iOS Safari) and TalkBack (Android) get the same information.

```ts
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

// Basic accessible button: label + hint
export class AccessibleButton extends LitElement {
  @property() title = '';
  @property() hint = '';

  override render() {
    return html`
      <button
        type="button"
        aria-label=${this.title}
        aria-describedby=${this.hint ? 'hint-id' : undefined}
      >
        ${this.title}
      </button>
      ${this.hint
        ? html`
            <span id="hint-id" class="visually-hidden">${this.hint}</span>
          `
        : ''}
    `;
  }
}

// Complex component with grouped content and custom actions
export class ProductCard extends LitElement {
  @property({ type: Object }) product!: {
    name: string;
    price: string;
    rating: number;
  };

  private _onViewDetails() {
    /* navigate */
  }
  private _onAddToCart(e: Event) {
    e.stopPropagation(); /* add to cart */
  }
  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') this._onViewDetails();
  }

  override render() {
    const { name, price, rating } = this.product;
    return html`
      <div
        role="button"
        tabindex="0"
        aria-label="${name}, ${price}, ${rating} stars"
        @click=${this._onViewDetails}
        @keydown=${this._onKeyDown}
      >
        <img src="" alt="" aria-hidden="true" />
        <span>${name}</span>
        <span>${price}</span>
        <a href="#" @click=${this._onAddToCart} aria-label="Add to cart">
          Add to cart
        </a>
      </div>
    `;
  }
}

// Announcing dynamic changes (live region)
export class Counter extends LitElement {
  @state() private count = 0;

  private _increment() {
    this.count += 1;
    this.announce(`Count is now ${this.count}`);
  }

  private announce(message: string) {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.className = 'visually-hidden';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  override render() {
    return html`
      <div role="status" aria-live="polite" aria-atomic="true">
        Count: ${this.count}
      </div>
      <button
        type="button"
        aria-label="Increment"
        aria-describedby="counter-hint"
        @click=${this._increment}
      >
        +
      </button>
      <span id="counter-hint" class="visually-hidden">
        Increases the counter by one
      </span>
    `;
  }
}
```

## Gesture Accessibility

### Alternative Gestures

On web, provide a visible control for screen reader and keyboard users instead of relying on swipe-only actions.

```ts
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

// Provide alternatives to complex gestures: always-visible delete for a11y
export class SwipeableCard extends LitElement {
  @property({ type: Object }) item!: { title: string };
  @property({ type: Function }) onDelete!: (item: { title: string }) => void;

  override render() {
    const { item, onDelete } = this;
    return html`
      <div class="card" role="listitem">
        <span class="card-title">${item.title}</span>
        <button
          type="button"
          aria-label="Delete ${item.title}"
          @click=${() => onDelete(item)}
        >
          Delete
        </button>
      </div>
    `;
  }
}
```

### Motion and Animation

Respect the user's reduced motion preference (e.g. `prefers-reduced-motion: reduce`).

```ts
import { LitElement, html } from 'lit';
import { query } from 'lit/decorators.js';

export class AnimatedComponent extends LitElement {
  @query('.animated') private animatedEl!: HTMLElement;

  override connectedCallback() {
    super.connectedCallback();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      this.animatedEl?.style.setProperty(
        'animation',
        mq.matches ? 'none' : 'slide 0.3s ease'
      );
    };
    mq.addEventListener('change', apply);
    apply();
  }

  override render() {
    return html`
      <div class="animated">
        <slot></slot>
      </div>
    `;
  }
}
```

```css
/* Prefer CSS so reduced motion is automatic */
.animated {
  animation: slide 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
  }
}
```

## Web text scaling

Use relative units and avoid fixing font sizes so browser and OS text scaling work.

```html
<!-- Scalable: use rem or em so text respects user font size -->
<p style="font-size: 1rem;">Scalable text</p>

<!-- Limit scaling with max() if needed (use sparingly) -->
<p style="font-size: clamp(1rem, 2vw, 1.5rem);">Limited scaling</p>
```

```css
/* Prefer rem for body text so it scales with user settings */
body {
  font-size: 100%; /* 16px default; user can change */
}

.component-title {
  font-size: 1.25rem;
}
```

```ts
// Text scales with user's default font size
import { LitElement, html, css } from 'lit';

export class ScalableText extends LitElement {
  static styles = css`
    :host {
      font-size: 1rem;
    }
  `;

  override render() {
    return html`
      <slot></slot>
    `;
  }
}
```

## Testing Checklist

```markdown
## Screen reader testing

- [ ] All interactive elements have labels
- [ ] Focus order is logical
- [ ] All content is reachable in logical order
- [ ] Custom actions available for complex interactions
- [ ] Dynamic content announced (live regions)
- [ ] Headings properly marked and navigable via rotor
- [ ] Images have appropriate descriptions or are hidden
- [ ] Grouped content read together

## Motor accessibility

- [ ] Touch targets at least 44x44 points
- [ ] Adequate spacing between targets (8dp minimum)
- [ ] Alternatives to complex gestures
- [ ] No time-limited interactions

## Visual accessibility

- [ ] Text scales to 200% without loss
- [ ] Content visible in high contrast mode
- [ ] Color not sole indicator
- [ ] Animations respect reduced motion
```

## Resources

- [Apple Accessibility Programming Guide](https://developer.apple.com/accessibility/)
- [Android Accessibility Developer Guide](https://developer.android.com/guide/topics/ui/accessibility)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [Mobile Accessibility WCAG](https://www.w3.org/TR/mobile-accessibility-mapping/)
