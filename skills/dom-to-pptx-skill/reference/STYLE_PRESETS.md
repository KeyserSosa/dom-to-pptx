# Style Presets for dom-to-pptx

Visual styles adapted for dom-to-pptx compatibility. Each preset provides inline CSS values ready to use.

---

## 1. Bold Signal

**Vibe:** Confident, bold, high-impact corporate

**Colors:**
- Background: `#1a1a1a`
- Gradient: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`
- Accent: `#FF5722` (orange)
- Text primary: `#ffffff`
- Text on accent: `#1a1a1a`

**Typography:** Arial Black / Arial (fallback-safe)

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); position: relative;">
  <div style="position: absolute; left: 80px; top: 80px; width: 200px; height: 100px; background: #FF5722; border-radius: 12px;"></div>
  <h1 style="font-size: 80px; color: #ffffff; font-family: 'Arial Black', Arial, sans-serif; margin: 0;">Bold Statement</h1>
</div>
```

**Signature Elements:**
- Orange accent card as focal point
- Large section numbers (01, 02)
- High contrast text

---

## 2. Electric Studio

**Vibe:** Clean, professional, modern corporate

**Colors:**
- Background: `#0a0a0a`
- Card/Panel: `#ffffff`
- Accent: `#4361ee` (blue)
- Text dark: `#0a0a0a`
- Text light: `#ffffff`

**Typography:** Arial / Helvetica (clean sans-serif)

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: #ffffff; position: relative;">
  <div style="position: absolute; top: 0; left: 0; width: 1920px; height: 400px; background: #0a0a0a;"></div>
  <h1 style="font-size: 64px; color: #ffffff; position: absolute; top: 120px; left: 100px; margin: 0;">Clean & Bold</h1>
  <div style="position: absolute; bottom: 100px; left: 100px; right: 100px; display: flex; gap: 40px;">
    <div style="flex: 1; background: #f5f5f5; padding: 40px; border-radius: 16px;">
      <h3 style="font-size: 32px; color: #0a0a0a; margin: 0 0 20px 0;">Feature One</h3>
      <p style="font-size: 24px; color: #666666; margin: 0;">Description text here</p>
    </div>
  </div>
</div>
```

**Signature Elements:**
- Split layout (dark top, light bottom OR vice versa)
- Accent color bar on edge
- Minimal spacing

---

## 3. Creative Voltage

**Vibe:** Energetic, creative, bold

**Colors:**
- Primary: `#0066ff` (electric blue)
- Dark: `#1a1a2e`
- Accent: `#d4ff00` (neon yellow)
- Text light: `#ffffff`

**Typography:** Arial / Helvetica

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: #0066ff; position: relative;">
  <div style="position: absolute; left: 0; top: 0; width: 960px; height: 1080px; background: #1a1a2e;"></div>
  <h1 style="font-size: 72px; color: #ffffff; position: absolute; left: 100px; top: 400px; margin: 0;">Creative Energy</h1>
  <div style="position: absolute; right: 200px; top: 450px; background: #d4ff00; padding: 20px 40px; border-radius: 8px;">
    <span style="font-size: 32px; color: #1a1a2e; font-weight: bold;">Get Started</span>
  </div>
</div>
```

**Signature Elements:**
- Electric blue + neon yellow contrast
- Split panel layout

---

## 4. Dark Botanical

**Vibe:** Elegant, sophisticated, premium

**Colors:**
- Background: `#0f0f0f`
- Text primary: `#e8e4df`
- Text secondary: `#9a9590`
- Accent warm: `#d4a574`
- Accent pink: `#e8b4b8`

**Typography:** Georgia / Times New Roman (elegant serif)

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: #0f0f0f; position: relative; overflow: hidden;">
  <!-- Soft decorative blur (dom-to-pptx: filter: blur() is supported; radial-gradient is not) -->
  <div style="position: absolute; right: 100px; top: 100px; width: 600px; height: 600px; border-radius: 50%; background: #d4a574; opacity: 0.3; filter: blur(120px);"></div>
  <h1 style="font-size: 72px; color: #e8e4df; font-family: Georgia, serif; position: absolute; top: 350px; left: 100px; margin: 0; font-style: italic;">Elegant Design</h1>
  <p style="font-size: 28px; color: #9a9590; position: absolute; top: 500px; left: 100px; margin: 0;">Refined and sophisticated</p>
</div>
```

**Signature Elements:**
- Abstract soft gradient circles (blurred)
- Warm accent colors (gold, pink)
- Italic serif typography

---

## 5. Pastel Light

**Vibe:** Friendly, approachable, clean

**Colors:**
- Background: `#f8f6f1` (warm cream)
- Card: `#ffffff`
- Text primary: `#1a1a1a`
- Accent pink: `#f0b4d4`
- Accent mint: `#a8d4c4`
- Accent lavender: `#9b8dc4`

