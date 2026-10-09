"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function MusicPlayer({
  tracks = [],
  initialTrack = 0,
  playRequest = 0,
  onNext,
  onPrev,
}) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  // Sync when parent changes initialTrack
  useEffect(() => {
    setCurrentTrackIndex(initialTrack);
    setCurrentTime(0);
    setDuration(0);
  }, [initialTrack]);

  useEffect(() => {
    if (playRequest > 0) setIsPlaying(true);
  }, [playRequest]);

  const safeIndex = tracks.length ? currentTrackIndex % tracks.length : 0;
  const track = tracks[safeIndex];

  // Play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((err) => console.error("Playback error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const playNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % Math.max(tracks.length, 1));
    if (onNext) onNext();
  }, [tracks.length, onNext]);

  const playPrev = useCallback(() => {
    setCurrentTrackIndex(
      (prev) =>
        (prev - 1 + Math.max(tracks.length, 1)) % Math.max(tracks.length, 1)
    );
    if (onPrev) onPrev();
  }, [tracks.length, onPrev]);

  // ⏪ Rewind 10 seconds
  const rewind10 = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  }, []);

  // ⏩ Forward 10 seconds
  const forward10 = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  // Progress bar seek
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  };

  // Volume
  const handleVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // ⌨ Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        rewind10();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        forward10();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, rewind10, forward10]);

  const fmt = (s) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  };

  if (!tracks.length) {
    return (
      <div className="p-6 rounded-xl bg-gray-900/70 border border-gray-800 text-gray-400 text-center">
        No tracks available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Track title */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white truncate px-2">
          {track?.title || "Unknown Track"}
        </h2>
        {track?.artist && (
          <p className="mt-1 text-sm text-gray-400">{track.artist}</p>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-gray-500 tabular-nums">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* Rewind */}
        <button
          onClick={rewind10}
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          aria-label="Rewind 10 seconds"
          title="Rewind 10s (←)"
        >
          <span className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gray-800/80 border border-gray-700 group-hover:border-indigo-500/60 transition-all">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
            </svg>
            <span className="absolute text-[10px] font-bold text-white">10</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider">Rewind</span>
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-transform"
          aria-label={isPlaying ? "Pause" : "Play"}
          title="Play/Pause (Space)"
        >
          {isPlaying ? (
            <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg className="h-7 w-7 sm:h-8 sm:w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Forward */}
        <button
          onClick={forward10}
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          aria-label="Forward 10 seconds"
          title="Forward 10s (→)"
        >
          <span className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gray-800/80 border border-gray-700 group-hover:border-indigo-500/60 transition-all">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 6v12l8.5-6L13 6zm-.5 6L4 6v12l8.5-6z" />
            </svg>
            <span className="absolute text-[10px] font-bold text-white">10</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider">Forward</span>
        </button>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={playPrev}
          disabled={tracks.length <= 1}
          className="px-4 py-2 text-sm rounded-full bg-gray-800/70 border border-gray-700 text-gray-300 hover:text-white hover:border-indigo-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ⏮ Previous
        </button>
        <button
          onClick={playNext}
          disabled={tracks.length <= 1}
          className="px-4 py-2 text-sm rounded-full bg-gray-800/70 border border-gray-700 text-gray-300 hover:text-white hover:border-indigo-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next ⏭
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">🔊</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolume}
          className="flex-1 h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
        />
        <span className="text-xs text-gray-500 tabular-nums w-10 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Shortcut hints */}
      <div className="flex justify-center gap-4 text-[10px] uppercase tracking-wider text-gray-500 pt-1">
        <span>← Rewind</span>
        <span>Space Play/Pause</span>
        <span>→ Forward</span>
      </div>

      <audio ref={audioRef} src={track?.src} preload="metadata" />
    </div>
  );
}