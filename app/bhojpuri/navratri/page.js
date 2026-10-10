import BhojpuriCollectionPage from "../../components/BhojpuriCollectionPage";
import { navratriTracks } from "../../data/tracks/bhojpuri/navratri";

export default function NavratriPage() {
  return (
    <BhojpuriCollectionPage collectionId="navratri" tracks={navratriTracks} />
  );
}
