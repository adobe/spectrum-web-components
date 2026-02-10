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
import { html, type TemplateResult } from 'lit';

import { capitalize } from '@spectrum-web-components/core/shared/utilities';

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'] as const;
export const VARIANTS = ['heading', 'body', 'detail', 'code'] as const;
export const LANGS = ['en', 'zh', 'ja', 'ko'] as const;

export type TypographySize = (typeof SIZES)[number];
export type TypographyVariant = (typeof VARIANTS)[number];
export type TypographyLang = (typeof LANGS)[number] | boolean;

export type TypographyTemplateProps = {
    prefix?: string;

    variant?: TypographyVariant;
    size?: TypographySize;
    serif?: boolean;
    heavy?: boolean;
    margins?: boolean;
    prose?: boolean;
    lang?: TypographyLang;

    sampleText?: string;
    includeMultipleSizes?: boolean;
    showAllVariants?: boolean;
};

function cls(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

function variantBase(prefix: string, variant: TypographyVariant) {
    return `${prefix}-${capitalize(variant)}`;
}

function sizeClass(base: string, size: TypographySize) {
    return `${base}--size${size}`;
}

function defaultSample(variant: TypographyVariant) {
    switch (variant) {
        case 'heading':
            return 'The quick brown fox jumps over the lazy dog';
        case 'body':
            return 'Body copy should be readable and comfortable for longer blocks of text.';
        case 'detail':
            return 'Detail text for metadata, helper copy, or captions.';
        case 'code':
            return 'const tokens = generateTypographyCssString();';
    }
}

function Tag({
    tag,
    className,
    lang,
    text,
}: {
    tag: 'h2' | 'p' | 'code';
    className: string;
    lang: TypographyLang;
    text: string;
}): TemplateResult {
    // Render tag type without string HTML:
    switch (tag) {
        case 'h2':
            return html`<h2 class=${className} lang=${lang}>${text}</h2>`;
        case 'code':
            return html`<code class=${className} lang=${lang}>${text}</code>`;
        case 'p':
        default:
            return html`<p class=${className} lang=${lang}>${text}</p>`;
    }
}

function elementForVariant(variant: TypographyVariant): 'h2' | 'p' | 'code' {
    switch (variant) {
        case 'heading':
            return 'h2';
        case 'code':
            return 'code';
        case 'body':
        case 'detail':
        default:
            return 'p';
    }
}

export function template(args: TypographyTemplateProps = {}): TemplateResult {
    const {
        prefix = 'swc',
        variant = 'heading',
        size = 'M',
        serif = false,
        heavy = false,
        margins = false,
        prose = false,
        lang = false,
        sampleText,
        includeMultipleSizes = false,
        showAllVariants = false,
    } = args;

    const variants: TypographyVariant[] = showAllVariants
        ? [...VARIANTS]
        : [variant];

    const wrapperClass = cls(
        'typography-samples',
        prose && 'swc-Typography--prose'
    );

    return html`
        <div class=${wrapperClass}>
            ${variants.map((cat) => {
                const base = variantBase(prefix, cat);
                const tag = elementForVariant(cat);
                const text =
                    sampleText != null && sampleText !== ''
                        ? sampleText
                        : defaultSample(cat);

                const sizes: TypographySize[] = includeMultipleSizes
                    ? [...SIZES]
                    : [size];

                return html`
                    ${sizes.map((s) => {
                        const className = cls(
                            base,
                            sizeClass(base, s),
                            serif && `${base}--serif`,
                            heavy && `${base}--heavy`,
                            margins && `${base}--margins`
                        );

                        const metaSub = `Size ${s}${serif ? ' · serif' : ''}${
                            heavy ? ' · heavy' : ''
                        }${margins ? ' · margins' : ''}${prose ? ' · prose' : ''}${
                            lang && lang !== 'en' ? ` · lang:${lang}` : ''
                        }`;

                        return html`
                            <div class="typography-row">
                                <div class="typography-meta">
                                    <div
                                        class="swc-Typography--emphasized swc-Detail swc-Detail--sizeS"
                                    >
                                        ${cat}
                                    </div>
                                    <div class="swc-Detail swc-Detail--sizeS">
                                        ${metaSub}
                                    </div>
                                </div>
                                ${Tag({ tag, className, lang, text })}
                            </div>
                        `;
                    })}
                `;
            })}
        </div>
    `;
}
