import * as THREE from 'three';
import { useMemo } from 'react';

export function BackgroundSphere() {
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color('#1c2534') },
      uBottom: { value: new THREE.Color('#0c1017') },
      uGlowColor: { value: new THREE.Color('#2e3d55') },
      uSteep: { value: 1.1 }
    }),
    []
  );

  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uTop;
          uniform vec3 uBottom;
          uniform vec3 uGlowColor;
          uniform float uSteep;
          varying vec3 vDir;
          void main() {
            float t = clamp(vDir.y * uSteep * 0.5 + 0.5, 0.0, 1.0);
            vec3 base = mix(uBottom, uTop, t);
            
            // Soft studio cyclorama spotlight centered behind character
            vec3 glowTarget = normalize(vec3(0.0, 0.06, -1.0));
            float d = max(0.0, dot(vDir, -glowTarget));
            float spot = pow(d, 3.2) * 0.42;
            
            gl_FragColor = vec4(base + uGlowColor * spot, 1.0);
          }
        `}
      />
    </mesh>
  );
}
