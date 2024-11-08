# Changelog - Current Session

## ✅ Completed
1. Added sticky header with blur effect and proper spacing
2. Centered images in blog posts with rounded corners
3. Added image captions through alt text
4. Set up basic MDX component structure
5. Added basic embed support for Twitter and TikTok
6. Added MDX renaming pipeline

## Documentation
- ✅ Created ISSUES.md for tracking known issues
- ✅ Created FEATURES.md for future improvements
- ✅ Added CHANGELOG.md

## Performance Optimizations
- ✅ Implemented lazy loading for embeds
- ✅ Added image optimization


## ⏳ Incomplete/Issues Found
1. TikTok shortlink parsing not working
   - Need to implement URL resolution for `tiktok.com/t/` links
   - Current pattern matching fails for shortlinks

2. Twitter embed sizing issues
   - Media tweets getting cut off
   - Inconsistent spacing for text-only tweets
   - ResizeObserver throwing errors

3. MDX Component Improvements
   - Need better error handling for embeds
   - Image caption styling could be enhanced
   - Need to handle hydration issues properly

## Next Steps
1. Fix TikTok shortlink parsing
2. Resolve Twitter embed sizing
3. Enhance MDX component error boundaries
