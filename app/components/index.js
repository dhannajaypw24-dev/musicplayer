"use client";

import MusicPlayerLayout from "./MusicPlayerLayout";
import { tracks } from "./Tracklist/Songlist";

export default function Home() {
  return <MusicPlayerLayout tracks={tracks} />;
}