import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { OverlayTrigger as Component } from "@iliad-ui/bundle";

export const OverlayTrigger = createComponent(
  React,
  "overlay-trigger",
  Component,
  {
    "sp-opened": "sp-opened",
    "sp-closed": "sp-closed",
  },
  "OverlayTrigger"
);
