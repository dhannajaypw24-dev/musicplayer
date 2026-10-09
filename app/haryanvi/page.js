import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { haryanviTracks } from "../data/tracks/haryanvi";

export default function HaryanviPage() {
  return (
    <MusicPlayerLayout
      title="Haryanvi"
      description="Listen to Haryanvi songs and regional favorites."
      tracks={haryanviTracks}
    />
  );
}
