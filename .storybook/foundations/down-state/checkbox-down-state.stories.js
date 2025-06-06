import { Template } from '@spectrum-css/checkbox/stories/template.js';

export default {
    title: 'Down state',
    description:
        'Checkboxes allow users to select multiple items from a list of individual items, or mark one individual item as selected.',
    component: 'Checkbox',
    args: {
        rootClass: 'spectrum-Checkbox',
    },
    parameters: {
        actions: {
            handles: ['click input[type="checkbox"]'],
        },
    },
    tags: ['!dev'],
};

export const CheckboxDownState = Template.bind({});
CheckboxDownState.args = {
    label: 'Checkbox',
};
