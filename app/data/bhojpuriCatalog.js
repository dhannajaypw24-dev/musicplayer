export const bhojpuriCollections = [
  {
    id: "chhath",
    href: "/bhojpuri/chhath",
    title: "Chhath Songs",
    description:
      "A place to discover Bhojpuri devotional songs for Chhath Puja.",
    icon: "🌅",
    label: "Festival collection",
  },
  {
    id: "navratri",
    href: "/bhojpuri/navratri",
    title: "Navratri Songs",
    description:
      "Explore Bhojpuri devotional music for Navratri and the festive season.",
    icon: "🪔",
    label: "Festival collection",
  },
  {
    id: "dj-songs",
    href: "/bhojpuri/dj-songs",
    title: "Bhojpuri DJ Songs",
    description:
      "Find Bhojpuri dance tracks and DJ favorites in the song catalog.",
    icon: "🎧",
    label: "Dance collection",
  },
];

export const bhojpuriArtists = [
  "Pawan Singh",
  "Ritesh Pandey",
  "Khesari Lal Yadav",
  "Indu Sonali",
  "Kalpana",
  "Khushboo Uttam",
  "Arvind Akela Kallu Ji",
  "Rakesh Mishra",
];

export function getArtistSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getArtistHref(name) {
  return `/bhojpuri/singers/${getArtistSlug(name)}`;
}
