# 📄 Individual File Analysis Template

## Template for: `[FILENAME].ts.md`

---

# 🔧 [TOOL_NAME] - `[FILENAME].ts` Analysis

## 📋 File Overview

| **Attribute**        | **Value**                             |
| -------------------- | ------------------------------------- |
| **File Path**        | `tools/[tool-name]/src/[filename].ts` |
| **File Size**        | [X.X KB]                              |
| **Lines of Code**    | [XXX lines]                           |
| **Primary Purpose**  | [Brief description]                   |
| **Complexity Score** | [X.X/10]                              |
| **Export Count**     | [X exports]                           |
| **Import Count**     | [X imports]                           |

## 📦 Imports Analysis

### 🌐 External Dependencies

| **Package**      | **Import**         | **Usage**                | **Migration Risk** |
| ---------------- | ------------------ | ------------------------ | ------------------ |
| `lit`            | `LitElement, html` | Base component framework | Low                |
| `@other/package` | `SomeClass`        | [Usage description]      | [Risk level]       |

### 🔗 Internal Dependencies

| **File**          | **Import**        | **Usage**           | **Migration Risk** |
| ----------------- | ----------------- | ------------------- | ------------------ |
| `./other-file.js` | `UtilityFunction` | [Usage description] | [Risk level]       |

## 🎯 Exports Analysis

### 📊 Export Summary

| **Type**           | **Count** | **Names**                    |
| ------------------ | --------- | ---------------------------- |
| **Classes**        | X         | ClassName1, ClassName2       |
| **Interfaces**     | X         | InterfaceName1               |
| **Types**          | X         | TypeName1, TypeName2         |
| **Functions**      | X         | functionName1, functionName2 |
| **Constants**      | X         | CONSTANT_NAME                |
| **Default Export** | 1         | DefaultExportName            |

---

## 📋 Detailed Export Documentation

### 🏗️ Classes

#### `ClassName`

```typescript
export class ClassName extends BaseClass implements SomeInterface {
    // Key properties and methods
}
```

- **Purpose**: [What this class does]
- **Extends**: [Base class if any]
- **Implements**: [Interfaces if any]
- **Complexity**: [High/Medium/Low] ([X/10])
- **Key Methods**:
    - `methodName(param: Type): ReturnType` - [Description]
    - `anotherMethod()` - [Description]
- **Key Properties**:
    - `propertyName: Type` - [Description]
