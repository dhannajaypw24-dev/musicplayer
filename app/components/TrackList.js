export default function TrackList({ tracks, onSelect, selectedIndex }) {
  return (
    <div
      className="
        max-h-[340px]
        overflow-y-auto
        pr-2
        space-y-2
        track-list-scroll
      "
    >
      {tracks.map((track, index) => {
        const isActive = selectedIndex === index;

        return (
          <div
            key={index}
            className={`group relative w-full flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl border overflow-hidden transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-indigo-600/25 via-purple-600/15 to-transparent border-indigo-500/50 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                : "bg-gray-900/40 border-gray-800/80 hover:bg-gray-800/60 hover:border-gray-700 hover:translate-x-1 hover:shadow-md"
            }`}
          >
            {/* Left accent bar */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
                isActive
                  ? "h-8 bg-gradient-to-b from-indigo-400 to-purple-500 shadow-[0_0_12px_rgba(129,140,248,0.8)]"
                  : "h-0 bg-indigo-400 group-hover:h-6"
              }`}
            />

            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isActive ? "true" : undefined}
              className="relative z-10 flex min-w-0 flex-1 items-center gap-3 text-left"
            >
              <span
                className={`flex-shrink-0 w-6 text-xs font-bold tabular-nums transition-colors ${
                  isActive
                    ? "text-indigo-300"
                    : "text-gray-500 group-hover:text-indigo-400"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={`flex-shrink-0 text-base transition-transform duration-300 ${
                  isActive
                    ? "text-indigo-400 scale-110"
                    : "text-gray-500 group-hover:text-gray-300 group-hover:scale-110"
                }`}
              >
                🎵
              </span>

              <span className="flex-1 min-w-0">
                <p
                  className={`truncate text-sm font-semibold tracking-tight transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-200 group-hover:text-white"
                  }`}
                >
                  {track.title}
                </p>
                {track.artist && (
                  <span
                    className={`mt-0.5 block truncate text-xs transition-colors ${
                      isActive
                        ? "text-indigo-300/80"
                        : "text-gray-500 group-hover:text-gray-400"
                    }`}
                  >
                    {track.artist}
                  </span>
                )}
              </span>

              {isActive && (
                <span
                  aria-label="Currently selected"
                  className="flex items-end gap-[3px] h-5 flex-shrink-0"
                >
                  <span className="w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400 animate-eq-1" />
                  <span className="w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400 animate-eq-2" />
                  <span className="w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400 animate-eq-3" />
                  <span className="w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400 animate-eq-4" />
                </span>
              )}
            </button>

            {/* Hover shine */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}