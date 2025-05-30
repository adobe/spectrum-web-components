// Global properties added to each component;
//      determines what stylesheets are loaded
export default {
    /* None of these should show up in the args table but are necessary for rendering the templates */
    rootClass: {
        name: 'Class name',
        type: { name: 'string', required: true },
        table: { disable: true },
        control: 'text',
    },
    customClasses: {
        name: 'Custom classes',
        type: { name: 'string', required: false },
        table: { disable: true },
        control: 'object',
    },
    customStyles: {
        name: 'Custom styles',
        type: { name: 'string', required: false },
        table: { disable: true },
        control: 'object',
    },
    wrapperStyles: {
        name: 'Add a wrapper element with custom styles',
        type: { name: 'string', required: false },
        table: { disable: true },
        control: 'object',
    },
    id: {
        name: 'Element ID',
        type: { name: 'string', required: false },
        table: { disable: true },
        control: 'text',
    },
    testId: {
        name: 'Test ID',
        type: { name: 'string', required: false },
        table: { disable: true },
        control: 'text',
    },
};
