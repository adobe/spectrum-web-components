"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/coachmark/sp-coachmark.js";
import "@spectrum-web-components/coachmark/sp-coach-indicator.js";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import { cave, gif } from "./images.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
export default {
  title: "Coachmark",
  component: "sp-coachmark",
  argTypes: {
    onPrimary: { action: "primary" },
    onSecondary: { action: "secondary" }
  }
};
export const Default = () => {
  return html`
        <sp-coachmark open>
            <div id="heading" slot="title">Coachmark with Text Only</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
        </sp-coachmark>
    `;
};
export const InTour = (props, args = {}) => {
  const {
    open = true,
    heading = "Coachmark in Tour",
    content = "This is a Coachmark with nothing but text in it.",
    currentStep = 2,
    totalSteps = 8
  } = props;
  return html`
        <sp-coachmark
            ?open=${open}
            primary-cta="Next"
            secondary-cta="Previous"
            current-step=${currentStep}
            total-steps=${totalSteps}
            .content=${{
    title: heading,
    description: content
  }}
            @primary=${(event) => {
    var _a;
    event.target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
    (_a = args.onPrimary) == null ? void 0 : _a.call(args, event);
  }}
            @secondary=${(event) => {
    var _a;
    event.target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
    (_a = args.onSecondary) == null ? void 0 : _a.call(args, event);
  }}
        >
            <div slot="step-count">${currentStep} of ${totalSteps}</div>
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};
export const single = () => {
  return html`
        <sp-coachmark open primary-cta="Ok">
            <div slot="title">A single coachmark</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
        </sp-coachmark>
    `;
};
export const TriggerOnClick = (props) => {
  const { open = true, currentStep = 1, totalSteps = 4 } = props;
  return html`
        <sp-coach-indicator id="trigger"></sp-coach-indicator>
        <sp-overlay
            trigger="trigger@click"
            placement="right"
            .receivesFocus=${"false"}
            ?open=${open}
        >
            <sp-coachmark
                ?open=${open}
                current-step=${currentStep}
                total-steps=${totalSteps}
                primary-cta="次"
                secondary-cta="前の"
            >
                <div slot="title">クリック時のコーチマーク</div>
                <div slot="content">
                    これはテキストだけが入ったコーチマークです。ここはなんだか寂しいですね。
                </div>
                <div slot="step-count">4 分の 1</div>
                <sp-action-menu
                    placement="bottom-end"
                    quiet
                    slot="actions"
                    label="More Actions"
                >
                    <sp-menu-item>ツアーをスキップ</sp-menu-item>
                    <sp-menu-item>ツアー再開</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark>
        </sp-overlay>
    `;
};
export const TriggerOnHover = (props) => {
  const { open = true, currentStep = 2, totalSteps = 8 } = props;
  return html`
        <sp-coach-indicator id="trigger"></sp-coach-indicator>
        <sp-overlay
            trigger="trigger@hover"
            placement="right"
            .receivesFocus=${"false"}
            ?open=${open}
        >
            <sp-coachmark
                ?open=${open}
                current-step=${currentStep}
                total-steps=${totalSteps}
                primary-cta="Next"
                secondary-cta="Previous"
            >
                <div slot="title">Coachmark on hover</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <div slot="step-count">${currentStep} of ${totalSteps}</div>
                <sp-action-menu
                    placement="bottom-end"
                    quiet
                    slot="actions"
                    label="More Actions"
                >
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark>
        </sp-overlay>
    `;
};
export const withImage = (props) => {
  const { open = true, currentStep = 2, totalSteps = 8 } = props;
  return html`
        <sp-coachmark
            ?open=${open}
            src=${cave}
            media-type="image"
            primary-cta="Next"
            secondary-cta="Previous"
            current-step=${currentStep}
            total-steps=${totalSteps}
        >
            <div slot="title">Coachmark with Media</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
            <div slot="step-count">${currentStep} of ${totalSteps}</div>
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};
export const withGif = (props) => {
  const { open = true, currentStep = 2, totalSteps = 8 } = props;
  return html`
        <sp-coachmark
            ?open=${open}
            src=${gif}
            media-type="image"
            primary-cta="Next"
            secondary-cta="Previous"
            current-step=${currentStep}
            total-steps=${totalSteps}
        >
            <div slot="title">Coachmark with GIF</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
            <div slot="step-count">${currentStep} of ${totalSteps}</div>
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};
withGif.swc_vrt = {
  skip: true
};
withGif.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
export const withKeys = (props) => {
  const {
    modifierKeys = ["\u21E7 Shift", "\u2318"],
    heading = "Coachmark with Keys",
    content = "This is a Coachmark with nothing but text in it.",
    currentStep = 2,
    totalSteps = 8
  } = props;
  return html`
        <sp-coachmark
            open
            .modifierKeys=${modifierKeys}
            .content=${{
    title: heading,
    description: content
  }}
            primary-cta="Next"
            secondary-cta="Previous"
            current-step=${currentStep}
            total-steps=${totalSteps}
        >
            <div slot="step-count">${currentStep} of ${totalSteps}</div>
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};
export const withShortCut = (props) => {
  const { currentStep = 2, totalSteps = 8 } = props;
  return html`
        <sp-coachmark
            open
            primary-cta="Next"
            secondary-cta="Previous"
            current-step=${currentStep}
            total-steps=${totalSteps}
            shortcut-key="Z"
            .content=${{
    title: "Coachmark Shortcut",
    description: "This is a Coachmark with nothing but text in it. Kind of lonely in here"
  }}
        >
            <div slot="step-count">${currentStep} of ${totalSteps}</div>
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};
//# sourceMappingURL=coachmark.stories.js.map
