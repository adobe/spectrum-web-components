/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Compares collection semantics for swc-card-view. Not production code.

const METRICS = {
  xs: { gap: { compact: 6, regular: 8, spacious: 12 }, min: 100, max: 140 },
  s: { gap: { compact: 8, regular: 12, spacious: 16 }, min: 150, max: 210 },
  m: { gap: { compact: 12, regular: 16, spacious: 20 }, min: 200, max: 280 },
  l: { gap: { compact: 16, regular: 20, spacious: 24 }, min: 270, max: 370 },
  xl: { gap: { compact: 20, regular: 24, spacious: 28 }, min: 340, max: 460 },
};
const SIZE_ORDER = ['xs', 's', 'm', 'l', 'xl'];

const MODEL_LABELS = {
  'rsp-grid': 'A. React Spectrum grid (one card per row)',
  'apg-layout': 'B. APG layout grid (rows match visual rows)',
  'row-grid': 'C. Single-row grid',
  list: 'D. Linear list',
  listbox: 'D. Listbox (no card actions)',
};

const CONTROLS = [
  {
    key: 'model',
    label: 'Semantics model',
    options: Object.entries(MODEL_LABELS),
  },
  {
    key: 'layout',
    label: 'Layout',
    options: [
      ['grid', 'Grid'],
      ['waterfall', 'Waterfall'],
    ],
  },
  {
    key: 'size',
    label: 'Size (requested)',
    options: SIZE_ORDER.map((s) => [s, s.toUpperCase()]),
  },
  {
    key: 'density',
    label: 'Density',
    options: [
      ['compact', 'Compact'],
      ['regular', 'Regular'],
      ['spacious', 'Spacious'],
    ],
  },
  {
    key: 'variant',
    label: 'Variant',
    options: [
      ['primary', 'Primary'],
      ['secondary', 'Secondary'],
      ['tertiary', 'Tertiary'],
      ['quiet', 'Quiet'],
    ],
  },
  {
    key: 'selectionMode',
    label: 'Selection mode',
    options: [
      ['none', 'None'],
      ['single', 'Single'],
      ['multiple', 'Multiple'],
    ],
  },
  {
    key: 'selectionStyle',
    label: 'Selection style',
    options: [
      ['checkbox', 'Checkbox'],
      ['highlight', 'Highlight'],
    ],
  },
  {
    key: 'actions',
    label: 'Card actions',
    options: [
      ['none', 'None'],
      ['visible', 'Always visible'],
      ['hover', 'Revealed on hover or focus'],
    ],
  },
  {
    key: 'tabModel',
    label: 'Tab model',
    options: [
      ['express', 'Tab into card actions (Express)'],
      ['single', 'Single tab stop (Enter reaches actions)'],
    ],
  },
  {
    key: 'pageStep',
    label: 'Page Up/Down step (linear models)',
    options: [
      ['3', '3 cards'],
      ['5', '5 cards'],
      ['10', '10 cards'],
    ],
  },
  {
    key: 'count',
    label: 'Cards',
    options: [
      ['12', '12'],
      ['24', '24'],
      ['48', '48'],
      ['96', '96'],
    ],
  },
  {
    key: 'dir',
    label: 'Direction',
    options: [
      ['ltr', 'Left to right'],
      ['rtl', 'Right to left'],
    ],
  },
  { key: 'disabled', label: 'Include disabled cards', type: 'checkbox' },
  {
    key: 'describePos',
    label: 'List: add "N of M" to focus target description',
    type: 'checkbox',
  },
];

const PRESETS = {
  rsp: {
    model: 'rsp-grid',
    layout: 'grid',
    selectionMode: 'multiple',
    selectionStyle: 'checkbox',
    actions: 'hover',
    tabModel: 'single',
    describePos: false,
  },
  apg: {
    model: 'apg-layout',
    layout: 'grid',
    selectionMode: 'multiple',
    selectionStyle: 'checkbox',
    actions: 'hover',
    tabModel: 'single',
    describePos: false,
  },
  list: {
    model: 'list',
    layout: 'grid',
    selectionMode: 'multiple',
    selectionStyle: 'checkbox',
    actions: 'hover',
    tabModel: 'express',
    describePos: true,
  },
  'row-grid': {
    model: 'row-grid',
    layout: 'grid',
    selectionMode: 'multiple',
    selectionStyle: 'checkbox',
    actions: 'hover',
    tabModel: 'express',
    describePos: false,
  },
  listbox: {
    model: 'listbox',
    layout: 'grid',
    selectionMode: 'multiple',
    selectionStyle: 'highlight',
    actions: 'none',
    tabModel: 'express',
    describePos: false,
  },
};

const DEFAULTS = {
  model: 'rsp-grid',
  layout: 'grid',
  size: 'm',
  density: 'regular',
  variant: 'primary',
  selectionMode: 'multiple',
  selectionStyle: 'checkbox',
  actions: 'hover',
  tabModel: 'single',
  pageStep: '5',
  count: '24',
  dir: 'ltr',
  disabled: false,
  describePos: false,
  width: 900,
  full: false,
};

const NAMES = [
  'Mountain lake',
  'Desert dunes',
  'Pine forest',
  'Coral reef',
  'Glacier bay',
  'Autumn maple',
  'Tundra sunrise',
  'Bamboo grove',
  'Canyon river',
  'Lavender field',
  'Rainforest canopy',
  'Volcanic coast',
  'Alpine meadow',
  'Salt flats',
  'Mangrove delta',
  'Fjord cliffs',
  'Prairie storm',
  'Cherry blossom',
  'Kelp forest',
  'Aurora night',
  'Sand cove',
  'Moss cave',
  'Tea terraces',
  'Ice cave',
];
const TAGS = ['Landscape', 'Nature', 'Travel', 'Water'];
const ASPECTS = [4 / 3, 3 / 4, 1, 16 / 9, 2 / 3, 5 / 4, 3 / 2, 4 / 5];
const DISABLED_INDICES = new Set([3, 10, 17]);

const KEY_NAMES = {
  ' ': 'Space',
  ArrowDown: 'Down Arrow',
  ArrowUp: 'Up Arrow',
  ArrowLeft: 'Left Arrow',
  ArrowRight: 'Right Arrow',
  PageDown: 'Page Down',
  PageUp: 'Page Up',
};

// ---------------------------------------------------------------- state

const state = {
  ...DEFAULTS,
  ...readUrl(),
  selected: new Set(),
  focusedIndex: 0,
  anchor: null,
};

let items = [];
let root = null;
let positions = [];
let resolvedSize = 'm';
let columnCount = 1;
let lastNav = null;
let lastKeyName = '';
let quietFocus = false;
let rowSignature = '';

const $ = (id) => document.getElementById(id);

// The prototype renders in the light DOM, so the document's active element is accurate.
// eslint-disable-next-line swc/document-active-element
const activeElement = () => document.activeElement;
const scroller = $('scroller');
const frame = $('frame');

