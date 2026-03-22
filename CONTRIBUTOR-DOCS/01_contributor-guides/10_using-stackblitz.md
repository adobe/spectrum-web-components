<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Maintaining StackBlitz examples for Spectrum Web Components

<!-- Document title (editable) -->

# Maintaining StackBlitz examples for Spectrum Web Components

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [StackBlitz terminology](#stackblitz-terminology)
- [Access prerequisites](#access-prerequisites)
- [Adding a new project](#adding-a-new-project)
- [Adding an existing project to the collection](#adding-an-existing-project-to-the-collection)
    - [Step 1: Locate the project in the SWC-Team workspace](#step-1-locate-the-project-in-the-swc-team-workspace)
    - [Step 2: Fork the project (if needed)](#step-2-fork-the-project-if-needed)
    - [Step 3: Add the project to the collection](#step-3-add-the-project-to-the-collection)
- [Naming conventions](#naming-conventions)
- [Replacing an existing project](#replacing-an-existing-project)

</details>

<!-- Document content (editable) -->

This document explains how to update and maintain StackBlitz examples for our library, including how to add new examples and manage existing ones within our shared collection.

## StackBlitz terminology

- **Project**: An individual StackBlitz example. Each project has its own URL and functions independently.
- **Collection**: A curated group of projects. Collections are used to organize related examples.
- **Workspace**: A workspace represents an account context in StackBlitz. You can have:
    - A **personal workspace** (your own account)
    - One or more **team workspaces** (such as **SWC-Team**)

Projects live inside a specific workspace. Only projects that exist in the **SWC-Team workspace** can be added to the **“Spectrum Web Components”** collection, which is the collection of example projects demonstrating correct usage of our web components in a realistic environment that we maintain.

## Access prerequisites

To add or manage projects in the Spectrum Web Components collection, you must have access to the **SWC-Team** StackBlitz account.

1. Create a StackBlitz account if you do not already have one.
2. Ask for team access from a StackBlitz team admin.
3. Be prepared to share your GitHub username and/or email address. You'll need to accept the invitation via email in order to have the SWC-Team workspace appear on your account.

When working with StackBlitz projects for Spectrum Web Components, it's important to ensure you are operating within the **SWC-Team workspace**, not your personal workspace. This applies when creating new projects, forking existing projects, and managing which projects appear in the collection.

## Adding a new project

To add a brand-new example to the collection:

1. Ensure you are logged into StackBlitz and using the **SWC-Team** workspace.
2. Create a new project from the SWC-Team workspace.
3. Once created, add the project to the **Spectrum Web Components** collection.

Follow the naming conventions outlined below before adding the project to the collection.

## Adding an existing project to the collection

In many cases, the project you want to add already exists.

### Step 1: Locate the project in the SWC-Team workspace

1. Go to the StackBlitz dashboard.
2. Use the workspace dropdown to switch from your personal workspace to **SWC-Team**.
3. Check whether the project appears in the SWC-Team project list.

### Step 2: Fork the project (if needed)

If the project does **not** appear in the SWC-Team workspace:

1. Open the project using its StackBlitz URL.
2. Click the **Fork** button in the upper-left corner of the editor.
3. In the fork dialog, open the destination dropdown (chevron or “Fork to…” control) and choose **“Fork to… SWC-Team.”**
4. Confirm that the forked project now appears in the SWC-Team workspace.

### Step 3: Add the project to the collection

1. In the SWC-Team workspace project list (dashboard), locate the project.
2. Click the **three-dot menu** (⋮) on the right side of the project row to open the actions menu.
3. Select **“Add to collection.”**
4. Choose **“Spectrum Web Components”** (currently our only collection).

You can verify the result by visiting the [Spectrum Web Components collection dashboard](https://stackblitz.com/orgs/custom/SWC-Team/collections/spectrum-web-components).

## Naming conventions

All projects added to the collection should follow the existing naming pattern (this should be something like `swc-component-name`), for example:

- `swc-alert-banner`
- `swc-button`
- `swc-modal`

Consistent naming helps keep the collection easy to scan and maintain.

## Replacing an existing project

If you are adding a new project intended to replace an existing example for the same component:

1. Add the new project to the **Spectrum Web Components** collection.
2. Remove the old project from the collection.
3. Optionally, remove the old project entirely from the SWC-Team projects list if it is no longer needed.

This ensures the collection always reflects the most current and recommended examples.
