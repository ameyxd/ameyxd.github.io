'use client'

/*
 * Copyright (c) 2024 Amey Ambade
 * 
 * This software is licensed under the MIT License.
 * Path: components/blog/Image.tsx
 */

import NextImage from 'next/image'
import { useState } from 'react'

interface ImageProps {
  /** Source path of the image */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Optional caption to display below image */
  caption?: string
  /** Priority loading for LCP images */
  priority?: boolean
  /** Optional CSS classes */
  className?: string
}

/**
 * Enhanced image component with blur loading and error handling
 */
export default function Image({ 
  src, 
  alt, 
  caption, 
  priority = false,
  className = ''
}: ImageProps) {
  const [error, setError] = useState(false)

  // Handle relative paths from MDX files
  const imagePath = src.startsWith('./') ? src.slice(2) : src

  if (error) {
    return (
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
        Failed to load image
      </div>
    )
  }

  return (
    <figure className="my-8">
      <div className="relative aspect-video">
        <NextImage
          src={`/${imagePath}`}
          alt={alt}
          fill
          className={`object-cover rounded-lg ${className}`}
          priority={priority}
          onError={() => setError(true)}
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}