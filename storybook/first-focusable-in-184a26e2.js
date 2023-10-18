import { u as userFocusableSelector } from './focusable-selectors-252ae36e.js';

const firstFocusableIn=e=>e.querySelector(userFocusableSelector),firstFocusableSlottedIn=e=>e.assignedElements().find(o=>o.matches(userFocusableSelector));

export { firstFocusableSlottedIn as a, firstFocusableIn as f };