function readUrl() {
  const params = new URLSearchParams(location.search);
  const out = {};
  for (const control of CONTROLS) {
    if (!params.has(control.key)) {
      continue;
    }
    const value = params.get(control.key);
    if (control.type === 'checkbox') {
      out[control.key] = value === '1';
    } else if (control.options.some(([v]) => v === value)) {
      out[control.key] = value;
    }
  }
  if (params.has('width')) {
    out.width = Number(params.get('width')) || DEFAULTS.width;
  }
  if (params.has('full')) {
    out.full = params.get('full') === '1';
  }
  return out;
}

function writeUrl() {
  const params = new URLSearchParams();
  for (const control of CONTROLS) {
    const value = state[control.key];
    params.set(
      control.key,
      control.type === 'checkbox' ? (value ? '1' : '0') : value
    );
  }
  params.set('width', String(state.width));
  params.set('full', state.full ? '1' : '0');
  history.replaceState(null, '', `?${params}`);
}

// ---------------------------------------------------------------- helpers

const selectable = () => state.selectionMode !== 'none';
const isMulti = () => state.selectionMode === 'multiple';
const hasActions = () => state.actions !== 'none' && state.model !== 'listbox';
const isApg = () => state.model === 'apg-layout';
const apgRows = () => isApg() && state.layout === 'grid';
// Card actions are reached with a secondary command (Enter or F2) instead of Tab.
const cellMode = () => hasActions() && (isApg() || state.tabModel === 'single');
const isDisabled = (i) => state.disabled && DISABLED_INDICES.has(i);
const keyName = (event) =>
  [
    event.ctrlKey && 'Ctrl',
    event.metaKey && 'Cmd',
    event.altKey && 'Alt',
    event.shiftKey && event.key !== 'Shift' && 'Shift',
    KEY_NAMES[event.key] || event.key,
  ]
    .filter(Boolean)
    .join(' + ');

function makeItems(n) {
  return Array.from({ length: n }, (_, i) => {
    const round = Math.floor(i / NAMES.length);
    return {
      key: `k${i}`,
      title: NAMES[i % NAMES.length] + (round ? ` ${round + 1}` : ''),
      desc: `Photo ${i + 1} · ${TAGS[i % TAGS.length]}`,
      hue: (i * 47) % 360,
      aspect: ASPECTS[i % ASPECTS.length],
    };
  });
}

function escapeHtml(text) {
  return text.replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]
  );
}

// ---------------------------------------------------------------- controls

function buildControls() {
  const grid = $('control-grid');
  for (const control of CONTROLS) {
    const wrap = document.createElement('div');
    const id = `ctl-${control.key}`;
    if (control.type === 'checkbox') {
      wrap.innerHTML = `<label class="check"><input type="checkbox" id="${id}"> ${control.label}</label>`;
      const input = wrap.querySelector('input');
      input.checked = Boolean(state[control.key]);
      input.addEventListener('change', () =>
        update({ [control.key]: input.checked })
      );
    } else {
      wrap.innerHTML = `<label for="${id}">${control.label}</label><select id="${id}">${control.options
        .map(([v, l]) => `<option value="${v}">${escapeHtml(l)}</option>`)
        .join('')}</select>`;
      const select = wrap.querySelector('select');
      select.value = state[control.key];
      select.addEventListener('change', () =>
        update({ [control.key]: select.value })
      );
    }
    grid.append(wrap);
  }

  const width = $('width');
  const full = $('full-width');
  width.value = state.width;
  full.checked = state.full;
  width.addEventListener('input', () => {
    state.width = Number(width.value);
    applyFrameWidth();
    writeUrl();
  });
  full.addEventListener('change', () => {
    state.full = full.checked;
    applyFrameWidth();
    writeUrl();
  });

  document.querySelectorAll('[data-preset]').forEach((button) =>
    button.addEventListener('click', () => {
      update(PRESETS[button.dataset.preset]);
      syncPresetButtons(button.dataset.preset);
    })
  );
  $('clear-log').addEventListener('click', () => ($('log').textContent = ''));
}

function syncControls() {
  for (const control of CONTROLS) {
    const el = $(`ctl-${control.key}`);
    if (control.type === 'checkbox') {
      el.checked = Boolean(state[control.key]);
    } else {
      el.value = state[control.key];
    }
  }
  $('ctl-selectionStyle').disabled = !selectable();
  $('ctl-actions').disabled = state.model === 'listbox';
  $('ctl-tabModel').disabled = !hasActions() || isApg();
  $('ctl-describePos').disabled = state.model !== 'list';
  $('ctl-describePos')
    .closest('label')
    .setAttribute('aria-disabled', String(state.model !== 'list'));
  $('ctl-pageStep').disabled = state.model === 'rsp-grid' || apgRows();
}

function syncPresetButtons(active) {
  document.querySelectorAll('[data-preset]').forEach((button) => {
    const preset = PRESETS[button.dataset.preset];
    const matches = active
      ? button.dataset.preset === active
      : Object.entries(preset).every(([k, v]) => state[k] === v);
    button.setAttribute('aria-pressed', String(matches));
  });
}

function applyFrameWidth() {
  frame.classList.toggle('full', state.full);
  frame.style.width = state.full ? '' : `${state.width}px`;
  $('width').disabled = state.full;
  $('width-out').textContent = state.full ? 'full' : `${state.width}px`;
}

function update(patch) {
  Object.assign(state, patch);
  syncControls();
  syncPresetButtons();
  writeUrl();
  render();
}

// ---------------------------------------------------------------- render

function render() {
  const hadFocus = root?.contains(activeElement());
  items = makeItems(Number(state.count));
  const keys = new Set(items.map((it) => it.key));
  state.selected = new Set([...state.selected].filter((k) => keys.has(k)));
  if (!selectable()) {
    state.selected.clear();
  }
  if (state.selectionMode === 'single' && state.selected.size > 1) {
    state.selected = new Set([[...state.selected][0]]);
  }
  state.focusedIndex = Math.min(state.focusedIndex, items.length - 1);
  if (isDisabled(state.focusedIndex)) {
    state.focusedIndex = firstEnabled();
  }

  scroller.textContent = '';
  rowSignature = '';
  root = createRoot();
  const container =
    state.model === 'row-grid' ? root.querySelector('.row-wrap') : root;
  items.forEach((item, i) => container.append(createBox(item, i)));
  scroller.append(root);

  syncStates();
  updateRoving();
  layout();
  renderNotes();
  renderTree();
  if (hadFocus) {
    quietFocus = true;
    getTarget(state.focusedIndex)?.focus({ preventScroll: true });
    quietFocus = false;
  }
}

