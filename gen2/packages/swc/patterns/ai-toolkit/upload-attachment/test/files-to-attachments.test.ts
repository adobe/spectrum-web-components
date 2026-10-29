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

import { html } from 'lit';
import { expect, spyOn } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  filesToAttachments,
  revokeAttachment,
  revokeAttachments,
} from '../files-to-attachments.js';

export default {
  title: 'AI Toolkit/Upload attachment/Helper tests',
  // Storybook's render type doesn't accept `nothing`.
  // eslint-disable-next-line lit/prefer-nothing
  render: () => html``,
  parameters: {
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

/** Creates a file and overrides its size without allocating the bytes. */
function fileOfSize(name: string, size: number, type = ''): File {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

export const ImageAndNonImageFiles: Story = {
  play: async ({ step }) => {
    const png = new File(['png'], 'photo.png', { type: 'image/png' });
    const jpgWithoutType = new File(['jpg'], 'scan.JPG');
    const pdf = new File(['pdf'], 'report.pdf', { type: 'application/pdf' });
    const attachments = filesToAttachments([png, jpgWithoutType, pdf]);

    try {
      await step('returns one data object per file, in order', async () => {
        expect(attachments).toHaveLength(3);
        expect(attachments.map((item) => item.file)).toEqual([
          png,
          jpgWithoutType,
          pdf,
        ]);
        expect(attachments.map((item) => item.name)).toEqual([
          'photo.png',
          'scan.JPG',
          'report.pdf',
        ]);
        expect(new Set(attachments.map((item) => item.id)).size).toBe(3);
      });

      await step(
        'image files, by MIME type or extension, get a thumbnail and no badge',
        async () => {
          for (const image of attachments.slice(0, 2)) {
            expect(image.thumbnailUrl).toMatch(/^blob:/);
            expect(image.badgeLabel).toBeUndefined();
          }
          const response = await fetch(attachments[0].thumbnailUrl!);
          expect(await response.text()).toBe('png');
        }
      );

      await step('non-image files get a badge and no thumbnail', async () => {
        expect(attachments[2].thumbnailUrl).toBeUndefined();
        expect(attachments[2].badgeLabel).toBe('PDF');
      });
    } finally {
      revokeAttachments(attachments);
    }
  },
};

export const BadgeLabels: Story = {
  play: async ({ step }) => {
    const badgeFor = (name: string, type = ''): string | undefined =>
      filesToAttachments([new File([''], name, { type })])[0].badgeLabel;

    await step('derives the badge from the file extension', async () => {
      expect(badgeFor('notes.md')).toBe('MD');
      expect(badgeFor('archive.tar.GZ', 'application/gzip')).toBe('GZ');
      expect(badgeFor('data.csv', 'application/octet-stream')).toBe('CSV');
    });

    await step(
      'falls back to the MIME type when the name has no extension',
      async () => {
        expect(badgeFor('README', 'text/plain')).toBe('TXT');
        expect(badgeFor('download', 'application/pdf')).toBe('PDF');
        expect(
          badgeFor(
            'proposal',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          )
        ).toBe('DOCX');
      }
    );

    await step('returns undefined when the type is unknown', async () => {
      expect(badgeFor('blob')).toBeUndefined();
      expect(badgeFor('blob', 'application/octet-stream')).toBeUndefined();
    });
  },
};

export const SizeLabels: Story = {
  play: async ({ step }) => {
    const sizeLabelFor = (size: number, locale = 'en-US'): string =>
      filesToAttachments([fileOfSize('file.bin', size)], { locale })[0]
        .sizeLabel;

    await step('formats sizes with the matching unit', async () => {
      expect(sizeLabelFor(0)).toBe('0 bytes');
      expect(sizeLabelFor(1)).toBe('1 byte');
      expect(sizeLabelFor(999)).toBe('999 bytes');
      expect(sizeLabelFor(1_000)).toBe('1 kB');
      expect(sizeLabelFor(1_540)).toBe('1.5 kB');
      expect(sizeLabelFor(12_345)).toBe('12 kB');
      expect(sizeLabelFor(1_500_000)).toBe('1.5 MB');
      expect(sizeLabelFor(250_000_000)).toBe('250 MB');
      expect(sizeLabelFor(2_000_000_000)).toBe('2 GB');
      expect(sizeLabelFor(3_000_000_000_000)).toBe('3,000 GB');
    });

    await step('formats the size label for the given locale', async () => {
      // Some locales separate number and unit with a narrow no-break space.
      const normalize = (label: string): string => label.replace(/\s/g, ' ');
      expect(normalize(sizeLabelFor(1_540, 'de-DE'))).toBe('1,5 kB');
      expect(normalize(sizeLabelFor(1_500_000, 'fr-FR'))).toBe('1,5 Mo');
    });
  },
};

export const EmptyInput: Story = {
  play: async ({ step }) => {
    await step('returns an empty array for no files', async () => {
      expect(filesToAttachments([])).toEqual([]);
      expect(filesToAttachments(new DataTransfer().files)).toEqual([]);
    });
  },
};

export const UniqueIds: Story = {
  play: async ({ step }) => {
    await step('ids are unique across many calls', async () => {
      const file = new File(['txt'], 'notes.txt', { type: 'text/plain' });
      const ids = new Set<string>();
      for (let call = 0; call < 200; call += 1) {
        for (const { id } of filesToAttachments([file, file, file])) {
          ids.add(id);
        }
      }
      expect(ids.size).toBe(600);
    });
  },
};

export const FailedConversionCreatesNoObjectUrls: Story = {
  play: async ({ step }) => {
    await step(
      'an invalid locale throws before any object URL is created',
      async () => {
        const createSpy = spyOn(URL, 'createObjectURL');
        expect(() =>
          filesToAttachments(
            [new File(['png'], 'photo.png', { type: 'image/png' })],
            { locale: 'en_US' }
          )
        ).toThrow(RangeError);
        expect(createSpy).not.toHaveBeenCalled();
      }
    );
  },
};

export const IdempotentRevoke: Story = {
  play: async ({ step }) => {
    const revokeSpy = spyOn(URL, 'revokeObjectURL');
    const [image, document] = filesToAttachments([
      new File(['png'], 'photo.png', { type: 'image/png' }),
      new File(['pdf'], 'report.pdf', { type: 'application/pdf' }),
    ]);

    await step('releases the thumbnail object URL once', async () => {
      revokeAttachment(image);
      revokeAttachment(image);
      // A copy, such as one spread into new framework state, shares the URL.
      revokeAttachment({ ...image });
      revokeAttachments([image, image]);
      expect(revokeSpy).toHaveBeenCalledTimes(1);
      expect(revokeSpy).toHaveBeenCalledWith(image.thumbnailUrl);
    });

    await step('the revoked URL no longer loads', async () => {
      revokeSpy.mockRestore();
      await expect(fetch(image.thumbnailUrl!)).rejects.toThrow();
    });

    await step('does nothing for attachments without a thumbnail', async () => {
      const spy = spyOn(URL, 'revokeObjectURL');
      revokeAttachment(document);
      expect(spy).not.toHaveBeenCalled();
    });
  },
};