- **Usage Pattern**: [How it's typically used]
- **Dependencies**: [What it depends on]
- **Used By**: [What uses this class]
- **Migration Strategy**: [Keep/Refactor/Replace]
- **Accessibility Impact**: [Any a11y concerns]

### 🔧 Interfaces

#### `InterfaceName`

```typescript
export interface InterfaceName {
    property1: Type;
    method1(): ReturnType;
}
```

- **Purpose**: [What this interface defines]
- **Properties**:
    - `property1: Type` - [Description]
- **Methods**:
    - `method1(): ReturnType` - [Description]
- **Implementers**: [What implements this]
- **Migration Strategy**: [Keep/Refactor/Replace]

### 🎨 Types

#### `TypeName`

```typescript
export type TypeName = string | number | CustomType;
```

- **Purpose**: [What this type represents]
- **Definition**: [Type definition]
- **Usage**: [Where and how it's used]
- **Migration Strategy**: [Keep/Refactor/Replace]

### ⚙️ Functions

#### `functionName()`

```typescript
export function functionName(param1: Type, param2: Type): ReturnType {
    // Implementation
}
```

- **Purpose**: [What this function does]
- **Parameters**:
    - `param1: Type` - [Description]
    - `param2: Type` - [Description]
- **Returns**: `ReturnType` - [Description]
- **Side Effects**: [Any side effects]
- **Complexity**: [High/Medium/Low] ([X/10])
- **Usage Pattern**: [How it's typically used]
- **Dependencies**: [What it depends on]
- **Used By**: [What uses this function]
- **Migration Strategy**: [Keep/Refactor/Replace]
- **Performance Impact**: [Any performance considerations]

### 📐 Constants

#### `CONSTANT_NAME`

```typescript
export const CONSTANT_NAME = value;
```

- **Purpose**: [What this constant represents]
- **Value**: [The actual value]
- **Type**: [Type of the constant]
- **Usage**: [Where it's used]
- **Migration Strategy**: [Keep/Refactor/Replace]

### 🎯 Default Export

#### `DefaultExportName`

```typescript
export default DefaultExportName;
```

- **Type**: [Class/Function/Object/etc.]
- **Purpose**: [Why this is the default export]
- **Usage**: [How it's imported and used]
- **Migration Strategy**: [Keep/Refactor/Replace]

---

## 🔄 Internal File Dependencies

### 📊 Dependency Graph

```
[FileName].ts
├── depends on: ExternalDep1, InternalDep1
├── used by: Component1, Component2, Tool1
└── exports used by: [list of specific exports and their users]
```

### 🔗 Cross-File Relationships

| **This File Exports** | **Used By File** | **Import Pattern**                              |
| --------------------- | ---------------- | ----------------------------------------------- |
| `ClassName`           | `other-file.ts`  | `import { ClassName } from './filename'`        |
| `functionName`        | `component.ts`   | `import { functionName } from '@tool/filename'` |

---

## 🎯 Complexity Analysis

### 🔍 Complexity Factors

- **Lines of Code**: [XXX lines] (Weight: [X/10])
- **Cyclomatic Complexity**: [X] (Weight: [X/10])
- **Dependencies**: [X deps] (Weight: [X/10])
- **Type Complexity**: [Simple/Medium/Complex] (Weight: [X/10])
- **API Surface**: [X exports] (Weight: [X/10])

### 📈 Complexity Score Calculation

```
Base Score: [X/10]
+ Dependency Complexity: [+/-X]
+ Type System Usage: [+/-X]
+ Performance Considerations: [+/-X]
= Final Score: [X.X/10]
```

### 🎯 Complexity Ranking

1. **Most Complex**: [Export name] ([X/10]) - [Reason]
2. **Medium Complex**: [Export name] ([X/10]) - [Reason]
3. **Least Complex**: [Export name] ([X/10]) - [Reason]

---

## 🚧 Accessibility Analysis

### ✅ Accessibility-Friendly Exports

- **[ExportName]** - [Why it's accessible]
- **[ExportName]** - [WCAG compliance level]

### ⚠️ Accessibility Concerns

- **[ExportName]** - [Specific accessibility issue]
    - **Impact**: [How this affects users]
    - **WCAG Violation**: [Specific WCAG criteria]
    - **Remediation**: [How to fix]

### 🔍 Accessibility Testing Needs

- [ ] Screen reader testing for [specific exports]
- [ ] Keyboard navigation testing for [specific exports]
- [ ] Color contrast validation for [specific exports]
- [ ] Focus management testing for [specific exports]

---

## 🎯 Migration Assessment

### ✅ Keep As-Is (Low Risk)

- **Exports**: [List of exports to keep]
- **Reasoning**: [Why these are good as-is]
- **Confidence**: High/Medium/Low
- **Timeline**: Immediate

### 🔄 Refactor (Medium Risk)

- **Exports**: [List of exports needing refactoring]
- **Issues**: [Specific problems to address]
- **Proposed Changes**: [What needs to change]
- **Effort Estimate**: [Hours/Days/Weeks]
- **Dependencies**: [What else needs to change]
- **Confidence**: High/Medium/Low
- **Timeline**: [Timeframe]

### 🚫 Replace/Remove (High Risk)

- **Exports**: [List of exports to replace/remove]
- **Issues**: [Major problems]
- **Replacement Strategy**: [How to replace]
- **Breaking Changes**: [What will break]
- **Migration Path**: [How to migrate users]
- **Effort Estimate**: [Hours/Days/Weeks]
- **Confidence**: High/Medium/Low
- **Timeline**: [Timeframe]

---

## 🔮 Spectrum 2 Recommendations

### 🎯 Priority Actions

1. **High Priority**: [Specific action items for this file]
2. **Medium Priority**: [Specific action items for this file]
3. **Low Priority**: [Specific action items for this file]

### 📋 File-Specific Success Criteria

- [ ] [Specific measurable goal for this file]
- [ ] [Specific measurable goal for this file]
- [ ] [Specific measurable goal for this file]

### 🔄 Refactoring Strategy

1. **Phase 1**: [Initial changes]
2. **Phase 2**: [Follow-up changes]
3. **Phase 3**: [Final optimization]

### ⚠️ Breaking Change Considerations

- **API Changes**: [Any API changes needed]
- **Import Path Changes**: [Any import changes needed]
- **Behavioral Changes**: [Any behavior changes]
- **Migration Guide**: [How users should adapt]

---

## 📊 Metrics & KPIs

### 📈 Current Metrics

| **Metric**          | **Value** | **Target**  | **Gap** |
| ------------------- | --------- | ----------- | ------- |
| **File Complexity** | [X.X/10]  | [X.X/10]    | [Gap]   |
| **Export Count**    | [X]       | [Target]    | [Gap]   |
| **Bundle Size**     | [X KB]    | [Target KB] | [Gap]   |
| **Test Coverage**   | [X%]      | 95%         | [Gap]   |
| **Type Safety**     | [X%]      | 100%        | [Gap]   |

### 🎯 Success Metrics

- **Complexity Reduction**: [Current] → [Target]
- **Performance Improvement**: [Current] → [Target]
- **Bundle Size Reduction**: [Current] → [Target]
- **API Simplification**: [Current exports] → [Target exports]

---

## 🧪 Testing Considerations

### 🔬 Current Test Coverage

- **Unit Tests**: [X% coverage]
- **Integration Tests**: [X% coverage]
- **E2E Tests**: [X% coverage]
- **Accessibility Tests**: [X% coverage]

### 🎯 Additional Testing Needed

- [ ] [Specific test scenarios for this file]
- [ ] [Performance benchmarks needed]
- [ ] [Accessibility test cases needed]
- [ ] [Browser compatibility tests needed]

### 🔧 Test Infrastructure Requirements

- **Tools Needed**: [Testing tools/frameworks]
- **Setup Requirements**: [Environment setup]
- **CI/CD Integration**: [Pipeline requirements]

---

## 📝 Usage Examples

### 💡 Common Usage Patterns

```typescript
// Example 1: Basic usage
import { ExportName } from '@spectrum-web-components/tool/filename';

const instance = new ExportName();
instance.method();
```

```typescript
// Example 2: Advanced usage
import {
    ExportName,
    HelperFunction,
} from '@spectrum-web-components/tool/filename';

const result = HelperFunction(ExportName.staticMethod());
```

### ⚠️ Anti-Patterns to Avoid

```typescript
// DON'T: Anti-pattern example
import { BadPattern } from '@spectrum-web-components/tool/filename';
// Explanation of why this is bad
```

```typescript
// DO: Recommended pattern
import { GoodPattern } from '@spectrum-web-components/tool/filename';
// Explanation of why this is better
```

---

## 📚 Related Documentation

### 🔗 Internal References

- [Related tool analysis](../other-tool/OVERVIEW.md)
- [Component usage examples](../../components/COMPONENT.md)
- [Migration guide](../../migration/MIGRATION_GUIDE.md)

### 🌐 External References

- [Lit Element Documentation](https://lit.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🔄 Change History

| **Date**   | **Change**                | **Author** | **Reason**                   |
| ---------- | ------------------------- | ---------- | ---------------------------- |
| 2024-XX-XX | Initial analysis          | [Author]   | File-level analysis creation |
| 2024-XX-XX | Updated complexity scores | [Author]   | Refined assessment           |

---

# 🔧 BASE TOOL - `Base.ts` Analysis (Example)

## 📋 File Overview

| **Attribute**        | **Value**                                              |
| -------------------- | ------------------------------------------------------ |
| **File Path**        | `tools/base/src/Base.ts`                               |
| **File Size**        | 9.5 KB                                                 |
| **Lines of Code**    | 272 lines                                              |
| **Primary Purpose**  | Foundation class and mixin for all Spectrum components |
| **Complexity Score** | 7.5/10                                                 |
| **Export Count**     | 4 exports                                              |
| **Import Count**     | 2 imports                                              |

## 📦 Imports Analysis

### 🌐 External Dependencies

| **Package**                                    | **Import**                    | **Usage**                  | **Migration Risk** |
| ---------------------------------------------- | ----------------------------- | -------------------------- | ------------------ |
| `lit`                                          | `LitElement, ReactiveElement` | Base web component classes | Low                |
| `@spectrum-web-components/base/src/version.js` | `version`                     | Package version tracking   | Low                |

### 🔗 Internal Dependencies

| **File** | **Import** | **Usage**           | **Migration Risk** |
| -------- | ---------- | ------------------- | ------------------ |
| None     | -          | Self-contained file | Low                |

## 🎯 Exports Analysis

### 📊 Export Summary

| **Type**           | **Count** | **Names**                                       |
| ------------------ | --------- | ----------------------------------------------- |
| **Classes**        | 1         | SpectrumElement                                 |
| **Interfaces**     | 1         | SpectrumInterface                               |
| **Types**          | 3         | Constructor, ThemeRoot, ContentDirectionManager |
| **Functions**      | 1         | SpectrumMixin                                   |
| **Constants**      | 0         | -                                               |
| **Default Export** | 0         | -                                               |

---

## 📋 Detailed Export Documentation

### 🏗️ Classes

#### `SpectrumElement`

```typescript
export class SpectrumElement extends SpectrumMixin(LitElement) {
    static VERSION = version;
}
```

- **Purpose**: Base class for all Spectrum Web Components with built-in direction management
- **Extends**: `SpectrumMixin(LitElement)`
- **Implements**: `SpectrumInterface` (via mixin)
- **Complexity**: High (8/10)
- **Key Methods**:
    - `hasVisibleFocusInTree(): boolean` - Determines if focus is visible in component tree
    - `connectedCallback(): void` - Sets up RTL/LTR direction management
    - `disconnectedCallback(): void` - Cleans up direction management
- **Key Properties**:
    - `isLTR: boolean` - Whether component is left-to-right
    - `dir: 'ltr' | 'rtl'` - Text direction attribute
    - `shadowRoot: ShadowRoot` - Component's shadow root
    - `VERSION: string` - Static package version
- **Usage Pattern**: `class MyComponent extends SpectrumElement {}`
- **Dependencies**: SpectrumMixin, LitElement, version
- **Used By**: All 68 Spectrum components
- **Migration Strategy**: Refactor - simplify direction management
- **Accessibility Impact**: Critical for RTL/LTR support and focus management

### 🔧 Interfaces

#### `SpectrumInterface`

```typescript
export interface SpectrumInterface {
    shadowRoot: ShadowRoot;
    isLTR: boolean;
    hasVisibleFocusInTree(): boolean;
    dir: 'ltr' | 'rtl';
}
```

- **Purpose**: Defines the contract for Spectrum component functionality
- **Properties**:
    - `shadowRoot: ShadowRoot` - Required shadow DOM root
    - `isLTR: boolean` - Direction helper property
    - `dir: 'ltr' | 'rtl'` - Direction attribute
- **Methods**:
    - `hasVisibleFocusInTree(): boolean` - Focus visibility detection
- **Implementers**: All classes using SpectrumMixin
- **Migration Strategy**: Keep - well-defined interface

### 🎨 Types

#### `Constructor<T>`

```typescript
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
```

- **Purpose**: Generic type for class constructors in mixin pattern
- **Definition**: Constructor function with prototype
- **Usage**: Used by SpectrumMixin for type safety
- **Migration Strategy**: Keep - standard TypeScript pattern

#### `ThemeRoot`

```typescript
type ThemeRoot = HTMLElement & {
    startManagingContentDirection: (el: HTMLElement) => void;
    stopManagingContentDirection: (el: HTMLElement) => void;
};
```

- **Purpose**: Defines elements that can manage content direction for children
- **Definition**: HTMLElement with direction management methods
- **Usage**: Used in direction management system
- **Migration Strategy**: Refactor - simplify direction management

#### `ContentDirectionManager`

```typescript
type ContentDirectionManager = HTMLElement & {
    startManagingContentDirection?(): void;
};
```

- **Purpose**: Defines elements that can manage their own content direction
- **Definition**: HTMLElement with optional direction management
- **Usage**: Used in canManageContentDirection function
- **Migration Strategy**: Refactor - part of over-engineered direction system

### ⚙️ Functions

#### `SpectrumMixin()`

```typescript
export function SpectrumMixin<T extends Constructor<ReactiveElement>>(
    constructor: T
): T & Constructor<SpectrumInterface> {
    // Complex mixin implementation
}
```

- **Purpose**: Mixin function that adds Spectrum functionality to any ReactiveElement class
- **Parameters**:
    - `constructor: T` - Base class to enhance
- **Returns**: `T & Constructor<SpectrumInterface>` - Enhanced class with Spectrum functionality
- **Side Effects**: Sets up global RTL observer, manages element direction
- **Complexity**: Very High (9/10)
- **Usage Pattern**: `class Enhanced extends SpectrumMixin(BaseClass) {}`
- **Dependencies**: RTL observer system, theme root detection
- **Used By**: SpectrumElement, potentially custom base classes
- **Migration Strategy**: Replace - over-engineered, performance issues
- **Performance Impact**: High - global mutation observer, complex lifecycle management

---

## 🔄 Internal File Dependencies

### 📊 Dependency Graph

```
Base.ts
├── depends on: lit (LitElement, ReactiveElement), version.js
├── used by: All 68 components, theme components
└── exports used by:
    ├── SpectrumElement → All components
    ├── SpectrumMixin → Custom base classes
    ├── SpectrumInterface → Type checking
    └── Types → Internal typing
```

### 🔗 Cross-File Relationships

| **This File Exports** | **Used By File**       | **Import Pattern**                                                       |
| --------------------- | ---------------------- | ------------------------------------------------------------------------ |
| `SpectrumElement`     | All component files    | `import { SpectrumElement } from '@spectrum-web-components/base'`        |
| `SpectrumMixin`       | Custom implementations | `import { SpectrumMixin } from '@spectrum-web-components/base'`          |
| `SpectrumInterface`   | Type definitions       | `import type { SpectrumInterface } from '@spectrum-web-components/base'` |

---

## 🎯 Complexity Analysis

### 🔍 Complexity Factors

- **Lines of Code**: 272 lines (Weight: 6/10)
- **Cyclomatic Complexity**: High (Weight: 8/10)
- **Dependencies**: 2 deps (Weight: 3/10)
- **Type Complexity**: Complex generics (Weight: 7/10)
- **API Surface**: 4 exports (Weight: 4/10)

### 📈 Complexity Score Calculation

```
Base Score: 6/10
+ Mixin Pattern Complexity: +2
+ Direction Management Logic: +2
+ Global State Management: +1
- Well-Typed APIs: -0.5
= Final Score: 7.5/10
```

### 🎯 Complexity Ranking

1. **Most Complex**: SpectrumMixin (9/10) - Complex direction management, global observers
2. **Medium Complex**: SpectrumElement (8/10) - Inherits mixin complexity
3. **Least Complex**: Constructor type (1/10) - Standard TypeScript pattern

---

## 🚧 Accessibility Analysis

### ✅ Accessibility-Friendly Exports

- **SpectrumInterface.hasVisibleFocusInTree** - Supports focus visibility detection
- **SpectrumInterface.dir** - Enables RTL/LTR internationalization
- **SpectrumInterface.isLTR** - Provides direction context for components

### ⚠️ Accessibility Concerns

- **SpectrumMixin direction management** - Complex direction changes may not announce to screen readers
    - **Impact**: Users with screen readers may miss direction changes
    - **WCAG Violation**: 3.2.2 On Input (unexpected context changes)
    - **Remediation**: Add aria-live announcements for direction changes

### 🔍 Accessibility Testing Needs

- [ ] Screen reader testing for direction changes
- [ ] Keyboard navigation testing with RTL/LTR switching
- [ ] Focus management testing in complex direction scenarios
- [ ] Voice control testing with direction-aware components

---

## 🎯 Migration Assessment

### ✅ Keep As-Is (Low Risk)

- **Exports**: Constructor type, SpectrumInterface
- **Reasoning**: Well-defined, stable APIs with good TypeScript support
- **Confidence**: High
- **Timeline**: Immediate

### 🔄 Refactor (Medium Risk)

- **Exports**: SpectrumElement class
- **Issues**: Inherits complexity from SpectrumMixin but provides stable API
- **Proposed Changes**: Simplify internal implementation while maintaining API
- **Effort Estimate**: 2-3 weeks
- **Dependencies**: Must refactor SpectrumMixin first
- **Confidence**: Medium
- **Timeline**: After SpectrumMixin refactor

### 🚫 Replace/Remove (High Risk)

- **Exports**: SpectrumMixin, ThemeRoot, ContentDirectionManager types
- **Issues**: Over-engineered direction management, performance impact, complex lifecycle
- **Replacement Strategy**: CSS-based direction handling with minimal JavaScript
- **Breaking Changes**: Custom classes using SpectrumMixin directly
- **Migration Path**: Provide SpectrumElement as primary base class, deprecate direct mixin usage
- **Effort Estimate**: 4-6 weeks
- **Confidence**: Medium
- **Timeline**: Spectrum 2.0 major version

---

## 🔮 Spectrum 2 Recommendations

### 🎯 Priority Actions

1. **High Priority**: Replace complex direction management with CSS-based solution
2. **Medium Priority**: Simplify SpectrumElement API while maintaining compatibility
3. **Low Priority**: Improve TypeScript types for better developer experience

### 📋 File-Specific Success Criteria

- [ ] Reduce SpectrumMixin complexity from 9/10 to 4/10
- [ ] Maintain 100% API compatibility for SpectrumElement
- [ ] Eliminate global mutation observer performance impact
- [ ] Add comprehensive accessibility announcements for direction changes

### 🔄 Refactoring Strategy

1. **Phase 1**: Create new simplified direction management system
2. **Phase 2**: Migrate SpectrumElement to use new system internally
3. **Phase 3**: Deprecate complex SpectrumMixin patterns, provide migration guide

### ⚠️ Breaking Change Considerations

- **API Changes**: None for SpectrumElement, SpectrumMixin usage patterns may change
- **Import Path Changes**: None expected
- **Behavioral Changes**: Direction management will be more performant but functionally identical
- **Migration Guide**: Provide examples for custom SpectrumMixin usage migration

---

## 📊 Metrics & KPIs

### 📈 Current Metrics

| **Metric**          | **Value** | **Target** | **Gap** |
| ------------------- | --------- | ---------- | ------- |
| **File Complexity** | 7.5/10    | 4.0/10     | -3.5    |
| **Export Count**    | 4         | 3          | -1      |
| **Bundle Size**     | 15 KB     | 10 KB      | -5 KB   |
| **Test Coverage**   | 85%       | 95%        | -10%    |
| **Type Safety**     | 90%       | 100%       | -10%    |

### 🎯 Success Metrics

- **Complexity Reduction**: 7.5/10 → 4.0/10
- **Performance Improvement**: Remove global observer overhead
- **Bundle Size Reduction**: 15 KB → 10 KB
- **API Simplification**: 4 exports → 3 exports (remove complex types)

---

This template provides extremely detailed analysis at the individual file level, allowing for precise migration planning and comprehensive understanding of each source file's role in the overall system.

## 📊 **What This File-Level Approach Would Look Like:**

### **Total File Count Estimate:**

- **Base Tool**: ~12 TypeScript files
- **Shared Tool**: ~13 TypeScript files
- **Reactive Controllers**: ~10 TypeScript files
- **Styles Tool**: ~20+ TypeScript files
- **Theme Tool**: ~15+ TypeScript files
- **Bundle Tool**: ~8 TypeScript files
- **Grid Tool**: ~5 TypeScript files
- **Opacity Checkerboard**: ~3 TypeScript files
- **Truncated**: ~3 TypeScript files

**Total Estimated Files: ~90 individual file analyses**

### **Directory Structure Example:**

```
analysis/tools/
├── EXPORT_ANALYSIS_TEMPLATE.md
├── INDIVIDUAL_FILE_TEMPLATE.md
├── base/
│   ├── BASE_TOOL_OVERVIEW.md
│   ├── Base.ts.md
│   ├── sizedMixin.ts.md
│   ├── streaming-listener.ts.md
│   ├── index.ts.md
│   ├── version.ts.md
│   ├── async-directive.ts.md
│   ├── condition-attribute-with-id.ts.md
│   ├── decorators.ts.md
│   ├── define-element.ts.md
│   ├── directive.ts.md
│   ├── directives.ts.md
│   └── html.ts.md
├── shared/
│   ├── SHARED_TOOL_OVERVIEW.md
│   ├── focusable.ts.md (already exists!)
│   ├── focus-visible.ts.md
│   ├── focusable-selectors.ts.md
│   └── [... 10 more files]
└── [... 7 more tool directories]
```

This approach gives you **maximum granularity** - every single export in every single file would be documented with migration strategies, complexity analysis, and accessibility assessment. It's extremely comprehensive but also a significant undertaking (~90 files to analyze).

Would you like me to proceed with this file-level approach, or would you prefer the tool-level approach I originally proposed?
