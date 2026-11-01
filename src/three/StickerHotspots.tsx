import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { STICKERS, StickerDefinition } from '../data/stickers';

export interface HotspotScreenData {
  id: string;
  label: string;
  type: 'tool' | 'social';
  x: number;
  y: number;
  visible: boolean;
  opacity: number;
  color: string;
  description?: string;
  destination: string;
  destinationType: 'scroll' | 'link' | 'mailto' | 'resume';
}

interface StickerHotspotsProps {
  onHotspotsUpdate: (hotspots: HotspotScreenData[]) => void;
  onStickerClick: (sticker: StickerDefinition) => void;
  avatarGroupRef?: React.RefObject<THREE.Group | null>;
}

export function StickerHotspots({
  onHotspotsUpdate,
  onStickerClick
}: StickerHotspotsProps) {
  const { camera, size } = useThree();
  const anchorsRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const tempVec = useRef(new THREE.Vector3());
  const tempNormal = useRef(new THREE.Vector3());
  const tempDir = useRef(new THREE.Vector3());

  useFrame(() => {
    const screenData: HotspotScreenData[] = [];

    STICKERS.forEach((sticker) => {
      const mesh = anchorsRef.current.get(sticker.id);
      if (!mesh) return;

      // Get world position of the anchor mesh
      mesh.getWorldPosition(tempVec.current);

      // Facing test: get world normal
      tempNormal.current.set(sticker.normal[0], sticker.normal[1], sticker.normal[2]);
      // Apply rotation from parent avatar group
      tempNormal.current.applyQuaternion(mesh.parent?.quaternion || mesh.quaternion).normalize();

      // Vector to camera
      tempDir.current.copy(camera.position).sub(tempVec.current).normalize();

      // Dot product: > 0 means pointing toward camera
      const dot = tempNormal.current.dot(tempDir.current);

      // Project anchor to NDC space
      tempVec.current.project(camera);

      // Check if within screen bounds and in front of camera
      const inFront = tempVec.current.z > -1 && tempVec.current.z < 1;
      const facingCamera = dot > 0.22;
      const isVisible = inFront && facingCamera;

      const screenX = (tempVec.current.x * 0.5 + 0.5) * size.width;
      const screenY = (-tempVec.current.y * 0.5 + 0.5) * size.height;

      // Compute opacity based on dot product for smooth fade
      const opacity = isVisible
        ? Math.min(1, Math.max(0, (dot - 0.22) / 0.25))
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

    onHotspotsUpdate(screenData);
  });

  return (
    <>
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
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color={sticker.color} wireframe />
        </mesh>
      ))}
    </>
  );
}
