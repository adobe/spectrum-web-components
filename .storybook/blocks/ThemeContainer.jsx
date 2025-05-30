import { DocsContext } from '@storybook/blocks';
import { ThemeProvider } from '@storybook/theming';
import React, { useContext } from 'react';
import { Container } from './Layouts.jsx';

import styles from '@spectrum-css/bundle/dist/index.module.css';

/**
 * A container that wraps the children in a themed context
 * inherited from the storybook global context. This is used
 * to create a ThemeProvider that can be used to style components
 * with the correct color and scale.
 */
export const ThemeContainer = ({
    color,
    scale,
    context,
    children,
    ...props
}) => {
    const docContext = DocsContext && useContext(DocsContext);
    const globals = docContext?.store?.userGlobals?.globals ?? {};

    // Fetch the current global color theme from the context store
    const theme = {
        ...globals,
        color: color ?? globals.color ?? 'light',
        scale: scale ?? globals.scale ?? 'medium',
        context: context ?? globals.context ?? 'spectrum',
    };

    const classNames = [
        styles._spectrum,
        theme.context !== 'spectrum'
            ? styles[`_spectrum__${theme.context}`]
            : null,
        styles[`_spectrum__${theme.color}`],
        styles[`_spectrum__${theme.scale}`],
        styles._spectrum_typography,
        ...(props && props.className ? props.className.split(' ') : []),
    ].filter(Boolean);

    return (
        <ThemeProvider theme={theme}>
            <Container className={classNames.join(' ')} {...props}>
                {children}
            </Container>
        </ThemeProvider>
    );
};
