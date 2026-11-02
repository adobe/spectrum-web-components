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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../conversation-turn/swc-conversation-turn.js';
import '../../upload-attachment/swc-upload-attachment.js';
import '../swc-user-message.js';

import { getComponent, getComponents } from '../../../../utils/test-utils.js';
import { Card, meta, Overview } from '../stories/user-message.stories.js';
import { UserMessage } from '../UserMessage.js';

export default {
  ...meta,
  title: 'AI Toolkit/User message/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step('uses copy type by default', async () => {
      expect(el.type).toBe('copy');
      expect(el.getAttribute('type')).toBe('copy');
    });
  },
};

export const CardTypeControlTest: Story = {
  ...Overview,
  args: {
    ...Overview.args,
    type: 'card',
    'thumbnail-slot': `
      <swc-upload-attachment type="card">
        <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
        <span slot="title">Campaign brief.pdf</span>
        <span slot="subtitle">840 KB</span>
      </swc-upload-attachment>
    `,
  },
  play: async ({ canvasElement }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    expect(el.type).toBe('card');
    expect(el.getAttribute('type')).toBe('card');
    expect('galleryLayout' in el).toBe(false);
    expect(
      el.shadowRoot?.querySelector('.swc-UserMessage-galleryViewport')
    ).not.toBeNull();
    expect(el.shadowRoot?.querySelector('slot[name="title"]')).toBeNull();
    expect(el.shadowRoot?.querySelector('slot[name="subtitle"]')).toBeNull();
  },
};

export const CardThumbnailsTest: Story = {
  ...Card,
  play: async ({ canvasElement }) => {
    const cards = await getComponents<HTMLElement>(
      canvasElement,
      'swc-upload-attachment[type="card"]'
    );
    expect(cards).toHaveLength(7);
    for (const card of cards) {
      const thumbnail = card.querySelector('swc-thumbnail[slot="thumbnail"]');
      expect(thumbnail).not.toBeNull();
      expect(thumbnail?.hasAttribute('decorative')).toBe(true);
      expect(thumbnail?.children).toHaveLength(0);
      expect(card.querySelector('swc-asset, img')).toBeNull();
    }
  },
};

export const TypeAndSlotTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step(
      'card type groups complete document tiles without message-level metadata',
      async () => {
        el.type = 'card';
        el.innerHTML = `
        <swc-upload-attachment slot="thumbnail" type="card">
          <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
          <span slot="title">Brand guidelines.pdf</span>
          <span slot="subtitle">1.2 MB</span>
        </swc-upload-attachment>
      `;
        await el.updateComplete;

        expect(el.getAttribute('type')).toBe('card');
        expect(
          el.shadowRoot?.querySelector('slot[name="thumbnail"]')
        ).toBeTruthy();
        expect(el.shadowRoot?.querySelector('slot[name="title"]')).toBeNull();
        expect(
          el.shadowRoot?.querySelector('slot[name="subtitle"]')
        ).toBeNull();
      }
    );

    await step(
      'media type uses the same shared attachment frame for image previews',
      async () => {
        el.type = 'media';
        el.innerHTML = `
        <div slot="thumbnail" role="img" aria-label="Preview"></div>
        <div slot="thumbnail" role="img" aria-label="Another preview"></div>
      `;
        await el.updateComplete;

        const attachment = el.shadowRoot?.querySelector(
          '.swc-UserMessage-galleryViewport'
        );
        expect(el.getAttribute('type')).toBe('media');
        expect(attachment).toBeTruthy();
      }
    );

    await step('copy type uses the default slot text path', async () => {
      el.type = 'copy';
      el.innerHTML = `Can you summarize this document?`;
      await el.updateComplete;

      const textSlot =
        el.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
      const assignedText = textSlot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent ?? '')
        .join('')
        .trim();

      expect(el.getAttribute('type')).toBe('copy');
      expect(assignedText).toBe('Can you summarize this document?');
    });
  },
};

