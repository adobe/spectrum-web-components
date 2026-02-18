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
import { html, TemplateResult } from 'lit';

export type IconTemplateOptions = {
  size?: number;
  label?: string;
  hidden?: boolean;
  direction?: 'right' | 'left' | 'up' | 'down';
};

export const Chevron100Icon = ({
  size = 18,
  label = 'Chevron',
  hidden = false,
  direction = 'right',
}: IconTemplateOptions = {}): TemplateResult => {
  const transform =
    direction === 'up'
      ? 'rotate(270deg)'
      : direction === 'down'
        ? 'rotate(90deg)'
        : direction === 'left'
          ? 'rotate(270deg)'
          : '';
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      role="img"
      fill="currentColor"
      width=${size}
      height=${size}
      aria-hidden=${hidden ? 'true' : 'false'}
      aria-label=${label}
      style=${transform ? `transform: ${transform};` : ''}
    >
      <path
        d="M6.146 3.146a.5.5 0 0 1 .708 0L12.207 8.5a.7.7 0 0 1 0 1l-5.353 5.354a.5.5 0 1 1-.708-.708L11.293 9 6.146 3.854a.5.5 0 0 1 0-.708z"
      />
    </svg>
  `;
};
