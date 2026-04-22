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

/*
 * Regression story for the iOS WebKit visual-viewport offset bug.
 *
 * Symptom (before the fix): an `sp-popover` opened via the `trigger` Lit
 * directive landed ~30-40 px below its trigger on iOS Safari / WKWebView
 * hosts such as the Adobe Express iOS app, while rendering correctly on
 * Android. Cause: Floating UI computes `(x, y)` from `getBoundingClientRect`
 * (layout-viewport coordinates), but the overlay is rendered in the top
 * layer via the native popover API and painted relative to the visual
 * viewport. When the two viewports diverge (URL bar showing, pinch-zoom,
 * virtual keyboard, host-app bottom sheet, …) the overlay drifts away from
 * its trigger by exactly `visualViewport.offsetTop / offsetLeft`.
 *
 * Fix: `PlacementController.computePlacement` now subtracts those offsets
 * on WebKit, and `placeOverlay` subscribes to `visualViewport`'s `resize`
 * and `scroll` so the overlay re-positions when the viewports realign.
 *
 * This story is designed to be opened on a real iOS device. It mirrors the
 * bug-report screenshot (a vertical list of rows, each with an info button
 * that opens an `sp-popover tip` above it) and shows live visual-viewport
 * telemetry so you can confirm the overlay tracks the trigger as the URL
 * bar hides/shows, the page is pinch-zoomed, etc.
 */

import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import { trigger } from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/switch/sp-switch.js';

export default {
  title: 'Overlay/Bug Repros/iOS Popover Positioning',
  parameters: {
    // Manual repro that needs to run on an iOS device. Skip Chromatic and
    // the visual-regression test runner.
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'Reproduces the iOS-only offset bug where `sp-popover` opened via the `trigger` directive lands ~30-40 px below its trigger. Open this story on an iOS device, optionally enable the simulated bottom sheet, then tap an info button.',
      },
    },
  },
};

interface Row {
  id: string;
  label: string;
  detail: string;
}

const ROWS: Row[] = [
  {
    id: 'a1',
    label: 'CE Tester 01 - A1',
    detail: 'Project A1 — owned by you. Last edited 10 days ago.',
  },
  {
    id: 'b2',
    label: 'CE Tester 01 - B2',
    detail: 'Project B2 — shared with your team. Last edited 3 days ago.',
  },
  {
    id: 'b1',
    label: 'CE Tester 01 - B1',
    detail: 'Project B1 — owned by you. Last edited yesterday.',
  },
  {
    id: 'c4',
    label: 'CE Tester 01 - C4',
    detail: 'Project C4 — read-only. Last edited 1 month ago.',
  },
  {
    id: 'd7',
    label: 'CE Tester 01 - D7',
    detail: 'Project D7 — pending approval. Last edited just now.',
  },
];

