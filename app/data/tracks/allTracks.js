import { haryanviTracks } from "./haryanvi";
import { bollywoodTracks } from "./bollywood";
import { punjabiTracks } from "./punjabi";
import { indipopTracks } from "./indipop";

export const allTracks = [
  haryanviTracks[0],
  bollywoodTracks[0],
  punjabiTracks[0],
  ...bollywoodTracks.slice(1, 4),
  ...punjabiTracks.slice(1),
  indipopTracks[0],
  indipopTracks[1],
  bollywoodTracks[4],
];
