# Combined Approach: Controllers + Mixins

This implementation combines **Approach 1 (Pure Controllers)** and **Approach 2 (Mixins)** to provide maximum flexibility for your garage week demo.

## Architecture

```
┌─────────────────────────────────────────┐
│  LAYER 2: Mixins (High-level)          │
│  ├─ DraggableMixin                      │
│  └─ DropTargetMixin                     │
│      ↓ Built on top of                  │
├─────────────────────────────────────────┤
│  LAYER 1: Controllers (Low-level)       │
│  ├─ DragController (headless logic)     │
│  └─ DropController (headless logic)     │
└─────────────────────────────────────────┘
```

## When to Use Each Approach

### Approach 1: Pure Controllers
**Best for:** Teams that need maximum control

```typescript
import { DragController, DropController } from '@spectrum-web-components/drag-drop';

class MyComponent extends LitElement {
  private dragController = new DragController(this, {
    getItems: () => [{ 'type': 'data' }],
    onDragStart: () => { /* custom logic */ }
  });
}
```

**Pros:**
- Zero UI assumptions
- Complete control over behavior
- Minimal bundle size
- Can be used with any framework

**Cons:**
- More boilerplate
- Manual event handling
- Must implement accessibility yourself

### Approach 2: Mixins
**Best for:** Teams that want faster development

```typescript
import { DraggableMixin, DropTargetMixin } from '@spectrum-web-components/drag-drop';

class MyItem extends DraggableMixin(SpectrumElement) {
  getDragItems() {
    return [{ 'type': 'data' }];
  }
}
```

**Pros:**
- Less boilerplate
- Automatic event dispatching (`sp-drag-start`, `sp-drop`, etc.)
- Built-in accessibility
- Reactive properties (`isDragging`, `isDropTarget`)

**Cons:**
- Slightly larger bundle
- Less control than pure controllers
- Requires understanding of mixin pattern

## Demo Examples

### Example 1: Simple Drag & Drop (Controller)
```typescript
// Draggable item using controller
class Item extends LitElement {
  private dragController = new DragController(this, {
    getItems: () => [{ 'app/item': this.id }]
  });
}

// Drop zone using controller
class Zone extends LitElement {
  private dropController = new DropController(this, {
    acceptedTypes: ['app/item'],
    onDrop: (e) => console.log('Dropped:', e.items)
  });
}
```

### Example 2: Simple Drag & Drop (Mixin)
```typescript
// Draggable item using mixin
class Item extends DraggableMixin(SpectrumElement) {
  getDragItems() {
    return [{ 'app/item': this.id }];
  }
}

// Drop zone using mixin
class Zone extends DropTargetMixin(SpectrumElement) {
  acceptedTypes = ['app/item'];
  
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('sp-drop', (e) => {
      console.log('Dropped:', e.detail.items);
    });
  }
}
```

### Example 3: Reorderable List (Both Mixins)
```typescript
// Item that is BOTH draggable AND a drop target
class ReorderableItem extends DraggableMixin(DropTargetMixin(SpectrumElement)) {
  getDragItems() {
    return [{ 'app/item': this.id }];
  }
  
  acceptedTypes = ['app/item'];
  
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('sp-drop', (e) => {
      // Reorder logic
      this.dispatchEvent(new CustomEvent('reorder', {
        detail: { sourceId: e.detail.items[0]['app/item'], targetId: this.id }
      }));
    });
  }
}
```

## PRD Requirements Coverage

From [Product Requirements Document](file://Product%20requirements_%20Draggable%20sorting%20shared%20component.pdf):

### ✅ Implemented
- Unlimited draggable items
- Drag via mouse/pointer
- Long-press for touch (handled by browser)
- Move and cancel operations
- Custom drag preview
- Keyboard navigation (Enter/Space, Tab, Escape)
- Accessibility (aria-grabbed, aria-dropeffect, screen reader announcements)
- Drop validation by type
- Visual state indicators
- Event dispatching

### ⏳ Next Steps for Full PRD
- Autoscroll controller (viewport edge detection)
- Multi-select support (Cmd/Ctrl+click)
- Visual drop zones/indicators
- Snap-to-position support
- Performance optimizations for large lists

## Storybook Examples

Three stories demonstrate the approaches:

1. **`Approach1Controllers`** - Pure controller usage
2. **`Approach2Mixins`** - Mixin usage
3. **`Approach2Advanced`** - Combined mixins (reorderable list)
4. **`AllApproaches`** - Side-by-side comparison

## Key Design Decisions

### 1. Headless Controllers
Controllers have **zero UI assumptions**. They only handle:
- Event listeners (dragstart, drop, etc.)
- State management (isDragging, isDropTarget)
- Keyboard interaction
- Accessibility attributes

Teams bring their own UI via:
- Custom styling
- Custom layouts
- Custom animations

### 2. Mixin Composition
Mixins can be **combined** for complex use cases:
```typescript
// Both draggable AND drop target
class Item extends DraggableMixin(DropTargetMixin(Base)) { }
```

### 3. Event-Driven Architecture
All approaches dispatch standard events:
- `sp-drag-start` - When drag begins
- `sp-drag-end` - When drag ends
- `sp-drag-move` - During drag
- `sp-drop` - When item dropped
- `sp-drop-enter` - When drag enters zone
- `sp-drop-exit` - When drag leaves zone

### 4. Type Safety
Full TypeScript support:
```typescript
interface DragItem {
  [mimeType: string]: string | Promise<string>;
}

type DropOperation = 'copy' | 'move' | 'link' | 'none';
```

## Demo Script for Garage Week

1. **Show the problem**: Multiple teams building their own drag-and-drop
2. **Introduce Approach 1**: Pure controllers for maximum flexibility
3. **Introduce Approach 2**: Mixins for faster development
4. **Show reorderable list**: Both mixins working together
5. **Discuss next steps**: Autoscroll, multi-select, etc.

## Files Created

```
1st-gen/tools/drag-drop/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                    # Exports both approaches
│   ├── DragController.ts           # Approach 1: Headless drag logic
│   ├── DropController.ts           # Approach 1: Headless drop logic
│   ├── DraggableMixin.ts          # Approach 2: Mixin wrapper
│   └── DropTargetMixin.ts         # Approach 2: Mixin wrapper
└── stories/
    └── combined-approaches.stories.ts  # Demo examples
```

## Next Steps

1. Test the stories in Storybook
2. Add autoscroll controller for PRD requirement
3. Add multi-select support
4. Create more real-world examples (layer stack, timeline)
5. Performance testing with large lists
6. Write documentation once APIs are stable

