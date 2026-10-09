import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { punjabiTracks } from "../data/tracks/punjabi";

export default function PunjabiPage() {
  return (
    <MusicPlayerLayout
      title="Punjabi"
      description="Listen to Punjabi songs and favorites."
      tracks={punjabiTracks}
    />
  );
}
