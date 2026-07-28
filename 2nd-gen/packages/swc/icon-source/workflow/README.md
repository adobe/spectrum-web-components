# Workflow icon source (S2 workflow icons)

Raw SVG source for the **public** workflow icons goes here (RFC Phases 3–4). Download the
S2 Icon Global Set (Open Source) SVGs into this folder, then run the workflow generator;
the generated art is what gets committed.

The raw `.svg` files in this folder are **git-ignored** and must not be committed. They
are transient build inputs, removed once the generated art lands. This folder itself is
tracked (via this README) so the location is discoverable when icons need updating.

See [`../README.md`](../README.md) for the full pipeline, families, and naming
convention.
