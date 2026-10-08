// CardView accessibility prototype. Plain DOM, no dependencies.
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
    'row-grid': 'C. Single-row grid',
    list: 'D. Linear list',
    listbox: 'D. Listbox (no card actions)',
};

const CONTROLS = [
    { key: 'model', label: 'Semantics model', options: Object.entries(MODEL_LABELS) },
    { key: 'layout', label: 'Layout', options: [['grid', 'Grid'], ['waterfall', 'Waterfall']] },
    { key: 'size', label: 'Size (requested)', options: SIZE_ORDER.map((s) => [s, s.toUpperCase()]) },
    { key: 'density', label: 'Density', options: [['compact', 'Compact'], ['regular', 'Regular'], ['spacious', 'Spacious']] },
    { key: 'variant', label: 'Variant', options: [['primary', 'Primary'], ['secondary', 'Secondary'], ['tertiary', 'Tertiary'], ['quiet', 'Quiet']] },
    { key: 'selectionMode', label: 'Selection mode', options: [['none', 'None'], ['single', 'Single'], ['multiple', 'Multiple']] },
    { key: 'selectionStyle', label: 'Selection style', options: [['checkbox', 'Checkbox'], ['highlight', 'Highlight']] },
    { key: 'actions', label: 'Card actions', options: [['none', 'None'], ['visible', 'Always visible'], ['hover', 'Revealed on hover or focus']] },
    { key: 'tabModel', label: 'Tab model', options: [['express', 'Tab into card actions (Express)'], ['single', 'Single tab stop (Enter reaches actions)']] },
    { key: 'pageStep', label: 'Page Up/Down step (linear models)', options: [['3', '3 cards'], ['5', '5 cards'], ['10', '10 cards']] },
    { key: 'count', label: 'Cards', options: [['12', '12'], ['24', '24'], ['48', '48'], ['96', '96']] },
    { key: 'dir', label: 'Direction', options: [['ltr', 'Left to right'], ['rtl', 'Right to left']] },
    { key: 'disabled', label: 'Include disabled cards', type: 'checkbox' },
    { key: 'describePos', label: 'List: add "N of M" to focus target description', type: 'checkbox' },
];

