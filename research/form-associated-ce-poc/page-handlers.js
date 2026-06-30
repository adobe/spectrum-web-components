/**
 * Copyright 2026 Adobe. All rights reserved.
 *
 * Page-level form handlers, matrix introspection, and axe-core integration.
 * Separated from the component code for easier navigation.
 */

// Form 1a: submit + reset
document.getElementById('form-1a').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
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
    out.textContent = `Reset fired.\nValue after reset: "${field.value}"\nformResetCallback: ${field.value === 'Jane Doe' ? 'PASS' : 'FAIL'}`;
  });
});

// Form 1b: constraint validation
document.getElementById('form-1b').addEventListener('submit', (event) => {
  event.preventDefault();
  const field = document.getElementById('field-1b');
  const out = document.getElementById('output-1b');
  const valid = field.reportValidity();
  out.textContent =
    `reportValidity(): ${valid}\n` +
    `validity.valid: ${field.validity.valid}\n` +
    `validity.valueMissing: ${field.validity.valueMissing}\n` +
    `validity.patternMismatch: ${field.validity.patternMismatch}\n` +
    `validationMessage: "${field.validationMessage}"\n\n` +
    `Constraint validation: ${!valid ? 'PASS (correctly rejected)' : 'Check input'}`;
});

// Form 1c: disabled fieldset
document.getElementById('form-1c').addEventListener('submit', (event) => {
  event.preventDefault();
  const field = document.getElementById('field-1c');
  const out = document.getElementById('output-1c');
  const data = new FormData(event.target);
  const shadowInput = field.shadowRoot?.querySelector('input');
  out.textContent =
    `Shadow input disabled: ${shadowInput?.disabled ?? 'N/A'}\n` +
    `Host has disabled attr: ${field.hasAttribute('disabled')}\n` +
    `formDisabledCallback: fires when fieldset is disabled\n` +
    `FormData includes field: ${data.has('disabledfield') ? 'YES (unexpected)' : 'NO (correct)'}\n\n` +
    `Disabled via fieldset: ${!data.has('disabledfield') ? 'PASS' : 'FAIL'}`;
});

// Form 3b: custom validation + ariaInvalid
document.getElementById('form-3b').addEventListener('submit', (event) => {
  event.preventDefault();
  const field = document.getElementById('field-3b');
  const shadowInput = field.shadowRoot?.querySelector('input');
  const out = document.getElementById('output-3b');
  const valid = field.reportValidity();
  out.textContent =
    `reportValidity(): ${valid}\n` +
    `validity.valid: ${field.validity.valid}\n` +
    `validity.rangeUnderflow: ${field.validity.rangeUnderflow}\n` +
    `validationMessage: "${field.validationMessage}"\n\n` +
    `--- internals.ariaInvalid observations ---\n` +
    `host aria-invalid attr: ${field.getAttribute('aria-invalid') ?? '(not reflected)'}\n` +
    `shadow input aria-invalid attr: ${shadowInput?.getAttribute('aria-invalid') ?? '(not set)'}\n\n` +
    `Custom validation: ${!valid ? 'PASS (correctly rejected)' : 'Check input value'}`;
});

// IDREF matrix introspection (reads DOM state, not a11y tree)
function populateMatrix() {
  const scenarios = [
    {
      id: 'A',
      name: 'Light DOM siblings',
      fieldId: 'field-2a',
      labelMethod: 'aria-labelledby on host → light DOM #label-2a',
      descMethod: 'aria-describedby on host → light DOM #help-2a',
    },
    {
      id: 'B',
      name: 'Slotted light DOM children',
      fieldId: 'field-2b',
      labelMethod: 'Slotted <span slot="label"> with ID',
      descMethod: 'Slotted <span slot="help-text"> with ID',
    },
    {
      id: 'C',
      name: 'Shadow DOM internal IDs',
      fieldId: 'field-2c',
      labelMethod: 'internal-label attr → shadow #shadow-label',
      descMethod: 'internal-help attr → shadow #shadow-help',
    },
    {
      id: 'D',
      name: 'Cross-root (label for → host)',
      fieldId: 'field-2d',
      labelMethod: '<label for="field-2d"> in light DOM',
      descMethod: 'N/A (no describedby set)',
    },
  ];

  const tbody = document.getElementById('matrix-body');
  tbody.innerHTML = '';

  for (const s of scenarios) {
    const field = document.getElementById(s.fieldId);
    if (!field) {
      continue;
    }

    let domName = '(inspect DevTools)';
    let domDesc = '(inspect DevTools)';
    let status = 'pending';

    try {
      const ariaLabel = field.getAttribute('aria-label') || '';
      const labelledby = field.getAttribute('aria-labelledby') || '';
      const describedby = field.getAttribute('aria-describedby') || '';

      if (ariaLabel) {
        domName = `aria-label: "${ariaLabel}"`;
      } else if (labelledby) {
        const text = labelledby
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean)
          .join(' ');
        domName = text ? `Resolved: "${text}"` : `IDs not found: ${labelledby}`;
      }

      if (describedby) {
        const text = describedby
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean)
          .join(' ');
        domDesc = text
          ? `Resolved: "${text}"`
          : `IDs not found: ${describedby}`;
      }
    } catch {
      // introspection may fail
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${s.id}:</strong> ${s.name}</td>
      <td><code>${escapeHtml(s.labelMethod)}</code></td>
      <td><code>${escapeHtml(s.descMethod)}</code></td>
      <td>${domName}</td>
      <td>${domDesc}</td>
      <td class="${status}">${status}</td>
    `;
    tbody.appendChild(row);
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

requestAnimationFrame(() => {
  requestAnimationFrame(populateMatrix);
});

// axe-core integration
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
          <h4>${escapeHtml(v.id)}: ${escapeHtml(v.help)}</h4>
          <p><strong>Impact:</strong> ${v.impact} | <strong>Tags:</strong> ${v.tags.join(', ')}</p>
          <p>${escapeHtml(v.description)}</p>
          <details>
            <summary>Affected nodes (${v.nodes.length})</summary>
            <ul>
              ${v.nodes.map((n) => `<li><code>${escapeHtml(n.html)}</code><br/>${escapeHtml(n.failureSummary ?? '')}</li>`).join('')}
            </ul>
          </details>
          ${v.helpUrl ? `<p><a href="${v.helpUrl}" target="_blank">Deque reference</a></p>` : ''}
        </div>
      `;
    }

    html += `<h3>Incomplete / needs review (${results.incomplete.length})</h3>`;
    for (const inc of results.incomplete) {
      html += `
        <div class="axe-incomplete">
          <strong>${escapeHtml(inc.id)}</strong>: ${escapeHtml(inc.help)}<br/>
          <small>Nodes: ${inc.nodes.length} | Tags: ${inc.tags.join(', ')}</small>
          ${inc.helpUrl ? ` | <a href="${inc.helpUrl}" target="_blank">Reference</a>` : ''}
        </div>
      `;
    }

    const relevantPasses = results.passes.filter((p) =>
      [
        'label',
        'aria-label',
        'aria-labelledby',
        'form-field-multiple-labels',
        'aria-valid-attr',
        'aria-valid-attr-value',
        'aria-roles',
        'label-title-only',
        'aria-input-field-name',
      ].some((id) => p.id.includes(id))
    );
    html += `<h3>Relevant passes (${relevantPasses.length} of ${results.passes.length} total)</h3>`;
    for (const p of relevantPasses) {
      html += `<div class="axe-pass"><strong>${escapeHtml(p.id)}</strong>: ${escapeHtml(p.help)}</div>`;
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
