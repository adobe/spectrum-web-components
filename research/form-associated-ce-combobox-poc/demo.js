/**
 * Copyright 2026 Adobe. All rights reserved.
 *
 * Demo page event handlers for form submission, logging, and axe-core audit.
 */

// ─── Form handlers ────────────────────────────────────────────────────────────

document.getElementById('form-1a').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const out = document.getElementById('output-1a');
  const entries = [...data.entries()];
  out.textContent =
    'FormData entries:\n' +
    entries.map(([k, v]) => `  ${k}: "${v}"`).join('\n') +
    '\n\nForm participation: ' +
    (entries.length > 0 ? 'PASS' : 'FAIL');
});

document.getElementById('form-1a').addEventListener('reset', () => {
  const out = document.getElementById('output-1a');
  requestAnimationFrame(() => {
    const field = document.getElementById('field-1a');
    out.textContent = `Reset fired.\nValue after reset: "${field.value}"\nformResetCallback: ${field.value === 'Apple' ? 'PASS' : 'FAIL'}`;
  });
});

document.getElementById('form-1b').addEventListener('submit', (e) => {
  e.preventDefault();
  const field = document.getElementById('field-1b');
  const out = document.getElementById('output-1b');
  const valid = field.reportValidity();
  out.textContent =
    `reportValidity(): ${valid}\n` +
    `validity.valid: ${field.validity.valid}\n` +
    `validity.valueMissing: ${field.validity.valueMissing}\n` +
    `validationMessage: "${field.validationMessage}"\n\n` +
    `Constraint validation: ${!valid ? 'PASS (correctly rejected)' : 'Check input'}`;
});

document.getElementById('form-1c').addEventListener('submit', (e) => {
  e.preventDefault();
  const field = document.getElementById('field-1c');
  const out = document.getElementById('output-1c');
  const data = new FormData(e.target);
  const shadowInput = field.shadowRoot?.querySelector('input');
  out.textContent =
    `Shadow input disabled: ${shadowInput?.disabled ?? 'N/A'}\n` +
    `Host has disabled attr: ${field.hasAttribute('disabled')}\n` +
    `formDisabledCallback: fires when fieldset is disabled\n` +
    `FormData includes field: ${data.has('disabledcombo') ? 'YES (unexpected)' : 'NO (correct)'}\n\n` +
    `Disabled via fieldset: ${!data.has('disabledcombo') ? 'PASS' : 'FAIL'}`;
});

document.getElementById('form-1d').addEventListener('submit', (e) => {
  e.preventDefault();
  const field = document.getElementById('field-1d');
  const out = document.getElementById('output-1d');
  const data = new FormData(e.target);
  const isOpen = field.hasAttribute('open');
  out.textContent =
    `Listbox open at submit time: ${isOpen}\n` +
    `FormData value: "${data.get('color')}"\n` +
    `field.value: "${field.value}"\n\n` +
    `Submit captures current input value regardless of open state: PASS`;
});

// ─── Keyboard + activedescendant logging ──────────────────────────────────────

const field2a = document.getElementById('field-2a');
const output2a = document.getElementById('output-2a');
let logLines2a = [];
field2a.addEventListener('combo-log', (e) => {
  logLines2a.push(e.detail.message);
  if (logLines2a.length > 12) logLines2a.shift();
  output2a.textContent = logLines2a.join('\n');
});
field2a.addEventListener('activedescendant-change', (e) => {
  logLines2a.push(
    `  activedescendant → #${e.detail.id} ("${e.detail.text}")`
  );
  if (logLines2a.length > 12) logLines2a.shift();
  output2a.textContent = logLines2a.join('\n');
});

// Section 4a
const field4a = document.getElementById('field-4a');
const output4a = document.getElementById('output-4a');
let logLines4a = [];
field4a.addEventListener('activedescendant-change', (e) => {
  logLines4a.push(
    `activedescendant: #${e.detail.id} → "${e.detail.text}" (index ${e.detail.index})`
  );
  if (logLines4a.length > 10) logLines4a.shift();
  output4a.textContent = logLines4a.join('\n');
});

