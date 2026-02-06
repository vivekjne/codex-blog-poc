import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { BlogList, type PostPreview } from "@/app/blog/BlogList";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing on React, Next.js, and frontend systems by ${site.name}.`
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const previews: PostPreview[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Blog
          </p>
          <h1 className="text-5xl font-display text-ink">
            Notes on modern React, Next.js, and UI systems.
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Explore articles that break down new framework features, real-world patterns, and
            workflow upgrades for product-focused frontend teams.
          </p>
        </div>
        <BlogList posts={previews} tags={tags} />
      </div>
    </main>
  );
}