function createRoot() {
  const el = document.createElement(state.model === 'list' ? 'ul' : 'div');
  el.className = [
    'collection',
    `model-${state.model}`,
    `layout-${state.layout}`,
    `variant-${state.variant}`,
    `actions-${hasActions() ? state.actions : 'none'}`,
    `style-${selectable() ? state.selectionStyle : 'none'}`,
  ].join(' ');
  el.dir = state.dir;
  el.setAttribute('aria-label', 'Nature photos');
  const n = items.length;
  switch (state.model) {
    case 'rsp-grid':
      el.setAttribute('role', 'grid');
      if (isMulti()) {
        el.setAttribute('aria-multiselectable', 'true');
      }
      break;
    case 'apg-layout':
      // Rows are built in layout() so they match the visual rows.
      el.setAttribute('role', 'grid');
      if (isMulti()) {
        el.setAttribute('aria-multiselectable', 'true');
      }
      break;
    case 'row-grid': {
      el.setAttribute('role', 'grid');
      el.setAttribute('aria-rowcount', '1');
      el.setAttribute('aria-colcount', String(n));
      if (isMulti()) {
        el.setAttribute('aria-multiselectable', 'true');
      }
      const row = document.createElement('div');
      row.setAttribute('role', 'row');
      row.className = 'row-wrap';
      el.append(row);
      break;
    }
    case 'list':
      el.setAttribute('role', 'list');
      break;
    case 'listbox':
      el.setAttribute('role', 'listbox');
      if (isMulti()) {
        el.setAttribute('aria-multiselectable', 'true');
      }
      break;
  }
  return el;
}

function createBox(item, i) {
  const n = items.length;
  const titleId = `title-${i}`;
  const disabled = isDisabled(i);
  const showVisualCheck = selectable() && state.selectionStyle === 'checkbox';
  const showBadge = selectable() && state.selectionStyle === 'highlight';
  const aspect = state.layout === 'waterfall' ? item.aspect : 4 / 3;
  const title = escapeHtml(item.title);

  const actionsHtml = hasActions()
    ? `<div class="card-actions">
               <button type="button" class="action" data-action="Share" aria-label="Share ${title}" tabindex="-1">⤴</button>
               <button type="button" class="action" data-action="More actions" aria-label="More actions for ${title}" tabindex="-1">⋯</button>
           </div>`
    : '';
  const badgeHtml = showBadge
    ? '<span class="sel-badge" aria-hidden="true">✓ Selected</span>'
    : '';

  let box;
  if (state.model === 'list') {
    box = document.createElement('li');
    box.setAttribute('aria-posinset', String(i + 1));
    box.setAttribute('aria-setsize', String(n));
    const posId = `pos-${i}`;
    const describedBy = state.describePos ? ` aria-describedby="${posId}"` : '';
    const posHtml = state.describePos
      ? `<span id="${posId}" class="visually-hidden">${i + 1} of ${n}</span>`
      : '';
    const useCheckbox = selectable() && state.selectionStyle === 'checkbox';
    const nativeCheck = useCheckbox
      ? `<input type="checkbox" class="cb focus-target" data-index="${i}" aria-labelledby="${titleId}"${describedBy} tabindex="-1"${disabled ? ' disabled' : ''}>`
      : '';
    const pressed =
      selectable() && state.selectionStyle === 'highlight'
        ? ' aria-pressed="false"'
        : '';
    const titleHtml = useCheckbox
      ? `<div class="card-title" id="${titleId}">${title}</div>`
      : `<button type="button" class="card-title title-button focus-target" id="${titleId}" data-index="${i}"${pressed}${describedBy} tabindex="-1"${disabled ? ' disabled' : ''}>${title}</button>`;
    box.innerHTML = `
            <div class="card-preview" style="--hue:${item.hue}; aspect-ratio:${aspect}">${nativeCheck}${badgeHtml}</div>
            <div class="card-body">${titleHtml}<div class="card-desc">${escapeHtml(item.desc)}</div>${posHtml}</div>${actionsHtml}`;
  } else {
    const content = `
            <div class="card-preview" style="--hue:${item.hue}; aspect-ratio:${aspect}">${
              showVisualCheck
                ? '<span class="vcheck" aria-hidden="true"></span>'
                : ''
            }${badgeHtml}</div>
            <div class="card-body"><div class="card-title" id="${titleId}">${title}</div><div class="card-desc">${escapeHtml(item.desc)}</div></div>${actionsHtml}`;
    box = document.createElement('div');
    box.classList.add('focus-target');
    box.tabIndex = -1;
    box.setAttribute('aria-labelledby', titleId);
    if (disabled) {
      box.setAttribute('aria-disabled', 'true');
    }
    if (state.model === 'rsp-grid') {
      box.setAttribute('role', 'row');
      const cell = document.createElement('div');
      cell.setAttribute('role', 'gridcell');
      cell.innerHTML = content;
      box.append(cell);
    } else if (state.model === 'row-grid') {
      box.setAttribute('role', 'gridcell');
      box.setAttribute('aria-colindex', String(i + 1));
      box.innerHTML = content;
    } else if (isApg()) {
      box.setAttribute('role', 'gridcell');
      box.innerHTML = content;
    } else {
      box.setAttribute('role', 'option');
      box.setAttribute('aria-posinset', String(i + 1));
      box.setAttribute('aria-setsize', String(n));
      box.innerHTML = content;
    }
  }
  box.classList.add('box', 'card');
  box.classList.toggle('is-disabled', disabled);
  box.dataset.index = String(i);
  return box;
}

function syncStates() {
  if (!root) {
    return;
  }
  items.forEach((item, i) => {
    const box = getBox(i);
    const selected = state.selected.has(item.key);
    box.classList.toggle('is-selected', selected);
    const target = getTarget(i);
    if (state.model === 'list') {
      if (target.type === 'checkbox') {
        target.checked = selected;
      } else if (target.hasAttribute('aria-pressed')) {
        target.setAttribute('aria-pressed', String(selected));
      }
    } else if (selectable()) {
      target.setAttribute('aria-selected', String(selected));
    } else {
      target.removeAttribute('aria-selected');
    }
  });
}

function updateRoving() {
  if (!root) {
    return;
  }
  items.forEach((_, i) => {
    const target = getTarget(i);
    if (target) {
      target.tabIndex = i === state.focusedIndex ? 0 : -1;
    }
    getBox(i)
      .querySelectorAll('.action')
      .forEach((action) => {
        action.tabIndex =
          !cellMode() &&
          state.tabModel === 'express' &&
          i === state.focusedIndex
            ? 0
            : -1;
      });
  });
}

const getBox = (i) => root.querySelector(`.box[data-index="${i}"]`);
const getTarget = (i) => {
  const box = getBox(i);
  if (!box) {
    return null;
  }
  return box.classList.contains('focus-target')
    ? box
    : box.querySelector('.focus-target');
};

// ---------------------------------------------------------------- layout

function resolveSize(width) {
  let resolved = 'xs';
  for (const size of SIZE_ORDER.slice(0, SIZE_ORDER.indexOf(state.size) + 1)) {
    const m = METRICS[size];
    if (2 * m.min + 3 * m.gap[state.density] <= width) {
      resolved = size;
    }
  }
  return resolved;
}

