---
name: dom-to-pptx-skill
description: Create HTML presentations that are optimized for conversion to PPTX via dom-to-pptx. Use when the user wants to create a PowerPoint presentation from HTML. Ships a safe HTML template, a conversion-friendly style whitelist, a pre-export validator, and sample prompts for common slide layouts — so the generated HTML uses only features dom-to-pptx reliably converts (no animations, fixed 1920×1080, inline styles, CORS-safe assets).
---

# Generate HTML for PPTX

Create HTML presentations optimized for dom-to-pptx conversion. Unlike frontend-slides which targets browser viewing, this skill generates HTML that dom-to-pptx can accurately convert to editable PowerPoint slides.

## Core Differences from frontend-slides

| frontend-slides | generate-html-pptx |
|-----------------|-------------------|
| 100vh viewport fitting | Fixed 1920x1080 dimensions |
| CSS clamp() responsive | Fixed pixel sizes |
| CSS animations/transitions | Static layout (animations not captured) |
| Scroll-snap navigation | Export as separate PPTX slides |
| Complex hover effects | Static composition |

## dom-to-pptx Compatibility Rules (CRITICAL)

dom-to-pptx reads computed styles and positions. The **full rule list** lives in [STYLE_WHITELIST.md](reference/STYLE_WHITELIST.md) and is enforced by the validator in [VALIDATION.md](reference/VALIDATION.md). Quick reference below — read the whitelist for edge cases and alternatives.

| Category | ✅ Use | ❌ Don't use |
| --- | --- | --- |
| **Dimensions** | Fixed px (1920×1080 recommended); `position: relative` + `overflow: hidden` on every `.slide` | `vh` / `vw` / `vmin` / `vmax` / `clamp()` on slide content |
| **Positioning** | `position: absolute` with px `left/top/width/height`; `flex` / `grid` (final rects are measured); `transform: rotate()` | `transform: translate()` / `scale()` / `skew()` / `matrix()` |
| **Backgrounds** | Solid colors, `linear-gradient()` (any angle, multi-stop) | `radial-gradient` (partial), `conic-gradient`, `mix-blend-mode`, `backdrop-filter` |
| **Effects** | `box-shadow` (outer), `filter: blur()`, `opacity` | `animation`, `transition`, `text-shadow`, `clip-path`, other `filter` functions |
| **Images** | `https://…` with CORS, `data:…` base64, `border-radius` clipping, `object-fit` | Relative paths, `file://`, `loading="lazy"`, non-CORS hosts |
| **Fonts** | Google Fonts `<link crossorigin="anonymous">`, web-safe fallback | `<link>` without `crossorigin`, relative `@font-face url(...)` |
| **Styling approach** | Inline styles on every slide element | Slide content styled only via classes (works but harder to debug) |

If unsure about a property, search for it in [STYLE_WHITELIST.md](reference/STYLE_WHITELIST.md) or grep the `dom-to-pptx/src/utils.js` source.

---

## Phase 1: Content Discovery

Ask all questions in a single call:

**Question 1 — Purpose** (header: "Purpose"):
What is this presentation for? Options: Pitch deck / Teaching-Tutorial / Conference talk / Business report / General

**Question 2 — Slide Count** (header: "Slides"):
How many slides do you need? Options: 3-5 / 6-10 / 10-20 / 20+

**Question 3 — Content** (header: "Content"):
Do you have content ready? Options: All content ready / Rough notes / Topic only

**Question 4 — Style Direction** (header: "Style"):
What visual style? Options:
- "Show me options" — Generate 3 style previews
- "I know what I want" — Pick from preset list directly

### If Content Ready
Ask user to share the content (slide titles, bullet points, key messages).

### If Rough Notes or Topic Only
Ask them to describe the topic and key points they want to cover.

---

## Phase 2: Style Selection

### If "Show me options"
Read [STYLE_PRESETS.md](reference/STYLE_PRESETS.md) for available styles and their dom-to-pptx-compatible specifications.

