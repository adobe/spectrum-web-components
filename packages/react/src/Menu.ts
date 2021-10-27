import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Menu as Component } from "@iliad-ui/bundle";

export const Menu = createComponent(
  React,
  "sp-menu",
  Component,
  {
    change: "change",
  },
  "Menu"
);
