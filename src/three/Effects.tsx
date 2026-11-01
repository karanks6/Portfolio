import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

interface EffectsProps {
  isReducedMotion: boolean;
}

export function Effects({ isReducedMotion }: EffectsProps) {
  if (isReducedMotion) {
    return null;
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.88}
        luminanceSmoothing={0.3}
        intensity={0.35}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.45}
        eskil={false}
      />
    </EffectComposer>
  );
}
