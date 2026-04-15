# ARIA Patterns and Best Practices

## Overview

ARIA (Accessible Rich Internet Applications) provides attributes to enhance accessibility when native HTML semantics are insufficient. The first rule of ARIA is: don't use ARIA if native HTML can do the job.

Examples in this document use **Lit** (the library used by Spectrum Web Components) so patterns match SWC implementation context.

## ARIA Fundamentals

### Roles

Roles define what an element is or does.

```html
<!-- Widget roles -->
<div role="button">Click me</div>
<div role="checkbox" aria-checked="true">Option</div>
<div role="slider" aria-valuenow="50">Volume</div>

<!-- Landmark roles (prefer semantic HTML) -->
<main>...</main>
<!-- Fallback: <div role="main"> -->
<nav>...</nav>
<!-- Fallback: <div role="navigation"> -->
<header>...</header>
<!-- Fallback: <div role="banner"> -->

<!-- Document structure roles -->
<div role="region" aria-label="Featured">...</div>
<div role="group" aria-label="Formatting options">...</div>
```

### States and Properties

States indicate current conditions; properties describe relationships.

```html
<!-- States (can change) -->
aria-checked="true|false|mixed" aria-disabled="true|false"
aria-expanded="true|false" aria-hidden="true|false" aria-pressed="true|false"
aria-selected="true|false"

<!-- Properties (usually static) -->
aria-label="Accessible name" aria-labelledby="id-of-label"
aria-describedby="id-of-description" aria-controls="id-of-controlled-element"
aria-owns="id-of-owned-element" aria-live="polite|assertive|off"
```

## Common ARIA Patterns

### Accordion

