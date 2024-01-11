const e=["button","[focusable]","[href]","input","label","select","textarea","[tabindex]"],o=':not([tabindex="-1"])';const userFocusableSelector=e.join(`${o}, `)+o,focusableSelector=e.join(", ");

export { focusableSelector as f, userFocusableSelector as u };
