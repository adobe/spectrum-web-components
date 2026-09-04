# Spectrum Web Components RFCs

Most changes — bug fixes, refactors, docs, single-component work that follows an agreed playbook — can go through the normal pull-request flow. Some changes are **substantial**, and we ask that these be put through a design process to build consensus and produce a durable record of *why* we decided what we decided.

This process is adapted from [React Spectrum's RFC process](https://github.com/adobe/react-spectrum/blob/main/rfcs/README.md). It is deliberately lightweight: an RFC is a markdown file added to this directory via a pull request.

## When you need an RFC

You should open an RFC for any **substantial** change, including:

- **New public components** — a new custom element or a new package.
- **Breaking API changes** — to attributes, properties, events, slots, or the public CSS custom-property styling API (`--swc-*`); this includes removing or renaming any public surface.
- **Cross-cutting architecture or convention changes** — theming/token strategy, base-class changes, build/output format, SSR/shadow-DOM behavior, or the styling-API contract itself.
- **Migration-policy decisions** that affect consumers broadly — deprecation windows, breaking-change batching, 1st-gen → 2nd-gen policy.

You do **not** need an RFC for:

- Bug fixes and internal refactors with no public-API impact.
- Documentation.
- Performance improvements invisible to consumers.
- A single-component migration that follows the already-agreed migration playbook.

If you're unsure, open an issue or ask a maintainer before investing in a full RFC.

## The process

1. Fork the repo (or branch, if you have write access).
2. Copy [`template.md`](./template.md) to `rfcs/YYYY-my-feature.md`, using the current year and a short, descriptive, kebab-case slug.
3. Fill in every required section. An RFC with unaddressed sections is likely to receive less review.
4. Put images, if any, in `rfcs/images/`.
5. Open a pull request. **The RFC PR is for the RFC only** — do not bundle implementation. Fill the `RFC PR:` header field with the PR link once it exists.
6. Incorporate feedback from the community and maintainers. Expect the RFC to evolve; revising the proposal mid-discussion is normal and healthy.
7. A decision is made after the review period (see below).

## Review, decision, and comment period

- RFCs are discussed publicly on the pull request.
- An RFC stays open for a **minimum of one week** to give people time to comment. There is no maximum; substantial proposals may take longer.
- **Decision authority:** an RFC is **Accepted** when at least **two maintainers approve** and no maintainer has an unresolved blocking objection. If consensus cannot be reached, the **designated RFC shepherd** (or, absent one, the lead maintainer) makes the final call after the comment period. We seek consensus, not unanimity.
- **Accepted** RFCs are merged into `rfcs/` with `Status: Accepted`.
- **Declined** RFCs have their pull request closed without merging.

## After acceptance

- The author is **not** obligated to implement the RFC. Anyone may implement an accepted RFC.
- **Implementation is separate from the RFC** and goes through normal PR review.
- The RFC is a **living document until it ships**. If the design changes during implementation, update the RFC and link the implementing PRs. Update the `Status:` header as the work progresses:
  - `Accepted` → `Implemented` when the work ships.
  - `Superseded by <RFC>` if a later RFC replaces it.

## Conventions

- One RFC per file: `rfcs/YYYY-<slug>.md` (flat file, not a nested directory).
- Keep the `Status:` header current — it is the source of truth for an RFC's state.