**Typography:** Arial / Helvetica

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: #f8f6f1; position: relative;">
  <h1 style="font-size: 64px; color: #1a1a1a; position: absolute; top: 300px; left: 100px; margin: 0;">Friendly Design</h1>
  <div style="position: absolute; top: 500px; left: 100px; display: flex; gap: 30px;">
    <div style="background: #f0b4d4; padding: 16px 32px; border-radius: 24px;">
      <span style="font-size: 24px; color: #1a1a1a;">Pink</span>
    </div>
    <div style="background: #a8d4c4; padding: 16px 32px; border-radius: 24px;">
      <span style="font-size: 24px; color: #1a1a1a;">Mint</span>
    </div>
    <div style="background: #9b8dc4; padding: 16px 32px; border-radius: 24px;">
      <span style="font-size: 24px; color: #ffffff;">Lavender</span>
    </div>
  </div>
</div>
```

**Signature Elements:**
- Pastel color pills/badges
- Rounded corners
- Warm cream background

---

## 6. Corporate Navy

**Vibe:** Professional, trustworthy, enterprise

**Colors:**
- Background: `#1e3a5f` (navy)
- Card: `#ffffff`
- Text light: `#ffffff`
- Text dark: `#1a1a1a`
- Accent: `#0066cc` (blue)

**Typography:** Arial / Helvetica

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: #1e3a5f; position: relative;">
  <h1 style="font-size: 72px; color: #ffffff; position: absolute; top: 350px; left: 100px; margin: 0;">Enterprise Solution</h1>
  <p style="font-size: 28px; color: #cccccc; position: absolute; top: 480px; left: 100px; margin: 0;">Professional • Reliable • Secure</p>
  <div style="position: absolute; bottom: 100px; left: 100px; right: 100px; display: flex; gap: 40px;">
    <div style="flex: 1; background: #ffffff; padding: 40px; border-radius: 12px;">
      <h3 style="font-size: 28px; color: #1a1a1a; margin: 0 0 16px 0;">Scale</h3>
      <p style="font-size: 20px; color: #666666; margin: 0;">Enterprise-grade reliability</p>
    </div>
  </div>
</div>
```

**Signature Elements:**
- Navy blue background
- Clean white cards
- Professional hierarchy

---

## 7. Minimal White

**Vibe:** Clean, minimal, modern

**Colors:**
- Background: `#ffffff`
- Text primary: `#1a1a1a`
- Text secondary: `#666666`
- Accent: `#0066cc`

**Typography:** Arial / Helvetica

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: #ffffff; position: relative;">
  <div style="position: absolute; top: 350px; left: 50%; transform: translateX(-50%); text-align: center;">
    <h1 style="font-size: 80px; color: #1a1a1a; margin: 0 0 32px 0;">Minimal</h1>
    <p style="font-size: 32px; color: #666666; margin: 0;">Less is more</p>
  </div>
  <div style="position: absolute; bottom: 150px; left: 50%; transform: translateX(-50%); width: 200px; height: 4px; background: #0066cc;"></div>
</div>
```

**Signature Elements:**
- Heavy whitespace
- Single accent line
- Centered typography

---

## 8. Gradient Modern

**Vibe:** Contemporary, tech, vibrant

**Colors:**
- Gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Text light: `#ffffff`
- Card: `#ffffff` with opacity

**Typography:** Arial / Helvetica

**Usage:**
```html
<div style="width: 1920px; height: 1080px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; overflow: hidden;">
  <h1 style="font-size: 80px; color: #ffffff; position: absolute; top: 350px; left: 100px; margin: 0;">Modern Gradient</h1>
  <div style="position: absolute; bottom: 150px; left: 100px; display: flex; gap: 40px;">
    <!-- Semi-transparent panel (no backdrop-filter — not supported by dom-to-pptx) -->
    <div style="background: rgba(255,255,255,0.2); padding: 24px 48px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);">
      <span style="font-size: 28px; color: #ffffff;">Explore</span>
    </div>
  </div>
</div>
```

**Signature Elements:**
- Rich gradient background
- Semi-transparent card overlays
- Modern tech feel

---

## Color Palette Quick Reference

| Style | Background | Accent | Text |
|-------|-----------|--------|------|
| Bold Signal | #1a1a1a | #FF5722 | #ffffff |
| Electric Studio | #0a0a0a / #ffffff | #4361ee | #0a0a0a / #ffffff |
| Creative Voltage | #0066ff / #1a1a2e | #d4ff00 | #ffffff |
| Dark Botanical | #0f0f0f | #d4a574 | #e8e4df |
| Pastel Light | #f8f6f1 | #f0b4d4 | #1a1a1a |
| Corporate Navy | #1e3a5f | #0066cc | #ffffff |
| Minimal White | #ffffff | #0066cc | #1a1a1a |
| Gradient Modern | #667eea→#764ba2 | rgba(255,255,255,0.2) | #ffffff |

---

## Font Sizing Guide (dom-to-pptx)

Use these sizes for optimal PowerPoint rendering:

| Element | Size |
|---------|------|
| Main Title | 72-80px |
| Section Title | 48-56px |
| H3 / Card Title | 32-40px |
| Body Text | 24-28px |
| Caption / Label | 18-20px |
| Small Text | 16px |

**Note:** Use px units (not rem/em). Arial and Helvetica are safest for cross-platform rendering. Georgia/Times work well for serif elegance.
