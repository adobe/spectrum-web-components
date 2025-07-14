"use strict";
import { expect } from "@open-wc/testing";
import Color from "colorjs.io";
import {
  ColorController
} from "@spectrum-web-components/reactive-controllers/src/ColorController.js";
describe("ColorController", () => {
  let host;
  let colorController;
  beforeEach(() => {
    host = {};
    host.requestUpdate = () => {
    };
    colorController = new ColorController(host);
  });
  it("should initialize correctly", () => {
    expect(colorController).to.exist;
    expect(colorController.color).to.be.instanceOf(Color);
  });
  it("should validate color strings correctly", () => {
    const validRgba = "rgba(255, 0, 0, 1)";
    const validHsla = "hsla(120, 100%, 50%, 0.5)";
    const validHsva = "hsva(240, 100%, 100%, 0.75)";
    const invalidColor = "invalidColor";
    expect(colorController.validateColorString(validRgba).isValid).to.be.true;
    expect(colorController.validateColorString(validHsla).isValid).to.be.true;
    expect(colorController.validateColorString(validHsva).isValid).to.be.true;
    expect(colorController.validateColorString(invalidColor).isValid).to.be.false;
  });
  it("should process RGB values in percentage correctly", () => {
    const colorString = "rgb(50%, 25%, 75%)";
    const result = colorController.validateColorString(colorString);
    expect(result.isValid).to.be.true;
    expect(result.coords).to.deep.equal([0.5, 0.25, 0.75]);
    expect(result.spaceId).to.equal("srgb");
  });
  it("should default alpha to 1 when alpha is undefined in RGBA", () => {
    const colorString = "rgb(255, 0, 0)";
    const result = colorController.validateColorString(colorString);
    expect(result.alpha).to.equal(1);
    expect(result.isValid).to.be.true;
    expect(result.coords).to.deep.equal([1, 0, 0]);
    expect(result.spaceId).to.equal("srgb");
  });
  it("should handle invalid color strings by trying to create a new Color object with a prefixed #", () => {
    const invalidColorString = "invalidColor";
    const validHexColorString = "ff0000";
    colorController.color = invalidColorString;
    expect(colorController.color.toString()).to.equal(
      new Color("hsv", [0, 100, 100], 1).toString()
    );
    colorController.color = validHexColorString;
    expect(colorController.color.toString()).to.equal(
      new Color(`#${validHexColorString}`).toString()
    );
  });
  it("should set color correctly with string input", () => {
    const colorString = "rgba(255, 0, 0, 1)";
    colorController.color = colorString;
    expect(colorController.color.toString()).to.equal(
      new Color(colorString).toString()
    );
  });
  it("should set color correctly with object input", () => {
    const colorObject = { r: 255, g: 0, b: 0, a: 1 };
    colorController.color = colorObject;
  });
  it("should get color value correctly", () => {
    let colorString = "rgba(255, 0, 0, 0.7)";
    colorController.color = colorString;
    expect(colorController.colorValue).to.equal(colorString);
    colorString = "hsla(120, 100%, 50%, 0.5)";
    colorController.color = colorString;
    expect(colorController.colorValue).to.equal(colorString);
  });
  it("should get and set hue correctly", () => {
    colorController.hue = 180;
    expect(colorController.hue).to.equal(180);
  });
  it("should convert color correctly", () => {
    const colorString = "rgba(255, 0, 0, 1)";
    colorController.color = colorString;
    expect(colorController.getColor("hsl")).to.be.an("object");
  });
  it("should get HSL string correctly", () => {
    const colorString = "rgba(255, 0, 0, 1)";
    colorController.color = colorString;
    expect(colorController.getHslString()).to.equal(
      new Color(colorString).to("hsl").toString()
    );
  });
  it("should process hex color values correctly when alpha is defined", () => {
    const colorString = "#ff573380";
    colorController.color = colorString;
    expect(colorController.color.toString()).to.equal(
      new Color(colorString).toString()
    );
  });
  it("should process hex color values correctly when alpha is not defined", () => {
    const colorString = "#ff5733";
    colorController.color = colorString;
    expect(colorController.color.toString()).to.equal(
      new Color(colorString).toString()
    );
  });
  it("should save and restore previous color correctly", () => {
    const colorString = "rgba(255, 0, 0, 1)";
    colorController.color = colorString;
    colorController.savePreviousColor();
    colorController.color = "rgba(0, 255, 0, 1)";
    colorController.restorePreviousColor();
    expect(colorController.color.toString()).to.equal(
      new Color(colorString).toString()
    );
  });
  it("should return correct color value for hsv spaceId", () => {
    colorController.color = "hsv(120, 100%, 50%)";
    const result = colorController.colorValue;
    expect(result).to.equal("hsv(120, 100%, 50%)");
  });
  it("should return correct color value for hsva spaceId", () => {
    colorController.color = "hsva(120, 100%, 50%, 0.5)";
    const result = colorController.colorValue;
    expect(result).to.equal("hsva(120, 100%, 50%, 0.5)");
  });
  it("should return correct color value for hsl spaceId", () => {
    colorController.color = "hsl(120, 100%, 50%)";
    const result = colorController.colorValue;
    expect(result).to.equal("hsl(120, 100%, 50%)");
  });
  it("should return correct color value for hsla spaceId", () => {
    colorController.color = "hsla(120, 100%, 50%, 0.5)";
    const result = colorController.colorValue;
    expect(result).to.equal("hsla(120, 100%, 50%, 0.5)");
  });
  it("should return correct color value for hex string spaceId", () => {
    colorController.color = "#ff5733";
    const result = colorController.colorValue;
    expect(result).to.equal("#ff5733");
  });
  it("should return correct color value for hex string spaceId with alpha", () => {
    colorController.color = "#ff573380";
    const result = colorController.colorValue;
    expect(result).to.equal("#ff573380");
  });
  it("should return correct color value for default spaceId with hex origin", () => {
    colorController.color = "#ff5733";
    const result = colorController.colorValue;
    expect(result).to.equal("#ff5733");
  });
  it("should return correct color value for default spaceId with hex origin and alpha", () => {
    colorController.color = "#ff573380";
    const result = colorController.colorValue;
    expect(result).to.equal("#ff573380");
  });
  it("should return correct color value for default spaceId with percentage origin", () => {
    colorController.color = "rgb(50%, 25%, 75%)";
    const result = colorController.colorValue;
    expect(result).to.equal("rgb(50%, 25%, 75%)");
  });
  it("should return correct color value for default spaceId with rgba origin", () => {
    colorController.color = "rgba(255, 87, 51, 0.5)";
    const result = colorController.colorValue;
    expect(result).to.equal("rgba(255, 87, 51, 0.5)");
  });
  it("should return correct color values for hsv spaceId", () => {
    colorController.color = new Color("hsv", [120, 100, 50]);
    const result = colorController.colorValue;
    expect(result).to.deep.equal({
      h: 120,
      s: 1,
      v: 0.5,
      a: 1
    });
  });
  it("should return correct color values for hsl spaceId", () => {
    colorController.color = new Color("hsl", [120, 100, 50]);
    const result = colorController.colorValue;
    expect(result).to.deep.equal({
      h: 120,
      s: 1,
      l: 0.5,
      a: 1
    });
  });
  it("should return correct color values for srgb spaceId", () => {
    colorController.color = new Color("srgb", [0.5, 0.25, 0.75]);
    const result = colorController.colorValue;
    expect(result).to.deep.equal({
      r: 128,
      g: 64,
      b: 191,
      a: 1
    });
  });
  it("should return correct color values for srgb spaceId with percentage origin", () => {
    colorController.color = new Color("srgb", [0.5, 0.25, 0.75]);
    colorController.colorOrigin = { r: "50%", g: "25%", b: "75%" };
    const result = colorController.colorValue;
    expect(result).to.deep.equal({
      r: "128%",
      g: "64%",
      b: "191%",
      a: 1
    });
  });
});
//# sourceMappingURL=color-controller.test.js.map
