import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

// Export all HTTP methods that Keystatic needs
export const { GET, POST, PUT, PATCH, DELETE } = makeRouteHandler({
  config,
  secret: process.env.KEYSTATIC_SECRET || 'default-dev-secret'
});

// For static exports
export function generateStaticParams() {
  return [
    { params: [] },
    { params: [''] },
    { params: ['collection', 'posts'] },
    { params: ['collection', 'posts', 'create'] }
  ];
} 