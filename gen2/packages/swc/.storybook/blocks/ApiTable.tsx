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

import { HeaderMdx, Markdown, useOf } from '@storybook/addon-docs/blocks';
import type {
  Attribute,
  ClassField,
  ClassMember,
  CssCustomProperty,
  CssPart,
  CustomElement,
  Declaration,
  Event as CemEvent,
  Package,
  Slot,
} from 'custom-elements-manifest/schema';
import React from 'react';

// ────────────────────────────
//   CEM helpers
// ────────────────────────────

type MemberWithReflects = ClassField & {
  attribute?: string;
  reflects?: boolean;
};

declare global {
  interface Window {
    __STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__?: Package;
  }
}

function findComponent(
  cem: Package,
  tagName: string
): (Declaration & CustomElement) | undefined {
  for (const mod of cem.modules) {
    for (const decl of mod.declarations ?? []) {
      if ('tagName' in decl && decl.tagName === tagName) {
        return decl as Declaration & CustomElement;
      }
    }
  }
  return undefined;
}

function isField(member: ClassMember): member is MemberWithReflects {
  return member.kind === 'field';
}

// ────────────────────────────
//   Shared
// ────────────────────────────

const scrollStyle: React.CSSProperties = {
  overflowX: 'auto',
  width: '100%',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
};

// ────────────────────────────
//   Sub-tables
// ────────────────────────────

/** Storybook argType shape (subset we care about). */
interface ArgType {
  options?: string[];
  control?: unknown;
  table?: {
    type?: { summary?: string };
    disable?: boolean;
  };
}

type SectionHeading = 'h3' | 'h4';

function sectionId(baseId: string, tagName?: string): string {
  return tagName ? `${baseId}-${tagName}` : baseId;
}

/** Renders a CEM description as inline markdown (code spans, links, bold, etc). */
function Description({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <Markdown
      className="swc-Typography--prose"
      options={{
        forceInline: true,
        overrides: {
          code: { props: { className: 'swc-Code swc-Code--sizeS' } },
        },
      }}
    >
      {text}
    </Markdown>
  );
}

function getArgTypeForMember(
  argTypes: Record<string, ArgType>,
  propName: string,
  attrName?: string
): ArgType | undefined {
  const candidates = [
    attrName ? argTypes[attrName] : undefined,
    argTypes[propName],
  ].filter((candidate): candidate is ArgType => candidate != null);

  return (
    candidates.find((candidate) => candidate.options?.length) ??
    candidates.find((candidate) => candidate.control) ??
    candidates[0]
  );
}

