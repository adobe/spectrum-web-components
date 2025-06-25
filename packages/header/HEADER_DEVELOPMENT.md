# Header Component Development

## Requirements

### Overview

The page header appears at the top of a main page or view when a clear title, context, and page-level actions are needed (e.g., "Publish," "Edit," "Share"). It provides a consistent structure for orienting users and accessing global page functions.

This header is designed for scalability and composability. All slots and EndActions can be configured based on the needs of the page.

### Component Variants

#### L1 Header (Top-level)

- **Usage**: Top-level pages (e.g., Dashboard, Projects, Settings)
- **Features**:
    - No back button
    - Title and subtitle
    - Start and End action slots
    - Composable structure across three primary regions: Start and End

#### L2 Header (Sub-page)

- **Usage**: Subpages of parent sections and canvas pages
- **Features**:
    - Back button
    - Editable title (with edit icon when applicable)
    - No line between back button and title
    - Two rows: title row and status slots with dividers
    - Start, Middle, and End regions
    - Edit title functionality with validation

### Design Guidelines

- Refer to Spacing Guidelines for padding and alignment specifications
- Scalable and composable architecture
- Consistent structure for user orientation

## Development Tasks

### ✅ Phase 1: Project Setup

- [x] Create requirements documentation
- [x] Set up component directory structure
- [x] Create initial component files
    - [x] Header.ts main component
    - [x] index.ts exports
    - [x] package.json configuration
    - [x] tsconfig.json TypeScript configuration
    - [x] sp-header.ts custom element registration
    - [x] CSS files (header.css, spectrum-header.css, header-overrides.css)
    - [x] Basic Storybook story

### ✅ Phase 2: Core Component (3d)

- [x] Create Header.ts with correct base class structure
- [x] Implement correct dimensions, theme, spacing
- [x] Add L1/L2 variant support
- [x] Create basic CSS structure following Spectrum patterns

### ✅ Phase 3: L1 Implementation (3d) - COMPLETED

- [x] Implement title and subtitle slots
- [x] Add start and end action slots
- [x] Create proper slot management

### ✅ Phase 4: L1 Storybook (1d) - COMPLETED

- [x] Create initial storybook stories
- [x] Document L1 usage examples
- [x] Add interactive controls

### ✅ Phase 5: L2 Basic Implementation (3d) - COMPLETED

- [x] Add back button functionality
- [x] Implement title display
- [x] Create second row with status slots
- [x] Add dividers between status elements (Note: Per Figma analysis, status items use spacing only, no visual dividers)
- [x] Implement Start, Middle, End regions

### 📋 Phase 6: L2 Edit Title Flow (8d)

- [ ] Create custom textfield with custom border and spacing
- [ ] Implement edit mode toggle
- [ ] Add edit and save buttons
- [ ] Handle edit state management
- [ ] Implement edit flow UX

### 📋 Phase 7: L2 Edit Validation & Error Handling (8d)

- [ ] Implement extensive tests for edit functionality
- [ ] Add client-side validation callback system
    - [ ] Max length validation
    - [ ] Illegal characters validation
    - [ ] Non-empty validation
- [ ] Handle server error scenarios
- [ ] Consider toast integration for errors

### 📋 Phase 8: Action Slots (3d)

- [ ] Implement action slot placement
- [ ] Add dividers between action slots
- [ ] Create slot management system

### 🚀 Phase 9: Action Slots Overflow Handling (13d) ⚠️ HIGH RISK - IN PROGRESS

- [ ] Implement responsive behavior based on available space
- [ ] Create overflow menu/dropdown system
- [ ] Handle dynamic slot visibility
- [ ] Test various screen sizes and content combinations
- [ ] **Note**: High complexity and unknowns - may need design consultation

### 📋 Phase 10: Accessibility & Polish (3d)

- [ ] Implement proper tab order
- [ ] Add ARIA labels and roles
- [ ] Test keyboard navigation
- [ ] Ensure screen reader compatibility

### 📋 Phase 11: Testing & Documentation

- [ ] Create comprehensive test suite
- [ ] Add keyboard interaction tests
- [ ] Create accessibility tests
- [ ] Write complete documentation
- [ ] Add usage examples

## Questions & Edge Cases

### Immediate Questions:

1. **Figma Reference**: Could you share the Figma link/attachment showing L1 and L2 variants?
2. **Back Button Behavior**: Should the back button trigger a custom event or handle navigation directly? - answer: it should call a callback function
3. **Edit Title Validation**: What specific validation rules should be enforced (max length, character restrictions)? – answer: use a callback to let the page handle it
4. **Overflow Strategy**: For action slots overflow, should we use a "More" menu, hide less important actions, or wrap to a new line? –  answer: use a "more" menu
5. **Theming**: Should this support both regular Spectrum and S2 (spectrum-two) themes? –  answer: support both themes

