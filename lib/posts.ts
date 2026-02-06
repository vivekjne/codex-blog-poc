import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { slugify } from "@/lib/slug";
import type { Post } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getMdxFiles() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

function extractToc(content: string) {
  const lines = content.split("\n");
  const seen: Record<string, number> = {};
  let inFence = false;

  const items: { id: string; text: string; level: number }[] = [];

  for (const line of lines) {
    // Ignore headings inside fenced code blocks.
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,4})\s+(.*)/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/[`*_~]/g, "").trim();
    const base = slugify(text);
    const count = seen[base] ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    seen[base] = count + 1;

    items.push({ id, text, level });
  }

  return items;
}

function normalizePost(slug: string, data: matter.GrayMatterFile<string>): Post {
  const stats = readingTime(data.content);
  return {
    slug,
    title: data.data.title ?? slug,
    description: data.data.description ?? "",
    date: data.data.date ?? new Date().toISOString(),
    tags: (data.data.tags ?? []) as string[],
    readingTime: data.data.readingTime ?? `${Math.ceil(stats.minutes)} min read`,
    content: data.content,
    draft: Boolean(data.data.draft),
    toc: extractToc(data.content)
  };
}

export function getAllPosts() {
  const files = getMdxFiles();
  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      return normalizePost(slug, parsed);
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  return normalizePost(slug, parsed);
}

export function getAllTags() {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}
