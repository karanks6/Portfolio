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
  linear?: boolean;
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
    camPos: [-0.06, 0.04, 1.25],
    target: [-0.01, 0.03, 0.0],
    fov: 41,
    modelRotY: 0.20,
    modelOffsetX: -0.20,
    modelOffsetY: -0.01,
    focusTarget: [-0.05, 0.03, 0.08],
    focusRange: 1.5,
    bokehScale: 6.0
  },
  // 3. RÉSUMÉ / TOOL STICKERS (Progress 0.18): Centered between screen left edge and timeline text
  {
    progress: 0.18,
    camPos: [-0.15, 0.05, 1.16],
    target: [-0.04, 0.03, 0.04],
    fov: 39,
    modelRotY: 0.38,
    modelOffsetX: -0.40,
    modelOffsetY: -0.02,
    focusTarget: [-0.12, 0.05, 0.14],
    focusRange: 0.35,
    bokehScale: 8.0
  },
  // 4. SKILLS & TECH (Progress 0.36): Turned 45 degrees for clear visibility of tool stickers on right cheek
  {
    progress: 0.36,
    camPos: [-0.15, 0.05, 1.16],
    target: [-0.04, 0.03, 0.04],
    fov: 39,
    modelRotY: 0.785, // 45 degrees
    modelOffsetX: -0.40,
    modelOffsetY: -0.02,
    focusTarget: [-0.12, 0.05, 0.14],
    focusRange: 0.35,
    bokehScale: 8.0
  },
  // 5. WORKS GALLERY START (Progress 0.42): Entry into Works gallery, starts continuous 360 rotation
  {
    progress: 0.42,
    camPos: [-0.15, 0.05, 1.16],
    target: [-0.04, 0.03, 0.04],
    fov: 39,
    modelRotY: 0.785, // Start continuous rotation from Skills 45 deg pose
    modelOffsetX: -0.40,
    modelOffsetY: -0.02,
    focusTarget: [-0.04, 0.03, 0.04],
    focusRange: 2.5,
    bokehScale: 3.5,
    linear: true
  },
  // 6. WORKS GALLERY 1/4 (Progress 0.55): Turns towards project cards (rotated ~90 deg)
  {
    progress: 0.55,
    camPos: [-0.10, 0.05, 1.18],
    target: [-0.03, 0.03, 0.04],
    fov: 40,
    modelRotY: -1.05,
    modelOffsetX: -0.28,
    modelOffsetY: -0.02,
    focusTarget: [-0.03, 0.03, 0.04],
    focusRange: 2.5,
    bokehScale: 3.5,
    linear: true
  },
  // 7. WORKS GALLERY MID (Progress 0.68): Back of head & hair showcase (rotated ~180 deg)
  {
    progress: 0.68,
    camPos: [-0.10, 0.05, 1.18],
    target: [-0.03, 0.03, 0.04],
    fov: 40,
    modelRotY: -2.89,
    modelOffsetX: -0.28,
    modelOffsetY: -0.02,
    focusTarget: [-0.03, 0.03, 0.04],
    focusRange: 2.5,
    bokehScale: 3.5,
    linear: true
  },
  // 8. WORKS GALLERY 3/4 (Progress 0.81): Turning back to front from the left (rotated ~270 deg)
  {
    progress: 0.81,
    camPos: [-0.10, 0.05, 1.18],
    target: [-0.03, 0.03, 0.04],
    fov: 40,
    modelRotY: -4.73,
    modelOffsetX: -0.28,
    modelOffsetY: -0.02,
    focusTarget: [-0.03, 0.03, 0.04],
    focusRange: 2.5,
    bokehScale: 3.5,
    linear: true
  },
  // 9. WORKS END / CONTACT ENTRY (Progress 0.94): Completes 360 rotation, left cheek with social stickers faces camera
  {
    progress: 0.94,
    camPos: [0.08, 0.05, 1.15],
    target: [0.02, 0.03, 0.02],
    fov: 40,
    modelRotY: -6.563,
    modelOffsetX: -0.28,
    modelOffsetY: -0.02,
    focusTarget: [0.10, 0.05, 0.15],
    focusRange: 0.40,
    bokehScale: 7.5
  },
  // 10. CONTACT / OUTRO (Progress 1.00): Friendly final stance with social links active
  {
    progress: 1.00,
    camPos: [0.10, 0.05, 1.18],
    target: [0.02, 0.03, 0.0],
    fov: 40,
    modelRotY: -6.563,
    modelOffsetX: -0.28,
    modelOffsetY: -0.02,
    focusTarget: [0.10, 0.05, 0.15],
    focusRange: 0.40,
    bokehScale: 6.5
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
  const t = k0.linear ? rawT : dwellInterpolate(rawT);

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
