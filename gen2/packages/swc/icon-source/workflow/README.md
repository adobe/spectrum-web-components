# Workflow icon source (S2 workflow icons)

Raw SVG source for the **public** workflow icons goes here. Download the S2 Icon Global Set (Open Source) SVGs into this folder, then run `yarn generate:workflow-icons` from the swc package; the generated art in the [`@adobe/spectrum-wc-icons`](../../../icons) package is what gets committed.

The raw `.svg` files in this folder are **git-ignored** and must not be committed. They are transient build inputs, removed once the generated art lands. This folder itself is tracked (via this README) so the location is discoverable when icons need updating.

## Naming convention

`S2_Icon_<LogicalName>_20_N.svg`

```
S2_Icon_Star_20_N.svg
S2_Icon_AddCircle_20_N.svg
S2_Icon_3DAsset_20_N.svg
```

One drawing per icon, scaled to a 20px source box (`20`), in the normal treatment (`N`); there is no optical step. The generator parses `<LogicalName>` and emits, per icon, an SVG-string function and a custom element into the icons package.

See [`../README.md`](../README.md) for the full pipeline, families, and the shared naming details.
