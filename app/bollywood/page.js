import MusicPlayerLayout from "../components/MusicPlayerLayout";
import { bollywoodTracks } from "../data/tracks/bollywood";

export default function BollywoodPage() {
  return (
    <MusicPlayerLayout
      title="Bollywood"
      description="Listen to Bollywood songs and film soundtracks."
      tracks={bollywoodTracks}
    />
  );
}
