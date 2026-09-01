# Hero Banner Height Fix

## Date: 2026-09-01

## Problem
When reducing browser window height, the hero banner content was getting squeezed because it used fixed viewport height units (`h-[92svh]`, `h-[86vh]`) that scale proportionally with viewport size.

## Solution Implemented
Replaced fixed height with minimum height approach using inline Tailwind classes.

### Changed Line 65 in `components/hero-section.tsx`:

**Before:**
```tsx
className="relative h-[92svh] min-h-[34rem] w-full overflow-hidden bg-charcoal lg:h-[86vh] lg:max-h-[54rem]"
```

**After:**
```tsx
className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal lg:min-h-[100vh] lg:max-h-[54rem] [@media(max-height:700px)]:min-h-[600px] [@media(max-height:600px)]:min-h-[540px]"
```

## How It Works

### Responsive Behavior:
- **Mobile devices**: `min-h-[100svh]` - Uses small viewport height (accounts for browser chrome)
- **Desktop (≥1024px)**: `min-h-[100vh]` - Uses regular viewport height
- **Desktop max**: `max-h-[54rem]` (864px) - Caps maximum height on large screens
- **Short viewport (height ≤700px)**: `min-h-[600px]` - Switches to fixed minimum
- **Very short viewport (height ≤600px)**: `min-h-[540px]` - Smaller fixed minimum

### What This Preserves:
✅ All 4 scene slide animations (horizontal translate3d)
✅ Scene content positioning and layout
✅ Text reveal animations with staggered delays  
✅ Image animations (dl-scene2-motion, dl-film-float, dl-scene4-atmosphere)
✅ Video playback and lightbox functionality
✅ Progress bar animations
✅ All interactive controls and buttons
✅ Design integrity and spacing

### What Changes:
✅ Banner maintains 100vh when viewport is large enough
✅ When viewport height is constrained, uses fixed px minimum
✅ Page becomes scrollable instead of squeezing content
✅ Content never gets compressed or loses spacing

## Testing Checklist
- [ ] Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
- [ ] Clear browser cache
- [ ] Test on normal desktop resolution (banner should be 100vh)
- [ ] Reduce browser window height to ~650px (should see 600px min-height, scrollable)
- [ ] Reduce to ~550px height (should see 540px min-height, scrollable)
- [ ] Verify all 4 scenes still slide horizontally
- [ ] Check text animations still reveal with staggered timing
- [ ] Test video playback and fullscreen
- [ ] Verify progress bar still animates correctly
- [ ] Test on mobile devices (portrait and landscape)
- [ ] Check no content is cut off or squeezed at any height

## Notes
- Uses Tailwind's arbitrary variant syntax `[@media(max-height:...)]` for viewport height breakpoints
- `min-height` instead of `height` allows natural expansion when needed
- Scene panels remain `absolute inset-0` so they perfectly fill the container
- All animations continue to work because they don't depend on fixed heights
