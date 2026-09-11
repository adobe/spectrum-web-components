"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
import { Dropzone } from "@spectrum-web-components/dropzone";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import { waitForPredicate } from "../../../test/testing-helpers.js";
import { illustration } from "./test-svg.js";
describe("Dropzone", () => {
  it("loads", async () => {
    const el = await fixture(html`
      <sp-dropzone id="dropzone">
        <sp-illustrated-message heading="Drag and Drop Your File">
          ${illustration}
        </sp-illustrated-message>

        <div style="color: grey">
          <div>
            <label for="file-input">
              <sp-link>Select a File</sp-link>
              from your computer
            </label>
            <input type="file" id="file-input" style="display: none" />
          </div>
          <div>
            or
            <sp-link href="http://stock.adobe.com" target="_blank">
              Search Adobe Stock
            </sp-link>
          </div>
        </div>
      </sp-dropzone>
    `);
    expect(el).to.not.equal(void 0);
    if (!el.shadowRoot) {
      throw new Error("No shadowRoot");
    }
    const slot = el.shadowRoot.querySelector("slot");
    expect(slot).to.not.equal(void 0);
    return true;
  });
  it("manages `dropEffects`", async () => {
    const el = await fixture(html`
      <sp-dropzone id="dropzone"></sp-dropzone>
    `);
    await elementUpdated(el);
    expect(el.dropEffect).to.equal("copy");
    el.dropEffect = "move";
    await elementUpdated(el);
    expect(el.dropEffect).to.equal("move");
  });
  it("manages `dragover` events", async () => {
    const el = await fixture(html`
      <sp-dropzone id="dropzone"></sp-dropzone>
    `);
    await elementUpdated(el);
    expect(el.isDragged).to.be.false;
    el.dispatchEvent(new DragEvent("dragover"));
    expect(el.isDragged).to.be.false;
    let dataTransfer = false;
    try {
      dataTransfer = new DataTransfer();
    } catch (error) {
    }
    if (dataTransfer) {
      const dragOverEvent = new DragEvent("dragover", {
        dataTransfer
      });
      el.dispatchEvent(dragOverEvent);
      expect(el.isDragged).to.be.true;
    }
  });
  it("allows `dragover` events to be canceled", async () => {
    const canceledDrag = (event) => {
      event.preventDefault();
    };
    const el = await fixture(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-should-accept=${canceledDrag}
      ></sp-dropzone>
    `);
    await elementUpdated(el);
    expect(el.isDragged).to.be.false;
    let dataTransfer = false;
    try {
      dataTransfer = new DataTransfer();
    } catch (error) {
    }
    if (dataTransfer) {
      const dragOverEvent = new DragEvent("dragover", {
        dataTransfer
      });
      el.dispatchEvent(dragOverEvent);
      expect(el.isDragged).to.be.false;
      expect(dataTransfer.dropEffect).to.not.equal(el.dropEffect);
      expect(dataTransfer.dropEffect).to.equal("none");
    }
  });
  it("always prevents default on `dragover` for cross-platform drop support", async () => {
    const el = await fixture(html`
      <sp-dropzone id="dropzone"></sp-dropzone>
    `);
    await elementUpdated(el);
    const dragOverWithoutTransfer = new DragEvent("dragover", {
      cancelable: true
    });
    el.dispatchEvent(dragOverWithoutTransfer);
    expect(
      dragOverWithoutTransfer.defaultPrevented,
      "dragover is prevented even without dataTransfer"
    ).to.be.true;
    let dataTransfer = false;
    try {
      dataTransfer = new DataTransfer();
    } catch (error) {
    }
    if (dataTransfer) {
      const dragOverWithTransfer = new DragEvent("dragover", {
        cancelable: true,
        dataTransfer
      });
      el.dispatchEvent(dragOverWithTransfer);
      expect(
        dragOverWithTransfer.defaultPrevented,
        "dragover is prevented with dataTransfer"
      ).to.be.true;
    }
  });
  it("prevents default on `dragover` even when `should-accept` is canceled", async () => {
    const rejectDrag = (event) => {
      event.preventDefault();
    };
    const el = await fixture(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-should-accept=${rejectDrag}
      ></sp-dropzone>
    `);
    await elementUpdated(el);
    let dataTransfer = false;
    try {
      dataTransfer = new DataTransfer();
    } catch (error) {
    }
    if (dataTransfer) {
      const dragOverEvent = new DragEvent("dragover", {
        cancelable: true,
        dataTransfer
      });
      el.dispatchEvent(dragOverEvent);
      expect(
        dragOverEvent.defaultPrevented,
        "dragover is still prevented so the browser allows the drop gesture"
      ).to.be.true;
      expect(dataTransfer.dropEffect).to.equal("none");
    }
  });
  it("manages `dragleave` events via debounce", async () => {
    let dragLeftCount = 0;
    const onDragLeave = () => {
      dragLeftCount += 1;
    };
    const el = await fixture(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-dragleave=${onDragLeave}
      ></sp-dropzone>
    `);
    await elementUpdated(el);
    expect(dragLeftCount).to.equal(0);
    el.dispatchEvent(new DragEvent("dragleave"));
    el.dispatchEvent(new DragEvent("dragleave"));
    await waitForPredicate(() => dragLeftCount === 1);
    expect(dragLeftCount).to.equal(1);
  });
  it("ignores `dragleave` when moving between children", async () => {
    let dragLeftCount = 0;
    const onDragLeave = () => {
      dragLeftCount += 1;
    };
    const el = await fixture(html`
      <sp-dropzone id="dropzone" @sp-dropzone-dragleave=${onDragLeave}>
        <div id="child-a">A</div>
        <div id="child-b">B</div>
      </sp-dropzone>
    `);
    await elementUpdated(el);
    el.isDragged = true;
    const childB = el.querySelector("#child-b");
    const internalLeave = new DragEvent("dragleave", {
      bubbles: true,
      relatedTarget: childB
    });
    el.dispatchEvent(internalLeave);
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(
      dragLeftCount,
      "dragleave is suppressed when relatedTarget is an internal child"
    ).to.equal(0);
    expect(el.isDragged).to.be.true;
  });
  it("fires `sp-dropzone-drop` on drop", async () => {
    let dropped = false;
    const onDrop = () => {
      dropped = true;
    };
    const el = await fixture(html`
      <sp-dropzone id="dropzone" @sp-dropzone-drop=${onDrop}></sp-dropzone>
    `);
    await elementUpdated(el);
    expect(dropped).to.be.false;
    el.isDragged = true;
    el.dispatchEvent(new DragEvent("drop"));
    expect(dropped).to.be.true;
  });
  it("does not fire `sp-dropzone-drop` when `should-accept` is cancelled", async () => {
    let dropped = false;
    const rejectDrag = (event) => {
      event.preventDefault();
    };
    const onDrop = () => {
      dropped = true;
    };
    const el = await fixture(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-should-accept=${rejectDrag}
        @sp-dropzone-drop=${onDrop}
      ></sp-dropzone>
    `);
    await elementUpdated(el);
    let dataTransfer = false;
    try {
      dataTransfer = new DataTransfer();
    } catch (error) {
    }
    if (dataTransfer) {
      el.dispatchEvent(new DragEvent("dragover", { dataTransfer }));
      expect(el.isDragged).to.be.false;
      el.dispatchEvent(new DragEvent("drop"));
      expect(dropped, "sp-dropzone-drop should not fire for rejected drags").to.be.false;
    }
  });
  it("clears pending dragleave timeout on disconnect", async () => {
    let dragLeftCount = 0;
    const onDragLeave = () => {
      dragLeftCount += 1;
    };
    const el = await fixture(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-dragleave=${onDragLeave}
      ></sp-dropzone>
    `);
    await elementUpdated(el);
    el.dispatchEvent(new DragEvent("dragleave"));
    el.remove();
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(
      dragLeftCount,
      "dragleave callback does not fire after disconnect"
    ).to.equal(0);
  });
  it("sets `filled` attribute", async () => {
    const el = await fixture(html`
      <sp-dropzone id="dropzone" filled></sp-dropzone>
    `);
    await elementUpdated(el);
    expect(el.isFilled).to.be.true;
    expect(el.hasAttribute("filled")).to.be.true;
  });
  describe("dev mode", () => {
    let consoleWarnStub;
    const warnedAbout = (fragment) => consoleWarnStub.args.some(
      (args) => args[0].includes(fragment)
    );
    before(() => {
      window.__swc.verbose = true;
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(() => {
      window.__swc.verbose = false;
      consoleWarnStub.restore();
    });
    it("does not warn about `isDragged` during normal drag interaction", async () => {
      const el = await fixture(html`
        <sp-dropzone id="dropzone"></sp-dropzone>
      `);
      await elementUpdated(el);
      consoleWarnStub.resetHistory();
      let dataTransfer = false;
      try {
        dataTransfer = new DataTransfer();
      } catch (error) {
      }
      if (dataTransfer) {
        el.dispatchEvent(new DragEvent("dragover", { dataTransfer }));
        await elementUpdated(el);
        expect(
          warnedAbout('"isDragged"'),
          "does not warn about isDragged from internal drag handling"
        ).to.be.false;
      }
    });
    it("does not warn about `isFilled` when set via attribute binding", async () => {
      const el = await fixture(html`
        <sp-dropzone id="dropzone" filled></sp-dropzone>
      `);
      await elementUpdated(el);
      expect(
        warnedAbout('"isFilled"'),
        "does not warn about isFilled from the unchanged `filled` attribute"
      ).to.be.false;
    });
    it("warns about the upcoming event name prefix change on dragover", async () => {
      const el = await fixture(html`
        <sp-dropzone id="dropzone"></sp-dropzone>
      `);
      await elementUpdated(el);
      consoleWarnStub.resetHistory();
      let dataTransfer = false;
      try {
        dataTransfer = new DataTransfer();
      } catch (error) {
      }
      if (dataTransfer) {
        el.dispatchEvent(new DragEvent("dragover", { dataTransfer }));
        expect(
          warnedAbout("swc-dropzone-"),
          "warns about the event prefix change"
        ).to.be.true;
      }
    });
    it("warns when a subclass overrides `onDragOver`, `onDragLeave`, or `onDrop`", async () => {
      class OverriddenDropzone extends Dropzone {
        onDragOver(event) {
          super.onDragOver(event);
        }
      }
      if (!customElements.get("overridden-dropzone")) {
        customElements.define("overridden-dropzone", OverriddenDropzone);
      }
      const el = await fixture(html`
        <overridden-dropzone id="overridden-dropzone"></overridden-dropzone>
      `);
      await elementUpdated(el);
      expect(
        warnedAbout('"onDragOver"'),
        "warns about overridden handler methods"
      ).to.be.true;
    });
    it("does not warn about overridden handler methods when not subclassed", async () => {
      const el = await fixture(html`
        <sp-dropzone id="dropzone"></sp-dropzone>
      `);
      await elementUpdated(el);
      expect(
        warnedAbout('"onDragOver"'),
        "does not warn about overridden handler methods"
      ).to.be.false;
    });
  });
});
//# sourceMappingURL=dropzone.test.js.map
