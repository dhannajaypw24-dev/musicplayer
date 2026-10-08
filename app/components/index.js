"use client";

import { useState, useEffect, useCallback } from "react";
import MusicPlayer from "./MusicPlayer";
import TrackList from "./TrackList";
import { tracks } from "./Tracklist/Songlist";

const trackThemes = [
  { glow1: "bg-indigo-600/25", glow2: "bg-purple-600/25", accent: "text-indigo-400" },
  { glow1: "bg-pink-600/25", glow2: "bg-rose-600/25", accent: "text-pink-400" },
  { glow1: "bg-emerald-600/25", glow2: "bg-teal-600/25", accent: "text-emerald-400" },
  { glow1: "bg-amber-600/25", glow2: "bg-orange-600/25", accent: "text-amber-400" },
  { glow1: "bg-blue-600/25", glow2: "bg-cyan-600/25", accent: "text-blue-400" },
];

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(0);

  const theme = trackThemes[selectedTrack % trackThemes.length];

  const handleNext = useCallback(() => {
    setSelectedTrack((prev) => (prev + 1) % tracks.length);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white overflow-hidden">
      {/* Animated background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl transition-colors duration-1000 ease-in-out ${theme.glow1}`}
        />
        <div
          className={`absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl transition-colors duration-1000 ease-in-out ${theme.glow2}`}
        />
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-3xl opacity-30 transition-colors duration-1000 ease-in-out ${theme.glow1}`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <header className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Now{" "}
            <span className={`transition-colors duration-700 ${theme.accent}`}>
              Playing
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Stream the latest Bollywood, Punjabi, Indipop &amp; Haryanvi tracks
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-gray-900/70 backdrop-blur-sm border border-gray-800 shadow-2xl p-6 sm:p-8">
              <MusicPlayer
                tracks={tracks}
                key={selectedTrack}
                initialTrack={selectedTrack}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>

          
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-gray-900/70 backdrop-blur-sm border border-gray-800 shadow-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Up Next</h2>
                <span className="text-xs text-gray-500 bg-gray-800 px-2.5 py-1 rounded-full">
                  {tracks.length} tracks
                </span>
              </div>
              <TrackList
                tracks={tracks}
                onSelect={(index) => setSelectedTrack(index)}
                selectedIndex={selectedTrack}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}