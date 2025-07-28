"use strict";
import { waitForPredicate } from "../../../test/testing-helpers.js";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import "@spectrum-web-components/icon/sp-icon.js";
import { IconsetRegistry } from "@spectrum-web-components/iconset/src/iconset-registry.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
describe("Iconset", () => {
  after(() => {
    const sets = [...document.querySelectorAll("sp-icons-medium")];
    sets.map((set) => set.remove());
  });
  it("warns in Dev Mode of deprecation", async () => {
    const consoleWarnStub = stub(console, "warn");
    const el = document.createElement("sp-icons-medium");
    document.body.append(el);
    await elementUpdated(el);
    expect(consoleWarnStub.called).to.be.true;
    const spyCall = consoleWarnStub.getCall(0);
    expect(
      spyCall.args.at(0).includes("deprecated"),
      "confirm deprecation message"
    ).to.be.true;
    expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
      data: {
        localName: "sp-icons-medium",
        type: "api",
        level: "deprecation"
      }
    });
    consoleWarnStub.restore();
  });
  it("will re-register with new name", async () => {
    const icons = document.createElement("sp-icons-medium");
    document.body.append(icons);
    icons.name = "first-name";
    const registry = IconsetRegistry.getInstance();
    expect(registry.getIconset("first-name")).to.not.be.undefined;
    expect(registry.getIconset("")).to.be.undefined;
    expect(registry.getIconset("second-name")).to.be.undefined;
    expect(registry.getIconset("ui")).to.be.undefined;
    icons.name = "";
    expect(registry.getIconset("first-name")).to.be.undefined;
    expect(registry.getIconset("")).to.be.undefined;
    expect(registry.getIconset("second-name")).to.be.undefined;
    expect(registry.getIconset("ui")).to.be.undefined;
    icons.name = "second-name";
    expect(registry.getIconset("first-name")).to.be.undefined;
    expect(registry.getIconset("")).to.be.undefined;
    expect(registry.getIconset("second-name")).to.not.be.undefined;
    expect(registry.getIconset("ui")).to.be.undefined;
  });
  it("will not re-register on (dis)connect without a name", async () => {
    const icons = document.createElement("sp-icons-medium");
    document.body.append(icons);
    const registry = IconsetRegistry.getInstance();
    expect(registry.getIconset("ui")).to.not.be.undefined;
    icons.name = "";
    expect(registry.getIconset("ui")).to.be.undefined;
    icons.remove();
    document.body.append(icons);
    expect(registry.getIconset("ui")).to.be.undefined;
  });
  it("renders after adding and removing a second iconset of same name", async () => {
    const icons = document.createElement("sp-icons-medium");
    document.body.append(icons);
    const icons2 = document.createElement("sp-icons-medium");
    document.body.append(icons2);
    icons2.remove();
    window.dispatchEvent(
      new CustomEvent("sp-iconset-removed", {
        detail: { name: "Other Set" }
      })
    );
    const el = await fixture(
      html`
                <sp-icon name="ui:Chevron200"></sp-icon>
            `
    );
    let svg = el.shadowRoot ? el.shadowRoot.querySelector('[role="img"]') : null;
    function getSVG() {
      svg = el.shadowRoot ? el.shadowRoot.querySelector('[role="img"]') : null;
      return svg !== null;
    }
    await waitForPredicate(getSVG);
    expect(svg).to.not.be.null;
  });
  it("can be after `<sp-icon/>` in the DOM order", async () => {
    const el = await fixture(
      html`
                <div>
                    <sp-icon name="ui:Chevron200"></sp-icon>
                    <sp-icons-medium></sp-icons-medium>
                </div>
            `
    );
    const icon = el.querySelector("sp-icon");
    const iconSet = el.querySelector("sp-icons-medium");
    await elementUpdated(iconSet);
    await elementUpdated(icon);
    const svg = icon.shadowRoot ? icon.shadowRoot.querySelector('[role="img"]') : null;
    expect(svg).to.not.be.null;
  });
});
//# sourceMappingURL=iconset.test.js.map
