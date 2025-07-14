"use strict";
import { html, LitElement } from "lit";
import { expect, fixture, nextFrame } from "@open-wc/testing";
import { setViewport } from "@web/test-runner-commands";
import { MatchMediaController } from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
class TestEl extends LitElement {
}
customElements.define("test-match-media-el", TestEl);
describe("Match Media", () => {
  it("responds to media changes", async () => {
    const el = await fixture(
      html`
                <test-match-media-el></test-match-media-el>
            `
    );
    const controller = new MatchMediaController(
      el,
      "(min-width: 500px)"
    );
    await nextFrame();
    await nextFrame();
    expect(controller.matches).to.be.true;
    await setViewport({ width: 360, height: 640 });
    await nextFrame();
    await nextFrame();
    expect(controller.matches).to.be.false;
  });
});
//# sourceMappingURL=match-media.test.js.map
