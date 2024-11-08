# Known Issues & Future Improvements

## Embedding Issues

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

---

## How to Contribute
1. Pick an issue to work on
2. Create a new branch: `fix/issue-name`
3. Reference issue number in commits
4. Submit PR with detailed description of changes 