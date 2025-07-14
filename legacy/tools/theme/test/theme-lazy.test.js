"use strict";
import "@spectrum-web-components/theme/sp-theme.js";
import { Theme } from "@spectrum-web-components/theme";
import coreStyles from "@spectrum-web-components/theme/src/theme.css.js";
import lightStyles from "@spectrum-web-components/theme/src/theme-light.css.js";
import lightestStyles from "@spectrum-web-components/theme/src/theme-lightest.css.js";
import darkStyles from "@spectrum-web-components/theme/src/theme-dark.css.js";
import darkestStyles from "@spectrum-web-components/theme/src/theme-darkest.css.js";
import largeStyles from "@spectrum-web-components/theme/src/scale-large.css.js";
import mediumStyles from "@spectrum-web-components/theme/src/scale-medium.css.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
describe("Themes - lazy", () => {
  beforeEach(() => {
    Theme.themeFragmentsByKind.clear();
    Theme.registerThemeFragment("spectrum", "system", coreStyles);
  });
  after(() => {
    Theme.registerThemeFragment("light", "color", lightStyles);
    Theme.registerThemeFragment("lightest", "color", lightestStyles);
    Theme.registerThemeFragment("dark", "color", darkStyles);
    Theme.registerThemeFragment("darkest", "color", darkestStyles);
    Theme.registerThemeFragment("large", "scale", largeStyles);
    Theme.registerThemeFragment("medium", "scale", mediumStyles);
  });
  it("loads w/ no themes and none set", async () => {
    const el = await fixture(html`
            <sp-theme></sp-theme>
        `);
    await elementUpdated(el);
    if (el.shadowRoot.adoptedStyleSheets) {
      expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
    } else {
      expect(
        [...el.shadowRoot.querySelectorAll("style")].length
      ).to.equal(1);
    }
    expect(el.color).to.equal("");
    expect(el.scale).to.equal("");
  });
  it("loads w/ themes and none set", async () => {
    const el = await fixture(html`
            <sp-theme></sp-theme>
        `);
    await elementUpdated(el);
    Theme.registerThemeFragment("light", "color", lightStyles);
    Theme.registerThemeFragment("medium", "scale", mediumStyles);
    await elementUpdated(el);
    if (el.shadowRoot.adoptedStyleSheets) {
      expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
    } else {
      expect(
        [...el.shadowRoot.querySelectorAll("style")].length
      ).to.equal(1);
    }
    expect(el.color).to.equal("light");
    expect(el.scale).to.equal("medium");
  });
  it("loads w/ no themes", async () => {
    const el = await fixture(html`
            <sp-theme color="light" scale="large"></sp-theme>
        `);
    await elementUpdated(el);
    if (el.shadowRoot.adoptedStyleSheets) {
      expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
    } else {
      expect(
        [...el.shadowRoot.querySelectorAll("style")].length
      ).to.equal(1);
    }
  });
  it("loads w/ not enough themes", async () => {
    const el = await fixture(html`
            <sp-theme color="lightest" scale="large"></sp-theme>
        `);
    await elementUpdated(el);
    Theme.registerThemeFragment("light", "color", lightStyles);
    Theme.registerThemeFragment("medium", "scale", mediumStyles);
    await elementUpdated(el);
    if (el.shadowRoot.adoptedStyleSheets) {
      expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
    } else {
      expect(
        [...el.shadowRoot.querySelectorAll("style")].length
      ).to.equal(1);
    }
  });
  it("loads w/ lazy themes", async () => {
    const el = await fixture(html`
            <sp-theme color="lightest" scale="large"></sp-theme>
        `);
    await elementUpdated(el);
    Theme.registerThemeFragment("light", "color", lightStyles);
    Theme.registerThemeFragment("medium", "scale", mediumStyles);
    await elementUpdated(el);
    if (el.shadowRoot.adoptedStyleSheets) {
      expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
    } else {
      expect(
        [...el.shadowRoot.querySelectorAll("style")].length
      ).to.equal(1);
    }
    Theme.registerThemeFragment("lightest", "color", lightestStyles);
    Theme.registerThemeFragment("large", "scale", largeStyles);
    await elementUpdated(el);
    if (el.shadowRoot.adoptedStyleSheets) {
      expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(3);
    } else {
      expect(
        [...el.shadowRoot.querySelectorAll("style")].length
      ).to.equal(3);
    }
  });
});
//# sourceMappingURL=theme-lazy.test.js.map