function layout() {
  if (!root) {
    return;
  }
  const width = scroller.clientWidth;
  resolvedSize = resolveSize(width);
  SIZE_ORDER.forEach((s) =>
    root.classList.toggle(`size-${s}`, s === resolvedSize)
  );
  const m = METRICS[resolvedSize];
  const gap = m.gap[state.density];
  columnCount = Math.max(1, Math.floor((width - gap) / (m.min + gap)));
  const itemWidth = Math.max(
    60,
    Math.min(m.max, (width - (columnCount + 1) * gap) / columnCount)
  );
  const rtl = state.dir === 'rtl';
  const leftFor = (col) => {
    const left = gap + col * (itemWidth + gap);
    return rtl ? width - left - itemWidth : left;
  };

  const boxes = items.map((_, i) => getBox(i));
  boxes.forEach((box) => {
    box.style.width = `${itemWidth}px`;
    box.style.height = '';
  });
  const heights = boxes.map((box) => box.offsetHeight);
  positions = [];
  let total = gap;

  if (state.layout === 'grid') {
    for (
      let start = 0, row = 0;
      start < boxes.length;
      start += columnCount, row++
    ) {
      const rowHeights = heights.slice(start, start + columnCount);
      const rowHeight = Math.max(...rowHeights);
      for (let col = 0; col < rowHeights.length; col++) {
        const i = start + col;
        positions[i] = {
          row,
          col,
          top: total,
          height: rowHeight,
          left: leftFor(col),
        };
        boxes[i].style.height = `${rowHeight}px`;
      }
      total += rowHeight + gap;
    }
  } else {
    const colTops = Array(columnCount).fill(gap);
    const colCounts = Array(columnCount).fill(0);
    boxes.forEach((box, i) => {
      box.style.height = '';
      const col = colTops.indexOf(Math.min(...colTops));
      positions[i] = {
        col,
        order: colCounts[col]++,
        top: colTops[col],
        height: heights[i],
        left: leftFor(col),
      };
      colTops[col] += heights[i] + gap;
    });
    total = Math.max(...colTops);
  }

  boxes.forEach((box, i) => {
    box.style.left = `${positions[i].left}px`;
    box.style.top = `${positions[i].top}px`;
  });
  root.style.height = `${total}px`;
  if (isApg()) {
    regroupRows();
  }

  const clamp =
    resolvedSize !== state.size
      ? ` (clamped from ${state.size.toUpperCase()} so two columns fit)`
      : '';
  $('size-info').textContent =
    `Rendered size ${resolvedSize.toUpperCase()}${clamp} · ${columnCount} visual column${
      columnCount === 1 ? '' : 's'
    } · gap ${gap}px · width ${width}px`;
}

// ---------------------------------------------------------------- APG layout grid rows

// Logical row and column for a card. Grid layout: rows match the visual rows.
// Waterfall has no rows, so the model falls back to a single row.
function apgCell(i) {
  if (!apgRows()) {
    return { row: 0, col: i, rows: 1, cols: items.length };
  }
  return {
    row: Math.floor(i / columnCount),
    col: i % columnCount,
    rows: Math.ceil(items.length / columnCount),
    cols: columnCount,
  };
}

function regroupRows() {
  const signature = `${state.layout}:${apgRows() ? columnCount : 'single'}:${items.length}`;
  if (signature === rowSignature) {
    return;
  }
  const previous = rowSignature;
  rowSignature = signature;

  const active = activeElement();
  const hadFocus = root.contains(active);
  const boxes = items.map((_, i) => getBox(i));
  root.querySelectorAll('.apg-row').forEach((row) => row.remove());

  const { rows, cols } = apgCell(0);
  root.setAttribute('aria-rowcount', String(rows));
  root.setAttribute('aria-colcount', String(cols));
  const rowEls = Array.from({ length: rows }, (_, r) => {
    const row = document.createElement('div');
    row.setAttribute('role', 'row');
    row.setAttribute('aria-rowindex', String(r + 1));
    row.className = 'apg-row';
    root.append(row);
    return row;
  });
  boxes.forEach((box, i) => {
    const cell = apgCell(i);
    box.setAttribute('aria-colindex', String(cell.col + 1));
    rowEls[cell.row].append(box);
  });

  // Moving a focused node drops focus, so restore it without logging a move.
  if (hadFocus && activeElement() !== active) {
    quietFocus = true;
    active.focus({ preventScroll: true });
    quietFocus = false;
  }

  if (previous && previous.split(':')[0] === state.layout) {
    const cell = apgCell(state.focusedIndex);
    addLog({
      key: 'Resize',
      level: 'warn',
      text: `Visual columns changed, so the grid rows were rebuilt: now ${rows} rows × ${cols} columns. The focused card is now row ${cell.row + 1}, column ${cell.col + 1}. Screen reader users get no notice that the structure changed.`,
    });
    if (hadFocus) {
      showCurrent(state.focusedIndex, describe(state.focusedIndex, false));
    }
  }
  if (previous) {
    renderTree();
  }
}

function apgNav(i, event) {
  const key = event.key;
  const rtl = state.dir === 'rtl';
  const n = items.length;
  const ctrl = event.ctrlKey || event.metaKey;
  const { row, cols } = apgCell(i);
  const rowStart = apgRows() ? row * cols : 0;
  const rowEnd = apgRows() ? Math.min(n, rowStart + cols) - 1 : n - 1;
  const firstIn = (a, b) => {
    for (let j = a; j <= b; j++) {
      if (!isDisabled(j)) {
        return j;
      }
    }
    return null;
  };
  const lastIn = (a, b) => {
    for (let j = b; j >= a; j--) {
      if (!isDisabled(j)) {
        return j;
      }
    }
    return null;
  };
  const vertical = (dir, rowsToMove = 1) => {
    if (!apgRows()) {
      return step(i, dir);
    }
    let j = i;
    for (let moved = 0; moved < rowsToMove; ) {
      const next = j + dir * cols;
      if (next < 0 || next >= n) {
        break;
      }
      j = next;
      if (!isDisabled(j)) {
        moved++;
      }
    }
    while (j !== i && isDisabled(j)) {
      j -= dir * cols;
    }
    return j === i ? null : j;
  };
  const pick = (j) => (j === null || j === i ? null : j);

  if (key === 'Home') {
    return pick(ctrl ? firstEnabled() : firstIn(rowStart, rowEnd));
  }
  if (key === 'End') {
    return pick(ctrl ? lastEnabled() : lastIn(rowStart, rowEnd));
  }
  // Right and Left wrap to the next or previous row, as APG allows for layout grids.
  if (key === 'ArrowRight') {
    return step(i, rtl ? -1 : 1);
  }
  if (key === 'ArrowLeft') {
    return step(i, rtl ? 1 : -1);
  }
  if (key === 'ArrowDown') {
    return vertical(1);
  }
  if (key === 'ArrowUp') {
    return vertical(-1);
  }
  if (key === 'PageDown' || key === 'PageUp') {
    if (!apgRows()) {
      return pageLinear(i, key === 'PageDown' ? 1 : -1);
    }
    const rowsPerPage = Math.max(
      1,
      Math.floor(scroller.clientHeight / positions[i].height) - 1
    );
    return vertical(key === 'PageDown' ? 1 : -1, rowsPerPage);
  }
  return null;
}

// ---------------------------------------------------------------- navigation

function firstEnabled() {
  const i = items.findIndex((_, j) => !isDisabled(j));
  return i < 0 ? 0 : i;
}