export const DefaultSlotHiddenForAttachmentTypesTest: Story = {
  name: 'Default slot not used for attachment types',
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    const attachmentMarkup = (label: string) => `
        <p data-test-default-slotted>${label}</p>
        <div slot="thumbnail" role="img" aria-label="Preview"></div>
      `;

    for (const type of ['card', 'media'] as const) {
      await step(
        `type="${type}": no unnamed slot; default-slot children are not shown`,
        async () => {
          el.type = type;
          el.innerHTML = attachmentMarkup(
            'Default copy that must not appear in the bubble for attachment types.'
          );
          await el.updateComplete;

          expect(el.shadowRoot?.querySelector('slot:not([name])')).toBeNull();

          const leaked = el.querySelector<HTMLElement>(
            '[data-test-default-slotted]'
          );
          expect(leaked).toBeTruthy();
          const { width, height } = leaked!.getBoundingClientRect();
          expect(width * height).toBe(0);
        }
      );
    }

    await step(
      'type="copy" keeps an unnamed (default) slot in the shadow root',
      async () => {
        el.type = 'copy';
        el.innerHTML = 'Visible copy text';
        await el.updateComplete;

        const defaultSlot =
          el.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
        expect(defaultSlot).toBeTruthy();
      }
    );
  },
};

const longSpacedCopy =
  'This is a deliberately long line of user copy that should wrap within a narrow column without horizontal overflow. '.repeat(
    3
  );

const longUnbrokenFileName = `${'VeryLongAttachmentNamePortion'.repeat(12)}.pdf`;

/**
 * Exercises long copy in a tight column and a long unbroken card title
 * (ellipsis) so the bubble does not grow past its layout width.
 */
