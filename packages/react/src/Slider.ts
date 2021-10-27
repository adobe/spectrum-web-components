import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Slider as Component } from "@iliad-ui/bundle";

export const Slider = createComponent(
  React,
  "sp-slider",
  Component,
  {
    keydown: "keydown",
  },
  "Slider"
);
