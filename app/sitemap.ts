import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: site.siteUrl,
      lastModified: new Date()
    },
    {
      url: `${site.siteUrl}/blog`,
      lastModified: new Date()
    },
    ...posts.map((post) => ({
      url: `${site.siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date)
    }))
  ];
}
