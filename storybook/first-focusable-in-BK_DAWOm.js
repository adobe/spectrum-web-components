import { u as userFocusableSelector } from './focusable-selectors-CUZEb4r9.js';

const firstFocusableIn=e=>e.querySelector(userFocusableSelector),firstFocusableSlottedIn=e=>e.assignedElements().find(o=>o.matches(userFocusableSelector));

export { firstFocusableSlottedIn as a, firstFocusableIn as f };
