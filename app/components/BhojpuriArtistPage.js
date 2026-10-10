import Link from "next/link";
import MusicPlayerLayout from "./MusicPlayerLayout";
import { bhojpuriArtists, getArtistHref } from "../data/bhojpuriCatalog";

export default function BhojpuriArtistPage({ artist, tracks }) {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/bhojpuri"
              className="font-medium text-indigo-300 hover:text-indigo-200"
            >
              Bhojpuri
            </Link>
            <span className="text-gray-600" aria-hidden="true">
              /
            </span>
            <span className="text-gray-400">Artists</span>
            <span className="text-gray-600" aria-hidden="true">
              /
            </span>
            <span className="text-gray-300">{artist}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
            <nav
              aria-label="Bhojpuri artists and singers"
              className="h-fit rounded-2xl border border-gray-800 bg-gray-900/70 p-5"
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Top artists &amp; singers
              </h2>
              <ul className="mt-3 space-y-1">
                {bhojpuriArtists.map((name) => (
                  <li key={name}>
                    <Link
                      href={getArtistHref(name)}
                      aria-current={name === artist ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        name === artist
                          ? "bg-indigo-500/20 text-indigo-200"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <header className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  Bhojpuri artist
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {artist}
                </h1>
                <p className="mt-3 text-gray-400">
                  {tracks.length
                    ? `${tracks.length} ${
                        tracks.length === 1 ? "track" : "tracks"
                      } in the Bhojpuri catalog`
                    : "Artist tracks will appear here when they are added to the catalog."}
                </p>
              </header>

              {tracks.length ? (
                <div className="mt-6">
                  <MusicPlayerLayout
                    title={`${artist} Songs`}
                    description={`Listen to Bhojpuri songs by ${artist}.`}
                    tracks={tracks}
                  />
                </div>
              ) : (
                <section
                  aria-label={`${artist} tracks`}
                  className="mt-6 rounded-2xl border border-gray-800 bg-gray-900/70 p-6 sm:p-8"
                >
                  <h2 className="text-xl font-semibold text-white">
                    No tracks available yet
                  </h2>
                  <p className="mt-3 leading-7 text-gray-400">
                    There are no songs attributed to {artist} in the current
                    Bhojpuri track data. Browse all available Bhojpuri tracks
                  </p>
                  <Link
                    href="/bhojpuri#tracks"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Browse Bhojpuri tracks{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
