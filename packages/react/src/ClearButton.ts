import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { ClearButton as Component } from "@iliad-ui/bundle";

export const ClearButton = createComponent(
  React,
  "sp-clear-button",
  Component,
  {
    keydown: "keydown",
  },
  "ClearButton"
);
