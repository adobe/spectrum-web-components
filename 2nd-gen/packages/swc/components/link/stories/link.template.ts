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
import { styleMap } from 'lit/directives/style-map.js';

export const VARIANTS = [
  'default',
  'secondary',
  'staticWhite',
  'staticBlack',
] as const;

export const CONTEXTS = ['standalone', 'prose', 'links'] as const;

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;

export const LANGS = ['en', 'zh', 'ja', 'ko'] as const;

export type LinkVariant = (typeof VARIANTS)[number];
export type LinkContext = (typeof CONTEXTS)[number];
export type LinkSize = (typeof SIZES)[number];
export type LinkLang = (typeof LANGS)[number] | undefined;

export type LinkTemplateProps = {
  prefix?: string;
  variant?: LinkVariant;
  context?: LinkContext;
  size?: LinkSize;
  quiet?: boolean;
  inline?: boolean;
  lang?: LinkLang;
  href?: string;
  sampleText?: string;
  showAllVariants?: boolean;
};

/** Standalone `.swc-Link` sets its own font-size; prose/links inherit from `swc-Body`. */
const STANDALONE_SIZE_FONT_VARS: Record<LinkSize, string | undefined> = {
  XS: 'var(--swc-font-size-75)',
  S: 'var(--swc-font-size-100)',
  M: undefined,
  L: 'var(--swc-font-size-200)',
  XL: 'var(--swc-font-size-300)',
};

const BODY_SIZE_CLASS: Record<LinkSize, string | undefined> = {
  XS: 'swc-Body--sizeXS',
  S: 'swc-Body--sizeS',
  M: undefined,
  L: 'swc-Body--sizeL',
  XL: 'swc-Body--sizeXL',
};

export const LINK_LIST_ITEMS = [
  { label: 'Privacy policy', href: '#' },
  { label: 'Terms of use', href: '#' },
  { label: 'Contact support', href: '#' },
] as const;

const STATIC_BACKGROUNDS: Record<
  'staticWhite' | 'staticBlack',
  { background: string; color: string }
> = {
  staticWhite: {
    background: 'rgb(15, 121, 125)',
    color: 'rgb(240, 240, 240)',
  },
  staticBlack: {
    background: 'rgb(181, 209, 211)',
    color: 'rgb(15, 15, 15)',
  },
};

