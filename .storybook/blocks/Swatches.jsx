import { styled } from '@storybook/theming';
import React from 'react';

import styles from '@spectrum-css/bundle/dist/index.module.css';

export const SwatchGroupLabel = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    align-self: flex-start;
    justify-content: center;
    text-wrap: nowrap;
    inline-size: max-content;
    block-size: ${(props) => props.size ?? 32}px;
    color: ${(props) =>
        `var(--spectrum-neutral-subdued-content-color-default, ${props.theme.defaultText})`};
`;

export const SwatchSet = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    color: ${(props) =>
        `var(--spectrum-neutral-subdued-content-color-default, ${props.theme.defaultText})`};
`;

export const Swatch = ({
    size = 'l',
    isDisabled = false,
    noCheckerboard = false,
    color,
    children,
}) => {
    return (
        <div
            className={[
                styles._spectrum_swatch,
                styles[`_spectrum_swatch__size${size}`],
                isDisabled ? styles._is_disabled : null,
            ]
                .filter(Boolean)
                .join(' ')}
            disabled={isDisabled}
            tabIndex="0"
            style={{
                '--spectrum-picked-color': color,
            }}
        >
            <div
                className={[
                    styles._spectrum_swatch_fill,
                    !noCheckerboard
                        ? styles._spectrum_opacitycheckerboard
                        : null,
                ]
                    .filter(Boolean)
                    .join(' ')}
            >
                {children}
            </div>
        </div>
    );
};

export const SwatchColors = styled.div`
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${(props) => (props.size > 0 ? props.size * 0.2 : 8)}px;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const SwatchGroup = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
`;
