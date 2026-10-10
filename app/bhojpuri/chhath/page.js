import BhojpuriCollectionPage from "../../components/BhojpuriCollectionPage";
import { chhathTracks } from "../../data/tracks/bhojpuri/chhath";

export default function ChhathPage() {
  return (
    <BhojpuriCollectionPage collectionId="chhath" tracks={chhathTracks} />
  );
}
