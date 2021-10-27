import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { SideNavItem as Component } from "@iliad-ui/bundle";

export const SideNavItem = createComponent(
  React,
  "sp-sidenav-item",
  Component,
  {
    keydown: "keydown",
  },
  "SideNavItem"
);
