import BhojpuriCollectionPage from "../../components/BhojpuriCollectionPage";
import { bhojpuriDjTracks } from "../../data/tracks/bhojpuri/djSongs";

export default function BhojpuriDjSongsPage() {
  return (
    <BhojpuriCollectionPage
      collectionId="dj-songs"
      tracks={bhojpuriDjTracks}
    />
  );
}
