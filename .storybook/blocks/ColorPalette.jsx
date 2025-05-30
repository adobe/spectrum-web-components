import { ResetWrapper } from '@storybook/components';
import { capitalize } from 'lodash-es';
import React from 'react';
import { List } from './Layouts.jsx';
import {
    Swatch,
    SwatchColors,
    SwatchGroup,
    SwatchGroupLabel,
    SwatchSet,
} from './Swatches.jsx';
import { ThemeContainer } from './ThemeContainer.jsx';
import { Body, Heading } from './Typography.jsx';
import {
    fetchToken,
    fetchTokenSet,
    sortAlphaNumerically,
} from './utilities.js';

import styles from '@spectrum-css/bundle/dist/index.module.css';

/**
 * A single color row your styleguide showing title, subtitle and one or more colors, used
 * as a child of `ColorPalette`.
 */
export const ColorItem = ({
    title,
    color,
    size = 60,
    values = [],
    noCheckerboard = false,
    skipTitle = false,
    ...props
}) => {
    if (!color) return;

    // Attempt to fetch values from the token data
    if (!values.length) {
        const sets = fetchTokenSet(new RegExp(`^${color}-\\d+$`));
        values = Object.keys(sets)
            ?.sort(sortAlphaNumerically)
            .map((key) => key.replace(`${color}-`, ''));
    }

    if (!values.length) {
        return (
            <>
                {!skipTitle && (
                    <SwatchGroupLabel className="swatch-group-label">
                        <Heading size="s">{title ?? capitalize(color)}</Heading>
                    </SwatchGroupLabel>
                )}
                <Body>No values provided for color {color}</Body>
            </>
        );
    }

    return (
        <>
            {!skipTitle && (
                <SwatchGroupLabel className="swatch-group-label">
                    <Heading size="s">{title ?? capitalize(color)}</Heading>
                </SwatchGroupLabel>
            )}
            <SwatchGroup className={styles._spectrum_swatchgroup} {...props}>
                <SwatchColors className="swatch-colors" size={size}>
                    {values.map((value) => {
                        const resolved = fetchToken(
                            `${color}-${value}`,
                            value ?? color
                        );
                        return (
                            <SwatchSet
                                className="swatch-set"
                                key={`${color}-${value}`}
                                style={{ '--mod-swatch-size': `${size}px` }}
                            >
                                <Body className="swatch-label" size="s">
                                    {value}
                                </Body>
                                <Swatch
                                    title={`--spectrum-${color}-${value} / ${resolved}`}
                                    color={resolved}
                                    size={size}
                                    noCheckerboard={noCheckerboard}
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            `--spectrum-${color}-${value}`
                                        )
                                    }
                                />
                            </SwatchSet>
                        );
                    })}
                </SwatchColors>
            </SwatchGroup>
        </>
    );
};

/**
 * Styleguide documentation for colors, including names, captions, and color swatches,
 * all specified as `ColorItem` children of this wrapper component.
 */
export const ColorPalette = ({ color, children, ...props }) => {
    return (
        <ResetWrapper>
            <ThemeContainer color={color} {...props}>
                <List className="docblock-colorpalette sb-unstyled">
                    {children}
                </List>
            </ThemeContainer>
        </ResetWrapper>
    );
};

export default ColorPalette;
