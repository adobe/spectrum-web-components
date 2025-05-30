// Import the component markup template
import { Template } from '@spectrum-css/checkbox/stories/template.js';
import { html } from 'lit';

export default {
    title: 'Corner rounding',
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

const Checkbox = (args = {}, context = {}) => html`
    <div style="padding: 1rem 0;">
        ${Template({ ...args, iconName: undefined }, context)}
    </div>
`;

const CheckboxTable = (args, context) => {
    return html`
        <table class="spectrum-Foundations-Example-CornerRounding-table">
            <thead>
                <tr>
                    <th scope="col">Token</th>
                    <th scope="col" style="padding: 0 2rem;">Value</th>
                    <th scope="col">Small example</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>--spectrum-corner-radius-small-size-small</td>
                    <td style="padding: 0 2rem;">3px</td>
                    <td>
                        ${Checkbox(
                            {
                                ...args,
                                label: 'Small',
                                size: 's',
                            },
                            context
                        )}
                    </td>
                </tr>
                <tr>
                    <td>--spectrum-corner-radius-small-size-medium</td>
                    <td style="padding: 0 2rem;">4px</td>
                    <td>
                        ${Checkbox(
                            {
                                ...args,
                                label: 'Medium',
                                size: 'm',
                            },
                            context
                        )}
                    </td>
                </tr>
                <tr>
                    <td>--spectrum-corner-radius-small-size-large</td>
                    <td style="padding: 0 2rem;">5px</td>
                    <td>
                        ${Checkbox(
                            {
                                ...args,
                                label: 'Large',
                                size: 'l',
                            },
                            context
                        )}
                    </td>
                </tr>
                <tr>
                    <td>--spectrum-corner-radius-small-size-extra-large</td>
                    <td style="padding: 0 2rem;">6px</td>
                    <td>
                        ${Checkbox(
                            {
                                ...args,
                                label: 'Extra Large',
                                size: 'xl',
                            },
                            context
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    `;
};

export const CheckboxExamples = CheckboxTable.bind({});
CheckboxExamples.args = {};
