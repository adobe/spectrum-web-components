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
//   Controller API (non-CEM) — `meta.parameters.controllerApi`
// ────────────────────────────

/** One row in the **Constructor options** table (mirrors component **Properties** layout). */
export type ControllerApiOptionRow = {
  name: string;
  type: string;
  /** Shown in the **Default** column; use `(required)` for mandatory callbacks. */
  defaultValue?: string;
  description: string;
};

/** One public instance method on a Lit reactive controller. */
export type ControllerApiMethodRow = {
  name: string;
  signature: string;
  returns?: string;
  description: string;
};

/** Custom event emitted by the controller (if any). */
export type ControllerApiEventRow = {
  name: string;
  detail?: string;
  description: string;
};

/** Module-level export next to the controller class. */
export type ControllerApiExportRow = {
  name: string;
  kind: 'constant' | 'function' | 'type';
  description: string;
};

/** Structured API reference for core controllers (Storybook **API** section). */
export type ControllerApiDocumentation = {
  /** Optional heading above the first table (for example the class name). */
  title?: string;
  options: ControllerApiOptionRow[];
  methods: ControllerApiMethodRow[];
  events?: ControllerApiEventRow[];
  exports?: ControllerApiExportRow[];
};

function isControllerApiDocumentation(
  value: unknown
): value is ControllerApiDocumentation {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const doc = value as ControllerApiDocumentation;
  return Array.isArray(doc.options) && Array.isArray(doc.methods);
}

function ControllerApiTables({ doc }: { doc: ControllerApiDocumentation }) {
  return (
    <>
      {doc.title ? <h3>{doc.title}</h3> : null}
      <h3>Constructor options</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {doc.options.map((row) => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>{row.type ? <code>{row.type}</code> : '—'}</td>
              <td>
                {row.defaultValue != null && row.defaultValue !== '' ? (
                  <code>{row.defaultValue}</code>
                ) : (
                  '—'
                )}
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Methods</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Signature</th>
            <th>Returns</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {doc.methods.map((row) => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>
                <code>{row.signature}</code>
              </td>
              <td>{row.returns ? <code>{row.returns}</code> : '—'}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {doc.events && doc.events.length > 0 ? (
        <>
          <h3>Events</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Detail</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.events.map((row) => (
                <tr key={row.name}>
                  <td>
                    <code>{row.name}</code>
                  </td>
                  <td>{row.detail ? <code>{row.detail}</code> : '—'}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      {doc.exports && doc.exports.length > 0 ? (
        <>
          <h3>Module exports</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Kind</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.exports.map((row) => (
                <tr key={row.name}>
                  <td>
                    <code>{row.name}</code>
                  </td>
                  <td>{row.kind}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
}

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
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Attribute</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
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
      <table>
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
    </>
  );
}

function CssPropsTable({ cssProps }: { cssProps: CssCustomProperty[] }) {
  if (cssProps.length === 0) return null;
  return (
    <>
      <h3>CSS Custom Properties</h3>
      <table>
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
    </>
  );
}

function CssPartsTable({ cssParts }: { cssParts: CssPart[] }) {
  if (cssParts.length === 0) return null;
  return (
    <>
      <h3>CSS Parts</h3>
      <table>
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
    </>
  );
}

// ────────────────────────────
//   Main component
// ────────────────────────────

/**
 * Renders API documentation for the active docs page.
 *
 * - When **`meta.parameters.controllerApi`** is set (core Lit controllers), renders **Constructor
 *   options**, **Methods**, **Events**, and **Module exports** tables in the same shape as
 *   component **Properties** / **Events** tables.
 * - Otherwise reads the Custom Elements Manifest for **`meta.component`** and renders Properties,
 *   Slots, Events, CSS custom properties, and CSS parts.
 */
export function ApiTable() {
  const resolvedOf = useOf('meta', ['meta']);
  const meta = resolvedOf.csfFile?.meta as {
    component?: string;
    argTypes?: Record<string, ArgType>;
    parameters?: { controllerApi?: unknown };
  };
  const preparedMeta = resolvedOf.preparedMeta as
    | {
        parameters?: { controllerApi?: unknown };
        argTypes?: Record<string, ArgType>;
      }
    | undefined;

  const controllerApiRaw =
    preparedMeta?.parameters?.controllerApi ?? meta?.parameters?.controllerApi;

  if (isControllerApiDocumentation(controllerApiRaw)) {
    return <ControllerApiTables doc={controllerApiRaw} />;
  }

  const tagName = meta?.component;
  const argTypes = preparedMeta?.argTypes ?? meta?.argTypes ?? {};

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
