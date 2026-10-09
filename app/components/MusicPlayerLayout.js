"use client";

import { useCallback, useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import TrackList from "./TrackList";

const trackThemes = [
  { glow1: "bg-indigo-600/25", glow2: "bg-purple-600/25", accent: "text-indigo-400" },
  { glow1: "bg-pink-600/25", glow2: "bg-rose-600/25", accent: "text-pink-400" },
  { glow1: "bg-emerald-600/25", glow2: "bg-teal-600/25", accent: "text-emerald-400" },
  { glow1: "bg-amber-600/25", glow2: "bg-orange-600/25", accent: "text-amber-400" },
  { glow1: "bg-blue-600/25", glow2: "bg-cyan-600/25", accent: "text-blue-400" },
];

export default function MusicPlayerLayout({
  title = "Now Playing",
  description = "Stream the latest Bollywood, Punjabi, Indipop & Haryanvi tracks",
  tracks = [],
}) {
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [playRequest, setPlayRequest] = useState(0);
  const theme = trackThemes[selectedTrack % trackThemes.length];

  const handleTrackSelect = useCallback((index) => {
    setSelectedTrack(index);
    setPlayRequest((request) => request + 1);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedTrack((previous) => (previous + 1) % Math.max(tracks.length, 1));
  }, [tracks.length]);

  const handlePrev = useCallback(() => {
    setSelectedTrack(
      (previous) =>
        (previous - 1 + Math.max(tracks.length, 1)) %
        Math.max(tracks.length, 1)
    );
  }, [tracks.length]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -right-40 -top-40 h-96 w-96 rounded-full blur-3xl transition-colors duration-1000 ${theme.glow1}`}
        />
        <div
          className={`absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl transition-colors duration-1000 ${theme.glow2}`}
        />
        <div
          className={`absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30 transition-colors duration-1000 ${theme.glow1}`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 lg:mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className={`transition-colors duration-700 ${theme.accent}`}>
              {title}
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">{description}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <section className="lg:col-span-3" aria-label="Music player">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <MusicPlayer
                tracks={tracks}
                initialTrack={selectedTrack}
                playRequest={playRequest}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>
          </section>

          <section className="lg:col-span-2" aria-label="Track list">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Tracks</h2>
                <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-400">
                  {tracks.length} tracks
                </span>
              </div>
              <TrackList
                tracks={tracks}
                onSelect={handleTrackSelect}
                selectedIndex={selectedTrack}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
