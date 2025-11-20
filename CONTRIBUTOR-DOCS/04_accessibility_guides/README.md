<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / Accessbility Guide

<!-- Document title (editable) -->

# Accessbility Guide

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [What is accessibility?](#what-is-accessibility)
- [Why accessibility matters](#why-accessibility-matters)
    - [User inclusion](#user-inclusion)
    - [Ethical considerations](#ethical-considerations)
    - [Business benefits](#business-benefits)
    - [Legal requirements](#legal-requirements)
- [Types of disabilities](#types-of-disabilities)
    - [Visual disabilities](#visual-disabilities)
    - [Auditory disabilities](#auditory-disabilities)
    - [Motor disabilities](#motor-disabilities)
    - [Cognitive, learning, and neurological disabilities](#cognitive-learning-and-neurological-disabilities)
    - [Temporary and situational disabilities](#temporary-and-situational-disabilities)
- [Assistive technologies](#assistive-technologies)
    - [Screen readers](#screen-readers)
    - [Alternative input methods](#alternative-input-methods)
    - [Visual assistance tools](#visual-assistance-tools)
- [Web Content Accessibility Guidelines (WCAG)](#web-content-accessibility-guidelines-wcag)
    - [Purpose](#purpose)
    - [Organization](#organization)
    - [Conformance levels](#conformance-levels)
- [Authoring Tool Accessibility Guidelines (ATAG)](#authoring-tool-accessibility-guidelines-atag)
    - [Why ATAG matters for component libraries](#why-atag-matters-for-component-libraries)
    - [ATAG principles](#atag-principles)
- [Resources](#resources)
- [Next steps](#next-steps)

</details>

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Semantic HTML and ARIA](01_semantic_html_aria.md)
- [Accessible pattern libraries](02_accessible_pattern_libraries.md)
- [Keyboard testing](03_keyboard_testing.md)
- [Screen reader testing](04_screen_reader_testing.md)
- [Wave toolbar testing](05_wave_toolbar_testing.md)
- [Accessibility resources](06_accessibility_resources.md)

</details>

<!-- Document content (editable) -->

## Overview

This guide provides essential accessibility knowledge and practices for customers and contributors to Spectrum Web Components. Building and using accessible components ensures that all users, regardless of ability, can effectively interact with web applications.

## What is accessibility?

**Accessibility** (often abbreviated as **a11y**) is the practice of making web content and applications usable by as many people as possible. This means designing and developing in ways that remove barriers preventing people with disabilities from perceiving, understanding, navigating, and interacting with digital content.

In the context of web components, accessibility ensures that custom elements work seamlessly with assistive technologies and follow established patterns that users have come to expect.

## Why accessibility matters

### User inclusion
Accordiing to the [World Health Organization](https://www.who.int/news-room/fact-sheets/detail/disability-and-health), approximately one in six people, or 16%% of the world's population, lives with some form of disability. Building accessible components ensures your applications serve the widest possible audience.

### Ethical considerations
Building accessible software is simply the right thing to do. Digital content has become essential to modern life, and excluding people with disabilities from accessing it perpetuates inequality.

### Business benefits
- **Larger market reach**: More users can access your applications
- **Better SEO**: Accessible HTML often improves search engine optimization
- **Improved usability for everyone**: Accessibility features benefit all users (e.g., captions help in noisy environments)
- **Reduced legal risk**: Proactive accessibility reduces litigation exposure
- **Increased compatibility**: with more web-enabled devices and assistive technologies being adopted by users

### Legal requirements
Many jurisdictions have legal requirements for digital accessibility:
- **[Americans with Disabilities Act (ADA)](hhttps://www.ada.gov/topics/intro-to-ada/)** requires federal and state government entities as well as private entities that own, operate, lease, or lease to places of public accommodation must be accessible to people with disabilities
- **[Section 508](https://www.section508.gov/)** applies to US federal government entities but impacts any entity that does buisness with the US federal government
- **[European Accessibility Act](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM%3A2015%3A0615%3AFINa)** establishes accessbility standards for the EU; applies to "applies to any business’s product or service that is sold or in use within the Eurozone, not just EU member state businesses" [deque blog post](https://www.deque.com/blog/eu-web-accessibility-compliance-and-legislation/) 
- **[Accessibility for Ontarians with Disabilities Act (AODA)](https://www.ontario.ca/laws/statute/05a11a)** "applies to every person or organization in the public and private sectors of the Province of Ontario, including the Legislative Assembly of Ontario" to comply with defined accessbility guidelines for EU member states

## Types of disabilities

When building accessible components, consider these categories of disabilities:

### Visual disabilities
- Blindness: Complete inability to see
- Low vision: Reduced visual acuity that cannot be corrected with glasses
- Color blindness: Difficulty distinguishing between certain colors
- Light sensitivity: Difficulty with bright lights or certain color contrasts

### Auditory disabilities
- Deafness: Complete inability to hear
- Hard of hearing: Partial hearing loss
- Audio processing disorders: Difficulty processing auditory information

### Motor disabilities
- Limited fine motor control: Difficulty with precise movements like clicking small targets
- Tremors or spasms: Involuntary movements affecting interaction
- Paralysis: Inability to move certain body parts
- Repetitive stress injuries: Pain or difficulty from repeated motions

### Cognitive, learning, and neurological disabilities
- Learning disabilities: Dyslexia, dyscalculia, and other processing differences
- Memory impairments: Difficulty retaining or recalling information
- Attention disorders: Difficulty maintaining focus
- Autism spectrum disorders: Different sensory processing and communication patterns
- Seizure disorders:  Different types of epilepsy and migraines, often triggered by visual or auditory stimuli

### Temporary and situational disabilities
- Temporary: Broken arm, eye surgery recovery, ear infection
- Situational: Bright sunlight affecting screen visibility, noisy environment, holding a baby while trying to navigate with one hand

## Assistive technologies

Users interact with web components using various assistive technologies:

### Screen readers
- **[JAWS](https://www.freedomscientific.com/products/software/jaws/)**: Popular Windows screen reader, often used with Chrome or Edge browsers
- **[NVDA](https://www.nvaccess.org/about-nvda/)**: Free, open-source Windows screen reader, often used with Firefox browsers
- **[VoiceOver](hhttps://support.apple.com/guide/voiceover/turn-voiceover-on-or-off-vo2682/mac)**: Built-in screen reader for macOS and iOS, often used with Safari browsers
- **[TalkBack](https://support.google.com/accessibility/android/answer/6007100?hl=en)**: Built-in screen reader for Android, often used with Chrome browsers
- **[Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1)**: Built-in Windows screen reader, often used with Edge browsers

### Alternative input methods
- **Keyboard navigation**: Users navigate without a mouse using <kbd>Tab</kbd>, arrow keys, <kbd>Enter</kbd>, <kbd>Space</kbd>, and <kbd>Escape</kbd>
- **Voice control**: Software like Dragon NaturallySpeaking allows voice commands
- **Switch devices**: Single or dual-switch systems for users with limited mobility
- **Eye tracking**: Systems that track eye movement for navigation

### Visual assistance tools
- **Screen magnification**: Software that enlarges portions of the screen
- **High contrast modes**: Operating system settings that increase contrast
- **Custom stylesheets**: User-defined CSS to override default styles

## Web Content Accessibility Guidelines (WCAG)

The **[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/glance/)** are the international standard for web accessibility, developed by the World Wide Web Consortium (W3C).

### Purpose
WCAG provides a single shared standard for web content accessibility that meets the needs of individuals, organizations, and governments internationally.

### Organization
WCAG is organized around four principles (often remembered as **POUR**):

1. **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive
2. **Operable**: User interface components and navigation must be operable
3. **Understandable**: Information and the operation of user interface must be understandable
4. **Robust**: Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies and future tools

### Conformance levels
WCAG defines three conformance levels:

- **Level A**: The minimum level of accessibility. Addresses the most basic web accessibility features
- **Level AA**: The commonly targeted level. Addresses the biggest and most common barriers for disabled users
- **Level AAA**: The highest level. Provides the greatest level of accessibility but is not always achievable for all content

**Target for Spectrum Web Components**: Level AA conformance is the standard we aim to achieve, as it represents best practices for most web content.

## Authoring Tool Accessibility Guidelines (ATAG)

The **[Authoring Tool Accessibility Guidelines (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)** provide standards for tools used to create web content, including component libraries, content management systems, and development frameworks.

### Why ATAG matters for component libraries
Spectrum Web Components is an authoring tool in the sense that it provides building blocks for creating web content and applications. ATAG is relevant because:

1. **Accessible by default**: Components should make it easy to create accessible content without requiring deep accessibility expertise. (Our components should handle as much semantic HTML and ARIA internally as much as possible.)
2. **Support accessible content creation**: Components should not create barriers to producing accessible applications. (It should be possible to use our components in and accessible way.)
3. **Promote accessibility**: Documentation and APIs should encourage accessible patterns. (Our documentation and APIs should encourage accessible patterns.)

### ATAG principles
ATAG has two main parts:

- **Part A**: Make the authoring tool user interface accessible (the component library itself must be usable by developers with disabilities)
- **Part B**: Support the production of accessible content (components should facilitate creating accessible applications)

## Resources

For deeper understanding and ongoing reference, consult these authoritative sources:

- [W3C Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/) - The main hub for web accessibility standards and resources
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/) - The complete specification for web content accessibility
- [ATAG 2.0 Overview](https://www.w3.org/WAI/standards-guidelines/atag/) - Understanding authoring tool accessibility
- [WebAIM Introduction to Web Accessibility](https://webaim.org/intro/) - Practical introduction to accessibility concepts
- [The A11y Project Checklist](https://www.a11yproject.com/checklist/) - A beginner-friendly accessibility checklist

## Next steps

Explore the guides in this section to learn specific accessibility practices.
