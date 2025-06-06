import { Template } from '@spectrum-css/button/stories/template.js';

export default {
    title: 'Down state',
    description:
        'Buttons allow users to perform an action or to navigate to another page. They have multiple styles for various needs, and are ideal for calling attention to where a user needs to do something in order to move forward in a flow.',
    component: 'Button',
    args: {
        rootClass: 'spectrum-Button',
    },
    parameters: {
        actions: {
            handles: ['click .spectrum-Button'],
        },
    },
    tags: ['!dev'],
};

export const ButtonDownState = Template.bind({});
ButtonDownState.args = {
    label: 'Edit',
    variant: 'accent',
    customStyles: {
        '--spectrum-downstate-width': '72px',
        '--spectrum-downstate-height': '32px',
    },
};
