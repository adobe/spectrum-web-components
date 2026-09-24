# Copilot instructions

Treat `.ai/` as the canonical source for this repository's AI rules, skills, and configuration. Start with the root `AGENTS.md`, read `.ai/README.md`, and apply the instructions relevant to the files and task you are working on.

Path-specific rules from `.ai/rules/` are exposed to Copilot through generated files in `.github/instructions/`. Do not edit those generated files directly. Edit the canonical `.ai/rules/*.md` file, then run `yarn generate:copilot-instructions`.
