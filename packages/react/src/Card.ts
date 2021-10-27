import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Card as Component } from "@iliad-ui/bundle";

export const Card = createComponent(
  React,
  "sp-card",
  Component,
  {
    click: "click",
    change: "change",
  },
  "Card"
);
