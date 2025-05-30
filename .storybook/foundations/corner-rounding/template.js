import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import './index.css';

const getSizeModifier = (size) => {
    if (size === 'none' || size === 'full') return size;
    return `size${size.toUpperCase()}`;
};

export const Template = ({
    rootClass = 'spectrum-Foundations-Example-CornerRounding',
    size = 'none',
    label,
    value,
}) => html`
    <tr>
        <td>${label}</td>
        <td style="padding: 0 2rem;">${value}</td>
        <td>
            <div
                class=${classMap({
                    [rootClass]: true,
                    [`${rootClass}--${getSizeModifier(size)}`]:
                        typeof size !== 'undefined',
                })}
            ></div>
        </td>
        <td>
            <div
                class=${classMap({
                    [rootClass]: true,
                    [`${rootClass}--${getSizeModifier(size)}`]:
                        typeof size !== 'undefined',
                    [`${rootClass}--border`]: true,
                })}
            ></div>
        </td>
    </tr>
`;
