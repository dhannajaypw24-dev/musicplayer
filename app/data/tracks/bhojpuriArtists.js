import { bhojpuriTracks } from "./bhojpuri";

export function getBhojpuriArtistTracks(artistName) {
  return bhojpuriTracks.filter((track) => track.artist === artistName);
}
