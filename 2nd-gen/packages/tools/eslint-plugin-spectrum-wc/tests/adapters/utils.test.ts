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

import { describe, expect, it } from 'vitest';

import {
  camelToKebab,
  isSwcJsxTag,
  isSwcTagName,
  pascalToKebab,
  resolveJsxTagName,
} from '../../src/adapters/utils.js';

describe('pascalToKebab', () => {
  it('converts SpActionMenu to sp-action-menu', () => {
    expect(pascalToKebab('SpActionMenu')).toBe('sp-action-menu');
  });

  it('converts SpProgressBar to sp-progress-bar', () => {
    expect(pascalToKebab('SpProgressBar')).toBe('sp-progress-bar');
  });

  it('converts SpButton to sp-button', () => {
    expect(pascalToKebab('SpButton')).toBe('sp-button');
  });

  it('converts SpDialogWrapper to sp-dialog-wrapper', () => {
    expect(pascalToKebab('SpDialogWrapper')).toBe('sp-dialog-wrapper');
  });

  it('converts SpTheme to sp-theme', () => {
    expect(pascalToKebab('SpTheme')).toBe('sp-theme');
  });

  it('converts SpStatusLight to sp-status-light', () => {
    expect(pascalToKebab('SpStatusLight')).toBe('sp-status-light');
  });
});

describe('camelToKebab', () => {
  it('converts ariaLabel to aria-label', () => {
    expect(camelToKebab('ariaLabel')).toBe('aria-label');
  });

  it('converts isDecorative to is-decorative', () => {
    expect(camelToKebab('isDecorative')).toBe('is-decorative');
  });

  it('converts allowOutsideClick to allow-outside-click', () => {
    expect(camelToKebab('allowOutsideClick')).toBe('allow-outside-click');
  });

  it('converts triggeredBy to triggered-by', () => {
    expect(camelToKebab('triggeredBy')).toBe('triggered-by');
  });

  it('preserves already kebab-case names', () => {
    expect(camelToKebab('aria-label')).toBe('aria-label');
  });

  it('converts accessibleLabel to accessible-label', () => {
    expect(camelToKebab('accessibleLabel')).toBe('accessible-label');
  });
});

describe('isSwcTagName', () => {
  it('returns true for sp- prefixed names', () => {
    expect(isSwcTagName('sp-button')).toBe(true);
    expect(isSwcTagName('sp-action-menu')).toBe(true);
  });

  it('returns true for overlay-trigger', () => {
    expect(isSwcTagName('overlay-trigger')).toBe(true);
  });

  it('returns false for non-SWC tags', () => {
    expect(isSwcTagName('div')).toBe(false);
    expect(isSwcTagName('my-element')).toBe(false);
  });
});

describe('isSwcJsxTag', () => {
  it('returns true for Sp-prefixed PascalCase names', () => {
    expect(isSwcJsxTag('SpButton')).toBe(true);
    expect(isSwcJsxTag('SpActionMenu')).toBe(true);
  });

  it('returns true for OverlayTrigger', () => {
    expect(isSwcJsxTag('OverlayTrigger')).toBe(true);
  });

  it('returns true for kebab-case sp- names', () => {
    expect(isSwcJsxTag('sp-button')).toBe(true);
    expect(isSwcJsxTag('sp-action-menu')).toBe(true);
  });

  it('returns false for non-SWC components', () => {
    expect(isSwcJsxTag('Button')).toBe(false);
    expect(isSwcJsxTag('div')).toBe(false);
    expect(isSwcJsxTag('MyComponent')).toBe(false);
  });
});

describe('resolveJsxTagName', () => {
  it('passes through kebab-case sp- names', () => {
    expect(resolveJsxTagName('sp-button')).toBe('sp-button');
    expect(resolveJsxTagName('sp-action-menu')).toBe('sp-action-menu');
  });

  it('passes through overlay-trigger', () => {
    expect(resolveJsxTagName('overlay-trigger')).toBe('overlay-trigger');
  });

  it('converts OverlayTrigger to overlay-trigger', () => {
    expect(resolveJsxTagName('OverlayTrigger')).toBe('overlay-trigger');
  });

  it('converts PascalCase to kebab-case', () => {
    expect(resolveJsxTagName('SpButton')).toBe('sp-button');
    expect(resolveJsxTagName('SpActionMenu')).toBe('sp-action-menu');
    expect(resolveJsxTagName('SpProgressBar')).toBe('sp-progress-bar');
  });
});
