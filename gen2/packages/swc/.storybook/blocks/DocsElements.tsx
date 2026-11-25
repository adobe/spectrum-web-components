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
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import '@adobe/spectrum-wc-icons/swc-icon-alert-diamond.js';
import '@adobe/spectrum-wc-icons/swc-icon-info-circle.js';

import '../assets/docs-elements.css';

const classNames = (...names: (string | undefined)[]): string =>
  names.filter(Boolean).join(' ');

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
    <div role="note" className={classes}>
      {withVariantIcon(children, variant)}
    </div>
  );
};

/**
 * Spectrum replacements for the elements that markdown creates on docs
 * pages. Set as `parameters.docs.components`. MDX doesn't map tags written
 * as literal JSX, such as `<kbd>`, so `docs-elements.css` styles those.
 */
export const docsMdxComponents = {
  table: DocsTable,
  th: DocsTableHeaderCell,
  blockquote: DocsCallout,
};
