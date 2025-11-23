// Hotspot definitions for the magical library - Computer Vision Verified
export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  description: string;
}

export const HOTSPOTS: Hotspot[] = [
  // 🐈 FOREGROUND TABLE AREA
  {
    id: "sleeping-cat",
    x: 42.0,
    y: 69.0,
    label: "Sleeping Cat",
    description: "A ginger cat dozes peacefully on a cushioned stool, dreaming of ancient tales...",
  },
  {
    id: "coffee-mug",
    x: 52.0,
    y: 55.0,
    label: "Steaming Coffee",
    description: "A warm cup of coffee, still steaming. Someone was just here...",
  },
  {
    id: "open-notebook",
    x: 56.0,
    y: 72.0,
    label: "Open Notebook",
    description: "Pages filled with handwritten notes and sketches, waiting to be read...",
  },
  {
    id: "book-stack-table",
    x: 67.0,
    y: 60.0,
    label: "Stacked Books",
    description: "A tall stack of antique books on the table, waiting to be explored...",
  },
  {
    id: "ink-bottle",
    x: 70.0,
    y: 66.0,
    label: "Ink & Quill",
    description: "A delicate ink pot and quill, ready for writing letters to distant friends...",
  },
  {
    id: "letters-box",
    x: 77.0,
    y: 63.0,
    label: "Sealed Letters",
    description: "A box of letters sealed with wax, containing secrets and stories untold...",
  },
  {
    id: "fern-plant-table",
    x: 73.0,
    y: 54.0,
    label: "Potted Fern",
    description: "A lush fern bringing life and freshness to this cozy corner...",
  },

  // 📚 BACK WALL - TOP SHELF
  {
    id: "moon-art-top",
    x: 49.0,
    y: 27.0,
    label: "Moon Phases Art",
    description: "A framed illustration showing the phases of the moon in intricate detail...",
  },
  {
    id: "book-stack-shelf",
    x: 54.0,
    y: 27.0,
    label: "Shelf Books",
    description: "A neat stack of leather-bound books on the top shelf...",
  },
  {
    id: "lantern-shelf",
    x: 42.0,
    y: 27.0,
    label: "Hanging Lantern",
    description: "A warm lantern casting gentle light across the shelves...",
  },

  // 📚 BACK WALL - HANGING ITEMS
  {
    id: "hanging-herbs-left",
    x: 37.0,
    y: 21.0,
    label: "Dried Herbs",
    description: "Bundles of dried herbs hang from the rafters, filling the air with their scent...",
  },
  {
    id: "hanging-flowers-center-left",
    x: 50.0,
    y: 21.0,
    label: "Pink Hanging Flowers",
    description: "Dried pink and purple flowers, preserved from summers past...",
  },
  {
    id: "hanging-flowers-center-right",
    x: 58.0,
    y: 21.0,
    label: "Yellow Dried Flowers",
    description: "Bright yellow dried flowers hang cheerfully from the beams...",
  },
  {
    id: "hanging-basket",
    x: 65.0,
    y: 21.0,
    label: "Woven Basket",
    description: "A decorative woven basket hangs among the herbs and flowers...",
  },

  // 📚 BACK WALL - MIDDLE SHELVES
  {
    id: "globe",
    x: 61.0,
    y: 36.0,
    label: "Antique Globe",
    description: "An old globe showing lands both real and imagined, waiting to be explored...",
  },
  {
    id: "candle-center-shelf",
    x: 48.0,
    y: 40.0,
    label: "Flickering Candle",
    description: "A small candle flame dances in the quiet air of the library...",
  },
  {
    id: "botanical-print-center",
    x: 59.0,
    y: 48.0,
    label: "Botanical Print",
    description: "A framed print of pressed herbs, catalogued with careful detail...",
  },
  {
    id: "pyramid-sculpture",
    x: 66.0,
    y: 54.0,
    label: "Crystal Pyramid",
    description: "A small crystal pyramid sits on the shelf, refracting light into rainbows...",
  },

  // 🌿 LEFT WALL SHELVES
  {
    id: "botanical-prints-left",
    x: 16.0,
    y: 45.0,
    label: "Nature Studies",
    description: "A collection of botanical prints, each one a masterpiece of observation...",
  },
  {
    id: "candle-left-shelf",
    x: 19.0,
    y: 53.0,
    label: "Shelf Candle",
    description: "A small candle nestled between books, keeping watch through the night...",
  },
  {
    id: "plant-pot-left",
    x: 24.0,
    y: 54.0,
    label: "Shelf Plant",
    description: "A thriving plant that seems to love the company of books...",
  },
  {
    id: "crystal-geode",
    x: 17.0,
    y: 61.0,
    label: "Crystal Geode",
    description: "A beautiful white geode catches the light, its crystals sparkling like stars...",
  },
  {
    id: "left-lantern-floor",
    x: 13.0,
    y: 75.0,
    label: "Floor Lantern",
    description: "A large lantern resting on the floor, its glow reaching into shadowed corners...",
  },

  // 🌸 RIGHT WINDOW AREA
  {
    id: "hanging-ivy-top",
    x: 84.0,
    y: 17.0,
    label: "Hanging Ivy",
    description: "Cascading ivy brings the outside in, a living decoration...",
  },
  {
    id: "astrology-chart",
    x: 86.0,
    y: 29.0,
    label: "Astrology Chart",
    description: "An ancient astrological chart mapping the celestial bodies, moon phases, and zodiac signs. The stars whisper secrets of fate and fortune to those who know how to listen...",
  },
  {
    id: "candle-right-wall",
    x: 89.0,
    y: 35.0,
    label: "Wall Candle",
    description: "A tall candle on the wall shelf illuminates the corner with warm light...",
  },
  {
    id: "arched-window",
    x: 88.0,
    y: 41.0,
    label: "Garden Window",
    description: "Through the arched window, a secret garden blooms with roses and magic...",
  },
  {
    id: "window-roses",
    x: 93.0,
    y: 48.0,
    label: "Rose Garden",
    description: "Pink roses bloom just outside, their petals glowing in the soft light...",
  },
  {
    id: "fern-windowsill",
    x: 83.0,
    y: 54.0,
    label: "Windowsill Fern",
    description: "A potted fern thrives in the natural light from the window...",
  },
  {
    id: "corner-candle",
    x: 95.0,
    y: 73.0,
    label: "Corner Candle",
    description: "A tall candle in the corner creates a warm, inviting glow...",
  },

  // 🔥 CEILING & LIGHTS
  {
    id: "chandelier",
    x: 50.0,
    y: 15.0,
    label: "Grand Chandelier",
    description: "An elegant chandelier illuminates the entire library with warm, golden light...",
  },
  {
    id: "string-lights-left",
    x: 23.0,
    y: 18.0,
    label: "Fairy Lights",
    description: "Twinkling string lights add a touch of whimsy to this magical space...",
  },
  {
    id: "string-lights-right",
    x: 67.0,
    y: 18.0,
    label: "String Lights",
    description: "More fairy lights dance across the ceiling, like captured fireflies...",
  },
  {
    id: "wooden-beams",
    x: 50.0,
    y: 10.0,
    label: "Ancient Beams",
    description: "The wooden beams have held this library together for centuries, silent witnesses to countless stories...",
  },
];
