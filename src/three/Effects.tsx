import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { sampleCameraTimeline } from './CameraRig';

interface EffectsProps {
  progress: number;
  isReducedMotion: boolean;
}

export function Effects({ progress, isReducedMotion }: EffectsProps) {
  const dofRef = useRef<any>(null);
  const currentTarget = useRef(new THREE.Vector3(0, 0.02, 0));
  const currentRange = useRef(2.2);
  const currentBokeh = useRef(5.0);

  useFrame((_, delta) => {
    if (!dofRef.current) return;

    const pose = sampleCameraTimeline(isReducedMotion ? 0 : progress);
    const lerpRate = Math.min(1, 1 - Math.exp(-12 * delta));

    currentTarget.current.lerp(pose.focusTarget, lerpRate);
    currentRange.current = THREE.MathUtils.lerp(currentRange.current, pose.focusRange, lerpRate);
    currentBokeh.current = THREE.MathUtils.lerp(
      currentBokeh.current,
      isReducedMotion ? 0 : pose.bokehScale,
      lerpRate
    );

    // Update DepthOfField target and properties
    if (!dofRef.current.target) {
      dofRef.current.target = new THREE.Vector3();
    }
    dofRef.current.target.copy(currentTarget.current);
    dofRef.current.bokehScale = currentBokeh.current;

    if (dofRef.current.cocMaterial) {
      dofRef.current.cocMaterial.focusRange = currentRange.current;
    }
  });

  if (isReducedMotion) {
    return null;
  }

  return (
    <EffectComposer multisampling={0} stencilBuffer={false} depthBuffer={true}>
      <DepthOfField
        ref={dofRef}
        target={[0, 0.02, 0]}
        worldFocusRange={2.0}
        bokehScale={isReducedMotion ? 0 : 5.0}
        height={480}
      />
      <Bloom
        mipmapBlur={true}
        intensity={0.4}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.3}
      />
    </EffectComposer>
  );
}
