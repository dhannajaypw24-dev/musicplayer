import { notFound } from "next/navigation";
import BhojpuriArtistPage from "../../../components/BhojpuriArtistPage";
import {
  bhojpuriArtists,
  getArtistSlug,
} from "../../../data/bhojpuriCatalog";
import { getBhojpuriArtistTracks } from "../../../data/tracks/bhojpuriArtists";

export default async function BhojpuriSingerPage({ params }) {
  const { slug } = await params;
  const artist = bhojpuriArtists.find((name) => getArtistSlug(name) === slug);

  if (!artist) notFound();

  return (
    <BhojpuriArtistPage
      artist={artist}
      tracks={getBhojpuriArtistTracks(artist)}
    />
  );
}
