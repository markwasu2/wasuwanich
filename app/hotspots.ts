// Hotspot definitions for the magical bookstore
export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  description: string;
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: "shelf1",
    x: 20,
    y: 40,
    label: "Mystery Section",
    description: "Ancient tomes filled with unsolved riddles and forgotten tales...",
  },
  {
    id: "shelf2",
    x: 50,
    y: 35,
    label: "Fantasy Corner",
    description: "Where dragons soar and magic flows through every page...",
  },
  {
    id: "shelf3",
    x: 75,
    y: 45,
    label: "Poetry Nook",
    description: "Whispers of verses that dance in the moonlight...",
  },
  {
    id: "desk",
    x: 40,
    y: 70,
    label: "Reading Desk",
    description: "A cozy spot where time stands still and stories come alive...",
  },
  {
    id: "window",
    x: 85,
    y: 25,
    label: "Window View",
    description: "Look outside to see the world beyond the pages...",
  },
];

