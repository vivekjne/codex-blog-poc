import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
        404
      </p>
      <h1 className="mt-4 text-5xl font-display text-ink">Page not found.</h1>
      <p className="mt-4 text-lg text-slate-600">
        The page you’re looking for doesn’t exist. Head back to the homepage or explore the blog.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700"
        >
          Read the blog
        </Link>
      </div>
    </main>
  );
}