export const LongTextWrapTest: Story = {
  name: 'Long text wrap and containment',
  render: () => html`
    <div style="max-inline-size: 220px;">
      <swc-conversation-turn type="user">
        <swc-user-message>${longSpacedCopy}</swc-user-message>
      </swc-conversation-turn>
    </div>
    <div
      style="max-inline-size: 640px; margin-block-start: 32px; padding-inline: 1px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message type="card">
          <swc-upload-attachment slot="thumbnail" type="card">
            <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
            <span slot="title">${longUnbrokenFileName}</span>
            <span slot="subtitle">PDF</span>
          </swc-upload-attachment>
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const [copyBubble, cardBubble] = await getComponents<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step(
      'long copy message does not overflow horizontally in a narrow column',
      async () => {
        expect(copyBubble.scrollWidth).toBeLessThanOrEqual(
          copyBubble.clientWidth + 1
        );
        expect(copyBubble.getBoundingClientRect().height).toBeGreaterThan(40);
      }
    );

    await step(
      'long unbroken card title is confined with ellipsis (no host overflow)',
      async () => {
        expect(cardBubble.scrollWidth).toBeLessThanOrEqual(
          cardBubble.clientWidth + 1
        );
      }
    );
  },
};

export const GalleryLayoutTest: Story = {
  render: () => html`
    <div style="inline-size:640px;max-inline-size:100%;">
      <swc-conversation-turn type="user">
        <swc-user-message type="media">
          ${Array.from(
            { length: 7 },
            (_, index) => html`
              <div slot="thumbnail" role="img" aria-label="Photo ${index + 1}">
                Photo ${index + 1}
              </div>
            `
          )}
          <span slot="title">Hidden filename</span>
          <span slot="subtitle">Hidden file size</span>
        </swc-user-message>
        <swc-user-message>Help me organize these photos.</swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const [gallery, copy] = await getComponents<UserMessage>(
      canvasElement,
      'swc-user-message'
    );
    const thumbnails = Array.from(
      gallery.querySelectorAll<HTMLElement>('[slot="thumbnail"]')
    );

    await step(
      'uses the parent width boundary instead of a fixed column limit',
      async () => {
        const rects = thumbnails.map((thumbnail) =>
          thumbnail.getBoundingClientRect()
        );
        for (const rect of rects) {
          expect(rect.width).toBe(64);
          expect(rect.height).toBe(64);
        }
        expect(rects[5].top).toBe(rects[0].top);
        expect(rects[6].top - rects[0].top).toBe(70);
        expect(rects[1].left - rects[0].left).toBe(70);
        expect(gallery.getBoundingClientRect().width).toBe(448);
        expect(gallery.getBoundingClientRect().right).toBeCloseTo(
          copy.getBoundingClientRect().right,
          3
        );
        expect(
          gallery.shadowRoot?.querySelector('.swc-UserMessage-meta')
        ).toBeNull();
        expect(
          gallery
            .querySelector<HTMLElement>('[slot="title"]')!
            .getBoundingClientRect().height
        ).toBe(0);
        expect(
          copy.getBoundingClientRect().top -
            gallery.getBoundingClientRect().bottom
        ).toBeCloseTo(16, 3);
      }
    );

    await step(
      'wraps within narrow turns without changing thumbnail size',
      async () => {
        const container = canvasElement.querySelector<HTMLElement>('div')!;
        container.style.inlineSize = '220px';
        expect(gallery.getBoundingClientRect().width).toBeLessThanOrEqual(220);
        expect(gallery.scrollWidth).toBeLessThanOrEqual(gallery.clientWidth);
        expect(thumbnails[0].getBoundingClientRect().width).toBe(64);
        expect(thumbnails[2].getBoundingClientRect().top).toBeGreaterThan(
          thumbnails[0].getBoundingClientRect().top
        );
      }
    );

    await step(
      'keeps two columns by shrinking square thumbnails in very narrow turns',
      async () => {
        const container = canvasElement.querySelector<HTMLElement>('div')!;
        container.style.inlineSize = '80px';
        await waitFor(() => {
          const rects = thumbnails.map((thumbnail) =>
            thumbnail.getBoundingClientRect()
          );
          expect(gallery.getBoundingClientRect().width).toBeLessThanOrEqual(80);
          expect(gallery.scrollWidth).toBeLessThanOrEqual(gallery.clientWidth);
          expect(rects[1].top).toBeCloseTo(rects[0].top, 3);
          expect(rects[2].top).toBeGreaterThan(rects[0].top);
          for (const rect of rects) {
            expect(rect.width).toBeGreaterThan(0);
            expect(rect.width).toBeLessThan(64);
            expect(rect.width).toBeCloseTo(20, 3);
            expect(rect.height).toBeCloseTo(rect.width, 3);
          }
        });
      }
    );

    await step(
      'shrinks to a single thumbnail without reserving an empty column',
      async () => {
        canvasElement.querySelector<HTMLElement>('div')!.style.inlineSize =
          '640px';
        thumbnails.slice(1).forEach((thumbnail) => thumbnail.remove());
        await waitFor(() => {
          expect(gallery.getBoundingClientRect().width).toBeLessThan(110);
          expect(thumbnails[0].getBoundingClientRect().width).toBe(64);
          expect(thumbnails[0].getBoundingClientRect().height).toBe(64);
        });
      }
    );

    await step(
      'updates the two-column minimum when an image is added',
      async () => {
        canvasElement.querySelector<HTMLElement>('div')!.style.inlineSize =
          '80px';
        await waitFor(() => {
          const single = thumbnails[0].getBoundingClientRect();
          expect(single.width).toBeCloseTo(46, 3);
          expect(single.height).toBeCloseTo(single.width, 3);
        });
        const added = document.createElement('div');
        added.slot = 'thumbnail';
        added.setAttribute('role', 'img');
        added.setAttribute('aria-label', 'Another photo');
        gallery.append(added);
        await waitFor(() => {
          const first = thumbnails[0].getBoundingClientRect();
          const second = added.getBoundingClientRect();
          expect(first.top).toBeCloseTo(second.top, 3);
          expect(first.width).toBeCloseTo(second.width, 3);
          expect(first.height).toBeCloseTo(first.width, 3);
          expect(second.height).toBeCloseTo(second.width, 3);
          expect(gallery.scrollWidth).toBeLessThanOrEqual(gallery.clientWidth);
        });
      }
    );
  },
};

