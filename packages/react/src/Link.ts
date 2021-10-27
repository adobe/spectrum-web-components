import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Link as Component } from "@iliad-ui/bundle";

export const Link = createComponent(
  React,
  "sp-link",
  Component,
  {
    keydown: "keydown",
  },
  "Link"
);
