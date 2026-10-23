---
name: receiving-code-review
description: Use when receiving code review feedback on a pull request or change, before implementing suggestions, especially if feedback seems unclear or technically questionable. Requires reading every item, verifying it against the code and the project style guides, and then responding with a technical acknowledgment or reasoned pushback before implementing one item at a time.
license: MIT
metadata:
  source: obra/superpowers
  source-path: skills/receiving-code-review
  source-sha: 5bf4e78011075bcfc0dc295f0724994cd123ee71
---

# Code Review Reception

## Overview

Code review requires technical evaluation, not emotional performance.

**Core principle:** Verify before implementing. Ask before assuming. Technical correctness over social comfort, delivered courteously.

In this repository, the style guides in `CONTRIBUTOR-DOCS/02_style-guide/` and the rules in `.ai/rules/` are the tie-breaker when a reviewer's preference and the existing code disagree. Cite the relevant guide in your reply.

## The Response Pattern

```
WHEN receiving code review feedback:

1. READ: Complete feedback without reacting
2. UNDERSTAND: Restate requirement in own words (or ask)
3. VERIFY: Check against codebase reality
4. EVALUATE: Technically sound for THIS codebase?
5. RESPOND: Technical acknowledgment or reasoned pushback
6. IMPLEMENT: One item at a time, test each
```

## Avoid Performative Responses

**Avoid:**

- "You're absolutely right!" or "Great point!" as a reflex (it signals agreement you haven't verified)
- "Let me implement that now" (before verification)

**INSTEAD:**

- Restate the technical requirement
- Ask clarifying questions
- Push back with technical reasoning if wrong
- Just start working (actions > words)

## Handling Unclear Feedback

```
IF any item is unclear:
  STOP - do not implement anything yet
  ASK for clarification on unclear items

WHY: Items may be related. Partial understanding = wrong implementation.
```

**Example:**

```
User: "Fix 1-6"
You understand 1,2,3,6. Unclear on 4,5.

❌ WRONG: Implement 1,2,3,6 now, ask about 4,5 later
✅ RIGHT: "I understand items 1,2,3,6. Need clarification on 4 and 5 before proceeding."
```

## Source-Specific Handling

### From the User You're Working With

- **Trusted** - implement after understanding
- **Still ask** if scope unclear
- **No performative agreement**
- **Skip to action** or technical acknowledgment

### From Other Reviewers

```
BEFORE implementing:
  1. Check: Technically correct for THIS codebase?
  2. Check: Breaks existing functionality?
  3. Check: Reason for current implementation?
  4. Check: Works in all supported browsers and in both 1st-gen and 2nd-gen, where relevant?
  5. Check: Does reviewer understand full context?
  6. Check: What do the style guides and `.ai/rules/` say?

IF suggestion seems wrong:
  Push back with technical reasoning

IF can't easily verify:
  Say so: "I can't verify this without [X]. Should I [investigate/ask/proceed]?"

IF conflicts with the user's prior decisions:
  Stop and discuss with the user first
```

**Rule of thumb:** Be skeptical of any single piece of feedback, but check it carefully.

## YAGNI Check for "Professional" Features

```
IF reviewer suggests "implementing properly":
  grep codebase for actual usage

  IF unused: "Nothing uses this API. Remove it (YAGNI)?"
  IF used: Then implement properly
```

**Rule of thumb:** You and the reviewer both serve the project. If it doesn't need the feature, don't add it.

## Implementation Order

```
FOR multi-item feedback:
  1. Clarify anything unclear FIRST
  2. Then implement in this order:
     - Blocking issues (breaks, security)
     - Simple fixes (typos, imports)
     - Complex fixes (refactoring, logic)
  3. Test each fix individually
  4. Verify no regressions
```

## When To Push Back

Push back when:

- Suggestion breaks existing functionality
- Reviewer lacks full context
- Violates YAGNI (unused feature)
- Technically incorrect for this stack
- Legacy/compatibility reasons exist
- Conflicts with the user's architectural decisions or the style guides

**How to push back:**

- Use technical reasoning, not defensiveness
- Ask specific questions
- Reference working tests/code and the relevant style guide
- Involve the user if architectural

**If you're uncomfortable pushing back out loud:** Name that tension, then tell the user about the issue you've seen. Honest disagreement is more useful than silent compliance.

## Acknowledging Correct Feedback

When feedback IS correct:

```
✅ "Fixed. [Brief description of what changed]"
✅ "Good catch - [specific issue]. Fixed in [location]."
✅ "Thanks, fixed in [location]."
✅ [Just fix it and show in the code]

❌ "You're absolutely right!"
❌ "Great point! Thanks so much for catching that!"
❌ Gratitude or praise instead of saying what changed
```

**Keep it short and specific.** A brief, courteous acknowledgment is fine. What matters is that the reply states what changed and where, so the reviewer can resolve the thread without rereading the diff.

## Gracefully Correcting Your Pushback

If you pushed back and were wrong:

```
✅ "You were right - I checked [X] and it does [Y]. Implementing now."
✅ "Verified this and you're correct. My initial understanding was wrong because [reason]. Fixing."

❌ Long apology
❌ Defending why you pushed back
❌ Over-explaining
```

State the correction factually and move on.

## Common Mistakes

| Mistake                      | Fix                                 |
| ---------------------------- | ----------------------------------- |
| Performative agreement       | State requirement or just act       |
| Blind implementation         | Verify against codebase first       |
| Batch without testing        | One at a time, test each            |
| Assuming reviewer is right   | Check if breaks things              |
| Avoiding pushback            | Technical correctness > comfort     |
| Partial implementation       | Clarify all items first             |
| Can't verify, proceed anyway | State limitation, ask for direction |

## Real Examples

**Performative Agreement (Bad):**

```
Reviewer: "Remove legacy code"
❌ "You're absolutely right! Let me remove that..."
```

**Technical Verification (Good):**

```
Reviewer: "Remove the aria-label fallback from the 1st-gen element"
✅ "Checking... the 1st-gen README documents label as optional, and three consumer stories rely on the fallback. Removing it would be a breaking change. Keep it and document it, or deprecate it in 2nd-gen only?"
```

**YAGNI (Good):**

```
Reviewer: "Add a configurable size scale with custom breakpoints"
✅ "Grepped the repo and the Spectrum 2 design spec - only s, m, l, and xl are defined, and nothing requests custom sizes. Skip it (YAGNI)? Or is there a use case I'm missing?"
```

**Unclear Item (Good):**

```
User: "Fix items 1-6"
You understand 1,2,3,6. Unclear on 4,5.
✅ "Understand 1,2,3,6. Need clarification on 4 and 5 before implementing."
```

## Replying on GitHub

Reply inside each inline review thread rather than as a new top-level PR comment, so the reply stays next to the code and the reviewer can resolve the thread. Use whichever tool your environment provides for thread replies; with the GitHub CLI that's `gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies`. Say what you changed, or why you disagree or deferred.

## Source and License

Adapted from `skills/receiving-code-review` in [obra/superpowers](https://github.com/obra/superpowers) (MIT). See `.ai/THIRD-PARTY-NOTICES.md`.
