import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { renderMDX } from "@/lib/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { Toc } from "@/components/Toc";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      url: `${site.siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      images: [
        {
          url: "/og-default.svg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-default.svg"],
    },
  };
}

function getRelatedPosts(slug: string, tags: string[]) {
  const posts = getAllPosts().filter((post) => post.slug !== slug);
  return posts
    .map((post) => {
      const score = post.tags.filter((tag) => tags.includes(tag)).length;
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post);
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const content = await renderMDX(post.content);
  const related = getRelatedPosts(post.slug, post.tags);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
    mainEntityOfPage: `${site.siteUrl}/blog/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post.toc.length > 0 && <Toc items={post.toc} variant="mobile" />}
      <div className="flex flex-col gap-12 md:flex-row">
        <article className="min-w-0 flex-1 space-y-6">
          <div className="space-y-4">
            <Link
              href="/blog"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500"
            >
              Back to blog
            </Link>
            <h1 className="text-5xl font-display text-ink">{post.title}</h1>
            <p className="text-lg text-slate-600">{post.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span>{formatDate(post.date)}</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
          <div className="prose prose-slate max-w-none">{content}</div>
        </article>
        <aside className="hidden md:block md:w-[20rem] md:shrink-0 md:self-stretch">
          <div className="md:sticky md:top-24 md:self-start space-y-8">
            {post.toc.length > 0 && <Toc items={post.toc} variant="desktop" />}
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Tags
              </p>
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
            </div>
          </div>
        </aside>
      </div>
      <div className="mt-10 md:hidden">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Tags
          </p>
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
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-display text-ink">Related posts</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {formatDate(item.date)}
                </p>
                <h3 className="mt-3 text-xl font-display text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
