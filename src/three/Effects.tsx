import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface EffectsProps {
  progress?: number;
  isReducedMotion: boolean;
}

export function Effects({ isReducedMotion }: EffectsProps) {
  if (isReducedMotion) {
    return null;
  }

  return (
    <EffectComposer multisampling={4} stencilBuffer={false}>
      <Bloom
        mipmapBlur={true}
        intensity={0.3}
        luminanceThreshold={0.88}
        luminanceSmoothing={0.3}
      />
    </EffectComposer>
  );
}
