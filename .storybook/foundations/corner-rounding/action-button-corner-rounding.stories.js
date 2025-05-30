import { Template } from '@spectrum-css/actionbutton/stories/template.js';
import { html } from 'lit';

export default {
    title: 'Corner rounding',
    description:
        'The action button component represents an action a user can take.',
    component: 'ActionButton',
    args: {
        rootClass: 'spectrum-ActionButton',
    },
    parameters: {
        actions: {
            handles: ['click .spectrum-ActionButton:not([disabled])'],
        },
    },
    tags: ['!dev'],
};

const ActionButton = (args, context) => html`
    <div style="padding: 1rem 0;">
        ${Template({ ...args, iconName: undefined }, context)}
    </div>
`;

const ActionButtonTable = (args, context) => {
    return html`
        <table class="spectrum-Foundations-Example-CornerRounding-table">
            <thead>
                <tr>
                    <th scope="col">Token</th>
                    <th scope="col" style="padding: 0 2rem;">Value</th>
                    <th scope="col">Medium example</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>--spectrum-corner-radius-medium-size-extra-small</td>
                    <td style="padding: 0 2rem;">6px</td>
                    <td>
                        ${ActionButton(
                            {
                                ...args,
                                label: 'Extra Small',
                                size: 'xs',
                            },
                            context
                        )}
                    </td>
                </tr>
                <tr>
                    <td>--spectrum-corner-radius-medium-size-small</td>
                    <td style="padding: 0 2rem;">7px</td>
                    <td>
                        ${ActionButton(
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
                    <td>--spectrum-corner-radius-medium-size-medium</td>
                    <td style="padding: 0 2rem;">8px</td>
                    <td>
                        ${ActionButton(
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
                    <td>--spectrum-corner-radius-medium-size-large</td>
                    <td style="padding: 0 2rem;">9px</td>
                    <td>
                        ${ActionButton(
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
                    <td>--spectrum-corner-radius-medium-size-extra-large</td>
                    <td style="padding: 0 2rem;">10px</td>
                    <td>
                        ${ActionButton(
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

export const ActionButtonExamples = ActionButtonTable.bind({});
ActionButtonExamples.args = {};
