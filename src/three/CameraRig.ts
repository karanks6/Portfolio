import * as THREE from 'three';

export interface CameraKeyframe {
  progress: number;
  camPos: [number, number, number];
  target: [number, number, number];
  fov: number;
  modelRotY: number;
  modelOffsetX: number;
  modelOffsetY: number;
  focusTarget: [number, number, number];
  focusRange: number;
  bokehScale: number;
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 1. HERO (Progress 0.00): Natural portrait framing matching reference - head near top, broad shoulders, full torso down to bottom
  {
    progress: 0.00,
    camPos: [0.0, 0.035, 1.38],
    target: [0.0, 0.035, 0.0],
    fov: 41,
    modelRotY: 0.0,
    modelOffsetX: 0.0,
    modelOffsetY: 0.03,
    focusTarget: [0.0, 0.045, 0.0],
    focusRange: 2.2,
    bokehScale: 5.0
  },
  // 2. HERO TRANSITION (Progress 0.08): Swiftly turns and docks to the left
  {
    progress: 0.08,
    camPos: [-0.09, 0.05, 1.15],
    target: [-0.02, 0.02, 0.0],
    fov: 42,
    modelRotY: 0.22,
    modelOffsetX: -0.28,
    modelOffsetY: -0.04,
    focusTarget: [-0.08, 0.03, 0.10],
    focusRange: 1.1,
    bokehScale: 7.5
  },
  // 3. RÉSUMÉ / TOOL STICKERS (Progress 0.18): 3/4 turn right, razor-thin macro focus on cheek stickers
  {
    progress: 0.18,
    camPos: [-0.15, 0.06, 0.98],
    target: [-0.04, 0.03, 0.05],
    fov: 38,
    modelRotY: 0.38,
    modelOffsetX: -0.45,
    modelOffsetY: -0.03,
    focusTarget: [-0.14, 0.05, 0.15],
    focusRange: 0.16,
    bokehScale: 11.0
  },
  // 4. RÉSUMÉ CONTINUED (Progress 0.34): Maximum bokeh blur, sharp focus locked on face stickers
  {
    progress: 0.34,
    camPos: [-0.18, 0.07, 0.90],
    target: [-0.06, 0.04, 0.06],
    fov: 36,
    modelRotY: 0.45,
    modelOffsetX: -0.46,
    modelOffsetY: -0.02,
    focusTarget: [-0.14, 0.05, 0.15],
    focusRange: 0.15,
    bokehScale: 11.5
  },
  // 5. WORKS GALLERY START (Progress 0.48): Left profile stance, leaving right half open for cards
  {
    progress: 0.48,
    camPos: [-0.22, 0.08, 0.90],
    target: [-0.06, 0.04, 0.06],
    fov: 36,
    modelRotY: 0.52,
    modelOffsetX: -0.48,
    modelOffsetY: -0.02,
    focusTarget: [-0.12, 0.04, 0.10],
    focusRange: 0.38,
    bokehScale: 9.0
  },
  // 6. WORKS GALLERY MID (Progress 0.62): Expressive angle viewing horizontal slider
  {
    progress: 0.62,
    camPos: [-0.24, 0.07, 0.88],
    target: [-0.06, 0.03, 0.06],
    fov: 36,
    modelRotY: 0.56,
    modelOffsetX: -0.48,
    modelOffsetY: -0.02,
    focusTarget: [-0.12, 0.03, 0.08],
    focusRange: 0.45,
    bokehScale: 8.5
  },
  // 7. WORKS GALLERY END (Progress 0.74): Smooth transition out of horizontal track
  {
    progress: 0.74,
    camPos: [-0.20, 0.07, 0.92],
    target: [-0.05, 0.03, 0.05],
    fov: 37,
    modelRotY: 0.48,
    modelOffsetX: -0.46,
    modelOffsetY: -0.02,
    focusTarget: [-0.10, 0.03, 0.08],
    focusRange: 0.50,
    bokehScale: 8.0
  },
  // 8. SKILLS & TECH (Progress 0.86): Orbits to reveal other cheek with social stickers
  {
    progress: 0.86,
    camPos: [0.10, 0.06, 0.96],
    target: [0.02, 0.03, 0.02],
    fov: 38,
    modelRotY: -0.32,
    modelOffsetX: -0.40,
    modelOffsetY: -0.02,
    focusTarget: [0.13, 0.05, 0.15],
    focusRange: 0.18,
    bokehScale: 10.5
  },
  // 9. CONTACT / OUTRO (Progress 1.00): Friendly final stance with balanced wide focus
  {
    progress: 1.00,
    camPos: [0.12, 0.05, 1.05],
    target: [0.03, 0.03, 0.0],
    fov: 40,
    modelRotY: -0.28,
    modelOffsetX: -0.38,
    modelOffsetY: -0.02,
    focusTarget: [0.02, 0.02, 0.0],
    focusRange: 1.8,
    bokehScale: 6.0
  }
];

const DWELL_AMOUNT = 0.28; // 28% dwell pause at milestones

function dwellInterpolate(rawT: number): number {
  if (rawT <= DWELL_AMOUNT) return 0;
  if (rawT >= 1 - DWELL_AMOUNT) return 1;
  const inner = (rawT - DWELL_AMOUNT) / (1 - 2 * DWELL_AMOUNT);
  return inner * inner * (3 - 2 * inner); // Smoothstep S-curve between plateaus
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function sampleCameraTimeline(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  const kfs = CAMERA_KEYFRAMES;

  let k0 = kfs[0];
  let k1 = kfs[1];

  for (let i = 0; i < kfs.length - 1; i++) {
    if (clamped >= kfs[i].progress && clamped <= kfs[i + 1].progress) {
      k0 = kfs[i];
      k1 = kfs[i + 1];
      break;
    }
  }

  const range = k1.progress - k0.progress;
  const rawT = range > 0 ? (clamped - k0.progress) / range : 0;
  const t = dwellInterpolate(rawT);

  return {
    camPos: new THREE.Vector3(
      lerp(k0.camPos[0], k1.camPos[0], t),
      lerp(k0.camPos[1], k1.camPos[1], t),
      lerp(k0.camPos[2], k1.camPos[2], t)
    ),
    target: new THREE.Vector3(
      lerp(k0.target[0], k1.target[0], t),
      lerp(k0.target[1], k1.target[1], t),
      lerp(k0.target[2], k1.target[2], t)
    ),
    fov: lerp(k0.fov, k1.fov, t),
    modelRotY: lerp(k0.modelRotY, k1.modelRotY, t),
    modelOffsetX: lerp(k0.modelOffsetX, k1.modelOffsetX, t),
    modelOffsetY: lerp(k0.modelOffsetY, k1.modelOffsetY, t),
    focusTarget: new THREE.Vector3(
      lerp(k0.focusTarget[0], k1.focusTarget[0], t),
      lerp(k0.focusTarget[1], k1.focusTarget[1], t),
      lerp(k0.focusTarget[2], k1.focusTarget[2], t)
    ),
    focusRange: lerp(k0.focusRange, k1.focusRange, t),
    bokehScale: lerp(k0.bokehScale, k1.bokehScale, t)
  };
}
