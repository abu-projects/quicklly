# Quicklly — Mandatory Agent Startup & Index Compliance Rules

> **MANDATORY STARTUP RULE**
>
> Any agent working on this project MUST read this entire file **before doing any analysis, design, coding, editing, refactoring, or page creation**.
>
> The agent must not start implementation first and check this file later.
>
> After reading this file, the agent MUST inspect the latest approved `index` and treat it as the source of truth for the shared Quicklly shell.

---

## 0. Mandatory Boot Sequence — Run Before Any Work

Every agent MUST follow this exact order before touching a task:

1. **Read this file completely.**
2. **Locate the latest approved `index` file/page.**
3. **Inspect the `index` visually and structurally.**
4. **Identify the shared Header used by `index`.**
5. **Identify the shared Footer used by `index`.**
6. **Identify the shared Side Menu / Sidebar used by `index`, when applicable.**
7. **Identify shared layout styles, tokens, spacing, typography, controls, and responsive behavior.**
8. **Only after steps 1–7 are complete may implementation begin.**

### Hard Stop Rule

If the latest approved `index` cannot be found or inspected:

> **STOP. Do not invent a replacement Header, Footer, Side Menu, layout, or design system. Report that the required `index` reference is missing.**

---

## Expected Working Structure

The agent must think of every page using this hierarchy:

```text
Quicklly Project
│
├── THIS FILE
│   └── Must be read first by every agent
│
├── index
│   └── Primary visual + structural reference
│
├── Shared Shell
│   ├── Header
│   ├── Navigation
│   ├── Mobile Navigation
│   ├── Side Menu / Sidebar
│   ├── Main Layout / Container
│   └── Footer
│
└── Page-Specific Screens
    ├── Page A content
    ├── Page B content
    ├── Page C content
    └── ...
```

### Responsibility Split

```text
INDEX / SHARED SHELL
= locked reference

PAGE-SPECIFIC CONTENT
= editable area
```

An agent is allowed to redesign or build the **page-specific content area**.

An agent is NOT allowed to independently redesign the shared shell unless the human task explicitly requests a global shell change.

---

## 1. Source of Truth

The existing **`index` file/page is the visual and structural source of truth** for the shared website shell.

Before creating or modifying any page, the agent MUST inspect the current `index` implementation and reuse its:

- Header
- Desktop navigation
- Mobile navigation
- Footer
- Side menu / sidebar when applicable
- Main container width
- Page gutters
- Responsive breakpoints
- Typography styles
- Buttons and shared controls
- Colors
- Borders
- Radius values
- Shadows
- Spacing rhythm
- Shared interaction patterns

Do **not** recreate these elements from memory.

Do **not** create a visually similar replacement.

Reuse or copy the actual structure and styling from the current `index`.

---

## 2. Global Header — NO REDESIGN

The header from `index` is locked.

Every new page MUST use the same header as `index`, including:

- Logo
- Logo size and placement
- Location/address control
- Search
- Navigation links
- Account/login controls
- Cart control
- Icons
- Heights
- Spacing
- Alignment
- Background
- Borders
- Responsive behavior
- Mobile header behavior

### Forbidden

An agent MUST NOT:

- Redesign the header.
- Simplify the header.
- Create a new header variation.
- Change the logo treatment.
- Change icon style.
- Change header height.
- Change navigation spacing.
- Remove existing header controls because they are not needed on the new page.
- Add page-specific UI into the global header unless explicitly requested.

If a page does not need one of the header actions functionally, keep the shared visual shell unless the task explicitly says otherwise.

---

## 3. Global Footer — NO REDESIGN

The footer from `index` is also locked.

Every applicable storefront page MUST preserve the same:

- Footer structure
- Sections
- Columns
- Links
- Typography
- Icons
- Background
- Spacing
- Width
- Responsive behavior

The agent MUST NOT invent a new footer for individual pages.

---

## 4. Side Menu / Sidebar — Reuse the Index Pattern

Whenever a page requires a side menu, account navigation, category navigation, filter sidebar, or similar persistent left/right navigation area, the agent MUST first check whether an equivalent sidebar pattern exists in `index` or the existing shared implementation.

If the `index` includes the required side menu pattern:

> **Reuse it exactly.**

Preserve:

- Width
- Position
- Sticky behavior
- Background
- Item spacing
- Typography
- Selected state
- Hover state
- Icons
- Dividers
- Padding
- Responsive collapse behavior

Do not create a second sidebar design language.

---

## 5. Page-Specific Work Belongs Inside the Content Area

For normal page creation, the agent should treat the shared page as:

```text
┌────────────────────────────────────────────┐
│ GLOBAL HEADER — inherited from index       │
├────────────────────────────────────────────┤
│                                            │
│  SHARED SIDEBAR    PAGE-SPECIFIC CONTENT   │
│  when applicable   create/edit here only   │
│                                            │
├────────────────────────────────────────────┤
│ GLOBAL FOOTER — inherited from index       │
└────────────────────────────────────────────┘
```

