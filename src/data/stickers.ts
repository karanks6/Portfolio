export interface StickerDefinition {
  id: string;
  label: string;
  type: 'tool' | 'social';
  cheek: 'tool' | 'social';
  position: [number, number, number];
  normal: [number, number, number];
  color: string;
  destinationType: 'scroll' | 'link' | 'mailto' | 'resume';
  destination: string;
  description?: string;
}

export const STICKERS: StickerDefinition[] = [
  // TOOL CHEEK (Model's Right Cheek, X < 0 when rotated -90 deg)
  {
    id: 'flutter',
    label: 'Flutter',
    type: 'tool',
    cheek: 'tool',
    position: [-0.155, 0.105, 0.135],
    normal: [-0.70, 0.20, 0.68],
    color: '#02569B',
    destinationType: 'scroll',
    destination: 'works-flutter',
    description: 'Flutter — 2 projects'
  },
  {
    id: 'react',
    label: 'React.js',
    type: 'tool',
    cheek: 'tool',
    position: [-0.115, 0.072, 0.178],
    normal: [-0.50, 0.20, 0.84],
    color: '#61DAFB',
    destinationType: 'scroll',
    destination: 'works-react',
    description: 'React.js — 2 projects'
  },
  {
    id: 'python',
    label: 'Python',
    type: 'tool',
    cheek: 'tool',
    position: [-0.150, 0.025, 0.150],
    normal: [-0.75, 0.10, 0.65],
    color: '#3776AB',
    destinationType: 'scroll',
    destination: 'works-python',
    description: 'Python — 1 project'
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    type: 'tool',
    cheek: 'tool',
    position: [-0.118, -0.022, 0.175],
    normal: [-0.55, 0.00, 0.83],
    color: '#339933',
    destinationType: 'scroll',
    destination: 'works-nodejs',
    description: 'Node.js — 1 project'
  },

  // SOCIAL CHEEK (Model's Left Cheek, X > 0 when rotated -90 deg)
  {
    id: 'instagram',
    label: 'Instagram',
    type: 'social',
    cheek: 'social',
    position: [0.112, 0.075, 0.178],
    normal: [0.50, 0.20, 0.84],
    color: '#E4405F',
    destinationType: 'link',
    destination: 'https://www.instagram.com/_karan_suvarna_?exln=dHo4NGF2aWcyNDNu',
    description: 'Instagram profile'
  },
  {
    id: 'github',
    label: 'GitHub',
    type: 'social',
    cheek: 'social',
    position: [0.158, 0.105, 0.135],
    normal: [0.70, 0.20, 0.68],
    color: '#ffffff',
    destinationType: 'link',
    destination: 'https://github.com/karanks6',
    description: 'GitHub profile'
  },
  {
    id: 'mail',
    label: 'Mail',
    type: 'social',
    cheek: 'social',
    position: [0.148, 0.028, 0.155],
    normal: [0.72, 0.10, 0.68],
    color: '#EA4335',
    destinationType: 'mailto',
    destination: 'mailto:suvarnakaran77@gmail.com',
    description: 'Send an email'
  },
  {
    id: 'resume',
    label: 'Resume',
    type: 'social',
    cheek: 'social',
    position: [0.125, -0.040, 0.170],
    normal: [0.60, 0.00, 0.80],
    color: '#F59E0B',
    destinationType: 'resume',
    destination: '/portfolio/assets/Resume.pdf',
    description: 'View Resume PDF'
  }
];
