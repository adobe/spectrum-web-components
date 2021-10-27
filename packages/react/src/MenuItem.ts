import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { MenuItem as Component } from "@iliad-ui/bundle";

export const MenuItem = createComponent(
  React,
  "sp-menu-item",
  Component,
  {
    "sp-menu-item-added": "sp-menu-item-added",
    "sp-menu-item-removed": "sp-menu-item-removed",
    keydown: "keydown",
  },
  "MenuItem"
);
