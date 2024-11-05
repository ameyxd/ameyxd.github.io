/*
 * Copyright (c) 2024 Amey Ambade
 * Licensed under the MIT License
 * Path: keystatic.config.ts
 */

import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local', // Use 'github' for production
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({
          label: 'Published Date',
          validation: { isRequired: true }
        }),
        content: fields.document({
          label: 'Content',
          formatting: {
            inlineMarks: true,
            blockTypes: true,
          },
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Performance & UX', value: 'performance-and-ux' },
            { label: 'Tech Stack', value: 'tech-stack' },
            { label: 'Developer Workflow', value: 'developer-workflow' },
            { label: 'Announcements', value: 'announcements' },
            { label: 'Developer Business', value: 'developer-business' },
          ],
          defaultValue: 'performance-and-ux'
        }),
        author: fields.select({
          label: 'Author',
          options: [
            { label: 'Your Name', value: 'your-name' },
            // Add more authors as needed
          ],
          defaultValue: 'your-name'
        }),
        featured: fields.checkbox({
          label: 'Featured Post',
          defaultValue: false,
        }),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'content/authors/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
        }),
      },
    }),
  },
});