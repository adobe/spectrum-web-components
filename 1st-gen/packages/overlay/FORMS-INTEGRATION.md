# Forms integration

This guide covers integrating overlays with forms for validation feedback, field helpers, and picker components.

## Table of contents

- [Validation popovers](#validation-popovers)
- [Field help and tooltips](#field-help-and-tooltips)
- [Picker components](#picker-components)
- [Inline error messages](#inline-error-messages)
- [Form submission handling](#form-submission-handling)
- [Accessibility considerations](#accessibility-considerations)

## Validation popovers

### Basic validation feedback

Show validation errors in a popover when field loses focus:

```html
<sp-field-label for="email-field">Email address</sp-field-label>
<sp-textfield
    id="email-field"
    type="email"
    aria-describedby="email-error"
    aria-invalid="false"
></sp-textfield>

<sp-overlay
    id="email-validation"
    type="auto"
    receives-focus="false"
    placement="bottom-start"
>
    <sp-popover>
        <sp-help-text id="email-error" variant="negative">
            Please enter a valid email address
        </sp-help-text>
    </sp-popover>
</sp-overlay>

<script>
    const field = document.querySelector('#email-field');
    const overlay = document.querySelector('#email-validation');

    field.addEventListener('blur', () => {
        if (!field.validity.valid) {
            overlay.triggerElement = field;
            overlay.open = true;
            field.setAttribute('aria-invalid', 'true');
        }
    });

    field.addEventListener('input', () => {
        if (field.validity.valid && overlay.open) {
            overlay.open = false;
            field.setAttribute('aria-invalid', 'false');
        }
    });
</script>
```

### Multiple validation rules

Show specific error messages based on validation type:

```javascript
const field = document.querySelector('#password-field');
const overlay = document.querySelector('#password-validation');
const errorMessage = overlay.querySelector('sp-help-text');

function validatePassword() {
  const value = field.value;
  let error = '';

  if (value.length === 0) {
    error = 'Password is required';
  } else if (value.length < 8) {
    error = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(value)) {
    error = 'Password must contain an uppercase letter';
  } else if (!/[0-9]/.test(value)) {
    error = 'Password must contain a number';
  }

  if (error) {
    errorMessage.textContent = error;
    overlay.triggerElement = field;
    overlay.open = true;
    field.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    overlay.open = false;
    field.setAttribute('aria-invalid', 'false');
    return true;
  }
}

field.addEventListener('blur', validatePassword);
field.addEventListener('input', () => {
  if (overlay.open) {
    validatePassword();
  }
});
</script>
```

### Real-time validation with debounce

Validate as user types, but debounce to avoid excessive API calls:

```javascript
import { debounce } from '@spectrum-web-components/shared';

const usernameField = document.querySelector('#username-field');
const overlay = document.querySelector('#username-validation');

const checkUsername = debounce(async (username) => {
    if (username.length < 3) {
        showError('Username must be at least 3 characters');
        return;
    }

    // Check availability with API
    const response = await fetch(`/api/check-username?name=${username}`);
    const { available } = await response.json();

    if (!available) {
        showError('Username is already taken');
    } else {
        overlay.open = false;
        usernameField.setAttribute('aria-invalid', 'false');
    }
}, 500); // Wait 500ms after user stops typing

function showError(message) {
    overlay.querySelector('sp-help-text').textContent = message;
    overlay.triggerElement = usernameField;
    overlay.open = true;
    usernameField.setAttribute('aria-invalid', 'true');
}

usernameField.addEventListener('input', (e) => {
    checkUsername(e.target.value);
});
```

## Field help and tooltips

### Contextual help icons

Add help icons next to field labels:

```html
<div style="display: flex; align-items: center; gap: 8px;">
    <sp-field-label for="api-key">API Key</sp-field-label>
    <sp-action-button id="api-key-help" size="xs" quiet>
        <sp-icon-info slot="icon"></sp-icon-info>
    </sp-action-button>
</div>

<sp-textfield id="api-key"></sp-textfield>

<overlay-trigger placement="top">
    <sp-action-button slot="trigger" id="api-key-help-trigger" size="xs" quiet>
        <sp-icon-info slot="icon"></sp-icon-info>
    </sp-action-button>

    <sp-tooltip slot="hover-content">Click for more information</sp-tooltip>

    <sp-popover slot="click-content">
        <sp-dialog size="s">
            <h2 slot="heading">API Key Help</h2>
            <p>You can find your API key in your account settings.</p>
            <sp-link href="/docs/api-keys">Learn more</sp-link>
        </sp-dialog>
    </sp-popover>
</overlay-trigger>
```

### Field-level tooltips

Show format hints on focus:

```html
<sp-field-label for="phone-field">Phone number</sp-field-label>
<sp-textfield id="phone-field" placeholder="(555) 123-4567"></sp-textfield>

<sp-overlay
    id="phone-hint"
    type="hint"
    placement="right"
    receives-focus="false"
>
    <sp-tooltip>Format: (XXX) XXX-XXXX</sp-tooltip>
</sp-overlay>

<script>
    const phoneField = document.querySelector('#phone-field');
    const phoneHint = document.querySelector('#phone-hint');

    phoneField.addEventListener('focus', () => {
        phoneHint.triggerElement = phoneField;
        phoneHint.open = true;
    });

    phoneField.addEventListener('blur', () => {
        phoneHint.open = false;
    });
</script>
```

## Picker components

### Date picker

Integrate a date picker overlay with form fields:

```html
<sp-field-label for="date-input">Select date</sp-field-label>
<sp-textfield id="date-input" readonly placeholder="MM/DD/YYYY"></sp-textfield>

<sp-overlay id="date-picker-overlay" type="auto" placement="bottom-start">
    <sp-popover>
        <div id="date-picker-calendar">
            <!-- Calendar component here -->
            <sp-action-group>
                <sp-action-button data-date="2024-01-01">
                    Jan 1
                </sp-action-button>
                <sp-action-button data-date="2024-01-02">
                    Jan 2
                </sp-action-button>
                <!-- More dates... -->
            </sp-action-group>
        </div>
    </sp-popover>
</sp-overlay>

<script>
    const dateInput = document.querySelector('#date-input');
    const dateOverlay = document.querySelector('#date-picker-overlay');
    const calendar = document.querySelector('#date-picker-calendar');

    // Open picker when field is clicked
    dateInput.addEventListener('click', () => {
        dateOverlay.triggerElement = dateInput;
        dateOverlay.open = true;
    });

    // Handle date selection
    calendar.addEventListener('click', (e) => {
        if (e.target.matches('sp-action-button')) {
            const selectedDate = e.target.dataset.date;
            dateInput.value = new Date(selectedDate).toLocaleDateString();
            dateOverlay.open = false;

            // Dispatch change event for form validation
            dateInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
</script>
```

### Color picker

Integrate a color picker overlay:

```html
<sp-field-label for="color-input">Select color</sp-field-label>
<div style="display: flex; gap: 8px;">
    <sp-textfield
        id="color-input"
        value="#FF0000"
        pattern="^#[0-9A-Fa-f]{6}$"
    ></sp-textfield>
    <sp-action-button id="color-picker-btn">
        <div
            style="width: 16px; height: 16px; background: #FF0000; border: 1px solid #000;"
            id="color-preview"
        ></div>
    </sp-action-button>
</div>

<sp-overlay
    id="color-picker-overlay"
    trigger="color-picker-btn@click"
    type="auto"
    placement="bottom-start"
>
    <sp-popover>
        <sp-color-area id="color-area" color="#FF0000"></sp-color-area>
    </sp-popover>
</sp-overlay>

<script>
    const colorInput = document.querySelector('#color-input');
    const colorArea = document.querySelector('#color-area');
    const colorPreview = document.querySelector('#color-preview');
    const colorOverlay = document.querySelector('#color-picker-overlay');

    // Update input and preview when color changes
    colorArea.addEventListener('change', (e) => {
        const color = e.target.color;
        colorInput.value = color;
        colorPreview.style.background = color;
    });

    // Update color area when input changes
    colorInput.addEventListener('input', (e) => {
        if (e.target.validity.valid) {
            colorArea.color = e.target.value;
            colorPreview.style.background = e.target.value;
        }
    });

    // Close picker after selection
    colorArea.addEventListener('change', () => {
        setTimeout(() => {
            colorOverlay.open = false;
        }, 300); // Small delay for better UX
    });
</script>
```

### Dropdown select

Custom dropdown picker for form selects:

```html
<sp-field-label for="country-select">Country</sp-field-label>
<sp-button id="country-select">
    <span id="selected-country">Select a country</span>
    <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
</sp-button>

<!-- Hidden input for form submission -->
<input type="hidden" id="country-input" name="country" value="" />

<sp-overlay trigger="country-select@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu id="country-menu">
            <sp-menu-item value="us">United States</sp-menu-item>
            <sp-menu-item value="ca">Canada</sp-menu-item>
            <sp-menu-item value="mx">Mexico</sp-menu-item>
            <sp-menu-item value="uk">United Kingdom</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>

<script>
    const selectedCountry = document.querySelector('#selected-country');
    const countryInput = document.querySelector('#country-input');
    const countryMenu = document.querySelector('#country-menu');

    countryMenu.addEventListener('change', (e) => {
        const selected = e.target.selectedItems[0];
        selectedCountry.textContent = selected.textContent;
        countryInput.value = selected.value;

        // Dispatch change event for validation
        countryInput.dispatchEvent(new Event('change', { bubbles: true }));
    });
</script>
```

## Inline error messages

### Error summary at form top

Show all validation errors in a single popover:

```html
<form id="registration-form">
    <sp-button id="show-errors" type="button">
        <sp-icon-alert slot="icon"></sp-icon-alert>
        Show errors
    </sp-button>

    <sp-overlay
        trigger="show-errors@click"
        type="auto"
        placement="bottom-start"
    >
        <sp-popover>
            <div id="error-summary">
                <sp-help-text variant="negative">
                    Please fix the following errors:
                </sp-help-text>
                <ul id="error-list"></ul>
            </div>
        </sp-popover>
    </sp-overlay>

    <!-- Form fields... -->
    <sp-textfield id="username" required></sp-textfield>
    <sp-textfield id="email" type="email" required></sp-textfield>

    <sp-button type="submit">Submit</sp-button>
</form>

<script>
    const form = document.querySelector('#registration-form');
    const errorList = document.querySelector('#error-list');
    const showErrorsBtn = document.querySelector('#show-errors');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const errors = [];
        const fields = form.querySelectorAll('[required]');

        fields.forEach((field) => {
            if (!field.validity.valid) {
                const label =
                    form.querySelector(`label[for="${field.id}"]`)
                        ?.textContent || field.id;
                errors.push(`${label}: ${field.validationMessage}`);
            }
        });

        if (errors.length > 0) {
            errorList.innerHTML = errors
                .map((err) => `<li>${err}</li>`)
                .join('');
            showErrorsBtn.style.display = 'block';
        } else {
            // Submit form
            console.log('Form is valid!');
        }
    });
</script>
```

## Form submission handling

### Confirmation dialog before submit

Show confirmation overlay before submitting:

```html
<form id="delete-form">
    <sp-button id="delete-btn" variant="negative">Delete Account</sp-button>

    <sp-overlay trigger="delete-btn@click" type="modal">
        <sp-popover>
            <sp-dialog>
                <h2 slot="heading">Confirm Account Deletion</h2>
                <p>
                    This action cannot be undone. Are you sure you want to
                    delete your account?
                </p>
                <sp-button slot="button" variant="accent" id="confirm-delete">
                    Yes, Delete
                </sp-button>
                <sp-button
                    slot="button"
                    variant="secondary"
                    onclick="this.closest('sp-overlay').open = false"
                >
                    Cancel
                </sp-button>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
</form>

<script>
    const deleteForm = document.querySelector('#delete-form');
    const deleteBtn = document.querySelector('#delete-btn');
    const confirmBtn = document.querySelector('#confirm-delete');
    const deleteOverlay = document.querySelector('sp-overlay');

    // Prevent default form submission
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // Handle confirmed deletion
    confirmBtn.addEventListener('click', async () => {
        // Perform deletion
        const response = await fetch('/api/delete-account', {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.href = '/account-deleted';
        } else {
            alert('Failed to delete account');
        }

        deleteOverlay.open = false;
    });
</script>
```

### Success notification after submit

Show success message in overlay:

```javascript
const form = document.querySelector('#contact-form');
const successOverlay = document.querySelector('#success-overlay');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        // Show success overlay
        successOverlay.open = true;

        // Reset form
        form.reset();

        // Auto-close after 3 seconds
        setTimeout(() => {
            successOverlay.open = false;
        }, 3000);
    }
});
```

## Accessibility considerations

### Proper ARIA labels

Ensure all form fields and overlays are properly labeled:

```html
<sp-field-label for="username" id="username-label">Username</sp-field-label>
<sp-textfield
    id="username"
    aria-labelledby="username-label"
    aria-describedby="username-help username-error"
    aria-invalid="false"
></sp-textfield>

<sp-help-text id="username-help">Must be 3-20 characters</sp-help-text>

<sp-overlay id="username-error-overlay" type="auto" receives-focus="false">
    <sp-popover>
        <sp-help-text id="username-error" variant="negative" role="alert">
            <!-- Error message here -->
        </sp-help-text>
    </sp-popover>
</sp-overlay>
```

### Focus management

Return focus appropriately after validation:

```javascript
// After showing validation error
if (!field.validity.valid) {
    overlay.open = true;
    // Keep focus on field for immediate correction
    field.focus();
}

// After successful picker selection
pickerOverlay.addEventListener('sp-closed', () => {
    // Return focus to field
    field.focus();
});
```

### Keyboard navigation

Ensure pickers work with keyboard:

```html
<sp-overlay type="auto">
    <sp-popover>
        <sp-menu>
            <!-- Menu items are keyboard accessible by default -->
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option 2</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

## See also

- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Comprehensive accessibility guide
- [PERFORMANCE.md](./PERFORMANCE.md) - Performance optimization
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions
