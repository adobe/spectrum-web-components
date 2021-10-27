import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { ColorArea as Component } from "@iliad-ui/bundle";

export const ColorArea = createComponent(
  React,
  "sp-color-area",
  Component,
  {
    input: "input",
    change: "change",
  },
  "ColorArea"
);
