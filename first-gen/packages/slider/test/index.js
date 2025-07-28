"use strict";
import {
  editable,
  hideStepper,
  Indeterminate
} from "../stories/slider.stories.js";
import { elementUpdated, expect, nextFrame } from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import { sendKeys } from "@web/test-runner-commands";
import { spy } from "sinon";
import {
  fixture,
  testForLitDevWarnings
} from "../../../test/testing-helpers.js";
import { sendMouse } from "../../../test/plugins/browser.js";
async function sliderFromFixture(sliderFixture) {
  const el = await fixture(sliderFixture({}));
  const slider = el.querySelector("sp-slider");
  return slider;
}
export const testEditableSlider = (type) => {
  describe(`Slider - editable, ${type}`, () => {
    testForLitDevWarnings(async () => await sliderFromFixture(editable));
    it("loads", async () => {
      const el = await sliderFromFixture(editable);
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
    it("loads - [hide-stepper]", async () => {
      const el = await sliderFromFixture(hideStepper);
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
    it("loads - [disabled]", async () => {
      const el = document.createElement("sp-slider");
      el.editable = true;
      el.disabled = true;
      el.label = "Disabled, editable, slider";
      try {
        document.body.append(el);
      } catch (error) {
        expect(true).to.be.false;
      }
      await elementUpdated(el);
      await expect(el).to.be.accessible();
      el.remove();
    });
    it("toggles indeterminate when edited via the `<sp-number-field>`", async () => {
      const el = await sliderFromFixture(Indeterminate);
      await elementUpdated(el);
      expect(el.value).to.equal(5);
      expect(el.indeterminate).to.be.true;
      el.focus();
      await elementUpdated(el);
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await sendKeys({ type: "15" });
      await sendKeys({ press: "Enter" });
      await elementUpdated(el);
      expect(el.value).to.equal(15);
      expect(el.indeterminate).to.be.false;
    });
    it("focuses `<sp-number-field>` directly", async () => {
      const el = await sliderFromFixture(editable);
      await elementUpdated(el);
      el.focus();
      await elementUpdated(el);
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
    });
    it("dispatches `input` of the animation frame", async () => {
      const inputSpy = spy();
      const changeSpy = spy();
      const el = await fixture(html`
                <sp-slider
                    editable
                    hide-stepper
                    min="1"
                    max="100"
                    step="1"
                    label="Slider label"
                    @input=${(event) => {
        inputSpy(event.target.value);
      }}
                    @change=${(event) => {
        changeSpy(event.target.value);
      }}
                ></sp-slider>
            `);
      await elementUpdated(el);
      expect(el.value).to.equal(50.5);
      expect(inputSpy.callCount, "start clean").to.equal(0);
      expect(changeSpy.callCount, "start clean").to.equal(0);
      const handle = el.shadowRoot.querySelector(
        ".handle"
      );
      const rect = handle.getBoundingClientRect();
      let frames = 0;
      let shouldCountFrames = true;
      const countFrames = () => {
        if (!shouldCountFrames) return;
        frames += 1;
        requestAnimationFrame(countFrames);
      };
      countFrames();
      const toRight = [...Array(51).keys()].map((i) => ({
        type: "move",
        position: [
          rect.left + rect.width / 2 + i,
          rect.top + rect.height / 2
        ]
      }));
      const toLeft = toRight.slice(0, -1).reverse();
      await sendMouse({
        steps: [
          {
            type: "move",
            position: [
              rect.left + rect.width / 2,
              rect.top + rect.height / 2
            ]
          },
          {
            type: "down"
          },
          ...toRight,
          ...toLeft,
          {
            type: "up"
          }
        ]
      });
      shouldCountFrames = false;
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      expect(el.value).to.gt(50.5);
      expect(
        inputSpy.callCount,
        'should not have more "input"s than frames'
      ).to.lte(frames);
      expect(changeSpy.callCount, "only one change").to.equal(1);
    });
    it("edits via the `<sp-number-field>`", async () => {
      var _a, _b, _c, _d;
      const inputSpy = spy();
      const changeSpy = spy();
      const el = await sliderFromFixture(editable);
      el.addEventListener("input", () => inputSpy());
      el.addEventListener("change", () => changeSpy());
      await elementUpdated(el);
      el.focus();
      await elementUpdated(el);
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
      expect(el.value).to.equal(90);
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await sendKeys({ type: "45" });
      await sendKeys({ press: "Enter" });
      await elementUpdated(el);
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
      expect(el.value).to.equal(45);
      expect(inputSpy.callCount, "one input").to.equal(1);
      expect(changeSpy.callCount, "one change").to.equal(1);
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Enter" });
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
      expect(el.value).to.equal(45);
      expect(inputSpy.callCount, "still one input").to.equal(1);
      expect(changeSpy.callCount, "still one change").to.equal(1);
      (_a = el.shadowRoot.activeElement) == null ? void 0 : _a.dispatchEvent(
        new WheelEvent("wheel", { deltaY: 1 })
      );
      await elementUpdated(el);
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
      expect(el.value).to.equal(46);
      expect(inputSpy.callCount, "still one input").to.equal(2);
      (_b = el.shadowRoot.activeElement) == null ? void 0 : _b.dispatchEvent(
        new WheelEvent("wheel", { deltaY: -1 })
      );
      await elementUpdated(el);
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
      expect(el.value).to.equal(45);
      expect(inputSpy.callCount, "still one input").to.equal(3);
      (_c = el.shadowRoot.activeElement) == null ? void 0 : _c.dispatchEvent(
        new WheelEvent("wheel", { deltaX: 1, shiftKey: true })
      );
      await elementUpdated(el);
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
      expect(el.value).to.equal(55);
      expect(inputSpy.callCount, "still one input").to.equal(4);
      (_d = el.shadowRoot.activeElement) == null ? void 0 : _d.dispatchEvent(
        new WheelEvent("wheel", { deltaX: -1, shiftKey: true })
      );
      await elementUpdated(el);
      expect(el.shadowRoot.activeElement).to.equal(el.numberField);
      expect(el.value).to.equal(45);
      expect(inputSpy.callCount, "still one input").to.equal(5);
    });
    it("focuses `<input>` after pointer interactions", async () => {
      let pointerId = -1;
      const el = await sliderFromFixture(editable);
      await elementUpdated(el);
      expect(el.dragging).to.be.false;
      expect(el.highlight).to.be.false;
      expect(pointerId).to.equal(-1);
      const handle = el.shadowRoot.querySelector(
        ".handle"
      );
      el.track.setPointerCapture = (id) => pointerId = id;
      el.track.releasePointerCapture = (id) => pointerId = id;
      handle.dispatchEvent(
        new PointerEvent("pointerdown", {
          button: 1,
          pointerId: 1,
          cancelable: true,
          bubbles: true,
          composed: true,
          pointerType: "mouse"
        })
      );
      await elementUpdated(el);
      expect(el.dragging).to.be.false;
      expect(pointerId, "1").to.equal(-1);
      handle.dispatchEvent(
        new PointerEvent("pointerdown", {
          button: 0,
          pointerId: 1,
          cancelable: true,
          bubbles: true,
          composed: true,
          pointerType: "mouse"
        })
      );
      await elementUpdated(el);
      expect(el.dragging, "it is dragging 1").to.be.true;
      expect(pointerId, "2").to.equal(1);
      handle.dispatchEvent(
        new PointerEvent("pointerup", {
          pointerId: 2,
          cancelable: true,
          bubbles: true,
          composed: true,
          pointerType: "mouse"
        })
      );
      await elementUpdated(el);
      expect(el.dragging).to.be.false;
      expect(el.highlight).to.be.false;
      expect(pointerId, "3").to.equal(2);
      handle.dispatchEvent(
        new PointerEvent("pointerdown", {
          button: 0,
          pointerId: 1,
          cancelable: true,
          bubbles: true,
          composed: true,
          pointerType: "mouse"
        })
      );
      await elementUpdated(el);
      expect(el.dragging, "it is dragging 2").to.be.true;
      expect(pointerId, "4").to.equal(1);
      handle.dispatchEvent(
        new PointerEvent("pointercancel", {
          pointerId: 3,
          cancelable: true,
          bubbles: true,
          composed: true,
          pointerType: "mouse"
        })
      );
      await elementUpdated(el);
      expect(el.dragging).to.be.false;
      expect(pointerId, "5").to.equal(3);
      expect(el.shadowRoot.activeElement).to.equal(
        el.handleController.inputForHandle(el)
      );
    });
    it("dispatches `input` on track interaction after handle interaction", async () => {
      const inputSpy = spy();
      const changeSpy = spy();
      const el = await fixture(html`
                <sp-slider
                    editable
                    hide-stepper
                    min="1"
                    max="100"
                    step="1"
                    label="Slider label"
                    @input=${(event) => {
        inputSpy(event.target.value);
      }}
                    @change=${(event) => {
        changeSpy(event.target.value);
      }}
                ></sp-slider>
            `);
      await elementUpdated(el);
      expect(el.value).to.equal(50.5);
      expect(inputSpy.callCount, "start clean").to.equal(0);
      expect(changeSpy.callCount, "start clean").to.equal(0);
      const handle = el.shadowRoot.querySelector(
        ".handle"
      );
      const rect = handle.getBoundingClientRect();
      await sendMouse({
        steps: [
          {
            type: "move",
            position: [
              rect.left + rect.width / 2,
              rect.top + rect.height / 2
            ]
          },
          {
            type: "down"
          },
          { type: "up" }
        ]
      });
      await elementUpdated(el);
      expect(changeSpy.callCount, "one change").to.equal(1);
      expect(inputSpy.callCount, "no input").to.equal(0);
      await sendMouse({
        steps: [
          {
            type: "move",
            position: [
              rect.left - rect.width,
              rect.top + rect.height / 2
            ]
          },
          {
            type: "down"
          },
          { type: "up" }
        ]
      });
      await elementUpdated(el);
      expect(changeSpy.callCount, "one additional change").to.equal(2);
      expect(inputSpy.callCount, "one input").to.equal(1);
    });
  });
};
//# sourceMappingURL=index.js.map
