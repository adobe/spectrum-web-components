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
import React, {
  Children,
  cloneElement,
  type ComponentPropsWithoutRef,
  isValidElement,
  lazy,
  type ReactNode,
  Suspense,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import '@adobe/spectrum-wc-icons/swc-icon-alert-diamond.js';
import '@adobe/spectrum-wc-icons/swc-icon-info-circle.js';

import '../assets/docs-elements.css';

const classNames = (...names: (string | undefined)[]): string =>
  names.filter(Boolean).join(' ');

// Loaded on demand because addon-docs doesn't load under Vitest, which imports preview.ts.
const CodeOrSourceMdx = lazy(() =>
  import('@storybook/addon-docs/blocks').then((module) => ({
    default: module.CodeOrSourceMdx,
  }))
);

const HeaderMdx = lazy(() =>
  import('@storybook/addon-docs/blocks').then((module) => ({
    default: module.HeaderMdx,
  }))
);

/**
 * Renders inline code with the `.swc-Code` typography utility. Fenced code
 * blocks, which carry a language class or span lines, go to Storybook's
 * source block as before.
 */
export const DocsCode = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'code'>) => {
  const isBlock =
    typeof className === 'string' ||
    (typeof children === 'string' && /[\n\r]/.test(children));

  if (isBlock) {
    return (
      <Suspense fallback={null}>
        <CodeOrSourceMdx className={className} {...props}>
          {children}
        </CodeOrSourceMdx>
      </Suspense>
    );
  }
  return (
    <code
      className="swc-DocsCode swc-Code swc-Code--sizeS sb-unstyled"
      {...props}
    >
      {children}
    </code>
  );
};

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

/**
 * Creates a markdown heading that uses the `.swc-Heading` typography
 * utility. It renders through Storybook's `HeaderMdx`, which adds the hover
 * anchor link, with a plain heading until that loads. `sb-unstyled` opts out
 * of Storybook's docs typography, which would otherwise tie with the utility
 * and win. The MDX compiler sets each heading's `id`, which the anchor link
 * and the table of contents point to.
 */
const createDocsHeading = (Tag: HeadingLevel, size: string) => {
  // The h1 is the page title, so it gets no extra space above it.
  const margins = Tag === 'h1' ? undefined : 'swc-Heading--margins';
  const DocsHeading = ({
    className,
    ...props
  }: ComponentPropsWithoutRef<HeadingLevel>) => {
    const headingProps = {
      ...props,
      className: classNames(
        'swc-Heading',
        `swc-Heading--size${size}`,
        margins,
        'sb-unstyled',
        className
      ),
    };
    return (
      <Suspense fallback={<Tag {...headingProps} />}>
        <HeaderMdx as={Tag} {...headingProps} />
      </Suspense>
    );
  };
  DocsHeading.displayName = `DocsHeading(${Tag})`;
  return DocsHeading;
};

/** A markdown paragraph that uses the `.swc-Body` typography utility. */
export const DocsParagraph = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'p'>) => (
  <p
    className={classNames(
      'swc-Body',
      'swc-Body--margins',
      'sb-unstyled',
      className
    )}
    {...props}
  />
);

/** A markdown list item that uses the `.swc-Body` typography utility. */
export const DocsListItem = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'li'>) => (
  <li className={classNames('swc-Body', 'sb-unstyled', className)} {...props} />
);

/**
 * Wraps a markdown table in a Spectrum-styled container. When the table is
 * wider than the page, the container becomes a focusable, named scroll
 * region so keyboard users can scroll it.
 */
export const DocsTable = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'table'>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollLabel, setScrollLabel] = useState<string>();

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const update = () => {
      const overflows = wrapper.scrollWidth > wrapper.clientWidth;
      setScrollLabel(overflows ? getScrollRegionLabel(wrapper) : undefined);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    if (wrapper.firstElementChild) {
      observer.observe(wrapper.firstElementChild);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="swc-DocsTable"
      {...(scrollLabel
        ? { role: 'region', 'aria-label': scrollLabel, tabIndex: 0 }
        : {})}
    >
      <table
        className={classNames('swc-DocsTable-table', 'sb-unstyled', className)}
        {...props}
      />
    </div>
  );
};

