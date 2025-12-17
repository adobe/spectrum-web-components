import { Canvas, Story, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';
import type { ActionItem } from 'storybook/internal/components';
import { formatComponentName } from '../helpers/index.js';

export const OverviewStory = () => {
    const resolvedOf = useOf('meta', ['meta']);

    const primaryStory = Object.values(resolvedOf.csfFile.stories).find(
        (story) => story.tags?.includes('overview')
    );

    if (!primaryStory) return null;
    primaryStory.args = null;

    // Extract component name and create GitHub link
    const componentName = formatComponentName(resolvedOf.preparedMeta?.title);
    const githubBaseUrl =
        'https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components';

    // Build additional actions dynamically based on available metadata
    const additionalActions: ActionItem[] = [];

    // Spectrum Design Guidance - requires valid component name
    if (
        componentName &&
        !resolvedOf.csfFile.meta?.parameters?.missingDesignDocs
    ) {
        additionalActions.push({
            title: 'Read Spectrum Design Guidance',
            onClick: () => {
                window.open(
                    `https://s2.spectrum.corp.adobe.com/page/${componentName}/`,
                    '_blank'
                );
            },
        });
    }

    // Figma - requires design URL in parameters
    if (resolvedOf.csfFile.meta?.parameters?.design?.url) {
        additionalActions.push({
            title: 'View Figma',
            onClick: () => {
                window.open(
                    resolvedOf.csfFile.meta?.parameters?.design?.url,
                    '_blank'
                );
            },
        });
    }

    // GitHub - requires valid component name
    if (componentName) {
        additionalActions.push({
            title: 'View source on GitHub',
            onClick: () => {
                window.open(`${githubBaseUrl}/${componentName}`, '_blank');
            },
        });
    }

    // Stackblitz - requires stackblitz URL in meta parameters
    if (resolvedOf.csfFile.meta?.parameters?.stackblitz?.url) {
        additionalActions.push({
            title: 'Debug in Stackblitz',
            onClick: () => {
                window.open(
                    resolvedOf.csfFile.meta?.parameters?.stackblitz?.url,
                    '_blank'
                );
            },
        });
    }

    return (
        <Canvas
            of={primaryStory.moduleExport}
            withToolbar={false}
            additionalActions={additionalActions}
            sourceState="none"
        />
    );
};
