import { getBlogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

function escapeCdata(text: string) {
  return text.replaceAll("]]>", "]]]]><![CDATA[>");
}

export async function GET() {
  const posts = await getBlogPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${escapeCdata(post.metadata.title)}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description><![CDATA[${escapeCdata(post.metadata.description ?? "")}]]></description>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
