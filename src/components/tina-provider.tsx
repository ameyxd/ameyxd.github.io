/**
 * Copyright (c) 2024 Amey Ambade
 * Licensed under MIT License
 * Path: /components/tina-provider.tsx
 */

"use client"

import { TinaCMS, TinaProvider } from "tinacms"

const cms = new TinaCMS({
  enabled: true,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "",
  token: process.env.TINA_TOKEN,
})

export default function TinaProviderWrapper({ children }: { children: React.ReactNode }) {
  return <TinaProvider cms={cms}>{children}</TinaProvider>
}