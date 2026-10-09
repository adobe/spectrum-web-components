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
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import type { Meta } from '@storybook/web-components';

import type { CardViewItem } from '@adobe/spectrum-wc-core/components/card-view/index.js';

import '../swc-card-view.js';
import '../swc-card-view-option-1.js';
import '../swc-card-view-option-2.js';
import '../swc-card-view-option-3.js';
import '../swc-card-view-option-4.js';
import '../swc-card-view-option-5.js';
import '../swc-card-view-option-6.js';
import '../swc-card-view-option-7.js';
import '../swc-card-view-option-8.js';

const photoTemplates: CardViewItem[] = [
  {
    id: 'coast',
    title: 'Coastal light',
    description: 'Coast collection · JPG',
    image: '/images/landscape-asset.jpg',
    aspectRatio: 1.7,
  },
  {
    id: 'portrait',
    title: 'Afternoon portrait',
    description: 'Portrait collection · JPG',
    image: '/images/portrait-asset.jpg',
    aspectRatio: 0.75,
  },
  {
    id: 'mountain',
    title: 'Mountain study',
    description: 'Landscape collection · JPG',
    image: '/images/card-preview.jpg',
    aspectRatio: 1.15,
  },
  {
    id: 'shore',
    title: 'Along the shore',
    description: 'Coast collection · JPG',
    image: '/images/landscape-asset.jpg',
    aspectRatio: 1.25,
  },
  {
    id: 'studio',
    title: 'Studio session',
    description: 'Portrait collection · JPG',
    image: '/images/portrait-asset.jpg',
    aspectRatio: 0.85,
  },
  {
    id: 'horizon',
    title: 'Open horizon',
    description: 'Landscape collection · JPG',
    image: '/images/card-preview.jpg',
    aspectRatio: 1.8,
  },
  {
    id: 'evening',
    title: 'Evening landscape',
    description: 'Landscape collection · JPG',
    image: '/images/landscape-asset.jpg',
    aspectRatio: 1.1,
  },
  {
    id: 'profile',
    title: 'Profile in daylight',
    description: 'Portrait collection · JPG',
    image: '/images/portrait-asset.jpg',
    aspectRatio: 0.7,
  },
  {
    id: 'valley',
    title: 'Valley view',
    description: 'Landscape collection · JPG',
    image: '/images/card-preview.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'tideline',
    title: 'Tideline',
    description: 'Coast collection · JPG',
    image: '/images/landscape-asset.jpg',
    aspectRatio: 1.35,
  },
  {
    id: 'archive',
    title: 'Portrait archive',
    description: 'Portrait collection · JPG',
    image: '/images/portrait-asset.jpg',
    aspectRatio: 0.8,
  },
  {
    id: 'summit',
    title: 'Summit',
    description: 'Landscape collection · JPG',
    image: '/images/card-preview.jpg',
    aspectRatio: 1.6,
  },
];

export const photos: CardViewItem[] = Array.from(
  { length: 100 },
  (_, index) => {
    const photo = photoTemplates[index % photoTemplates.length];
    const batch = Math.floor(index / photoTemplates.length);
    return {
      ...photo,
      id: batch === 0 ? photo.id : `${photo.id}-${index + 1}`,
      title: batch === 0 ? photo.title : `${photo.title} ${batch + 1}`,
    };
  }
);

export function prototypeMeta(tag: string): Partial<Meta> {
  const element = unsafeStatic(tag);
  return {
    component: tag,
    args: {
      layout: 'grid',
      label: 'Photo library',
      selectionMode: 'multiple',
      variant: 'secondary',
      density: 'regular',
      items: photos,
    },
    argTypes: {
      layout: { control: 'select', options: ['grid', 'waterfall'] },
      selectionMode: {
        control: 'select',
        options: ['none', 'single', 'multiple'],
      },
      variant: {
        control: 'select',
        options: ['primary', 'secondary', 'tertiary', 'quiet'],
      },
      density: {
        control: 'select',
        options: ['compact', 'regular', 'spacious'],
      },
      label: { control: 'text' },
      items: { control: false },
    },
    parameters: {
      layout: 'padded',
      actions: {
        handles: ['swc-card-view-selection-change', 'swc-card-view-action'],
      },
    },
    render: (args) => staticHtml`
      <div style="max-width: 1040px; margin-inline: auto;">
        <button type="button" style="margin-block-end: 16px;">Photo library</button>
        <${element}
          style="max-height: 60vh; overflow: auto;"
          .items=${args.items}
          .layout=${args.layout}
          .label=${args.label}
          .selectionMode=${args.selectionMode}
          .variant=${args.variant}
          .density=${args.density}
          @swc-card-view-action=${(
            event: CustomEvent<{ id: string; action: string }>
          ) => {
            const output = (
              event.currentTarget as HTMLElement
            ).parentElement!.querySelector('output')!;
            const item = photos.find((photo) => photo.id === event.detail.id);
            output.textContent = `${event.detail.action === 'open' ? 'Opened' : 'Shared'} ${item?.title ?? event.detail.id}`;
          }}
          @swc-card-view-exit=${(event: CustomEvent<{ direction: string }>) => {
            const view = event.currentTarget as HTMLElement;
            const button =
              event.detail.direction === 'before'
                ? view.previousElementSibling
                : view.nextElementSibling;
            (button as HTMLElement)?.focus();
          }}
        ></${element}>
        <button type="button" style="margin-block-start: 16px;">Upload photos</button>
        <output aria-live="polite" style="display: block; min-height: 24px; margin-block-start: 12px;"></output>
      </div>
    `,
  };
}
