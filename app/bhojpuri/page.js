import Link from "next/link";
import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { bhojpuriTracks } from "../data/tracks/bhojpuri";
import {
  bhojpuriArtists,
  bhojpuriCollections,
  getArtistHref,
} from "../data/bhojpuriCatalog";

export default function BhojpuriPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Bhojpuri music
          </p>
          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Bhojpuri Songs
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-300 sm:text-lg">
              Listen to popular Bhojpuri tracks and explore festival music,
              dance favorites, and singers from across the Bhojpuri music scene.
            </p>
          </div>

          <section className="mt-12" aria-labelledby="bhojpuri-collections">
            <div className="mb-5">
              <h2
                id="bhojpuri-collections"
                className="text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Browse Bhojpuri Songs
              </h2>
              <p className="mt-2 text-sm text-gray-400 sm:text-base">
                Explore music by festival and listening mood.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {bhojpuriCollections.map((collection) => (
                <article
                  key={collection.id}
                  id={collection.id}
                  className="scroll-mt-24 rounded-2xl border border-gray-800 bg-gray-900/70 p-5 shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-2xl">
                    <span aria-hidden="true">{collection.icon}</span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                    {collection.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {collection.title}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-gray-400">
                    {collection.description}
                  </p>
                  <Link
                    href={collection.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    View collection <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section
            className="mt-14 scroll-mt-24"
            aria-labelledby="bhojpuri-artists"
          >
            <div className="mb-5">
              <h2
                id="bhojpuri-artists"
                className="text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Top Bhojpuri Artists &amp; Singers
              </h2>
              <p className="mt-2 text-sm text-gray-400 sm:text-base">
                Discover music from popular Bhojpuri voices.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {bhojpuriArtists.map((artist, index) => (
                <li
                  key={artist}
                  className="rounded-xl border border-gray-800 bg-gray-900/60"
                >
                  <Link
                    href={getArtistHref(artist)}
                    className="flex items-center gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-sm font-bold text-indigo-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-gray-100">{artist}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div id="tracks" className="scroll-mt-16">
        <MusicPlayerLayout
          title="Bhojpuri Tracks"
          description="Listen to popular Bhojpuri songs and regional favorites."
          tracks={bhojpuriTracks}
        />
      </div>
    </>
  );
}
