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

import type { Rule } from 'eslint';

import { extractElementFromJSX } from '../adapters/jsx-adapter.js';
import { extractElementsFromTemplate } from '../adapters/lit-adapter.js';
import type {
  AccessibilityDescriptor,
  ComponentDescriptorMap,
  ConditionalRule,
  DeprecationDescriptor,
  ParsedElement,
  SlotDescriptor,
} from './types.js';

type RuleModule = Rule.RuleModule;

function hasOneOf(element: ParsedElement, attrs: string[]): boolean {
  return attrs.some((attr) => element.attributes.has(attr));
}

function hasAll(element: ParsedElement, attrs: string[]): boolean {
  return attrs.every((attr) => element.attributes.has(attr));
}

function matchesCondition(
  element: ParsedElement,
  condition: ConditionalRule['when']
): boolean {
  if (condition.hasAttribute) {
    if (!element.attributes.has(condition.hasAttribute)) {
      return false;
    }
  }
  if (condition.hasAttributes) {
    for (const attr of condition.hasAttributes) {
      if (!element.attributes.has(attr)) {
        return false;
      }
    }
  }
  if (condition.attributeEquals) {
    for (const [attr, expected] of Object.entries(condition.attributeEquals)) {
      const val = element.attributes.get(attr);
      if (!val || val.value !== expected) {
        return false;
      }
    }
  }
  return true;
}

export function createAccessibleComponentRule(
  descriptors: ComponentDescriptorMap
): RuleModule {
  return {
    meta: {
      type: 'suggestion',
      docs: {
        description:
          'Require accessible attributes on Spectrum Web Components based on component descriptors.',
        url: 'https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/tools/eslint-plugin-spectrum-wc#accessible-component',
      },
      messages: {
        missingOneOf:
          '<{{tagName}}> requires at least one of: {{attributes}} for accessibility.',
        missingAll:
          '<{{tagName}}> requires the following attributes: {{attributes}}.',
        conditionalViolation: '{{message}}',
      },
      schema: [],
    },
    create(context) {
      function check(node: Rule.Node, elements: ParsedElement[]) {
        for (const element of elements) {
          const descriptor = descriptors[element.tagName];
          if (!descriptor?.accessibility) {
            continue;
          }

          const a11y: AccessibilityDescriptor = descriptor.accessibility;

          if (a11y.requireOneOf && !hasOneOf(element, a11y.requireOneOf)) {
            context.report({
              node,
              messageId: 'missingOneOf',
              data: {
                tagName: element.tagName,
                attributes: a11y.requireOneOf.map((a) => `\`${a}\``).join(', '),
              },
            });
          }

          if (a11y.requireAll && !hasAll(element, a11y.requireAll)) {
            const missing = a11y.requireAll.filter(
              (a) => !element.attributes.has(a)
            );
            context.report({
              node,
              messageId: 'missingAll',
              data: {
                tagName: element.tagName,
                attributes: missing.map((a) => `\`${a}\``).join(', '),
              },
            });
          }

          if (a11y.conditionalRules) {
            for (const rule of a11y.conditionalRules) {
              if (!matchesCondition(element, rule.when)) {
                continue;
              }

              if (rule.requireOneOf && !hasOneOf(element, rule.requireOneOf)) {
                context.report({
                  node,
                  messageId: rule.message
                    ? 'conditionalViolation'
                    : 'missingOneOf',
                  data: rule.message
                    ? { message: rule.message }
                    : {
                        tagName: element.tagName,
                        attributes: rule.requireOneOf
                          .map((a) => `\`${a}\``)
                          .join(', '),
                      },
                });
              }

              if (rule.requireAll && !hasAll(element, rule.requireAll)) {
                context.report({
                  node,
                  messageId: rule.message
                    ? 'conditionalViolation'
                    : 'missingAll',
                  data: rule.message
                    ? { message: rule.message }
                    : {
                        tagName: element.tagName,
                        attributes: rule.requireAll
                          .map((a) => `\`${a}\``)
                          .join(', '),
                      },
                });
              }
            }
          }
        }
      }

      return {
        TaggedTemplateExpression(node: Rule.Node) {
          check(node, extractElementsFromTemplate(node));
        },
        JSXElement(node: Rule.Node) {
          check(node, extractElementFromJSX(node));
        },
      };
    },
  };
}

