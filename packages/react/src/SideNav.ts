import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { SideNav as Component } from "@iliad-ui/bundle";

export const SideNav = createComponent(
  React,
  "sp-sidenav",
  Component,
  {
    change: "change",
    keydown: "keydown",
  },
  "SideNav"
);
