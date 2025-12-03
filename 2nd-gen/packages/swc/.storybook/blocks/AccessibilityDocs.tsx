/// <reference types="vite/client" />
import { Markdown, useOf } from '@storybook/addon-docs/blocks';
import React, { useEffect, useState } from 'react';

// Glob import all a11y.mdx files as raw strings
const a11yModules = import.meta.glob<string>('../../components/**/a11y.mdx', {
    query: '?raw',
    import: 'default',
    eager: false,
});

/**
 * A block that dynamically loads and renders a11y.mdx documentation
 * based on the current component's title.
 */
export const AccessibilityDocs = ({ of }: { of?: any }) => {
    const resolvedOf = useOf(of || 'meta', ['meta']);
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        // Extract component name from the title (e.g., "Components/Progress Circle" -> "progress-circle")
        const title = resolvedOf.preparedMeta?.title || '';
        const componentName = title
            .split('/')
            .pop()
            ?.toLowerCase()
            .replace(/\s+/g, '-');

        // Find the matching a11y.mdx path
        const matchingPath = Object.keys(a11yModules).find((path) =>
            path.toLowerCase().includes(`/${componentName}/`)
        );

        console.log(a11yModules);
        console.log(componentName);

        if (matchingPath) {
            a11yModules[matchingPath]().then((raw) => setContent(raw));
        } else {
            setContent(null);
        }
    }, [resolvedOf]);

    if (!content) {
        return <p>No accessibility documentation available.</p>;
    }

    return <Markdown>{content}</Markdown>;
};
