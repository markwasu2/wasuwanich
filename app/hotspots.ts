// Hotspot definitions for the magical library - ONLY 5 ESSENTIAL ITEMS
export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  description: string;
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: "sleeping-cat",
    x: 42.0,
    y: 70.0,
    label: "Sleeping Cat",
    description: "A ginger cat dozes peacefully on a cushioned stool, dreaming of ancient tales...",
  },
  {
    id: "coffee-mug",
    x: 56.0,
    y: 72.0,
    label: "Steaming Coffee",
    description: "A warm cup of coffee, still steaming. Someone was just here...",
  },
  {
    id: "open-notebook",
    x: 61.0,
    y: 77.0,
    label: "Open Notebook",
    description: "Pages filled with handwritten notes and sketches, waiting to be read...",
  },
  {
    id: "ink-bottle",
    x: 73.0,
    y: 67.0,
    label: "Ink & Quill",
    description: "A delicate ink pot and quill, ready for writing letters to distant friends...",
  },
  {
    id: "letters-box",
    x: 78.0,
    y: 73.0,
    label: "Sealed Letters",
    description: "A box of letters sealed with wax, containing secrets and stories untold...",
  },
  {
    id: "window-shelf",
    x: 15.0,
    y: 25.0,
    label: "Mystical Shelf",
    description: "A shelf by the window holds ancient grimoires and mystical artifacts...",
  },
];
