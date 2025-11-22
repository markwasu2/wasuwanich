// Hotspot definitions for the magical library
export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  description: string;
}

export const HOTSPOTS: Hotspot[] = [
  // 🐈 Foreground / Table / Cat Area
  {
    id: "sleeping-cat",
    x: 42.6,
    y: 72.4,
    label: "Sleeping Cat",
    description: "A ginger cat dozes peacefully on a cushioned stool, dreaming of ancient tales...",
  },
  {
    id: "coffee-mug",
    x: 54.9,
    y: 61.2,
    label: "Steaming Coffee",
    description: "A warm cup of coffee, still steaming. Someone was just here...",
  },
  {
    id: "open-notebook",
    x: 61.8,
    y: 74.5,
    label: "Open Notebook",
    description: "Pages filled with handwritten notes and sketches, waiting to be read...",
  },
  {
    id: "book-stack",
    x: 52.9,
    y: 67.6,
    label: "Antique Books",
    description: "A carefully stacked collection of leather-bound volumes, worn with time...",
  },
  {
    id: "ink-bottle",
    x: 67.0,
    y: 68.0,
    label: "Ink & Quill",
    description: "A delicate ink pot and quill, ready for writing letters to distant friends...",
  },
  {
    id: "letters-box",
    x: 79.2,
    y: 65.8,
    label: "Sealed Letters",
    description: "A box of letters sealed with wax, containing secrets and stories untold...",
  },
  {
    id: "fern-plant",
    x: 75.7,
    y: 55.9,
    label: "Potted Fern",
    description: "A lush fern bringing life and freshness to this cozy corner...",
  },

  // 📚 Middle Bookshelves (Back Wall)
  {
    id: "center-statue",
    x: 50.0,
    y: 51.5,
    label: "Owl Sculpture",
    description: "A wise owl watches over the library, guardian of knowledge...",
  },
  {
    id: "botanical-print-center",
    x: 50.0,
    y: 59.7,
    label: "Botanical Illustration",
    description: "A framed print of pressed herbs, catalogued with careful detail...",
  },
  {
    id: "botanical-print-right",
    x: 63.5,
    y: 52.3,
    label: "Herbal Study",
    description: "Another botanical study, showing the medicinal properties of ancient plants...",
  },
  {
    id: "hanging-herbs-left",
    x: 36.5,
    y: 22.6,
    label: "Dried Herbs",
    description: "Bundles of lavender and sage hang from the rafters, filling the air with their scent...",
  },
  {
    id: "hanging-herbs-right",
    x: 58.5,
    y: 23.4,
    label: "Hanging Flowers",
    description: "Dried roses and wildflowers, preserved from summers past...",
  },
  {
    id: "antique-globe",
    x: 63.0,
    y: 38.8,
    label: "Antique Globe",
    description: "An old globe showing lands both real and imagined, waiting to be explored...",
  },
  {
    id: "shelf-lantern",
    x: 44.5,
    y: 30.2,
    label: "Reading Lantern",
    description: "A warm lantern casting gentle light across the pages of countless books...",
  },
  {
    id: "mini-candle",
    x: 49.5,
    y: 41.8,
    label: "Flickering Candle",
    description: "A small candle flame dances in the quiet air of the library...",
  },

  // 🌿 Left Shelves / Side Wall
  {
    id: "botanical-prints-left",
    x: 15.8,
    y: 47.3,
    label: "Nature Studies",
    description: "A collection of botanical prints, each one a masterpiece of observation...",
  },
  {
    id: "left-lantern",
    x: 15.1,
    y: 78.2,
    label: "Floor Lantern",
    description: "A large lantern resting on the floor, its glow reaching into shadowed corners...",
  },
  {
    id: "side-candle",
    x: 19.0,
    y: 63.0,
    label: "Shelf Candle",
    description: "A small candle nestled between books, keeping watch through the night...",
  },
  {
    id: "plant-pot-left",
    x: 24.0,
    y: 57.8,
    label: "Shelf Plant",
    description: "A thriving plant that seems to love the company of books...",
  },
  {
    id: "crystal-geode",
    x: 18.8,
    y: 55.7,
    label: "Crystal Geode",
    description: "A beautiful geode catches the light, its crystals sparkling like stars...",
  },

  // 🌸 Right Window Area
  {
    id: "arched-window",
    x: 87.0,
    y: 41.0,
    label: "Garden Window",
    description: "Through the arched window, a secret garden blooms with roses and magic...",
  },
  {
    id: "celestial-art",
    x: 86.8,
    y: 30.0,
    label: "Moon Art",
    description: "A framed celestial map showing the phases of the moon and distant constellations...",
  },
  {
    id: "hanging-ivy",
    x: 83.7,
    y: 18.8,
    label: "Hanging Ivy",
    description: "Cascading ivy brings the outside in, a living decoration...",
  },
  {
    id: "window-roses",
    x: 95.0,
    y: 50.0,
    label: "Rose Garden",
    description: "Pink roses bloom just outside, their petals glowing in the soft light...",
  },
  {
    id: "right-candle",
    x: 92.2,
    y: 37.1,
    label: "Window Candle",
    description: "A bright candle on the windowsill, a beacon for travelers...",
  },
  {
    id: "corner-lantern",
    x: 93.8,
    y: 82.5,
    label: "Corner Lantern",
    description: "A warm lantern in the corner creates a perfect reading nook...",
  },

  // 🔥 Ceiling / Lights
  {
    id: "chandelier",
    x: 50.0,
    y: 16.6,
    label: "Grand Chandelier",
    description: "An elegant chandelier illuminates the entire library with warm, golden light...",
  },
  {
    id: "string-lights-left",
    x: 20.9,
    y: 19.2,
    label: "Fairy Lights",
    description: "Twinkling string lights add a touch of whimsy to this magical space...",
  },
  {
    id: "string-lights-right",
    x: 66.2,
    y: 19.7,
    label: "String Lights",
    description: "More fairy lights dance across the ceiling, like captured fireflies...",
  },
  {
    id: "exposed-beams",
    x: 50.0,
    y: 11.0,
    label: "Ancient Beams",
    description: "The wooden beams have held this library together for centuries, silent witnesses to countless stories...",
  },
];
