import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { ColorSlider as Component } from "@iliad-ui/bundle";

export const ColorSlider = createComponent(
  React,
  "sp-color-slider",
  Component,
  {
    input: "input",
    change: "change",
    keydown: "keydown",
  },
  "ColorSlider"
);
