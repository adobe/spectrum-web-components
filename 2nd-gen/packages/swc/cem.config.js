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
 * CEM plugin that reads `@constrainedSlot` decorator usage on class properties
 * and annotates the corresponding slot entry in the manifest with an
 * `allowedElements` array.
 *
 * Given a component class with:
 * ```ts
 * @constrainedSlot({ allowed: ['swc-button'], slot: '' })
 * private _buttons!: Element[];
 * ```
 *
 * The plugin finds the `@slot` CEM entry for that slot and adds:
 * ```json
 * { "name": "", "allowedElements": ["swc-button"] }
 * ```
 *
 * If no `@slot` entry exists for the given slot name it creates one, so the
 * constraint is still captured even when the `@slot` JSDoc tag is on a base
 * class that was analyzed separately.
 */
function constrainedSlotPlugin() {
  return {
    name: 'cem-plugin-constrained-slot',
    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isPropertyDeclaration(node)) return;

      const decorators = ts.getDecorators?.(node) ?? node.decorators;
      if (!decorators?.length) return;

      const csDecorator = [...decorators].find((dec) => {
        if (!ts.isCallExpression(dec.expression)) return false;
        return (
          ts.isIdentifier(dec.expression.expression) &&
          dec.expression.expression.text === 'constrainedSlot'
        );
      });
      if (!csDecorator || !ts.isCallExpression(csDecorator.expression)) return;

      const optionsArg = csDecorator.expression.arguments[0];
      if (!optionsArg || !ts.isObjectLiteralExpression(optionsArg)) return;

      let allowed = [];
      let slotName = '';

      for (const prop of optionsArg.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const key = ts.isIdentifier(prop.name) ? prop.name.text : null;

        if (
          key === 'allowed' &&
          ts.isArrayLiteralExpression(prop.initializer)
        ) {
          allowed = [...prop.initializer.elements]
            .filter((el) => ts.isStringLiteral(el))
            .map((el) => el.text);
        }

        if (key === 'slot' && ts.isStringLiteral(prop.initializer)) {
          slotName = prop.initializer.text;
        }
      }

      if (!allowed.length) return;

      const classNode = node.parent;
      if (!ts.isClassDeclaration(classNode)) return;

      const className = classNode.name?.getText();
      if (!className) return;

      const declaration = moduleDoc.declarations?.find(
        (d) => d.name === className
      );
      if (!declaration) return;

      if (!declaration.slots) declaration.slots = [];

      const existingSlot = declaration.slots.find(
        (s) => (s.name ?? '') === slotName
      );

      if (existingSlot) {
        existingSlot.allowedElements = allowed;
      } else {
        declaration.slots.push({ name: slotName, allowedElements: allowed });
      }
    },
  };
}

/**
 * CEM plugin that extracts `@status` and `@since` JSDoc tags from class
 * declarations and attaches them to the corresponding CEM declaration.
 *
 * Usage in component source:
 * ```ts
 * /**
 *  * @element swc-my-component
 *  * @status preview
 *  * @since 1.0.0
 *  *\/
 * export class MyComponent extends … { … }
 * ```
 *
 * Produces CEM entries with `"status": "preview"` and `"since": "1.0.0"`.
 */
function statusPlugin() {
  return {
    name: 'cem-plugin-component-status',
    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) return;

      const jsDocs = node.jsDoc;
      if (!jsDocs?.length) return;

      const jsDoc = jsDocs[jsDocs.length - 1];
      if (!jsDoc.tags) return;

      const className = node.name?.getText();
      if (!className) return;

      const declaration = moduleDoc?.declarations?.find(
        (d) => d.name === className
      );
      if (!declaration) return;

      for (const tag of jsDoc.tags) {
        const tagName = tag.tagName.getText();

        if (tagName === 'status' || tagName === 'since') {
          const value =
            typeof tag.comment === 'string'
              ? tag.comment.trim()
              : tag.comment
                  ?.map((c) => c.text)
                  .join('')
                  .trim();

          if (value) {
            declaration[tagName] = value;
          }
        }
      }
    },
  };
}

export default {
  globs: [
    'components/**/*.ts',
    'patterns/**/*.ts',
    '../core/components/**/*.ts',
    '../core/controllers/**/*.ts',
    '../core/element/**/*.ts',
    '../core/mixins/**/*.ts',
    '../core/utils/**/*.ts',
    '../core/decorators/**/*.ts',
  ],
  exclude: [
    '**/*.stories.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/stories/**',
    '**/test/**',
    '../core/**/stories/**',
    '../core/**/test/**',
  ],
  outdir: '.storybook',
  litelement: true,
  dev: false,
  plugins: [constrainedSlotPlugin(), statusPlugin()],
};