```ts
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Accordion extends LitElement {
  @property({ type: Array }) items: { title: string; content: string }[] = [];
  @state() private openIndex = -1;

  private toggle(index: number) {
    this.openIndex = this.openIndex === index ? -1 : index;
  }

  override render() {
    return html`
      <div class="accordion">
        ${this.items.map((item, index) => {
          const isOpen = this.openIndex === index;
          const headingId = `accordion-heading-${index}`;
          const panelId = `accordion-panel-${index}`;
          return html`
            <div>
              <h3>
                <button
                  id=${headingId}
                  aria-expanded=${isOpen}
                  aria-controls=${panelId}
                  @click=${() => this.toggle(index)}
                >
                  ${item.title}
                  <span aria-hidden="true">${isOpen ? '−' : '+'}</span>
                </button>
              </h3>
              <div
                id=${panelId}
                role="region"
                aria-labelledby=${headingId}
                ?hidden=${!isOpen}
              >
                ${item.content}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
```

### Tabs

```ts
import { LitElement, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';

export class Tabs extends LitElement {
  @property({ type: Array }) tabs: { label: string; content: string }[] = [];
  @state() private activeIndex = 0;
  @query('[role="tablist"]') private tabList!: HTMLDivElement;

  private handleKeyDown(e: KeyboardEvent, index: number) {
    let newIndex = index;
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % this.tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + this.tabs.length) % this.tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = this.tabs.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.activeIndex = newIndex;
    (this.tabList?.children[newIndex] as HTMLElement)?.focus();
  }

  override render() {
    return html`
      <div>
        <div role="tablist" aria-label="Content tabs">
          ${this.tabs.map(
            (tab, index) => html`
              <button
                role="tab"
                id="tab-${index}"
                aria-selected=${index === this.activeIndex}
                aria-controls="panel-${index}"
                tabindex=${index === this.activeIndex ? 0 : -1}
                @click=${() => (this.activeIndex = index)}
                @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, index)}
              >
                ${tab.label}
              </button>
            `
          )}
        </div>
        ${this.tabs.map(
          (tab, index) => html`
            <div
              role="tabpanel"
              id="panel-${index}"
              aria-labelledby="tab-${index}"
              ?hidden=${index !== this.activeIndex}
              tabindex="0"
            >
              ${tab.content}
            </div>
          `
        )}
      </div>
    `;
  }
}
```

### Menu Button

```ts
import { LitElement, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { PropertyValues } from 'lit';

interface MenuItem {
  label: string;
  onClick: () => void;
}

export class MenuButton extends LitElement {
  @property() label = '';
  @property({ type: Array }) items: MenuItem[] = [];
  @state() private isOpen = false;
  @state() private activeIndex = -1;
  @query('button') private buttonRef!: HTMLButtonElement;
  @query('[role="menu"]') private menuRef!: HTMLUListElement;

  private menuId = `menu-${crypto.randomUUID()}`;

  private handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.activeIndex = 0;
        } else {
          this.activeIndex = Math.min(
            this.activeIndex + 1,
            this.items.length - 1
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        break;
      case 'Escape':
        this.isOpen = false;
        this.buttonRef?.focus();
        break;
      case 'Enter':
      case ' ':
        if (this.isOpen && this.activeIndex >= 0) {
          e.preventDefault();
          this.items[this.activeIndex].onClick();
          this.isOpen = false;
        }
        break;
    }
  }

  protected override updated(changes: PropertyValues) {
    if (changes.has('isOpen') || changes.has('activeIndex')) {
      if (this.isOpen && this.activeIndex >= 0 && this.menuRef) {
        (this.menuRef.children[this.activeIndex] as HTMLElement)?.focus();
      }
    }
  }

  override render() {
    return html`
      <div>
        <button
          aria-haspopup="menu"
          aria-expanded=${this.isOpen}
          aria-controls=${this.menuId}
          @click=${() => (this.isOpen = !this.isOpen)}
          @keydown=${this.handleKeyDown}
        >
          ${this.label}
        </button>
        ${this.isOpen
          ? html`
              <ul
                id=${this.menuId}
                role="menu"
                aria-label=${this.label}
                @keydown=${this.handleKeyDown}
              >
                ${this.items.map(
                  (item, index) => html`
                    <li
                      role="menuitem"
                      tabindex="-1"
                      @click=${() => {
                        item.onClick();
                        this.isOpen = false;
                        this.buttonRef?.focus();
                      }}
                    >
                      ${item.label}
                    </li>
                  `
                )}
              </ul>
            `
          : ''}
      </div>
    `;
  }
}
```

### Combobox (Autocomplete)

```ts
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Combobox extends LitElement {
  @property({ type: Array }) options: string[] = [];
  @property() placeholder = '';
  @state() private inputValue = '';
  @state() private isOpen = false;
  @state() private activeIndex = -1;

  private listboxId = `listbox-${crypto.randomUUID()}`;

  private get filteredOptions() {
    return this.options.filter((opt) =>
      opt.toLowerCase().includes(this.inputValue.toLowerCase())
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    const opts = this.filteredOptions;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.isOpen = true;
        this.activeIndex = Math.min(this.activeIndex + 1, opts.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        break;
      case 'Enter':
        if (this.activeIndex >= 0) {
          e.preventDefault();
          this.selectOption(opts[this.activeIndex]);
        }
        break;
      case 'Escape':
        this.isOpen = false;
        this.activeIndex = -1;
        break;
    }
  }

  private selectOption(option: string) {
    this.inputValue = option;
    this.dispatchEvent(
      new CustomEvent('select', { detail: option, bubbles: true })
    );
    this.isOpen = false;
    this.activeIndex = -1;
  }

  override render() {
    const opts = this.filteredOptions;
    return html`
      <div>
        <input
          type="text"
          role="combobox"
          aria-expanded=${this.isOpen}
          aria-controls=${this.listboxId}
          aria-activedescendant=${this.activeIndex >= 0
            ? `option-${this.activeIndex}`
            : ''}
          aria-autocomplete="list"
          .value=${this.inputValue}
          placeholder=${this.placeholder}
          @input=${(e: Event) => {
            this.inputValue = (e.target as HTMLInputElement).value;
            this.isOpen = true;
            this.activeIndex = -1;
          }}
          @keydown=${this.handleKeyDown}
          @focus=${() => (this.isOpen = true)}
          @blur=${() => setTimeout(() => (this.isOpen = false), 200)}
        />
        ${this.isOpen && opts.length > 0
          ? html`
              <ul id=${this.listboxId} role="listbox">
                ${opts.map(
                  (option, index) => html`
                    <li
                      id="option-${index}"
                      role="option"
                      aria-selected=${index === this.activeIndex}
                      @click=${() => this.selectOption(option)}
                      @mouseenter=${() => (this.activeIndex = index)}
                    >
                      ${option}
                    </li>
                  `
                )}
              </ul>
            `
          : ''}
      </div>
    `;
  }
}
```

### Alert Dialog

```ts
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { PropertyValues } from 'lit';

export class AlertDialog extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property() title = '';
  @property() message = '';
  @query('.confirm-btn') private confirmRef!: HTMLButtonElement;

  private dialogId = `dialog-${crypto.randomUUID()}`;

  protected override updated(changes: PropertyValues) {
    if (changes.has('isOpen') && this.isOpen) {
      this.confirmRef?.focus();
    }
  }

  override render() {
    if (!this.isOpen) return html``;
    const titleId = `${this.dialogId}-title`;
    const descId = `${this.dialogId}-desc`;
    return html`
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby=${titleId}
        aria-describedby=${descId}
      >
        <div class="backdrop" @click=${this._onCancel}></div>
        <div class="dialog">
          <h2 id=${titleId}>${this.title}</h2>
          <p id=${descId}>${this.message}</p>
          <div class="actions">
            <button @click=${this._onCancel}>Cancel</button>
            <button class="confirm-btn" @click=${this._onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _onConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true }));
  }

  private _onCancel() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true }));
  }
}
```

### Toolbar

```ts
import { LitElement, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';

interface ToolbarItem {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

export class Toolbar extends LitElement {
  @property({ type: Array }) items: ToolbarItem[] = [];
  @state() private activeIndex = 0;
  @query('[role="toolbar"]') private toolbarRef!: HTMLDivElement;

  private handleKeyDown(e: KeyboardEvent) {
    let newIndex = this.activeIndex;
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (this.activeIndex + 1) % this.items.length;
        break;
      case 'ArrowLeft':
        newIndex =
          (this.activeIndex - 1 + this.items.length) % this.items.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = this.items.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.activeIndex = newIndex;
    this.toolbarRef?.querySelectorAll('button')[newIndex]?.focus();
  }

  override render() {
    return html`
      <div
        role="toolbar"
        aria-label="Text formatting"
        @keydown=${this.handleKeyDown}
      >
        ${this.items.map(
          (item, index) => html`
            <button
              tabindex=${index === this.activeIndex ? 0 : -1}
              aria-pressed=${item.isActive}
              aria-label=${item.label}
              @click=${item.onClick}
            >
              ${item.icon}
            </button>
          `
        )}
      </div>
    `;
  }
}
```

## Live Regions

### Polite Announcements

```ts
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

// Status messages that don't interrupt
export class SearchStatus extends LitElement {
  @property({ type: Number }) count = 0;
  @property() query = '';
  override render() {
    return html`
      <div role="status" aria-live="polite" aria-atomic="true">
        ${this.count} results found for "${this.query}"
      </div>
    `;
  }
}

// Progress indicator
export class LoadingStatus extends LitElement {
  @property({ type: Number }) progress = 0;
  override render() {
    return html`
      <div role="status" aria-live="polite">
        Loading: ${this.progress}% complete
      </div>
    `;
  }
}
```

### Assertive Announcements

```ts
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

// Important errors that should interrupt
export class ErrorAlert extends LitElement {
  @property() message = '';
  override render() {
    return html`
      <div role="alert" aria-live="assertive">Error: ${this.message}</div>
    `;
  }
}

// Form validation summary
export class ValidationSummary extends LitElement {
  @property({ type: Array }) errors: string[] = [];
  override render() {
    if (this.errors.length === 0) return html``;
    return html`
      <div role="alert" aria-live="assertive">
        <h2>Please fix the following errors:</h2>
        <ul>
          ${this.errors.map(
            (err) => html`
              <li>${err}</li>
            `
          )}
        </ul>
      </div>
    `;
  }
}
```

### Log Region

```ts
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

interface LogMessage {
  id: string;
  author: string;
  text: string;
}

export class ChatLog extends LitElement {
  @property({ type: Array }) messages: LogMessage[] = [];
  override render() {
    return html`
      <div role="log" aria-live="polite" aria-relevant="additions">
        ${this.messages.map(
          (msg) => html`
            <div>
              <span class="author">${msg.author}:</span>
              <span class="text">${msg.text}</span>
            </div>
          `
        )}
      </div>
    `;
  }
}
```

## Common Mistakes to Avoid

### 1. Redundant ARIA

```html
<!-- Bad: role="button" on a button -->
<button role="button">Click me</button>

<!-- Good: just use button -->
<button>Click me</button>

<!-- Bad: aria-label duplicating visible text -->
<button aria-label="Submit form">Submit form</button>

<!-- Good: just use visible text -->
<button>Submit form</button>
```

### 2. Invalid ARIA

```html
<!-- Bad: aria-selected on non-selectable element -->
<div aria-selected="true">Item</div>

<!-- Good: use with proper role -->
<div role="option" aria-selected="true">Item</div>

<!-- Bad: aria-expanded without aria-controls relationship -->
<button aria-expanded="true">Menu</button>
<div>Menu content</div>

<!-- Good: with aria-controls -->
<button aria-expanded="true" aria-controls="menu">Menu</button>
<div id="menu">Menu content</div>
```

### 3. Hidden Content Still Announced

```html
<!-- Bad: visually hidden but still in accessibility tree -->
<div style="display: none;">Hidden content</div>

<!-- Good: properly hidden -->
<div style="display: none;" aria-hidden="true">Hidden content</div>

<!-- Or just use hidden attribute (implicitly hidden) -->
<div hidden>Hidden content</div>
```

## Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [Using ARIA](https://www.w3.org/TR/using-aria/)
