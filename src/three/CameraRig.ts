import * as THREE from 'three';

export interface CameraKeyframe {
  progress: number;
  camPos: [number, number, number];
  target: [number, number, number];
  fov: number;
  modelRotY: number;
  modelOffsetX: number;
  modelOffsetY: number;
  focusDistance: number;
  dofBokehScale?: number;
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 1. HERO (Progress 0.00): Front-facing poster pose, centered bust, sharp avatar
  {
    progress: 0.00,
    camPos: [0.0, 0.04, 1.25],
    target: [0.0, 0.01, 0.0],
    fov: 44,
    modelRotY: 0.0,
    modelOffsetX: 0.0,
    modelOffsetY: -0.06,
    focusDistance: 1.25,
    dofBokehScale: 1.0
  },
  // 2. HERO TRANSITION (Progress 0.10): Glides smoothly toward the left
  {
    progress: 0.10,
    camPos: [-0.10, 0.05, 1.15],
    target: [0.0, 0.02, 0.0],
    fov: 43,
    modelRotY: 0.18,
    modelOffsetX: -0.25,
    modelOffsetY: -0.04,
    focusDistance: 1.15,
    dofBokehScale: 1.5
  },
  // 3. RÉSUMÉ / TIMELINE (Progress 0.22): Left-docked, 3/4 turn facing right toward timeline
  {
    progress: 0.22,
    camPos: [-0.16, 0.06, 1.02],
    target: [0.0, 0.03, 0.0],
    fov: 40,
    modelRotY: 0.32,
    modelOffsetX: -0.44,
    modelOffsetY: -0.03,
    focusDistance: 1.02,
    dofBokehScale: 1.8
  },
  // 4. RÉSUMÉ CONTINUED (Progress 0.34): Deep focus on face stickers, cleanly framed on left
  {
    progress: 0.34,
    camPos: [-0.20, 0.07, 0.92],
    target: [-0.04, 0.04, 0.05],
    fov: 38,
    modelRotY: 0.44,
    modelOffsetX: -0.46,
    modelOffsetY: -0.02,
    focusDistance: 0.92,
    dofBokehScale: 1.6
  },
  // 5. WORKS GALLERY START (Progress 0.46): Profile stance on left, leaving stage for horizontal cards
  {
    progress: 0.46,
    camPos: [-0.24, 0.08, 0.90],
    target: [-0.05, 0.04, 0.06],
    fov: 36,
    modelRotY: 0.55,
    modelOffsetX: -0.48,
    modelOffsetY: -0.02,
    focusDistance: 0.90,
    dofBokehScale: 1.2
  },
  // 6. WORKS GALLERY MID (Progress 0.60): Expressive angle
  {
    progress: 0.60,
    camPos: [-0.26, 0.07, 0.86],
    target: [-0.06, 0.03, 0.07],
    fov: 36,
    modelRotY: 0.60,
    modelOffsetX: -0.48,
    modelOffsetY: -0.02,
    focusDistance: 0.86,
    dofBokehScale: 1.1
  },
  // 7. WORKS GALLERY END (Progress 0.74)
  {
    progress: 0.74,
    camPos: [-0.22, 0.07, 0.90],
    target: [-0.05, 0.03, 0.05],
    fov: 37,
    modelRotY: 0.50,
    modelOffsetX: -0.46,
    modelOffsetY: -0.02,
    focusDistance: 0.90,
    dofBokehScale: 1.2
  },
  // 8. SKILLS & TECH (Progress 0.86): Orbits to reveal other cheek and skills stickers
  {
    progress: 0.86,
    camPos: [0.10, 0.06, 1.02],
    target: [0.0, 0.03, 0.0],
    fov: 40,
    modelRotY: -0.25,
    modelOffsetX: -0.40,
    modelOffsetY: -0.02,
    focusDistance: 1.02,
    dofBokehScale: 1.4
  },
  // 9. CONTACT / OUTRO (Progress 1.00): Friendly final stance
  {
    progress: 1.00,
    camPos: [0.15, 0.05, 0.96],
    target: [0.05, 0.03, 0.05],
    fov: 38,
    modelRotY: -0.36,
    modelOffsetX: -0.38,
    modelOffsetY: -0.02,
    focusDistance: 0.96,
    dofBokehScale: 1.0
  }
];

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
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
  const t = smoothstep(0, 1, rawT);

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
    focusDistance: lerp(k0.focusDistance, k1.focusDistance, t),
    dofBokehScale: lerp(k0.dofBokehScale ?? 1, k1.dofBokehScale ?? 1, t)
  };
}
