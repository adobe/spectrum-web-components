/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { Markdown, Source, useOf } from '@storybook/addon-docs/blocks';
import React, { Fragment } from 'react';
import customElements from '../custom-elements.json' with { type: 'json' };

interface GuidanceBlockProps {
    of?: any;
    member?: string; // Property/method name
    tag?: string; // Specific tag name
    title?: string; // Custom title
}

/**
 * Custom doc block that renders guidance from CEM custom tags.
 *
 * Auto-detects guidance tags on component or member and renders them.
 *
 * @example Class-level guidance
 * <GuidanceBlock />
 *
 * @example Member-level guidance
 * <GuidanceBlock member="size" />
 *
 * @example Specific tag
 * <GuidanceBlock tag="a11yFeature" title="Features" />
 */
export const GuidanceBlock = ({
    of,
    member,
    tag,
    title,
}: GuidanceBlockProps) => {
    const resolvedOf = useOf(of || 'meta', ['meta']);
    const componentName = resolvedOf.csfFile.meta?.parameters?.componentName;

    // Find the component in CEM
    const component = customElements.modules
        .flatMap((m: any) => m.declarations || [])
        .find((d: any) => d.tagName === componentName);

    if (!component) {
        console.warn(`Component ${componentName} not found in CEM`);
        return null;
    }

    // Determine where to look for guidance
    let source = component;

    if (member) {
        // Look for guidance on specific member
        const memberData = component.members?.find(
            (m: any) => m.name === member
        );
        if (!memberData) {
            console.warn(
                `Member '${member}' not found on component ${componentName}`
            );
            return null;
        }
        source = memberData;
    }

    // Get guidance tags
    const guidanceTags = extractGuidanceTags(source, tag);

    if (guidanceTags.length === 0) {
        return null;
    }

    return (
        <div className="guidance-block" data-member={member}>
            {title && <h3>{title}</h3>}
            {guidanceTags.map((guidance, index) => (
                <div key={index} data-guidance-type={guidance.tag}>
                    {renderGuidanceContent(guidance.content)}
                </div>
            ))}
        </div>
    );
};

/**
 * Known guidance tag names to look for
 */
const GUIDANCE_TAG_NAMES = [
    'sizeGuidance',
    'variantGuidance',
    'a11yFeature',
    'bestPractice',
    'behavior',
    'migration',
    'anatomy',
    'example',
];

/**
 * Extract all guidance tags from a source object (component or member)
 */
function extractGuidanceTags(
    source: any,
    specificTag?: string
): Array<{ tag: string; content: string }> {
    const tags: Array<{ tag: string; content: string }> = [];

    if (specificTag) {
        // Only get the specific tag
        if (source[specificTag]) {
            tags.push({ tag: specificTag, content: source[specificTag] });
        }
    } else {
        // Get all guidance tags
        GUIDANCE_TAG_NAMES.forEach((tagName) => {
            if (source[tagName]) {
                tags.push({ tag: tagName, content: source[tagName] });
            }
        });
    }

    return tags;
}

/**
 * Render guidance content with markdown and code blocks
 */
function renderGuidanceContent(content: string) {
    // Split content into text and code blocks
    const parts = splitContentAndCode(content);

    return (
        <Fragment>
            {parts.map((part, index) => {
                if (part.type === 'text') {
                    return <Markdown key={index}>{part.content}</Markdown>;
                } else {
                    return (
                        <Source
                            key={index}
                            language={part.language}
                            code={part.content}
                            dark={true}
                        />
                    );
                }
            })}
        </Fragment>
    );
}

/**
 * Split content into text and code blocks
 */
function splitContentAndCode(content: string) {
    const parts: Array<{
        type: 'text' | 'code';
        content: string;
        language?: string;
    }> = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
        // Add text before code block
        if (match.index > lastIndex) {
            const textContent = content
                .substring(lastIndex, match.index)
                .trim();
            if (textContent) {
                parts.push({
                    type: 'text',
                    content: textContent,
                });
            }
        }

        // Add code block
        parts.push({
            type: 'code',
            content: match[2].trim(),
            language: match[1] || 'html',
        });

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
        const textContent = content.substring(lastIndex).trim();
        if (textContent) {
            parts.push({
                type: 'text',
                content: textContent,
            });
        }
    }

    return parts;
}
