import { DocsContext, useOf } from '@storybook/blocks';
import { NAVIGATE_URL } from '@storybook/core-events';
import React, { useContext } from 'react';
import { Table } from './Layouts.jsx';
import { ThemeContainer } from './ThemeContainer.jsx';
import { Body, Code, LinkableHeading } from './Typography.jsx';
import styles from '@spectrum-css/bundle/dist/index.module.css';

/**
 * Displays the modifiable custom properties for a component based on the metadata provided in the story.
 * The story metadata object is imported from the "metadata.json" file in the component's directory.
 *
 * If the metadata object does not contain a "modifiers" array, this component will not render.
 *
 * Usage of this doc block within MDX template(s):
 *  <PropertiesTable />
 */
export const PropertiesTable = () => {
    const context = useContext(DocsContext);
    const storyMeta = useOf('meta');

    const packageJson = storyMeta?.csfFile?.meta?.parameters?.packageJson ?? {};
    const metadata = storyMeta?.csfFile?.meta?.parameters?.metadata ?? {};

    if (!packageJson?.name) return;
    if (!metadata?.modifiers || !metadata?.modifiers.length) return;

    return (
        <ThemeContainer color="light" display="contents">
            <LinkableHeading id="modifiable-properties" size="m">
                <a
                    aria-hidden="true"
                    href="#modifiable-properties"
                    tabIndex="-1"
                    target="_self"
                    onClick={() => {
                        context.channel.emit(
                            NAVIGATE_URL,
                            '#modifiable-properties'
                        );
                    }}
                ></a>
                Modifiable custom properties
            </LinkableHeading>
            <Body>
                These are empty CSS custom property hooks available in this
                component that enable one-off customizations specific to a
                product implementation.
            </Body>
            <Table
                headers={['Property']}
                rows={metadata?.modifiers.map((propertyName) => [
                    <Code backgroundColor={'transparent'} size="s">
                        {propertyName}
                    </Code>,
                ])}
            />
        </ThemeContainer>
    );
};
