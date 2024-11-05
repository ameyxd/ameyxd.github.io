/*
 * Copyright (c) 2024 Amey Ambade
 * Licensed under the MIT License
 * Path: src/lib/posts.ts
 */

import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export async function getPosts() {
  const reader = createReader('', config);
  const posts = await reader.collections.posts.all();
  return posts;
}

export async function getPost(slug: string) {
  const reader = createReader('', config);
  const post = await reader.collections.posts.read(slug);
  return post;
}