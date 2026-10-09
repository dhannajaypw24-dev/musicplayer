"use client";

import { useState } from "react";
import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { singers } from "../data/tracks/singers";

export default function SingersPage() {
  const [selectedSinger, setSelectedSinger] = useState(0);
  const singer = singers[selectedSinger];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Singers</h1>
        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Browse tracks by singer.
        </p>
        {singers.length ? (
          <div className="mt-6 flex flex-wrap gap-3" aria-label="Choose a singer">
            {singers.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={selectedSinger === index}
                onClick={() => setSelectedSinger(index)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selectedSinger === index
                    ? "border-indigo-400 bg-indigo-500/20 text-white"
                    : "border-gray-700 bg-gray-900/60 text-gray-300 hover:border-indigo-500"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-400">
            Singer details have not been added to the track catalog yet.
          </p>
        )}
      </div>

      {singer && (
        <MusicPlayerLayout
          key={singer.name}
          title={singer.name}
          description={`${singer.tracks.length} ${
            singer.tracks.length === 1 ? "track" : "tracks"
          }`}
          tracks={singer.tracks}
        />
      )}
    </div>
  );
}