export const GalleryImageAspectRatioTest: Story = {
  render: () => html`
    <div style="inline-size:120px;">
      <swc-conversation-turn type="user">
        <swc-user-message type="media">
          <img
            slot="thumbnail"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3C/svg%3E"
            alt="Landscape photo"
          />
          <img
            slot="thumbnail"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='200'%3E%3C/svg%3E"
            alt="Portrait photo"
          />
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const gallery = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );
    const images = Array.from(gallery.querySelectorAll('img'));
    await Promise.all(images.map((image) => image.decode()));

    await step(
      'crops both image orientations into equally sized squares',
      async () => {
        await waitFor(() => {
          const [landscape, portrait] = images.map((image) =>
            image.getBoundingClientRect()
          );
          expect(landscape.top).toBeCloseTo(portrait.top, 3);
          expect(landscape.width).toBeLessThan(64);
          expect(landscape.height).toBeCloseTo(landscape.width, 3);
          expect(portrait.width).toBeCloseTo(landscape.width, 3);
          expect(portrait.height).toBeCloseTo(portrait.width, 3);
          expect(gallery.scrollWidth).toBeLessThanOrEqual(gallery.clientWidth);
          for (const image of images) {
            expect(getComputedStyle(image).objectFit).toBe('cover');
          }
        });
      }
    );
  },
};

export const GalleryOverflowTest: Story = {
  render: () => html`
    <div style="inline-size:220px;">
      <swc-conversation-turn type="user">
        <swc-user-message type="media">
          ${Array.from(
            { length: 14 },
            (_, index) => html`
              <div
                slot="thumbnail"
                role="img"
                aria-label="Photobook reference ${index + 1}"
                style="background:var(--swc-gray-200);"
              ></div>
            `
          )}
        </swc-user-message>
        <swc-user-message>Help me organize these photos.</swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const [gallery, copy] = await getComponents<UserMessage>(
      canvasElement,
      'swc-user-message'
    );
    const container = gallery.parentElement!.parentElement!;
    const viewport = gallery.shadowRoot!.querySelector<HTMLElement>(
      '.swc-UserMessage-galleryViewport'
    )!;
    const thumbnails = Array.from(
      gallery.querySelectorAll<HTMLElement>('[slot="thumbnail"]')
    );
    const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()');
    const fadeStops = () =>
      getComputedStyle(viewport).maskImage.match(/rgba?\(/g)?.length ?? 0;

    await step(
      'caps the entire bubble at 240px and scrolls only the gallery',
      async () => {
        expect(viewport).not.toBeNull();
        await waitFor(() => {
          expect(gallery.getBoundingClientRect().height).toBeCloseTo(240, 3);
          expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
          expect(viewport.getAttribute('tabindex')).toBe('0');
        });
        expect(getComputedStyle(viewport).overflowY).toBe('auto');
        expect(getComputedStyle(viewport).overscrollBehavior).toBe('contain');
        expect(viewport.getAttribute('role')).toBe('group');
        expect(viewport.getAttribute('aria-label')).toBe('Uploaded images');
        expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth);
        expect(thumbnails[0].getBoundingClientRect().width).toBe(64);
        expect(
          copy.getBoundingClientRect().top -
            gallery.getBoundingClientRect().bottom
        ).toBeCloseTo(16, 3);
        expect(getComputedStyle(copy).maskImage).toBe('none');
      }
    );

    await step(
      'keeps overlay scrollbars outside the thumbnails in both directions',
      async () => {
        for (const direction of ['ltr', 'rtl']) {
          gallery.dir = direction;
          await waitFor(() => {
            const viewportBounds = viewport.getBoundingClientRect();
            const galleryBounds = gallery.getBoundingClientRect();
            const rects = thumbnails.map((thumbnail) =>
              thumbnail.getBoundingClientRect()
            );
            const firstRow = rects.filter((rect) => rect.top === rects[0].top);
            const scrollbarSpace =
              direction === 'rtl'
                ? Math.min(...firstRow.map((rect) => rect.left)) -
                  viewportBounds.left
                : viewportBounds.right -
                  Math.max(...firstRow.map((rect) => rect.right));
            expect(scrollbarSpace).toBeGreaterThanOrEqual(12);
            expect(rects[0].width).toBe(64);
            expect(viewportBounds.left).toBeGreaterThanOrEqual(
              galleryBounds.left
            );
            expect(viewportBounds.right).toBeLessThanOrEqual(
              galleryBounds.right
            );
            expect(viewport.scrollWidth).toBeLessThanOrEqual(
              viewport.clientWidth
            );
          });
        }
        gallery.removeAttribute('dir');
      }
    );

    await step(
      'shows direction-aware fades only where more images are hidden',
      async () => {
        if (supportsScrollTimeline) {
          await waitFor(() => expect(fadeStops()).toBe(2));
        } else {
          expect(getComputedStyle(viewport).maskImage).toBe('none');
        }

        viewport.scrollTop =
          (viewport.scrollHeight - viewport.clientHeight) / 2;
        await waitFor(() => expect(viewport.scrollTop).toBeGreaterThan(0));
        if (supportsScrollTimeline) {
          await waitFor(() => expect(fadeStops()).toBe(4));
        }

        viewport.scrollTop = viewport.scrollHeight;
        await waitFor(() =>
          expect(viewport.scrollTop).toBeCloseTo(
            viewport.scrollHeight - viewport.clientHeight,
            0
          )
        );
        if (supportsScrollTimeline) {
          await waitFor(() => expect(fadeStops()).toBe(3));
        }
      }
    );

    await step(
      'removes the extra tab stop and fade when resizing reveals every image',
      async () => {
        container.style.inlineSize = '640px';
        await waitFor(() => {
          expect(viewport.scrollHeight).toBeLessThanOrEqual(
            viewport.clientHeight
          );
          expect(viewport.hasAttribute('tabindex')).toBe(false);
          expect(getComputedStyle(viewport).maskImage).toBe('none');
        });
        expect(gallery.getBoundingClientRect().height).toBeLessThan(240);

        container.style.inlineSize = '220px';
        await waitFor(() =>
          expect(viewport.getAttribute('tabindex')).toBe('0')
        );
      }
    );

    await step(
      're-measures added and removed thumbnails without reserving the capped height',
      async () => {
        thumbnails.slice(1).forEach((thumbnail) => thumbnail.remove());
        await waitFor(() => {
          expect(gallery.getBoundingClientRect().height).toBeCloseTo(90, 3);
          expect(viewport.hasAttribute('tabindex')).toBe(false);
          expect(getComputedStyle(viewport).maskImage).toBe('none');
        });

        gallery.append(...thumbnails.slice(1));
        await waitFor(() => {
          expect(gallery.getBoundingClientRect().height).toBeCloseTo(240, 3);
          expect(viewport.getAttribute('tabindex')).toBe('0');
        });
      }
    );

    await step('continues tracking overflow after reconnecting', async () => {
      const turn = gallery.parentElement!;
      gallery.remove();
      turn.prepend(gallery);
      await gallery.updateComplete;
      container.style.inlineSize = '640px';
      await waitFor(() =>
        expect(viewport.hasAttribute('tabindex')).toBe(false)
      );
      container.style.inlineSize = '220px';
      await waitFor(() => expect(viewport.getAttribute('tabindex')).toBe('0'));
    });
  },
};