/** Names a scroll region after the nearest heading above it. */
const getScrollRegionLabel = (wrapper: HTMLElement): string => {
  let sibling = wrapper.previousElementSibling;
  while (sibling) {
    if (/^H[2-6]$/.test(sibling.tagName)) {
      return `${sibling.textContent?.trim()} table`;
    }
    sibling = sibling.previousElementSibling;
  }
  return 'Scrollable table';
};

/** Markdown only creates `th` in a table's header row, so each one heads a column. */
export const DocsTableHeaderCell = (props: ComponentPropsWithoutRef<'th'>) => (
  <th scope="col" {...props} />
);

type CalloutVariant = 'notice' | 'informative' | 'neutral';

const NOTICE_PATTERN = /^(⚠️|❗|important\b|warning\b|caution\b)/iu;
const INFORMATIVE_PATTERN = /^(💡|ℹ️|note\b|tip\b|did you know\b)/iu;

/** The workflow icon each callout variant leads with, as in Spectrum's in-line alert. */
const CALLOUT_ICON: Record<Exclude<CalloutVariant, 'neutral'>, string> = {
  notice: 'swc-icon-alert-diamond',
  informative: 'swc-icon-info-circle',
};

const LEADING_EMOJI_PATTERN = /^\s*(?:\p{Extended_Pictographic}\uFE0F?\s*)+/u;

/** Concatenates the text of a React node tree. */
const getText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getText).join('');
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getText(node.props.children);
  }
  return '';
};

/**
 * Picks a callout variant from the start of a blockquote's first
 * paragraph, for example `⚠️ **Important:**` or `**Note:**`.
 */
export const getCalloutVariant = (children: ReactNode): CalloutVariant => {
  const firstBlock = Children.toArray(children).find(isValidElement);
  const text = getText(firstBlock).trim();
  if (NOTICE_PATTERN.test(text)) {
    return 'notice';
  }
  if (INFORMATIVE_PATTERN.test(text)) {
    return 'informative';
  }
  return 'neutral';
};

/**
 * Replaces any emoji at the start of the callout's first paragraph with the
 * variant's workflow icon, so every callout of a variant leads with the same
 * icon. The icon is decorative; the authored label, such as "Important:",
 * carries the meaning.
 */
const withVariantIcon = (
  children: ReactNode,
  variant: Exclude<CalloutVariant, 'neutral'>
): ReactNode => {
  let replaced = false;
  return Children.map(children, (child) => {
    if (replaced || !isValidElement<{ children?: ReactNode }>(child)) {
      return child;
    }
    replaced = true;
    const [first, ...rest] = Children.toArray(child.props.children);
    const lead =
      typeof first === 'string'
        ? first.replace(LEADING_EMOJI_PATTERN, '')
        : first;
    return cloneElement(
      child,
      undefined,
      // Workflow icons mark themselves `aria-hidden` when they have no label.
      React.createElement(CALLOUT_ICON[variant], {
        className: 'swc-DocsCallout-icon',
      }),
      lead,
      ...rest
    );
  });
};

/**
 * Renders a markdown blockquote as a Spectrum in-line alert. Callouts that
 * start with an "Important" or "Note" label render as a `note` that leads
 * with the variant's workflow icon; other quotes stay blockquotes.
 */
export const DocsCallout = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'blockquote'>) => {
  const variant = getCalloutVariant(children);
  const classes = classNames(
    'swc-DocsCallout',
    `swc-DocsCallout--${variant}`,
    className
  );

  if (variant === 'neutral') {
    return (
      <blockquote className={classNames(classes, 'sb-unstyled')} {...props}>
        {children}
      </blockquote>
    );
  }
  return (
    <div role="note" className={classes} {...props}>
      {withVariantIcon(children, variant)}
    </div>
  );
};

/**
 * Spectrum replacements for the elements that markdown creates on docs
 * pages. Set as `parameters.docs.components`. Only markdown output goes
 * through this map, so story previews keep their own styles. MDX doesn't
 * map tags written as literal JSX, such as `<kbd>`, so `docs-elements.css`
 * styles those. Links keep Storybook's component, which handles navigation
 * between docs pages.
 */
export const docsMdxComponents = {
  h1: createDocsHeading('h1', 'XXL'),
  h2: createDocsHeading('h2', 'L'),
  h3: createDocsHeading('h3', 'M'),
  h4: createDocsHeading('h4', 'XS'),
  p: DocsParagraph,
  li: DocsListItem,
  code: DocsCode,
  table: DocsTable,
  th: DocsTableHeaderCell,
  blockquote: DocsCallout,
};