class IosPopoverRepro extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      font-family: var(--spectrum-sans-font-family-stack, sans-serif);
      color: var(--spectrum-neutral-content-color-default, #222);
      min-height: 100dvh;
      padding-bottom: env(safe-area-inset-bottom);
      padding-top: env(safe-area-inset-top);
    }

    .telemetry {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--spectrum-gray-75, #f5f5f5);
      border-bottom: 1px solid var(--spectrum-gray-300, #ddd);
      padding: 12px 16px;
      font-size: 12px;
      line-height: 1.5;
    }

    .telemetry h3 {
      margin: 0 0 6px;
      font-size: 13px;
    }

    .telemetry-grid {
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 12px;
      row-gap: 2px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 12px 16px;
      background: var(--spectrum-gray-50, #fafafa);
      border-bottom: 1px solid var(--spectrum-gray-200, #eee);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      border-bottom: 1px solid var(--spectrum-gray-200, #eee);
      min-height: 56px;
    }

    .row-label {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .row-avatar {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #b39df0, #6b6bf5);
      display: grid;
      place-items: center;
      color: white;
      font-weight: 600;
    }

    /*
         * Simulates the Adobe Express bottom sheet from the bug screenshot.
         * It is purely visual — no top-layer interaction — so the popover
         * still renders above it. The point is to anchor visually where the
         * popover *should* land relative to the trigger row.
         */
    .fake-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
      padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
      z-index: 0;
    }

    .fake-sheet h4 {
      text-align: center;
      margin: 0 0 8px;
    }

    .fake-sheet .grabber {
      width: 36px;
      height: 4px;
      border-radius: 2px;
      background: var(--spectrum-gray-400, #bbb);
      margin: 0 auto 12px;
    }

    sp-popover {
      max-width: 280px;
    }

    .popover-body {
      padding: 4px 4px 0;
      font-size: 13px;
      line-height: 1.4;
    }
  `;

  private vv: ReturnType<typeof this.snapshotViewport>;

  private showSheet = false;

  public constructor() {
    super();
    this.vv = this.snapshotViewport();
  }

  private snapshotViewport(): {
    layoutW: number;
    layoutH: number;
    vvW: number;
    vvH: number;
    offsetTop: number;
    offsetLeft: number;
    pageTop: number;
    pageLeft: number;
    scale: number;
    dpr: number;
    isWebKit: boolean;
    ua: string;
  } {
    const vv = window.visualViewport;
    return {
      layoutW: window.innerWidth,
      layoutH: window.innerHeight,
      vvW: vv?.width ?? 0,
      vvH: vv?.height ?? 0,
      offsetTop: vv?.offsetTop ?? 0,
      offsetLeft: vv?.offsetLeft ?? 0,
      pageTop: vv?.pageTop ?? 0,
      pageLeft: vv?.pageLeft ?? 0,
      scale: vv?.scale ?? 1,
      dpr: window.devicePixelRatio || 1,
      isWebKit:
        /AppleWebKit/.test(navigator.userAgent) &&
        !/Chrome|CriOS|Edg/.test(navigator.userAgent),
      ua: navigator.userAgent,
    };
  }

  private onViewportChange = (): void => {
    this.vv = this.snapshotViewport();
    this.requestUpdate();
    // Ask any open overlays to recompute placement when the visual
    // viewport shifts (URL bar, keyboard, host-app sheet, scroll).
    document.dispatchEvent(new Event('sp-update-overlays'));
  };

  public override connectedCallback(): void {
    super.connectedCallback();
    window.visualViewport?.addEventListener('resize', this.onViewportChange);
    window.visualViewport?.addEventListener('scroll', this.onViewportChange);
    window.addEventListener('orientationchange', this.onViewportChange);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.visualViewport?.removeEventListener('resize', this.onViewportChange);
    window.visualViewport?.removeEventListener('scroll', this.onViewportChange);
    window.removeEventListener('orientationchange', this.onViewportChange);
  }

  private toggleSheet(checked: boolean): void {
    this.showSheet = checked;
    this.requestUpdate();
    // The sheet appearing / disappearing changes layout height, so ask
    // any open overlays to recompute.
    document.dispatchEvent(new Event('sp-update-overlays'));
  }

  private renderInfoPopover = (row: Row) => (): TemplateResult => html`
    <sp-popover tip placement="top">
      <sp-dialog size="s" no-divider>
        <h2 slot="heading">${row.label}</h2>
        <div class="popover-body">${row.detail}</div>
      </sp-dialog>
    </sp-popover>
  `;

  private renderRow(row: Row): TemplateResult {
    return html`
      <div class="row">
        <div class="row-label">
          <div class="row-avatar">${row.label.slice(-2)}</div>
          <span>${row.label}</span>
        </div>
        <sp-action-button
          quiet
          label="About ${row.label}"
          aria-label="About ${row.label}"
          ${trigger(this.renderInfoPopover(row), {
            triggerInteraction: 'click',
            overlayOptions: { placement: 'top' },
          })}
        >
          <sp-icon-info-outline slot="icon"></sp-icon-info-outline>
        </sp-action-button>
      </div>
    `;
  }

  private renderTelemetry(): TemplateResult {
    return html`
      <div class="telemetry">
        <h3>Viewport telemetry (live)</h3>
        <div class="telemetry-grid">
          <span>isWebKit</span>
          <span>${String(this.vv.isWebKit)}</span>
          <span>layout (innerW × innerH)</span>
          <span>${this.vv.layoutW} × ${this.vv.layoutH}</span>
          <span>visualViewport (w × h)</span>
          <span>${this.vv.vvW.toFixed(1)} × ${this.vv.vvH.toFixed(1)}</span>
          <span>visualViewport offset (L, T)</span>
          <span>
            ${this.vv.offsetLeft.toFixed(1)}, ${this.vv.offsetTop.toFixed(1)}
          </span>
          <span>visualViewport page (L, T)</span>
          <span>
            ${this.vv.pageLeft.toFixed(1)}, ${this.vv.pageTop.toFixed(1)}
          </span>
          <span>scale / DPR</span>
          <span>${this.vv.scale.toFixed(2)} / ${this.vv.dpr}</span>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderTelemetry()}
      <div class="controls">
        <sp-switch
          ?checked=${this.showSheet}
          @change=${(event: Event) =>
            this.toggleSheet((event.target as HTMLInputElement).checked)}
        >
          Simulate Express bottom sheet
        </sp-switch>
        <sp-button
          variant="secondary"
          treatment="outline"
          @click=${() => {
            this.vv = this.snapshotViewport();
            this.requestUpdate();
            document.dispatchEvent(new Event('sp-update-overlays'));
          }}
        >
          Recompute overlays
        </sp-button>
      </div>
      ${ROWS.map((row) => this.renderRow(row))}
      ${this.showSheet
        ? html`
            <div class="fake-sheet" aria-hidden="true">
              <div class="grabber"></div>
              <h4>Projects</h4>
              <p style="text-align:center; margin:0;">
                Visually anchors where the popover should
                <em>not</em>
                overlap.
              </p>
            </div>
          `
        : ''}
    `;
  }
}

if (!customElements.get('overlay-ios-popover-repro')) {
  customElements.define('overlay-ios-popover-repro', IosPopoverRepro);
}

export const IosPopoverPositioning = (): TemplateResult => html`
  <overlay-ios-popover-repro></overlay-ios-popover-repro>
`;

IosPopoverPositioning.storyName = 'iOS popover positioning repro';

IosPopoverPositioning.swc_vrt = {
  skip: true,
};

IosPopoverPositioning.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    description: {
      story: [
        'Regression coverage for the iOS WebKit visual-viewport offset bug.',
        '',
        'How to verify on an iOS device (Safari or a WKWebView host):',
        '1. Tap any "info" button. The popover should land cleanly above its trigger.',
        '2. Pinch-zoom in, scroll until the URL bar shows/hides, or open a host-app bottom sheet (toggle "Simulate Express bottom sheet"). Tap an info button again — the popover should still anchor to the trigger.',
        '3. Open a popover, then change the visual viewport (scroll, pinch, keyboard). The telemetry panel updates and the open popover should re-anchor automatically.',
        '',
        'Before the fix the popover landed `visualViewport.offsetTop` px below its trigger on iOS WebKit and did not move when the visual viewport changed.',
      ].join('\n'),
    },
  },
};
