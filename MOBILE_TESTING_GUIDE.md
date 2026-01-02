# Mobile View Testing Guide

## Quick Testing Checklist

### 1. Open Admin Panel on Mobile Device
- Navigate to: `http://localhost:5173/admin`
- Or use browser DevTools responsive mode

### 2. Test Hamburger Menu
- [ ] Click hamburger button (top-left corner)
- [ ] Sidebar should slide in from left
- [ ] Backdrop overlay should appear
- [ ] Click outside or on a link to close
- [ ] Menu should slide out smoothly

### 3. Test Navigation
- [ ] Click on "Sarees Collection"
- [ ] Menu should auto-close
- [ ] Page should navigate correctly
- [ ] Try all menu items

### 4. Test Product List Page
**Dashboard Stats:**
- [ ] Cards should stack vertically on mobile
- [ ] All text should be readable
- [ ] Icons should be appropriately sized

**Toolbar:**
- [ ] Search bar should be full-width
- [ ] Filters should stack nicely
- [ ] Add button should be visible
- [ ] View toggle hidden on very small screens

**Product Grid:**
- [ ] Single column on very small screens
- [ ] Two columns on slightly larger phones
- [ ] Cards should be touch-friendly

### 5. Test Category List Page
- [ ] Search bar should be full-width on mobile
- [ ] Category cards should stack vertically
- [ ] Form should appear below the list (not sticky on mobile)
- [ ] All buttons should be easily tappable

### 6. Test Responsive Breakpoints

#### Mobile Portrait (320px - 479px)
```
- Single column layouts
- Hamburger menu visible
- Compact spacing
- Larger touch targets
```

#### Mobile Landscape / Small Tablet (480px - 767px)
```
- Two column grids where appropriate
- Hamburger menu still visible
- Slightly more spacing
```

#### Tablet (768px - 1023px)
```
- Sidebar still uses hamburger
- Multi-column layouts
- More comfortable spacing
```

#### Desktop (1024px+)
```
- Sidebar always visible
- Collapse button appears
- Full multi-column layouts
- All features visible
```

## Browser DevTools Testing

### Chrome DevTools
1. Press `F12` or `Ctrl+Shift+I`
2. Click the device toolbar icon (or press `Ctrl+Shift+M`)
3. Select device presets:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - Pixel 5 (393px)
   - Samsung Galaxy S20 (412px)
   - iPad Mini (768px)
   - iPad Air (820px)

### Test Each Screen Size
- [ ] iPhone SE (375x667)
- [ ] iPhone 12 Pro (390x844)
- [ ] Pixel 5 (393x851)
- [ ] iPad Mini (768x1024)
- [ ] iPad Air (820x1180)

## Common Issues to Check

### Layout Issues
- [ ] No horizontal scrolling
- [ ] No overlapping elements
- [ ] Proper spacing between items
- [ ] Text doesn't overflow containers

### Interaction Issues
- [ ] All buttons are tappable (min 44px)
- [ ] Dropdowns work correctly
- [ ] Forms are usable
- [ ] Modals fit on screen

### Visual Issues
- [ ] Text is readable (min 14px for body)
- [ ] Icons are clear
- [ ] Colors have good contrast
- [ ] Images load properly

## Performance Checks

### Mobile Performance
- [ ] Page loads in < 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts
- [ ] Touch responses are immediate

### Network Conditions
Test with throttled network:
- [ ] Fast 3G
- [ ] Slow 3G
- [ ] Offline mode

## Accessibility

### Touch Targets
- [ ] Minimum 44x44px for all interactive elements
- [ ] Adequate spacing between tappable items
- [ ] No accidental taps

### Text Readability
- [ ] Font size at least 14px
- [ ] Line height comfortable (1.5+)
- [ ] Sufficient contrast ratio (4.5:1 minimum)

### Navigation
- [ ] Logical tab order
- [ ] Focus indicators visible
- [ ] Screen reader friendly

## Screenshots to Capture

1. **Mobile Menu Closed** (375px width)
2. **Mobile Menu Open** (375px width)
3. **Product List - Mobile** (375px width)
4. **Product List - Tablet** (768px width)
5. **Category List - Mobile** (375px width)
6. **Category List - Tablet** (768px width)

## Expected Behavior Summary

### Mobile (< 1024px)
- Hamburger menu controls sidebar
- Sidebar slides in/out with overlay
- Single/double column layouts
- Compact spacing
- Touch-optimized controls

### Desktop (≥ 1024px)
- Sidebar always visible
- Collapse button available
- Multi-column layouts
- Comfortable spacing
- Mouse-optimized controls

---

## Quick Fix Commands

If you encounter issues:

```bash
# Clear cache and restart
npm run dev

# Check for console errors
# Open browser console (F12)

# Verify responsive classes
# Use browser DevTools to inspect elements
```

## Success Criteria

✅ All pages load correctly on mobile
✅ Navigation is smooth and intuitive
✅ No horizontal scrolling
✅ All interactive elements are easily tappable
✅ Text is readable without zooming
✅ Forms are usable on mobile
✅ Performance is acceptable (< 3s load)
✅ No console errors

---

**Test Date**: _____________
**Tested By**: _____________
**Devices Tested**: _____________
**Status**: [ ] Pass [ ] Fail
**Notes**: _____________
