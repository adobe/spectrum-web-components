"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
import "@spectrum-web-components/avatar/sp-avatar.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Avatar", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
        <sp-avatar
          label="Shantanu Narayen"
          src="https://picsum.photos/500/500"
        ></sp-avatar>
      `)
  );
  it("loads accessibly", async () => {
    const el = await fixture(html`
      <sp-avatar
        label="Shantanu Narayen"
        src="https://picsum.photos/500/500"
      ></sp-avatar>
    `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads accessibly with [href]", async () => {
    const el = await fixture(html`
      <sp-avatar
        label="Shantanu Narayen"
        src="https://picsum.photos/500/500"
        href="https://adobe.com"
      ></sp-avatar>
    `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("validates `size`", async () => {
    const el = await fixture(html`
      <sp-avatar
        label="Shantanu Narayen"
        src="https://picsum.photos/500/500"
      ></sp-avatar>
    `);
    await elementUpdated(el);
    expect(el.size).to.equal(100);
    el.setAttribute("size", "55");
    await elementUpdated(el);
    expect(el.size).to.equal(100);
    el.setAttribute("size", "600");
    await elementUpdated(el);
    expect(el.size).to.equal(600);
  });
  it("loads with everything set", async () => {
    const el = await fixture(html`
      <sp-avatar
        label="Shantanu Narayen"
        src="https://picsum.photos/500/500"
      ></sp-avatar>
    `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const imageEl = el.shadowRoot ? el.shadowRoot.querySelector("img") : el.querySelector("img");
    expect(imageEl.hasAttribute("alt")).to.be.true;
    expect(imageEl.getAttribute("alt")).to.equal("Shantanu Narayen");
  });
  it("loads with no label", async () => {
    const el = await fixture(html`
      <sp-avatar src="https://picsum.photos/500/500"></sp-avatar>
    `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const imageEl = el.shadowRoot ? el.shadowRoot.querySelector("img") : el.querySelector("img");
    expect(imageEl.hasAttribute("alt")).to.be.true;
    expect(imageEl.getAttribute("alt")).to.equal("");
  });
  it("loads with is-decorative attribute", async () => {
    const el = await fixture(html`
      <sp-avatar is-decorative src="https://picsum.photos/500/500"></sp-avatar>
    `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    expect(el.isDecorative).to.be.true;
    const imageEl = el.shadowRoot ? el.shadowRoot.querySelector("img") : el.querySelector("img");
    expect(imageEl.hasAttribute("alt")).to.be.true;
    expect(imageEl.getAttribute("alt")).to.equal("");
    expect(imageEl.getAttribute("aria-hidden")).to.equal("true");
  });
  it("loads accessibly with is-decorative", async () => {
    const el = await fixture(html`
      <sp-avatar is-decorative src="https://picsum.photos/500/500"></sp-avatar>
    `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads accessibly with is-decorative and href when label is provided", async () => {
    const el = await fixture(html`
      <sp-avatar
        is-decorative
        label="User profile"
        src="https://picsum.photos/500/500"
        href="https://adobe.com"
      ></sp-avatar>
    `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("does not set aria-hidden when is-decorative is true with href but no label", async () => {
    const el = await fixture(html`
      <sp-avatar
        is-decorative
        src="https://picsum.photos/500/500"
        href="https://adobe.com"
      ></sp-avatar>
    `);
    await elementUpdated(el);
    const imageEl = el.shadowRoot ? el.shadowRoot.querySelector("img") : el.querySelector("img");
    expect(imageEl.hasAttribute("aria-hidden")).to.be.false;
    expect(imageEl.getAttribute("alt")).to.equal("");
  });
  it("label takes precedence over is-decorative", async () => {
    const el = await fixture(html`
      <sp-avatar
        label="Shantanu Narayen"
        is-decorative
        src="https://picsum.photos/500/500"
      ></sp-avatar>
    `);
    await elementUpdated(el);
    const imageEl = el.shadowRoot ? el.shadowRoot.querySelector("img") : el.querySelector("img");
    expect(imageEl.getAttribute("alt")).to.equal("Shantanu Narayen");
    expect(imageEl.hasAttribute("aria-hidden")).to.be.false;
  });
  it("can receive a `tabindex` without an `href`", async () => {
    try {
      const el = await fixture(html`
        <sp-avatar
          label="Shantanu Narayen"
          src="https://picsum.photos/500/500"
          tabindex="0"
        ></sp-avatar>
      `);
      await elementUpdated(el);
      const focusEl = el.focusElement;
      expect(focusEl).to.exist;
    } catch (error) {
      expect(() => {
        throw error;
      }).to.throw("There should be no error.");
    }
  });
  describe("dev mode", () => {
    let consoleWarnStub;
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
    it("does not warn about accessibility when label is provided", async () => {
      const el = await fixture(html`
        <sp-avatar
          label="Shantanu Narayen"
          src="https://picsum.photos/500/500"
        ></sp-avatar>
      `);
      await elementUpdated(el);
      const accessibilityWarnCalled = consoleWarnStub.args.some(
        (args) => args[0].includes("accessible")
      );
      expect(accessibilityWarnCalled, "no accessibility warning").to.be.false;
    });
    it("does not warn about accessibility when is-decorative is provided", async () => {
      const el = await fixture(html`
        <sp-avatar
          is-decorative
          src="https://picsum.photos/500/500"
        ></sp-avatar>
      `);
      await elementUpdated(el);
      const accessibilityWarnCalled = consoleWarnStub.args.some(
        (args) => args[0].includes("accessible")
      );
      expect(accessibilityWarnCalled, "no accessibility warning").to.be.false;
    });
    it('warns about deprecated "label" attribute', async () => {
      const el = await fixture(html`
        <sp-avatar
          label="Shantanu Narayen"
          src="https://picsum.photos/500/500"
        ></sp-avatar>
      `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args[0].includes("deprecated"),
        "confirm deprecation message"
      ).to.be.true;
      expect(
        spyCall.args[0].includes('"label"'),
        "confirm label attribute named"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-avatar",
          type: "api",
          level: "deprecation"
        }
      });
    });
    it('warns about deprecated "is-decorative" attribute', async () => {
      const el = await fixture(html`
        <sp-avatar
          is-decorative
          src="https://picsum.photos/500/500"
        ></sp-avatar>
      `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args[0].includes("deprecated"),
        "confirm deprecation message"
      ).to.be.true;
      expect(
        spyCall.args[0].includes('"is-decorative"'),
        "confirm is-decorative attribute named"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-avatar",
          type: "api",
          level: "deprecation"
        }
      });
    });
    it('warns about deprecated "href" attribute', async () => {
      const el = await fixture(html`
        <sp-avatar
          label="Shantanu Narayen"
          src="https://picsum.photos/500/500"
          href="https://adobe.com"
        ></sp-avatar>
      `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const deprecationCalls = consoleWarnStub.args.filter(
        (args) => args[0].includes('"href"')
      );
      expect(deprecationCalls.length, "href deprecation warn fired").to.be.gte(
        1
      );
      const spyCall = consoleWarnStub.getCalls().find(
        (call) => call.args[0].includes('"href"')
      );
      expect(
        spyCall.args[0].includes("deprecated"),
        "confirm deprecation message"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-avatar",
          type: "api",
          level: "deprecation"
        }
      });
    });
    it("warns when neither label nor is-decorative is provided", async () => {
      const el = await fixture(html`
        <sp-avatar src="https://picsum.photos/500/500"></sp-avatar>
      `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args[0].includes("accessible"),
        "confirm accessibility-centric message"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-avatar",
          type: "accessibility",
          level: "default"
        }
      });
    });
    it("warns when is-decorative and href are provided without label", async () => {
      const el = await fixture(html`
        <sp-avatar
          is-decorative
          src="https://picsum.photos/500/500"
          href="https://adobe.com"
        ></sp-avatar>
      `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args[0].includes("is-decorative"),
        "confirm decorative link message"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-avatar",
          type: "accessibility",
          level: "default"
        }
      });
    });
  });
});
//# sourceMappingURL=avatar.test.js.map
