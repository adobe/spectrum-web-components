"use strict";
import { expect, fixture, html } from "@open-wc/testing";
import { reparentChildren } from "@spectrum-web-components/shared/src/reparent-children.js";
describe("Reparent Children", () => {
  it("reparents and returns a single child", async () => {
    const context = await fixture(html`
            <div>
                <div class="source">
                    <div class="child"></div>
                </div>
                <div class="destination"></div>
            </div>
        `);
    const source = context.querySelector(".source");
    const child = context.querySelector(".child");
    const destination = context.querySelector(
      ".destination"
    );
    expect(source.children.length).to.equal(1);
    expect(destination.children.length).to.equal(0);
    const restore = reparentChildren([child], destination);
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(1);
    restore();
    expect(source.children.length).to.equal(1);
    expect(destination.children.length).to.equal(0);
  });
  it("early exits no children", async () => {
    const context = await fixture(html`
            <div>
                <div class="source"></div>
                <div class="destination"></div>
            </div>
        `);
    const source = context.querySelector(".source");
    const children = [...source.children];
    const destination = context.querySelector(
      ".destination"
    );
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(0);
    const restore = reparentChildren(children, destination);
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(0);
    restore();
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(0);
  });
  it("reparents and returns multiple child", async () => {
    const context = await fixture(html`
            <div>
                <div class="source">
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                </div>
                <div class="destination"></div>
            </div>
        `);
    const source = context.querySelector(".source");
    const { children } = source;
    const destination = context.querySelector(
      ".destination"
    );
    expect(source.children.length).to.equal(5);
    expect(destination.children.length).to.equal(0);
    const restore = reparentChildren([...children], destination);
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(5);
    restore();
    expect(source.children.length).to.equal(5);
    expect(destination.children.length).to.equal(0);
  });
  it("augments the child via a callback", async () => {
    const context = await fixture(html`
            <div>
                <div class="source">
                    <div class="child" slot="slot"></div>
                </div>
                <div class="destination"></div>
            </div>
        `);
    const child = context.querySelector(".child");
    const destination = context.querySelector(
      ".destination"
    );
    expect(child.getAttribute("slot")).to.equal("slot");
    const restore = reparentChildren([child], destination, {
      position: "beforeend",
      prepareCallback: (el) => {
        const slotName = el.slot;
        el.removeAttribute("slot");
        return (el2) => {
          el2.slot = slotName;
        };
      }
    });
    expect(child.hasAttribute("slot")).to.be.false;
    restore();
    expect(child.getAttribute("slot")).to.equal("slot");
  });
  it("beforeend - reparents and returns multiple children", async () => {
    var _a, _b, _c, _d;
    const context = await fixture(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="destination">
                    <div class="marker"></div>
                </div>
            </div>
        `);
    const source = context.querySelector(".source");
    const { children } = source;
    const destination = context.querySelector(
      ".destination"
    );
    expect(source.children.length).to.equal(5);
    expect(destination.children.length).to.equal(1);
    const restore = reparentChildren([...children], destination, {
      position: "beforeend"
    });
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(5 + 1);
    const marker = context.querySelector(".marker");
    expect(marker.previousElementSibling).to.be.null;
    expect((_a = marker.nextElementSibling) == null ? void 0 : _a.textContent).to.equal("1");
    expect((_b = destination.lastElementChild) == null ? void 0 : _b.textContent).to.equal("5");
    restore();
    expect(source.children.length).to.equal(5);
    expect(destination.children.length).to.equal(1);
    expect((_c = source.firstElementChild) == null ? void 0 : _c.textContent).to.equal("1");
    expect((_d = source.lastElementChild) == null ? void 0 : _d.textContent).to.equal("5");
  });
  it("afterbegin - reparents and returns multiple children", async () => {
    var _a, _b, _c, _d;
    const context = await fixture(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="destination">
                    <div class="marker"></div>
                </div>
            </div>
        `);
    const source = context.querySelector(".source");
    const { children } = source;
    const destination = context.querySelector(
      ".destination"
    );
    expect(source.children.length).to.equal(5);
    expect(destination.children.length).to.equal(1);
    const restore = reparentChildren([...children], destination, {
      position: "afterbegin"
    });
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(5 + 1);
    const marker = context.querySelector(".marker");
    expect(marker.nextElementSibling).to.be.null;
    expect((_a = marker.previousElementSibling) == null ? void 0 : _a.textContent).to.equal("5");
    expect((_b = destination.firstElementChild) == null ? void 0 : _b.textContent).to.equal("1");
    restore();
    expect(source.children.length).to.equal(5);
    expect(destination.children.length).to.equal(1);
    expect((_c = source.firstElementChild) == null ? void 0 : _c.textContent).to.equal("1");
    expect((_d = source.lastElementChild) == null ? void 0 : _d.textContent).to.equal("5");
  });
  it("beforebegin - reparents and returns multiple children", async () => {
    var _a, _b, _c, _d;
    const context = await fixture(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="marker"></div>
                <div class="destination"></div>
            </div>
        `);
    const source = context.querySelector(".source");
    const { children } = source;
    const destination = context.querySelector(
      ".destination"
    );
    expect(source.children.length).to.equal(5);
    const restore = reparentChildren([...children], destination, {
      position: "beforebegin"
    });
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(0);
    const marker = context.querySelector(".marker");
    expect(marker.previousElementSibling).to.not.be.null;
    expect((_a = marker.nextElementSibling) == null ? void 0 : _a.textContent).to.equal("1");
    expect((_b = destination.previousElementSibling) == null ? void 0 : _b.textContent).to.equal("5");
    restore();
    expect(source.children.length).to.equal(5);
    expect(marker.nextElementSibling).to.equal(destination);
    expect((_c = source.firstElementChild) == null ? void 0 : _c.textContent).to.equal("1");
    expect((_d = source.lastElementChild) == null ? void 0 : _d.textContent).to.equal("5");
  });
  it("afterend - reparents and returns multiple children", async () => {
    var _a, _b, _c, _d;
    const context = await fixture(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="destination"></div>
                <div class="marker"></div>
            </div>
        `);
    const source = context.querySelector(".source");
    const { children } = source;
    const destination = context.querySelector(
      ".destination"
    );
    expect(source.children.length).to.equal(5);
    const marker = context.querySelector(".marker");
    expect(marker.previousElementSibling).to.equal(destination);
    expect(marker.nextElementSibling).to.be.null;
    const restore = reparentChildren([...children], destination, {
      position: "afterend"
    });
    expect(source.children.length).to.equal(0);
    expect(destination.children.length).to.equal(0);
    expect((_a = destination.nextElementSibling) == null ? void 0 : _a.textContent).to.equal("1");
    expect((_b = marker.previousElementSibling) == null ? void 0 : _b.textContent).to.equal("5");
    restore();
    expect(source.children.length).to.equal(5);
    expect(marker.previousElementSibling).to.equal(destination);
    expect((_c = source.firstElementChild) == null ? void 0 : _c.textContent).to.equal("1");
    expect((_d = source.lastElementChild) == null ? void 0 : _d.textContent).to.equal("5");
  });
});
//# sourceMappingURL=reparent-children.test.js.map
