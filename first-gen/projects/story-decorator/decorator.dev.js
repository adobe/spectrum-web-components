"use strict";
import { html } from "@spectrum-web-components/base";
import { useEffect } from "@storybook/preview-api";
import "./sp-story-decorator.dev.js";
export const themeStyles = html`
    <style>
        #root {
            padding: 0;
        }
        sp-story-decorator::part(controls) {
            position: absolute;
        }
    </style>
`;
export const swcThemeDecorator = (story, context) => {
  const {
    globals: {
      system,
      color,
      scale,
      textDirection,
      reduceMotion,
      lang
    } = {}
  } = context;
  useEffect(() => {
    if (system) {
      window.__swc_hack_knobs__.defaultSystemVariant = system;
    }
    if (color) {
      window.__swc_hack_knobs__.defaultColor = color;
    }
    if (scale) {
      window.__swc_hack_knobs__.defaultScale = scale;
    }
    if (textDirection) {
      window.__swc_hack_knobs__.defaultDirection = textDirection;
      if (document.documentElement.dir !== textDirection) {
        document.documentElement.dir = textDirection;
      }
    }
    if (reduceMotion !== void 0) {
      window.__swc_hack_knobs__.defaultReduceMotion = reduceMotion;
    }
    if (lang) {
      window.__swc_hack_knobs__.defaultLocale = lang;
    }
  }, [system, color, scale, textDirection, reduceMotion, lang]);
  const hasAnySetting = system || color || scale || textDirection || reduceMotion;
  return html`
        <style>
            #root {
                padding: 0;
            }
            sp-story-decorator::part(controls) {
                position: absolute;
            }
            ${hasAnySetting ? `sp-story-decorator::part(controls) {
                display: none;
            }
        ` : ""}
        </style>
        <sp-story-decorator
            role="main"
            system=${system}
            color=${color}
            scale=${scale}
            lang=${lang}
            .direction=${textDirection}
            ?reduce-motion=${reduceMotion}
        >
            ${story({}, context)}
        </sp-story-decorator>
    `;
};
//# sourceMappingURL=decorator.dev.js.map
