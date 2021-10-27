import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { SliderHandle as Component } from "@iliad-ui/bundle";

export const SliderHandle = createComponent(
  React,
  "sp-slider-handle",
  Component,
  {
    keydown: "keydown",
  },
  "SliderHandle"
);