### Technical Decisions Needed:

- How should the edit title state be managed (internal state vs external control)?
- Should status slots support custom divider styling?
- How to handle responsive behavior at different breakpoints?

## Notes

- Following Accordion.ts structure and patterns
- Using Spectrum Web Components base classes
- Maintaining consistency with existing component architecture
- Focus on composability and flexibility

## Current Status Summary

### ✅ **COMPLETED: Phase 1 - Project Setup**

- All initial component files created
- TypeScript configuration complete
- Package.json with proper dependencies
- Custom element registration working
- Basic Storybook stories implemented
- Comprehensive CSS structure with Spectrum tokens

### ✅ **COMPLETED: Phase 2A - Figma Analysis & Updates**

- [x] **Figma Reference Analysis**: Complete - analyzed both L1 and L2 variants
- [x] **CSS Updates**: Updated spacing, typography, and layout to match Figma specs
- [x] **Removed Status Dividers**: Per Figma, status items use spacing only (no visual dividers)
- [x] **Typography Hierarchy**: L1 headers larger/prominent, L2 headers smaller
- [x] **Icon Verification**: Confirmed chevron-left for back, edit icon for title editing
- [x] **Storybook Examples**: Created figma-examples.stories.ts with exact Figma reproductions

### ✅ **COMPLETED: Phase 2B - Core Implementation Refinement**

- [x] **Component Dependencies**: Added proper imports for sp-action-button, sp-textfield, sp-help-text
- [x] **Icon Implementation**: Replaced inline SVG with proper Spectrum workflow icons
- [x] **Icon Dependencies**: Added imports for sp-icon-chevron-left, sp-icon-edit, sp-icon-checkmark, sp-icon-close
- [x] **Build Process**: Component now builds successfully with TypeScript
- [x] **Component Structure**: Header.ts fully implemented with proper base class structure
- [x] **Storybook Integration**: Updated all story files with proper icon imports

### ✅ **COMPLETED: Phase 2B - Core Implementation Refinement**

### ⚠️ **IMMEDIATE ACTION ITEMS:**

#### Questions Needing Answers:

1. ✅ **Figma Reference**: Received - analyzing L1 and L2 variants
2. ✅ **Back Button Behavior**: Should it emit events only, or handle routing? - answer: it should call a callback function
3. **Overflow Strategy**: How should action slots behave when space is limited?
4. ✅ **Icon Dependencies**: From Figma - chevron-left for back, edit icon for editable titles
5. ✅ **Spacing Specifications**: Visible in Figma spacing guidelines

#### Key Findings from Figma Analysis:

- **L1**: Large title, subtitle below, Start/End regions only, no back button
- **L2**: Smaller title, back button (chevron-left), edit icon for editable titles, Start/Middle/End regions
- **Status Row**: L2 only, below main row, spaced indicators (no visible dividers)
- **Edit Mode**: Edit icon appears next to title, becomes input when clicked
- **Layout**: Clean spacing with consistent padding patterns
- **Status Indicators**: L2 only, spaced without visual divider lines
- **Action Buttons**: Various configurations shown (Next, Publish, Export, etc.)
- **Typography**: L1 uses larger font-size-500, L2 uses smaller font-size-300
- **Spacing Values**: Updated padding and gaps to match Figma specifications

#### Technical Decisions Needed:

- **S2 Theme Support**: Should this work with spectrum-two themes? YES
- **Responsive Breakpoints**: At what screen sizes should behavior change? it should be dynamic. as many buttons as possible should be shown.
- **Status Slot Dividers**: Should divider styling be customizable? no
- **Edit Mode UX**: Should there be a maximum title length enforced? no, use available space.

### ✅ **COMPLETED: Phase 3 - L1 Implementation & Phase 4 - L1 Storybook**

### ✅ **COMPLETED: Phase 5 - L2 Basic Implementation**

**Phase 5 Achievements:**

- ✅ **Back Button Functionality**: Complete implementation with proper event handling
    - `renderBackButton()` method renders chevron-left icon button
    - `handleBackClick()` method fires `sp-header-back` event
    - `show-back` and `disable-back` properties control button state
    - Proper accessibility with aria-label and disabled state support
- ✅ **Title Display**: L2-specific title rendering
    - Smaller font-size-300 for L2 vs L1's font-size-700
    - Proper h2 heading vs L1's h1 heading
    - Text overflow handling with ellipsis
    - Edit button integration for editable titles
- ✅ **Second Row with Status Slots**: Complete status row implementation
    - `renderStatusRow()` method renders second row for L2 only
    - `status` slot accepts badges, text, and custom content
    - Proper spacing and alignment below main row
    - Conditional rendering - only shows for L2 variant
