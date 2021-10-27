import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Search as Component } from "@iliad-ui/bundle";

export const Search = createComponent(
  React,
  "sp-search",
  Component,
  {
    submit: "submit",
    change: "change",
    keydown: "keydown",
  },
  "Search"
);
