# Known Issues & Future Improvements

## Latest Resolutions [2024-03-20]
### Resume/About Page
- ✅ Download Button Styling (Metallic gradient with dark mode)
- ✅ Section Navigation (Active section highlighting)
- ✅ Mobile Badge Layout (Responsive design)
- ✅ Footer Location Display (Added pulse animation)
- ✅ Timeline-style bullets implementation
- ✅ Section header consistency
- ✅ Mobile responsiveness improvements
- ✅ BlurFade animations

## Resolved Issues

### 1. Section Navigation
**Status:** ✅ Fixed
**Solution Implemented:** Added intersection observer for active section highlighting

### 2. Mobile Responsiveness
**Problem:** Badge layout in ResumeCard needs improvement on mobile
**Status:** ✅ Fixed
**Solution Implemented:** Updated flex layout and spacing for mobile view

### 3. Download Button Styling
**Status:** ✅ Fixed
**Solution Implemented:** Added metallic gradient style with proper dark mode support


## Active Issues

### 1. TikTok Shortlink Resolution
**Problem:** TikTok shortlinks (e.g., `tiktok.com/t/ZTFchR8Pk`) cannot be parsed directly as they need to be resolved to their full URL format first.

**Current Behavior:** These links fail to embed properly.

**Potential Solution:**
- Add URL resolution step before parsing
- Handle redirection at component level using useEffect
- Consider using TikTok's API if available

**Priority:** Medium

### 2. Twitter Embed Sizing
**Problem:** Twitter embeds don't size correctly, especially with media content:
- Text-only tweets have excess space
- Media tweets get cut off
- ResizeObserver throws errors

**Current Behavior:** Inconsistent display of tweets and occasional console errors.

**Potential Solution:**
- Investigate Twitter's newer embedding options
- Improve resize observer implementation
- Consider using Twitter's official widget settings

**Priority:** High

### 3. Mobile Padding Refinement
**Problem:** Mobile padding still needs improvement for optimal reading experience
**Priority:** Medium

### 4. Bottom Navbar Styling
**Problem:** Bottom navbar hover effects and scaling animations need to match original design and include strava activity #TODO
**Priority:** High


---

## How to Contribute
1. Pick an issue to work on
2. Create a new branch: `fix/issue-name`
3. Reference issue number in commits
4. Submit PR with detailed description of changes 