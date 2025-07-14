"use strict";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import { illustration } from "./test-svg.js";
import { waitForPredicate } from "../../../test/testing-helpers.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
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
                        <input
                            type="file"
                            id="file-input"
                            style="display: none"
                        />
                    </div>
                    <div>
                        or
                        <sp-link href="http://stock.adobe.com" target="blank">
                            Search Adobe Stock
                        </sp-link>
                    </div>
                </div>
            </sp-dropzone>
        `);
    expect(el).to.not.equal(void 0);
    if (!el.shadowRoot) throw new Error("No shadowRoot");
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
  it("manages `dragleave` events", async () => {
    let dropped = false;
    const onDrop = () => {
      dropped = true;
    };
    const el = await fixture(html`
            <sp-dropzone
                id="dropzone"
                @sp-dropzone-drop=${onDrop}
            ></sp-dropzone>
        `);
    await elementUpdated(el);
    expect(dropped).to.be.false;
    el.dispatchEvent(new DragEvent("drop"));
    expect(dropped).to.be.true;
  });
  it("sets `filled` attribute", async () => {
    const el = await fixture(html`
            <sp-dropzone id="dropzone" filled></sp-dropzone>
        `);
    await elementUpdated(el);
    expect(el.isFilled).to.be.true;
    expect(el.hasAttribute("filled")).to.be.true;
  });
});
//# sourceMappingURL=dropzone.test.js.map
