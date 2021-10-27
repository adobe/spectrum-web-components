import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Checkbox as Component } from "@iliad-ui/bundle";

export const Checkbox = createComponent(
  React,
  "sp-checkbox",
  Component,
  {
    keydown: "keydown",
  },
  "Checkbox"
);