Generate 3 single-slide HTML previews using the chosen aesthetic. Each preview should be self-contained, showing a title slide at 1920x1080 with inline styles.

Save to `.claude-design/slide-previews/` (style-a.html, style-b.html, style-c.html).

Open each preview automatically.

### If "I know what I want"
Show the preset list and let them pick directly.

---

## Phase 3: Generate Presentation

Read [STYLE_PRESETS.md](reference/STYLE_PRESETS.md) and [TEMPLATE.md](reference/TEMPLATE.md) for the chosen style's CSS values and HTML structure. For the scaffolding, start from [SAFE_HTML_TEMPLATE.md](reference/SAFE_HTML_TEMPLATE.md) — it already bundles the validator and export script. For individual slide layouts, [SAMPLE_PROMPTS.md](reference/SAMPLE_PROMPTS.md) contains ready-to-use prompts for the 14 most common layouts (title, agenda, bullets, two-column, stats, quote, hero, steps, cards, sidebar, table, timeline, closing, plus a full-deck prompt).

### HTML Generation Rules

1. **Each slide = one .slide div with fixed 1920x1080 dimensions**
```html
<div class="slide" style="width: 1920px; height: 1080px; position: relative; overflow: hidden; background: #1a1a1a;">
```

2. **ALL styles inline — no <style> blocks for slide content**
```html
<h1 style="font-size: 72px; color: #ffffff; font-family: Arial, sans-serif; margin: 0;">Title</h1>
```

3. **Use absolute positioning for precise layout**
```html
<div class="slide" style="width: 1920px; height: 1080px; position: relative;">
  <div style="position: absolute; left: 100px; top: 200px; width: 800px;">
    <h1 style="...">Heading</h1>
  </div>
  <div style="position: absolute; right: 100px; top: 300px; width: 500px;">
    <img src="https://..." style="width: 500px; height: 300px; object-fit: cover;" />
  </div>
</div>
```

4. **Text hierarchy with clear size contrast**
- Title: 60-72px
- H2: 40-48px
- Body: 24-32px
- Caption: 18-20px

5. **Images use full HTTPS URLs**
```html
<img src="https://images.unsplash.com/photo-xxx?w=800" style="width: 400px; height: 300px; object-fit: cover; border-radius: 12px;" />
```

6. **Gradients via inline linear-gradient**
```html
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
```

7. **Google Fonts link with crossorigin**
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" crossorigin="anonymous">
```

8. **No CSS animations, transitions, or hover effects**

9. **Lists use ul/li with inline styles**
```html
<ul style="list-style: disc; padding-left: 40px; margin: 0;">
  <li style="font-size: 28px; color: #333; margin-bottom: 16px;">Point 1</li>
  <li style="font-size: 28px; color: #333; margin-bottom: 16px;">Point 2</li>
</ul>
```

10. **Shadow via box-shadow inline**
```html
<div style="box-shadow: 0 10px 40px rgba(0,0,0,0.3); border-radius: 16px;">
```

### Slide Content Guidelines

| Slide Type | Content |
|------------|---------|
| Title slide | Logo/brand, main title, subtitle, optional tagline |
| Section divider | Section number, section title |
| Content slide | Heading + 4-6 bullets OR heading + paragraphs |
| Two-column | Heading + split content (text/image) |
| Image slide | Full-width image with optional caption |
| Quote slide | Large quote text + attribution |
| Stats/numbers | Large numbers with labels |

### Output Structure

Generate a single HTML file with multiple `.slide` divs, plus a separate JavaScript snippet for dom-to-pptx export.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Presentation Title</title>
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" crossorigin="anonymous">
</head>
<body>
  <!-- Slide 1 -->
  <div class="slide" style="width: 1920px; height: 1080px; position: relative; overflow: hidden; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);">
    <div style="position: absolute; left: 120px; top: 400px;">
      <h1 style="font-size: 72px; color: #ffffff; margin: 0;">Presentation Title</h1>
      <p style="font-size: 32px; color: #cccccc; margin-top: 24px;">Subtitle goes here</p>
    </div>
  </div>

  <!-- Slide 2 -->
  <div class="slide" style="width: 1920px; height: 1080px; position: relative; overflow: hidden; background: #ffffff;">
    <!-- ... content ... -->
  </div>

  <!-- More slides... -->
</body>
</html>
```

