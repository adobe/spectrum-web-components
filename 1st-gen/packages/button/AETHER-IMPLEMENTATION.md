# Aether button variant implementation

## Overview

The `aether` variant for `sp-button` provides a highly specialized, glassmorphic button with interactive particle effects and a dynamic specular highlight. This variant is designed for unique use cases requiring a visually striking, futuristic aesthetic.

## Key features

- **Glassmorphic appearance**: Semi-transparent background with backdrop blur
- **Rainbow box-shadow**: Prismatic reflection effect using multiple colored shadows
- **Interactive specular highlight**: Dynamic bright arc that follows the mouse cursor along the button's edge
- **Particle effects on click**: Subtle white particles that glide along the circular perimeter from the click point
- **Circular icon-only design**: Optimized for icon-only buttons with a perfect circle shape

## Implementation files

### 1. Button.ts

**Location:** `packages/button/src/Button.ts`

**Changes:**

#### Properties
```typescript
@property({ type: Boolean, attribute: 'aether-particles' })
public aetherParticles = true;
```
- Controls whether particle effects are enabled
- Defaults to `true`
- Can be disabled programmatically or via attribute

#### Custom rendering
The `renderButton()` method conditionally renders a specialized DOM structure for the aether variant:

```typescript
if (this.variant === 'aether') {
    return html`
        <div class="aether-wrapper">
            <div class="aether-blur"></div>
            <div class="aether-gradient"></div>
            <div class="aether-reflection"></div>
            <div class="button">
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
                <span class="label">
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            </div>
        </div>
    `;
}
```

Layers (bottom to top):
- `.aether-blur`: Backdrop filter blur for glassmorphic effect
- `.aether-gradient`: Background gradient with opacity
- `.aether-reflection`: Rainbow box-shadow and dynamic specular highlight
- `.button`: Content layer

#### Particle effects
**Method:** `handleAetherClick(click: MouseEvent)`
- Attached as click event listener when variant is `aether`
- Creates 15 small white particles (1-3px) with 16% opacity
- Particles glide along the circular perimeter from the click point
- Respects `disabled` and `aetherParticles` properties

**Method:** `createParticle(x: number, y: number)`
- Calculates click position relative to button center
- Projects click to the edge of the circular button
- Generates 8 keyframes to trace a smooth arc along the perimeter
- Particles travel 60-120 degrees in random directions (clockwise/counter-clockwise)
- Animation duration: 600-1200ms with 0-200ms random delay
- Particles fade out linearly as they travel
- Auto-removed from DOM after animation completes

#### Specular highlight effect
**Method:** `setupAetherReflection()`
- Called during `firstUpdated` lifecycle for aether variant
- Attaches `mousemove` listener to window
- Starts `requestAnimationFrame` loop for smooth animations

**Method:** `handleReflectionMouseMove(mouseMove: MouseEvent)`
- Calculates mouse position relative to button center
- Updates CSS variables when mouse is within 20px of button
- Calculates angle: `Math.atan2(dy, dx) * 180 / Math.PI + 90` (adjusted for conic-gradient coordinate system)
- Sets `--hotspot-angle` and `--hotspot-opacity` CSS variables
- Opacity fades based on distance from button

**Method:** `startHotspotAnimation()`
- Uses `requestAnimationFrame` for smooth 60fps updates
- Applies easing (15%) for smooth interpolation
- Handles angle wrapping for seamless 360° rotation
- Optimizes performance by pausing when opacity is near zero

**Method:** `cleanupAetherReflection()`
- Removes event listeners and cancels animation frame
- Called when variant changes away from aether

#### Lifecycle management
**`firstUpdated()`:**
- Sets up aether effects when initial variant is `aether`
- Attaches click listener for particles
- Initializes reflection tracking

**`updated(changes: PropertyValues)`:**
- Monitors `variant` property changes
- Cleans up old effects when switching away from aether
- Re-initializes effects when switching to aether

### 2. button.css

**Location:** `packages/button/src/button.css`

**Changes:**

#### Sizing variables
```css
:host([variant="aether"]) {
    --mod-button-min-width: 48px;
    --mod-button-block-size: 48px;
}
```

#### Container structure
```css
:host([variant="aether"]) .aether-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 99999px;
    overflow: hidden;
    width: 48px;
    height: 48px;
}
```

#### Glassmorphic layers
```css
:host([variant="aether"]) .aether-blur {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 99999px;
}

:host([variant="aether"]) .aether-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
        rgb(255 255 255 / 15%) 0%, 
        rgb(255 255 255 / 5%) 100%
    );
    border-radius: 99999px;
}
```

#### Rainbow reflection
```css
:host([variant="aether"]) .aether-reflection {
    position: absolute;
    inset: 0;
    border-radius: 99999px;
    box-shadow: 
        0 0 1px 0.5px rgb(255 0 150 / 30%),
        0 0 2px 1px rgb(150 0 255 / 25%),
        0 0 3px 1.5px rgb(0 150 255 / 20%),
        0 0 4px 2px rgb(0 255 150 / 15%);
}
```

