import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BackgroundSphere } from './BackgroundSphere';
import { sampleCameraTimeline } from './CameraRig';
import { Avatar } from './Avatar';
import { HotspotScreenData } from './StickerHotspots';
import { StickerDefinition } from '../data/stickers';

interface SceneProps {
  progress: number;
  isReducedMotion: boolean;
  onHotspotsUpdate: (hotspots: HotspotScreenData[]) => void;
  onStickerClick: (sticker: StickerDefinition) => void;
}

function CameraRigController({
  progress,
  isReducedMotion,
  onModelParams
}: {
  progress: number;
  isReducedMotion: boolean;
  onModelParams: (rotY: number, ox: number, oy: number) => void;
}) {
  const currentCamPos = useRef(new THREE.Vector3(0, 0.04, 1.18));
  const currentTarget = useRef(new THREE.Vector3(0, 0.02, 0));
  const currentRotY = useRef(0);
  const currentOx = useRef(0);
  const currentOy = useRef(0);

  useFrame(({ camera }) => {
    const targetPose = sampleCameraTimeline(isReducedMotion ? 0 : progress);
    const lerpFactor = isReducedMotion ? 1 : 0.09;

    currentCamPos.current.lerp(targetPose.camPos, lerpFactor);
    currentTarget.current.lerp(targetPose.target, lerpFactor);
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetPose.modelRotY, lerpFactor);
    currentOx.current = THREE.MathUtils.lerp(currentOx.current, targetPose.modelOffsetX, lerpFactor);
    currentOy.current = THREE.MathUtils.lerp(currentOy.current, targetPose.modelOffsetY, lerpFactor);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetPose.fov, lerpFactor);
      camera.updateProjectionMatrix();
    }

    onModelParams(currentRotY.current, currentOx.current, currentOy.current);
  });

  return null;
}

export function Scene({
  progress,
  isReducedMotion,
  onHotspotsUpdate,
  onStickerClick
}: SceneProps) {
  const modelParams = useRef({ rotY: 0, ox: 0, oy: 0 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleModelParams = (rotY: number, ox: number, oy: number) => {
    modelParams.current.rotY = rotY;
    modelParams.current.ox = ox;
    modelParams.current.oy = oy;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0.04, 1.18], fov: 44, near: 0.1, far: 200 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
      >
        {/* Background gradient dome */}
        <BackgroundSphere />

        {/* Studio lighting matching reference website */}
        <ambientLight intensity={0.65} color="#ffffff" />
        <hemisphereLight args={['#ffffff', '#404040', 1.15]} />
        <directionalLight position={[5, 8, 5]} intensity={2.35} color="#ffd9c6" />
        <directionalLight position={[-5, 4, -4]} intensity={2.25} color="#9fc6ff" />
        <directionalLight position={[0, -2, 2]} intensity={0.4} color="#dbd3b5" />

        <CameraRigController
          progress={progress}
          isReducedMotion={isReducedMotion}
          onModelParams={handleModelParams}
        />

        <Avatar
          modelRotY={modelParams.current.rotY}
          modelOffsetX={modelParams.current.ox}
          modelOffsetY={modelParams.current.oy}
          progress={progress}
          isReducedMotion={isReducedMotion}
          onHotspotsUpdate={onHotspotsUpdate}
          onStickerClick={onStickerClick}
        />
      </Canvas>
    </div>
  );
}