function lastEnabled() {
  for (let i = items.length - 1; i >= 0; i--) {
    if (!isDisabled(i)) {
      return i;
    }
  }
  return 0;
}

function step(i, delta) {
  let j = i + delta;
  while (j >= 0 && j < items.length && isDisabled(j)) {
    j += delta;
  }
  return j >= 0 && j < items.length ? j : null;
}

function pageLinear(i, direction) {
  let j = Math.max(
    0,
    Math.min(items.length - 1, i + direction * Number(state.pageStep))
  );
  while (isDisabled(j) && j !== i) {
    j -= direction;
  }
  return j === i ? null : j;
}

function visualVertical(i, direction) {
  const cur = positions[i];
  let best = null;
  positions.forEach((p, j) => {
    if (j === i || isDisabled(j) || p.col !== cur.col) {
      return;
    }
    if (direction > 0 ? p.top <= cur.top : p.top >= cur.top) {
      return;
    }
    if (
      best === null ||
      Math.abs(p.top - cur.top) < Math.abs(positions[best].top - cur.top)
    ) {
      best = j;
    }
  });
  return best;
}

function visualHorizontal(i, visualRight) {
  const cur = positions[i];
  const center = cur.top + cur.height / 2;
  let best = null;
  positions.forEach((p, j) => {
    if (j === i || isDisabled(j)) {
      return;
    }
    if (visualRight ? p.left <= cur.left : p.left >= cur.left) {
      return;
    }
    const dx = Math.abs(p.left - cur.left);
    const dy = Math.abs(p.top + p.height / 2 - center);
    if (best === null) {
      best = { j, dx, dy };
      return;
    }
    if (dx < best.dx - 1 || (Math.abs(dx - best.dx) <= 1 && dy < best.dy)) {
      best = { j, dx, dy };
    }
  });
  return best ? best.j : null;
}

function navTarget(i, key) {
  const rtl = state.dir === 'rtl';
  if (key === 'Home') {
    return firstEnabled() === i ? null : firstEnabled();
  }
  if (key === 'End') {
    return lastEnabled() === i ? null : lastEnabled();
  }

  if (state.model === 'rsp-grid') {
    if (key === 'ArrowDown') {
      return visualVertical(i, 1);
    }
    if (key === 'ArrowUp') {
      return visualVertical(i, -1);
    }
    if (key === 'PageDown' || key === 'PageUp') {
      const direction = key === 'PageDown' ? 1 : -1;
      const rows = Math.max(
        1,
        Math.floor(scroller.clientHeight / positions[i].height) - 1
      );
      let j = i;
      for (let r = 0; r < rows; r++) {
        const next = visualVertical(j, direction);
        if (next === null) {
          break;
        }
        j = next;
      }
      return j === i ? null : j;
    }
    if (state.layout === 'grid') {
      const forward = key === 'ArrowRight' ? !rtl : rtl;
      return step(i, forward ? 1 : -1);
    }
    return visualHorizontal(i, key === 'ArrowRight');
  }

  if (key === 'PageDown') {
    return pageLinear(i, 1);
  }
  if (key === 'PageUp') {
    return pageLinear(i, -1);
  }
  const forward =
    key === 'ArrowDown' ||
    (key === 'ArrowRight' && !rtl) ||
    (key === 'ArrowLeft' && rtl);
  return step(i, forward ? 1 : -1);
}

function focusIndex(i, nav) {
  lastNav = nav;
  state.focusedIndex = i;
  updateRoving();
  const target = getTarget(i);
  target.focus({ preventScroll: true });
  getBox(i).scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

// ---------------------------------------------------------------- selection

function setSelection(next, reason) {
  state.selected = next;
  syncStates();
  const count = next.size;
  $('live').textContent = `${count} ${count === 1 ? 'item' : 'items'} selected`;
  if (reason) {
    addLog({
      key: reason.key,
      level: 'ok',
      text: `${reason.text} (${count} selected)`,
      said: describe(state.focusedIndex, false).announce,
    });
  }
}

function toggle(i, key) {
  if (isDisabled(i)) {
    return;
  }
  const k = items[i].key;
  const next = new Set(state.selected);
  const wasSelected = next.has(k);
  if (state.selectionMode === 'single') {
    next.clear();
    if (!wasSelected) {
      next.add(k);
    }
  } else if (wasSelected) {
    next.delete(k);
  } else {
    next.add(k);
  }
  state.anchor = i;
  setSelection(next, {
    key,
    text: `"${items[i].title}" ${wasSelected ? 'deselected' : 'selected'}`,
  });
}

function replaceWith(i, key) {
  if (isDisabled(i)) {
    return;
  }
  state.anchor = i;
  setSelection(new Set([items[i].key]), {
    key,
    text: `Selection replaced with "${items[i].title}"`,
  });
}

function selectRange(from, to, key) {
  const [a, b] = from < to ? [from, to] : [to, from];
  const next = new Set();
  for (let j = a; j <= b; j++) {
    if (!isDisabled(j)) {
      next.add(items[j].key);
    }
  }
  setSelection(next, {
    key,
    text: `Range selected, cards ${a + 1} to ${b + 1}`,
  });
}

function highlightClick(i, event) {
  const key =
    event.detail === 0
      ? lastKeyName || 'Enter'
      : `${event.shiftKey ? 'Shift + ' : ''}${event.metaKey ? 'Cmd + ' : ''}${event.ctrlKey ? 'Ctrl + ' : ''}Click`;
  if (event.detail === 0) {
    if (isMulti()) {
      toggle(i, key);
    } else {
      replaceWith(i, key);
    }
    return;
  }
  if (isMulti() && (event.metaKey || event.ctrlKey)) {
    toggle(i, key);
  } else if (isMulti() && event.shiftKey && state.anchor !== null) {
    selectRange(state.anchor, i, key);
  } else {
    replaceWith(i, key);
  }
}

// ---------------------------------------------------------------- events

function onKeyDown(event) {
  const t = event.target;
  const box = t.closest?.('.box');
  if (!box || !root.contains(box)) {
    return;
  }
  const i = Number(box.dataset.index);

  if (t.classList.contains('action')) {
    onActionKey(event, i, box);
    return;
  }
  if (!t.classList.contains('focus-target')) {
    return;
  }

  const key = event.key;
  if (
    [
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'PageDown',
      'PageUp',
    ].includes(key)
  ) {
    event.preventDefault();
    const dest = isApg() ? apgNav(i, event) : navTarget(i, key);
    if (dest === null) {
      addLog({
        key: keyName(event),
        level: 'note',
        text: 'No card in that direction. Focus stays.',
      });
      return;
    }
    if (
      event.shiftKey &&
      isMulti() &&
      selectable() &&
      key.startsWith('Arrow')
    ) {
      const anchor = state.anchor ?? i;
      focusIndex(dest, { key: keyName(event), from: i, base: key });
      state.anchor = anchor;
      selectRange(anchor, dest, keyName(event));
      state.anchor = anchor;
      return;
    }
    focusIndex(dest, { key: keyName(event), from: i, base: key });
    return;
  }

  if ((key === 'Enter' || (key === 'F2' && isApg())) && cellMode()) {
    event.preventDefault();
    const action = box.querySelector('.action');
    lastNav = { key, from: i, base: key };
    action.focus();
    return;
  }

  if (
    (event.metaKey || event.ctrlKey) &&
    key.toLowerCase() === 'a' &&
    isMulti()
  ) {
    event.preventDefault();
    const next = new Set(
      items.filter((_, j) => !isDisabled(j)).map((it) => it.key)
    );
    setSelection(next, { key: keyName(event), text: 'All cards selected' });
    return;
  }

  if (key === 'Escape' && state.selected.size) {
    event.preventDefault();
    setSelection(new Set(), { key: 'Escape', text: 'Selection cleared' });
    return;
  }

  // Native controls in the list model handle Space and Enter themselves.
  if (state.model === 'list') {
    return;
  }

  if (key === ' ') {
    event.preventDefault();
    if (!selectable()) {
      return;
    }
    if (state.selectionStyle === 'highlight' && !isMulti()) {
      replaceWith(i, 'Space');
    } else {
      toggle(i, 'Space');
    }
    return;
  }
  if (key === 'Enter') {
    addLog({
      key: 'Enter',
      level: 'note',
      text: `Activated "${items[i].title}" (would open the item)`,
    });
  }
}

function onActionKey(event, i, box) {
  const actions = [...box.querySelectorAll('.action')];
  const index = actions.indexOf(event.target);
  if (event.key === 'Escape' || (event.key === 'F2' && isApg())) {
    event.preventDefault();
    focusIndex(i, { key: event.key, from: i, base: 'Escape' });
    return;
  }
  const forwardKeys = isApg() ? ['ArrowRight', 'ArrowDown'] : ['ArrowRight'];
  const backKeys = isApg() ? ['ArrowLeft', 'ArrowUp'] : ['ArrowLeft'];
  if (forwardKeys.includes(event.key) || backKeys.includes(event.key)) {
    event.preventDefault();
    let forward = forwardKeys.includes(event.key);
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      forward = forward !== (state.dir === 'rtl');
    }
    const next =
      actions[(index + (forward ? 1 : -1) + actions.length) % actions.length];
    lastNav = { key: keyName(event), from: i, base: 'action-arrow' };
    next.focus();
  }
}