export function createNoDeprecatedRule(
  descriptors: ComponentDescriptorMap
): RuleModule {
  return {
    meta: {
      type: 'suggestion',
      docs: {
        description:
          'Disallow deprecated attributes and attribute values on Spectrum Web Components.',
        url: 'https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/tools/eslint-plugin-spectrum-wc#no-deprecated',
      },
      messages: {
        deprecatedValue: '{{message}}',
        deprecatedAttribute: '{{message}}',
        deprecatedSlotContent: '{{message}}',
      },
      hasSuggestions: true,
      schema: [],
    },
    create(context) {
      function check(node: Rule.Node, elements: ParsedElement[]) {
        for (const element of elements) {
          const descriptor = descriptors[element.tagName];
          if (!descriptor?.deprecations) {
            continue;
          }

          const dep: DeprecationDescriptor = descriptor.deprecations;

          if (dep.attributes) {
            for (const attrDep of dep.attributes) {
              if (attrDep.deprecatedValues) {
                const attrVal = element.attributes.get(attrDep.attribute);
                if (!attrVal || attrVal.isDynamic) {
                  continue;
                }

                const match = attrDep.deprecatedValues.find(
                  (d) => d.value === attrVal.value
                );
                if (match) {
                  context.report({
                    node,
                    messageId: 'deprecatedValue',
                    data: { message: match.message },
                  });
                }
              } else if (attrDep.message) {
                if (element.attributes.has(attrDep.attribute)) {
                  context.report({
                    node,
                    messageId: 'deprecatedAttribute',
                    data: {
                      message: attrDep.message,
                    },
                  });
                }
              }
            }
          }

          if (dep.warnOnTextContent && element.hasTextContent) {
            context.report({
              node,
              messageId: 'deprecatedSlotContent',
              data: {
                message: dep.warnOnTextContent.message,
              },
            });
          }
        }
      }

      return {
        TaggedTemplateExpression(node: Rule.Node) {
          check(node, extractElementsFromTemplate(node));
        },
        JSXElement(node: Rule.Node) {
          check(node, extractElementFromJSX(node));
        },
      };
    },
  };
}

export function createRequiredAttributesRule(
  descriptors: ComponentDescriptorMap
): RuleModule {
  return {
    meta: {
      type: 'suggestion',
      docs: {
        description:
          'Require specific attributes on Spectrum Web Components for correct behavior.',
        url: 'https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/tools/eslint-plugin-spectrum-wc#required-attributes',
      },
      messages: {
        missingRequired:
          '<{{tagName}}> should have an explicit "{{attribute}}" attribute set.',
      },
      schema: [],
    },
    create(context) {
      function check(node: Rule.Node, elements: ParsedElement[]) {
        for (const element of elements) {
          const descriptor = descriptors[element.tagName];
          if (!descriptor?.requiredAttributes) {
            continue;
          }

          for (const attr of descriptor.requiredAttributes) {
            if (!element.attributes.has(attr)) {
              context.report({
                node,
                messageId: 'missingRequired',
                data: {
                  tagName: element.tagName,
                  attribute: attr,
                },
              });
            }
          }
        }
      }

      return {
        TaggedTemplateExpression(node: Rule.Node) {
          check(node, extractElementsFromTemplate(node));
        },
        JSXElement(node: Rule.Node) {
          check(node, extractElementFromJSX(node));
        },
      };
    },
  };
}

export function createValidAttributeValuesRule(
  descriptors: ComponentDescriptorMap
): RuleModule {
  return {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Disallow invalid attribute values on Spectrum Web Components.',
        url: 'https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/tools/eslint-plugin-spectrum-wc#valid-attribute-values',
      },
      messages: {
        invalidValue:
          '"{{value}}" is not a valid value for "{{attribute}}" on <{{tagName}}>. Allowed values: {{allowed}}.',
      },
      schema: [],
    },
    create(context) {
      function check(node: Rule.Node, elements: ParsedElement[]) {
        for (const element of elements) {
          const descriptor = descriptors[element.tagName];
          if (!descriptor?.validAttributeValues) {
            continue;
          }

          for (const [attr, allowedValues] of Object.entries(
            descriptor.validAttributeValues
          )) {
            const attrVal = element.attributes.get(attr);
            if (!attrVal || attrVal.isDynamic || attrVal.value === null) {
              continue;
            }

            if (!allowedValues.includes(attrVal.value)) {
              context.report({
                node,
                messageId: 'invalidValue',
                data: {
                  tagName: element.tagName,
                  attribute: attr,
                  value: attrVal.value,
                  allowed: allowedValues.map((v) => `"${v}"`).join(', '),
                },
              });
            }
          }
        }
      }

      return {
        TaggedTemplateExpression(node: Rule.Node) {
          check(node, extractElementsFromTemplate(node));
        },
        JSXElement(node: Rule.Node) {
          check(node, extractElementFromJSX(node));
        },
      };
    },
  };
}