function PropertiesTable({
  members,
  attributes,
  argTypes,
  sectionHeadingAs,
  tagName,
}: {
  members: ClassMember[];
  attributes: Attribute[];
  argTypes: Record<string, ArgType>;
  sectionHeadingAs: SectionHeading;
  tagName?: string;
}) {
  const attrByField = new Map<string, Attribute>();
  for (const attr of attributes) {
    if (attr.fieldName) {
      attrByField.set(attr.fieldName, attr);
    }
  }

  const props = members.filter(
    (m): m is MemberWithReflects =>
      isField(m) &&
      m.privacy !== 'private' &&
      m.privacy !== 'protected' &&
      !m.static
  );

  if (props.length === 0) return null;

  return (
    <>
      <HeaderMdx as={sectionHeadingAs} id={sectionId('properties', tagName)}>
        Properties
      </HeaderMdx>
      <div style={scrollStyle}>
        <table
          style={tableStyle}
          className="swc-ApiTable swc-Body swc-Body--sizeM"
        >
          <thead>
            <tr>
              <th>Property</th>
              <th>Attribute</th>
              <th>Type</th>
              <th>Default</th>
              <th style={{ minWidth: 300 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => {
              const attr = attrByField.get(prop.name);
              const argType = getArgTypeForMember(
                argTypes,
                prop.name,
                attr?.name
              );

              // Prefer expanded options from argTypes, fall back to CEM type text.
              const typeName = argType?.options
                ? argType.options.map((o) => `'${o}'`).join(' | ')
                : (prop.type?.text ?? '');

              return (
                <tr key={prop.name}>
                  <td>
                    <code className="swc-Code swc-Code--sizeS">
                      {prop.name}
                    </code>
                  </td>
                  <td>
                    {attr ? (
                      <>
                        <code className="swc-Code swc-Code--sizeS">
                          {attr.name}
                        </code>
                        {prop.reflects && (
                          <small
                            className="swc-Detail swc-Detail--sizeS"
                            style={{ marginLeft: 4 }}
                          >
                            (reflects)
                          </small>
                        )}
                      </>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {typeName && (
                      <code className="swc-Code swc-Code--sizeS">
                        {typeName}
                      </code>
                    )}
                  </td>
                  <td>
                    {prop.default != null ? (
                      <code className="swc-Code swc-Code--sizeS">
                        {prop.default}
                      </code>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <Description text={prop.description} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SlotsTable({
  slots,
  sectionHeadingAs,
  tagName,
}: {
  slots: Slot[];
  sectionHeadingAs: SectionHeading;
  tagName?: string;
}) {
  if (slots.length === 0) return null;
  return (
    <>
      <HeaderMdx as={sectionHeadingAs} id={sectionId('slots', tagName)}>
        Slots
      </HeaderMdx>
      <div style={scrollStyle}>
        <table
          style={tableStyle}
          className="swc-ApiTable swc-Body swc-Body--sizeM"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.name || 'default'}>
                <td>
                  <code className="swc-Code swc-Code--sizeS">
                    {slot.name || '(default)'}
                  </code>
                </td>
                <td>
                  <Description text={slot.description} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EventsTable({
  events,
  sectionHeadingAs,
  tagName,
}: {
  events: CemEvent[];
  sectionHeadingAs: SectionHeading;
  tagName?: string;
}) {
  if (events.length === 0) return null;

  return (
    <>
      <HeaderMdx as={sectionHeadingAs} id={sectionId('events', tagName)}>
        Events
      </HeaderMdx>
      <div style={scrollStyle}>
        <table
          style={tableStyle}
          className="swc-ApiTable swc-Body swc-Body--sizeM"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.name}>
                <td>
                  <code className="swc-Code swc-Code--sizeS">{event.name}</code>
                </td>
                <td>
                  <Description text={event.description} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CssPropsTable({
  cssProps,
  sectionHeadingAs,
  tagName,
}: {
  cssProps: CssCustomProperty[];
  sectionHeadingAs: SectionHeading;
  tagName?: string;
}) {
  if (cssProps.length === 0) return null;
  return (
    <>
      <HeaderMdx
        as={sectionHeadingAs}
        id={sectionId('css-custom-properties', tagName)}
      >
        CSS Custom Properties
      </HeaderMdx>
      <div style={scrollStyle}>
        <table
          style={tableStyle}
          className="swc-ApiTable swc-Body swc-Body--sizeM"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {cssProps.map((prop) => (
              <tr key={prop.name}>
                <td>
                  <code className="swc-Code swc-Code--sizeS">{prop.name}</code>
                </td>
                <td>
                  {prop.default != null ? (
                    <code className="swc-Code swc-Code--sizeS">
                      {prop.default}
                    </code>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <Description text={prop.description} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CssPartsTable({
  cssParts,
  sectionHeadingAs,
  tagName,
}: {
  cssParts: CssPart[];
  sectionHeadingAs: SectionHeading;
  tagName?: string;
}) {
  if (cssParts.length === 0) return null;
  return (
    <>
      <HeaderMdx as={sectionHeadingAs} id={sectionId('css-parts', tagName)}>
        CSS Parts
      </HeaderMdx>
      <div style={scrollStyle}>
        <table
          style={tableStyle}
          className="swc-ApiTable swc-Body swc-Body--sizeM"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {cssParts.map((part) => (
              <tr key={part.name}>
                <td>
                  <code className="swc-Code swc-Code--sizeS">{part.name}</code>
                </td>
                <td>
                  <Description text={part.description} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ────────────────────────────
//   Main component
// ────────────────────────────

/**
 * Custom API reference tables sourced directly from the Custom Elements
 * Manifest. Renders categorized, read-only tables for Properties, Slots,
 * Events, CSS Custom Properties, and CSS Parts.
 */
export function ApiTable({
  component: componentOverride,
  sectionHeadingAs = 'h3',
}: { component?: string; sectionHeadingAs?: SectionHeading } = {}) {
  const resolvedOf = useOf('meta', ['meta']);
  const meta = resolvedOf.csfFile?.meta as {
    component?: string;
    argTypes?: Record<string, ArgType>;
  };
  const tagName = componentOverride ?? meta?.component;
  // An explicit `component` override targets a different element than the page
  // meta (e.g. a sub-element of a multi-element component), so the meta argTypes
  // do not apply; pass none in that case.
  const argTypes = componentOverride
    ? {}
    : (resolvedOf.preparedMeta?.argTypes ?? meta?.argTypes ?? {});

  const cem = window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
  if (!cem || !tagName) {
    return <p className="swc-Body swc-Body--sizeM">No API data available.</p>;
  }

  const component = findComponent(cem, tagName);
  if (!component) {
    return (
      <p className="swc-Body swc-Body--sizeM">
        Component &ldquo;{tagName}&rdquo; not found in manifest.
      </p>
    );
  }

  const members = component.members ?? [];
  const attributes = component.attributes ?? [];
  const slots = component.slots ?? [];
  const events = component.events ?? [];
  const cssProps = component.cssProperties ?? [];
  const cssParts = component.cssParts ?? [];

  const sectionTagName = sectionHeadingAs === 'h4' ? tagName : undefined;

  return (
    <>
      <PropertiesTable
        members={members}
        attributes={attributes}
        argTypes={argTypes as Record<string, ArgType>}
        sectionHeadingAs={sectionHeadingAs}
        tagName={sectionTagName}
      />
      <SlotsTable
        slots={slots}
        sectionHeadingAs={sectionHeadingAs}
        tagName={sectionTagName}
      />
      <EventsTable
        events={events}
        sectionHeadingAs={sectionHeadingAs}
        tagName={sectionTagName}
      />
      <CssPropsTable
        cssProps={cssProps}
        sectionHeadingAs={sectionHeadingAs}
        tagName={sectionTagName}
      />
      <CssPartsTable
        cssParts={cssParts}
        sectionHeadingAs={sectionHeadingAs}
        tagName={sectionTagName}
      />
    </>
  );
}
