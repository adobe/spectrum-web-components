# UI icon source (S2 UI icons)

Raw SVG source for the **internal** UI icons (chevrons, checkmarks, arrows, and other
control internals) goes here. Download the S2 UI Icon Global Set SVGs into this folder,
then run `yarn generate:ui-icons`; the generated art in
[`../../components/ui-icons/icon-set/`](../../components/ui-icons/icon-set/) is what gets
committed.

The raw `.svg` files in this folder are **git-ignored** and must not be committed. They
are transient build inputs, removed once the generated art lands. This folder itself is
tracked (via this README) so the location is discoverable when icons need updating.

See [`../README.md`](../README.md) for the full pipeline, families, and naming
convention.