function getChildSlotName(child: ParsedElement): string {
  const slotAttr = child.attributes.get('slot');
  if (!slotAttr || slotAttr.isDynamic) {
    return '';
  }
  return slotAttr.value ?? '';
}

export function createValidSlotNamesRule(
  descriptors: ComponentDescriptorMap
): RuleModule {
  return {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Disallow placing children into slots that a Spectrum Web Component does not define.',
        url: 'https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/tools/eslint-plugin-spectrum-wc#valid-slot-names',
      },
      messages: {
        invalidSlot:
          '<{{childTag}}> uses slot="{{slotName}}" but <{{parentTag}}> does not have a "{{slotName}}" slot. Valid slots: {{validSlots}}.',
      },
      schema: [],
    },
    create(context) {
      function checkElement(node: Rule.Node, elements: ParsedElement[]) {
        for (const element of elements) {
          const descriptor = descriptors[element.tagName];
          if (!descriptor?.slots) {
            continue;
          }

          const validSlotNames = new Set(
            descriptor.slots.map((s: SlotDescriptor) => s.name)
          );

          for (const child of element.children) {
            const slotName = getChildSlotName(child);
            if (slotName === '' && validSlotNames.has('')) {
              continue;
            }
            if (validSlotNames.has(slotName)) {
              continue;
            }

            context.report({
              node,
              messageId: 'invalidSlot',
              data: {
                childTag: child.tagName,
                slotName,
                parentTag: element.tagName,
                validSlots: [...validSlotNames]
                  .map((s) => (s === '' ? '(default)' : `"${s}"`))
                  .join(', '),
              },
            });
          }
        }
      }

      return {
        TaggedTemplateExpression(node: Rule.Node) {
          checkElement(node, extractElementsFromTemplate(node));
        },
        JSXElement(node: Rule.Node) {
          checkElement(node, extractElementFromJSX(node));
        },
      };
    },
  };
}

export function createValidSlotChildrenRule(
  descriptors: ComponentDescriptorMap
): RuleModule {
  return {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Disallow placing elements into slots that do not accept their tag name.',
        url: 'https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/tools/eslint-plugin-spectrum-wc#valid-slot-children',
      },
      messages: {
        invalidChild:
          '<{{childTag}}> is not accepted in the {{slotLabel}} of <{{parentTag}}>. Accepted children: {{accepted}}.',
      },
      schema: [],
    },
    create(context) {
      function checkElement(node: Rule.Node, elements: ParsedElement[]) {
        for (const element of elements) {
          const descriptor = descriptors[element.tagName];
          if (!descriptor?.slots) {
            continue;
          }

          const slotMap = new Map<string, SlotDescriptor>(
            descriptor.slots.map((s: SlotDescriptor) => [s.name, s])
          );

          for (const child of element.children) {
            const slotName = getChildSlotName(child);
            const slotDef = slotMap.get(slotName);

            if (!slotDef || !slotDef.acceptedChildren) {
              continue;
            }

            if (!slotDef.acceptedChildren.includes(child.tagName)) {
              context.report({
                node,
                messageId: 'invalidChild',
                data: {
                  childTag: child.tagName,
                  slotLabel:
                    slotName === '' ? 'default slot' : `"${slotName}" slot`,
                  parentTag: element.tagName,
                  accepted: slotDef.acceptedChildren
                    .map((t) => `<${t}>`)
                    .join(', '),
                },
              });
            }
          }
        }
      }

      return {
        TaggedTemplateExpression(node: Rule.Node) {
          checkElement(node, extractElementsFromTemplate(node));
        },
        JSXElement(node: Rule.Node) {
          checkElement(node, extractElementFromJSX(node));
        },
      };
    },
  };
}
