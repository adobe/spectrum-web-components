/**
 * Rendered as controls; these properties are assigned to the document root element
 */

/** @type import('@storybook/types').GlobalTypes */
export default {
    textDirection: {
        title: 'Text direction',
        description: 'Direction of the content flow',
        defaultValue: 'ltr',
        type: 'string',
        toolbar: {
            icon: 'transfer',
            items: [
                { value: 'ltr', title: 'Left to right' },
                { value: 'rtl', title: 'Right to left' },
            ],
            dynamicTitle: true,
        },
    },
};
