import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { bhojpuriTracks } from "../data/tracks/bhojpuri";

export default function BhojpuriPage() {
  return (
    <MusicPlayerLayout
      title="Bhojpuri"
      description="Listen to Bhojpuri songs and regional favorites."
      tracks={bhojpuriTracks}
    />
  );
}
