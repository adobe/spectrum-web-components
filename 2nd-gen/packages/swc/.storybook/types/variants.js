/**
 *
 * @param {("xxs"|"xs"|"s"|"m"|"l"|"xl"|"xxl"|"xxxl"|number)[]} options
 * @returns
 */
export const size = (options = ['s', 'm', 'l', 'xl'], hasLabels = true) => ({
    name: 'Size',
    type: { name: 'string', required: true },
    table: {
        type: { summary: 'string' },
        category: 'Component',
    },
    options,
    control: {
        type: 'select',
        labels: hasLabels
            ? {
                  xxs: 'Extra-extra-small',
                  xs: 'Extra-small',
                  s: 'Small',
                  m: 'Medium',
                  l: 'Large',
                  xl: 'Extra-large',
                  xxl: 'Extra-extra-large',
                  xxxl: 'Extra-extra-extra-large',
              }
            : undefined,
    },
});

export const isEmphasized = {
    name: 'Emphasized styling',
    type: { name: 'boolean' },
    table: {
        type: { summary: 'boolean' },
        category: 'Component',
    },
    control: { type: 'boolean' },
};

export const isQuiet = {
    name: 'Quiet styling',
    type: { name: 'boolean' },
    table: {
        type: { summary: 'boolean' },
        category: 'Component',
    },
    control: { type: 'boolean' },
};

export const staticColor = {
    name: 'Static color',
    description:
        'Used when component is layered over a background or visual contrary to the general theme.',
    type: { name: 'string' },
    table: {
        type: { summary: 'string' },
        category: 'Advanced',
    },
    options: ['white', 'black'],
    control: {
        type: 'select',
        labels: {
            white: 'Over dark background',
            black: 'Over light background',
        },
    },
};