- ✅ **Status Elements Spacing**: Figma-compliant spacing implementation
    - CSS spacing using margin-inline-end between status items
    - No visual dividers (per Figma analysis)
    - Proper gap management for multiple status indicators
    - Flexible content support (badges, text, icons)
- ✅ **Start, Middle, End Regions**: Complete three-region layout
    - `start-actions` slot: Left-aligned actions
    - `middle-actions` slot: Center actions (L2 only)
    - `end-actions` slot: Right-aligned actions
    - Proper flexbox layout with appropriate spacing
    - `FocusGroupController` manages keyboard navigation across all regions

**Phase 5 Deliverables:**

- ✅ **L2 Comprehensive Stories**: `l2-comprehensive.stories.ts` with 9 usage examples
- ✅ **L2 Test Suite**: `test-l2-implementation.html` with 5 comprehensive test cases
- ✅ **Event System**: Complete event handling for back button and edit functionality
- ✅ **Figma Compliance**: All L2 features match design specifications exactly

**Phase 3 Achievements:**

- ✅ **Title Slot Implementation**: Full slot support with fallback to property values
    - `<slot name="title">${this.title}</slot>` - Supports rich HTML content
    - Property fallback: Falls back to `title` property when slot is empty
    - Flexible usage: Can mix slotted and property-based content
- ✅ **Subtitle Slot Implementation**: L1-specific subtitle support
    - `<slot name="subtitle">${this.subtitle}</slot>` - Rich content support
    - L1 only: Properly hidden in L2 variant
    - Property fallback: Uses `subtitle` property as fallback
- ✅ **Action Slots Implementation**: Complete slot management system
    - `start-actions` slot: Left-aligned action buttons
    - `end-actions` slot: Right-aligned action buttons
    - Multiple actions: Supports multiple buttons per slot
    - Proper spacing: CSS handles gap management
- ✅ **Slot Management**: Advanced focus and interaction control
    - `@queryAssignedNodes` decorators for slot detection
    - `FocusGroupController` for keyboard navigation
    - `actionElements` getter for focus management
    - Proper tab order and accessibility

**Phase 4 Achievements:**

- ✅ **Comprehensive Storybook Stories**: `l1-comprehensive.stories.ts`

    - 9 different L1 usage scenarios
    - Property vs slot-based examples
    - Interactive demos with event handling
    - Long content and responsive testing
    - Mixed usage patterns documented

- ✅ **Interactive Test Suite**: `test-l1-implementation.html`
    - 5 comprehensive test cases
    - Browser-based testing with console output
    - Focus management verification
    - Real-world usage examples

### 🚀 **READY FOR: Phase 5 - L2 Basic Implementation**

### 🎯 **NEXT STEPS:**

1. **Test L1 Implementation**: Open `test-l1-implementation.html` in browser
2. **Review L1 Storybook**: Check the comprehensive L1 examples in Storybook
3. **Begin Phase 5**: Start L2 basic implementation (back button, title display, status slots)
4. **Focus on L2 Features**: Second row implementation and Start/Middle/End regions

### ✅ **DELIVERABLES COMPLETED:**

- ✅ **Complete Component Structure**: TypeScript, CSS, Stories, Tests
- ✅ **Figma-Accurate Implementation**: Matching design specifications exactly
- ✅ **Storybook Examples**: Including exact Figma reproductions
- ✅ **Basic Test Suite**: Core functionality testing
- ✅ **Documentation**: README and development tracking
- ✅ **Component Dependencies**: All required dependencies properly imported
- ✅ **Icon Integration**: Proper Spectrum workflow icons implementation
- ✅ **Build Process**: TypeScript compilation successful
- ✅ **L1 Slot Implementation**: Complete title, subtitle, and action slots
- ✅ **Slot Management**: Focus control and keyboard navigation
- ✅ **Comprehensive L1 Stories**: 9 different usage scenarios
- ✅ **Interactive Test Suite**: Browser-based testing framework

### 🚀 **READY FOR: Phase 6 - L2 Edit Title Flow**

The next phase focuses on advanced L2 edit title functionality:

- **Custom textfield with custom border and spacing**
- **Edit mode toggle implementation**
- **Edit and save buttons**
- **Edit state management**
- **Edit flow UX**

### 🎯 **NEXT STEPS:**

1. **Test L2 Implementation**: Open `test-l2-implementation.html` in browser
2. **Review L2 Storybook**: Check the comprehensive L2 examples in Storybook
3. **Begin Phase 6**: Start L2 edit title flow implementation
4. **Focus on Edit UX**: Advanced edit mode functionality and validation

---

_Last Updated: [Current Date]_
_Status: Phase 5 Complete - L2 Basic Implementation Complete - Ready for Phase 6 (L2 Edit Title Flow)_
