import Link from "next/link";
import { notFound } from "next/navigation";
import {
  bhojpuriArtists,
  bhojpuriCollections,
  getArtistHref,
} from "../data/bhojpuriCatalog";
import MusicPlayerLayout from "./MusicPlayerLayout";

export default function BhojpuriCollectionPage({ collectionId, tracks = [] }) {
  const collection = bhojpuriCollections.find(
    (item) => item.id === collectionId
  );

  if (!collection) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8">
          <Link
            href="/bhojpuri"
            className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
          >
            Bhojpuri
          </Link>
          <span className="mx-2 text-gray-600" aria-hidden="true">
            /
          </span>
          <span className="text-sm text-gray-400">{collection.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="space-y-6">
            <nav
              aria-label="Bhojpuri song submenu"
              className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5"
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Bhojpuri songs
              </h2>
              <Link
                href="/bhojpuri"
                className="mt-3 block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
              >
                All Bhojpuri songs
              </Link>
              <ul className="mt-1 space-y-1">
                {bhojpuriCollections.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={item.id === collection.id ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        item.id === collection.id
                          ? "bg-indigo-500/20 text-indigo-200"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              aria-label="Top Bhojpuri artists and singers"
              className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5"
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Top artists &amp; singers
              </h2>
              <ul className="mt-3 space-y-1">
                {bhojpuriArtists.map((artist) => (
                  <li key={artist}>
                    <Link
                      href={getArtistHref(artist)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                    >
                      {artist}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div>
            <section className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-2xl sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                {collection.label}
              </p>
              <div className="mt-5 flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-3xl"
                >
                  {collection.icon}
                </span>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {collection.title}
                  </h1>
                  <p className="mt-3 max-w-2xl leading-7 text-gray-300">
                    {collection.description}
                  </p>
                </div>
              </div>
            </section>

            {tracks.length ? (
              <div className="mt-6">
                <MusicPlayerLayout
                  title={`${collection.title} Playlist`}
                  description={collection.description}
                  tracks={tracks}
                />
              </div>
            ) : (
              <section
                aria-labelledby="collection-tracks"
                className="mt-6 rounded-2xl border border-gray-800 bg-gray-900/70 p-6 sm:p-8"
              >
                <h2 id="collection-tracks" className="text-xl font-semibold">
                  {collection.title} playlist
                </h2>
                <p className="mt-3 leading-7 text-gray-400">
                  There are no tracks specifically categorized for this
                  collection yet. Browse the current Bhojpuri catalog while
                  more songs are added.
                </p>
                <Link
                  href="/bhojpuri#tracks"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Browse Bhojpuri tracks <span aria-hidden="true">→</span>
                </Link>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
