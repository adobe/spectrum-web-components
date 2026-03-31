<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Alert Region / Alert region accessibility migration analysis

<!-- Document title (editable) -->

# Alert region accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What **`swc-alert-region`** is](#what-swc-alert-region-is)
    - [When to use **`swc-alert-banner`** instead](#when-to-use-swc-alert-banner-instead)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `<swc-alert-region>`](#recommendations-swc-alert-region)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc defines how **`swc-alert-region`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA**.

**`swc-alert-region`** is the **dismissible** banner: it uses **`role="region"`**, **must** have an **accessible name**, and includes a **dismiss** control. When **`open`**, **Escape** **must** run the **same** **dismiss** **path** as the **close** **button** (**contrast** **`swc-alert-banner`**, which **must not** close on **Escape**). It **must not** use **`role="alert"`**—that role is reserved for **`swc-alert-banner`** (see [Alert banner accessibility migration analysis](../alert-banner/accessibility-migration-analysis.md)).

**1st-gen** **`<sp-alert-banner dismissible>`** combined dismiss with **`role="alert"`** on **`.body`**; **2nd-gen** separates the dismissible pattern into this component with **`role="region"`**.

### Also read

- [Alert banner accessibility migration analysis](../alert-banner/accessibility-migration-analysis.md) for **`role="alert"`** and the non-dismissible pattern.
- [Alert Banner migration roadmap](../alert-banner/rendering-and-styling-migration-analysis.md) for shared layout, CSS, and DOM.

### What **`swc-alert-region`** is

- A persistent or semi-persistent message users can **dismiss** via a **close** control and **Escape** (match **1st-gen** **`handleKeydown`** when **`open`** and **`dismissible`**).
- **`role="region"`** on the appropriate container so the banner is a **named landmark**, not an assertive **`alert`** live region.
- **Accessible name** via **`aria-label`** and/or **`aria-labelledby`** (pointing at visible **heading** or **title** text inside the banner)—**required** for **`region`**.

### When to use **`swc-alert-banner`** instead

- The message should be announced **assertively** when it appears and **must not** be dismissed by the user from the banner itself—use **`swc-alert-banner`** (**no** **Escape** dismissal on that component).

---

## ARIA and WCAG context

### Pattern in the APG

- A **region** is a **perceivable** section with a **name** ([`region` role](https://www.w3.org/TR/wai-aria-1.2/#region)). Dismissible promotional or informational bars fit this better than **`role="alert"`**, which is for **urgent**, **often** **non-interactive** messages.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [`region` role](https://www.w3.org/TR/wai-aria-1.2/#region) | **Must** have **`aria-label`** or **`aria-labelledby`**. **Do not** leave the region **unnamed**. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Dismiss control **must** be **keyboard** operable (**Tab**, **Enter** / **Space** on the button). **Escape** **must** dismiss when **`open`** (same **path** as the **close** **button**), consistent with **1st-gen** **`AlertBannerBase`** when **`dismissible`**. **`swc-alert-banner`** **must not** use **Escape** for dismissal. |
| [Keyboard inside components (APG)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents) | **Focus** is on **focusable descendants** (**dismiss button**, **`action` slot**). With **multiple** **focusables**, **arrow** keys move **within** the **region**; **Tab** / **Shift**+**Tab** move **between page components** (see **Keyboard and focus**). |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Close button needs a **discernible** name (for example **“Close”** or **“Dismiss notification”** when **“Close”** is too vague). |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus ring on the dismiss control must be **visible**. |
| [Contrast (Minimum) (WCAG 1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | **Text** and **graphical objects** on the dismiss control must meet contrast against the **immediate** background (the banner fill), not only against the page. See [Deque: text against background](https://dequeuniversity.com/class/visual-design/contrast/text-against-background). |
| [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) | If a **separate** control **shows** or **hides** the whole region (not the **dismiss** **button** inside it), that control **must** use [**`aria-expanded`**](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) **`true`** / **`false`** to match **visibility** (**SWC-1126**, **WCAG** **4.1.2**). The **dismiss** control **dismisses** the region; it is **not** an expand/collapse toggle unless **product** defines that pattern explicitly. |

**Bottom line:** **`role="region"`** + **name** + **dismiss button** + **Escape**; **no** **`role="alert"`** on this component. The **dismiss** control **must** keep **sufficient** contrast on every **`variant`** (**SWC-1118**; see **Dismiss control contrast** in the recommendations table). Any **external** control that **toggles** region visibility **must** expose **`aria-expanded`** (**SWC-1126**).

---

## Recommendations: `<swc-alert-region>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **`role="region"`** | Set on the banner container that wraps message + actions + dismiss. **Do not** use **`role="alert"`** here. |
| **Accessible name** | **Require** **`aria-label`** or **`aria-labelledby`** (visible **title** / **heading** id). Document in Storybook; dev warning if missing in debug. |
| **Dismiss control** | **Close** button with an accessible **name**; follow **`swc-close-button`** / **`swc-button`** docs. |
| **`Escape`** | When **`open`**, **Escape** **must** invoke the **same** **dismiss** **flow** as the **close** **button** (including **cancelable** **`close`** **event** before hiding). This is **exclusive** to **`swc-alert-region`**; **`swc-alert-banner`** **must not** dismiss on **Escape**. |
| **Dismiss control contrast** | The dismiss control sits on the banner’s **tinted** background (**neutral**, **info**, **negative**). Default chrome can fail **WCAG** contrast on those fills (**SWC-1118**). The bundled dismiss control should use **static** contrast (for example **`static-color`** or equivalent tokens on the close **button**) so **label** and **icon** meet **1.4.3** against the banner. Document **per-`variant`** behavior in **Storybook** and cover with **VRT** / contrast checks. If consumers supply a custom dismiss control via **slot**, they own contrast for that control. |
| **`close` event** | **Cancelable** **`close`** event before hiding (**1st-gen** pattern) so apps can veto dismissal. |
| **`open`** | When **`open`** is **false**, remove or hide from the tree per implementation; restore focus sensibly if focus was inside the banner (app or component policy). |
| **`variant` / icons** | Same guidance as **`swc-alert-banner`**: **icons** need **`label`** when they convey **info** vs **error**. |
| **`action` slot** | Optional; slotted controls must be **fully** **labeled**. **Focus** **delegates** to **dismiss** and **`action`** **controls**; the **host** is **not** an **extra** **tab** **stop** unless **implementation** **requires** it for **naming** **only** (prefer **labeling** **without** **adding** **redundant** **focus**). |
| **Keyboard (in-region)** | With **two** or **more** **focusable** **children** (**dismiss** + **`action`**, or **multiple** **`action`** **items**), **arrow** keys **roam** **focus** **among** them; **Tab** / **Shift**+**Tab** move **focus** **out of** the **region**’s **control** **group** per the **page** **tab** **sequence** ([APG: keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)). |
| **Toggle control (`aria-expanded`)** | When **Storybook** or app **UI** uses a **trigger** to **show** / **hide** the region (independent of **dismiss**), that trigger **must** set [**`aria-expanded`**](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) to **`true`** when the region is **visible** and **`false`** when **hidden** (**SWC-1126**). Prefer **`aria-controls`** pointing at the region’s **id**. |

### Shadow DOM and cross-root ARIA Issues

- If the **region** wrapper is in shadow DOM, expose **`aria-label`** or **`aria-labelledby`** on the host (or ensure **`aria-labelledby`** targets resolve correctly across roots per **2nd-gen** patterns).

### Accessibility tree expectations

**Banner open**

- **Role:** **region** with a **computed** **accessible** **name**.
- **Dismiss** button: **button** with a **name**.

**Banner closed**

- Not exposed as an active region (match **`open`** and visibility).

### Keyboard and focus

- **Focusable** **surface:** The **`swc-alert-region`** **host** is **keyboard**-**relevant** only through **focusable** **descendants**—the **dismiss** **button** and any **`action`** **slot** **controls**. **Static** **message** **content** does **not** receive **focus**; **focus** **delegates** to those **controls**.
- **Multiple** **focusables** (**dismiss** + **`action`**, or **several** **`action`** **buttons**): Follow [keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents): **arrow** keys move **focus** **from** **button** **to** **button** **within** the **region**; **Tab** and **Shift**+**Tab** move **focus** **away** from the **region** to the **next** or **previous** **component** on the **page**—**do** **not** **trap** **Tab** **inside** the **region**.
- **Enter** / **Space** activate the **dismiss** **button** when **focused**.
- **Escape** (**required**): When **`open`**, **Escape** **must** call the **same** **dismiss** **path** as the **close** **button** (**1st-gen** **`dismissible`** parity). **`swc-alert-banner`** does **not** implement this.

---

## Known 1st-gen issues

- **`<sp-alert-banner dismissible>`** keeps **`role="alert"`** on **`.body`** while showing **`<sp-close-button>`**—**2nd-gen** **`swc-alert-region`** should use **`role="region"`** instead to avoid assertive live region semantics on dismissible UI.
- **Close** button **`label="Close"`** in **1st-gen**; consider richer labels in docs examples when context is ambiguous.
- **SWC-1118**: On **1st-gen** **alert banner**, the **dismiss** **button** did not always have enough contrast against the **semantic** banner background until **static** contrast was applied. **2nd-gen** should treat this as a **first-class** requirement for the packaged dismiss control on **`swc-alert-region`**, not a follow-up fix.
- **SWC-1126**: Toggled **banner** / **region** examples must expose [**`aria-expanded`**](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) on the **trigger** that **opens** / **closes** the component—not on the **dismiss** **button** unless that **button** truly toggles visibility.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`role="region"`**; **`aria-label`** or **`aria-labelledby`** present; dismiss button **name**; **Escape** **must** fire the dismiss path when **`open`** (same as **close** **button**). |
| **aXe + Storybook** | No **unnamed** **region**; dismiss stories keyboard-operable; contrast rules pass for the dismiss control on each **`variant`**. |
| **Integration** | **`close`** event cancelation still leaves banner **visible** and **accessible**. |
| **Toggle demos** | External trigger **`aria-expanded`** matches region **`open`** / visibility (**SWC-1126**). |
| **Keyboard** | **Escape** dismisses when **`open`**; with **multiple** **focusables**, **arrow** keys move **between** **dismiss** and **`action`** (or **among** **`action`** **items**); **Tab** **exits** per [APG inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents). |

---

## Summary checklist

- [ ] **`swc-alert-region`** uses **`role="region"`**, **not** **`role="alert"`**.
- [ ] **Every** example has **`aria-label`** or **`aria-labelledby`**.
- [ ] **Dismiss** control and **Escape** (**must** dismiss when **`open`**, unlike **`swc-alert-banner`**) documented and tested.
- [ ] **Dismiss** control meets **contrast** requirements on every **`variant`** (static contrast / **SWC-1118** pattern).
- [ ] Cross-link [Alert banner accessibility migration analysis](../alert-banner/accessibility-migration-analysis.md).
- [ ] **Toggle** stories set **`aria-expanded`** (and preferably **`aria-controls`**) on the trigger (**SWC-1126**).
- [ ] **Multiple** **focusable** **examples** document **arrow**-key **roving** and **Tab** / **Shift**+**Tab** **leaving** the **region** ([APG](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)).

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding contrast (minimum) (1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Deque University: text against background (contrast)](https://dequeuniversity.com/class/visual-design/contrast/text-against-background)
- [WAI-ARIA `region` role](https://www.w3.org/TR/wai-aria-1.2/#region)
- [WAI-ARIA `aria-expanded` (state)](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [APG: Developing a keyboard interface — keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
- [Alert banner accessibility migration analysis](../alert-banner/accessibility-migration-analysis.md)
- [Alert Banner migration roadmap](../alert-banner/rendering-and-styling-migration-analysis.md)