#### Dynamic specular highlight
```css
:host([variant="aether"]) .aether-reflection::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 99999px;
    background: conic-gradient(
        from var(--hotspot-angle, 0deg) at 50% 50%,
        transparent 0deg,
        rgb(255 255 255 / calc(var(--hotspot-opacity, 0) * 0.0)) 15deg,
        rgb(255 255 255 / calc(var(--hotspot-opacity, 0) * 0.9)) 20deg,
        rgb(255 255 255 / calc(var(--hotspot-opacity, 0) * 0.5)) 25deg,
        transparent 30deg,
        transparent 360deg
    );
    mask: radial-gradient(
        circle at 50% 50%,
        transparent calc(75% - 2px),
        black calc(75% - 1.5px),
        black calc(75% - 0.5px),
        transparent 75%
    );
    -webkit-mask: radial-gradient(
        circle at 50% 50%,
        transparent calc(75% - 2px),
        black calc(75% - 1.5px),
        black calc(75% - 0.5px),
        transparent 75%
    );
    transition: opacity 0.3s ease-out;
    pointer-events: none;
}
```

Key aspects:
- Uses `conic-gradient` for circular sweep
- Controlled by CSS variables: `--hotspot-angle` and `--hotspot-opacity`
- Masked to appear only at the edge (75% radius)
- 30-degree arc with peak brightness at 20 degrees
- Smooth fade-in/out with 0.3s transition

#### Content layer
```css
:host([variant="aether"]) .button {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
}
```

#### Icon styling
```css
:host([variant="aether"]) slot[name="icon"]::slotted(*) {
    color: rgb(255 255 255 / 90%);
    width: 24px;
    height: 24px;
}
```

#### State overrides
```css
:host([variant="aether"]):hover,
:host([variant="aether"]):focus,
:host([variant="aether"]):active {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
}
```
Prevents default button hover/focus/active styles from interfering.

#### Media queries
High-contrast and forced-colors media queries are sorted to the bottom per project conventions.

### 3. preview-head.html

**Location:** `storybook/preview-head.html`

**Changes:**
Added global styles for particle effects:

```css
.aether-particle {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    will-change: transform, opacity;
}
```

Particles are appended to `document.body` to escape component bounds and appear above all other elements.

### 4. button-aether.stories.ts

**Location:** `packages/button/stories/button-aether.stories.ts`

**Changes:**
- Created dedicated story file for aether variant
- Uses `renderButton` directly (not `renderWithIconOnly`)
- Explicitly sets `iconOnly: true`
- Provides `sp-icon-add` as example icon
- Demonstrates the circular icon-only button design

## Testing

**Location:** `packages/button/test/button-aether.test.ts`

Comprehensive test suite organized by functionality:

### Structure tests
- Verifies custom DOM structure (`.aether-wrapper`, `.aether-blur`, `.aether-gradient`, `.aether-reflection`)
- Confirms regular button rendering for non-aether variants
- Validates accessibility compliance

### Particle effects tests
- Manages `aetherParticles` property (defaults to true, can be set to false)
- Creates 15 particles on click when enabled
- Does not create particles when `aetherParticles` is false
- Does not create particles when button is disabled
- Removes particles after animation completes

### Reflection hotspot tests
- Initializes reflection element
- Updates hotspot angle on mousemove
- Fades out hotspot when mouse moves away
- Sets CSS variables (`--hotspot-angle`, `--hotspot-opacity`)

### Variant switching tests
- Cleans up event listeners on variant change
- Re-initializes aether effects when switching back

### Test infrastructure
- Uses Sinon spies to verify particle creation
- Cleans up particles in `afterEach` hook
- Verifies properties with descriptive expect messages
- Follows established testing conventions from main `button.test.ts`

## Usage

```html
<!-- Basic aether button -->
<sp-button variant="aether" icon-only label="Add">
    <sp-icon-add slot="icon"></sp-icon-add>
</sp-button>

<!-- With particles disabled -->
<sp-button variant="aether" icon-only label="Add" aether-particles="false">
    <sp-icon-add slot="icon"></sp-icon-add>
</sp-button>

<!-- Programmatic control -->
<script>
    const button = document.querySelector('sp-button[variant="aether"]');
    button.aetherParticles = false; // Disable particles
</script>
```

## Performance considerations

- Particle animations use Web Animations API for hardware acceleration
- Reflection animation uses `requestAnimationFrame` for 60fps smoothness
- Animation loop pauses when mouse is far away (opacity < 0.01)
- Particles auto-remove from DOM after animation completes
- Event listeners are properly cleaned up on variant change

## Browser compatibility

- Requires `backdrop-filter` support for glassmorphic effect
- Falls back gracefully if Web Animations API is unavailable
- Uses both `mask` and `-webkit-mask` for cross-browser support
- Tested in Firefox, Chromium, and WebKit

## Design principles

1. **Subtlety**: Effects are intentionally understated (small particles, gentle fade)
2. **Smoothness**: All animations use easing and interpolation
3. **Performance**: Optimized for 60fps with minimal DOM manipulation
4. **Accessibility**: Maintains proper ARIA labels and keyboard navigation
5. **Encapsulation**: Uses Shadow DOM for style isolation
