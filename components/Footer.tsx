import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-ink">{site.name}</p>
          <p>{site.description}</p>
        </div>
        <div className="flex gap-4">
          <Link href={site.social.github} className="hover:text-ink">
            GitHub
          </Link>
          <Link href={site.social.linkedin} className="hover:text-ink">
            LinkedIn
          </Link>
          <Link href={site.social.twitter} className="hover:text-ink">
            X
          </Link>
        </div>
      </div>
    </footer>
  );
}
