export interface LookbookStory {
  id: string;
  volume: string;
  title: string;
  subtitle: string;
  date: string;
  heroImage: string;
  secondaryImage: string;
  quote: string;
  excerpt: string;
  paragraphs: string[];
  featuredProductIds: string[];
}

export const LOOKBOOK_STORIES: LookbookStory[] = [
  {
    id: 'geometry-of-warmth',
    volume: 'VOLUME IV',
    title: 'The Geometry of Warmth',
    subtitle: 'An Autumn / Winter study in double-faced wool, tactile drapes, and quiet silhouettes.',
    date: 'Autumn / Winter 2026',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    quote: '"Warmth is not merely temperature—it is the sensation of being held by materials that honor the body."',
    excerpt: 'Shot on location along the mist-laden basalt coastlines of northern Brittany, Volume IV explores how heavy virgin wools and liquid mulberry silks interact with changing northern light.',
    paragraphs: [
      'In a fashion landscape dominated by transient hyper-trends and disposable micro-seasons, Volume IV represents an intentional slowing down. Each garment in this collection took between four and fourteen months of iterative prototyping in our Milan studio.',
      'We began with the fabric: sourcing raw wool exclusively from regenerative flocks in Victoria and Biella, spun into double-face weaves that eliminate the need for synthetic fusing or plastic backings. The garments hold their architectural posture solely through tension, grain lines, and balanced tailoring.',
      'The color palette reflects nature in repose: bordeaux wine, cold basalt, damp slate, and warm unbleached ecru. These are shades that harmonize with stone, wood, and skin.'
    ],
    featuredProductIds: ['atelier-wool-trench', 'caelum-pleated-trouser', 'luna-draped-top']
  },
  {
    id: 'architecture-of-drape',
    volume: 'VOLUME III',
    title: 'The Architecture of Drape',
    subtitle: 'Examining the sensual tension between crisp Italian tailoring and organic fluidity.',
    date: 'Spring / Summer 2026',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    quote: '"Garments that exist in dialogue with movement, revealing form only when the wearer steps into space."',
    excerpt: 'A meditation on weightlessness. How 30mm sandwashed silk and crisp Giza cotton poplins create silhouettes that feel both monastic and intimately modern.',
    paragraphs: [
      'Drape is the vocabulary of ease. When a garment is cut strictly on the true bias—as with our Elysian Slip Dress—the woven threads shift diagonally across each other, granting natural elasticity without a single thread of elastane or petroleum synthetic.',
      'Paired alongside the structured Caelum trousers, the contrast creates a dynamic interplay between masculine tailoring and sensual feminine drape.'
    ],
    featuredProductIds: ['elysian-silk-slip', 'sora-relaxed-poplin-shirt', 'lune-crescent-bag']
  }
];
