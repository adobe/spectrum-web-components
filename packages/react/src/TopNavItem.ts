import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { TopNavItem as Component } from "@iliad-ui/bundle";

export const TopNavItem = createComponent(
  React,
  "sp-top-nav-item",
  Component,
  {
    keydown: "keydown",
  },
  "TopNavItem"
);