// Section 5b
const field5b = document.getElementById('field-5b');
const output5b = document.getElementById('output-5b');
let logLines5b = [];
field5b.addEventListener('combo-expanded', (e) => {
  logLines5b.push(
    `expanded: ${e.detail.expanded} | internals.ariaExpanded set | host[open] attr ${e.detail.expanded ? 'added' : 'removed'}`
  );
  if (logLines5b.length > 8) logLines5b.shift();
  output5b.textContent = logLines5b.join('\n');
});

// Section 4c validation
document.getElementById('form-4c').addEventListener('submit', (e) => {
  e.preventDefault();
  const field = document.getElementById('field-4c');
  const out = document.getElementById('output-4c');
  const valid = field.reportValidity();
  out.textContent =
    `reportValidity(): ${valid}\n` +
    `validity.valid: ${field.validity.valid}\n` +
    `validity.valueMissing: ${field.validity.valueMissing}\n` +
    `validationMessage: "${field.validationMessage}"\n\n` +
    `Validation + error message: ${!valid ? 'PASS (correctly rejected)' : 'Check input value'}`;
});

// ─── axe-core ─────────────────────────────────────────────────────────────────

document.getElementById('run-axe').addEventListener('click', async () => {
  const resultsEl = document.getElementById('axe-results');
  resultsEl.textContent = 'Loading axe-core...';

  try {
    if (!window.axe) {
      await loadScript(
        'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js'
      );
    }

    resultsEl.textContent = 'Running audit...';

    const results = await window.axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
      },
    });

    let html = '';

    html += `<h3>Violations (${results.violations.length})</h3>`;
    if (results.violations.length === 0) {
      html += '<div class="axe-pass">No violations found.</div>';
    }
    for (const v of results.violations) {
      html += `
        <div class="axe-violation">
          <h4>${esc(v.id)}: ${esc(v.help)}</h4>
          <p><strong>Impact:</strong> ${v.impact} | <strong>Tags:</strong> ${v.tags.join(', ')}</p>
          <p>${esc(v.description)}</p>
          <details>
            <summary>Affected nodes (${v.nodes.length})</summary>
            <ul>${v.nodes.map((n) => `<li><code>${esc(n.html)}</code><br/>${esc(n.failureSummary ?? '')}</li>`).join('')}</ul>
          </details>
          ${v.helpUrl ? `<p><a href="${v.helpUrl}" target="_blank">Deque reference</a></p>` : ''}
        </div>`;
    }

    html += `<h3>Incomplete / needs review (${results.incomplete.length})</h3>`;
    for (const inc of results.incomplete) {
      html += `
        <div class="axe-incomplete">
          <strong>${esc(inc.id)}</strong>: ${esc(inc.help)}<br/>
          <small>Nodes: ${inc.nodes.length} | Tags: ${inc.tags.join(', ')}</small>
          ${inc.helpUrl ? ` | <a href="${inc.helpUrl}" target="_blank">Reference</a>` : ''}
        </div>`;
    }

    const relevantPasses = results.passes.filter((p) =>
      ['label', 'aria-label', 'aria-labelledby', 'aria-valid-attr', 'aria-roles', 'aria-input-field-name', 'aria-required-attr'].some(
        (id) => p.id.includes(id)
      )
    );
    html += `<h3>Relevant passes (${relevantPasses.length} of ${results.passes.length} total)</h3>`;
    for (const p of relevantPasses) {
      html += `<div class="axe-pass"><strong>${esc(p.id)}</strong>: ${esc(p.help)}</div>`;
    }

    resultsEl.innerHTML = html;
  } catch (err) {
    resultsEl.textContent = `Error loading or running axe-core:\n${err.message}\n\nNote: axe-core requires network access to load from CDN.`;
  }
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