const PRESETS = {
    rsp: { model: 'rsp-grid', layout: 'grid', selectionMode: 'multiple', selectionStyle: 'checkbox', actions: 'hover', tabModel: 'single', describePos: false },
    list: { model: 'list', layout: 'grid', selectionMode: 'multiple', selectionStyle: 'checkbox', actions: 'hover', tabModel: 'express', describePos: true },
    'row-grid': { model: 'row-grid', layout: 'grid', selectionMode: 'multiple', selectionStyle: 'checkbox', actions: 'hover', tabModel: 'express', describePos: false },
    listbox: { model: 'listbox', layout: 'grid', selectionMode: 'multiple', selectionStyle: 'highlight', actions: 'none', tabModel: 'express', describePos: false },
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
    'Mountain lake', 'Desert dunes', 'Pine forest', 'Coral reef', 'Glacier bay',
    'Autumn maple', 'Tundra sunrise', 'Bamboo grove', 'Canyon river', 'Lavender field',
    'Rainforest canopy', 'Volcanic coast', 'Alpine meadow', 'Salt flats', 'Mangrove delta',
    'Fjord cliffs', 'Prairie storm', 'Cherry blossom', 'Kelp forest', 'Aurora night',
    'Sand cove', 'Moss cave', 'Tea terraces', 'Ice cave',
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

const state = { ...DEFAULTS, ...readUrl(), selected: new Set(), focusedIndex: 0, anchor: null };

let items = [];
let root = null;
let positions = [];
let resolvedSize = 'm';
let columnCount = 1;
let lastNav = null;
let lastKeyName = '';
let quietFocus = false;

const $ = (id) => document.getElementById(id);
const scroller = $('scroller');
const frame = $('frame');

function readUrl() {
    const params = new URLSearchParams(location.search);
    const out = {};
    for (const control of CONTROLS) {
        if (!params.has(control.key)) continue;
        const value = params.get(control.key);
        if (control.type === 'checkbox') {
            out[control.key] = value === '1';
        } else if (control.options.some(([v]) => v === value)) {
            out[control.key] = value;
        }
    }
    if (params.has('width')) out.width = Number(params.get('width')) || DEFAULTS.width;
    if (params.has('full')) out.full = params.get('full') === '1';
    return out;
}

function writeUrl() {
    const params = new URLSearchParams();
    for (const control of CONTROLS) {
        const value = state[control.key];
        params.set(control.key, control.type === 'checkbox' ? (value ? '1' : '0') : value);
    }
    params.set('width', String(state.width));
    params.set('full', state.full ? '1' : '0');
    history.replaceState(null, '', `?${params}`);
}

// ---------------------------------------------------------------- helpers

const selectable = () => state.selectionMode !== 'none';
const isMulti = () => state.selectionMode === 'multiple';
const hasActions = () => state.actions !== 'none' && state.model !== 'listbox';
const isDisabled = (i) => state.disabled && DISABLED_INDICES.has(i);
const keyName = (e) =>
    [e.ctrlKey && 'Ctrl', e.metaKey && 'Cmd', e.altKey && 'Alt', e.shiftKey && e.key !== 'Shift' && 'Shift', KEY_NAMES[e.key] || e.key]
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
    return text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
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
            input.addEventListener('change', () => update({ [control.key]: input.checked }));
        } else {
            wrap.innerHTML = `<label for="${id}">${control.label}</label><select id="${id}">${control.options
                .map(([v, l]) => `<option value="${v}">${escapeHtml(l)}</option>`)
                .join('')}</select>`;
            const select = wrap.querySelector('select');
            select.value = state[control.key];
            select.addEventListener('change', () => update({ [control.key]: select.value }));
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
        if (control.type === 'checkbox') el.checked = Boolean(state[control.key]);
        else el.value = state[control.key];
    }
    $('ctl-selectionStyle').disabled = !selectable();
    $('ctl-actions').disabled = state.model === 'listbox';
    $('ctl-tabModel').disabled = !hasActions();
    $('ctl-describePos').disabled = state.model !== 'list';
    $('ctl-describePos').closest('label').setAttribute('aria-disabled', String(state.model !== 'list'));
    $('ctl-pageStep').disabled = state.model === 'rsp-grid';
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
    const hadFocus = root?.contains(document.activeElement);
    items = makeItems(Number(state.count));
    const keys = new Set(items.map((it) => it.key));
    state.selected = new Set([...state.selected].filter((k) => keys.has(k)));
    if (!selectable()) state.selected.clear();
    if (state.selectionMode === 'single' && state.selected.size > 1) {
        state.selected = new Set([[...state.selected][0]]);
    }
    state.focusedIndex = Math.min(state.focusedIndex, items.length - 1);
    if (isDisabled(state.focusedIndex)) state.focusedIndex = firstEnabled();

    scroller.textContent = '';
    root = createRoot();
    const container = state.model === 'row-grid' ? root.querySelector('.row-wrap') : root;
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
            if (isMulti()) el.setAttribute('aria-multiselectable', 'true');
            break;
        case 'row-grid': {
            el.setAttribute('role', 'grid');
            el.setAttribute('aria-rowcount', '1');
            el.setAttribute('aria-colcount', String(n));
            if (isMulti()) el.setAttribute('aria-multiselectable', 'true');
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
            if (isMulti()) el.setAttribute('aria-multiselectable', 'true');
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
    const badgeHtml = showBadge ? '<span class="sel-badge" aria-hidden="true">✓ Selected</span>' : '';

    let box;
    if (state.model === 'list') {
        box = document.createElement('li');
        box.setAttribute('aria-posinset', String(i + 1));
        box.setAttribute('aria-setsize', String(n));
        const posId = `pos-${i}`;
        const describedBy = state.describePos ? ` aria-describedby="${posId}"` : '';
        const posHtml = state.describePos ? `<span id="${posId}" class="visually-hidden">${i + 1} of ${n}</span>` : '';
        const useCheckbox = selectable() && state.selectionStyle === 'checkbox';
        const nativeCheck = useCheckbox
            ? `<input type="checkbox" class="cb focus-target" data-index="${i}" aria-labelledby="${titleId}"${describedBy} tabindex="-1"${disabled ? ' disabled' : ''}>`
            : '';
        const pressed = selectable() && state.selectionStyle === 'highlight' ? ' aria-pressed="false"' : '';
        const titleHtml = useCheckbox
            ? `<div class="card-title" id="${titleId}">${title}</div>`
            : `<button type="button" class="card-title title-button focus-target" id="${titleId}" data-index="${i}"${pressed}${describedBy} tabindex="-1"${disabled ? ' disabled' : ''}>${title}</button>`;
        box.innerHTML = `
            <div class="card-preview" style="--hue:${item.hue}; aspect-ratio:${aspect}">${nativeCheck}${badgeHtml}</div>
            <div class="card-body">${titleHtml}<div class="card-desc">${escapeHtml(item.desc)}</div>${posHtml}</div>${actionsHtml}`;
    } else {
        const content = `
            <div class="card-preview" style="--hue:${item.hue}; aspect-ratio:${aspect}">${
                showVisualCheck ? '<span class="vcheck" aria-hidden="true"></span>' : ''
            }${badgeHtml}</div>
            <div class="card-body"><div class="card-title" id="${titleId}">${title}</div><div class="card-desc">${escapeHtml(item.desc)}</div></div>${actionsHtml}`;
        box = document.createElement('div');
        box.classList.add('focus-target');
        box.tabIndex = -1;
        box.setAttribute('aria-labelledby', titleId);
        if (disabled) box.setAttribute('aria-disabled', 'true');
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
    if (!root) return;
    items.forEach((item, i) => {
        const box = getBox(i);
        const selected = state.selected.has(item.key);
        box.classList.toggle('is-selected', selected);
        const target = getTarget(i);
        if (state.model === 'list') {
            if (target.type === 'checkbox') target.checked = selected;
            else if (target.hasAttribute('aria-pressed')) target.setAttribute('aria-pressed', String(selected));
        } else if (selectable()) {
            target.setAttribute('aria-selected', String(selected));
        } else {
            target.removeAttribute('aria-selected');
        }
    });
}

function updateRoving() {
    if (!root) return;
    items.forEach((_, i) => {
        const target = getTarget(i);
        if (target) target.tabIndex = i === state.focusedIndex ? 0 : -1;
        getBox(i)
            .querySelectorAll('.action')
            .forEach((action) => {
                action.tabIndex = state.tabModel === 'express' && i === state.focusedIndex ? 0 : -1;
            });
    });
}

const getBox = (i) => root.querySelector(`.box[data-index="${i}"]`);
const getTarget = (i) => {
    const box = getBox(i);
    if (!box) return null;
    return box.classList.contains('focus-target') ? box : box.querySelector('.focus-target');
};

// ---------------------------------------------------------------- layout

function resolveSize(width) {
    let resolved = 'xs';
    for (const size of SIZE_ORDER.slice(0, SIZE_ORDER.indexOf(state.size) + 1)) {
        const m = METRICS[size];
        if (2 * m.min + 3 * m.gap[state.density] <= width) resolved = size;
    }
    return resolved;
}

function layout() {
    if (!root) return;
    const width = scroller.clientWidth;
    resolvedSize = resolveSize(width);
    SIZE_ORDER.forEach((s) => root.classList.toggle(`size-${s}`, s === resolvedSize));
    const m = METRICS[resolvedSize];
    const gap = m.gap[state.density];
    columnCount = Math.max(1, Math.floor((width - gap) / (m.min + gap)));
    const itemWidth = Math.max(60, Math.min(m.max, (width - (columnCount + 1) * gap) / columnCount));
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
        for (let start = 0, row = 0; start < boxes.length; start += columnCount, row++) {
            const rowHeights = heights.slice(start, start + columnCount);
            const rowHeight = Math.max(...rowHeights);
            for (let col = 0; col < rowHeights.length; col++) {
                const i = start + col;
                positions[i] = { row, col, top: total, height: rowHeight, left: leftFor(col) };
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
            positions[i] = { col, order: colCounts[col]++, top: colTops[col], height: heights[i], left: leftFor(col) };
            colTops[col] += heights[i] + gap;
        });
        total = Math.max(...colTops);
    }

    boxes.forEach((box, i) => {
        box.style.left = `${positions[i].left}px`;
        box.style.top = `${positions[i].top}px`;
    });
    root.style.height = `${total}px`;

    const clamp = resolvedSize !== state.size ? ` (clamped from ${state.size.toUpperCase()} so two columns fit)` : '';
    $('size-info').textContent = `Rendered size ${resolvedSize.toUpperCase()}${clamp} · ${columnCount} visual column${
        columnCount === 1 ? '' : 's'
    } · gap ${gap}px · width ${width}px`;
}

