/**
 * Real-Life Snake Species & Anatomical Color Configurations
 * Realistic biological palettes and markings based on authentic herpetological specimens.
 */

export type SnakePatternType = 'diamonds' | 'bands' | 'lightning' | 'blotches' | 'smooth';

export interface SnakeColorConfig {
  id: string;
  name: string;
  scientificName: string;
  habitat: string;
  description: string;
  primaryScale: string;     // Main dorsal scale color
  secondaryScale: string;   // Dorsal scale contour / shading
  patternColor: string;     // Dorsal markings (diamonds, bands, blotches, zigzags)
  patternHighlight: string; // Edging of pattern (e.g. white border around diamonds)
  bellyColor: string;       // Ventral underbelly plates
  eyeColor: string;         // Iris color
  pupilColor: string;       // Pupil color
  tongueColor: string;      // Forked tongue color
  patternType: SnakePatternType;
  isCustom?: boolean;
}

export const SNAKE_SPECIES_PRESETS: SnakeColorConfig[] = [
  {
    id: 'emerald-boa',
    name: 'Emerald Tree Boa',
    scientificName: 'Corallus caninus',
    habitat: 'Amazon Rainforest Canopy',
    description: 'Vivid emerald green dorsal scales adorned with crisp white enamel lightning zigzags, canary yellow underbelly, and piercing golden-amber slit eyes.',
    primaryScale: '#10b981',
    secondaryScale: '#047857',
    patternColor: '#f8fafc',
    patternHighlight: '#6ee7b7',
    bellyColor: '#fef08a',
    eyeColor: '#fbbf24',
    pupilColor: '#0f172a',
    tongueColor: '#ef4444',
    patternType: 'lightning',
  },
  {
    id: 'coral-snake',
    name: 'Eastern Coral Snake',
    scientificName: 'Micrurus fulvius',
    habitat: 'Southeastern Pine Scrub',
    description: 'Iconic biological warning pattern featuring rich crimson red, vibrant sulfur yellow, and glossy obsidian black venomous bands with bead-black eyes.',
    primaryScale: '#dc2626',
    secondaryScale: '#991b1b',
    patternColor: '#facc15',
    patternHighlight: '#0f172a',
    bellyColor: '#fef9c3',
    eyeColor: '#1e293b',
    pupilColor: '#000000',
    tongueColor: '#dc2626',
    patternType: 'bands',
  },
  {
    id: 'black-mamba',
    name: 'Obsidian Black Mamba',
    scientificName: 'Dendroaspis polylepis',
    habitat: 'Sub-Saharan Savanna & Rocky Hills',
    description: 'Sleek gunmetal and deep charcoal scales with iridescent graphite sheen, pale silver underbelly, smoky silver slit eyes, and an inky midnight mouth lining.',
    primaryScale: '#334155',
    secondaryScale: '#1e293b',
    patternColor: '#0f172a',
    patternHighlight: '#64748b',
    bellyColor: '#cbd5e1',
    eyeColor: '#94a3b8',
    pupilColor: '#000000',
    tongueColor: '#0f172a',
    patternType: 'smooth',
  },
  {
    id: 'blue-insularis',
    name: 'Blue Insularis Pit Viper',
    scientificName: 'Trimeresurus insularis',
    habitat: 'Lesser Sunda Islands, Indonesia',
    description: 'Rare and breathtaking electric sea-cyan and turquoise scales with delicate cerulean plate margins, powder-blue ventral scutes, and pale golden-amber slit eyes.',
    primaryScale: '#06b6d4',
    secondaryScale: '#0891b2',
    patternColor: '#0284c7',
    patternHighlight: '#67e8f9',
    bellyColor: '#bae6fd',
    eyeColor: '#fde047',
    pupilColor: '#0f172a',
    tongueColor: '#818cf8',
    patternType: 'smooth',
  },
  {
    id: 'albino-python',
    name: 'Albino Burmese Python',
    scientificName: 'Python bivittatus albino',
    habitat: 'Tropical Marshes & Jungles',
    description: 'Pearlescent ivory and warm saffron-gold dorsal saddles with delicate buttercup shading, translucent cream underbelly plates, and soft ruby-garnet eyes.',
    primaryScale: '#fef08a',
    secondaryScale: '#fde047',
    patternColor: '#f59e0b',
    patternHighlight: '#ffffff',
    bellyColor: '#fffbeb',
    eyeColor: '#f43f5e',
    pupilColor: '#881337',
    tongueColor: '#fb7185',
    patternType: 'blotches',
  },
  {
    id: 'mojave-diamondback',
    name: 'Mojave Diamondback',
    scientificName: 'Crotalus scutulatus',
    habitat: 'Mojave & Sonoran Deserts',
    description: 'Classic pit viper camouflage with dusty sage and sandy tan scales, dark chocolate diamond saddles edged with pale chalk rims, and sharp amber slit eyes.',
    primaryScale: '#a8a29e',
    secondaryScale: '#78716c',
    patternColor: '#44403c',
    patternHighlight: '#f5f5f4',
    bellyColor: '#e7e5e4',
    eyeColor: '#d97706',
    pupilColor: '#1c1917',
    tongueColor: '#78350f',
    patternType: 'diamonds',
  },
  {
    id: 'copperhead',
    name: 'Eastern Copperhead',
    scientificName: 'Agkistrodon contortrix',
    habitat: 'Deciduous Woodlands & Rock Outcrops',
    description: 'Distinctive coppery-russet body with rich chestnut hourglass bands across the dorsal ridge, warm bronze underbelly, and coppery hazel eyes.',
    primaryScale: '#c2410c',
    secondaryScale: '#9a3412',
    patternColor: '#7c2d12',
    patternHighlight: '#fdba74',
    bellyColor: '#fed7aa',
    eyeColor: '#f97316',
    pupilColor: '#1c1917',
    tongueColor: '#dc2626',
    patternType: 'bands',
  },
];

const STORAGE_KEY = 'chrono_snake_custom_config';

export function loadSavedSnakeConfig(): SnakeColorConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.primaryScale && parsed.eyeColor) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage parse errors
  }
  // Default to Emerald Tree Boa
  return SNAKE_SPECIES_PRESETS[0];
}

export function saveSnakeConfig(config: SnakeColorConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage write errors
  }
}