function onClick(event) {
  const box = event.target.closest('.box');
  if (!box || !root.contains(box)) {
    return;
  }
  const i = Number(box.dataset.index);
  if (isDisabled(i)) {
    return;
  }

  const action = event.target.closest('.action');
  if (action) {
    addLog({
      key: event.detail === 0 ? lastKeyName : 'Click',
      level: 'note',
      text: `${action.dataset.action} activated for "${items[i].title}"`,
    });
    return;
  }
  if (event.target.matches('input.cb')) {
    return;
  }

  if (event.target.closest('.title-button')) {
    if (!selectable()) {
      addLog({
        key: event.detail === 0 ? lastKeyName : 'Click',
        level: 'note',
        text: `Activated "${items[i].title}" (would open the item)`,
      });
      return;
    }
    highlightClick(i, event);
    return;
  }

  if (state.focusedIndex !== i || !box.contains(activeElement())) {
    focusIndex(i, { key: 'Click', from: state.focusedIndex, base: 'Click' });
  }
  if (!selectable()) {
    return;
  }
  if (state.selectionStyle === 'checkbox') {
    toggle(i, 'Click');
  } else {
    highlightClick(i, event);
  }
}

function onChange(event) {
  if (!event.target.matches('input.cb')) {
    return;
  }
  const i = Number(event.target.dataset.index);
  toggle(i, lastKeyName || 'Click');
}

function onFocusIn(event) {
  const t = event.target;
  const box = t.closest?.('.box');
  if (!box || !root.contains(box)) {
    return;
  }
  const i = Number(box.dataset.index);
  const entering = !root.contains(event.relatedTarget);

  if (t.classList.contains('focus-target')) {
    if (state.focusedIndex !== i) {
      state.focusedIndex = i;
      updateRoving();
    }
    const nav = lastNav;
    lastNav = null;
    const info = describe(i, entering);
    showCurrent(i, info);
    if (quietFocus) {
      return;
    }
    const verdict = nav
      ? judge(nav, i)
      : entering
        ? { level: 'ok', text: 'Entered the collection.' }
        : { level: 'note', text: 'Focus returned to card.' };
    addLog({
      key: nav?.key || (entering ? lastKeyName || 'Focus' : lastKeyName),
      level: verdict.level,
      text: verdict.text,
      said: info.announce,
    });
    return;
  }

  if (t.classList.contains('action')) {
    const nav = lastNav;
    lastNav = null;
    const said = `${t.getAttribute('aria-label')}, button`;
    $('cur-name').textContent = t.getAttribute('aria-label');
    $('cur-announce').textContent = said;
    const viaCommand = nav?.base === 'Enter' || nav?.base === 'F2';
    const text = viaCommand
      ? `Moved into card actions with a secondary command (${nav.base}). Users must learn this; ${isApg() ? 'arrows move between the actions, and Escape or F2 returns' : 'Escape returns'} to the card.`
      : nav?.base === 'action-arrow'
        ? 'Moved to the next action in this card.'
        : "Tab moved into this card's actions.";
    addLog({
      key: nav?.key || lastKeyName || 'Focus',
      level: viaCommand ? 'note' : 'ok',
      text,
      said,
    });
  }
}

// ---------------------------------------------------------------- inspector

function visualPosition(i) {
  const p = positions[i];
  if (!p) {
    return '-';
  }
  if (state.layout === 'grid') {
    return `row ${p.row + 1}, column ${p.col + 1} of ${columnCount}`;
  }
  return `column ${p.col + 1} of ${columnCount}, card ${p.order + 1} in that column`;
}

function describe(i, entering) {
  const n = items.length;
  const item = items[i];
  const target = getTarget(i);
  const selected = state.selected.has(item.key);
  const sel =
    selectable() && state.model !== 'list'
      ? selected
        ? ', selected'
        : ', not selected'
      : '';
  const dim = isDisabled(i) ? ', unavailable' : '';
  let prefix = '';
  let announce = '';
  let exposed = '';

  switch (state.model) {
    case 'rsp-grid':
      prefix = `grid, Nature photos, ${n} rows, 1 column. `;
      announce = `${item.title}${sel}${dim}, row ${i + 1} of ${n}`;
      exposed = `row ${i + 1} of ${n}, column 1 of 1`;
      break;
    case 'apg-layout': {
      const c = apgCell(i);
      prefix = `grid, Nature photos, ${c.rows} ${c.rows === 1 ? 'row' : 'rows'}, ${c.cols} columns. `;
      announce = `${item.title}${sel}${dim}, row ${c.row + 1}, column ${c.col + 1}`;
      exposed = `row ${c.row + 1} of ${c.rows}, column ${c.col + 1} of ${c.cols}${apgRows() ? '' : ' (waterfall falls back to one row)'}`;
      break;
    }
    case 'row-grid':
      prefix = `grid, Nature photos, 1 row, ${n} columns. `;
      announce = `${item.title}${sel}${dim}, column ${i + 1} of ${n}`;
      exposed = `row 1 of 1, column ${i + 1} of ${n}`;
      break;
    case 'list': {
      prefix = `list, Nature photos, ${n} items. `;
      let control = `${item.title}, button`;
      if (target.type === 'checkbox') {
        control = `${item.title}, checkbox, ${target.checked ? 'checked' : 'not checked'}`;
      } else if (target.hasAttribute('aria-pressed')) {
        control = `${item.title}, toggle button, ${selected ? 'pressed' : 'not pressed'}`;
      }
      announce = `${control}${dim}${state.describePos ? `, ${i + 1} of ${n}` : ''}`;
      exposed = state.describePos
        ? `item ${i + 1} of ${n} (aria-posinset, plus the focus target description)`
        : `item ${i + 1} of ${n} (aria-posinset on the list item; whether it is spoken on focus varies by screen reader)`;
      break;
    }
    case 'listbox':
      prefix = `listbox, Nature photos${isMulti() ? ', multi-select' : ''}. `;
      announce = `${item.title}${sel}${dim}, ${i + 1} of ${n}`;
      exposed = `option ${i + 1} of ${n}`;
      break;
  }
  return {
    announce: (entering ? prefix : '') + announce,
    exposed,
    visual: visualPosition(i),
  };
}

