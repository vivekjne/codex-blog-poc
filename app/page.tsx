import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Tag";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "Testing",
  "UI Architecture",
  "Design Systems",
  "Performance"
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Senior Frontend Engineer",
    url: site.siteUrl,
    sameAs: [site.social.github, site.social.linkedin, site.social.twitter],
    worksFor: {
      "@type": "Organization",
      name: "Flux Labs"
    }
  };

  return (
    <main className="bg-hero-glow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-16 md:grid-cols-[1.4fr,0.9fr] md:items-center md:pt-24">
        <Reveal>
          <div className="flex flex-col gap-6">
            <Tag label="Senior Frontend Engineer" />
            <h1 className="max-w-3xl text-5xl font-display leading-tight text-ink md:text-6xl">
              Designing and shipping high-leverage frontend systems for teams that care
              about performance, craft, and velocity.
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              I’m {site.name}, a senior frontend developer and hobbyist fullstack builder working
              with Next.js, React, Node.js, and TypeScript. I help teams turn complex product ideas
              into elegant, fast, and resilient interfaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
              >
                View Projects
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-200 via-white to-rose-200 p-6">
              <div className="absolute right-4 top-4 h-16 w-16 rounded-full border border-white/70 bg-white/60" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Profile snapshot
              </p>
              <p className="mt-4 text-2xl font-display text-ink">{site.name}</p>
              <p className="mt-2 text-sm text-slate-600">Senior Frontend + Fullstack hobbyist</p>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Primary stack</span>
                <span className="font-semibold text-ink">Next.js · React · TS</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Current focus</span>
                <span className="font-semibold text-ink">DX + performance</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Location</span>
                <span className="font-semibold text-ink">{site.location}</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="glass grid gap-6 rounded-3xl p-8 md:col-span-2 md:grid-cols-3">
            <div>
              <p className="text-4xl font-display text-ink">10+ years</p>
              <p className="text-sm text-slate-600">Shipping web products at scale</p>
            </div>
            <div>
              <p className="text-4xl font-display text-ink">Core Web Vitals</p>
              <p className="text-sm text-slate-600">Performance-first delivery mindset</p>
            </div>
            <div>
              <p className="text-4xl font-display text-ink">Design + Engineering</p>
              <p className="text-sm text-slate-600">Bridging collaboration and craft</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                About
              </p>
              <h2 className="text-4xl font-display text-ink">
                I build frontend ecosystems that scale beyond the first sprint.
              </h2>
              <p className="text-lg text-slate-600">
                My focus is shipping production-ready UI foundations: component libraries,
                design systems, and data-aware interaction patterns. I bring a product mindset
                to every interface, balancing performance budgets, accessibility, and clean code.
              </p>
              <p className="text-lg text-slate-600">
                When I’m not building, I’m experimenting with Node.js services, GraphQL APIs,
                and small automations that keep teams moving fast.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="rounded-3xl bg-white/80 p-6 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Now
                </p>
                <p className="mt-4 text-lg text-slate-600">
                  Leading UI architecture for a multi-product platform, evolving a design system,
                  and mentoring engineers on performance-first delivery.
                </p>
              </div>
              <div className="rounded-3xl bg-ink p-6 text-white shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                  Focus
                </p>
                <p className="mt-4 text-lg">
                  App Router, server components, and workflow tooling that helps teams move with
                  confidence.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Skills
              </p>
              <h2 className="mt-3 text-4xl font-display text-ink">
                A toolkit built for velocity and long-term maintainability.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-sm font-semibold text-slate-700 shadow-soft"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Projects
              </p>
              <h2 className="mt-3 text-4xl font-display text-ink">
                Product work that blends strategy, systems, and storytelling.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft"
                >
                  <div
                    className={`h-32 rounded-2xl bg-gradient-to-br ${
                      index % 3 === 0
                        ? "from-sky-200 via-white to-rose-200"
                        : index % 3 === 1
                        ? "from-emerald-200 via-white to-sky-200"
                        : "from-amber-200 via-white to-orange-200"
                    }`}
                  />
                  <h3 className="mt-4 text-2xl font-display text-ink">{project.title}</h3>
                  <p className="mt-3 text-slate-600">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((stack) => (
                      <span
                        key={stack}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4 text-sm font-semibold text-slate-700">
                    <Link href={project.links.primary} className="underline">
                      Case Study
                    </Link>
                    {project.links.secondary && (
                      <Link href={project.links.secondary} className="underline">
                        Live Preview
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Experience
              </p>
              <h2 className="mt-3 text-4xl font-display text-ink">
                Building reliable UI foundations across product lifecycles.
              </h2>
            </div>
            <div className="grid gap-6">
              {experience.map((item) => (
                <div
                  key={item.company}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-soft"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-ink">{item.role}</p>
                      <p className="text-sm text-slate-600">{item.company}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-500">{item.period}</p>
                  </div>
                  <p className="mt-4 text-slate-600">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="blog" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Blog
                </p>
                <h2 className="mt-3 text-4xl font-display text-ink">
                  Essays on modern React and Next.js workflows.
                </h2>
              </div>
              <Link
                href="/blog"
                className="rounded-full border border-slate-300 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700"
              >
                Browse all posts
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft transition hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {formatDate(post.date)}
                  </p>
                  <h3 className="mt-4 text-2xl font-display text-ink group-hover:text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
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
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="rounded-3xl bg-ink px-8 py-12 text-white shadow-glow md:px-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                  Contact
                </p>
                <h2 className="mt-4 text-4xl font-display">
                  Let’s build your next ambitious interface.
                </h2>
                <p className="mt-4 max-w-xl text-slate-200">
                  Reach out for consulting, speaking, or collaborative side projects. I’m always
                  open to discussing complex frontend problems.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <Link
                  href={`mailto:${site.email}`}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
                >
                  Email me
                </Link>
                <Link
                  href={site.social.linkedin}
                  className="rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