---

## Phase 3.5: Validate Before Export (REQUIRED)

Before handing the file to the user, confirm the HTML will convert cleanly.

1. **Paste the validator script** from [VALIDATION.md](reference/VALIDATION.md) into the HTML above the export `<script>`. The safe template already includes it.
2. **Run the manual checklist** from [VALIDATION.md](reference/VALIDATION.md) §"The checklist" against the generated HTML. Common regressions to watch for:
   - `transform: translate(-50%, -50%)` centering tricks — replace with `left/top` math or flex centering.
   - `backdrop-filter` on "glassmorphism" panels — replace with a solid rgba overlay.
   - `radial-gradient` backgrounds — switch to `linear-gradient` or stacked divs.
   - Relative image paths or `loading="lazy"` — use https URLs, remove lazy loading.
   - Google Fonts `<link>` missing `crossorigin="anonymous"`.
3. **The export button** (already wired in the safe template) calls `window.validateSlides()` and prompts the user if issues are found, so the user gets one more line of defense at click time.

If the validator will report issues that can't be avoided (e.g. the user insisted on a radial gradient), call them out explicitly in the delivery message so the user isn't surprised.

---

## Phase 4: Export to PPTX

After generating the HTML, provide the user with:

1. **The HTML file location**

2. **The export block** — already included if the scaffolding came from [SAFE_HTML_TEMPLATE.md](reference/SAFE_HTML_TEMPLATE.md). It's a validator + export button that runs `window.validateSlides()` before calling `domToPptx.exportToPptx(...)`, so problems surface in the UI rather than silently degrading the PPTX. If building from scratch, paste the script block from [SAFE_HTML_TEMPLATE.md](reference/SAFE_HTML_TEMPLATE.md) §"The template" (the `<script>` + `<button>` at the end).

3. **Instructions**:
   - Open the HTML in a browser (Chrome/Edge recommended — Firefox has stricter CORS).
   - If any images are on CORS-less hosts, swap them before exporting.
   - Click "Export PPTX". If the validator flags issues, fix them or choose to proceed.
   - The `.pptx` downloads automatically.

---

## Phase 5: Delivery

1. Confirm all slides are present and properly laid out
2. Point out any manual adjustments that might be needed in PowerPoint after export
3. Note any images that may need CORS-accessible URLs

---

## Supporting Files

| File | Purpose |
|------|---------|
| [SAFE_HTML_TEMPLATE.md](reference/SAFE_HTML_TEMPLATE.md) | Copy-paste skeleton that satisfies every compatibility rule; validator + export pre-wired |
| [STYLE_WHITELIST.md](reference/STYLE_WHITELIST.md) | Definitive ✅/⚠️/❌ list of CSS & HTML features, with alternatives |
| [VALIDATION.md](reference/VALIDATION.md) | Pre-export runnable scanner (`window.validateSlides()`) and manual checklist |
| [SAMPLE_PROMPTS.md](reference/SAMPLE_PROMPTS.md) | 14 ready-to-use prompts for common slide layouts (title, agenda, bullets, two-column, stats, quote, hero, steps, cards, sidebar, table, timeline, closing, full deck) |
| [STYLE_PRESETS.md](reference/STYLE_PRESETS.md) | dom-to-pptx-compatible visual presets with CSS values |
| [TEMPLATE.md](reference/TEMPLATE.md) | HTML structure and layout pattern library (cards, sidebars, steps, …) |
