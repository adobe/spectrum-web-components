import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { ColorWheel as Component } from "@iliad-ui/bundle";

export const ColorWheel = createComponent(
  React,
  "sp-color-wheel",
  Component,
  {
    input: "input",
    change: "change",
    keydown: "keydown",
  },
  "ColorWheel"
);
