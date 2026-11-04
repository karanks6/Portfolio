import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BackgroundSphere } from './BackgroundSphere';
import { sampleCameraTimeline } from './CameraRig';
import { Avatar } from './Avatar';
import { Effects } from './Effects';
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
  const currentCamPos = useRef(new THREE.Vector3(0, 0.04, 1.25));
  const currentTarget = useRef(new THREE.Vector3(0, 0.01, 0));
  const currentRotY = useRef(0);
  const currentOx = useRef(0);
  const currentOy = useRef(0);
  const parallax = useRef(new THREE.Vector2(0, 0));

  useFrame(({ camera, pointer }, delta) => {
    const targetPose = sampleCameraTimeline(isReducedMotion ? 0 : progress);

    // Frame-rate independent snappy exponential damping (matching Senbuzy's damping physics)
    const lerpFactor = isReducedMotion ? 1 : Math.min(1, 1 - Math.exp(-14 * delta));

    currentCamPos.current.lerp(targetPose.camPos, lerpFactor);
    currentTarget.current.lerp(targetPose.target, lerpFactor);
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetPose.modelRotY, lerpFactor);
    currentOx.current = THREE.MathUtils.lerp(currentOx.current, targetPose.modelOffsetX, lerpFactor);
    currentOy.current = THREE.MathUtils.lerp(currentOy.current, targetPose.modelOffsetY, lerpFactor);

    // Subtle 3.5 deg mouse parallax orbit around the target (from Senbuzy)
    const targetParallaxX = isReducedMotion ? 0 : pointer.x * 0.035;
    const targetParallaxY = isReducedMotion ? 0 : -pointer.y * 0.025;
    parallax.current.x = THREE.MathUtils.lerp(parallax.current.x, targetParallaxX, 0.08);
    parallax.current.y = THREE.MathUtils.lerp(parallax.current.y, targetParallaxY, 0.08);

    camera.position.set(
      currentCamPos.current.x + parallax.current.x,
      currentCamPos.current.y + parallax.current.y,
      currentCamPos.current.z
    );
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
        camera={{ position: [0, 0.04, 1.25], fov: 44, near: 0.1, far: 200 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* Background gradient dome */}
        <BackgroundSphere />

        {/* Studio lighting matching reference website */}
        <ambientLight intensity={0.75} color="#ffffff" />
        <hemisphereLight args={['#ffffff', '#505050', 1.2]} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffd9c6" />
        <directionalLight position={[-5, 4, -4]} intensity={2.2} color="#c6ddff" />
        <directionalLight position={[0, -2, 2]} intensity={0.45} color="#dfd6ba" />

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

        {/* Depth of Field & Bloom postprocessing */}
        <Effects progress={progress} isReducedMotion={isReducedMotion} />
      </Canvas>
    </div>
  );
}
