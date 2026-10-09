import { allTracks } from "./allTracks";

const tracksBySinger = new Map();

allTracks.forEach((track) => {
  if (!track.artist) return;

  track.artist.split(", ").forEach((name) => {
    const singerTracks = tracksBySinger.get(name) || [];
    singerTracks.push(track);
    tracksBySinger.set(name, singerTracks);
  });
});

export const singers = Array.from(tracksBySinger, ([name, tracks]) => ({
  name,
  tracks,
}));