// ---------------------------------------------------------------- navigation

function firstEnabled() {
    const i = items.findIndex((_, j) => !isDisabled(j));
    return i < 0 ? 0 : i;
}

function lastEnabled() {
    for (let i = items.length - 1; i >= 0; i--) if (!isDisabled(i)) return i;
    return 0;
}

function step(i, delta) {
    let j = i + delta;
    while (j >= 0 && j < items.length && isDisabled(j)) j += delta;
    return j >= 0 && j < items.length ? j : null;
}

function pageLinear(i, direction) {
    let j = Math.max(0, Math.min(items.length - 1, i + direction * Number(state.pageStep)));
    while (isDisabled(j) && j !== i) j -= direction;
    return j === i ? null : j;
}

function visualVertical(i, direction) {
    const cur = positions[i];
    let best = null;
    positions.forEach((p, j) => {
        if (j === i || isDisabled(j) || p.col !== cur.col) return;
        if (direction > 0 ? p.top <= cur.top : p.top >= cur.top) return;
        if (best === null || Math.abs(p.top - cur.top) < Math.abs(positions[best].top - cur.top)) best = j;
    });
    return best;
}

function visualHorizontal(i, visualRight) {
    const cur = positions[i];
    const center = cur.top + cur.height / 2;
    let best = null;
    positions.forEach((p, j) => {
        if (j === i || isDisabled(j)) return;
        if (visualRight ? p.left <= cur.left : p.left >= cur.left) return;
        const dx = Math.abs(p.left - cur.left);
        const dy = Math.abs(p.top + p.height / 2 - center);
        if (best === null) {
            best = { j, dx, dy };
            return;
        }
        if (dx < best.dx - 1 || (Math.abs(dx - best.dx) <= 1 && dy < best.dy)) best = { j, dx, dy };
    });
    return best ? best.j : null;
}

