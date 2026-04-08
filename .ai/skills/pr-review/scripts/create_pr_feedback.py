#!/usr/bin/env python3

from __future__ import annotations

import argparse
import re
import subprocess
from datetime import date
from pathlib import Path


def git_output(args: list[str]) -> str:
    return subprocess.check_output(["git", *args], text=True).strip()


def next_report_number(directory: Path) -> int:
    pattern = re.compile(r"pr-feedback-(\d+)\.md$")
    existing = []
    for path in directory.glob("pr-feedback-*.md"):
        match = pattern.match(path.name)
        if match:
            existing.append(int(match.group(1)))
    return max(existing, default=0) + 1


def main() -> None:
    parser = argparse.ArgumentParser(description="Create the next PR feedback file.")
    parser.add_argument("--base", default="main", help="Base branch to compare against.")
    args = parser.parse_args()

    project_root = Path.cwd()
    feedback_dir = project_root / ".ai" / "pr-feedback"
    feedback_dir.mkdir(parents=True, exist_ok=True)

    report_number = next_report_number(feedback_dir)
    report_path = feedback_dir / f"pr-feedback-{report_number}.md"

    try:
        branch = git_output(["branch", "--show-current"])
    except Exception:
        branch = "unknown"

    today = date.today().isoformat()

    content = f"""# PR feedback #{report_number}

- Date: {today}
- Branch: {branch}
- Base branch: {args.base}
- Review file: `.ai/pr-feedback/{report_path.name}`

## Scope

[TODO]

## Checks run

- [ ] [TODO]

## Findings

- [TODO]

## Accessibility review notes

[TODO]

## 2nd-gen testing review notes

[TODO]

## CSS review notes

[TODO]

## TypeScript review notes

[TODO]

## Open questions

- [TODO]

## Suggested next actions

- [TODO]
"""

    report_path.write_text(content, encoding="utf-8")
    print(report_path)


if __name__ == "__main__":
    main()
