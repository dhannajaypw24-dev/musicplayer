import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { allTracks } from "../data/tracks/allTracks";

export default function PlayerPage() {
  return (
    <MusicPlayerLayout
      title="Music Player"
      description="Choose a track from the full music catalog."
      tracks={allTracks}
    />
  );
}
