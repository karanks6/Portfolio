import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { STICKERS, StickerDefinition } from '../data/stickers';
import { HotspotScreenData } from './StickerHotspots';

interface AvatarProps {
  modelRotY: number;
  modelOffsetX: number;
  modelOffsetY: number;
  progress: number;
  isReducedMotion: boolean;
  onHotspotsUpdate: (hotspots: HotspotScreenData[]) => void;
  onStickerClick: (sticker: StickerDefinition) => void;
}

export function Avatar({
  modelRotY,
  modelOffsetX,
  modelOffsetY,
  progress,
  isReducedMotion,
  onHotspotsUpdate,
  onStickerClick
}: AvatarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headTrackingRef = useRef({ x: 0, y: 0 });
  const anchorsRef = useRef<Map<string, THREE.Mesh>>(new Map());

  const tempVec = useRef(new THREE.Vector3());
  const tempNormal = useRef(new THREE.Vector3());
  const tempDir = useRef(new THREE.Vector3());

  const { camera, size } = useThree();

  const gltf = useGLTF('/portfolio/assets/3dmodel.glb', undefined, undefined, (loader: any) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.register((parser: any) => {
      parser.textureLoader = new THREE.TextureLoader(parser.options.manager);
      return { name: 'ForceTextureLoader' };
    });
  });
  const scene = gltf.scene;

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
          child.material.map.needsUpdate = true;
        }
        child.material.color = new THREE.Color(0xffffff);
        child.material.roughness = 0.82;
        child.material.metalness = 0.08;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    const isCloseup = (progress > 0.42 && progress < 0.82) || progress > 0.95;

    let targetHeadX = 0;
    let targetHeadY = 0;

    if (!isTouch && !isCloseup && !isReducedMotion) {
      targetHeadX = THREE.MathUtils.clamp(pointer.x * 0.05, -0.05, 0.05);
      targetHeadY = THREE.MathUtils.clamp(-pointer.y * 0.035, -0.035, 0.035);
    }

    headTrackingRef.current.x = THREE.MathUtils.lerp(headTrackingRef.current.x, targetHeadX, 0.06);
    headTrackingRef.current.y = THREE.MathUtils.lerp(headTrackingRef.current.y, targetHeadY, 0.06);

    const baseRotY = (isReducedMotion ? 0 : modelRotY) + headTrackingRef.current.x;
    const baseRotX = isReducedMotion ? 0 : headTrackingRef.current.y;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotY, 0.25);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX, 0.25);

    const targetX = isReducedMotion ? 0 : modelOffsetX;
    const targetY = isReducedMotion ? -0.04 : modelOffsetY;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.25);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.25);

    const screenData: HotspotScreenData[] = [];

    STICKERS.forEach((sticker) => {
      const mesh = anchorsRef.current.get(sticker.id);
      if (!mesh) return;

      mesh.getWorldPosition(tempVec.current);

      tempNormal.current.set(sticker.normal[0], sticker.normal[1], sticker.normal[2]);
      tempNormal.current.applyQuaternion(groupRef.current!.quaternion).normalize();

      tempDir.current.copy(camera.position).sub(tempVec.current).normalize();

      const dot = tempNormal.current.dot(tempDir.current);
      tempVec.current.project(camera);

      const isToolSection = progress >= 0.14 && progress <= 0.88;
      const isSocialSection = progress >= 0.89;
      const isRelevantSection =
        (sticker.type === 'tool' && isToolSection) ||
        (sticker.type === 'social' && isSocialSection);

      const inFront = tempVec.current.z > -1 && tempVec.current.z < 1;
      const facingCamera = dot > 0.40;
      const isVisible = inFront && facingCamera && isRelevantSection;

      const screenX = (tempVec.current.x * 0.5 + 0.5) * size.width;
      const screenY = (-tempVec.current.y * 0.5 + 0.5) * size.height;

      const opacity = isVisible
        ? Math.min(1, Math.max(0, (dot - 0.40) / 0.30))
        : 0;

      screenData.push({
        id: sticker.id,
        label: sticker.label,
        type: sticker.type,
        x: screenX,
        y: screenY,
        visible: isVisible && opacity > 0.1,
        opacity,
        color: sticker.color,
        description: sticker.description,
        destination: sticker.destination,
        destinationType: sticker.destinationType
      });
    });

    if (typeof onHotspotsUpdate === 'function') {
      onHotspotsUpdate(screenData);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.04, 0]}>
      <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />

      {STICKERS.map((sticker) => (
        <mesh
          key={sticker.id}
          ref={(el) => {
            if (el) anchorsRef.current.set(sticker.id, el);
            else anchorsRef.current.delete(sticker.id);
          }}
          position={sticker.position}
          visible={false}
          onClick={(e) => {
            e.stopPropagation();
            onStickerClick(sticker);
          }}
        >
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial color={sticker.color} wireframe />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload('/portfolio/assets/3dmodel.glb', undefined, undefined, (loader: any) => {
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.register((parser: any) => {
    parser.textureLoader = new THREE.TextureLoader(parser.options.manager);
    return { name: 'ForceTextureLoader' };
  });
});
