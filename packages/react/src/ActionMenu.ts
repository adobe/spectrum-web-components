import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { ActionMenu as Component } from "@iliad-ui/bundle";

export const ActionMenu = createComponent(
  React,
  "sp-action-menu",
  Component,
  {
    change: "change",
    "sp-opened": "sp-opened",
    "sp-closed": "sp-closed",
    keydown: "keydown",
  },
  "ActionMenu"
);
