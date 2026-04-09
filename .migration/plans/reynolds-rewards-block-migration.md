Let me gather information about the Figma component and the project structure to build a comprehensive plan.# Figma "Punch Card" Block Migration Plan

## Overview

Migrate the **Punch Card** component from the Reynolds Rewards Wireframes Figma file to an Edge Delivery Services block. This is a loyalty/rewards punch card component showing a title, description, circular punch indicators, points badge, and various states (default, one punch, completed, error).

**Figma Source:** `R1pehdY1rYkunbvetczSlF` — node `1435:37980`

---

## Component Analysis

From the Figma metadata and screenshot:

| Property | Value |
|----------|-------|
| **Component Name** | Punch Card |
| **Mobile Size** | 338 × 216 px |
| **Desktop Size** | 520 × 317 px |
| **States** | Default (w/ badge), Default (w/o badge), One Punch, Completed, Error |
| **Key Elements** | Title, description, 5 punch circles, points badge (+XXX), optional "NEW" badge, completion checkmark, error message |

### Variants in Figma

| Frame | Name | Node ID |
|-------|------|---------|
| Mobile - Default W/ Badge | `Punch Card - Default W/ Badge` | `1435:37998` |
| Mobile - Default W/O Badge | `Punch Card - Default W/O Badge` | `1435:38052` |
| Mobile - One Punch | `Punch Card - One Punch` | `1435:37999` |
| Mobile - Completed | `Punch Card - Completed` | `1435:38026` |
| Mobile - Error | `Punch Card - Error` | `1632:16216` |
| Desktop - Default W/O Badge | `Punch Card - Default W/O Badge - Desktop` | `1445:40314` |

### Block Type Decision

This is a **custom block** — it doesn't map to a standard EDS block (hero, cards, columns, etc.). It will be created as a new block called **`punch-card`**.

- **Block Type:** Custom (new block)
- **Variant Name:** `punch-card` (base block, no variant suffix needed since it's entirely new)

---

## Migration Phases

### Phase 1: Discovery (Steps 1–3)

- [x] Parse Figma URL — fileKey: `R1pehdY1rYkunbvetczSlF`, nodeId: `1435:37980`
- [x] Call `get_metadata` — structure retrieved (6 mobile frames + 1 desktop frame)
- [x] Capture screenshot — visual reference obtained
- [ ] Extract design context from key child nodes (mobile default, desktop default)
- [ ] Extract design tokens/variables from the component
- [ ] Document component structure (heading, description, punch circles, badge, points)
- [ ] Confirm no existing similar blocks in the project (blocks/ is currently empty)

### Phase 2: Extraction (Steps 4–7)

- [ ] **Step 4 — Visual Analysis:** Call `get_design_context` on child frames to extract exact measurements
  - [ ] 4.1: Extract design context from `1435:37998` (Default W/ Badge - Mobile)
  - [ ] 4.2: Extract design context from `1445:40314` (Default W/O Badge - Desktop)
  - [ ] 4.3: Complete the Visual Measurement Checklist (layout, spacing, colors, typography, borders, shadows)
  - [ ] 4.4: Save measurements to `blocks/punch-card/punch-card-measurements.txt`
- [ ] **Step 5 — Create Component Tokens:**
  - [ ] Create `blocks/punch-card/punch-card-tokens.css` with all design values as CSS custom properties
  - [ ] Ensure every measurement has a corresponding token
  - [ ] Validate token file syntax (no floating properties)
- [ ] **Step 6 — Create Block:**
  - [ ] Create `blocks/punch-card/` directory
  - [ ] Write `punch-card.js` — decoration logic for punch card structure (circles, badges, states)
  - [ ] Write `punch-card.css` — styles with 100% token references
  - [ ] Generate `metadata.json` with visual characteristics
- [ ] **Step 7 — CSS Implementation:**
  - [ ] Import token file in block CSS
  - [ ] Implement responsive layout (mobile → desktop)
  - [ ] Style punch circles (empty, filled states)
  - [ ] Style badge, points indicator, error state, completed state
  - [ ] Validate zero hardcoded values in CSS

### Phase 3: Content Generation (Steps 8–9)

- [ ] **Step 8 — Generate EDS Plain HTML:**
  - [ ] Define content model (rows/columns structure for punch card)
  - [ ] Create `content/punch-card.plain.html` with block class `punch-card`
  - [ ] Include sample content: title, description, punch count, points value
  - [ ] Update `metadata.json` usage fields
- [ ] **Step 9 — Validate HTML:**
  - [ ] Verify div-based structure (no tables/markdown)
  - [ ] Verify block class name is `punch-card`
  - [ ] Verify proper nesting

### Phase 4: Verification (Steps 10–11)

- [ ] **Step 10 — Preview Verification:**
  - [ ] Load `http://localhost:3000/content/punch-card` in preview
  - [ ] Verify block renders with correct structure
  - [ ] Verify tokens are applied (colors, spacing, typography)
  - [ ] Capture preview screenshot
- [ ] **Step 11 — Visual Comparison:**
  - [ ] Side-by-side comparison: Figma screenshot vs preview
  - [ ] Document any discrepancies
  - [ ] Fix discrepancies by updating tokens/CSS
  - [ ] Iterate until visual match is confirmed
- [ ] **Cleanup:**
  - [ ] Remove measurements file
  - [ ] Remove reference/ directory

---

## Key Considerations

1. **Custom Block:** Since this is not a standard EDS block, we cannot use `get_vanilla_block_code`. The JS and CSS will be authored from scratch following EDS block conventions.

2. **Interactive States:** The punch card has multiple visual states (empty, punched, completed, error) that need to be handled via CSS classes and JS decoration logic.

3. **Responsive Design:** Mobile (338px) and Desktop (520px) layouts differ — the desktop version is wider with more spacing. Mobile-first CSS with `min-width` media queries.

4. **Punch Circle Rendering:** The 5 circles (empty vs filled) are a key visual element. These will likely be rendered as styled `<div>` or `<span>` elements via JS decoration.

5. **Content Model:** Authors will need to specify: title, description, number of punches completed, total punches, points value, and optional badge text. This maps to a row/column div structure.

---

## Expected Output Files

```
blocks/
  punch-card/
    punch-card.js              # Block decoration logic
    punch-card.css             # Styles with token references
    punch-card-tokens.css      # Design tokens from Figma
    metadata.json              # Block metadata for reuse

content/
  punch-card.plain.html        # Sample content in EDS format
```

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Complex interactive states may not map well to static EDS content | Focus on the "Default W/O Badge" state as primary; handle states via CSS class modifiers |
| No vanilla block to clone for punch circles | Author custom JS decoration that transforms authored content into circle elements |
| Wireframe-level design (no final colors/fonts) | Extract exact values from Figma; these are wireframe grays and can be updated later with final design tokens |

---

*This plan is ready for execution. Switch to Execute mode to begin the migration.*