function judge(nav, to) {
  const from = nav.from;
  const base = nav.base;
  if (base === 'Click') {
    return { level: 'note', text: 'Focused by pointer.' };
  }
  if (base === 'Escape') {
    return { level: 'ok', text: 'Escape returned focus to the card.' };
  }
  const horizontal = base === 'ArrowLeft' || base === 'ArrowRight';
  const vertical = base === 'ArrowUp' || base === 'ArrowDown';
  const d = Math.abs(to - from);

  if (state.model === 'rsp-grid') {
    if (horizontal) {
      return {
        level: 'warn',
        text: `Screen readers say row ${from + 1} → row ${to + 1}. They report a single column, so Left and Right Arrow seem to move between rows, the same as Up and Down Arrow.`,
      };
    }
    if (vertical && d !== 1) {
      return {
        level: 'warn',
        text: `Announced row jumped ${from + 1} → ${to + 1} (${d} rows). Nothing tells a screen reader user why ${KEY_NAMES[base]} skipped ${d - 1} cards.`,
      };
    }
    if (base === 'PageDown' || base === 'PageUp') {
      return {
        level: 'warn',
        text: `Announced row jumped ${from + 1} → ${to + 1}. The jump size depends on the visual layout.`,
      };
    }
    return { level: 'ok', text: `Row ${from + 1} → row ${to + 1}.` };
  }

  if (isApg()) {
    const a = apgCell(from);
    const b = apgCell(to);
    const where = (c) => `row ${c.row + 1}, column ${c.col + 1}`;
    if (!apgRows()) {
      return {
        level: vertical ? 'note' : 'ok',
        text: `Column ${a.col + 1} → ${b.col + 1}. Waterfall has no visual rows, so this falls back to a single row.`,
      };
    }
    if (horizontal && a.row !== b.row) {
      return {
        level: 'ok',
        text: `${where(a)} → ${where(b)}. Wrapped to the ${b.row > a.row ? 'next' : 'previous'} row. The announced row changes too, so users can tell why.`,
      };
    }
    return {
      level: 'ok',
      text: `${where(a)} → ${where(b)}. Announced position matches what sighted users see.`,
    };
  }

  if (state.model === 'row-grid' && vertical) {
    return {
      level: 'note',
      text: `Column ${from + 1} → column ${to + 1}. Up and Down Arrow moved along the single row; there is no semantic row to move to.`,
    };
  }

  const unit = state.model === 'row-grid' ? 'Column' : 'Position';
  let text = `${unit} ${from + 1} → ${to + 1}, in reading order.`;
  let level = 'ok';
  if (vertical && state.layout === 'grid' && columnCount > 1) {
    text +=
      ' Sighted users may expect Down or Up Arrow to reach the card visually below or above.';
    level = 'note';
  }
  return { level, text };
}

function showCurrent(i, info) {
  $('cur-name').textContent = `${items[i].title} (card ${i + 1})`;
  $('cur-announce').textContent = info.announce;
  $('cur-visual').textContent = info.visual;
  $('cur-exposed').textContent = info.exposed;
}

function addLog({ key, level, text, said }) {
  const li = document.createElement('li');
  li.className = level;
  const verdict = { ok: '✓', warn: '⚠', note: 'ℹ' }[level];
  li.innerHTML = `<span class="key">${escapeHtml(key || '')}</span><span class="verdict" aria-hidden="true">${verdict}</span> ${escapeHtml(text)}${
    said ? `<span class="said">"${escapeHtml(said)}"</span>` : ''
  }`;
  const log = $('log');
  log.prepend(li);
  while (log.children.length > 60) {
    log.lastElementChild.remove();
  }
}

const NOTES = {
  'rsp-grid': `
        <p>What React Spectrum CardView renders today: <code>grid</code> &gt; <code>row</code> (one per card) &gt; <code>gridcell</code>. Arrow keys follow the visual 2D layout.</p>
        <ul>
            <li class="warning">Screen readers report every card in one column. Right Arrow and Down Arrow both change the announced row, by different amounts.</li>
            <li class="warning">Resize the collection: the visual rows change, but the exposed structure does not.</li>
            <li class="warning">In waterfall there are no rows at all.</li>
            <li>Card actions need a secondary command (Enter, then Escape) when the grid is one tab stop.</li>
        </ul>`,
  'apg-layout': `
        <p>The <a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/#layoutgridsforgroupingwidgets">APG layout grid</a> pattern: <code>grid</code> &gt; one <code>row</code> per visual row &gt; a <code>gridcell</code> per card, with <code>aria-rowindex</code> and <code>aria-colindex</code>. This is option B in the approach doc.</p>
        <ul>
            <li>Announced row and column match what sighted users see, so 2D arrow keys make sense to screen reader users.</li>
            <li>Right and Left Arrow wrap between rows. Home and End stay in the row; Ctrl + Home and Ctrl + End go to the start and end of the grid.</li>
            <li>Card actions use the APG in-cell convention: Enter or F2 moves into the card, arrows move between its actions, and Escape or F2 returns.</li>
            <li class="warning">Drag the width slider: every column change rebuilds the rows in script, moving focused nodes, and positions change without notice.</li>
            <li class="warning">Waterfall has no rows, so this model falls back to a single row there.</li>
            <li class="warning">APG calls selection "unusual" in a layout grid. Focus lands on the cell, which contains several widgets, rather than on one widget, which is APG's recommended cell design.</li>
        </ul>`,
  'row-grid': `
        <p>Fallback candidate: <code>grid</code> &gt; one <code>row</code> &gt; a <code>gridcell</code> per card with <code>aria-colindex</code>. Arrow keys move in DOM order.</p>
        <ul>
            <li>Screen readers announce the column, so users hear their position.</li>
            <li><code>gridcell</code> supports <code>aria-selected</code> and keeps the semantics of buttons inside cards.</li>
            <li class="warning">The <code>grid</code> role still suggests 2D navigation, and Up or Down Arrow has no semantic row to move to.</li>
        </ul>`,
  list: `
        <p>Leading candidate: <code>list</code> &gt; <code>listitem</code> with <code>aria-posinset</code> and <code>aria-setsize</code>. Focus moves between each card's primary control (checkbox, toggle button, or title button) in DOM order.</p>
        <ul>
            <li>Keyboard order matches reading order at any width, zoom level, and in waterfall.</li>
            <li>Buttons inside cards keep their semantics and are reachable with Tab.</li>
            <li class="warning">Verify whether screen readers speak the list position when focus lands on a control inside the list item. Turn on "add N of M" to test the description fallback.</li>
            <li class="warning">Highlight style needs its own state: here it uses a toggle button with <code>aria-pressed</code>.</li>
        </ul>`,
  listbox: `
        <p>Variant of the linear model: <code>listbox</code> &gt; <code>option</code> with <code>aria-selected</code>, <code>aria-posinset</code>, and <code>aria-setsize</code>.</p>
        <ul>
            <li>Position and selected state are announced reliably.</li>
            <li class="warning">Options have presentational children, so buttons inside cards are not exposed. Card actions are turned off in this model.</li>
        </ul>`,
};

