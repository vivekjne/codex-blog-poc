"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/format";

export type PostPreview = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export function BlogList({
  posts,
  tags
}: {
  posts: PostPreview[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        normalized.length === 0 ||
        post.title.toLowerCase().includes(normalized) ||
        post.description.toLowerCase().includes(normalized) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalized));

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => post.tags.includes(tag));

      return matchesQuery && matchesTags;
    });
  }, [activeTags, posts, query]);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft md:grid-cols-[1.6fr,1fr]">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Search posts
          </p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, topic, or tag"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Filter tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                data-active={activeTags.includes(tag)}
                className="tag-chip rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span>{formatDate(post.date)}</span>
              <span>{post.readingTime}</span>
            </div>
            <h3 className="mt-4 text-2xl font-display text-ink group-hover:text-slate-900">
              {post.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-sm text-slate-600">
            No posts match that search yet. Try clearing filters or searching for another topic.
          </div>
        )}
      </div>
    </div>
  );
}
