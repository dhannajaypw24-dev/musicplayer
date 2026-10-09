import Link from "next/link";
import { companyPages } from "../data/companyPages";

export default function CompanyPage({ slug }) {
  const page = companyPages[slug];

  if (!page) return null;

  return (
    <div className="relative isolate min-h-[70vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {page.description}
          </p>
          <Link
            href={page.action.href}
            className="mt-8 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {page.action.label}
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </Link>
        </header>

        <section
          aria-label={`${page.label} information`}
          className="mt-16 grid gap-5 md:grid-cols-2"
        >
          {page.sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur sm:p-9"
            >
              <span className="text-sm font-semibold tabular-nums text-indigo-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