function cls(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

function variantModifier(prefix: string, variant: LinkVariant): string | false {
  if (variant === 'default') {
    return false;
  }
  return `${prefix}-Link--${variant}`;
}

function buildLinkClasses({
  prefix,
  variant,
  context,
  quiet,
  inline,
}: {
  prefix: string;
  variant: LinkVariant;
  context: LinkContext;
  quiet: boolean;
  inline: boolean;
}): string {
  const modifier = variantModifier(prefix, variant);
  const needsBase = context === 'standalone' || modifier !== false;

  return cls(
    needsBase && `${prefix}-Link`,
    context === 'standalone' && `${prefix}-Link--standalone`,
    modifier,
    inline && `${prefix}-Link--inline`,
    quiet && context === 'standalone' && `${prefix}-Link--quiet`
  );
}

function standaloneLinkStyle(size: LinkSize): Record<string, string> {
  const fontSize = STANDALONE_SIZE_FONT_VARS[size];
  return fontSize ? { '--swc-link-font-size': fontSize } : {};
}

function bodySizeClass(size: LinkSize): string {
  return cls('swc-Body', BODY_SIZE_CLASS[size]);
}

function defaultSample(context: LinkContext): string {
  switch (context) {
    case 'links':
      return LINK_LIST_ITEMS[0].label;
    case 'prose':
      return 'inline link';
    case 'standalone':
    default:
      return 'Account settings';
  }
}

function wrapStaticDemo(
  variant: LinkVariant,
  content: TemplateResult
): TemplateResult {
  const palette = STATIC_BACKGROUNDS[variant as 'staticWhite' | 'staticBlack'];
  if (!palette) {
    return content;
  }

  return html`
    <div
      style=${styleMap({
        backgroundColor: palette.background,
        color: palette.color,
        padding: '15px 20px',
        display: 'inline-block',
      })}
    >
      ${content}
    </div>
  `;
}

function renderAnchor({
  prefix,
  variant,
  context,
  size,
  quiet,
  inline,
  lang,
  href,
  text,
  showAllVariants = false,
}: {
  prefix: string;
  variant: LinkVariant;
  context: LinkContext;
  size: LinkSize;
  quiet: boolean;
  inline: boolean;
  lang: LinkLang;
  href: string;
  text: string;
  showAllVariants?: boolean;
}): TemplateResult {
  const className = buildLinkClasses({
    prefix,
    variant,
    context,
    quiet,
    inline,
  });
  const anchor = html`
    <a
      class=${ifDefined(className ? className : undefined)}
      style=${styleMap(
        context === 'standalone' ? standaloneLinkStyle(size) : {}
      )}
      href=${href}
      lang=${ifDefined(lang && lang !== 'en' ? lang : undefined)}
    >
      ${text}
    </a>
  `;

  if (context === 'prose') {
    return html`
      <p class=${bodySizeClass(size)}>
        Sample sentence with an ${anchor} in running text.
      </p>
    `;
  }

  if (context === 'links') {
    const items = LINK_LIST_ITEMS.map((item, index) => ({
      href: item.href,
      label:
        index === 0 && text !== LINK_LIST_ITEMS[0].label
          ? text
          : showAllVariants
            ? `${item.label} (${variant})`
            : item.label,
    }));

    return html`
      <ul
        class=${cls('swc-Typography--links', bodySizeClass(size))}
        style="list-style: none; padding: 0; margin: 0;"
      >
        ${items.map(
          (item) => html`
            <li>
              <a
                class=${ifDefined(className ? className : undefined)}
                href=${item.href}
                lang=${ifDefined(lang && lang !== 'en' ? lang : undefined)}
              >
                ${item.label}
              </a>
            </li>
          `
        )}
      </ul>
    `;
  }

  return anchor;
}

export function template(args: LinkTemplateProps = {}): TemplateResult {
  const {
    prefix = 'swc',
    variant = 'default',
    context = 'standalone',
    size = 'M',
    quiet = false,
    inline = false,
    lang = undefined,
    href = '#',
    sampleText,
    showAllVariants = false,
  } = args;

  const variants: LinkVariant[] = showAllVariants ? [...VARIANTS] : [variant];
  const text =
    sampleText != null && sampleText !== ''
      ? sampleText
      : defaultSample(context);

  const wrapperClass = cls(
    'link-samples',
    showAllVariants && 'link-samples--grid'
  );

  return html`
    <div class=${wrapperClass}>
      ${variants.map((linkVariant) => {
        const row = renderAnchor({
          prefix,
          variant: linkVariant,
          context,
          size,
          quiet,
          inline,
          lang,
          href,
          text: showAllVariants ? `${text} (${linkVariant})` : text,
          showAllVariants,
        });

        const content =
          context === 'prose'
            ? html`
                <div class=${`${prefix}-Typography--prose`}>${row}</div>
              `
            : row;

        return html`
          <div class="link-row">
            ${showAllVariants
              ? html`
                  <div class="link-meta">
                    <div
                      class="swc-Typography--emphasized swc-Detail swc-Detail--sizeS"
                    >
                      ${linkVariant}
                    </div>
                    <div class="swc-Detail swc-Detail--sizeS">
                      ${context} · size
                      ${size}${quiet ? ' · quiet' : ''}${inline
                        ? ' · inline'
                        : ''}${lang && lang !== 'en' ? ` · lang:${lang}` : ''}
                    </div>
                  </div>
                `
              : null}
            ${wrapStaticDemo(linkVariant, content)}
          </div>
        `;
      })}
    </div>
  `;
}