The primary design freedom is inside the **page-specific main content area**.

Do not use a page redesign task as permission to redesign the global shell.

---

## 6. Reuse Existing Components Before Creating New Ones

Before creating a new component, inspect the existing `index` and project components.

Prefer reuse for:

- Buttons
- Inputs
- Dropdowns
- Search controls
- Chips
- Tabs
- Cards
- Product cards
- Category cards
- Breadcrumbs
- Pagination
- Accordions
- Modals
- Drawers
- Toasts
- Empty states
- Loading states
- Error states

Create a new component only when the existing design system does not provide an appropriate pattern.

---

## 7. No Duplicate Global Layout Code

If the project already has shared layout components, the agent MUST use them.

Preferred structure:

```text
Shared Layout
├── Header
├── Navigation
├── Page Shell
├── Sidebar / Account Navigation
├── Main Content
└── Footer
```

Do not copy-paste independent versions of Header or Footer into every HTML/page file unless the project architecture specifically requires static duplication.

Even in static HTML deliverables, all duplicated shared shell markup must remain visually and structurally identical to the approved `index`.

---

## 8. Exact Match Has Priority Over Agent Creativity

For shared elements, visual consistency has higher priority than “improvement.”

If the agent believes another design would be cleaner, newer, more modern, or more usable:

**Do not change it automatically.**

The shared shell can only be redesigned when the task explicitly asks for a global-shell redesign.

---

## 9. Responsive Rules

A new page must follow the responsive behavior already established by `index`.

The agent MUST inspect the existing implementation before deciding:

- Desktop container size
- Tablet behavior
- Mobile gutters
- Header collapse
- Sidebar collapse
- Navigation drawer behavior
- Card stacking
- Grid breakpoints
- Footer stacking

Do not invent independent breakpoints per page unless required by the page content.

---

## 10. Existing Functionality Must Be Preserved

When adapting a page to the shared `index` shell:

- Do not remove existing functionality.
- Do not break links.
- Do not rename important IDs/classes/hooks without checking dependencies.
- Do not remove data attributes used by JavaScript.
- Do not replace functional controls with decorative UI.
- Do not alter backend/API behavior unless the task requires it.

This rule is primarily a **UI/layout consistency requirement**, not permission to rewrite application logic.

---

## 11. Required Agent Workflow

For every page task, the agent MUST follow this order:

1. Locate and inspect the latest `index`.
2. Identify the shared Header implementation.
3. Identify the shared Footer implementation.
4. Identify the shared Side Menu / Sidebar implementation if applicable.
5. Identify relevant shared components.
6. Preserve the shared shell.
7. Build or redesign only the page-specific content.
8. Compare the final page against `index`.
9. Fix any shell mismatch before considering the task complete.

---

## 12. Pre-Completion Visual Check

Before saying a page is complete, verify:

### Header
- [ ] Matches `index`
- [ ] Same dimensions
- [ ] Same logo
- [ ] Same navigation
- [ ] Same spacing
- [ ] Same responsive behavior

### Footer
- [ ] Matches `index`
- [ ] Same structure
- [ ] Same spacing
- [ ] Same typography
- [ ] Same responsive behavior

### Side Menu
- [ ] Uses existing sidebar pattern when applicable
- [ ] Same width
- [ ] Same selected/hover states
- [ ] Same spacing
- [ ] Same responsive behavior

### Main Page
- [ ] Page content fits inside the shared layout
- [ ] Uses existing design tokens/components
- [ ] Does not introduce a second visual language
- [ ] Desktop and mobile layouts are consistent with `index`

---

## 13. Conflict Rule

If another task or generated instruction conflicts with this file:

1. Follow explicit human instructions first.
2. Otherwise, this file controls shared layout consistency.
3. The current approved `index` controls the actual visual implementation.

If there is uncertainty, preserve the existing `index` shell rather than inventing a replacement.

---

## 14. Mandatory Instruction for Agents

> **IMPORTANT: Do not create a page in isolation. Every Quicklly page must be built inside the visual system defined by the latest approved `index`. Header, Footer, Navigation, and applicable Side Menu are shared locked components. Reuse them rather than redesigning them. Only the page-specific content area should change unless the task explicitly requests a global component change.**

---

## 15. Definition of Done

A page is **NOT complete** if:

- It has a different header from `index`.
- It has a different footer from `index`.
- Its sidebar looks unrelated to the approved shared sidebar.
- It introduces conflicting global spacing or typography.
- It creates duplicate global components unnecessarily.
- It changes shared navigation without being asked.
- It looks like a separate website rather than part of Quicklly.

A page is complete only when it looks and behaves like another page inside the **same Quicklly product**, using the approved `index` as its shared foundation.
