"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function getHeadingElements(ids: string[]) {
  return ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));
}

type TocVariant = "auto" | "desktop" | "mobile";

export function Toc({
  items,
  variant = "auto"
}: {
  items: TocItem[];
  variant?: TocVariant;
}) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const desktopListRef = useRef<HTMLUListElement | null>(null);
  const mobileListRef = useRef<HTMLUListElement | null>(null);
  const showDesktop = variant === "auto" || variant === "desktop";
  const showMobile = variant === "auto" || variant === "mobile";

  useEffect(() => {
    if (items.length === 0) return;

    const headings = getHeadingElements(ids);
    if (headings.length === 0) return;

    const onScroll = () => {
      const offset = 140;
      const scrollPos = window.scrollY + offset;
      let current = headings[0].id;

      for (const heading of headings) {
        if (heading.offsetTop <= scrollPos) {
          current = heading.id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, items.length]);

  useEffect(() => {
    if (!activeId) return;
    const refs = [
      { ref: desktopListRef.current, enabled: true },
      { ref: mobileListRef.current, enabled: isOpen }
    ];

    refs.forEach(({ ref, enabled }) => {
      if (!enabled || !ref) return;
      if (ref.scrollHeight <= ref.clientHeight) return;

      const activeEl = ref.querySelector(`[data-toc-id="${activeId}"]`);
      if (!(activeEl instanceof HTMLElement)) return;

      const itemTop = activeEl.offsetTop;
      const itemBottom = itemTop + activeEl.offsetHeight;
      const viewTop = ref.scrollTop;
      const viewBottom = viewTop + ref.clientHeight;

      if (itemTop < viewTop) {
        ref.scrollTo({ top: itemTop, behavior: "auto" });
      } else if (itemBottom > viewBottom) {
        ref.scrollTo({ top: itemBottom - ref.clientHeight, behavior: "auto" });
      }
    });
  }, [activeId, isOpen]);

  if (items.length === 0) return null;

  const renderList = (
    ref: RefObject<HTMLUListElement | null>,
    className: string,
    onItemClick?: () => void
  ) => (
    <ul ref={ref} className={className}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              data-toc-id={item.id}
              href={`#${item.id}`}
              onClick={onItemClick}
              className={`block rounded-md px-2 py-1 transition ${
                isActive
                  ? "bg-ink/5 font-semibold text-ink"
                  : "hover:text-ink"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {showDesktop && (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            On this page
          </p>
          {renderList(
            desktopListRef,
            "mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-2 text-sm text-slate-600"
          )}
        </div>
      )}

      {showMobile && (
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink shadow-soft"
            aria-expanded={isOpen}
            aria-controls="toc-panel"
            aria-label="Open table of contents"
          >
            <span>TOC</span>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
              {items.length}
            </span>
          </button>
        </div>
      )}

      {showMobile && isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close table of contents"
          />
          <div
            id="toc-panel"
            className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-hidden rounded-l-3xl bg-white p-6 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                On this page
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>
            {renderList(
              mobileListRef,
              "mt-4 flex-1 space-y-3 overflow-y-auto pr-2 text-sm text-slate-600",
              () => setIsOpen(false)
            )}
          </div>
        </div>
      )}
    </>
  );
}
