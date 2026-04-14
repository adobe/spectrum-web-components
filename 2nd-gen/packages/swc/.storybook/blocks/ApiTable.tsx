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

import { useOf } from '@storybook/addon-docs/blocks';
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
  table?: {
    type?: { summary?: string };
  };
}

function PropertiesTable({
  members,
  attributes,
  argTypes,
}: {
  members: ClassMember[];
  attributes: Attribute[];
  argTypes: Record<string, ArgType>;
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
      <h3>Properties</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
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
              const argType = argTypes[prop.name] ?? argTypes[attr?.name ?? ''];

              // Prefer expanded options from argTypes, fall back to CEM type text.
              const typeName = argType?.options
                ? argType.options.map((o) => `'${o}'`).join(' | ')
                : (prop.type?.text ?? '');

              return (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>
                    {attr ? (
                      <>
                        <code>{attr.name}</code>
                        {prop.reflects && (
                          <small style={{ opacity: '0.8', marginLeft: 4 }}>
                            (reflects)
                          </small>
                        )}
                      </>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{typeName && <code>{typeName}</code>}</td>
                  <td>
                    {prop.default != null ? <code>{prop.default}</code> : '-'}
                  </td>
                  <td>{prop.description ?? ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SlotsTable({ slots }: { slots: Slot[] }) {
  if (slots.length === 0) return null;
  return (
    <>
      <h3>Slots</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
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
                  <code>{slot.name || '(default)'}</code>
                </td>
                <td>{slot.description ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EventsTable({ events }: { events: CemEvent[] }) {
  if (events.length === 0) return null;

  return (
    <>
      <h3>Events</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
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
                  <code>{event.name}</code>
                </td>
                <td>{event.description ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CssPropsTable({ cssProps }: { cssProps: CssCustomProperty[] }) {
  if (cssProps.length === 0) return null;
  return (
    <>
      <h3>CSS Custom Properties</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
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
                  <code>{prop.name}</code>
                </td>
                <td>
                  {prop.default != null ? <code>{prop.default}</code> : '-'}
                </td>
                <td>{prop.description ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CssPartsTable({ cssParts }: { cssParts: CssPart[] }) {
  if (cssParts.length === 0) return null;
  return (
    <>
      <h3>CSS Parts</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
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
                  <code>{part.name}</code>
                </td>
                <td>{part.description ?? ''}</td>
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
export function ApiTable() {
  const resolvedOf = useOf('meta', ['meta']);
  const meta = resolvedOf.csfFile?.meta as {
    component?: string;
    argTypes?: Record<string, ArgType>;
  };
  const tagName = meta?.component;
  const argTypes = resolvedOf.preparedMeta?.argTypes ?? meta?.argTypes ?? {};

  const cem = window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
  if (!cem || !tagName) {
    return <p>No API data available.</p>;
  }

  const component = findComponent(cem, tagName);
  if (!component) {
    return <p>Component &ldquo;{tagName}&rdquo; not found in manifest.</p>;
  }

  const members = component.members ?? [];
  const attributes = component.attributes ?? [];
  const slots = component.slots ?? [];
  const events = component.events ?? [];
  const cssProps = component.cssProperties ?? [];
  const cssParts = component.cssParts ?? [];

  return (
    <>
      <PropertiesTable
        members={members}
        attributes={attributes}
        argTypes={argTypes as Record<string, ArgType>}
      />
      <SlotsTable slots={slots} />
      <EventsTable events={events} />
      <CssPropsTable cssProps={cssProps} />
      <CssPartsTable cssParts={cssParts} />
    </>
  );
}
