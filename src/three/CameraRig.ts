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
  // 1. HERO (Progress 0.00): Front-facing poster pose, full bust visible, sharp avatar
  {
    progress: 0.00,
    camPos: [0.0, 0.04, 1.28],
    target: [0.0, 0.01, 0.0],
    fov: 44,
    modelRotY: 0.0,
    modelOffsetX: 0.0,
    modelOffsetY: -0.08,
    focusDistance: 1.28,
    dofBokehScale: 1.0
  },
  // 2. ABOUT (Progress 0.12): Gentle dolly-in, avatar slightly softened
  {
    progress: 0.12,
    camPos: [0.0, 0.05, 1.05],
    target: [0.0, 0.03, 0.0],
    fov: 42,
    modelRotY: 0.04,
    modelOffsetX: 0.0,
    modelOffsetY: -0.06,
    focusDistance: 1.05,
    dofBokehScale: 2.2
  },
  // 3. TIMELINE (Progress 0.24): Pulls back slightly, shifts right so vertical timeline has clear space on left
  {
    progress: 0.24,
    camPos: [0.12, 0.04, 1.25],
    target: [0.0, 0.03, 0.0],
    fov: 44,
    modelRotY: -0.20,
    modelOffsetX: 0.24,
    modelOffsetY: -0.03,
    focusDistance: 1.25,
    dofBokehScale: 1.8
  },
  // 4. WORKS INTRO (Progress 0.36): Begins orbiting toward TOOL CHEEK (Model's Right Cheek, X < 0)
  {
    progress: 0.36,
    camPos: [-0.32, 0.08, 0.86],
    target: [-0.10, 0.05, 0.12],
    fov: 38,
    modelRotY: 0.32,
    modelOffsetX: 0.22,
    modelOffsetY: 0.0,
    focusDistance: 0.86,
    dofBokehScale: 1.2
  },
  // 5. WORKS - FLUTTER (Progress 0.46): Frames Flutter sticker clearly on the right, project list on left
  // Flutter anchor: [-0.155, 0.105, 0.135]
  {
    progress: 0.46,
    camPos: [-0.44, 0.13, 0.52],
    target: [-0.155, 0.105, 0.135],
    fov: 32,
    modelRotY: 0.46,
    modelOffsetX: 0.24,
    modelOffsetY: 0.01,
    focusDistance: 0.52,
    dofBokehScale: 0.8
  },
  // 6. WORKS - PYTHON (Progress 0.56): Glides to frame Python sticker
  // Python anchor: [-0.150, 0.025, 0.150]
  {
    progress: 0.56,
    camPos: [-0.43, 0.05, 0.53],
    target: [-0.150, 0.025, 0.150],
    fov: 32,
    modelRotY: 0.46,
    modelOffsetX: 0.24,
    modelOffsetY: 0.01,
    focusDistance: 0.53,
    dofBokehScale: 0.8
  },
  // 7. WORKS - REACT.JS (Progress 0.66): Glides to frame React sticker
  // React anchor: [-0.115, 0.072, 0.178]
  {
    progress: 0.66,
    camPos: [-0.36, 0.095, 0.55],
    target: [-0.115, 0.072, 0.178],
    fov: 32,
    modelRotY: 0.40,
    modelOffsetX: 0.24,
    modelOffsetY: 0.01,
    focusDistance: 0.55,
    dofBokehScale: 0.8
  },
  // 8. WORKS - NODE.JS (Progress 0.76): Glides to frame Node.js sticker
  // Node anchor: [-0.118, -0.022, 0.175]
  {
    progress: 0.76,
    camPos: [-0.37, -0.01, 0.55],
    target: [-0.118, -0.022, 0.175],
    fov: 32,
    modelRotY: 0.40,
    modelOffsetX: 0.24,
    modelOffsetY: 0.01,
    focusDistance: 0.55,
    dofBokehScale: 0.8
  },
  // 9. SKILLS (Progress 0.86): Neutral three-quarter view, avatar sharp again
  {
    progress: 0.86,
    camPos: [0.12, 0.05, 1.15],
    target: [0.0, 0.03, 0.0],
    fov: 42,
    modelRotY: -0.12,
    modelOffsetX: 0.18,
    modelOffsetY: -0.02,
    focusDistance: 1.15,
    dofBokehScale: 1.4
  },
  // 10. CONTACT (Progress 1.00): Orbits to SOCIAL CHEEK (GitHub, Instagram, Mail, Resume)
  // Social cheek center: [0.14, 0.04, 0.16], model on left, contact cards on right
  {
    progress: 1.00,
    camPos: [0.42, 0.06, 0.52],
    target: [0.14, 0.04, 0.16],
    fov: 33,
    modelRotY: -0.48,
    modelOffsetX: -0.22,
    modelOffsetY: 0.01,
    focusDistance: 0.52,
    dofBokehScale: 0.8
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
