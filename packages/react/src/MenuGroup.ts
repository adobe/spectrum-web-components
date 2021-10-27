import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { MenuGroup as Component } from "@iliad-ui/bundle";

export const MenuGroup = createComponent(
  React,
  "sp-menu-group",
  Component,
  {
    change: "change",
  },
  "MenuGroup"
);