export const GalleryHuggingTest: Story = {
  render: () => html`
    ${[220, 320, 480].map(
      (width) => html`
        <div style="inline-size:${width}px;">
          <swc-user-message type="media">
            ${Array.from(
              { length: 14 },
              (_, index) => html`
                <div
                  slot="thumbnail"
                  role="img"
                  aria-label="Photobook reference ${index + 1}"
                ></div>
              `
            )}
          </swc-user-message>
        </div>
      `
    )}
  `,
  play: async ({ canvasElement, step }) => {
    const galleries = await getComponents<UserMessage>(
      canvasElement,
      'swc-user-message'
    );
    await step(
      'hugs occupied columns plus padding and the scrollbar gutter',
      async () => {
        for (const [index, gallery] of galleries.entries()) {
          await waitFor(() => {
            const viewport = gallery.shadowRoot!.querySelector<HTMLElement>(
              '.swc-UserMessage-galleryViewport'
            )!;
            const rects = Array.from(gallery.children, (element) =>
              element.getBoundingClientRect()
            );
            const firstRow = rects.filter((rect) => rect.top === rects[0].top);
            const occupiedWidth =
              Math.max(...firstRow.map((rect) => rect.right)) -
              Math.min(...firstRow.map((rect) => rect.left));
            const scrollbarWidth = viewport.offsetWidth - viewport.clientWidth;
            expect(rects[0].width).toBe(64);
            expect(firstRow).toHaveLength([2, 4, 6][index]);
            expect(gallery.getBoundingClientRect().width).toBeCloseTo(
              occupiedWidth + scrollbarWidth + 34,
              3
            );
            expect(viewport.scrollWidth).toBeLessThanOrEqual(
              viewport.clientWidth
            );
            expect(gallery.getBoundingClientRect().height).toBeLessThanOrEqual(
              240
            );
          });
        }
      }
    );
  },
};

