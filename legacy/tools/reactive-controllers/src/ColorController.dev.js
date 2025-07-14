"use strict";
import Color from "colorjs.io";
export class ColorController {
  /**
   * Creates an instance of ColorController.
   *
   * @param host - The ReactiveElement that this controller is associated with.
   * @param options - An object containing optional parameters.
   * @param options.manageAs - A string to manage the controller as a specific type.
   */
  constructor(host, {
    manageAs
  } = {}) {
    /**
     * Represents the color state of the component.
     * Initialized with an HSV color model with hue 0, saturation 100, and value 100, and an alpha value of 1.
     *
     * @private
     * @type {Color}
     */
    this._color = new Color("hsv", [0, 100, 100], 1);
    this.host = host;
    this.manageAs = manageAs;
  }
  get color() {
    return this._color;
  }
  /**
   * Validates a color string and returns a result indicating the color space,
   * coordinates, alpha value, and whether the color is valid.
   *
   * @param color - The color string to validate. Supported formats include:
   *  - RGB: `rgb(r, g, b)`, `rgba(r, g, b, a)`, `rgb r g b`, `rgba r g b a`
   *  - HSL: `hsl(h, s, l)`, `hsla(h, s, l, a)`, `hsl h s l`, `hsla h s l a`
   *  - HSV: `hsv(h, s, v)`, `hsva(h, s, v, a)`, `hsv h s v`, `hsva h s v a`
   *  - HEX: `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
   *
   * @returns An object containing the following properties:
   *  - `spaceId`: The color space identifier (`'srgb'`, `'hsl'`, or `'hsv'`).
   *  - `coords`: An array of numeric values representing the color coordinates.
   *  - `alpha`: The alpha value of the color (0 to 1).
   *  - `isValid`: A boolean indicating whether the color string is valid.
   */
  validateColorString(color) {
    var _a, _b, _c, _d;
    const result = {
      spaceId: null,
      coords: [0, 0, 0],
      isValid: false,
      alpha: 1
    };
    const rgbRegExpArray = [
      // With commas
      /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*\.?\d+)\s*\)/i,
      // rgba(r, g, b, a)
      /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i,
      // rgb(r, g, b)
      // With spaces
      /^rgba\s+(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s+(0|0?\.\d+|1)\s*$/i,
      // rgba r g b a
      /^rgb\s+(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*$/i,
      // rgb r g b
      // Spaces inside parentheses
      /^rgba\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s+(\d*\.?\d+)\s*\)$/i,
      // rgba(r g b a)
      /^rgb\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\)$/i,
      // rgb(r g b)
      // Percentage values
      /rgb\(\s*(100|[0-9]{1,2}%)\s*,\s*(100|[0-9]{1,2}%)\s*,\s*(100|[0-9]{1,2}%)\s*\)/i,
      // rgb(r%, g%, b%)
      /rgba\(\s*(100|[0-9]{1,2})%\s*,\s*(100|[0-9]{1,2})%\s*,\s*(100|[0-9]{1,2})%\s*,\s*(\d*\.?\d+)\s*\)/i
      // rgba(r%, g%, b%, a)
    ];
    const hslRegExpArray = [
      // With commas
      /hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d*\.?\d+)\s*\)/i,
      // hsla(h, s, l, a)
      /hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*\)/i,
      // hsl(h, s, l)
      // With spaces
      /^hsla\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*$/i,
      // hsla h s l a
      /^hsl\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*$/i,
      // hsl h s l
      // Spaces inside parentheses
      /^hsla\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*\)$/i,
      // hsla(h s l a)
      /^hsl\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*\)$/i
      // hsl(h s l)
    ];
    const hsvRegExpArray = [
      // With commas
      /hsva\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d*\.?\d+)\s*\)/i,
      // hsva(h, s, v, a)
      /hsv\(\s*(\d{1,3})\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*\)/i,
      // hsv(h, s, v)
      // With spaces
      /^hsva\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*$/i,
      // hsva h s v a
      /^hsv\s+(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*$/i,
      // hsv h s v
      // Spaces inside parentheses
      /^hsva\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d*\.?\d+)\s*\)$/i,
      // hsva(h s v a)
      /^hsv\(\s*(\d{1,3})\s+(\d{1,3}%?)\s+(\d{1,3}%?)\s*\)$/i
      // hsv(h s v)
    ];
    const hexRegExpArray = [
      /^#([A-Fa-f0-9]{6})([A-Fa-f0-9]{2})?$/,
      // 6-digit hex with optional hex alpha
      /^#([A-Fa-f0-9]{3})([A-Fa-f0-9]{1})?$/
      // 3-digit hex with optional hex alpha
    ];
    const rgbaMatch = (_a = rgbRegExpArray.find((regex) => regex.test(color))) == null ? void 0 : _a.exec(color);
    const hslaMatch = (_b = hslRegExpArray.find((regex) => regex.test(color))) == null ? void 0 : _b.exec(color);
    const hsvaMatch = (_c = hsvRegExpArray.find((regex) => regex.test(color))) == null ? void 0 : _c.exec(color);
    const hexMatch = (_d = hexRegExpArray.find((regex) => regex.test(color))) == null ? void 0 : _d.exec(color);
    if (rgbaMatch) {
      const [, r, g, b, a] = rgbaMatch.filter(
        (element) => typeof element === "string"
      );
      const alpha = a === void 0 ? 1 : Number(a);
      const processValue = (value) => {
        if (value.includes("%")) {
          return Number(value.replace("%", "")) / 100;
        } else {
          return Number(value) / 255;
        }
      };
      const numericR = processValue(r);
      const numericG = processValue(g);
      const numericB = processValue(b);
      result.spaceId = "srgb";
      result.coords = [numericR, numericG, numericB];
      result.alpha = alpha;
      result.isValid = numericR >= 0 && numericR <= 1 && numericG >= 0 && numericG <= 1 && numericB >= 0 && numericB <= 1 && alpha >= 0 && alpha <= 1;
    } else if (hslaMatch) {
      const [, h, s, l, a] = hslaMatch;
      const values = [h, s, l, a === void 0 ? "1" : a].map(
        (value) => Number(value.replace(/[^\d.]/g, ""))
      );
      const [numericH, numericS, numericL, numericA] = values;
      result.spaceId = "hsl";
      result.coords = [numericH, numericS, numericL];
      result.alpha = numericA;
      result.isValid = numericH >= 0 && numericH <= 360 && numericS >= 0 && numericS <= 100 && numericL >= 0 && numericL <= 100 && numericA >= 0 && numericA <= 1;
    } else if (hsvaMatch) {
      const [, h, s, v, a] = hsvaMatch;
      const values = [h, s, v, a === void 0 ? "1" : a].map(
        (value) => Number(value.replace(/[^\d.]/g, ""))
      );
      const [numericH, numericS, numericV, numericA] = values;
      result.spaceId = "hsv";
      result.coords = [numericH, numericS, numericV];
      result.alpha = numericA;
      result.isValid = numericH >= 0 && numericH <= 360 && numericS >= 0 && numericS <= 100 && numericV >= 0 && numericV <= 100 && numericA >= 0 && numericA <= 1;
    } else if (hexMatch) {
      const [, hex, alphaHex] = hexMatch;
      const processHex = (hex2) => {
        if (hex2.length === 1) {
          hex2 = hex2 + hex2;
        }
        return parseInt(hex2, 16) / 255;
      };
      let numericR, numericG, numericB;
      if (hex.length === 3) {
        numericR = processHex(hex.substring(0, 1));
        numericG = processHex(hex.substring(1, 2));
        numericB = processHex(hex.substring(2, 3));
      } else {
        numericR = processHex(hex.substring(0, 2));
        numericG = processHex(hex.substring(2, 4));
        numericB = processHex(hex.substring(4, 6));
      }
      const numericA = alphaHex ? processHex(alphaHex) : 1;
      result.spaceId = "srgb";
      result.coords = [numericR, numericG, numericB];
      result.alpha = numericA;
      result.isValid = numericR >= 0 && numericR <= 1 && numericG >= 0 && numericG <= 1 && numericB >= 0 && numericB <= 1 && numericA >= 0 && numericA <= 1;
    }
    return result;
  }
  /**
   * Gets the original color value provided by the user.
   *
   * @returns {ColorTypes} The original color value.
   */
  get colorOrigin() {
    return this._colorOrigin;
  }
  /**
   * Sets the original color value provided by the user.
   *
   * @param {ColorTypes} colorOrigin - The original color value to set.
   */
  set colorOrigin(colorOrigin) {
    this._colorOrigin = colorOrigin;
  }
  /**
   * Private helper method to convert RGB color to hex format with optional alpha
   *
   * @private
   * @param {boolean} includeHash - Whether to include the # prefix in the returned string
   * @param {boolean} includeAlpha - Whether to include the alpha channel in the returned string
   * @returns {string} The color in hex format
   */
  _getHexString(includeHash, includeAlpha) {
    const { r, g, b } = this._color.to("srgb").srgb;
    const a = this._color.alpha;
    const rHex = Math.round(r * 255).toString(16).padStart(2, "0");
    const gHex = Math.round(g * 255).toString(16).padStart(2, "0");
    const bHex = Math.round(b * 255).toString(16).padStart(2, "0");
    const aHex = Math.round(a * 255).toString(16).padStart(2, "0");
    return `${includeHash ? "#" : ""}${rHex}${gHex}${bHex}${includeAlpha ? aHex : ""}`;
  }
  /**
   * Sets the color value for the controller. The color can be provided in various formats:
   * - A string representing a color name, hex code, or other color format.
   * - An instance of the `Color` class.
   * - An object containing color properties such as `h`, `s`, `l`, `v`, `r`, `g`, `b`, and optionally `a`.
   *
   * The method validates and parses the input color, converting it to a `Color` instance.
   * If the color is invalid, it attempts to parse it as a hex code or returns without setting a new color.
   *
   * @param {ColorTypes} color - The color value to set. It can be a string, an instance of `Color`, or an object with color properties.
   */
  set color(color) {
    this._colorOrigin = color;
    let newColor;
    if (typeof color === "string") {
      const colorValidationResult = this.validateColorString(
        color
      );
      if (colorValidationResult.isValid) {
        const [coord1, coord2, coord3] = colorValidationResult.coords;
        newColor = new Color(
          `${colorValidationResult.spaceId}`,
          [coord1, coord2, coord3],
          colorValidationResult.alpha
        );
      } else {
        try {
          Color.parse(color);
        } catch (error) {
          try {
            newColor = new Color(`#${color}`);
          } catch (error2) {
            return;
          }
        }
      }
    } else if (color instanceof Color) {
      newColor = color;
    } else if (!Array.isArray(color)) {
      const { h, s, l, v, r, g, b, a } = color;
      if (typeof h !== "undefined" && typeof s !== "undefined") {
        const lv = l != null ? l : v;
        newColor = new Color(
          typeof l !== "undefined" ? "hsl" : "hsv",
          [
            parseFloat(h),
            typeof s !== "string" ? s * 100 : parseFloat(s),
            typeof lv !== "string" ? lv * 100 : parseFloat(lv)
          ],
          parseFloat(a || "1")
        );
      } else if (typeof r !== "undefined" && typeof g !== "undefined" && typeof b !== "undefined") {
        newColor = new Color(
          "srgb",
          [
            parseFloat(r) / 255,
            parseFloat(g) / 255,
            parseFloat(b) / 255
          ],
          parseFloat(a || "1")
        );
      }
    }
    if (!newColor) {
      newColor = new Color(color);
    }
    if (this.manageAs) {
      this._color = newColor.to(this.manageAs);
    } else {
      this._color = newColor;
    }
    this.host.requestUpdate();
  }
  /**
   * Gets the color value in various formats based on the original color input.
   *
   * The method determines the color space of the original color input and converts
   * the color to the appropriate format. The supported color spaces are:
   * - HSV (Hue, Saturation, Value)
   * - HSL (Hue, Saturation, Lightness)
   * - Hexadecimal (with or without alpha)
   * - RGB (Red, Green, Blue) with optional alpha
   *
   * @returns {ColorTypes} The color value in the appropriate format.
   *
   * The method handles the following cases:
   * - If the original color input is a string, it checks the prefix to determine the color space.
   * - If the original color input is an object, it checks the properties to determine the color space.
   * - If the original color input is not provided, it defaults to the current color space of the color object.
   *
   * The returned color value can be in one of the following formats:
   * - `hsv(h, s%, v%)` or `hsva(h, s%, v%, a)`
   * - `hsl(h, s%, l%)` or `hsla(h, s%, l%, a)`
   * - `#rrggbb` or `#rrggbbaa`
   * - `rgb(r, g, b)` or `rgba(r, g, b, a)`
   * - `{ h, s, v, a }` for HSV object
   * - `{ h, s, l, a }` for HSL object
   * - `{ r, g, b, a }` for RGB object
   */
  get colorValue() {
    if (typeof this._colorOrigin === "string") {
      let spaceId2 = "";
      if (this._colorOrigin.startsWith("#")) {
        spaceId2 = "hex string";
      } else if (this._colorOrigin.startsWith("rgb")) {
        spaceId2 = "rgb";
      } else if (this._colorOrigin.startsWith("hsl")) {
        spaceId2 = "hsl";
      } else if (this._colorOrigin.startsWith("hsv")) {
        spaceId2 = "hsv";
      } else {
        spaceId2 = "hex";
      }
      switch (spaceId2) {
        case "hsv": {
          const hadAlpha = this._colorOrigin[3] === "a";
          const { h, s, v } = this._color.to("hsv").hsv;
          const a = this._color.alpha;
          return `hsv${hadAlpha ? `a` : ""}(${Math.round(
            h
          )}, ${Math.round(s)}%, ${Math.round(v)}%${hadAlpha ? `, ${a}` : ""})`;
        }
        case "hsl": {
          const hadAlpha = this._colorOrigin[3] === "a";
          const { h, s, l } = this._color.to("hsl").hsl;
          const a = this._color.alpha;
          return `hsl${hadAlpha ? `a` : ""}(${Math.round(
            h
          )}, ${Math.round(s)}%, ${Math.round(l)}%${hadAlpha ? `, ${a}` : ""})`;
        }
        case "hex string": {
          const hadAlpha = this._colorOrigin.length === 9 || // #RRGGBBAA format
          this._colorOrigin.length === 5;
          return this._getHexString(true, hadAlpha);
        }
        case "hex": {
          const hadAlpha = this._colorOrigin.length === 8 || // RRGGBBAA format (no #)
          this._colorOrigin.length === 4;
          return this._getHexString(false, hadAlpha);
        }
        default: {
          const { r, g, b } = this._color.to("srgb").srgb;
          const hadAlpha = this._colorOrigin[3] === "a";
          const a = this._color.alpha;
          if (this._colorOrigin.search("%") > -1) {
            return `rgb${hadAlpha ? `a` : ""}(${Math.round(r * 100)}%, ${Math.round(
              g * 100
            )}%, ${Math.round(b * 100)}%${hadAlpha ? `,${Math.round(a * 100)}%` : ""})`;
          }
          return `rgb${hadAlpha ? `a` : ""}(${Math.round(r * 255)}, ${Math.round(
            g * 255
          )}, ${Math.round(b * 255)}${hadAlpha ? `, ${a}` : ""})`;
        }
      }
    }
    let spaceId;
    if (this._colorOrigin) {
      try {
        ({ spaceId } = new Color(
          this._colorOrigin
        ));
      } catch (error) {
        const { h, s, l, v, r, g, b } = this._colorOrigin;
        if (typeof h !== "undefined" && typeof s !== "undefined" && typeof l !== "undefined") {
          spaceId = "hsl";
        } else if (typeof h !== "undefined" && typeof s !== "undefined" && typeof v !== "undefined") {
          spaceId = "hsv";
        } else if (typeof r !== "undefined" && typeof g !== "undefined" && typeof b !== "undefined") {
          spaceId = "srgb";
        }
      }
    } else {
      ({ spaceId } = this.color);
    }
    switch (spaceId) {
      case "hsv": {
        const { h, s, v } = this._color.to("hsv").hsv;
        return {
          h,
          s: s / 100,
          v: v / 100,
          a: this._color.alpha
        };
      }
      case "hsl": {
        const { h, s, l } = this._color.to("hsl").hsl;
        return {
          h,
          s: s / 100,
          l: l / 100,
          a: this._color.alpha
        };
      }
      case "srgb": {
        const { r, g, b } = this._color.to("srgb").srgb;
        if (this._colorOrigin && typeof this._colorOrigin.r === "string" && this._colorOrigin.r.search("%")) {
          return {
            r: `${Math.round(r * 255)}%`,
            g: `${Math.round(g * 255)}%`,
            b: `${Math.round(b * 255)}%`,
            a: this._color.alpha
          };
        }
        return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255),
          a: this._color.alpha
        };
      }
    }
    return this._color;
  }
  /**
   * Gets the hue value of the current color in HSL format.
   *
   * @returns {number} The hue value as a number.
   */
  get hue() {
    return Number(this._color.to("hsl").hsl.h);
  }
  /**
   * Sets the hue value of the color and requests an update from the host.
   *
   * @param hue - The hue value to set, represented as a number.
   */
  set hue(hue) {
    this._color.set("h", hue);
    this.host.requestUpdate();
  }
  /**
   * Converts the current color to the specified format.
   *
   * @param format - The desired color format. It can be a string representing one of the valid formats
   * ('srgb', 'hsva', 'hsv', 'hsl', 'hsla') or a ColorSpace object.
   * @returns The color object in the specified format.
   * @throws Will throw an error if the provided format is not a valid string format.
   */
  getColor(format) {
    const validFormats = ["srgb", "hsva", "hsv", "hsl", "hsla"];
    if (typeof format === "string" && !validFormats.includes(format)) {
      throw new Error("not a valid format");
    }
    return this._color.to(format);
  }
  /**
   * Converts the current color to an HSL string representation.
   *
   * @returns {string} The HSL string representation of the current color.
   */
  getHslString() {
    return this._color.to("hsl").toString();
  }
  /**
   * Saves the current color state by cloning the current color and storing it
   * as the previous color. This allows for the ability to revert to the previous
   * color state if needed.
   *
   * @returns {void}
   */
  savePreviousColor() {
    this._previousColor = this._color.clone();
  }
  /**
   * Restores the color to the previously saved color value.
   *
   * This method sets the current color (`_color`) to the previously stored color (`_previousColor`).
   */
  restorePreviousColor() {
    this._color = this._previousColor;
  }
}
//# sourceMappingURL=ColorController.dev.js.map
