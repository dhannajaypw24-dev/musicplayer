import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { indipopTracks } from "../data/tracks/indipop";

export default function IndipopPage() {
  return (
    <MusicPlayerLayout
      title="Indipop"
      description="Listen to Indian pop tracks."
      tracks={indipopTracks}
    />
  );
}
