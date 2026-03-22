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
import { ifDefined } from 'lit/directives/if-defined.js';

import { capitalize } from '@spectrum-web-components/core/utils/index.js';

export const SIZES = [
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
  'XXXXL',
] as const;
export const VARIANTS = ['heading', 'title', 'body', 'detail', 'code'] as const;
export const LANGS = ['en', 'zh', 'ja', 'ko'] as const;

export const SIZES_BY_VARIANT: Record<
  TypographyVariant,
  readonly TypographySize[]
> = {
  heading: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
  title: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  body: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  detail: ['XS', 'S', 'M', 'L', 'XL'],
  code: ['XS', 'S', 'M', 'L', 'XL'],
} as const;

export const VARIANT_CAPABILITIES: Record<
  TypographyVariant,
  VariantCapabilities
> = {
  heading: {
    supportsSerif: true,
    supportsHeavy: true,
    supportsEmphasized: true,
  },
  title: {
    supportsSerif: true,
    supportsHeavy: false,
    supportsEmphasized: true,
  },
  body: {
    supportsSerif: true,
    supportsHeavy: false,
    supportsEmphasized: true,
  },
  detail: {
    supportsSerif: true,
    supportsHeavy: false,
    supportsEmphasized: true,
  },
  code: {
    supportsSerif: false,
    supportsHeavy: false,
    supportsEmphasized: false,
  },
};

export type VariantCapabilities = {
  supportsSerif: boolean;
  supportsHeavy: boolean;
  supportsEmphasized: boolean;
};

export type TypographySize = (typeof SIZES)[number];
export type TypographyVariant = (typeof VARIANTS)[number];
export type TypographyLang = (typeof LANGS)[number] | undefined;

export type TypographyTemplateProps = {
  prefix?: string;

  variant?: TypographyVariant;
  size?: TypographySize;
  serif?: boolean;
  heavy?: boolean;
  emphasized?: boolean;
  margins?: boolean;
  prose?: boolean;
  lang?: TypographyLang;

  sampleText?: string;
  includeMultipleSizes?: boolean;
  showAllVariants?: boolean;
};

export function getCapabilities(
  variant: TypographyVariant
): VariantCapabilities {
  return VARIANT_CAPABILITIES[variant];
}

export function getAllowedSizes(
  variant: TypographyVariant
): readonly TypographySize[] {
  return SIZES_BY_VARIANT[variant] ?? SIZES;
}

export function coerceSize(
  variant: TypographyVariant,
  requested: TypographySize
): TypographySize {
  const allowed = getAllowedSizes(variant);
  return (allowed.includes(requested) ? requested : 'M') as TypographySize;
}

function cls(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

function variantBase(prefix: string, variant: TypographyVariant): string {
  return `${prefix}-${capitalize(variant)}`;
}

function sizeClass(base: string, size: TypographySize): string {
  return `${base}--size${size}`;
}

function defaultSample(variant: TypographyVariant): string {
  switch (variant) {
    case 'heading':
      return 'Reserved for main page heading';
    case 'title':
      return 'Important information and wayfinding';
    case 'body':
      return 'Body copy should be readable and comfortable for longer blocks of text.';
    case 'detail':
      return 'Supporting metadata';
    case 'code':
      return "console.log('Hello World');";
  }
}

function Tag({
  tag,
  className,
  lang,
  text,
}: {
  tag: 'h2' | 'h3' | 'p' | 'code';
  className: string;
  lang: TypographyLang;
  text: string;
}): TemplateResult {
  switch (tag) {
    case 'h2':
      return html`
        <h2 class=${className} lang=${ifDefined(lang)}>${text}</h2>
      `;
    case 'code':
      return html`
        <code class=${className} lang=${ifDefined(lang)}>${text}</code>
      `;
    case 'p':
    default:
      return html`
        <p class=${className} lang=${ifDefined(lang)}>${text}</p>
      `;
  }
}

function elementForVariant(
  variant: TypographyVariant
): 'h2' | 'h3' | 'p' | 'code' {
  switch (variant) {
    case 'heading':
      return 'h2';
    case 'title':
      return 'h3';
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
    emphasized = false,
    margins = false,
    prose = false,
    lang = undefined,
    sampleText,
    includeMultipleSizes = false,
    showAllVariants = false,
  } = args;

  const variants: TypographyVariant[] = (
    showAllVariants ? [...VARIANTS] : [variant]
  ).filter((typeVar) => {
    const caps = getCapabilities(typeVar);
    if (serif && !caps.supportsSerif) {
      return false;
    }
    if (heavy && !caps.supportsHeavy) {
      return false;
    }
    if (emphasized && !caps.supportsEmphasized) {
      return false;
    }
    return true;
  });

  const wrapperClass = cls(
    'typography-samples',
    'typography-samples--grid',
    prose && 'swc-Typography--prose'
  );

  return html`
    <div class=${wrapperClass}>
      ${variants.map((typeVar) => {
        const typeCaps = getCapabilities(typeVar);

        // Per-variant coercion
        const serifOn = typeCaps.supportsSerif ? serif : false;
        const heavyOn = typeCaps.supportsHeavy ? heavy : false;
        const emphasizedOn = typeCaps.supportsEmphasized ? emphasized : false;

        const base = variantBase(prefix, typeVar);
        const tag = elementForVariant(typeVar);
        const text =
          sampleText != null && sampleText !== ''
            ? sampleText
            : defaultSample(typeVar);

        const allowedSizes = getAllowedSizes(typeVar);
        const coerced = coerceSize(typeVar, size);

        const sizes: TypographySize[] = includeMultipleSizes
          ? [...allowedSizes]
          : [coerced];

        return html`
          ${sizes.map((s) => {
            const className = cls(
              base,
              s != 'M' && sizeClass(base, s),
              serifOn && `${base}--serif`,
              heavyOn && `${base}--heavy`,
              emphasizedOn && `swc-Typography--emphasized`,
              margins && `${base}--margins`
            );

            const metaSub = `size${s}${serifOn ? ' · serif' : ''}${emphasizedOn ? ' · emphasized' : ''}${
              heavyOn ? ' · heavy' : ''
            }${margins ? ' · margins' : ''}${prose ? ' · prose' : ''}${
              lang && lang !== 'en' ? ` · lang:${lang}` : ''
            }`;

            return html`
              <div class="typography-row">
                <div class="typography-meta">
                  <div
                    class="swc-Typography--emphasized swc-Detail swc-Detail--sizeS"
                  >
                    ${typeVar}
                  </div>
                  <div class="swc-Detail swc-Detail--sizeS">${metaSub}</div>
                </div>
                <!-- Sample -->
                ${Tag({ tag, className, lang, text })}
              </div>
            `;
          })}
        `;
      })}
    </div>
  `;
}