export const CardGalleryTest: Story = {
  render: () => html`
    <div style="inline-size:640px;max-inline-size:100%;">
      <swc-conversation-turn type="user">
        <swc-user-message type="card">
          ${Array.from(
            { length: 6 },
            (_, index) => html`
              <swc-upload-attachment slot="thumbnail" type="card">
                <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
                <span slot="title">Campaign reference ${index + 1}.pdf</span>
                <span slot="subtitle">1.2 MB</span>
              </swc-upload-attachment>
            `
          )}
        </swc-user-message>
        <swc-user-message>
          Summarize these campaign references.
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const [gallery, copy] = await getComponents<UserMessage>(
      canvasElement,
      'swc-user-message'
    );
    const container = gallery.parentElement!.parentElement!;
    const cards = await getComponents(gallery, 'swc-upload-attachment');
    const viewport = gallery.shadowRoot!.querySelector<HTMLElement>(
      '.swc-UserMessage-galleryViewport'
    )!;
    const columns = () => {
      const rects = cards.map((card) => card.getBoundingClientRect());
      return rects.filter((rect) => rect.top === rects[0].top).length;
    };

    await step(
      'groups rectangular cards in two columns inside one bubble',
      async () => {
        await waitFor(() => {
          expect(columns()).toBe(2);
          expect(cards[0].getBoundingClientRect().width).toBe(220);
          expect(cards[0].getBoundingClientRect().height).toBeLessThan(100);
          expect(gallery.getBoundingClientRect().height).toBeCloseTo(240, 3);
          expect(viewport.getAttribute('aria-label')).toBe(
            'Uploaded documents'
          );
        });
        expect(cards).toHaveLength(6);
        expect(viewport.getAttribute('tabindex')).toBe('0');
        expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth);
        expect(
          copy.getBoundingClientRect().top -
            gallery.getBoundingClientRect().bottom
        ).toBeCloseTo(16, 3);
      }
    );

    await step(
      'uses one readable column in narrow messages and expands again',
      async () => {
        container.style.inlineSize = '320px';
        await waitFor(() => {
          expect(columns()).toBe(1);
          expect(cards[0].getBoundingClientRect().width).toBeGreaterThan(180);
          expect(viewport.scrollWidth).toBeLessThanOrEqual(
            viewport.clientWidth
          );
        });
        container.style.inlineSize = '640px';
        await waitFor(() => expect(columns()).toBe(2));
      }
    );

    await step(
      'hugs a single card without reserving another column or scrollbar',
      async () => {
        cards.slice(1).forEach((card) => card.remove());
        await waitFor(() => {
          expect(gallery.getBoundingClientRect().width).toBeCloseTo(254, 3);
          expect(gallery.getBoundingClientRect().height).toBeLessThan(240);
          expect(viewport.hasAttribute('tabindex')).toBe(false);
          expect(getComputedStyle(viewport).maskImage).toBe('none');
        });
        gallery.append(...cards.slice(1));
        await waitFor(() => expect(columns()).toBe(2));
      }
    );

    await step('re-measures when changing the attachment type', async () => {
      gallery.type = 'media';
      await waitFor(() => {
        expect(columns()).toBe(6);
        expect(cards[0].getBoundingClientRect().width).toBe(64);
        expect(viewport.hasAttribute('tabindex')).toBe(false);
      });
      gallery.type = 'card';
      await waitFor(() => {
        expect(columns()).toBe(2);
        expect(viewport.getAttribute('aria-label')).toBe('Uploaded documents');
      });
    });

    await step(
      'restores attachment layout after switching through copy',
      async () => {
        gallery.type = 'copy';
        gallery.textContent = 'Summarize these references.';
        await gallery.updateComplete;
        expect(
          gallery.shadowRoot?.querySelector('.swc-UserMessage-galleryViewport')
        ).toBeNull();
        gallery.type = 'card';
        gallery.replaceChildren(...cards);
        await waitFor(() => {
          expect(columns()).toBe(2);
          const restoredViewport = gallery.shadowRoot?.querySelector(
            '.swc-UserMessage-galleryViewport'
          );
          expect(restoredViewport?.getAttribute('aria-label')).toBe(
            'Uploaded documents'
          );
        });
      }
    );
  },
};
