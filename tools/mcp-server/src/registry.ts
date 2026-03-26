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

import type {
  ComponentAPI,
  ComponentExample,
  ComponentSummary,
  SearchResult,
  SearchSection,
} from './types.js';

/**
 * In-memory registry of ComponentAPI objects with querying, search, and
 * example management.
 */
export class ComponentRegistry {
  private components = new Map<string, ComponentAPI>();
  private examples = new Map<string, ComponentExample[]>();

  /** Add a component to the registry. */
  add(component: ComponentAPI): void {
    this.components.set(component.tagName, component);
  }

  /** Retrieve a component by its tag name. */
  get(tagName: string): ComponentAPI | undefined {
    return this.components.get(tagName);
  }

  /** Return all tag names in the registry. */
  allTagNames(): string[] {
    return [...this.components.keys()];
  }

  /**
   * List component summaries, optionally filtered by generation or category.
   */
  list(filter?: {
    generation?: 'gen-1' | 'gen-2';
    category?: string;
  }): ComponentSummary[] {
    const results: ComponentSummary[] = [];

    for (const component of this.components.values()) {
      if (filter?.generation && component.generation !== filter.generation) {
        continue;
      }
      // category filtering could be added when categories are defined
      results.push(toSummary(component));
    }

    return results;
  }

  /**
   * Full-text search across component API surfaces.
   *
   * Relevance scores:
   * - exact name match = 1.0
   * - partial name match = 0.7
   * - description match = 0.5
   * - css-property match = 0.6
   */
  search(query: string, searchIn?: SearchSection[]): SearchResult[] {
    const results: SearchResult[] = [];
    const q = query.toLowerCase();
    const sections = searchIn ?? [
      'properties',
      'events',
      'slots',
      'description',
      'css-properties',
    ];

    for (const component of this.components.values()) {
      if (sections.includes('properties')) {
        for (const prop of component.properties) {
          const score = nameScore(prop.name, q);
          if (score > 0) {
            results.push({
              tagName: component.tagName,
              matchType: 'property',
              matchField: prop.name,
              description: prop.description,
              relevanceScore: score,
            });
          } else if (prop.description.toLowerCase().includes(q)) {
            results.push({
              tagName: component.tagName,
              matchType: 'property',
              matchField: prop.name,
              description: prop.description,
              relevanceScore: 0.5,
            });
          }
        }
      }

      if (sections.includes('events')) {
        for (const event of component.events) {
          const score = nameScore(event.name, q);
          if (score > 0) {
            results.push({
              tagName: component.tagName,
              matchType: 'event',
              matchField: event.name,
              description: event.description,
              relevanceScore: score,
            });
          } else if (event.description.toLowerCase().includes(q)) {
            results.push({
              tagName: component.tagName,
              matchType: 'event',
              matchField: event.name,
              description: event.description,
              relevanceScore: 0.5,
            });
          }
        }
      }

      if (sections.includes('slots')) {
        for (const slot of component.slots) {
          const score = nameScore(slot.name, q);
          if (score > 0) {
            results.push({
              tagName: component.tagName,
              matchType: 'slot',
              matchField: slot.name || '(default)',
              description: slot.description,
              relevanceScore: score,
            });
          } else if (slot.description.toLowerCase().includes(q)) {
            results.push({
              tagName: component.tagName,
              matchType: 'slot',
              matchField: slot.name || '(default)',
              description: slot.description,
              relevanceScore: 0.5,
            });
          }
        }
      }

      if (sections.includes('description')) {
        if (component.description.toLowerCase().includes(q)) {
          results.push({
            tagName: component.tagName,
            matchType: 'description',
            matchField: 'description',
            description: component.description,
            relevanceScore: 0.5,
          });
        }
      }

      if (sections.includes('css-properties')) {
        for (const cssProp of component.cssCustomProperties) {
          const score = nameScore(cssProp.name, q);
          if (score > 0) {
            results.push({
              tagName: component.tagName,
              matchType: 'css-property',
              matchField: cssProp.name,
              description: cssProp.description ?? '',
              relevanceScore: Math.max(score, 0.6),
            });
          } else if (cssProp.description?.toLowerCase().includes(q)) {
            results.push({
              tagName: component.tagName,
              matchType: 'css-property',
              matchField: cssProp.name,
              description: cssProp.description ?? '',
              relevanceScore: 0.6,
            });
          }
        }
      }
    }

    // Sort by relevance (descending)
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return results;
  }

  /** Add usage examples for a component. */
  addExamples(tagName: string, examples: ComponentExample[]): void {
    const existing = this.examples.get(tagName) ?? [];
    this.examples.set(tagName, [...existing, ...examples]);
  }

  /** Get examples for a component, optionally filtered by variant. */
  getExamples(tagName: string, variant?: string): ComponentExample[] {
    const examples = this.examples.get(tagName) ?? [];
    if (!variant) {
      return examples;
    }
    return examples.filter(
      (ex) =>
        ex.title.toLowerCase().includes(variant.toLowerCase()) ||
        ex.html.toLowerCase().includes(variant.toLowerCase())
    );
  }

  /** Mark a gen-1 component as having a gen-2 equivalent. */
  markGen2Equivalent(gen1TagName: string, _gen2Package: string): void {
    const component = this.components.get(gen1TagName);
    if (component) {
      component.hasGen2Equivalent = true;
    }
  }
}

/** Compute a relevance score for a name match against a query. */
function nameScore(name: string, query: string): number {
  const lowerName = name.toLowerCase();
  if (lowerName === query) {
    return 1.0;
  }
  if (lowerName.includes(query)) {
    return 0.7;
  }
  return 0;
}

/** Strip a ComponentAPI down to a ComponentSummary. */
function toSummary(component: ComponentAPI): ComponentSummary {
  return {
    tagName: component.tagName,
    className: component.className,
    package: component.package,
    generation: component.generation,
    description: component.description,
    hasGen2Equivalent: component.hasGen2Equivalent,
    migrationStatus: component.migrationStatus,
  };
}
