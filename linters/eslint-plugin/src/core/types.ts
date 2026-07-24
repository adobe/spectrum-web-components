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

/**
 * Normalized representation of an HTML element extracted from any template syntax.
 * This is the intermediate format that adapters produce and rules consume.
 */
export interface ParsedElement {
  tagName: string;
  attributes: Map<string, AttributeValue>;
  children: ParsedElement[];
  hasTextContent: boolean;
  loc?: ElementLocation;
}

export interface AttributeValue {
  /** The raw string value, or null for dynamic expressions */
  value: string | null;
  /** Whether the value comes from a dynamic expression (e.g. ${expr}) */
  isDynamic: boolean;
  /** Lit-style binding prefix: '.' for property, '?' for boolean, '@' for event */
  bindingType?: '.' | '?' | '@' | undefined;
}

export interface ElementLocation {
  startOffset: number;
  endOffset: number;
  startLine: number;
  startCol: number;
}

/**
 * Accessibility descriptor for a single component.
 */
export interface AccessibilityDescriptor {
  /** At least one of these attributes must be present */
  requireOneOf?: string[];
  /** All of these attributes are individually required */
  requireAll?: string[];
  /** Conditional rules that apply based on other attribute states */
  conditionalRules?: ConditionalRule[];
}

export interface ConditionalRule {
  when: {
    hasAttribute?: string;
    hasAttributes?: string[];
    attributeEquals?: Record<string, string>;
  };
  requireOneOf?: string[];
  requireAll?: string[];
  message?: string;
}

/**
 * Deprecation descriptor for attribute values or entire attributes.
 */
export interface DeprecationDescriptor {
  attributes?: DeprecatedAttributeDescriptor[];
  warnOnTextContent?: {
    message: string;
  };
}

export interface DeprecatedAttributeDescriptor {
  attribute: string;
  deprecatedValues?: DeprecatedValueDescriptor[];
  message?: string;
}

export interface DeprecatedValueDescriptor {
  value: string;
  message: string;
  replacement?: string;
}

/**
 * Defines an accepted slot on a component.
 */
export interface SlotDescriptor {
  /** Slot name. Use '' for the default (unnamed) slot. */
  name: string;
  /** Tag names accepted in this slot. Omit to accept any element. */
  acceptedChildren?: string[];
  /** If true, at least one child must fill this slot. */
  required?: boolean;
}

/**
 * Full component descriptor combining all rule metadata for one element.
 */
export interface ComponentDescriptor {
  tagName: string;
  accessibility?: AccessibilityDescriptor;
  deprecations?: DeprecationDescriptor;
  requiredAttributes?: string[];
  slots?: SlotDescriptor[];
  validAttributeValues?: Record<string, string[]>;
}

/**
 * The complete descriptor set loaded by the plugin.
 */
export type ComponentDescriptorMap = Record<string, ComponentDescriptor>;
