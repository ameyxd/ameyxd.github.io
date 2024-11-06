// Regex patterns for different platforms
const PATTERNS = {
  youtube: /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)$/,
  tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)(?:\?.*)?$/,
  spotify: /^https?:\/\/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)(?:\?.*)?$/,
  twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/(\d+)$/
}

// Extract IDs from URLs
export function parseUrl(url) {
  for (const [platform, pattern] of Object.entries(PATTERNS)) {
    const match = url.match(pattern)
    if (match) {
      const id = platform === 'tiktok' 
        ? match[2]  // Just the numeric ID
        : platform === 'spotify' 
          ? `${match[1]}/${match[2]}` 
          : match[match.length - 1]
      
      return { platform, id }
    }
  }
  return null
} 