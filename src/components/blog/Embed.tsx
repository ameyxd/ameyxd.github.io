'use client'

import { parseUrl } from '@/lib/utils/embedUrls'
import { useEffect, useRef } from 'react'

interface EmbedProps {
  url: string;
}

export function Embed({ url }: EmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const parsed = parseUrl(url);
  if (!parsed) return null;

  const { platform, id } = parsed;

  switch (platform) {
    case 'spotify':
      return (
        <div className="my-4">
          <iframe
            src={`https://open.spotify.com/embed/${id}`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      );
    
    case 'tiktok':
      return (
        <div className="my-4 flex justify-center">
          <iframe
            ref={iframeRef}
            src={`https://www.tiktok.com/player/v1/${id}?autoplay=0`}
            style={{
              width: '325px',
              height: '750px',
              maxWidth: '100%',
            }}
            frameBorder="0"
            allow="fullscreen"
            loading="lazy"
            scrolling="no"
          />
        </div>
      );
    
    case 'youtube':
      return (
        <div className="my-4 aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}?autoplay=0`}
            frameBorder="0"
            allow="clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    
    case 'twitter':
      return (
        <div className="my-4">
          <iframe
            ref={iframeRef}
            src={`https://platform.twitter.com/embed/Tweet.html?id=${id}&dnt=true`}
            className="w-full min-h-[500px]"
            style={{
              maxWidth: '550px',
              margin: '0 auto',
              border: 'none',
            }}
            loading="lazy"
            scrolling="no"
            onLoad={() => {
              if (iframeRef.current?.contentWindow && iframeRef.current?.contentDocument?.body) {
                const resizeObserver = new ResizeObserver(() => {
                  if (iframeRef.current?.contentDocument?.body) {
                    iframeRef.current.style.height = 
                      iframeRef.current.contentDocument.body.scrollHeight + 'px';
                  }
                });
                resizeObserver.observe(iframeRef.current.contentDocument.body);
              }
            }}
          />
        </div>
      );
    
    default:
      return null;
  }
} 