function navTarget(i, key) {
    const rtl = state.dir === 'rtl';
    if (key === 'Home') return firstEnabled() === i ? null : firstEnabled();
    if (key === 'End') return lastEnabled() === i ? null : lastEnabled();

    if (state.model === 'rsp-grid') {
        if (key === 'ArrowDown') return visualVertical(i, 1);
        if (key === 'ArrowUp') return visualVertical(i, -1);
        if (key === 'PageDown' || key === 'PageUp') {
            const direction = key === 'PageDown' ? 1 : -1;
            const rows = Math.max(1, Math.floor(scroller.clientHeight / positions[i].height) - 1);
            let j = i;
            for (let r = 0; r < rows; r++) {
                const next = visualVertical(j, direction);
                if (next === null) break;
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

    if (key === 'PageDown') return pageLinear(i, 1);
    if (key === 'PageUp') return pageLinear(i, -1);
    const forward = key === 'ArrowDown' || (key === 'ArrowRight' && !rtl) || (key === 'ArrowLeft' && rtl);
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
    if (isDisabled(i)) return;
    const k = items[i].key;
    const next = new Set(state.selected);
    const wasSelected = next.has(k);
    if (state.selectionMode === 'single') {
        next.clear();
        if (!wasSelected) next.add(k);
    } else if (wasSelected) next.delete(k);
    else next.add(k);
    state.anchor = i;
    setSelection(next, { key, text: `"${items[i].title}" ${wasSelected ? 'deselected' : 'selected'}` });
}

function replaceWith(i, key) {
    if (isDisabled(i)) return;
    state.anchor = i;
    setSelection(new Set([items[i].key]), { key, text: `Selection replaced with "${items[i].title}"` });
}

function selectRange(from, to, key) {
    const [a, b] = from < to ? [from, to] : [to, from];
    const next = new Set();
    for (let j = a; j <= b; j++) if (!isDisabled(j)) next.add(items[j].key);
    setSelection(next, { key, text: `Range selected, cards ${a + 1} to ${b + 1}` });
}

function highlightClick(i, e) {
    const key = e.detail === 0 ? lastKeyName || 'Enter' : `${e.shiftKey ? 'Shift + ' : ''}${e.metaKey ? 'Cmd + ' : ''}${e.ctrlKey ? 'Ctrl + ' : ''}Click`;
    if (e.detail === 0) {
        if (isMulti()) toggle(i, key);
        else replaceWith(i, key);
        return;
    }
    if (isMulti() && (e.metaKey || e.ctrlKey)) toggle(i, key);
    else if (isMulti() && e.shiftKey && state.anchor !== null) selectRange(state.anchor, i, key);
    else replaceWith(i, key);
}

// ---------------------------------------------------------------- events

function onKeyDown(e) {
    const t = e.target;
    const box = t.closest?.('.box');
    if (!box || !root.contains(box)) return;
    const i = Number(box.dataset.index);

    if (t.classList.contains('action')) {
        onActionKey(e, i, box);
        return;
    }
    if (!t.classList.contains('focus-target')) return;

    const key = e.key;
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageDown', 'PageUp'].includes(key)) {
        e.preventDefault();
        const dest = navTarget(i, key);
        if (dest === null) {
            addLog({ key: keyName(e), level: 'note', text: 'No card in that direction. Focus stays.' });
            return;
        }
        if (e.shiftKey && isMulti() && selectable() && key.startsWith('Arrow')) {
            const anchor = state.anchor ?? i;
            focusIndex(dest, { key: keyName(e), from: i, base: key });
            state.anchor = anchor;
            selectRange(anchor, dest, keyName(e));
            state.anchor = anchor;
            return;
        }
        focusIndex(dest, { key: keyName(e), from: i, base: key });
        return;
    }

    if (key === 'Enter' && state.tabModel === 'single' && hasActions()) {
        e.preventDefault();
        const action = box.querySelector('.action');
        lastNav = { key: 'Enter', from: i, base: 'Enter' };
        action.focus();
        return;
    }

    if ((e.metaKey || e.ctrlKey) && key.toLowerCase() === 'a' && isMulti()) {
        e.preventDefault();
        const next = new Set(items.filter((_, j) => !isDisabled(j)).map((it) => it.key));
        setSelection(next, { key: keyName(e), text: 'All cards selected' });
        return;
    }

    if (key === 'Escape' && state.selected.size) {
        e.preventDefault();
        setSelection(new Set(), { key: 'Escape', text: 'Selection cleared' });
        return;
    }

    // Native controls in the list model handle Space and Enter themselves.
    if (state.model === 'list') return;

    if (key === ' ') {
        e.preventDefault();
        if (!selectable()) return;
        if (state.selectionStyle === 'highlight' && !isMulti()) replaceWith(i, 'Space');
        else toggle(i, 'Space');
        return;
    }
    if (key === 'Enter') {
        addLog({ key: 'Enter', level: 'note', text: `Activated "${items[i].title}" (would open the item)` });
    }
}

function onActionKey(e, i, box) {
    const actions = [...box.querySelectorAll('.action')];
    const index = actions.indexOf(e.target);
    if (e.key === 'Escape') {
        e.preventDefault();
        focusIndex(i, { key: 'Escape', from: i, base: 'Escape' });
        return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const forward = (e.key === 'ArrowRight') !== (state.dir === 'rtl');
        const next = actions[(index + (forward ? 1 : -1) + actions.length) % actions.length];
        next.focus();
    }
}

function onClick(e) {
    const box = e.target.closest('.box');
    if (!box || !root.contains(box)) return;
    const i = Number(box.dataset.index);
    if (isDisabled(i)) return;

    const action = e.target.closest('.action');
    if (action) {
        addLog({ key: e.detail === 0 ? lastKeyName : 'Click', level: 'note', text: `${action.dataset.action} activated for "${items[i].title}"` });
        return;
    }
    if (e.target.matches('input.cb')) return;

    if (e.target.closest('.title-button')) {
        if (!selectable()) {
            addLog({ key: e.detail === 0 ? lastKeyName : 'Click', level: 'note', text: `Activated "${items[i].title}" (would open the item)` });
            return;
        }
        highlightClick(i, e);
        return;
    }

    if (state.focusedIndex !== i || !box.contains(document.activeElement)) {
        focusIndex(i, { key: 'Click', from: state.focusedIndex, base: 'Click' });
    }
    if (!selectable()) return;
    if (state.selectionStyle === 'checkbox') toggle(i, 'Click');
    else highlightClick(i, e);
}

function onChange(e) {
    if (!e.target.matches('input.cb')) return;
    const i = Number(e.target.dataset.index);
    toggle(i, lastKeyName || 'Click');
}

function onFocusIn(e) {
    const t = e.target;
    const box = t.closest?.('.box');
    if (!box || !root.contains(box)) return;
    const i = Number(box.dataset.index);
    const entering = !root.contains(e.relatedTarget);

    if (t.classList.contains('focus-target')) {
        if (state.focusedIndex !== i) {
            state.focusedIndex = i;
            updateRoving();
        }
        const nav = lastNav;
        lastNav = null;
        const info = describe(i, entering);
        showCurrent(i, info);
        if (quietFocus) return;
        const verdict = nav ? judge(nav, i) : entering ? { level: 'ok', text: 'Entered the collection.' } : { level: 'note', text: 'Focus returned to card.' };
        addLog({ key: nav?.key || (entering ? lastKeyName || 'Focus' : lastKeyName), level: verdict.level, text: verdict.text, said: info.announce });
        return;
    }

    if (t.classList.contains('action')) {
        const nav = lastNav;
        lastNav = null;
        const said = `${t.getAttribute('aria-label')}, button`;
        $('cur-name').textContent = t.getAttribute('aria-label');
        $('cur-announce').textContent = said;
        const text =
            nav?.base === 'Enter'
                ? 'Moved into card actions with a secondary command (Enter). Users must learn this; Escape returns to the card.'
                : 'Tab moved into this card\'s actions.';
        addLog({ key: nav?.key || lastKeyName || 'Focus', level: nav?.base === 'Enter' ? 'note' : 'ok', text, said });
    }
}

// ---------------------------------------------------------------- inspector

function visualPosition(i) {
    const p = positions[i];
    if (!p) return '-';
    if (state.layout === 'grid') return `row ${p.row + 1}, column ${p.col + 1} of ${columnCount}`;
    return `column ${p.col + 1} of ${columnCount}, card ${p.order + 1} in that column`;
}

function describe(i, entering) {
    const n = items.length;
    const item = items[i];
    const target = getTarget(i);
    const selected = state.selected.has(item.key);
    const sel = selectable() && state.model !== 'list' ? (selected ? ', selected' : ', not selected') : '';
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
        case 'row-grid':
            prefix = `grid, Nature photos, 1 row, ${n} columns. `;
            announce = `${item.title}${sel}${dim}, column ${i + 1} of ${n}`;
            exposed = `row 1 of 1, column ${i + 1} of ${n}`;
            break;
        case 'list': {
            prefix = `list, Nature photos, ${n} items. `;
            let control = `${item.title}, button`;
            if (target.type === 'checkbox') control = `${item.title}, checkbox, ${target.checked ? 'checked' : 'not checked'}`;
            else if (target.hasAttribute('aria-pressed')) control = `${item.title}, toggle button, ${selected ? 'pressed' : 'not pressed'}`;
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
    return { announce: (entering ? prefix : '') + announce, exposed, visual: visualPosition(i) };
}

function judge(nav, to) {
    const from = nav.from;
    const base = nav.base;
    if (base === 'Click') return { level: 'note', text: 'Focused by pointer.' };
    if (base === 'Escape') return { level: 'ok', text: 'Escape returned focus to the card.' };
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
            return { level: 'warn', text: `Announced row jumped ${from + 1} → ${to + 1}. The jump size depends on the visual layout.` };
        }
        return { level: 'ok', text: `Row ${from + 1} → row ${to + 1}.` };
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
        text += ' Sighted users may expect Down or Up Arrow to reach the card visually below or above.';
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
    while (log.children.length > 60) log.lastElementChild.remove();
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
    const keys = state.model === 'rsp-grid'
        ? '<p>Keys: arrows follow the visual layout, Page Up/Down move by a screen of rows, Home/End go to the first and last card.</p>'
        : `<p>Keys: Right/Down Arrow next, Left/Up Arrow previous (mirrored in right-to-left), Page Up/Down move ${state.pageStep} cards, Home/End go to the first and last card.</p>`;
    const tab =
        hasActions() && state.tabModel === 'express'
            ? '<p>Tab model: Tab moves from the focused card into its actions, then out of the collection.</p>'
            : hasActions()
              ? '<p>Tab model: one tab stop. Enter moves into the card actions, Escape returns.</p>'
              : '';
    const selection = selectable()
        ? `<p>Selection: Space toggles, ${isMulti() ? 'Shift + arrow extends, Ctrl/Cmd + A selects all, ' : ''}Escape clears.</p>`
        : '';
    $('model-notes').innerHTML = NOTES[state.model] + keys + tab + selection;
}

function implicitRole(el) {
    const role = el.getAttribute('role');
    if (role) return role === 'presentation' || role === 'none' ? null : role;
    const tag = el.tagName.toLowerCase();
    if (tag === 'ul' || tag === 'ol') return 'list';
    if (tag === 'li') return 'listitem';
    if (tag === 'button') return el.hasAttribute('aria-pressed') ? 'toggle button' : 'button';
    if (tag === 'input' && el.type === 'checkbox') return 'checkbox';
    return null;
}

function accName(el) {
    if (el.hasAttribute('aria-label')) return el.getAttribute('aria-label');
    if (el.hasAttribute('aria-labelledby')) {
        return el
            .getAttribute('aria-labelledby')
            .split(/\s+/)
            .map((id) => document.getElementById(id)?.textContent.trim())
            .filter(Boolean)
            .join(' ');
    }
    if (el.tagName === 'BUTTON') return el.textContent.trim();
    return '';
}

function stateText(el) {
    const parts = [];
    const attrs = ['aria-selected', 'aria-pressed', 'aria-posinset', 'aria-setsize', 'aria-colindex', 'aria-rowcount', 'aria-colcount', 'aria-multiselectable', 'aria-disabled'];
    for (const attr of attrs) if (el.hasAttribute(attr)) parts.push(`${attr.replace('aria-', '')}=${el.getAttribute(attr)}`);
    if (el.type === 'checkbox') parts.push(el.checked ? 'checked' : 'not checked');
    if (el.disabled) parts.push('disabled');
    if (el.tabIndex === 0 && el !== root) parts.push('tab stop');
    return parts.length ? ` [${parts.join(', ')}]` : '';
}

function renderTree() {
    const lines = [];
    const limit = 3;
    const walk = (el, depth) => {
        if (el.getAttribute('aria-hidden') === 'true') return;
        if (el.classList.contains('box') && Number(el.dataset.index) >= limit) {
            if (Number(el.dataset.index) === limit) lines.push(`${'  '.repeat(depth)}… ${items.length - limit} more cards`);
            return;
        }
        const role = implicitRole(el);
        let next = depth;
        if (role) {
            const name = accName(el);
            lines.push(`${'  '.repeat(depth)}${role}${name ? ` "${name}"` : ''}${stateText(el)}`);
            next = depth + 1;
        } else if (el.classList.contains('card-title') || el.classList.contains('card-desc')) {
            lines.push(`${'  '.repeat(depth)}text "${el.textContent.trim()}"`);
        }
        if (['BUTTON', 'INPUT'].includes(el.tagName)) return;
        for (const child of el.children) walk(child, next);
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
document.addEventListener('keydown', (e) => (lastKeyName = keyName(e)), true);
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
