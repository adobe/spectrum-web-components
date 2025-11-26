# Cursor rules documentation

This directory contains rules that Cursor uses to enforce consistent formatting and structure in our codebase.

## Rule structure

Rules defined in the `config.json` follow this structure:

```json
{
    "version": 1,
    "rules": {
        "category": {
            "rule_name": {
                "enabled": true,
                "pattern": "regex_pattern",
                "message": "Error message"
            }
        }
    }
}
```

Additional, more specific rules can be found in the `rules` directory in either a `json` or `mdc` format.

## Available rules

### Text formatting

- **heading_case**: Enforces sentence case in headings with specific exceptions
    - Applies to: `.md`, `.txt`, `.mdx` files
    - Exceptions: Technical terms and acronyms

### Jira tickets

- **ticket_title**: Validates Jira ticket title format
    - Optional component in brackets
    - Max length: 80 characters
- **required_sections**: Ensures required sections are present
- **templates**: Enforces template structure for different ticket types
- **labels**: Validates that only allowed labels are used
- **issue_types**: Ensures correct issue type selection

## Usage

1. Cursor will automatically enforce these rules while editing relevant files; however, if you wish to enable a rule that is not triggered by default, you can do so by `@` mentioning it in the chat.
2. Rules can be toggled using the `enabled` flag
3. Custom error messages will be shown when rules are violated
4. Exceptions are handled through the `exceptions` field in relevant rules

## Updating rules

To modify these rules:

1. Edit the `config.json` or the appropriate file in the `rules` directory
2. Try to follow the existing structure and format where possible
3. Ensure valid regex patterns, where applicable
4. Include clear error messages
5. Test changes before committing