function renderNotes() {
  const keys =
    state.model === 'rsp-grid'
      ? '<p>Keys: arrows follow the visual layout, Page Up/Down move by a screen of rows, Home/End go to the first and last card.</p>'
      : apgRows()
        ? '<p>Keys: arrows move by cell (Right/Left wrap between rows, mirrored in right-to-left), Page Up/Down move by a screen of rows, Home/End go to the start and end of the row, Ctrl + Home/End go to the first and last card.</p>'
        : `<p>Keys: Right/Down Arrow next, Left/Up Arrow previous (mirrored in right-to-left), Page Up/Down move ${state.pageStep} cards, Home/End go to the first and last card.</p>`;
  const tab = !hasActions()
    ? ''
    : isApg()
      ? '<p>Card actions: one tab stop. Enter or F2 moves into the card, arrows move between actions, Escape or F2 returns.</p>'
      : state.tabModel === 'express'
        ? '<p>Tab model: Tab moves from the focused card into its actions, then out of the collection.</p>'
        : '<p>Tab model: one tab stop. Enter moves into the card actions, Escape returns.</p>';
  const selection = selectable()
    ? `<p>Selection: Space toggles, ${isMulti() ? 'Shift + arrow extends, Ctrl/Cmd + A selects all, ' : ''}Escape clears.</p>`
    : '';
  $('model-notes').innerHTML = NOTES[state.model] + keys + tab + selection;
}

function implicitRole(el) {
  const role = el.getAttribute('role');
  if (role) {
    return role === 'presentation' || role === 'none' ? null : role;
  }
  const tag = el.tagName.toLowerCase();
  if (tag === 'ul' || tag === 'ol') {
    return 'list';
  }
  if (tag === 'li') {
    return 'listitem';
  }
  if (tag === 'button') {
    return el.hasAttribute('aria-pressed') ? 'toggle button' : 'button';
  }
  if (tag === 'input' && el.type === 'checkbox') {
    return 'checkbox';
  }
  return null;
}

function accName(el) {
  if (el.hasAttribute('aria-label')) {
    return el.getAttribute('aria-label');
  }
  if (el.hasAttribute('aria-labelledby')) {
    return el
      .getAttribute('aria-labelledby')
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent.trim())
      .filter(Boolean)
      .join(' ');
  }
  if (el.tagName === 'BUTTON') {
    return el.textContent.trim();
  }
  return '';
}

function stateText(el) {
  const parts = [];
  const attrs = [
    'aria-selected',
    'aria-pressed',
    'aria-posinset',
    'aria-setsize',
    'aria-rowindex',
    'aria-colindex',
    'aria-rowcount',
    'aria-colcount',
    'aria-multiselectable',
    'aria-disabled',
  ];
  for (const attr of attrs) {
    if (el.hasAttribute(attr)) {
      parts.push(`${attr.replace('aria-', '')}=${el.getAttribute(attr)}`);
    }
  }
  if (el.type === 'checkbox') {
    parts.push(el.checked ? 'checked' : 'not checked');
  }
  if (el.disabled) {
    parts.push('disabled');
  }
  if (el.tabIndex === 0 && el !== root) {
    parts.push('tab stop');
  }
  return parts.length ? ` [${parts.join(', ')}]` : '';
}

function renderTree() {
  const lines = [];
  const limit = 3;
  const walk = (el, depth) => {
    if (el.getAttribute('aria-hidden') === 'true') {
      return;
    }
    const pad = '  '.repeat(depth);
    if (isApg() && el.classList.contains('apg-row')) {
      const rowIndex = Number(el.getAttribute('aria-rowindex'));
      if (rowIndex > 2) {
        if (rowIndex === 3) {
          lines.push(
            `${pad}… ${Number(root.getAttribute('aria-rowcount')) - 2} more rows`
          );
        }
        return;
      }
    }
    if (isApg() && el.classList.contains('box')) {
      const col = Number(el.getAttribute('aria-colindex'));
      if (col > 2) {
        if (col === 3) {
          lines.push(
            `${pad}… ${el.parentElement.children.length - 2} more cells in this row`
          );
        }
        return;
      }
    } else if (
      el.classList.contains('box') &&
      Number(el.dataset.index) >= limit
    ) {
      if (Number(el.dataset.index) === limit) {
        lines.push(`${pad}… ${items.length - limit} more cards`);
      }
      return;
    }
    const role = implicitRole(el);
    let next = depth;
    if (role) {
      const name = accName(el);
      lines.push(
        `${'  '.repeat(depth)}${role}${name ? ` "${name}"` : ''}${stateText(el)}`
      );
      next = depth + 1;
    } else if (
      el.classList.contains('card-title') ||
      el.classList.contains('card-desc')
    ) {
      lines.push(`${'  '.repeat(depth)}text "${el.textContent.trim()}"`);
    }
    if (['BUTTON', 'INPUT'].includes(el.tagName)) {
      return;
    }
    for (const child of el.children) {
      walk(child, next);
    }
  };
  walk(root, 0);
  $('tree').textContent = lines.join('\n');
}

// ---------------------------------------------------------------- boot

buildControls();
syncControls();
syncPresetButtons();
applyFrameWidth();

scroller.addEventListener('keydown', onKeyDown);
scroller.addEventListener('click', onClick);
scroller.addEventListener('change', onChange);
scroller.addEventListener('focusin', onFocusIn);
document.addEventListener(
  'keydown',
  (event) => (lastKeyName = keyName(event)),
  true
);
document.addEventListener('pointerdown', () => (lastKeyName = ''), true);

let frameRequest = 0;
new ResizeObserver(() => {
  cancelAnimationFrame(frameRequest);
  frameRequest = requestAnimationFrame(() => {
    layout();
  });
}).observe(scroller);

render();
writeUrl();
